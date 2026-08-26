# AutomatizaLab

Sitio de afiliados de Amazon enfocado en automatización de hogar inteligente
y control industrial B2B. Rankea mensualmente enchufes/relés WiFi (Tuya,
Matter, ESP32/Node-RED) y hardware de control industrial (variadores de
frecuencia, gateways RS485/Modbus), y monetiza con enlaces de Amazon
Associates.

Sitio hermano de [HidroLab](https://riegocom.uk) (riego residencial) —
mismo stack y mismo criterio editorial, público y catálogo completamente
separados.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Datos de producto:** `/data/productos.json`, versionado en git (ver
  [Arquitectura de datos](#arquitectura-de-datos))
- **Contenido editorial:** Markdown en `/content` (artículos y páginas)
- **Automatización mensual:** `scripts/actualizar-productos.mjs` contra la
  Amazon Product Advertising API (PA-API 5.0)
- **Analítica:** Google Analytics 4 (opcional, ver [Analítica](#analítica-ga4))

## Levantar el proyecto en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El sitio funciona out of
the box con el catálogo real incluido en `data/productos.json` — no
necesitas credenciales de PA-API para desarrollar o revisar el diseño.

## Arquitectura de datos

No hay base de datos en la nube. Todo el contenido vive versionado en el
repo:

| Ruta | Qué contiene |
|---|---|
| `/data/productos.json` | Catálogo de productos (precio, rating, imagen, ranking, y la nota técnica editorial) |
| `/content/articulos/*.md` | Artículos de guía, con frontmatter (`titulo`, `fecha`, `descripcion`, `categoria`) |
| `/content/paginas/*.md` | Contenido de "Acerca de" y "Política de privacidad" |
| `scripts/config/asins-por-categoria.json` | Lista curada de ASINs por categoría que el script mensual refresca |

El acceso a productos está aislado detrás de `getProductos()` en
[`src/lib/productos.ts`](src/lib/productos.ts). Si el catálogo crece y
decides migrar a Firestore, **solo tenés que reescribir la implementación
interna de esa función** — las páginas y componentes que la consumen
(`getProductosPorCategoria`, `ProductCard`, etc.) no cambian.

## Categorías

Solo dos, definidas en [`src/lib/categorias.ts`](src/lib/categorias.ts):

- `automatizacion-hogar-inteligente` — Enchufes, relés y controladores WiFi
  para hogar inteligente y proyectos DIY (Tuya, Matter, ESP32, Node-RED).
- `control-industrial-b2b` — Variadores de frecuencia, gateways
  RS485/Modbus y hardware de control para talleres y plantas.

## Editar contenido

### Nota técnica de un producto

Abrí `data/productos.json`, buscá el producto por `asin` y editá el campo
`notaTecnica`. Es texto plano, no Markdown. **El script mensual nunca
sobrescribe este campo si el ASIN ya existe en el catálogo** — solo lo
completa con `"[PENDIENTE DE REDACTAR]"` en productos nuevos.

### Gestionar enlaces: agregar, pausar, eliminar o rotar productos

El catálogo completo vive en `data/productos.json` — es la única fuente de
verdad, no hay base de datos aparte. Cada producto es un objeto con esta
forma (ver `src/lib/tipos.ts` para el tipo completo):

```json
{
  "asin": "B0DGXMZ9GD",
  "nombre": "...",
  "categoria": "automatizacion-hogar-inteligente",
  "precio": 13.86,
  "precioMax": 19.99,
  "moneda": "USD",
  "imagen": "https://m.media-amazon.com/images/...",
  "rating": 4.7,
  "numResenas": 957,
  "ranking": 1,
  "notaTecnica": "...",
  "urlAfiliado": "https://www.amazon.com/dp/B0DGXMZ9GD?tag=TU_PARTNER_TAG",
  "actualizadoEn": "2026-08-25",
  "activo": true
}
```

**Agregar un producto nuevo:** copiá un objeto existente de la misma
categoría, cambiá `asin`, `nombre`, `precio`, `imagen`, `rating`,
`numResenas`, `urlAfiliado` (siempre con tu Partner Tag) y escribí una
`notaTecnica` propia. Asigná el `ranking` que corresponda dentro de esa
categoría (1 = más destacado).

**Pausar un enlace sin borrarlo** (por ejemplo, dejó de convertir, el
vendedor subió mucho el precio, o querés sacarlo temporalmente mientras
evaluás un reemplazo): poné `"activo": false` en ese objeto. El producto
deja de aparecer en el sitio (home, categoría, sitemap) pero **el registro
queda en el archivo** con su `notaTecnica` y su historial — reactivalo
después con `"activo": true` sin tener que reescribir nada.

**Eliminar un producto definitivamente:** borrá el objeto completo del
array. Usalo solo cuando estés seguro de que no lo vas a volver a listar.

**Rango de precio en vez de precio fijo:** si el producto tiene variantes o
vendedores con precios distintos, agregá `precioMax` (además de `precio`,
que actúa como el mínimo del rango). La tarjeta va a mostrar
"Desde $X — $Y" en vez de un precio único.

**Flujo recomendado para rotar hardware según rendimiento de ventas:**
1. Revisá qué ASINs generan clics/ventas en Associates Central (Reports →
   Earnings Report, filtrado por el Tracking ID de este sitio — ver
   [Amazon Associates: Tracking ID propio](#amazon-associates-tracking-id-propio)).
2. Los productos con bajo rendimiento sostenido marcalos con
   `"activo": false` en vez de borrarlos.
3. Agregá los reemplazos como productos nuevos activos en la misma
   categoría, con el `ranking` que corresponda.
4. Commiteá y pusheá — Vercel redeploya solo con cada push a `main`.

### Agregar un artículo nuevo

1. Creá un archivo en `content/articulos/tu-slug.md`.
2. Agregá el frontmatter:
   ```md
   ---
   titulo: "Título del artículo"
   fecha: "2026-09-01"
   descripcion: "Descripción corta para SEO/listados."
   categoria: "automatizacion-hogar-inteligente" # opcional, debe ser un slug válido de src/lib/categorias.ts
   ---

   Contenido en Markdown...
   ```
3. El artículo aparece automáticamente en `/articulos` y en el sitemap.

### Editar "Acerca de" o "Política de privacidad"

Editá directamente `content/paginas/acerca-de.md` o
`content/paginas/privacidad.md`. Buscá las marcas `[PENDIENTE DE REDACTAR]`
para saber qué falta completar (Amazon Associates exige contenido real antes
de aprobar/mantener el sitio registrado en la cuenta).

## Amazon Associates: Tracking ID propio

Este sitio usa un **Tracking ID (Partner Tag) distinto** al de Riego
Trazado, aunque comparta la misma cuenta de Associates — así los reportes
de ventas/clics no se mezclan entre los dos sitios.

1. En [Associates Central](https://affiliate-program.amazon.com) → **Manage
   Your Websites/Apps** (o el selector de Tracking IDs) → creá un Tracking
   ID nuevo para `controltrazado.com`, declarando su tema real (Electronics
   / Industrial / Smart Home), no "Home & Garden".
2. Reemplazá `TU_PARTNER_TAG` en `data/productos.json` por ese Tracking ID
   (todas las `urlAfiliado` lo usan).
3. Usá ese mismo valor como `AMAZON_PARTNER_TAG` en las variables de entorno
   del script mensual (ver abajo).

Los umbrales de PA-API (10 ventas calificadas/30 días) y de retención de
cuenta (3 ventas/180 días) son **por cuenta**, no por sitio — las ventas de
HidroLab y AutomatizaLab suman juntas para esos límites.

## Script de actualización mensual (PA-API)

`scripts/actualizar-productos.mjs`:

1. Lee la lista curada de ASINs por categoría (`scripts/config/asins-por-categoria.json`).
2. Consulta `GetItems` de PA-API 5.0 en tandas de hasta 10 ASINs, respetando
   el límite de 1 request/segundo de cuentas nuevas.
3. Ordena cada categoría por número de reseñas (proxy de "más vendido").
4. Reescribe `data/productos.json` **preservando `notaTecnica`, `activo` y
   `precioMax`** para los ASINs que ya existían.

### Variables de entorno

Copiá `.env.local.example` a `.env.local` y completá:

```
AMAZON_ACCESS_KEY=
AMAZON_SECRET_KEY=
AMAZON_PARTNER_TAG=
```

**Nunca las hardcodees en el código.** En producción, configuralas como
secrets del repo (GitHub Actions) o variables de entorno del proyecto
(Vercel) — nunca en `vercel.json` ni committeadas.

### Correr el script

```bash
# Modo real (requiere credenciales PA-API aprobadas)
npm run actualizar-productos

# Modo simulado, sin llamar a la API
npm run actualizar-productos:mock
```

## Configurar el cron mensual

Igual que en HidroLab: **GitHub Actions** es la opción recomendada
porque puede commitear directo al repo (ya está en
`.github/workflows/actualizar-productos.yml`, `cron: "0 6 1 * *"`).

1. En GitHub: **Settings → Secrets and variables → Actions**, agregá
   `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_PARTNER_TAG`.
2. El workflow corre solo el día 1 de cada mes y commitea los cambios;
   Vercel redeploya solo al detectar el nuevo commit.
3. Podés dispararlo manualmente desde la pestaña **Actions** del repo.

Si no vas a usar la alternativa de Vercel Cron, podés borrar `vercel.json` y
`src/app/api/cron/actualizar-productos/` sin afectar nada más.

## Herramienta: agente clasificador de inventario

Vive en `scripts/agente-clasificador/` — a diferencia de en HidroLab
(donde estaba deliberadamente desconectado por no encajar con riego), acá
**sí coincide con las categorías reales del sitio**. Aun así, no está
conectado automáticamente al pipeline de `data/productos.json`: es una
herramienta de triage para cuando tenés una lista grande de productos
(por ejemplo, del catálogo de un proveedor) y querés preclasificarla antes
de curar manualmente qué entra al sitio.

```bash
node scripts/agente-clasificador/agente.mjs
node scripts/agente-clasificador/agente.mjs --fuente ruta/a/otro.json
```

Lee `scripts/agente-clasificador/config/inventario-fuente.json`, clasifica
cada item por palabra clave según
`scripts/agente-clasificador/config/reglas-clasificacion.json`, y escribe el
resultado ordenado por reseñas en
`scripts/agente-clasificador/output/inventario-clasificado.json`. Los items
que no matchean ninguna palabra clave caen en `sin-clasificar` para revisión
manual.

## Plugin de Cowork: agregar producto desde un link de Amazon

El mismo plugin construido para HidroLab
(`riego-trazado-agregar-producto`) funciona acá — solo cambiá, dentro del
plugin, el repo de destino (`git clone`) y el Partner Tag por los de
AutomatizaLab, y actualizá `references/categorias.md` con las dos
categorías de este sitio en vez de las seis de riego.

## Analítica (GA4)

Se integró **Google Analytics 4** (`src/components/GoogleAnalytics.tsx`),
activo solo si definís `NEXT_PUBLIC_GA_ID`. Creá una propiedad GA4 nueva y
separada de la de HidroLab (Admin → Create Property, Data Stream con
`https://controltrazado.com`) para no mezclar analíticas de los dos sitios.

## Deploy en Vercel

1. Conectá el repo en [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js (se detecta solo).
3. Variables de entorno del proyecto (Production):
   - `NEXT_PUBLIC_SITE_URL` (tu dominio real, para sitemap/metadata/OG)
   - `NEXT_PUBLIC_GA_ID` (opcional)
   - `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_PARTNER_TAG` (solo si
     vas a correr el script desde una función serverless)
4. Conectá el dominio `controltrazado.com` en Settings → Domains, y
   configurá los registros DNS que Vercel te indique en tu registrador.

## Cumplimiento (Amazon Associates)

- Disclosure de afiliado visible en el [footer](src/components/Footer.tsx)
  de todas las páginas.
- Los enlaces de producto llevan `rel="nofollow sponsored noopener noreferrer"`.
- Los precios se muestran como referenciales ("Precio referencial, ver en
  Amazon") — el precio real solo se confirma en Amazon.
- El script de actualización solo usa PA-API oficial, nunca scraping de
  amazon.com.
- El sitio está registrado con su propio Tracking ID y su propio tema
  declarado en Associates Central (no "Home & Garden", que corresponde a
  HidroLab).

## Estructura del proyecto

```
content/
  articulos/          # Guías en Markdown
  paginas/            # Acerca de, Privacidad
data/
  productos.json       # Catálogo (reescrito por el script mensual)
scripts/
  actualizar-productos.mjs
  lib/
    firmarPaApi.mjs     # Firma AWS SigV4 para PA-API
    paapiCliente.mjs     # Cliente GetItems + rate limiting
  config/
    asins-por-categoria.json
  agente-clasificador/  # Herramienta de triage de inventario (ver arriba)
src/
  app/                 # Rutas (App Router)
  components/
  lib/
    productos.ts        # Capa de acceso a datos (getProductos)
    contenido.ts         # Capa de acceso a contenido Markdown
    categorias.ts         # Lista fija de categorías
    tipos.ts               # Tipos compartidos
.github/workflows/
  actualizar-productos.yml
```

## Pendiente antes de lanzar

- [ ] Completar los `[PENDIENTE DE REDACTAR]` en `content/paginas/acerca-de.md`
      y en los artículos de `content/articulos/`.
- [ ] Crear el Tracking ID propio en Associates Central y reemplazar
      `TU_PARTNER_TAG` en `data/productos.json`.
- [ ] Conectar el dominio `controltrazado.com` en Vercel y configurar el DNS.
- [ ] Crear la propiedad GA4 y configurar `NEXT_PUBLIC_GA_ID`.
- [ ] Registrar el sitio nuevo en Associates Central (Manage Your Websites/Apps).
