// G3 render inspection for GNAS-301 Unit 5 (advisory review evidence).
// Drives the built site at http://localhost:4173 with Playwright's bundled chromium.
// Records: desktop/narrow/print screenshots per page, figure load state, table
// reachability measured on the table element itself (per the G3 rubric), and
// hydration attributes for keyboard access.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:4173/semester-1/gnas-301/unit-05';
const OUT = 'specs/content/gnas-301/reviews/unit-05/G3/renders-20260924T000000Z';
const PAGES = ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'unit-assessment', 'unit-teacher-notes'];
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const record = { base: BASE, started_at: new Date().toISOString(), pages: {} };

for (const slug of PAGES) {
  const entry = { url: `${BASE}/${slug}/` };
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(entry.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700); // let hydration finish
  entry.title = await page.title();

  // Figures: loaded and labelled
  entry.figures = await page.$$eval('figure img, img[src*="/img/figures/"]', (imgs) =>
    imgs.map((i) => ({ src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0, alt: i.getAttribute('alt') })));

  // Headings present
  entry.h2 = await page.$$eval('h2', (hs) => hs.map((h) => h.textContent.trim()));

  await page.screenshot({ path: `${OUT}/${slug}-desktop.png`, fullPage: true });

  // Content tables: measure the table element itself, not its wrapper
  entry.tables_desktop = await page.$$eval('article table', (ts) => ts.map((t) => ({
    rows: t.rows.length,
    scrollWidth: t.scrollWidth, clientWidth: t.clientWidth,
    tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label'),
  })));

  // Narrow viewport 360px
  await page.setViewportSize({ width: 360, height: 800 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${slug}-narrow.png`, fullPage: true });
  entry.tables_narrow = await page.$$eval('article table', (ts) => ts.map((t) => {
    const before = { scrollWidth: t.scrollWidth, clientWidth: t.clientWidth, scrollLeft: t.scrollLeft };
    // reachability test from the rubric: scroll fully right, re-measure last column
    t.scrollLeft = t.scrollWidth;
    const last = t.rows[0]?.lastElementChild;
    const rect = last ? last.getBoundingClientRect() : null;
    const reachable = rect ? rect.right <= window.innerWidth + 1 : null;
    return { ...before, lastColumnRightAfterScroll: rect ? Math.round(rect.right) : null, reachableBySwipe: reachable,
      tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label') };
  }));
  // horizontal page overflow at 360px
  entry.narrowDocumentOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

  // Print view: A4 portrait at 96dpi is 794x1123 css px
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${slug}-print.png`, fullPage: true });
  entry.printOverflow = await page.evaluate(() => document.documentElement.scrollWidth - 794);
  await page.emulateMedia({ media: null });

  entry.consoleErrors = errors;
  record.pages[slug] = entry;
  await page.close();
}

record.completed_at = new Date().toISOString();
record.userAgent = browser.version();
writeFileSync(`${OUT}/render-inspect.json`, JSON.stringify(record, null, 2));
await browser.close();
console.log('inspection complete');
