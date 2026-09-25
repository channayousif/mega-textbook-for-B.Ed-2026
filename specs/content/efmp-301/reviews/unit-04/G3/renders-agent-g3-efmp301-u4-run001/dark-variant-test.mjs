// Dark-theme variant test: switch the site to dark mode, reload, scroll, and
// confirm the .dark.svg variants load and the light ones are swapped out.
import { chromium } from 'playwright';

const BASE = 'http://localhost:3217';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
await page.goto(`${BASE}/semester-1/efmp-301/unit-04/topic-01/`, { waitUntil: 'load' });
// The repo themes figures via [data-theme]; set dark through the site's own storage.
await page.evaluate(() => {
  try { localStorage.setItem('theme', 'dark'); } catch {}
  document.documentElement.setAttribute('data-theme', 'dark');
});
await page.reload({ waitUntil: 'load' });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
});
await page.waitForTimeout(1200);
const state = await page.evaluate(() => ({
  dataTheme: document.documentElement.getAttribute('data-theme'),
  imgs: [...document.querySelectorAll('article img')].map((i) => ({
    src: i.getAttribute('src'),
    loaded: i.complete && i.naturalWidth > 0,
    visible: i.offsetParent !== null || getComputedStyle(i).display !== 'none',
  })),
}));
console.log('data-theme:', state.dataTheme);
for (const i of state.imgs) console.log(`  ${i.src} loaded=${i.loaded}`);
await page.screenshot({ path: 'specs/content/efmp-301/reviews/unit-04/G3/renders-agent-g3-efmp301-u4-run001/inspect-dark-topic-01-fig.png', fullPage: false });
await browser.close();
console.log('DONE');
