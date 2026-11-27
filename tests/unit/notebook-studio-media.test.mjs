import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { planItem, advance, block, uploadsOn, spotCheckSheet, itemKey, DAILY_UPLOAD_LIMIT } from '../../scripts/notebook-studio/media-ledger.mjs';
import { parseProbe, parseEbur128, parseSilences, parseBlack, evaluate } from '../../scripts/notebook-studio/media-qa.mjs';
import { buildMeta, routeFromIndex } from '../../scripts/notebook-studio/youtube-meta.mjs';
import { wrap, cardSvg } from '../../scripts/notebook-studio/audio-to-video.mjs';
import { placeIntoManifest, placeDocs } from '../../scripts/notebook-studio/place-media.mjs';
import { checkStudio } from '../../scripts/check-studio-manifest.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SHA = (c) => c.repeat(64);
const gate = (verdict = 'pass') => ({ verdict, by: 'test', date: '2026-11-09' });
const base = { topic: 1, locale: 'en', kind: 'audio', part: 1, title: 'Winning attention', prompt_ref: 'specs/studio/prompts/audio.md v2' };

/** Walk one item from planned to the given state with valid evidence. */
function walk(ledger, key, upto, { sha = SHA('a'), now = new Date('2026-11-09T10:00:00Z'), ledgers } = {}) {
  const steps = {
    generated: { artifact_id: 'art-1' },
    downloaded: { file: '~/studio-media/x.m4a', sha256: sha },
    'qa1-pass': { gates: { qa1: gate() } },
    encoded: { encoded_file: '~/studio-media/x.mp4', thumbnail_file: '~/studio-media/x.mp4.thumb.jpg' },
    'qa2-pass': { gates: { qa2: gate() } },
    'uploaded-private': { youtube_id: 'dQw4w9WgXcQ', uploaded_at: now.toISOString() },
    'qa3-pass': { gates: { qa3: gate() } },
  };
  for (const [state, fields] of Object.entries(steps)) {
    advance(ledger, key, state, fields, { now, ledgers: ledgers ?? [ledger] });
    if (state === upto) return;
  }
}

describe('media ledger state machine', () => {
  it('plans an item with a stable key and refuses duplicates', () => {
    const l = { course: 'efmp-301', unit: 4, items: [] };
    expect(planItem(l, base).key).toBe('t1-en-audio-p1');
    expect(itemKey({ topic: 2, locale: 'ur', kind: 'video' })).toBe('t2-ur-video');
    expect(() => planItem(l, base)).toThrow(/already/);
  });

  it('moves one step at a time and demands the evidence for each state', () => {
    const l = { course: 'efmp-301', unit: 4, items: [] };
    const { key } = planItem(l, base);
    expect(() => advance(l, key, 'downloaded', { file: 'f', sha256: SHA('a') })).toThrow(/not the next state/);
    expect(() => advance(l, key, 'generated', {})).toThrow(/needs artifact_id/);
    walk(l, key, 'downloaded');
    expect(() => advance(l, key, 'qa1-pass', { gates: { qa1: gate('fail') } })).toThrow(/verdict is fail/);
    block(l, key, 'loudness');
    expect(() => advance(l, key, 'qa1-pass', { gates: { qa1: gate() } })).toThrow(/blocked/);
  });

  it('refuses a file already in any ledger (sha256 dedupe)', () => {
    const l = { course: 'efmp-301', unit: 4, items: [] };
    const a = planItem(l, base).key;
    const b = planItem(l, { ...base, part: 2 }).key;
    walk(l, a, 'downloaded', { sha: SHA('b') });
    advance(l, b, 'generated', { artifact_id: 'art-2' });
    expect(() => advance(l, b, 'downloaded', { file: 'g', sha256: SHA('b') })).toThrow(/identical to t1-en-audio-p1/);
  });

  it('stops uploads at the daily limit, counted per Pacific day', () => {
    const now = new Date('2026-11-09T10:00:00Z');
    const full = { course: 'x-100', unit: 1, items: Array.from({ length: DAILY_UPLOAD_LIMIT }, (_, i) => ({ key: `k${i}`, uploaded_at: now.toISOString() })) };
    expect(uploadsOn([full], now)).toBe(DAILY_UPLOAD_LIMIT);
    // 10:00 UTC on 10 Nov is 02:00 PST on 10 Nov: a new Pacific day, so the count resets.
    expect(uploadsOn([full], new Date('2026-11-10T10:00:00Z'))).toBe(0);
    const l = { course: 'efmp-301', unit: 4, items: [] };
    const { key } = planItem(l, base);
    expect(() => walk(l, key, 'uploaded-private', { now, ledgers: [l, full] })).toThrow(/daily upload limit/);
  });

  it('builds the owner spot-check sheet: first per locale and kind, plus noted items', () => {
    const l = { course: 'efmp-301', unit: 4, items: [] };
    const a = planItem(l, base).key;
    const b = planItem(l, { ...base, part: 2 }).key;
    const c = planItem(l, { ...base, part: 3 }).key;
    walk(l, a, 'qa3-pass', { sha: SHA('1') });
    walk(l, b, 'qa3-pass', { sha: SHA('2') });
    walk(l, c, 'qa3-pass', { sha: SHA('3') });
    l.items[2].gates.qa2 = { ...gate('pass-with-notes'), notes: 'says 5 properties, text has 3' };
    const s = spotCheckSheet(l);
    expect(s.must_hear.map((r) => r.key)).toEqual([a, c]);
    expect(s.others).toBe(1);
    expect(s.must_hear[0].url).toBe('https://youtu.be/dQw4w9WgXcQ');
  });
});

