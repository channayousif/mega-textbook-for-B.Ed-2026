import { describe, test, expect } from 'vitest';
import { parseFrameDump, detectCuts, renderProblems } from '../../scripts/media/pack/debrand.mjs';
import { srtTime, cuesFromWords, mergeChunks, toSrt } from '../../scripts/media/pack/captions.mjs';
import { sentences, score, scriptCandidates, locate, findHighlights } from '../../scripts/media/pack/highlights.mjs';
import { filterFor } from '../../scripts/media/pack/reframe.mjs';
import { checkMetadata, chaptersFrom, scriptFrontMatter, buildDescription, youtubeArgs, DISCLOSURE, ts } from '../../scripts/media/pack/metadata.mjs';
import { packRows, mergeRows, validator } from '../../scripts/media/pack/embed.mjs';
import { frontMatter, sectionList } from '../../scripts/media/pack/intake.mjs';

// Feature 038 Stage 4: pure parts of the pack scripts. Media I/O is exercised by hand on real files
// (see PHR 20261317); these tests pin the decisions those runs depend on.

const frames = (from, to, step, f) => { const out = []; for (let t = from; t <= to + 1e-9; t += step) out.push({ t: +t.toFixed(2), ...f(t) }); return out; };

describe('debrand cut detection', () => {
  test('parses an ffmpeg metadata dump', () => {
    const dump = 'frame:0    pts:0       pts_time:0\nlavfi.scene_score=0.000000\nlavfi.signalstats.YAVG=216.3\nframe:1    pts:512     pts_time:0.25\nlavfi.scene_score=0.179509\nlavfi.signalstats.YAVG=228.9\n';
    expect(parseFrameDump(dump, 470)).toEqual([{ t: 470, scene: 0, yavg: 216.3 }, { t: 470.25, scene: 0.179509, yavg: 228.9 }]);
  });

  // Recorded shape of EFMP-301 U4 T1 EN (478.63 s): title slide cut at 34.5 s, logo card cut 3.00 s before the end.
  const duration = 478.633;
  const head = frames(0, 44.75, 0.25, (t) => ({ scene: Math.abs(t - 34.5) < 0.01 ? 0.289 : 0.001, yavg: 214 }));
  const tail = frames(463.75, 478.5, 0.25, (t) => ({ scene: Math.abs(t - 475.75) < 0.01 ? 0.1795 : 0.002, yavg: t >= 475.75 ? 228.9 : 216.3 }));

  test('finds the outro logo card and the title slide, trims no intro', () => {
    const c = detectCuts({ duration, head, tail });
    expect(c.outro_start).toBe(475.75);
    expect(c.method).toEqual({ intro: 'none', outro: 'scene' });
    expect(c.intro_end).toBe(0);
    expect(c.title_card_end).toBe(34.5);
  });

  test('falls back to the last 3 s when no outro cut is found', () => {
    const flat = tail.map((f) => ({ ...f, scene: 0.001, yavg: 216 }));
    const c = detectCuts({ duration, head, tail: flat });
    expect(c.outro_start).toBe(475.633);
    expect(c.method.outro).toBe('fallback');
    expect(c.notes.join(' ')).toMatch(/fell back/);
  });

  test('a cut more than 6 s before the end is not the outro', () => {
    const early = tail.map((f) => ({ ...f, scene: Math.abs(f.t - 470) < 0.01 ? 0.3 : 0.001, yavg: f.t >= 470 ? 230 : 216 }));
    expect(detectCuts({ duration, head, tail: early }).method.outro).toBe('fallback');
  });

  test('trims a white logo intro when one opens the video', () => {
    const logoHead = frames(0, 20, 0.25, (t) => ({ scene: Math.abs(t - 3) < 0.01 ? 0.4 : 0.001, yavg: t < 3 ? 247 : 214 }));
    expect(detectCuts({ duration, head: logoHead, tail }).intro_end).toBe(3);
  });

  test('render needs a confirmation and sane cut points', () => {
    const cuts = { duration, intro_end: 0, outro_start: 475.75, confirmed_by: null, confirmed_at: null };
    expect(renderProblems(cuts)).toHaveLength(1);
    expect(renderProblems({ ...cuts, confirmed_by: 'curriculum owner', confirmed_at: '2026-11-28T00:00:00Z' })).toEqual([]);
    expect(renderProblems({ ...cuts, confirmed_by: 'x', confirmed_at: 'y', outro_start: 500 })).toHaveLength(1);
  });
});

