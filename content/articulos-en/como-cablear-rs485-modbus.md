---
titulo: "RS485 Wiring Guide: A/B Lines, 120Ω Termination and Biasing for Modbus RTU"
fecha: "2026-10-28"
descripcion: "How to wire an RS485 bus that actually works: daisy-chain topology, A/B polarity, the 120Ω terminator at both ends, biasing, shield grounding and a troubleshooting checklist."
categoria: "control-industrial-b2b"
---

> **The short answer:** wire RS485 as a single daisy chain of shielded twisted pair, A to A and B to B on every device. Put a 120Ω termination resistor at each of the two physical ends of the bus (and nowhere else), connect the shield to ground at one point only, and add biasing at one point if the lines float when the bus is idle. If nothing answers, swap A and B before anything else.

Most "my Modbus device doesn't respond" problems are not software problems. They are wiring problems: swapped lines, a missing terminator, a star topology, or mismatched serial settings. This guide covers the physical layer. For the difference between RS485 and Modbus itself, start with the [RS485 vs Modbus quick guide](/en/articulos/guia-rapida-rs485-modbus).

## 1. Daisy chain, not star

RS485 is a multipoint bus: one pair of wires runs from device to device, and every device taps into that same pair. The cable should go from the first device to the second, to the third, and so on, ending at the last one. Avoid star layouts (several cables fanning out from one point) and keep any branch off the main line as short as possible; long stubs cause reflections that corrupt data.

The standard allows up to 32 standard unit loads on one bus and runs up to about 1,200 meters (4,000 ft) at low speeds. Speed and distance trade off: the longer the cable, the lower the baud rate you should use.

## 2. A and B: the labeling is not consistent

The two signal lines are called A and B, but manufacturers don't agree on which is which. You will also see D+ / D- or TX+ / TX- on the same kind of terminal. The rule is simple: connect the same label to the same label on every device. If a device is silent after you have checked the settings, swap the two wires at that device. In most cases swapping does no damage, but always check the device's manual.

## 3. Cable: shielded twisted pair

Use one shielded twisted pair. RS485 cable has a characteristic impedance of around 120Ω; a Cat5e or Cat6 network cable works for many short runs (use one twisted pair for A/B). Keep the data cable away from motor and power cables, and cross them at right angles if they must meet. In a panel, this is the same reasoning as in the [industrial electrical panel guide](/en/articulos/como-armar-tablero-electrico-industrial): separate noise sources from signal wiring.

## 4. Termination: 120Ω at the two ends only

A signal travelling down a long cable reflects at the end unless the end is terminated. The fix is a resistor matching the cable impedance, normally 120Ω, across A and B at the two physical ends of the bus: the first device (or the converter or gateway at the head of the line) and the last device.

- Terminate **only** the two ends. Termination on middle devices loads the bus and weakens the signal.
- Very short runs at low baud rates often work without termination, but adding it is cheap insurance.
- Many devices have a built-in 120Ω resistor you enable with a jumper or switch. If yours doesn't, a dedicated terminator block helps: the [Jienk RS485 120Ω terminator block](/en/productos/B0BBQHMGJG) in this ranking is a DIN-rail board with a resistor you switch in or out with a selector, which makes it easy to test with and without termination.

## 5. Biasing: a defined idle state

When nobody is transmitting, the two lines can float, and noise may be read as data. Biasing is a pull-up on one line and a pull-down on the other so that the idle state is defined. Apply it at **one point only**, usually at the master or the converter at the head of the bus. Many masters and converters already include it, so check the documentation before adding resistors, because stacking several biasing points distorts the signal levels.

## 6. Shield and ground

Connect the cable shield to ground at **one end only**. Grounding both ends can create a ground loop that injects noise. If devices on the bus are powered from different supplies, check whether their RS485 ports are isolated; isolated ports are far more tolerant of differences between grounds. Some devices expose a reference terminal (often labeled GND or SC) for connecting a common reference.

## 7. Serial settings and addresses

Wiring can be perfect and the bus still silent if the settings differ. Every device on the bus must share the same baud rate, parity and stop bits (a very common starting point is 9600 baud, 8 data bits, no parity, 1 stop bit, but follow your devices' manuals). Each device needs a **unique** Modbus address, in the range 1 to 247. A relay module such as the [Waveshare 8-channel Modbus RTU relay](/en/productos/B083J24HCM) lets you configure its address so several modules can share one bus.

## 8. Troubleshooting checklist

1. **No response at all:** check power, then swap A and B at the silent device, then confirm baud rate, parity and address.
2. **Works with one device, fails with several:** look for duplicate addresses, a missing terminator at the far end, or an extra terminator in the middle.
3. **Intermittent errors:** suspect termination, biasing, a star or long stub, shield grounding, or a cable running next to a motor or VFD.
4. **You need to see what is on the bus:** connect a laptop through a simple converter such as the [Waveshare industrial USB to RS485 converter](/en/productos/B0B7MMSQXL) and poll the device with a Modbus tool.

## Connecting the bus to your network

Once the bus works, a gateway lets you read it over Ethernet. The [Waveshare RS232/485/422 to Ethernet gateway](/en/productos/B0BN61G4VF) and the [PUSR DR302 Modbus RTU to Modbus TCP gateway](/en/productos/B0BR4ZRJGM) in this ranking are two options, and a field device like the [Tzone temperature and humidity sensor](/en/productos/B0D3H8ZGLT) is a good first thing to read. The next step after that is usually a flow in Node-RED, covered in the [Node-RED + Modbus guide](/en/articulos/node-red-modbus-presion-hidroponia).

## Frequently asked questions

**Do I need a termination resistor on RS485?**
On long runs or fast baud rates, yes: a 120Ω resistor at each of the two ends of the bus. On very short runs at low speed it often works without, but terminating the two ends is the safe default.

**Which wire is A and which is B?**
It depends on the manufacturer, so the labels are not reliable between brands. Connect A to A and B to B across all devices, and if a device doesn't answer, swap the pair at that device.

**Can I wire RS485 in a star?**
It is not recommended. RS485 is designed as a daisy chain with the two ends terminated. Short stubs are usually tolerated; long branches cause reflections and communication errors.

**What cable should I use for RS485?**
Shielded twisted pair with about 120Ω characteristic impedance. For short runs, one pair of a Cat5e or Cat6 cable commonly works.

**How long can an RS485 cable be?**
Up to roughly 1,200 meters at low speeds. The higher the baud rate, the shorter the reliable distance.

**Why does my Modbus RTU device not respond?**
The usual causes are swapped A/B, different baud rate, parity or address settings, a missing or extra terminator, or a duplicated address. Work through the checklist above in that order.
