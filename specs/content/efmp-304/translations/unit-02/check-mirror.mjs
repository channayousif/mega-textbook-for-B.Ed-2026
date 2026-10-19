// Translation self-check, not independent G5 review.
// Run from repository root with node.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import { resolveUnit, urPathFor } from '../../../../../scripts/lib/content-roots.mjs';
const u = resolveUnit('.', 'EFMP-304', 2);
const files = readdirSync(u.unitDir).filter(f => f.endsWith('.mdx')).sort();
assert.deepEqual(readdirSync(u.urUnitDir).filter(f => f.endsWith('.mdx')).sort(), files);
const headings = s => [...s.matchAll(/^(#{1,6}) /gm)].map(m => m[1].length);
const components = s => [...s.matchAll(/<(Figure|Glossary|PrintHandout|BloomTag|ObjectiveList|ActivityCard|TranslationStatusBadge)\b[^>]*>/g)].map(m => ({ type: m[1], id: m[0].match(/\b(?:id|term)="([^"]+)"/)?.[1] }));
for (const file of files) {
  const en = matter(readFileSync(`${u.unitDir}/${file}`, 'utf8'));
  const ur = matter(readFileSync(urPathFor(u, file), 'utf8'));
  assert.deepEqual(headings(ur.content), headings(en.content), `${file} headings`);
  assert.deepEqual(components(ur.content), components(en.content), `${file} component keys/order`);
  assert.deepEqual(ur.content.match(/^import .*$/gm), en.content.match(/^import .*$/gm), `${file} imports`);
  for (const key of ['course_code', 'unit_no', 'topic_no', 'topic_label', 'clo_refs', 'est_reading_minutes', 'translation_status', 'assessment_weighting']) {
    assert.deepEqual(ur.data[key], en.data[key], `${file} ${key}`);
  }
  assert.equal(ur.data.translation_status, 'draft');
  for (const key of ['title', 'description', 'blooms_summary']) assert.match(ur.data[key], /[\u0600-\u06ff]/);
  for (const fig of ur.content.matchAll(/<Figure\b[^>]+>/g)) {
    const src = fig[0].match(/src="([^"]+)"/)[1];
    const alt = fig[0].match(/alt="([^"]+)"/)[1];
    assert.ok(src.endsWith('.ur.svg'));
    assert.ok(existsSync(`static${src}`));
    assert.ok(readFileSync(`static${src}`, 'utf8').includes(`<desc id="d">${alt}</desc>`));
  }
  await compile(ur.content);
  console.log(`${file}: file, heading, metadata, component/import, figure/alt parity and MDX compile PASS`);
}
const index = matter(readFileSync(urPathFor(u, 'index.mdx'), 'utf8'));
const bank = readFileSync('specs/content/terminology.csv', 'utf8').split('\n').slice(1).filter(Boolean).map(line => line.split(','));
for (const term of index.data.key_terms) {
  const row = bank.find(row => row[0] === term.en);
  assert.ok(row && row[1].split(' / ').includes(term.ur), `unbanked term: ${term.en}`);
}
console.log(`${index.data.key_terms.length} declared key_terms conform to the frozen bank`);
const assessment = matter(readFileSync(urPathFor(u, 'unit-assessment.mdx'), 'utf8')).content;
const questionBlock = assessment.split('## مجموعی جائزہ')[1].split('## جوابات')[0];
assert.deepEqual(questionBlock.split(/^### /m).slice(1).map(s => [...s.matchAll(/^\d+\. /gm)].length), [10, 10, 5]);
const options = [...questionBlock.matchAll(/^\s+- (الف|ب|ج|د)\)/gm)].map(m => m[1]);
assert.deepEqual(options, Array.from({ length: 10 }, () => ['الف', 'ب', 'ج', 'د']).flat());
assert.equal([...assessment.matchAll(/^## /gm)].length, 3);
assert.match(assessment.slice(assessment.lastIndexOf('\n## ')), /^\n## جوابات اور نمبر دہی کی رہنمائی/);
console.log('Assessment: 10/10/5 items, 40 options in original order, final bounded answers section PASS');
console.log('Translator MCQ self-solve: B C B B B A B C B C, corresponding to ب ج ب ب ب الف ب ج ب ج. Not independent review.');
