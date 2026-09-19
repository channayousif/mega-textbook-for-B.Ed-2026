const { chromium } = require('playwright');
const fs = require('fs');
const BASE='http://localhost:3103/semester-1/efmp-302/unit-03/';
const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run003/';
const PAGES=['index','topic-01','topic-02','topic-03','topic-04','topic-05','unit-assessment','unit-teacher-notes'];
(async()=>{
  const browser=await chromium.launch();
  const report={host:'http://localhost:3103 (npm run serve, build/ dir, commit cf13570)',
    browser:'chromium '+browser.version(), started:new Date().toISOString(), pages:{}};
  for(const p of PAGES){
    const ctx=await browser.newContext({viewport:{width:1280,height:900},deviceScaleFactor:1});
    const page=await ctx.newPage();
    const resp=await page.goto(BASE+p,{waitUntil:'networkidle'});
    const rec={status:resp.status(),url:page.url()};
    // headings
    rec.headings=await page.$$eval('article h1,article h2,article h3,article h4',els=>els.map(e=>e.tagName+': '+e.textContent.trim().slice(0,80)));
    let lvl=0,skips=[];
    for(const h of rec.headings){const n=+h[1]; if(lvl&&n>lvl+1)skips.push(h); lvl=n;}
    rec.heading_skips=skips;
    // links
    rec.bad_links=await page.$$eval('article a',els=>els.filter(a=>{const t=(a.textContent||'').trim().toLowerCase();return ['here','click here','link','read more','this'].includes(t);}).map(a=>a.textContent.trim()+' -> '+a.getAttribute('href')));
    // figures
    rec.figures=await page.$$eval('article figure',els=>els.map(f=>{const i=f.querySelector('img');return {alt:i?i.getAttribute('alt'):null,src:i?i.getAttribute('src'):null,loading:i?i.getAttribute('loading'):null,complete:i?i.complete:null,nw:i?i.naturalWidth:0,caption:(f.querySelector('figcaption')||{}).textContent||null};}));
    rec.img_missing_alt=await page.$$eval('article img',els=>els.filter(i=>i.getAttribute('alt')===null).length);
    // lists in assessment
    if(p==='unit-assessment'){
      rec.mcq=await page.evaluate(()=>{
        const hs=[...document.querySelectorAll('article h2,article h3')];
        const h=hs.find(x=>/Multiple-choice/i.test(x.textContent));
        if(!h)return {found:false};
        let n=h.nextElementSibling; let ol=null;
        while(n&&!/^H[23]$/.test(n.tagName)){ if(n.tagName==='OL'){ol=n;break;} const inner=n.querySelector&&n.querySelector('ol'); if(inner){ol=inner;break;} n=n.nextElementSibling;}
        if(!ol)return {found:false};
        const items=[...ol.children];
        return {found:true, item_count:items.length,
          per_item:items.map((li,i)=>{
            const nested=li.querySelectorAll(':scope > ul > li, :scope > ol > li');
            return {n:i+1, nested_options:nested.length, option_text:[...nested].map(x=>x.textContent.trim()),
              stem:(li.querySelector(':scope > p')||{textContent:''}).textContent.trim().slice(0,160)};
          }),
          total_options:items.reduce((a,li)=>a+li.querySelectorAll(':scope > ul > li, :scope > ol > li').length,0)};
      });
      rec.tables=await page.$$eval('article table',els=>els.map(t=>{const w=t.closest('[data-scrollable],div');return {cols:t.querySelectorAll('thead th').length,rows:t.querySelectorAll('tbody tr').length};}));
    }
    await page.screenshot({path:OUT+p+'-desktop.png',fullPage:false});
    // narrow
    await page.setViewportSize({width:360,height:740});
    await page.waitForTimeout(400);
    rec.narrow_doc_overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    rec.narrow_overflowing=await page.evaluate(()=>[...document.querySelectorAll('article *')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1&&getComputedStyle(e).overflowX!=='auto'&&getComputedStyle(e).overflowX!=='scroll').slice(0,8).map(e=>e.tagName+'.'+(e.className||'').toString().slice(0,40)+' right='+Math.round(e.getBoundingClientRect().right)));
    rec.narrow_scroll_containers=await page.$$eval('article [data-scrollable="true"], article .tableWrapper, article table',els=>els.map(e=>({tag:e.tagName,sw:e.scrollWidth,cw:e.clientWidth,tabindex:e.getAttribute('tabindex'),role:e.getAttribute('role'),label:e.getAttribute('aria-label')})));
    await page.screenshot({path:OUT+p+'-narrow.png',fullPage:false});
    // print
    await page.setViewportSize({width:1280,height:900});
    await page.emulateMedia({media:'print'});
    await page.waitForTimeout(300);
    rec.print_hidden_figures=await page.$$eval('article figure',els=>els.filter(f=>{const s=getComputedStyle(f);return s.display==='none'||s.visibility==='hidden'||f.getBoundingClientRect().height===0;}).length);
    rec.print_figure_count=await page.$$eval('article figure',e=>e.length);
    rec.print_clipped=await page.evaluate(()=>[...document.querySelectorAll('article table, article pre, article figure')].filter(e=>e.getBoundingClientRect().width>794).map(e=>e.tagName+' w='+Math.round(e.getBoundingClientRect().width)));
    await page.screenshot({path:OUT+p+'-print.png',fullPage:false});
    await page.pdf({path:OUT+p+'-a4.pdf',format:'A4',printBackground:true});
    await page.emulateMedia({media:'screen'});
    report.pages[p]=rec;
    await ctx.close();
    console.log('done',p,resp.status());
  }
  report.completed=new Date().toISOString();
  await browser.close();
  fs.writeFileSync(OUT+'inspection.json',JSON.stringify(report,null,1));
  console.log('WROTE inspection.json');
})();
