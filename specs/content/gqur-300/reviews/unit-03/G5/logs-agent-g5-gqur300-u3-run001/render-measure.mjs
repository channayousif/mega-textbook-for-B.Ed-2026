// G5 render measurements (rerun) - dir/font/overflow and narrow-viewport clipping scan.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3221';
const pages = [
  ['index', '/ur/semester-1/gqur-300/unit-03/'],
  ['topic-01', '/ur/semester-1/gqur-300/unit-03/topic-01/'],
  ['topic-02', '/ur/semester-1/gqur-300/unit-03/topic-02/'],
  ['topic-03', '/ur/semester-1/gqur-300/unit-03/topic-03/'],
  ['unit-assessment', '/ur/semester-1/gqur-300/unit-03/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/gqur-300/unit-03/unit-teacher-notes/'],
];
const browser = await chromium.launch();
const notes = [];
for (const [vw, vh, tag] of [[1280, 900, 'desktop'], [360, 740, 'narrow']]) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'narrow' ? 2 : 1, isMobile: tag === 'narrow', hasTouch: tag === 'narrow' });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const p = document.querySelector('article p');
      const clipped = [];
      for (const el of document.querySelectorAll('article *')) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > de.clientWidth + 1 || r.left < -1)) {
          clipped.push(`${el.tagName}"${(el.textContent || '').trim().slice(0, 30)}"R${Math.round(r.right)}`);
          if (clipped.length >= 6) break;
        }
      }
      return {
        dir: de.dir, font: p ? getComputedStyle(p).fontFamily.slice(0, 60) : null,
        scrollW: de.scrollWidth, clientW: de.clientWidth, clipped,
        banner: !!document.querySelector('[class*="untranslated" i], [class*="translationStatus" i]'),
      };
    });
    notes.push(`${tag} ${name}: dir=${m.dir} font=${m.font} scrollW=${m.scrollW}/${m.clientW} overflow=${m.scrollW > m.clientW} clipped=${m.clipped.join(' | ') || 'none'}`);
  }
  await ctx.close();
}
await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001/render-measurements.txt', notes.join('\n') + '\n');
console.log(notes.join('\n'));
