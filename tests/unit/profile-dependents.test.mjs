/**
 * The list that would otherwise rot.
 *
 * `tests/profile-dependents.mjs` names every table a fixture teardown must
 * clear before it can delete a `profiles` row. Such a list is only correct
 * until someone adds a table, and the failure mode is invisible: the delete
 * silently does nothing and the orphan count climbs. That is exactly what
 * happened - 29,381 stranded rows against 227 real ones, found only because an
 * admin count looked implausible.
 *
 * So the list is derived-checkable rather than trusted. This test reads the
 * migrations, extracts every foreign key to `profiles(id)` with its delete
 * rule, and fails if a NO ACTION one is missing from the list. It is a unit
 * test, not an RLS test, deliberately: it needs no database, so it runs in
 * `npm test` on every push and in `check:all`, not only where credentials exist.
 *
 * It also fails on a *stale* entry, so a table that is dropped or renamed
 * cannot leave a ghost behind.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROFILE_DEPENDENTS } from '../profile-dependents.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MIGRATIONS = join(REPO, 'supabase', 'migrations');

/**
 * Every foreign key to public.profiles(id), as `{table, column, onDelete}`.
 *
 * All of them are declared inline on the column, inside `create table
 * public.<name> (`. The `alter table ... add constraint` form is asserted
 * absent below rather than parsed, so this parser cannot quietly miss one.
 */
function foreignKeysToProfiles() {
  const found = [];
  for (const file of readdirSync(MIGRATIONS).filter((f) => f.endsWith('.sql')).sort()) {
    const sql = readFileSync(join(MIGRATIONS, file), 'utf8');
    // Strip line comments so a commented-out example cannot register as a key.
    const code = sql.replace(/--[^\n]*/g, '');

    for (const block of code.matchAll(/create\s+table\s+(?:if\s+not\s+exists\s+)?public\.(\w+)\s*\(([\s\S]*?)\n\s*\);/gi)) {
      const [, table, body] = block;
      for (const col of body.matchAll(
        /^\s*(\w+)\s+uuid[^,\n]*?references\s+public\.profiles\s*\(\s*id\s*\)([^,\n]*)/gim,
      )) {
        const [, column, tail] = col;
        const rule = /on\s+delete\s+cascade/i.test(tail) ? 'cascade'
          : /on\s+delete\s+set\s+null/i.test(tail) ? 'set null'
            : 'no action';
        found.push({ table, column, onDelete: rule, file });
      }
    }
  }
  return found;
}

const keys = foreignKeysToProfiles();
const listed = new Set(PROFILE_DEPENDENTS.map(([t, c]) => `${t}.${c}`));

describe('PROFILE_DEPENDENTS covers every foreign key to profiles(id)', () => {
  it('finds the foreign keys at all (guards against a parser that silently matches nothing)', () => {
    expect(keys.length).toBeGreaterThanOrEqual(18);
    expect(keys.some((k) => k.table === 'unit_progress' && k.column === 'student_id')).toBe(true);
  });

  it('has no alter-table foreign key this parser would miss', () => {
    for (const file of readdirSync(MIGRATIONS).filter((f) => f.endsWith('.sql'))) {
      const code = readFileSync(join(MIGRATIONS, file), 'utf8').replace(/--[^\n]*/g, '');
      const altered = /alter\s+table[\s\S]{0,400}?references\s+public\.profiles/i.test(code);
      expect(altered, `${file} declares a profiles FK via ALTER TABLE; teach the parser about it`).toBe(false);
    }
  });

  it('lists every NO ACTION foreign key, because those are the ones that block a delete', () => {
    const blocking = keys.filter((k) => k.onDelete === 'no action');
    const missing = blocking
      .filter((k) => !listed.has(`${k.table}.${k.column}`))
      .map((k) => `${k.table}.${k.column} (${k.file})`);

    expect(
      missing,
      `Add these to tests/profile-dependents.mjs, or a fixture teardown will silently strand profiles:\n  ${missing.join('\n  ')}`,
    ).toEqual([]);
  });

  it('lists nothing stale: every entry corresponds to a real foreign key', () => {
    const real = new Set(keys.map((k) => `${k.table}.${k.column}`));
    const ghosts = [...listed].filter((entry) => !real.has(entry));
    expect(ghosts, `Not a foreign key to profiles(id) any more:\n  ${ghosts.join('\n  ')}`).toEqual([]);
  });

  it('does not require the cascading keys, and tolerates them being listed anyway', () => {
    // privilege_audit.subject_id is ON DELETE CASCADE and deliberately absent:
    // FR-021 keeps the audit trail tied to the profile's lifetime, not longer.
    expect(listed.has('privilege_audit.subject_id')).toBe(false);
    expect(keys.find((k) => k.table === 'privilege_audit' && k.column === 'subject_id')?.onDelete)
      .toBe('cascade');
  });
});
