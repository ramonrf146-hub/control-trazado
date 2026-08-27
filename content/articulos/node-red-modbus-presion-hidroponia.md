---
titulo: "Node-RED + Modbus RTU: monitoreo de presión de agua para hidroponía"
fecha: "2026-08-27"
descripcion: "Cómo armar un flujo de Node-RED que lee un sensor de presión Modbus RTU, dispara alertas y corta la bomba automáticamente si algo falla."
categoria: "automatizacion-hogar-inteligente"
---

En un sistema hidropónico, una bomba trabajando en seco o un goteo obstruido arruinan un cultivo sin avisar — para cuando lo notás a simple vista, ya perdiste días de crecimiento. Monitorear la presión del circuito de agua en tiempo real detecta ambos problemas apenas empiezan, y con Node-RED podés armar esa alerta sin escribir una sola línea de código tradicional.

## 1. Qué es Modbus RTU, en criollo

Modbus es el "idioma" que hablan la mayoría de los sensores industriales para reportar sus datos — como un cable telefónico compartido donde cada dispositivo tiene su propio número de línea. RTU es la variante que viaja sobre un bus RS485: un par de cables por donde varios sensores pueden conversar con una sola computadora, sin necesitar un cable separado para cada uno.

## 2. Lista de materiales

- **Sensor de presión Modbus RTU:** esta es la única pieza que hoy no tenemos en nuestro catálogo curado — buscá uno con salida RS485/Modbus RTU y rango de presión acorde a tu bomba (la mayoría de sistemas hidropónicos domésticos trabajan por debajo de 60 PSI). Apenas sumemos uno verificado a la categoría, lo vas a encontrar en el [ranking de Control Industrial B2B](/categorias/control-industrial-b2b).
- **Conversor USB a RS485:** para que tu computadora (donde corre Node-RED) pueda hablarle al sensor. Usamos el [conversor Waveshare con chipset FT232RL](/productos/B0B7MMSQXL) — evita los problemas de drivers típicos de los clones genéricos.
- **Fuente de alimentación (si el sensor la necesita aparte):** una [fuente riel DIN 5V](/productos/B0BY476TB8) alcanza para sensores de bajo consumo.

## 3. Instalar Node-RED y el paquete Modbus

Con Node.js instalado, `npm install -g node-red` te deja correrlo con el comando `node-red`. Desde la paleta de nodos (menú ≡ → Manage palette → Install), buscá e instalá `node-red-contrib-modbus` — este paquete agrega los nodos `Modbus-Read` y `Modbus-Client` que vas a necesitar.

## 4. Configurar el nodo Modbus Read

Arrastrá un nodo `Modbus-Read` al flujo y configurá:

- **Puerto serial:** el que asignó Windows/Linux a tu conversor USB-RS485 (por ejemplo `COM3` o `/dev/ttyUSB0`).
- **Dirección del esclavo:** el número de dispositivo que tiene programado tu sensor (viene en el manual, normalmente `1` por defecto).
- **Registro y cantidad:** el registro Holding/Input donde el sensor publica el valor de presión — este dato es específico de cada sensor, está en su hoja técnica.
- **Frecuencia de lectura:** cada 1-5 segundos alcanza para monitoreo de presión; leer más rápido no aporta nada y satura el bus si tenés varios sensores.

## 5. Armar el flujo: leer, convertir y alertar

El flujo mínimo funcional tiene esta forma:

`Modbus-Read` → `function` (convierte el valor crudo del registro a PSI o bar según la escala de tu sensor) → `switch` (compara contra dos umbrales: uno bajo para "bomba en seco" y uno alto para "obstrucción") → `notification` o `email` (dispara la alerta).

El nodo `function` es donde más ajuste vas a necesitar, porque cada sensor escala su valor crudo de forma distinta — la hoja técnica del sensor trae la fórmula de conversión.

## 6. Dashboard con gauge en tiempo real

Instalando `node-red-dashboard` (mismo proceso que el paquete Modbus) sumás nodos `ui_gauge` y `ui_chart`. Conectá el gauge directo a la salida del nodo `function` (después de la conversión de unidades) para ver la presión actual, y el chart para ver la tendencia de las últimas horas — útil para detectar una obstrucción que se va formando de a poco, no de golpe.

## 7. Extra: cortar la bomba automáticamente

Si además de la alerta querés que el sistema corte la bomba solo ante una falla, la salida del nodo `switch` puede disparar un nodo `Modbus-Write` hacia un [módulo de relé Modbus RTU](/productos/B0CMH47846) que interrumpa la alimentación de la bomba. Esto convierte el monitoreo pasivo en una protección activa — recomendable si el sistema va a quedar corriendo sin supervisión por varias horas.

## Nuestra recomendación del mes

El hardware de comunicación (conversor RS485, módulos de relé) está en el [ranking de Control Industrial B2B](/categorias/control-industrial-b2b). Si tu sistema hidropónico también necesita bombas o control de riego más tradicional, el catálogo de [HidroLab](https://www.riegocom.uk/categorias/bombas) cubre esa parte.

## Preguntas frecuentes

**¿Necesito saber programar para hacer esto?**
No en el sentido tradicional — Node-RED es "low-code": armás el flujo arrastrando y conectando nodos. El único código real que vas a escribir es la fórmula de conversión de unidades dentro del nodo `function`, y suele ser una operación matemática simple.

**¿Puedo correr esto en una Raspberry Pi en vez de una PC?**
Sí, es la opción más común para dejarlo corriendo 24/7 sin gastar de más — Node-RED corre nativo en Raspberry Pi OS y el consumo de un flujo como este es mínimo.