describe('captions', () => {
  test('SRT timestamps', () => {
    expect(srtTime(0)).toBe('00:00:00,000');
    expect(srtTime(3725.4567)).toBe('01:02:05,457');
  });

  test('cues break at sentence ends and length limits; chunks are offset', () => {
    const words = 'Attention is a design problem. Before it is a pupil problem, it is a room problem.'.split(' ').map((w, i) => ({ word: w, start: i * 0.5, end: i * 0.5 + 0.4 }));
    const cues = cuesFromWords(words);
    expect(cues[0].text).toBe('Attention is a design problem.');
    expect(cues.length).toBe(2);
    const merged = mergeChunks([{ offset: 0, segments: [{ start: 0, end: 1, text: 'a', words: [{ word: 'a', start: 0, end: 1 }] }] },
      { offset: 120, segments: [{ start: 2, end: 3, text: 'b', words: [{ word: 'b', start: 2, end: 3 }] }] }]);
    expect(merged.words[1]).toEqual({ word: 'b', start: 122, end: 123 });
    expect(toSrt([{ start: 1, end: 2.5, text: 'Hello.' }])).toBe('1\n00:00:01,000 --> 00:00:02,500\nHello.\n');
  });
});

describe('highlights', () => {
  test('hooks score above dangling openings', () => {
    expect(score('Why do pupils stop listening after ten minutes? Because attention is limited.', 30).score)
      .toBeGreaterThan(score('So that is why it matters, and it is limited too.', 30).score);
    expect(score('Why?', 80).reasons).toContain('outside 20-60 s');
  });

  test('reads [SHORT-CANDIDATE] blocks and locates them in the transcript', () => {
    const md = '## The spotlight\n[SHORT-CANDIDATE] hook: Your pupils can only hold one spotlight\nAttention works like a spotlight in a dark room.\n';
    const c = scriptCandidates(md);
    expect(c).toEqual([{ hook: 'Your pupils can only hold one spotlight', opening: 'Attention works like a spotlight in a dark room.', heading: 'The spotlight' }]);
    const words = 'Welcome back. Attention works like a spotlight in a dark room.'.split(' ').map((w, i) => ({ word: w, start: i, end: i + 0.9 }));
    expect(locate(words, c[0].opening)).toBe(2);
  });

  test('finds non-overlapping, unapproved candidates of 20-60 s', () => {
    const text = Array.from({ length: 30 }, (_, i) => (i % 5 === 0 ? `Why does mistake number ${i} happen in a class?` : `Teachers often see this ${i} times instead.`)).join(' ');
    const words = text.split(' ').map((w, i) => ({ word: w, start: i * 0.4, end: i * 0.4 + 0.35 }));
    const list = findHighlights(words, { top: 4 });
    expect(list.length).toBeGreaterThan(0);
    for (const h of list) { expect(h.approved).toBe(false); expect(h.duration).toBeGreaterThanOrEqual(20); expect(h.duration).toBeLessThanOrEqual(60); }
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) expect(list[i].start < list[j].end && list[j].start < list[i].end).toBe(false);
    expect(sentences(words).length).toBe(30);
  });
});

describe('reframe', () => {
  test('stack keeps the whole 16:9 picture inside the top safe zone; crop is 9:16', () => {
    expect(filterFor('stack')).toContain('overlay=0:290');
    expect(filterFor('stack')).toContain('scale=1080:608');
    expect(filterFor('crop', { x: 0.25 })).toBe('crop=ih*9/16:ih:(iw-ih*9/16)*0.25:0,scale=1080:1920,setsar=1');
    expect(() => filterFor('zoom')).toThrow();
  });
});

const GOOD = {
  course: 'efmp-301', unit: 4, topic: 1,
  titles: ['Why pupils stop paying attention', 'Attention is a design problem', 'The attention audit for teachers'],
  summary: 'How attention and perception work in a real classroom, and how to redesign a lesson for them.',
  lesson_url: 'https://textbook.com.pk/semester-03/efmp-301/unit-04/topic-01',
  chapters: [{ t: '00:00', title: 'Hook' }, { t: '00:40', title: 'The spotlight' }, { t: '03:10', title: 'Perception' }],
  tags: ['attention', 'perception'], thumbnail_text: ['One spotlight only'], pinned_comment: 'Which tip will you try?',
  platform_captions: { youtube: 'a', instagram: 'b', tiktok: 'c', facebook: 'd', linkedin: 'e' },
  sources: ['Spielman et al. (2020) Psychology 2e'], disclosure: DISCLOSURE,
  subtitles: [{ locale: 'en', status: 'checked' }], audio_tracks: ['en', 'ur'],
  shorts: [{ id: 'short-01', hook: 'Your pupils have one spotlight', start: 40, end: 80, related_video: null }],
};

