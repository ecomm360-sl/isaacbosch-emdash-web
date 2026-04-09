/**
 * Casos de éxito por servicio — placeholders.
 *
 * REVISAR — Pendiente de validación con métricas reales y autorización
 * del cliente. NO publicar nombres concretos sin permiso explícito; usar
 * descripción anónima del sector cuando aplica un NDA.
 */

export interface CaseStudy {
	sector: string;
	companySize: string;
	situation: string;
	intervention: string;
	result: string;
	metric: string; // Resultado cuantificado destacado
}

export const caseStudies: Record<string, CaseStudy> = {
	"consultoria-ecommerce-b2b": {
		sector: "Distribución industrial",
		companySize: "150 empleados, 8M€ facturación",
		situation:
			"Procesaban 200 pedidos diarios manualmente. Comerciales saturados, errores de transcripción del 6%, plazo medio de 3 días entre la solicitud del cliente y la confirmación.",
		intervention:
			"Diseño y puesta en marcha de portal B2B con catálogo personalizado por cliente, precios contratados, stock real y envío directo al ERP. Migración progresiva en 4 olas durante 5 meses.",
		result:
			"En el mes 4 después del go-live, el 78% de los pedidos entraban directamente por el portal sin intervención manual. Los comerciales pasaron a dedicar el tiempo a clientes nuevos y desarrollo de cuenta.",
		metric: "60% reducción de pedidos manuales en 4 meses",
	},
	"integracion-erp-ecommerce": {
		sector: "Fabricante de componentes industriales",
		companySize: "80 empleados, catálogo de 12.000 SKUs",
		situation:
			"SAP Business One y Magento desconectados. Reconciliación nocturna manual, sobreventas semanales, precios desactualizados durante días, sin visibilidad real de stock para el cliente.",
		intervention:
			"Implementación de middleware bidireccional SAP B1 ↔ Magento con flujos de catálogo, precios multi-tarifa, stock en tiempo real, pedidos web → ERP y altas de cliente. Pruebas regresivas durante 3 sprints.",
		result:
			"Stock sincronizado en menos de 60 segundos. Sobreventas eliminadas. Precios actualizados al momento. El equipo recuperó las 5 horas/día que dedicaba a reconciliación.",
		metric: "0 sobreventas en 6 meses post-integración",
	},
	"consultor-agentes-ia-automatizaciones": {
		sector: "Mayorista de productos químicos",
		companySize: "45 empleados, 3.500 SKUs",
		situation:
			"El equipo de atención al cliente respondía 90 consultas/día sobre estado de pedidos, plazos y disponibilidad. El 70% eran preguntas repetitivas con respuesta directa en el ERP.",
		intervention:
			"Agente IA conectado al ERP que responde por email y WhatsApp consultas frecuentes con datos en vivo. Escalado a humano cuando detecta intención compleja o cuenta estratégica.",
		result:
			"El agente resuelve el 65% de las consultas sin intervención humana. El equipo de atención dedica las horas recuperadas a cuentas grandes y proactividad comercial.",
		metric: "65% de consultas resueltas por IA sin tocar al equipo",
	},
	"formacion-empresarial-digitalizacion": {
		sector: "Grupo industrial multisectorial",
		companySize: "320 empleados, 4 unidades de negocio",
		situation:
			"Equipo comercial sin formación digital homogénea. Resistencia al uso del CRM, procesos comerciales basados en hojas de cálculo personales y pérdida de información en cada cambio de comercial.",
		intervention:
			"Programa formativo a medida de 8 sesiones bonificable por Fundae. Casos del propio negocio, ejercicios sobre datos reales, seguimiento mensual durante 6 meses post-formación.",
		result:
			"Adopción del CRM del 35% al 88% en 6 meses. Información comercial centralizada. Ciclo de venta acortado en un 22% por mejor seguimiento de oportunidades.",
		metric: "Adopción del CRM del 35% al 88% en 6 meses",
	},
	"fractional-cio": {
		sector: "Fabricante industrial mediano",
		companySize: "120 empleados, presencia en ES, PT e IT",
		situation:
			"Responsable IT operativo sin perfil estratégico. Proveedores tomando decisiones de arquitectura sin contraparte. Sin roadmap tecnológico a 3 años. Inversiones reactivas sin criterio C-level.",
		intervention:
			"Fractional CIO 1 día/semana durante 12 meses. Auditoría de stack, definición del roadmap, governance de proveedores, comité tecnológico mensual con dirección y validación de inversiones >20k€.",
		result:
			"Roadmap aprobado por dirección con 3 olas a 18 meses. Dos decisiones técnicas importantes evitadas (migración ERP precipitada y plataforma eCommerce inadecuada al sector). Ahorro estimado >150k€ en errores no cometidos.",
		metric: "Ahorro estimado >150k€ en decisiones técnicas evitadas",
	},
};
