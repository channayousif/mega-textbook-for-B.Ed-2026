// Standalone figure evidence only. Does not build or serve Docusaurus.
// Run from repository root: scripts/heavy.sh node specs/content/efmp-304/translations/unit-02/inspect-figures.mjs
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const out = 'specs/content/efmp-304/translations/unit-02';
const dir = 'static/img/figures/efmp-304/unit-02';
const fontBytes = readFileSync('static/fonts/NotoNastaliqUrdu-Regular.woff2');
const font = fontBytes.toString('base64');
const browser = await chromium.launch({ headless: true });
const logs = [`Chromium ${browser.version()}`, `Noto Nastaliq Urdu SHA256 ${createHash('sha256').update(fontBytes).digest('hex')}`];
let failures = 0;
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 650 } });
  for (let n = 1; n <= 8; n++) {
    for (const variant of ['ur', 'ur.dark']) {
      const file = `${dir}/fig-U2-${n}.${variant}.svg`;
      const svg = readFileSync(file, 'utf8');
      await page.setContent(`<style>@font-face{font-family:'Noto Nastaliq Urdu';src:url(data:font/woff2;base64,${font})}body{margin:0}</style>${svg}`);
      await page.evaluate(async () => {
        const svg = document.querySelector('svg');
        svg.style.width = `${svg.viewBox.baseVal.width}px`;
        svg.style.height = `${svg.viewBox.baseVal.height}px`;
        await document.fonts.ready;
      });
      const result = await page.evaluate(() => {
        const svg = document.querySelector('svg');
        const root = svg.getBoundingClientRect();
        const texts = [...svg.querySelectorAll('text')].filter(t => !t.hasAttribute('aria-hidden'));
        const problems = texts.flatMap(t => {
          const b = t.getBoundingClientRect();
          return b.left < root.left - 0.5 || b.right > root.right + 0.5 || b.top < root.top - 0.5 || b.bottom > root.bottom + 0.5
            ? [{ text: t.textContent, left: b.left - root.left, right: b.right - root.left, top: b.top - root.top, bottom: b.bottom - root.top }]
            : [];
        });
        return { width: root.width, height: root.height, labels: texts.length, fontLoaded: document.fonts.check('12px "Noto Nastaliq Urdu"'), problems };
      });
      failures += result.problems.length + (result.fontLoaded ? 0 : 1);
      logs.push(JSON.stringify({ file, sha256: createHash('sha256').update(svg).digest('hex'), ...result }));
      await page.locator('svg').screenshot({ path: `${out}/fig-U2-${n}.${variant}.png` });
    }
  }
} finally {
  await browser.close();
}
logs.push(`${failures} figure viewBox/font failures; this does not inspect full pages, narrow layout or print.`);
writeFileSync(`${out}/figure-geometry.log`, `${logs.join('\n')}\n`);
console.log(logs.join('\n'));
process.exitCode = failures ? 1 : 0;
