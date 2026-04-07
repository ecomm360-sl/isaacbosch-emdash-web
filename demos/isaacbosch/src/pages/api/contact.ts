import type { APIRoute } from "astro";

export const prerender = false;

interface ContactPayload {
	name: string;
	email: string;
	company?: string;
	subject?: string;
	message: string;
	// Honeypot field — must be empty
	website?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECT_LABELS: Record<string, string> = {
	"consultoria-b2b": "Consultoria eCommerce B2B",
	"fractional-cio": "Fractional CIO",
	"otro": "Otra consulta",
};

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function jsonResponse(body: unknown, status: number): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

export const POST: APIRoute = async ({ request }) => {
	let payload: ContactPayload;
	try {
		payload = (await request.json()) as ContactPayload;
	} catch {
		return jsonResponse({ error: "INVALID_JSON" }, 400);
	}

	// Honeypot — silently accept but do nothing
	if (payload.website && payload.website.trim().length > 0) {
		return jsonResponse({ ok: true }, 200);
	}

	const name = String(payload.name ?? "").trim();
	const email = String(payload.email ?? "").trim();
	const company = String(payload.company ?? "").trim();
	const subject = String(payload.subject ?? "").trim();
	const message = String(payload.message ?? "").trim();

	if (!name || name.length < 2 || name.length > 100) {
		return jsonResponse({ error: "INVALID_NAME" }, 400);
	}
	if (!email || !EMAIL_REGEX.test(email) || email.length > 200) {
		return jsonResponse({ error: "INVALID_EMAIL" }, 400);
	}
	if (!message || message.length < 10 || message.length > 4000) {
		return jsonResponse({ error: "INVALID_MESSAGE" }, 400);
	}

	const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
	const fromAddress =
		import.meta.env.RESEND_FROM ||
		process.env.RESEND_FROM ||
		"Isaac Bosch <onboarding@resend.dev>";
	const toAddress =
		import.meta.env.CONTACT_EMAIL_TO ||
		process.env.CONTACT_EMAIL_TO ||
		"hola@isaacbosch.com";

	if (!apiKey) {
		console.error("[contact] Missing RESEND_API_KEY env var");
		return jsonResponse({ error: "SERVER_NOT_CONFIGURED" }, 500);
	}

	const subjectLabel = SUBJECT_LABELS[subject] ?? "Consulta general";
	const emailSubject = `[Web] ${subjectLabel} - ${name}`;

	const html = `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #141413; line-height: 1.6;">
			<h2 style="font-size: 20px; margin: 0 0 24px; border-bottom: 1px solid #e9e9e7; padding-bottom: 12px;">Nuevo mensaje desde isaacbosch.com</h2>
			<table style="width: 100%; border-collapse: collapse;">
				<tr><td style="padding: 8px 0; color: #87867f; width: 100px;">Nombre</td><td style="padding: 8px 0; font-weight: 500;">${escapeHtml(name)}</td></tr>
				<tr><td style="padding: 8px 0; color: #87867f;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #1B5585;">${escapeHtml(email)}</a></td></tr>
				${company ? `<tr><td style="padding: 8px 0; color: #87867f;">Empresa</td><td style="padding: 8px 0;">${escapeHtml(company)}</td></tr>` : ""}
				<tr><td style="padding: 8px 0; color: #87867f;">Tipo</td><td style="padding: 8px 0;">${escapeHtml(subjectLabel)}</td></tr>
			</table>
			<div style="margin-top: 24px; padding: 16px; background: #f5f4ed; border-radius: 8px; border-left: 3px solid #1B5585;">
				<div style="font-size: 12px; color: #87867f; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Mensaje</div>
				<div style="white-space: pre-wrap;">${escapeHtml(message)}</div>
			</div>
			<p style="margin-top: 24px; font-size: 12px; color: #87867f;">Enviado desde el formulario de contacto de isaacbosch.com</p>
		</div>
	`;

	const text = [
		`Nuevo mensaje desde isaacbosch.com`,
		``,
		`Nombre: ${name}`,
		`Email: ${email}`,
		company ? `Empresa: ${company}` : null,
		`Tipo: ${subjectLabel}`,
		``,
		`Mensaje:`,
		message,
	]
		.filter(Boolean)
		.join("\n");

	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: fromAddress,
				to: [toAddress],
				reply_to: email,
				subject: emailSubject,
				html,
				text,
			}),
		});

		if (!response.ok) {
			const errBody = await response.text().catch(() => "");
			console.error("[contact] Resend API error", response.status, errBody);
			return jsonResponse({ error: "EMAIL_FAILED" }, 502);
		}

		return jsonResponse({ ok: true }, 200);
	} catch (err) {
		console.error("[contact] Resend fetch failed", err);
		return jsonResponse({ error: "EMAIL_FAILED" }, 502);
	}
};
