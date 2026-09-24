// Re-run of the render inspection for unit-teacher-notes only: the first pass
// captured the page mid dev-server compile (headings 0). Now compiled.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = 'specs/content/gqur-300/reviews/unit-02/renders-agent-g3-gqur300-u2-run001';
const url = 'http://localhost:3212/semester-1/gqur-300/unit-02/unit-teacher-notes';
const report = JSON.parse(readFileSync(`${OUT}/render-inspection.json`, 'utf8'));

const browser = await chromium.launch();
const entry = { name: 'unit-teacher-notes', url, note: 're-inspected after dev-server on-demand compile; first pass caught the page pre-render' };

const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForSelector('main h1, article h1', { timeout: 60000 });
entry.h1 = await page.locator('main h1, article h1').count();
entry.headingOutline = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map((h) => `${h.tagName}: ${h.innerText.trim().slice(0, 60)}`));
entry.vagueLinks = await page.evaluate(() => [...document.querySelectorAll('main a, article a')].map((a) => a.innerText.trim()).filter((t) => /^(here|click here|read more|link|this)$/i.test(t)));
entry.figures = await page.locator('figure').count();
entry.contentImages = await page.evaluate(() => [...document.querySelectorAll('article img, main img')].map((i) => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt') })).filter((i) => i.src && i.src.includes('/img/figures/')));
entry.docOverflowDesktop = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
await page.screenshot({ path: `${OUT}/unit-teacher-notes-desktop-1280.png` });
await ctx.close();

const nctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const npage = await nctx.newPage();
await npage.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await npage.waitForSelector('main h1, article h1', { timeout: 60000 });
entry.docOverflowNarrow = await npage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
entry.tablesNarrow = [];
await npage.screenshot({ path: `${OUT}/unit-teacher-notes-narrow-360.png` });
await nctx.close();

const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
const ppage = await pctx.newPage();
await ppage.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await ppage.waitForSelector('main h1, article h1', { timeout: 60000 });
await ppage.emulateMedia({ media: 'print' });
entry.docOverflowPrint = await ppage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
entry.tablesPrint = [];
entry.printHiddenNav = await ppage.evaluate(() => { const nav = document.querySelector('header, .navbar, nav.navbar'); return nav ? getComputedStyle(nav).display === 'none' : null; });
await ppage.screenshot({ path: `${OUT}/unit-teacher-notes-print-emulated.png` });
await ppage.pdf({ path: `${OUT}/unit-teacher-notes-a4.pdf`, format: 'A4', printBackground: false });
await pctx.close();

const i = report.pages.findIndex((p) => p.name === 'unit-teacher-notes');
report.pages[i] = entry;
writeFileSync(`${OUT}/render-inspection.json`, JSON.stringify(report, null, 2));
console.log('teacher-notes re-inspected: h1 =', entry.h1, 'headings =', entry.headingOutline.length, 'overflow narrow =', entry.docOverflowNarrow);
await browser.close();
