// Emits cellsite-explainer.srt from the caption cards in content/content.js —
// the same single source of truth the burned-in captions render from.
import { readFileSync, writeFileSync } from 'node:fs';
global.window = {};
eval(readFileSync(new URL('./content/content.js', import.meta.url), 'utf8'));
const C = global.window.CELLSITE;
const ts = s => {
  const ms = Math.round(s * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor(ms / 60000) % 60).padStart(2, '0');
  const sec = String(Math.floor(ms / 1000) % 60).padStart(2, '0');
  return `${h}:${m}:${sec},${String(ms % 1000).padStart(3, '0')}`;
};
const out = C.captions
  .map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.lines.join('\n')}\n`)
  .join('\n');
writeFileSync(new URL('./cellsite-explainer.srt', import.meta.url), out, 'utf8');
console.log(`wrote ${C.captions.length} subtitle entries, last ends ${ts(C.captions[C.captions.length - 1].end)}`);
