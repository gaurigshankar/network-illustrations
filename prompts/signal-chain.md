# Objective

Produce **one self-contained HTML file** that renders an interactive infographic of the **LTE signal chain** — the end-to-end transformation of user traffic between the core network and a handset — built with **D3.js v7**.

The artifact is **field-training material** for a junior O&M engineer with an electronics background who has never worked on a live network. It must serve three goals: **comprehension** ("I understand what the signal *is* at each point and what changes between points"), **location** ("I know which physical box performs each step"), and **diagnosis** ("given a symptom, I can point at the stage where it probably broke").

# Source reference → how to interpret it

> Subject: Horizontal infographic showing the transformation of a signal: IP packet → digital baseband IQ samples → fibre → analogue RF → radiated beam → handset. Each stage a distinct icon with a short label, left-to-right flow, blue and orange palette, flat design.

**Correct one flaw in this reference before drawing it.** The list mixes *representations of the signal* (IP packet, IQ samples, analogue RF, radiated beam) with a *transport medium* (fibre). Fibre is not a transformation — nothing about the signal's information content changes crossing it. Render the chain on **two parallel horizontal tracks**:

- **Upper track — representation:** what the signal *is* at each point.
- **Lower track — hardware & medium:** which physical box or link it lives in at that point (core router → backhaul → BBU/DU → fibre CPRI/eCPRI link → RRU → antenna → air interface → handset).

The two tracks align vertically so a learner reads "at this point the signal is X, and it is inside Y."

# Visual style

- Flat vector, no gradients except a single subtle glow marking the analogue/digital crossover.
- Line weights: 1.5px stage outlines, 1px connectors, 0.75px internal icon detail.
- One sans-serif family, two type sizes (label, caption). Generous whitespace.

## Palette policy — the colours must carry meaning, not decorate

| Meaning | Treatment |
|---|---|
| Digital domain (packets, IQ samples, fibre-borne data) | **blue** family |
| Analogue / RF domain (RF carrier, radiated beam, air) | **orange** family |
| The DAC/ADC crossover | explicit visual marker — a labelled boundary where blue becomes orange, since this is the moment the signal changes nature |
| Selection | one neutral accent hue used nowhere else |
| Fault highlight | red outline glow only, never a fill swap |

A **persistent legend** decoding the two tracks, the two directions, the palette and the arrow types must be visible at all times.

## Arrow semantics — two distinct types, visually distinguished

- **Transformation arrows** (solid, with a conversion glyph): the signal changes representation. *IP packet → IQ samples*, *IQ → analogue RF*.
- **Transport arrows** (dashed or tube-styled): the signal is carried unchanged through a medium. *Across the fibre*, *along the coax jumper*.

Mixing these two into one arrow style misrepresents the subject.

# Content model

All content lives in a **single declarative `CHAIN` array at the top of the script**, fully separate from drawing code.

## Two node kinds — schemas branch

**`kind: "stage"`** (a representation of the signal)

| Field | Meaning |
|---|---|
| `id`, `name` | stable slug; display name, acronym expanded on first use |
| `whatItIs` | one sentence: what the signal is at this point |
| `livesIn` | the physical box or medium (links to the hardware track) |
| `typicalValues` | representative figures, labelled *typical, vendor-dependent* |
| `observableAs` | how an engineer would actually see or measure it (counter, LED, spectrum analyser, drive-test app) |

**`kind: "transition"`** (a conversion or transport step — **these are first-class clickable objects, not decoration**)

| Field | Meaning |
|---|---|
| `id`, `name` | e.g. `dac-upconvert` / "Digital-to-analogue conversion and upconversion" |
| `whatChanges` | the core teaching content: precisely what is different before vs after |
| `performedBy` | the component that does it |
| `whyNeeded` | why this step exists at all |
| `commonFaults` | 2–3 entries, each *symptom → first thing to check* |
| `userSymptom` | what the end user experiences when this step degrades |
| `latencyContribution` | approximate share of the end-to-end budget, or `null` |

## Chain to include (minimum)

**Downlink, left to right:**

1. IP packet at the core network
2. *(transport)* backhaul link to the site
3. Packet arrives at BBU/DU — scheduling, ciphering, segmentation
4. *(transformation)* baseband processing → modulation → **IQ samples**
5. IQ samples as a digital stream
6. *(transport)* CPRI / eCPRI over fibre to the tower top
7. *(transformation)* **DAC and upconversion** → analogue RF — mark this as the digital/analogue crossover
8. Analogue RF at the RRU output, after the power amplifier
9. *(transport)* coax jumper to the antenna
10. *(transformation)* antenna → radiated beam, with pattern and tilt
11. Propagation through air — path loss, fading, interference
12. *(transformation)* handset antenna → LNA → **ADC** → demodulation → recovered IP packet
13. Recovered packet at the handset application

**Uplink:** the same chain in reverse as a second, visually distinct row — **not** drawn as a mirror image. Explicitly flag the asymmetries: handset transmit power is orders of magnitude below the RRU's, the handset PA is weak and battery-constrained, and uplink is usually the coverage-limiting direction.

