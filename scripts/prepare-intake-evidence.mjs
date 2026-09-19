#!/usr/bin/env node
/**
 * Frozen input bundle for an evaluator agent (Constitution Art. VII.8).
 *
 * G3/G5 review binds a unit that already exists. Intake evaluation runs before
 * there is a unit: what it judges is whether a `content-spec.md` is faithfully
 * derived from its course guide. So the bound set is the spec, the guide, the
 * catalog entry, the governing documents and the decision/gap registers - and
 * deliberately NOT `docs/`, because nothing is authored yet.
 *
 * Conventions follow `prepare-gate-evidence.mjs`: refuse a dirty tree, because a
 * manifest describes a commit; write with `wx`, so evidence is never silently
 * overwritten.
 *
 *   node scripts/prepare-intake-evidence.mjs EFMP-304 <out-dir>
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { manifestFor, digest, safeFile } from './lib/review-evidence.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');
const [course, outDir] = process.argv.slice(2);

/** The evaluator judges a spec against its guide, so both are bound, with the rules. */
function intakeRoots(code) {
  return [
    `specs/content/${code}/content-spec.md`,
    'catalog/courses.json',
    'specs/content/style-guide.md',
    'specs/content/terminology.csv',
    '.specify/memory/constitution.md',
    'specs/decisions/log.md',
    'specs/gaps.md',
    'Scheme-and-Course-guides',
    '.specify/Course_guides_and_Scheme',
    '.claude/skills/evaluate-intake',
    '.claude/agents/evaluator.md',
  ];
}

try {
  if (!course || !outDir) throw new Error('usage: prepare-intake-evidence COURSE OUT_DIR');
  if (!/^[A-Z]{2,4}-\d{3}(--)?$/.test(course)) throw new Error('COURSE must look like EFMP-304');
  const code = course.toLowerCase();

  const spec = `specs/content/${code}/content-spec.md`;
  if (!existsSync(safeFile(root, spec))) {
    throw new Error(`no content-spec to evaluate at ${spec}; draft it before requesting intake evaluation`);
  }

  const roots = intakeRoots(code);
  for (const path of roots) {
    if (!existsSync(safeFile(root, path))) throw new Error(`missing required intake input: ${path}`);
  }

  // A manifest describes a commit. Refuse anything uncommitted under the bound roots.
  const status = execFileSync('git', ['status', '--porcelain', '-z', '--untracked-files=all'], { cwd: root, encoding: 'utf8' });
  const dirty = status.split('\0').filter(Boolean)
    .map((entry) => entry.slice(3))
    .filter((path) => roots.some((r) => path === r || path.startsWith(`${r}/`)));
  if (dirty.length) {
    throw new Error(`bound inputs are not committed; commit or stash them first:\n  ${[...new Set(dirty)].join('\n  ')}`);
  }

  const input_manifest = manifestFor(root, roots);
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  const manifest = {
    schema_version: 1,
    kind: 'intake',
    course_code: course,
    gates: ['G0', 'G1'],
    commit,
    constitution: 'Article VII.8',
    input_manifest,
    manifest_digest: digest(JSON.stringify(input_manifest)),
  };

  mkdirSync(resolve(root, outDir), { recursive: true });
  writeFileSync(join(resolve(root, outDir), 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx' });
  console.log(`Prepared ${Object.keys(input_manifest).length} inputs at ${commit.slice(0, 8)}.`);
  console.log('Give the bundle to a fresh evaluator that did not draft this spec.');
} catch (error) {
  console.error(`Intake evidence not prepared: ${error.message}`);
  process.exit(1);
}
