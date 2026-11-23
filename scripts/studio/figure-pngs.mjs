#!/usr/bin/env node
// Feature 032 phase B: render the figures a slide outline uses to PNG for the PowerPoint export
// (which handles SVG poorly). Chromium, not sharp: the figures style themselves with CSS variables.
//   node scripts/studio/figure-pngs.mjs <outline.json> <out-dir>
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const [outline, outDir] = process.argv.slice(2);
const o = JSON.parse(readFileSync(outline, 'utf8'));
mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1560, height: 940 } });
for (const s of o.slides.filter((x) => x.kind === 'figure')) {
  for (const suf of ['', '.ur']) {
    await p.goto('file://' + resolve(`static${s.figure}${suf}.svg`), { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(300);
    await (await p.$('svg')).screenshot({ path: join(outDir, `${basename(s.figure)}${suf}.png`) });
  }
}
await b.close();
console.log(`figure PNGs in ${outDir}`);
