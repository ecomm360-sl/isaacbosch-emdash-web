/**
 * /schema.json — Consolidated JSON-LD schema for the site
 *
 * Single endpoint that returns ALL structured data schemas in one
 * request. Useful for AI agents, validators, and tools that want
 * the complete semantic graph without parsing HTML.
 */
import type { APIRoute } from "astro";
import {
	buildPersonSchema,
	buildOrganizationSchema,
	buildProfessionalServiceSchema,
} from "../lib/seo";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "../data/site-meta";

export const prerender = false;

export const GET: APIRoute = () => {
	const graph = {
		"@context": "https://schema.org",
		"@graph": [
			// Remove @context from individual schemas since it's at root
			stripContext(buildPersonSchema()),
			stripContext(buildOrganizationSchema()),
			stripContext(buildProfessionalServiceSchema()),
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}#website`,
				url: SITE_URL,
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				inLanguage: "es-ES",
				publisher: { "@id": `${SITE_URL}#organization` },
			},
		],
	};

	return new Response(JSON.stringify(graph, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/ld+json; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};

function stripContext(schema: Record<string, unknown>): Record<string, unknown> {
	const { "@context": _, ...rest } = schema;
	return rest;
}
