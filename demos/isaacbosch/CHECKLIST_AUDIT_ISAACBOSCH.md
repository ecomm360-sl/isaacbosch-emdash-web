# Checklist audit isaacbosch.com — Abril 2026

Basado en el audit del 8 de abril (CMO Agent + 7 especialistas).
Nota global de partida: **5.1/10**.

---

## P0 — Hotfix (hoy)

- [x] Corregir tildes en todo el sitio (11 archivos + seed.json, ~700 reemplazos)
- [x] Signos de apertura ¿ en preguntas
- [x] Sitemap: settings.url = https://isaacbosch.com en seed
- [x] Person schema en home (antes solo en /sobre-isaac)
- [x] Eliminar WebSite schema duplicado
- [x] FAQPage schema en 2 posts de "preguntas frecuentes"
- [x] FAQPage schema en home (5 problemas → 5 Q&A)
- [ ] **Desbloquear bots IA en Cloudflare** → Security → Bots → AI Scrapers
- [ ] **Activar HSTS en Cloudflare** → SSL/TLS → Edge Certificates → HSTS → max-age=31536000
- [ ] **Charset UTF-8 en header** → Cloudflare → Transform Rules → Content-Type: text/html; charset=UTF-8
- [ ] **Reset DB en Easypanel** → `rm /data/data.db*` → Restart (aplica seed actualizado)

---

## P1 — Schema completo (semana 1)

- [x] Article/BlogPosting con autor Person @id (EmDash core + seo.ts)
- [x] Service schema en cada servicio (ya existía en [slug].astro)
- [x] HowTo schema en /blog/cuanto-cuesta-montar-ecommerce-b2b (7 pasos)
- [x] BreadcrumbList en blog y servicios (ya existía)
- [x] Speakable schema en blog posts
- [ ] Verificar schemas con Google Rich Results Test (home, blog post FAQ, blog post HowTo, servicio, sobre-isaac)

---

## P2 — Tracking (semana 1-2)

- [x] Slots de GTM + GA4 + LinkedIn Insight + Clarity en Base.astro (condicionales por env var)
- [x] Preconnects condicionales a dominios de tracking
- [ ] **Crear contenedor GTM** en tagmanager.google.com → copiar GTM-ID
- [ ] **Crear propiedad GA4** en analytics.google.com → copiar G-ID
- [ ] **Crear LinkedIn Insight Tag** en linkedin.com/campaignmanager → copiar Partner ID
- [ ] **Crear proyecto Clarity** en clarity.microsoft.com → copiar Project ID
- [ ] **Añadir env vars en Easypanel**: PUBLIC_GTM_ID, PUBLIC_GA4_ID, PUBLIC_LINKEDIN_PARTNER_ID, PUBLIC_CLARITY_PROJECT_ID → **Redeploy**
- [ ] Verificar con Google Tag Assistant que GTM y GA4 disparan correctamente
- [ ] Configurar eventos en GTM: `cta_click`, `scroll_depth_75`, `service_page_view`, `contact_page_arrival`

---

## P3 — Performance polish (semana 1)

- [x] fetchpriority=high en imagen LCP del hero
- [ ] **Cache Rule en Cloudflare** para HTML (TTFB de 180ms a ~30ms) → ver POST_DEPLOY_MANUAL_STEPS.md
- [ ] Verificar Polish + WebP + Brotli activos en Cloudflare → Speed → Optimization

---

## P4 — Trust signals B2B (semanas 2-4)

- [x] ClientLogosStrip: 14 logos featured en home (grayscale → color)
- [x] Testimonials: componente con 3 placeholders en home
- [x] CaseStudy: componente con 5 casos (1 por servicio) en páginas de servicio
- [ ] **Rellenar testimonios reales** en `src/data/testimonials.ts` (necesita permiso del cliente)
- [ ] **Rellenar casos de éxito reales** en `src/data/case-studies.ts` (verificar métricas)
- [ ] Foto retrato real en lugar de ilustración (decisión personal)

---

## P5 — Conversión (semanas 3-4)

- [x] Calendly/Cal.com opcional vía env var PUBLIC_CALENDLY_URL
- [ ] **Crear cuenta Calendly** → configurar slot "Diagnóstico 45 min" → copiar URL → añadir en Easypanel env vars → Redeploy
- [ ] Implementar WhatsApp Business flotante en home y servicios
- [ ] Mejorar copy CTAs: "Solicitar diagnóstico" → "Reserva tu diagnóstico de 45 min sin compromiso →"
- [ ] Evaluar microform inline en homepage (nombre + email + servicio) como alternativa al enlace a /contacto

---

## P6 — UX y Legal (semanas 3-4)

