import { describe, it, expect } from 'vitest';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkScript, loadScript, teaserRoute, shortMeta, planTeaser, recordClip, setClipQa, advanceTeaser,
  chosenTakes, teaserSheet, WORD_BUDGET, MAX_RETAKES, TEASER_STATES,
} from '../../scripts/notebook-studio/teaser.mjs';
import { buildFilter, captionSvg, endCardSvg, XFADE, END_SECONDS } from '../../scripts/notebook-studio/assemble-teaser.mjs';
import { evaluate } from '../../scripts/notebook-studio/media-qa.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const base = () => structuredClone(loadScript('efmp-301', ROOT));
const gate = (verdict = 'pass') => ({ verdict, by: 'test', date: '2026-11-13' });
const clip = (n) => ({ artifact_id: `a${n}`, model: 'veo_fast', credits: 20 });

describe('QG0 teaser script check', () => {
  it('passes the EFMP-301 pilot script', () => {
    expect(checkScript(base(), ROOT)).toEqual([]);
  });
  it('rejects over-budget lines, long dashes, wrong beat order and missing sources', () => {
    const s = base();
    s.locales.en.narration[1] = Array.from({ length: WORD_BUDGET.en + 3 }, () => 'word').join(' ');
    s.locales.ur.narration[0] = 'ایک \u2014 دو تین';
    s.shots[4].beat = 'learn';
    s.sources.push('docs/semester-1/efmp-301/missing.mdx');
    const f = checkScript(s, ROOT).join('\n');
    expect(f).toMatch(/en shot 2: 21 words/);
    expect(f).toMatch(/long dash/);
    expect(f).toMatch(/shot 5 must be the call to action/);
    expect(f).toMatch(/source missing/);
  });
  it('fails the schema when a locale has four lines', () => {
    const s = base();
    s.locales.en.narration.pop();
    expect(checkScript(s, ROOT)[0]).toMatch(/^schema: /);
  });
});

