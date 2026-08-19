# How a Cell Site Works: From IP Packet to Handset
## Narration script — DRAFT 1 (for approval)

- **Voice:** senior RAN architect mentoring a new hire. Plain, direct, site-floor practical.
- **Pace:** ~145 wpm. Word count 782 → ~5:24 of speech + ~10s of held visual beats = **~5:30 target**.
- **Rule applied:** every sentence maps to exactly one visual beat. No orphan visuals, no unillustrated claims.
- Timings below are the *plan*; final cue points get locked to the measured TTS durations once the avatar audio exists.

---

### SCENE 1 — Cold open (0:00–0:15) · avatar FULL FRAME

| # | Narration | Visual beat |
|---|---|---|
| 1.1 | Before you climb anything, you need to know what you're looking at. | Full-frame avatar, neutral ground. |
| 1.2 | By the end of this, you can walk onto a live site and name every box on it. | Title card animates in over avatar. |
| 1.3 | Top to bottom — then one packet, end to end. | Avatar scales down to lower-left corner cutout (~22% frame width). |

---

### SCENE 2 — Site overview (0:15–1:00) · wide → mid push

| # | Narration | Visual beat |
|---|---|---|
| 2.1 | This is a macro site — the standard three-sector tower you'll be sent to most weeks. | Wide elevation fades up: tower, antennas, cabinet, earth mat. Slow camera push begins. |
| 2.2 | At the top, panel antennas in three groups, roughly a hundred and twenty degrees apart. That's three sectors. | Antenna groups light in sequence; azimuth arcs draw at 0°/120°/240°. |
| 2.3 | Bolted right behind each one is a Remote Radio Unit — an R R U. That's where radio actually happens. | RRU boxes fade in behind each antenna; label "RRU — Remote Radio Unit". |
| 2.4 | At the base, a cabinet holding the Baseband Unit, the power system and the batteries. | Camera settles mid; cabinet outline highlights; label "BBU — Baseband Unit". |
| 2.5 | Between them, only two thin things run up that tower — a fibre and a DC power pair. No fat RF feeders. | Fibre (blue) and DC pair (red/black strokes) draw top-to-bottom down the cable ladder. |
| 2.6 | Keep this silhouette in the corner of your eye. I'll light up whatever we're standing at. | Locator graphic (simplified tower) docks to upper-right and persists for the rest of the video. |

---

### SCENE 3 — Tower top: the RRU (1:00–2:00) · camera push into tower-top

| # | Narration | Visual beat |
|---|---|---|
| 3.1 | Push in on the tower top. | Camera scales + translates into the tower-top region; resolves to three-quarter RRU view behind panel antenna. Locator lights "tower top". |
| 3.2 | Finned aluminium body — it's passively cooled, so those fins *are* the cooling system. | Heat-sink body reveals; leader label. |
| 3.3 | It clamps to a pipe mount, with a bracket that sets mechanical downtilt. | Pipe mount + downtilt bracket reveal. |
| 3.4 | Out the top, a half-inch coax jumper to the antenna, sealed in a weatherproof boot. | Jumper (orange) + boot reveal. |
| 3.5 | Underneath, two L C fibre connectors carrying digital samples. | Two LC connectors reveal (blue). |
| 3.6 | Next to them, the minus forty-eight volt DC connector. | DC connector reveals (red/black strokes). |
| 3.7 | Then the status LEDs, and an earth strap to the tower-top earth bar. | LED cluster + earth strap reveal, each with text label. |
| 3.8 | So why is the radio up here and the baseband down there? | Cross-fade to a two-bar loss comparison. |
| 3.9 | Coax throws away roughly five dB per hundred metres. Fibre loses almost nothing. | Bars animate: coax loss tall, fibre loss near-zero. Labelled *typical range*. |
| 3.10 | So you run RF one metre, and you send light and DC the long way. | Short RF arrow vs long fibre/DC arrow on the tower silhouette. |
| 3.11 | Last thing — read the LEDs before you plan a climb. | Camera returns to RRU; LED cluster isolates. |
| 3.12 | RUN just went from green to red. Check the fibre first, then the DC breaker. | LED state change with **text label** "RUN: FAULT"; red outline glow on RRU; first-check card slides in. |

---

### SCENE 4 — Base: cabinet interior (2:00–3:20) · camera pulls down the tower

| # | Narration | Visual beat |
|---|---|---|
| 4.1 | Back down the tower to the cabinet. | Camera pulls back down; locator lights "cabinet". Door swings open as a thin outline. |
| 4.2 | Call it two metres tall, and the rails are marked in rack units — so nothing on screen is ambiguous in size. | Overall dimension annotation on one edge; U markings run down the mounting rail. |
| 4.3 | Top shelf, the Baseband Unit — boards, status LEDs, and one vacant slot with a blanking plate. | BBU subrack reveals shelf-first, then boards. |
| 4.4 | Below it, the rectifier shelf: modules turning AC mains into minus forty-eight volts DC, one spare position, and a controller. | Rectifier shelf reveals. |
| 4.5 | Then DC distribution — the busbar, labelled breakers per load, and the low-voltage disconnect. | DC distribution reveals; breaker labels legible. |
| 4.6 | At the bottom, four twelve-volt V R L A batteries in series, and the copper earth bar on the side wall. | Batteries reveal, then earth bar (copper). |
| 4.7 | The stacking isn't arbitrary: weight low, heat rises, electronics kept clear of battery outgassing, and what you service most sits at chest height. | Four rationale annotations pin to the relevant shelves. |
| 4.8 | Now watch what happens when the mains drops. | Sequence arms. Music ducks. Bus-voltage readout appears. |
| 4.9 | Healthy: rectifiers hold the bus near fifty-four volts and float-charge the batteries. | **Stage 1.** Readout 54.0 V steady. Rectifier shelf highlighted. |
| 4.10 | AC fails. The rectifiers drop out — that's your "Mains Failure" alarm. | **Stages 2–3.** AC input greys; rectifier outline glows amber; alarm text "MAINS FAILURE". |
| 4.11 | The batteries take the load instantly — they were already sitting across the bus. | **Stage 4.** Current path redraws from batteries; batteries highlighted. |
| 4.12 | Bus voltage starts to sag, and the dry contact raises "DC Low Voltage". | **Stages 5–6.** Readout counts down 54 → 47 V; dry-contact block glows amber; alarm text. |
| 4.13 | Around forty-three volts the low-voltage disconnect trips and sheds the load. That's the site down. | **Stages 7–8.** LVD contactor glows red, opens; loads grey out; readout stops. Breaker-trip SFX. |

