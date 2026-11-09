#!/usr/bin/env node
// Feature 029: turn one topic's MDX into a clean Markdown source for Gemini Notebook.
//
// What goes in: the topic prose, headings, glossary terms as plain words, and every
// figure as its alt text. What never goes in: imports, page widgets, MDX comments,
// and anything from an "Answers and marking guidance" heading onward (answer keys
// stay backend-only - AGENTS.md "Content work"). Assessment and teacher-notes pages
// are refused outright so a pack can never carry a bank or a marking scheme.
//
// Usage:
//   node scripts/notebook-studio/build-source-pack.mjs <course> <unit> <topic> [en|ur] [--out DIR]
//   e.g. efmp-301 4 1 en   ->  .studio/efmp-301/unit-04/topic-01.en.md
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const UR_ROOTS = {
  docs: 'i18n/ur/docusaurus-plugin-content-docs/current',
  licence: 'i18n/ur/docusaurus-plugin-content-docs-licence/current',
};
const ANSWERS_HEADING = /^#{1,6}\s+(Answers and marking guidance|جوابات)/m;
const REFUSED = /^(unit-assessment|unit-teacher-notes|course-review)\.mdx$/;

const pad = (n) => String(n).padStart(2, '0');

/** Find the EN topic file for a course across both content tracks. */
export function findTopicFile(course, unit, topic, locale = 'en', root = ROOT) {
  const rel = join(course, `unit-${pad(unit)}`, `topic-${pad(topic)}.mdx`);
  const candidates = [];
  const docsDir = join(root, 'docs');
  if (existsSync(docsDir)) {
    for (const sem of readdirSync(docsDir)) candidates.push(['docs', join(sem, rel)]);
  }
  candidates.push(['licence', rel]);
  for (const [track, sub] of candidates) {
    const en = join(root, track, sub);
    if (!existsSync(en)) continue;
    if (locale === 'en') return en;
    const ur = join(root, UR_ROOTS[track], sub);
    if (!existsSync(ur)) throw new Error(`No Urdu mirror for ${rel} (expected ${ur})`);
    return ur;
  }
  throw new Error(`Topic not found: ${rel}`);
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : '';
}

/** Pure transform: MDX text -> { markdown, excludedAnswers }. Exported for tests. */
export function mdxToSourceMarkdown(mdx) {
  let text = mdx.replace(/\r\n/g, '\n');
  let title = '';
  let description = '';
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (fm) {
    title = (fm[1].match(/^title:\s*"?(.*?)"?\s*$/m) || [])[1] || '';
    description = (fm[1].match(/^description:\s*"?(.*?)"?\s*$/m) || [])[1] || '';
    text = text.slice(fm[0].length);
  }

  let excludedAnswers = false;
  const ans = text.search(ANSWERS_HEADING);
  if (ans !== -1) {
    text = text.slice(0, ans);
    excludedAnswers = true;
  }

  text = text
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')                       // MDX comments (incl. FIGURE markers)
    .replace(/^import\s.+$/gm, '')                              // imports
    .replace(/<Figure\b[\s\S]*?\/>/g, (t) => {
      const alt = attr(t, 'alt');
      return alt ? `> Figure: ${alt}` : '';
    })
    .replace(/<Glossary\b[^>]*?\/>/g, (t) => attr(t, 'display') || attr(t, 'term'))
    .replace(/<Glossary\b[^>]*>([\s\S]*?)<\/Glossary>/g, '$1')
    .replace(/<(TranslationStatusBadge|PrintHandout)\b[^>]*\/>/g, '')
    .replace(/<\/?[A-Z][A-Za-z]*\b[^>]*>/g, '')                 // any other component tag
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!text.startsWith('# ') && title) text = `# ${title}\n\n${text}`;
  if (description) text = text.replace(/^(# .*)\n/, `$1\n\n_${description}_\n`);
  return { markdown: `${text}\n`, excludedAnswers };
}

export function buildPack(course, unit, topic, locale = 'en', outDir = join(ROOT, '.studio')) {
  const file = findTopicFile(course, unit, topic, locale);
  if (REFUSED.test(file.split('/').pop())) throw new Error(`Refusing non-topic page: ${file}`);
  const { markdown, excludedAnswers } = mdxToSourceMarkdown(readFileSync(file, 'utf8'));
  const dir = join(outDir, course, `unit-${pad(unit)}`);
  mkdirSync(dir, { recursive: true });
  const out = join(dir, `topic-${pad(topic)}.${locale}.md`);
  writeFileSync(out, markdown);
  const sha256 = createHash('sha256').update(markdown).digest('hex');
  return { source: file.slice(ROOT.length + 1), out: out.slice(ROOT.length + 1), sha256, excludedAnswers, words: markdown.split(/\s+/).length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const oi = args.indexOf('--out');
  const outDir = oi !== -1 ? resolve(args.splice(oi, 2)[1]) : undefined;
  const [course, unit, topic, locale = 'en'] = args;
  if (!course || !unit || !topic || !['en', 'ur'].includes(locale)) {
    console.error('usage: build-source-pack.mjs <course> <unit> <topic> [en|ur] [--out DIR]');
    process.exit(2);
  }
  console.log(JSON.stringify(buildPack(course, Number(unit), Number(topic), locale, outDir)));
}
