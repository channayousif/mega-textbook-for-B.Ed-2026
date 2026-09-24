import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('static/img/figures/gqur-300/unit-02/fig-U2-1.ur.svg', 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 780, height: 470 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><style>html,body{margin:0;padding:0}svg{display:block}</style>${svg}`, { waitUntil: 'load' });
await page.waitForTimeout(300);
await page.screenshot({ path: 'specs/content/gqur-300/reviews/unit-02/G5/renders-agent-g5-gqur300-u2-run001/fig-U2-1-ur-standalone.png' });
// Also grab the note's bbox from the live DOM for exact pixel rows
const bbox = await page.evaluate(() => {
  const texts = [...document.querySelectorAll('text')].map((t) => {
    const b = t.getBBox();
    return { s: t.textContent.trim().slice(0, 40), x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1), y1: +b.y.toFixed(1), y2: +(b.y + b.height).toFixed(1) };
  });
  return texts;
});
await browser.close();
const note = bbox.find((t) => t.s.includes('تمام عدد گنا'));
console.log('note bbox:', JSON.stringify(note));

const { data, info } = await sharp('specs/content/gqur-300/reviews/unit-02/G5/renders-agent-g5-gqur300-u2-run001/fig-U2-1-ur-standalone.png').greyscale().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const y0 = Math.max(0, Math.floor(note.y1)), y1 = Math.min(info.height, Math.ceil(note.y2));
const colInk = (col) => { let n = 0; for (let y = y0; y < y1; y++) if (data[y * w + col] < 170) n++; return n; };
console.log(`image ${info.width}x${info.height}, note rows ${y0}..${y1}`);
for (const col of [0, 1, 2, 5, 10, 20, 40, 60, 80]) console.log(`column ${col}: ${colInk(col)} dark pixels`);
console.log(colInk(0) > 0 || colInk(1) > 0
  ? 'CONFIRMED: the Urdu side note is physically clipped at the left edge of the figure (ink in the first columns at the note rows).'
  : 'NOTE: no ink at the very first columns; clipping may manifest as truncated word start.');
