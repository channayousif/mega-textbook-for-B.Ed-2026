// X3 re-measurement: displayed (CSS) width and effective text size of each
// unit-06 figure on the desktop viewport, plus narrow-viewport spot check.
import { chromium } from 'playwright-core';

const BASE = 'http://127.0.0.1:8124';
const browser = await chromium.launch();
for (const vp of [{ width: 1280, height: 900 }, { width: 360, height: 740 }]) {
  const page = await browser.newPage({ viewport: vp });
  console.log(`\n== viewport ${vp.width}x${vp.height} ==`);
  for (const t of ['topic-01', 'topic-02', 'topic-03', 'topic-04']) {
    await page.goto(`${BASE}/semester-1/efmp-302/unit-06/${t}/`, { waitUntil: 'load' });
    const figs = await page.evaluate(() => {
      const out = [];
      for (const f of document.querySelectorAll('figure img')) {
        if (f.src.includes('.dark.')) continue;
        const shown = f.getBoundingClientRect().width > 0;
        if (!shown) continue;
        const r = f.getBoundingClientRect();
        const svg = f.closest('figure');
        out.push({ src: f.src.split('/').pop(), w: Math.round(r.width), h: Math.round(r.height) });
      }
      return out;
    });
    console.log(`${t}: ${figs.map((f) => `${f.src} displays ${f.w}x${f.h}`).join(', ')}`);
  }
  await page.close();
}
await browser.close();
