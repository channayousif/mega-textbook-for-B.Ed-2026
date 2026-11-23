import { describe, expect, it } from 'vitest';
import { buildFlashcards, validateDeck } from '../../scripts/build-studio-index.mjs';

const g = (term, en = `${term} means x.`, ur = `${term} کا مطلب۔`) => ({ term, definition_en: en, definition_ur: ur });
const glossary = ['Primary group', 'Secondary group', 'Role strain', 'Social group', 'Fraction', 'Sociology', 'Cooperation'].map((t) => g(t));
const origin = { 'Primary group': 'GSOS-301', 'Secondary group': 'GSOS-301', 'Role strain': 'GSOS-301', 'Social group': 'GSOS-301', Sociology: 'GSOS-301', Cooperation: 'GSOS-301', Fraction: 'EFMP-304' };

describe('flashcards (Feature 032 phase C)', () => {
  it('builds a topic deck from its own course terms, ranked, with Urdu terms where a pair exists', () => {
    const topics = [
      { key: 'gsos-301/3/1', text: 'A primary group is close. A secondary group is formal. Role strain hurts. Each social group has roles. Sociology studies groups. A fraction of a second.' },
      { key: 'gsos-301/3/2', text: 'Cooperation and sociology.' },
      { key: 'efmp-304/1/1', text: 'A fraction is part of a whole. Fraction, fraction.' },
    ];
    const decks = buildFlashcards(topics, glossary, new Map([['sociology', 'عمرانیات']]), { origin });
    const terms = decks['gsos-301/3/1'].en.map((c) => c.term);
    expect(terms).toContain('Primary group');
    expect(terms).not.toContain('Fraction');
    expect(decks['gsos-301/3/1'].ur.find((c) => c.term === 'عمرانیات')).toBeTruthy();
    expect(decks['gsos-301/3/2']).toBeUndefined(); // fewer than four good cards: no deck
  });

  it('validates authored decks', () => {
    const cards = (n) => Array.from({ length: n }, (_, i) => ({ term: `t${i}`, definition: 'd' }));
    expect(validateDeck({ en: cards(6), ur: cards(6) })).toEqual([]);
    expect(validateDeck({ en: cards(3), ur: cards(3) }).join()).toMatch(/4 to 12/);
    expect(validateDeck({ en: cards(5), ur: cards(6) }).join()).toMatch(/counts differ/);
    expect(validateDeck({ en: [...cards(4), { term: 'a', definition: 'x — y' }], ur: cards(5) }).join()).toMatch(/long dash/);
  });
});
