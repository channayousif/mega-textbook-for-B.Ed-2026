const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch();
 const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run003/';
 const out={};
 for(const p of ['topic-01','topic-02','topic-03','topic-04','topic-05','unit-assessment']){
  const c=await b.newContext({viewport:{width:360,height:740}});const pg=await c.newPage();
  await pg.goto('http://localhost:3103/semester-1/efmp-302/unit-03/'+p,{waitUntil:'networkidle'});
  out[p]={};
  out[p].narrow_figures=await pg.$$eval('article figure',els=>els.map(f=>{
    const img=f.querySelector('img:not([style*="display: none"])');
    const box=f.getBoundingClientRect();
    const cs=getComputedStyle(f);
    const inner=img?getComputedStyle(img.parentElement):null;
    return {fig_w:Math.round(box.width), overflowX:cs.overflowX,
      inner_overflowX:inner?inner.overflowX:null,
      img_w:img?Math.round(img.getBoundingClientRect().width):null,
      img_natural:img?img.naturalWidth:null, complete:img?img.complete:null,
      alt:img?img.getAttribute('alt').slice(0,60):null,
      clipped: img? (img.getBoundingClientRect().width > box.width+1) : null};
  }));
  // A4 print width measurement
  await pg.setViewportSize({width:794,height:1123});
  await pg.emulateMedia({media:'print'});
  await pg.waitForTimeout(300);
  out[p].a4_print=await pg.evaluate(()=>{
   const cw=document.documentElement.clientWidth;
   const wide=[...document.querySelectorAll('article table, article figure, article pre, article img')]
     .filter(e=>e.getBoundingClientRect().width>cw+1)
     .map(e=>e.tagName+' w='+Math.round(e.getBoundingClientRect().width)+' vs '+cw);
   const hidden=[...document.querySelectorAll('article figure')].filter(f=>{const s=getComputedStyle(f);return s.display==='none'||f.getBoundingClientRect().height===0;}).length;
   return {client_width:cw, wider_than_page:wide, hidden_figures:hidden,
     figures:document.querySelectorAll('article figure').length,
     answers_visible: !![...document.querySelectorAll('h2,h3')].find(h=>/Answers and marking/i.test(h.textContent)&&getComputedStyle(h).display!=='none')};
  });
  await pg.screenshot({path:OUT+p+'-a4print.png'});
  await c.close();
 }
 console.log(JSON.stringify(out,null,1));
 await b.close();
})();
