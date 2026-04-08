import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

// IMPORTANT: astro.config.mjs is evaluated at BUILD time, not runtime, so
// process.env values get baked into the bundle. To support both local dev
// (relative paths) and Docker/Easypanel (persistent /data volume) we
// switch on NODE_ENV which is set to "production" inside the Dockerfile.
const isProd = process.env.NODE_ENV === "production";
const dbUrl = process.env.EMDASH_DB_URL || (isProd ? "file:/data/data.db" : "file:./data.db");
const uploadsDir = process.env.EMDASH_UPLOADS_DIR || (isProd ? "/data/uploads" : "./uploads");
const siteUrl =
	process.env.SITE_URL || "https://isaac-dev-isaacbosch-emdash-web.inhusc.easypanel.host";

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	// Astro 6 ignores X-Forwarded-Host unless the host is in this list.
	// Without this, behind Easypanel/Traefik, Astro.url falls back to
	// http://localhost:4321 and breaks cookies, magic links, passkeys.
	security: {
		allowedDomains: [
			{ hostname: "isaacbosch.com", protocol: "https" },
			{ hostname: "**.easypanel.host", protocol: "https" },
		],
	},
	redirects: {
		"/prensa": { status: 301, destination: "/medios" },
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: sqlite({ url: dbUrl }),
			storage: local({
				directory: uploadsDir,
				baseUrl: "/_emdash/api/media/file",
			}),
		}),
	],
	devToolbar: { enabled: false },
});
