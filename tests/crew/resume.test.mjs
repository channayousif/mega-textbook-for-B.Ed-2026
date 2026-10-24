import test from 'node:test';
import assert from 'node:assert/strict';
import { resumeHere } from '../../scripts/crew/resume.mjs';

const nowMs = Date.parse('2026-10-24T11:00:00Z');
const job = (id, status, extra = {}) => ({ id, status, history: [], ...extra });

test('resumeHere: a held crew says why, for how long, and what needs whom', () => {
  const board = {
    jobs: [
      job('gqur-301-u07-translate', 'blocked', { history: ['2026-10-24T15:44:00.000Z stopped by owner via cli'] }),
      job('batch-20261023-1645', 'gate_red', { history: ['2026-10-23T17:30:00.000Z CI red: rls, e2e; fix job queued'] }),
      job('intel-distill', 'running', { worker: 'agy', startedAt: '2026-10-24T10:30:00Z' }),
      job('fix-1', 'pr_open', { prNumber: 317 }),
    ],
    awaitingG3: { units: [{}, {}, {}] },
  };
  const decisions = { items: [{ id: 'C-009', status: 'open', question: 'merge #320?' }, { id: 'C-008', status: 'answered', question: 'old' }] };
  const control = { launchStall: { reason: 'disk', detail: '6.5 GB free, floor 8 GB', since: '2026-10-22T22:00:00Z' } };
  const nextUp = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((id) => job(id, 'queued'));
  const md = resumeHere({ board, decisions, control, nextUp, nowMs });
  assert.match(md, /^## Resume here/);
  assert.match(md, /Launches: \*\*launches held 37h \(disk: 6\.5 GB free, floor 8 GB\)\*\*/);
  assert.match(md, /decision \*\*C-009\*\*: merge #320\?/);
  assert.doesNotMatch(md, /C-008/);
  assert.match(md, /`gqur-301-u07-translate` is held \(stopped by owner via cli\); "crew retry gqur-301-u07-translate" releases it/);
  assert.match(md, /3 unit\(s\) await your G3 sign-off/);
  assert.match(md, /`batch-20261023-1645`: CI red: rls, e2e; fix job queued/);
  assert.match(md, /Running: `intel-distill` \(agy, 30m\)/);
  assert.match(md, /PRs waiting on CI or merge: #317 `fix-1`/);
  assert.match(md, /Starts next: `a`, `b`, `c`, `d`, `e` and 2 more/);
});

test('resumeHere: an idle healthy crew reads as flowing with nothing pending', () => {
  const md = resumeHere({ board: { jobs: [] }, decisions: { items: [] }, control: {}, nextUp: [], nowMs });
  assert.match(md, /Launches: flowing/);
  assert.match(md, /Needs the owner:\n  - nothing/);
  assert.match(md, /Needs the lead:\n  - nothing/);
  assert.match(md, /Starts next: nothing queued/);
  assert.match(resumeHere({ board: { jobs: [] }, decisions: { items: [] }, control: { paused: true }, nextUp: [], nowMs }), /Launches: paused by the owner/);
});
