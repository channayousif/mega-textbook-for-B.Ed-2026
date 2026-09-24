// G3 follow-up inspection: figure scroll regions at 360px, dark-mode twins,
// the index-page 404, and index headings.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:4173/semester-1/gnas-301/unit-05';
const OUT = 'specs/content/gnas-301/reviews/unit-05/G3/renders-20260924T000000Z';
const browser = await chromium.launch();
const record = {};

// 1. Index page: capture the 404 request and the real heading structure
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const failed = [];
page.on('response', (r) => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
record.index404s = failed;
record.indexHeadings = await page.$$eval('article h1, article h2', (hs) => hs.map((h) => h.tagName + ': ' + h.textContent.trim()));
record.indexUrl = page.url();

// 2. Topic-01 at 360px: figure scroll regions and swipe reachability of the figure's right edge
await page.setViewportSize({ width: 360, height: 800 });
await page.goto(`${BASE}/topic-01/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
record.figuresNarrow = await page.$$eval('article figure', (fs) => fs.map((f) => {
  const img = f.querySelector('img');
  const before = { scrollWidth: f.scrollWidth, clientWidth: f.clientWidth };
  f.scrollLeft = f.scrollWidth;
  const r = img ? img.getBoundingClientRect() : null;
  return { figcaption: f.querySelector('figcaption')?.textContent.trim().slice(0, 60) ?? null,
    ...before, tabindex: f.getAttribute('tabindex'), role: f.getAttribute('role'), ariaLabel: f.getAttribute('aria-label'),
    imgRightAfterScroll: r ? Math.round(r.right) : null, reachableBySwipe: r ? r.right <= window.innerWidth + 1 : null };
}));
await page.screenshot({ path: `${OUT}/topic-01-narrow-figures.png`, fullPage: true });

// 3. Dark mode: does the dark twin load and display?
await page.setViewportSize({ width: 1280, height: 800 });
await page.emulateMedia({ colorScheme: 'dark' });
await page.evaluate(() => { localStorage.setItem('theme', 'dark'); });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const dataTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
record.darkTheme = dataTheme;
record.figuresDark = await page.$$eval('article figure img', (imgs) => imgs.map((i) => ({ src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0, displayed: i.getClientRects().length > 0 && getComputedStyle(i).display !== 'none' })));
await page.screenshot({ path: `${OUT}/topic-01-dark.png`, fullPage: true });

// 4. Print view of the assessment answers section: is anything clipped?
await page.emulateMedia({ colorScheme: 'light' });
await page.evaluate(() => { localStorage.setItem('theme', 'light'); });
await page.goto(`${BASE}/unit-assessment/`, { waitUntil: 'networkidle' });
await page.setViewportSize({ width: 794, height: 1123 });
await page.emulateMedia({ media: 'print' });
await page.waitForTimeout(400);
record.printAssessment = await page.evaluate(() => {
  const doc = document.documentElement;
  const clipped = [];
  for (const el of document.querySelectorAll('article *')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > doc.clientWidth + 2)) clipped.push(el.tagName + '.' + String(el.className).slice(0, 30) + ' right=' + Math.round(r.right));
  }
  return { docScrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, clippedCount: clipped.length, clippedSample: clipped.slice(0, 5) };
});
await page.screenshot({ path: `${OUT}/unit-assessment-print.png`, fullPage: true });

writeFileSync(`${OUT}/render-inspect-followup.json`, JSON.stringify(record, null, 2));
await browser.close();
console.log('follow-up complete');
