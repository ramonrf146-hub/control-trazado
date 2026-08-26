/**
 * Diagrama de firma del hero: plano técnico animado del flujo de señal
 * desde la fuente de alimentación, por el relé/contactor, hasta el
 * actuador, con un sensor IoT y un controlador (ESP32/PLC) conectados por
 * líneas de datos punteadas. La animación de `stroke-dashoffset` simula
 * flujo de corriente y de datos; respeta `prefers-reduced-motion` vía la
 * regla global en globals.css que congela todas las animaciones del sitio.
 */
export default function HeroDiagrama() {
  return (
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-label="Diagrama de un sistema de automatización: fuente de alimentación, relé/contactor, actuador, sensor IoT y controlador conectados entre sí"
      className="w-full h-auto"
    >
      <style>{`
        .senal { stroke-dasharray: 6 8; animation: fluir 1.6s linear infinite; }
        .dato { stroke-dasharray: 3 6; animation: fluir 2.4s linear infinite; }
        @keyframes fluir { to { stroke-dashoffset: -140; } }
      `}</style>

      <rect x="0" y="0" width="720" height="340" fill="none" />

      {/* --- Línea de alimentación: fuente -> relé -> actuador --- */}
      <path
        d="M 40 220 H 200"
        stroke="var(--line-dim)"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M 40 220 H 200"
        className="senal"
        stroke="var(--line)"
        strokeWidth="2"
        fill="none"
      />

      <path
        d="M 260 220 H 420"
        stroke="var(--line-dim)"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M 260 220 H 420"
        className="senal"
        stroke="var(--line)"
        strokeWidth="2"
        fill="none"
      />

      <path
        d="M 420 220 H 560"
        stroke="var(--line-dim)"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M 420 220 H 560"
        className="senal"
        stroke="var(--line)"
        strokeWidth="2"
        fill="none"
      />

      {/* --- Fuente de alimentación --- */}
      <g>
        <rect
          x="10"
          y="190"
          width="30"
          height="60"
          rx="3"
          fill="var(--ink-2)"
          stroke="var(--line-dim)"
        />
        <path d="M14 205 H36 M14 215 H36 M14 225 H36" stroke="var(--line-dim)" strokeWidth="1" />
        <text
          x="25"
          y="272"
          textAnchor="middle"
          className="font-mono"
          fontSize="10"
          fill="var(--text-dim)"
        >
          FUENTE
        </text>
      </g>

      {/* --- Relé / contactor --- */}
      <g>
        <rect
          x="200"
          y="196"
          width="60"
          height="48"
          rx="4"
          fill="var(--ink-2)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <path
          d="M212 220 L230 208 L230 232 Z"
          fill="var(--accent)"
          opacity="0.9"
        />
        <path
          d="M248 220 L230 208 L230 232 Z"
          fill="var(--accent)"
          opacity="0.5"
        />
        <text
          x="230"
          y="266"
          textAnchor="middle"
          className="font-mono"
          fontSize="10"
          fill="var(--text-dim)"
        >
          RELÉ
        </text>
      </g>

      {/* --- Actuador / motor --- */}
      <g>
        <circle cx="590" cy="220" r="16" fill="var(--ink-2)" stroke="var(--accent-2)" strokeWidth="1.5" />
        <circle cx="590" cy="220" r="4" fill="var(--accent-2)" />
        <path
          d="M590 204 L590 190 M576 210 L562 198 M604 210 L618 198 M572 220 L556 220 M608 220 L624 220"
          stroke="var(--accent-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <text
          x="590"
          y="256"
          textAnchor="middle"
          className="font-mono"
          fontSize="10"
          fill="var(--text-dim)"
        >
          ACTUADOR
        </text>
      </g>

      {/* --- Sensor IoT --- */}
      <g>
        <rect
          x="380"
          y="60"
          width="52"
          height="34"
          rx="4"
          fill="var(--ink-2)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        <path d="M406 94 V120" stroke="var(--line-dim)" strokeWidth="3" />
        <text
          x="406"
          y="46"
          textAnchor="middle"
          className="font-mono"
          fontSize="10"
          fill="var(--text-dim)"
        >
          SENSOR IOT
        </text>
      </g>

      {/* --- Controlador (ESP32 / PLC) --- */}
      <g>
        <rect
          x="560"
          y="50"
          width="70"
          height="46"
          rx="4"
          fill="var(--ink-2)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        <path
          d="M582 78 C588 70, 602 70, 608 78 M587 82 C591 77, 599 77, 603 82 M593 86 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0"
          stroke="var(--line)"
          strokeWidth="1.5"
          fill="none"
        />
        <text
          x="595"
          y="112"
          textAnchor="middle"
          className="font-mono"
          fontSize="10"
          fill="var(--text-dim)"
        >
          CONTROLADOR
        </text>
      </g>

      {/* --- Líneas de datos (circuito punteado) --- */}
      <path
        d="M 406 94 V 140 C 406 160, 420 160, 420 180"
        className="dato"
        stroke="var(--line)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 595 96 V 130 C 595 150, 230 150, 230 196"
        className="dato"
        stroke="var(--line)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 560 73 H 432 C 420 73, 420 73, 406 78"
        className="dato"
        stroke="var(--line)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
