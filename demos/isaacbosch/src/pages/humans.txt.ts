import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
	const body = `/* TEAM */
Founder & Consultant: Isaac Bosch
Site:    https://isaacbosch.com
Twitter: @isaacbosch
LinkedIn: linkedin.com/in/isaacbosch
Location: Barcelona, Spain

/* THANKS */
EmDash CMS — https://emdashcms.com
Astro — https://astro.build

/* SITE */
Last update: ${new Date().toISOString().slice(0, 10)}
Language: Spanish
Doctype: HTML5
Components: Astro, EmDash, Resend, Satori
Standards: HTML5, CSS3, JSON-LD, Schema.org, Open Graph, Twitter Cards
`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
