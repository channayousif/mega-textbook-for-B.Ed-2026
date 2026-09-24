#!/usr/bin/env node
/**
 * Targeted element-level screenshots for G5 visual inspection, EFMP-302 Unit 2 Urdu.
 * The full-page narrow renders are 27k px tall and unreadable at review scale; this
 * captures the specific things the G5 rubric names, at 2x, from the served build:
 *   - the diagnostic table in topic-03 and the MCQ list / key in unit-assessment
 *     at 360x780 (table column order, option markers, bidi punctuation at line ends)
 *   - a figure at 360x780 scrolled to its right edge (label fit in narrow view)
 *   - the further-reading section of topic-01 at 1280x900 (embedded Latin citations)
 *   - the index key-terms-bearing frontmatter render and a mid-page paragraph
 *     (Nastaliq legibility, sentence punctuation)
 * Also records, per captured element, the first/last visible line-final characters
 * so line-end bidi punctuation can be checked mechanically alongside the images.
 */
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const base = process.argv[2] || 'http://127.0.0.1:4599';
const outDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G5/renders-feat023-r1');
mkdirSync(outDir, { recursive: true });
const U = `${base}/ur/semester-1/efmp-302/unit-02`;
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

say(`# ur-element-inspect - EFMP-302 unit-02 G5 feat023-r1`);
say(`# started: ${new Date().toISOString()}  base: ${base}  browser: chromium ${browser.version()}`);

/* ---------- 360x780: topic-03 diagnostic table + first figure ---------- */
await page.goto(`${U}/topic-03`, { waitUntil: 'networkidle' });
const diagTable = page.locator('table').first();
await diagTable.scrollIntoViewIfNeeded();
await diagTable.screenshot({ path: join(outDir, 'narrow360-element-topic03-diagnostic-table.png') });
say('captured narrow360-element-topic03-diagnostic-table.png');

// Figure at 360: scroll the figure's own scroller to its right edge (RTL start).
const fig5 = page.locator('figure.figure').first();
await fig5.scrollIntoViewIfNeeded();
await page.evaluate(() => {
  const f = document.querySelector('figure.figure');
  if (f) f.scrollLeft = f.scrollWidth;
});
await fig5.screenshot({ path: join(outDir, 'narrow360-element-topic03-fig5-scrolled.png') });
say('captured narrow360-element-topic03-fig5-scrolled.png');
const fig5Info = await page.evaluate(() => {
  const f = document.querySelector('figure.figure');
  return { client: f.clientWidth, scrollW: f.scrollWidth, scrollLeftAfter: f.scrollLeft };
});
say(`fig5 scroller: client=${fig5Info.client} scrollW=${fig5Info.scrollW} scrollLeftAfter=${fig5Info.scrollLeftAfter}`);

/* ---------- 360x780: unit-assessment MCQ list and answer key ---------- */
await page.goto(`${U}/unit-assessment`, { waitUntil: 'networkidle' });
const mcqHeading = page.locator('h3', { hasText: 'کثیر انتخابی سوالات' }).first();
await mcqHeading.scrollIntoViewIfNeeded();
const mcqList = mcqHeading.locator('..').locator('ol').first();
await mcqList.screenshot({ path: join(outDir, 'narrow360-element-assessment-mcq-list.png') });
say('captured narrow360-element-assessment-mcq-list.png');

const keyHeading = page.locator('h3', { hasText: 'MCQ جوابی کلید' }).first();
await keyHeading.scrollIntoViewIfNeeded();
const keyList = keyHeading.locator('..').locator('ol').first();
await keyList.screenshot({ path: join(outDir, 'narrow360-element-assessment-mcq-key.png') });
say('captured narrow360-element-assessment-mcq-key.png');

// Mechanically check line-final characters across the assessment page text.
const bidi = await page.evaluate(() => {
  const article = document.querySelector('article') || document.body;
  const range = document.createRange();
  const out = [];
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const el = n.parentElement;
    if (!el || el.closest('script,style')) continue;
    const r = document.createRange();
    r.selectNodeContents(n);
    const rects = r.getClientRects();
    for (const rect of rects) {
      if (rect.height > 4 && rect.width > 40) {
        out.push({ lineEndChar: n.textContent.slice(-1), lineStartChar: n.textContent.slice(0, 1), w: Math.round(rect.width) });
        break;
      }
    }
  }
  const endChars = {};
  for (const o of out) endChars[o.lineEndChar] = (endChars[o.lineEndChar] || 0) + 1;
  return { textNodesSampled: out.length, lineEndCharCounts: endChars };
});
say(`assessment line-end character census (first rect per text node): ${JSON.stringify(bidi)}`);

/* ---------- 1280x900: topic-01 further reading (embedded Latin citations) ---------- */
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`${U}/topic-01`, { waitUntil: 'networkidle' });
const fr = page.locator('h2', { hasText: 'مزید مطالعہ' }).first();
await fr.scrollIntoViewIfNeeded();
const frSection = fr.locator('..');
await frSection.screenshot({ path: join(outDir, 'desktop-element-topic01-further-reading.png') });
say('captured desktop-element-topic01-further-reading.png');

// A mid-page paragraph for Nastaliq legibility and punctuation.
const para = page.locator('h2', { hasText: 'وضاحت' }).first().locator('..').locator('p').nth(3);
await para.scrollIntoViewIfNeeded();
await para.screenshot({ path: join(outDir, 'desktop-element-topic01-paragraph.png') });
say('captured desktop-element-topic01-paragraph.png');

// The disclosure paragraph with the bold uncorroborated caveat in topic-02.
await page.goto(`${U}/topic-02`, { waitUntil: 'networkidle' });
const caveat = page.locator('p', { hasText: 'غیر مصدقہ' }).first();
await caveat.scrollIntoViewIfNeeded();
await caveat.screenshot({ path: join(outDir, 'desktop-element-topic02-caveat.png') });
say('captured desktop-element-topic02-caveat.png');

// The index page opening (badge + title + first paragraphs).
await page.goto(`${U}/`, { waitUntil: 'networkidle' });
const idx = page.locator('article').first();
await idx.screenshot({ path: join(outDir, 'desktop-element-index-article.png') });
say('captured desktop-element-index-article.png');

await ctx.close();
await browser.close();
say(`# finished: ${new Date().toISOString()}`);
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/ur-element-inspect.log'), `${lines.join('\n')}\n`);