---

### SCENE 5 — The signal chain (3:20–4:40)

| # | Narration | Visual beat |
|---|---|---|
| 5.1 | Now the signal itself. Two tracks: what it *is* on top, what it's *inside* underneath. | Cross-fade to clean horizontal two-track flow. Legend draws. |
| 5.2 | It starts as an IP packet from the core network. | Blue packet glyph appears at left on the upper track; "core router" on the lower track. |
| 5.3 | The Baseband Unit schedules it, codes it, and turns it into IQ samples — numbers that describe a waveform. | Solid transformation arrow with conversion glyph; packet morphs into IQ sample glyph. |
| 5.4 | Those samples ride the fibre as C P R I. That's transport, not transformation — nothing about the information changes crossing it. | Dashed tube arrow; IQ glyph travels unchanged. Side note: "5G: eCPRI — CU/DU split moves this boundary". |
| 5.5 | Here's the moment that matters. Inside the RRU a D A C and an upconverter turn numbers into an analogue carrier. | Emphatic crossover marker; **blue becomes orange** across a labelled boundary. |
| 5.6 | Through the power amplifier, out the coax jumper, into the antenna — and now it's a beam in the air. | PA → coax (dashed transport) → antenna → radiated beam, all orange. |
| 5.7 | At the handset: antenna, low-noise amplifier, A D C, demodulate — and your packet is back. | Handset stage; orange returns to blue; packet glyph reforms. |
| 5.8 | Look at the spans involved: gigabits on the fibre, gigahertz on the carrier, tens of watts leaving the radio — and about a picowatt arriving at the phone. | **6-second logarithmic scale strip** draws beneath the chain, four markers plotted across ~15 decades. Held. |
| 5.9 | Every figure on screen is a representative range for typical LTE macro equipment, not a manufacturer specification. | Persistent caveat banner sets. |
| 5.10 | Uplink is not a mirror image. The handset transmits around a fifth of a watt, on a battery. | Distinct return row draws — different geometry, not a flip. Handset Tx power labelled. |
| 5.11 | Its amplifier is weak, so uplink is usually what limits coverage. The phone hears the site long before the site hears the phone. | Asymmetry callout: DL power bar vs UL power bar at true log ratio. |

---

### SCENE 6 — Where it breaks (4:40–5:10)

| # | Narration | Visual beat |
|---|---|---|
| 6.1 | Four symptoms you'll actually be sent for. | Chain desaturates and holds on screen. |
| 6.2 | No service — check the S1 link and cell state before you touch anything RF. | Backhaul + BBU stages pulse (red outline glow); first-check card. |
| 6.3 | Slow throughput — look at interference and modulation order before you blame the backhaul. | Air interface + modulation stages pulse; first-check card. |
| 6.4 | One sector down — that's one RRU, its fibre, or its breaker. Check the breaker first. | Single RRU branch pulses; first-check card. |
| 6.5 | High uplink noise — external interference, or a faulty jumper. Check VSWR. | Jumper + antenna stages pulse on the uplink row; first-check card. |

---

### SCENE 7 — Safety and recap (5:10–5:30) · avatar FULL FRAME

| # | Narration | Visual beat |
|---|---|---|
| 7.1 | Four things before you go near a live cabinet. | Avatar returns to full frame; four cards stage in. |
| 7.2 | A spanner dropped across battery terminals is a short with nothing in the way. | Card 1 — DC arc flash at the busbar. |
| 7.3 | Opening a load breaker does not de-energise the busbar. | Card 2 — emphasised. |
| 7.4 | Nobody climbs without RF zone awareness and current certification. | Card 3 — RF exposure zones. |
| 7.5 | And never lift a battery by its terminals. | Card 4 — VRLA weight. |
| 7.6 | Top to bottom. You can name it now. | Locator graphic fills frame with all four subjects lit at once. |

---

## Acronyms expanded on first use (narration + on-screen label)
RRU (2.3) · BBU (2.4) · VRLA (4.6) · CPRI (5.4) · DAC (5.5) · ADC (5.7) · LVD (4.13, on-screen) · VSWR (6.5, on-screen)

## Figures spoken — all shown on screen as representative ranges
5 dB/100 m coax loss (3.9) · −48 V DC (3.6) · ~54 V float / ~43 V LVD (4.9, 4.13) · 4 × 12 V VRLA (4.6) ·
Gbps fibre rate, GHz carrier, tens of W radiated, ~pW received (5.8) · ~0.2 W handset Tx (5.10)
