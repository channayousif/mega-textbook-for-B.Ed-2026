// G3 run005 render inspection: EFMP-302 Unit 4, English.
// Host browser inspection record. Serves the pre-built build/ at :3104.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3104/semester-1/efmp-302/unit-04';
const OUT = 'specs/content/efmp-302/reviews/unit-04/renders-agent-g3-efmp302-u4-run005';
mkdirSync(OUT, { recursive: true });
const PAGES = ['', '/topic-01', '/topic-02', '/topic-03', '/topic-04', '/unit-assessment', '/unit-teacher-notes'];
const name = (p) => (p === '' ? 'index' : p.slice(1));

const report = { started_at: new Date().toISOString(), base: BASE, pages: {} };
const browser = await chromium.launch();

for (const p of PAGES) {
  const key = name(p);
  const rec = { url: BASE + p, viewports: {} };

  // desktop 1280x900
  let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  let page = await ctx.newPage();
  const resp = await page.goto(BASE + p, { waitUntil: 'networkidle' });
  rec.status = resp.status();
  rec.title = await page.title();
  // heading order
  rec.headings = await page.$$eval('main h1,main h2,main h3,main h4', (hs) => hs.map((h) => h.tagName + ':' + h.textContent.trim().slice(0, 70)));
  // links without descriptive text
  rec.bad_links = await page.$$eval('main a', (as) => as.filter((a) => /^(here|click here|link|read more|this)$/i.test(a.textContent.trim())).map((a) => a.outerHTML.slice(0, 120)));
  // images + alt
  rec.images = await page.$$eval('main img', (is) => is.map((i) => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt'), altLen: (i.getAttribute('alt') || '').length })));
  // figure scroll regions: role, tabindex, aria-label, overflow, scrollWidth vs clientWidth
  const figProbe = (sel) => document.querySelectorAll(sel);
  rec.viewports.desktop = await page.evaluate(() => {
    const out = [];
    for (const f of document.querySelectorAll('main figure, main .figure')) {
      const id = f.id || (f.querySelector('img')?.getAttribute('src') || '').split('/').pop();
      const scroller = f.querySelector('[role="region"],[tabindex]') || f;
      const cs = getComputedStyle(scroller);
      out.push({
        id,
        figClass: f.className,
        scrollerTag: scroller.tagName,
        role: scroller.getAttribute('role'),
        tabindex: scroller.getAttribute('tabindex'),
        ariaLabel: scroller.getAttribute('aria-label'),
        overflowX: cs.overflowX,
        scrollWidth: scroller.scrollWidth,
        clientWidth: scroller.clientWidth,
        clipped: scroller.scrollWidth > scroller.clientWidth + 1,
      });
    }
    return out;
  });
  await page.screenshot({ path: `${OUT}/${key}-desktop.png`, fullPage: true });
  await ctx.close();

  // narrow 360
  ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
  page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  rec.viewports.narrow360 = await page.evaluate(() => {
    const out = [];
    for (const f of document.querySelectorAll('main figure, main .figure')) {
      const id = f.id || (f.querySelector('img')?.getAttribute('src') || '').split('/').pop();
      const scroller = f.querySelector('[role="region"],[tabindex]') || f;
      const cs = getComputedStyle(scroller);
      out.push({
        id, scrollerTag: scroller.tagName, role: scroller.getAttribute('role'),
        tabindex: scroller.getAttribute('tabindex'), ariaLabel: scroller.getAttribute('aria-label'),
        overflowX: cs.overflowX, scrollWidth: scroller.scrollWidth, clientWidth: scroller.clientWidth,
        scrollable: scroller.scrollWidth > scroller.clientWidth + 1,
      });
    }
    return out;
  });
  rec.narrow_doc_overflow = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth }));
  // tables (rubrics) scroll affordance
  rec.tables_narrow = await page.evaluate(() => {
    const out = [];
    for (const t of document.querySelectorAll('main table')) {
      const w = t.closest('[role="region"],[tabindex]') || t.parentElement;
      out.push({ role: w?.getAttribute('role'), tabindex: w?.getAttribute('tabindex'), ariaLabel: w?.getAttribute('aria-label'), scrollW: w?.scrollWidth, clientW: w?.clientWidth });
    }
    return out;
  });
  await page.screenshot({ path: `${OUT}/${key}-narrow-360.png`, fullPage: true });
  await ctx.close();

  // print A4
  ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  rec.print = await page.evaluate(() => {
    const out = [];
    for (const f of document.querySelectorAll('main figure, main .figure')) {
      const img = f.querySelector('img');
      const r = f.getBoundingClientRect();
      out.push({ id: (img?.getAttribute('src') || '').split('/').pop(), w: Math.round(r.width), h: Math.round(r.height), overflowX: getComputedStyle(f).overflowX, scrollW: f.scrollWidth, clientW: f.clientWidth, clipped: f.scrollWidth > f.clientWidth + 1 });
    }
    return out;
  });
  await page.pdf({ path: `${OUT}/${key}-a4.pdf`, format: 'A4', printBackground: true });
  await page.screenshot({ path: `${OUT}/${key}-print-a4.png`, fullPage: true });
  await ctx.close();

  report.pages[key] = rec;
  console.log(`[ok] ${key} status=${rec.status} figs=${rec.viewports.desktop.length}`);
}

await browser.close();
report.completed_at = new Date().toISOString();
writeFileSync(`${OUT}/inspection-run005.json`, JSON.stringify(report, null, 2));
console.log('inspection written');
