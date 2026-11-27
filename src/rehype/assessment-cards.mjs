/**
 * rehype-assessment-cards (Feature 034 T021, #808).
 *
 * Gives a unit assessment's question bank a card layout WITHOUT touching a content file (editing
 * unit MDX would re-open review evidence). Runs only on `unit-assessment.mdx`, after MDX has
 * produced HTML, and only adds class names, line breaks and one empty slot:
 *
 *  1. The ordered list after a `### ... (MCQs)`, `(RRQs)` or `(ERQs)` heading (the Latin marker is
 *     present in both locales; the answer-key headings never carry it) becomes `aq-list
 *     aq-list--<kind>`, and each item an `aq-card`. Trailing `*(Level)*` becomes a Bloom chip.
 *  2. MCQ options written as a nested list get `aq-choices`; options written as indented lines
 *     inside the item get a line break before each option marker, so they no longer run on.
 *  3. An empty `div.aq-selfcheck-slot` goes before the MCQ list. SelfCheck renders its
 *     server-marked cards into it, and the plain list then stays for print and no-JavaScript
 *     reading only, so the MCQs appear once.
 *
 * Nothing in the "Answers and marking guidance" section matches, so answer keys are untouched.
 */
import { addClass, chipBloom, textOf } from './topic-enhance.mjs';

const KIND_RE = /\((MCQ|RRQ|ERQ)s\)/;
const OPTION_START = /^\s*(?:[a-fA-F][).]|\([a-fA-F]\)|(?:الف|ب|ج|د|ہ)[).)\s])/;

const isEl = (node, tag) => node && node.type === 'element' && (!tag || node.tagName === tag);
const isBlank = (node) => node && node.type === 'text' && !node.value.trim();

/** Insert <br> before each line of a paragraph's text that starts with an option marker. */
function breakOptions(p) {
  const out = [];
  for (const child of p.children || []) {
    if (child.type !== 'text' || !child.value.includes('\n')) { out.push(child); continue; }
    const lines = child.value.split('\n');
    lines.forEach((line, i) => {
      if (i > 0) {
        if (OPTION_START.test(line)) out.push({ type: 'element', tagName: 'br', properties: {}, children: [] });
        else out.push({ type: 'text', value: '\n' });
      }
      if (line) out.push({ type: 'text', value: i > 0 && OPTION_START.test(line) ? line.trimStart() : line });
    });
  }
  p.children = out;
}

function enhanceMcqItem(li) {
  for (const child of li.children || []) {
    if (isEl(child, 'ul') || isEl(child, 'ol')) addClass(child, 'aq-choices');
    else if (isEl(child, 'p')) breakOptions(child);
  }
}

export default function rehypeAssessmentCards() {
  return (tree, file) => {
    const path = String(file.path || (file.history && file.history[0]) || '');
    if (!/unit-assessment\.mdx$/.test(path)) return;
    const kids = tree.children;
    for (let i = 0; i < kids.length; i += 1) {
      if (!isEl(kids[i], 'h3')) continue;
      const m = KIND_RE.exec(textOf(kids[i]));
      if (!m) continue;
      const kind = m[1].toLowerCase();
      let j = i + 1;
      while (j < kids.length && isBlank(kids[j])) j += 1;
      const list = kids[j];
      if (!isEl(list, 'ol')) continue;
      addClass(list, 'aq-list', `aq-list--${kind}`);
      for (const li of list.children || []) {
        if (!isEl(li, 'li')) continue;
        addClass(li, 'aq-card');
        chipBloom(li);
        if (kind === 'mcq') enhanceMcqItem(li);
      }
      if (kind === 'mcq') {
        kids.splice(j, 0, { type: 'element', tagName: 'div', properties: { className: ['aq-selfcheck-slot'] }, children: [] });
        i = j + 1;
      }
    }
  };
}
