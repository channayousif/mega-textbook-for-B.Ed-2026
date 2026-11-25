import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import {
  teaserNeeds, limitMedia, clipsAllowed, mediaLaunchProblem, approveScript, rejectMedia, approvePublish, mediaTask, mediaHold,
  isMediaStage, MAX_AWAITING_SCRIPTS, MEDIA_STAGES, ownerLine,
} from '../../scripts/crew/media.mjs';
import { isCorpusStage } from '../../scripts/crew/planner.mjs';
import { STAGES } from '../../scripts/crew/workers.mjs';
import { recordClip, advanceTeaser } from '../../scripts/notebook-studio/teaser.mjs';
import { makeClips } from '../../scripts/media/teaser-clips.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
// Producer quota records go to a temp file, never the host's ~/.cache/mega-book/media-quota.json.
process.env.MEGA_BOOK_MEDIA_QUOTA_FILE = join(mkdtempSync(join(tmpdir(), 'media-quota-')), 'q.json');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const item = (state, over = {}) => ({ key: 'gqur-300-ur', id: 'gqur-300', locale: 'ur', state, gates: {}, clips: [], history: [], script_sha256: 'a'.repeat(64), ...over });
const ownerGate = { verdict: 'approve', by: 'owner', date: '2026-11-21' };

test('media stages exist for the claude worker and never start or focus a course', () => {
  for (const s of MEDIA_STAGES) {
    assert.ok(STAGES[s], s);
    assert.equal(isCorpusStage(s), false, s);
  }
  // MCP-bound steps: claude, then claude_crew (same MCP servers) when claude is cooling (2026-11-25).
  for (const s of ['teaser_clips', 'media_assemble', 'media_publish', 'studio_media', 'studio_publish']) assert.deepEqual(STAGES[s].chain, ['claude', 'claude_crew']);
});

test('a dry run queues teaser_script for a course with no teaser and waits for the owner at scripted', () => {
  const shaOf = () => 'a'.repeat(64);
  const r = teaserNeeds({ courses: [{ code: 'GQUR-300' }, { code: 'EFMP-305' }], items: { 'efmp-305-ur': item('scripted', { key: 'efmp-305-ur', id: 'efmp-305' }) }, shaOf });
  assert.deepEqual(r.jobs.map((j) => `${j.course} ${j.stage}`), ['GQUR-300 teaser_script']);
  assert.deepEqual(r.owner.scripts, ['efmp-305-ur']);
  // one media job at a time, finishing work before new scripts, and a cap on scripts awaiting the owner
  const added = [{ stage: 'teaser_script', course: 'A' }, { stage: 'media_assemble', course: 'B' }, { stage: 'review_en', course: 'C' }];
  assert.deepEqual(limitMedia(added, []).map((j) => j.stage), ['media_assemble', 'review_en']);
  assert.deepEqual(limitMedia(added, [{ stage: 'teaser_clips' }]).map((j) => j.stage), ['review_en']);
  assert.deepEqual(limitMedia([added[0]], [], { awaitingScripts: MAX_AWAITING_SCRIPTS }), []);
});

test('the owner approval moves a script to clips; a rejection redrafts it', () => {
  const approvals = {};
  const at = '2026-11-21T08:00:00Z';
  const it = item('scripted');
  assert.throws(() => approveScript(approvals, 'gqur-300-ur', { item: it, sha: 'b'.repeat(64), via: 'cli', at }), /does not match/);
  approveScript(approvals, 'gqur-300-ur', { item: it, sha: 'a'.repeat(64), via: 'discord', at });
  const r = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': it }, approvals, shaOf: () => 'a'.repeat(64) });
  assert.deepEqual(r.jobs.map((j) => j.stage), ['teaser_clips']);
  rejectMedia(approvals, 'gqur-300-ur', 'shot 3 is too slow', { item: it, sha: 'a'.repeat(64), via: 'discord', at: '2026-11-21T09:00:00Z' });
  const r2 = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': it }, approvals, shaOf: () => 'a'.repeat(64) });
  assert.deepEqual(r2.jobs.map((j) => [j.stage, j.note]), [['teaser_script', 'shot 3 is too slow']]);
  assert.match(mediaTask({ stage: 'teaser_script', course: 'GQUR-300', note: 'shot 3 is too slow' }), /rejected[\s\S]*rehash/);
  // once revised (new hash), the redraft is not queued again; the script waits for the owner
  const r3 = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': it }, approvals, shaOf: () => 'c'.repeat(64) });
  assert.deepEqual(r3.jobs, []);
});

