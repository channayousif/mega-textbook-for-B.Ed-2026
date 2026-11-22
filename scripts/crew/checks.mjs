/**
 * Pure helpers for judging a worker's result and a PR's CI (`gh pr view --json statusCheckRollup`),
 * kept apart from crew.mjs (which runs on import) so tests/crew/ can exercise them.
 */

/**
 * Did the job's branch gain work? `ahead` counts commits on HEAD that origin/main lacks, `made`
 * those since this attempt started (startHead). Normally both must be non-zero. A job on its own
 * fresh branch (no CI-fix parent, no salvage base) may instead carry commits from an earlier
 * attempt that died after committing (auth error, timeout): those are this job's work, and a
 * retry finding nothing left to do is a success, not a failure (efpg-401-u01-plan_illustrations
 * went red three times this way, 2026-11-19). Returns the `git diff` range holding the produced
 * files, or null when nothing was made.
 */
export function workMade({ ahead, made, startHead, parent, base }) {
  if (!ahead) return null;
  if (made && startHead) return `${startHead}..HEAD`;
  if (made || (!parent && !base)) return 'origin/main...HEAD';
  return null;
}

/** Drop checks that started before the crew's last push to the PR (pushedAt); they judge an old head. */
export function freshChecks(checks, pushedAt) {
  if (!pushedAt) return checks;
  const since = Date.parse(pushedAt) - 60e3; // runner clocks are not ours; allow a minute of skew
  return checks.filter((c) => (Date.parse(c.startedAt || c.createdAt || 0) || 0) >= since);
}
