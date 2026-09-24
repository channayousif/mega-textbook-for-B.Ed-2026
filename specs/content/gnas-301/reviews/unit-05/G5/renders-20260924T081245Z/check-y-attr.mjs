// Decisive check: how Chromium parses fig-U5-1's y="130+0" / y="130+20" attributes,
// and whether the same invalid arithmetic-expression y attributes exist in any other
// Unit 5 figure (EN or UR variants).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
await page.goto('http://localhost:3459/img/figures/gnas-301/unit-05/fig-U5-1.svg', { waitUntil: 'networkidle' });
const parsed = await page.evaluate(() => {
  return [...document.querySelectorAll('text')].map((t) => ({
    raw: t.getAttribute('y'),
    parsedY: t.y.baseVal.length ? t.y.baseVal.getItem(0).value : null,
    content: t.textContent.trim().slice(0, 30),
  })).filter((r) => r.raw !== null && (r.raw.includes('+') || r.parsedY === 0));
});
console.log('fig-U5-1.svg texts with arithmetic/zero y:');
for (const r of parsed) console.log(`  raw="${r.raw}" -> parsedY=${r.parsedY} : ${r.content}`);
await browser.close();

// Static scan: which Unit 5 SVGs contain y="N+M" patterns?
console.log('\nStatic scan for y="...+..." attributes across all Unit 5 figure SVGs:');
for (const id of ['fig-U5-1','fig-U5-2','fig-U5-3','fig-U5-4','fig-U5-5','fig-U5-6','fig-U5-7','fig-U5-8']) {
  for (const sfx of ['.svg', '.ur.svg', '.dark.svg', '.ur.dark.svg']) {
    const c = readFileSync(`static/img/figures/gnas-301/unit-05/${id}${sfx}`, 'utf8');
    const hits = [...c.matchAll(/y="(\d+\+\d+)"/g)].map((m) => m[1]);
    if (hits.length) console.log(`  ${id}${sfx}: ${hits.length} invalid y values: ${[...new Set(hits)].join(', ')}`);
  }
}
