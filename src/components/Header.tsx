"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";

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

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-dim/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMenuAbierto(false)}>
          <LogoRele />
          <span className="text-base font-extrabold tracking-tight text-text-light">
            CONTROL<span className="text-accent">_</span>TRAZADO
          </span>
        </Link>

        <nav
          aria-label="Categorías"
          className="hidden items-center gap-5 overflow-x-auto text-sm font-medium text-text-dim md:flex"
        >
          {CATEGORIAS.map((categoria) => (
            <Link
              key={categoria.slug}
              href={`/categorias/${categoria.slug}`}
              className="whitespace-nowrap transition-colors hover:text-line"
            >
              {categoria.nombre}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            href="/articulos"
            className="hidden text-text-dim transition-colors hover:text-line sm:inline"
          >
            Guías
          </Link>
          <Link
            href="/#ranking"
            className="rounded-full bg-accent px-4 py-2 text-ink transition-opacity hover:opacity-90"
          >
            Ver ranking
          </Link>
          <button
            type="button"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
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
          aria-label="Categorías"
          className="border-t border-line-dim/60 bg-ink px-4 py-4 text-sm font-medium text-text-dim md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {CATEGORIAS.map((categoria) => (
              <li key={categoria.slug}>
                <Link
                  href={`/categorias/${categoria.slug}`}
                  onClick={() => setMenuAbierto(false)}
                  className="block rounded-sm px-2 py-2.5 transition-colors hover:bg-ink-2 hover:text-line"
                >
                  {categoria.nombre}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-line-dim/40 pt-2">
              <Link
                href="/articulos"
                onClick={() => setMenuAbierto(false)}
                className="block rounded-sm px-2 py-2.5 transition-colors hover:bg-ink-2 hover:text-line"
              >
                Guías y artículos
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
