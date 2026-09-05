import type { Metadata } from "next";
import Link from "next/link";
import { getArticulos } from "@/lib/contenido";
import { getCategoriaPorSlug } from "@/lib/categorias";
import { getDictionary, t, withLocale, type Locale } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://controltrazado.com";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "es";

  return {
    title: locale === "en" ? "Guides and articles" : "Guías y artículos",
    description:
      locale === "en"
        ? "Technical guides on home automation and industrial control: how to choose WiFi relays, variable frequency drives, RS485 gateways, and more."
        : "Guías técnicas sobre automatización de hogar inteligente y control industrial: cómo elegir relés WiFi, variadores de frecuencia, gateways RS485 y más.",
    alternates: {
      canonical: locale === "en" ? "/en/articulos" : "/articulos",
      languages: {
        es: `${SITE_URL}/articulos`,
        en: `${SITE_URL}/en/articulos`,
        "x-default": `${SITE_URL}/articulos`,
      },
    },
  };
}

export default async function ArticulosPage({ params }: Props) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "es";
  const d = getDictionary(locale);
  const articulos = await getArticulos(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">{d["articulos.eyebrow"]}</p>
      <h1 className="mt-2 text-3xl font-semibold text-text-light">
        {d["articulos.titulo"]}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-text-dim">
        {d["articulos.descripcion"]}
      </p>

      <ul className="mt-10 divide-y divide-line-dim/30 border-y border-line-dim/40">
        {articulos.map((articulo) => {
          const categoria = articulo.categoria
            ? getCategoriaPorSlug(articulo.categoria)
            : undefined;

          return (
            <li key={articulo.slug} className="py-6">
              <Link href={withLocale(`/articulos/${articulo.slug}`, locale)} className="group block">
                {categoria && (
                  <span className="font-mono text-[11px] uppercase tracking-wide text-line">
                    {t(categoria.nombre, categoria.nombreEn, locale)}
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