test('a changed script voids the approval everywhere', () => {
  const ap = { script: { sha256: 'a'.repeat(64), at: 'x', via: 'cli' } };
  assert.equal(clipsAllowed(item('scripted'), ap, 'a'.repeat(64)).ok, true);
  const v = clipsAllowed(item('scripted'), ap, 'b'.repeat(64));
  assert.equal(v.ok, false);
  assert.equal(v.void, true);
  assert.equal(clipsAllowed(item('script-approved', { gates: { script: ownerGate } }), {}, 'b'.repeat(64)).void, true);
  assert.equal(mediaLaunchProblem({ stage: 'teaser_clips' }, { item: item('scripted'), approval: ap, currentSha: 'b'.repeat(64) }) !== null, true);
  const r = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': item('script-approved', { gates: { script: ownerGate } }) }, shaOf: () => 'b'.repeat(64) });
  assert.deepEqual([r.jobs, r.owner.voided], [[], ['gqur-300-ur']]);
  // the teaser ledger itself refuses too
  const L = { items: [item('scripted')] };
  assert.throws(() => advanceTeaser(L, 'gqur-300-ur', 'script-approved', { gates: { script: { ...ownerGate, by: 'claude' } } }, { ledgers: [] }), /only the owner/);
  assert.throws(() => advanceTeaser(L, 'gqur-300-ur', 'script-approved', { gates: { script: ownerGate } }, { ledgers: [], currentSha: 'b'.repeat(64) }), /no longer matches/);
  advanceTeaser(L, 'gqur-300-ur', 'script-approved', { gates: { script: ownerGate } }, { ledgers: [], currentSha: 'a'.repeat(64) });
  assert.throws(() => recordClip(L, 'gqur-300-ur', 1, { artifact_id: 'x', model: 'veo_lite', credits: 10 }, new Date(), { currentSha: 'b'.repeat(64) }), /changed after the owner approved/);
});

function tempRepo(state, gates = {}) {
  const root = mkdtempSync(join(tmpdir(), 'media-stage-'));
  mkdirSync(join(root, 'specs/studio/teasers'), { recursive: true });
  mkdirSync(join(root, 'specs/studio/recipes'), { recursive: true });
  for (const f of ['teaser@1.json', 'teaser@2.json']) copyFileSync(join(ROOT, 'specs/studio/recipes', f), join(root, 'specs/studio/recipes', f));
  const script = JSON.parse(readFileSync(join(ROOT, 'specs/studio/teasers/efmp-301.json'), 'utf8'));
  const text = JSON.stringify({ ...script, id: 'gqur-300', recipe: { name: 'teaser', version: 2 } }, null, 1);
  writeFileSync(join(root, 'specs/studio/teasers/gqur-300.json'), text);
  writeFileSync(join(root, 'specs/studio/teasers/media-teasers.json'), JSON.stringify({ items: [item(state, { script_sha256: sha(text), gates })] }));
  return root;
}

