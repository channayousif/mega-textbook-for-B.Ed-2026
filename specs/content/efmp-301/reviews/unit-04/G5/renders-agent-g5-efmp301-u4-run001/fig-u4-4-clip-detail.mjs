// Detail measurement for the clipped text in fig-U4-4.ur.svg
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
await page.goto('http://localhost:3218/img/figures/efmp-301/unit-04/fig-U4-4.ur.svg', { waitUntil: 'networkidle' });
const detail = await page.evaluate(() => {
  const svg = document.documentElement;
  const vb = svg.viewBox.baseVal;
  const out = { viewBox: `${vb.width}x${vb.height}`, texts: [] };
  for (const t of svg.querySelectorAll('text')) {
    const b = t.getBBox();
    out.texts.push({
      text: t.textContent.trim(),
      x: Math.round(b.x * 10) / 10,
      y: Math.round(b.y * 10) / 10,
      w: Math.round(b.width * 10) / 10,
      h: Math.round(b.height * 10) / 10,
      right: Math.round((b.x + b.width) * 10) / 10,
      bottom: Math.round((b.y + b.height) * 10) / 10,
      overflowLeft: Math.round((-b.x) * 10) / 10,
      attrX: t.getAttribute('x'),
      attrAnchor: t.getAttribute('text-anchor'),
    });
  }
  return out;
});
for (const t of detail.texts) {
  const clipped = t.x < -1 || t.y < -1 || t.right > detail.viewBox.split('x')[0] * 1 + 1;
  if (clipped || t.overflowLeft > 0 || t.text.includes('اسکول کی سطح') || t.text.includes('سستی')) {
    console.log(JSON.stringify(t));
  }
}
await browser.close();