describe('mind map and study guide items (#908)', () => {
  const mm = { topic: 1, locale: 'en', kind: 'mindmap', title: 'Topic 2.1 mind map', alt: 'Mind map of the topic', prompt_ref: 'specs/studio/prompts/mindmap.md v1' };
  const sg = { topic: 1, locale: 'ur', kind: 'studyguide', title: 'اسٹڈی گائیڈ', prompt_ref: 'specs/studio/prompts/study-guide.md v1' };

  it('plans English-only mind maps and walks the short doc path to placed', () => {
    const l = { course: 'geng-300', unit: 2, items: [] };
    expect(planItem(l, mm).key).toBe('t1-en-mindmap');
    expect(() => planItem(l, { ...mm, locale: 'ur' })).toThrow(/English only/);
    expect(() => planItem(l, { ...sg, part: 2 })).toThrow(/no parts/);
    expect(() => planItem(l, { ...mm, kind: 'poster' })).toThrow(/kind must be/);
    advance(l, 't1-en-mindmap', 'generated', { artifact_id: 'n1' });
    advance(l, 't1-en-mindmap', 'downloaded', { file: '~/studio-media/geng-300/unit-02/t1-en-mindmap.json', sha256: SHA('c') });
    expect(() => advance(l, 't1-en-mindmap', 'qa1-pass', { gates: { qa1: gate() } })).toThrow(/not the next state \(qa2-pass\)/);
    advance(l, 't1-en-mindmap', 'qa2-pass', { gates: { qa2: gate() } });
    expect(() => advance(l, 't1-en-mindmap', 'placed', {})).toThrow(/needs asset_path/);
    advance(l, 't1-en-mindmap', 'placed', { asset_path: '/studio/geng-300/unit-02/topic-01/mindmap.en.json' });
    expect(l.items[0].state).toBe('placed');
  });

  it('places a cleaned study guide and an EN+UR mind map with asset paths', () => {
    const ledger = { course: 'geng-300', unit: 2, items: [
      { ...mm, key: 't1-en-mindmap', state: 'qa2-pass', artifact_id: 'n1', file: 'mm.json', gates: { qa2: gate() }, history: [] },
      { ...sg, key: 't1-ur-studyguide', state: 'qa2-pass', file: 'sg.md', gates: { qa2: { ...gate('pass-with-notes'), notes: 'one term fixed' } }, history: [] },
      { ...mm, topic: 2, key: 't2-en-mindmap', state: 'downloaded', file: 'x', gates: {}, history: [] },
    ] };
    const files = {
      'mm.json': JSON.stringify({ name: 'Reading', children: [{ name: 'Fluency', children: [] }] }),
      'sg.md': '# گائیڈ\n\n## Key ideas\nText.\n\n## Answer Key\n1. secret\n',
    };
    const manifest = { course: 'geng-300', unit: 2, notebook_id: 'nb-12345678', artifacts: [] };
    const r = placeDocs(manifest, ledger, {
      read: (f) => files[f],
      labels: (t) => (t === 1 ? { en_fix: { Fluency: 'Reading fluency' }, ur: { Reading: 'مطالعہ', 'Reading fluency': 'روانی' }, ur_title: 'موضوع 2.1 mind map' } : null),
      now: new Date('2026-11-27T10:00:00Z'),
    });
    expect(r.placed.map((p) => p.key)).toEqual(['t1-en-mindmap', 't1-ur-studyguide']);
    const by = Object.fromEntries(r.writes.map((w) => [w.asset_path, w.body]));
    expect(JSON.parse(by['/studio/geng-300/unit-02/topic-01/mindmap.en.json']).children[0].label).toBe('Reading fluency');
    expect(JSON.parse(by['/studio/geng-300/unit-02/topic-01/mindmap.ur.json']).label).toBe('مطالعہ');
    expect(by['/studio/geng-300/unit-02/topic-01/studyguide.ur.md']).not.toMatch(/secret|Answer Key/);
    expect(manifest.artifacts.map((a) => `${a.locale}-${a.kind}`)).toEqual(['en-mindmap', 'ur-mindmap', 'ur-studyguide']);
    expect(manifest.artifacts[1]).toMatchObject({ status: 'placed', title: 'موضوع 2.1 mind map', asset_path: '/studio/geng-300/unit-02/topic-01/mindmap.ur.json' });
    expect(manifest.artifacts[2].review).toMatchObject({ verdict: 'pass-with-notes', notes: 'one term fixed' });
    // a mind map node with no Urdu label stops placement instead of shipping English in the Urdu tree
    ledger.items[0].state = 'qa2-pass';
    expect(() => placeDocs({ artifacts: [] }, ledger, { read: (f) => files[f], labels: () => ({ ur: { Reading: 'مطالعہ' } }) })).toThrow(/No Urdu label/);
  });
});

