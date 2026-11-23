import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildFigureAnimationIndex, figureBase, figureLang } from '../../src/lib/figureAnimations';

describe('figure animation index (Feature 032)', () => {
  it('maps every figure variant to one base path and its language', () => {
    expect(figureBase('/img/figures/efmp-301/unit-04/fig-U4-3.svg')).toBe('/img/figures/efmp-301/unit-04/fig-U4-3');
    expect(figureBase('/img/figures/efmp-301/unit-04/fig-U4-3.ur.dark.svg')).toBe('/img/figures/efmp-301/unit-04/fig-U4-3');
    expect(figureLang('/img/figures/x/fig.ur.svg')).toBe('ur');
    expect(figureLang('/img/figures/x/fig.ur.dark.svg')).toBe('ur');
    expect(figureLang('/img/figures/x/fig.dark.svg')).toBe('en');
  });

  it('only playable 16x9 videos reach the site', () => {
    const idx = buildFigureAnimationIndex({ animations: [
      { figure: '/img/figures/a/fig-1', lang: 'en', format: '16x9', youtube_id: 'AAAAAAAAAAA', status: 'public' },
      { figure: '/img/figures/a/fig-1', lang: 'ur', format: '16x9', youtube_id: 'BBBBBBBBBBB', status: 'private' },
      { figure: '/img/figures/a/fig-1', lang: 'ur', format: '9x16', youtube_id: 'CCCCCCCCCCC', status: 'public' },
      { figure: '/img/figures/a/fig-2', lang: 'en', format: '16x9', youtube_id: 'bad', status: 'unlisted' },
      { figure: 'https://evil.example/fig', lang: 'en', format: '16x9', youtube_id: 'DDDDDDDDDDD', status: 'public' },
    ] });
    expect(idx).toEqual({ '/img/figures/a/fig-1': { en: 'AAAAAAAAAAA' } });
  });

  it('the committed ledger is valid; every public entry was approved', () => {
    const ledger = JSON.parse(readFileSync('specs/studio/animations/placed.json', 'utf8'));
    expect(ledger.schema_version).toBe(1);
    for (const a of ledger.animations) {
      expect(a.figure).toMatch(/^\/img\/figures\/[a-z0-9-]+\/unit-\d{2}\/fig-U\d+-\d+$/);
      if (a.status !== 'private') expect(a.approved).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    const idx = buildFigureAnimationIndex(ledger);
    expect(idx['/img/figures/efmp-301/unit-04/fig-U4-3']).toEqual({ en: 'lcHh3qG3L3E', ur: '0xoCN70ARgg' });
    expect(idx['/img/figures/efmp-301/unit-04/fig-U4-1']).toEqual({ en: 'aGWlr2i3AWs' });
  });
});
