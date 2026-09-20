import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * Pins the three-way agreement between the SQL CHECK, the shared predicate in
 * src/lib/assignments.ts, and every call site that builds a picker from the
 * content index. A consumer that offers an index record the database will not
 * accept produces a value that can only ever fail on save.
 *
 * These tests read the sources textually rather than importing them:
 * src/lib/assignments.ts imports through the `@site/` alias, which vitest is
 * deliberately not configured to resolve.
 *
 * THE INVERSION. This file previously asserted the opposite of what it asserts
 * now, including a case named "leaves a per-topic course with no loggable
 * record, so the filter is load-bearing". That was true, and it was the bug: as
 * each course migrated to the Spec 008 per-topic layout it silently lost every
 * loggable item, until EFMP-301 offered 0 of 5 and EFMP-302 0 of 31, and the
 * only loggable content left in the corpus was `coming_soon` scaffolds. Three
 * teacher features were dead for all real content. Migration 0045 widened the
 * CHECKs; the test now pins the property that would have caught it.
 */

/**
 * The EFFECTIVE allowed values for a table's source_kind, from the LAST
 * migration that sets them.
 *
 * The earlier version read `0028_teaching_log_entries.sql` by name, which was
 * correct until a later migration widened the constraint and then quietly
 * wrong - it would have compared the code against a CHECK the database no
 * longer had. Scanning in order is what makes this survive migration 0046.
 */
function checkedSourceKinds(table) {
  const dir = join(REPO, 'supabase', 'migrations');
  let latest = null;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()) {
    const sql = readFileSync(join(dir, file), 'utf8');
    // Statement-ish chunks, so a CHECK is attributed to the table it sits with.
    for (const statement of sql.split(';')) {
      if (!statement.includes(table)) continue;
      const match = statement.match(/check\s*\(\s*source_kind\s+in\s*\(([^)]*)\)/i);
      if (match) latest = match[1];
    }
  }
  if (latest === null) throw new Error(`no source_kind CHECK found for ${table}`);
  return latest.split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean).sort();
}

/** Pulls the members out of `LOGGABLE_CONTENT_KINDS = [...] as const`. */
function declaredLoggableKinds() {
  const ts = readFileSync(join(REPO, 'src', 'lib', 'assignments.ts'), 'utf8');
  const match = ts.match(/LOGGABLE_CONTENT_KINDS\s*=\s*\[([^\]]*)\]/);
  if (!match) throw new Error('LOGGABLE_CONTENT_KINDS not found in src/lib/assignments.ts');
  return match[1].split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean).sort();
}

function contentIndex() {
  const built = spawnSync('node', [join(REPO, 'scripts', 'build-content-index.mjs')], { cwd: REPO, encoding: 'utf8' });
  expect(built.status).toBe(0);
  return JSON.parse(readFileSync(join(REPO, 'static', 'content-index.json'), 'utf8'));
}

describe('loggable content kinds', () => {
  it('matches the teaching_log_entries CHECK exactly', () => {
    expect(declaredLoggableKinds()).toEqual(checkedSourceKinds('teaching_log_entries'));
  });

  it('matches the activity_feedback CHECK exactly', () => {
    expect(declaredLoggableKinds()).toEqual(checkedSourceKinds('activity_feedback'));
  });

  it('is a subset of the assignments CHECK, which also allows custom and quiz', () => {
    const assignments = checkedSourceKinds('assignments');
    for (const kind of declaredLoggableKinds()) expect(assignments).toContain(kind);
    expect(assignments).toEqual(expect.arrayContaining(['custom', 'quiz']));
  });

  it('includes the per-topic kinds the index actually emits', () => {
    const loggable = declaredLoggableKinds();
    expect(loggable).toContain('topic');
    expect(loggable).toContain('assessment');
  });

  it('still excludes course-review, which belongs to no unit', () => {
    // Not an oversight: both tables key on (course_code, unit_no) with unit_no
    // NOT NULL, and a course review is a whole-course page.
    expect(declaredLoggableKinds()).not.toContain('course-review');
  });

  // The regression that matters. This is the inverse of what this file used to
  // assert, and it is the check that would have caught the dead feature.
  it('leaves every authored course with at least one loggable item', () => {
    const index = contentIndex();
    const loggable = declaredLoggableKinds();
    const byCourse = new Map();
    for (const entry of index) {
      const seen = byCourse.get(entry.course_code) ?? { loggable: 0, total: 0 };
      seen.total++;
      if (loggable.includes(entry.kind)) seen.loggable++;
      byCourse.set(entry.course_code, seen);
    }
    expect(byCourse.size).toBeGreaterThan(0);
    const starved = [...byCourse.entries()].filter(([, v]) => v.loggable === 0);
    expect(starved.map(([course, v]) => `${course} (0 of ${v.total})`)).toEqual([]);
  });

  it('offers nothing the database would refuse', () => {
    const loggable = declaredLoggableKinds();
    const checked = checkedSourceKinds('teaching_log_entries');
    for (const record of contentIndex().filter((e) => loggable.includes(e.kind))) {
      expect(checked).toContain(record.kind);
    }
  });
});
