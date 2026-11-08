/**
 * Filesystem facts the planner's illustration and stale-pass rules need (scripts/crew/planner.mjs:
 * needsIllustrationPlan, illustrationsPending, unitScopedChanges). Shared by crew.mjs (what the
 * crew plans) and build-g3-desk.mjs (what the desk offers), so both see the same unit state.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { readManifest } from '../lib/figure-manifest.mjs';
import { inputManifest } from '../lib/review-evidence.mjs';
import { figureBacklog, unitScopedChanges } from './planner.mjs';

const pad = (n) => String(n).padStart(2, '0');

/** `hasBanner` (the ADR-0029 `unit-NN.banner.md` sidecar exists) and the figure backlog. */
export function illustrationFacts(root, course, unit) {
  const dir = join(root, 'specs', 'content', course.toLowerCase(), 'figures');
  const banner = join(dir, `unit-${pad(unit)}.banner.md`);
  const rows = ['', '.banner'].flatMap((s) => readManifest(join(dir, `unit-${pad(unit)}${s}.md`)) ?? []);
  return { hasBanner: existsSync(banner), figureBacklog: figureBacklog(rows) };
}

/**
 * The unit's own bound inputs that changed since a `pass` report was written, or [] for any
 * other disposition (only a pass is re-reviewed on change). A unit whose inputs cannot be bound
 * is reported as unchanged here; the desk flags it separately.
 */
export function g3UnitChanges(root, course, unit, report) {
  if (report?.disposition !== 'pass' || !report.input_manifest) return [];
  try {
    return unitScopedChanges(report.input_manifest, inputManifest(root, course, unit, 'G3'), unit);
  } catch {
    return [];
  }
}
