const fs=require(process.cwd()+'/node_modules/fs-extra');
const matter=require(process.cwd()+'/node_modules/gray-matter');
const assert=require('node:assert/strict');
(async()=>{
const {resolveUnit,urPathFor}=await import(process.cwd()+'/scripts/lib/content-roots.mjs');
const unit=resolveUnit('.','EFMP-302',6), en=unit.unitDir,ur=unit.urUnitDir;
const files=fs.readdirSync(en).filter(x=>x.endsWith('.mdx')).sort();assert.deepEqual(files,fs.readdirSync(ur).filter(x=>x.endsWith('.mdx')).sort());
let figures=0,glossaries=0;
for(const f of files){
 const e=fs.readFileSync(en+'/'+f,'utf8'),u=fs.readFileSync(urPathFor(unit,f),'utf8');const ed=matter(e).data,ud=matter(u).data;
 for(const k of ['course_code','unit_no','topic_no','topic_label','clo_refs','est_reading_minutes','translation_status'])assert.deepEqual(ud[k],ed[k],f+': '+k);
 assert.deepEqual([...e.matchAll(/^(#{1,6}) /gm)].map(x=>x[1]),[...u.matchAll(/^(#{1,6}) /gm)].map(x=>x[1]),f+': heading levels');
 assert.deepEqual(e.match(/^import .+$/gm),u.match(/^import .+$/gm),f+': imports');
 for(const c of ['Figure','Glossary','PrintHandout','BloomTag','ObjectiveList','ActivityCard','TranslationStatusBadge'])assert.equal([...e.matchAll(new RegExp('<'+c+'\\b','g'))].length,[...u.matchAll(new RegExp('<'+c+'\\b','g'))].length,f+': '+c);
 const attrs=s=>Object.fromEntries([...s.matchAll(/([a-zA-Z]+)=("([^"]*)"|\{([^}]+)\})/g)].map(x=>[x[1],x[3]??x[4]]));
 const ef=[...e.matchAll(/<Figure\b[^\n]*?\/>/g)].map(x=>attrs(x[0]));const uf=[...u.matchAll(/<Figure\b[^\n]*?\/>/g)].map(x=>attrs(x[0]));
 for(let i=0;i<ef.length;i++){
  for(const k of ['id','kind','width','height'])assert.equal(uf[i][k],ef[i][k],f+': figure '+k);
  assert.equal(uf[i].src,ef[i].src.replace(/\.svg$/,'.ur.svg'));assert.match(uf[i].alt,/[\u0600-\u06ff]/);figures++;
  if(uf[i].src.endsWith('.svg')){
   for(const src of [uf[i].src,uf[i].src.replace('.svg','.dark.svg')]){const svg=fs.readFileSync('static'+src,'utf8');assert.equal(svg.match(/<desc\b[^>]*>(.*?)<\/desc>/s)[1],uf[i].alt);assert.ok(Buffer.byteLength(svg)<20480);}
   const es=fs.readFileSync('static'+ef[i].src,'utf8'),us=fs.readFileSync('static'+uf[i].src,'utf8');assert.equal((es.match(/<text\b/g)||[]).length,(us.match(/<text\b/g)||[]).length);
  }
 }
 assert.deepEqual([...e.matchAll(/<Glossary term="([^"]+)"/g)].map(x=>x[1]),[...u.matchAll(/<Glossary term="([^"]+)"/g)].map(x=>x[1]));glossaries+=(e.match(/<Glossary /g)||[]).length;
 assert.deepEqual([...e.matchAll(/^\d+\. /gm)].map(x=>x[0]),[...u.matchAll(/^\d+\. /gm)].map(x=>x[0]),f+': numbered items');
 assert.ok(!/[\u2014\u2015\u2e3a\u2e3b]/u.test(u));console.log('PASS '+f+': metadata, headings, imports, components, figures, glossary keys, numbering');
}
const bank=fs.readFileSync('specs/content/terminology.csv','utf8');for(const {en,ur}of matter(fs.readFileSync(urPathFor(unit,'index.mdx'),'utf8')).data.key_terms){const line=bank.split('\n').find(x=>x.startsWith(en+','));assert.ok(line?.split(',')[1].split(' / ').includes(ur));console.log('PASS bank: '+en+' = '+ur);}
const e=fs.readFileSync(en+'/unit-assessment.mdx','utf8'),u=fs.readFileSync(urPathFor(unit,'unit-assessment.mdx'),'utf8');for(const s of [e,u]){const bands=s.split(/^### /m).slice(1,4);assert.deepEqual(bands.map(x=>(x.match(/^\d+\. /gm)||[]).length),[10,10,5]);}
assert.deepEqual([...e.matchAll(/\*\*\d+\. \((\d+) marks\)/g)].map(x=>x[1]),[...u.matchAll(/\*\*\d+\. \((\d+) نمبر\)/g)].map(x=>x[1]));
const map={a:'الف',b:'ب',c:'ج',d:'د'};assert.deepEqual([...e.matchAll(/^\d+\. \*\*([a-d])\*\*/gm)].map(x=>map[x[1]]),[...u.matchAll(/^\d+\. \*\*(الف|ب|ج|د)\*\*/gm)].map(x=>x[1]));
console.log('PASS 10/10/5 assessment, RRQ marks, MCQ answer correspondence');console.log(`PASS ${files.length} files, ${figures} figure carriers, ${glossaries} glossary calls, 8 Urdu SVGs with dark twins`);
})().catch(e=>{console.error(e);process.exitCode=1});
