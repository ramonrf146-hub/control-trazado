# Estado actual — AutomatizaLab (controltrazado.com)

> Este archivo se actualiza en cada checkpoint importante para poder retomar el trabajo desde cualquier PC con solo hacer `git pull`. No es un log línea por línea — para el detalle exacto de cada cambio, ver `git log`.

## Sitio
Afiliado Amazon de automatización de hogar inteligente + control industrial B2B. Tag de afiliado: `controltrazado-20`.
Catálogo en `data/productos.json`, artículos en `content/articulos/` (ES) y `content/articulos-en/` (EN).

## Pendiente
- Ninguna tarea abierta específica de este sitio en este momento.

## Últimos cambios importantes
- Chtaixi 32A DIN-rail breaker (B09TVS6X1C) agregado a `control-industrial-b2b`, ranking 31 — linkeado en `certificacion-seguridad-enchufes-inteligentes.md` (reemplazó el texto "necesitás sumar un fusible o térmica vos").
- Tzone Modbus RTU Temp/Humidity sensor (B0D3H8ZGLT, ranking 30, `control-industrial-b2b`) — linkeado en `node-red-modbus-presion-hidroponia.md`.
- SONOFF SenseGuard SNZB-04PR2 4-pack (B0GKFB66JZ, ranking 16, `automatizacion-hogar-inteligente`) — linkeado en `tuya-vs-ecosistema-abierto-para-hogar-inteligente.md` junto al sensor de movimiento existente.
- Se descartó deliberadamente un sensor de presión Modbus que encajaba perfecto en un hueco de contenido, por ser de marca genérica sin reviews — se sustituyó por una alternativa honesta con la limitación aclarada en el texto.

## Convenciones a respetar
- Todo producto nuevo: entrada bilingüe (ES/EN) siguiendo el schema existente en `productos.json`, con al menos una limitación real declarada.
- Preferir enriquecer huecos ya declarados en los artículos (frases tipo "no tenemos en nuestro catálogo", "necesitás sumar... aparte") en vez de agregar productos arbitrarios.
- Rechazar productos genéricos/sin reviews aunque encajen perfecto en el hueco de contenido — preferir una alternativa bien documentada y aclarar la sustitución honestamente.
- Actualizar y republicar el artifact "Manifiesto de Pines" (Pinterest) sin que el usuario lo pida — es compartido entre HidroLab y AutomatizaLab.
- Validar JSON + build antes de commitear. Verificar la URL en producción antes de reportar como terminado.
