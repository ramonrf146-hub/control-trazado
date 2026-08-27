---
titulo: "Cómo instalar un VFD a 240V para una bomba de 15HP: guía paso a paso"
fecha: "2026-08-27"
descripcion: "Guía práctica de instalación: VFD vs. arrancador suave, protecciones, cableado y monitoreo remoto para motores de bomba pesados a 240V."
categoria: "control-industrial-b2b"
---

Arrancar un motor de 15HP directo a la línea (sin ningún tipo de control de arranque) genera un pico de corriente de hasta 6-8 veces la corriente nominal — eso golpea el motor, estresa el cableado y puede hacer caer la tensión de toda la instalación por un instante. Esta guía te lleva paso a paso por la instalación de un sistema de arranque controlado a 240V para ese caso, con las decisiones reales que vas a tener que tomar en el camino.

## 1. ¿VFD o arrancador suave? La pregunta que define todo

Un variador de frecuencia (VFD) regula la velocidad del motor todo el tiempo, no solo al arranque — sirve si tu bomba necesita distintos caudales según el momento. Un arrancador suave, en cambio, solo suaviza el arranque y el motor termina girando a velocidad fija, como si fuera arranque directo pero sin el golpe inicial.

Para 15HP, la mayoría de los VFDs de entrada terminan en 2-5HP — a esa potencia, el catálogo suele tener más opciones de [arrancadores suaves](/productos/B0BM9BQKJY) que de variadores. Si tu bomba realmente necesita variar de velocidad (por ejemplo, ajustar presión según demanda), vale la pena buscar un VFD dimensionado específicamente para 15HP; si solo necesitás un arranque que no golpee la instalación, un arrancador suave como el [ATO de 15HP/11kW](/productos/B0BM9BQKJY) resuelve el problema a menor costo. Como referencia de cómo se ve un VFD para motores más chicos, [este modelo de 5HP con control vectorial](/productos/B09C5NDXDG) mantiene torque incluso a bajas revoluciones.

## 2. Antes de comprar nada: el checklist eléctrico

- **Tipo de acometida:** ¿tu instalación es monofásica o trifásica de 240V? Los equipos de entrada monofásica-a-trifásica existen, pero no todos los modelos lo soportan — confirmalo antes de comprar.
- **Contactor de derivación:** varios arrancadores suaves (incluido el ATO de 15HP) no lo traen incluido — es una pieza aparte que hay que sumar al presupuesto.
- **Amperaje disponible:** un motor de 15HP a 240V ronda los 40-45A nominales — tu tablero y tu cableado existente tienen que soportar eso con margen.

## 3. Armar el tablero: la base física

Todo el equipo de control (arrancador o VFD, protecciones, terminales) va montado sobre un [riel DIN](/productos/B0D2XGDQYD), que además de ordenar la instalación permite sacar y cambiar módulos sin desarmar cableado fijo. Los cables de cada circuito se distribuyen usando [bloques de terminales](/productos/B0CW1K4461) en vez de empalmes sueltos, y si el tablero tiene mucho cableado interno, una [canaleta](/productos/B081GWZTB7) lo mantiene prolijo y facilita el mantenimiento futuro.

## 4. Protecciones: no es un paso opcional

Un motor de esta potencia necesita protección contra sobrecarga, falla a tierra y sobretensión. Un [disyuntor GFCI con protección de sobretensión](/productos/B0CRKN96TB) cubre las tres en un solo módulo — pero ojo: varias instalaciones reales (documentadas en reseñas de este tipo de equipo, incluyendo un caso que terminó en incendio) fallan porque el diagrama de cableado para 208V/240V sin neutro se interpreta mal. Antes de energizar cualquier cosa, confirmá el diagrama exacto para tu configuración de voltaje — si tenés dudas, esa es la parte donde conviene un electricista, no un tutorial.

## 5. Cableado de potencia

Para las conexiones internas del tablero que quedan cerca de componentes que generan calor (como el propio arrancador o VFD trabajando a full carga), un [cable de silicona](/productos/B08GFQP2MG) no se pone rígido ni se raja con el tiempo como el PVC común — vale la pena en los tramos cortos cerca del equipo de potencia, aunque no hace falta usarlo en todo el tablero.

## 6. Paso avanzado: monitoreo remoto por Modbus

Si tu arrancador o VFD tiene salida RS485/Modbus, podés leer sus parámetros (corriente, estado, fallas) desde una computadora sin tener que pararte frente al tablero. Para conectar el bus a una PC directamente, un [conversor USB-RS485](/productos/B0B7MMSQXL) alcanza; si preferís centralizarlo en la red del taller, un [gateway RS485 a Ethernet con PoE](/productos/B0BN61G4VF) evita tender un cable de corriente hasta el panel.

## Nuestra recomendación del mes

Mirá el ranking completo de [Control Industrial B2B](/categorias/control-industrial-b2b) — ahí podés comparar arrancadores suaves, VFDs y todo el hardware de tablero (riel DIN, protecciones, cableado) que mencionamos en esta guía, con nuestra nota técnica en cada uno.

## Preguntas frecuentes

**¿Puedo usar un VFD de 5HP para arrancar un motor de 15HP "más suave" nada más, sin que regule velocidad?**
No — el VFD tiene que estar dimensionado para la potencia real del motor, no solo para la función que le vayas a pedir. Subdimensionarlo genera fallas por sobrecorriente. Para 15HP con la única necesidad de un arranque suave, el arrancador suave dedicado es la opción correcta.

**¿El contactor de derivación es realmente necesario?**
Si tu arrancador suave no lo trae incluido (como es el caso del ATO de 15HP), sí — sin él, el motor sigue pasando toda su corriente de operación a través de la electrónica del arrancador de forma permanente, en vez de derivarla a un contactor mecánico una vez que ya arrancó. Es una pieza de seguridad y eficiencia, no un accesorio opcional.
