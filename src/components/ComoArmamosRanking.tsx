import { getDictionary, type Locale } from "@/lib/i18n";

const PASOS_ES = [
  {
    numero: "01",
    titulo: "Consultamos datos de venta reales",
    texto:
      "Cada mes consultamos la Amazon Product Advertising API para las categorías del sitio: precio, rating y volumen de reseñas actualizados.",
  },
  {
    numero: "02",
    titulo: "Filtramos por criterio técnico",
    texto:
      "Descartamos productos con especificaciones incompatibles con el uso declarado (voltaje, tipo de entrada/salida, protocolo, compatibilidad de ecosistema).",
  },
  {
    numero: "03",
    titulo: "Sumamos nota editorial",
    texto:
      "Escribimos a mano una nota técnica por producto — este texto no viene de ninguna API, es criterio propio revisado manualmente.",
  },
  {
    numero: "04",
    titulo: "Publicamos el ranking del mes",
    texto:
      "El resultado se regenera y publica el día 1 de cada mes, preservando las notas técnicas ya escritas para cada ASIN.",
  },
];

const PASOS_EN = [
  {
    numero: "01",
    titulo: "We pull real sales data",
    texto:
      "Every month we query the Amazon Product Advertising API for the site's categories: updated price, rating, and review volume.",
  },
  {
    numero: "02",
    titulo: "We filter by technical criteria",
    texto:
      "We drop products whose specs are incompatible with the stated use case (voltage, input/output type, protocol, ecosystem compatibility).",
  },
  {
    numero: "03",
    titulo: "We add an editorial note",
    texto:
      "We hand-write a technical note for every product — this text never comes from an API, it's our own criteria, reviewed manually.",
  },
  {
    numero: "04",
    titulo: "We publish this month's ranking",
    texto:
      "The result is regenerated and published on the 1st of every month, preserving the technical notes already written for each ASIN.",
  },
];

export default function ComoArmamosRanking({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const pasos = locale === "en" ? PASOS_EN : PASOS_ES;

  return (
    <section className="border-y border-line-dim/40 bg-ink-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">
          {d["metodologia.eyebrow"]}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text-light sm:text-3xl">
          {d["metodologia.titulo"]}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line-dim/40 bg-line-dim/40 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso) => (
            <div key={paso.numero} className="bg-ink-2 p-6">
              <span className="font-mono text-3xl font-light text-line/60">
                {paso.numero}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-text-light">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                {paso.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
