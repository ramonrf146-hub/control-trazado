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
export default function HeroDiagrama() {
  return (
    <div className="w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-automatizacion.gif"
        alt="Animación de un sistema de automatización: Alexa y un smartphone envían comandos a un servidor Home Assistant/Node-RED, que muestra un dashboard, recibe telemetría de sensores, y controla un variador de frecuencia por bus RS485 hasta un motor industrial"
        className="hidden w-full h-auto rounded-lg motion-safe:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-automatizacion-estatico.gif"
        alt="Diagrama de un sistema de automatización: Alexa y un smartphone envían comandos a un servidor Home Assistant/Node-RED, que muestra un dashboard, recibe telemetría de sensores, y controla un variador de frecuencia por bus RS485 hasta un motor industrial"
        className="hidden w-full h-auto rounded-lg motion-reduce:block"
      />
    </div>
  );
}
