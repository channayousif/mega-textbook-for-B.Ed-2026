import test from 'node:test';
import assert from 'node:assert/strict';
import { batchDue, batchCandidates, batchId, batchTitle, batchBody, exclusionReason, mergeTrackerRows } from '../../scripts/crew/batch.mjs';

const at = (iso) => Date.parse(iso);

test('batchDue: first batch at once, then at most one an hour', () => {
  assert.equal(batchDue({ jobs: [] }, at('2026-10-19T12:00:00Z'), 60), true);
  const board = { jobs: [], lastBatchAt: '2026-10-19T12:00:00Z' };
  assert.equal(batchDue(board, at('2026-10-19T12:59:00Z'), 60), false);
  assert.equal(batchDue(board, at('2026-10-19T13:00:00Z'), 60), true);
});

test('batchDue: never while a batch PR is open or waiting on a fix', () => {
  for (const status of ['pr_open', 'gate_red']) {
    const board = { jobs: [{ id: 'batch-1', stage: 'batch', status }], lastBatchAt: '2026-10-19T09:00:00Z' };
    assert.equal(batchDue(board, at('2026-10-19T13:00:00Z'), 60), false, status);
  }
  const held = { jobs: [{ id: 'batch-1', stage: 'batch', status: 'blocked' }], lastBatchAt: '2026-10-19T09:00:00Z' };
  assert.equal(batchDue(held, at('2026-10-19T13:00:00Z'), 60), true);
});

test('batchCandidates: ready jobs oldest first, skipping one whose merge fix is still running', () => {
  const jobs = [
    { id: 'b', status: 'ready', readyAt: '2026-10-19T10:30:00Z' },
    { id: 'a', status: 'ready', readyAt: '2026-10-19T10:00:00Z' },
    { id: 'c', status: 'ready', readyAt: '2026-10-19T09:00:00Z' },
    { id: 'c-conflict1', parent: 'c', status: 'running' },
    { id: 'd', status: 'pr_open' },
    { id: 'e', status: 'ready', readyAt: '2026-10-19T08:00:00Z' },
    { id: 'e-conflict1', parent: 'e', status: 'merged' },
  ];
  assert.deepEqual(batchCandidates(jobs).map((j) => j.id), ['e', 'a', 'b']);
});

