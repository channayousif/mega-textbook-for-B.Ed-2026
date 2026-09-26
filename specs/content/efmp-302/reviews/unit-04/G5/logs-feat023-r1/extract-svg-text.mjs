// G5 feat023-r1 instrument: dump every <text> element of the unit-04 Urdu
// figure variants (and their EN counterparts for pairing), and diff each
// .ur.svg against its .ur.dark.svg to confirm the dark twin differs only in
// theme tokens. Output goes to figure-text-extract.log.
import { readFileSync, writeFileSync } from 'node:fs';

const base = 'static/img/figures/efmp-302/unit-04';
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const lines = [];
const log = (s) => { lines.push(s); console.log(s); };

for (const i of ids) {
  const id = `fig-U4-${i}`;
  for (const suffix of ['ur.svg', 'svg']) {
    const path = `${base}/${id}.${suffix}`;
    const s = readFileSync(path, 'utf8');
    const texts = [...s.matchAll(/<text[^>]*>(.*?)<\/text>/gs)].map((m) => m[1]);
    log(`--- ${id}.${suffix} (${texts.length} text elements) ---`);
    for (const t of texts) log(`  ${t}`);
  }
  // dark twin diff: same text content, only style tokens differ?
  const light = readFileSync(`${base}/${id}.ur.svg`, 'utf8');
  const dark = readFileSync(`${base}/${id}.ur.dark.svg`, 'utf8');
  const strip = (s) => [...s.matchAll(/<text[^>]*>(.*?)<\/text>/gs)].map((m) => m[1]).join('|');
  const sameText = strip(light) === strip(dark);
  const lightNoStyle = light.replace(/<style>[\s\S]*?<\/style>/, '');
  const darkNoStyle = dark.replace(/<style>[\s\S]*?<\/style>/, '');
  const onlyStyleDiff = lightNoStyle === darkNoStyle;
  log(`${id}: ur vs ur.dark -> identical text labels: ${sameText}; identical outside <style>: ${onlyStyleDiff}`);
}

writeFileSync(new URL('./figure-text-extract.log', import.meta.url).pathname, lines.join('\n') + '\n');
