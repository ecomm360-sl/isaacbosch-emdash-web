import { defineMiddleware, sequence } from "astro:middleware";

/**
 * Trust X-Forwarded-Host / X-Forwarded-Proto headers from Easypanel's Traefik
 * reverse proxy. Without this, the Astro Node adapter sees the internal
 * upstream host (`localhost`) instead of the public hostname
 * (`isaacbosch.com`), which breaks session cookies, magic-link redirects,
 * passkey rpId, and any code that uses `Astro.url.origin`.
 *
 * MUST run before EmDash's own middleware so the rebuilt URL propagates
 * everywhere.
 */
const trustForwardedHost = defineMiddleware(async (context, next) => {
	const fwdHost = context.request.headers.get("x-forwarded-host");
	const fwdProto = context.request.headers.get("x-forwarded-proto");

	if (fwdHost) {
		const proto = fwdProto || "https";
		const newUrl = new URL(context.url.pathname + context.url.search, `${proto}://${fwdHost}`);
		// Astro 5+ allows replacing context.url
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(context as any).url = newUrl;
	}

	return next();
});

export const onRequest = sequence(trustForwardedHost);
