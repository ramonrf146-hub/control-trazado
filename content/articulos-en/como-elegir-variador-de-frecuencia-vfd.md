---
titulo: "How to Choose a Variable Frequency Drive (VFD) for Your Workshop"
fecha: "2026-08-25"
descripcion: "Power, input/output type (single-phase to three-phase), vector vs. V/F control, and common mistakes when sizing a VFD."
categoria: "control-industrial-b2b"
---

A variable frequency drive (VFD) controls the speed of an AC motor by varying the frequency of the signal it delivers, instead of the traditional way of starting a motor direct-on-line. For a lathe, a mill, a pump, or a fan, that means fine speed control, smooth starts that don't mechanically stress the equipment, and in many cases real energy savings.

## 1. Single-phase vs. three-phase input

The detail most people overlook: many small workshops only have a single-phase 220V electrical feed, but the motor they want to control is three-phase (typical in used industrial machines). That's where a "single-to-three phase" VFD comes in — it takes single-phase input and internally generates a synthetic three-phase output for the motor. It's not the same as a three-phase-to-three-phase VFD: if your installation is single-phase, explicitly confirm the model supports it before buying, because not all of them do.

## 2. Sizing the power correctly

Look at the motor's data plate (not the machine's commercial name) to get the real HP or kW. The practical rule is to choose a VFD with capacity equal to or slightly greater than the motor's — never less. Slightly oversizing (for example, a 2HP VFD for a 1.5HP motor) gives margin for startup spikes without risking the drive; being right at the limit or under it causes overcurrent failures at the worst possible moment.

## 3. V/F control vs. vector control

V/F (volts per hertz) control is the simplest, cheapest method: it keeps a fixed ratio between voltage and frequency. It works well for simple loads like fans or centrifugal pumps. Vector control, on the other hand, calculates the motor's behavior in real time and holds torque far better at low RPM — important if you'll be threading, cutting at reduced speed, or any operation where the motor has to deliver real force without spinning fast. If your application is machining (lathe, mill), prioritize vector over V/F even if it costs a bit more.

## 4. Output frequency range

A standard 60Hz motor doesn't benefit from a VFD that reaches 400Hz — that extended range only matters if you have a high-speed spindle specifically designed to take advantage of it (typical in precision CNC routers). For the vast majority of workshop applications, a 0-60Hz or 0-120Hz range is more than enough; don't overpay for a range you won't use.

## 5. Protections and basic installation

A VFD worth buying should include, at minimum, overcurrent, overtemperature, and short-circuit protection. Dynamic braking (or the option to add a braking resistor) matters if your application needs to stop the motor quickly rather than let it coast to a stop by inertia. During installation, keep the cable between the VFD and the motor as short as possible and consider shielded cable — long unshielded cables generate electrical noise (EMI) that can interfere with other electronics near the panel.

## Our pick of the month

Check out the [Industrial Control (B2B)](/en/categorias/control-industrial-b2b) ranking: we include single-phase-to-three-phase entry models for workshops without a three-phase feed, and vector-control models for anyone who needs torque at low RPM.

## Frequently asked questions

**Can I use any VFD with any three-phase motor?**
Generally yes, as long as the power and voltage match — but confirm the motor's base frequency compatibility (most are 60Hz in the Americas, 50Hz across much of the rest of the world) before configuring the VFD's parameters.

**Does a VFD actually save energy?**
Yes, especially on pumps and fans where the load varies — controlling speed instead of mechanically throttling the flow (with a valve, for example) measurably reduces consumption. In machining applications, energy savings are secondary to the benefit of speed control.
