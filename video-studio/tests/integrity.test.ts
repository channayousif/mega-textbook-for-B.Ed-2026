import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { canonicalJson, digestJson, digestSet, digestText } from '../scripts/lib/hash.ts';
import { bindDigests, evaluate, type ApprovalEvent, type Digests } from '../scripts/lib/invalidation.ts';
import { mediaRoot, REPO_ROOT, VS_ROOT } from '../scripts/lib/paths.ts';
import { validate } from '../scripts/lib/schema.ts';
import { chunk } from '../remotion/src/UrduShort.tsx';

const fixture = (n: string) => JSON.parse(readFileSync(join(VS_ROOT, 'tests', 'fixtures', n), 'utf8'));

test('canonical JSON sorts keys, normalises NFC and drops transient fields', () => {
  const decomposed = 'کٔ'; // not the point; any NFD/NFC pair works
  const a = { b: 1, a: 'é', at: '2026-01-01', nested: { z: 1, y: [decomposed] } };
  const b = { nested: { y: [decomposed.normalize('NFC')], z: 1 }, a: 'é', b: 1, at: '2030-12-31' };
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(digestJson(a), digestJson(b));
  assert.notEqual(digestJson({ a: 1 }), digestJson({ a: 2 }));
});

test('text digest ignores CRLF vs LF; set digest ignores order', () => {
  assert.equal(digestText('سطر\r\nدوسری'), digestText('سطر\nدوسری'));
  assert.equal(digestSet(['b', 'a']), digestSet(['a', 'b']));
});

test('episode contract: valid fixture passes, invalid fixture fails with reasons', () => {
  assert.equal(validate('episode', fixture('episode.valid.json')).ok, true);
  const bad = validate('episode', fixture('episode.invalid.json'));
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.length >= 3, bad.errors.join('\n'));
});

const base: Digests = {
  source: 's1', script: 'sc1', cta: 'c1', voice_cards: 'v1', character: 'ch1', brand: 'b1',
  assets: 'a1', captions: 'cap1', final: 'f1', platform_pack: 'p1',
};
const approve = (gate: ApprovalEvent['gate'], d: Digests, by = 'owner'): ApprovalEvent =>
  ({ gate, decision: 'approve', by, at: '2026-10-26T00:00:00Z', digests: bindDigests(gate, d) });
const allApproved = [approve('script', base), approve('assets', base), approve('render', base)];

test('all gates valid while digests are unchanged', () => {
  const s = evaluate(allApproved, base);
  assert.deepEqual([s.script.valid, s.assets.valid, s.render.valid], [true, true, true]);
});

test('acceptance 1: changing the script voids asset and render approvals', () => {
  const s = evaluate(allApproved, { ...base, script: 'sc2' });
  assert.equal(s.script.valid, false);
  assert.equal(s.assets.valid, false);
  assert.equal(s.render.valid, false);
  assert.match(s.render.reason, /upstream assets/);
});

test('acceptance 1: changing a voice card voids assets and render but not the script', () => {
  const s = evaluate(allApproved, { ...base, voice_cards: 'v2' });
  assert.deepEqual([s.script.valid, s.assets.valid, s.render.valid], [true, false, false]);
});

test('acceptance 2: changing only platform hashtags voids nothing', () => {
  const s = evaluate(allApproved, { ...base, platform_pack: 'p2' });
  assert.deepEqual([s.script.valid, s.assets.valid, s.render.valid], [true, true, true]);
});

test('an approval not made by the owner is never valid (PI-03)', () => {
  const s = evaluate([approve('script', base, 'claude')], base);
  assert.equal(s.script.valid, false);
});

test('binding fails closed when a digest is missing', () => {
  assert.throws(() => bindDigests('render', { ...base, final: undefined }), /final/);
});

test('approve.ts refuses a non-interactive shell (PI-03)', () => {
  const r = spawnSync(process.execPath, ['--import', 'tsx', join(VS_ROOT, 'scripts', 'approve.ts'), '20261026-x', 'script'],
    { cwd: VS_ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /interactive terminal/);
});

test('MEDIA_ROOT inside the repo is refused (constitution XIII)', () => {
  assert.throws(() => mediaRoot({ MEDIA_ROOT: join(REPO_ROOT, 'video-studio', 'media') }), /inside the repo/);
  assert.doesNotThrow(() => mediaRoot({ MEDIA_ROOT: '/tmp/vs-media-test' }));
});

test('caption chunking: at most 4 words per row and 2 rows per window', () => {
  const w = chunk('ایک دو تین چار پانچ چھ سات آٹھ نو', 4, 2);
  assert.deepEqual(w.map((x) => x.length), [2, 1]);
  assert.ok(w.flat().every((row) => row.split(' ').length <= 4));
});
