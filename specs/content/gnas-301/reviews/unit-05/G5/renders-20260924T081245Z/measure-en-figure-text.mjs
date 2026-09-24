// Programmatic Urdu-figure geometry inspection for GNAS-301 Unit 5 G5 (run 001).
// The Read tool returns no visual content for PNGs in this session and both MCP
// browsers lack a Chrome binary, so legibility is inspected by measurement:
// every <text> bbox in each .svg is checked against the viewBox (clipping)
// and against every other text bbox (overlap), and the effective font is read.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const DIR = 'specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z';
const out = {};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });

for (const id of ['fig-U5-1','fig-U5-2','fig-U5-3','fig-U5-4','fig-U5-5','fig-U5-6','fig-U5-7','fig-U5-8']) {
  await page.goto(`http://localhost:3459/img/figures/gnas-301/unit-05/${id}.svg`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const m = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      return {
        content: t.textContent.trim().slice(0, 40),
        x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height),
        right: Math.round(b.x + b.width), bottom: Math.round(b.y + b.height),
        font: getComputedStyle(t).fontFamily.split(',')[0],
      };
    });
    const clipped = texts.filter((t) => t.x < -1 || t.y < -1 || t.right > vb.width + 1 || t.bottom > vb.height + 1);
    // pairwise overlap of text bboxes (ignore zero-area)
    const overlaps = [];
    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const a = texts[i], b = texts[j];
        if (a.w <= 0 || b.w <= 0) continue;
        const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
        const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
        if (ox > 2 && oy > 2) overlaps.push([a.content, b.content, `${Math.round(ox)}x${Math.round(oy)}`]);
      }
    }
    return { viewBox: `${vb.width}x${vb.height}`, textCount: texts.length, clipped, overlaps, fonts: [...new Set(texts.map((t) => t.font))] };
  });
  out[id] = m;
  console.log(`${id}: ${m.viewBox}, ${m.textCount} texts, fonts=${m.fonts.join(';')}`);
  console.log(`   clipped: ${m.clipped.length}`, m.clipped.map((c) => `${c.content}(${c.x},${c.y},${c.w}x${c.h})`).join(' | '));
  console.log(`   overlaps: ${m.overlaps.length}`, m.overlaps.map((o) => `[${o[0]} ~ ${o[1]} ${o[2]}]`).join(' '));
}

// Page-prose Nastaliq webfont load check on the Urdu topic page
await page.goto('http://localhost:3459/ur/semester-1/gnas-301/unit-05/topic-01/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
out.pageFontCheck = await page.evaluate(() => ({
  nastaliqLoaded: document.fonts.check('16px "Noto Nastaliq Urdu"'),
  loadedFonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family),
}));

await browser.close();
writeFileSync(`${DIR}/en-figure-measurements.json`, JSON.stringify(out, null, 2) + '\n');
console.log('page nastaliq webfont loaded:', out.pageFontCheck.nastaliqLoaded);
console.log('page loaded font families:', out.pageFontCheck.loadedFonts.join(', '));
