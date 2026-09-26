#!/usr/bin/env node
/**
 * Focused evidence for the fig-U2-5 label superposition found by
 * figure-text-overlap.mjs: precise boxes of the two colliding labels in every
 * committed variant of the figure (EN light/dark, UR light/dark), a 4x crop of
 * the collision band, and the shared-ink count per variant.
 */
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const dir = join(root, 'static/img/figures/efmp-302/unit-02');
const outDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G3/renders-feat023-r2');
const VARIANTS = ['fig-U2-5.svg', 'fig-U2-5.dark.svg', 'fig-U2-5.ur.svg', 'fig-U2-5.ur.dark.svg'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 4 });
const page = await ctx.newPage();

const report = [];
for (const name of VARIANTS) {
  const svgText = readFileSync(join(dir, name), 'utf8');
  const sized = svgText.replace(/<svg /, `<svg width="780" height="430" `);
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0}</style><div id="host">${sized}</div>`, { waitUntil: 'load' });
  const r = await page.evaluate(() => {
    const svg = document.querySelector('#host svg');
    const texts = [...svg.querySelectorAll('text')];
    const pick = (re) => texts.filter((t) => re.test(t.textContent));
    const targets = [...pick(/was outweighed/), ...pick(/did not follow/), ...pick(/ہرا/)];
    const box = (t) => { const b = t.getBBox(); return { s: t.textContent, x: +b.x.toFixed(1), r: +(b.x + b.width).toFixed(1), y: +b.y.toFixed(1), b: +(b.y + b.height).toFixed(1) }; };
    // All texts sharing the y=150 baseline band, to name every label on that line.
    const line = texts.filter((t) => Math.abs(t.getBBox().y + t.getBBox().height / 2 - 150) < 12).map(box);
    return { targets: targets.map(box), line };
  });
  // Pixel test on the two EN labels (UR labels differ; measured separately below).
  const px = await page.evaluate(async () => {
    const svg = document.querySelector('#host svg');
    const texts = [...svg.querySelectorAll('text')];
    const a = texts.find((t) => t.textContent === 'was outweighed');
    const b = texts.find((t) => t.textContent === 'did not follow through');
    if (!a || !b) return { note: 'EN label pair not present in this variant' };
    const cloneWith = (keep) => {
      const clone = svg.cloneNode(true);
      [...clone.querySelectorAll('text')].forEach((t, i) => { if (!keep.includes(i)) t.setAttribute('visibility', 'hidden'); });
      clone.setAttribute('width', '780'); clone.setAttribute('height', '430');
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clone));
    };
    const draw = async (url) => {
      const img = new Image(); img.width = 780; img.height = 430;
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('load')); img.src = url; });
      const cv = document.createElement('canvas'); cv.width = 780; cv.height = 430;
      const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(img, 0, 0, 780, 430);
      return cx.getImageData(0, 0, 780, 430).data;
    };
    const ai = texts.indexOf(a), bi = texts.indexOf(b);
    const [da, db, dn] = await Promise.all([draw(cloneWith([ai])), draw(cloneWith([bi])), draw(cloneWith([]))]);
    let both = 0; const cols = [];
    for (let p = 0; p < da.length; p += 4) {
      const ai2 = da[p] !== dn[p] || da[p + 1] !== dn[p + 1] || da[p + 2] !== dn[p + 2];
      const bi2 = db[p] !== dn[p] || db[p + 1] !== dn[p + 1] || db[p + 2] !== dn[p + 2];
      if (ai2 && bi2) { both++; const x = (p / 4) % 780, y = Math.floor((p / 4) / 780); cols.push([x, y]); }
    }
    return { sharedInkPx: both, sample: cols.slice(0, 5) };
  });
  report.push({ variant: name, ...r, pixel: px });
  // 4x crop of the collision band (y 132..166, x 440..620) for human verification.
  const clip = { x: 440, y: 132, width: 180, height: 34 };
  await page.screenshot({ path: join(outDir, `fig-U2-5-collision-crop-${name.replace('.svg', '')}.png`), clip });
}

await ctx.close(); await browser.close();
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G3/logs-feat023-r2/fig-U2-5-collision-detail.json'), `${JSON.stringify({ schema_version: 1, generated_at: new Date().toISOString(), report }, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
