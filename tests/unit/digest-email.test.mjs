/**
 * Feature 028 - the weekly email template and its unsubscribe tokens
 * (supabase/functions/_shared/digestEmail.ts, digestToken.ts). Both are pure
 * modules shared with the Deno edge functions.
 */
import { describe, it, expect } from 'vitest';
import { renderDigest, isoWeek, escapeHtml } from '../../supabase/functions/_shared/digestEmail.ts';
import { signUnsubscribe, verifyUnsubscribe } from '../../supabase/functions/_shared/digestToken.ts';

const EM_DASH = /[\u2014\u2015\u2E3A\u2E3B]/;

const event = (over = {}) => ({
  id: 'unit:EFMP-301:1', type: 'unit', date: '2026-11-06T00:00:00Z', course_code: 'EFMP-301', unit_no: 1,
  title_en: 'Introduction', title_ur: 'تعارف', course_title_en: 'Educational Psychology', course_title_ur: 'تعلیمی نفسیات',
  permalink: '/semester-1/efmp-301/unit-01/', ...over,
});

const base = {
  siteUrl: 'https://textbook.com.pk',
  weekLabel: '2026-W45',
  unsubscribeUrl: 'https://textbook.com.pk/app/unsubscribe/?token=abc',
  profileUrl: 'https://textbook.com.pk/app/profile/',
};

describe('renderDigest', () => {
  const email = renderDigest({
    ...base,
    events: [
      event(),
      event({ id: 'urdu:EFMP-301:1', type: 'urdu' }),
      event({ id: 'course:EFMP-301', type: 'course', title_en: 'Educational Psychology', title_ur: 'تعلیمی نفسیات', permalink: '/semester-1/efmp-301/' }),
      event({ id: 'review:EFMP-301:1:G3', type: 'review', gate: 'G3' }),
    ],
    news: [{ id: 'n1', kind: 'offer', title_en: 'Free <b>workshop</b>', title_ur: null, link_url: 'https://example.org/x' }],
  });

  it('returns nothing for an empty week', () => {
    expect(renderDigest({ ...base, events: [], news: [] })).toBeNull();
  });

  it('summarises the week in a bilingual subject', () => {
    expect(email.subject).toBe(
      'This week on textbook.com.pk: 1 new course, 1 new unit, 1 Urdu translation, 1 reviewed unit, 1 announcement | اس ہفتے نیا مواد');
  });

  it('groups items with English and Urdu links', () => {
    for (const heading of ['New courses', 'New units', 'Now in Urdu', 'Reviewed units', 'News and offers', 'نئے یونٹ', 'اب اردو میں']) {
      expect(email.html).toContain(heading);
    }
    expect(email.html).toContain('href="https://textbook.com.pk/semester-1/efmp-301/unit-01/"');
    expect(email.html).toContain('href="https://textbook.com.pk/ur/semester-1/efmp-301/unit-01/"');
    expect(email.html).toContain('Introduction (G3 review)');
  });

  it('has a right-to-left Urdu block and a hosted PNG logo', () => {
    expect(email.html).toMatch(/lang="ur" dir="rtl"/);
    expect(email.html).toContain('https://textbook.com.pk/img/kit/icon-192.png');
    expect(email.html).not.toMatch(/<svg/i);
  });

  it('escapes admin-written text', () => {
    expect(email.html).toContain('Free &lt;b&gt;workshop&lt;/b&gt;');
    expect(email.html).not.toContain('<b>workshop</b>');
  });

  it('carries the unsubscribe link in both parts and has no em dash', () => {
    expect(email.html).toContain(escapeHtml(base.unsubscribeUrl));
    expect(email.text).toContain(`Unsubscribe: ${base.unsubscribeUrl}`);
    expect(email.text).toContain('- EFMP-301: Introduction');
    expect(EM_DASH.test(email.html + email.text + email.subject)).toBe(false);
  });
});

describe('long weeks', () => {
  it('shows eight items per section and links the rest', () => {
    const many = Array.from({ length: 11 }, (_, i) => event({ id: `unit:X:${i}`, title_en: `Unit title ${i}` }));
    const email = renderDigest({ ...base, events: many, news: [] });
    expect(email.html).toContain('Unit title 7');
    expect(email.html).not.toContain('Unit title 8');
    expect(email.html).toContain('and 3 more');
    expect(email.text).toContain('and 3 more: https://textbook.com.pk/');
    expect(email.subject).toContain('11 new units');
  });
});

describe('isoWeek', () => {
  it.each([
    ['2026-11-08T05:00:00Z', '2026-W45'], // a Sunday
    ['2026-01-01T00:00:00Z', '2026-W01'],
    ['2027-01-01T00:00:00Z', '2026-W53'],
  ])('%s is %s', (iso, week) => expect(isoWeek(new Date(iso))).toBe(week));
});

describe('unsubscribe tokens', () => {
  const id = '3f2a8c1e-1b2c-4d5e-8f90-a1b2c3d4e5f6';

  it('round-trips a genuine token', async () => {
    const token = await signUnsubscribe('s3cret', id);
    expect(await verifyUnsubscribe('s3cret', token)).toBe(id);
  });

  it('rejects tampering, another secret, and malformed tokens', async () => {
    const token = await signUnsubscribe('s3cret', id);
    const other = '00000000-0000-4000-8000-000000000000';
    expect(await verifyUnsubscribe('s3cret', token.replace(id, other))).toBeNull();
    expect(await verifyUnsubscribe('different', token)).toBeNull();
    expect(await verifyUnsubscribe('s3cret', `${token}x`)).toBeNull();
    expect(await verifyUnsubscribe('s3cret', 'not-a-token')).toBeNull();
    expect(await verifyUnsubscribe('', token)).toBeNull();
  });
});
