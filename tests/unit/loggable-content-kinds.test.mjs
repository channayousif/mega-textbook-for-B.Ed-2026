import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * Regression guard for the Spec 008 per-topic migration's blast radius.
 *
 * scripts/build-content-index.mjs emits six `kind` values, but only three of
 * them are activity kinds the database will accept as a `source_kind`. A
 * consumer that turns index records into a pickable activity without
 * filtering offers the user a value that can only ever fail on save - which
 * is exactly what happened to the teaching log once EFMP-302 Unit 1 moved to
 * the per-topic layout (the select auto-picked `kind: 'topic'`, the 0028
 * CHECK refused it, and the teacher saw only the generic save error).
 *
 * These tests pin the three-way agreement between the SQL CHECK, the shared
 * predicate in src/lib/assignments.ts, and every call site that builds a
 * picker from the index. They read the sources textually rather than
 * importing them: src/lib/assignments.ts imports through the `@site/` alias,
 * which vitest is deliberately not configured to resolve (vitest.config.ts
 * collects only these fixture tests).
 */

/** Pulls the allowed values out of `check (source_kind in ('a', 'b'))`. */
function checkedSourceKinds(migrationFile) {
  const sql = readFileSync(join(REPO, 'supabase', 'migrations', migrationFile), 'utf8');
  const match = sql.match(/check\s*\(\s*source_kind\s+in\s*\(([^)]*)\)/i);
  if (!match) throw new Error(`no source_kind CHECK found in ${migrationFile}`);
  return match[1]
    .split(',')
    .map((s) => s.trim().replace(/^'|'$/g, ''))
    .filter(Boolean)
    .sort();
}

/** Pulls the members out of `LOGGABLE_CONTENT_KINDS = [...] as const`. */
function declaredLoggableKinds() {
  const ts = readFileSync(join(REPO, 'src', 'lib', 'assignments.ts'), 'utf8');
  const match = ts.match(/LOGGABLE_CONTENT_KINDS\s*=\s*\[([^\]]*)\]/);
  if (!match) throw new Error('LOGGABLE_CONTENT_KINDS not found in src/lib/assignments.ts');
  return match[1]
    .split(',')
    .map((s) => s.trim().replace(/^'|'$/g, ''))
    .filter(Boolean)
    .sort();
}

describe('loggable content kinds', () => {
  it('matches the teaching_log_entries CHECK exactly', () => {
    expect(declaredLoggableKinds()).toEqual(checkedSourceKinds('0028_teaching_log_entries.sql'));
  });

  it('matches the activity_feedback CHECK exactly', () => {
    expect(declaredLoggableKinds()).toEqual(checkedSourceKinds('0029_activity_feedback.sql'));
  });

  it('excludes every per-topic kind the index also emits', () => {
    const loggable = declaredLoggableKinds();
    for (const perTopicKind of ['topic', 'assessment', 'course-review']) {
      expect(loggable).not.toContain(perTopicKind);
    }
  });

  it('leaves a per-topic course with no loggable record, so the filter is load-bearing', () => {
    // Rebuild the real index, then confirm the situation the bug needs in
    // order to reappear is genuinely present in committed content: at least
    // one unit contributes a non-loggable kind.
    const built = spawnSync('node', [join(REPO, 'scripts', 'build-content-index.mjs')], {
      cwd: REPO,
      encoding: 'utf8',
    });
    expect(built.status).toBe(0);

    const index = JSON.parse(
      readFileSync(join(REPO, 'static', 'content-index.json'), 'utf8'),
    );
    const loggable = declaredLoggableKinds();
    const nonLoggable = index.filter((e) => !loggable.includes(e.kind));
    expect(nonLoggable.length).toBeGreaterThan(0);

    // And every record that DOES survive the filter is a value the DB accepts.
    const survivors = index.filter((e) => loggable.includes(e.kind));
    const checked = checkedSourceKinds('0028_teaching_log_entries.sql');
    for (const record of survivors) {
      expect(checked).toContain(record.kind);
    }
  });
});
