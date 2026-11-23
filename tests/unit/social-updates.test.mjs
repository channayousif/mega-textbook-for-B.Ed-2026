// Feature 031 "Social Updates": deterministic copy, dedupe, feature classification, checks,
// captions, approval rules, image-post request builders and the card.
import { describe, it, expect } from 'vitest';
import {
  highlight, contentHighlights, courseName, animationEvents, isFeature, buildDrafts, checkDraft, captionFor, altText, approve, reject, emptyLedger, postedIds, setCopy, pending,
} from '../../scripts/social/updates.mjs';
import { facebookPhotoForm, instagramImageQuery, linkedinImageInit, linkedinImagePost } from '../../scripts/notebook-studio/social-post.mjs';
import { cardSvg } from '../../scripts/social/card.mjs';
import { publicUrl } from '../../scripts/social/publish.mjs';

const ev = (over) => ({ id: 'unit:GCCE-400:1', type: 'unit', date: '2026-11-22T05:00:00Z', course_code: 'GCCE-400', unit_no: 1,
  title_en: 'Citizenship', title_ur: 'شہریت', permalink: '/semester-4/gcce-400/unit-01/', ...over });

describe('copy', () => {
  // Owner, 2026-11-23: full course titles with codes, and plain language for an ordinary reader.
  const titles = { 'GCCE-400': { en: 'Civics and Community Engagement', ur: 'شہریات اور سماجی شمولیت' },
    'GQUR-301': { en: 'Quantitative Reasoning-II (Statistics)', ur: 'مقداری استدلال-2 (شماریات)' },
    'GSOS-301': { en: 'Social Science (Sociology)', ur: 'سماجی علوم (عمرانیات)' },
    'EFPG-401': { en: 'Teaching of English', ur: 'انگریزی کی تدریس' } };

  it('names courses by code and full title from the catalogue', () => {
    expect(courseName('GCCE-400')).toBe('GCCE-400 Civics and Community Engagement');
    expect(courseName('ZZZZ-999')).toBe('ZZZZ-999');
  });

  it('writes one highlight per kind and course: a short card line and a plain caption line', () => {
    const hl = contentHighlights([ev(), ev({ id: 'unit:GCCE-400:2', unit_no: 2, title_en: 'Rights', title_ur: 'حقوق' }), ev({ id: 'urdu:GCCE-400:1', type: 'urdu' })]);
    expect(hl.map((h) => h.card_en)).toEqual(['GCCE-400 Civics and Community Engagement: 2 new units', 'GCCE-400 Unit 1 now in Urdu']);
    expect(hl[0].en).toBe('GCCE-400 Civics and Community Engagement: 2 new units to read for free, on Citizenship and Rights.');
    expect(hl[0]).toMatchObject({ link: '/semester-4/gcce-400/', ids: ['unit:GCCE-400:1', 'unit:GCCE-400:2'] });
    expect(hl[0].ur).toContain('GCCE-400 شہریات اور سماجی شمولیت: 2 نئے یونٹ');
    expect(hl[1].en).toBe('GCCE-400 Civics and Community Engagement, Unit 1: Citizenship, can now be read in Urdu as well as English.');
  });

  it('counts figures, puts new courses first and leaves provisional out', () => {
    const hl = contentHighlights([
      ev({ id: 'figures:GQUR-301:1', type: 'figures', course_code: 'GQUR-301', count: 4 }),
      ev({ id: 'figures:GQUR-301:2', type: 'figures', course_code: 'GQUR-301', count: 3 }),
      ev({ id: 'course:GCCE-400', type: 'course', title_en: 'Civics and Community Engagement', title_ur: 'شہریات' }),
      ev({ id: 'provisional:GCCE-400:1', type: 'provisional' }),
    ]);
    expect(hl.map((h) => h.card_en)).toEqual(['New course: GCCE-400 Civics and Community Engagement', 'GQUR-301 Quantitative Reasoning-II (Statistics): 7 new diagrams']);
    expect(hl[1].en).toBe('7 new pictures and diagrams in GQUR-301 Quantitative Reasoning-II (Statistics) make the ideas easier to see and understand.');
  });

  it('describes teasers, revisions and reviews plainly, within the card and caption limits', () => {
    expect(highlight('teaser', [{ id: 'teaser:gsos-301-ur', course_code: 'GSOS-301' }], titles).en)
      .toBe('A new 30-second video on YouTube, in Urdu, shows what GSOS-301 Social Science (Sociology) is about.');
    expect(highlight('updated', [ev({ id: 'updated:EFPG-401:1', type: 'updated', course_code: 'EFPG-401', title_en: 'Lesson Planning' })], titles).en)
      .toBe('EFPG-401 Teaching of English, Unit 1: Lesson Planning, was revised and improved.');
    expect(highlight('review', [ev(), ev({ unit_no: 2 })], titles).en).toBe('2 units of GCCE-400 Civics and Community Engagement have completed their review.');
    const many = ['GSOS-301', 'GQUR-301', 'EFPG-401', 'GCCE-400', 'GSOS-301', 'GQUR-301', 'EFPG-401', 'GCCE-400'].map((c, i) => ({ id: `teaser:${i}-ur`, course_code: c }));
    const t = highlight('teaser', many, titles);
    expect(t.en.length).toBeLessThanOrEqual(320);
    expect(t.card_en.length).toBeLessThanOrEqual(68);
  });
});

