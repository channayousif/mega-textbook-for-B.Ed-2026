import { chromium } from '/home/a2ahs/mega_book_for_B.Ed/node_modules/playwright/index.mjs';
const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run004';
const b=await chromium.launch();
for(const vp of [{w:1280,h:900,t:'desktop'},{w:360,h:740,t:'narrow'}]){
 const ctx=await b.newContext({viewport:{width:vp.w,height:vp.h}});
 const p=await ctx.newPage();
 await p.goto('http://localhost:3103/semester-1/efmp-302/unit-03/unit-assessment',{waitUntil:'networkidle'});
 const info=await p.evaluate(()=>{
   const h=[...document.querySelectorAll('h3')].find(x=>/multiple/i.test(x.textContent));
   let n=h.nextElementSibling; while(n&&n.tagName!=='OL') n=n.nextElementSibling;
   const li=n.children[n.children.length-1];
   return {last_item_text:li.textContent.trim().replace(/\s+/g,' ').slice(0,300),
     last_item_nested:li.querySelectorAll('ul').length,
     last_item_options:[...li.querySelectorAll('ul > li')].map(o=>o.textContent.trim()),
     ol_next:n.nextElementSibling.tagName+' :: '+n.nextElementSibling.textContent.trim().slice(0,60)};
 });
 console.log('['+vp.t+']', JSON.stringify(info,null,1));
 const li=p.locator('ol > li').nth(9);
 await li.scrollIntoViewIfNeeded();
 await li.screenshot({path:`${OUT}/mcq10-nested-options-${vp.t}.png`});
 await ctx.close();
}
// figcaptions + alt across topic pages
const ctx=await b.newContext({viewport:{width:1280,height:900}});
const p=await ctx.newPage();
for(const t of ['topic-01','topic-02','topic-03','topic-04','topic-05']){
 await p.goto('http://localhost:3103/semester-1/efmp-302/unit-03/'+t,{waitUntil:'networkidle'});
 const f=await p.evaluate(()=>[...document.querySelectorAll('figure')].map(x=>({src:(x.querySelector('img')||{}).getAttribute?x.querySelector('img').getAttribute('src'):null,alt:x.querySelector('img').getAttribute('alt'),loading:x.querySelector('img').getAttribute('loading'),caption:(x.querySelector('figcaption')||{textContent:'(none)'}).textContent.trim()})));
 console.log(t, JSON.stringify(f));
}
await ctx.close(); await b.close();
