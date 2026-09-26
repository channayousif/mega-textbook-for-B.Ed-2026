// Element-level visual inspection captures - EFMP-301 Unit 4 G3 run001
// Captures each <Figure> block and each content table at narrow (360px) and the
// answers section at print, so a human/agent eye can judge them directly.
import { chromium } from 'playwright';

const BASE = 'http://localhost:3217';
const OUT = 'specs/content/efmp-301/reviews/unit-04/G3/renders-agent-g3-efmp301-u4-run001';

const browser = await chromium.launch();

// Narrow: each figure and table on the topic pages
const narrow = await browser.newPage({ viewport: { width: 360, height: 780 } });
const targets = [
  ['topic-01', '/semester-1/efmp-301/unit-04/topic-01/'],
  ['topic-02', '/semester-1/efmp-301/unit-04/topic-02/'],
  ['topic-03', '/semester-1/efmp-301/unit-04/topic-03/'],
];
for (const [name, path] of targets) {
  await narrow.goto(BASE + path, { waitUntil: 'networkidle' });
  await narrow.waitForTimeout(700);
  const figs = narrow.locator('article figure');
  const n = await figs.count();
  for (let i = 0; i < n; i++) {
    await figs.nth(i).scrollIntoViewIfNeeded();
    await figs.nth(i).screenshot({ path: `${OUT}/inspect-narrow-${name}-fig${i + 1}.png` });
  }
  const tables = narrow.locator('article table');
  const tn = await tables.count();
  for (let i = 0; i < tn; i++) {
    await tables.nth(i).scrollIntoViewIfNeeded();
    await tables.nth(i).screenshot({ path: `${OUT}/inspect-narrow-${name}-table${i + 1}.png` });
  }
  console.log(`${name}: ${n} figures, ${tn} tables captured at 360px`);
}

// Print: answers section of the assessment + one rubric table
const print = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await print.emulateMedia({ media: 'print' });
await print.goto(BASE + '/semester-1/efmp-301/unit-04/unit-assessment/', { waitUntil: 'networkidle' });
await print.waitForTimeout(700);
const answers = print.locator('#answers-and-marking-guidance');
await answers.scrollIntoViewIfNeeded();
await answers.screenshot({ path: `${OUT}/inspect-print-assessment-answers.png` });
const rubric = print.locator('article table').first();
await rubric.scrollIntoViewIfNeeded();
await rubric.screenshot({ path: `${OUT}/inspect-print-assessment-rubric1.png` });
console.log('print answers + rubric captured');
await browser.close();
console.log('DONE');
