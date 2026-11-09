// Feature 029: make a Gemini Notebook report (practicum brief, study guide) safe to publish.
//
// Gemini's built-in Study Guide appends "Short-Answer Practice Questions", an "Answer Key" and
// essay rubrics. Answer keys are forbidden outside the bounded assessment section (AGENTS.md
// "Content work"), so any heading that names one is removed together with everything under it,
// down to the next heading of the same or a higher level. Also: long dashes become spaced
// hyphens (check:no-em-dash), inline code ticks around terms are unwrapped (they would render as
// code), and stray citation markers like [3] are dropped.

/** Headings whose sections must never be published. */
export const FORBIDDEN_HEADING = /(practice question|answer key|answers?\b|marking|essay|rubric|quiz|self-test|جوابات|کوئز)/i;

const LONG_DASHES = / *[\u2014\u2015\u2E3A\u2E3B] */g;

export function cleanReport(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let skipLevel = 0;
  let removed = 0;
  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      if (skipLevel && level <= skipLevel) skipLevel = 0;
      if (!skipLevel && FORBIDDEN_HEADING.test(h[2])) {
        skipLevel = level;
        removed += 1;
        continue;
      }
    }
    if (!skipLevel) out.push(line);
  }
  let text = out.join('\n')
    // Fenced blocks in Gemini reports are ASCII diagrams, unreadable on a phone and
    // unrendered by studioMarkdown, so they are dropped rather than shown as raw text.
    .replace(/(^|\n)```[^\n]*\n[\s\S]*?\n```[^\n]*(?=\n|$)/g, '$1')
    .replace(LONG_DASHES, ' - ')
    .replace(/ {2,}- {2,}/g, ' - ')
    .replace(/`([^`\n]{1,60})`/g, '$1')
    .replace(/\s?\[\d+(?:\s*[,-]\s*\d+)*\]/g, '')
    .replace(/(\n---\s*)+\n*$/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { markdown: `${text}\n`, removedSections: removed };
}

/** True when a cleaned report still carries a forbidden section (used by the gate). */
export function hasForbiddenSection(md) {
  return md.split('\n').some((l) => {
    const h = l.match(/^#{1,6}\s+(.*)$/);
    return h ? FORBIDDEN_HEADING.test(h[1]) : false;
  });
}
