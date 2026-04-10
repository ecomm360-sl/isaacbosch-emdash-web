/**
 * Custom sitemap — extends EmDash's content-only sitemap with static
 * pages, taxonomy archives, and proper exclusions.
 *
 * Strategy (Opción B from SEO audit):
 * - Home + strategic pages + content posts/services/projects
 * - Categories included (content clusters)
 * - Tags excluded (low SEO value)
 * - Legal pages excluded (noindex candidate)
 */

import type { APIRoute } from "astro";
import { sql } from "kysely";
import { getTaxonomyTerms } from "emdash";

export const prerender = false;

const STATIC_PAGES: Array<[string, string, string]> = [
	["/", "weekly", "1.0"],
	["/servicios", "monthly", "0.8"],
	["/proyectos", "monthly", "0.8"],
	["/clientes", "monthly", "0.7"],
	["/medios", "monthly", "0.7"],
	["/blog", "weekly", "0.8"],
	["/sobre-isaac", "monthly", "0.7"],
	["/contacto", "monthly", "0.6"],
	["/fractional-cio", "monthly", "0.8"],
];

const EXCLUDE_SLUGS = new Set(["privacidad", "recursos", "newsletter"]);

function esc(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const GET: APIRoute = async ({ locals, url }) => {
	const emdash = (locals as { emdash?: { db?: unknown; config?: { site?: string } } }).emdash;
	const db = emdash?.db as import("kysely").Kysely<Record<string, unknown>> | undefined;

	if (!db) {
		return new Response("<!-- DB not available -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" },
		});
	}

	try {
		// Resolve site URL from settings or request
		let siteUrl = url.origin;
		try {
			const row = await sql<{ value: string }>`
				SELECT value FROM options WHERE name = 'site:url'
			`.execute(db);
			if (row.rows[0]?.value) {
				siteUrl = JSON.parse(row.rows[0].value).replace(/\/$/, "");
			}
		} catch { /* use url.origin */ }

		const today = new Date().toISOString().split("T")[0];
		const entries: string[] = [];

		// 1. Static pages
		for (const [path, freq, prio] of STATIC_PAGES) {
			entries.push(`  <url>
    <loc>${esc(`${siteUrl}${path}`)}</loc>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`);
		}

		// 2. CMS content from SEO-enabled collections
		try {
			const collections = await sql<{
				slug: string;
				url_pattern: string | null;
			}>`
				SELECT slug, url_pattern FROM _emdash_collections WHERE has_seo = 1
			`.execute(db);

			for (const col of collections.rows) {
				const tableName = `ec_${col.slug}`;
				try {
					const rows = await sql<{
						slug: string | null;
						id: string;
						updated_at: string;
					}>`
						SELECT c.slug, c.id, c.updated_at
						FROM ${sql.ref(tableName)} c
						LEFT JOIN _emdash_seo s
							ON s.collection = ${col.slug}
							AND s.content_id = c.id
						WHERE c.status = 'published'
						AND c.deleted_at IS NULL
						AND (s.seo_no_index IS NULL OR s.seo_no_index = 0)
						ORDER BY c.updated_at DESC
					`.execute(db);

					for (const row of rows.rows) {
						const identifier = row.slug || row.id;
						if (EXCLUDE_SLUGS.has(identifier)) continue;

						let path: string;
						if (col.url_pattern) {
							path = col.url_pattern
								.replace("{slug}", identifier)
								.replace("{id}", identifier);
						} else {
							path = `/${col.slug}/${identifier}`;
						}

						entries.push(`  <url>
    <loc>${esc(`${siteUrl}${path}`)}</loc>
    <lastmod>${row.updated_at?.split("T")[0] || today}</lastmod>
  </url>`);
					}
				} catch {
					// Table missing — skip
				}
			}
		} catch {
			// No collections — skip
		}

		// 3. Categories (content clusters — SEO value)
		try {
			const categories = await getTaxonomyTerms("category");
			for (const cat of categories) {
				entries.push(`  <url>
    <loc>${esc(`${siteUrl}/blog/categoria/${cat.slug}`)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
			}
		} catch {
			// No categories — skip
		}

		// Tags excluded per Opción B (low SEO value for consultancy site)

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

		return new Response(xml, {
			status: 200,
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("[SITEMAP]", error);
		return new Response("<!-- Error -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" },
		});
	}
};
