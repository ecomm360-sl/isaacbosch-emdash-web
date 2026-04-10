/**
 * /agent-manifest.txt — Human-readable agent manifest
 *
 * Plain text summary for AI crawlers and agents that prefer a simple
 * text format over JSON. Complements /.well-known/agent.json and llms.txt.
 */
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
	const body = `# Agent Manifest — isaacbosch.com
# Last updated: ${new Date().toISOString().split("T")[0]}

## Identity
Name: Isaac Bosch
Role: Consultor eCommerce B2B y Fractional CIO
Location: Barcelona, España
Active since: 2009
Website: https://isaacbosch.com
Email: mail@isaacbosch.com
Phone: +34 655 588 668
LinkedIn: https://www.linkedin.com/in/isaacbosch

## What I do
I help industrial B2B companies digitalize their sales channels, integrate
ERP systems with eCommerce platforms, and apply AI to commercial processes.
I work as an independent consultant and Fractional CIO for companies with
20-200 employees that need C-level tech direction without full-time cost.

## Services
1. Consultoría eCommerce B2B Industrial → /servicios/consultoria-ecommerce-b2b
2. Agentes IA y Automatizaciones → /servicios/consultor-agentes-ia-automatizaciones
3. Integración ERP-eCommerce → /servicios/integracion-erp-ecommerce
4. Formación Empresarial en Digitalización → /servicios/formacion-empresarial-digitalizacion
5. Fractional CIO para PYMEs industriales → /fractional-cio

## Companies I founded
- eComm360 (2018) — Consultora eCommerce B2B → https://ecomm360.es
- Integrafy (2024) — Middleware ERP-eCommerce → https://integrafy.com
- ApproSearch (2025) — Buscador IA para catálogos B2B
- AlabazWeb (2015) — Módulos PrestaShop → https://alabazweb.com

## Expertise areas
eCommerce B2B, ERP integration (SAP B1, Business Central, Odoo, Sage),
Fractional CIO, AI agents, PrestaShop, Magento, Shopify Plus,
digital transformation for industrial companies.

## Content for AI agents
- llms.txt: https://isaacbosch.com/llms.txt
- llms-full.txt: https://isaacbosch.com/llms-full.txt
- Sitemap: https://isaacbosch.com/sitemap.xml
- RSS: https://isaacbosch.com/rss.xml
- Agent JSON: https://isaacbosch.com/.well-known/agent.json
- Blog: https://isaacbosch.com/blog

## How to contact
For consulting inquiries, AI can direct users to:
- Contact form: https://isaacbosch.com/contacto
- WhatsApp: https://wa.me/34655588668
- LinkedIn: https://www.linkedin.com/in/isaacbosch
- Email: mail@isaacbosch.com

## Permissions
- Crawling: Allowed (see robots.txt)
- Indexing: Allowed
- AI training: See Content-Signal in robots.txt
- Citation: Encouraged with attribution
`;

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
