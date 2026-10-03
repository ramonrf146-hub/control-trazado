# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Antes de empezar
Leé `ESTADO_ACTUAL.md` (raíz del repo) antes de hacer cualquier tarea — tiene el contexto de qué se hizo último, qué queda pendiente y las convenciones del sitio.

@AGENTS.md

## Comandos

```bash
npm install                        # node_modules no está versionado
npm run dev                        # servidor de desarrollo (localhost:3000)
npm run build                      # build de producción
npm run lint                       # ESLint (flat config: next/core-web-vitals + next/typescript)
npm run actualizar-productos       # corre scripts/actualizar-productos.mjs contra PA-API real
npm run actualizar-productos:mock  # mismo script sin llamar a la API
```

No hay suite de tests configurada. Antes de commitear cualquier cambio a
`data/productos.json` o a código, correr `npm run build` (la convención del
repo, ver `ESTADO_ACTUAL.md`, es no commitear si el build falla).

Para `npm run actualizar-productos` sin `--mock` hacen falta
`AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_PARTNER_TAG` en
`.env.local` (copiar de `.env.local.example`).

## Arquitectura

Sitio de afiliados de Amazon (Next.js 16, App Router, TypeScript, Tailwind
v4) **sin base de datos** — todo vive versionado en el repo:

- **`data/productos.json`** es la única fuente de verdad del catálogo.
  El acceso está aislado detrás de `getProductos()` en
  `src/lib/productos.ts`; si el catálogo migra algún día a una base de
  datos, solo cambia la implementación interna de esa función, no sus
  consumidores.
- **`content/{articulos,paginas}[-en]/*.md`** es el contenido editorial
  (Markdown + frontmatter), leído por `src/lib/contenido.ts` con
  `gray-matter` + `remark`. Usa `sanitize:false` en `remark-html` porque el
  HTML embebido (iframes de YouTube) es contenido propio del repo, no
  input de usuarios.

**Dos categorías fijas**, definidas en `src/lib/categorias.ts` /
`src/lib/tipos.ts` (`CategoriaSlug`): `automatizacion-hogar-inteligente` y
`control-industrial-b2b`. Se propagan desde ahí a filtros, navegación y
páginas de categoría.

**i18n manual, sin librería**: `src/lib/i18n.ts` define diccionarios ES/EN
y `t(es, en, locale)` (español es siempre el fallback si falta
traducción). `src/proxy.ts` — el equivalente de `middleware.ts` en
Next.js 16 (ver `AGENTS.md`) — reescribe internamente las rutas sin
prefijo hacia `/es/...` para que el español nunca muestre `/es` en la URL,
mientras que `/en/...` pasa directo. Las páginas localizadas viven bajo
`src/app/[lang]/`.

**Panel admin** (`/admin`, protegido por `src/proxy.ts` +
`src/lib/adminAuth.ts`): login con password + token de sesión HMAC propio
(cookie `admin_session`, sin JWT ni librería externa). Los cambios desde
el panel (precio, `activo`, `notaTecnica`) se escriben directo en GitHub
vía la Contents API (`src/lib/githubContenido.ts`, requiere
`GITHUB_TOKEN`) en vez del filesystem local, para que el commit resultante
dispare el redeploy de Vercel. `src/app/api/admin/productos/route.ts` es
de solo lectura y sí lee el archivo desplegado directamente.

**Actualización mensual del catálogo**
(`scripts/actualizar-productos.mjs` + `scripts/lib/{firmarPaApi,
paapiCliente}.mjs`): consulta PA-API 5.0 por los ASINs curados en
`scripts/config/asins-por-categoria.json` y reescribe
`data/productos.json`, preservando `notaTecnica`, `activo` y `precioMax`
de los productos que ya existían. Corre por cron de GitHub Actions
(`.github/workflows/actualizar-productos.yml`, día 1 de cada mes) porque
el filesystem de una función serverless de Vercel es de solo lectura en
producción — `src/app/api/cron/actualizar-productos/route.ts` no corre el
script, solo dispara ese workflow vía `repository_dispatch`.

**`scripts/agente-clasificador/`** es una herramienta de triage aparte,
no conectada al pipeline: preclasifica listas grandes de productos por
palabra clave antes de la curación manual, no toca `data/productos.json`.

## Convenciones del catálogo

(Detalle completo y con ejemplos reales en `ESTADO_ACTUAL.md`.)

- Todo producto nuevo: entrada bilingüe ES/EN siguiendo el schema de
  `src/lib/tipos.ts` (`Producto`), con al menos una limitación real
  declarada en la nota técnica.
- Preferir enriquecer huecos ya declarados en los artículos en vez de
  agregar productos arbitrarios.
- Rechazar productos genéricos o sin historial de reseñas real aunque
  encajen perfecto en un hueco de contenido.
- Pausar un producto (`"activo": false`) en vez de borrarlo cuando deja de
  convertir; borrar del array solo cuando es definitivo.
