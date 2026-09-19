import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://127.0.0.1:4599';
const log=[];const say=(...a)=>{const s=a.join(' ');log.push(s);console.log(s);};
const b=await chromium.launch();
const c=await b.newContext({viewport:{width:360,height:780},deviceScaleFactor:2,isMobile:true});
const p=await c.newPage();
say('### table-clip sweep @360px viewport, EFMP-302 Unit 5, run agent-g3-efmp302-u5-run007');
say('### '+new Date().toISOString());
for(const s of ['topic-01/','topic-02/','topic-03/','topic-04/','unit-assessment/','unit-teacher-notes/']){
  await p.goto(`${BASE}/semester-1/efmp-302/unit-05/${s}`,{waitUntil:'networkidle'});
  const d=await p.evaluate(()=>{
    const iw=window.innerWidth;
    const docScrollable=document.documentElement.scrollWidth>document.documentElement.clientWidth;
    return {iw,docScrollable,tables:[...document.querySelectorAll('main table')].map((t,i)=>{
      const cells=[...t.querySelectorAll('th,td')];
      const off=cells.filter(x=>x.getBoundingClientRect().left>=iw-1);
      const cut=cells.filter(x=>{const r=x.getBoundingClientRect();return r.left<iw-1&&r.right>iw+1;});
      const w=t.parentElement;
      return {i,cols:t.querySelectorAll('tr:first-child > *').length,
        firstRowHeaders:[...t.querySelectorAll('tr:first-child > *')].map(h=>h.textContent.trim().slice(0,16)),
        wrapScrollable:w.scrollWidth>w.clientWidth, wrapOverflowX:getComputedStyle(w).overflowX,
        cellsFullyOffScreen:off.length, cellsCutMidway:cut.length,
        maxRight:Math.round(Math.max(...cells.map(x=>x.getBoundingClientRect().right)))};
    })};
  });
  say(`\n-- ${s} innerWidth=${d.iw} documentHorizontallyScrollable=${d.docScrollable}`);
  d.tables.forEach(t=>{
    const verdict=(t.cellsFullyOffScreen>0||t.cellsCutMidway>0)&&!t.wrapScrollable&&!d.docScrollable?'UNREACHABLE CONTENT':'ok';
    say(`   table[${t.i}] cols=${t.cols} headers=${JSON.stringify(t.firstRowHeaders)}`);
    say(`      maxCellRight=${t.maxRight}px wrapScrollable=${t.wrapScrollable} overflowX=${t.wrapOverflowX} cellsFullyOffScreen=${t.cellsFullyOffScreen} cellsCutMidway=${t.cellsCutMidway} -> ${verdict}`);
  });
}
say('\n### finished '+new Date().toISOString());
await b.close();
fs.writeFileSync('/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/logs-agent-g3-efmp302-u5-run007/table-clip-sweep.log',log.join('\n')+'\n### exit_code: 0\n');
