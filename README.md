# BRAIN — Sitio corporativo

Sitio web de BRAIN, empresa de soluciones de inteligencia artificial. Next.js 15 (App Router) + React 19 + TypeScript, sin dependencias de UI externas.

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compilación de producción
npm start          # servir la compilación
```

Verificación visual y de consola (requiere Google Chrome instalado):

```bash
npm run build && npm start &
node scripts/verify.mjs      # capturas en scripts/shots/, comprueba 200/404, un H1 por página, sin scroll horizontal, sin errores de consola
```

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `app/` | Rutas: `/`, `/soluciones` (+4 servicios), `/empresa`, `/productos/lazo`, `/productos/nodra`, `/contacto`, 404 |
| `app/globals.css` | Sistema visual: tokens de color, tipografía, componentes, movimiento, `prefers-reduced-motion` |
| `components/` | Compartidos: Header, Footer, Breadcrumbs, Tabs, Accordion, Reveal, Cta, ProductSubnav, ServicePage |
| `components/home/` | HeroMotion (recorrido animado Contexto → Propuesta → Revisión), HeroNetwork, NeedsSelector |
| `components/lazo/`, `components/nodra/` | Demos ilustrativas de producto |
| `content/site.ts` | Textos de navegación, servicios, productos, opciones de interés |
| `content/contact.ts` | Configuración del envío del formulario |
| `lib/metadata.ts` | Metadatos SEO y sociales por página |
| `public/brand/` | Logo aprobado: `brain-logo.svg` (negro, en uso), `brain-logo-blanco.svg` (para fondos oscuros), `brain-icon.png` (favicon, solo el símbolo) |

El contenido de cada página está en su `page.tsx` como constantes al inicio del archivo, para editarlo sin tocar el diseño.

## Hosting (S3 + CloudFront, brainia.mx)

El sitio es 100 % estático (`output: 'export'`). No necesita servidor Node.

- Comando de build: `npm ci && npm run build`
- Carpeta a publicar: `out/`
- Cada ruta es `carpeta/index.html` (`trailingSlash: true`), así que S3 la resuelve con el *default root object* `index.html` por carpeta (origen tipo *website endpoint*, o una CloudFront Function que añada `/index.html` a las rutas sin extensión).
- Página de error: respuesta 404 → `/404.html` con código 404.
- Dominio canónico: `https://brainia.mx` sin `www`. Redirigir `www.brainia.mx` → `brainia.mx` (301).
- Certificado ACM en `us-east-1` para CloudFront con ambos nombres.
- `sitemap.xml`, `robots.txt` y `og.png` se generan en el build.
- Tras cada despliegue: invalidar `/*` en CloudFront.

## Pendientes para publicar

1. **Formulario de contacto.** No existe destino de envío. Configurar `endpoint` en `content/contact.ts` (endpoint propio, servicio de formularios o CRM). Hasta entonces el formulario valida pero avisa de que el envío no está activo; nunca simula un envío exitoso.
2. **Perfiles sociales.** No definidos; no se enlazan. El dominio, el canónico y la imagen Open Graph (`scripts/og.mjs` → `public/og.png`) ya están configurados.
3. **Favicon.** `brain-icon.png` se recortó del PNG original. Si se quiere en vectorial, extraer solo el símbolo del `brain-logo.svg`.
4. **Datos de contacto.** No se publican correo, teléfono, dirección ni plazo de respuesta. Añadirlos en `app/contacto/page.tsx` y en el pie cuando se decidan.
5. **Modelo comercial de LAZO.** No se publican tarifas ni el modelo "sin licencias por asiento" de la fuente: requiere validación comercial.
6. **Integraciones de LAZO.** La tabla distingue importación, integración por proyecto y conexión futura. La lista concreta de herramientas compatibles debe confirmarse antes de nombrar ninguna.
7. **Documento `brain-subpaginas-para-claude.txt`.** No estaba en el paquete recibido. LAZO y Nodra se redactaron a partir de la especificación; conviene contrastar con el documento de productos si aparece.
8. **Aviso de privacidad y términos.** No existen páginas legales; el pie no las enlaza para no crear enlaces vacíos.
