/**
 * Feature 024: helpers behind check-licence.mjs.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { countWords, sections, questionShape, ANSWERS } from '../../scripts/lib/licence.mjs';

const page = `
Intro words here.

## What the test asks

One two three.

## Practice questions

### CRQ 1

Explain it.

### CRQ 2

Compare them.

${ANSWERS}

### CRQ 1

Rubric.

### CRQ 2

Rubric.
`;

describe('countWords', () => {
  it('skips imports, JSX lines and fenced code, and keeps link text', () => {
    const body = "import X from 'y';\n<Figure id=\"a\" />\nSee [the degree topic](/semester-1/x/unit-01/topic-01) now.\n```\ncode words\n```";
    expect(countWords(body)).toBe(5);
  });
});

describe('sections', () => {
  it('splits on level-2 headings with a preamble', () => {
    expect(sections(page).map((s) => s.heading)).toEqual(['', '## What the test asks', '## Practice questions', ANSWERS]);
  });
});

describe('questionShape', () => {
  it('counts questions before the answers section and rubric entries inside it', () => {
    const s = questionShape(page);
    expect(s).toMatchObject({ hasAnswers: true, answersLast: true, crq: 2, erq: 0, crqAnswers: 2 });
    expect(s.teachingBody).not.toContain('CRQ');
  });

  it('flags an answers section that is not last', () => {
    expect(questionShape(`${page}\n## Afterword\n`).answersLast).toBe(false);
  });
});

describe('catalog/licence-objectives.json', () => {
  const reg = JSON.parse(readFileSync('catalog/licence-objectives.json', 'utf8'));
  it('holds the 57 Part II objectives across five headings with unique ids and slugs', () => {
    expect(reg.objectives).toHaveLength(57);
    expect(new Set(reg.objectives.map((o) => o.id)).size).toBe(57);
    expect(new Set(reg.objectives.map((o) => `${o.heading}/${o.slug}`)).size).toBe(57);
    expect(reg.headings.map((h) => h.id)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});
