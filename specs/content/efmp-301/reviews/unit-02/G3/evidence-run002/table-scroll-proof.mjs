import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const base = 'http://127.0.0.1:4612';
const out = 'specs/content/efmp-301/reviews/unit-02/G3/evidence-run002';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const pg = await ctx.newPage();
await pg.goto(`${base}/semester-1/efmp-301/unit-02/unit-teacher-notes`, { waitUntil: 'domcontentloaded', timeout: 180000 });
await pg.waitForSelector('main table', { timeout: 120000 });
await pg.waitForTimeout(3000);
const tbl = await pg.$('main table');
await tbl.scrollIntoViewIfNeeded();
await pg.waitForTimeout(800);
await pg.screenshot({ path: `${out}/renders/crop-narrow-teachnotes-table-before.png` });
const result = await pg.evaluate(() => {
  const t = document.querySelector('main table');
  const lastBefore = t.querySelector('tr:first-child th:last-child');
  const before = { right: Math.round(lastBefore.getBoundingClientRect().right), text: lastBefore.textContent.trim() };
  t.scrollLeft = t.scrollWidth;
  const lastAfter = t.querySelector('tr:first-child th:last-child');
  const after = { right: Math.round(lastAfter.getBoundingClientRect().right), text: lastAfter.textContent.trim() };
  return {
    tableClientWidth: t.clientWidth, tableScrollWidth: t.scrollWidth, scrollLeftAfter: t.scrollLeft,
    tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label'),
    lastColumnBeforeScroll: before, lastColumnAfterScroll: after, viewport: window.innerWidth,
    reachableBySwipe: after.right <= window.innerWidth + 1,
  };
});
await pg.waitForTimeout(600);
await pg.screenshot({ path: `${out}/renders/crop-narrow-teachnotes-table-scrolled.png` });
const lines = ['### teacher-notes sequencing table reachability proof (360px, per G3 reference method)', JSON.stringify(result, null, 2)];
writeFileSync(`${out}/table-scroll-proof.log`, lines.join('\n') + '\n');
console.log(lines.join('\n'));
await ctx.close();
await browser.close();
