/**
 * Feature 028 - merging admin items with automatic events for the ticker, and the
 * admin console's status labels (src/lib/news.ts).
 */
import { describe, it, expect } from 'vitest';
import { mergeNews, newsStatus, DEFAULT_ICON, NEWS_ICONS } from '../../src/lib/newsMerge.ts';

const item = (over = {}) => ({
  id: 'a', kind: 'news', title_en: 'Hello', title_ur: null, link_url: null, icon: 'megaphone',
  pinned: false, published: true, starts_at: '2026-11-05T00:00:00Z', ends_at: null,
  created_by: null, created_at: '', updated_at: '', archived_at: null, ...over,
});
const event = (over = {}) => ({
  id: 'unit:EFMP-301:1', type: 'unit', date: '2026-11-06T00:00:00Z', course_code: 'EFMP-301', unit_no: 1,
  title_en: 'Intro', title_ur: 'تعارف', course_title_en: 'Psych', course_title_ur: null,
  permalink: '/semester-1/efmp-301/unit-01/', ...over,
});

describe('mergeNews', () => {
  it('puts pinned manual items first, then everything newest first', () => {
    const out = mergeNews(
      [item({ id: 'old-pin', pinned: true, starts_at: '2026-10-01T00:00:00Z' }), item({ id: 'new', starts_at: '2026-11-07T00:00:00Z' })],
      [event()],
      'en',
    );
    expect(out.map((i) => i.id)).toEqual(['news:old-pin', 'news:new', 'unit:EFMP-301:1']);
  });

  it('uses Urdu titles in Urdu and falls back to English when none was written', () => {
    const out = mergeNews([item()], [event()], 'ur');
    expect(out.find((i) => i.source === 'auto').title).toBe('تعارف');
    expect(out.find((i) => i.source === 'manual').title).toBe('Hello');
  });

  it('gives content events their icon, course context and link', () => {
    const [e] = mergeNews([], [event({ type: 'urdu' })], 'en');
    expect(e).toMatchObject({ icon: 'translated', context: 'EFMP-301', href: '/semester-1/efmp-301/unit-01/' });
    const [c] = mergeNews([], [event({ type: 'course', id: 'course:EFMP-301' })], 'en');
    expect(c.context).toBeNull();
  });

  it('caps the list', () => {
    const many = Array.from({ length: 30 }, (_, i) => event({ id: `e${i}` }));
    expect(mergeNews([], many, 'en')).toHaveLength(12);
  });

  it('only defaults to icons the database allows', () => {
    for (const icon of Object.values(DEFAULT_ICON)) expect(NEWS_ICONS).toContain(icon);
  });
});

describe('newsStatus', () => {
  const now = new Date('2026-11-09T00:00:00Z');
  it.each([
    [{ archived_at: '2026-11-01T00:00:00Z' }, 'archived'],
    [{ published: false }, 'draft'],
    [{ starts_at: '2026-12-01T00:00:00Z' }, 'scheduled'],
    [{ ends_at: '2026-11-08T00:00:00Z' }, 'expired'],
    [{}, 'live'],
  ])('%o is %s', (over, expected) => {
    expect(newsStatus(item(over), now)).toBe(expected);
  });
});
