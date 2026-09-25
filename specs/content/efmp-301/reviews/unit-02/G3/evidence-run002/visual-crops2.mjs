import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:4612';
const out = 'specs/content/efmp-301/reviews/unit-02/G3/evidence-run002/renders';
const browser = await chromium.launch();

// teacher-notes scrollable table, scrolled right to prove reachability
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const pg = await ctx.newPage();
await pg.goto(`${base}/semester-1/efmp-301/unit-02/unit-teacher-notes`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await pg.waitForSelector('main h1', { timeout: 60000 });
await pg.waitForTimeout(2500);
const tbl = await pg.$('main table');
if (tbl) {
  await tbl.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(600);
  await pg.screenshot({ path: `${out}/crop-narrow-teachnotes-table-before.png` });
  const after = await pg.evaluate(() => {
    const t = document.querySelector('main table');
    t.scrollLeft = t.scrollWidth;
    const last = t.querySelector('tr:first-child th:last-child');
    const r = last.getBoundingClientRect();
    return { scrollLeft: t.scrollLeft, lastColRight: Math.round(r.right), lastColText: last.textContent.trim(), viewport: window.innerWidth };
  });
  await pg.waitForTimeout(600);
  await pg.screenshot({ path: `${out}/crop-narrow-teachnotes-table-scrolled.png` });
  console.log('table after scrollLeft=scrollWidth:', JSON.stringify(after));
} else {
  console.log('NO TABLE FOUND');
}
await ctx.close();

// Desktop crop of fig-U2-6 at display size for the overflow context
const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pg2 = await ctx2.newPage();
await pg2.goto(`${base}/semester-1/efmp-301/unit-02/topic-03`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await pg2.waitForSelector('main h1', { timeout: 60000 });
await pg2.waitForTimeout(2500);
const figs2 = await pg2.$$('main figure');
if (figs2[1]) { await figs2[1].scrollIntoViewIfNeeded(); await pg2.waitForTimeout(800); await figs2[1].screenshot({ path: `${out}/crop-desktop-topic03-figU2-6.png` }); }
else console.log('NO FIGURES on topic-03');
await ctx2.close();
await browser.close();
console.log('crops2 done');
