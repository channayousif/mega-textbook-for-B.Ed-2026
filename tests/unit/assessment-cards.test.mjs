import { describe, expect, it } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeAssessmentCards from '../../src/rehype/assessment-cards.mjs';

// Feature 034 T021 (#808): the plugin adds card classes to the question lists only.
const md = `## Summative assessment

### Multiple-choice questions (MCQs)

1. In this unit's account, "purpose" refers to: *(Remember)*
   a) the main idea of a text
   b) why a text was written

2. Which strategy fits? *(Understand)*
   - A. skimming
   - B. scanning

### Restricted-response questions (RRQs)

1. Explain the stereotype. *(Analyze)*

## Answers and marking guidance

### MCQ answer key

1. b
`;

function run(path) {
  const proc = unified().use(remarkParse).use(remarkRehype).use(rehypeAssessmentCards);
  return proc.runSync(proc.parse(md), { path });
}
const cls = (n) => [].concat(n.properties?.className ?? []);
function find(node, pred, out = []) {
  if (node.type === 'element' && pred(node)) out.push(node);
  for (const c of node.children ?? []) find(c, pred, out);
  return out;
}

describe('rehype-assessment-cards', () => {
  it('turns MCQ and RRQ lists into cards and leaves the answer key alone', () => {
    const tree = run('/x/unit-02/unit-assessment.mdx');
    const lists = find(tree, (n) => n.tagName === 'ol');
    expect(cls(lists[0])).toEqual(['aq-list', 'aq-list--mcq']);
    expect(cls(lists[1])).toEqual(['aq-list', 'aq-list--rrq']);
    expect(cls(lists[2])).toEqual([]);
    expect(find(tree, (n) => cls(n).includes('aq-card'))).toHaveLength(3);
    expect(find(tree, (n) => cls(n).includes('aq-selfcheck-slot'))).toHaveLength(1);
  });

  it('breaks indented options onto lines and marks nested option lists', () => {
    const tree = run('/x/unit-assessment.mdx');
    const [first, second] = find(tree, (n) => cls(n).includes('aq-card'));
    expect(find(first, (n) => n.tagName === 'br')).toHaveLength(2);
    expect(find(second, (n) => cls(n).includes('aq-choices'))).toHaveLength(1);
    expect(find(tree, (n) => cls(n).includes('bloom-chip--remember'))).toHaveLength(1);
  });

  it('ignores every other page', () => {
    const tree = run('/x/topic-01.mdx');
    expect(find(tree, (n) => cls(n).includes('aq-card'))).toHaveLength(0);
  });
});
