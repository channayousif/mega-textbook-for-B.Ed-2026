/**
 * rehype-topic-enhance (UX refresh, 2026-10-04).
 *
 * Gives the Spec 008 nine-part topic cycle a visual structure WITHOUT touching a
 * single content file, so EN/UR parity, translation_status and the frozen v4.0
 * style guide are unaffected. Runs only on `topic-NN.mdx` pages, after MDX has
 * produced HTML, and only adds wrappers and class names:
 *
 *  1. Each `##` section is wrapped in `<section class="topic-section topic-section--<kind>">`
 *     with the heading kept as its FIRST child, so sibling walks from a heading
 *     (DocItem/Content's self-assessment hydration) still see the same list.
 *  2. A paragraph that opens with a known bold lead-in becomes a callout
 *     (misconception, worked example). A rubric lead-in plus its table is wrapped
 *     in one rubric card. The activity's bold brief becomes a task strip.
 *  3. Bloom levels written as `*(Apply)*` in "Check your understanding" become chips.
 *
 * Matching is by heading / lead-in text in both locales; anything unmatched is left
 * exactly as it was.
 */

const SECTION_KINDS = [
  ['scenario', /real classroom situation|حقیقی/i],
  ['explanation', /^explanation|^وضاحت/i],
  ['activity', /^activity|^سرگرمی/i],
  ['check', /^check your understanding|اپنی سمجھ جانچیں/i],
  ['summary', /^summary|^خلاصہ/i],
  ['selfcheck', /self-assessment|خود (جائزہ|جانچ)/i],
  ['practicum', /practicum|پریکٹیکم/i],
  ['summative', /^summative|^مجموعی کام/i],
  ['reading', /further reading|مزید (مطالعہ|پڑھائی)/i],
];

const CALLOUT_KINDS = [
  ['misconception', /misconception|غلط فہمی/i],
  ['example', /worked example|حل شدہ مثال/i],
];

const RUBRIC_RE = /^(mini-rubric|marking guide|مختصر معیارِ جانچ|منی معیارِ جانچ|معیارِ جانچ|منی روبرک|مختصر روبرک|نمبر دہی کی رہنمائی)/i;

const BLOOM_LEVELS = [
  ['remember', /^(remember|یاد رکھنا|یاد رکھیں)$/i],
  ['understand', /^(understand|سمجھنا|سمجھیں)$/i],
  ['apply', /^(apply|لاگو کرنا|لاگو کریں|اطلاق)$/i],
  ['analyze', /^(analy[sz]e|تجزیہ|تجزیہ کریں)$/i],
  ['evaluate', /^(evaluate|جانچنا|تشخیص)$/i],
  ['create', /^(create|تخلیق|تخلیق کریں)$/i],
];

const isEl = (node, tag) => node && node.type === 'element' && (!tag || node.tagName === tag);
const isBlank = (node) => node && node.type === 'text' && !node.value.trim();

function textOf(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

function addClass(node, ...names) {
  node.properties = node.properties || {};
  const current = node.properties.className || [];
  node.properties.className = [...(Array.isArray(current) ? current : [current]), ...names];
}

function match(table, text) {
  const hit = table.find(([, re]) => re.test(text.trim()));
  return hit ? hit[0] : null;
}

/** The bold lead-in of a paragraph, or null when it does not open with one. */
function leadIn(p) {
  if (!isEl(p, 'p')) return null;
  const first = (p.children || []).find((c) => !isBlank(c));
  return isEl(first, 'strong') ? textOf(first).replace(/[.:۔\s]+$/, '') : null;
}

function nextElementIndex(children, from) {
  for (let i = from; i < children.length; i += 1) {
    if (!isBlank(children[i])) return isEl(children[i]) ? i : -1;
  }
  return -1;
}

function enhanceSection(kind, children) {
  const out = [];
  let briefed = false;
  for (let i = 0; i < children.length; i += 1) {
    const node = children[i];
    const lead = leadIn(node);
    if (lead && RUBRIC_RE.test(lead)) {
      const t = nextElementIndex(children, i + 1);
      if (t !== -1 && isEl(children[t], 'table')) {
        addClass(node, 'callout__title');
        out.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout', 'callout--rubric'] },
          children: [node, children[t]],
        });
        i = t;
        continue;
      }
    }
    if (lead) {
      const callout = match(CALLOUT_KINDS, lead);
      if (callout) {
        addClass(node, 'callout', `callout--${callout}`);
      } else if (kind === 'activity' && !briefed) {
        addClass(node, 'activity-brief');
        briefed = true;
      }
    }
    if (kind === 'check' && isEl(node, 'ol')) {
      addClass(node, 'check-list');
      for (const li of node.children || []) if (isEl(li, 'li')) chipBloom(li);
    }
    out.push(node);
  }
  return out;
}

/** Replace a trailing `*(Level)*` emphasis inside a list item with a Bloom chip. */
function chipBloom(node) {
  for (const child of node.children || []) {
    if (isEl(child, 'em')) {
      const m = /^\((.+)\)$/.exec(textOf(child).trim());
      const level = m && match(BLOOM_LEVELS, m[1].split('/')[0]);
      if (level) {
        child.tagName = 'span';
        addClass(child, 'bloom-chip', `bloom-chip--${level}`);
        child.children = [{ type: 'text', value: m[1].trim() }];
      }
    } else if (isEl(child)) {
      chipBloom(child);
    }
  }
}

export default function rehypeTopicEnhance() {
  return (tree, file) => {
    const path = String(file.path || (file.history && file.history[0]) || '');
    if (!/topic-\d+\.mdx$/.test(path)) return;

    const out = [];
    let section = null;
    const close = () => {
      if (!section) return;
      section.node.children = [section.heading, ...enhanceSection(section.kind, section.body)];
      out.push(section.node);
      section = null;
    };

    for (const node of tree.children) {
      if (isEl(node, 'h2')) {
        close();
        const kind = match(SECTION_KINDS, textOf(node)) || 'other';
        section = {
          kind,
          heading: node,
          body: [],
          node: {
            type: 'element',
            tagName: 'section',
            properties: { className: ['topic-section', `topic-section--${kind}`], dataSection: kind },
            children: [],
          },
        };
      } else if (section) {
        section.body.push(node);
      } else {
        out.push(node);
      }
    }
    close();
    tree.children = out;
  };
}
