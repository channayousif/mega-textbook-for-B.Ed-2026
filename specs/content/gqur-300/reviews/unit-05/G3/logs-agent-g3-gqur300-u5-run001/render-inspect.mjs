// Render inspection for GQUR-300 Unit 5 G3 review, attempt run001.
// Uses the repository's own Playwright install against the production build
// served at http://127.0.0.1:4311 (npm run build && npm run serve -- --port 4311).
// Produces PNG/WebP renders and a render-inspection.json with measurements.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4311';
const OUT = 'specs/content/gqur-300/reviews/unit-05/G3/renders-agent-g3-gqur300-u5-run001';
const PAGES = [
  ['index', '/semester-1/gqur-300/unit-05/'],
  ['topic-01', '/semester-1/gqur-300/unit-05/topic-01'],
  ['topic-02', '/semester-1/gqur-300/unit-05/topic-02'],
  ['topic-03', '/semester-1/gqur-300/unit-05/topic-03'],
  ['unit-assessment', '/semester-1/gqur-300/unit-05/unit-assessment'],
  ['unit-teacher-notes', '/semester-1/gqur-300/unit-05/unit-teacher-notes'],
];
const report = { base: BASE, generated: new Date().toISOString(), pages: [], figures: [], narrow: {}, print: {} };

const browser = await chromium.launch();
try {
  // --- Desktop 1280 ---
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/${name}-desktop-1280.png`, fullPage: true });
    report.pages.push({ name, path, desktop: 'ok' });
  }

  // --- Figure element renders, light then dark (theme toggle via data-theme) ---
  await page.goto(BASE + '/semester-1/gqur-300/unit-05/topic-01', { waitUntil: 'networkidle' });
  const figs = [
    ['fig-U5-1', '/semester-1/gqur-300/unit-05/topic-01'],
    ['fig-U5-2', '/semester-1/gqur-300/unit-05/topic-01'],
    ['fig-U5-3', '/semester-1/gqur-300/unit-05/topic-02'],
    ['fig-U5-4', '/semester-1/gqur-300/unit-05/topic-02'],
    ['fig-U5-5', '/semester-1/gqur-300/unit-05/topic-03'],
    ['fig-U5-6', '/semester-1/gqur-300/unit-05/topic-03'],
  ];
  for (const [fig, path] of figs) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const el = page.locator(`figure:has(#${fig}), #${fig}`).first();
    await el.screenshot({ path: `${OUT}/${fig}-element-light.png` });
    // dark variant: the site themes via [data-theme]; emulate dark scheme + toggle if present
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.evaluate(() => {
      const t = document.querySelector('button[class*="toggle"] , [class*="colorModeToggle"], .navbar__items [class*="toggle"]');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (t) t.click();
    });
    await page.waitForTimeout(400);
    await el.screenshot({ path: `${OUT}/${fig}-element-dark.png` });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    report.figures.push(fig);
  }

  // --- Narrow 360: content-table reachability, measured on the table itself ---
  await page.setViewportSize({ width: 360, height: 800 });
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/${name}-narrow-360.png`, fullPage: true });
  }
  const narrow = await page.evaluate(() => {
    const out = [];
    for (const table of document.querySelectorAll('article table')) {
      const rect0 = table.getBoundingClientRect();
      const lastCol = table.querySelector('tr:last-child td:last-child, thead th:last-child');
      const before = lastCol ? lastCol.getBoundingClientRect().right : null;
      table.scrollLeft = table.scrollWidth;
      const after = lastCol ? lastCol.getBoundingClientRect().right : null;
      out.push({
        tableClass: table.className || null,
        isScrollContainer: table.scrollWidth > table.clientWidth,
        scrollWidth: table.scrollWidth,
        clientWidth: table.clientWidth,
        lastColRightBeforeScroll: before,
        lastColRightAfterScroll: after,
        cameIntoView: after !== null && after <= window.innerWidth + 1,
        tabindex: table.getAttribute('tabindex'),
        role: table.getAttribute('role'),
        ariaLabel: table.getAttribute('aria-label'),
        rectWidth: Math.round(rect0.width),
      });
    }
    return out;
  });
  report.narrow = { viewport: '360x800', tables: narrow };

  // --- Print emulation (A4 @96dpi = 794x1123) ---
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.emulateMedia({ media: 'print' });
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/${name}-print-emulated.png`, fullPage: true });
  }
  // Real A4 PDFs for two representative pages
  for (const [name, path] of [['topic-02', '/semester-1/gqur-300/unit-05/topic-02'], ['unit-assessment', '/semester-1/gqur-300/unit-05/unit-assessment']]) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.pdf({ path: `${OUT}/${name}-a4.pdf`, format: 'A4', printBackground: true });
  }
  const printCheck = await page.evaluate(() => {
    const clipped = [];
    for (const el of document.querySelectorAll('article img, article svg, article table, article pre')) {
      const r = el.getBoundingClientRect();
      if (r.width > 794 + 1) clipped.push({ tag: el.tagName, cls: el.className && String(el.className).slice(0, 40), width: Math.round(r.width) });
    }
    return { viewport: '794x1123 print media', overflowing: clipped };
  });
  report.print = printCheck;
  await page.emulateMedia({ media: null });
} finally {
  await browser.close();
}
writeFileSync(`${OUT}/render-inspection.json`, JSON.stringify(report, null, 2));
console.log('render inspection complete');
