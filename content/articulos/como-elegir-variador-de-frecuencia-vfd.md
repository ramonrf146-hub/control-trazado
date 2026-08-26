---
titulo: "Cómo elegir un variador de frecuencia (VFD) para tu taller"
fecha: "2026-08-25"
descripcion: "Potencia, tipo de entrada/salida (monofásica a trifásica), control vectorial vs. V/F, y errores comunes al dimensionar un VFD."
categoria: "control-industrial-b2b"
---

Un variador de frecuencia (VFD, por sus siglas en inglés) controla la velocidad de un motor de corriente alterna variando la frecuencia de la señal que le entrega, en vez de la forma tradicional de arrancar un motor directo a la línea. Para un torno, una fresadora, una bomba o un ventilador, eso significa control fino de velocidad, arranques suaves que no estresan mecánicamente el equipo, y en muchos casos ahorro de energía real.

## 1. Entrada monofásica vs. trifásica

El dato que más gente pasa por alto: muchos talleres pequeños solo tienen acometida eléctrica monofásica de 220V, pero el motor que quieren controlar es trifásico (típico en máquinas industriales de segunda mano). Ahí es donde entra un VFD "single-to-three phase" — toma la entrada monofásica y genera internamente una salida trifásica sintética para el motor. No es lo mismo que un VFD trifásico-a-trifásico: si tu instalación es monofásica, confirmá explícitamente que el modelo lo soporta antes de comprar, porque no todos lo hacen.

## 2. Dimensionar la potencia correctamente

Mirá la placa de datos del motor (no el nombre comercial de la máquina) para sacar el HP o kW real. La regla práctica es elegir un VFD con capacidad igual o ligeramente mayor a la del motor — nunca menor. Sobredimensionar un poco (por ejemplo, un VFD de 2HP para un motor de 1.5HP) da margen para picos de arranque sin arriesgar el variador; quedarte justo o por debajo genera fallas por sobrecorriente en el peor momento posible.

## 3. Control V/F vs. control vectorial

El control V/F (voltios por hertz) es el método más simple y económico: mantiene una relación fija entre voltaje y frecuencia. Funciona bien para cargas simples como ventiladores o bombas centrífugas. El control vectorial, en cambio, calcula el comportamiento del motor en tiempo real y mantiene mucho mejor el torque a bajas revoluciones — importante si vas a roscar, cortar a velocidad reducida, o cualquier operación donde el motor tenga que entregar fuerza real sin girar rápido. Si tu aplicación es de mecanizado (torno, fresa), priorizá vectorial sobre V/F aunque cueste un poco más.

## 4. Rango de frecuencia de salida

Un motor estándar de 60Hz no se beneficia de un VFD que llega a 400Hz — ese rango extendido solo importa si tenés un husillo de alta velocidad diseñado específicamente para aprovecharlo (típico en routers CNC de precisión). Para la gran mayoría de aplicaciones de taller, un rango de 0-60Hz o 0-120Hz es más que suficiente; no pagues de más por un rango que no vas a usar.

## 5. Protecciones y instalación básica

Un VFD que vale la pena debería incluir protección contra sobrecorriente, sobretemperatura y cortocircuito como mínimo. El frenado dinámico (o la opción de agregar una resistencia de frenado) es relevante si tu aplicación necesita parar el motor rápido, no dejar que se detenga por inercia. En la instalación, mantené el cable entre el VFD y el motor lo más corto posible y considerá cable apantallado — cables largos sin apantallar generan ruido eléctrico (EMI) que puede interferir con otros equipos electrónicos cerca del tablero.

## Nuestra recomendación del mes

Mirá el ranking de [Control Industrial B2B](/categorias/control-industrial-b2b): incluimos modelos de entrada monofásica-a-trifásica para talleres sin acometida trifásica, y modelos con control vectorial para quien necesita torque a bajas RPM.

## Preguntas frecuentes

**¿Puedo usar cualquier VFD con cualquier motor trifásico?**
En términos generales sí, siempre que la potencia y el voltaje coincidan — pero confirmá la compatibilidad de frecuencia base del motor (la mayoría son 60Hz en América, 50Hz en buena parte del resto del mundo) antes de configurar los parámetros del VFD.

**¿Un VFD ahorra energía de verdad?**
Sí, especialmente en bombas y ventiladores donde la carga varía — controlar la velocidad en vez de estrangular el flujo mecánicamente (con una válvula, por ejemplo) reduce el consumo de forma medible. En aplicaciones de mecanizado el ahorro energético es secundario frente al beneficio de control de velocidad.
