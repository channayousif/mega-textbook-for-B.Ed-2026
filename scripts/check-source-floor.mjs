#!/usr/bin/env node
/**
 * Enforce a course's declared open-access source floor.
 *
 * WHY THIS EXISTS. `D-2026-0013` made EFMP-304's floor binding: at least two
 * verifiable open-access sources per unit for Units 1 to 3, at least one for
 * Units 4 to 6, resolved through a named registry and recorded with the date of
 * verification. The owner accepted a real risk on the strength of that control -
 * all seven of that course's guide readings are print-only monographs, and Units
 * 1 to 3 need a named list of critical-thinking standards and a formal definition
 * of validity, which title-level support cannot carry.
 *
 * The EFMP-304 intake evaluation then found (G-2026-17) that the control did not
 * exist: nothing in `scripts/` read the floor, the sources contract had no place
 * to record a registry or a date, and Art. VII.7(a) had just removed the human
 * Content gate that was the only thing that could have judged it. A unit could
 * bind zero open-access sources, pass every gate, and publish.
 *
 * This is that control. It is opt-in per course: a course whose content-spec
 * declares no `open_access_floor` is not checked, so courses whose guide reading
 * lists are adequate are unaffected.
 *
 *   node scripts/check-source-floor.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import matter from 'gray-matter';
import { walkUnits } from './lib/content-roots.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');

/**
 * A row counts when it is an external source AND carries evidence that a named
 * registry was consulted on a date. Both halves matter: the registry name without
 * a date is unfalsifiable, and a date without a registry says nothing about what
 * was checked. This is deliberately a low bar - it proves the author looked
 * something up, not that the source supports the sentence citing it. Only a
 * reviewer can establish that, which is why the floor is a floor.
 */
const REGISTRIES = /\b(Crossref|OpenAlex|ERIC|DOAJ|PubMed|Semantic Scholar|unpaywall)\b/i;
const ISO_DATE = /\b\d{4}-\d{2}-\d{2}\b/;

/** `{ "1": 2, "default": 1 }` from the course spec's front matter, or null. */
function floorFor(specPath) {
  if (!existsSync(specPath)) return null;
  const fm = matter(readFileSync(specPath, 'utf8')).data;
  const floor = fm?.open_access_floor;
  if (!floor || typeof floor !== 'object') return null;
  return floor;
}

const findings = [];
let checkedCourses = 0;
let checkedUnits = 0;
const seenCourses = new Set();

for (const unit of walkUnits(root)) {
  const code = unit.courseCode.toLowerCase();
  const floor = floorFor(join(root, 'specs', 'content', code, 'content-spec.md'));
  if (!floor) continue;
  if (!seenCourses.has(code)) { seenCourses.add(code); checkedCourses++; }

  const required = Number(floor[String(unit.unitNo)] ?? floor.default ?? 0);
  if (!required) continue;

  const sources = join(root, 'specs', 'content', code, 'sources', `unit-${String(unit.unitNo).padStart(2, '0')}.md`);
  if (!existsSync(sources)) {
    findings.push(`${unit.courseCode} Unit ${unit.unitNo}: declares a floor of ${required} but has no sources/unit-${String(unit.unitNo).padStart(2, '0')}.md`);
    continue;
  }

  checkedUnits++;
  const rows = readFileSync(sources, 'utf8').split(/\r?\n/)
    .filter((l) => l.startsWith('|') && !/^\|\s*-+/.test(l) && !/^\|\s*Key\s*\|/.test(l));
  const verified = rows.filter((r) => !/\|\s*no-external-source\s*\|/.test(r)
    && REGISTRIES.test(r) && ISO_DATE.test(r));

  if (verified.length < required) {
    findings.push(
      `${unit.courseCode} Unit ${unit.unitNo}: ${verified.length} registry-verified source(s), floor is ${required} `
      + `(${relative(root, sources)})`,
    );
  }
}

if (findings.length) {
  console.error(`✗ Open-access source floor failed with ${findings.length} finding(s):\n`);
  for (const f of findings) console.error(`  - ${f}`);
  console.error('\nA row counts when it names a registry (Crossref, OpenAlex, ERIC, DOAJ, ...) AND');
  console.error('carries an ISO date, in the same row. The floor is declared per course as');
  console.error('`open_access_floor` in its content-spec front matter.');
  process.exit(1);
}
console.log(checkedCourses
  ? `✓ Open-access source floor met (${checkedUnits} unit(s) across ${checkedCourses} course(s) declaring a floor).`
  : '✓ Open-access source floor: no course declares one.');
