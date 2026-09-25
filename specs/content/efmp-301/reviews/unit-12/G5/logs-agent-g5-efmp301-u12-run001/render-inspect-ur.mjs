// G5 Urdu render inspection for EFMP-301 Unit 12 (agent-g5-efmp301-u12-run001).
// Serves no pages itself: inspects http://localhost:3215 (the build served from
// this worktree) and writes Urdu screenshots + a JSON audit into the renders dir.
// Checks RTL layout, Nastaliq rendering, bidi punctuation, narrow (360px) and
// A4 print views, dark variants, and the six Urdu figure variants (.ur.svg).
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3215';
const OUT = 'specs/content/efmp-301/reviews/unit-12/G5/renders-agent-g5-efmp301-u12-run001';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['index', '/ur/semester-1/efmp-301/unit-12/'],
  ['topic-01', '/ur/semester-1/efmp-301/unit-12/topic-01/'],
  ['topic-02', '/ur/semester-1/efmp-301/unit-12/topic-02/'],
  ['topic-03', '/ur/semester-1/efmp-301/unit-12/topic-03/'],
  ['unit-assessment', '/ur/semester-1/efmp-301/unit-12/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/efmp-301/unit-12/unit-teacher-notes/'],
];

const browser = await chromium.launch();
const audit = { base: BASE, locale: 'ur', dir: 'rtl', generated: new Date().toISOString(), pages: [] };

async function pageMeta(page) {
  return page.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
    title: document.title,
  }));
}

async function tableAudit(page) {
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
      out.push({ before, rightmostCellBefore: beforeRect, rightmostCellAfterScroll: afterRect });
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
        alt: (img.getAttribute('alt') || '').slice(0, 120),
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
  rec.meta = await pageMeta(page);
  rec.desktop = { headings: await headings(page), figures: await figAudit(page) };
  await page.screenshot({ path: `${OUT}/${name}-desktop.png`, fullPage: true });

  // Narrow viewport 360px
  await page.setViewportSize({ width: 360, height: 640 });
  await page.waitForTimeout(300);
  rec.narrow = { tables: await tableAudit(page), overflow: await overflowAudit(page), figures: await figAudit(page) };
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

// Dark-theme Urdu figure check on topic-01 ([data-theme=dark] swapping)
const dark = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await dark.goto(BASE + '/ur/semester-1/efmp-301/unit-12/topic-01/', { waitUntil: 'networkidle' });
await dark.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
await dark.waitForTimeout(400);
audit.darkTopic01 = {
  meta: await pageMeta(dark),
  figures: await figAudit(dark),
};
await dark.screenshot({ path: `${OUT}/topic-01-dark.png`, fullPage: true });
await dark.close();

// Urdu figure element close-ups (light) for label/shaping/bidi inspection
const FIGS = [
  ['fig-U12-1', '/ur/semester-1/efmp-301/unit-12/topic-01/'],
  ['fig-U12-2', '/ur/semester-1/efmp-301/unit-12/topic-01/'],
  ['fig-U12-3', '/ur/semester-1/efmp-301/unit-12/topic-02/'],
  ['fig-U12-4', '/ur/semester-1/efmp-301/unit-12/topic-02/'],
  ['fig-U12-5', '/ur/semester-1/efmp-301/unit-12/topic-03/'],
  ['fig-U12-6', '/ur/semester-1/efmp-301/unit-12/topic-03/'],
];
audit.figureCloseups = [];
for (const [fig, path] of FIGS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const img = page.locator(`article img[src$="${fig}.ur.svg"]`);
  await img.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await img.screenshot({ path: `${OUT}/figure-${fig}-ur-light.png` });
  audit.figureCloseups.push(fig);
  await page.close();
}

await browser.close();
writeFileSync(`${OUT}/render-audit-ur.json`, JSON.stringify(audit, null, 2) + '\n');
console.log('Urdu render inspection complete; artifacts in', OUT);
