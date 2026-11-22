import { test, expect } from 'vitest';
import { buildTeaserIndex, pickHomeTeasers } from '../../scripts/build-studio-index.mjs';
import { statsFromResponse, publicIds } from '../../scripts/notebook-studio/teaser-stats.mjs';

const scripts = {
  'efmp-301': { course_code: 'EFMP-301', title: { en: 'Educational Psychology', ur: 'تعلیمی نفسیات' }, locales: { ur: { youtube_title: 'ur title' }, en: { youtube_title: 'en title' } } },
  'gqur-300': { course_code: 'GQUR-300', title: { ur: 'مقداری استدلال' }, locales: { ur: {} } },
  licence: { kind: 'licence', title: { ur: 'لائسنس' }, locales: { ur: {} } },
};
const item = (id, locale, state, youtube_id = 'aLlBszfFEFQ') => ({ key: `${id}-${locale}`, id, locale, state, youtube_id });

test('only public teasers reach the site index, Urdu first', () => {
  const ledger = { items: [
    item('efmp-301', 'en', 'public', 'AAAAAAAAAAA'),
    item('efmp-301', 'ur', 'public'),
    ...['uploaded-private', 'qa3-pass', 'approved'].map((s) => item('gqur-300', 'ur', s)),
    item('licence', 'ur', 'public'),
  ] };
  expect(buildTeaserIndex(ledger, (id) => scripts[id])).toEqual({ 'EFMP-301': { youtube_id: 'aLlBszfFEFQ', title: 'ur title', locale: 'ur', semester: null, published_at: null, views: 0 } });
});

test('a bad video id or a missing script is skipped', () => {
  expect(buildTeaserIndex({ items: [item('efmp-301', 'ur', 'public', 'not-an-id'), item('nope-999', 'ur', 'public')] }, (id) => scripts[id] ?? null)).toEqual({});
});

test('the index carries the semester, the publish time and the views from the stats snapshot', () => {
  const ledger = { items: [{ ...item('gqur-300', 'ur', 'public', 'BBBBBBBBBBB'), published_at: '2026-11-22T05:00:00Z' }] };
  const idx = buildTeaserIndex(ledger, (id) => ({ ...scripts[id], semester: 1 }), { videos: { BBBBBBBBBBB: { views: 42, likes: 1 } } });
  expect(idx['GQUR-300']).toMatchObject({ semester: 1, published_at: '2026-11-22T05:00:00Z', views: 42 });
});

const t = (views, published_at, semester = 1) => ({ youtube_id: 'x'.repeat(11), title: 't', locale: 'ur', semester, published_at, views });

test('home picks: the two most watched, then the two newest not already picked', () => {
  const picks = pickHomeTeasers({
    A: t(20, '2026-11-17'), B: t(12, '2026-11-20'), C: t(10, '2026-11-18'),
    D: t(3, '2026-11-22T10:00'), E: t(0, '2026-11-22T11:00'), F: t(5, '2026-11-19'),
  });
  expect(picks.map((p) => `${p.code}:${p.reason}`)).toEqual(['A:top', 'B:top', 'E:latest', 'D:latest']);
});

test('home picks: a newest teaser that is also most watched is not repeated, ties go to the newer', () => {
  const picks = pickHomeTeasers({ A: t(9, '2026-11-22'), B: t(9, '2026-11-21'), C: t(1, '2026-11-20'), D: t(0, '2026-11-19') });
  expect(picks.map((p) => `${p.code}:${p.reason}`)).toEqual(['A:top', 'B:top', 'C:latest', 'D:latest']);
});

test('home picks: no views means the four newest; fewer teasers show what exists; no semester, no card', () => {
  expect(pickHomeTeasers({ A: t(0, '1'), B: t(0, '3'), C: t(0, '2'), D: t(0, '5'), E: t(0, '4') }).map((p) => p.code)).toEqual(['D', 'E', 'B', 'C']);
  expect(pickHomeTeasers({ A: t(4, '1') }).map((p) => `${p.code}:${p.reason}`)).toEqual(['A:top']);
  expect(pickHomeTeasers({ A: t(4, '1', null) })).toEqual([]);
  expect(pickHomeTeasers({})).toEqual([]);
});

test('teaser stats: public ids only, and the API response mapped to sorted counts', () => {
  expect(publicIds({ items: [item('a', 'ur', 'public', 'BBBBBBBBBBB'), item('b', 'ur', 'approved', 'CCCCCCCCCCC'), item('c', 'ur', 'public', 'AAAAAAAAAAA')] })).toEqual(['AAAAAAAAAAA', 'BBBBBBBBBBB']);
  expect(statsFromResponse({ items: [{ id: 'B', statistics: { viewCount: '7', likeCount: '1' } }, { id: 'A', statistics: {} }] }, 'now'))
    .toEqual({ fetched_at: 'now', videos: { A: { views: 0, likes: 0 }, B: { views: 7, likes: 1 } } });
});
