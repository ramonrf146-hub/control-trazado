---
titulo: "Entry-Level VFD: How to Choose a Variable Frequency Drive for a Small Workshop"
fecha: "2026-08-25"
descripcion: "How to pick an entry-level VFD: single-phase to three-phase input, sizing against the motor's data plate, V/F vs vector control, and the protections that matter."
categoria: "control-industrial-b2b"
---

> **How to choose an entry-level VFD in four checks:** (1) input — a single-phase feed needs a drive that explicitly accepts single-phase input; (2) power — equal to or slightly above the motor's data-plate rating, never below; (3) control — V/F is enough for fans and pumps, vector control for lathes and mills that need torque at low RPM; (4) protections — overcurrent, overtemperature and short-circuit at minimum.

A variable frequency drive (VFD) controls the speed of an AC motor by varying the frequency of the signal it delivers, instead of the traditional way of starting a motor direct-on-line. For a lathe, a mill, a pump, or a fan, that means fine speed control, smooth starts that don't mechanically stress the equipment, and in many cases real energy savings.

## 1. Single-phase vs. three-phase input

The detail most people overlook: many small workshops only have a single-phase 220V electrical feed, but the motor they want to control is three-phase (typical in used industrial machines). That's where a "single-to-three phase" VFD comes in — it takes single-phase input and internally generates a synthetic three-phase output for the motor. It's not the same as a three-phase-to-three-phase VFD: if your installation is single-phase, explicitly confirm the model supports it before buying, because not all of them do.

## 2. Sizing the power correctly

Look at the motor's data plate (not the machine's commercial name) to get the real HP or kW. The practical rule is to choose a VFD with capacity equal to or slightly greater than the motor's — never less. Slightly oversizing (for example, a 2HP VFD for a 1.5HP motor) gives margin for startup spikes without risking the drive; being right at the limit or under it causes overcurrent failures at the worst possible moment.

## 3. V/F control vs. vector control

V/F (volts per hertz) control is the simplest, cheapest method: it keeps a fixed ratio between voltage and frequency. It works well for simple loads like fans or centrifugal pumps. Vector control, on the other hand, calculates the motor's behavior in real time and holds torque far better at low RPM — important if you'll be threading, cutting at reduced speed, or any operation where the motor has to deliver real force without spinning fast. If your application is machining (lathe, mill), prioritize vector over V/F even if it costs a bit more.

## 4. Output frequency range

A standard 60Hz motor doesn't benefit from a VFD that reaches 400Hz — that extended range only matters if you have a high-speed spindle specifically designed to take advantage of it (typical in precision CNC routers). For the vast majority of workshop applications, a 0-60Hz or 0-120Hz range is more than enough; don't overpay for a range you won't use. This ranking's [MOLLOM 2HP (1.5kW)](/en/productos/B0BM5JPXVY) is a concrete example of when paying for that extra range does make sense: single-phase input to three-phase output just like this catalog's bigger models, but with an output range up to 3000Hz — built specifically for small CNC spindles up to 2HP that actually use that frequency, not for a standard workshop motor where that range would just be money spent for nothing.

## 5. Protections and basic installation

A VFD worth buying should include, at minimum, overcurrent, overtemperature, and short-circuit protection. Dynamic braking (or the option to add a braking resistor) matters if your application needs to stop the motor quickly rather than let it coast to a stop by inertia. During installation, keep the cable between the VFD and the motor as short as possible and consider shielded cable — long unshielded cables generate electrical noise (EMI) that can interfere with other electronics near the panel.

## Video: how to choose a VFD, step by step

<div class="not-prose my-6 overflow-hidden rounded-2xl border border-line-dim" style="aspect-ratio:16/9">
<iframe width="100%" height="100%" src="https://www.youtube.com/embed/51L8izOtqck" title="How to select/choose a VFD (Variable Frequency Drive) — AutomationDirect" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

This video from AutomationDirect (an industrial supplier) walks through the same criteria covered in this guide, in order — motor power, input/output type, and which datasheet specs actually matter vs. which are just marketing — before picking a specific model.

## Our pick of the month

Check out the [Industrial Control (B2B)](/en/categorias/control-industrial-b2b) ranking: we include single-phase-to-three-phase entry models for workshops without a three-phase feed, and vector-control models for anyone who needs torque at low RPM. Once you know which VFD you need and the next step is installing it, the [installing a 240V VFD for a 15HP pump](/en/articulos/instalar-vfd-240v-bomba-15hp) guide walks through the full process, protections included.

## Frequently asked questions

**Can I use any VFD with any three-phase motor?**
Generally yes, as long as the power and voltage match — but confirm the motor's base frequency compatibility (most are 60Hz in the Americas, 50Hz across much of the rest of the world) before configuring the VFD's parameters.

**Does a VFD actually save energy?**
Yes, especially on pumps and fans where the load varies — controlling speed instead of mechanically throttling the flow (with a valve, for example) measurably reduces consumption. In machining applications, energy savings are secondary to the benefit of speed control.

**What is the best entry-level VFD for a small workshop?**
There is no single best model — it depends on your feed and your motor. Start from the four checks at the top: single-phase input if that's all your shop has, power at or slightly above the motor's data plate, V/F control for fans and pumps or vector control for machining, and basic protections. The [Industrial Control (B2B)](/en/categorias/control-industrial-b2b) ranking lists the entry models side by side.

**Can a single-phase VFD run a three-phase motor?**
Yes — that is exactly what a single-phase-input, three-phase-output drive is built for. Check the manufacturer's notes on single-phase input, because some drives need to be oversized for that use, and confirm the model explicitly supports it.

**How do I size a VFD for my motor?**
Read the motor's data plate (HP or kW and current), then pick a drive rated equal to or slightly above that. Being right at the limit is what causes overcurrent trips at start-up.
