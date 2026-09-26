// G5: A4 print emulation behaviour for the Urdu topic pages.
import { chromium } from 'playwright-core';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.emulateMedia({ media: 'print' });
await page.goto('http://localhost:3217/ur/semester-1/efmp-301/unit-06/topic-01', { waitUntil: 'networkidle' });
const r = await page.evaluate(() => {
  const nav = document.querySelector('navbar, .navbar, header.navbar');
  const sidebar = document.querySelector('.theme-doc-sidebar-container, aside');
  const imgs = [...document.querySelectorAll('img')].filter((i) => i.src.includes('fig-U6')).map((i) => ({
    src: i.src.split('/').pop(),
    display: getComputedStyle(i).display,
    visible: i.offsetParent !== null,
  }));
  const figWrap = document.querySelector('figure, [class*="figure"]');
  return {
    navDisplay: nav ? getComputedStyle(nav).display : 'none-found',
    sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : 'none-found',
    imgs,
    figBreakInside: figWrap ? getComputedStyle(figWrap).breakInside : null,
    dir: document.documentElement.dir,
  };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
