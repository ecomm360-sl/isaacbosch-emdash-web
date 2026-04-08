import node from "@astrojs/node";
import react from "@astrojs/react";
import { auditLogPlugin } from "@emdash-cms/plugin-audit-log";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

export default defineConfig({
	site: process.env.SITE_URL || "https://isaac-dev-isaacbosch-emdash-web.inhusc.easypanel.host",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
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
			database: sqlite({
				url: process.env.EMDASH_DB_URL || "file:./data.db",
			}),
			storage: local({
				directory: process.env.EMDASH_UPLOADS_DIR || "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
			plugins: [auditLogPlugin()],
		}),
	],
	devToolbar: { enabled: false },
});