describe('teaser links and YouTube metadata', () => {
  it('links courses to the course overview and the licence track to /licence/, with a trailing slash', () => {
    expect(teaserRoute(base(), ROOT)).toBe('/semester-1/efmp-301/course-overview/');
    expect(teaserRoute({ kind: 'licence' }, ROOT)).toBe('/licence/');
  });
  it('builds private Shorts metadata with the locale link, #Shorts, AI disclosure and a pinned comment', () => {
    const m = shortMeta(base(), 'ur', ROOT);
    expect(m.upload_video.status).toBe('private');
    expect(m.upload_video.contains_synthetic_media).toBe(true);
    expect(m.upload_video.title).toMatch(/#Shorts$/);
    expect(m.upload_video.title.length).toBeLessThanOrEqual(100);
    expect(m.url).toBe('https://textbook.com.pk/ur/semester-1/efmp-301/course-overview/');
    expect(m.upload_video.description).toContain(m.url);
    expect(m.pinned_comment).toContain(m.url);
  });
});

describe('teaser ledger', () => {
  const walkTo = (L, key, to, now = new Date('2026-11-13T10:00:00Z')) => {
    const steps = {
      scripted: { script_sha256: 'f'.repeat(64) },
      'script-approved': { gates: { script: { ...gate('approve'), by: 'owner' } } },
      assembled: { encoded_file: '~/studio-media/teasers/efmp-301/en/teaser.mp4' },
      'qa-pass': { gates: { qa1: gate() } },
      'uploaded-private': { youtube_id: 'dQw4w9WgXcQ', uploaded_at: now.toISOString() },
      'qa3-pass': { gates: { qa3: gate() } },
    };
    for (const st of TEASER_STATES.slice(1)) {
      if (st === 'clips-generated') {
        for (let n = 1; n <= 5; n++) recordClip(L, key, n, clip(n), now);
      }
      if (st === 'clips-qa') {
        for (let n = 1; n <= 5; n++) setClipQa(L, key, n, 1, gate());
        steps['clips-qa'] = { gates: { clips: gate() } };
      }
      advanceTeaser(L, key, st, steps[st] ?? {}, { now, ledgers: [] });
      if (st === to) return;
    }
  };

  it('plans one item per teaser and locale and refuses duplicates', () => {
    const L = { items: [] };
    expect(planTeaser(L, 'efmp-301', 'en').key).toBe('efmp-301-en');
    expect(() => planTeaser(L, 'efmp-301', 'en')).toThrow(/already/);
  });
  it('records clips only after the owner approved the script', () => {
    const L = { items: [] };
    planTeaser(L, 'efmp-301', 'en');
    walkTo(L, 'efmp-301-en', 'scripted');
    expect(() => recordClip(L, 'efmp-301-en', 1, clip(1))).toThrow(/only after script approval/);
    expect(() => advanceTeaser(L, 'efmp-301-en', 'script-approved', { gates: { script: gate('revise') } })).toThrow(/verdict is revise/);
  });
  it('caps retakes per shot and needs a passing take for every shot', () => {
    const L = { items: [] };
    planTeaser(L, 'efmp-301', 'ur');
    walkTo(L, 'efmp-301-ur', 'script-approved');
    for (let t = 0; t <= MAX_RETAKES; t++) recordClip(L, 'efmp-301-ur', 1, clip(1));
    expect(() => recordClip(L, 'efmp-301-ur', 1, clip(1))).toThrow(/limit is 3/);
    for (let n = 2; n <= 5; n++) recordClip(L, 'efmp-301-ur', n, clip(n));
    advanceTeaser(L, 'efmp-301-ur', 'clips-generated', {}, { ledgers: [] });
    setClipQa(L, 'efmp-301-ur', 1, 3, gate());
    expect(() => advanceTeaser(L, 'efmp-301-ur', 'clips-qa', { gates: { clips: gate() } }, { ledgers: [] })).toThrow(/no passing take for shot\(s\) 2, 3, 4, 5/);
    expect(chosenTakes(L.items[0])[0].take).toBe(3);
  });
  it('walks to qa3-pass and lists the first teaser per locale on the owner sheet', () => {
    const L = { items: [] };
    planTeaser(L, 'efmp-301', 'en');
    planTeaser(L, 'geng-300', 'en');
    walkTo(L, 'efmp-301-en', 'qa3-pass');
    walkTo(L, 'geng-300-en', 'qa3-pass');
    expect(() => advanceTeaser(L, 'efmp-301-en', 'approved', { gates: { owner: gate('revise') } }, { ledgers: [] })).toThrow(/verdict is revise/);
    const sheet = teaserSheet(L);
    expect(sheet.must_watch.map((r) => r.key)).toEqual(['efmp-301-en']);
    expect(sheet.must_watch[0].url).toBe('https://youtube.com/shorts/dQw4w9WgXcQ');
    expect(sheet.others).toBe(1);
  });
});

describe('assembler graph and captions', () => {
  it('chains five shots and the end card with cross-fades and predicts the length', () => {
    const { graph, duration } = buildFilter([8, 8, 8, 8, 8]);
    expect(duration).toBeCloseTo(5 * 8 + END_SECONDS - 5 * XFADE, 3);
    expect(graph).toContain('xfade=transition=fade:duration=0.2:offset=7.8[x1]');
    expect(graph).toContain('offset=39[vout]');
    expect(graph).toMatch(/\[y5\]loudnorm=I=-16.*alimiter/);
    expect(graph.match(/overlay=0:0:shortest=1/g)).toHaveLength(5);
  });
  it('never truncates a caption and lays Urdu out right to left', () => {
    const long = 'You will study motivation, intelligence, individual differences and special needs, and how to manage a real classroom.';
    const en = captionSvg(long, 'en');
    expect(en).not.toContain('…');
    expect(en.match(/<text /g).length).toBeGreaterThanOrEqual(4);
    const ur = captionSvg('ایک ہی کلاس، ایک ہی سبق۔ کچھ بچے جلدی سیکھتے ہیں اور کچھ پیچھے رہ جاتے ہیں۔ کیوں؟', 'ur');
    expect(ur).toContain('direction="rtl"');
    expect(ur).toContain('کیوں؟');
    expect(ur).not.toContain('…');
  });
  it('puts the host and the escaped path on the end card', () => {
    const svg = endCardSvg({ title: 'Educational Psychology (EFMP-301)', cta: 'Study the full course free', url: 'https://textbook.com.pk/semester-1/efmp-301/course-overview/', locale: 'en' });
    expect(svg).toContain('textbook.com.pk</text>');
    expect(svg).toContain('/semester-1/efmp-301/course-overview/');
  });
});

describe('QG1 for clips and Shorts', () => {
  const probe = (w, h, d) => ({ duration_s: d, audio: { codec: 'aac', duration_s: d, channels: 2 }, video: { codec: 'h264', width: w, height: h, duration_s: d } });
  it('accepts a vertical 8 s Veo clip and rejects a landscape one', () => {
    expect(evaluate({ kind: 'clip', probe: probe(720, 1280, 8) }).verdict).toBe('pass');
    expect(evaluate({ kind: 'clip', probe: probe(1280, 720, 8) }).findings.join()).toMatch(/not vertical/);
  });
  it('allows the 5 s silent end card in a Short but not a longer gap', () => {
    const loud = { integrated_lufs: -16, true_peak_dbfs: -1.5 };
    expect(evaluate({ kind: 'short', stage: 'encoded', probe: probe(1080, 1920, 44), loudness: loud, silences: [4.7] }).verdict).toBe('pass');
    expect(evaluate({ kind: 'short', stage: 'encoded', probe: probe(1080, 1920, 44), loudness: loud, silences: [7] }).verdict).toBe('fail');
    expect(evaluate({ kind: 'short', stage: 'encoded', probe: probe(1080, 1920, 75), loudness: loud }).findings.join()).toMatch(/outside 20-60/);
  });
});