describe('metadata', () => {
  test('a complete pack passes; each rule fails on its own', () => {
    expect(checkMetadata(GOOD)).toEqual([]);
    const bad = (patch) => checkMetadata({ ...GOOD, ...patch });
    expect(bad({ titles: ['x'] })).toContain('needs exactly 3 title options');
    expect(bad({ titles: [...GOOD.titles.slice(0, 2), 'A'.repeat(61)] }).join()).toMatch(/over 60/);
    expect(bad({ titles: [...GOOD.titles.slice(0, 2), 'STOP doing THIS now'] }).join()).toMatch(/capitals/);
    expect(bad({ chapters: [{ t: '00:05', title: 'a' }, ...GOOD.chapters.slice(1)] })).toContain('first chapter must start at 00:00');
    expect(bad({ chapters: [{ t: '00:00', title: 'a' }, { t: '00:05', title: 'b' }, { t: '01:00', title: 'c' }] }).join()).toMatch(/under 10 s/);
    expect(bad({ disclosure: 'Made with AI' })).toContain('disclosure line is missing or changed');
    expect(bad({ sources: [] }).join()).toMatch(/sources/);
    expect(bad({ summary: 'Short \u2014 summary that is long enough to pass the length rule here.' }).join()).toMatch(/long dash/);
    expect(bad({ shorts: [{ id: 'short-01', hook: 'x', start: 0, end: 70 }] }).join()).toMatch(/under 60 s/);
    expect(bad({ platform_captions: { youtube: 'a' } }).join()).toMatch(/linkedin/);
  });

  test('description carries chapters, sources and the disclosure; uploads are private', () => {
    const d = buildDescription(GOOD);
    expect(d).toContain('00:40 The spotlight');
    expect(d).toContain('- Spielman et al. (2020) Psychology 2e');
    expect(d.endsWith(DISCLOSURE)).toBe(true);
    const y = youtubeArgs(GOOD);
    expect(y.upload_video.privacy_status).toBe('private');
    expect(y.update_video.contains_synthetic_media).toBe(true);
    expect(y.update_video.playlist_id).toBe('PLBPGR4jAnhh4');
    expect(youtubeArgs(GOOD, { kind: 'short', shortId: 'short-01' }).upload_video.privacy_status).toBe('private');
  });

  test('chapters come from script blocks, timed against the transcript', () => {
    const md = '---\ntitles:\n  - A\nplatform_captions:\n  youtube: yt\n---\n## Hook\nNarrator: Picture a hot room after lunch.\n\n## The spotlight\nNarrator: Attention works like a spotlight in a dark room.\n';
    expect(scriptFrontMatter(md)).toEqual({ titles: ['A'], platform_captions: { youtube: 'yt' } });
    const words = 'Picture a hot room after lunch. Attention works like a spotlight in a dark room.'.split(' ').map((w, i) => ({ word: w, start: i * 7, end: i * 7 + 1 }));
    expect(chaptersFrom(md, words)).toEqual([{ t: '00:00', title: 'Hook' }, { t: ts(42), title: 'The spotlight' }]);
    expect(chaptersFrom(md)[1].t).toBeNull();
  });
});

describe('embed', () => {
  test('rows validate against the manifest schema and replace earlier pack rows', () => {
    const links = { longform: 'https://youtu.be/abcdefghijk', shorts: { 'short-01': 'https://youtube.com/shorts/bcdefghijkl' }, infographic: '/studio/efmp-301/unit-04/topic-01/infographic.en.webp' };
    const review = { by: 'curriculum owner', date: '2026-11-28', verdict: 'pass' };
    const rows = packRows({ course: 'efmp-301', topic: 1, meta: GOOD, links, status: 'placed', review, today: '2026-11-28' });
    expect(rows.map((r) => r.kind)).toEqual(['longform', 'short', 'infographic']);
    expect(rows[1].related_video).toBe(links.longform);
    const manifest = { course: 'efmp-301', unit: 4, notebook_id: 'nb-12345678', artifacts: [
      { topic: 1, locale: 'en', kind: 'audio', status: 'placed', title: 'Brief', prompt_ref: 'specs/studio/prompts/audio.md', alt: 'a', review, host_url: 'https://youtu.be/cdefghijklm' },
      { topic: 1, locale: 'en', kind: 'longform', status: 'reviewed', title: 'Old', prompt_ref: 'specs/studio/prompts/pack/script.md' },
    ] };
    const next = mergeRows(manifest, 1, rows);
    expect(next.artifacts.map((a) => a.kind)).toEqual(['audio', 'longform', 'short', 'infographic']);
    expect(next.artifacts[1].title).toBe(GOOD.titles[0]);
    const validate = validator();
    expect(validate(next), JSON.stringify(validate.errors)).toBe(true);
  });
});

describe('intake', () => {
  test('reads front matter and wrapped list sections', () => {
    const md = '---\ntitle: "Topic 4.1 - Attention"\nclo_refs:\n  - "SLO:EFMP-301-4-1"\n---\n\n## Further reading\n\n- Spielman (2020). *Psychology 2e*,\n  Sections 5.1 and 8.1.\n- Seifert (2009).\n\n## Next\n- not this\n';
    expect(frontMatter(md)).toEqual({ title: 'Topic 4.1 - Attention', clo_refs: ['SLO:EFMP-301-4-1'] });
    expect(sectionList(md, 'Further reading')).toEqual(['Spielman (2020). *Psychology 2e*, Sections 5.1 and 8.1.', 'Seifert (2009).']);
  });
});
