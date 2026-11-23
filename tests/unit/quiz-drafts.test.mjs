import { describe, test, expect } from 'vitest';
import { normaliseItem, parseDraftFile, toDraftRow } from '../../scripts/studio/quiz-drafts-lib.mjs';

/** Spec 029 / 0056 - the quiz-draft importer's validation and shuffling (no database). */
describe('quiz draft importer', () => {
  const good = {
    course_code: 'efmp-301',
    unit_no: 4,
    items: [
      { question: 'Which memory store holds information for seconds?', options: ['Sensory', 'Long-term', 'Episodic', 'Semantic'], correct: 0 },
      { question: 'Retrieval practice works because it...', options: [{ key: 'A', text: 'Rests the brain' }, { key: 'B', text: 'Strengthens recall routes' }], correct: 'b' },
    ],
  };

  test('accepts index and letter answers and normalises the course code', () => {
    const p = parseDraftFile(good);
    expect(p.courseCode).toBe('EFMP-301');
    expect(p.items.map((i) => i.correctIndex)).toEqual([0, 1]);
  });

  test.each([
    [{ ...good, course_code: 'EFMP301' }, /course_code/],
    [{ ...good, unit_no: 0 }, /unit_no/],
    [{ ...good, items: [] }, /non-empty/],
    [{ ...good, items: [good.items[0], good.items[0]] }, /duplicate question/],
  ])('rejects a bad file %#', (file, msg) => {
    expect(() => parseDraftFile(file)).toThrow(msg);
  });

  test.each([
    [{ question: '', options: ['a', 'b'], correct: 0 }, /empty question/],
    [{ question: 'Q', options: ['a'], correct: 0 }, /2-6 options/],
    [{ question: 'Q', options: ['a', 'A'], correct: 0 }, /duplicate options/],
    [{ question: 'Q', options: ['a', 'b'], correct: 2 }, /does not match/],
    [{ question: 'Q', options: [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }], correct: 'C' }, /does not match/],
    [{ question: 'Q — why', options: ['a', 'b'], correct: 0 }, /em dash/],
  ])('rejects a bad item %#', (item, msg) => {
    expect(() => normaliseItem(item, 0)).toThrow(msg);
  });

  test('shuffles, re-letters and keeps the right answer attached to its text', () => {
    const item = normaliseItem(good.items[0], 0);
    for (const seed of [0, 0.3, 0.6, 0.99]) {
      const row = toDraftRow(item, 'EFMP-301', 4, () => seed);
      expect(row.status).toBe('draft');
      expect(row.created_by).toBeNull();
      expect(row.options.map((o) => o.key)).toEqual(['A', 'B', 'C', 'D']);
      expect(new Set(row.options.map((o) => o.text))).toEqual(new Set(item.options));
      expect(row.options.find((o) => o.key === row.correct_option).text).toBe('Sensory');
    }
  });
});
