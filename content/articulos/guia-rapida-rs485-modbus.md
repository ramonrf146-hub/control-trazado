---
titulo: "RS485 vs Modbus: la diferencia y cómo integrar equipos industriales"
fecha: "2026-08-25"
descripcion: "RS485 es el cable; Modbus es el idioma. Qué es RS485, qué son Modbus RTU y Modbus TCP, y cómo elegir un gateway para conectar equipo serial viejo a una red Ethernet."
categoria: "control-industrial-b2b"
---

> **RS485 vs Modbus, en una línea:** RS485 es la capa física (cómo viajan las señales por el cable) y Modbus es el protocolo (qué significan los mensajes). No compiten: Modbus RTU suele correr sobre RS485, y Modbus TCP corre sobre Ethernet.

RS485 tiene más de 40 años y sigue siendo el estándar de facto en equipos industriales — PLCs, medidores de energía, variadores de frecuencia, sensores de proceso. No es porque nadie haya inventado algo mejor: es porque es simple, robusto ante ruido eléctrico, soporta distancias largas (hasta 1200 metros) y permite múltiples dispositivos en el mismo bus con muy poco cableado. Reemplazarlo no compensa cuando ya funciona.

## 1. RS485 vs. RS232 vs. RS422

RS232 es punto a punto (un dispositivo a un dispositivo) y de distancia corta, típico en puertos seriales viejos de PC. RS422 es full-duplex punto a punto de mayor distancia. RS485 es multipunto (hasta 32 dispositivos estándar en el mismo bus) y half-duplex en su forma más común — por eso es el elegido para redes industriales donde varios sensores o actuadores comparten la misma línea de comunicación.

## 2. Modbus RTU vs. Modbus TCP

Modbus es el protocolo que define cómo se estructuran los mensajes; RS485 es solo el medio físico por el que viajan. Modbus RTU corre directamente sobre el bus serial RS485 — es el formato que hablan la mayoría de los PLCs y medidores más viejos. Modbus TCP es la misma lógica de protocolo pero empaquetada para viajar sobre una red Ethernet/IP. Un gateway RS485-a-Ethernet lo que hace es traducir entre los dos: recibe Modbus RTU de un lado y lo reempaqueta como Modbus TCP del otro (o viceversa), sin que el dispositivo final sepa que hubo una traducción en el medio.

## Video: RS485 y Modbus explicados

<div class="not-prose my-6 overflow-hidden rounded-2xl border border-line-dim" style="aspect-ratio:16/9">
<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/WtBi7-IF9Fg" title="Beginner's Guide To Modbus RS485 Protocol | How They Work | A Complete Tutorial" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## 3. Cuándo necesitás un gateway/conversor

El caso típico: tenés equipo industrial (un medidor de energía, un PLC viejo, un VFD) que solo habla RS485, pero tu sistema de monitoreo o SCADA vive en la red Ethernet de la planta, potencialmente accesible desde otra parte del edificio o incluso remoto. En vez de tirar cable serial por toda la planta (limitado a 1200m y sensible a instalación), instalás un gateway cerca del equipo RS485 y de ahí en adelante todo viaja por la infraestructura de red existente.

## 4. Qué mirar al elegir un gateway

- **Soporte de múltiples estándares** (RS232/485/422 en el mismo equipo): útil si tenés una mezcla de equipo viejo y nuevo, te evita comprar un conversor distinto para cada protocolo.
- **Montaje en riel DIN:** si va dentro de un tablero eléctrico, esto no es opcional en la práctica.
- **Alimentación por PoE:** si el punto de instalación no tiene toma de corriente cerca (común en plantas grandes), un solo cable Ethernet resuelve datos y energía a la vez.
- **Modos de operación configurables** (TCP Server, TCP Client, UDP, multicast): confirmá que tu maestro Modbus del lado SCADA necesita un modo específico antes de comprar — el modo casi siempre se configura por software después de la compra, no viene fijo de fábrica.

## 5. Errores comunes de cableado

1. **Polaridad A/B invertida:** RS485 usa un par diferencial (A y B, a veces etiquetado D+/D-). Invertir la polaridad en un dispositivo del bus es la causa más común de "no comunica" en una instalación nueva.
2. **Falta de resistencia de terminación:** un bus RS485 largo necesita una resistencia de 120Ω en cada extremo físico del cable (no en cada dispositivo). Omitirla genera reflexiones de señal que causan errores intermitentes, difíciles de diagnosticar porque a veces "funciona igual" a corta distancia.
3. **Tierra común faltante:** aunque RS485 es diferencial y tolera bastante ruido, una referencia de tierra muy distinta entre dispositivos alejados puede seguir causando errores — en instalaciones largas, se recomienda un tercer conductor de referencia de señal (GND) además del par A/B.

## Opciones reales de este ranking

