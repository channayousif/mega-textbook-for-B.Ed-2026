import { describe, it, expect } from 'vitest';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkScript, loadScript, teaserRoute, shortMeta, socialMeta, recordCrosspost, SUBSCRIBE_URL, CAPTION_LIMIT, planTeaser, recordClip, setClipQa, advanceTeaser,
  chosenTakes, teaserSheet, WORD_BUDGET, MAX_RETAKES, TEASER_STATES,
} from '../../scripts/notebook-studio/teaser.mjs';
import { lengthCheck, buildFilter, speechSegments, silenceThreshold, captionSvg, endCardSvg, parseCropdetect, bidiUr, ctaSvg, ctaWindows, PLATFORM_CTA, END_SECONDS, PACE } from '../../scripts/notebook-studio/assemble-teaser.mjs';
import { evaluate } from '../../scripts/notebook-studio/media-qa.mjs';
import { loadRecipe, recipeFor, buildPrompt, CAMERA_MOVE_RE } from '../../scripts/media/recipes.mjs';

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

describe('teaser recipes (Feature 030, US2)', () => {
  const v2 = () => {
    const s = base();
    s.recipe = { name: 'teaser', version: 2 };
    s.shots[1].visual = 'Fast crane move from overhead down to desk level as pupils arrange counters on their desks.';
    s.shots[2].visual = 'Energetic tracking shot along a corridor wall where pupils pin up bar charts.';
    s.shots[3].visual = 'Handheld dolly through a staff room where trainee teachers solve a problem together.';
    s.locales.ur.narration = s.locales.ur.narration.map((l) => l.split(/\s+/).slice(0, 18).join(' '));
    return s;
  };
  it('treats a script without a recipe as teaser@1 and loads both versions', () => {
    expect(recipeFor(base(), ROOT)).toMatchObject({ name: 'teaser', version: 1, speed: PACE.speed, word_budget: WORD_BUDGET });
    const r2 = loadRecipe('teaser', 2, ROOT);
    expect(r2).toMatchObject({ speed: 1.25, max_seconds: 30, model: 'veo_lite', presenter_shots: [1, 5] });
    expect(r2.duration).toBeUndefined();
    expect(() => loadRecipe('teaser', 9, ROOT)).toThrow(/no recipe/);
  });
  it('applies the recipe word budget: 19 Urdu words pass teaser@1 but fail teaser@2', () => {
    const s = v2();
    expect(checkScript(s, ROOT)).toEqual([]);
    s.locales.ur.narration[2] = Array.from({ length: 19 }, () => 'لفظ').join(' ');
    expect(checkScript(s, ROOT).join()).toMatch(/ur shot 3: 19 words, over the 18-word budget of teaser@2/);
    delete s.recipe;
    expect(checkScript(s, ROOT).join()).not.toMatch(/ur shot 3/);
  });
  it('requires a named camera move in teaser@2 action shots only', () => {
    const s = v2();
    s.shots[2].visual = 'Pupils pin up hand-drawn bar charts on a corridor wall and smile.';
    expect(checkScript(s, ROOT).join()).toMatch(/shot 3: name a camera move/);
    delete s.recipe;
    expect(checkScript(s, ROOT).join()).not.toMatch(/camera move/);
    expect(CAMERA_MOVE_RE.test('quick push-in from medium shot to close-up')).toBe(true);
    expect(CAMERA_MOVE_RE.test('a teacher smiles at the class')).toBe(false);
  });
  it('builds presenter and voice-over prompts with no aspect wording and no viewfinder marks', () => {
    const s = v2();
    const r = loadRecipe('teaser', 2, ROOT);
    const p1 = buildPrompt(r, s, s.shots[0]);
    const p3 = buildPrompt(r, s, s.shots[2]);
    expect(p1).toMatch(/presenter looks straight into the camera/);
    expect(p3).toMatch(/unseen woman narrator/);
    expect(p3).toContain(s.locales.ur.narration[2]);
    for (const p of [p1, p3]) {
      expect(p).not.toMatch(/9:16/);
      expect(p).toMatch(/No camera interface, viewfinder marks/);
    }
  });
  it('teaser@3 is teaser@2 with a 1.4x voice and the same enforced 30 s limit', () => {
    const v2 = loadRecipe('teaser', 2, ROOT), v3 = loadRecipe('teaser', 3, ROOT);
    expect(v3.speed).toBe(1.4);
    expect({ ...v3, version: 2, speed: 1.25, description: '' }).toEqual({ ...v2, description: '' });
    expect(() => lengthCheck(v3, 30.4)).toThrow(/30 s limit of teaser@3/);
  });
  it('fails an over-length teaser@2 Short and only warns for teaser@1', () => {
    expect(() => lengthCheck(loadRecipe('teaser', 2, ROOT), 31.2)).toThrow(/QG1: 31.2 s is over the 30 s limit of teaser@2/);
    expect(lengthCheck(loadRecipe('teaser', 2, ROOT), 28)).toBeNull();
    expect(lengthCheck(loadRecipe('teaser', 1, ROOT), 47)).toMatch(/over the 45 s limit of teaser@1/);
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
    // the hook and first learn line the owner approved lead the description
    for (const l of base().locales.ur.narration.slice(0, 2)) expect(d).toContain(l);
  });
  it('adds "More about the course": every objective, every unit link, published videos, and stays under the byte limit', () => {
    const d = shortMeta(base(), 'ur', ROOT).upload_video.description;
    for (const o of base().locales.ur.objectives) expect(d).toContain(o);
    for (let n = 1; n <= 12; n++) expect(d).toContain(`/ur/semester-1/efmp-301/unit-${String(n).padStart(2, '0')}/`);
    expect(d).toContain('📘 کورس کے بارے میں مزید');
    expect(d).toContain('✅ یہ کورس کیوں پڑھیں؟');
    for (const u of ['tiktok.com/@textbook.com.pk', 'instagram.com/textbook.com.pk', 'linkedin.com/company/textbook-com-pk', 'facebook.com/1404300426106517']) expect(d).toContain(u);
    expect(Buffer.byteLength(d)).toBeLessThanOrEqual(4900);
  });
  it('QG0 rejects objectives that do not match the overview outcome count', () => {
    const s = base();
    s.locales.ur.objectives = s.locales.ur.objectives.slice(0, 4);
    expect(checkScript(s, ROOT).join('\n')).toMatch(/ur objectives: 4, but the course overview has 6 learning outcomes/);
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
      assembled: { encoded_file: '~/studio-media/teasers/efmp-301/en/teaser.mp4', thumbnail_file: '~/studio-media/teasers/efmp-301/en/teaser.thumb.jpg' },
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
    expect(L.items[0].thumbnail_file).toMatch(/thumb\.jpg$/); // assembled requires a thumbnail
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
    const { parts, endPart, graph, duration, cuts } = buildFilter(segs);
    const seg = Math.ceil((7.84 / PACE.speed) * 30) / 30;
    expect(duration).toBeCloseTo(5 * seg + END_SECONDS, 3);
    expect(cuts).toHaveLength(6);
    expect(parts).toHaveLength(5);
    for (const part of parts) {
      expect(part).toContain(`atempo=${PACE.speed}`);
      expect(part).toContain('overlay=0:0:shortest=1');
    }
    expect(endPart).toContain("zoompan=z='max(1,1.15-0.01*on)'");
    expect(graph).toContain('[0:v]null[vout]'); // no reminder windows without cta
    expect(graph).toMatch(/sidechaincompress.*\[duck\]/);
    expect(graph).toMatch(/loudnorm=I=-15\.5.*alimiter.*\[aout\]$/);
    expect(graph.match(/anoisesrc/g)).toHaveLength(5);
    expect(parts[1]).toContain("zoompan=z='1.1+"); // alternate segments punch in
    expect(parts[0]).toContain("zoompan=z='1+");
  });
  it('crops Veo letterbox bars before filling the frame, and ignores a full frame', () => {
    const log = 'x crop=720:1074:0:98 y\n'.repeat(5) + 'crop=720:1280:0:0\n';
    const c = parseCropdetect(log, 720, 1280);
    expect(c).toEqual({ w: 720, h: 1074, x: 0, y: 98 });
    expect(parseCropdetect('crop=720:1280:0:0\n', 720, 1280)).toBeNull();
    const { parts } = buildFilter([{ shot: 0, a: 0, b: 8 }, { shot: 1, a: 0, b: 8 }], { crops: [c, null] });
    expect(parts[0]).toMatch(/\[0:v\]trim=0:8,setpts=[^;]*,crop=720:1074:0:98,scale=1080:1920/);
    expect(parts[1]).toMatch(/\[0:v\]trim=0:8,setpts=\(PTS-STARTPTS\)\/[\d.]+,scale=1080:1920/);
  });
  it('cuts dead air: keeps short pauses, splits on long ones and trims the head and tail', () => {
    // shot 1 of the EFMP-301 pilot: a 0.9 s pause mid-line and a 0.5 s tail
    const log = ['silence_start: 1.11', 'silence_end: 1.36', 'silence_start: 2.18', 'silence_end: 3.07', 'silence_start: 7.46'].join('\n');
    expect(speechSegments(log, 7.93)).toEqual([{ a: 0, b: 2.3 }, { a: 2.95, b: 7.58 }]);
    expect(speechSegments('', 8)).toEqual([{ a: 0, b: 8 }]);
  });

  it('renders each segment on its own pass from a seeked input, so ffmpeg never queues later segments', () => {
    const segs = [{ shot: 0, a: 0, b: 3 }, { shot: 0, a: 4, b: 8 }, { shot: 1, a: 0, b: 8 }];
    const { parts, graph, cuts } = buildFilter(segs);
    expect(parts).toHaveLength(3);
    expect(parts[1]).toMatch(/^\[0:v\]trim=0:4,/); // the input is seeked to 4 s, so its trim starts at 0
    for (const part of parts) expect(part).toMatch(/\[z\]\[1:v\]overlay.*\[v\];\[0:a\]atrim=0:[\d.]+,.*\[a\]$/);
    expect(graph).toContain('[0:a]asplit=2[voice][sc]');
    expect(cuts).toHaveLength(4);
  });
  it('sets the silence threshold 8 dB under the shot mean, within -35..-22 dB', () => {
    expect(silenceThreshold('[Parsed_volumedetect_0 @ 0x1] mean_volume: -19.7 dB')).toBe(-28);
    expect(silenceThreshold('mean_volume: -40.0 dB')).toBe(-35);
    expect(silenceThreshold('mean_volume: -9.0 dB')).toBe(-22);
    expect(silenceThreshold('')).toBe(-35);
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
    expect(graph).toContain('[1:v]format=rgba,split=3'); // input 1 of the final pass
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
