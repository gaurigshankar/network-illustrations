# HeyGen generation brief — presenter clips

Two clips are needed. Nothing else about the video changes.

The **web UI is sufficient** — API access is not required. Generate each clip,
download the MP4, and drop the two files into `video/cellsite/assets/`.

---

## Do not fight for an exact duration

HeyGen decides clip length from the script and the voice's pace. It will not
land exactly on 17.61 s or 28.48 s, and it does not need to.

Send whatever it produces. Scene timing is driven by `content/content.js`, so
the scenes retime to the real clip lengths in one edit — the rest of the video
is untouched and the total stays inside the 5:30 ±20 s target.

What matters is that the **words are exactly as below**, because the burned-in
captions and the `.srt` are generated from these same strings. Changing the
spoken wording without changing the data file would desync them.

---

## Clip 1 — `presenter-open.mp4`

**Target ≈ 17.6 s · 37 words · cold open**

Paste this as the script, verbatim:

```
Before you climb anything, you need to know what you're looking at.

By the end of this you can walk onto a live site and name every box.

Top to bottom, then one packet end to end.
```

Leave a beat between the three sentences — they are three separate visual
beats (eyebrow rule, title card, meta chips).

---

## Clip 2 — `presenter-close.mp4`

**Target ≈ 28.5 s · 56 words · safety and recap**

Paste this as the script, verbatim:

```
Four things before you go near a live cabinet.

A spanner across battery terminals is a short with nothing in the way.

Opening a load breaker does not de-energise the busbar.

Nobody climbs without RF zone awareness and current certification.

And never lift a battery by its terminals.

Top to bottom. You can name it now.
```

Sentences two to five are the four safety cards, one card per sentence, so a
clear pause between them helps. The last line lands on the closing recap.

---

## Settings

| Setting | Value | Why |
|---|---|---|
| Engine | Avatar IV or V | Photorealistic tiers; III is noticeably stiffer |
| Aspect | Portrait — 9:16 or 4:5 | The slot is 620 × 780 (4:5). Any aspect works, I fit it, but portrait crops best |
| Resolution | 1080p | The composition is 1920 × 1080; more is wasted |
| Background | **Plain, or background removed** | The page ground is a near-white `#f6f8fa`. A removed or plain light background blends; a busy office scene will not |
| Framing | Head and upper body | The slot is tall and narrow — a wide shot leaves the face too small |
| Pace | Normal / ~145 wpm | The whole video is timed at 145 wpm |

## Voice and tone

The script is written for a **senior RAN architect mentoring a new hire** —
plain, direct, site-floor practical. Not a corporate narrator, not an
enthusiastic explainer. Pick a voice that sounds like someone who has actually
stood at the base of a tower in the rain.

The safety lines in clip 2 should land flat and serious. They are the lines
that stop someone getting hurt.

## Avatar look, if you are generating one rather than using your own likeness

> A field-experienced telecoms engineer in their forties, wearing a plain
> high-visibility vest over a work shirt, neutral expression, direct to camera,
> plain light grey background, soft even lighting, head and shoulders framing.

---

## What happens next

Drop the two files in `video/cellsite/assets/`, then in `index.html` replace
the placeholder contents of `#avatar-frame-open` and `#avatar-frame-close`:

```html
<video src="assets/presenter-open.mp4" muted></video>
```

Both slots are already staged at x 140, y 140, 620 × 780. Re-render and the
presenter is in. The spec lives in `content/content.js` under `avatar.clips`.

If the clips carry their own audio, that also fills the video's missing
narration for the cold open and the recap — the middle five scenes would still
be silent, so a full voiceover of `video/SCRIPT.md` remains the better fix for
the whole runtime.