Si necesitás soporte triple RS232/485/422 con alimentación PoE, el [gateway Waveshare](/productos/B0BN61G4VF) de este ranking lo cubre. Si tu caso es más simple — solo Modbus RTU a Modbus TCP, sin necesidad de PoE — el [PUSR DR302](/productos/B0BR4ZRJGM) hace exactamente eso en formato riel DIN por menos precio, aunque con bastante menos reseñas respaldándolo en Amazon. Y si en vez de un solo bus tenés varios sensores o equipos RS485 independientes para centralizar (por ejemplo, varios tableros separados en la misma planta), el [Waveshare Servidor Serial 4-Ch](/productos/B0CQYGWBMZ) maneja 4 buses RS485 distintos al mismo tiempo desde una sola conexión Ethernet, combinando función de gateway Modbus, servidor serial y hasta MQTT en el mismo equipo — a diferencia de los otros dos, no trae PoE (necesita alimentación aparte) y todavía tiene pocas reseñas para lo que cuesta, así que conviene priorizarlo solo si de verdad necesitás los 4 buses simultáneos.

Ahora, si lo que necesitás no es traducir de RS485 a Ethernet sino conmutar cargas directamente por Ethernet, no hace falta el gateway intermedio: el [Waveshare de 30 canales](/productos/B0D9W2JRWF) de este ranking habla Modbus TCP de forma nativa (con opción PoE) — a diferencia de los módulos de relé Modbus RTU de 16 y 32 canales de este mismo catálogo, que solo se controlan por bus RS485. Tiene sentido específicamente cuando la instalación ya tiene red Ethernet tendida; si ya usás RS485 o preferís un producto con más historial de reseñas, los módulos RS485 son la opción más probada. Ojo con una diferencia práctica entre ambos: el módulo por Ethernet puede recibir su energía por el mismo cable PoE, pero los módulos RS485 de 8, 16 y 32 canales necesitan 24V DC aparte — para eso, la [fuente riel DIN MEAN WELL EDR-120-24](/productos/B00UR98FSS) de este ranking alcanza para alimentar varios de esos módulos a la vez desde un solo punto.

## Ojo: no todo lo que controla un proceso industrial habla RS485

Antes de sumar un gateway o un sensor Modbus a un proyecto, vale la pena confirmar que de verdad lo necesitás. El [Inkbird PID Temperature Controller Kit](/productos/B08Y8GX1WT) de este ranking, por ejemplo, controla la temperatura de un horno, una incubadora o una estación de reflow con su propio relé de estado sólido (SSR) de 40A y termocupla tipo K incluidos — pero es 100% standalone, sin ninguna comunicación RS485/Modbus: se programa y se lee directo en su propia pantalla, sin bus que cablear ni gateway que configurar. Existe una versión de la misma familia con salida Modbus RS485 si más adelante necesitás integrarlo a un SCADA centralizado, pero tiene bastante menos respaldo de reseñas en Amazon que esta versión standalone — para un proceso térmico aislado que no necesita reportarle nada a ningún sistema central, el controlador simple alcanza y sobra.

## Nuestra recomendación del mes

Mirá el ranking de [Control Industrial B2B](/categorias/control-industrial-b2b): incluimos un gateway con soporte triple RS232/485/422 y alimentación PoE, útil tanto para instalaciones nuevas como para integrar equipo legado. Para un ejemplo real de lectura Modbus aplicado a un proyecto propio (no solo industrial), la guía de [Node-RED con un sensor de presión para hidroponía](/articulos/node-red-modbus-presion-hidroponia) muestra el mismo protocolo del lado del software.

## Preguntas frecuentes

**¿Cuál es la diferencia entre RS485 y Modbus?**
RS485 es el estándar eléctrico: define cómo viajan las señales por el cable (par diferencial A/B, hasta 1200 metros, hasta 32 dispositivos estándar en el bus). Modbus es el protocolo: define el formato de los mensajes — quién pregunta, qué registro lee, cómo responde. Uno es el medio y el otro es el idioma, y suelen usarse juntos.

**¿Modbus RTU usa RS485?**
Casi siempre. Modbus RTU es la variante serial de Modbus y lo más común es que corra sobre un bus RS485, aunque también puede ir sobre RS232 en una conexión punto a punto. Modbus TCP, en cambio, viaja por Ethernet y no necesita RS485.

**¿Puedo usar Modbus sin RS485?**
Sí. Modbus TCP funciona sobre una red Ethernet normal, y Modbus RTU puede usar RS232 o RS422 en vez de RS485. RS485 es solo la opción más popular cuando hay varios equipos en el mismo bus o distancias largas.

**¿Necesito saber programar para usar un gateway Modbus?**
No para la instalación básica — la mayoría se configuran desde una interfaz web simple. Sí ayuda entender conceptos de direcciones de registro Modbus si vas a mapear variables específicas del equipo.

**¿RS485 va a desaparecer eventualmente?**
No en el corto ni mediano plazo. Hay demasiado equipo industrial instalado que lo usa, y sigue siendo la opción más económica y robusta para buses cortos/medianos en ambientes con ruido eléctrico.
