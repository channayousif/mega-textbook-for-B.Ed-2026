/**
 * 2026-W46 M2: BOARD.md C-017 to C-021 kept asking about PRs that had landed.
 * Only open questions expire; owner answers remain part of the audit trail.
 * These helpers use supplied state and time, with no I/O.
 */
export function closePrDecisions(decisions, pr, outcome, closedAt) {
  if (!pr) return [];
  const ids = [];
  for (const item of decisions.items) {
    if (item.status !== 'open' || item.pr !== pr) continue;
    item.status = 'closed';
    item.closedAt = closedAt;
    item.note = `PR #${pr} was ${outcome}.`;
    ids.push(item.id);
  }
  return ids;
}

/** Recover old open questions even when their jobs no longer enter managePrs. */
export function closeLandedDecisions(decisions, board, closedAt) {
  const ids = [];
  for (const job of board.jobs) {
    if (job.status === 'merged' || job.status === 'closed') {
      ids.push(...closePrDecisions(decisions, job.prNumber, job.status, closedAt));
    }
  }
  return ids;
}
