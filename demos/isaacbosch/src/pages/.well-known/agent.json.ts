/**
 * /.well-known/agent.json — Agent Protocol discovery
 *
 * Allows AI agents and automated systems to discover what this site
 * offers, who the person behind it is, and how to interact.
 *
 * Based on emerging agent protocol standards.
 */
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
	const agent = {
		"$schema": "https://agentprotocol.ai/schema/agent.json",
		version: "1.0",
		name: "Isaac Bosch — Consultor eCommerce B2B",
		description:
			"Consultor eCommerce B2B y Fractional CIO en Barcelona. Transformación digital industrial: integración ERP, IA aplicada, formación empresarial.",
		url: "https://isaacbosch.com",
		provider: {
			name: "Isaac Bosch",
			url: "https://isaacbosch.com",
			email: "mail@isaacbosch.com",
		},
		capabilities: {
			human_contact: {
				email: "mail@isaacbosch.com",
				phone: "+34655588668",
				whatsapp: "https://wa.me/34655588668",
				linkedin: "https://www.linkedin.com/in/isaacbosch",
				calendar: "https://isaacbosch.com/contacto",
			},
			content: {
				blog: "https://isaacbosch.com/blog",
				services: "https://isaacbosch.com/servicios",
				about: "https://isaacbosch.com/sobre-isaac",
				llms_txt: "https://isaacbosch.com/llms.txt",
				llms_full_txt: "https://isaacbosch.com/llms-full.txt",
				sitemap: "https://isaacbosch.com/sitemap.xml",
				rss: "https://isaacbosch.com/rss.xml",
			},
		},
		expertise: [
			"eCommerce B2B",
			"Integración ERP (SAP, Business Central, Odoo, Sage)",
			"Fractional CIO",
			"Inteligencia Artificial aplicada al negocio",
			"Agentes IA y automatizaciones",
			"Transformación digital industrial",
			"PrestaShop",
			"Magento",
			"Shopify Plus",
		],
		location: {
			city: "Barcelona",
			country: "ES",
			timezone: "Europe/Madrid",
		},
		languages: ["es", "ca", "en"],
		organizations: [
			{ name: "eComm360", url: "https://ecomm360.es", role: "Founder" },
			{ name: "Integrafy", url: "https://integrafy.com", role: "Founder" },
			{ name: "ApproSearch", role: "Founder" },
			{ name: "AlabazWeb", url: "https://alabazweb.com", role: "Founder" },
		],
	};

	return new Response(JSON.stringify(agent, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
