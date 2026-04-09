# Pasos manuales tras el despliegue (post-audit)

Estos pasos NO son tocables desde el código y deben hacerse a mano en
Easypanel y Cloudflare después de mergear los cambios del plan
post-audit.

---

## 1. Reset de la DB para aplicar el seed actualizado

El seed (`seed/seed.json`) ha cambiado mucho: tildes, FAQ schema en
posts, settings.url, redirects nuevos, dos posts nuevos. Para que se
aplique en el contenedor de Easypanel hay que borrar la DB persistente
y dejar que el entrypoint la regenere desde cero.

```bash
# En la consola del contenedor en Easypanel:
rm /data/data.db /data/data.db-wal /data/data.db-shm
```

Después → Easypanel → **Restart** la app. El entrypoint:

1. Detecta que `/data/data.db` no existe → primer arranque.
2. Ejecuta `emdash init` (migraciones) y `emdash seed` con el seed
   actualizado.
3. Crea el admin desde `ADMIN_EMAIL` env var (debe estar definida).
4. Imprime un magic link en los logs.

> ⚠️ **Esto borra cualquier contenido editado a mano desde el admin.**
> Si has añadido posts/páginas/contenido manualmente desde el admin
> y NO está en `seed.json`, **lo perderás**. Asegúrate de que todo lo
> que quieres mantener está en el seed antes de borrar.

---

## 2. Variables de entorno en Easypanel

Easypanel → tu app → pestaña **Environment** → añadir/verificar:

```env
# Ya configuradas (verificar que siguen ahí):
SITE_URL=https://isaacbosch.com
EMDASH_DB_URL=file:/data/data.db
EMDASH_UPLOADS_DIR=/data/uploads
ADMIN_EMAIL=mail@isaacbosch.com
RESEND_API_KEY=...
RESEND_FROM=Isaac Bosch <hola@isaacbosch.com>
CONTACT_EMAIL_TO=mail@isaacbosch.com

# Nuevas (TRACKING - el plan deja el código preparado):
PUBLIC_GTM_ID=GTM-XXXXXXX
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_LINKEDIN_PARTNER_ID=XXXXXXX
PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXXX

# Opcional (CALENDLY si se quiere CTA directo):
PUBLIC_CALENDLY_URL=https://calendly.com/isaacbosch/diagnostico
```

Después de añadir/cambiar env vars → **Redeploy** la app (no basta con
restart, los `PUBLIC_*` se inyectan en build time).

---

## 3. Cloudflare — Desbloquear bots IA (P0 del audit)

Cloudflare Dashboard → **Security** → **Bots** → **AI Scrapers and
Crawlers** → desactivar el bloqueo de:

- GPTBot (ChatGPT / SearchGPT)
- ClaudeBot (Claude)
- Google-Extended (Gemini / AI Overviews)
- Applebot-Extended (Apple Intelligence)
- PerplexityBot (Perplexity)
- CCBot (Common Crawl) — opcional, este es el que más entrenamiento
  masivo permite, decisión consciente
- Bytespider (TikTok AI)
- Amazonbot (Alexa AI)
- meta-externalagent (Meta AI)

**Verificación**: `curl https://isaacbosch.com/robots.txt` no debe tener
bloques `Disallow: /` para esos user-agents.

---

## 4. Cloudflare — HSTS (P1 del audit)

Cloudflare → **SSL/TLS** → **Edge Certificates** → **HTTP Strict
Transport Security (HSTS)** → activar:

- Max Age Header: `12 months` (`max-age=31536000`)
- Apply HSTS policy to subdomains: opcional según uses subdominios.
- Preload: dejar OFF al inicio (para preload list hay que estar 100%
  seguro de que todo está en HTTPS).

**Verificación**: `curl -I https://isaacbosch.com | grep -i strict-transport`
debe devolver el header `strict-transport-security: max-age=31536000`.

---

## 5. Cloudflare — Cache Rule para HTML (P2 del audit)

Cloudflare → **Rules** → **Cache Rules** → **Create rule**:

- **Name**: `Cache HTML`
- **If incoming requests match**:
  - `Hostname equals isaacbosch.com`
  - AND `URI Path does not start with /_emdash/`
  - AND `URI Path does not start with /api/`
  - AND `URI Path does not start with /og/`
- **Then**:
  - Cache eligibility: **Eligible for cache**
  - Edge TTL: `Override cache TTL by rule` → `1 hour`
  - Browser TTL: `Override existing headers` → `5 minutes`

**Resultado**: TTFB de ~180ms a ~30ms global. Verificar con
`curl -I https://isaacbosch.com | grep cf-cache-status`. La segunda
visita debe devolver `HIT`.

---

## 6. Cloudflare — Charset UTF-8 en Content-Type header

Cloudflare → **Rules** → **Transform Rules** → **Modify Response
Header** → **Create rule**:

- **Name**: `Add charset UTF-8 to HTML`
- **If incoming responses match**:
  - `Hostname equals isaacbosch.com`
  - AND `Response Content-Type starts with text/html`
