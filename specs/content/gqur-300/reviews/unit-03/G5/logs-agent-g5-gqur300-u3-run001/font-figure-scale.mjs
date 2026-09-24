// G5 font + figure-scale inspection: confirm the Nastaliq webfont actually loads
// and measure the effective SVG label size at the narrow viewport (the Unit 1 G5
// flagged dense SVG tables scaling below readable size at 360px).
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3221';
const browser = await chromium.launch();
const notes = [];

// font loading check (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const fontReqs = [];
  page.on('response', r => { if (/\.(woff2?|ttf)/i.test(r.url())) fontReqs.push(`${r.status()} ${r.url().split('/').pop()}`); });
  await page.goto(`${BASE}/ur/semester-1/gqur-300/unit-03/topic-01/`, { waitUntil: 'networkidle' });
  const m = await page.evaluate(async () => {
    await document.fonts.ready;
    return {
      nastaliq: document.fonts.check('16px "Noto Nastaliq Urdu"'),
      loaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family),
    };
  });
  notes.push(`fonts: Nastaliq check=${m.nastaliq} loaded=[${m.loaded.join(', ')}] requests=[${fontReqs.join(', ')}]`);
  await ctx.close();
}

// figure rendered size + effective label px at narrow viewport
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  for (const t of ['topic-01', 'topic-02', 'topic-03']) {
    await page.goto(`${BASE}/ur/semester-1/gqur-300/unit-03/${t}/`, { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => {
      const out = [];
      for (const svg of document.querySelectorAll('article figure svg')) {
        const r = svg.getBoundingClientRect();
        const vb = svg.getAttribute('viewBox');
        const scale = vb ? r.width / Number(vb.split(' ')[2]) : 1;
        const small = [...svg.querySelectorAll('text')].map(t => Number(getComputedStyle(t).fontSize.replace('px', '')) * scale);
        out.push(`svgW=${Math.round(r.width)} scale=${scale.toFixed(2)} labelPx=[${Math.round(Math.min(...small))}-${Math.round(Math.max(...small))}]`);
      }
      return out;
    });
    notes.push(`narrow ${t}: ${m.join(' ; ')}`);
  }
  await ctx.close();
}
await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001/font-figure-scale.txt', notes.join('\n') + '\n');
console.log(notes.join('\n'));
