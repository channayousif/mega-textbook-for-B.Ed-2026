// Focused narrow/print measurement for GQUR-300 Unit 5 G3 run001.
// The first pass measured tables only on the last page visited; this pass
// measures every page's tables at 360px and print overflow on every page.
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
const report = { generated: new Date().toISOString(), narrowTables: [], printOverflow: [] };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const tables = await page.evaluate(() => {
      const out = [];
      for (const table of document.querySelectorAll('article table')) {
        const lastCell = table.querySelector('thead th:last-child') || table.querySelector('tr:last-child td:last-child');
        const before = lastCell ? lastCell.getBoundingClientRect().right : null;
        table.scrollLeft = table.scrollWidth;
        const after = lastCell ? lastCell.getBoundingClientRect().right : null;
        out.push({
          page: location.pathname,
          tableClass: table.className || null,
          ownScrollContainer: table.scrollWidth > table.clientWidth,
          scrollWidth: table.scrollWidth,
          clientWidth: table.clientWidth,
          lastColRightBefore: before,
          lastColRightAfterFullScroll: after,
          reachableByScroll: after !== null && after <= window.innerWidth + 1,
          tabindex: table.getAttribute('tabindex'),
          role: table.getAttribute('role'),
          ariaLabel: table.getAttribute('aria-label'),
        });
      }
      return out;
    });
    report.narrowTables.push(...tables);
  }
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.emulateMedia({ media: 'print' });
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const clipped = await page.evaluate((pageName) => {
      const out = [];
      for (const el of document.querySelectorAll('article img, article svg, article table, article pre, article figure')) {
        const r = el.getBoundingClientRect();
        if (r.width > 794 + 1 || r.right > 794 + 1) {
          out.push({ page: pageName, tag: el.tagName, cls: el.className && String(el.className).slice(0, 40), width: Math.round(r.width), right: Math.round(r.right) });
        }
      }
      return out;
    }, name);
    report.printOverflow.push(...clipped);
  }
  await page.emulateMedia({ media: null });
} finally {
  await browser.close();
}
writeFileSync(`${OUT}/render-inspection-tables.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
