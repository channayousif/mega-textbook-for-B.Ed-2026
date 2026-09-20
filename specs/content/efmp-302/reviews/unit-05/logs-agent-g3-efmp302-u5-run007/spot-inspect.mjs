import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://127.0.0.1:4599', OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/renders-agent-g3-efmp302-u5-run007';
const log=[]; const say=(...a)=>{const s=a.join(' ');log.push(s);console.log(s);};
const b=await chromium.launch();
say('### spot-inspect  run agent-g3-efmp302-u5-run007   '+new Date().toISOString());

// 1. DARK THEME: do the .dark.svg variants actually load and show?
say('\n== 1. DARK THEME figure variants ==');
let c=await b.newContext({viewport:{width:1280,height:900},colorScheme:'dark'});
let p=await c.newPage();
for(const s of ['topic-01/','topic-02/','topic-03/','topic-04/']){
  await p.goto(`${BASE}/semester-1/efmp-302/unit-05/${s}`,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.documentElement.setAttribute('data-theme','dark'));
  await p.waitForTimeout(700);
  const d=await p.evaluate(()=>[...document.querySelectorAll('main img')].map(i=>({src:i.getAttribute('src'),shown:i.getBoundingClientRect().width>0,nat:i.naturalWidth})));
  say(`  ${s}  theme=dark`);
  d.forEach(i=>say(`    ${i.src}  shown=${i.shown} naturalW=${i.nat}`));
  await p.screenshot({path:`${OUT}/dark-${s.replace(/\/$/,'')}.png`,fullPage:true});
}
await c.close();

// 2. unit-assessment rubric tables at 360: exact geometry
say('\n== 2. unit-assessment ERQ rubric tables @360px, exact geometry ==');
c=await b.newContext({viewport:{width:360,height:780},deviceScaleFactor:2,isMobile:true,hasTouch:true});
p=await c.newPage();
await p.goto(`${BASE}/semester-1/efmp-302/unit-05/unit-assessment/`,{waitUntil:'networkidle'});
const t=await p.evaluate(()=>{
  const iw=window.innerWidth, de=document.documentElement;
  return {innerWidth:iw, docScroll:de.scrollWidth, docClient:de.clientWidth,
    bodyScroll:document.body.scrollWidth,
    tables:[...document.querySelectorAll('main table')].map((tb,i)=>{
      const r=tb.getBoundingClientRect(); const w=tb.parentElement; const wr=w.getBoundingClientRect();
      const cells=[...tb.querySelectorAll('th,td')].map(x=>x.getBoundingClientRect().right);
      return {i, tableRight:+r.right.toFixed(1), tableW:+r.width.toFixed(1),
        wrapRight:+wr.right.toFixed(1), wrapOverflowX:getComputedStyle(w).overflowX,
        maxCellRight:+Math.max(...cells).toFixed(1), beyondViewport:+(Math.max(...cells)-iw).toFixed(1)};
    })};
});
say('  innerWidth='+t.innerWidth+' docScrollWidth='+t.docScroll+' docClientWidth='+t.docClient+' bodyScrollWidth='+t.bodyScroll);
t.tables.forEach(x=>say(`  table[${x.i}] width=${x.tableW} right=${x.tableRight} wrapRight=${x.wrapRight} wrapOverflowX=${x.wrapOverflowX} maxCellRight=${x.maxCellRight} beyondViewport=${x.beyondViewport}px`));
await p.screenshot({path:`${OUT}/narrow360-unit-assessment-rubrics.png`,fullPage:true});
await c.close();

// 3. keyboard reachability of a figure carrier at 360
say('\n== 3. figure carrier keyboard reachability @360px (topic-02) ==');
c=await b.newContext({viewport:{width:360,height:780},deviceScaleFactor:2});
p=await c.newPage();
await p.goto(`${BASE}/semester-1/efmp-302/unit-05/topic-02/`,{waitUntil:'networkidle'});
const k=await p.evaluate(async()=>{
  const f=document.querySelector('figure');
  f.focus();
  const focused=document.activeElement===f;
  const before=f.scrollLeft;
  f.scrollLeft=200; const moved=f.scrollLeft!==before;
  return {focused, tabindex:f.getAttribute('tabindex'), role:f.getAttribute('role'), label:f.getAttribute('aria-label'), panWorks:moved,
    figcaption:f.querySelector('figcaption')?.textContent.trim().slice(0,120)||null};
});
say('  '+JSON.stringify(k));
await c.close();

say('\n### finished '+new Date().toISOString());
await b.close();
fs.writeFileSync('/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/logs-agent-g3-efmp302-u5-run007/spot-inspect.log',log.join('\n')+'\n### exit_code: 0\n');
