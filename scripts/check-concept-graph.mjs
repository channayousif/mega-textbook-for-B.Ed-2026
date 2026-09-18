#!/usr/bin/env node
/**
 * Concept-graph gate (Feature 016, style guide v4.0).
 *
 * WHY. The corpus records what a unit covers (coverage/), what it is grounded in
 * (sources/) and what it shows (figures/). None of those record what a learner
 * must understand and in what order, so nothing downstream can sequence, diagnose
 * or explain a recommendation. `concepts/unit-NN.md` is that fourth table and
 * this gate is what keeps it honest.
 *
 * OPT-IN PER UNIT, deliberately. A unit with no concepts file is skipped rather
 * than failed, exactly as the Spec 008 per-topic layout was opt-in. That is what
 * lets v4.0 land before the corpus is retrofitted, instead of turning every
 * existing unit red on the day the standard changes.
 *
 * See specs/016-concept-graph-v4/contracts/concept-graph.md.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { walkUnits } from './lib/content-roots.mjs';
import { unitSectionLines } from './lib/unit-depth.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const errors = [];
const err = (label, msg) => errors.push(`${label}: ${msg}`);

/** Item counts fixed by the Spec 008 blueprint; they keep the derived IDs stable. */
const BANKS = [
  { heading: 'Multiple-choice questions (MCQs)', prefix: 'MCQ', count: 10 },
  { heading: 'Restricted-response questions (RRQs)', prefix: 'RRQ', count: 10 },
  { heading: 'Extended-response questions (ERQs)', prefix: 'ERQ', count: 5 },
];

/** Rows of the first markdown table in `text`, as arrays of trimmed cells. */
function tableRows(text) {
  const rows = [];
  let seenHeader = false;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) { if (seenHeader && rows.length) break; continue; }
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^-{2,}$/.test(c.replace(/:/g, '')))) { seenHeader = true; continue; }
    if (!seenHeader) continue;
    rows.push(cells);
  }
  return rows;
}

