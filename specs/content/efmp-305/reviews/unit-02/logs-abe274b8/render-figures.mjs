// G5 Urdu figure rasterisation for EFMP-305 Unit 2, run abe274b8.
// Renders the committed .ur.svg figure variants to PNG at intrinsic size with
// sharp (librsvg). Used because the crew brief forbids `npm run build`, a dev
// server and Playwright, so page-level rendering is unavailable. The PNGs are
// the actual rendered Urdu figure variants and are committed as evidence.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const unitDir = 'static/img/figures/efmp-305/unit-02';
const ids = ['fig-U2-1', 'fig-U2-2', 'fig-U2-3', 'fig-U2-4'];
const lines = [];

for (const id of ids) {
  for (const suffix of ['.ur.svg', '.ur.dark.svg']) {
    const src = `${unitDir}/${id}${suffix}`;
    const out = join(here, `${id}${suffix.replace(/\./g, '-')}.png`);
    const svg = readFileSync(src);
    const meta = await sharp(svg).metadata();
    await sharp(svg, { density: 96 }).png().toFile(out);
    const rendered = await sharp(out).metadata();
    const line = `rendered ${src} (viewBox ${meta.width}x${meta.height}) -> ${out} (${rendered.width}x${rendered.height}, ${rendered.size} bytes)`;
    console.log(line);
    lines.push(line);
  }
}

console.log('DONE');
