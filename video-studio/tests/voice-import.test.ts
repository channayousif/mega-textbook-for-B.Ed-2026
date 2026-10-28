import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { probeAudio, sniffAudio } from '../scripts/lib/audio.ts';
import { parseConsentFields } from '../scripts/lib/consent.ts';
import { validate } from '../scripts/lib/schema.ts';
import { importVoiceLine, type ImportOptions } from '../scripts/lib/voice-import.ts';
import { toneWav } from '../scripts/lib/wav.ts';

const root = mkdtempSync(join(tmpdir(), 'vs-voice-import-'));
after(() => rmSync(root, { recursive: true, force: true }));
const media = join(root, 'media');
const voices = join(root, 'voices');
const EP = '20261028-test-episode';
mkdirSync(join(media, 'consents'), { recursive: true });
mkdirSync(join(media, EP, 'inbox'), { recursive: true });
mkdirSync(voices, { recursive: true });

const card = (cleared: boolean) => [
  '# Voice card: Ustani Farzana (test)',
  '',
  `- **Status:** locked. ${cleared ? '**Cleared to publish** under consent `narrator-09`.' : '**Not cleared to publish.**'}`,
  '- **Reference:** `refs/x.wav`, SHA-256 `' + 'a'.repeat(64) + '`.',
  '- **Licence / consent:** engine MIT. Voice: consent `narrator-09`.',
  '',
].join('\n');
const consent = (extra = '') => [
  '# Consent record narrator-09',
  '- Use: cloned by Chatterbox to voice',
  '  Ustani',
  '- Channels/platforms: YouTube',
  '- Processing by third parties: agreed (private Kaggle datasets)',
  extra,
].join('\n');
const setup = (o: { cleared?: boolean; consentExtra?: string } = {}) => {
  writeFileSync(join(voices, 'ustani.md'), card(o.cleared ?? true));
  writeFileSync(join(media, 'consents', '2026-10-narrator-09.md'), consent(o.consentExtra));
};
const inbox = (name: string, bytes: Buffer) => { const p = join(media, EP, 'inbox', name); writeFileSync(p, bytes); return p; };
const episode = (status = 'awaiting_assets') => ({ episode_id: EP, topic_id: 'test-episode', status, created_at: '2026-10-28T00:00:00Z', history: [] });
const script = { lines: [{ id: 'L02', speaker: 'ustani' }, { id: 'L01', speaker: 'shagird' }] };
const opts = (o: Partial<ImportOptions>): ImportOptions => ({
  episode: episode(), script, lineId: 'L02', file: inbox('take1.wav', toneWav(1.5, 220, 44_100)),
  character: 'ustani', sourceTool: 'chatterbox-hi', model: 'ResembleAI/Chatterbox-Multilingual-hi', take: 1,
  mediaRoot: media, voicesDir: voices, now: '2026-10-28T01:00:00Z', ...o,
});

test('consent fields: continuation lines join the previous value', () => {
  const f = parseConsentFields(consent());
  assert.equal(f['use'], 'cloned by Chatterbox to voice Ustani');
  assert.match(f['processing by third parties'], /^agreed/);
});

test('import normalises to PCM 48 kHz mono and records hash provenance as pending', async () => {
  setup();
  const r = await importVoiceLine(opts({}));
  const out = join(media, r.entry.path);
  assert.equal(r.entry.path, `${EP}/audio/L02.wav`);
  assert.deepEqual([probeAudio(out).sample_rate, probeAudio(out).channels, probeAudio(out).codec], [48_000, 1, 'pcm_s16le']);
  assert.equal(sniffAudio(out), 'wav');
  assert.equal(r.entry.status, 'pending');
  assert.equal(r.entry.voice.consent_id, 'narrator-09');
  assert.equal(r.entry.voice.reference_sha256, 'a'.repeat(64));
  assert.notEqual(r.entry.sha256, r.entry.source_sha256);
  assert.equal(r.episode.status, 'awaiting_assets');
  const v = validate('episode', r.episode);
  assert.ok(v.ok, v.errors.join('\n'));
});

test('same bytes again change nothing; a new take supersedes and reopens asset review', async () => {
  setup();
  const first = await importVoiceLine(opts({}));
  const again = await importVoiceLine(opts({ episode: first.episode, file: inbox('take1-copy.wav', toneWav(1.5, 220, 44_100)) }));
  assert.equal(again.unchanged, true);
  const approved = { ...first.episode, status: 'assets_approved' };
  const r = await importVoiceLine(opts({ episode: approved, file: inbox('take2.wav', toneWav(1.5, 330, 44_100)), take: 2, reason: 'mispronounced term' }));
  const [old, cur] = r.episode.assets.manifest;
  assert.equal(old.status, 'rejected');
  assert.equal(old.superseded_by, cur.sha256);
  assert.equal(cur.supersedes, old.sha256);
  assert.equal(cur.correction_reason, 'mispronounced term');
  assert.ok(existsSync(join(media, old.path)), 'replaced take is kept');
  assert.equal(r.episode.status, 'asset_review');
  assert.ok(validate('episode', r.episode).ok);
});

test('rights: uncleared card, withdrawn consent or out-of-scope character fail closed', async () => {
  setup({ cleared: false });
  await assert.rejects(importVoiceLine(opts({})), /not cleared to publish/);
  setup({ consentExtra: '- Withdrawn: 2026-11-01, told the owner' });
  await assert.rejects(importVoiceLine(opts({})), /withdrawn/);
  setup();
  writeFileSync(join(voices, 'ustani.md'), card(true).replace('Ustani Farzana', 'Bilal'));
  await assert.rejects(importVoiceLine(opts({})), /does not name Bilal/);
});

test('files: outside MEDIA_ROOT, symlinks, disguised or wrong-speaker lines are refused', async () => {
  setup();
  const outside = join(root, 'outside.wav');
  writeFileSync(outside, toneWav(1));
  await assert.rejects(importVoiceLine(opts({ file: outside })), /outside MEDIA_ROOT/);
  const link = join(media, EP, 'inbox', 'link.wav');
  symlinkSync(outside, link);
  await assert.rejects(importVoiceLine(opts({ file: link })), /symlink/);
  await assert.rejects(importVoiceLine(opts({ file: inbox('fake.mp3', toneWav(1)) })), /content is wav, name says .mp3/);
  await assert.rejects(importVoiceLine(opts({ file: inbox('text.wav', Buffer.from('not audio at all')) })), /not audio/);
  await assert.rejects(importVoiceLine(opts({ lineId: 'L01' })), /spoken by shagird/);
  await assert.rejects(importVoiceLine(opts({ file: inbox('blip.wav', toneWav(0.1)) })), /duration/);
});