describe('QG1 technical gate', () => {
  const probe = parseProbe({
    format: { duration: '412.3' },
    streams: [{ codec_type: 'audio', codec_name: 'aac', duration: '412.3', channels: 2 }, { codec_type: 'video', codec_name: 'h264', width: 1920, height: 1080, duration: '412.2' }],
  });
  const ebur = 'blah\n[Parsed_ebur128_0 @ 0x1] Summary:\n\n  Integrated loudness:\n    I:         -16.4 LUFS\n    Threshold: -26.6 LUFS\n\n  True peak:\n    Peak:       -1.6 dBFS\n';

  it('parses ffprobe, ebur128, silence and black output', () => {
    expect(probe.video.height).toBe(1080);
    expect(parseEbur128(ebur)).toEqual({ integrated_lufs: -16.4, true_peak_dbfs: -1.6 });
    expect(parseSilences('silence_end: 12.1 | silence_duration: 2.31\nsilence_end: 40 | silence_duration: 5.5')).toEqual([2.31, 5.5]);
    expect(parseBlack('black_start:0 black_end:3.2 black_duration:3.2')).toEqual([3.2]);
  });

  it('passes a clean encoded audio card and fails loud, long-silent or short files', () => {
    const loud = parseEbur128(ebur);
    expect(evaluate({ kind: 'audio', stage: 'encoded', probe, loudness: loud, silences: [2.3] }).verdict).toBe('pass');
    const bad = evaluate({ kind: 'audio', stage: 'encoded', probe: { ...probe, duration_s: 60 }, loudness: { integrated_lufs: -9, true_peak_dbfs: 0.2 }, silences: [6] });
    expect(bad.verdict).toBe('fail');
    expect(bad.findings.join(' ')).toMatch(/duration 60 s.*silence.*loudness -9.*true peak 0.2/s);
  });

  it('checks video height and black runs, and ignores loudness on the source stage', () => {
    const low = { ...probe, video: { ...probe.video, height: 480 } };
    const r = evaluate({ kind: 'video', stage: 'source', probe: low, blacks: [3] });
    expect(r.findings).toEqual(['video height 480p < 720p', '1 black run(s) longer than 2 s']);
  });
});

describe('YouTube metadata', () => {
  const item = { ...base, key: 't1-en-audio-p1', thumbnail_file: '~/studio-media/t.jpg' };
  it('resolves the published lesson route from the content index', () => {
    // static/content-index.json is generated at build time and absent in CI unit tests, so use a fixture.
    const idx = [
      { course_code: 'EFMP-301', unit_no: 4, topic_no: 1, kind: 'topic', coming_soon: false, permalink: '/semester-1/efmp-301/unit-04/topic-01' },
      { course_code: 'EFMP-301', unit_no: 4, topic_no: 2, kind: 'topic', coming_soon: true, permalink: '/semester-1/efmp-301/unit-04/topic-02' },
    ];
    expect(routeFromIndex(idx, 'efmp-301', 4, 1)).toBe('/semester-1/efmp-301/unit-04/topic-01');
    expect(() => routeFromIndex(idx, 'efmp-301', 4, 2)).toThrow(/no published route/);
    expect(() => routeFromIndex(idx, 'efmp-301', 99, 1)).toThrow(/no published route/);
  });
  it('builds private-first metadata with disclosure, lesson link and limits', () => {
    const m = buildMeta({ ...item, title: `${'Long title '.repeat(12)}\u2014 <b>` }, { course: 'efmp-301', unit: 4, route: '/semester-1/efmp-301/unit-04/topic-01', playlistId: 'PLx' });
    expect(m.upload_video.privacy_status).toBe('private');
    expect(m.upload_video.title.length).toBeLessThanOrEqual(100);
    expect(m.upload_video.title).not.toMatch(/[\u2014<>]/);
    expect(m.upload_video.description).toContain('https://textbook.com.pk/semester-1/efmp-301/unit-04/topic-01');
    expect(m.upload_video.description).toMatch(/AI-generated/);
    expect(m.update_video).toEqual({ playlist_id: 'PLx', thumbnail_file: '~/studio-media/t.jpg', contains_synthetic_media: true });
    const ur = buildMeta({ ...item, locale: 'ur' }, { course: 'efmp-301', unit: 4, route: '/semester-1/efmp-301/unit-04/topic-01' });
    expect(ur.lesson_url).toBe('https://textbook.com.pk/ur/semester-1/efmp-301/unit-04/topic-01');
  });
});

