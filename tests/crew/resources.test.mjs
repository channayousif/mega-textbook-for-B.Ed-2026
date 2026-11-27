// Crew resource manager (scripts/crew/resources.mjs; owner, 2026-11-25): one job per media producer
// lane, lanes in parallel, only in media hours and only while a lane's paced channel has room.
import test from 'node:test';
import assert from 'node:assert/strict';
import { LANES, IMAGE_LANES, stageLanes, isLaneStage, laneOf, laneChannels, dailyRoom, dailyUse, pickLane, ledgerOf, todayPlan } from '../../scripts/crew/resources.mjs';
import { DEFAULTS } from '../../scripts/media/pacing.mjs';
import { OUTSIDE_SERVICE_STAGES, STAGES } from '../../scripts/crew/workers.mjs';

const room = () => true;
const open = { open: true, busy: new Set(), room };

test('every stage that calls an outside media service runs on a lane, and text stages do not', () => {
  for (const s of OUTSIDE_SERVICE_STAGES) assert.ok(isLaneStage(s), s);
  for (const s of ['author', 'translate', 'review_en', 'teaser_script', 'flashcards', 'slides', 'fix']) assert.equal(isLaneStage(s), false, s);
  for (const s of Object.keys(STAGES)) for (const lane of stageLanes(s) ?? []) assert.ok(LANES.includes(lane), `${s}: ${lane}`);
});

test('lanes run in parallel: a busy lane blocks only its own stages', () => {
  const busy = new Set(['notebook']);
  assert.deepEqual(pickLane({ stage: 'studio_media' }, { ...open, busy }), { wait: 'notebook busy' });
  assert.deepEqual(pickLane({ stage: 'teaser_clips' }, { ...open, busy }), { lane: 'flow' });
  assert.deepEqual(pickLane({ stage: 'social_roundup' }, { ...open, busy }), { lane: 'social' });
  assert.deepEqual(pickLane({ stage: 'media_assemble' }, { ...open, busy }), { lane: 'youtube' });
});

test('illustrate takes the first free image lane with quota and budget, pinned to its producer', () => {
  assert.deepEqual(IMAGE_LANES, ['agy', 'agy2', 'flow', 'codex']);
  const j = { stage: 'illustrate' };
  assert.deepEqual(pickLane(j, open), { lane: 'agy', producer: 'agy' });
  assert.deepEqual(pickLane(j, { ...open, busy: new Set(['agy']) }), { lane: 'agy2', producer: 'agy2' });
  assert.deepEqual(pickLane(j, { ...open, busy: new Set(['agy', 'agy2']) }), { lane: 'flow', producer: 'gflow' });
  assert.deepEqual(pickLane(j, { ...open, producerOk: (l) => !l.startsWith('agy') }), { lane: 'flow', producer: 'gflow' });
  assert.deepEqual(pickLane(j, { ...open, room: (ch) => ch === 'agy2.image' }), { lane: 'agy2', producer: 'agy2' });
  assert.deepEqual(pickLane(j, { ...open, room: (ch) => ch === 'codex.image' }), { lane: 'codex', producer: 'codex' });
  const none = pickLane(j, { ...open, busy: new Set(['agy', 'agy2', 'flow', 'codex']) });
  assert.match(none.wait, /agy busy, agy2 busy, flow busy, codex busy/);
});

test('outside media hours no lane takes a job', () => {
  for (const stage of OUTSIDE_SERVICE_STAGES) assert.deepEqual(pickLane({ stage }, { ...open, open: false }), { wait: 'media hours closed' }, stage);
});

