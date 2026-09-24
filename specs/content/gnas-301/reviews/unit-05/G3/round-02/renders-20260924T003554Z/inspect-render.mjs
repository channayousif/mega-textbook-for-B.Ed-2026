// G3 round-2 render inspection for GNAS-301 Units 5 and 6.
// One shared build (detached worktree at HEAD 68577b8), served at localhost:3457.
// Covers: desktop 1280x800 console/figures; narrow 360x640 overflow and table
// reachability (measuring the table element itself per the G3 reference);
// A4 print emulation 794px; dark-mode figure variants; fig-U5-3 geometry render.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3457';
const UNITS = {
  '05': {
    dir: 'specs/content/gnas-301/reviews/unit-05/G3/round-02/renders-20260924T003554Z',
    pages: ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'unit-assessment', 'unit-teacher-notes'],
  },
  '06': {
    dir: 'specs/content/gnas-301/reviews/unit-06/G3/round-02/renders-20260924T003554Z',
    pages: ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'topic-05', 'topic-06', 'unit-assessment', 'unit-teacher-notes'],
  },
};

const results = {};
const browser = await chromium.launch();

async function newPage(viewport, media) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  if (media) await page.emulateMedia({ media });
  return { ctx, page };
}

for (const [u, cfg] of Object.entries(UNITS)) {
  mkdirSync(cfg.dir, { recursive: true });
  const unit = { pages: {} };
  results[u] = unit;

  // ---- Desktop 1280x800: console errors, figure load, alt text ----
  {
    const { ctx, page } = await newPage({ width: 1280, height: 800 });
    const consoleErrors = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', (e) => consoleErrors.push(String(e)));
    const failedRequests = [];
    page.on('response', (r) => { if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`); });
    for (const p of cfg.pages) {
      await page.goto(`${BASE}/semester-1/gnas-301/unit-${u}/${p}/`, { waitUntil: 'networkidle' });
      const figures = await page.$$eval('figure img', (imgs) => imgs.map((i) => ({
        src: i.getAttribute('src'), alt: i.getAttribute('alt'), loaded: i.complete && i.naturalWidth > 0,
        lazy: i.getAttribute('loading'),
      })));
      unit.pages[p] = { desktopFigures: figures };
      if (p === 'index' || p === 'unit-assessment' || p === 'topic-01') {
        await page.screenshot({ path: `${cfg.dir}/desktop-${p}.png`, fullPage: false });
      }
    }
    unit.desktopConsoleErrors = consoleErrors;
    unit.desktopFailedRequests = failedRequests;
    await ctx.close();
  }

  // ---- Narrow 360x640: document overflow, figure fit, table reachability ----
  {
    const { ctx, page } = await newPage({ width: 360, height: 640 });
    for (const p of cfg.pages) {
      await page.goto(`${BASE}/semester-1/gnas-301/unit-${u}/${p}/`, { waitUntil: 'networkidle' });
      const narrow = await page.evaluate(() => {
        const doc = document.documentElement;
        const out = {
          pageOverflow: doc.scrollWidth - doc.clientWidth,
          figures: [...document.querySelectorAll('figure img')].map((i) => {
            const r = i.getBoundingClientRect();
            return { src: i.getAttribute('src'), left: Math.round(r.left), right: Math.round(r.right), visibleInViewport: r.right > 0 && r.left < 360 && r.width <= 360 + 1 };
          }),
          tables: [...document.querySelectorAll('table')].map((t) => {
            const scrollable = t.scrollWidth > t.clientWidth + 1;
            let farColumnReachable = null;
            let keyboardAttrs = null;
            if (scrollable) {
              const before = t.scrollLeft;
              t.scrollLeft = t.scrollWidth;
              const lastHeader = t.querySelector('tr:last-child th, tr:last-child td');
              const rect = lastHeader ? lastHeader.getBoundingClientRect() : null;
              farColumnReachable = rect ? rect.right <= 360 + 1 : null;
              t.scrollLeft = before;
              keyboardAttrs = { tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label') };
            }
            return {
              scrollWidth: t.scrollWidth, clientWidth: t.clientWidth, scrollable,
              farColumnReachable, keyboardAttrs,
            };
          }),
        };
        return out;
      });
      unit.pages[p].narrow = narrow;
      if (p === 'index' || p === 'unit-assessment' || p === 'topic-01') {
        await page.screenshot({ path: `${cfg.dir}/narrow-360-${p}.png`, fullPage: false });
      }
    }
    await ctx.close();
  }

  // ---- A4 print emulation: 794px wide, print media ----
  {
    const { ctx, page } = await newPage({ width: 794, height: 1123 }, 'print');
    for (const p of cfg.pages) {
      await page.goto(`${BASE}/semester-1/gnas-301/unit-${u}/${p}/`, { waitUntil: 'networkidle' });
      const print = await page.evaluate(() => {
        const doc = document.documentElement;
        const clipped = [...document.querySelectorAll('main *')].filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > doc.clientWidth + 2 || r.left < -2);
        }).length;
        const nav = document.querySelector('navbar, .navbar, nav');
        const sidebar = document.querySelector('.theme-doc-sidebar-container, .docsWrapper');
        return {
          docWidth: doc.clientWidth,
          printOverflow: doc.scrollWidth - doc.clientWidth,
          clippedElementCount: clipped,
          chromeHidden: nav ? getComputedStyle(nav).display === 'none' : true,
          answersPresent: !!document.body.innerText.match(/Answers and marking guidance/),
        };
      });
      unit.pages[p].print = print;
      if (p === 'unit-assessment' || p === 'topic-01') {
        await page.screenshot({ path: `${cfg.dir}/print-a4-${p}.png`, fullPage: false });
      }
    }
    await ctx.close();
  }

  // ---- Dark mode: figure variants ----
  {
    const { ctx, page } = await newPage({ width: 1280, height: 800 });
    await page.goto(`${BASE}/semester-1/gnas-301/unit-${u}/topic-01/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
    await page.waitForTimeout(400);
    unit.darkFigures = await page.$$eval('figure img', (imgs) => imgs.map((i) => ({
      src: i.getAttribute('src'), displayed: getComputedStyle(i).display !== 'none' && i.complete && i.naturalWidth > 0,
    })));
    await page.screenshot({ path: `${cfg.dir}/dark-topic-01.png`, fullPage: false });
    await ctx.close();
  }
}

// ---- fig-U5-3 element render (documents the connector-arrow geometry) ----
{
  const { ctx, page } = await newPage({ width: 1280, height: 800 });
  await page.goto(`${BASE}/semester-1/gnas-301/unit-05/topic-02/`, { waitUntil: 'networkidle' });
  const fig = page.locator('figure:has(img[src*="fig-U5-3"])').first();
  await fig.scrollIntoViewIfNeeded();
  await fig.screenshot({ path: `${UNITS['05'].dir}/figrender-fig-U5-3.png` });
  // Also render each unit-05 and unit-06 figure SVG directly for the record
  for (const [u, cfg] of Object.entries(UNITS)) {
    for (let i = 1; i <= (u === '05' ? 8 : 12); i += 1) {
      const id = `fig-U${u}-${i}`;
      await page.goto(`${BASE}/img/figures/gnas-301/unit-${u}/${id}.svg`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${cfg.dir}/figrender-${id}.png` });
    }
  }
  await ctx.close();
}

await browser.close();
writeFileSync('specs/content/gnas-301/reviews/unit-05/G3/round-02/renders-20260924T003554Z/render-inspect.json', JSON.stringify(results['05'], null, 2));
writeFileSync('specs/content/gnas-301/reviews/unit-06/G3/round-02/renders-20260924T003554Z/render-inspect.json', JSON.stringify(results['06'], null, 2));
console.log('inspection complete');
