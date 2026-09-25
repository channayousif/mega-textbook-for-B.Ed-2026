import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const base = 'http://127.0.0.1:4612';
const out = 'specs/content/efmp-301/reviews/unit-02/G3/evidence-run002';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pg = await ctx.newPage();
const response = await pg.goto(`${base}/semester-1/efmp-301/unit-02/`, { waitUntil: 'networkidle' });
// Wait for hydration: the h1 must exist before measuring.
await pg.waitForSelector('main h1', { timeout: 30000 });
await pg.waitForTimeout(1500);
const d = await pg.evaluate(() => {
  const hs = [...document.querySelectorAll('main h1,main h2,main h3,main h4')]
    .map((h) => ({ level: +h.tagName[1], text: h.textContent.trim().slice(0, 60) }));
  const links = [...document.querySelectorAll('main a')].map((a) => a.textContent.trim());
  const overflow = document.documentElement.scrollWidth > window.innerWidth;
  return { hs, links, overflow, title: document.title };
});
const lines = [];
lines.push('### index page re-measure (desktop 1280x900) after waitForSelector(main h1)');
lines.push(`HTTP ${response?.status()}  title: ${d.title}`);
lines.push(`headings (${d.hs.length}):`);
for (const h of d.hs) lines.push(`  h${h.level} ${h.text}`);
lines.push(`topic links: ${JSON.stringify(d.links)}`);
lines.push(`document horizontal overflow: ${d.overflow}`);
await pg.screenshot({ path: `${out}/renders/desktop-index-rerun.png`, fullPage: true });
writeFileSync(`${out}/index-remeasure.log`, lines.join('\n') + '\n');
console.log(lines.join('\n'));
await ctx.close();
await browser.close();
