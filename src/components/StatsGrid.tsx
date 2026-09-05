import { CATEGORIAS } from "@/lib/categorias";
import { getDictionary, type Locale } from "@/lib/i18n";

function formatearFecha(fecha: string | null, locale: Locale) {
  if (!fecha) return "—";
  const [anio, mes] = fecha.split("-");
  const mesesEs = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  const mesesEn = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const meses = locale === "en" ? mesesEn : mesesEs;
  return `${meses[Number(mes) - 1]} ${anio}`;
}

export default function StatsGrid({
  totalProductos,
  ultimaActualizacion,
  locale,
}: {
  totalProductos: number;
  ultimaActualizacion: string | null;
  locale: Locale;
}) {
  const d = getDictionary(locale);
  const stats = [
    { etiqueta: d["stats.productosEvaluados"], valor: String(totalProductos) },
    { etiqueta: d["stats.categoriasCubiertas"], valor: String(CATEGORIAS.length) },
    { etiqueta: d["stats.actualizacion"], valor: d["stats.mensual"] },
    { etiqueta: d["stats.ultimoCorte"], valor: formatearFecha(ultimaActualizacion, locale) },
  ];

  return (
    <dl className="grid grid-cols-2 divide-y divide-line-dim/30 border border-line-dim/40 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
      {stats.map((stat) => (
        <div key={stat.etiqueta} className="px-4 py-5 text-center sm:text-left">
          <dt className="font-mono text-[11px] uppercase tracking-wide text-text-dim">
            {stat.etiqueta}
          </dt>
          <dd className="mt-1 font-mono text-2xl font-semibold text-line">
            {stat.valor}
          </dd>
        </div>
      ))}
    </dl>
  );
}
