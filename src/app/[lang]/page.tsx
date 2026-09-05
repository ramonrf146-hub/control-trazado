import type { Metadata } from "next";
import { getProductos, getEstadisticas } from "@/lib/productos";
import { getDictionary, type Locale } from "@/lib/i18n";
import HeroDiagrama from "@/components/HeroDiagrama";
import StatsGrid from "@/components/StatsGrid";
import BuscadorDeProducto from "@/components/BuscadorDeProducto";
import RankingConFiltros from "@/components/RankingConFiltros";
import ComoArmamosRanking from "@/components/ComoArmamosRanking";
import NewsletterBand from "@/components/NewsletterBand";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://controltrazado.com";

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

  return (
    <>
      <section className="relative overflow-hidden border-b border-line-dim/40">
        <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-line">
              {d["home.eyebrow"]}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-text-light sm:text-4xl lg:text-5xl">
              {d["home.heroTitulo"]}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-dim">
              {d["home.heroDescripcion"]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#ranking"
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink shadow-lg shadow-accent/30 transition-opacity hover:opacity-90"
              >
                {d["home.verRankingDelMes"]}
              </a>
              <a
                href="#metodologia"
                className="rounded-full border border-line-dim px-6 py-3 text-sm font-semibold text-text-light transition-colors hover:border-line"
              >
                {d["home.comoEvaluamos"]}
              </a>
            </div>
          </div>

          <HeroDiagrama locale={locale} />
        </div>
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
