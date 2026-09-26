import { chromium } from 'playwright-core';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync } from 'node:fs';
const ROOT = resolve(process.cwd());
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
const out = [];
for (const p of ['topic-01', 'topic-02', 'topic-03', 'topic-04']) {
  await page.goto(`${BASE}/semester-1/efmp-302/unit-05/${p}`, { waitUntil: 'networkidle' });
  const figs = await page.evaluate(() => {
    return [...document.querySelectorAll('figure')].map((f) => {
      const img = f.querySelector('img');
      return {
        id: f.getAttribute('data-figure-id') || f.id || '(none)',
        tabindex: f.getAttribute('tabindex'),
        role: f.getAttribute('role'),
        ariaLabel: f.getAttribute('aria-label'),
        scrollable: f.scrollWidth > f.clientWidth,
        altLen: img ? (img.getAttribute('alt') || '').length : -1,
        altHead: img ? (img.getAttribute('alt') || '').slice(0, 60) : '(no img)',
        focusable: typeof f.focus === 'function',
      };
    });
  });
  out.push(`-- ${p} @360px`);
  for (const f of figs) {
    out.push(`   figure id=${f.id} tabindex=${f.tabindex} role=${f.role} aria="${f.ariaLabel}" scrollable=${f.scrollable} altLen=${f.altLen} alt="${f.altHead}..."`);
  }
}
console.log(out.join('\n'));
writeFileSync(ROOT + '/specs/content/efmp-302/reviews/unit-05/G3/logs-feat023-r1/figure-a11y.log', out.join('\n') + '\n');
await browser.close();
