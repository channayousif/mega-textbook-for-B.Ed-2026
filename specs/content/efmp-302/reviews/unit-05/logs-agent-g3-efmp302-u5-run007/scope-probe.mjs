import { chromium } from 'playwright';
import fs from 'node:fs';
const log=[];const say=(...a)=>{const s=a.join(' ');log.push(s);console.log(s);};
const b=await chromium.launch();
const c=await b.newContext({viewport:{width:360,height:780},deviceScaleFactor:2,isMobile:true});
const p=await c.newPage();
say('### scope probe: is the 4-column rubric clip Unit-5-specific? @360px');
say('### run agent-g3-efmp302-u5-run007  '+new Date().toISOString());
say('### Recorded only to scope the repair. Other units are NOT under review here.');
for(const u of ['unit-01','unit-02','unit-03','unit-04','unit-05','unit-06']){
  const url=`http://127.0.0.1:4599/semester-1/efmp-302/${u}/unit-assessment/`;
  const resp=await p.goto(url,{waitUntil:'networkidle'}).catch(()=>null);
  if(!resp||!resp.ok()){say(`  ${u}: no unit-assessment page (${resp?resp.status():'error'})`);continue;}
  const d=await p.evaluate(()=>{
    const iw=window.innerWidth;
    const t=[...document.querySelectorAll('main table')];
    const bad=t.filter(x=>[...x.querySelectorAll('th,td')].some(cc=>cc.getBoundingClientRect().right>iw+1));
    return {tables:t.length,bad:bad.length,docScroll:document.documentElement.scrollWidth>document.documentElement.clientWidth,
      maxRight:t.length?Math.round(Math.max(...t.flatMap(x=>[...x.querySelectorAll('th,td')].map(cc=>cc.getBoundingClientRect().right)))):0};
  });
  say(`  ${u}: tables=${d.tables} tablesWithOffscreenCells=${d.bad} maxCellRight=${d.maxRight}px docHorizScroll=${d.docScroll}`);
}
say('\n### finished '+new Date().toISOString());
await b.close();
fs.writeFileSync('/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/logs-agent-g3-efmp302-u5-run007/scope-probe.log',log.join('\n')+'\n### exit_code: 0\n');
