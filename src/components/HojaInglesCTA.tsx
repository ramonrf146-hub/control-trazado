"use client";

import { useState } from "react";

/**
 * Segundo lead magnet, más específico que el de NewsletterBand: apunta
 * al lector de artículos de control-industrial-b2b, que es exactamente
 * el perfil de "mantenimiento industrial" al que le sirve esta hoja.
 * Mismo patrón de descarga directa que NewsletterBand: el alta en
 * Buttondown es best-effort y nunca bloquea la descarga.
 */
export default function HojaInglesCTA() {
  const [estado, setEstado] = useState<"idle" | "enviado">("idle");

  function manejarEnvio(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const email = new FormData(evento.currentTarget).get("email");
    fetch("/api/suscribirse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, tag: "hoja-ingles-tecnico" }),
    }).catch(() => {});
    setEstado("enviado");
  }

  return (
    <section className="mt-10 rounded-3xl border border-line-dim bg-ink-2 p-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent-2">
        Para el día a día en el taller
      </p>
      <h2 className="mt-2 text-lg font-bold text-text-light">
        El inglés técnico que necesitás en la planta, en una sola hoja
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-dim">
        Términos como <em>dry contact</em>, <em>gauge</em> o <em>variable
        frequency drive</em> aparecen en cada manual y cada ficha en inglés.
        Te armamos una hoja con 40 términos de mantenimiento industrial y
        automatización, traducidos y explicados en criollo, para imprimir y
        tener al lado del tablero.
      </p>

      {estado === "enviado" ? (
        <div className="mt-4 flex flex-col items-start gap-2">
          <p className="font-mono text-sm text-accent-2">Listo, ya es tuya.</p>
          <a
            href="/plantillas/ingles-tecnico-mantenimiento.html"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-accent-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink transition-opacity hover:opacity-90"
          >
            Abrir hoja de referencia
          </a>
        </div>
      ) : (
        <form
          onSubmit={manejarEnvio}
          className="mt-4 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="hoja-ingles-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="hoja-ingles-email"
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="w-full rounded-full border border-line-dim bg-ink px-4 py-2.5 text-sm text-text-light placeholder:text-text-dim/60 focus:border-line focus:outline-none"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-accent-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink transition-opacity hover:opacity-90"
          >
            Quiero la hoja de referencia
          </button>
        </form>
      )}
    </section>
  );
}
