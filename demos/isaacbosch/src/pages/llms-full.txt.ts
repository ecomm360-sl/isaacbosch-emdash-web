import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";
import type { PortableTextBlock } from "emdash";
import { SITE_URL } from "../data/site-meta";

export const prerender = false;

/**
 * Render Portable Text blocks to plain markdown text.
 * Handles standard blocks (paragraph, h1-h6, blockquote) and inline marks
 * (strong/em). Custom block types (site.timeline, site.faq, etc.) are
 * flattened to readable markdown sections so LLMs can consume the content.
 */
function renderPortableTextToMarkdown(blocks: PortableTextBlock[] | undefined): string {
	if (!blocks || !Array.isArray(blocks)) return "";
	const out: string[] = [];

	for (const block of blocks) {
		if (!block || typeof block !== "object") continue;
		const type = (block as { _type?: string })._type;

		if (type === "block") {
			const b = block as {
				style?: string;
				children?: Array<{ _type: string; text?: string; marks?: string[] }>;
			};
			const text = (b.children ?? [])
				.filter((c) => c._type === "span" && typeof c.text === "string")
				.map((c) => {
					const t = c.text ?? "";
					if (c.marks?.includes("strong")) return `**${t}**`;
					if (c.marks?.includes("em")) return `*${t}*`;
					return t;
				})
				.join("");
			const trimmed = text.trim();
			if (!trimmed) continue;
			switch (b.style) {
				case "h1":
					out.push(`# ${trimmed}`);
					break;
				case "h2":
					out.push(`## ${trimmed}`);
					break;
				case "h3":
					out.push(`### ${trimmed}`);
					break;
				case "h4":
					out.push(`#### ${trimmed}`);
					break;
				case "blockquote":
					out.push(`> ${trimmed}`);
					break;
				default:
					out.push(trimmed);
			}
			continue;
		}

		// Custom site blocks — flatten to readable text
		if (type === "site.faq") {
			const faq = block as {
				headline?: string;
				items?: Array<{ question: string; answer: string }>;
			};
			if (faq.headline) out.push(`## ${faq.headline}`);
			for (const item of faq.items ?? []) {
				out.push(`**${item.question}**`);
				out.push(item.answer);
			}
			continue;
		}
		if (type === "site.timeline") {
			const tl = block as {
				headline?: string;
				items?: Array<{
					year?: string;
					title?: string;
					company?: string;
					description?: string;
				}>;
			};
			if (tl.headline) out.push(`## ${tl.headline}`);
			for (const item of tl.items ?? []) {
				const parts = [
					item.year && `**${item.year}**`,
					item.title,
					item.company && `(${item.company})`,
				]
					.filter(Boolean)
					.join(" — ");
				if (parts) out.push(parts);
				if (item.description) out.push(item.description);
			}
			continue;
		}
		if (type === "site.cta") {
			const cta = block as {
				headline?: string;
				description?: string;
				primaryCta?: { label?: string; url?: string };
			};
			if (cta.headline) out.push(`## ${cta.headline}`);
			if (cta.description) out.push(cta.description);
			if (cta.primaryCta?.label) {
				out.push(
					`→ [${cta.primaryCta.label}](${cta.primaryCta.url ?? ""})`,
				);
			}
		}
	}

	return out.join("\n\n");
}

export const GET: APIRoute = async () => {
	const sections: string[] = [];

	sections.push(`# Isaac Bosch — Contenido completo del sitio`);
	sections.push(
		`> Documento generado para crawlers de IA (Perplexity, ChatGPT, Claude, Gemini). Contiene el contenido textual integro de las paginas, servicios, proyectos y blog de ${SITE_URL}.`,
	);
	sections.push(
		`> Ultima actualizacion: ${new Date().toISOString().slice(0, 10)}`,
	);

	// === About / Pages ===
	try {
		const { entries: pages } = await getEmDashCollection("pages");
		for (const page of pages) {
			if (page.id === "privacidad") continue;
			sections.push(`---`);
			sections.push(`# ${page.data.title ?? page.id}`);
			sections.push(`URL: ${SITE_URL}/${page.id}`);
			const md = renderPortableTextToMarkdown(page.data.content);
			if (md) sections.push(md);
		}
	} catch (err) {
		console.error("[llms-full] pages error", err);
	}

	// === Services ===
	try {
		const { entries: services } = await getEmDashCollection("services", {
			orderBy: { order: "asc" },
		});
		const sorted = [...services].sort(
			(a, b) => (a.data.order ?? 99) - (b.data.order ?? 99),
		);
		sections.push(`---`);
		sections.push(`# Servicios`);
		for (const service of sorted) {
			sections.push(`## ${service.data.title}`);
			sections.push(`URL: ${SITE_URL}/servicios/${service.id}`);
			if (service.data.summary) sections.push(service.data.summary);
			const md = renderPortableTextToMarkdown(service.data.content);
			if (md) sections.push(md);
		}
	} catch (err) {
		console.error("[llms-full] services error", err);
	}

	// === Projects ===
	try {
		const { entries: projects } = await getEmDashCollection("projects");
		sections.push(`---`);
		sections.push(`# Proyectos del ecosistema`);
		for (const project of projects) {
			sections.push(`## ${project.data.title}`);
			sections.push(`Tipo: ${project.data.client ?? "Proyecto"}`);
			if (project.data.year) sections.push(`Periodo: ${project.data.year}`);
			sections.push(`URL: ${SITE_URL}/proyectos/${project.id}`);
			if (project.data.summary) sections.push(project.data.summary);
			const md = renderPortableTextToMarkdown(project.data.content);
			if (md) sections.push(md);
		}
	} catch (err) {
		console.error("[llms-full] projects error", err);
	}

	// === Blog ===
	try {
		const { entries: posts } = await getEmDashCollection("posts", {
			orderBy: { published_at: "desc" },
		});
		sections.push(`---`);
		sections.push(`# Blog`);
		for (const post of posts) {
			sections.push(`## ${post.data.title}`);
			sections.push(`URL: ${SITE_URL}/blog/${post.id}`);
			if (post.data.publishedAt) {
				const date =
					post.data.publishedAt instanceof Date
						? post.data.publishedAt.toISOString().slice(0, 10)
						: String(post.data.publishedAt).slice(0, 10);
				sections.push(`Fecha: ${date}`);
			}
			if (post.data.excerpt) sections.push(`> ${post.data.excerpt}`);
			const md = renderPortableTextToMarkdown(post.data.content);
			if (md) sections.push(md);
		}
	} catch (err) {
		console.error("[llms-full] posts error", err);
	}

	const body = sections.join("\n\n");

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
