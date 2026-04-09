/**
 * Testimonios de clientes — placeholders.
 *
 * REVISAR — Pendiente de confirmación con clientes reales antes de publicar.
 *
 * Reglas de uso:
 * - Solo testimonios con autorización explícita del cliente.
 * - Nombre + cargo + empresa siempre verificables.
 * - Cita literal de 2-3 frases sobre un resultado o aspecto concreto.
 * - Foto opcional pero recomendada (subir a /public/testimonios/).
 */

export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	sector?: string;
	photo?: { src: string; alt: string };
}

export const testimonials: Testimonial[] = [
	// REVISAR — placeholder pendiente de confirmación
	{
		quote:
			"Isaac entendió en la primera reunión lo que llevábamos dos años intentando explicar a otras consultoras. En seis meses teníamos el portal B2B en producción y los pedidos automatizados.",
		author: "[Nombre del cliente]",
		role: "Director de Operaciones",
		company: "[Empresa industrial — pendiente confirmación]",
		sector: "Industrial",
	},
	// REVISAR — placeholder pendiente de confirmación
	{
		quote:
			"Pasamos de procesar 200 pedidos manuales al día a tener todo el flujo conectado al ERP en automático. El ROI llegó en menos de un año.",
		author: "[Nombre del cliente]",
		role: "CIO",
		company: "[Empresa distribuidora — pendiente confirmación]",
		sector: "Distribución",
	},
	// REVISAR — placeholder pendiente de confirmación
	{
		quote:
			"Su rol como Fractional CIO nos dio el criterio C-level que no podíamos pagar full-time. Nos ayudó a evitar dos decisiones técnicas que nos habrían costado un año de retraso.",
		author: "[Nombre del cliente]",
		role: "CEO",
		company: "[PYME industrial — pendiente confirmación]",
		sector: "Manufactura",
	},
];
