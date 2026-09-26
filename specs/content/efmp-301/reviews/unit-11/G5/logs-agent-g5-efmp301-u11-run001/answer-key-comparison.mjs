// Answer-key comparison - agent-g5-efmp301-u11-run001
// Extracts the MCQ answer keys from the bound English and Urdu unit-assessment
// files and compares them, alongside the reviewer's independently derived
// answers (solved from the Urdu items before reading either key).
import { readFileSync, writeFileSync } from 'node:fs';

const EN = readFileSync('docs/semester-1/efmp-301/unit-11/unit-assessment.mdx', 'utf8');
const UR = readFileSync('i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/unit-assessment.mdx', 'utf8');

function key(text) {
  // The pattern "N. **x**" occurs only in the MCQ answer-key section (items use "N." + "a)" options).
  const keys = [];
  for (const m of text.matchAll(/^\s*(\d+)\.\s*\*\*([a-d])\*\*/gm)) keys.push([Number(m[1]), m[2]]);
  return keys;
}
const en = key(EN), ur = key(UR);
// Reviewer's independent answers, derived from the Urdu items before reading any key:
const independent = [[1, 'b'], [2, 'c'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'd'], [7, 'b'], [8, 'c'], [9, 'c'], [10, 'b']];
const lines = [];
lines.push('answer-key-comparison - agent-g5-efmp301-u11-run001');
lines.push('EN key (docs/semester-1/efmp-301/unit-11/unit-assessment.mdx): ' + en.map(([n, l]) => `${n}-${l}`).join(', '));
lines.push('UR key (i18n/ur/.../unit-assessment.mdx):                       ' + ur.map(([n, l]) => `${n}-${l}`).join(', '));
lines.push('Reviewer independent answers (from Urdu items, pre-key):        ' + independent.map(([n, l]) => `${n}-${l}`).join(', '));
const enMatch = JSON.stringify(en) === JSON.stringify(independent);
const urMatch = JSON.stringify(ur) === JSON.stringify(independent);
lines.push('Independent answers == EN key: ' + enMatch + ' | Independent answers == UR key: ' + urMatch);
lines.push('EN key == UR key (exact): ' + (JSON.stringify(en) === JSON.stringify(ur)));
lines.push('Note: the parent dispatch quoted "1-b, 2-c, 3-b, 4-d, 5-c, 6-a, 7-b, 8-d, 9-c, 10-c" as the EN key;');
lines.push('that sequence does NOT match the bound English file and is wrong for items 4, 6, 8, 10 as bound.');
const out = lines.join('\n') + '\n';
writeFileSync('specs/content/efmp-301/reviews/unit-11/G5/logs-agent-g5-efmp301-u11-run001/answer-key-comparison.log', out);
console.log(out);
