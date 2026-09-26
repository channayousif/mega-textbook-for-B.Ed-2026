// G5: which elements resolve to Noto Nastaliq Urdu on the Urdu page.
import { chromium } from 'playwright-core';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3217/ur/semester-1/efmp-301/unit-06/topic-02', { waitUntil: 'networkidle' });
const r = await page.evaluate(async () => {
  await document.fonts.ready;
  const pick = (sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).fontFamily.slice(0, 100) : null;
  };
  return {
    htmlLang: document.documentElement.lang,
    body: pick('body'),
    para: pick('article p'),
    h1: pick('article h1'),
    h2: pick('article h2'),
    listItem: pick('article li'),
    tableCell: pick('article td'),
    nastaliqCheck: document.fonts.check('16px "Noto Nastaliq Urdu"', 'شاگرد'),
  };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