# Required interactive layers — toggle control, one active at a time

1. **Signal chain** (default) — the two-track diagram.
2. **Scale** — a logarithmic magnitude strip beneath the chain plotting the spans that a row of equal-sized icons otherwise hides: fibre line rate, RF carrier frequency, radiated power, received power at the handset. This contrast is the lesson; make it visible.
3. **Latency budget** — a proportional bar breaking the end-to-end delay into scheduling, processing, propagation and retransmission, aligned to the stages that cause each.
4. **Fault localisation** — a picker of real symptoms (*no service · slow throughput · dropped call · one sector down · high uplink noise*). Selecting one highlights the stages and transitions that could produce it and orders them by likelihood, with the first on-site check for each.
5. **Physical mapping** — a simplified site silhouette (core → cabinet → fibre → tower-top RRU → antenna → handset) with each chain stage tied by a leader line to where it actually happens.

# Required sub-visual — IQ samples

IQ is the hardest concept in this chain and must not be reduced to an icon. Selecting the IQ stage expands an inline sub-visual within the detail panel showing:

- I and Q as two quadrature components, 90° apart.
- A constellation diagram with a selectable modulation order (QPSK / 16-QAM / 64-QAM), and a note on how higher orders demand better SNR.
- How a stream of complex samples reconstructs a modulated waveform.
- A brief statement of why the fibre carries samples rather than the RF itself.

# Interaction specification

- **Two levels only:** chain → node detail. Anything deeper is text within the panel (the IQ sub-visual is the sole exception, and it is inline, not a new level).
- **Do not zoom into a single stage.** This is a flow diagram; severing a stage from its neighbours defeats its purpose. On selection, keep the entire chain visible, desaturate unselected nodes to ~35% opacity, and expand the selected node in place.
- **Detail panel is a side rail** on wide viewports, never an overlay on the chain.
- **Reflow, not scroll:** below 820px the chain rotates to a **vertical top-to-bottom flow** with the two tracks side by side, and the rail moves beneath. A horizontal scrollbar is not acceptable — it conceals the flow the diagram exists to convey.
- **Hover ≠ click:** hover or focus shows a tooltip (name + one line); click opens the full panel.
- **Direction toggle:** downlink / uplink / both.
- **Affordance:** `cursor: pointer` and 2px outline on hover/focus; one subtle pulse across interactive nodes on first load, then stop.
- **Animation:** a packet/waveform travels the chain, visibly changing form at each transformation boundary. **This is the only place Canvas may be used** (see renderer rules). Provide play/pause and a step control.
- **Initial state is not blank:** the rail opens with an orientation paragraph explaining the two tracks and the digital/analogue crossover, plus the legend.

# Accessibility — required

- Sequential keyboard traversal follows chain order: `Tab` moves along the chain including transitions; `Enter`/`Space` selects; `Escape` deselects.
- Arrow keys move between the representation and hardware tracks at the same position, and between downlink and uplink rows.
- Every node has an `aria-label` and a `<title>` child announcing kind and position ("Transformation, step 7 of 13").
- Visible focus ring, distinct from the hover outline.
- Text contrast ≥ 4.5:1. **Domain is never conveyed by colour alone** — every node carries a text tag (`digital` / `analogue`).
- Honour `prefers-reduced-motion: reduce`: disable the travelling animation, which must remain fully steppable manually.

# Renderer — mandatory

- **SVG is the primary renderer**, built with D3 data-joins from `CHAIN`. Rationale: ~30 discrete hit targets requiring focus, ARIA labelling and CSS states — none of which Canvas provides natively.
- **Canvas is permitted only as an optional overlay** for the travelling packet/waveform particles. Structure, labels, hit-testing and interaction must never live in Canvas.

# Neutrality and generation scope

- Keep hardware generic. Where a vendor term is commonly heard, note it parenthetically without favouring any vendor.
- Where LTE and 5G differ, say so briefly in text: CPRI vs eCPRI, and the fact that the functional split moves in 5G (CU/DU), which shifts *where* on this chain the fibre boundary falls. Do not redraw the chain for 5G.

# Technical constraints

- **One HTML file**, openable by double-click, no build step.
- D3 v7 from a CDN; **no other libraries**, no frameworks, no external image or font assets — all geometry and icons drawn in code.
- All strings, values, fault text and symptom mappings live in `CHAIN`; drawing code reads from it and hardcodes nothing.
- One-line comment above each drawing function stating what it renders.

# Accuracy guardrail

Present every figure — fibre line rates, sample rates, carrier frequencies, transmit and received power levels, latency components — as **representative ranges for typical LTE macro deployments**, marked as such in the UI. Do not present invented numbers as specification values.

# Deliverable

Return the complete HTML file. After it, add a short plain-text note (outside the code) listing: which nodes are interactive and of which kind, which values are illustrative rather than authoritative, and one suggested extension.
