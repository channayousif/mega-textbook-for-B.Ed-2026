// G5 dark-viewport pass - verify the .ur.dark.svg variants actually load in dark theme.
import { chromium } from 'playwright-core';

const EXE = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome`;
const OUT = 'specs/content/efmp-301/reviews/unit-07/G5/renders-agent-g5-efmp301-u7-run001';
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
await page.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch {} });
await page.goto('http://localhost:3213/ur/semester-1/efmp-301/unit-07/topic-01/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);
const info = await page.evaluate(() => ({
  dataTheme: document.documentElement.getAttribute('data-theme'),
  figs: [...document.querySelectorAll('img[src*="/img/figures/"]')].map((i) => ({ src: i.getAttribute('src').split('/').pop(), complete: i.complete, displayed: i.getClientRects().length > 0 })),
}));
await page.screenshot({ path: `${OUT}/dark-1280-topic-01.png` });
console.log(JSON.stringify({ ...info, consoleErrors: errors }, null, 1));
await browser.close();
