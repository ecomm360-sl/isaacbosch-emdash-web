import type { APIRoute } from "astro";
import { SITE_URL } from "../data/site-meta";

export const prerender = false;

export const GET: APIRoute = () => {
	const body = `# Isaac Bosch

> Consultor eCommerce B2B y Fractional CIO en Barcelona. Transformacion digital industrial: integracion ERP, automatizacion con IA, eCommerce B2B sobre PrestaShop, Shopify y Magento. Mas de 15 anos y 1000+ proyectos eCommerce ejecutados. Fundador del Grupo eCommsistema (eComm360, Integrafy, ApproSearch, AlabazWeb).

Isaac Bosch ayuda a empresas industriales y distribuidoras a digitalizar su canal de ventas, integrar sistemas ERP con eCommerce y aplicar inteligencia artificial a procesos comerciales. Trabaja como consultor en proyectos cerrados y como Fractional CIO part-time para pymes que necesitan criterio C-level sin asumir el coste de un perfil full-time.

## Servicios

- [Consultoria eCommerce B2B Industrial](${SITE_URL}/servicios/consultoria-ecommerce-b2b): Estrategia, implementacion e integracion ERP para empresas industriales sobre PrestaShop, Shopify Plus y Adobe Commerce.
- [Consultor de Agentes IA y Automatizaciones](${SITE_URL}/servicios/consultor-agentes-ia-automatizaciones): Diseno e implementacion de agentes de IA autonomos sobre OpenAI, Claude, LangChain, n8n, Make y Python.
- [Integracion ERP - eCommerce](${SITE_URL}/servicios/integracion-erp-ecommerce): Conexion bidireccional con SAP Business One, SAP S/4HANA, Microsoft Dynamics 365 Business Central, Sage 200, Sage X3 y Odoo.
- [Formacion Empresarial en Digitalizacion](${SITE_URL}/servicios/formacion-empresarial-digitalizacion): Programas In-Company, online y mentoring 1:1 en eCommerce, IA aplicada y transformacion digital.
- [Fractional CIO](${SITE_URL}/fractional-cio): Direccion tecnologica part-time para empresas industriales de 20 a 200 personas.

## Sobre Isaac

- [Sobre Isaac Bosch](${SITE_URL}/sobre-isaac): Biografia, trayectoria profesional, principios y formacion.
- [Mi ecosistema propio](${SITE_URL}/proyectos): eComm360, AlabazWeb, eCommRocket, Integrafy, ApproSearch, KPIeCommerce y tiendas propias (Parafarmacia Vegana, Cesquis, Tusamigos).
- [Clientes](${SITE_URL}/clientes): 117+ marcas en 12 sectores. Damm, Cofidis, Cetelem, Caixa, RACC, Vichy Catalan, Cirsa, Intersport, Brownie, PD Paola, Hoffmann, Kibuc, Madden, Wonders, Habitium, Harley-Davidson, Vicens Vives y muchas mas.

## Blog

- [Blog completo](${SITE_URL}/blog): Articulos sobre eCommerce B2B, integracion ERP, IA aplicada al negocio y transformacion digital industrial.
- Categorias: [Estrategia B2B](${SITE_URL}/blog/categoria/estrategia-b2b), [Integracion ERP](${SITE_URL}/blog/categoria/integracion-erp), [Tecnologia](${SITE_URL}/blog/categoria/tecnologia), [Reflexiones](${SITE_URL}/blog/categoria/reflexiones).

## Contacto

- [Contacto](${SITE_URL}/contacto): Formulario, telefono, WhatsApp, LinkedIn y email.
- Telefono: +34 655 588 668
- Email: mail@isaacbosch.com
- LinkedIn: https://linkedin.com/in/isaacbosch
- Ubicacion: Barcelona, Espana

## Recursos para LLMs

- [Contenido completo del sitio (markdown)](${SITE_URL}/llms-full.txt)
`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
