import { chromium } from 'playwright';
const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/renders-agent-g3-efmp302-u5-run007';
const b=await chromium.launch();
const c=await b.newContext({viewport:{width:360,height:780},deviceScaleFactor:2,isMobile:true});
const p=await c.newPage();
await p.goto('http://127.0.0.1:4599/semester-1/efmp-302/unit-05/unit-assessment/',{waitUntil:'networkidle'});
const tb=p.locator('main table').first();
await tb.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
// viewport-clipped shot: what the reader can actually see
await p.screenshot({path:`${OUT}/narrow360-erq1-rubric-VIEWPORT.png`});
// element shot: the full element, ignoring the viewport
await tb.screenshot({path:`${OUT}/narrow360-erq1-rubric-ELEMENT.png`});
const info=await tb.evaluate(t=>{
  const rows=[...t.querySelectorAll('tr')].map(r=>[...r.children].map(c=>({txt:c.textContent.trim().slice(0,18),l:Math.round(c.getBoundingClientRect().left),r:Math.round(c.getBoundingClientRect().right)})));
  return {rows:rows.slice(0,3), tableBox:t.getBoundingClientRect().toJSON(), layout:getComputedStyle(t).tableLayout, width:getComputedStyle(t).width, minW:getComputedStyle(t).minWidth, display:getComputedStyle(t).display, parentOX:getComputedStyle(t.parentElement).overflowX, parentCls:t.parentElement.className};
});
console.log(JSON.stringify(info,null,1));
await b.close();
