/**
 * Diagrama de firma del hero: plano técnico animado de un sistema de
 * automatización completo — entradas de usuario (Alexa/smartphone) hacia
 * un servidor central (Home Assistant/Node-RED), que expone un dashboard
 * de monitoreo, recibe telemetría de sensores, y controla un variador de
 * frecuencia (VFD) vía bus industrial RS485 hasta un motor trifásico.
 * Cuatro tipos de conexión, cada uno animado y coloreado distinto
 * (comando, datos, RS485, potencia AC), igual que la leyenda de un
 * diagrama de planta real. La animación de `stroke-dashoffset` simula
 * flujo de señal/corriente; respeta `prefers-reduced-motion` vía la regla
 * global en globals.css que congela todas las animaciones del sitio.
 */
export default function HeroDiagrama() {
  return (
    <svg
      viewBox="0 0 840 440"
      role="img"
      aria-label="Diagrama de un sistema de automatización: Alexa y smartphone envían comandos a un servidor Home Assistant/Node-RED, que muestra un dashboard, recibe telemetría de sensores, y controla un variador de frecuencia por bus RS485 hasta un motor industrial"
      className="w-full h-auto"
    >
      <style>{`
        .flujo-comando { stroke: var(--accent); stroke-dasharray: 5 7; animation: fluir 1.4s linear infinite; }
        .flujo-datos { stroke: var(--line); stroke-dasharray: 3 6; animation: fluir 2.2s linear infinite; }
        .flujo-rs485 { stroke: var(--accent-2); stroke-dasharray: 4 6; animation: fluir 1.8s linear infinite; }
        .flujo-potencia { stroke: #eab308; stroke-dasharray: 6 4; animation: fluir 1s linear infinite; }
        @keyframes fluir { to { stroke-dashoffset: -120; } }
      `}</style>

      <rect x="0" y="0" width="840" height="440" fill="none" />

      {/* ===== Entradas de usuario: Alexa + Smartphone -> Servidor (comando, naranja) ===== */}
      <path d="M 130 55 C 200 55, 220 130, 280 175" className="flujo-comando" strokeWidth="1.5" fill="none" />
      <path d="M 130 140 C 200 140, 220 160, 280 185" className="flujo-comando" strokeWidth="1.5" fill="none" />

      <g>
        <rect x="20" y="25" width="110" height="60" rx="6" fill="var(--ink-2)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="45" cy="55" r="10" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="45" cy="55" r="3" fill="var(--accent)" />
        <text x="70" y="52" className="font-mono" fontSize="10" fontWeight="700" fill="var(--text-light)">ALEXA</text>
        <text x="70" y="66" className="font-mono" fontSize="8" fill="var(--text-dim)">voz</text>
      </g>

      <g>
        <rect x="20" y="110" width="110" height="60" rx="6" fill="var(--ink-2)" stroke="var(--accent)" strokeWidth="1.5" />
        <rect x="35" y="122" width="26" height="36" rx="3" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M41 152 H55" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
        <text x="70" y="137" className="font-mono" fontSize="10" fontWeight="700" fill="var(--text-light)">APP</text>
        <text x="70" y="151" className="font-mono" fontSize="8" fill="var(--text-dim)">smartphone</text>
      </g>

      {/* ===== Servidor central ===== */}
      <g>
        <rect x="280" y="150" width="190" height="105" rx="8" fill="var(--ink-2)" stroke="var(--line)" strokeWidth="2" />
        <rect x="300" y="172" width="18" height="18" rx="2" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="305" y="177" width="8" height="8" fill="var(--accent-2)" />
        <text x="330" y="185" className="font-mono" fontSize="11" fontWeight="700" fill="var(--text-light)">SERVIDOR CENTRAL</text>
        <text x="300" y="205" className="font-mono" fontSize="9" fill="var(--text-dim)">Home Assistant / Node-RED</text>
        <circle cx="300" cy="234" r="3" fill="var(--accent-2)" />
        <text x="310" y="238" className="font-mono" fontSize="9" fill="var(--accent-2)">OPERATIVO</text>
      </g>

      {/* ===== Servidor -> Dashboard (datos, azul) ===== */}
      <path d="M 375 150 V 100" className="flujo-datos" strokeWidth="1.5" fill="none" />
      <g>
        <rect x="315" y="30" width="120" height="65" rx="6" fill="var(--ink-2)" stroke="var(--line)" strokeWidth="1.5" />
        <path d="M328 75 L345 58 L360 68 L378 45" stroke="var(--line)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="388" y="60" width="8" height="16" fill="var(--line-dim)" />
        <rect x="400" y="52" width="8" height="24" fill="var(--line-dim)" />
        <rect x="412" y="66" width="8" height="10" fill="var(--line-dim)" />
        <text x="375" y="19" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--text-dim)">DASHBOARD</text>
      </g>

      {/* ===== Sensores de telemetría -> Servidor (datos, azul) ===== */}
      {[
        { x: 290, label: "TEMP" },
        { x: 400, label: "HUMEDAD" },
        { x: 510, label: "PRESIÓN" },
        { x: 610, label: "ENERGÍA" },
      ].map((s) => (
        <g key={s.label}>
          <path
            d={`M ${s.x + 45} 330 C ${s.x + 45} 300, 375 290, 375 255`}
            className="flujo-datos"
            strokeWidth="1.5"
            fill="none"
          />
          <rect x={s.x} y="330" width="90" height="48" rx="6" fill="var(--ink-2)" stroke="var(--line-dim)" strokeWidth="1.5" />
          <circle cx={s.x + 16} cy="354" r="4" fill="var(--line)" />
          <text x={s.x + 30} y="358" className="font-mono" fontSize="9" fill="var(--text-light)">{s.label}</text>
        </g>
      ))}
      <text x="400" y="392" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--text-dim)">SENSORES IOT / TELEMETRÍA</text>

      {/* ===== Servidor -> VFD (bus industrial RS485, verde) ===== */}
      <path d="M 470 195 H 590" className="flujo-rs485" strokeWidth="2" fill="none" />
      <text x="530" y="188" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--accent-2)">RS485</text>

      <g>
        <rect x="600" y="140" width="95" height="110" rx="6" fill="var(--ink-2)" stroke="var(--accent-2)" strokeWidth="1.5" />
        <rect x="614" y="156" width="67" height="28" rx="2" fill="var(--ink)" stroke="var(--accent-2)" strokeWidth="1" />
        <text x="647" y="176" textAnchor="middle" className="font-mono" fontSize="12" fontWeight="700" fill="var(--accent-2)">60.0Hz</text>
        <text x="647" y="205" textAnchor="middle" className="font-mono" fontSize="10" fontWeight="700" fill="var(--text-light)">VFD</text>
        <text x="647" y="222" textAnchor="middle" className="font-mono" fontSize="8" fill="var(--text-dim)">Variador de</text>
        <text x="647" y="233" textAnchor="middle" className="font-mono" fontSize="8" fill="var(--text-dim)">frecuencia</text>
      </g>

      {/* ===== VFD -> Motor (potencia AC, amarillo) ===== */}
      <path d="M 695 195 H 740" className="flujo-potencia" strokeWidth="3" fill="none" />

      <g>
        <circle cx="785" cy="195" r="30" fill="var(--ink-2)" stroke="#eab308" strokeWidth="1.5" />
        <circle cx="785" cy="195" r="7" fill="#eab308" />
        <path
          d="M785 165 L785 148 M760 178 L744 165 M810 178 L826 165 M755 195 L738 195 M815 195 L832 195"
          stroke="#eab308"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <text x="785" y="244" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--text-dim)">MOTOR</text>
      </g>

      {/* ===== Leyenda ===== */}
      <g className="font-mono" fontSize="9">
        <path d="M20 422 H40" className="flujo-comando" strokeWidth="2" />
        <text x="46" y="425" fill="var(--text-dim)">Comando</text>

        <path d="M150 422 H170" className="flujo-datos" strokeWidth="2" />
        <text x="176" y="425" fill="var(--text-dim)">Datos</text>

        <path d="M260 422 H280" className="flujo-rs485" strokeWidth="2" />
        <text x="286" y="425" fill="var(--text-dim)">RS485</text>

        <path d="M370 422 H390" className="flujo-potencia" strokeWidth="2" />
        <text x="396" y="425" fill="var(--text-dim)">Potencia AC</text>
      </g>
    </svg>
  );
}
