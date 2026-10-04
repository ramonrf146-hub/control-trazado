import type { Metadata } from "next";
import { getProductos, getEstadisticas } from "@/lib/productos";
import { getDictionary, t, withLocale, type Locale } from "@/lib/i18n";
import { CATEGORIAS } from "@/lib/categorias";
import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
} from "@/components/ui/scroll-reveal-hero";
import HeroSistema, { type ItemSistema } from "@/components/HeroSistema";
import StatsGrid from "@/components/StatsGrid";
import BuscadorDeProducto from "@/components/BuscadorDeProducto";
import RankingConFiltros from "@/components/RankingConFiltros";
import ComoArmamosRanking from "@/components/ComoArmamosRanking";
import NewsletterBand from "@/components/NewsletterBand";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.controltrazado.com";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "es";

  return {
    description:
      locale === "en"
        ? "Monthly ranking with technical criteria of home automation and B2B industrial control hardware: WiFi plugs and relays, variable frequency drives, RS485/Modbus gateways."
        : "Ranking mensual con criterio técnico de hardware de automatización de hogar inteligente y control industrial B2B: enchufes y relés WiFi, variadores de frecuencia, gateways RS485/Modbus.",
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
      languages: {
        es: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "es";
  const d = getDictionary(locale);
  const [productos, estadisticas] = await Promise.all([
    getProductos(),
    getEstadisticas(),
  ]);

  const topPorCategoria = (slug: string): ItemSistema[] =>
    productos
      .filter((p) => p.categoria === slug)
      .slice(0, 3)
      .map((p) => ({
        asin: p.asin,
        nombre: t(p.nombre, p.nombreEn, locale).split(" — ")[0],
        imagen: p.imagen,
        precio: p.precio,
        rating: p.rating,
        ranking: p.ranking,
        href: withLocale(`/productos/${p.asin}`, locale),
      }));
  const sistemaHogar = topPorCategoria("automatizacion-hogar-inteligente");
  const sistemaIndustrial = topPorCategoria("control-industrial-b2b");
  const nombreCategoria = (slug: string) => {
    const c = CATEGORIAS.find((x) => x.slug === slug);
    return c ? t(c.nombre, c.nombreEn, locale) : slug;
  };
  const textosSistema = {
    etiquetaHogar: nombreCategoria("automatizacion-hogar-inteligente"),
    etiquetaIndustrial: nombreCategoria("control-industrial-b2b"),
    tuSistema: d["home.sistema.tuSistema"],
    operativo: d["home.sistema.operativo"],
    sensores: d["home.sistema.sensores"],
    temperatura: d["home.sistema.temperatura"],
    humedad: d["home.sistema.humedad"],
    presion: d["home.sistema.presion"],
    corriente: d["home.sistema.corriente"],
    energia: d["home.sistema.energia"],
    aria: d["home.sistema.aria"],
  };

  return (
    <>
      <section className="border-b border-line-dim/40">
        <ContainerScroll className="h-[160vh]">
          <ContainerSticky className="overflow-hidden px-4 pb-10 pt-24 text-text-light sm:px-6">
            <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <ContainerAnimated className="relative mx-auto max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-wide text-line">
                {d["home.eyebrow"]}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-text-light sm:text-4xl lg:text-5xl">
                {d["home.heroTitulo"]}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-dim">
                {d["home.heroDescripcion"]}
              </p>
            </ContainerAnimated>

            <ContainerInset className="relative mx-auto my-6 w-full max-w-5xl">
              <HeroSistema hogar={sistemaHogar} industrial={sistemaIndustrial} textos={textosSistema} />
            </ContainerInset>

            <ContainerAnimated
              transition={{ delay: 0.4 }}
              outputRange={[-120, 0]}
              inputRange={[0, 0.7]}
              className="relative mx-auto flex w-fit flex-wrap justify-center gap-3"
            >
              <a
                href="#ranking"
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink shadow-lg shadow-accent/30 transition-opacity hover:opacity-90"
              >
                {d["home.verRankingDelMes"]}
              </a>
              <a
                href="#metodologia"
                className="rounded-full border border-line-dim bg-ink/70 px-6 py-3 text-sm font-semibold text-text-light transition-colors hover:border-line"
              >
                {d["home.comoEvaluamos"]}
              </a>
            </ContainerAnimated>
          </ContainerSticky>
        </ContainerScroll>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <StatsGrid
          totalProductos={estadisticas.totalProductos}
          ultimaActualizacion={estadisticas.ultimaActualizacion}
          locale={locale}
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
        <BuscadorDeProducto productos={productos} locale={locale} />
      </section>

      <section id="ranking" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">
          {d["home.rankingEyebrow"]}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text-light sm:text-3xl">
          {d["home.rankingTitulo"]}
        </h2>
        <p className="mt-6 max-w-2xl text-sm text-text-dim">
          {d["home.rankingNota"]}
        </p>

        <div className="mt-8">
          <RankingConFiltros productos={productos} locale={locale} />
        </div>
      </section>

      <div id="metodologia">
        <ComoArmamosRanking locale={locale} />
      </div>

      <NewsletterBand locale={locale} />
    </>
  );
}
