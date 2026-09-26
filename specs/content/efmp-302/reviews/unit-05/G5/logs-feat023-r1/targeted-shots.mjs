#!/usr/bin/env node
// G5 feat023-r1: targeted readable crops of the rendered Urdu pages for visual
// Nastaliq/bidi/numeral/Latin inspection. Locates passages in the live DOM,
// crops the full viewport-width band at native scale, saves under renders/.
import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:4626';
const out = 'specs/content/efmp-302/reviews/unit-05/G5/renders-feat023-r1';

const targets = [
  // page, unique substring of the passage, artifact name
  ['topic-01', 'Maslach اور Leiter', 'crop-t1-maslach-dimensions.png'],
  ['topic-01', '262 نارویجن ہائی اسکول اساتذہ', 'crop-t1-skaalvik-262.png'],
  ['topic-02', 'اس سے اتفاق نہیں کرتا', 'crop-t2-accountability-stance.png'],
  ['topic-02', 'تناوب', 'crop-t2-isore-tension.png'],
  ['topic-03', 'ان کا مطلب ان کے پاس ہونے والے صرف تیس منٹ', 'crop-t3-cost-leg.png'],
  ['topic-04', 'اور کچھ بھی نہیں ہیں', 'crop-t4-not-nothing.png'],
  ['unit-assessment', 'کثیر انتخابی سوالات', 'crop-assess-mcq-stem.png'],
  ['unit-assessment', 'دباؤ میں استاد کے کام کا جو حصہ', 'crop-assess-mcq1-options.png'],
  ['unit-assessment', 'MCQ جوابی کلید', 'crop-assess-mcq-key.png'],
  ['unit-assessment', 'ہٹانے اور fixed الگ', 'crop-assess-erq1-rubric.png'],
  ['unit-teacher-notes', 'پری سروس بیچ', 'crop-notes-opening.png'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const [slug, needle, name] of targets) {
  await page.goto(`${base}/ur/semester-1/efmp-302/unit-05/${slug}`, { waitUntil: 'networkidle' });
  const found = await page.evaluate((n) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.includes(n)) {
        const r = node.parentElement.getBoundingClientRect();
        return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, text: node.textContent.slice(0, 60) };
      }
    }
    return null;
  }, needle);
  if (!found) { console.log(`MISSING ${slug}: ${needle}`); continue; }
  const y = Math.max(0, Math.floor(found.top - 120));
  await page.screenshot({ path: `${out}/${name}`, fullPage: true, clip: { x: 0, y, width: 1280, height: 560 } });
  console.log(`${name} <- ${slug} @y=${Math.floor(found.top)} "${found.text.trim().slice(0, 40)}"`);
}
await browser.close();
