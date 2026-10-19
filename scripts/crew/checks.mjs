/**
 * Pure helpers for judging a PR's CI from `gh pr view --json statusCheckRollup`, kept apart from
 * crew.mjs (which runs on import) so tests/crew/ can exercise them.
 */

/** Drop checks that started before the crew's last push to the PR (pushedAt); they judge an old head. */
export function freshChecks(checks, pushedAt) {
  if (!pushedAt) return checks;
  const since = Date.parse(pushedAt) - 60e3; // runner clocks are not ours; allow a minute of skew
  return checks.filter((c) => (Date.parse(c.startedAt || c.createdAt || 0) || 0) >= since);
}
