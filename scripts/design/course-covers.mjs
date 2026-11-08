#!/usr/bin/env node
/**
 * Course covers (redesign PR 4). Writes one SVG per course in catalog/courses.json to
 * static/img/covers/<code>.svg, so the catalogue shows a cover for every course,
 * including new ones. Each motif is hand-drawn from the course's real title, with no
 * text, maps or flags (ADR-0033). A course without its own motif gets its family's
 * fallback. Runs before every build and start; output is git-ignored.
 *
 *   node scripts/design/course-covers.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const T = '#123E43', T3 = '#2F7C80', A = '#E5A333';
// One motif per course, chosen from its real catalogue title. No text in any cover.
const F3=T3,F4='#3F9498',PA='#F8F5EF';
const line=(d,c=A,w=5)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"></path>`;
const dot=(x,y,r,c=A)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"></circle>`;
const person=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-34" r="10" fill="${c}"></circle><path d="M-17 0a17 20 0 0 1 34 0z" fill="${c}"></path></g>`;
const COVER={
 // Educational Psychology: a mind, connected ideas, a thought forming
 'EFMP-301':()=>{const N=[[128,72],[160,50],[196,72],[160,96],[122,108],[192,110]],E=[[0,1],[1,2],[0,3],[1,3],[2,3],[0,4],[3,4],[3,5],[2,5]];return `<path d="M122 180V146C94 134 80 108 84 80 88 44 122 20 160 22c42 2 72 32 72 70 0 6 8 16 13 25 2 4-1 7-8 8l-5 1v14c0 11-8 16-19 16l-19-3v27z" fill="${F3}"></path>${E.map(([a,b])=>line(`M${N[a]}L${N[b]}`,PA,3)).join('')}${N.map(([x,y],i)=>dot(x,y,i===1||i===5?8:6,i===1||i===5?A:PA)).join('')}${dot(262,74,7,A)}${dot(280,52,10,A)}<ellipse cx="292" cy="24" rx="20" ry="14" fill="${A}"></ellipse>`;},
 // Teaching Profession: a teacher at the board
 'EFMP-302':()=>`<rect x="96" y="26" width="196" height="108" rx="6" fill="${F3}"></rect><rect x="96" y="26" width="196" height="108" rx="6" fill="none" stroke="${A}" stroke-width="5"></rect>${line('M120 62h80M120 84h120M120 106h56',PA,5)}${person(58,180,1.900,PA)}${line('M84 112L118 84',A,6)}`,
 // Educational Policies and Plans: policy pages and a plan with milestones
 'EFMP-303':()=>`<rect x="44" y="30" width="108" height="130" rx="6" fill="${F4}"></rect><rect x="58" y="18" width="108" height="130" rx="6" fill="${PA}"></rect>${line('M74 44h76M74 62h76M74 80h48',T3,5)}${line('M78 118l10 10 20-22',A,6)}${line('M186 132H292',F4,6)}${[186,222,258,292].map((x,i)=>dot(x,132-i*0,i<3?11:11,i<3?A:F4)).join('')}${line('M186 132V76h44',F4,5)}${line('M230 66l14 10-14 10z',A,4)}`,
 // Critical Thinking and Reflective Practices: an idea and its reflection, examined
 'EFMP-304':()=>`<path d="M0 104H320" stroke="${PA}" stroke-width="3" stroke-dasharray="14 10"></path><path d="M140 88a34 34 0 1 1 40 0v12h-40z" fill="${A}"></path>${line('M146 100h28',T,4)}<path d="M140 120a34 34 0 1 0 40 0v-12h-40z" fill="${F3}"></path><circle cx="244" cy="58" r="24" fill="none" stroke="${PA}" stroke-width="7"></circle>${line('M262 76l22 22',PA,8)}${line('M64 44c0-14 24-14 24 2 0 10-12 10-12 22',PA,6)}${dot(76,84,4,PA)}`,
 // Inclusive Education: everyone in the circle, including a wheelchair user
 'EFMP-305':()=>{const P=[0,1,2,3,4,5].map(i=>[160+92*Math.cos(i*Math.PI/3-Math.PI/2),92+66*Math.sin(i*Math.PI/3-Math.PI/2)]);return `<ellipse cx="160" cy="92" rx="92" ry="66" fill="none" stroke="${F3}" stroke-width="6"></ellipse>${P.map(([x,y],i)=>i===3?'':person(x,y+22,i%2?.8:.95,i===0?A:PA)).join('')}<g transform="translate(160 150)"><circle cx="-4" cy="-30" r="7" fill="${A}"></circle>${line('M-5 -20v14h15l6 12',A,5)}<circle cx="-5" cy="2" r="13" fill="none" stroke="${A}" stroke-width="4.500"></circle></g><path transform="translate(0 -30)" d="M160 104c-7-11-22-5-16 7 3 6 10 10 16 15 6-5 13-9 16-15 6-12-9-18-16-7z" fill="${A}"></path>`;},
 // Contemporary Literacies: book, screen and signal together
 'EFMP-406':()=>`<path d="M160 56c-22-14-50-18-90-14v104c40-4 68 0 90 14 22-14 50-18 90-14V42c-40-4-68 0-90 14z" fill="${F3}"></path>${line('M160 56v104',PA,4)}<rect x="176" y="62" width="56" height="84" rx="8" fill="${PA}"></rect>${line('M186 84h36M186 100h36M186 116h20',T3,5)}${line('M92 76c14 0 28 2 46 8M92 100c14 0 28 2 46 8',PA,5)}${line('M262 62a34 34 0 0 1 28 28M262 38a58 58 0 0 1 50 50',A,6)}${dot(262,88,6,A)}`,
 // Functional English: conversation with a letter
 'GENG-300':()=>`<path d="M36 26h130a20 20 0 0 1 20 20v48a20 20 0 0 1-20 20H96l-30 30v-30H36a20 20 0 0 1-20-20V46a20 20 0 0 1 20-20z" fill="${F3}"></path>${line('M72 94l28-54 28 54M82 76h36',PA,8)}<path d="M196 74h86a18 18 0 0 1 18 18v38a18 18 0 0 1-18 18h-8v24l-26-24h-52a18 18 0 0 1-18-18V92a18 18 0 0 1 18-18z" fill="${A}"></path>${line('M202 100h66M202 122h40',T,6)}`,
 // Expository Writing: a nib writing structured lines
 'GENG-301':()=>`<rect x="44" y="20" width="170" height="160" rx="6" fill="${PA}"></rect>${line('M66 50h126M66 76h126M66 102h126M66 128h70',T3,6)}<g transform="rotate(35 230 90)"><path d="M216 10h28v94l-14 30-14-30z" fill="${A}"></path>${line('M230 134v-28',T,3)}${line('M216 30h28',T,4)}</g>`,
 // Application of ICT: a laptop and connected devices
 'GICT-300':()=>`<rect x="86" y="52" width="148" height="92" rx="8" fill="${F3}"></rect><path d="M64 144h192l14 18H50z" fill="${PA}"></path>${line('M136 82l-22 16 22 16M184 82l22 16-22 16',A,6)}${line('M26 50h40v40M294 50h-40v40M160 52V24',F4,4)}${dot(26,50,9)}${dot(294,50,9)}${dot(160,20,9)}`,
 // Environmental Science: tree, sun and water
 'GNAS-301':()=>`${dot(250,50,28)}<path d="M0 140c40-16 70 14 110 0s70-14 110 0 70 12 100 0v40H0z" fill="${F4}"></path><rect x="118" y="86" width="16" height="64" fill="${PA}"></rect><path d="M126 16c44 0 60 34 52 62-6 20-30 26-52 26s-46-6-52-26c-8-28 8-62 52-62z" fill="${F3}"></path>${line('M126 104V58M126 78l-20-18M126 68l18-16',PA,5)}`,
 // Quantitative Reasoning I: graph, operators and working
 'GQUR-300':()=>`${line('M44 22V156H200',PA,5)}${line('M44 132l40-28 34 14 62-74',A,6)}${[84,118,180].map((x,i)=>dot(x,[104,118,44][i],7,PA)).join('')}${line('M232 40h44M254 18v44',A,8)}${line('M232 92h44',PA,8)}${line('M236 124l36 36M272 124l-36 36',F4,8)}`,
 // Quantitative Reasoning II, Statistics: a distribution over its bars
 'GQUR-301':()=>{const H=[18,44,82,112,82,44,18];return `${H.map((h,i)=>`<rect x="${58+i*30}" y="${160-h}" width="24" height="${h}" rx="3" fill="${i===3?A:F3}"></rect>`).join('')}${line('M36 160C96 158 118 34 160 34s64 124 124 126',PA,5)}${line('M160 24V168',PA,2)}${line('M30 160H290',PA,4)}`;},
 // Social Science (Sociology): people connected in a community
 'GSOS-301':()=>{const N=[[70,66],[160,50],[250,66],[110,132],[210,132]];return `${[[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[3,4]].map(([a,b])=>line(`M${N[a]}L${N[b]}`,F4,3)).join('')}${N.map(([x,y],i)=>person(x,y+16,.9,i===1?A:PA)).join('')}`;},
 // Pakistan Studies: heritage arcade. No maps or flags (ADR-0033 and figure house rules).
 'GPKS-402':()=>{let o='';for(let i=0;i<4;i++){const x=20+i*72;o+=`<path d="M${x} 180V96a32 32 0 0 1 64 0v84" fill="${i===2?A:F3}"></path>`;}return o+line('M0 40h320',F3,5)+line('M0 56h320',F3,2);},
 // Islamic Studies: geometric tilework framing an arch
 'GISS-401':()=>{let o='';for(let i=0;i<5;i++)for(let j=0;j<3;j++){const x=-2+i*81,y=30+j*60;o+=`<g transform="translate(${x} ${y})"><rect x="-20" y="-20" width="40" height="40" fill="none" stroke="${F3}" stroke-width="3"></rect><rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" fill="none" stroke="${F3}" stroke-width="3"></rect></g>`;}return o+`<path d="M108 180V96c0-32 26-48 52-68 26 20 52 36 52 68v84z" fill="${T}" stroke="${A}" stroke-width="6"></path>`;},
};
// Courses added after the boards, drawn from their catalogue titles.
Object.assign(COVER, {
 // Ideology and Constitution of Pakistan: a pillared hall over a sealed charter
 'GICP-400':()=>`<path d="M80 70L160 30l80 40z" fill="${A}"></path>${[96,136,176,216].map((x)=>`<rect x="${x-8}" y="78" width="16" height="70" rx="3" fill="${PA}"></rect>`).join('')}<rect x="70" y="148" width="180" height="14" rx="3" fill="${F4}"></rect>${line('M70 74h180',PA,5)}${dot(160,56,7,T)}`,
 // Education for Sustainable Development: a sprout inside a loop of arrows
 'EFMP-407':()=>`<path d="M160 150V96" stroke="${PA}" stroke-width="7" stroke-linecap="round"></path><path d="M160 104c-30 0-44-20-44-42 26 0 44 14 44 42zM160 92c0-26 16-40 42-40 0 26-16 40-42 40z" fill="${A}"></path>${line('M90 96a70 60 0 0 1 120-46',F4,6)}${line('M230 96a70 60 0 0 1-120 46',F4,6)}<path d="M206 36l8 18-20 2z" fill="${F4}"></path><path d="M114 156l-8-18 20-2z" fill="${F4}"></path>`,
 // Teaching of English: a board and a speech bubble answering it
 'EFPG-401':()=>`<rect x="40" y="30" width="150" height="100" rx="6" fill="${F3}"></rect>${line('M62 62h80M62 86h106M62 110h60',PA,6)}<path d="M206 70h70a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14h-36l-22 20v-20h-12a14 14 0 0 1-14-14V84a14 14 0 0 1 14-14z" fill="${A}"></path>${line('M220 94h48M220 112h30',T,5)}${line('M40 150h150',PA,5)}`,
 // Fehm-e-Quran: an open book resting on a rehal, without script
 'GUHQ-301':()=>`<path d="M160 74c-26-14-58-18-96-14v62c38-4 70 0 96 14 26-14 58-18 96-14V60c-38-4-70 0-96 14z" fill="${PA}"></path>${line('M160 74v62',T3,4)}${line('M86 82c22-2 44 2 60 8M86 100c22-2 44 2 60 8M174 90c16-6 38-10 60-8M174 108c16-6 38-10 60-8',F4,3)}${line('M96 132l128 40M224 132L96 172',A,8)}`,
 // Educational Assessment and Evaluation: a clipboard checklist and a score bar
 'EFMP-408':()=>`<rect x="84" y="26" width="128" height="148" rx="8" fill="${PA}"></rect><rect x="122" y="16" width="52" height="20" rx="6" fill="${A}"></rect>${[62,96,130].map((y,i)=>`${i<2?line(`M102 ${y}l8 8 14-16`,T3,5):`<rect x="100" y="${y-10}" width="20" height="20" rx="4" fill="none" stroke="${T3}" stroke-width="4"></rect>`}${line(`M136 ${y}h56`,F4,6)}`).join('')}<rect x="232" y="60" width="18" height="100" rx="4" fill="${F3}"></rect><rect x="232" y="96" width="18" height="64" rx="4" fill="${A}"></rect>`,
 // Teaching of Arts, Craft and Calligraphy: a reed pen's sweep and a brush
 'EFPG-607':()=>`<path d="M40 130c40-60 90-80 140-40s90 20 110-30" fill="none" stroke="${PA}" stroke-width="14" stroke-linecap="round"></path><path d="M40 130c40-60 90-80 140-40" fill="none" stroke="${A}" stroke-width="6" stroke-linecap="round"></path><g transform="rotate(-35 230 120)"><rect x="222" y="60" width="16" height="86" rx="4" fill="${F4}"></rect><path d="M222 146h16l-8 28z" fill="${A}"></path></g>${dot(84,158,10,F4)}${dot(110,166,7,A)}`,
});

// Family fallbacks for future courses: professional (EF*) and general (G*).
const FALLBACK = {
  EF: () => `<path d="M60 160H120V130H180V100H240V70H290" fill="none" stroke="${A}" stroke-width="6"></path><path d="M60 160H120V130H180V100H240V70H290V180H60z" fill="${F3}" opacity=".6"></path>`,
  G: () => `${line('M60 140c40-50 80-50 100 0s60 50 100 0',PA,6)}${dot(160,70,16)}`,
};

const BG = ['#123E43', '#1B5A60', '#0F3338', '#215E5A'];
function cover(code, i) {
  const draw = COVER[code] || (code.startsWith('EF') ? FALLBACK.EF : FALLBACK.G);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" aria-hidden="true"><rect width="320" height="180" fill="${BG[i % 4]}"/>${draw()}</svg>\n`;
}

const catalog = JSON.parse(readFileSync(join(ROOT, 'catalog/courses.json'), 'utf8'));
const codes = [];
(function walk(o) {
  if (Array.isArray(o)) { o.forEach(walk); return; }
  if (o && typeof o === 'object') {
    if (o.code && o.title_en && !codes.includes(o.code)) codes.push(o.code);
    Object.values(o).forEach(walk);
  }
})(catalog);

const out = join(ROOT, 'static/img/covers');
mkdirSync(out, { recursive: true });
codes.forEach((code, i) => writeFileSync(join(out, `${code.toLowerCase()}.svg`), cover(code, i)));
const missing = codes.filter((c) => !COVER[c]);
console.log(`✓ Wrote ${codes.length} course covers to static/img/covers${missing.length ? ` (family fallback: ${missing.join(', ')})` : ''}`);
