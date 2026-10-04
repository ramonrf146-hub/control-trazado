"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

export interface ItemSistema {
  asin: string;
  nombre: string;
  imagen: string;
  precio: number;
  rating: number;
  ranking: number;
  href: string;
}

export interface TextosSistema {
  etiquetaHogar: string;
  etiquetaIndustrial: string;
  tuSistema: string;
  operativo: string;
  sensores: string;
  temperatura: string;
  humedad: string;
  presion: string;
  corriente: string;
  energia: string;
  aria: string;
}

interface Props {
  hogar: ItemSistema[];
  industrial: ItemSistema[];
  textos: TextosSistema;
}

type Lado = "hogar" | "industrial";
type Activo = { lado: Lado; fila: number } | null;

const AMBAR = "var(--accent)";
const VERDE = "var(--accent-2)";
const AZUL = "var(--line)";
const SLOTS = 3;
const INTERVALO_MS = 2600;

function cable(color: string) {
  return { "--cable": color } as React.CSSProperties;
}

interface Rotacion {
  tick: number;
  visibles: Record<Lado, number[]>;
  ultimo: Record<Lado, number>;
}

const ROTACION_INICIAL: Rotacion = {
  tick: 0,
  visibles: { hogar: [0, 1, 2], industrial: [0, 1, 2] },
  ultimo: { hogar: 2, industrial: 2 },
};

/** Cada tick reemplaza una sola tarjeta (alternando lado y posición) por el
 * siguiente producto del catálogo que todavía no esté a la vista. Es una
 * función pura, así que React puede ejecutarla dos veces sin efectos raros. */
function rotar(estado: Rotacion, accion: { largos: Record<Lado, number> }): Rotacion {
  const lado: Lado = estado.tick % 2 === 0 ? "hogar" : "industrial";
  const slot = Math.floor(estado.tick / 2) % SLOTS;
  const n = accion.largos[lado];
  if (n <= SLOTS) return { ...estado, tick: estado.tick + 1 };

  let candidato = (estado.ultimo[lado] + 1) % n;
  while (estado.visibles[lado].includes(candidato)) candidato = (candidato + 1) % n;

  const visibles = [...estado.visibles[lado]];
  visibles[slot] = candidato;
  return {
    tick: estado.tick + 1,
    visibles: { ...estado.visibles, [lado]: visibles },
    ultimo: { ...estado.ultimo, [lado]: candidato },
  };
}

interface TarjetaProps {
  item: ItemSistema;
  claseBorde: string;
  onEntrar: () => void;
  onSalir: () => void;
}

function Tarjeta({ item, claseBorde, onEntrar, onSalir }: TarjetaProps) {
  return (
    <Link
      href={item.href}
      onMouseEnter={onEntrar}
      onMouseLeave={onSalir}
      onFocus={onEntrar}
      onBlur={onSalir}
      className={`group flex h-full min-h-[8.5rem] min-w-0 flex-col items-center gap-1.5 rounded-xl border bg-ink-2 p-2 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 md:min-h-[5.5rem] md:flex-row md:gap-3 md:p-2.5 md:text-left ${claseBorde}`}
    >
      <span className="relative shrink-0">
        <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-image-bg p-1 md:h-16 md:w-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imagen}
            alt={item.nombre}
            loading="eager"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </span>
        <span className="absolute -left-1.5 -top-1.5 rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-extrabold text-text-light ring-1 ring-line-dim">
          #{item.ranking}
        </span>
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 block text-[11px] font-semibold leading-snug text-text-light md:text-xs">
          {item.nombre}
        </span>
        <span className="mt-0.5 block text-[11px] text-text-dim">
          ${item.precio.toFixed(2)} · {item.rating.toFixed(1)} ★
        </span>
      </span>
    </Link>
  );
}

function Slot(props: TarjetaProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={props.item.asin}
        className="h-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.26 }}
      >
        <Tarjeta {...props} />
      </motion.div>
    </AnimatePresence>
  );
}