test('no generate call happens before the owner approved the current script', async () => {
  let calls = 0;
  const impls = { 'gflow.video': async () => { calls++; return { status: 'ok', file: '/dev/null', sha256: 'e'.repeat(64), credits: 10, model: 'veo_lite', source: 'generated', mediaId: 'm' }; } };
  await assert.rejects(makeClips('gqur-300', { root: tempRepo('scripted'), impls, qa: false, log: () => {} }), /owner's script approval/);
  await assert.rejects(makeClips('gqur-300', { root: tempRepo('script-approved', { script: { ...ownerGate, by: 'claude' } }), impls, qa: false, log: () => {} }), /different script/);
  assert.equal(calls, 0);
  const root = tempRepo('script-approved', { script: ownerGate });
  let n = 0;
  impls['gflow.video'] = async (job, part) => { calls++; return { status: 'ok', file: '/dev/null', sha256: String(++n).repeat(64).slice(0, 64), credits: 10, model: 'veo_lite', source: 'generated', mediaId: `m${part}` }; };
  const r = await makeClips('gqur-300', { root, impls, qa: false, log: () => {}, shots: [1, 2] });
  assert.equal(calls, 2);
  assert.deepEqual(r.made.map((m) => m.status), ['ok', 'ok']);
  const L = JSON.parse(readFileSync(join(root, 'specs/studio/teasers/media-teasers.json'), 'utf8'));
  assert.deepEqual(L.items[0].clips.map((c) => [c.shot, c.media_id, c.source]), [[1, 'm1', 'generated'], [2, 'm2', 'generated']]);
});

test('a producer hold stops the run with a MEDIA-HOLD line the crew can read', async () => {
  const root = tempRepo('script-approved', { script: ownerGate });
  const lines = [];
  const r = await makeClips('gqur-300', { root, qa: false, log: (l) => lines.push(l), impls: { 'gflow.video': async () => ({ status: 'quota', resetAt: '2099-01-01T00:00:00Z', reason: 'RateLimitError' }) } });
  assert.equal(r.stop, 'quota');
  assert.deepEqual(mediaHold(lines.join('\n')), { kind: 'quota', resetAt: '2099-01-01T00:00:00.000Z', reason: 'RateLimitError' });
});

test('the crew never publishes: only an owner-approved media_publish may, and no code sets public', () => {
  for (const stage of MEDIA_STAGES.filter((s) => !['media_publish', 'studio_publish'].includes(s))) {
    const t = mediaTask({ stage, course: 'GQUR-300', unit: 1 });
    assert.match(t, /Never make a video public/, stage);
    assert.doesNotMatch(t, /privacy_status public/, stage);
  }
  assert.throws(() => mediaTask({ id: 'x', stage: 'media_publish', course: 'GQUR-300' }), /owner's crew publish/);
  assert.throws(() => mediaTask({ id: 'x', stage: 'studio_publish', course: 'EFMP-301', unit: 4 }), /owner's crew approve-studio/);
  assert.match(mediaTask({ stage: 'media_publish', course: 'GQUR-300', publish: { at: '2026-11-21T10:00:00Z', via: 'discord', youtube_id: 'abc' } }), /abc\) public/);
  assert.equal(mediaLaunchProblem({ stage: 'media_publish' }, { item: item('qa3-pass'), approval: {} }), 'no owner publish approval');
  const approvals = {};
  assert.throws(() => approvePublish(approvals, 'gqur-300-ur', { item: item('uploaded-private'), via: 'cli', at: 'x' }), /only a checked private Short/);
  approvePublish(approvals, 'gqur-300-ur', { item: item('qa3-pass', { youtube_id: 'abc' }), via: 'cli', at: 'x' });
  const r = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': item('qa3-pass') }, approvals, shaOf: () => 'a'.repeat(64) });
  assert.deepEqual(r.jobs.map((j) => j.stage), ['media_publish']);
  // no crew or media module sets a video public in code
  const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  for (const f of [...walk(join(ROOT, 'scripts/crew')), ...walk(join(ROOT, 'scripts/media'))].filter((x) => x.endsWith('.mjs'))) {
    assert.doesNotMatch(readFileSync(f, 'utf8'), /privacy_?[sS]tatus['"]?\s*[:=]\s*['"]public/, f);
  }
});

test('media stage names are recognised', () => {
  assert.equal(isMediaStage('teaser_clips'), true);
  assert.equal(isMediaStage('illustrate'), false);
});

test('an approved Short scheduled in YouTube gets no publish job and shows as scheduled', () => {
  const at = '2026-11-22T10:00:00+05:00';
  const r = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': item('approved', { gates: { owner: { verdict: 'approve', by: 'owner' } }, scheduled_publish_at: at }) }, shaOf: () => 'a'.repeat(64) });
  assert.deepEqual(r.jobs, []);
  assert.deepEqual(r.owner.scheduled, [`gqur-300-ur ${at}`]);
  assert.match(ownerLine(r.owner), /scheduled to go public: gqur-300-ur/);
  const unscheduled = teaserNeeds({ courses: [{ code: 'GQUR-300' }], items: { 'gqur-300-ur': item('approved') }, shaOf: () => 'a'.repeat(64) });
  assert.deepEqual(unscheduled.jobs.map((j) => j.stage), ['media_publish']);
});
