// Analyze the captured element screenshots' pixel content with sharp (repo devDep).
import sharp from 'sharp';
import { readdirSync, writeFileSync } from 'node:fs';

const DIR = 'specs/content/efmp-301/reviews/unit-04/G3/renders-agent-g3-efmp301-u4-run001';
const out = [];
for (const f of readdirSync(DIR).filter((f) => f.startsWith('inspect-') && f.endsWith('.png')).sort()) {
  const img = sharp(`${DIR}/${f}`);
  const { width, height } = await img.metadata();
  const stats = await img.stats();
  const { dominant } = stats;
  const channelStdev = stats.channels.map((c) => Math.round(c.stdev * 10) / 10);
  // A blank image has near-zero stdev everywhere; real diagrams have high variance.
  const blank = channelStdev.every((s) => s < 3);
  out.push({ file: f, width, height, channelStdev, dominant, blank });
  console.log(`${f}: ${width}x${height} stdev=${JSON.stringify(channelStdev)} ${blank ? 'LOOKS BLANK' : 'has content'}`);
}
writeFileSync(`${DIR}/capture-pixel-stats.json`, JSON.stringify(out, null, 2));
console.log('DONE');
