import type { Locale } from "./i18n";

export interface PreguntaCategoria {
  pregunta: string;
  respuesta: string;
}

export interface ContenidoCategoria {
  comoElegir: string[];
  faq: PreguntaCategoria[];
}

/**
 * Texto de apoyo de cada categoría (cómo elegir + preguntas frecuentes).
 * Solo afirmaciones generales: lo específico de cada producto vive en su
 * ficha. Las categorías sin entrada no muestran el bloque.
 */
export const CONTENIDO_CATEGORIAS: Record<string, Record<Locale, ContenidoCategoria>> = {
  "automatizacion-hogar-inteligente": {
    es: {
      comoElegir: [
        "Elegí el estándar antes que el dispositivo: Matter, Zigbee, Z-Wave o WiFi propietario determinan qué equipos van a convivir entre sí.",
        "Fijate si necesita un hub o puente propio y si funciona sin la nube del fabricante, para no depender de un servidor externo.",
        "Verificá el voltaje y la carga que soporta: un interruptor de 10 A no sirve para un motor grande.",
      ],
      faq: [
        {
          pregunta: "¿Qué es Matter y por qué importa?",
          respuesta:
            "Matter es un estándar de domótica pensado para que dispositivos de distintas marcas funcionen juntos en un mismo ecosistema (Apple Home, Google Home, Alexa, Home Assistant) sin depender de la app de cada fabricante.",
        },
        {
          pregunta: "¿Necesito un hub para la domótica?",
          respuesta:
            "Depende del protocolo: los dispositivos WiFi suelen funcionar sin hub; Zigbee y Z-Wave necesitan un coordinador, que puede ser un hub o un adaptador USB conectado a Home Assistant.",
        },
        {
          pregunta: "¿Se puede automatizar el hogar sin depender de la nube?",
          respuesta:
            "Sí, con dispositivos de control local (Zigbee, Z-Wave, Matter sobre Thread o WiFi con API local) y un controlador como Home Assistant.",
        },
      ],
    },
    en: {
      comoElegir: [
        "Choose the standard before the device: Matter, Zigbee, Z-Wave or proprietary WiFi decide which devices will work together.",
        "Check whether it needs its own hub or bridge and whether it works without the manufacturer's cloud, so you don't depend on an external server.",
        "Verify the voltage and load it supports: a 10 A switch is not suitable for a large motor.",
      ],
      faq: [
        {
          pregunta: "What is Matter and why does it matter?",
          respuesta:
            "Matter is a home-automation standard designed so devices from different brands work together in one ecosystem (Apple Home, Google Home, Alexa, Home Assistant) without relying on each manufacturer's app.",
        },
        {
          pregunta: "Do I need a hub for home automation?",
          respuesta:
            "It depends on the protocol: WiFi devices usually work without a hub; Zigbee and Z-Wave need a coordinator, which can be a hub or a USB adapter attached to Home Assistant.",
        },
        {
          pregunta: "Can I automate my home without depending on the cloud?",
          respuesta:
            "Yes, with local-control devices (Zigbee, Z-Wave, Matter over Thread, or WiFi with a local API) and a controller such as Home Assistant.",
        },
      ],
    },
  },
  "control-industrial-b2b": {
    es: {
      comoElegir: [
        "Confirmá el protocolo de comunicación del equipo (Modbus RTU sobre RS485, Modbus TCP, etc.) antes de elegir el gateway o el módulo.",
        "Revisá la tensión de alimentación y el aislamiento: en entornos industriales importa que el módulo soporte el rango de tu tablero.",
        "Mirá el formato de montaje (por ejemplo riel DIN) y las certificaciones que exige tu instalación.",
      ],
      faq: [
        {
          pregunta: "¿Qué diferencia hay entre RS485 y Modbus?",
          respuesta:
            "RS485 es la capa física (cómo viajan las señales por el cable) y Modbus es el protocolo (qué significan los mensajes). Modbus RTU suele correr sobre RS485.",
        },
        {
          pregunta: "¿Qué es un gateway de Modbus a Ethernet?",
          respuesta:
            "Un equipo que traduce entre Modbus serie (RTU sobre RS485 o RS232) y Modbus TCP por red Ethernet, para conectar equipos viejos a una red moderna.",
        },
        {
          pregunta: "¿Cuántos dispositivos soporta un bus RS485?",
          respuesta:
            "El estándar admite hasta 32 cargas unitarias en un bus y distancias de hasta unos 1200 metros, según la velocidad y el cableado.",
        },
      ],
    },
    en: {
      comoElegir: [
        "Confirm the equipment's communication protocol (Modbus RTU over RS485, Modbus TCP, etc.) before choosing the gateway or module.",
        "Check supply voltage and isolation: in industrial settings the module must tolerate your panel's range.",
        "Look at the mounting format (for example DIN rail) and the certifications your installation requires.",
      ],
      faq: [
        {
          pregunta: "What is the difference between RS485 and Modbus?",
          respuesta:
            "RS485 is the physical layer (how the signals travel over the wire) and Modbus is the protocol (what the messages mean). Modbus RTU usually runs over RS485.",
        },
        {
          pregunta: "What is a Modbus to Ethernet gateway?",
          respuesta:
            "A device that translates between serial Modbus (RTU over RS485 or RS232) and Modbus TCP over an Ethernet network, to connect older equipment to a modern network.",
        },
        {
          pregunta: "How many devices can an RS485 bus handle?",
          respuesta:
            "The standard allows up to 32 unit loads on one bus and distances of up to about 1,200 meters, depending on speed and cabling.",
        },
      ],
    },
  },
};
