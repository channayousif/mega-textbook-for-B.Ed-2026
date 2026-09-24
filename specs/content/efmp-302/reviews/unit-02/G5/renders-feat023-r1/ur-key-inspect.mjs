#!/usr/bin/env node
/** Capture the Urdu MCQ answer key ol (adjacent sibling of its h3) and ERQ rubric tables. */
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
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`${base}/ur/semester-1/efmp-302/unit-02/unit-assessment/`, { waitUntil: 'networkidle' });

const keyOl = page.locator('h3:has-text("MCQ جوابی کلید") + ol');
await keyOl.scrollIntoViewIfNeeded();
await keyOl.screenshot({ path: join(outDir, 'narrow360-element-assessment-mcq-key.png') });
say('captured narrow360-element-assessment-mcq-key.png (adjacent sibling of the key heading)');
const keyText = await keyOl.innerText();
const key6 = keyText.split('\n').find((l) => l.startsWith('6.'));
say(`key item 6 rendered text: ${JSON.stringify(key6)}`);
const hasCaveat = /غیر مصدقہ|مصدقہ|ثانوی/.test(key6 || '');
say(`key item 6 contains an uncorroborated/secondary-account qualifier: ${hasCaveat}`);

// First ERQ rubric table at 360px.
const rubricTable = page.locator('table').first();
await rubricTable.scrollIntoViewIfNeeded();
await rubricTable.screenshot({ path: join(outDir, 'narrow360-element-assessment-erq1-rubric.png') });
say('captured narrow360-element-assessment-erq1-rubric.png');

// RRQ mark scheme excerpt (items 1-3 shown as bold paragraphs).
const rrqMs = page.locator('h3:has-text("RRQ نمونہ جوابات")');
await rrqMs.scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'narrow360-element-assessment-rrq-markschemes.png'), clip: { x: 0, y: 100, width: 360, height: 680 } });
say('captured narrow360-element-assessment-rrq-markschemes.png');

await ctx.close();
await browser.close();
say(`# finished: ${new Date().toISOString()}`);
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/ur-key-inspect.log'), `${lines.join('\n')}\n`);