test('batchId, title and body', () => {
  const iso = '2026-10-19T12:05:31.000Z';
  assert.equal(batchId(iso), 'batch-20261019-1205');
  const members = [
    { id: 'efmp-303-u01-translate', course: 'EFMP-303', stage: 'translate', worker: 'codex', summary: 'Urdu mirror | unit 1' },
    { id: 'gict-300-u02-translate', course: 'GICT-300', stage: 'translate', worker: 'claude', summary: 'Urdu mirror' },
  ];
  assert.equal(batchTitle(members, iso), 'crew: batch 2026-10-19 12:05Z, 2 jobs (EFMP-303, GICT-300)');
  const body = batchBody(members, { left: [{ id: 'x-u01-fix' }], supersedes: ['119'] });
  assert.match(body, /\| `efmp-303-u01-translate` \| translate \| codex \| Urdu mirror \/ unit 1 \|/);
  assert.match(body, /Left for the next batch \(a merge fix is queued\): `x-u01-fix`\./);
  assert.match(body, /Supersedes #119\./);
  assert.doesNotMatch(body, /\u2014/);
});

test('exclusionReason: zero, one and more than five paths', () => {
  assert.equal(exclusionReason('crew/x-u01-author', []), 'crew/x-u01-author conflicts with main.');
  assert.equal(
    exclusionReason('crew/x-u01-author', ['glossary.json']),
    'crew/x-u01-author conflicts with main (glossary.json).',
  );
  const many = ['glossary.json', 'specs/decisions/log.md', 'specs/content/efmp-301/tasks.md', 'specs/gaps.md', 'static/content-status.json', 'catalog/courses.json'];
  assert.equal(
    exclusionReason('crew/x-u01-author', many),
    'crew/x-u01-author conflicts with main (glossary.json, specs/decisions/log.md, specs/content/efmp-301/tasks.md, specs/gaps.md, static/content-status.json and 1 more).',
  );
});

const tracker = [
  '# GPKS-402 tracker',
  '',
  '| Unit | Stage | Status | Initials | Notes |',
  '|---|---|---|---|---|',
  '| 1 | G2 | done | crew | authored |',
  '',
  '## Notes',
  '',
  'Last row for a unit and stage wins.',
  '',
].join('\n');
const rowA = '| 2 | G2 | done | crew | unit 2 authored |';
const rowB = '| 3 | G2 | done | crew | unit 3 authored |';
const insertAfter = (text, anchor, line) => text.replace(`${anchor}\n`, `${anchor}\n${line}\n`);

const rowTracker = [
  '# GICP-400 tracker',
  '',
  'Intro prose.',
  '',
  '| Unit | Stage | Status | Initials | Notes |',
  '|---|---|---|---|---|',
  '| Unit 1 | G2 en-draft | ▢ | | pending |',
  '| Unit 1 | G3 en-review | ▢ | | pending |',
  '| Unit 2 | G2 en-draft | ▢ | | pending |',
  '| Unit 2 | G3 en-review | ▢ | | pending |',
  '',
  'Closing prose.',
  '',
].join('\n');
const u1g2 = '| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:unit-01.json |';
const u2g2 = '| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:unit-02.json |';
const rewrite = (text, unit, stage, line) => text.replace(new RegExp(`^\\| ${unit} \\| ${stage} \\|.*$`, 'm'), line);

test('mergeTrackerRows: two units each rewriting their own G2 row are merged', () => {
  const ours = rewrite(rowTracker, 'Unit 1', 'G2 en-draft', u1g2);
  const theirs = rewrite(rowTracker, 'Unit 2', 'G2 en-draft', u2g2);
  const want = rewrite(ours, 'Unit 2', 'G2 en-draft', u2g2);
  assert.equal(mergeTrackerRows(rowTracker, ours, theirs), want);
  assert.equal(mergeTrackerRows(rowTracker, theirs, ours), want);
});

test('mergeTrackerRows: both sides rewriting one row differently returns null', () => {
  const ours = rewrite(rowTracker, 'Unit 1', 'G2 en-draft', u1g2);
  const theirs = rewrite(rowTracker, 'Unit 1', 'G2 en-draft', '| Unit 1 | G2 en-draft | ▢ | | gates red |');
  assert.equal(mergeTrackerRows(rowTracker, ours, theirs), null);
  assert.equal(mergeTrackerRows(rowTracker, ours, ours), ours);
});

test('mergeTrackerRows: a revision row appended for an existing key is kept as a new occurrence', () => {
  const last = '| Unit 2 | G3 en-review | ▢ | | pending |';
  const revision = '| Unit 1 | G3 en-review | ▢ | agent:g3 | advisory escalation |';
  const ours = insertAfter(rowTracker, last, revision);
  const theirs = rewrite(rowTracker, 'Unit 1', 'G3 en-review', '| Unit 1 | G3 en-review | ▢ | | first review queued |');
  const merged = mergeTrackerRows(rowTracker, ours, theirs);
  assert.equal(merged, insertAfter(theirs, last, revision));
  // New rows from both sides go after the table's last row, ours first.
  const u3 = '| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:unit-03.json |';
  assert.equal(mergeTrackerRows(rowTracker, ours, insertAfter(rowTracker, '| Unit 1 | G3 en-review | ▢ | | pending |', u3)), insertAfter(rowTracker, last, `${revision}\n${u3}`));
});

test('mergeTrackerRows: a row deleted on one side and unchanged on the other is deleted', () => {
  const ours = rowTracker.replace('| Unit 2 | G3 en-review | ▢ | | pending |\n', '');
  const theirs = rewrite(rowTracker, 'Unit 1', 'G2 en-draft', u1g2);
  assert.equal(mergeTrackerRows(rowTracker, ours, theirs), rewrite(ours, 'Unit 1', 'G2 en-draft', u1g2));
  // Deleted on one side but changed on the other is a real conflict.
  assert.equal(mergeTrackerRows(rowTracker, ours, rewrite(rowTracker, 'Unit 2', 'G3 en-review', '| Unit 2 | G3 en-review | ✅ | | x |')), null);
});

test('mergeTrackerRows: a prose line edited on one side returns null', () => {
  const ours = rowTracker.replace('Closing prose.', 'Closing prose, edited.');
  const theirs = rewrite(rowTracker, 'Unit 2', 'G2 en-draft', u2g2);
  assert.equal(mergeTrackerRows(rowTracker, ours, theirs), null);
  // Pure insertions of prose still merge.
  const added = rowTracker.replace('Closing prose.\n', 'Closing prose.\nAdded line.\n');
  assert.equal(mergeTrackerRows(rowTracker, added, theirs), rewrite(added, 'Unit 2', 'G2 en-draft', u2g2));
});

test('mergeTrackerRows: a missing stage returns null', () => {
  assert.equal(mergeTrackerRows(null, rowTracker, rowTracker), null);
  assert.equal(mergeTrackerRows(rowTracker, null, rowTracker), null);
  assert.equal(mergeTrackerRows(rowTracker, rowTracker, null), null);
});

test('mergeTrackerRows: merges pure row appends', () => {
  const last = '| 1 | G2 | done | crew | authored |';
  const ours = insertAfter(tracker, last, rowA);
  const theirs = insertAfter(tracker, last, rowB);
  assert.equal(mergeTrackerRows(tracker, ours, theirs), insertAfter(tracker, last, `${rowA}\n${rowB}`));
  assert.equal(mergeTrackerRows(tracker, `${tracker}${rowA}\n`, `${tracker}${rowB}\n`), `${tracker}${rowA}\n${rowB}\n`);
});

test('mergeTrackerRows: both sides adding the same unit-stage row differently returns null', () => {
  const last = '| 1 | G2 | done | crew | authored |';
  const ours = insertAfter(tracker, last, '| 2 | G2 | done | crew | unit 2 authored by A |');
  const theirs = insertAfter(tracker, last, '| 2 | G2 | done | crew | unit 2 authored by B |');
  assert.equal(mergeTrackerRows(tracker, ours, theirs), null);
  assert.equal(mergeTrackerRows(tracker, theirs, ours), null);

  const lastRow = '| Unit 2 | G3 en-review | ▢ | | pending |';
  const oursRev = insertAfter(rowTracker, lastRow, '| Unit 1 | G3 en-review | ▢ | agent:g3 | advisory escalation |');
  const theirsRev = insertAfter(rowTracker, lastRow, '| Unit 1 | G3 en-review | ✅ | agent:g3 | pass certified |');
  assert.equal(mergeTrackerRows(rowTracker, oursRev, theirsRev), null);
});

test('mergeTrackerRows: identical new row added on both sides is kept once', () => {
  const last = '| 1 | G2 | done | crew | authored |';
  const ours = insertAfter(tracker, last, rowA);
  const theirs = insertAfter(tracker, last, rowA);
  assert.equal(mergeTrackerRows(tracker, ours, theirs), insertAfter(tracker, last, rowA));
  assert.equal(mergeTrackerRows(tracker, theirs, ours), insertAfter(tracker, last, rowA));
});

test('mergeTrackerRows: new rows for different units both merge', () => {
  const last = '| 1 | G2 | done | crew | authored |';
  const ours = insertAfter(tracker, last, rowA);
  const theirs = insertAfter(tracker, last, rowB);
  assert.equal(mergeTrackerRows(tracker, ours, theirs), insertAfter(tracker, last, `${rowA}\n${rowB}`));
  assert.equal(mergeTrackerRows(tracker, theirs, ours), insertAfter(tracker, last, `${rowB}\n${rowA}`));
});

// EFPG-401 has a course status section, a Units summary, then a separate stage table.
const courseTracker = [
  '# EFPG-401 Teaching of English - Task tracker',
  '',
  '## Status: content spec approved (G0/G1)',
  '',
  'English-only authoring from approved content-specs.',
  'No publication or review certification is claimed.',
  '',
  '## Units',
  '',
  '| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |',
  '|---|---|---|---|---|---|---|---|',
  '| 1 | Four Skills of Language Learning | ☐ | ☐ | ☐ | ☐ | ☐ | not started |',
  '| 2 | Teaching of English | ☐ | ☐ | ☐ | ☐ | ☐ | not started |',
  '',
  '**Key:** ☐ = not started, ✓ = done',
  '',
  '## Stage rows',
  '',
  '| Unit | Stage | Status | Initials | Notes |',
  '|---|---|---|---|---|',
  '| Unit 1 | G2 en-draft | ▢ | | pending |',
  '| Unit 2 | G2 en-draft | ▢ | | pending |',
  '',
].join('\n');
const statusBlock = (text, unit) => text.replace(
  /## Status:[\s\S]*?(?=## Units)/,
  `## Status: Unit ${unit} authored\n\nEnglish-only Unit ${unit} draft complete.\n\n`,
);
const summaryDone = (text, unit) => text.replace(
  new RegExp(`^\\| ${unit} \\|.*$`, 'm'),
  (line) => line.replace('☐', '✓').replace('not started', 'authored'),
);
const authorUnit = (text, unit) => rewrite(summaryDone(statusBlock(text, unit), unit), `Unit ${unit}`, 'G2 en-draft', unit === 1 ? u1g2 : u2g2);

test('mergeTrackerRows: parallel EFPG-401 authors keep ours status and both summary and stage changes', () => {
  const ours = authorUnit(courseTracker, 1);
  const theirs = authorUnit(courseTracker, 2);
  assert.equal(mergeTrackerRows(courseTracker, ours, theirs), rewrite(summaryDone(ours, 2), 'Unit 2', 'G2 en-draft', u2g2));
  assert.equal(mergeTrackerRows(courseTracker, theirs, ours), rewrite(summaryDone(theirs, 1), 'Unit 1', 'G2 en-draft', u1g2));
});

test('mergeTrackerRows: competing EFPG-401 summary edits still conflict', () => {
  const ours = authorUnit(courseTracker, 1);
  const theirs = authorUnit(courseTracker, 1).replace('| authored |', '| needs repair |');
  assert.equal(mergeTrackerRows(courseTracker, ours, theirs), null);
  assert.equal(mergeTrackerRows(courseTracker, ours, ours), ours);
});

test('mergeTrackerRows: a one-sided status block change is taken in either direction', () => {
  const changed = statusBlock(courseTracker, 1);
  assert.equal(mergeTrackerRows(courseTracker, courseTracker, changed), changed);
  assert.equal(mergeTrackerRows(courseTracker, changed, courseTracker), changed);
  // The entire block, including subordinate headings and table-like text, is atomic.
  const extended = changed.replace('English-only Unit 1 draft complete.', '### Draft details\n\n| draft | pending |\n\nEnglish-only Unit 1 draft complete.');
  assert.equal(mergeTrackerRows(courseTracker, courseTracker, extended), extended);
  const eof = '# Tracker\n\n## Status: pending\n\nDetails.\n';
  const updated = eof.replace('pending', 'drafted').replace('Details.', 'Updated details.');
  assert.equal(mergeTrackerRows(eof, eof, updated), updated);
});

test('mergeTrackerRows: summary occurrences stay separate from each other and empty stage keys', () => {
  const base = '| Unit | Title |\n|---|---|\n| 1 | first |\n| 1 | second |\n\n| Unit | Stage | Notes |\n|---|---|---|\n| 1 | | pending |\n';
  const ours = base.replace('first', 'updated first').replace('pending', 'stage updated');
  const theirs = base.replace('second', 'updated second');
  assert.equal(mergeTrackerRows(base, ours, theirs), ours.replace('second', 'updated second'));
});
