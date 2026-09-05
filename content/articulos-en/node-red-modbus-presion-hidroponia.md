---
titulo: "Node-RED + Modbus RTU: Water Pressure Monitoring for Hydroponics"
fecha: "2026-08-27"
descripcion: "How to build a Node-RED flow that reads a Modbus RTU pressure sensor, fires alerts, and automatically cuts the pump if something goes wrong."
categoria: "automatizacion-hogar-inteligente"
---

In a hydroponic system, a pump running dry or a clogged drip line can ruin a crop without warning — by the time you notice it visually, you've already lost days of growth. Monitoring water-circuit pressure in real time catches both problems as soon as they start, and with Node-RED you can build that alert without writing a single line of traditional code.

## 1. What Modbus RTU is, in plain terms

Modbus is the "language" most industrial sensors speak to report their data — like a shared phone line where each device has its own extension number. RTU is the variant that travels over an RS485 bus: a pair of wires over which several sensors can talk to a single computer, with no need for a separate cable for each one.

## 2. Parts list

- **Modbus RTU pressure sensor:** this is the one part not currently in our curated catalog — look for one with an RS485/Modbus RTU output and a pressure range that matches your pump (most home hydroponic systems run below 60 PSI). As soon as we add a verified one to the category, you'll find it in the [Industrial Control (B2B)](/en/categorias/control-industrial-b2b) ranking.
- **USB to RS485 converter:** so your computer (running Node-RED) can talk to the sensor. We use the [Waveshare converter with FT232RL chipset](/en/productos/B0B7MMSQXL) — it avoids the driver issues typical of generic clones.
- **Power supply (if the sensor needs one separately):** a [DIN-rail 5V supply](/en/productos/B0BY476TB8) is enough for low-consumption sensors.

## 3. Installing Node-RED and the Modbus package

With Node.js installed, `npm install -g node-red` lets you run it with the `node-red` command. From the node palette (menu ≡ → Manage palette → Install), search for and install `node-red-contrib-modbus` — this package adds the `Modbus-Read` and `Modbus-Client` nodes you'll need.

## 4. Configuring the Modbus Read node

Drag a `Modbus-Read` node onto the flow and configure:

- **Serial port:** whichever one Windows/Linux assigned to your USB-RS485 converter (for example `COM3` or `/dev/ttyUSB0`).
- **Slave address:** the device number programmed into your sensor (it's in the manual, usually `1` by default).
- **Register and quantity:** the Holding/Input register where the sensor publishes the pressure value — this is specific to each sensor, it's in its data sheet.
- **Poll rate:** every 1-5 seconds is enough for pressure monitoring; polling faster adds nothing and saturates the bus if you have several sensors.

## 5. Building the flow: read, convert, and alert

The minimal working flow looks like this:

`Modbus-Read` → `function` (converts the register's raw value to PSI or bar based on your sensor's scale) → `switch` (compares against two thresholds: a low one for "pump running dry" and a high one for "clog") → `notification` or `email` (fires the alert).

The `function` node is where you'll need the most tweaking, because every sensor scales its raw value differently — the sensor's data sheet has the conversion formula.

## 6. Real-time gauge dashboard

Installing `node-red-dashboard` (same process as the Modbus package) adds `ui_gauge` and `ui_chart` nodes. Connect the gauge directly to the `function` node's output (after unit conversion) to see the current pressure, and the chart to see the trend over the last few hours — useful for catching a clog forming gradually, not all at once.

## 7. Extra: cutting the pump automatically

If, besides the alert, you want the system to cut the pump on its own when there's a fault, the `switch` node's output can trigger a `Modbus-Write` node toward a [Modbus RTU relay module](/en/productos/B0CMH47846) that interrupts power to the pump. This turns passive monitoring into active protection — recommended if the system is going to run unsupervised for hours at a time.

## Our pick of the month

The communication hardware (RS485 converter, relay modules) is in the [Industrial Control (B2B)](/en/categorias/control-industrial-b2b) ranking. If your hydroponic system also needs pumps or more traditional irrigation control, the [HidroLab](https://www.riegocom.uk/categorias/bombas) catalog covers that part.

## Frequently asked questions

**Do I need to know how to program to do this?**
Not in the traditional sense — Node-RED is "low-code": you build the flow by dragging and connecting nodes. The only real code you'll write is the unit-conversion formula inside the `function` node, and it's usually a simple math operation.

**Can I run this on a Raspberry Pi instead of a PC?**
Yes, it's the most common option for leaving it running 24/7 without overspending — Node-RED runs natively on Raspberry Pi OS and the resource use of a flow like this is minimal.
