/**
 * Feature 024: pure helpers for the licence-track gate (`scripts/check-licence.mjs`)
 * and the reverse-link map (`scripts/build-licence-map.mjs`). Kept import-safe
 * (no side effects) so tests can exercise them directly.
 */
export const LIMITS = Object.freeze({
  coveredMaxWords: 700,
  partialMinWords: 500,
  authoredMinWords: 1000,
  subtopicMinCrq: 1,
  subtopicMaxCrq: 2,
  practiceMinCrq: 5,
  practiceErq: 1,
});

export const ANSWERS = '## Answers and marking guidance';
export const PRACTICE = '## Practice questions';

/** Words of prose, ignoring imports, JSX lines, fenced code and markdown punctuation. */
export function countWords(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .split('\n')
    .filter((l) => !/^\s*(import |export |<|\{\/\*)/.test(l))
    .join(' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/[#*_>|`[\]-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Split an MDX body at `## ` headings; returns [{heading, text}], preamble has heading ''. */
export function sections(body) {
  const out = [{ heading: '', text: '' }];
  for (const line of body.split('\n')) {
    if (/^## /.test(line)) out.push({ heading: line.trimEnd(), text: '' });
    else out[out.length - 1].text += line + '\n';
  }
  return out;
}

const countH3 = (text, word) => (text.match(new RegExp(`^### ${word}\\b`, 'gm')) || []).length;

/** Question/answer structure shared by subtopic and practice pages. */
export function questionShape(body) {
  const secs = sections(body);
  const idxAnswers = secs.findIndex((s) => s.heading === ANSWERS);
  const answersLast = idxAnswers === secs.length - 1;
  const before = secs.slice(0, idxAnswers === -1 ? secs.length : idxAnswers).map((s) => s.text).join('\n');
  const answers = idxAnswers === -1 ? '' : secs[idxAnswers].text;
  return {
    hasAnswers: idxAnswers !== -1,
    answersLast,
    crq: countH3(before, 'CRQ'),
    erq: countH3(before, 'ERQ'),
    crqAnswers: countH3(answers, 'CRQ'),
    erqAnswers: countH3(answers, 'ERQ'),
    teachingBody: body.split(PRACTICE)[0],
  };
}

