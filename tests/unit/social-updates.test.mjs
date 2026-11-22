// Feature 031 "Social Updates": deterministic copy, dedupe, feature classification, checks,
// captions, approval rules, image-post request builders and the card.
import { describe, it, expect } from 'vitest';
import {
  highlight, contentHighlights, isFeature, buildDrafts, checkDraft, captionFor, altText, approve, reject, emptyLedger, postedIds,
} from '../../scripts/social/updates.mjs';
import { facebookPhotoForm, instagramImageQuery, linkedinImageInit, linkedinImagePost } from '../../scripts/notebook-studio/social-post.mjs';
import { cardSvg } from '../../scripts/social/card.mjs';
import { publicUrl } from '../../scripts/social/publish.mjs';

const ev = (over) => ({ id: 'unit:GCCE-400:1', type: 'unit', date: '2026-11-22T05:00:00Z', course_code: 'GCCE-400', unit_no: 1,
  title_en: 'Citizenship', title_ur: 'شہریت', permalink: '/semester-4/gcce-400/unit-01/', ...over });

describe('copy', () => {
  it('writes one highlight per kind and course, grouping a week-long burst and linking the course root', () => {
    const hl = contentHighlights([ev(), ev({ id: 'unit:GCCE-400:2', unit_no: 2 }), ev({ id: 'urdu:GCCE-400:1', type: 'urdu' })]);
    expect(hl.map((h) => h.en)).toEqual(['GCCE-400: 2 new units', 'GCCE-400 Unit 1 now in Urdu']);
    expect(hl[0]).toMatchObject({ ur: 'GCCE-400: 2 نئے یونٹ', link: '/semester-4/gcce-400/', ids: ['unit:GCCE-400:1', 'unit:GCCE-400:2'] });
  });

  it('counts figures, puts new courses first and leaves provisional out', () => {
    const hl = contentHighlights([
      ev({ id: 'figures:GQUR-301:1', type: 'figures', course_code: 'GQUR-301', count: 4 }),
      ev({ id: 'figures:GQUR-301:2', type: 'figures', course_code: 'GQUR-301', count: 3 }),
      ev({ id: 'course:GCCE-400', type: 'course', title_en: 'Civics', title_ur: 'شہریات' }),
      ev({ id: 'provisional:GCCE-400:1', type: 'provisional' }),
    ]);
    expect(hl.map((h) => h.en)).toEqual(['New course: Civics', 'GQUR-301: 7 new illustrations and figures']);
  });

  it('describes teasers, revisions and reviews plainly', () => {
    expect(highlight('teaser', [{ id: 't1', course_code: 'GSOS-301' }]).en).toBe('GSOS-301: 30-second course teaser on YouTube');
    expect(highlight('updated', [ev({ id: 'updated:EFPG-401:1', type: 'updated', course_code: 'EFPG-401', title_en: 'Lesson Planning' })]).en).toBe('EFPG-401 Unit 1 revised: Lesson Planning');
    expect(highlight('review', [ev(), ev({ unit_no: 2 })]).en).toBe('GCCE-400: 2 units reviewed');
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
    expect(captionFor(d, 'facebook')).toMatch(/^New on textbook.com.pk\n• GCCE-400 Unit 1: Citizenship\n\nنیا مواد\n• GCCE-400 یونٹ 1: شہریت\n\nRead free: https:\/\/textbook.com.pk\/semester-4\/gcce-400\/unit-01\//);
    expect(captionFor(d, 'instagram')).toContain('Link in bio: textbook.com.pk');
    expect(altText(d)).toBe('New on textbook.com.pk: GCCE-400 Unit 1: Citizenship');
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
