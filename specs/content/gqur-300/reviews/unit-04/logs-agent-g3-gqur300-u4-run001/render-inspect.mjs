// G3 render inspection for GQUR-300 Unit 4 - actual browser + print views.
// Serves from the production static build at localhost:3210 (npm run build
// succeeded at reviewed HEAD c79c453; see build.txt).
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3210/semester-1/gqur-300/unit-04';
const OUT = 'specs/content/gqur-300/reviews/unit-04/renders-agent-g3-gqur300-u4-run001';
const PAGES = [
  ['index', `${BASE}/`],
  ['topic-01', `${BASE}/topic-01`],
  ['topic-02', `${BASE}/topic-02`],
  ['topic-03', `${BASE}/topic-03`],
  ['unit-assessment', `${BASE}/unit-assessment`],
  ['unit-teacher-notes', `${BASE}/unit-teacher-notes`],
];
const VAGUE = /^(here|click here|read more|link|this)$/i;

const browser = await chromium.launch();
const report = { base: BASE, generated: new Date().toISOString(), pages: [] };

async function inspect(page, name, url) {
  const entry = { name, url };
  entry.title = await page.title();
  entry.h1 = await page.locator('main h1, article h1').count();
  const hs = await page.locator('h1, h2, h3').all();
  entry.headingOutline = [];
  for (const h of hs) {
    const tag = await h.evaluate((n) => n.tagName);
    const text = (await h.innerText()).trim().slice(0, 70);
    entry.headingOutline.push(`${tag}: ${text}`);
  }
  const links = await page.locator('main a, article a').all();
  entry.vagueLinks = [];
  for (const a of links) {
    const t = (await a.innerText()).trim();
    if (VAGUE.test(t)) entry.vagueLinks.push(t);
  }
  entry.figures = await page.locator('figure').count();
  const imgs = await page.locator('article img, main img').all();
  entry.contentImages = [];
  for (const img of imgs) {
    const src = await img.getAttribute('src');
    if (src && src.includes('/img/figures/')) {
      entry.contentImages.push({
        src,
        alt: (await img.getAttribute('alt')) ?? '',
        loaded: await img.evaluate((n) => n.complete && n.naturalWidth > 0),
      });
    }
  }
  entry.emptyAltFigures = entry.contentImages.filter((i) => !i.alt.trim()).length;
  entry.unloadedFigures = entry.contentImages.filter((i) => !i.loaded).length;
  return entry;
}

async function tableAudit(page) {
  return page.evaluate(() => {
    const out = [];
    for (const table of document.querySelectorAll('table')) {
      const rect = table.getBoundingClientRect();
      const rec = {
        scrollWidth: table.scrollWidth,
        clientWidth: table.clientWidth,
        scrollable: table.scrollWidth > table.clientWidth,
        tabindex: table.getAttribute('tabindex'),
        role: table.getAttribute('role'),
        ariaLabel: table.getAttribute('aria-label'),
        width: Math.round(rect.width),
      };
      if (rec.scrollable) {
        table.scrollLeft = table.scrollWidth;
        rec.afterScrollScrollLeft = table.scrollLeft;
        rec.reachedEnd = table.scrollLeft > 0;
        table.scrollLeft = 0;
      }
      out.push(rec);
    }
    return out;
  });
}

for (const [name, url] of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  const entry = await inspect(page, name, url);
  entry.docOverflowDesktop = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({ path: `${OUT}/${name}-desktop-1280.png`, fullPage: false });
  entry.tablesDesktop = await tableAudit(page);
  // figure element screenshots, light theme
  for (let i = 1; i <= 6; i++) {
    const fig = page.locator(`#fig-U4-${i}`);
    if (await fig.count()) await fig.screenshot({ path: `${OUT}/fig-U4-${i}-element-light.png` });
  }
  await ctx.close();

  // narrow 360
  const nctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const npage = await nctx.newPage();
  await npage.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  entry.docOverflowNarrow = await npage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  entry.tablesNarrow = await tableAudit(npage);
  await npage.screenshot({ path: `${OUT}/${name}-narrow-360.png`, fullPage: false });
  await nctx.close();

  // print emulation at A4 width
  const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const ppage = await pctx.newPage();
  await ppage.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await ppage.emulateMedia({ media: 'print' });
  entry.docOverflowPrint = await ppage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  entry.tablesPrint = await tableAudit(ppage);
  entry.printHiddenNav = await ppage.evaluate(() => {
    const nav = document.querySelector('header, .navbar, nav.navbar');
    return nav ? getComputedStyle(nav).display === 'none' : null;
  });
  await ppage.screenshot({ path: `${OUT}/${name}-print-emulated.png`, fullPage: false });
  if (name === 'unit-assessment' || name === 'topic-02') {
    await ppage.pdf({ path: `${OUT}/${name}-a4.pdf`, format: 'A4', printBackground: false });
  }
  await pctx.close();

  report.pages.push(entry);
  console.log('inspected', name);
}

// dark theme figure check
const dctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
const dpage = await dctx.newPage();
await dpage.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch {} });
await dpage.goto(`${BASE}/topic-01`, { waitUntil: 'networkidle', timeout: 120000 });
await dpage.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
for (const n of [1, 2]) {
  const fig = dpage.locator(`#fig-U4-${n}`);
  if (await fig.count()) await fig.screenshot({ path: `${OUT}/fig-U4-${n}-element-dark.png` });
}
report.darkThemeApplied = await dpage.evaluate(() => document.documentElement.getAttribute('data-theme'));
await dctx.close();

writeFileSync(`${OUT}/render-inspection.json`, JSON.stringify(report, null, 2));
console.log('done');
await browser.close();