- **Then**:
  - Set static: `Content-Type` = `text/html; charset=UTF-8`

(Astro ya emite `<meta charset="UTF-8">` pero el header HTTP también
ayuda y no se puede cambiar fácilmente desde el adapter Node
standalone.)

---

## 7. Verificación end-to-end

Después de todos los pasos, verificar manualmente:

### Tildes y contenido
- [ ] Home → H1 dice "Transformación digital industrial".
- [ ] Hero → "Empresario desde los 20 años".
- [ ] Cualquier H2/H3 con tildes correctas (Cómo, Diagnóstico, etc.).
- [ ] Footer → enlaces a aviso-legal, política-privacidad,
      política-cookies funcionan.

### Sitemap y robots
- [ ] `curl -s https://isaacbosch.com/sitemap.xml | head -20` debe
      mostrar `<loc>https://isaacbosch.com/...</loc>` en todas las URLs.
- [ ] `curl https://isaacbosch.com/robots.txt` debe terminar con
      `Sitemap: https://isaacbosch.com/sitemap.xml` y NO bloquear
      bots IA (después del paso Cloudflare).

### Schemas (Google Rich Results Test)
- [ ] Validar [home](https://search.google.com/test/rich-results?url=https://isaacbosch.com): debe detectar `Person`, `Organization`, `ProfessionalService`, `WebSite`, `FAQPage`.
- [ ] Validar [/sobre-isaac](https://search.google.com/test/rich-results?url=https://isaacbosch.com/sobre-isaac): `Person` global + `BreadcrumbList`.
- [ ] Validar [/blog/cuanto-cuesta-montar-ecommerce-b2b](https://search.google.com/test/rich-results?url=https://isaacbosch.com/blog/cuanto-cuesta-montar-ecommerce-b2b): `Article` + `HowTo`.
- [ ] Validar [/blog/preguntas-frecuentes-ia-empresas](https://search.google.com/test/rich-results?url=https://isaacbosch.com/blog/preguntas-frecuentes-ia-empresas): `Article` + `FAQPage`.

### WebSite único
- [ ] `curl -s https://isaacbosch.com | grep -c '"@type":"WebSite"'`
      debe devolver `1`, no `2`.

### Tracking
- [ ] DevTools → Network: con env vars puestas, debe haber requests a
      `googletagmanager.com`, `google-analytics.com`, `snap.licdn.com`,
      `clarity.ms`.
- [ ] Google Tag Assistant en verde para GTM y GA4.

### A11y
- [ ] Tab desde la URL → primer foco visible debe ser
      "Saltar al contenido principal" arriba.
- [ ] Lighthouse A11y ≥ 95.

### Redirects
- [ ] `https://isaacbosch.com/consultor-empresas` → 301 →
      `/blog/consultor-empresas`.
- [ ] `https://isaacbosch.com/experiencia-consultor` → 301 →
      `/blog/experiencia-consultor`.
- [ ] `https://isaacbosch.com/prensa` → 301 → `/medios`.

### Lighthouse
- [ ] SEO: 100/100 en home, blog post, página de servicio.
- [ ] Performance: ≥ 95 (puede bajar un poco si tracking activo).
- [ ] Best Practices: ≥ 95.
- [ ] A11y: ≥ 95.

---

## 8. Pendientes editoriales (no de código)

Estos cambios necesitan tu input directo:

- [ ] **Testimonios reales** en `src/data/testimonials.ts`. Los actuales
      son placeholders `[REVISAR]`. Sustituir por testimonios reales con
      nombre, cargo, empresa y autorización del cliente.
- [ ] **Casos de éxito reales** en `src/data/case-studies.ts`. Los
      datos actuales son inferencias plausibles del audit pero no
      verificadas. Sustituir por métricas reales de proyectos.
- [ ] **Aviso legal**: completar el NIF/CIF y, si operas a través de una
      sociedad mercantil (Grupo eCommsistema), añadir los datos
      registrales (Registro Mercantil, número de inscripción).
- [ ] **Política de privacidad**: revisar listado de encargados de
      tratamiento si tienes algún CRM, gestoría, herramienta de email
      marketing adicional, etc.
- [ ] **Política de cookies**: verificar que el listado coincide con
      las cookies que efectivamente carga el sitio cuando los IDs de
      tracking estén activos.
- [ ] **FAQs en posts del blog**: las preguntas y respuestas en el seed
      vienen del audit. Revisar las cifras de precios y plazos para que
      coincidan con tu experiencia real (puede que algunos rangos haya
      que ajustarlos).
- [ ] **Pasos del HowTo en `/blog/cuanto-cuesta-montar-ecommerce-b2b`**:
      están en `src/pages/blog/[slug].astro`. Si quieres ajustar los
      rangos de precio o los pasos, edítalo allí.

---

*Generado tras aplicar el plan post-audit `silly-churning-simon.md`.*
