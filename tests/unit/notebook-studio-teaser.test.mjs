import { describe, it, expect } from 'vitest';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkScript, loadScript, teaserRoute, shortMeta, socialMeta, recordCrosspost, SUBSCRIBE_URL, CAPTION_LIMIT, planTeaser, recordClip, setClipQa, advanceTeaser,
  chosenTakes, teaserSheet, WORD_BUDGET, MAX_RETAKES, TEASER_STATES,
} from '../../scripts/notebook-studio/teaser.mjs';
import { buildFilter, speechSegments, captionSvg, endCardSvg, parseCropdetect, bidiUr, ctaSvg, ctaWindows, PLATFORM_CTA, END_SECONDS, PACE } from '../../scripts/notebook-studio/assemble-teaser.mjs';
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
  it('accepts an Urdu-only script and still requires the Urdu locale (D-2026-0083)', () => {
    const s = base();
    delete s.locales.en;
    expect(checkScript(s, ROOT)).toEqual([]);
    expect(() => shortMeta(s, 'en', ROOT)).toThrow(/no en locale/);
    delete s.locales.ur;
    expect(checkScript(s, ROOT)[0]).toMatch(/^schema: /);
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
  it('writes a search-ready description: keyword line first, subscribe link, no long dash, tags under the cap', () => {
    const m = shortMeta(base(), 'ur', ROOT);
    const d = m.upload_video.description;
    expect(d.split('\n')[0]).toMatch(/^تعلیمی نفسیات \| Educational Psychology \(EFMP-301\)/);
    expect(d).toContain(SUBSCRIBE_URL);
    expect(m.pinned_comment).toContain(SUBSCRIBE_URL);
    expect(d).not.toMatch(/[\u2014\u2015]/);
    expect(d.length).toBeLessThan(5000);
    expect(d.trim().split('\n').at(-1)).toMatch(/^#BEd #EducationalPsychology #TeacherEducation/);
    expect(m.upload_video.tags.length).toBeLessThanOrEqual(500);
    // every narration line the owner approved appears; nothing else is claimed about the course
    for (const l of base().locales.ur.narration.slice(0, 4)) expect(d).toContain(l);
  });
  it('captions cross-posts per platform: link in bio where links are dead, the link where they work', () => {
    const tt = socialMeta(base(), 'ur', 'tiktok', ROOT);
    expect(tt.caption).toContain('لنک بائیو میں');
    expect(tt.caption).not.toContain('https://');
    const fb = socialMeta(base(), 'ur', 'facebook', ROOT);
    expect(fb.caption).toContain('https://textbook.com.pk/ur/semester-1/efmp-301/course-overview/');
    for (const p of Object.keys(CAPTION_LIMIT)) expect(socialMeta(base(), 'ur', p, ROOT).caption.length).toBeLessThanOrEqual(CAPTION_LIMIT[p]);
    expect(() => socialMeta(base(), 'ur', 'myspace', ROOT)).toThrow(/unknown/);
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
  it('records cross-posts only once the YouTube Short is public', () => {
    const L = { items: [] };
    planTeaser(L, 'efmp-301', 'ur');
    walkTo(L, 'efmp-301-ur', 'qa3-pass');
    expect(() => recordCrosspost(L, 'efmp-301-ur', 'tiktok', { state: 'draft', post_id: 'p1' })).toThrow(/only after the YouTube Short is public/);
    advanceTeaser(L, 'efmp-301-ur', 'approved', { gates: { owner: { ...gate(), by: 'owner' } } }, { ledgers: [] });
    advanceTeaser(L, 'efmp-301-ur', 'public', { published_at: '2026-11-17T10:00:00Z' }, { ledgers: [] });
    expect(() => recordCrosspost(L, 'efmp-301-ur', 'tiktok', { state: 'live', post_id: 'p1' })).toThrow(/draft or posted/);
    expect(() => recordCrosspost(L, 'efmp-301-ur', 'myspace', { state: 'draft', post_id: 'p1' })).toThrow(/unknown/);
    const item = recordCrosspost(L, 'efmp-301-ur', 'tiktok', { state: 'draft', post_id: 'p1' }, { now: new Date('2026-11-17T11:00:00Z') });
    expect(item.crossposts.tiktok).toEqual({ state: 'draft', post_id: 'p1', at: '2026-11-17T11:00:00.000Z' });
  });
});

describe('assembler graph and captions', () => {
  it('chains the cut segments and the end card with hard cuts, whooshes and a ducked beat, and predicts the length', () => {
    const segs = [0, 1, 2, 3, 4].map((shot) => ({ shot, a: 0, b: 7.84 }));
    const { graph, duration, cuts } = buildFilter(segs);
    const seg = Math.ceil((7.84 / PACE.speed) * 30) / 30;
    expect(duration).toBeCloseTo(5 * seg + END_SECONDS, 3);
    expect(cuts).toHaveLength(6);
    expect(graph).toContain(`atempo=${PACE.speed}`);
    expect(graph).toContain('concat=n=6:v=1:a=0[vout]');
    expect(graph).toMatch(/sidechaincompress.*\[duck\]/);
    expect(graph).toMatch(/loudnorm=I=-15\.5.*alimiter.*\[aout\]$/);
    expect(graph.match(/overlay=0:0:shortest=1/g)).toHaveLength(5);
    expect(graph.match(/anoisesrc/g)).toHaveLength(5);
    expect(graph).toContain("zoompan=z='1.1+"); // alternate segments punch in
  });
  it('crops Veo letterbox bars before filling the frame, and ignores a full frame', () => {
    const log = 'x crop=720:1074:0:98 y\n'.repeat(5) + 'crop=720:1280:0:0\n';
    const c = parseCropdetect(log, 720, 1280);
    expect(c).toEqual({ w: 720, h: 1074, x: 0, y: 98 });
    expect(parseCropdetect('crop=720:1280:0:0\n', 720, 1280)).toBeNull();
    const { graph } = buildFilter([{ shot: 0, a: 0, b: 8 }, { shot: 1, a: 0, b: 8 }], { shots: 2, crops: [c, null] });
    expect(graph).toMatch(/\[0:v\]trim=0:8,setpts=[^;]*,crop=720:1074:0:98,scale=1080:1920/);
    expect(graph).toMatch(/\[1:v\]trim=0:8,setpts=\(PTS-STARTPTS\)\/[\d.]+,scale=1080:1920/);
  });
  it('cuts dead air: keeps short pauses, splits on long ones and trims the head and tail', () => {
    // shot 1 of the EFMP-301 pilot: a 0.9 s pause mid-line and a 0.5 s tail
    const log = ['silence_start: 1.11', 'silence_end: 1.36', 'silence_start: 2.18', 'silence_end: 3.07', 'silence_start: 7.46'].join('\n');
    expect(speechSegments(log, 7.93)).toEqual([{ a: 0, b: 2.3 }, { a: 2.95, b: 7.58 }]);
    expect(speechSegments('', 8)).toEqual([{ a: 0, b: 8 }]);
  });
  it('shows the platform-aware follow reminder three times over the shots, never on the end card', () => {
    expect(ctaSvg('youtube', 'ur')).toContain('چینل سبسکرائب کریں');
    expect(ctaSvg('tiktok', 'ur')).toContain('فالو کریں');
    expect(() => ctaSvg('myspace', 'ur')).toThrow(/unknown platform/);
    const w = ctaWindows(31.4);
    expect(w).toHaveLength(3);
    for (const [a, b] of w) { expect(a).toBeGreaterThan(0); expect(b).toBeLessThanOrEqual(31.4 - 0.3); }
    const segs = [0, 1].map((shot) => ({ shot, a: 0, b: 8 }));
    const { graph, windows } = buildFilter(segs, { shots: 2, cta: true });
    expect(windows).toHaveLength(3);
    expect(graph.match(/enable='between\(t,/g)).toHaveLength(3);
    expect(graph).toContain('[5:v]format=rgba,split=3'); // 2N+1 with N=2
    expect(buildFilter(segs, { shots: 2 }).graph).not.toContain('enable=');
    expect(PLATFORM_CTA.tiktok.bio && PLATFORM_CTA.instagram.bio && !PLATFORM_CTA.youtube.bio).toBe(true);
    expect(endCardSvg({ title: 't', cta: 'c', url: 'https://textbook.com.pk/ur/x/', locale: 'ur', bio: true })).toContain('لنک بائیو میں');
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
  it('keeps English runs in Urdu captions whole and padded so their spaces survive RTL layout', () => {
    expect(bidiUr('تعلیمی نفسیات (EFMP-301)')).toBe('تعلیمی نفسیات (\u2066EFMP-301\u2069)');
    expect(bidiUr('Educational Psychology بتاتی ہے')).toBe('\u2066\u00a0Educational\u00a0Psychology\u00a0\u2069 بتاتی ہے');
    const svg = captionSvg('آپ motivation، intelligence، individual differences اور special needs پڑھیں گے، اور کلاس سنبھالنا بھی سیکھیں گے۔', 'ur');
    expect(svg).toContain('special\u00a0needs');
    expect(svg).not.toMatch(/individual<\/text>/);
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
