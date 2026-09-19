#!/usr/bin/env node
/**
 * T028 (FR-012, SC-010) + Spec 008 T022: guarantee no answer keys / private marking material
 * leak into public content. Scans content sources (docs/ + i18n/), specs/content/, and, when
 * present, the built output (build/) for forbidden front-matter keys and answer-key prose
 * markers. Exits non-zero on any hit. Complements the validator's schema-level rejection of
 * answer-key fields.
 *
 * Spec 008 bounded exception (contract: end-of-unit-assessment.md / end-of-course-review.md):
 * the three PROSE patterns are permitted inside ONE bounded `## Answers and marking guidance`
 * section — case-sensitive, exact, no trailing text — that is the FINAL `##` section of a file
 * named `unit-assessment.mdx` or `course-review.mdx`. Everywhere else, and for the four
 * FRONT-MATTER key patterns everywhere (including inside that section), the scan is unchanged.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CONTENT_ROOTS } from './lib/content-roots.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
// Track content roots come from content-roots.mjs so a new track is scanned
// automatically (Feature 015 FR-014). Without this a licence unit's answer keys
// would be caught only via `build/`, which does not exist before a build runs.
// `i18n`, `build` and `specs/content` are this gate's own non-track roots.
const TARGETS = [...CONTENT_ROOTS, 'i18n', 'build', 'specs/content']
  .map((d) => join(ROOT, d)).filter(existsSync);

// Forbidden front-matter keys — the schema also rejects these; never relaxed, not even inside
// the Spec 008 bounded section.
const FRONT_MATTER_PATTERNS = [
  /^\s*answer_key\s*:/im,
  /^\s*answers\s*:/im,
  /^\s*marking_scheme\s*:/im,
  /^\s*rubric_answers\s*:/im,
];
// Prose markers — permitted only inside the bounded `## Answers and marking guidance` section
// of unit-assessment.mdx / course-review.mdx.
const PROSE_PATTERNS = [
  /\banswer\s*key\b/i,
  /\bmarking\s*scheme\b/i,
  /\bcorrect\s*answer\b/i,
];
const ALL_PATTERNS = [...FRONT_MATTER_PATTERNS, ...PROSE_PATTERNS];

const CANONICAL_HEADING = '## Answers and marking guidance';
const BOUNDED_SRC_RE = /(?:^|\/)(unit-assessment|course-review)\.mdx$/;
// Built routes: .../unit-assessment/index.html  OR  .../unit-assessment.html  (+ /ur/ mirrors)
const BOUNDED_HTML_RE = /(?:^|\/)(unit-assessment|course-review)(?:\/index)?\.html$/;

const SCAN_EXT = new Set(['.md', '.mdx', '.html']);
// Spec 006: style-guide.md is the documented home for these exact marker phrases.
const EXCLUDE = new Set([join(ROOT, 'specs', 'content', 'style-guide.md')]);

/** Only `specs/content/<course>/reviews/` holds G3/G5 evidence. */
const REVIEW_EVIDENCE_DIR = /^specs[/\\]content[/\\][^/\\]+[/\\]reviews$/;
const hits = [];

const hit = (p, re, m) =>
  hits.push(`${p.replace(ROOT + '/', '')}: matched /${re.source}/ ("${m[0].trim().slice(0, 40)}")`);

function scan(p, text, patterns) {
  for (const re of patterns) {
    const m = re.exec(text);
    if (m) hit(p, re, m);
  }
}

/**
 * A bounded-exception source file: locate the canonical heading.
 *  >1  -> error (too many)
 *   0  -> whole-file scan with ALL_PATTERNS
 *   1 at line k -> error if any `^## ` heading follows it; else scan [0,k) with ALL_PATTERNS
 *                  and [k,EOF) with FRONT_MATTER_PATTERNS only.
 */
function scanBoundedSource(p, text) {
  const lines = text.split(/\r?\n/);
  const idx = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimEnd() === CANONICAL_HEADING) idx.push(i);
  }
  if (idx.length > 1) {
    hits.push(`${p.replace(ROOT + '/', '')}: has ${idx.length} "${CANONICAL_HEADING}" headings — at most one is allowed`);
    return;
  }
  if (idx.length === 0) {
    scan(p, text, ALL_PATTERNS);
    return;
  }
  const k = idx[0];
  for (let i = k + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      hits.push(`${p.replace(ROOT + '/', '')}: a "## " section follows "${CANONICAL_HEADING}" — it must be the file's final section`);
      return;
    }
  }
  scan(p, lines.slice(0, k).join('\n'), ALL_PATTERNS);
  scan(p, lines.slice(k).join('\n'), FRONT_MATTER_PATTERNS);
}

function scanFile(p) {
  const text = readFileSync(p, 'utf8');
  const ext = extname(p);

  if (ext === '.html') {
    // In built output, suppress only the prose patterns for the two bounded route names.
    if (BOUNDED_HTML_RE.test(p)) scan(p, text, FRONT_MATTER_PATTERNS);
    else scan(p, text, ALL_PATTERNS);
    return;
  }

  if (BOUNDED_SRC_RE.test(p)) {
    scanBoundedSource(p, text);
    return;
  }

  scan(p, text, ALL_PATTERNS);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (EXCLUDE.has(p)) continue;
    const st = statSync(p);
    // `specs/content/<course>/reviews/` holds G3/G5 evidence: reports, gate logs and
    // readable summaries. None of it is published - `find build -path '*reviews*'`
    // returns nothing - and a review that discusses an answer key has to use the
    // words. Scanning it made the gate read governance artefacts as learner-facing
    // content, and a passing Unit 3 review broke the Unit 4 review by landing a
    // summary containing the phrase.
    //
    // `bound()` in scripts/lib/review-evidence.mjs already excludes `/reviews/` from
    // the input manifest for the same reason. This applies the same rule here.
    //
    // Scoped to exactly that location: a `reviews/` directory appearing anywhere under
    // a published content root is learner-facing and must still be scanned.
    if (st.isDirectory()) {
      if (name === 'reviews' && REVIEW_EVIDENCE_DIR.test(relative(ROOT, p))) continue;
      walk(p);
    } else if (SCAN_EXT.has(extname(p))) scanFile(p);
  }
}

for (const t of TARGETS) walk(t);

if (hits.length) {
  console.error(`\n✗ Answer-key / private material found in public content (${hits.length}):\n`);
  for (const h of hits) console.error(`  - ${h}`);
  process.exit(1);
} else {
  console.log(`✓ No answer keys / private marking material found (scanned: ${TARGETS.map((t) => t.replace(ROOT + '/', '')).join(', ')}).`);
}