function IconoServidor() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function Hub({ textos, activo }: { textos: TextosSistema; activo: ItemSistema | null }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-ink-2 px-3 py-4 text-center shadow-[0_0_28px_rgba(59,130,246,0.28)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-line/15 text-line">
        <IconoServidor />
      </span>
      <p className="mt-2 text-sm font-bold text-text-light">{textos.tuSistema}</p>
      <p className="mt-0.5 text-[11px] text-text-dim">Home Assistant · Node-RED</p>
      <ul className="mt-2 flex flex-wrap justify-center gap-1">
        {["Alexa", "App", "Dashboard"].map((pill) => (
          <li
            key={pill}
            className="rounded-full bg-line-dim px-2 py-0.5 text-[10px] font-medium text-text-light"
          >
            {pill}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex h-4 max-w-full items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent-2">
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent-2" aria-hidden="true" />
        <span className="truncate">{activo ? activo.nombre : textos.operativo}</span>
      </p>
    </div>
  );
}

interface Valores {
  temperatura: number;
  humedad: number;
  presion: number;
  corriente: number;
  energia: number;
}

const BASE: Valores = { temperatura: 24.7, humedad: 57, presion: 2.4, corriente: 12.7, energia: 1.25 };

function useValoresEnVivo(activo: boolean): Valores {
  const [valores, setValores] = useState<Valores>(BASE);

  useEffect(() => {
    if (!activo) return;
    const id = window.setInterval(() => {
      setValores((v) => ({
        temperatura: Math.min(26.5, Math.max(23, v.temperatura + (Math.random() - 0.5) * 0.4)),
        humedad: Math.min(62, Math.max(52, v.humedad + (Math.random() - 0.5) * 1.6)),
        presion: Math.min(2.7, Math.max(2.2, v.presion + (Math.random() - 0.5) * 0.08)),
        corriente: Math.min(14, Math.max(11.5, v.corriente + (Math.random() - 0.5) * 0.5)),
        energia: v.energia + 0.01,
      }));
    }, 1800);
    return () => window.clearInterval(id);
  }, [activo]);

  return valores;
}

function Sensores({
  textos,
  valores,
  className = "",
}: {
  textos: TextosSistema;
  valores: Valores;
  className?: string;
}) {
  const v = valores;
  const tiles = [
    { etiqueta: textos.temperatura, valor: `${v.temperatura.toFixed(1)} °C`, extra: "" },
    { etiqueta: textos.humedad, valor: `${Math.round(v.humedad)} %`, extra: "" },
    { etiqueta: textos.presion, valor: `${v.presion.toFixed(1)} bar`, extra: "" },
    { etiqueta: textos.corriente, valor: `${v.corriente.toFixed(1)} A`, extra: "hidden sm:block" },
    { etiqueta: textos.energia, valor: `${v.energia.toFixed(2)} kWh`, extra: "hidden sm:block" },
  ];

  return (
    <div className={className}>
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-text-dim">
        {textos.sensores}
      </p>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {tiles.map((t) => (
          <li
            key={t.etiqueta}
            className={`rounded-lg border border-line-dim bg-ink/70 px-2 py-1.5 text-center ${t.extra}`}
          >
            <p className="text-sm font-bold tabular-nums text-line md:text-base">{t.valor}</p>
            <p className="text-[10px] text-text-dim">{t.etiqueta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tramo({
  lado,
  fila,
  encendido,
}: {
  lado: "izq" | "der";
  fila: 0 | 1 | 2;
  encendido: boolean;
}) {
  const color = lado === "izq" ? AMBAR : VERDE;
  const ladoTarjeta = lado === "izq" ? "left-0" : "right-0";
  const ladoHub = lado === "izq" ? "right-0" : "left-0";

  return (
    <div
      className={`relative h-full w-full transition-[filter] duration-300 ${
        encendido ? "brightness-150 drop-shadow-[0_0_6px_var(--cable)]" : ""
      }`}
      style={cable(color)}
      aria-hidden="true"
    >
      {fila === 0 && <span className="cable-y absolute left-1/2 top-1/2 bottom-0 w-0.5 -translate-x-1/2" />}
      {fila === 2 && (
        <span className="cable-y cable-rev absolute left-1/2 top-0 bottom-1/2 w-0.5 -translate-x-1/2" />
      )}
      {fila === 1 && (
        <>
          <span className="cable-y absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2" />
          <span className="cable-y cable-rev absolute left-1/2 bottom-0 h-1/2 w-0.5 -translate-x-1/2" />
        </>
      )}
      <span className={`cable-x absolute top-1/2 h-0.5 w-1/2 -translate-y-1/2 ${ladoTarjeta}`} />
      {fila === 1 && (
        <span className={`cable-x absolute top-1/2 h-0.5 w-1/2 -translate-y-1/2 ${ladoHub}`} />
      )}
    </div>
  );
}

function ConectorVertical({ color, invertido = false }: { color: string; invertido?: boolean }) {
  return (
    <div className="flex justify-center" style={cable(color)} aria-hidden="true">
      <span className={`cable-y h-5 w-0.5 ${invertido ? "cable-rev" : ""}`} />
    </div>
  );
}

export default function HeroSistema({ hogar, industrial, textos }: Props) {
  const filas = [0, 1, 2] as const;
  const raiz = useRef<HTMLDivElement>(null);
  const enPantalla = useInView(raiz, { amount: 0.25 });
  const reducirMovimiento = useReducedMotion();
  const [pausado, setPausado] = useState(false);
  const [activo, setActivo] = useState<Activo>(null);
  const [rotacion, rotarUno] = useReducer(rotar, ROTACION_INICIAL);

  const largos = { hogar: hogar.length, industrial: industrial.length };
  const rotando = !reducirMovimiento && !pausado && enPantalla;

  useEffect(() => {
    if (!rotando) return;
    const id = window.setInterval(() => rotarUno({ largos }), INTERVALO_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotando, largos.hogar, largos.industrial]);

  const valores = useValoresEnVivo(!reducirMovimiento && enPantalla);

  const vistos: Record<Lado, ItemSistema[]> = {
    hogar: rotacion.visibles.hogar.map((i) => hogar[i]).filter(Boolean),
    industrial: rotacion.visibles.industrial.map((i) => industrial[i]).filter(Boolean),
  };
  const itemActivo = activo ? (vistos[activo.lado][activo.fila] ?? null) : null;

  const manejadores = (lado: Lado, fila: number) => ({
    onEntrar: () => {
      setPausado(true);
      setActivo({ lado, fila });
    },
    onSalir: () => {
      setPausado(false);
      setActivo(null);
    },
  });
  const encendido = (lado: Lado, fila: number) => activo?.lado === lado && activo.fila === fila;

  return (
    <div
      ref={raiz}
      role="group"
      aria-label={textos.aria}
      className="pointer-events-auto relative overflow-hidden bg-linear-to-br from-ink-2 via-ink to-ink-2"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative hidden gap-0 p-6 md:grid md:grid-cols-[minmax(0,1fr)_2rem_13rem_2rem_minmax(0,1fr)] md:grid-rows-[auto_repeat(3,auto)_auto_auto]">
        <p className="col-start-1 row-start-1 pb-2 font-mono text-[10px] uppercase tracking-wide text-accent">
          {textos.etiquetaHogar}
        </p>
        <p className="col-start-5 row-start-1 pb-2 font-mono text-[10px] uppercase tracking-wide text-accent-2">
          {textos.etiquetaIndustrial}
        </p>

        {filas.map((i) => (
          <div key={`h-${i}`} className="py-1.5" style={{ gridColumn: 1, gridRow: i + 2 }}>
            {vistos.hogar[i] && (
              <Slot
                item={vistos.hogar[i]}
                claseBorde="border-accent/50 hover:border-accent"
                {...manejadores("hogar", i)}
              />
            )}
          </div>
        ))}
        {filas.map((i) => (
          <div key={`bl-${i}`} style={{ gridColumn: 2, gridRow: i + 2 }}>
            <Tramo lado="izq" fila={i} encendido={encendido("hogar", i)} />
          </div>
        ))}
        <div className="py-1.5" style={{ gridColumn: 3, gridRow: "2 / span 3" }}>
          <Hub textos={textos} activo={itemActivo} />
        </div>
        {filas.map((i) => (
          <div key={`br-${i}`} style={{ gridColumn: 4, gridRow: i + 2 }}>
            <Tramo lado="der" fila={i} encendido={encendido("industrial", i)} />
          </div>
        ))}
        {filas.map((i) => (
          <div key={`i-${i}`} className="py-1.5" style={{ gridColumn: 5, gridRow: i + 2 }}>
            {vistos.industrial[i] && (
              <Slot
                item={vistos.industrial[i]}
                claseBorde="border-accent-2/50 hover:border-accent-2"
                {...manejadores("industrial", i)}
              />
            )}
          </div>
        ))}

        <div className="col-start-3 row-start-5">
          <ConectorVertical color={AZUL} invertido />
        </div>
        <Sensores textos={textos} valores={valores} className="col-span-5 row-start-6" />
      </div>

      <div className="relative flex flex-col gap-0 p-4 md:hidden">
        <p className="pb-1.5 font-mono text-[10px] uppercase tracking-wide text-accent">
          {textos.etiquetaHogar}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {vistos.hogar.map((item, i) => (
            <Slot key={i} item={item} claseBorde="border-accent/50" {...manejadores("hogar", i)} />
          ))}
        </div>
        <ConectorVertical color={AMBAR} />
        <Hub textos={textos} activo={itemActivo} />
        <ConectorVertical color={VERDE} />
        <p className="pb-1.5 font-mono text-[10px] uppercase tracking-wide text-accent-2">
          {textos.etiquetaIndustrial}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {vistos.industrial.map((item, i) => (
            <Slot key={i} item={item} claseBorde="border-accent-2/50" {...manejadores("industrial", i)} />
          ))}
        </div>
        <Sensores textos={textos} valores={valores} className="mt-4" />
      </div>
    </div>
  );
}