describe('audio card', () => {
  it('wraps titles and ellipsises past the line budget', () => {
    expect(wrap('one two three four', 9)).toEqual(['one two', 'three', 'four']);
    expect(wrap('a b c d e f g h', 3, 2)).toEqual(['a b', 'c …']);
  });
  it('escapes markup and sets rtl for Urdu', () => {
    const svg = cardSvg({ title: 'A <b> & C', course: 'efmp-301', unit: 4, topic: 1, locale: 'ur', kind: 'audio', part: 1 });
    expect(svg).toContain('A &lt;b&gt; &amp; C');
    expect(svg).toContain('direction="rtl"');
    expect(svg).toContain('Noto Nastaliq Urdu');
  });
});

describe('placement and gate', () => {
  it('writes a placed YouTube row for each public item, updating an existing row', () => {
    const manifest = { artifacts: [{ topic: 1, locale: 'en', kind: 'audio', part: 1, status: 'reviewed', title: 'Old', prompt_ref: 'specs/studio/prompts/audio.md v2', artifact_id: 'art-1' }] };
    const ledger = { items: [{ ...base, key: 't1-en-audio-p1', state: 'public', artifact_id: 'art-1', youtube_id: 'dQw4w9WgXcQ', gates: { qa2: gate(), owner: { ...gate('approve'), date: '2026-11-10' } } }] };
    expect(placeIntoManifest(manifest, ledger)).toEqual(['t1-en-audio-p1']);
    expect(manifest.artifacts).toHaveLength(1);
    expect(manifest.artifacts[0]).toMatchObject({ status: 'placed', host_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', review: { verdict: 'pass', date: '2026-11-10' } });
  });

  it('check-studio-manifest rejects media files and invalid ledgers', () => {
    const root = mkdtempSync(join(tmpdir(), 'studio-media-'));
    cpSync(join(ROOT, 'specs', 'studio'), join(root, 'specs', 'studio'), { recursive: true });
    cpSync(join(ROOT, 'static', 'studio'), join(root, 'static', 'studio'), { recursive: true });
    writeFileSync(join(root, 'static', 'studio', 'efmp-301', 'leak.m4a'), 'x');
    writeFileSync(join(root, 'specs', 'studio', 'efmp-301', 'media-unit-04.json'), JSON.stringify({
      course: 'efmp-301', unit: 4,
      items: [{ key: 't1-en-audio-p1', topic: 1, locale: 'en', kind: 'audio', part: 1, title: 'Brief', prompt_ref: 'specs/studio/prompts/audio.md v2', state: 'public', gates: {}, history: [] },
        { key: 't1-en-mindmap', topic: 1, locale: 'en', kind: 'mindmap', title: 'Map', prompt_ref: 'specs/studio/prompts/mindmap.md v1', state: 'placed', asset_path: '/studio/efmp-301/unit-04/topic-01/mindmap.en.json', gates: {}, history: [] },
        { key: 't2-en-studyguide', topic: 2, locale: 'en', kind: 'studyguide', title: 'Guide', prompt_ref: 'specs/studio/prompts/study-guide.md v1', state: 'placed', asset_path: '/studio/efmp-301/unit-04/topic-02/studyguide.en.md', gates: {}, history: [] }],
    }));
    mkdirSync(join(root, 'static', 'studio', 'tmp'), { recursive: true });
    const f = checkStudio(root).join('\n');
    expect(f).toMatch(/leak\.m4a: media file in the repo/);
    expect(f).toMatch(/t1-en-audio-p1 is public without a youtube_id/);
    expect(f).not.toMatch(/t1-en-mindmap/);
    expect(f).toMatch(/t2-en-studyguide is placed but \/studio\/efmp-301\/unit-04\/topic-02\/studyguide\.en\.md is not in static/);
  });
});
