"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIAS } from "@/lib/categorias";
import { getDictionary, t, withLocale, type Locale } from "@/lib/i18n";

/** Convierte la ruta actual (ya sin el /en, ver proxy.ts) al equivalente en el otro idioma. */
function rutaEnOtroIdioma(pathname: string, localeDestino: Locale): string {
  const sinPrefijo = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname;
  return withLocale(sinPrefijo, localeDestino);
}

function LogoRele() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="var(--line)" strokeWidth="1.5" />
      <path
        d="M14 2 L14 8 M14 20 L14 26 M2 14 L8 14 M20 14 L26 14"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect x="11.5" y="11.5" width="5" height="5" fill="var(--accent)" />
    </svg>
  );
}

function IconoMenu({ abierto }: { abierto: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {abierto ? (
        <path
          d="M4 4l12 12M16 4L4 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 5h14M3 10h14M3 15h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Header({ locale }: { locale: Locale }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const d = getDictionary(locale);
  const pathname = usePathname();
  const hrefEs = rutaEnOtroIdioma(pathname, "es");
  const hrefEn = rutaEnOtroIdioma(pathname, "en");

  return (
    <header className="sticky top-0 z-50 border-b border-line-dim/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={withLocale("/", locale)}
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setMenuAbierto(false)}
        >
          <LogoRele />
          <span className="text-base font-extrabold tracking-tight text-text-light">
            AUTOMATIZA<span className="text-accent">_</span>LAB
          </span>
        </Link>

        <nav
          aria-label={d["nav.categoriasAria"]}
          className="hidden items-center gap-5 overflow-x-auto text-sm font-medium text-text-dim md:flex"
        >
          {CATEGORIAS.map((categoria) => (
            <Link
              key={categoria.slug}
              href={withLocale(`/categorias/${categoria.slug}`, locale)}
              className="whitespace-nowrap transition-colors hover:text-line"
            >
              {t(categoria.nombre, categoria.nombreEn, locale)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            href={withLocale("/articulos", locale)}
            className="hidden text-text-dim transition-colors hover:text-line sm:inline"
          >
            {d["nav.guias"]}
          </Link>
          <Link
            href={locale === "es" ? "/#ranking" : "/en#ranking"}
            className="rounded-full bg-accent px-4 py-2 text-ink transition-opacity hover:opacity-90"
          >
            {d["nav.verRanking"]}
          </Link>
          <span className="hidden items-center gap-1 text-xs font-semibold sm:flex" aria-label={d["lang.switchAria"]}>
            <Link
              href={hrefEs}
              className={locale === "es" ? "text-text-light" : "text-text-dim hover:text-text-light"}
            >
              {d["lang.es"]}
            </Link>
            <span className="text-text-dim/50">/</span>
            <Link
              href={hrefEn}
              className={locale === "en" ? "text-text-light" : "text-text-dim hover:text-text-light"}
            >
              {d["lang.en"]}
            </Link>
          </span>
          <button
            type="button"
            aria-label={menuAbierto ? d["nav.cerrarMenu"] : d["nav.abrirMenu"]}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto((v) => !v)}
            className="flex items-center justify-center rounded-full border border-line-dim p-2 text-text-light transition-colors hover:border-line md:hidden"
          >
            <IconoMenu abierto={menuAbierto} />
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav
          id="menu-movil"
          aria-label={d["nav.categoriasAria"]}
          className="border-t border-line-dim/60 bg-ink px-4 py-4 text-sm font-medium text-text-dim md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {CATEGORIAS.map((categoria) => (
              <li key={categoria.slug}>
                <Link
                  href={withLocale(`/categorias/${categoria.slug}`, locale)}
                  onClick={() => setMenuAbierto(false)}
                  className="block rounded-sm px-2 py-2.5 transition-colors hover:bg-ink-2 hover:text-line"
                >
                  {t(categoria.nombre, categoria.nombreEn, locale)}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-line-dim/40 pt-2">
              <Link
                href={withLocale("/articulos", locale)}
                onClick={() => setMenuAbierto(false)}
                className="block rounded-sm px-2 py-2.5 transition-colors hover:bg-ink-2 hover:text-line"
              >
                {d["nav.guiasYArticulos"]}
              </Link>
            </li>
            <li className="border-t border-line-dim/40 pt-2 sm:hidden">
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold">
                <Link href={hrefEs} className={locale === "es" ? "text-text-light" : "text-text-dim"}>
                  {d["lang.es"]}
                </Link>
                <span className="text-text-dim/50">/</span>
                <Link href={hrefEn} className={locale === "en" ? "text-text-light" : "text-text-dim"}>
                  {d["lang.en"]}
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
