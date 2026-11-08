/**
 * The selection rules of scripts/ops/purge-test-accounts.mjs, which deletes
 * accounts on the live project. A wrong predicate here deletes a real person,
 * so each rule is pinned, including the cases that must never match.
 */
import { describe, it, expect } from 'vitest';
import {
  isTestEmail, selectTestAuthUsers, selectStrandedProfiles, selectUnreferencedTombstones, parseArgs,
} from '../../scripts/ops/purge-test-accounts.mjs';

const NOW = Date.parse('2026-11-09T00:00:00Z');
const cutoff = NOW - 60 * 60_000;
const old = '2026-11-08T00:00:00Z';
const fresh = '2026-11-08T23:30:00Z';

describe('isTestEmail', () => {
  it('matches only the reserved fixture domain', () => {
    expect(isTestEmail('rls-student-1@example.test')).toBe(true);
    expect(isTestEmail('E2E-X@EXAMPLE.TEST')).toBe(true);
    for (const real of ['someone@gmail.com', 'qa-admin@textbook.com.pk', 'x@example.test.pk', 'x@notexample.testing', null, undefined, '']) {
      expect(isTestEmail(real), String(real)).toBe(false);
    }
  });
});

describe('selectTestAuthUsers', () => {
  it('takes old fixture logins and leaves real or still-running ones', () => {
    const users = [
      { id: 'a', email: 'e2e-a@example.test', created_at: old },
      { id: 'b', email: 'e2e-b@example.test', created_at: fresh },
      { id: 'c', email: 'person@gmail.com', created_at: old },
      { id: 'd', email: null, created_at: old },
    ];
    expect(selectTestAuthUsers(users, cutoff).map((u) => u.id)).toEqual(['a']);
  });
});

describe('selectStrandedProfiles', () => {
  it('takes unlinked, non-deleted, old profiles only', () => {
    const profiles = [
      { id: 's', auth_user_id: null, deleted_at: null, created_at: old },
      { id: 'live', auth_user_id: 'u1', deleted_at: null, created_at: old },
      { id: 'tomb', auth_user_id: null, deleted_at: old, created_at: old },
      { id: 'new', auth_user_id: null, deleted_at: null, created_at: fresh },
    ];
    expect(selectStrandedProfiles(profiles, cutoff).map((p) => p.id)).toEqual(['s']);
  });
});

describe('selectUnreferencedTombstones', () => {
  it('keeps any tombstone a row still points at (FR-021)', () => {
    const profiles = [
      { id: 't1', auth_user_id: null, deleted_at: old },
      { id: 't2', auth_user_id: null, deleted_at: old },
      { id: 't3', auth_user_id: null, deleted_at: fresh },
      { id: 'live', auth_user_id: 'u1', deleted_at: null },
    ];
    expect(selectUnreferencedTombstones(profiles, new Set(['t2']), cutoff).map((p) => p.id)).toEqual(['t1']);
  });
});

describe('parseArgs', () => {
  it('defaults to a dry run with a 60 minute cutoff', () => {
    expect(parseArgs([])).toEqual({ apply: false, olderThanMin: 60, tombstones: true });
  });
  it('reads the flags', () => {
    expect(parseArgs(['--apply', '--older-than', '0', '--no-tombstones']))
      .toEqual({ apply: true, olderThanMin: 0, tombstones: false });
    expect(parseArgs(['--older-than=15']).olderThanMin).toBe(15);
  });
  it('refuses unknown or negative input', () => {
    expect(() => parseArgs(['--force'])).toThrow();
    expect(() => parseArgs(['--older-than', '-1'])).toThrow();
  });
});
