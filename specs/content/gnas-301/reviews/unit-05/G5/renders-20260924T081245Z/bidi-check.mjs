// Focused bidi/digit checks for the Urdu Unit 5 pages (G5 run 001).
// Verifies: Western digits only (no Eastern Arabic-Indic digit mixing), Latin
// embeds embedded cleanly, option letters a-d present in the assessment, table
// column order under RTL, and heading/list direction.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const out = {};

await page.goto('http://localhost:3459/ur/semester-1/gnas-301/unit-05/unit-assessment/', { waitUntil: 'networkidle' });
out.assessment = await page.evaluate(() => {
  const art = document.querySelector('article');
  const text = art.innerText;
  const eastern = text.match(/[۰-۹]/g); // extended Arabic-Indic digits
  const arabicIndic = text.match(/[٠-٩]/g); // plain Arabic-Indic digits
  const optionLetters = ['a)', 'b)', 'c)', 'd)'].filter((l) => text.includes(l));
  // table header order: first header cell should be at the RIGHT edge in RTL
  const table = document.querySelector('table');
  let headerOrder = null;
  if (table) {
    const cells = [...table.querySelectorAll('thead th')].map((th) => {
      const r = th.getBoundingClientRect();
      return { text: th.textContent.trim().slice(0, 20), left: Math.round(r.left) };
    });
    cells.sort((a, b) => b.left - a.left); // right-to-left visual order
    headerOrder = cells.map((c) => c.text);
  }
  return {
    easternDigits: eastern ? eastern.length : 0,
    arabicIndicDigits: arabicIndic ? arabicIndic.length : 0,
    westernDigits: (text.match(/[0-9]/g) || []).length,
    optionLettersPresent: optionLetters,
    tableHeaderVisualOrderRTL: headerOrder,
  };
});

await page.goto('http://localhost:3459/ur/semester-1/gnas-301/unit-05/topic-01/', { waitUntil: 'networkidle' });
out.topic01 = await page.evaluate(() => {
  const art = document.querySelector('article');
  const text = art.innerText;
  const list = document.querySelector('article ul, article ol');
  return {
    listDirection: list ? getComputedStyle(list).direction : null,
    textAlign: art ? getComputedStyle(art.querySelector('p') || art).textAlign : null,
    latinEmbeds: ['WHO', 'CO', 'PM2.5', 'Glossary'].filter((l) => text.includes(l)),
    easternDigits: (text.match(/[۰-۹٠-٩]/g) || []).length,
  };
});

await browser.close();
writeFileSync('specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z/bidi-check.json', JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out, null, 1));
