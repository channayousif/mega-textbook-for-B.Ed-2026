// G3 rendered inspection for EFMP-301 Unit 9 - run with the repo's own Playwright.
// Narrow 360px pass (pages, figure closeups, table + figure scroll measurement with
// the swipe test from the G3 reference) and an A4 print-media pass.
// Writes render-inspection.json and PNG artifacts beside this script's renders dir.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const OUT = join(ROOT, 'specs/content/efmp-301/reviews/unit-09/G3/renders-agent-g3-efmp301-u9-run001');
const BASE = 'http://localhost:3000/semester-1/efmp-301/unit-09/';
mkdirSync(OUT, { recursive: true });
const entries = [];
const pages = [
  ['index', ''], ['topic-01', 'topic-01/'], ['topic-02', 'topic-02/'],
  ['topic-03', 'topic-03/'], ['unit-assessment', 'unit-assessment/'], ['unit-teacher-notes', 'unit-teacher-notes/'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });

// ---------- narrow 360px pass ----------
for (const [name, slug] of pages) {
  const url = BASE + slug;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let hydration mark scrollable regions
  entries.push({ pass: 'narrow-360', page: name, url, title: await page.title() });
  entries.push({ pass: 'narrow-360', page: name, headings: await page.locator('article h1, article h2, article h3').count() });

  const figs = page.locator('article figure');
  const figCount = await figs.count();
  for (let i = 0; i < figCount; i++) {
    const f = figs.nth(i);
    const imgs = f.locator('img');
    const imgCount = await imgs.count();
    let primarySrc = null;
    for (let j = 0; j < imgCount; j++) {
      const img = imgs.nth(j);
      const src = await img.getAttribute('src');
      if (j === 0) primarySrc = src;
      const alt = await img.getAttribute('alt');
      const rendered = await img.evaluate((el) => el.complete && el.naturalWidth > 0);
      const visible = await img.evaluate((el) => {
        const cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getBoundingClientRect().width > 0;
      });
      entries.push({ pass: 'narrow-360', page: name, figure: src, alt: (alt || '').slice(0, 80), rendered, visible });
    }
    const m = await f.evaluate((el) => {
      const before = { clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, overflowX: getComputedStyle(el).overflowX,
        tabindex: el.getAttribute('tabindex'), role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label') };
      el.scrollLeft = el.scrollWidth;
      const im = el.querySelector('img');
      const rectAfter = im ? im.getBoundingClientRect().toJSON() : null;
      const maxScrollLeft = el.scrollLeft;
      el.scrollLeft = 0;
      return { before, rectAfter, maxScrollLeft };
    });
    entries.push({ pass: 'narrow-360', page: name, figureBox: m.before, maxScrollLeft: m.maxScrollLeft, imgRectAfterScroll: m.rectAfter, viewport: 360 });
    const figId = (primarySrc || '').match(/fig-U9-\d+/)?.[0] || `fig${i}`;
    await f.screenshot({ path: join(OUT, `narrow-360-${name}-${figId}-closeup.png`) });
  }

  const tables = page.locator('article table');
  const tCount = await tables.count();
  for (let i = 0; i < tCount; i++) {
    const t = tables.nth(i);
    const m = await t.evaluate((el) => {
      const before = { clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, overflowX: getComputedStyle(el).overflowX,
        tabindex: el.getAttribute('tabindex'), role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label') };
      const cells = el.querySelectorAll('tr:first-child th, tr:first-child td');
      const last = cells[cells.length - 1];
      const rectBefore = last ? last.getBoundingClientRect().toJSON() : null;
      el.scrollLeft = el.scrollWidth;
      const rectAfter = last ? last.getBoundingClientRect().toJSON() : null;
      const maxScrollLeft = el.scrollLeft;
      el.scrollLeft = 0;
      return { before, rectBefore, rectAfter, maxScrollLeft, rows: el.querySelectorAll('tr').length,
        cap: (el.querySelector('caption')?.textContent || 'uncaptioned').slice(0, 40) };
    });
    const reachable = m.rectAfter ? (m.rectAfter.right <= 360 && m.rectAfter.right > 0) : null;
    entries.push({ pass: 'narrow-360', page: name, table: m.cap, rows: m.rows, ...m, swipeReachable: reachable, viewport: 360 });
  }
  await page.screenshot({ path: join(OUT, `narrow-360-${name}.png`), fullPage: true });
}

// ---------- A4 print pass ----------
await page.emulateMedia({ media: 'print' });
await page.setViewportSize({ width: 794, height: 1123 });
for (const [name, slug] of pages) {
  await page.goto(BASE + slug, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const m = await page.evaluate(() => {
    const de = document.documentElement;
    const docW = de.clientWidth;
    const pageScrollW = de.scrollWidth;
    const bad = [];
    for (const el of document.querySelectorAll('article img, article table, article pre')) {
      const r = el.getBoundingClientRect();
      if (r.right > docW + 1) bad.push({ tag: el.tagName, src: (el.getAttribute('src') || '').slice(-40), right: Math.round(r.right) });
    }
    const figs = [...document.querySelectorAll('article figure')].map((f) => {
      const img = f.querySelector('img');
      const cs = img ? getComputedStyle(img) : null;
      return { src: img?.getAttribute('src'), visible: img ? cs.display !== 'none' && cs.visibility !== 'hidden' && img.complete : false };
    });
    return { docW, pageScrollW, bad, figs, hasAnswersHeading: !!document.getElementById('answers-and-marking-guidance') };
  });
  entries.push({ pass: 'a4-print', page: name, ...m });
  await page.screenshot({ path: join(OUT, `a4-print-${name}.png`), fullPage: true });
}
await page.emulateMedia({ media: null });
await browser.close();
writeFileSync(join(OUT, 'render-inspection.json'), JSON.stringify(entries, null, 2));
console.log(`entries: ${entries.length}`);
for (const e of entries) {
  if (e.figureBox || e.table !== undefined || e.pass === 'a4-print') {
    console.log(JSON.stringify(e).slice(0, 300));
  }
}
