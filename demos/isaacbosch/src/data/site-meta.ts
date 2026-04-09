/**
 * Site-wide metadata constants used by SEO helpers, schemas and OG images.
 *
 * REVISAR: cuando isaacbosch.com esté apuntando aquí, mantener esa URL.
 * Mientras tanto cambia SITE_URL al dominio Easypanel si quieres URLs absolutas
 * coherentes en sitemap.xml, llms.txt, etc.
 */

export const SITE_URL = "https://isaacbosch.com";
export const SITE_NAME = "Isaac Bosch";
export const SITE_TITLE = "Isaac Bosch — Consultor eCommerce B2B y Fractional CIO";
export const SITE_DESCRIPTION =
	"Transformación digital industrial para vender y operar mejor. Consultor eCommerce B2B, integración ERP e IA aplicada. Fractional CIO en Barcelona.";
export const SITE_LOCALE = "es_ES";
export const SITE_LANG = "es";

export const TWITTER_HANDLE = "@isaacbosch";
export const LINKEDIN_URL = "https://linkedin.com/in/isaacbosch";
export const TWITTER_URL = "https://x.com/isaacbosch";

export const PHONE_E164 = "+34655588668";
export const PHONE_DISPLAY = "+34 655 588 668";
export const EMAIL = "mail@isaacbosch.com";

export const ADDRESS = {
	streetAddress: "Pla. Urquinaona, 6, 14B",
	addressLocality: "Barcelona",
	postalCode: "08010",
	addressRegion: "Cataluña",
	addressCountry: "ES",
} as const;

export const FOUNDED_YEAR = "2012";
export const SLOGAN = "Del dato al pedido. Sin fricciones.";

export const SAME_AS = [
	LINKEDIN_URL,
	TWITTER_URL,
	"https://ecomm360.es",
	"https://ecommsistema.com",
	"https://integrafy.io",
	"https://alabazweb.com",
] as const;

export const KNOWS_ABOUT = [
	"eCommerce B2B",
	"Integración ERP",
	"PrestaShop",
	"Magento",
	"Shopify Plus",
	"SAP Business One",
	"SAP S/4HANA",
	"Microsoft Dynamics 365 Business Central",
	"Sage 200",
	"Sage X3",
	"Odoo",
	"Fractional CIO",
	"Inteligencia Artificial aplicada al negocio",
	"Agentes IA",
	"Transformación digital industrial",
	"Automatización de procesos comerciales",
] as const;

export const SERVICES_CATALOG = [
	{
		name: "Consultoría eCommerce B2B Industrial",
		slug: "consultoria-ecommerce-b2b",
		url: `${SITE_URL}/servicios/consultoria-ecommerce-b2b`,
	},
	{
		name: "Consultor de Agentes de IA y Automatizaciones",
		slug: "consultor-agentes-ia-automatizaciones",
		url: `${SITE_URL}/servicios/consultor-agentes-ia-automatizaciones`,
	},
	{
		name: "Integración ERP - eCommerce",
		slug: "integracion-erp-ecommerce",
		url: `${SITE_URL}/servicios/integracion-erp-ecommerce`,
	},
	{
		name: "Formación Empresarial en Digitalización",
		slug: "formacion-empresarial-digitalizacion",
		url: `${SITE_URL}/servicios/formacion-empresarial-digitalizacion`,
	},
	{
		name: "Fractional CIO para pymes industriales",
		slug: "fractional-cio",
		url: `${SITE_URL}/fractional-cio`,
	},
] as const;
