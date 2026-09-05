import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";
import { getDictionary, t, withLocale, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);

  return (
    <footer className="border-t border-line-dim/60 bg-ink-2">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-sm font-medium text-text-light">
              AUTOMATIZA<span className="text-accent">_</span>LAB
            </p>
            <p className="mt-3 max-w-xs text-sm text-text-dim">
              {d["footer.descripcion"]}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-line">
              {d["footer.categorias"]}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-text-dim">
              {CATEGORIAS.map((categoria) => (
                <li key={categoria.slug}>
                  <Link
                    href={withLocale(`/categorias/${categoria.slug}`, locale)}
                    className="transition-colors hover:text-text-light"
                  >
                    {t(categoria.nombre, categoria.nombreEn, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-line">
              {d["footer.sitio"]}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-text-dim">
              <li>
                <Link href={withLocale("/articulos", locale)} className="transition-colors hover:text-text-light">
                  {d["footer.guiasYArticulos"]}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/acerca-de", locale)} className="transition-colors hover:text-text-light">
                  {d["footer.acercaDe"]}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/privacidad", locale)} className="transition-colors hover:text-text-light">
                  {d["footer.privacidad"]}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line-dim/40 pt-6">
          <p className="text-xs leading-relaxed text-text-dim">
            <strong className="text-text-light">{d["footer.avisoAfiliacion"]}</strong>{" "}
            {d["footer.avisoTexto"]}
          </p>
          <p className="mt-4 text-xs text-text-dim/70">
            © {new Date().getFullYear()} AutomatizaLab. {d["footer.derechos"]}
          </p>
        </div>
      </div>
    </footer>
  );
}
