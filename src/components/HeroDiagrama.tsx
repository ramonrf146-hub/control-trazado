/**
 * Imagen de firma del hero: animación (GIF) del sistema de automatización
 * completo — entradas de usuario (Alexa/smartphone) hacia un servidor
 * central (Home Assistant/Node-RED), dashboard de monitoreo, telemetría
 * de sensores, y control de un VFD vía bus RS485 hasta un motor
 * industrial trifásico.
 *
 * El archivo original pesaba 5.5MB (1536×1024, 30 cuadros) — se
 * redujo a ~270KB (640×427, colores optimizados) con gifsicle antes de
 * subirlo, para no golpear el tiempo de carga en mobile.
 *
 * Quienes activaron "reducir movimiento" en su sistema ven en cambio un
 * cuadro estático (mismo diseño, sin animar) — un GIF no puede
 * congelarse solo como sí lo hace una animación CSS, así que servimos
 * un archivo aparte para ese caso.
 */
import type { Locale } from "@/lib/i18n";

const ALT_ANIMADO: Record<Locale, string> = {
  es: "Animación de un sistema de automatización: Alexa y un smartphone envían comandos a un servidor Home Assistant/Node-RED, que muestra un dashboard, recibe telemetría de sensores, y controla un variador de frecuencia por bus RS485 hasta un motor industrial",
  en: "Animation of an automation system: Alexa and a smartphone send commands to a Home Assistant/Node-RED server, which shows a dashboard, receives sensor telemetry, and drives a variable frequency drive over an RS485 bus to an industrial motor",
};

const ALT_ESTATICO: Record<Locale, string> = {
  es: "Diagrama de un sistema de automatización: Alexa y un smartphone envían comandos a un servidor Home Assistant/Node-RED, que muestra un dashboard, recibe telemetría de sensores, y controla un variador de frecuencia por bus RS485 hasta un motor industrial",
  en: "Diagram of an automation system: Alexa and a smartphone send commands to a Home Assistant/Node-RED server, which shows a dashboard, receives sensor telemetry, and drives a variable frequency drive over an RS485 bus to an industrial motor",
};

export default function HeroDiagrama({ locale }: { locale: Locale }) {
  return (
    <div className="w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-automatizacion.gif"
        alt={ALT_ANIMADO[locale]}
        className="hidden w-full h-auto rounded-lg motion-safe:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-automatizacion-estatico.gif"
        alt={ALT_ESTATICO[locale]}
        className="hidden w-full h-auto rounded-lg motion-reduce:block"
      />
    </div>
  );
}
