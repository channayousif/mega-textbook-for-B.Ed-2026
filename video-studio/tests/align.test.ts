import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { alignLines, sentenceCues } from '../remotion/src/align.ts';
import { episodeProps, END_CARD_S, GAP_S, LEAD_S } from '../scripts/lib/episode-props.ts';
import { digestBytes } from '../scripts/lib/hash.ts';
import { toneWav, wavSeconds } from '../scripts/lib/wav.ts';

const line = { id: 'L04', speaker: 'ustani' as const, text_ur: 'منفی تقویت وہ چیز ہٹاتی ہے۔ یہ سزا نہیں ہے؛ یہ بھی رویہ مضبوط کرتی ہے۔', from_s: 2, to_s: 8 };

test('sentence cues split at Urdu punctuation, cover the line exactly and share time by length', () => {
  const cues = sentenceCues(line, 7, 2);
  assert.deepEqual(cues.map((c) => c.text_ur), ['منفی تقویت وہ چیز ہٹاتی ہے۔', 'یہ سزا نہیں ہے؛', 'یہ بھی رویہ مضبوط کرتی ہے۔']);
  assert.equal(cues[0].from_s, 2);
  assert.equal(cues[2].to_s, 8);
  for (let i = 1; i < cues.length; i++) assert.equal(cues[i].from_s, cues[i - 1].to_s);
  assert.ok(cues[1].to_s - cues[1].from_s < cues[0].to_s - cues[0].from_s, 'shorter sentence, shorter cue');
  // A long sentence is still capped at the window size.
  assert.equal(sentenceCues({ ...line, text_ur: 'ایک دو تین چار پانچ چھ سات آٹھ' }, 3, 2).length, 2);
});

test('manual alignment wins for its line and is checked against the line text and span', () => {
  const manual = { L04: [{ text_ur: 'منفی تقویت وہ چیز ہٹاتی ہے۔ یہ سزا نہیں ہے؛', from_s: 2, to_s: 5.5 }, { text_ur: 'یہ بھی رویہ مضبوط کرتی ہے۔', from_s: 5.5, to_s: 8 }] };
  const r = alignLines([line], manual, 7, 2);
  assert.equal(r.source.L04, 'manual');
  assert.equal(r.lines[0].cues!.length, 2);
  assert.throws(() => alignLines([line], { L04: [{ text_ur: 'کچھ اور', from_s: 2, to_s: 8 }] }, 7, 2), /does not match/);
  assert.throws(() => alignLines([line], { L04: [{ ...manual.L04[1], from_s: 6, to_s: 5 }] }, 7, 2), /alignment.json rejected/);
  assert.throws(() => alignLines([line], { L09: manual.L04 }, 7, 2), /unknown lines: L09/);
});

const root = mkdtempSync(join(tmpdir(), 'vs-episode-props-'));
after(() => rmSync(root, { recursive: true, force: true }));

test('episode props: timeline from the audio lengths, hashes re-checked, missing takes refused', () => {
  const EP = '20261028-test-props';
  mkdirSync(join(root, EP, 'audio'), { recursive: true });
  const a1 = toneWav(1.2), a2 = toneWav(2.5, 330);
  writeFileSync(join(root, EP, 'audio', 'L01.wav'), a1);
  writeFileSync(join(root, EP, 'audio', 'L02.wav'), a2);
  assert.equal(wavSeconds(a2), 2.5);
  const entry = (id: string, b: Buffer, status = 'pending', speaker = 'ustani') =>
    ({ item_id: id, kind: 'audio', path: `${EP}/audio/${id}.wav`, sha256: digestBytes(b), status, voice: { character: speaker } });
  const script = {
    on_screen_title_ur: 'عنوان', cta: { text_ur: 'سبق پڑھیے۔', url: 'https://textbook.com.pk/ur/x/' },
    lines: [{ id: 'L01', speaker: 'shagird', text_ur: 'سوال؟' }, { id: 'L02', speaker: 'ustani', text_ur: 'پہلا جملہ۔ دوسرا جملہ۔' }],
  };
  const ep = { episode_id: EP, mode: 'sample', assets: { manifest: [entry('L01', a1, 'pending', 'shagird'), entry('L02', a2)] } };
  const r = episodeProps(ep, script, { media: root });
  const [l1, l2] = r.props.lines;
  assert.deepEqual([l1.from_s, l1.to_s], [LEAD_S, LEAD_S + 1.2]);
  assert.equal(l2.from_s, Math.round((LEAD_S + 1.2 + GAP_S) * 1000) / 1000);
  assert.equal(r.props.duration_s, Math.round((l2.to_s + 0.5 + END_CARD_S) * 1000) / 1000);
  assert.equal(l2.cues!.length, 2);
  assert.equal(r.props.mode, 'sample');
  assert.equal(Object.keys(r.audio).length, 2);

  // Production uses accepted takes only.
  assert.throws(() => episodeProps({ ...ep, mode: 'production' }, script, { media: root }), /no accepted take/);
  // Tampered bytes and wrong speaker fail closed.
  writeFileSync(join(root, EP, 'audio', 'L02.wav'), toneWav(2.5, 440));
  assert.throws(() => episodeProps(ep, script, { media: root }), /does not match its manifest/);
  writeFileSync(join(root, EP, 'audio', 'L02.wav'), a2);
  const wrong = { ...ep, assets: { manifest: [entry('L01', a1, 'pending', 'ustani'), entry('L02', a2)] } };
  assert.throws(() => episodeProps(wrong, script, { media: root }), /audio is ustani, line speaker is shagird/);
});
