import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import {
	getEmDashCollection,
	getEmDashEntry,
	getTaxonomyTerms,
} from "emdash";

export const prerender = false;

const __dirname = dirname(fileURLToPath(import.meta.url));

// === Font loading (cached at module level) ===
let cachedFraunces: ArrayBuffer | null = null;
let cachedInter: ArrayBuffer | null = null;

async function loadFonts() {
	if (cachedFraunces && cachedInter) {
		return { fraunces: cachedFraunces, inter: cachedInter };
	}
	const fontsDir = join(__dirname, "..", "..", "..", "public", "fonts");
	const [fraunces, inter] = await Promise.all([
		readFile(join(fontsDir, "Fraunces-600.ttf")),
		readFile(join(fontsDir, "Inter-500.ttf")),
	]);
	cachedFraunces = fraunces.buffer.slice(
		fraunces.byteOffset,
		fraunces.byteOffset + fraunces.byteLength,
	);
	cachedInter = inter.buffer.slice(
		inter.byteOffset,
		inter.byteOffset + inter.byteLength,
	);
	return { fraunces: cachedFraunces, inter: cachedInter };
}

// === Title resolver per type ===
async function resolveTitle(
	type: string,
	slug: string,
): Promise<{ eyebrow: string; title: string }> {
	const fallbackEyebrow = type.toUpperCase();

	try {
		if (type === "blog") {
			const result = await getEmDashEntry("posts", slug);
			if (result?.entry?.data?.title) {
				return { eyebrow: "BLOG", title: result.entry.data.title };
			}
		} else if (type === "servicio") {
			const result = await getEmDashEntry("services", slug);
			if (result?.entry?.data?.title) {
				return { eyebrow: "SERVICIO", title: result.entry.data.title };
			}
		} else if (type === "proyecto") {
			const result = await getEmDashEntry("projects", slug);
			if (result?.entry?.data?.title) {
				return { eyebrow: "PROYECTO", title: result.entry.data.title };
			}
		} else if (type === "page") {
			// Static page slugs
			const PAGE_TITLES: Record<string, { eyebrow: string; title: string }> = {
				home: { eyebrow: "ISAAC BOSCH", title: "Transformacion digital industrial para vender y operar mejor" },
				"sobre-isaac": { eyebrow: "SOBRE MI", title: "Sobre Isaac Bosch" },
				clientes: { eyebrow: "CLIENTES", title: "He trabajado con marcas como estas" },
				prensa: { eyebrow: "PRENSA", title: "Apariciones en medios" },
				contacto: { eyebrow: "CONTACTO", title: "Hablamos" },
				servicios: { eyebrow: "SERVICIOS", title: "Como puedo ayudarte" },
				proyectos: { eyebrow: "PROYECTOS", title: "Mi ecosistema propio" },
				blog: { eyebrow: "BLOG", title: "Notas sobre eCommerce B2B, IA y automatizacion" },
				"fractional-cio": { eyebrow: "SERVICIO", title: "Fractional CIO para pymes industriales" },
				recursos: { eyebrow: "RECURSOS", title: "Recursos para empresas B2B" },
				newsletter: { eyebrow: "NEWSLETTER", title: "eCommNotes - Newsletter" },
			};
			if (PAGE_TITLES[slug]) return PAGE_TITLES[slug];
			// Try the pages collection
			const result = await getEmDashEntry("pages", slug);
			if (result?.entry?.data?.title) {
				return { eyebrow: "ISAAC BOSCH", title: result.entry.data.title };
			}
		}
	} catch (err) {
		console.error("[og] resolve error", err);
	}

	return {
		eyebrow: fallbackEyebrow,
		title: "Isaac Bosch — Consultor eCommerce B2B y Fractional CIO",
	};
}

// === Truncation helper ===
function truncate(str: string, max: number): string {
	if (!str) return "";
	if (str.length <= max) return str;
	return str.slice(0, max - 1).trimEnd() + "…";
}

// === OG image template ===
function buildTemplate(eyebrow: string, title: string) {
	return {
		type: "div",
		props: {
			style: {
				display: "flex",
				flexDirection: "column",
				width: "1200px",
				height: "630px",
				background: "#faf9f5",
				padding: "80px",
				fontFamily: "Inter",
				color: "#141413",
				position: "relative",
			},
			children: [
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							fontSize: "24px",
							fontWeight: 500,
							color: "#1B5585",
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							marginBottom: "40px",
						},
						children: eyebrow,
					},
				},
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							fontFamily: "Fraunces",
							fontSize: title.length > 60 ? "60px" : title.length > 40 ? "72px" : "84px",
							fontWeight: 600,
							lineHeight: 1.05,
							letterSpacing: "-0.02em",
							color: "#141413",
							maxWidth: "1040px",
							flexGrow: 1,
						},
						children: title,
					},
				},
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: "40px",
							borderTop: "2px solid rgba(20, 20, 19, 0.12)",
							paddingTop: "32px",
						},
						children: [
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										flexDirection: "column",
									},
									children: [
										{
											type: "div",
											props: {
												style: {
													display: "flex",
													fontFamily: "Fraunces",
													fontSize: "32px",
													fontWeight: 600,
													color: "#141413",
													letterSpacing: "-0.01em",
												},
												children: "Isaac Bosch",
											},
										},
										{
											type: "div",
											props: {
												style: {
													display: "flex",
													fontSize: "20px",
													color: "#6b6b6b",
													marginTop: "4px",
												},
												children: "Consultor eCommerce B2B · Fractional CIO",
											},
										},
									],
								},
							},
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										fontFamily: "Fraunces",
										fontSize: "20px",
										fontStyle: "italic",
										color: "#1B5585",
									},
									children: "Del dato al pedido. Sin fricciones.",
								},
							},
						],
					},
				},
			],
		},
	};
}

export const GET: APIRoute = async ({ params }) => {
	const slugParam = params.slug ?? "";
	const parts = slugParam.replace(/\.png$/, "").split("/").filter(Boolean);

	if (parts.length < 2) {
		return new Response("Bad path: expected /og/{type}/{slug}.png", {
			status: 400,
		});
	}

	const [type, ...slugParts] = parts;
	const slug = slugParts.join("/");

	try {
		const { fraunces, inter } = await loadFonts();
		const { eyebrow, title } = await resolveTitle(type, slug);

		const truncatedTitle = truncate(title, 110);

		const svg = await satori(buildTemplate(eyebrow, truncatedTitle) as never, {
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Inter",
					data: inter,
					weight: 500,
					style: "normal",
				},
				{
					name: "Fraunces",
					data: fraunces,
					weight: 600,
					style: "normal",
				},
			],
		});

		const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
			.render()
			.asPng();

		return new Response(png, {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (err) {
		console.error("[og] generation error", err);
		return new Response("OG generation failed", { status: 500 });
	}
};
