import type { Metadata } from "next";
import Link from "next/link";
import { getArticulos } from "@/lib/contenido";
import { getCategoriaPorSlug } from "@/lib/categorias";

export const metadata: Metadata = {
  title: "Guías y artículos",
  description:
    "Guías técnicas sobre automatización de hogar inteligente y control industrial: cómo elegir relés WiFi, variadores de frecuencia, gateways RS485 y más.",
  alternates: { canonical: "/articulos" },
};

export default async function ArticulosPage() {
  const articulos = await getArticulos();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">Guías</p>
      <h1 className="mt-2 text-3xl font-semibold text-text-light">
        Artículos y guías técnicas
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-text-dim">
        Explicaciones de fondo para elegir bien cada pieza de tu sistema de
        automatización, sea para tu casa o para un proyecto industrial.
      </p>

      <ul className="mt-10 divide-y divide-line-dim/30 border-y border-line-dim/40">
        {articulos.map((articulo) => {
          const categoria = articulo.categoria
            ? getCategoriaPorSlug(articulo.categoria)
            : undefined;

          return (
            <li key={articulo.slug} className="py-6">
              <Link href={`/articulos/${articulo.slug}`} className="group block">
                {categoria && (
                  <span className="font-mono text-[11px] uppercase tracking-wide text-line">
                    {categoria.nombre}
                  </span>
                )}
                <h2 className="mt-1 text-lg font-semibold text-text-light group-hover:text-line">
                  {articulo.titulo}
                </h2>
                <p className="mt-1 text-sm text-text-dim">{articulo.descripcion}</p>
                <time
                  dateTime={articulo.fecha}
                  className="mt-2 block font-mono text-[11px] text-text-dim/70"
                >
                  {articulo.fecha}
                </time>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
