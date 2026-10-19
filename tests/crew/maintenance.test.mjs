import test from 'node:test';
import assert from 'node:assert/strict';
import { weekId, local, harvestSlot, slotsBetween, harvestDue, distillDue, maintenanceDue, parseTasks, contentFiles, maintenanceVerdict, parseVerdict } from '../../scripts/crew/maintenance.mjs';

const at = (iso) => new Date(iso);

test('weekId follows ISO 8601 on the Karachi calendar', () => {
  assert.equal(weekId(at('2026-10-19T12:00:00Z')), '2026-W43');
  assert.equal(weekId(at('2026-01-01T00:00:00Z')), '2026-W01');
  assert.equal(weekId(at('2027-01-03T12:00:00Z')), '2026-W53');
  // 20:00 UTC on 31 December is already 1 January in Karachi.
  assert.equal(local(at('2026-12-31T20:00:00Z')).date, '2027-01-01');
});

test('harvest runs once in each 12-hour Karachi slot', () => {
  assert.equal(harvestSlot(at('2026-10-19T18:59:00Z')), '2026-10-19-12'); // 23:59 PKT
  assert.equal(harvestSlot(at('2026-10-19T19:00:00Z')), '2026-10-20-00'); // 00:00 PKT
  assert.equal(harvestDue('2026-10-20-00', at('2026-10-19T19:15:00Z')), false);
  assert.equal(harvestDue('2026-10-19-12', at('2026-10-19T19:15:00Z')), true);
  assert.equal(harvestDue(undefined, at('2026-10-19T19:15:00Z')), true);
});

test('slotsBetween lists every 12-hour slot in order', () => {
  assert.deepEqual(slotsBetween(at('2026-10-18T10:00:00Z'), at('2026-10-19T20:00:00Z')),
    ['2026-10-18-12', '2026-10-19-00', '2026-10-19-12', '2026-10-20-00']);
  assert.deepEqual(slotsBetween(at('2026-10-19T08:00:00Z'), at('2026-10-19T09:00:00Z')), ['2026-10-19-12']);
});

test('distill runs once a Karachi day from 03:00', () => {
  assert.equal(distillDue(undefined, at('2026-10-19T21:59:00Z')), null); // 02:59 PKT on the 20th
  assert.equal(distillDue(undefined, at('2026-10-19T22:00:00Z')), '2026-10-20');
  assert.equal(distillDue('2026-10-20', at('2026-10-20T10:00:00Z')), null);
});

test('maintenance runs once a week, Sunday from 02:00 Karachi', () => {
  assert.equal(maintenanceDue(undefined, at('2026-10-24T20:59:00Z')), null); // Sun 01:59 PKT
  assert.equal(maintenanceDue(undefined, at('2026-10-24T21:00:00Z')), '2026-W43'); // Sun 02:00 PKT
  assert.equal(maintenanceDue('2026-W43', at('2026-10-25T05:00:00Z')), null);
  assert.equal(maintenanceDue(undefined, at('2026-10-20T21:00:00Z')), null); // a Wednesday
});

test('parseTasks reads the survey table, drops unknown areas and caps at six', () => {
  const md = [
    '# Tasks', '',
    '| ID | Area | Title | Files | Acceptance | Risk |',
    '|---|---|---|---|---|---|',
    '| M1 | code | Split crew.mjs PR handling | `scripts/crew/crew.mjs` | node --test passes | low |',
    '| M2 | ADR | Regenerate the decision register | history/adr/README.md | every ADR listed | low |',
    '| M3 | poetry | Not a real area | x | y | z |',
    ...Array.from({ length: 8 }, (_, i) => `| D${i} | docs | Doc ${i} | README.md | links work | low |`),
  ].join('\n');
  const tasks = parseTasks(md);
  assert.equal(tasks.length, 6);
  assert.deepEqual(tasks[0], { id: 'M1', area: 'code', stage: 'maint_refactor', title: 'Split crew.mjs PR handling', files: 'scripts/crew/crew.mjs', acceptance: 'node --test passes', risk: 'low' });
  assert.equal(tasks[1].stage, 'maint_adr');
  assert.ok(!tasks.some((t) => t.id === 'M3'));
  assert.deepEqual(parseTasks('no table here'), []);
});

test('content paths belong to the corpus crew', () => {
  assert.deepEqual(contentFiles(['src/lib/x.ts', 'docs/semester-1/efmp-301/unit-01/index.mdx', 'glossary.json',
    'i18n/ur/docusaurus-plugin-content-docs/current/a.mdx', 'i18n/ur/code.json', 'README.md', 'specs/content/efmp-301/tasks.md']),
  ['docs/semester-1/efmp-301/unit-01/index.mdx', 'glossary.json', 'i18n/ur/docusaurus-plugin-content-docs/current/a.mdx', 'specs/content/efmp-301/tasks.md']);
});

test('maintenanceVerdict: merge only when green, reviewed and unprotected', () => {
  const protectedPatterns = [/^scripts\//, /^history\/adr\//];
  const v = (files, ciGreen, reviewPassed) => maintenanceVerdict({ files, ciGreen, reviewPassed, protectedPatterns });
  assert.equal(v(['src/a.ts'], true, true), 'merge');
  assert.equal(v(['src/a.ts'], false, true), 'wait');
  assert.equal(v(['src/a.ts'], true, false), 'wait');
  assert.equal(v(['scripts/crew/crew.mjs'], true, true), 'ask');
  assert.equal(v(['history/adr/README.md'], true, false), 'wait');
});

test('parseVerdict takes the last verdict line', () => {
  assert.deepEqual(parseVerdict('...\nCREW-VERDICT: revise - rename is incomplete in two callers\nmore\nCREW-VERDICT: pass'), { verdict: 'pass', note: '' });
  assert.deepEqual(parseVerdict('CREW-VERDICT: revise: tests do not cover the new branch'), { verdict: 'revise', note: 'tests do not cover the new branch' });
  assert.equal(parseVerdict('no verdict'), null);
});
