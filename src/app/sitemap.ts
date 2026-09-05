import type { MetadataRoute } from "next";
import { CATEGORIAS } from "@/lib/categorias";
import { getArticulos } from "@/lib/contenido";
import { getProductos } from "@/lib/productos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://controltrazado.com";

/** Emite la URL española (sin prefijo, histórica) y la inglesa (/en) para una misma ruta. */
function esYEn(
  path: string,
  resto: Omit<MetadataRoute.Sitemap[number], "url">
): MetadataRoute.Sitemap {
  const rutaEs = path === "/" ? "" : path;
  return [
    { url: `${SITE_URL}${rutaEs}`, ...resto },
    { url: `${SITE_URL}/en${path === "/" ? "" : path}`, ...resto },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articulos, productos] = await Promise.all([getArticulos(), getProductos()]);

  const paginasEstaticas: MetadataRoute.Sitemap = [
    ...esYEn("/", { changeFrequency: "monthly", priority: 1 }),
    ...esYEn("/articulos", { changeFrequency: "monthly", priority: 0.6 }),
    ...esYEn("/acerca-de", { changeFrequency: "yearly", priority: 0.3 }),
    ...esYEn("/privacidad", { changeFrequency: "yearly", priority: 0.2 }),
  ];

  const paginasCategoria: MetadataRoute.Sitemap = CATEGORIAS.flatMap((categoria) =>
    esYEn(`/categorias/${categoria.slug}`, { changeFrequency: "monthly", priority: 0.9 })
  );

  const paginasArticulos: MetadataRoute.Sitemap = articulos.flatMap((articulo) =>
    esYEn(`/articulos/${articulo.slug}`, {
      lastModified: articulo.fecha,
      changeFrequency: "yearly",
      priority: 0.5,
    })
  );

  const paginasProductos: MetadataRoute.Sitemap = productos.flatMap((producto) =>
    esYEn(`/productos/${producto.asin}`, {
      lastModified: producto.actualizadoEn,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...paginasEstaticas, ...paginasCategoria, ...paginasArticulos, ...paginasProductos];
}
