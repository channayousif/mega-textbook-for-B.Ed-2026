/**
 * G3 render inspection for GQUR-300 Unit 3 (run001).
 * Captures desktop / narrow-360 / A4-print renders of every unit-03 page,
 * element renders of each figure at 2x, and measures the content tables'
 * own scroll geometry (per the G3 rubric: measure the <table>, not the wrapper).
 * Served input: http://localhost:4173 (docusaurus serve over the clean build).
 */
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:4173';
const UNIT = '/semester-1/gqur-300/unit-03';
const OUT = 'specs/content/gqur-300/reviews/unit-03/G3/renders-run001';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['index', `${UNIT}/`],
  ['topic-01', `${UNIT}/topic-01/`],
  ['topic-02', `${UNIT}/topic-02/`],
  ['topic-03', `${UNIT}/topic-03/`],
  ['unit-assessment', `${UNIT}/unit-assessment/`],
  ['unit-teacher-notes', `${UNIT}/unit-teacher-notes/`],
];

const browser = await chromium.launch();
const report = [];
const log = (line) => { report.push(line); console.log(line); };

// --- Desktop + narrow + print for every page ---
for (const [name, path] of pages) {
  // Desktop 1280x800
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pg = await ctx.newPage();
  await pg.goto(BASE + path, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(1200); // hydration
  await pg.screenshot({ path: `${OUT}/${name}-desktop.png`, fullPage: true });
  log(`desktop ${name}: ${BASE}${path} 1280x800 -> ${name}-desktop.png`);

  // Figure element renders at 2x (only topic pages carry figures)
  if (name.startsWith('topic')) {
    for (const fig of ['fig-U3-1', 'fig-U3-2', 'fig-U3-3', 'fig-U3-4', 'fig-U3-5', 'fig-U3-6']) {
      const el = pg.locator(`figure:has(img[src*="${fig}.svg"])`).first();
      if (await el.count()) {
        await el.screenshot({ path: `${OUT}/${fig}-rendered-desktop@2x.png`, scale: 'device' });
        log(`figure ${fig}: element render -> ${fig}-rendered-desktop@2x.png`);
      }
    }
    // dark theme figure check on the first topic (data-theme=dark)
    await pg.emulateMedia({ colorScheme: 'dark' });
    await pg.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
    await pg.waitForTimeout(600);
    const dark = pg.locator('figure:has(img[src*="fig-U3-1"])').first();
    if (await dark.count()) {
      await dark.screenshot({ path: `${OUT}/fig-U3-1-rendered-dark@2x.png`, scale: 'device' });
      log('figure fig-U3-1: dark-theme element render -> fig-U3-1-rendered-dark@2x.png');
    }
    await pg.emulateMedia({ colorScheme: 'light' });
  }

  // Print A4 (print media emulation screenshot + true PDF)
  await pg.emulateMedia({ media: 'print' });
  await pg.waitForTimeout(400);
  await pg.screenshot({ path: `${OUT}/${name}-print-a4.png`, fullPage: true });
  await pg.pdf({ path: `${OUT}/${name}-print.pdf`, format: 'A4', printBackground: true });
  log(`print ${name}: A4 print-media screenshot + PDF -> ${name}-print-a4.png, ${name}-print.pdf`);
  await pg.emulateMedia({ media: 'screen' });
  await ctx.close();

  // Narrow 360x740 with table geometry measurement
  const nctx = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const npg = await nctx.newPage();
  await npg.goto(BASE + path, { waitUntil: 'networkidle' });
  await npg.waitForTimeout(1200);
  await npg.screenshot({ path: `${OUT}/${name}-narrow360.png`, fullPage: true });
  log(`narrow ${name}: 360x740 -> ${name}-narrow360.png`);

  const tables = await npg.evaluate(() => {
    const out = [];
    for (const t of document.querySelectorAll('article table')) {
      const r = t.getBoundingClientRect();
      const before = { scrollWidth: t.scrollWidth, clientWidth: t.clientWidth };
      const rightmost = [...t.querySelectorAll('th, td')].reduce((a, c) => {
        const b = c.getBoundingClientRect();
        return !a || b.right > a.right ? { right: b.right, text: c.textContent.trim().slice(0, 40) } : a;
      }, null);
      t.scrollLeft = t.scrollWidth;
      const after = [...t.querySelectorAll('th, td')].map((c) => c.getBoundingClientRect().right);
      out.push({
        summary: (t.querySelector('caption')?.textContent || t.rows[0]?.textContent || '').trim().slice(0, 60),
        tableWidth: Math.round(r.width),
        scrollWidth: before.scrollWidth,
        clientWidth: before.clientWidth,
        overflowX: getComputedStyle(t).overflowX,
        rightmostColumnBeforeScroll: rightmost && { right: Math.round(rightmost.right), text: rightmost.text },
        maxColumnRightAfterFullScroll: Math.round(Math.max(...after)),
        viewport: window.innerWidth,
        attrs: {
          tabindex: t.getAttribute('tabindex'),
          role: t.getAttribute('role'),
          ariaLabel: t.getAttribute('aria-label'),
        },
      });
    }
    return out;
  });
  for (const t of tables) {
    log(`  table "${t.summary}" w=${t.tableWidth} scrollW=${t.scrollWidth} clientW=${t.clientWidth} overflowX=${t.overflowX} | rightmost col before scroll right=${t.rightmostColumnBeforeScroll?.right} ("${t.rightmostColumnBeforeScroll?.text}") | after full scroll maxColRight=${t.maxColumnRightAfterFullScroll} viewport=${t.viewport} | hydrated attrs: tabindex=${t.attrs.tabindex} role=${t.attrs.role} aria-label=${t.attrs.ariaLabel ? 'yes' : 'MISSING'}`);
  }
  await nctx.close();
}

// --- JavaScript-disabled narrow check (static CSS scroll rule) ---
const jctx = await browser.newContext({ viewport: { width: 360, height: 740 }, javaScriptEnabled: false });
const jpg = await jctx.newPage();
await jpg.goto(BASE + UNIT + '/unit-assessment/', { waitUntil: 'load' });
await jpg.waitForTimeout(500);
await jpg.screenshot({ path: `${OUT}/unit-assessment-narrow360-nojs.png`, fullPage: true });
const jtables = await jpg.evaluate(() => [...document.querySelectorAll('article table')].map((t) => ({
  scrollWidth: t.scrollWidth, clientWidth: t.clientWidth, overflowX: getComputedStyle(t).overflowX,
}))).catch(() => 'evaluate failed without JS');
log(`no-js narrow unit-assessment: tables=${JSON.stringify(jtables)} -> unit-assessment-narrow360-nojs.png`);
await jctx.close();

await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G3/logs-run001/render-geometry.txt', report.join('\n') + '\n');
console.log('DONE');
