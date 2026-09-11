#!/usr/bin/env node
/**
 * Keeps prose in step with code (Spec 013, D6 / FR-012).
 *
 * WHY. The authoring standard had no machine-readable form, so every
 * restatement was a hand-copy and drift was the default. At the time this gate
 * was written the six-value figure `Kind` enum existed in SEVEN prose files
 * plus one code constant; "run the gates" existed in FOUR mutually
 * inconsistent variants; and style-guide.md declared version 3.3 above a
 * changelog that stopped at 3.2. Two of those prose copies were still
 * describing the pre-Spec-012 two-value enum.
 *
 * TWO CHECKS, deliberately different in strictness:
 *
 *   (A) GENERATED BLOCKS - an exact string compare between a marked region and
 *       its canonical rendering. Cannot false-positive. `--fix` repairs them.
 *
 *   (B) STALE LITERALS - a small regex scan for vocabulary that is now wrong
 *       wherever it appears unmarked. Scoped HARD to the living standard
 *       (.claude/skills, style-guide.md, CLAUDE.md, the constitution) and
 *       explicitly NOT history/ or specs/0NN-*, which are frozen records that
 *       legitimately document superseded vocabulary. A gate that fires on
 *       immutable history gets disabled within a week, and then the drift
 *       comes straight back.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { KIND_ENUM } from './lib/figure-manifest.mjs';
import { CONTENT_GATES, FULL_GATES } from './lib/gates.mjs';
import { LIGHT_TOKENS, DARK_TOKENS, rootBlock } from './lib/figure-palette.mjs';

const FIX = process.argv.includes('--fix');
const errors = [];
const fixed = [];

/** The canonical rendering of each shared constant. */
const BLOCKS = {
  'figure-kinds': () => [...KIND_ENUM].map((k) => `\`${k}\``).join(', '),
  'gate-commands': () => [
    '```bash',
    '# after every edit (fast)',
    'npm run check:content',
    '',
    '# before opening a PR (adds check:add-course, tests and a full build)',
    'npm run check:all',
    '```',
    '',
    `\`check:content\` runs, in order: ${CONTENT_GATES.map((g) => `\`${g}\``).join(' -> ')}.`,
  ].join('\n'),
  'figure-palette-light': () => ['```css', rootBlock(LIGHT_TOKENS), '```'].join('\n'),
  'figure-palette-dark': () => ['```css', rootBlock(DARK_TOKENS), '```'].join('\n'),
};

/** Files that MUST carry a given block, so the markers cannot just be deleted. */
const REQUIRED = {
  'figure-kinds': [
    '.claude/skills/generate-figures/SKILL.md',
    '.claude/skills/generate-figures/references/svg-authoring.md',
    '.claude/skills/generate-figures/references/placement.md',
    '.claude/skills/generate-figures/references/bilingual-figures.md',
    '.claude/skills/author-unit/references/figure-prompts.md',
    'specs/content/style-guide.md',
  ],
  'gate-commands': [
    '.claude/skills/author-unit/SKILL.md',
    '.claude/skills/generate-figures/SKILL.md',
  ],
  'figure-palette-light': ['.claude/skills/generate-figures/references/svg-authoring.md'],
  'figure-palette-dark': ['.claude/skills/generate-figures/references/svg-authoring.md'],
};

const marker = (id) => ({
  begin: `<!-- BEGIN GENERATED ${id} -->`,
  end: `<!-- END GENERATED ${id} -->`,
});

function checkBlocks() {
  for (const [id, render] of Object.entries(BLOCKS)) {
    const { begin, end } = marker(id);
    const want = render();
    for (const file of REQUIRED[id] ?? []) {
      if (!existsSync(file)) { errors.push(`${file}: missing (must carry the "${id}" block)`); continue; }
      let text = readFileSync(file, 'utf8');
      const b = text.indexOf(begin);
      const e = text.indexOf(end);
      if (b === -1 || e === -1 || e < b) {
        errors.push(`${file}: missing the "${id}" generated block (${begin} ... ${end})`);
        continue;
      }
      const got = text.slice(b + begin.length, e).trim();
      if (got === want.trim()) continue;
      if (FIX) {
        text = `${text.slice(0, b + begin.length)}\n${want}\n${text.slice(e)}`;
        writeFileSync(file, text);
        fixed.push(`${file} (${id})`);
      } else {
        errors.push(`${file}: the "${id}" block is out of date - run: npm run check:docs-sync -- --fix`);
      }
    }
  }
}

/** (B) vocabulary that is simply wrong now, wherever it appears unmarked. */
const STALE = [
  {
    re: /\{\s*diagram,\s*illustration\s*\}/,
    why: 'the pre-Spec-012 two-value Kind enum',
    files: [
      '.claude/skills/generate-figures/references/placement.md',
      '.claude/skills/generate-figures/references/bilingual-figures.md',
      '.claude/skills/generate-figures/SKILL.md',
      'specs/content/style-guide.md',
    ],
  },
  {
    // Matches the CSS CONSTRUCT, not the words. The docs now discuss this
    // mechanism in order to forbid it, and a rule that flagged its own
    // prohibition would be unusable.
    re: /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{/,
    why: 'an authored prefers-color-scheme block - figures theme from the site\'s [data-theme], and the dark twin is derived (Spec 013 D1)',
    files: [
      '.claude/skills/generate-figures/SKILL.md',
      '.claude/skills/generate-figures/references/svg-authoring.md',
      '.claude/skills/generate-figures/references/bilingual-figures.md',
      '.claude/skills/generate-figures/references/placement.md',
    ],
  },
];

/**
 * A changelog is a historical record: style-guide.md's version entries
 * legitimately quote vocabulary that is now superseded ("widened from
 * {diagram, illustration} to the six archetypes"). Scanning it would make the
 * gate fire on an accurate account of its own history - the same reason
 * history/ and frozen specs/0NN-* are out of scope entirely. So for that file
 * the scan starts at the first body section.
 */
const SCAN_FROM_FIRST_SECTION = new Set(['specs/content/style-guide.md']);

function bodyOf(file) {
  const text = readFileSync(file, 'utf8');
  if (!SCAN_FROM_FIRST_SECTION.has(file)) return text;
  const i = text.indexOf('\n## ');
  return i === -1 ? text : text.slice(i);
}

function checkStale() {
  for (const rule of STALE) {
    for (const file of rule.files) {
      if (!existsSync(file)) continue;
      if (rule.re.test(bodyOf(file))) {
        errors.push(`${file}: contains ${rule.why}`);
      }
    }
  }
}

/** The style guide's own freeze marker must have a changelog entry. */
function checkStyleGuideChangelog() {
  const file = 'specs/content/style-guide.md';
  if (!existsSync(file)) return;
  const text = readFileSync(file, 'utf8');
  const v = /^version:\s*"([^"]+)"/m.exec(text);
  if (!v) { errors.push(`${file}: no version field`); return; }
  const version = v[1];
  const mentioned = new RegExp(`\\bv${version.replace(/\./g, '\\.')}\\b`).test(text.slice(v.index + v[0].length));
  if (!mentioned) {
    errors.push(`${file}: version "${version}" has no matching **v${version}** changelog entry (the freeze marker and the record must agree)`);
  }
}

/** A gate added to gates.mjs but forgotten in CI would silently never run. */
function checkCiCoverage() {
  const file = '.github/workflows/ci.yml';
  if (!existsSync(file)) return;
  const text = readFileSync(file, 'utf8');
  for (const gate of FULL_GATES) {
    if (gate === 'build' || gate === 'test') continue;
    if (!text.includes(`npm run ${gate}`) && !text.includes(`run: npm run -s ${gate}`)) {
      errors.push(`${file}: FULL_GATES lists "${gate}" but CI never runs it`);
    }
  }
}

checkBlocks();
checkStale();
checkStyleGuideChangelog();
checkCiCoverage();

if (fixed.length) console.log(`Regenerated:\n  ${fixed.join('\n  ')}`);
if (errors.length) {
  console.error('✗ docs-sync failed:\n');
  for (const e of errors) console.error(`  - ${e}`);
  console.error('\nShared constants live in scripts/lib/*.mjs; prose is generated from them.');
  process.exit(1);
}
console.log('✓ docs are in sync with the code constants');
