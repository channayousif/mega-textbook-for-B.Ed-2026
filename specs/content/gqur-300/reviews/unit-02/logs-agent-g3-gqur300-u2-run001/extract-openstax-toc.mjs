import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('specs/content/gqur-300/reviews/unit-02/sources-agent-g3-gqur300-u2-run001/openstax-ch1.html', 'utf8');
const s = html
  .replace(/\\\\u003c/g, '<')
  .replace(/\\\\u003e/g, '>')
  .replace(/\\\\u0026/g, '&')
  .replace(/\\u003c/g, '<')
  .replace(/\\u003e/g, '>')
  .replace(/\\u0026/g, '&')
  .replace(/\\"/g, '"');
const re = /"title":"(.*?)","toc_type":"(chapter|book-content)"/g;
let m;
const out = [];
while ((m = re.exec(s))) out.push((m[2] === 'chapter' ? 'CHAPTER: ' : '   ') + m[1].replace(/<[^>]*>/g, ''));
writeFileSync('specs/content/gqur-300/reviews/unit-02/sources-agent-g3-gqur300-u2-run001/openstax-prealgebra-2e-toc.txt', out.join('\n'));
console.log('entries:', out.length);
console.log(out.slice(0, 100).join('\n'));
