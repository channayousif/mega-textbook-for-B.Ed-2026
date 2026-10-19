import test from 'node:test';
import assert from 'node:assert/strict';
import { registryProblems } from '../../scripts/crew/registries.mjs';

const G = 'glossary.json';
const gloss = (...terms) => JSON.stringify(terms.map(([term, def = 'd']) => ({ term, definition_en: def, definition_ur: 'u' })), null, 2);

test('glossary: new terms and corrected definitions pass; lost, duplicated or broken fail', () => {
  const base = gloss(['Clarity'], ['Tone']);
  assert.deepEqual(registryProblems(G, base, gloss(['Clarity'], ['Tone'], ['Register'])), []);
  assert.deepEqual(registryProblems(G, base, gloss(['Clarity', 'better wording'], ['Tone'])), []);
  assert.match(registryProblems(G, base, gloss(['Clarity']))[0], /lost 1 term\(s\) main has: tone/);
  assert.match(registryProblems(G, base, gloss(['Clarity'], ['Tone'], ['tone']))[0], /duplicate term\(s\): tone/);
  assert.match(registryProblems(G, base, '[{"term": "Clarity",}')[0], /glossary.json is not valid/);
});

const L = 'specs/decisions/log.md';
const entry = (id, title, body = 'Ruling text.') => `## ${id} - ${title}\n\n${body}\n`;

test('decision log: appending passes; a removed line or a duplicate ID fails', () => {
  const base = `# Decisions\n\n${entry('D-2026-0051', 'GSOS-301 intake')}\n${entry('D-2026-0067', 'EFMP-304 terms')}`;
  assert.deepEqual(registryProblems(L, base, `${base}\n${entry('D-2026-0050', 'GENG-301 intake')}`), []);
  // #162 on 2026-10-19: GSOS-301's D-2026-0051 vanished from main.
  const lost = registryProblems(L, base, `# Decisions\n\n${entry('D-2026-0067', 'EFMP-304 terms')}`);
  assert.match(lost[0], /removed or changed 1 line\(s\).*D-2026-0051/);
  // #164 on 2026-10-19: a stale second copy of an existing decision.
  const twice = registryProblems(L, base, `${base}\n${entry('D-2026-0051', 'GSOS-301 intake')}`);
  assert.deepEqual(twice, ['specs/decisions/log.md has duplicate decision ID(s): D-2026-0051']);
});

const P = 'specs/gaps.md';

test('gaps: a status update passes; a lost or duplicated gap fails', () => {
  const base = `${entry('G-2026-72', 'EFMP-305 credit hours', 'Status: open')}\n${entry('G-2026-73', 'No reading list')}`;
  assert.deepEqual(registryProblems(P, base, base.replace('Status: open', 'Status: resolved')), []);
  assert.match(registryProblems(P, base, entry('G-2026-73', 'No reading list'))[0], /lost gap\(s\) main has: G-2026-72/);
  assert.match(registryProblems(P, base, `${base}\n${entry('G-2026-72', 'EFMP-305 credit hours')}`)[0], /duplicate gap ID\(s\): G-2026-72/);
});

const T = 'specs/content/terminology.csv';

test('terminology: quoted commas are one cell; lost or duplicated terms fail', () => {
  const base = 'term_en,term_ur,notes\nEducational Psychology,تعلیمی نفسیات,core\n"Assessment, formative",تکوینی جائزہ,x\n';
  assert.deepEqual(registryProblems(T, base, `${base}Cognition,اِدراک,new\n`), []);
  assert.match(registryProblems(T, base, 'term_en,term_ur,notes\nEducational Psychology,تعلیمی نفسیات,core\n')[0], /lost term\(s\) main has: assessment, formative/);
  assert.match(registryProblems(T, base, `${base}educational psychology,x,dup\n`)[0], /duplicate term\(s\): educational psychology/);
});

test('new, unchanged and deleted registries', () => {
  assert.deepEqual(registryProblems(G, null, gloss(['A'])), []);
  assert.deepEqual(registryProblems(G, gloss(['A']), gloss(['A'])), []);
  assert.deepEqual(registryProblems(L, entry('D-2026-0001', 'x'), null), ['specs/decisions/log.md was deleted']);
});
