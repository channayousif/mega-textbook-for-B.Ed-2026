// G3 render inspection for EFMP-301 Unit 12 (run001).
// Serves no pages itself: inspects http://localhost:3212 (the build served from
// this worktree) and writes screenshots + a JSON audit into the renders dir.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3212';
const OUT = 'specs/content/efmp-301/reviews/unit-12/G3/renders-agent-g3-efmp301-u12-run001';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['index', '/semester-1/efmp-301/unit-12/'],
  ['topic-01', '/semester-1/efmp-301/unit-12/topic-01/'],
  ['topic-02', '/semester-1/efmp-301/unit-12/topic-02/'],
  ['topic-03', '/semester-1/efmp-301/unit-12/topic-03/'],
  ['unit-assessment', '/semester-1/efmp-301/unit-12/unit-assessment/'],
  ['unit-teacher-notes', '/semester-1/efmp-301/unit-12/unit-teacher-notes/'],
];

const browser = await chromium.launch();
const audit = { base: BASE, generated: new Date().toISOString(), pages: [] };

async function tableAudit(page) {
  // Measure the scrolling element itself (the <table>), never the wrapper:
  // content tables are display:block width:fit-content overflow-x:auto.
  return page.evaluate(() => {
    const out = [];
    for (const t of document.querySelectorAll('article table')) {
      const before = { clientWidth: t.clientWidth, scrollWidth: t.scrollWidth, scrollLeft: t.scrollLeft };
      const cells = [...t.querySelectorAll('th,td')];
      let rightCell = null;
      if (cells.length) {
        let maxRight = -Infinity;
        for (const c of cells) {
          const r = c.getBoundingClientRect();
          if (r.right > maxRight) { maxRight = r.right; rightCell = c; }
        }
      }
      const beforeRect = rightCell ? rightCell.getBoundingClientRect().toJSON() : null;
      t.scrollLeft = t.scrollWidth;
      const afterRect = rightCell ? rightCell.getBoundingClientRect().toJSON() : null;
      const attrs = {
        tabindex: t.getAttribute('tabindex'),
        role: t.getAttribute('role'),
        ariaLabel: t.getAttribute('aria-label'),
      };
      out.push({ before, attrs, rightmostCellBefore: beforeRect, rightmostCellAfterScroll: afterRect });
      t.scrollLeft = before.scrollLeft;
    }
    return out;
  });
}

async function figAudit(page) {
  return page.evaluate(() => {
    const figs = [];
    for (const img of document.querySelectorAll('article img')) {
      const r = img.getBoundingClientRect();
      figs.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        naturalWidth: img.naturalWidth,
        rendered: { w: Math.round(r.width), h: Math.round(r.height) },
        loading: img.getAttribute('loading'),
      });
    }
    return figs;
  });
}

async function headings(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('article h1, article h2, article h3, article h4')]
      .map((h) => `${h.tagName}: ${h.textContent.trim()}`));
}

async function overflowAudit(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const wide = [];
    for (const el of document.querySelectorAll('article *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > doc.clientWidth + 1)) {
        const cs = getComputedStyle(el);
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.position === 'fixed') continue;
        wide.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(r.right)}`);
      }
    }
    return { docClientWidth: doc.clientWidth, docScrollWidth: doc.scrollWidth, overflowing: wide.slice(0, 12) };
  });
}

for (const [name, path] of PAGES) {
  const rec = { name, path };
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  rec.desktop = { headings: await headings(page), figures: await figAudit(page) };
  await page.screenshot({ path: `${OUT}/${name}-desktop.png`, fullPage: true });

  // Narrow viewport 360px
  await page.setViewportSize({ width: 360, height: 640 });
  await page.waitForTimeout(300);
  rec.narrow = {
    tables: await tableAudit(page),
    overflow: await overflowAudit(page),
    figures: await figAudit(page),
  };
  await page.screenshot({ path: `${OUT}/${name}-narrow.png`, fullPage: true });

  // A4 print emulation (210mm x 297mm at 96dpi = 794 x 1123)
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(300);
  rec.print = { tables: await tableAudit(page), overflow: await overflowAudit(page) };
  await page.screenshot({ path: `${OUT}/${name}-a4-print.png`, fullPage: true });
  await page.emulateMedia({ media: null });

  audit.pages.push(rec);
  await page.close();
}

// Dark-theme figure check on topic-01 (data-theme switching is a site feature)
const dark = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await dark.goto(BASE + '/semester-1/efmp-301/unit-12/topic-01/', { waitUntil: 'networkidle' });
await dark.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
await dark.waitForTimeout(400);
audit.darkTopic01 = { figures: await figAudit(dark) };
await dark.screenshot({ path: `${OUT}/topic-01-dark.png`, fullPage: true });
await dark.close();

// Figure element close-ups (light) for text-overprint visual inspection
const FIGS = [
  ['fig-U12-1', '/semester-1/efmp-301/unit-12/topic-01/'],
  ['fig-U12-2', '/semester-1/efmp-301/unit-12/topic-01/'],
  ['fig-U12-3', '/semester-1/efmp-301/unit-12/topic-02/'],
  ['fig-U12-4', '/semester-1/efmp-301/unit-12/topic-02/'],
  ['fig-U12-5', '/semester-1/efmp-301/unit-12/topic-03/'],
  ['fig-U12-6', '/semester-1/efmp-301/unit-12/topic-03/'],
];
audit.figureCloseups = [];
for (const [fig, path] of FIGS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const img = page.locator(`article img[src$="${fig}.svg"]`);
  await img.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await img.screenshot({ path: `${OUT}/figure-${fig}-light.png` });
  audit.figureCloseups.push(fig);
  await page.close();
}

await browser.close();
writeFileSync(`${OUT}/render-audit.json`, JSON.stringify(audit, null, 2) + '\n');
console.log('render inspection complete; artifacts in', OUT);
