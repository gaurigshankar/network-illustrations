# Objective

Produce **one self-contained HTML file** that renders an interactive, drill-down cutaway illustration of an **outdoor telecom cabinet interior**, built with **D3.js v7**.

The artifact is **field-training material** for a junior O&M engineer who has never opened a live cabinet. Every decision should serve three goals: **recognition** ("I will know this shelf when the door swings open"), **causation** ("I understand why power flows this way and why the layout is stacked like this"), and **diagnosis** ("I know what a red LED on the rectifier means and what I check first").

# Source reference → how to interpret it

> Subject: Cutaway of an outdoor telecom cabinet. BBU subrack with pluggable boards and status LEDs at the top; modular rectifier shelf in the middle; DC distribution panel with labelled miniature circuit breakers; four 12V VRLA batteries at the bottom; copper earth bar on the side wall. Flat vector, labelled.

Render as **flat technical vector illustration**, front-elevation cutaway: the door is removed and drawn as a thin outline hinged open to the left, so the viewer understands they are looking at an opened cabinet rather than a floating rack. Do not attempt photorealism, texture or perspective depth beyond a slight inner-shadow to convey enclosure depth.

**Include a scale reference:** overall cabinet dimensions annotated on one edge, and rack-unit (U) markings down the mounting rail.

# Visual style

- Flat fills, no gradients except a single subtle inner shadow for cabinet depth.
- Muted structural palette: cool grey enclosure, gunmetal shelves, warm copper for the earth bar and busbar only.
- Line weights: 1.5px enclosure and shelf outlines, 0.75px module detail (fins, handles, screws), 1px leader lines.
- One sans-serif family, two type sizes (label, caption). Generous whitespace.

## Colour policy — enforce strictly, four meanings must not collide

| Meaning | Reserved treatment |
|---|---|
| DC polarity | red / black **cable strokes only**, never fills |
| LED status | small circular indicators only, always paired with a text label |
| Fault / alarm state | amber and red **outline glow** on the element, never a fill swap |
| Selection | the single accent hue, used nowhere else |

A **persistent legend** decoding all four must be visible at all times, not hidden in a panel.

# Content model — required for every interactive element

All content lives in a **single declarative `ELEMENTS` array at the top of the script**, fully separate from drawing code. Each entry carries this exact schema:

| Field | Meaning |
|---|---|
| `id` | stable slug |
| `level` | `cabinet` \| `shelf` \| `module` |
| `parent` | id of containing element |
| `name` | display name, acronym expanded on first use |
| `function` | one sentence |
| `inputs` / `outputs` | what enters and leaves (electrical, optical, or data) |
| `whyHere` | why this sits at this height in the stack |
| `typicalValues` | representative figures, labelled *typical, vendor-dependent* |
| `onSiteAppearance` | how a technician physically recognises it |
| `commonFaults` | 2–3 entries, each *symptom → first thing to check* |
| `safetyNote` | hazard specific to this element, or `null` |
| `vendorAliases` | generic term primary; vendor names parenthesised, none favoured |

## Elements to include (minimum)

**Top — BBU subrack:** subrack chassis; main control/baseband boards (at least two); transmission/backhaul board with its port; fibre ports feeding the tower-top RRU; **one vacant slot with a blanking plate**; status LED cluster; fan module.

**Middle — rectifier shelf:** shelf chassis; AC input and its protection; three to four modular rectifiers; **one vacant rectifier position**; controller/supervision module with display.

**Lower-middle — DC distribution:** DC busbar; labelled miniature circuit breakers (mix of load and battery breakers); low-voltage disconnect contactor; alarm dry-contact terminal block.

**Bottom — energy storage:** four 12V VRLA batteries in series string; inter-cell links; battery temperature sensor.

**Side wall and structure:** copper earth bar with labelled bonding leads; surge protection device on AC input; cable management / cable entry gland plate; door with filter; intake and exhaust vents.

# Interaction specification

