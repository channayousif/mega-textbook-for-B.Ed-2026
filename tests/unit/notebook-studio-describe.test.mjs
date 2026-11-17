import { describe, it, expect } from 'vitest';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseOverview, frontmatter, courseFacts, videoLinks, moreAbout, fitDescription } from '../../scripts/notebook-studio/describe.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

describe('shared description blocks', () => {
  it('reads the overview summary and outcomes, and unit frontmatter', () => {
    const o = parseOverview('---\ntitle: x\n---\n\n# T\n\nLine one\nline two.\n\n## Course learning outcomes\n\nBy the end:\n\n1. Do A.\n2. Do B.\n\n## Next\n');
    expect(o).toEqual({ summary: 'Line one line two.', outcomes: ['Do A.', 'Do B.'] });
    expect(frontmatter('---\ntitle: "یونٹ"\ndescription: "خلاصہ"\nunit_no: 4\n---\nbody')).toEqual({ title: 'یونٹ', description: 'خلاصہ' });
  });
  it('builds EFMP-301 facts in the right locale with live unit routes', () => {
    const en = courseFacts('efmp-301', 'en', { root: ROOT });
    expect(en.objectives).toHaveLength(6);
    expect(en.units).toHaveLength(12);
    expect(en.units[3].url).toBe('https://textbook.com.pk/semester-1/efmp-301/unit-04/');
    const ur = courseFacts('efmp-301', 'ur', { root: ROOT });
    expect(ur.units[3].title).toBe('تعلیم میں ادراکی عمل');
    expect(ur.summary).toBeNull(); // no Urdu overview and no override: never fall back to English
    expect(ur.objectives).toEqual([]);
  });
  it('links only published videos in the locale, own course and videos first, never a teaser to itself', () => {
    const ledgers = [
      { course: 'efmp-301', items: [
        { youtube_id: 'A', state: 'placed', locale: 'ur', kind: 'audio', title: 'a' },
        { youtube_id: 'V', state: 'placed', locale: 'ur', kind: 'video', title: 'v' },
        { youtube_id: 'P', state: 'uploaded-private', locale: 'ur', kind: 'video', title: 'p' },
        { youtube_id: 'E', state: 'placed', locale: 'en', kind: 'video', title: 'e' },
      ] },
      { course: 'geng-300', items: [{ youtube_id: 'O', state: 'placed', locale: 'ur', kind: 'video', title: 'o' }] },
      { items: [{ id: 'efmp-301', youtube_id: 'S', state: 'public', locale: 'ur' }, { id: 'geng-300', youtube_id: 'T', state: 'public', locale: 'ur' }] },
    ];
    const v = videoLinks('efmp-301', 'ur', { ledgers, skipTeaserOf: 'efmp-301', root: ROOT }).map((x) => x.url.slice(-1));
    expect(v).toEqual(['V', 'A', 'O', 'T']);
  });
  it('lowers detail until the description fits: unit descriptions, then videos, then unit links', () => {
    const facts = { locale: 'en', summary: 's', objectives: ['o'], units: Array.from({ length: 12 }, (_, i) => ({ n: i + 1, title: `U${i + 1}`, description: 'd'.repeat(300), url: `https://x/${i}` })) };
    const videos = Array.from({ length: 6 }, (_, i) => ({ title: `v${i}`, url: `https://youtu.be/${i}` }));
    const make = (level) => moreAbout(facts, { videos, level });
    expect(make(0)).toContain('d'.repeat(300));
    expect(make(1)).not.toContain('d'.repeat(300));
    expect(make(2).match(/youtu\.be/g)).toHaveLength(3);
    expect(make(3)).not.toContain('https://x/');
    expect(fitDescription(make, 1200).level).toBe(1);
    expect(() => fitDescription(make, 50)).toThrow(/over 50 bytes/);
  });
});
