// G5 render inspection for GNAS-301 Unit 5 (run agent-g5-gnas301-u5-run001).
// Served build at http://localhost:3459 (built at HEAD b80bcc9 in this worktree).
// Covers the G5 rubric's rtl criterion: Urdu pages in desktop 1280x800 and narrow
// 360x640 viewports plus A4 print emulation; dir=rtl, computed fonts, figure
// loading (.ur.svg variants), bidi numerals/Latin embeds, console errors.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3459/ur/semester-1/gnas-301/unit-05';
const DIR = 'specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z';
const PAGES = ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'unit-assessment', 'unit-teacher-notes'];

mkdirSync(DIR, { recursive: true });
const results = { base: BASE, startedAt: new Date().toISOString(), pages: {} };
const browser = await chromium.launch();

async function newPage(viewport, media) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  if (media) await page.emulateMedia({ media });
  return { ctx, page };
}

// ---- Desktop 1280x800: dir, html lang, console errors, figures, bidi probes ----
{
  const { ctx, page } = await newPage({ width: 1280, height: 800 });
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  const failedRequests = [];
  page.on('response', (r) => { if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`); });

  for (const p of PAGES) {
    await page.goto(`${BASE}/${p}/`, { waitUntil: 'networkidle' });
    const figs = await page.$$eval('figure img', (imgs) => imgs.map((i) => ({
      src: i.getAttribute('src'), alt: i.getAttribute('alt'),
      loaded: i.complete && i.naturalWidth > 0, lazy: i.getAttribute('loading'),
    })));
    const htmlAttrs = await page.evaluate(() => ({
      dir: document.documentElement.getAttribute('dir'),
      lang: document.documentElement.getAttribute('lang'),
    }));
    const mainFont = await page.evaluate(() => {
      const el = document.querySelector('article') || document.body;
      return getComputedStyle(el).fontFamily;
    });
    results.pages[p] = { htmlAttrs, font: mainFont, figures: figs };
  }

  // Bidi probes on topic-01: numerals, Latin embeds, list/heading direction
  await page.goto(`${BASE}/topic-01/`, { waitUntil: 'networkidle' });
  results.bidi = await page.evaluate(() => {
    const art = document.querySelector('article');
    const text = art ? art.innerText : '';
    const h1 = document.querySelector('h1');
    return {
      computedDir: art ? getComputedStyle(art).direction : null,
      h1Dir: h1 ? getComputedStyle(h1).direction : null,
      containsPM25: /PM\s*2\.5|پی ایم 2\.5/.test(text),
      containsLatinWHO: text.includes('World Health Organization'),
      containsDigits: /[0-9]/.test(text),
      firstHeadingText: h1 ? h1.textContent.trim().slice(0, 60) : null,
    };
  });
  await page.screenshot({ path: `${DIR}/desktop-topic-01.png` });
  await page.goto(`${BASE}/index/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/desktop-index.png` });
  await page.goto(`${BASE}/unit-assessment/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/desktop-unit-assessment.png` });
  results.desktopConsoleErrors = consoleErrors;
  results.desktopFailedRequests = failedRequests;
  await ctx.close();
}

// ---- Narrow 360x640: overflow, figure fit, table reachability ----
{
  const { ctx, page } = await newPage({ width: 360, height: 640 });
  for (const p of PAGES) {
    await page.goto(`${BASE}/${p}/`, { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const tables = [...document.querySelectorAll('table')].map((t) => {
        const r = t.getBoundingClientRect();
        return { width: Math.round(r.width), right: Math.round(r.right), left: Math.round(r.left) };
      });
      const figs = [...document.querySelectorAll('figure img')].map((i) => {
        const r = i.getBoundingClientRect();
        return { src: i.getAttribute('src'), w: Math.round(r.width), fits: r.left >= 0 && r.right <= 360 };
      });
      return {
        scrollW: doc.scrollWidth, clientW: doc.clientWidth,
        overflow: doc.scrollWidth > doc.clientWidth + 1, tables, figs,
      };
    });
    results.pages[p].narrow = m;
  }
  await page.screenshot({ path: `${DIR}/narrow-360-topic-01.png`, fullPage: false });
  await page.screenshot({ path: `${DIR}/narrow-360-unit-assessment.png`, fullPage: false });
  await ctx.close();
}

// ---- A4 print emulation ----
{
  const { ctx, page } = await newPage({ width: 794, height: 1123 }, 'print');
  await page.goto(`${BASE}/topic-01/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/print-a4-topic-01.png`, fullPage: false });
  await page.goto(`${BASE}/unit-assessment/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/print-a4-unit-assessment.png`, fullPage: false });
  await page.goto(`${BASE}/topic-04/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/print-a4-topic-04.png`, fullPage: false });
  await ctx.close();
}

// ---- Urdu figure variant render probes (font fallback check) ----
{
  const { ctx, page } = await newPage({ width: 1280, height: 800 });
  for (const id of ['fig-U5-1', 'fig-U5-2', 'fig-U5-3', 'fig-U5-4', 'fig-U5-5', 'fig-U5-6', 'fig-U5-7', 'fig-U5-8']) {
    await page.goto(`http://localhost:3459/img/figures/gnas-301/unit-05/${id}.ur.svg`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${DIR}/figrender-${id}.ur.png` });
  }
  await ctx.close();
}

await browser.close();
results.completedAt = new Date().toISOString();
writeFileSync(`${DIR}/render-inspect.json`, JSON.stringify(results, null, 2) + '\n');
console.log('render inspection complete');
console.log('console errors:', JSON.stringify(results.desktopConsoleErrors));
console.log('failed requests:', JSON.stringify(results.desktopFailedRequests));
for (const p of PAGES) {
  const pg = results.pages[p];
  console.log(`${p}: dir=${pg.htmlAttrs.dir} lang=${pg.htmlAttrs.lang} figs=${pg.figures.length} allLoaded=${pg.figures.every((f) => f.loaded)} overflow=${pg.narrow.overflow}`);
}
