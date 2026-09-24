#!/usr/bin/env node
/**
 * Independent page inspection for EFMP-302 Unit 2, G3 feat023-r2 (this
 * reviewer's own driver, not the render-inspect tool's log).
 *
 * What it adds beyond render-inspect sections A-B:
 *   - the G3 reference's scroll-to-edge test: for every element that scrolls
 *     horizontally at 360px, set scrollLeft = scrollWidth and re-measure the
 *     rightmost content, proving it is reachable by swipe, not just that a
 *     scroller exists;
 *   - keyboard-reachability attributes (tabindex, role, aria-label) on each
 *     scroller, which hydration adds;
 *   - exactly one h1 per page, no heading-level skips, no dark figure variant
 *     shown in light mode.
 */
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const base = process.argv[2] || 'http://127.0.0.1:4599';
const outDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G3');
const pages = ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'unit-assessment', 'unit-teacher-notes'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

const lines = [];
const say = (s) => { lines.push(s); console.log(s); };
say(`# page-inspect - EFMP-302 unit-02, G3 feat023-r2 (independent of render-inspect)`);
say(`# started: ${new Date().toISOString()}  base: ${base}  viewport: 360x780 mobile`);
const json = [];
let failures = 0;

for (const slug of pages) {
  const res = await page.goto(`${base}/semester-1/efmp-302/unit-02/${slug}/`, { waitUntil: 'networkidle' });
  if (!res?.ok()) { say(`-- ${slug}: HTTP ${res.status()} DEFECT`); failures++; continue; }
  const d = await page.evaluate(() => {
    const h1s = document.querySelectorAll('main h1').length;
    const hs = [...document.querySelectorAll('main h1,main h2,main h3,main h4')].map((h) => +h.tagName[1]);
    let skip = 0; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) skip++;
    const darkShown = [...document.querySelectorAll('main img[src$=".dark.svg"]')].filter((i) => i.getBoundingClientRect().width > 0 && getComputedStyle(i).display !== 'none').length;
    // Every horizontally scrolling element, with the reference's scroll-to-edge test applied.
    const scrollers = [...document.querySelectorAll('main *')].filter((e) => {
      const cs = getComputedStyle(e);
      return /auto|scroll/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1;
    }).map((e) => {
      const before = e.scrollLeft;
      e.scrollLeft = e.scrollWidth;
      const lastKid = e.lastElementChild ? e.lastElementChild.getBoundingClientRect() : null;
      // For a table, the rightmost header cell is the thing that must come into view.
      let target = null;
      if (e.tagName === 'TABLE') {
        const cells = [...e.querySelectorAll('tr:first-child th,tr:first-child td')];
        const last = cells[cells.length - 1];
        if (last) target = last.getBoundingClientRect();
      }
      const rect = target || lastKid;
      const reachable = rect ? rect.right <= window.innerWidth + 1 : false;
      const attrs = { tabindex: e.getAttribute('tabindex'), role: e.getAttribute('role'), ariaLabel: e.getAttribute('aria-label') };
      e.scrollLeft = before;
      return { tag: e.tagName, cls: typeof e.className === 'string' ? e.className.split(' ')[0] : '', cw: e.clientWidth, sw: e.scrollWidth, reachable, right: rect ? Math.round(rect.right) : null, ...attrs };
    });
    return { h1s, skip, darkShown, scrollers, docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  const allReachable = d.scrollers.every((s) => s.reachable);
  const allFocusable = d.scrollers.every((s) => s.tabindex === '0' && s.ariaLabel);
  say(`-- ${slug}: h1=${d.h1s} headingSkips=${d.skip} darkShownInLight=${d.darkShown} docOverflow=${d.docOverflow}px scrollers=${d.scrollers.length} allReachableBySwipe=${allReachable} allKeyboardFocusable=${allFocusable}`);
  for (const s of d.scrollers) say(`   scroller ${s.tag}.${s.cls} client=${s.cw} scroll=${s.sw} lastContentRight=${s.right} reachable=${s.reachable} tabindex=${s.tabindex} role=${s.role} aria="${s.ariaLabel}"`);
  if (d.h1s !== 1 || d.skip > 0 || d.darkShown > 0 || d.docOverflow > 1 || !allReachable || !allFocusable) { failures++; say(`   DEFECT on ${slug}`); }
  json.push({ page: slug, ...d });
}

await ctx.close(); await browser.close();
say(`# finished: ${new Date().toISOString()}`);
say(`# failures: ${failures}`);
writeFileSync(join(outDir, 'logs-feat023-r2/page-inspect.log'), `${lines.join('\n')}\n`);
writeFileSync(join(outDir, 'logs-feat023-r2/page-inspect.json'), `${JSON.stringify({ schema_version: 1, generated_at: new Date().toISOString(), base, viewport: '360x780 mobile', pages: json, failures }, null, 2)}\n`);
process.exit(failures ? 1 : 0);
