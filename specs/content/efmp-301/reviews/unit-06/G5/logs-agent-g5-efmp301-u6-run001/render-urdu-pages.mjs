// G5 render harness - EFMP-301 Unit 6 Urdu pages.
// Renders the built Urdu unit at desktop, narrow (360px) and A4-print emulation,
// saves PNGs and reports console errors, broken images and horizontal overflow.
// Run: node render-urdu-pages.mjs (from anywhere; URLs absolute).
import { chromium } from 'playwright-core';

const BASE = 'http://localhost:3217';
const OUT = new URL('../renders-agent-g5-efmp301-u6-run001/', import.meta.url).pathname;
const PAGES = [
  ['index', `${BASE}/ur/semester-1/efmp-301/unit-06/`],
  ['topic-01', `${BASE}/ur/semester-1/efmp-301/unit-06/topic-01`],
  ['topic-02', `${BASE}/ur/semester-1/efmp-301/unit-06/topic-02`],
  ['unit-assessment', `${BASE}/ur/semester-1/efmp-301/unit-06/unit-assessment`],
  ['unit-teacher-notes', `${BASE}/ur/semester-1/efmp-301/unit-06/unit-teacher-notes`],
];

const browser = await chromium.launch();
const report = [];
for (const [name, url] of PAGES) {
  // Desktop
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const desk = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, alt: i.getAttribute('alt')?.slice(0, 60) }));
    return {
      title: document.title,
      dir: document.documentElement.dir || getComputedStyle(document.body).direction,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      imgs,
      h1: document.querySelector('h1')?.textContent?.slice(0, 80),
    };
  });
  await page.screenshot({ path: `${OUT}${name}-desktop-1280.png`, fullPage: true });
  // Figure element shots on this page
  const figs = await page.$$('[class*="figure"], figure, .figure-wrapper');
  let fi = 0;
  for (const f of figs) {
    const img = await f.$('img');
    if (img) {
      await f.screenshot({ path: `${OUT}${name}-fig${++fi}.png` }).catch(() => {});
    }
  }
  report.push({ name, view: 'desktop-1280x900', ...desk, errors });
  await page.close();

  // Narrow 360
  const np = await browser.newPage({ viewport: { width: 360, height: 780 } });
  await np.goto(url, { waitUntil: 'networkidle' });
  await np.waitForTimeout(400);
  const narrow = await np.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    bodyOverflowX: document.body.scrollWidth - document.body.clientWidth,
  }));
  await np.screenshot({ path: `${OUT}${name}-narrow-360.png`, fullPage: true });
  report.push({ name, view: 'narrow-360x780', ...narrow });
  await np.close();

  // A4 print emulation (one page per file: index + topics get print shots)
  if (name === 'index' || name === 'topic-01' || name === 'topic-02' || name === 'unit-assessment') {
    const pp = await browser.newPage({ viewport: { width: 794, height: 1123 } });
    await pp.emulateMedia({ media: 'print' });
    await pp.goto(url, { waitUntil: 'networkidle' });
    await pp.waitForTimeout(400);
    await pp.screenshot({ path: `${OUT}${name}-a4-print.png`, fullPage: true });
    report.push({ name, view: 'a4-print-794x1123' });
    await pp.close();
  }
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