describe('animated figures (Feature 032)', () => {
  it('announces public 16:9 animations per course, counting figures, in both languages', async () => {
    const { mkdtempSync, writeFileSync } = await import('node:fs');
    const { tmpdir } = await import('node:os');
    const dir = mkdtempSync(`${tmpdir()}/anim-`);
    const f = `${dir}/placed.json`;
    writeFileSync(f, JSON.stringify({ animations: [
      { figure: '/img/figures/efmp-301/unit-04/fig-U4-3', lang: 'en', format: '16x9', youtube_id: 'AAAAAAAAAAA', status: 'public', approved: '2026-11-23' },
      { figure: '/img/figures/efmp-301/unit-04/fig-U4-3', lang: 'ur', format: '16x9', youtube_id: 'BBBBBBBBBBB', status: 'public', approved: '2026-11-23' },
      { figure: '/img/figures/efmp-301/unit-04/fig-U4-3', lang: 'en', format: '9x16', youtube_id: 'CCCCCCCCCCC', status: 'public', approved: '2026-11-23' },
      { figure: '/img/figures/efmp-301/unit-04/fig-U4-5', lang: 'en', format: '16x9', youtube_id: 'DDDDDDDDDDD', status: 'private', approved: null },
    ] }));
    const ev = animationEvents(dir, '2026-11-22T00:00:00Z', f);
    expect(ev.map((e) => e.id)).toEqual(['animation:/img/figures/efmp-301/unit-04/fig-U4-3:en', 'animation:/img/figures/efmp-301/unit-04/fig-U4-3:ur']);
    expect(animationEvents(dir, '2026-11-24T00:00:00Z', f)).toEqual([]);
    const [h] = contentHighlights(ev);
    expect(h.type).toBe('animation');
    expect(h.card_en).toMatch(/^EFMP-301 .*: 1 animated diagram$/);
    expect(h.en).toContain('with captions in English and Urdu');
    expect(h.en.length).toBeLessThanOrEqual(320);
  });
});

describe('features and drafts', () => {
  it('counts only user-facing feat PRs, never crew batches or tooling', () => {
    expect(isFeature({ title: 'feat(landing): teasers on the home page', files: ['src/pages/index.tsx'] })).toBe(true);
    expect(isFeature({ title: 'feat(crew): retry rule', files: ['scripts/crew/crew.mjs'] })).toBe(false);
    expect(isFeature({ title: 'fix(landing): spacing', files: ['src/x.tsx'] })).toBe(false);
    expect(isFeature({ title: 'feat: batch', headRefName: 'crew/batch-1', files: ['src/x.tsx'] })).toBe(false);
  });

  it('builds a content and a feature draft, never repeating a posted source id', () => {
    const drafts = buildDrafts({ date: '2026-11-22', events: [ev(), ev({ id: 'unit:X:1', course_code: 'X' })],
      prs: [{ number: 701, title: 'feat(landing): home teasers', files: ['src/pages/index.tsx'] }], posted: new Set(['unit:X:1']) });
    expect(drafts.map((d) => d.id)).toEqual(['2026-11-22-content', '2026-11-22-feature']);
    expect(drafts[0].items).toEqual(['unit:GCCE-400:1']);
    expect(drafts[1].highlights[0]).toMatchObject({ needs_copy: true, pr: 701 });
    expect(buildDrafts({ date: 'd', events: [ev()], posted: new Set(['unit:GCCE-400:1']) })).toEqual([]);
  });

  it('rolls highlights beyond five into "and N more"', () => {
    const many = Array.from({ length: 7 }, (_, i) => ev({ id: `unit:C${i}:1`, course_code: `C${i}` }));
    const [d] = buildDrafts({ date: 'd', events: many });
    expect(d.highlights).toHaveLength(5);
    expect(d.more).toBe(2);
    expect(captionFor(d, 'facebook')).toContain('• and 2 more');
  });
});

