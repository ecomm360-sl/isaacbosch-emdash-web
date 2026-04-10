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
		// Legacy URLs → new structure
		"/prensa": { status: 301, destination: "/medios" },
		"/privacidad": { status: 301, destination: "/politica-privacidad" },
		"/consultor-empresas": { status: 301, destination: "/blog/consultor-empresas" },
		"/experiencia-consultor": { status: 301, destination: "/blog/experiencia-consultor" },
		"/consultoria-ecommerce-b2b": { status: 301, destination: "/servicios/consultoria-ecommerce-b2b" },
		"/sobre-mi": { status: 301, destination: "/sobre-isaac" },
		"/experiencia": { status: 301, destination: "/sobre-isaac" },
		"/notes": { status: 301, destination: "/blog" },
		"/projects": { status: 301, destination: "/proyectos" },
		// /posts/* → /blog/*
		"/posts/experiencia-consultor": { status: 301, destination: "/blog/experiencia-consultor" },
		"/posts/consultor-empresas": { status: 301, destination: "/blog/consultor-empresas" },
		"/posts/cuanto-cuesta-montar-ecommerce-b2b": { status: 301, destination: "/blog/cuanto-cuesta-montar-ecommerce-b2b" },
		"/posts/preguntas-frecuentes-ia-empresas": { status: 301, destination: "/blog/preguntas-frecuentes-ia-empresas" },
		"/posts/preguntas-frecuentes-ecommerce-b2b": { status: 301, destination: "/blog/preguntas-frecuentes-ecommerce-b2b" },
		// /category/* → /blog/categoria/*
		"/category/estrategia-b2b": { status: 301, destination: "/blog/categoria/estrategia-b2b" },
		"/category/integracion-erp": { status: 301, destination: "/blog/categoria/integracion-erp" },
		"/category/reflexiones": { status: 301, destination: "/blog/categoria/reflexiones" },
		"/category/tecnologia": { status: 301, destination: "/blog/categoria/tecnologia" },
		// /tag/* → /blog/etiqueta/*
		"/tag/ia-agentes": { status: 301, destination: "/blog/etiqueta/ia-agentes" },
		"/tag/b2b": { status: 301, destination: "/blog/etiqueta/b2b" },
		"/tag/barcelona": { status: 301, destination: "/blog/etiqueta/barcelona" },
		"/tag/caso-de-exito": { status: 301, destination: "/blog/etiqueta/caso-de-exito" },
		"/tag/chatbots": { status: 301, destination: "/blog/etiqueta/chatbots" },
		"/tag/espana": { status: 301, destination: "/blog/etiqueta/espana" },
		"/tag/Espana": { status: 301, destination: "/blog/etiqueta/espana" },
		// Legacy post with tilde in URL (from old WordPress/seed)
		"/posts/prestashop-restructuracion": { status: 301, destination: "/blog" },
		"/tag/faq": { status: 301, destination: "/blog/etiqueta/faq" },
		"/tag/guia": { status: 301, destination: "/blog/etiqueta/guia" },
		"/tag/magento": { status: 301, destination: "/blog/etiqueta/magento" },
		"/tag/odoo": { status: 301, destination: "/blog/etiqueta/odoo" },
		"/tag/pyme": { status: 301, destination: "/blog/etiqueta/pyme" },
		"/tag/prestashop": { status: 301, destination: "/blog/etiqueta/prestashop" },
		"/tag/roi": { status: 301, destination: "/blog/etiqueta/roi" },
		"/tag/sap": { status: 301, destination: "/blog/etiqueta/sap" },
		"/tag/seo-tag": { status: 301, destination: "/blog/etiqueta/seo-tag" },
		"/tag/shopify": { status: 301, destination: "/blog/etiqueta/shopify" },
		"/tag/tendencias": { status: 301, destination: "/blog/etiqueta/tendencias" },
	},
	build: {
		// Inline small stylesheets to eliminate render-blocking CSS requests
		inlineStylesheets: "always",
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
