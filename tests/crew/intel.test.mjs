import test from 'node:test';
import assert from 'node:assert/strict';
import { normalise, feedbackHead, boardSignals, logSignals, cronSignals, phrSignals, reviewSignals, foldSignals, newlyHot, distillDigest, effect, parseRegistry } from '../../scripts/crew/intel.mjs';

const MISSING = 'npm run check:content has 1 finding(s) that main does not have:\n✗ static/content-status.json is missing. Run: npm run build:content-status';

test('normalise masks particulars so repeats share a signature', () => {
  assert.equal(normalise('EFMP-305 Unit 3 failed after 2 tries at docs/semester-2/efmp-305/unit-03/topic-01.mdx'),
    normalise('GICT-300 Unit 4 failed after 3 tries at docs/semester-2/gict-300/unit-04/topic-02.mdx'));
  assert.match(normalise('see `npm run x` at https://example.org/a and commit 3859f166'), /<code>.*<url>.*<sha>/);
});

test('feedbackHead finds the line that names the problem', () => {
  assert.equal(feedbackHead(MISSING), '✗ static/content-status.json is missing. Run: npm run build:content-status');
  assert.equal(feedbackHead('the worker exited without committing any change'), 'the worker exited without committing any change');
});

test('the 25 content-status failures of 2026-10-19 collapse into one hot cluster', () => {
  const jobs = Array.from({ length: 25 }, (_, i) => ({ id: `u${i}-repair_en-conflict1`, feedback: MISSING,
    history: [`2026-10-19T13:${String(i).padStart(2, '0')}:00.000Z attempt 1 failed; retrying with feedback`] }));
  const clusters = foldSignals({}, boardSignals(jobs, '2026-10-19T00:00:00.000Z'), '2026-10-19-12');
  const keys = Object.keys(clusters);
  assert.equal(keys.length, 1);
  const c = clusters[keys[0]];
  assert.equal(c.count, 25);
  assert.equal(c.evidence.length, 5);
  assert.deepEqual(newlyHot(clusters, '2026-10-19-12').map((x) => x.sig), [c.sig]);
  // Only events after the cursor count.
  assert.equal(boardSignals(jobs, '2026-10-19T23:00:00.000Z').length, 0);
});

test('handoff notes, log errors, cron errors, PHR lessons and review findings become signals', () => {
  const jobs = [{ id: 'a', history: [], handoffAt: '2026-10-19T10:00:00Z', handoff: ['fresh checkouts need `npm run build:content-status` before gates'] }];
  assert.equal(boardSignals(jobs, '2026-10-19T00:00:00Z')[0].kind, 'handoff');
  const esc = String.fromCharCode(27);
  const log = `ok\n${esc}[91mError: ${esc}[0mThe user rejected permission to use this specific tool call.\nError: The user rejected permission to use this specific tool call.\n    at foo (x.js:1)`;
  assert.equal(logSignals(log, 'log:a', 't').length, 1);
  assert.equal(cronSignals('reap: Error: git add failed\n    at sh (crew.mjs:50)\nplanned 0 job(s)', 't').length, 1);
  const phr = '- Reflection: the Write tool turned escapes into literal em dashes; caught by grep\n- Failure modes observed: none\n- Next experiment (smallest change to try): none';
  assert.deepEqual(phrSignals(phr, 'phr:x', 't').map((s) => s.kind), ['phr']);
  assert.equal(reviewSignals({ findings: [{ message: 'Bare-URL link text: Further Reading uses raw URLs', resolved: false }, { message: 'done', resolved: true }] }, 'g3:x', 't').length, 1);
});

test('distillDigest lists clusters that grew, largest first', () => {
  const clusters = {};
  foldSignals(clusters, [{ kind: 'failure', sig: 'aaaaaaaa one', text: 'one', source: 'job:1', at: '2026-10-19T01:00:00Z' }], '2026-10-19-00');
  foldSignals(clusters, Array(3).fill({ kind: 'handoff', sig: 'bbbbbbbb two', text: 'two', source: 'job:2', at: '2026-10-19T13:00:00Z' }), '2026-10-19-12');
  const out = distillDigest(clusters, ['2026-10-19-12']);
  assert.match(out, /^- \[handoff\] x3 recent/);
  assert.doesNotMatch(out, /one/);
  assert.equal(distillDigest(clusters, ['2026-10-18-00']), '');
});

test('parseRegistry reads adopted items with their target signature', () => {
  const md = [
    '| ID | Title | Kind | Home | Signature | Adopted | Evidence |',
    '|---|---|---|---|---|---|---|',
    '| I-0001 | Regenerate content-status in fresh worktrees | gate | scripts/crew/crew.mjs | `✗ <path> is missing. run: npm run build:content-status` | 2026-10-19-12 | #281 |',
    '| draft | not an item | | | | | |',
  ].join('\n');
  assert.deepEqual(parseRegistry(md), [{ id: 'I-0001', title: 'Regenerate content-status in fresh worktrees', kind: 'gate', home: 'scripts/crew/crew.mjs',
    signature: '✗ <path> is missing. run: npm run build:content-status', adopted: '2026-10-19-12', evidence: '#281' }]);
  assert.deepEqual(parseRegistry('nothing'), []);
});

test('a back-filled signal is counted in the slot it happened in', () => {
  const s = (at) => ({ kind: 'cron', sig: 'reap: error: git add', text: 'x', source: 'cron.log', at });
  const clusters = foldSignals({}, [s('2026-10-18T10:00:00Z'), s('2026-10-18T10:15:00Z'), s('2026-10-19T09:00:00Z')], (x) => x.at.slice(0, 10));
  assert.deepEqual(Object.values(clusters)[0].slots, { '2026-10-18': 2, '2026-10-19': 1 });
});

test('effect compares the rate before and after adoption', () => {
  const slots = ['2026-10-17-00', '2026-10-17-12', '2026-10-18-00', '2026-10-18-12'];
  const c = (counts) => ({ slots: Object.fromEntries(slots.map((s, i) => [s, counts[i]])) });
  assert.equal(effect(c([6, 6, 0, 1]), '2026-10-18-00', slots), 'worked');
  assert.equal(effect(c([2, 2, 2, 2]), '2026-10-18-00', slots), 'no change');
  assert.equal(effect(c([1, 1, 4, 4]), '2026-10-18-00', slots), 'worse');
  assert.equal(effect(c([1, 1, 1, 1]), '2026-10-17-00', slots), 'too early');
});

test('logSignals drops reported failures and question lines but keeps real errors', () => {
  const realError = 'Error: git add failed with EACCES';
  for (const noise of [
    'Errors were reported, not failed during the survey',
    '? Should failed jobs be retried?',
    '   ? Why was permission denied?',
  ]) assert.deepEqual(logSignals(noise, 'log:a', 't'), [], noise);
  const signals = logSignals([
    'Errors were reported, not failed during the survey',
    '   ? Why was permission denied?',
    realError,
  ].join('\n'), 'log:a', 't');
  assert.equal(signals.length, 1);
  assert.equal(signals[0].text, realError);
});
