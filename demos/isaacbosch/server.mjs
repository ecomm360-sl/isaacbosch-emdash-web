/**
 * Custom Node server that rewrites req.headers.host based on
 * x-forwarded-host before handing the request to Astro.
 *
 * Easypanel's Traefik proxy sets the upstream Host header to the
 * internal container address (which Astro then resolves as
 * "localhost"). Without this rewrite, Astro.url.origin is
 * "http://localhost", which breaks cookie scope, magic-link
 * verification, WebAuthn rpId, and every URL the server generates.
 *
 * Run with: node server.mjs
 */
import http from "node:http";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const PORT = Number(process.env.PORT || 4321);
const HOST = process.env.HOST || "0.0.0.0";

const server = http.createServer((req, res) => {
	// Rewrite host + protocol from forwarded headers
	const fwdHost = req.headers["x-forwarded-host"];
	const fwdProto = req.headers["x-forwarded-proto"];

	if (typeof fwdHost === "string" && fwdHost.length > 0) {
		req.headers.host = fwdHost;
	}
	if (typeof fwdProto === "string" && fwdProto.length > 0) {
		// Astro Node adapter checks req.encrypted to decide http vs https.
		// Setting it on the socket pretends the connection was TLS.
		try {
			Object.defineProperty(req.socket, "encrypted", {
				value: fwdProto === "https",
				configurable: true,
			});
		} catch {
			// ignore
		}
	}

	ssrHandler(req, res, (err) => {
		if (err) {
			console.error("[server] handler error:", err);
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("Internal Server Error");
			return;
		}
		// Fall-through 404
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not found");
	});
});

server.listen(PORT, HOST, () => {
	console.log(`[server] listening on http://${HOST}:${PORT}`);
});
