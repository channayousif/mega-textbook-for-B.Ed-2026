/**
 * Feature 028 - merging admin items with automatic events for the ticker, and the
 * admin console's status labels (src/lib/news.ts).
 */
import { describe, it, expect } from 'vitest';
import { mergeNews, newsStatus, DEFAULT_ICON, NEWS_ICONS, laneOf, groupBursts, buildLanes, MAX_LANE_ITEMS } from '../../src/lib/newsMerge.ts';

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

  it('defaults admin kinds to icons the database allows, and automatic kinds to icons that exist', async () => {
    // Only admin-written items are stored (news_items.icon has a check constraint); automatic events never are.
    for (const kind of ['news', 'offer', 'update', 'event', 'alert']) expect(NEWS_ICONS).toContain(DEFAULT_ICON[kind]);
    const { ICONS } = await import('../../src/components/icons/paths.ts');
    for (const icon of Object.values(DEFAULT_ICON)) expect(Object.keys(ICONS)).toContain(icon);
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

describe('lanes, bursts and pins (three-row ticker)', () => {
  const unit = (n, date, over = {}) => event({ id: `unit:EFPG-401:${n}`, unit_no: n, date, title_en: `Unit ${n}`, permalink: `/semester-4/efpg-401/unit-0${n}/`, course_code: 'EFPG-401', ...over });

  it('sorts kinds into announcements, new content, and Urdu and reviews', () => {
    expect(['news', 'offer', 'alert'].map(laneOf)).toEqual(['announcements', 'announcements', 'announcements']);
    expect(['course', 'unit', 'updated', 'figures'].map(laneOf)).toEqual(['content', 'content', 'content', 'content']);
    expect(['urdu', 'review', 'provisional'].map(laneOf)).toEqual(['urdu', 'urdu', 'urdu']);
  });

  it('groups a week-long burst of one kind for one course, linking the course root', () => {
    const items = mergeNews([], [unit(1, '2026-11-20T00:00:00Z'), unit(2, '2026-11-18T00:00:00Z'), unit(3, '2026-11-15T00:00:00Z'), unit(4, '2026-10-01T00:00:00Z')], 'en', 99);
    const out = groupBursts(items, 'en');
    const g = out.find((it) => it.children);
    expect(g).toMatchObject({ title: '3 new units', context: 'EFPG-401', href: '/semester-4/efpg-401/', count: 3, date: '2026-11-20T00:00:00Z' });
    expect(g.children.map((c) => c.id)).toEqual(['unit:EFPG-401:1', 'unit:EFPG-401:2', 'unit:EFPG-401:3']);
    expect(out.map((it) => it.id)).toContain('unit:EFPG-401:4');
    expect(groupBursts(items, 'ur').find((it) => it.children).title).toBe('3 نئے یونٹ');
  });

  it('counts figures, not events, in a figures burst', () => {
    const f = (n, c) => event({ id: `figures:GQUR-301:${n}`, type: 'figures', course_code: 'GQUR-301', unit_no: n, count: c, date: '2026-11-21T00:00:00Z' });
    const g = groupBursts(mergeNews([], [f(1, 4), f(2, 3)], 'en', 99), 'en').find((it) => it.children);
    expect(g).toMatchObject({ title: '7 new illustrations and figures', count: 7 });
  });

  it('builds up to three rows, leaves empty rows out, and never groups a pinned item', () => {
    const auto = [unit(1, '2026-11-20T00:00:00Z'), unit(2, '2026-11-19T00:00:00Z'), event({ id: 'urdu:EFMP-301:1', type: 'urdu' })];
    const lanes = buildLanes([], auto, new Set(['unit:EFPG-401:2']), 'en');
    expect(lanes.map((l) => l.key)).toEqual(['content', 'urdu']);
    const content = lanes[0];
    expect(content.pinned.map((it) => it.id)).toEqual(['unit:EFPG-401:2']);
    expect(content.scrolling.map((it) => it.id)).toEqual(['unit:EFPG-401:1']);
  });

  it('stands at most two pins still per row; more pins lead the scrolling list, capped at ten', () => {
    const manual = [1, 2, 3].map((n) => item({ id: `p${n}`, pinned: true, starts_at: `2026-11-0${n}T00:00:00Z` }))
      .concat(Array.from({ length: 12 }, (_, i) => item({ id: `n${i}`, starts_at: `2026-10-${String(i + 10)}T00:00:00Z` })));
    const [ann] = buildLanes(manual, [], new Set(), 'en');
    expect(ann.pinned.map((it) => it.id)).toEqual(['news:p3', 'news:p2']);
    expect(ann.scrolling[0].id).toBe('news:p1');
    expect(ann.scrolling).toHaveLength(MAX_LANE_ITEMS);
  });
});