/** Derived item IDs, read from what unit-assessment.mdx already puts on the page. */
function assessmentIds(unitDir, label) {
  const file = join(unitDir, 'unit-assessment.mdx');
  if (!existsSync(file)) return null;
  const text = readFileSync(file, 'utf8');
  const ids = new Set();
  for (const bank of BANKS) {
    const start = text.indexOf(`### ${bank.heading}`);
    if (start === -1) { err(label, `unit-assessment.mdx has no "### ${bank.heading}" heading`); continue; }
    const rest = text.slice(start + bank.heading.length);
    const nextHeading = rest.search(/\n#{2,3} /);
    const body = nextHeading === -1 ? rest : rest.slice(0, nextHeading);
    const n = new Set([...body.matchAll(/^(\d+)\.\s/gm)].map((m) => Number(m[1]))).size;
    if (n !== bank.count) {
      err(label, `${bank.prefix} bank has ${n} item(s), the 10/10/5 blueprint requires ${bank.count} - derived item IDs are not stable`);
    }
    for (let i = 1; i <= n; i += 1) ids.add(`${bank.prefix}-${String(i).padStart(2, '0')}`);
  }
  return ids;
}

/** The unit's declared sub-topic -> topic map and topic set, from content-spec.md. */
function specTopics(courseFolder, unitNo, label) {
  const file = join(ROOT, 'specs', 'content', courseFolder, 'content-spec.md');
  if (!existsSync(file)) return null;
  const text = readFileSync(file, 'utf8');
  // Two content-spec shapes exist in the corpus. A multi-unit spec (EFMP-302)
  // carries a `## Unit N` subsection per unit; a single-unit spec (EFMP-301)
  // puts its tables at document level with no such heading. Reuse the depth
  // gate's own extractor so both gates agree on where a unit's tables live, and
  // fall back to the whole document rather than failing on the second shape.
  const section = unitSectionLines(text, unitNo);
  const block = section ? section.join('\n') : text;
  const subTopics = new Map();
  for (const row of tableRows(block.slice(block.indexOf('### Sub-topic checklist')))) {
    if (row.length >= 4 && /^U\d+-\d+$/.test(row[0])) subTopics.set(row[0], row[2]);
  }
  const topics = new Set();
  const tl = block.indexOf('### Topic list');
  if (tl !== -1) for (const row of tableRows(block.slice(tl))) if (/^\d+\.\d+$/.test(row[0])) topics.add(row[0]);
  return { subTopics, topics };
}

/** Depth-first cycle detection, reporting the cycle path rather than just its existence. */
function findCycle(edges) {
  const state = new Map();
  const stack = [];
  const visit = (id) => {
    if (state.get(id) === 'done') return null;
    if (state.get(id) === 'open') return [...stack.slice(stack.indexOf(id)), id];
    state.set(id, 'open'); stack.push(id);
    for (const next of edges.get(id) ?? []) {
      const cycle = visit(next);
      if (cycle) return cycle;
    }
    stack.pop(); state.set(id, 'done');
    return null;
  };
  for (const id of edges.keys()) {
    const cycle = visit(id);
    if (cycle) return cycle;
  }
  return null;
}

function checkUnit({ unitDir, courseFolder, courseCode, unitNo }) {
  const pad = String(unitNo).padStart(2, '0');
  const conceptsFile = join(ROOT, 'specs', 'content', courseFolder, 'concepts', `unit-${pad}.md`);
  if (!existsSync(conceptsFile)) return; // opt-in per unit
  const label = `${courseCode} Unit ${unitNo}`;

  const rows = tableRows(readFileSync(conceptsFile, 'utf8'))
    .filter((r) => r.length >= 7 && r[0].startsWith('CON:'));
  if (rows.length === 0) { err(label, 'concepts file has no CON: rows'); return; }

  const spec = specTopics(courseFolder, unitNo, label);
  const items = assessmentIds(unitDir, label);
  const ids = new Set();
  const edges = new Map();
  const topicsSeen = new Set();

  // item ID -> the set of topics whose concepts claim it. See the restricted-item
  // check below the loop.
  const topicsByItem = new Map();

  for (const [id, , , prereqs, topic, , itemRefs] of rows) {
    if (!/^CON:[A-Z]{2,4}-\d{3}(--)?-\d+-\d+$/.test(id)) err(label, `malformed concept ID "${id}"`);
    if (ids.has(id)) err(label, `duplicate concept ID "${id}"`);
    ids.add(id);
    topicsSeen.add(topic);
    edges.set(id, prereqs === '-' ? [] : prereqs.split(',').map((p) => p.trim()).filter(Boolean));

    // 2. no orphan concept
    if (spec && spec.topics.size && !spec.topics.has(topic)) {
      err(label, `concept ${id} names topic "${topic}", which is not in the unit's ### Topic list`);
    }
    // 5. assessment linkage
    if (items && itemRefs !== '-') {
      for (const ref of itemRefs.split(',').map((x) => x.trim()).filter(Boolean)) {
        if (!items.has(ref)) err(label, `concept ${id} cites assessment item "${ref}", which the unit does not contain`);
        if (!topicsByItem.has(ref)) topicsByItem.set(ref, new Set());
        topicsByItem.get(ref).add(topic);
      }
    }
  }

  // 6. a RESTRICTED item cannot be the assessment evidence for two different topics.
  //
  // This gate can never verify that an item actually assesses the concept citing it -
  // that is a semantic judgement and belongs to G3. What it CAN catch is a claim that
  // is structurally impossible: an MCQ or RRQ is scoped to one thing by definition, so
  // a single one standing as evidence for concepts in two different topics means at
  // least one of those mappings is wrong, and a wrong mapping MASKS a sub-topic that
  // nothing actually assesses.
  //
  // ERQs are exempt on purpose: they are integrative by design and legitimately span
  // topics. EFMP-302 Unit 1, human-certified, has ERQ-05 spanning 1.1/1.3/1.4, and a
  // rule that flagged that would be wrong. The 2026-09-18 G3 review of Unit 4 found the
  // real case this catches: RRQ-04 claimed by both a 4.1 and a 4.4 concept, next to a
  // taught sub-topic (U4-02) that no item assesses.
  for (const [ref, topics] of topicsByItem) {
    if (ref.startsWith('ERQ') || topics.size < 2) continue;
    err(label, `restricted item "${ref}" is cited as assessment evidence by concepts in ${topics.size} different topics (${[...topics].sort().join(', ')}) - an MCQ or RRQ assesses one topic, so at least one of these mappings is wrong`);
  }

  // 4. resolvable prerequisites
  for (const [id, prereqs] of edges) {
    for (const p of prereqs) if (!ids.has(p)) err(label, `concept ${id} lists prerequisite "${p}", which is not a concept in this unit`);
  }
  // 3. acyclic
  const cycle = findCycle(new Map([...edges].map(([k, v]) => [k, v.filter((p) => ids.has(p))])));
  if (cycle) err(label, `prerequisite cycle: ${cycle.join(' -> ')}`);

  // 1. coverage - every sub-topic's topic is reached by at least one concept
  if (spec) {
    for (const [subId, topic] of spec.subTopics) {
      if (!topicsSeen.has(topic)) err(label, `sub-topic ${subId} (topic ${topic}) is reached by no concept`);
    }
  }
}

for (const record of walkUnits(ROOT)) checkUnit(record);

if (errors.length) {
  console.error(`\n✗ Concept-graph gate failed with ${errors.length} finding(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}
console.log('✓ Concept graph is consistent (coverage, no orphans, acyclic, resolvable prerequisites, assessment linkage).');
