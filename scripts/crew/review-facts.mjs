/**
 * Filesystem facts the planner's illustration and stale-pass rules need (scripts/crew/planner.mjs:
 * needsIllustrationPlan, illustrationsPending, unitScopedChanges). Shared by crew.mjs (what the
 * crew plans) and build-g3-desk.mjs (what the desk offers), so both see the same unit state.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { readManifest } from '../lib/figure-manifest.mjs';
import { inputManifest } from '../lib/review-evidence.mjs';
import { figureBacklog, unitScopedChanges } from './planner.mjs';

const pad = (n) => String(n).padStart(2, '0');

/**
 * `{ file, json }` for every `.json` file directly in a gate directory (`reviews/unit-NN/G3`
 * or `G5`) and in its immediate subdirectories, never deeper; `json` is null when a file does
 * not parse. `file` is joined onto `prefix` (default: the directory itself), so callers can
 * keep absolute or repository-relative paths. Feed the result to `pickLatestReport`, which
 * drops manifest.json and other evidence files that carry no `disposition`.
 *
 * 2026-W46 M5: reviewers wrote reports one folder down (`G3/<run-id>/<run-id>.json`), which a
 * flat listing never saw. For EFMP-407 Units 5 and 8 the planner found no report, queued a
 * second review before any repair, and the reviewer escalated on unchanged inputs, spending the
 * unit's last ADR-0019 cycle. Two levels down (`<run>/logs/...`) is evidence, not a report.
 */
export function gateJsonEntries(dir, { prefix = dir } = {}) {
  if (!existsSync(dir)) return [];
  const read = (abs, file) => {
    try { return { file, json: JSON.parse(readFileSync(abs, 'utf8')) }; } catch { return { file, json: null }; }
  };
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.isFile() && e.name.endsWith('.json')) out.push(read(join(dir, e.name), join(prefix, e.name)));
    else if (e.isDirectory()) {
      for (const f of readdirSync(join(dir, e.name), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
        if (f.isFile() && f.name.endsWith('.json')) out.push(read(join(dir, e.name, f.name), join(prefix, e.name, f.name)));
      }
    }
  }
  return out;
}

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
