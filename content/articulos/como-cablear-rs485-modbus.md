---
titulo: "Cómo cablear RS485: líneas A/B, terminación de 120Ω y polarización para Modbus RTU"
fecha: "2026-10-28"
descripcion: "Cómo cablear un bus RS485 que funcione: topología en cadena, polaridad A/B, resistencia de 120Ω en los dos extremos, polarización, malla a tierra y una lista para diagnosticar fallos."
categoria: "control-industrial-b2b"
---

> **Respuesta corta:** cableá RS485 como una sola cadena de par trenzado blindado, A con A y B con B en cada equipo. Poné una resistencia de terminación de 120Ω en cada uno de los dos extremos físicos del bus (y en ningún otro lado), conectá la malla a tierra en un solo punto y agregá polarización en un solo punto si las líneas quedan flotando cuando el bus está en reposo. Si nada responde, invertí A y B antes que cualquier otra cosa.

La mayoría de los "mi equipo Modbus no responde" no son problemas de software. Son problemas de cableado: líneas invertidas, falta de terminador, topología en estrella o parámetros seriales distintos. Esta guía cubre la capa física. Para la diferencia entre RS485 y Modbus en sí, empezá por la [guía rápida RS485 vs Modbus](/articulos/guia-rapida-rs485-modbus).

## 1. Cadena, no estrella

RS485 es un bus multipunto: un solo par de cables pasa de equipo en equipo y todos se conectan a ese mismo par. El cable tiene que ir del primer equipo al segundo, al tercero, y así hasta terminar en el último. Evitá las estrellas (varios cables saliendo de un mismo punto) y mantené cualquier derivación de la línea principal lo más corta posible; los ramales largos generan reflejos que corrompen los datos.

El estándar admite hasta 32 cargas unitarias estándar en un bus y llega a unos 1.200 metros a baja velocidad. Velocidad y distancia se compensan: cuanto más largo el cable, menor la velocidad (baudios) que conviene usar.

## 2. A y B: el etiquetado no es consistente

Las dos líneas de señal se llaman A y B, pero los fabricantes no se ponen de acuerdo en cuál es cuál. También vas a ver D+ / D- o TX+ / TX- en bornes del mismo tipo. La regla es simple: conectá la misma etiqueta con la misma etiqueta en todos los equipos. Si un equipo queda mudo después de revisar los parámetros, invertí los dos cables en ese equipo. En la mayoría de los casos invertirlos no daña nada, pero revisá siempre el manual del equipo.

## 3. Cable: par trenzado blindado

Usá un par trenzado blindado. El cable RS485 tiene una impedancia característica de unos 120Ω; un cable de red Cat5e o Cat6 sirve para muchos tramos cortos (usá un par para A/B). Mantené el cable de datos lejos de los cables de motores y de potencia, y cruzalos en ángulo recto si tienen que encontrarse. En un tablero, es el mismo criterio de la [guía de tablero eléctrico industrial](/articulos/como-armar-tablero-electrico-industrial): separar las fuentes de ruido del cableado de señal.

## 4. Terminación: 120Ω solo en los dos extremos

Una señal que viaja por un cable largo se refleja en el final si el final no está terminado. La solución es una resistencia que iguale la impedancia del cable, normalmente 120Ω, entre A y B en los dos extremos físicos del bus: el primer equipo (o el convertidor o gateway que encabeza la línea) y el último equipo.

- Terminá **solo** los dos extremos. Una terminación en equipos intermedios carga el bus y debilita la señal.
- Los tramos muy cortos a baja velocidad muchas veces funcionan sin terminación, pero agregarla es un seguro barato.
- Muchos equipos traen una resistencia de 120Ω incorporada que se activa con un puente o un interruptor. Si el tuyo no la tiene, un bloque terminador ayuda: el [bloque terminador RS485 de 120Ω Jienk](/productos/B0BBQHMGJG) de este ranking es una placa para riel DIN con una resistencia que se conecta o desconecta con un selector, lo que facilita probar con y sin terminación.

<div class="not-prose my-6 overflow-hidden rounded-2xl border border-line-dim" style="aspect-ratio:16/9">
<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/fVoDTJeqkvU" title="How to Install Terminating Resistors - Advantech IPlanet Series" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## 5. Polarización: un estado de reposo definido

