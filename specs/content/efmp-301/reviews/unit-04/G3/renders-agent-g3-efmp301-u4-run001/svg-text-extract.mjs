import { readFileSync } from 'node:fs';
const files = process.argv.slice(2);
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  const texts = [...s.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const vb = (s.match(/viewBox="([^"]+)"/) || [])[1];
  console.log('===', f, 'viewBox:', vb);
  console.log(JSON.stringify(texts));
}
