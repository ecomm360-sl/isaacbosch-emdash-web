/**
 * SEO helpers — pure functions that build JSON-LD schemas and meta utilities.
 *
 * Use these from page templates and from Base.astro to keep schemas consistent.
 * All builders return plain JSON-LD objects ready to be serialized.
 */

import {
	ADDRESS,
	EMAIL,
	FOUNDED_YEAR,
	KNOWS_ABOUT,
	PHONE_E164,
	SAME_AS,
	SERVICES_CATALOG,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	SLOGAN,
} from "../data/site-meta";

export type JsonLd = Record<string, unknown>;

// ===== Utilities =====

export function abs(path: string): string {
	if (!path) return SITE_URL;
	if (path.startsWith("http")) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getCanonicalUrl(astroUrl: URL): string {
	// Strip query string, normalize trailing slash (no trailing slash for non-root)
	const pathname = astroUrl.pathname.replace(/\/$/, "") || "/";
	return `${SITE_URL}${pathname}`;
}

export function truncate(str: string, max: number): string {
	if (!str) return "";
	if (str.length <= max) return str;
	return str.slice(0, max - 1).trimEnd() + "…";
}

// ===== OG image URL builder =====

export type OgPageType = "page" | "blog" | "servicio" | "proyecto";

export function buildOgImageUrl(opts: {
	type: OgPageType;
	slug: string;
}): string {
	const safeSlug = opts.slug.replace(/^\/+|\/+$/g, "") || "home";
	return `${SITE_URL}/og/${opts.type}/${safeSlug}.png`;
}

// ===== Person schema =====

const PERSON_REF = `${SITE_URL}/sobre-isaac#person`;
const ORG_REF = `${SITE_URL}#organization`;
const PROFESSIONAL_SERVICE_REF = `${SITE_URL}#service`;
const WEBSITE_REF = `${SITE_URL}#website`;

export function buildPersonSchema(): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": PERSON_REF,
		name: "Isaac Bosch",
		givenName: "Isaac",
		familyName: "Bosch",
		jobTitle: "Consultor eCommerce B2B y Fractional CIO",
		description:
			"Consultor en eCommerce B2B, integración ERP y arquitectura digital. Empresario desde los 20 años. Fundador de eComm360, Integrafy, ApproSearch y Alabazweb.",
		url: SITE_URL,
		image: `${SITE_URL}/isaac-portrait.jpg`,
		address: {
			"@type": "PostalAddress",
			addressLocality: ADDRESS.addressLocality,
			addressRegion: ADDRESS.addressRegion,
			addressCountry: ADDRESS.addressCountry,
		},
		worksFor: { "@id": ORG_REF },
		knowsAbout: [...KNOWS_ABOUT],
		alumniOf: [
			{
				"@type": "EducationalOrganization",
				name: "EAE Business School",
				url: "https://www.eae.es/",
			},
			{
				"@type": "EducationalOrganization",
				name: "EADA Business School",
				url: "https://www.eada.edu/",
			},
		],
		memberOf: [
			{ "@type": "Organization", name: "Observatorio eCommerce" },
			{ "@type": "Organization", name: "AJE Madrid" },
		],
		founder: [
			{ "@type": "Organization", name: "eComm360", url: "https://ecomm360.es" },
			{ "@type": "Organization", name: "Integrafy", url: "https://integrafy.io" },
			{ "@type": "Organization", name: "ApproSearch" },
			{ "@type": "Organization", name: "AlabazWeb", url: "https://alabazweb.com" },
		],
		sameAs: [...SAME_AS],
	};
}

// ===== Organization schema (Grupo eCommsistema) =====

export function buildOrganizationSchema(): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": ORG_REF,
		name: "Grupo eCommsistema",
		alternateName: ["eComm360", "eCommsistema"],
		url: "https://ecommsistema.com",
		logo: `${SITE_URL}/og-default.png`,
		founder: { "@id": PERSON_REF },
		foundingDate: FOUNDED_YEAR,
		slogan: SLOGAN,
		address: {
			"@type": "PostalAddress",
			...ADDRESS,
		},
		contactPoint: {
			"@type": "ContactPoint",
			telephone: PHONE_E164,
			contactType: "sales",
			areaServed: "ES",
			availableLanguage: ["es", "ca", "en"],
			email: EMAIL,
		},
		sameAs: [...SAME_AS],
	};
}

// ===== ProfessionalService schema (Isaac as service provider) =====

