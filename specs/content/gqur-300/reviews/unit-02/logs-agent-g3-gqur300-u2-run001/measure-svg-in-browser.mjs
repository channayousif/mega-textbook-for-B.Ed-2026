// Authoritative in-browser geometry for fig-U2-1's side note, plus a content
// dump of the teacher-notes page to diagnose its missing headings.
import { chromium } from 'playwright';

const browser = await chromium.launch();

// 1. Measure the SVG text directly (SVG loaded as a document)
const page = await browser.newPage({ viewport: { width: 900, height: 500 } });
await page.goto('http://localhost:3212/img/figures/gqur-300/unit-02/fig-U2-1.svg', { waitUntil: 'networkidle' });
const geom = await page.evaluate(() => {
  const svg = document.querySelector('svg');
  const vb = svg.viewBox.baseVal;
  const out = { viewBox: `${vb.width}x${vb.height}`, texts: [] };
  for (const t of svg.querySelectorAll('text')) {
    const bb = t.getBBox();
    out.texts.push({
      text: t.textContent,
      x: Number(t.getAttribute('x')),
      bboxRight: Math.round(bb.x + bb.width),
      bboxTop: Math.round(bb.y),
      clipped: bb.x + bb.width > vb.width,
    });
  }
  return out;
});
console.log(JSON.stringify(geom, null, 1));

// 2. Teacher notes page: what is actually rendered?
const tp = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
tp.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
tp.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await tp.goto('http://localhost:3212/semester-1/gqur-300/unit-02/unit-teacher-notes', { waitUntil: 'networkidle', timeout: 120000 });
const info = await tp.evaluate(() => {
  const main = document.querySelector('main') || document.querySelector('article');
  return {
    title: document.title,
    mainExists: !!main,
    headings: [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName + ':' + h.innerText.slice(0, 40)),
    bodyTextSample: (main?.innerText ?? document.body.innerText).replace(/\s+/g, ' ').slice(0, 400),
  };
});
console.log(JSON.stringify({ info, errors: errors.slice(0, 5) }, null, 1));
await browser.close();
