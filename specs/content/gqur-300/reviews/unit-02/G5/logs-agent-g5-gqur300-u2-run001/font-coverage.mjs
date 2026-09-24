import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3218/ur/semester-1/gqur-300/unit-02/topic-01/', { waitUntil: 'networkidle', timeout: 120000 });
const result = await page.evaluate(async () => {
  await document.fonts.ready;
  const article = document.querySelector('article');
  const text = (article ? article.innerText : document.body.innerText).replace(/\s+/g, ' ').slice(0, 4000);
  const font = '16px "Noto Nastaliq Urdu"';
  return {
    nastaliqCoversUnitText: document.fonts.check(font, text),
    nastaliqCoversSample: document.fonts.check(font, 'اعداد اور عمل، نسبت، تناسب، فیصد، قوتیں، جذر، مربع، کسر، اعشاریہ، صحيح، ضرب، تقسیم، جمع، تفریق'),
    loadedFonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`),
    proseFontFamily: getComputedStyle(article).fontFamily,
    textLength: text.length,
    textHead: text.slice(0, 200),
  };
});
console.log(JSON.stringify(result, null, 1));
await browser.close();
