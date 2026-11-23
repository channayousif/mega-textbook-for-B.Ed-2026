import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseAssessment, validate } from '../../scripts/quiz/import-assessment-mcq.mjs';

const page = `## Summative assessment

### Multiple-choice questions (MCQs)

1. Attention is best described as: *(Remember)*
   a) the mind's selection of what gets through
   b) storage for later
   c) interpretation of what the senses deliver
   d) a fixed quantity

2. Sensation differs from perception in that sensation is: *(Understand)*
   a) interpretation
   b) longer-lasting
   c) conscious
   d) detection by a receptor, while perception organises and interprets what was
      detected

### Restricted-response questions (RRQs)

1. Name three features.

## Answers and marking guidance

### MCQ answer key

1. **a** - attention selects.
2. **d** - detection versus interpretation.

### RRQ model answers and mark schemes
`;

describe('self-check import (Feature 032 phase C)', () => {
  it('parses questions, wrapped options, Bloom tags and the key', () => {
    const p = parseAssessment(page);
    expect(p.items).toHaveLength(2);
    expect(p.items[0]).toMatchObject({ item_no: 1, question: 'Attention is best described as:', bloom: 'Remember' });
    expect(p.items[1].options.d).toBe('detection by a receptor, while perception organises and interprets what was detected');
    expect(p.answers).toEqual({ 1: 'a', 2: 'd' });
    expect(validate(p)).toEqual([]);
  });

  it('rejects a key that points at a missing option or a missing answer', () => {
    const p = parseAssessment(page);
    p.answers[2] = 'f';
    delete p.answers[1];
    const e = validate(p).join('\n');
    expect(e).toMatch(/question 1: no answer/);
    expect(e).toMatch(/question 2: key "f"/);
  });

  it('reads the real EFMP-301 Unit 4 page in both languages: ten items, every key valid', () => {
    for (const f of ['docs/semester-1/efmp-301/unit-04/unit-assessment.mdx',
      'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/unit-assessment.mdx']) {
      const p = parseAssessment(readFileSync(f, 'utf8'));
      expect(p.items).toHaveLength(10);
      expect(validate(p)).toEqual([]);
    }
  });
});
