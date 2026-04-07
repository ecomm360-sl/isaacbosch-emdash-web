/**
 * Authority signals for Isaac Bosch website.
 *
 * REVISAR Y CONFIRMAR ANTES DE PUBLICAR.
 * Estos valores son placeholders del rediseño estratégico (abril 2026).
 * Isaac debe validar/ajustar cada campo antes de poner la web en producción.
 */

export interface EcosystemProduct {
	name: string;
	tagline: string;
	description: string;
	url: string | null;
	year: string;
}

export const authority = {
	// Proyectos eCommerce ejecutados
	integrationsCount: "1000+",

	// Anos de experiencia en el sector eCommerce
	yearsExperience: "15+",

	// Sectores atendidos (orden importa, primero los mas representativos)
	sectorsServed: [
		"Industria",
		"Construccion",
		"Retail",
		"Alimentacion",
		"Bebidas",
		"Mueble",
		"Personalizados",
		"Moda",
		"Banca",
		"Electrodomesticos",
		"Informatica",
		"Hogar",
	],

	// Total proyectos completados
	projectsCompleted: "1000+",

	// REVISAR — Confirmar URLs y descripciones
	ecosystemProducts: [
		{
			name: "eComm360",
			tagline: "Consultora eCommerce B2B",
			description:
				"Consultora especializada en eCommerce B2B industrial. Mas de 15 anos liderando proyectos de digitalizacion del canal de ventas para fabricantes y distribuidores.",
			url: "https://ecomm360.es",
			year: "2018",
		},
		{
			name: "Integrafy",
			tagline: "Middleware ERP-eCommerce",
			description:
				"Plataforma de integracion bidireccional entre sistemas ERP (SAP, Odoo, Business Central) y plataformas de eCommerce. Cien conectores listos para produccion.",
			url: "https://integrafy.io",
			year: "2024",
		},
		{
			name: "Approsearch",
			tagline: "Buscador IA para catalogos B2B",
			description:
				"Motor de busqueda con inteligencia artificial para catalogos industriales extensos. Disena experiencias de descubrimiento adaptadas al comprador profesional.",
			url: null,
			year: "2025",
		},
		{
			name: "Alabazweb",
			tagline: "Modulos PrestaShop",
			description:
				"Marca historica de modulos PrestaShop para B2B y procesos comerciales avanzados. Adquirida e integrada en el ecosistema eComm360.",
			url: "https://alabazweb.com",
			year: "2015",
		},
	] as EcosystemProduct[],
} as const;
