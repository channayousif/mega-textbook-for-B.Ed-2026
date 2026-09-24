// G5 fig-U5-5.ur.svg geometry resample at full viewBox scale (780x470) - run001
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
try {
  await page.goto('http://127.0.0.1:4173/ur/semester-1/gqur-300/unit-05/topic-03', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const res = await page.evaluate(async () => {
    const img = document.querySelector('figure img[src*="fig-U5-5"]');
    if (!img) return { error: 'img not found' };
    const rect = img.getBoundingClientRect();
    const cv = document.createElement('canvas');
    cv.width = 780; cv.height = 470;
    const g = cv.getContext('2d');
    g.drawImage(img, 0, 0, 780, 470);
    const data = g.getImageData(0, 0, 780, 470).data;
    const px = (x, y) => { const i = ((Math.round(y) * 780) + Math.round(x)) * 4; return [data[i], data[i + 1], data[i + 2]]; };
    const lum = (x, y) => { const [r, gg, b] = px(x, y); return 0.299 * r + 0.587 * gg + 0.114 * b; };
    // 11 dots: SVG cx,cy -> expected marks 20,45,50,55,60,62,62,70,70,70,96
    const dots = [[720, 316], [532, 316], [495, 316], [458, 316], [420, 316], [405, 316], [405, 294], [345, 316], [345, 294], [345, 272], [150, 316]];
    const dotLum = dots.map(([x, y]) => +lum(x, y).toFixed(0));
    // control points where no dot should be (between marks on the axis line y=316)
    const gaps = [[600, 316], [480, 316], [250, 316]].map(([x, y]) => +lum(x, y).toFixed(0));
    // dashed mean (x=420) and median (x=405) lines: count inked samples along y
    const lineInk = (x) => { let hit = 0; for (let y = 125; y < 338; y += 2) if (lum(x, y) < 190) hit++; return hit; };
    // mode ring at (345,294) r=26, stroke #b8551d
    const ring = [0, 45, 90, 135, 180, 225, 270, 315].map(a => {
      const rad = a * Math.PI / 180;
      return px(345 + 26 * Math.cos(rad), 294 + 26 * Math.sin(rad));
    });
    // axis tick labels 20/40/60/80/100 at y~358-372
    const band = (x0, x1) => { let ink = 0, n = 0; for (let y = 356; y <= 372; y++) for (let x = x0; x <= x1; x++) { n++; if (lum(x, y) < 140) ink++; } return { ink, n }; };
    return {
      displayed: { w: Math.round(rect.width), h: Math.round(rect.height), dpr: window.devicePixelRatio },
      dotLum, dotThresholdAllDark: dotLum.every(l => l < 100),
      gaps,
      meanLineX420Ink: lineInk(420), medianLineX405Ink: lineInk(405),
      controlLineX500Ink: lineInk(500),
      ring,
      axisLabelBands: { at20: band(708, 732), at40: band(558, 582), at60: band(408, 432), at80: band(258, 282), at100: band(108, 132) },
    };
  });
  console.log(JSON.stringify(res, null, 1));
} finally {
  await browser.close();
}
