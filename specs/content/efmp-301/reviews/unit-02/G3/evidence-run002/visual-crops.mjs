import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:4612';
const out = 'specs/content/efmp-301/reviews/unit-02/G3/evidence-run002/renders';
const browser = await chromium.launch();

// Narrow 360x780 viewport crops at meaningful scroll positions.
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const pg = await ctx.newPage();

// 1. topic-01 top: opening + first figure
await pg.goto(`${base}/semester-1/efmp-301/unit-02/topic-01`, { waitUntil: 'networkidle' });
await pg.waitForSelector('main h1');
await pg.waitForTimeout(1200);
await pg.screenshot({ path: `${out}/crop-narrow-topic01-top.png` });
const fig1 = await pg.$('main figure');
if (fig1) { await fig1.scrollIntoViewIfNeeded(); await pg.waitForTimeout(600); await fig1.screenshot({ path: `${out}/crop-narrow-topic01-fig1.png` }); }

// 2. topic-03 fig-U2-6 (the overflowing figure) in context
await pg.goto(`${base}/semester-1/efmp-301/unit-02/topic-03`, { waitUntil: 'networkidle' });
await pg.waitForSelector('main h1');
await pg.waitForTimeout(1200);
const figs = await pg.$$('main figure');
if (figs[1]) { await figs[1].scrollIntoViewIfNeeded(); await pg.waitForTimeout(600); await figs[1].screenshot({ path: `${out}/crop-narrow-topic03-figU2-6.png` }); }

// 3. unit-assessment MCQ section at narrow width
await pg.goto(`${base}/semester-1/efmp-301/unit-02/unit-assessment`, { waitUntil: 'networkidle' });
await pg.waitForSelector('main h1');
await pg.waitForTimeout(1200);
const mcqh = await pg.$('h3:has-text("Multiple-choice questions")');
if (mcqh) { await mcqh.scrollIntoViewIfNeeded(); await pg.waitForTimeout(400); await pg.screenshot({ path: `${out}/crop-narrow-assessment-mcq.png` }); }

// 4. teacher-notes scrollable table, scrolled right to prove reachability
await pg.goto(`${base}/semester-1/efmp-301/unit-02/unit-teacher-notes`, { waitUntil: 'networkidle' });
await pg.waitForSelector('main h1');
await pg.waitForTimeout(1200);
const tbl = await pg.$('main table');
if (tbl) {
  await tbl.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(400);
  await pg.screenshot({ path: `${out}/crop-narrow-teachnotes-table-before.png` });
  await pg.evaluate(() => { const t = document.querySelector('main table'); t.scrollLeft = t.scrollWidth; });
  await pg.waitForTimeout(400);
  await pg.screenshot({ path: `${out}/crop-narrow-teachnotes-table-scrolled.png` });
  const after = await pg.evaluate(() => {
    const t = document.querySelector('main table');
    const last = t.querySelector('tr:first-child th:last-child');
    const r = last.getBoundingClientRect();
    return { scrollLeft: t.scrollLeft, lastColRight: Math.round(r.right), lastColText: last.textContent.trim(), viewport: window.innerWidth };
  });
  console.log('table after scrollLeft=scrollWidth:', JSON.stringify(after));
}
await ctx.close();

// 5. Desktop crop of fig-U2-6 at natural display size for the overflow context
const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pg2 = await ctx2.newPage();
await pg2.goto(`${base}/semester-1/efmp-301/unit-02/topic-03`, { waitUntil: 'networkidle' });
await pg2.waitForSelector('main h1');
await pg2.waitForTimeout(1200);
const figs2 = await pg2.$$('main figure');
if (figs2[1]) { await figs2[1].scrollIntoViewIfNeeded(); await pg2.waitForTimeout(600); await figs2[1].screenshot({ path: `${out}/crop-desktop-topic03-figU2-6.png` }); }
await ctx2.close();
await browser.close();
console.log('crops done');
