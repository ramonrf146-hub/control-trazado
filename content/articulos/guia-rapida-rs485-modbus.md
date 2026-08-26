---
titulo: "RS485 y Modbus: guía rápida para integrar equipos industriales"
fecha: "2026-08-25"
descripcion: "Qué es RS485, la diferencia entre Modbus RTU y Modbus TCP, y cómo elegir un gateway/conversor para conectar equipo serial viejo a una red Ethernet."
categoria: "control-industrial-b2b"
---

RS485 tiene más de 40 años y sigue siendo el estándar de facto en equipos industriales — PLCs, medidores de energía, variadores de frecuencia, sensores de proceso. No es porque nadie haya inventado algo mejor: es porque es simple, robusto ante ruido eléctrico, soporta distancias largas (hasta 1200 metros) y permite múltiples dispositivos en el mismo bus con muy poco cableado. Reemplazarlo no compensa cuando ya funciona.

## 1. RS485 vs. RS232 vs. RS422

RS232 es punto a punto (un dispositivo a un dispositivo) y de distancia corta, típico en puertos seriales viejos de PC. RS422 es full-duplex punto a punto de mayor distancia. RS485 es multipunto (hasta 32 dispositivos estándar en el mismo bus) y half-duplex en su forma más común — por eso es el elegido para redes industriales donde varios sensores o actuadores comparten la misma línea de comunicación.

## 2. Modbus RTU vs. Modbus TCP

Modbus es el protocolo que define cómo se estructuran los mensajes; RS485 es solo el medio físico por el que viajan. Modbus RTU corre directamente sobre el bus serial RS485 — es el formato que hablan la mayoría de los PLCs y medidores más viejos. Modbus TCP es la misma lógica de protocolo pero empaquetada para viajar sobre una red Ethernet/IP. Un gateway RS485-a-Ethernet lo que hace es traducir entre los dos: recibe Modbus RTU de un lado y lo reempaqueta como Modbus TCP del otro (o viceversa), sin que el dispositivo final sepa que hubo una traducción en el medio.

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

## Nuestra recomendación del mes

Mirá el ranking de [Control Industrial B2B](/categorias/control-industrial-b2b): incluimos un gateway con soporte triple RS232/485/422 y alimentación PoE, útil tanto para instalaciones nuevas como para integrar equipo legado.

## Preguntas frecuentes

**¿Necesito saber programar para usar un gateway Modbus?**
No para la instalación básica — la mayoría se configuran desde una interfaz web simple. Sí ayuda entender conceptos de direcciones de registro Modbus si vas a mapear variables específicas del equipo.

**¿RS485 va a desaparecer eventualmente?**
No en el corto ni mediano plazo. Hay demasiado equipo industrial instalado que lo usa, y sigue siendo la opción más económica y robusta para buses cortos/medianos en ambientes con ruido eléctrico.