- [x] Skip-to-content link (WCAG 2.4.1 nivel A)
- [x] Footer con bloque legal (aviso legal, privacidad, cookies)
- [x] Página /aviso-legal (plantilla con [REVISAR])
- [x] Página /politica-privacidad (plantilla con [REVISAR])
- [x] Página /politica-cookies (plantilla con [REVISAR])
- [ ] **Validar textos legales con asesor** → completar NIF/CIF, datos registrales, encargados de tratamiento
- [ ] Verificar mobile UX: CTAs hero, grid de sectores, menú hamburguesa
- [ ] Lighthouse A11y ≥ 95 en todas las páginas

---

## P7 — Lead magnet y nurturing (mes 2)

- [ ] Definir lead magnet: "Guía: los 8 KPIs de eCommerce B2B" / "Checklist: 15 señales de tu integración ERP" / "Calculadora ROI"
- [ ] Crear landing page con formulario de descarga
- [ ] Diseñar secuencia email nurturing (4-5 emails en 2 semanas → oferta diagnóstico)
- [ ] Conectar con Resend o herramienta de email marketing

---

## P8 — LinkedIn Ads validación (mes 2-3)

- [ ] Prerequisito: tracking completo (GTM + LinkedIn Insight activo)
- [ ] Definir audiencias: CIO, CTO, IT Director, Director de Operaciones
- [ ] Sectores: Manufacturing, Construcción, Wholesale, Industrial Automation
- [ ] Tamaño empresa: 50-500 empleados
- [ ] Geo: España + Portugal
- [ ] Formato: Document Ads (guías técnicas descargables) + Lead Gen Forms con diagnóstico
- [ ] Presupuesto validación: 500-800€/mes durante 2 meses
- [ ] Medir CPL, calidad de leads, pipeline generado

---

## P9 — Cluster de contenido (meses 2-6)

Cadencia: 1-2 artículos/mes. Cada artículo termina con CTA "diagnóstico 45 min".

### Cluster 1 — eCommerce B2B
- [x] Guía completa eCommerce B2B 2025 (post-1)
- [x] ¿Cuánto cuesta montar un eCommerce B2B? (post-20)
- [x] Preguntas frecuentes eCommerce B2B (post-18)
- [x] Consultor para empresas industriales (post-21)
- [x] 15+ años como consultor eCommerce B2B (post-22)
- [ ] Cómo elegir plataforma eCommerce B2B en 2025
- [ ] Cómo convencer a dirección de invertir en eCommerce B2B
- [ ] Errores más comunes en proyectos eCommerce B2B
- [ ] Cómo medir el ROI de un portal B2B

### Cluster 2 — Integración ERP-eCommerce
- [x] Integración ERP-eCommerce: por qué es crítica (post-11)
- [x] Integración SAP con eCommerce (post-12)
- [x] Odoo y eCommerce B2B (post-13)
- [x] 7 errores en integración ERP-eCommerce (post-14)
- [ ] Cómo conectar Business Central con Shopify
- [ ] Cuánto cuesta una integración ERP-eCommerce
- [ ] Middleware vs conector nativo: cuándo usar cada uno
- [ ] Los 5 problemas más comunes en integraciones ERP-eCommerce

### Cluster 3 — Fractional CIO (nicho menos competido en español)
- [ ] Qué es un Fractional CIO y qué hace
- [ ] Diferencia entre CIO, CTO y Fractional CIO
- [ ] Cuánto cuesta un Fractional CIO en España
- [ ] Cuándo necesita una empresa un Fractional CIO
- [ ] Qué hace un Fractional CIO en los primeros 90 días

### Cluster 4 — Agentes IA empresas B2B
- [x] Preguntas frecuentes IA en empresas (post-19)
- [x] Agentes de IA para eCommerce (post-6)
- [x] Cómo automatizar atención al cliente con IA (post-7)
- [ ] Qué es un agente IA y cómo funciona
- [ ] Casos de uso IA en empresas industriales B2B
- [ ] Cómo automatizar la gestión de pedidos con IA

---

## P10 — Distribución continua

- [ ] Cada artículo publicado → post en LinkedIn orgánico (adaptado, no copy-paste)
- [ ] Cada artículo → newsletter (cuando esté activa)
- [ ] Cada artículo → tweet/X con thread si da para ello
- [ ] **Primer post LinkedIn recomendado por el audit**: "Llevo semanas auditando sitios de clientes y diciéndoles que arreglen su robots.txt. Acabo de revisar el mío y tenía el mismo problema." La autocrítica honesta en B2B convierte.

---

## Google Search Console

- [ ] Dar de alta isaacbosch.com en Search Console
- [ ] Verificar propiedad (DNS TXT o HTML file)
- [ ] Enviar sitemap: https://isaacbosch.com/sitemap.xml
- [ ] Verificar cobertura de indexación
- [ ] Monitorizar errores de rastreo semanalmente

---

## Nota final del audit

> "El sitio está **muy bien construido**. No es rescate, es polish. La
> distancia entre el potencial y el estado actual es **muy fácil de
> cerrar** — las correcciones críticas son configuración, no desarrollo."

Puntuación objetivo tras aplicar P0-P6: **8-9/10**.

---

*Copia este archivo a Notion o tu gestor de tareas preferido.*
