/**
 * /.well-known/security.txt — RFC 9116
 * https://securitytxt.org/
 */
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 1);

	const body = `# Security policy for isaacbosch.com
# https://securitytxt.org/

Contact: mailto:mail@isaacbosch.com
Contact: https://isaacbosch.com/contacto
Expires: ${expires.toISOString()}
Preferred-Languages: es, en
Canonical: https://isaacbosch.com/.well-known/security.txt
Policy: https://isaacbosch.com/politica-privacidad
`;

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
