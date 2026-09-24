// G5 figure-scale inspection (fixed): figures render as <img class="figure__img">
// pointing at the .ur.svg variants. Measure rendered width and the effective
// SVG label font size (viewBox 1200x720, labels 12-15px) at narrow viewport.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3221';
const browser = await chromium.launch();
const notes = [];
for (const [tag, vp, mobile] of [['desktop', { width: 1280, height: 900 }, false], ['narrow', { width: 360, height: 740 }, true]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  for (const t of ['topic-01', 'topic-02', 'topic-03']) {
    await page.goto(`${BASE}/ur/semester-1/gqur-300/unit-03/${t}/`, { waitUntil: 'networkidle' });
    const m = await page.evaluate(async () => {
      const out = [];
      for (const img of document.querySelectorAll('article img.figure__img--light')) {
        await img.decode?.().catch(() => {});
        const r = img.getBoundingClientRect();
        // viewBox is 1200x720 across this unit's figures; labels 12-15px per the SVG CSS
        const scale = r.width / 1200;
        out.push(`${img.getAttribute('src').split('/').pop()} w=${Math.round(r.width)} labelPx=${(12 * scale).toFixed(1)}-${(15 * scale).toFixed(1)}`);
      }
      return out;
    });
    notes.push(`${tag} ${t}: ${m.join(' ; ')}`);
  }
  await ctx.close();
}
await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001/figure-scale.txt', notes.join('\n') + '\n');
console.log(notes.join('\n'));
