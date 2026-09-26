// Measure the ENGLISH figure SVGs (fig-U7-1, fig-U7-4) to verify whether their own
// dividers cross their footer texts (finding 12 evidence). No file writes.
import { chromium } from 'playwright-core';
const EXE = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome`;
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage();
for (const fig of ['fig-U7-1', 'fig-U7-4']) {
  await page.goto(`file:///home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572/static/img/figures/efmp-301/unit-07/${fig}.svg`, { waitUntil: 'load' });
  const out = await page.evaluate(() => {
    const svg = document.documentElement;
    const vb = svg.viewBox.baseVal;
    const verts = [];
    for (const p of svg.querySelectorAll('path.grid')) {
      for (const m of (p.getAttribute('d') || '').matchAll(/M\s*([\d.]+)\s+[\d.]+V[\d.]+/g)) verts.push(+m[1]);
    }
    const struck = [];
    for (const t of svg.querySelectorAll('text')) {
      const b = t.getBBox();
      for (const x of verts) {
        if (x > b.x + 1 && x < b.x + b.width - 1) struck.push(`x=${x} strikes "${(t.textContent || '').slice(0, 45)}" (bbox ${b.x.toFixed(0)}..${(b.x + b.width).toFixed(0)})`);
      }
    }
    return { fig: location.pathname.split('/').pop(), verts, struck };
  });
  console.log(JSON.stringify(out, null, 1));
}
await browser.close();