describe('check, captions and approval', () => {
  const draft = () => buildDrafts({ date: '2026-11-22', events: [ev()] })[0];

  it('refuses long dashes, missing Urdu, unwritten feature copy, outside links and certification claims', () => {
    expect(checkDraft(draft())).toEqual([]);
    const bad = draft();
    bad.highlights[0] = { ...bad.highlights[0], en: 'Certified by the board \u2014 now', ur: '', link: 'https://evil.example/' };
    const f = checkDraft(bad).join(' | ');
    expect(f).toMatch(/long dash/);
    expect(f).toMatch(/no Urdu/);
    expect(f).toMatch(/certification wording/);
    expect(f).toMatch(/outside textbook.com.pk/);
    const feat = buildDrafts({ date: 'd', prs: [{ number: 5, title: 'feat(x): y', files: ['src/a.tsx'] }] })[0];
    expect(checkDraft(feat).join(' ')).toMatch(/write the EN and UR sentence from PR #5/);
  });

  it('writes bilingual captions, "link in bio" on Instagram, and alt text', () => {
    const d = draft();
    expect(captionFor(d, 'facebook')).toMatch(/^New on textbook.com.pk\n• GCCE-400 Civics and Community Engagement, Unit 1: Citizenship, is now free to read.\n\nنیا مواد\n• GCCE-400 شہریات اور سماجی شمولیت، یونٹ 1: شہریت، اب مفت پڑھا جا سکتا ہے۔\n\nRead free: https:\/\/textbook.com.pk\/semester-4\/gcce-400\/unit-01\//);
    expect(captionFor(d, 'instagram')).toContain('Link in bio: textbook.com.pk');
    expect(altText(d)).toBe('New on textbook.com.pk: GCCE-400 Civics and Community Engagement, Unit 1: Citizenship, is now free to read.');
  });

  it('auto-approves content only after the pilot; feature posts need the owner; rejected ids can come back', () => {
    const L = emptyLedger();
    const content = { ...draft(), state: 'drafted' };
    const feature = { ...buildDrafts({ date: 'd', prs: [{ number: 5, title: 'feat(x): y', files: ['src/a.tsx'] }] })[0] };
    feature.highlights[0] = { ...feature.highlights[0], ur: 'اردو', needs_copy: false };
    L.posts.push(content, feature);
    expect(() => approve(L, content.id, 'auto')).toThrow(/pilot/);
    L.config.pilot = false;
    expect(approve(L, content.id, 'auto').state).toBe('approved');
    expect(() => approve(L, feature.id, 'auto')).toThrow(/owner/);
    expect(approve(L, feature.id, 'owner').state).toBe('approved');
    const L2 = emptyLedger(); L2.posts.push({ ...draft(), state: 'drafted' });
    reject(L2, '2026-11-22-content', 'tone');
    expect(postedIds(L2).size).toBe(0);
  });
});

describe('image posts and the card', () => {
  it('builds the platform requests', () => {
    expect(Object.fromEntries(facebookPhotoForm('https://x/c.jpg', 'cap', 't'))).toEqual({ url: 'https://x/c.jpg', caption: 'cap', published: 'true', access_token: 't' });
    expect(Object.fromEntries(instagramImageQuery('https://x/c.jpg', 'cap', 't'))).toEqual({ image_url: 'https://x/c.jpg', caption: 'cap', access_token: 't' });
    expect(linkedinImageInit('urn:li:person:1')).toEqual({ initializeUploadRequest: { owner: 'urn:li:person:1' } });
    expect(linkedinImagePost('urn:li:person:1', 'urn:li:image:2', 'text', 'alt').content).toEqual({ media: { id: 'urn:li:image:2', altText: 'alt' } });
    expect(publicUrl('https://api.textbook.com.pk', '2026-11-22-content')).toBe('https://api.textbook.com.pk/storage/v1/object/public/social-cards/2026-11-22-content.jpg');
  });

  it('draws the brand card with the eyebrow, date, headlines and site address', () => {
    const svg = cardSvg(buildDrafts({ date: '2026-11-22', events: [ev()] })[0]);
    expect(svg).toContain('width="1080" height="1350"');
    expect(svg).toContain("WHAT'S NEW  ·  22 November 2026");
    expect(svg).toContain('GCCE-400 Unit 1: Citizenship');
    expect(svg).toContain('Read free: textbook.com.pk');
    expect(svg).toContain('#e5a333');
  });
});

describe('feature copy and what waits', () => {
  it('writes a feature line through setCopy, clearing the stale card, and lists what waits on the owner', () => {
    const L = emptyLedger();
    const [feat] = buildDrafts({ date: 'd', prs: [{ number: 5, title: 'feat(x): y', files: ['src/a.tsx'] }] });
    L.posts.push({ ...feat, card: '~/c.jpg', card_url: 'https://x/c.jpg' });
    expect(() => setCopy(L, feat.id, 1, 'Home page: teasers', '')).toThrow(/--ur/);
    setCopy(L, feat.id, 1, 'Home page: teasers \u2014 new', 'ہوم پیج: تعارفی ویڈیو');
    const p = L.posts[0];
    expect(p.highlights[0]).toMatchObject({ en: 'Home page: teasers - new', needs_copy: false });
    expect(p.card).toBeUndefined();
    expect(pending(L).awaitingOwner).toHaveLength(0); // needs a fresh card first
    p.card = '~/c.jpg';
    expect(pending(L).awaitingOwner.map((x) => x.id)).toEqual([feat.id]);
    approve(L, feat.id, 'owner');
    expect(pending(L).toPublish.map((x) => x.id)).toEqual([feat.id]);
  });
});
