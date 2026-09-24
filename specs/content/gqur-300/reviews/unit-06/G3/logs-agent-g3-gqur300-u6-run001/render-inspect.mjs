// G3 render inspection - GQUR-300 Unit 6 - run001
// Drives the served production build (localhost:4173) with the repo's Playwright.
// Narrow (360px), desktop (1280px), A4 print emulation and dark-mode figure variant
// checks; saves PNG renders and prints a measurement log.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173/semester-1/gqur-300/unit-06';
const OUT = 'specs/content/gqur-300/reviews/unit-06/G3/renders-agent-g3-gqur300-u6-run001';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['index', `${BASE}/`],
  ['topic-01', `${BASE}/topic-01`],
  ['topic-02', `${BASE}/topic-02`],
  ['topic-03', `${BASE}/topic-03`],
  ['unit-assessment', `${BASE}/unit-assessment`],
  ['unit-teacher-notes', `${BASE}/unit-teacher-notes`],
];

const browser = await chromium.launch();
const log = [];
const say = (s) => { log.push(s); console.log(s); };

// ---------- narrow viewport pass ----------
const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
const page = await ctx.newPage();
for (const [name, url] of PAGES) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const m = await page.evaluate(() => {
    const out = {};
    out.title = document.title;
    out.docOverflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    out.headings = [...document.querySelectorAll('h1,h2,h3')].slice(0, 40).map((h) => `${h.tagName}: ${h.textContent.trim().slice(0, 60)}`);
    out.figures = [...document.querySelectorAll('figure img')].map((img) => ({
      alt: img.getAttribute('alt'),
      loaded: img.complete && img.naturalWidth > 0,
      natural: `${img.naturalWidth}x${img.naturalHeight}`,
      rendered: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
      src: img.getAttribute('src'),
      lazy: img.getAttribute('loading'),
    }));
    // Measure the scrolling element itself (the table), never the wrapper.
    out.tables = [...document.querySelectorAll('article table')].map((t, i) => {
      const before = { sw: t.scrollWidth, cw: t.clientWidth, overflowX: getComputedStyle(t).overflowX };
      const farCol = t.querySelector('tr:last-child td:last-child, tr:last-child th:last-child');
      const rectBefore = farCol ? farCol.getBoundingClientRect().x : null;
      t.scrollLeft = t.scrollWidth;
      const rectAfter = farCol ? farCol.getBoundingClientRect().x : null;
      const reachable = rectBefore !== null && rectAfter !== null && rectAfter >= 0 && rectAfter < window.innerWidth;
      return { i, ...before, farColStartBefore: rectBefore, farColStartAfterScroll: rectAfter, swipeReachable: reachable, tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label') };
    });
    out.links = [...document.querySelectorAll('article a')].filter((a) => !a.textContent.trim()).length;
    out.emptyAltImgs = [...document.querySelectorAll('article img')].filter((i) => !i.getAttribute('alt')).length;
    return out;
  });
  say(`\n=== ${name} @360 ===`);
  say(`title: ${m.title}`);
  say(`page horizontal overflow: ${m.docOverflowX}px ${m.docOverflowX > 0 ? '(OVERFLOW)' : '(none)'}`);
  say(`headings: ${m.headings.length} h1-h3 nodes; first: ${m.headings[0]}`);
  say(`figures: ${m.figures.length}`);
  for (const f of m.figures) say(`  img loaded=${f.loaded} natural=${f.natural} rendered=${f.rendered} lazy=${f.lazy} alt="${(f.alt || '').slice(0, 70)}..."`);
  say(`tables: ${m.tables.length}`);
  for (const t of m.tables) say(`  table[${t.i}] scrollWidth=${t.sw} clientWidth=${t.cw} overflowX=${t.overflowX} farColBefore=${t.farColStartBefore} afterScroll=${t.farColStartAfterScroll} swipeReachable=${t.swipeReachable} tabindex=${t.tabindex} role=${t.role} ariaLabel=${t.ariaLabel ? 'yes' : 'NO'}`);
  say(`unnamed links: ${m.links}; empty-alt imgs: ${m.emptyAltImgs}`);
  await page.screenshot({ path: `${OUT}/${name}-n360.png`, fullPage: true });
}
await ctx.close();

// ---------- desktop pass ----------
const dctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const dpage = await dctx.newPage();
for (const [name, url] of PAGES) {
  await dpage.goto(url, { waitUntil: 'networkidle' });
  await dpage.waitForTimeout(300);
  await dpage.screenshot({ path: `${OUT}/${name}-d1280.png`, fullPage: false });
}
say('\n=== desktop 1280 screenshots saved for all 6 pages ===');
await dctx.close();

// ---------- A4 print emulation ----------
const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
const ppage = await pctx.newPage();
for (const [name, url] of PAGES) {
  await ppage.goto(url, { waitUntil: 'networkidle' });
  await ppage.emulateMedia({ media: 'print' });
  await ppage.waitForTimeout(300);
  const overflow = await ppage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const figClipped = await ppage.evaluate(() => [...document.querySelectorAll('figure')].map((f) => {
    const r = f.getBoundingClientRect();
    return { w: Math.round(r.width), clipped: r.width > document.documentElement.clientWidth };
  }));
  say(`\n=== ${name} @A4 print === page overflowX=${overflow}px; figures: ${figClipped.map((f) => `w=${f.w}${f.clipped ? ' CLIPPED' : ''}`).join(', ') || 'none'}`);
  await ppage.screenshot({ path: `${OUT}/${name}-print-a4.png`, fullPage: true });
}
await pctx.close();

// ---------- dark mode figure variant ----------
const kctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const kpage = await kctx.newPage();
await kpage.goto(`${BASE}/topic-01`, { waitUntil: 'networkidle' });
await kpage.evaluate(() => { localStorage.setItem('theme', 'dark'); });
await kpage.reload({ waitUntil: 'networkidle' });
await kpage.waitForTimeout(600);
const dark = await kpage.evaluate(() => ({
  htmlDataTheme: document.documentElement.getAttribute('data-theme'),
  imgs: [...document.querySelectorAll('figure img')].map((i) => i.currentSrc || i.src),
}));
say(`\n=== dark mode (topic-01) === data-theme=${dark.htmlDataTheme}`);
for (const s of dark.imgs) say(`  img src: ${s}`);
await kpage.screenshot({ path: `${OUT}/topic-01-dark-d1280.png`, fullPage: false });
await kctx.close();

await browser.close();
say('\nDONE');
