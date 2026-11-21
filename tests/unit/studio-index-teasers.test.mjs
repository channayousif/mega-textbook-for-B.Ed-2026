import { test, expect } from 'vitest';
import { buildTeaserIndex } from '../../scripts/build-studio-index.mjs';

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
  expect(buildTeaserIndex(ledger, (id) => scripts[id])).toEqual({ 'EFMP-301': { youtube_id: 'aLlBszfFEFQ', title: 'ur title', locale: 'ur' } });
});

test('a bad video id or a missing script is skipped', () => {
  expect(buildTeaserIndex({ items: [item('efmp-301', 'ur', 'public', 'not-an-id'), item('nope-999', 'ur', 'public')] }, (id) => scripts[id] ?? null)).toEqual({});
});
