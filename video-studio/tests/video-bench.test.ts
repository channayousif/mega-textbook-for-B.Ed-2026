import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { VS_ROOT } from '../scripts/lib/paths.ts';
import {
  benchJobs, brandStyle, CLIP_RE, flatName, loadBenchSpec, packCandidates, packShots, resolveShot, stillsNeeded,
  validateBenchSpec, WORKFLOW_DIR,
} from '../scripts/lib/video-bench.ts';

const workflows = readdirSync(WORKFLOW_DIR).filter((f) => f.endsWith('.json'));
const fresh = () => loadBenchSpec();
const tmp = mkdtempSync(join(tmpdir(), 'vs-video-bench-'));
after(() => rmSync(tmp, { recursive: true, force: true }));

test('the committed VS-005 spec is valid', () => {
  const { cands, shots } = fresh();
  assert.deepEqual(validateBenchSpec(cands, shots, workflows), []);
});

test('validation catches bad hashes, revisions, roles, frame counts and text prompts', () => {
  const { cands, shots } = fresh();
  cands.candidates[0].files[0].sha256 = 'abc';
  cands.candidates[0].revision = 'main';
  cands.candidates[0].files.pop();
  cands.candidates[0].params.length = 120;
  shots.shots[0].prompt = 'She points at the caption on the board';
  const errs = validateBenchSpec(cands, shots, workflows).join('\n');
  for (const want of [/sha256 must be 64 hex/, /revision must be a 40-hex/, /file roles .* do not match/, /4n\+1 frames/, /S1: prompt asks for on-screen text/]) {
    assert.match(errs, want);
  }
});

test('jobs skip inactive candidates and unsupported shot kinds; smoke is one job', () => {
  const { cands, shots } = fresh();
  const all = packCandidates(cands, { only: ['wan22-5b', 'hunyuan15-480p-i2v'] });
  const jobs = benchJobs(all, shots);
  const seeds = cands.seeds.length;
  assert.equal(jobs.filter((j) => j.candidate === 'wan22-5b').length, shots.shots.length * seeds);
  const t2v = shots.shots.filter((s) => resolveShot(s, shots).kind === 't2v').length;
  assert.equal(jobs.filter((j) => j.candidate === 'hunyuan15-480p-i2v').length, (shots.shots.length - t2v) * seeds);
  assert.equal(benchJobs(cands, shots).every((j) => j.candidate === 'wan22-5b'), true, 'hunyuan is inactive by default');
  assert.deepEqual(benchJobs(packCandidates(cands, { smoke: true }), shots, 'smoke'), [{ candidate: 'wan22-5b', shot: 'S1', seed: 101 }]);
  assert.throws(() => packCandidates(cands, { only: ['nope'] }), /unknown candidates: nope/);
});

test('style arms borrow the base shot; stills are listed once and packed flat', () => {
  const { shots } = fresh();
  const s7 = resolveShot(shots.shots.find((s) => s.id === 'S7')!, shots);
  assert.equal(s7.style, 'polished_3d');
  assert.equal(s7.prompt, shots.shots.find((s) => s.id === 'S1')!.prompt);
  const stills = stillsNeeded(shots);
  assert.equal(new Set(stills).size, stills.length);
  assert.ok(stills.includes('sets/classroom.png'));
  assert.equal(flatName('cast/ustani/pose_explain.png'), 'cast__ustani__pose_explain.png');
});

test('the packed shots carry the locked brand art style, not a copy in the spec', () => {
  const { shots } = fresh();
  assert.equal(JSON.stringify(shots).includes('flat 2D vector illustration'), false);
  const packed = packShots(shots, brandStyle());
  assert.match(packed.brand_style!.prompt_suffix, /flat 2D vector illustration/);
  assert.match(packed.brand_style!.negative, /photorealistic/);
});

test('clip names parse for bench and owner reference clips only', () => {
  assert.deepEqual(CLIP_RE.exec('wan22-5b_S1_s101.mp4')!.slice(1, 4), ['wan22-5b', 'S1', '101']);
  assert.ok(CLIP_RE.test('flow_S4_s1.mp4'));
  assert.equal(CLIP_RE.test('wan22-5b_S1_s101-solo-cold-gpu0.mp4'), false, 'smoke clips are not blinded');
});

test('video_bench.py --selftest builds every graph and --verify-only catches tampering', (t) => {
  try { execFileSync('python3', ['--version']); } catch { t.skip('python3 not available'); return; }
  const { cands, shots } = fresh();
  const files: Record<string, string> = {};
  const put = (name: string, data: string | Buffer) => {
    writeFileSync(join(tmp, name), data);
    files[name] = execFileSync('sha256sum', [join(tmp, name)], { encoding: 'utf8' }).split(' ')[0];
  };
  put('candidates.json', JSON.stringify(cands));
  put('shots.json', JSON.stringify(packShots(shots, brandStyle())));
  for (const w of workflows) put(w, readFileSync(join(WORKFLOW_DIR, w)));
  writeFileSync(join(tmp, 'manifest.json'), JSON.stringify({ files }));
  const script = join(VS_ROOT, 'kaggle', 'video_bench.py');
  const out = execFileSync('python3', ['-I', script, '--selftest', tmp], { encoding: 'utf8' });
  const n = benchJobs(packCandidates(cands, { only: cands.candidates.map((c) => c.id) }), shots).length + cands.candidates.length;
  assert.match(out, new RegExp(`selftest: ${n} graphs ok`));
  execFileSync('python3', ['-I', script, '--verify-only', tmp]);
  // Pack ships only active workflows: the job must not need an inactive candidate's file.
  rmSync(join(tmp, 'hunyuan15_i2v.json'));
  assert.equal(execFileSync('python3', ['-I', script, '--list-workflows', tmp], { encoding: 'utf8' }).trim(), 'wan22_ti2v.json');
  copyFileSync(join(WORKFLOW_DIR, 'hunyuan15_i2v.json'), join(tmp, 'hunyuan15_i2v.json'));
  copyFileSync(join(WORKFLOW_DIR, workflows[0]), join(tmp, 'shots.json'));
  assert.throws(() => execFileSync('python3', ['-I', script, '--verify-only', tmp], { stdio: 'pipe' }), /Command failed/);
});
