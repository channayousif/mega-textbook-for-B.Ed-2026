#!/usr/bin/env node
/**
 * Compare every authored Bloom tag against the band its unit spec declares.
 *
 * The gap this closes was found by the first intake evaluation (Art. VII.8) and by
 * the G3 reviews of EFMP-302 Units 5 and 6: `content-spec.md` states a per-unit
 * blueprint band ("RRQs (10): Understand to Analyze"), `unit-assessment.mdx` tags
 * each item `*(Remember)*`..`*(Create)*`, and nothing in this repository compared
 * the two. Three breaches reached G3 that way - Unit 5's RRQ 9 at (Remember), and
 * Unit 6's MCQ 6 above its ceiling plus three RRQs below its floor carrying 27 of
 * 66 marks - each costing a review cycle to find by reading.
 *
 * The check is deliberately literal: it reads the band the spec actually declares
 * rather than a house default, so a unit that sets a different band on purpose is
 * respected. Whether a band is the RIGHT one is a G1 judgement for the evaluator;
 * this only enforces that the authored items honour whatever was approved.
 *
 *   node scripts/check-bloom-bands.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { walkUnits } from './lib/content-roots.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');

const LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
const rank = (name) => LEVELS.indexOf(name);

/** `Remember to Apply`, `Remember → Apply`, `Analyze to Evaluate/Create`. */
function parseBand(text) {
  const cleaned = text.replace(/\*\*/g, '');
  const match = /\b(Remember|Understand|Apply|Analyze|Evaluate|Create)\s*(?:→|->|to)\s*(Remember|Understand|Apply|Analyze|Evaluate|Create)(?:\/(Remember|Understand|Apply|Analyze|Evaluate|Create))?/
    .exec(cleaned);
  if (!match) return null;
  const hi = match[3] || match[2];
  return { lo: rank(match[1]), hi: rank(hi), label: `${match[1]} to ${hi}` };
}

/** Per-unit blueprint bands from the course spec's `## Unit N` section. */
function specBands(specPath) {
  const text = readFileSync(specPath, 'utf8');
  const out = new Map();
  const sections = [...text.matchAll(/^##\s+Unit\s+(\d+)\b/gm)];
  for (const [i, section] of sections.entries()) {
    const unit = Number(section[1]);
    const body = text.slice(section.index, i + 1 < sections.length ? sections[i + 1].index : text.length);
    const bands = {};
    for (const [kind, re] of [['MCQ', /^\s*-\s*MCQs?\s*\(\d+\):([^\n]*)/m],
                              ['RRQ', /^\s*-\s*RRQs?\s*\(\d+\):([^\n]*)/m],
                              ['ERQ', /^\s*-\s*ERQs?\s*\(\d+\):([^\n]*)/m]]) {
      const line = re.exec(body);
      if (!line) continue;
      const band = parseBand(line[1]);
      if (band) bands[kind] = band;
    }
    if (Object.keys(bands).length) out.set(unit, bands);
  }
  return out;
}

/** Authored tags, per bank section, in document order. */
function authoredTags(assessmentPath) {
  const text = readFileSync(assessmentPath, 'utf8');
  // The three bank sections are `### ...`; the answer-key sections that follow them
  // repeat the item numbers, so the scan must stop at the first `##`-level heading too.
  const heads = [...text.matchAll(/^#{2,3}\s+(Multiple-choice|Restricted-response|Extended-response|Answers)[^\n]*/gm)];
  const out = {};
  for (const [i, head] of heads.entries()) {
    const kind = { 'Multiple-choice': 'MCQ', 'Restricted-response': 'RRQ', 'Extended-response': 'ERQ' }[head[1]];
    if (!kind) continue; // the `Answers ...` heading is a terminator, not a bank section
    const body = text.slice(head.index, i + 1 < heads.length ? heads[i + 1].index : text.length);
    // Slice between item starts rather than matching each item with a lookahead. The first
    // version terminated on `(?=^\d+\.|\Z)`, but JavaScript has no `\Z` anchor: it is an
    // Annex-B identity escape matching a literal capital Z, so the last item of every section
    // never satisfied the lookahead and was silently dropped. The gate reported a pass while
    // never checking MCQ 10, RRQ 10 or ERQ 5 in any unit.
    const starts = [...body.matchAll(/^(\d+)\./gm)];
    const items = starts.map((m, k) => ({
      n: Number(m[1]),
      text: body.slice(m.index, k + 1 < starts.length ? starts[k + 1].index : body.length),
    }));
    out[kind] = items.map((item) => {
      // A tag may name more than one level, e.g. `*(Analyze / Create)*` for an item that
      // genuinely spans two. Every level it names must sit inside the band.
      const tag = /\*\(([A-Za-z/ ]+)\)\*/.exec(item.text);
      const levels = tag ? tag[1].split('/').map((p) => p.trim()).filter((p) => LEVELS.includes(p)) : [];
      return { n: item.n, levels };
    });
  }
  return out;
}

const findings = [];
let checked = 0;

for (const unit of walkUnits(root)) {
  const spec = join(root, 'specs', 'content', unit.courseCode.toLowerCase(), 'content-spec.md');
  const assessment = join(unit.unitDir, 'unit-assessment.mdx');
  if (!existsSync(spec) || !existsSync(assessment)) continue;

  const bands = specBands(spec).get(unit.unitNo);
  if (!bands) continue;
  const tags = authoredTags(assessment);
  const where = relative(root, assessment);

  for (const [kind, band] of Object.entries(bands)) {
    for (const item of tags[kind] || []) {
      checked++;
      if (!item.levels.length) {
        findings.push(`${where}: ${kind} ${item.n} carries no Bloom tag (spec band: ${band.label})`);
        continue;
      }
      for (const level of item.levels) {
        const r = rank(level);
        if (r < band.lo) findings.push(`${where}: ${kind} ${item.n} is (${level}), below the spec's ${band.label} floor`);
        else if (r > band.hi) findings.push(`${where}: ${kind} ${item.n} is (${level}), above the spec's ${band.label} ceiling`);
      }
    }
  }
}

if (findings.length) {
  console.error(`✗ Bloom band gate failed with ${findings.length} finding(s):\n`);
  for (const f of findings) console.error(`  - ${f}`);
  console.error('\nEither the item is mis-tagged, or the unit spec declares a band the bank does not honour.');
  console.error('Changing the band is a G1 decision; changing the item is authoring.');
  process.exit(1);
}
console.log(`✓ Bloom tags honour their unit spec's blueprint bands (${checked} items checked).`);