test('a lane waits when its paced channel has no room today; publishing spends nothing paced', () => {
  const full = { ...open, room: () => false };
  assert.match(pickLane({ stage: 'studio_media' }, full).wait, /notebook daily cap reached/);
  assert.match(pickLane({ stage: 'social_roundup' }, full).wait, /social daily cap reached/);
  assert.deepEqual(pickLane({ stage: 'studio_publish' }, full), { lane: 'youtube' });
  assert.deepEqual(pickLane({ stage: 'media_publish' }, full), { lane: 'youtube' });
  // a studio job can still upload finished items when NotebookLM is spent, and the reverse
  assert.deepEqual(laneChannels('studio_media', 'notebook'), ['nlm.studio', 'youtube.upload']);
  assert.deepEqual(pickLane({ stage: 'studio_media' }, { ...open, room: (ch) => ch === 'youtube.upload' }), { lane: 'notebook' });
  assert.deepEqual(laneChannels('teaser_clips', 'flow'), ['gflow.video']);
  assert.deepEqual(laneChannels('illustrate', 'flow'), ['gflow.image']);
});

test('daily room follows the pacing caps of the PKT day', () => {
  const now = Date.parse('2026-11-25T08:00:00Z'); // 13:00 PKT
  const at = (iso) => ({ at: Date.parse(iso), units: 1 });
  const four = ['2026-11-25T04:10:00Z', '2026-11-25T05:10:00Z', '2026-11-25T06:10:00Z', '2026-11-25T07:10:00Z'].map(at);
  assert.equal(dailyRoom('youtube.upload', four.slice(0, 3), DEFAULTS, now), true);
  assert.equal(dailyRoom('youtube.upload', four, DEFAULTS, now), false);
  // yesterday's uploads (before 00:00 PKT = 19:00Z) do not count
  assert.equal(dailyRoom('youtube.upload', [at('2026-11-24T18:30:00Z'), ...four.slice(0, 3)], DEFAULTS, now), true);
  assert.equal(dailyRoom('gflow.video', [{ at: now - 3600e3, units: 200 }], DEFAULTS, now), false);
  assert.equal(dailyRoom('nope', [], DEFAULTS, now), false);
  assert.deepEqual(dailyUse('youtube.upload', four, DEFAULTS, now), { used: 4, cap: 4, unit: 'calls' });
});

test('jobs writing one ledger are kept apart; a running job holds its lane', () => {
  assert.equal(ledgerOf({ stage: 'teaser_clips', course: 'A' }), 'teasers');
  assert.equal(ledgerOf({ stage: 'media_assemble', course: 'B' }), 'teasers');
  assert.equal(ledgerOf({ stage: 'studio_media', course: 'EFMP-301', unit: 4 }), 'studio:EFMP-301#4');
  assert.equal(ledgerOf({ stage: 'studio_publish', course: 'EFMP-301', unit: 4 }), 'studio:EFMP-301#4');
  assert.equal(ledgerOf({ stage: 'illustrate', course: 'A', unit: 1 }), null);
  assert.equal(laneOf({ stage: 'illustrate', lane: 'codex' }), 'codex');
  assert.equal(laneOf({ stage: 'illustrate' }), 'agy'); // launched before lanes existed
  assert.equal(laneOf({ stage: 'author' }), null);
});

test("today's media plan shows each lane's job, the next one and why it waits", () => {
  const md = todayPlan({
    open: true, nextOpenAt: 'x',
    running: [{ id: 'efmp-304-u05-illustrate', stage: 'illustrate', lane: 'agy' }],
    queued: [{ id: 'efmp-301-u04-studio_media', stage: 'studio_media' }, { id: 'geng-301-u01-illustrate', stage: 'illustrate' }],
    waits: { 'efmp-301-u04-studio_media': 'notebook daily cap reached' },
    use: { 'youtube.upload': { used: 1, cap: 4 } },
  });
  assert.match(md, /\| agy \| `efmp-304-u05-illustrate` \|/);
  assert.match(md, /\| notebook \| idle \| `efmp-301-u04-studio_media` \| notebook daily cap reached \|/);
  assert.match(md, /\| flow \| idle \| `geng-301-u01-illustrate` \|/);
  assert.match(md, /\| meta \| idle \| - \| no producer yet/);
  assert.match(md, /youtube\.upload 1\/4/);
  assert.match(todayPlan({ open: false, nextOpenAt: '2026-11-26T04:00:00.000Z', running: [], queued: [] }), /closed; next opening 2026-11-26/);
});
