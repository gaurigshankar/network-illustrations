# Objective

Produce **one self-contained HTML file** that renders an interactive, drill-down technical illustration of an **LTE Remote Radio Unit (RRU)** in its tower-top context, built with **D3.js v7**.

The artifact is **field-training material** for a junior O&M engineer who has never visited a live cell site. Every design decision should serve recognition ("I will know this part when I see it on the mast") and diagnosis ("I will know what it means when this LED is red").

# Source reference → how to interpret it

The subject is described below as a photographic scene. **Do not attempt photorealism.** Translate it into a *technical illustration*: clean vector forms, flat fills with restrained gradients for cylindrical volume, and precise labelling. Discard purely photographic qualities (overcast sky, shallow depth of field, bokeh); keep every physical detail that carries meaning.

> Subject: A remote radio unit mounted on a galvanised pipe mount behind a panel antenna. Aluminium heat-sink fins along the body. A weatherproofed coax jumper with a black rubber boot. Two LC fibre connectors and a DC power connector on the underside. Small green and red status LEDs.

# Visual style

- **Semi-flat technical illustration**, three-quarter isometric view of the RRU with the panel antenna behind it in lighter tone.
- Muted, professional palette: cool greys and gunmetal for hardware, a single accent hue for interactive highlight, amber/green/red reserved exclusively for LED and status semantics.
- Line weights: 1.5px structural outlines, 0.75px surface detail (heat-sink fins, fastener heads), 1px leader lines to labels.
- Generous whitespace. No drop shadows beyond a single soft ground shadow. No skeuomorphic textures.
- Typography: one sans-serif family, two sizes only (label, caption).

# Renderer — mandatory

- **Use SVG as the primary renderer**, appended and joined via D3's data-join. Rationale: the diagram requires per-part hit-testing, keyboard focus, ARIA labelling and CSS hover states, all of which SVG provides natively and Canvas does not.
- **Canvas is permitted only as an optional overlay layer** for animated RF/data-flow particles along the coax and fibre paths, if such an animation is included. Structure, labels and interaction must never live in Canvas.
- If any animation is added, respect `prefers-reduced-motion: reduce` by disabling it.

# Content model — required for every interactive part

Define all content in a **single declarative `PARTS` array at the top of the script**, separate from all drawing code, so the diagram can be extended later. Each entry must carry this exact schema:

| Field | Meaning |
|---|---|
| `id` | stable slug |
| `name` | display name, acronym expanded on first use |
| `function` | one sentence: what it does |
| `inputs` / `outputs` | what enters and leaves this part |
| `typicalValues` | representative figures, explicitly labelled as *typical, vendor-dependent* |
| `onSiteAppearance` | how a technician physically recognises it |
| `commonFaults` | 2–3 entries, each as *symptom → first thing to check* |
| `vendorAliases` | generic term primary; vendor names in parentheses, no vendor favoured |

## Parts to include (minimum)

1. RRU chassis and aluminium heat-sink fins
2. Panel antenna (context object, lighter tone)
3. Galvanised pipe mount and downtilt bracket
4. Coax jumper with weatherproof boot, and the antenna port it lands on
5. Two LC fibre connectors (the CPRI/eCPRI link down to the BBU)
6. DC power connector and feed
7. Status LED cluster
8. Grounding lug / earth strap and surge arrestor
9. AISG/RET control connection

# Interaction specification

- **Two levels of drill-down, no deeper.** Overview → part detail. Any nested item inside a detail panel is text only, not a further navigable level.
- **Detail panel is a right-hand side rail** (never an overlay on the diagram), so the highlighted part stays visible while it is being explained. Below 900px viewport width, the rail collapses beneath the diagram.
- On selection: the chosen part is highlighted in the accent colour, all other parts desaturate to ~35% opacity, and the view eases toward that part using `d3.zoom` — **600ms, `d3.easeCubicOut`**.
- **Exit paths, all three required:** a visible Back control, the `Escape` key, and clicking empty background.
- **Affordance:** interactive regions show `cursor: pointer` and a 2px outline on hover/focus. On first load, run a single subtle pulse across all interactive parts, then stop.
- **Initial state is not blank:** the side rail opens with a short orientation paragraph ("This is a remote radio unit, mounted at the top of the tower directly behind the antenna. Click any highlighted part…") plus a legend for the LED colour semantics.
- **Locator inset:** a small simplified tower silhouette in a corner, with the RRU's position marked, so the learner never loses the site-level context.
- **Fault mode toggle:** a control that switches the LEDs and connectors into fault states; in this mode, clicking a part surfaces its `commonFaults` entries first.

# Accessibility — required

- Every interactive part is a focusable group with `tabindex="0"`, an `aria-label`, and a `<title>` child.
- Full keyboard traversal: `Tab` to move between parts, `Enter`/`Space` to select, `Escape` to exit.
- Visible focus ring distinct from the hover outline.
- Text contrast ≥ 4.5:1 against its background.
- LED status is never conveyed by colour alone — pair each with a text label.

# Technical constraints

- **One HTML file**, openable by double-click, no build step.
- D3 v7 from a CDN; **no other libraries**, no frameworks, no external image or font assets — all geometry drawn in code.
- Responsive: SVG uses `viewBox` with `preserveAspectRatio="xMidYMid meet"`; layout works from 360px to 1920px wide.
- All strings, values and fault text live in `PARTS`; drawing code reads from it and hardcodes nothing.
- Comment each drawing function with one line stating what it renders.

# Accuracy guardrail

Where you state figures (RF output power, CPRI/eCPRI line rate, DC voltage, weight, fibre type), present them as **representative ranges for typical LTE macro equipment** and mark them as such in the UI. Do not present invented numbers as manufacturer specifications.

# Deliverable

Return the complete HTML file. After it, add a short plain-text note (outside the code) listing: the parts made interactive, any values that are illustrative rather than authoritative, and one suggested extension.
