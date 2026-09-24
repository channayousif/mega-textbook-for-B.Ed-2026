// G5 pixel-ink analysis: the review host cannot display images, so verify the
// screenshots contain substantial rendered ink (text drawn, not blank/tofu
// blocks) using sharp. Reports ink coverage per screenshot and, for the figure
// renders, ink inside the central label band.
import sharp from 'sharp';
import { readdirSync, writeFileSync } from 'node:fs';

const DIR = 'specs/content/gqur-300/reviews/unit-03/G5/renders-agent-g5-gqur300-u3-run001';
const notes = [];
for (const f of readdirSync(DIR).filter(x => x.endsWith('.png')).sort()) {
  const img = sharp(`${DIR}/${f}`);
  const { width, height, channels } = await img.metadata();
  const { data, info } = await img.greyscale().raw().toBuffer({ resolveWithObject: true });
  let ink = 0;
  for (let i = 0; i < data.length; i++) if (data[i] < 128) ink++;
  const pct = (100 * ink / data.length).toFixed(2);
  // figure renders: ink in the vertical band where labels live (middle 60%)
  let band = '';
  if (f.startsWith('figure-')) {
    const y0 = Math.floor(info.height * 0.2), y1 = Math.floor(info.height * 0.8);
    let bink = 0, btotal = 0;
    for (let y = y0; y < y1; y++) for (let x = 0; x < info.width; x++) {
      const v = data[y * info.width + x];
      if (v < 128) bink++;
      btotal++;
    }
    band = ` band20-80%ink=${(100 * bink / btotal).toFixed(2)}%`;
  }
  notes.push(`${f}: ${width}x${height} ch=${channels} ink=${pct}%${band}`);
}
writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001/pixel-ink-analysis.txt', notes.join('\n') + '\n');
console.log(notes.join('\n'));
