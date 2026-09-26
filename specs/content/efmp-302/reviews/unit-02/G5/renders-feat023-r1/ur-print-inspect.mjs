#!/usr/bin/env node
/** A4 print-media visual captures (794px) for G5: figures page + assessment page + a figure close-up. */
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const base = process.argv[2] || 'http://127.0.0.1:4599';
const outDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G5/renders-feat023-r1');
mkdirSync(outDir, { recursive: true });
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.emulateMedia({ media: 'print' });

say(`# ur-print-inspect - EFMP-302 unit-02 G5 feat023-r1 (A4 794px print media)`);
say(`# started: ${new Date().toISOString()}  base: ${base}`);

// topic-03: scroll to fig-U2-5 and capture the print-rendered figure region.
await page.goto(`${base}/ur/semester-1/efmp-302/unit-02/topic-03/`, { waitUntil: 'networkidle' });
const fig5 = page.locator('figure.figure').first();
await fig5.scrollIntoViewIfNeeded();
await fig5.screenshot({ path: join(outDir, 'print-a4-element-topic03-fig5.png') });
say('captured print-a4-element-topic03-fig5.png');
const fi = await page.evaluate(() => {
  const img = document.querySelector('figure.figure img');
  const r = img.getBoundingClientRect();
  return { w: Math.round(r.width), right: Math.round(r.right), docW: document.documentElement.clientWidth };
});
say(`print fig5 img: w=${fi.w} right=${fi.right} docW=${fi.docW}`);

// unit-assessment: the MCQ key region in print media.
await page.goto(`${base}/ur/semester-1/efmp-302/unit-02/unit-assessment/`, { waitUntil: 'networkidle' });
const keyOl = page.locator('h3:has-text("MCQ جوابی کلید") + ol');
await keyOl.scrollIntoViewIfNeeded();
await keyOl.screenshot({ path: join(outDir, 'print-a4-element-assessment-mcq-key.png') });
say('captured print-a4-element-assessment-mcq-key.png');

// topic-01: a full-paragraph region in print media (line breaks, justification).
await page.goto(`${base}/ur/semester-1/efmp-302/unit-02/topic-01/`, { waitUntil: 'networkidle' });
const p = page.locator('p', { hasText: 'تین چیزیں آسانی سے خلط ملط' }).first();
await p.scrollIntoViewIfNeeded();
await p.screenshot({ path: join(outDir, 'print-a4-element-topic01-paragraph.png') });
say('captured print-a4-element-topic01-paragraph.png');

await ctx.close();
await browser.close();
say(`# finished: ${new Date().toISOString()}`);
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/ur-print-inspect.log'), `${lines.join('\n')}\n`);
