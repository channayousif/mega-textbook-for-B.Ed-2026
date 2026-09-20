import { chromium } from '/home/a2ahs/mega_book_for_B.Ed/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run004';
const BASE='http://localhost:3103/semester-1/efmp-302/unit-03';
const pages=['','/topic-01','/topic-02','/topic-03','/topic-04','/topic-05','/unit-assessment','/unit-teacher-notes'];
const b=await chromium.launch();
console.log('engine: chromium', b.version());
const report={host:BASE, engine:'chromium '+b.version(), started:new Date().toISOString(), pages:{}};

// ---- desktop 1280x900 ----
for(const vp of [{w:1280,h:900,tag:'desktop'},{w:360,h:740,tag:'narrow'}]){
  const ctx=await b.newContext({viewport:{width:vp.w,height:vp.h}});
  const p=await ctx.newPage();
  for(const path of pages){
    const url=BASE+path; const r=await p.goto(url,{waitUntil:'networkidle'});
    const name=path.replace('/','')||'index';
    const d=await p.evaluate(()=>{
      const main=document.querySelector('.theme-doc-markdown')||document.body;
      // heading skips
      const hs=[...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>+h.tagName[1]);
      let skips=0; for(let i=1;i<hs.length;i++) if(hs[i]-hs[i-1]>1) skips++;
      const badLinks=[...main.querySelectorAll('a')].filter(a=>/^(here|click here|read more|link|this)$/i.test(a.textContent.trim())).length;
      const imgs=[...main.querySelectorAll('img')];
      const noAlt=imgs.filter(i=>!i.hasAttribute('alt')||!i.getAttribute('alt').trim()).length;
      const figs=[...main.querySelectorAll('figure')].map(f=>({alt:(f.querySelector('img')||{}).alt||null, lazy:(f.querySelector('img')||{}).loading||null, caption:(f.querySelector('figcaption')||{}).textContent||null}));
      const overflow=document.documentElement.scrollWidth-document.documentElement.clientWidth;
      // MCQ analysis: the first OL after the MCQ heading
      let mcq=null;
      const h=[...main.querySelectorAll('h3')].find(x=>/multiple/i.test(x.textContent));
      if(h){ let n=h.nextElementSibling; while(n&&n.tagName!=='OL') n=n.nextElementSibling;
        if(n){ const items=[...n.children];
          mcq={item_count:items.length,
            per_item:items.map((li,i)=>({n:i+1, stem:li.firstChild?li.textContent.split('\n')[0].slice(0,60):'', nested_lists:li.querySelectorAll('ul,ol').length, options:li.querySelectorAll('ul > li, ol > li').length})),
            total_options:items.reduce((s,li)=>s+li.querySelectorAll('ul > li').length,0),
            next_sibling_tag:n.nextElementSibling?n.nextElementSibling.tagName:null,
            next_sibling_text:n.nextElementSibling?n.nextElementSibling.textContent.slice(0,120):null};
        }}
      return {skips,badLinks,imgCount:imgs.length,noAlt,figs,overflow,mcq};
    });
    report.pages[name]=report.pages[name]||{};
    report.pages[name][vp.tag]={status:r.status(),...d};
    await p.screenshot({path:`${OUT}/${name}-${vp.tag}.png`,fullPage:false});
  }
  await ctx.close();
}

// ---- print / A4 ----
const ctx=await b.newContext({viewport:{width:794,height:1123}});
const p=await ctx.newPage();
await p.emulateMedia({media:'print'});
for(const path of pages){
  const name=path.replace('/','')||'index';
  await p.goto(BASE+path,{waitUntil:'networkidle'});
  const d=await p.evaluate(()=>{
    const els=[...document.querySelectorAll('table,figure,pre,img')];
    const wide=els.filter(e=>e.getBoundingClientRect().width>794).map(e=>e.tagName);
    const hiddenFigs=[...document.querySelectorAll('figure')].filter(f=>{const r=f.getBoundingClientRect();const s=getComputedStyle(f);return r.height===0||s.display==='none'||s.visibility==='hidden';}).length;
    const ans=[...document.querySelectorAll('h2,h3')].find(h=>/answers|marking/i.test(h.textContent));
    return {wide_count:wide.length,wide,hiddenFigs,answers_heading:ans?ans.textContent:null,answers_visible:ans?ans.getBoundingClientRect().height>0:null};
  });
  report.pages[name].a4print={...d};
  await p.screenshot({path:`${OUT}/${name}-a4print.png`,fullPage:false});
  await p.pdf({path:`${OUT}/${name}-a4.pdf`,format:'A4',printBackground:true});
}
await ctx.close(); await b.close();
report.finished=new Date().toISOString();
fs.writeFileSync(`${OUT}/inspection.json`,JSON.stringify(report,null,1));
console.log('MCQ desktop:',JSON.stringify(report.pages['unit-assessment'].desktop.mcq,null,1));
console.log('MCQ narrow total_options:',report.pages['unit-assessment'].narrow.mcq.total_options);
console.log('overflow(narrow):',Object.entries(report.pages).map(([k,v])=>k+'='+v.narrow.overflow).join(' '));
console.log('skips:',Object.entries(report.pages).map(([k,v])=>k+'='+v.desktop.skips).join(' '));
console.log('noAlt:',Object.entries(report.pages).map(([k,v])=>k+'='+v.desktop.noAlt).join(' '));
console.log('badLinks:',Object.entries(report.pages).map(([k,v])=>k+'='+v.desktop.badLinks).join(' '));
console.log('a4 wide:',Object.entries(report.pages).map(([k,v])=>k+'='+v.a4print.wide_count).join(' '));
console.log('a4 hiddenFigs:',Object.entries(report.pages).map(([k,v])=>k+'='+v.a4print.hiddenFigs).join(' '));
console.log('answers print:',JSON.stringify(report.pages['unit-assessment'].a4print));
console.log('figs per page:',Object.entries(report.pages).map(([k,v])=>k+'='+v.desktop.figs.length).join(' '));
