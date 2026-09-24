// Extract visible text labels from the Unit 5 figure SVGs (EN + UR variants)
// for the G5 figure-label comparison. Read-only.
import { readFileSync } from 'node:fs';

const base = 'static/img/figures/gnas-301/unit-05/';
for (const id of ['fig-U5-1','fig-U5-2','fig-U5-3','fig-U5-4','fig-U5-5','fig-U5-6','fig-U5-7','fig-U5-8']) {
  for (const suffix of ['.svg', '.ur.svg']) {
    const c = readFileSync(base + id + suffix, 'utf8');
    const texts = [...c.matchAll(/>([^<>]+)</g)].map(m => m[1].trim())
      .filter(t => t && !t.startsWith('<?') && !t.startsWith('<'));
    const vb = /viewBox="([^"]+)"/.exec(c);
    console.log(`=== ${id}${suffix} (viewBox: ${vb ? vb[1] : 'none'}) ===`);
    console.log(texts.join(' | '));
  }
}
