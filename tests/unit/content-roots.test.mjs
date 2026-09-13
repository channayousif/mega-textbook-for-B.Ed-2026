/**
 * Feature 015: the content-roots walker is the single definition of where content
 * lives. These pin the guarantees in
 * `specs/015-licence-content-tree/contracts/content-roots.md` that six unit-walking
 * consumers and two pattern-scanning gates depend on.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { TRACKS, CONTENT_ROOTS, walkUnits, resolveUnit, urPathFor } from '../../scripts/lib/content-roots.mjs';

const made = [];
afterEach(() => { for (const d of made.splice(0)) rmSync(d, { recursive: true, force: true }); });

/** Build a throwaway repo shape. Paths are unit directories to create. */
function fixture(unitDirs = []) {
  const root = mkdtempSync(join(tmpdir(), 'content-roots-'));
  made.push(root);
  for (const p of unitDirs) {
    mkdirSync(join(root, p), { recursive: true });
    writeFileSync(join(root, p, 'index.mdx'), '---\ntitle: fixture\n---\n');
  }
  return root;
}

describe('TRACKS and CONTENT_ROOTS', () => {
  it('exposes the pre-service track, whose ordinal grouping is its own property', () => {
    const preService = TRACKS.find((t) => t.id === 'pre-service');
    expect(preService.contentRoot).toBe('docs');
    expect(preService.hasOrdinal).toBe(true);
  });

  it('derives urBase from the plugin id, never assuming the default instance', () => {
    for (const t of TRACKS) {
      const expected = t.pluginId
        ? `docusaurus-plugin-content-docs-${t.pluginId}`
        : 'docusaurus-plugin-content-docs';
      expect(t.urBase).toContain(expected);
    }
  });

  it('lists every track content root for the pattern-scanning gates', () => {
    expect(CONTENT_ROOTS).toEqual(TRACKS.map((t) => t.contentRoot));
    expect(Object.isFrozen(CONTENT_ROOTS)).toBe(true);
  });
});

describe('walkUnits', () => {
  it('yields nothing when a content root is absent, rather than throwing', () => {
    expect(walkUnits(fixture())).toEqual([]);
  });

  it('skips directory names that are not units, exactly as the prior walks did', () => {
    const root = fixture(['docs/semester-1/efmp-301/unit-01', 'docs/semester-1/efmp-301/notes']);
    const units = walkUnits(root);
    expect(units).toHaveLength(1);
    expect(units[0].unitNo).toBe(1);
  });

  it('skips grouping directories that do not match the track pattern', () => {
    const root = fixture(['docs/semester-1/efmp-301/unit-01', 'docs/drafts/efmp-999/unit-01']);
    expect(walkUnits(root)).toHaveLength(1);
  });

  it('carries a numeric ordinal for the pre-service track', () => {
    const root = fixture(['docs/semester-3/efmp-406/unit-02']);
    const [u] = walkUnits(root);
    expect(u.ordinal).toBe(3);
    expect(u.courseCode).toBe('EFMP-406');
    expect(u.courseFolder).toBe('efmp-406');
    expect(u.unitNo).toBe(2);
  });

  it('sorts deterministically by track, grouping dir, course then unit number', () => {
    const root = fixture([
      'docs/semester-2/gqur-301/unit-02', 'docs/semester-1/efmp-302/unit-01',
      'docs/semester-1/efmp-301/unit-02', 'docs/semester-1/efmp-301/unit-01',
    ]);
    expect(walkUnits(root).map((u) => `${u.trackDir}/${u.courseFolder}/${u.unitNo}`)).toEqual([
      'semester-1/efmp-301/1', 'semester-1/efmp-301/2',
      'semester-1/efmp-302/1', 'semester-2/gqur-301/2',
    ]);
  });

  it('narrows to one track on request', () => {
    const root = fixture(['docs/semester-1/efmp-301/unit-01']);
    expect(walkUnits(root, { track: 'pre-service' })).toHaveLength(1);
    expect(walkUnits(root, { track: 'no-such-track' })).toEqual([]);
  });
});

describe('resolveUnit', () => {
  it('finds a unit by course code and number, case-insensitively', () => {
    const root = fixture(['docs/semester-1/efmp-301/unit-01']);
    expect(resolveUnit(root, 'efmp-301', 1).courseCode).toBe('EFMP-301');
  });

  it('throws when nothing matches', () => {
    expect(() => resolveUnit(fixture(), 'EFMP-301', 1)).toThrow(/no unit found/);
  });

  it('throws when a course code resolves to more than one directory (FR-011)', () => {
    const root = fixture(['docs/semester-1/efmp-301/unit-01', 'docs/semester-2/efmp-301/unit-01']);
    expect(() => resolveUnit(root, 'EFMP-301', 1)).toThrow(/resolves to 2 directories/);
  });
});

describe('urPathFor', () => {
  it('derives the Urdu path from the track urBase, mirroring the English shape', () => {
    const root = fixture(['docs/semester-1/efmp-301/unit-01']);
    const [u] = walkUnits(root);
    expect(urPathFor(u)).toBe(
      join(root, 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01'));
    expect(urPathFor(u, 'topic-01.mdx')).toMatch(/unit-01\/topic-01\.mdx$/);
  });
});