Cuando nadie transmite, las dos líneas pueden quedar flotando y el ruido puede leerse como datos. La polarización es un pull-up en una línea y un pull-down en la otra para que el estado de reposo quede definido. Aplicala en **un solo punto**, normalmente en el maestro o en el convertidor que encabeza el bus. Muchos maestros y convertidores ya la incluyen, así que revisá la documentación antes de agregar resistencias, porque acumular varios puntos de polarización distorsiona los niveles de señal.

## 6. Malla y tierra

Conectá la malla del cable a tierra en **un solo extremo**. Aterrar ambos extremos puede crear un lazo de tierra que inyecta ruido. Si los equipos del bus se alimentan de fuentes distintas, revisá si sus puertos RS485 están aislados; los puertos aislados toleran mucho mejor las diferencias entre tierras. Algunos equipos exponen un borne de referencia (a menudo rotulado GND o SC) para conectar una referencia común.

## 7. Parámetros seriales y direcciones

El cableado puede estar perfecto y el bus seguir mudo si los parámetros difieren. Todos los equipos del bus deben compartir la misma velocidad (baudios), paridad y bits de parada (un punto de partida muy común es 9600 baudios, 8 bits de datos, sin paridad, 1 bit de parada, pero seguí los manuales de tus equipos). Cada equipo necesita una dirección Modbus **única**, en el rango de 1 a 247. Un módulo de relés como el [relé Modbus RTU de 8 canales de Waveshare](/productos/B083J24HCM) permite configurar su dirección para que varios módulos compartan un bus.

## 8. Lista para diagnosticar fallos

1. **No responde nada:** revisá la alimentación, después invertí A y B en el equipo mudo, y confirmá velocidad, paridad y dirección.
2. **Funciona con un equipo y falla con varios:** buscá direcciones duplicadas, falta de terminador en el extremo lejano o un terminador de más en el medio.
3. **Errores intermitentes:** sospechá de la terminación, la polarización, una estrella o un ramal largo, la puesta a tierra de la malla, o un cable pegado a un motor o a un variador.
4. **Necesitás ver qué hay en el bus:** conectá una laptop con un convertidor simple como el [convertidor industrial USB a RS485 de Waveshare](/productos/B0B7MMSQXL) y consultá el equipo con una herramienta Modbus.

## Cómo llevar el bus a tu red

Cuando el bus funciona, un gateway permite leerlo por Ethernet. El [gateway RS232/485/422 a Ethernet de Waveshare](/productos/B0BN61G4VF) y el [gateway Modbus RTU a Modbus TCP PUSR DR302](/productos/B0BR4ZRJGM) de este ranking son dos opciones, y un equipo de campo como el [sensor de temperatura y humedad Tzone](/productos/B0D3H8ZGLT) es una buena primera lectura. El paso siguiente suele ser un flujo en Node-RED, que explica la [guía de Node-RED + Modbus](/articulos/node-red-modbus-presion-hidroponia).

## Preguntas frecuentes

**¿Necesito una resistencia de terminación en RS485?**
En tramos largos o a velocidades altas, sí: una resistencia de 120Ω en cada uno de los dos extremos del bus. En tramos muy cortos a baja velocidad muchas veces funciona sin ella, pero terminar los dos extremos es lo más seguro.

**¿Qué cable es A y cuál es B?**
Depende del fabricante, así que las etiquetas no son confiables entre marcas. Conectá A con A y B con B en todos los equipos, y si un equipo no responde, invertí el par en ese equipo.

**¿Puedo cablear RS485 en estrella?**
No se recomienda. RS485 está pensado como una cadena con los dos extremos terminados. Los ramales cortos suelen tolerarse; los ramales largos causan reflejos y errores de comunicación.

**¿Qué cable uso para RS485?**
Par trenzado blindado con una impedancia característica cercana a 120Ω. Para tramos cortos, un par de un cable Cat5e o Cat6 suele funcionar.

**¿Qué largo puede tener un cable RS485?**
Hasta unos 1.200 metros a baja velocidad. Cuanto mayor la velocidad en baudios, menor la distancia confiable.

**¿Por qué no responde mi equipo Modbus RTU?**
Las causas habituales son A/B invertidos, velocidad, paridad o dirección distintas, un terminador que falta o sobra, o una dirección duplicada. Seguí la lista de arriba en ese orden.
