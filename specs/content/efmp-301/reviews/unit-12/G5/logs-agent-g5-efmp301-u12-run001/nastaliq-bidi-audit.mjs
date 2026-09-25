// Nastaliq font + bidi punctuation audit for EFMP-301 Unit 12 Urdu (G5 run001).
// 1. Verifies the self-hosted Noto Nastaliq Urdu webfont is loaded and applied
//    to the Urdu prose on every unit page.
// 2. For every SVG figure label that ends in Urdu punctuation (، ؛ ؟), measures
//    whether the trailing punctuation lands on the LEFT side of the run (correct
//    for RTL reading) or the RIGHT side (bidi error), by comparing the rendered
//    bbox with and without the trailing punctuation mark.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = 'http://localhost:3215';
const PAGES = [
  '/ur/semester-1/efmp-301/unit-12/',
  '/ur/semester-1/efmp-301/unit-12/topic-01/',
  '/ur/semester-1/efmp-301/unit-12/topic-02/',
  '/ur/semester-1/efmp-301/unit-12/topic-03/',
  '/ur/semester-1/efmp-301/unit-12/unit-assessment/',
  '/ur/semester-1/efmp-301/unit-12/unit-teacher-notes/',
];
const SVGS = [
  'static/img/figures/efmp-301/unit-12/fig-U12-1.ur.svg',
  'static/img/figures/efmp-301/unit-12/fig-U12-2.ur.svg',
  'static/img/figures/efmp-301/unit-12/fig-U12-3.ur.svg',
  'static/img/figures/efmp-301/unit-12/fig-U12-4.ur.svg',
  'static/img/figures/efmp-301/unit-12/fig-U12-5.ur.svg',
  'static/img/figures/efmp-301/unit-12/fig-U12-6.ur.svg',
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

console.log('== Urdu page font audit');
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  const info = await page.evaluate(async () => {
    await document.fonts.ready;
    const probe = document.querySelector('article p') || document.querySelector('article li');
    const cs = probe ? getComputedStyle(probe) : null;
    let nastaliqLoaded = false;
    for (const f of document.fonts) {
      if (/nastaliq/i.test(f.family) && f.status === 'loaded') nastaliqLoaded = true;
    }
    const check12 = document.fonts.check('12px "Noto Nastaliq Urdu"');
    return {
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      fontFamily: cs ? cs.fontFamily : null,
      nastaliqLoaded,
      fontsCheck12: check12,
      fontCount: document.fonts.size,
    };
  });
  console.log(`  ${p.split('/').slice(-2)[0] || 'index'}: lang=${info.lang} dir=${info.dir} nastaliqLoaded=${info.nastaliqLoaded} check(12px)=${info.fontsCheck12} fonts=${info.fontCount}`);
  console.log(`    prose font-family: ${info.fontFamily}`);
}

console.log('== SVG trailing-punctuation bidi audit');
for (const file of SVGS) {
  await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
  const res = await page.evaluate(() => {
    const out = [];
    for (const t of document.querySelectorAll('svg text')) {
      const s = t.textContent;
      if (/[،؛؟]$/.test(s)) {
        const full = t.getBBox();
        const clone = t.cloneNode(true);
        clone.textContent = s.replace(/[،؛؟]$/, '');
        t.parentNode.appendChild(clone);
        const stripped = clone.getBBox();
        clone.remove();
        // Correct RTL: trailing punctuation renders at the LEFT end, so removing
        // it moves the left edge right (x1 increases) and leaves x2 ~unchanged.
        const leftSide = stripped.x > full.x + 0.5;
        const rightSide = stripped.x + stripped.width < full.x + full.width - 0.5;
        out.push({
          s, full: { x1: +full.x.toFixed(1), x2: +(full.x + full.width).toFixed(1) },
          stripped: { x1: +stripped.x.toFixed(1), x2: +(stripped.x + stripped.width).toFixed(1) },
          side: leftSide && !rightSide ? 'LEFT (correct)' : rightSide && !leftSide ? 'RIGHT (bidi error)' : 'ambiguous',
        });
      }
    }
    return out;
  });
  console.log(`  ${file.split('/').pop()}`);
  if (!res.length) console.log('    (no labels with trailing Urdu punctuation)');
  for (const r of res) {
    console.log(`    "${r.s.slice(0, 36)}" full ${r.full.x1}..${r.full.x2} stripped ${r.stripped.x1}..${r.stripped.x2} -> ${r.side}`);
  }
}

await browser.close();
