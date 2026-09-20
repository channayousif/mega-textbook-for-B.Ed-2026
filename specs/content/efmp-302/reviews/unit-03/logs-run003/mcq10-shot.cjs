const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch();
 const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run003/';
 for(const [name,vp] of [['desktop',{width:1280,height:900}],['narrow',{width:360,height:740}]]){
  const c=await b.newContext({viewport:vp});const p=await c.newPage();
  await p.goto('http://localhost:3103/semester-1/efmp-302/unit-03/unit-assessment',{waitUntil:'networkidle'});
  const h=await p.evaluateHandle(()=>{const hs=[...document.querySelectorAll('h3')];return hs.find(x=>/Restricted-response/i.test(x.textContent));});
  await h.asElement().scrollIntoViewIfNeeded();
  await p.evaluate(()=>window.scrollBy(0,-420));
  await p.waitForTimeout(300);
  await p.screenshot({path:OUT+'mcq10-detached-options-'+name+'.png'});
  // accessibility tree around it
  const info=await p.evaluate(()=>{
   const ol=[...document.querySelectorAll('article ol')][0];
   const last=ol.lastElementChild;
   return {last_item_text:last.textContent.trim(),
     last_item_nested_lists:last.querySelectorAll('ul,ol').length,
     next_sibling_of_ol:ol.nextElementSibling.tagName,
     next_sibling_text:ol.nextElementSibling.textContent.trim().slice(0,200),
     next_next:ol.nextElementSibling.nextElementSibling.tagName+': '+ol.nextElementSibling.nextElementSibling.textContent.trim().slice(0,60)};
  });
  console.log(name,JSON.stringify(info,null,1));
  await c.close();
 }
 await b.close();
})();