export function buildProfessionalServiceSchema(): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		"@id": PROFESSIONAL_SERVICE_REF,
		name: "Isaac Bosch — Consultor eCommerce B2B y Fractional CIO",
		alternateName: "Isaac Bosch Consulting",
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		telephone: PHONE_E164,
		email: EMAIL,
		image: `${SITE_URL}/isaac-portrait.jpg`,
		priceRange: "$$$",
		areaServed: [
			{ "@type": "Country", name: "Spain" },
			{ "@type": "Place", name: "Europe" },
		],
		address: {
			"@type": "PostalAddress",
			...ADDRESS,
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 41.3899,
			longitude: 2.1738,
		},
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "09:00",
				closes: "18:00",
			},
		],
		founder: { "@id": PERSON_REF },
		foundingDate: FOUNDED_YEAR,
		slogan: SLOGAN,
		knowsAbout: [...KNOWS_ABOUT],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Servicios profesionales",
			itemListElement: SERVICES_CATALOG.map((s, i) => ({
				"@type": "Offer",
				position: i + 1,
				itemOffered: {
					"@type": "Service",
					name: s.name,
					url: s.url,
					provider: { "@id": PERSON_REF },
				},
			})),
		},
		sameAs: [...SAME_AS],
	};
}

// ===== WebSite schema with SearchAction (Sitelinks search) =====
//
// NOTE: EmDash core auto-emits a basic WebSite schema via EmDashHead.
// This builder is kept for cases where a richer WebSite schema (with
// SearchAction) is desired — but it must NOT be inyectado in Base.astro
// to avoid duplicating the @type: WebSite block.

export function buildWebSiteSchema(): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": WEBSITE_REF,
		url: SITE_URL,
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		inLanguage: "es-ES",
		publisher: { "@id": ORG_REF },
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

// ===== BreadcrumbList =====

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export function buildBreadcrumbList(items: BreadcrumbItem[]): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: abs(item.url),
		})),
	};
}

// ===== Service schema (per service detail) =====

export interface ServiceData {
	name: string;
	description: string;
	url: string;
	slug: string;
	keywords?: string[];
}

export function buildServiceSchema(service: ServiceData): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: service.name,
		description: service.description,
		url: abs(service.url),
		serviceType: service.name,
		provider: { "@id": PERSON_REF },
		areaServed: [
			{ "@type": "Country", name: "Spain" },
			{ "@type": "Place", name: "Europe" },
		],
		audience: {
			"@type": "BusinessAudience",
			audienceType: "Empresas industriales y distribuidoras B2B",
		},
		...(service.keywords && service.keywords.length > 0
			? { keywords: service.keywords.join(", ") }
			: {}),
	};
}

// ===== ItemList for listing pages =====

export interface ListItem {
	name: string;
	url: string;
	description?: string;
	image?: string;
}

export function buildItemListSchema(opts: {
	name: string;
	description?: string;
	items: ListItem[];
}): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: opts.name,
		...(opts.description ? { description: opts.description } : {}),
		numberOfItems: opts.items.length,
		itemListElement: opts.items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: abs(item.url),
			name: item.name,
			...(item.description ? { description: item.description } : {}),
			...(item.image ? { image: abs(item.image) } : {}),
		})),
	};
}

// ===== Article schema (BlogPosting enriched) =====

export interface ArticleData {
	title: string;
	description: string;
	url: string;
	slug: string;
	datePublished?: string | null;
	dateModified?: string | null;
	image?: string | null;
	keywords?: string[];
	wordCount?: number;
	articleSection?: string;
}

export function buildArticleSchema(article: ArticleData): JsonLd {
	const url = abs(article.url);
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: { "@type": "WebPage", "@id": url },
		headline: article.title,
		description: article.description,
		url,
		...(article.image ? { image: abs(article.image) } : {}),
		...(article.datePublished ? { datePublished: article.datePublished } : {}),
		...(article.dateModified
			? { dateModified: article.dateModified }
			: article.datePublished
				? { dateModified: article.datePublished }
				: {}),
		author: { "@id": PERSON_REF },
		publisher: { "@id": ORG_REF },
		inLanguage: "es-ES",
		...(article.keywords && article.keywords.length > 0
			? { keywords: article.keywords.join(", ") }
			: {}),
		...(article.wordCount ? { wordCount: article.wordCount } : {}),
		...(article.articleSection ? { articleSection: article.articleSection } : {}),
	};
}

// ===== FAQPage schema =====

export interface FaqItem {
	question: string;
	answer: string;
}

export function buildFaqPageSchema(items: FaqItem[]): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

// ===== Speakable schema for AEO =====

export function buildSpeakableSchema(cssSelectors: string[]): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		speakable: {
			"@type": "SpeakableSpecification",
			cssSelector: cssSelectors,
		},
	};
}

// ===== ContactPage schema =====

export function buildContactPageSchema(): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contacto Isaac Bosch",
		url: `${SITE_URL}/contacto`,
		mainEntity: { "@id": PERSON_REF },
	};
}
