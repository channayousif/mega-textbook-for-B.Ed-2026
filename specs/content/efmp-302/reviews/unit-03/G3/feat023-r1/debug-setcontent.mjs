import { chromium } from 'playwright-core';
const browser = await chromium.launch();
const page = await browser.newPage();
for (let i = 0; i < 3; i++) {
  await page.setContent(`<!doctype html><html><body><div id="w">run${i}</div><script>window.__ran = ${i}; document.getElementById('w').textContent += '-scripted';</script></body></html>`, { waitUntil: 'load' });
  await page.waitForTimeout(100);
  const r = await page.evaluate(() => ({ ran: window.__ran, text: document.getElementById('w').textContent }));
  console.log(i, JSON.stringify(r));
}
await browser.close();