- **Three levels of drill-down:** cabinet overview → shelf → individual module/breaker/battery. No deeper; anything below module level is text within the panel.
- **Breadcrumb navigation is mandatory** (`Cabinet › Rectifier shelf › Rectifier module 2`), each segment clickable. In addition, provide `Escape` to step up one level and click-on-background to return to overview.
- **Detail panel is a right-hand side rail**, never an overlay. Below 900px viewport width it collapses beneath the diagram, and the diagram scrolls to keep the selected element in view.
- **Layout must respect the portrait subject:** cabinet occupies a tall column, side rail sits beside it, so the composition reads landscape overall. SVG uses `viewBox` with `preserveAspectRatio="xMidYMid meet"`; usable from 360px to 1920px wide.
- **On selection:** selected element takes the accent colour, siblings desaturate to ~35% opacity, view eases toward it via `d3.zoom` — **600ms, `d3.easeCubicOut`**.
- **Hover ≠ click:** hover or focus shows a lightweight tooltip (name + one-line function); click opens the full panel.
- **Affordance:** `cursor: pointer` and a 2px outline on hover/focus for interactive regions; one subtle pulse across all interactive elements on first load, then stop.
- **Initial state is not blank:** the rail opens with an orientation paragraph, the stacking rationale (weight low, heat rising, electronics away from battery outgassing, service reach height), and the legend.

## Required layered views — toggle control, one active at a time

1. **Physical** (default) — the illustration as drawn.
2. **Power flow** — AC mains → SPD → rectifier shelf → DC busbar → breakers → loads, with batteries shown as a parallel reservoir. Animate direction of current. *This is the only place Canvas may be used* (see renderer rules).
3. **Signal & data** — fibre from BBU to tower-top RRU, backhaul path out, alarm dry contacts.
4. **Thermal & airflow** — intake low, exhaust high, filter position, arrows showing path; note how a blocked filter drives summer rectifier derating.
5. **Earthing** — every bonding lead traced to the copper earth bar and out to the earth mat.

## Required interactive mode — mains failure simulation

A control that runs a timed sequence over roughly 20 seconds, with a scrub/step control and a live readout of bus voltage and elapsed time:

`Mains healthy → AC fails → rectifiers drop out → batteries assume load → bus voltage sags → alarm raised on dry contact → low-voltage disconnect trips → loads shed`

At each stage, name the alarm a technician would actually see and what they should do. This mode is the centrepiece of the artifact — a static cabinet teaches only half the subject.

## Required reference table — breaker schedule

Render a readable table beside or beneath the DC panel: **position · rating · load fed · normal state**. Clicking a row highlights the corresponding breaker in the illustration, and vice versa.

# Accessibility — required

- **Grouped keyboard navigation, not 40 flat tab stops:** `Tab` moves between shelves and major regions; **arrow keys move within a group** (roving tabindex) across repeated items such as breakers, batteries and rectifier modules.
- `Enter`/`Space` selects; `Escape` steps up one level.
- Every interactive group and element has an `aria-label` and a `<title>` child; announce position within group ("Breaker 4 of 16").
- Visible focus ring, visually distinct from the hover outline.
- Text contrast ≥ 4.5:1. **Status is never conveyed by colour alone** — every LED and every fault indicator carries a text label.
- Honour `prefers-reduced-motion: reduce` by disabling all animation, including the mains-failure sequence, which must remain fully steppable manually.

# Renderer — mandatory

- **SVG is the primary renderer**, built with D3 data-joins from `ELEMENTS`. Rationale: ~40 discrete hit targets requiring focus, ARIA labelling and CSS states — none of which Canvas provides natively.
- **Canvas is permitted only as an optional overlay layer** for animated current-flow particles in the power-flow view. Structure, labels, hit-testing and interaction must never live in Canvas.

# Safety content — required

Surface these as `safetyNote` entries on the relevant elements and collect them in a dedicated panel:

- DC arc flash risk at the busbar; a dropped spanner across battery terminals is a short with no fuse in the way.
- Opening a load breaker does **not** de-energise the busbar.
- VRLA battery weight and safe lifting; never lift by the terminals.
- Battery outgassing and ventilation.
- Verify isolation before touching AC input, and never assume the SPD has cleared a surge.

# Technical constraints

- **One HTML file**, openable by double-click, no build step.
- D3 v7 from a CDN; **no other libraries**, no frameworks, no external image or font assets — all geometry drawn in code.
- All strings, values, fault text and the breaker schedule live in `ELEMENTS`; drawing code reads from it and hardcodes nothing.
- One-line comment above each drawing function stating what it renders.

# Accuracy guardrail

Present every figure — rectifier output, breaker ratings, battery Ah and runtime, bus voltage thresholds, cabinet dimensions — as **representative ranges for typical LTE macro site power plant**, marked as such in the UI. Do not present invented numbers as manufacturer specifications.

# Deliverable

Return the complete HTML file. After it, add a short plain-text note (outside the code) listing: which elements are interactive at each of the three levels, which values are illustrative rather than authoritative, and one suggested extension.
