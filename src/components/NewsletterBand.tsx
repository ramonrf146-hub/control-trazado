"use client";

import { useState } from "react";

/**
 * El "regalo" se entrega como descarga directa apenas se completa el
 * form — el alta en Buttondown (vía /api/suscribirse) es best-effort y
 * nunca bloquea la descarga si falla o tarda.
 */
export default function NewsletterBand() {
  const [estado, setEstado] = useState<"idle" | "enviado">("idle");

  function manejarEnvio(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const email = new FormData(evento.currentTarget).get("email");
    fetch("/api/suscribirse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, tag: "plantilla-node-red" }),
    }).catch(() => {});
    setEstado("enviado");
  }

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
            Para quienes arman sus propios sistemas
          </p>
          <h2 className="mt-2 max-w-md text-xl font-semibold sm:text-2xl">
            Llevate el flujo de Node-RED armado, no en blanco
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink/70">
            Te dejamos el archivo listo para importar: lectura Modbus RTU,
            alertas por umbral y dashboard con gauge — el mismo que armamos
            en la guía de monitoreo de presión. Editalo con tus propios
            registros y ahorrate las horas de armarlo desde cero.
          </p>
        </div>

        {estado === "enviado" ? (
          <div className="flex flex-col items-start gap-2">
            <p className="font-mono text-sm text-accent">Listo, ya es tuyo.</p>
            <a
              href="/plantillas/monitoreo-presion-modbus.json"
              download
              className="whitespace-nowrap rounded-sm bg-ink px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-text-light transition-opacity hover:opacity-90"
            >
              Descargar plantilla (.json)
            </a>
          </div>
        ) : (
          <form
            onSubmit={manejarEnvio}
            className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="tu@correo.com"
              className="w-full rounded-sm border border-ink/20 bg-paper-dim px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-ink/50 focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-sm bg-ink px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-text-light transition-opacity hover:opacity-90"
            >
              Quiero la plantilla gratis
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
