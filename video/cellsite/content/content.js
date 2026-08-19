/* =========================================================================
 * cellsite-explainer — CONTENT DATA FILE (single source of truth)
 *
 * Every string, figure, label, alarm name and fault line the video shows
 * lives here. The scene compositions read from this object and hard-code
 * nothing, so the script can be revised without touching layout code.
 *
 * Timing model: `cues` carries the narration in absolute seconds. Scenes
 * bind their visual beats to cue ids via C.cue(id) / C.localCue(id, scene),
 * so retiming a line automatically retimes the visual beat keyed to it.
 *
 * ACCURACY: every numeric figure below is a REPRESENTATIVE RANGE for typical
 * LTE macro equipment, not a manufacturer specification. Ranges are drawn
 * from the repository's own content models in docs/ and prompts/.
 * ========================================================================= */
window.CELLSITE = (function () {
  const FPS = 30;

  // --- Visual system -----------------------------------------------------
  // Meaning-bearing palette. Nothing here is decorative.
  const palette = {
    bg: '#f6f8fa',
    bgDeep: '#0f172a',
    ink: '#0f172a',
    inkSoft: '#475569',
    inkFaint: '#64748b',
    rule: '#cbd5e1',
    hairline: '#e2e8f0',

    digital: '#1d4ed8',      // digital domain — blue family
    digitalLight: '#60a5fa',
    digitalWash: '#dbeafe',

    analogue: '#ea580c',     // analogue / RF domain — orange family
    analogueLight: '#fb923c',
    analogueWash: '#ffedd5',
    analogueInk: '#c2410c',   // small-text-safe orange (contrast on light ground)

    accent: '#9333ea',       // focus of narration — used nowhere else
    fault: '#dc2626',        // fault — OUTLINE GLOW only, never a fill swap
    warn: '#d97706',         // alarm — OUTLINE GLOW only
    ok: '#15803d',

    dcPos: '#d92626',        // DC polarity — cable STROKES only, never fills
    dcNeg: '#1f2937',
    copper: '#b45309',       // earth bar / busbar

    metal: '#94a3b8',
    metalDark: '#64748b',
    metalLight: '#e2e8f0',
    panel: '#ffffff'
  };

  const type = {
    family: 'Inter, sans-serif',
    title: 62,    // three sizes only
    label: 25,
    caption: 34
  };

  const stroke = { structural: 1.5, detail: 0.75, leader: 1 };

  // --- Scene windows (absolute seconds) ---------------------------------
  const scenes = {
      "s1": {
          "start": 0,
          "end": 17.61,
          "dur": 17.61
      },
      "s2": {
          "start": 17.61,
          "end": 58.74,
          "dur": 41.13
      },
      "s3": {
          "start": 58.74,
          "end": 120.54,
          "dur": 61.8
      },
      "s4": {
          "start": 120.54,
          "end": 198.41,
          "dur": 77.87
      },
      "s5": {
          "start": 198.41,
          "end": 282.1,
          "dur": 83.69
      },
      "s6": {
          "start": 282.1,
          "end": 311.44,
          "dur": 29.34
      },
      "s7": {
          "start": 311.44,
          "end": 339.92,
          "dur": 28.48
      }
  };

  // --- Narration cues (absolute seconds) --------------------------------
  const cues = [
      {
          "id": "1.1",
          "scene": "s1",
          "start": 0.5,
          "end": 5.47,
          "text": "Before you climb anything, you need to know what you're looking at."
      },
      {
          "id": "1.2",
          "scene": "s1",
          "start": 5.77,
          "end": 12.39,
          "text": "By the end of this you can walk onto a live site and name every box."
      },
      {
          "id": "1.3",
          "scene": "s1",
          "start": 12.69,
          "end": 16.41,
          "text": "Top to bottom, then one packet end to end."
      },
      {
          "id": "2.1",
          "scene": "s2",
          "start": 17.61,
          "end": 23.82,
          "text": "This is a macro site — the three-sector tower you'll be sent to most weeks."
      },
      {
          "id": "2.2",
          "scene": "s2",
          "start": 24.42,
          "end": 29.8,
          "text": "At the top, panel antennas in three groups, 120 degrees apart. Three sectors."
      },
      {
          "id": "2.3",
          "scene": "s2",
          "start": 30.4,
          "end": 36.19,
          "text": "Behind each one, a Remote Radio Unit — an RRU. That's where radio happens."
      },
      {
          "id": "2.4",
          "scene": "s2",
          "start": 36.79,
          "end": 42.17,
          "text": "At the base, a cabinet: the Baseband Unit, the power system, the batteries."
      },
      {
          "id": "2.5",
          "scene": "s2",
          "start": 42.77,
          "end": 50.63,
          "text": "Between them only two thin things run up the tower — fibre, and DC power. No fat RF feeders."
      },
      {
          "id": "2.6",
          "scene": "s2",
          "start": 51.53,
          "end": 57.74,
          "text": "Keep this silhouette in the corner of your eye. I'll light up wherever we are."
      },
      {
          "id": "3.1",
          "scene": "s3",
          "start": 58.74,
          "end": 61.22,
          "text": "Push in on the tower top."
      },
      {
          "id": "3.2",
          "scene": "s3",
          "start": 62.02,
          "end": 66.99,
          "text": "Finned aluminium body — passively cooled. Those fins are the cooling system."
      },
      {
          "id": "3.3",
          "scene": "s3",
          "start": 67.29,
          "end": 72.67,
          "text": "It clamps to a pipe mount, with a bracket that sets mechanical downtilt."
      },
      {
          "id": "3.4",
          "scene": "s3",
          "start": 72.97,
          "end": 77.93,
          "text": "Out the top, a half-inch coax jumper, sealed in a weatherproof boot."
      },
      {
          "id": "3.5",
          "scene": "s3",
          "start": 78.23,
          "end": 81.54,
          "text": "Underneath, two LC fibre connectors carrying digital samples."
      },
      {
          "id": "3.6",
          "scene": "s3",
          "start": 81.84,
          "end": 85.15,
          "text": "Beside them, the minus forty-eight volt DC connector."
      },
      {
          "id": "3.7",
          "scene": "s3",
          "start": 85.45,
          "end": 90.42,
          "text": "Then status LEDs, and an earth strap to the tower-top earth bar."
      },
      {
          "id": "3.8",
          "scene": "s3",
          "start": 91.22,
          "end": 96.18,
          "text": "So why is the radio up here, and the baseband down there?"
      },
      {
          "id": "3.9",
          "scene": "s3",
          "start": 96.68,
          "end": 102.06,
          "text": "Coax throws away roughly five dB per hundred metres. Fibre loses almost nothing."
      },
      {
          "id": "3.10",
          "scene": "s3",
          "start": 102.76,
          "end": 107.31,
          "text": "Run RF one metre. Send light and DC the long way."
      },
      {
          "id": "3.11",
          "scene": "s3",
          "start": 108.31,
          "end": 112.87,
          "text": "Last thing — read the LEDs before you plan a climb."
      },
      {
          "id": "3.12",
          "scene": "s3",
          "start": 113.57,
          "end": 118.94,
          "text": "RUN just went green to red. Check the fibre, then the DC breaker."
      },
      {
          "id": "4.1",
          "scene": "s4",
          "start": 120.54,
          "end": 123.44,
          "text": "Back down the tower to the cabinet."
      },
      {
          "id": "4.2",
          "scene": "s4",
          "start": 124.24,
          "end": 131.28,
          "text": "About two metres tall, rails marked in rack units — so nothing here is ambiguous in size."
      },
      {
          "id": "4.3",
          "scene": "s4",
          "start": 131.88,
          "end": 137.67,
          "text": "Top shelf: the Baseband Unit. Boards, LEDs, one vacant slot with a blanking plate."
      },
      {
          "id": "4.4",
          "scene": "s4",
          "start": 137.97,
          "end": 145.42,
          "text": "Below it the rectifier shelf — AC mains to minus forty-eight volts DC, one spare position, a controller."
      },
      {
          "id": "4.5",
          "scene": "s4",
          "start": 145.72,
          "end": 149.86,
          "text": "Then DC distribution: busbar, labelled breakers per load, low-voltage disconnect."
      },
      {
          "id": "4.6",
          "scene": "s4",
          "start": 150.16,
          "end": 156.78,
          "text": "At the bottom, four twelve-volt VRLA batteries in series. Copper earth bar on the side wall."
      },
      {
          "id": "4.7",
          "scene": "s4",
          "start": 157.48,
          "end": 164.92,
          "text": "The stacking isn't arbitrary — weight low, heat rises, electronics clear of battery outgassing, service at chest height."
      },
      {
          "id": "4.8",
          "scene": "s4",
          "start": 165.82,
          "end": 169.13,
          "text": "Now watch what happens when the mains drops."
      },
      {
          "id": "4.9",
          "scene": "s4",
          "start": 170.23,
          "end": 174.79,
          "text": "Healthy: rectifiers hold the bus near fifty-four volts, float-charging the batteries."
      },
      {
          "id": "4.10",
          "scene": "s4",
          "start": 175.59,
          "end": 179.72,
          "text": "AC fails. Rectifiers drop out. That's your Mains Failure alarm."
      },
      {
          "id": "4.11",
          "scene": "s4",
          "start": 180.52,
          "end": 185.49,
          "text": "Batteries take the load instantly — they were already across the bus."
      },
      {
          "id": "4.12",
          "scene": "s4",
          "start": 186.29,
          "end": 190.43,
          "text": "Bus voltage sags. The dry contact raises DC Low Voltage."
      },
      {
          "id": "4.13",
          "scene": "s4",
          "start": 191.23,
          "end": 196.61,
          "text": "Near forty-three volts the low-voltage disconnect trips and sheds the load. Site down."
      },
      {
          "id": "5.1",
          "scene": "s5",
          "start": 198.41,
          "end": 204.61,
          "text": "Now the signal itself. Two tracks: what it is on top, what it's inside underneath."
      },
      {
          "id": "5.2",
          "scene": "s5",
          "start": 205.31,
          "end": 209.04,
          "text": "It starts as an IP packet from the core."
      },
      {
          "id": "5.3",
          "scene": "s5",
          "start": 209.34,
          "end": 216.79,
          "text": "The Baseband Unit schedules and codes it, then turns it into IQ samples — numbers describing a waveform."
      },
      {
          "id": "5.4",
          "scene": "s5",
          "start": 217.09,
          "end": 223.71,
          "text": "Those samples ride the fibre as CPRI. Transport, not transformation — nothing about the information changes."
      },
      {
          "id": "5.5",
          "scene": "s5",
          "start": 224.31,
          "end": 232.17,
          "text": "Here's the moment that matters. In the RRU, a DAC and an upconverter turn numbers into an analogue carrier."
      },
      {
          "id": "5.6",
          "scene": "s5",
          "start": 232.77,
          "end": 239.39,
          "text": "Through the power amplifier, out the jumper, into the antenna — a beam in the air."
      },
      {
          "id": "5.7",
          "scene": "s5",
          "start": 239.69,
          "end": 244.66,
          "text": "At the handset: antenna, low-noise amplifier, ADC, demodulate. Your packet is back."
      },
      {
          "id": "5.8",
          "scene": "s5",
          "start": 245.66,
          "end": 255.59,
          "text": "Look at the spans: gigabits on fibre, gigahertz on the carrier, tens of watts leaving the radio — about a picowatt reaching the phone."
      },
      {
          "id": "5.9",
          "scene": "s5",
          "start": 257.89,
          "end": 262.85,
          "text": "Every figure here is a representative range for typical LTE macro equipment."
      },
      {
          "id": "5.10",
          "scene": "s5",
          "start": 263.55,
          "end": 271,
          "text": "Uplink is not a mirror image. The handset transmits about a fifth of a watt, on a battery."
      },
      {
          "id": "5.11",
          "scene": "s5",
          "start": 271.6,
          "end": 280.7,
          "text": "Its amplifier is weak, so uplink usually limits coverage — the phone hears the site long before the site hears the phone."
      },
      {
          "id": "6.1",
          "scene": "s6",
          "start": 282.1,
          "end": 285,
          "text": "Four symptoms you'll actually be sent for."
      },
      {
          "id": "6.2",
          "scene": "s6",
          "start": 285.8,
          "end": 292.01,
          "text": "No service — check the S1 link and cell state before you touch anything RF."
      },
      {
          "id": "6.3",
          "scene": "s6",
          "start": 292.71,
          "end": 297.67,
          "text": "Slow throughput — interference and modulation order, before you blame the backhaul."
      },
      {
          "id": "6.4",
          "scene": "s6",
          "start": 298.37,
          "end": 304.58,
          "text": "One sector down — one RRU, its fibre, or its breaker. Check the breaker first."
      },
      {
          "id": "6.5",
          "scene": "s6",
          "start": 305.28,
          "end": 310.24,
          "text": "High uplink noise — external interference, or a faulty jumper. Check VSWR."
      },
      {
          "id": "7.1",
          "scene": "s7",
          "start": 311.44,
          "end": 315.17,
          "text": "Four things before you go near a live cabinet."
      },
      {
          "id": "7.2",
          "scene": "s7",
          "start": 315.87,
          "end": 321.25,
          "text": "A spanner across battery terminals is a short with nothing in the way."
      },
      {
          "id": "7.3",
          "scene": "s7",
          "start": 321.85,
          "end": 325.57,
          "text": "Opening a load breaker does not de-energise the busbar."
      },
      {
          "id": "7.4",
          "scene": "s7",
          "start": 326.17,
          "end": 329.9,
          "text": "Nobody climbs without RF zone awareness and current certification."
      },
      {
          "id": "7.5",
          "scene": "s7",
          "start": 330.5,
          "end": 333.81,
          "text": "And never lift a battery by its terminals."
      },
      {
          "id": "7.6",
          "scene": "s7",
          "start": 334.61,
          "end": 337.92,
          "text": "Top to bottom. You can name it now."
      }
  ];

  // --- Burned-in caption cards (max two lines each)
  const captions = [
      {
          "cue": "1.1",
          "start": 0.5,
          "end": 5.47,
          "lines": [
              "Before you climb anything, you need",
              "to know what you're looking at."
          ]
      },
      {
          "cue": "1.2",
          "start": 5.77,
          "end": 12.39,
          "lines": [
              "By the end of this you can walk",
              "onto a live site and name every box."
          ]
      },
      {
          "cue": "1.3",
          "start": 12.69,
          "end": 16.41,
          "lines": [
              "Top to bottom, then one packet end to end."
          ]
      },
      {
          "cue": "2.1",
          "start": 17.61,
          "end": 23.82,
          "lines": [
              "This is a macro site — the three-sector",
              "tower you'll be sent to most weeks."
          ]
      },
      {
          "cue": "2.2",
          "start": 24.42,
          "end": 29.8,
          "lines": [
              "At the top, panel antennas in three",
              "groups, 120 degrees apart. Three sectors."
          ]
      },
      {
          "cue": "2.3",
          "start": 30.4,
          "end": 36.19,
          "lines": [
              "Behind each one, a Remote Radio Unit",
              "— an RRU. That's where radio happens."
          ]
      },
      {
          "cue": "2.4",
          "start": 36.79,
          "end": 42.17,
          "lines": [
              "At the base, a cabinet: the Baseband",
              "Unit, the power system, the batteries."
          ]
      },
      {
          "cue": "2.5",
          "start": 42.77,
          "end": 50.63,
          "lines": [
              "Between them only two thin things run up the",
              "tower — fibre, and DC power. No fat RF feeders."
          ]
      },
      {
          "cue": "2.6",
          "start": 51.53,
          "end": 57.74,
          "lines": [
              "Keep this silhouette in the corner of",
              "your eye. I'll light up wherever we are."
          ]
      },
      {
          "cue": "3.1",
          "start": 58.74,
          "end": 61.22,
          "lines": [
              "Push in on the tower top."
          ]
      },
      {
          "cue": "3.2",
          "start": 62.02,
          "end": 66.99,
          "lines": [
              "Finned aluminium body — passively cooled.",
              "Those fins are the cooling system."
          ]
      },
      {
          "cue": "3.3",
          "start": 67.29,
          "end": 72.67,
          "lines": [
              "It clamps to a pipe mount, with a",
              "bracket that sets mechanical downtilt."
          ]
      },
      {
          "cue": "3.4",
          "start": 72.97,
          "end": 77.93,
          "lines": [
              "Out the top, a half-inch coax jumper,",
              "sealed in a weatherproof boot."
          ]
      },
      {
          "cue": "3.5",
          "start": 78.23,
          "end": 81.54,
          "lines": [
              "Underneath, two LC fibre connectors",
              "carrying digital samples."
          ]
      },
      {
          "cue": "3.6",
          "start": 81.84,
          "end": 85.15,
          "lines": [
              "Beside them, the minus",
              "forty-eight volt DC connector."
          ]
      },
      {
          "cue": "3.7",
          "start": 85.45,
          "end": 90.42,
          "lines": [
              "Then status LEDs, and an earth",
              "strap to the tower-top earth bar."
          ]
      },
      {
          "cue": "3.8",
          "start": 91.22,
          "end": 96.18,
          "lines": [
              "So why is the radio up here,",
              "and the baseband down there?"
          ]
      },
      {
          "cue": "3.9",
          "start": 96.68,
          "end": 102.06,
          "lines": [
              "Coax throws away roughly five dB per",
              "hundred metres. Fibre loses almost nothing."
          ]
      },
      {
          "cue": "3.10",
          "start": 102.76,
          "end": 107.31,
          "lines": [
              "Run RF one metre. Send light and DC the long way."
          ]
      },
      {
          "cue": "3.11",
          "start": 108.31,
          "end": 112.87,
          "lines": [
              "Last thing — read the LEDs",
              "before you plan a climb."
          ]
      },
      {
          "cue": "3.12",
          "start": 113.57,
          "end": 118.94,
          "lines": [
              "RUN just went green to red. Check",
              "the fibre, then the DC breaker."
          ]
      },
      {
          "cue": "4.1",
          "start": 120.54,
          "end": 123.44,
          "lines": [
              "Back down the tower to the cabinet."
          ]
      },
      {
          "cue": "4.2",
          "start": 124.24,
          "end": 131.28,
          "lines": [
              "About two metres tall, rails marked in rack",
              "units — so nothing here is ambiguous in size."
          ]
      },
      {
          "cue": "4.3",
          "start": 131.88,
          "end": 137.67,
          "lines": [
              "Top shelf: the Baseband Unit. Boards, LEDs,",
              "one vacant slot with a blanking plate."
          ]
      },
      {
          "cue": "4.4",
          "start": 137.97,
          "end": 144.62,
          "lines": [
              "Below it the rectifier shelf — AC mains to minus",
              "forty-eight volts DC, one spare position, a"
          ]
      },
      {
          "cue": "4.4",
          "start": 144.62,
          "end": 145.42,
          "lines": [
              "controller."
          ]
      },
      {
          "cue": "4.5",
          "start": 145.72,
          "end": 149.86,
          "lines": [
              "Then DC distribution: busbar, labelled",
              "breakers per load, low-voltage disconnect."
          ]
      },
      {
          "cue": "4.6",
          "start": 150.16,
          "end": 156.78,
          "lines": [
              "At the bottom, four twelve-volt VRLA batteries",
              "in series. Copper earth bar on the side wall."
          ]
      },
      {
          "cue": "4.7",
          "start": 157.48,
          "end": 163.42,
          "lines": [
              "The stacking isn't arbitrary — weight low, heat",
              "rises, electronics clear of battery outgassing,"
          ]
      },
      {
          "cue": "4.7",
          "start": 163.42,
          "end": 164.92,
          "lines": [
              "service at chest height."
          ]
      },
      {
          "cue": "4.8",
          "start": 165.82,
          "end": 169.13,
          "lines": [
              "Now watch what happens when the mains drops."
          ]
      },
      {
          "cue": "4.9",
          "start": 170.23,
          "end": 174.79,
          "lines": [
              "Healthy: rectifiers hold the bus near",
              "fifty-four volts, float-charging the batteries."
          ]
      },
      {
          "cue": "4.10",
          "start": 175.59,
          "end": 179.72,
          "lines": [
              "AC fails. Rectifiers drop out.",
              "That's your Mains Failure alarm."
          ]
      },
      {
          "cue": "4.11",
          "start": 180.52,
          "end": 185.49,
          "lines": [
              "Batteries take the load instantly",
              "— they were already across the bus."
          ]
      },
      {
          "cue": "4.12",
          "start": 186.29,
          "end": 190.43,
          "lines": [
              "Bus voltage sags. The dry",
              "contact raises DC Low Voltage."
          ]
      },
      {
          "cue": "4.13",
          "start": 191.23,
          "end": 196.61,
          "lines": [
              "Near forty-three volts the low-voltage",
              "disconnect trips and sheds the load. Site down."
          ]
      },
      {
          "cue": "5.1",
          "start": 198.41,
          "end": 204.61,
          "lines": [
              "Now the signal itself. Two tracks: what",
              "it is on top, what it's inside underneath."
          ]
      },
      {
          "cue": "5.2",
          "start": 205.31,
          "end": 209.04,
          "lines": [
              "It starts as an IP packet from the core."
          ]
      },
      {
          "cue": "5.3",
          "start": 209.34,
          "end": 214.62,
          "lines": [
              "The Baseband Unit schedules and codes",
              "it, then turns it into IQ samples —"
          ]
      },
      {
          "cue": "5.3",
          "start": 214.62,
          "end": 216.79,
          "lines": [
              "numbers describing a waveform."
          ]
      },
      {
          "cue": "5.4",
          "start": 217.09,
          "end": 221.36,
          "lines": [
              "Those samples ride the fibre as",
              "CPRI. Transport, not transformation —"
          ]
      },
      {
          "cue": "5.4",
          "start": 221.36,
          "end": 223.71,
          "lines": [
              "nothing about the information changes."
          ]
      },
      {
          "cue": "5.5",
          "start": 224.31,
          "end": 231.58,
          "lines": [
              "Here's the moment that matters. In the RRU, a DAC",
              "and an upconverter turn numbers into an analogue"
          ]
      },
      {
          "cue": "5.5",
          "start": 231.58,
          "end": 232.17,
          "lines": [
              "carrier."
          ]
      },
      {
          "cue": "5.6",
          "start": 232.77,
          "end": 239.39,
          "lines": [
              "Through the power amplifier, out the jumper,",
              "into the antenna — a beam in the air."
          ]
      },
      {
          "cue": "5.7",
          "start": 239.69,
          "end": 244.66,
          "lines": [
              "At the handset: antenna, low-noise amplifier,",
              "ADC, demodulate. Your packet is back."
          ]
      },
      {
          "cue": "5.8",
          "start": 245.66,
          "end": 252.9,
          "lines": [
              "Look at the spans: gigabits on fibre, gigahertz",
              "on the carrier, tens of watts leaving the radio —"
          ]
      },
      {
          "cue": "5.8",
          "start": 252.9,
          "end": 255.59,
          "lines": [
              "about a picowatt reaching the phone."
          ]
      },
      {
          "cue": "5.9",
          "start": 257.89,
          "end": 262.85,
          "lines": [
              "Every figure here is a representative",
              "range for typical LTE macro equipment."
          ]
      },
      {
          "cue": "5.10",
          "start": 263.55,
          "end": 271,
          "lines": [
              "Uplink is not a mirror image. The handset",
              "transmits about a fifth of a watt, on a battery."
          ]
      },
      {
          "cue": "5.11",
          "start": 271.6,
          "end": 276,
          "lines": [
              "Its amplifier is weak, so",
              "uplink usually limits coverage —"
          ]
      },
      {
          "cue": "5.11",
          "start": 276,
          "end": 280.7,
          "lines": [
              "the phone hears the site long",
              "before the site hears the phone."
          ]
      },
      {
          "cue": "6.1",
          "start": 282.1,
          "end": 285,
          "lines": [
              "Four symptoms you'll actually be sent for."
          ]
      },
      {
          "cue": "6.2",
          "start": 285.8,
          "end": 292.01,
          "lines": [
              "No service — check the S1 link and cell",
              "state before you touch anything RF."
          ]
      },
      {
          "cue": "6.3",
          "start": 292.71,
          "end": 297.67,
          "lines": [
              "Slow throughput — interference and modulation",
              "order, before you blame the backhaul."
          ]
      },
      {
          "cue": "6.4",
          "start": 298.37,
          "end": 304.58,
          "lines": [
              "One sector down — one RRU, its fibre,",
              "or its breaker. Check the breaker first."
          ]
      },
      {
          "cue": "6.5",
          "start": 305.28,
          "end": 310.24,
          "lines": [
              "High uplink noise — external interference,",
              "or a faulty jumper. Check VSWR."
          ]
      },
      {
          "cue": "7.1",
          "start": 311.44,
          "end": 315.17,
          "lines": [
              "Four things before you go near a live cabinet."
          ]
      },
      {
          "cue": "7.2",
          "start": 315.87,
          "end": 321.25,
          "lines": [
              "A spanner across battery terminals",
              "is a short with nothing in the way."
          ]
      },
      {
          "cue": "7.3",
          "start": 321.85,
          "end": 325.57,
          "lines": [
              "Opening a load breaker does",
              "not de-energise the busbar."
          ]
      },
      {
          "cue": "7.4",
          "start": 326.17,
          "end": 329.9,
          "lines": [
              "Nobody climbs without RF zone",
              "awareness and current certification."
          ]
      },
      {
          "cue": "7.5",
          "start": 330.5,
          "end": 333.81,
          "lines": [
              "And never lift a battery by its terminals."
          ]
      },
      {
          "cue": "7.6",
          "start": 334.61,
          "end": 337.92,
          "lines": [
              "Top to bottom. You can name it now."
          ]
      }
  ];

  // --- Locator graphic --------------------------------------------------
  // Simplified tower silhouette that persists in a corner from Scene 2 on.
  const locator = {
    title: 'WHERE WE ARE',
    subjects: [
      { id: 'tower',   label: 'Tower top' },
      { id: 'run',     label: 'Fibre + DC run' },
      { id: 'cabinet', label: 'Base cabinet' },
      { id: 'air',     label: 'Air interface' }
    ],
    // which subject is lit, keyed to the cue that starts the beat
    lit: [
      { cue: '2.2',  subject: 'tower' },
      { cue: '2.4',  subject: 'cabinet' },
      { cue: '2.5',  subject: 'run' },
      { cue: '3.1',  subject: 'tower' },
      { cue: '4.1',  subject: 'cabinet' },
      { cue: '5.1',  subject: 'air' },
      { cue: '6.1',  subject: 'air' },
      { cue: '7.6',  subject: 'all' }
    ]
  };

  // --- Avatar staging ---------------------------------------------------
  // Option B: the presenter is not yet generated. The slot is staged at the
  // exact geometry the talking-head will occupy so it drops in unchanged.
  const avatar = {
    note: 'Presenter slot — drop the talking head in here.',
    role: 'Senior RAN architect',
    // Option B staging: the presenter appears FULL FRAME in the cold open and
    // the recap only. Scenes 2-6 carry no presenter, so the diagrams own the
    // whole frame and there is no corner-cutout keep-out to design around.
    full: { x: 140, y: 140, w: 620, h: 780 },
    // What each clip needs. Generate two takes at these durations, drop them in
    // as assets/presenter-open.mp4 and assets/presenter-close.mp4.
    clips: [
      { id: 'open',  file: 'assets/presenter-open.mp4',  start: 0,      duration: 17.61, cues: ['1.1', '1.2', '1.3'] },
      { id: 'close', file: 'assets/presenter-close.mp4', start: 311.44, duration: 28.48, cues: ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6'] }
    ]
  };

  // --- Scene 1: cold open ----------------------------------------------
  const s1 = {
    kicker: 'FIELD TRAINING · LTE MACRO SITE',
    title: 'How a Cell Site Works',
    subtitle: 'From IP Packet to Handset',
    meta: ['Week 1 onboarding', 'Operations & Maintenance', 'Vendor-neutral']
  };

  // --- Scene 2: site overview ------------------------------------------
  const s2 = {
    heading: 'MACRO SITE — ELEVATION',
    sectors: [
      { id: 'a', az: '0°',   label: 'Sector 1' },
      { id: 'b', az: '120°', label: 'Sector 2' },
      { id: 'c', az: '240°', label: 'Sector 3' }
    ],
    labels: {
      antenna:  { name: 'Panel antenna',    detail: '1.4–2.6 m · 15–18 dBi (typical)' },
      rru:      { name: 'RRU',              detail: 'Remote Radio Unit — one per sector' },
      ladder:   { name: 'Cable ladder',     detail: 'fibre + DC, earth kits top / mid / bottom' },
      fibre:    { name: 'Fibre',            detail: 'CPRI/eCPRI — digital' },
      dc:       { name: '−48 V DC',         detail: 'power feed to each RRU' },
      cabinet:  { name: 'Base cabinet',     detail: 'BBU · rectifier · batteries · transmission' },
      earth:    { name: 'Ring earth',       detail: 'buried conductor + rods, target < 5 Ω' },
      height:   { name: 'Tower', detail: '30–60 m (typical)' }
    },
    twoThings: {
      heading: 'ONLY TWO THINGS RUN UP',
      items: ['Fibre — carries digital samples', '−48 V DC — carries power'],
      negative: 'No fat RF feeders'
    }
  };

  // --- Scene 3: tower top, the RRU -------------------------------------
  // Reveals fire in narration order; each is keyed to its cue.
  const s3 = {
    heading: 'TOWER TOP — REMOTE RADIO UNIT (RRU)',
    expand: 'RRU = Remote Radio Unit',
    reveals: [
      { cue: '3.2',  id: 'body',    name: 'Finned heat-sink body',  detail: 'passively cooled · 10–25 kg (typical)' },
      { cue: '3.3',  id: 'mount',   name: 'Pipe mount + downtilt bracket', detail: 'mechanical tilt 0–10° (typical)' },
      { cue: '3.4',  id: 'jumper',  name: '½" coax jumper + weatherproof boot', detail: 'RF to antenna — the short run' },
      { cue: '3.5',  id: 'fibre',   name: '2 × LC fibre connectors', detail: 'CPRI 2.5–10 Gbps (typical range)' },
      { cue: '3.6',  id: 'dc',      name: '−48 V DC connector',      detail: '40–60 W idle · 300–700 W loaded (typical)' },
      { cue: '3.7',  id: 'leds',    name: 'Status LEDs',             detail: 'RUN · ALM · ACT', offset: 0 },
      { cue: '3.7',  id: 'earth',   name: 'Earth strap',             detail: 'bonds to tower-top earth bar', offset: 2.2 }
    ],
    loss: {
      heading: 'WHY THE RADIO IS AT THE TOP',
      bars: [
        { id: 'coax',  label: 'Coax feeder',  value: '≈ 5 dB / 100 m', frac: 1.0,   note: 'at 1800 MHz (typical)' },
        { id: 'fibre', label: 'Fibre',        value: '≈ 0.35 dB / km', frac: 0.07,  note: 'negligible over a tower' }
      ],
      conclusion: 'Run RF 1 m. Send light and DC the 50 m.'
    },
    led: {
      states: [
        { id: 'run', name: 'RUN', ok: 'OK',      bad: 'FAULT' },
        { id: 'alm', name: 'ALM', ok: 'CLEAR',   bad: 'ALARM' },
        { id: 'act', name: 'ACT', ok: 'TRAFFIC', bad: 'IDLE' }
      ],
      faultTitle: 'RRU ALARM',
      faultLabel: 'RUN: FAULT · ALM: ALARM',
      firstChecks: [
        '1 — Fibre: SFP seated, ferrule clean',
        '2 — DC: breaker closed at the cabinet',
        '3 — Read the LEDs before planning a climb'
      ]
    }
  };

  // --- Scene 4: base cabinet -------------------------------------------
  const s4 = {
    heading: 'BASE CABINET — CUTAWAY',
    dims: { height: '≈ 2.0 m', width: '≈ 0.8 m', rack: '42 U mounting rail', note: 'representative outdoor cabinet' },
    shelves: [
      { cue: '4.3', id: 'bbu',  name: 'BBU subrack', expand: 'BBU = Baseband Unit',
        detail: 'main control + baseband boards · 1 vacant slot, blanking plate fitted',
        why: 'Serviced most — sits at reach height' },
      { cue: '4.4', id: 'rect', name: 'Rectifier shelf', expand: null,
        detail: 'AC mains → −48 V DC · 3–4 modules + 1 spare position · controller',
        why: 'Heat rises — above the batteries, below the electronics it feeds' },
      { cue: '4.5', id: 'dist', name: 'DC distribution', expand: 'LVD = Low-Voltage Disconnect',
        detail: 'busbar · labelled MCBs per load · LVD contactor · alarm dry contacts',
        why: 'Short, direct runs to the busbar' },
      { cue: '4.6', id: 'batt', name: '4 × 12 V VRLA batteries', expand: 'VRLA = Valve-Regulated Lead-Acid',
        detail: 'series string, 100–200 Ah · 2–8 h autonomy (typical range)',
        why: 'Heaviest items lowest — and outgassing stays away from electronics' }
    ],
    earthBar: { name: 'Copper earth bar', detail: 'star bond — never chain cabinet to cabinet' },
    breakers: [
      { pos: 'F1', rating: '32 A', load: 'RRU sector 1' },
      { pos: 'F2', rating: '32 A', load: 'RRU sector 2' },
      { pos: 'F3', rating: '32 A', load: 'RRU sector 3' },
      { pos: 'F4', rating: '20 A', load: 'BBU' },
      { pos: 'F5', rating: '10 A', load: 'Transmission' },
      { pos: 'B1', rating: '125 A', load: 'Battery string' }
    ],
    breakerNote: 'Ratings illustrative — typical LTE macro power plant',
    stacking: {
      heading: 'WHY THIS ORDER',
      points: ['Weight low', 'Heat rises', 'Electronics clear of battery outgassing', 'Service reach height']
    },
    // The centrepiece: mains-failure sequence.
    mains: {
      heading: 'MAINS FAILURE SEQUENCE',
      readoutLabel: 'DC BUS',
      unit: 'V',
      note: 'Representative thresholds',
      stages: [
        { cue: '4.9',  id: 'healthy', label: 'MAINS HEALTHY', v0: 54.0, v1: 54.0, focus: 'rect',
          alarm: null, alarmState: 'NO ALARMS', tech: 'Rectifiers float-charge the string' },
        { cue: '4.10', id: 'acfail',  label: 'AC SUPPLY LOST', v0: 54.0, v1: 53.5, focus: 'ac',
          alarm: 'MAINS FAILURE', alarmState: 'MAJOR', tech: 'Rectifier modules drop out, LEDs go dark' },
        { cue: '4.11', id: 'battery', label: 'BATTERY DISCHARGE', v0: 53.5, v1: 50.5, focus: 'batt',
          alarm: 'BATTERY ON DISCHARGE', alarmState: 'MAJOR', tech: 'Already across the bus — no switchover gap' },
        { cue: '4.12', id: 'sag',     label: 'BUS VOLTAGE SAGGING', v0: 50.5, v1: 46.0, focus: 'dist',
          alarm: 'DC LOW VOLTAGE', alarmState: 'CRITICAL', tech: 'Raised on the dry-contact terminal block' },
        { cue: '4.13', id: 'lvd',     label: 'LVD TRIP — LOADS SHED', v0: 46.0, v1: 43.0, focus: 'lvd',
          alarm: 'LOW-VOLTAGE DISCONNECT', alarmState: 'SITE DOWN', tech: 'Contactor opens to protect the battery' }
      ]
    }
  };

  // --- Scene 5: the signal chain ---------------------------------------
  // kind: 'stage' = what the signal IS. 'xform' = transformation (solid arrow
  // + conversion glyph). 'transport' = carried unchanged (dashed tube).
  const s5 = {
    heading: 'THE SIGNAL CHAIN — DOWNLINK',
    trackLabels: { rep: 'REPRESENTATION — what the signal is', hw: 'HARDWARE / MEDIUM — where it lives' },
    domainTags: { digital: 'DIGITAL', analogue: 'ANALOGUE' },
    chain: [
      { kind: 'stage',     id: 'ip',      cue: '5.2', domain: 'digital',  rep: 'IP packet',      hw: 'Core network',   val: '~1500 B MTU, GTP-U (typical)' },
      { kind: 'transport', id: 'backhaul',cue: '5.2', domain: 'digital',  rep: 'unchanged',      hw: 'Backhaul',      val: 'fibre or microwave · 1–10 Gbps (typical)' },
      { kind: 'stage',     id: 'sched',   cue: '5.3', domain: 'digital',  rep: 'Scheduled bits', hw: 'BBU / DU',       val: '1 ms TTI (typical)' },
      { kind: 'xform',     id: 'baseband',cue: '5.3', domain: 'digital',  rep: 'Baseband',       hw: 'BBU / DU',       val: 'coding · QPSK–256QAM · MIMO · IFFT' },
      { kind: 'stage',     id: 'iq',      cue: '5.3', domain: 'digital',  rep: 'IQ samples',     hw: 'BBU / DU',       val: '≈15.36 Msps @ 10 MHz (typical)' },
      { kind: 'transport', id: 'cpri',    cue: '5.4', domain: 'digital',  rep: 'unchanged',      hw: 'Fibre CPRI',    val: '2.5 / 4.9 / 9.8 / 10.1 Gbps (typical)' },
      { kind: 'xform',     id: 'dac',     cue: '5.5', domain: 'cross',    rep: 'DAC + upconvert', tag: 'D → A', hw: 'RRU',            val: 'THE DIGITAL → ANALOGUE CROSSOVER' },
      { kind: 'stage',     id: 'rf',      cue: '5.6', domain: 'analogue', rep: 'Analogue RF',    hw: 'RRU, after PA',  val: '40–46 dBm ≈ 10–40 W per branch (typical)' },
      { kind: 'transport', id: 'coax',    cue: '5.6', domain: 'analogue', rep: 'unchanged',      hw: 'Coax jumper',   val: 'the short run — RF travels one metre' },
      { kind: 'xform',     id: 'radiate', cue: '5.6', domain: 'analogue', rep: 'Radiated beam',  hw: 'Panel antenna',  val: '15–18 dBi · 65° beamwidth (typical)' },
      { kind: 'transport', id: 'air',     cue: '5.6', domain: 'analogue', rep: 'Propagation',    hw: 'Air',           val: 'path loss 120–145 dB (typical)' },
      { kind: 'xform',     id: 'adc',     cue: '5.7', domain: 'cross',    rep: 'LNA + ADC',      tag: 'A → D', hw: 'Handset',        val: 'analogue → digital, back again' },
      { kind: 'stage',     id: 'out',     cue: '5.7', domain: 'digital',  rep: 'Recovered packet', hw: 'Handset app',  val: 'identical payload to the left-hand end' }
    ],
    crossover: { label: 'DIGITAL → ANALOGUE', sub: 'the signal changes nature here' },
    transportNote: 'Fibre is TRANSPORT, not transformation — nothing about the information changes crossing it.',
    arrowLegend: [
      { kind: 'xform',     label: 'Transformation — representation changes' },
      { kind: 'transport', label: 'Transport — carried unchanged' }
    ],
    fiveG: 'LTE ▸ 5G: CPRI becomes eCPRI (packet-based); the CU/DU split moves where this fibre boundary falls. Chain unchanged.',
    scale: {
      heading: 'THE SPANS INVOLVED — LOGARITHMIC',
      caption: 'Fifteen orders of magnitude, end to end.',
      items: [
        { id: 'fibre',  label: 'Fibre line rate',       value: '≈ 10 Gbps',   exp: 10,   domain: 'digital'  },
        { id: 'carrier',label: 'Carrier frequency',     value: '≈ 1.8 GHz',   exp: 9.26, domain: 'analogue' },
        { id: 'tx',     label: 'Radiated power',        value: '≈ 40 W',      exp: 1.6,  domain: 'analogue' },
        { id: 'rx',     label: 'Received at handset',   value: '≈ 1 pW',      exp: -12,  domain: 'analogue' }
      ],
      note: 'Representative values, typical LTE macro'
    },
    caveat: 'ALL FIGURES: representative ranges for typical LTE macro equipment — not manufacturer specifications.',
    uplink: {
      heading: 'UPLINK — NOT A MIRROR IMAGE',
      stepsNote: 'Representative ranges',
      steps: [
        { id: 'ue',   label: 'Handset PA',        val: '≤ 23 dBm ≈ 0.2 W' },
        { id: 'path', label: 'Same path loss',    val: '120–145 dB' },
        { id: 'lna',  label: 'RRU LNA + ADC',     val: 'sens. −100 to −110 dBm' },
        { id: 'bbu',  label: 'BBU demod + decode',val: 'HARQ combining' }
      ],
      asymmetry: {
        heading: 'THE ASYMMETRY',
        dl: { label: 'Downlink — RRU', value: '≈ 40 W' },
        ul: { label: 'Uplink — handset', value: '≈ 0.2 W' },
        ratio: '≈ 200× less power, and battery-constrained',
        lesson: 'Uplink is usually the coverage-limiting direction.'
      }
    }
  };

  // --- Scene 6: where it breaks ----------------------------------------
  const s6 = {
    heading: 'WHERE IT BREAKS',
    sub: 'Symptom → suspect stages → first on-site check',
    symptoms: [
      { cue: '6.2', id: 'nosvc',  name: 'NO SERVICE',
        suspects: ['backhaul', 'sched', 'baseband'],
        cause: 'S1 down, cell locked, or BBU not carrying the cell',
        check: 'Check S1 link and cell state on the LMT before touching anything RF' },
      { cue: '6.3', id: 'slow',   name: 'SLOW THROUGHPUT',
        suspects: ['air', 'radiate', 'baseband'],
        cause: 'Interference or poor SNR forcing a low modulation order',
        check: 'Check interference and modulation order before blaming the backhaul' },
      { cue: '6.4', id: 'sector', name: 'ONE SECTOR DOWN',
        suspects: ['cpri', 'dac', 'rf'],
        cause: 'One RRU: its fibre, its SFP, or its DC breaker',
        check: 'Check that sector’s DC breaker first — then the fibre' },
      { cue: '6.5', id: 'ulnoise',id2: 'ul', name: 'HIGH UPLINK NOISE',
        suspects: ['coax', 'radiate', 'air'],
        cause: 'External interference, PIM, or water in a jumper',
        check: 'Check VSWR and the jumper weatherproofing' }
    ]
  };

  // --- Scene 7: safety and recap ---------------------------------------
  const s7 = {
    heading: 'BEFORE YOU GO NEAR IT',
    cards: [
      { cue: '7.2', id: 'arc',   name: 'DC ARC FLASH',        body: 'A spanner dropped across battery terminals is a short with nothing in the way. No fuse, no breaker, no delay.' },
      { cue: '7.3', id: 'bus',   name: 'THE BUSBAR STAYS LIVE', body: 'Opening a load breaker does NOT de-energise the busbar. Isolation is proved by measurement, never assumed.' },
      { cue: '7.4', id: 'rf',    name: 'RF EXPOSURE + CLIMBING', body: 'Know the exposure zones and have sectors shut down before anyone goes up. Climbing certification is not paperwork.' },
      { cue: '7.5', id: 'batt',  name: 'BATTERY WEIGHT',      body: '12 V VRLA blocks are heavy and awkward. Two people, proper technique — and never lift by the terminals.' }
    ],
    outro: { title: 'Top to bottom.', sub: 'You can name it now.' }
  };

  // --- helpers -----------------------------------------------------------
  const byId = {};
  cues.forEach(c => { byId[c.id] = c; });

  return {
    FPS, palette, type, stroke, scenes, cues, captions, locator, avatar,
    s1, s2, s3, s4, s5, s6, s7,
    duration: 339.92,
    /** absolute cue window */
    cue(id) {
      const c = byId[id];
      if (!c) throw new Error('unknown cue: ' + id);
      return c;
    },
    /** cue window expressed in a scene's local time */
    localCue(id, sceneId) {
      const c = this.cue(id), s = scenes[sceneId];
      if (!s) throw new Error('unknown scene: ' + sceneId);
      return { start: +(c.start - s.start).toFixed(3), end: +(c.end - s.start).toFixed(3), text: c.text };
    },
    /** local start of a cue, clamped to >= 0 */
    at(id, sceneId) { return Math.max(0, this.localCue(id, sceneId).start); }
  };
})();
