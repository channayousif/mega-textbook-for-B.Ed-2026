# ADR-0032: G3 Sign-off Intent Ledger

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-10-27 (board-direct session; the owner chose "Supabase ledger + crew sync" over a download bundle or a page that opens PRs itself)
- **Date:** 2026-10-27
- **Feature:** G3 sign-off desk (admin dashboard)
- **Context:** On 2026-10-27 the crew board listed 83 units whose agent G3 review is finished and
  which wait only for the owner's sign-off (17 `pass`, 34 `revise` then repaired, 32 `escalate`,
  across 12 courses). Signing one meant reading the agent report in
  `specs/content/<course>/reviews/unit-NN/G3/`, running `npm run review:evidence prepare`, filling
  the `/app/admin/review-queue` form, downloading two files, committing them and appending a tracker
  row by hand. Eighty-three times that is the bottleneck. Spec 017 FR-009 made the review page write
  nothing, and Article V.1 keeps content (and with it gate outcomes) in Git.
- **Amends:** Spec 017 FR-009, for the admin sign-off desk only. The `/app/admin/review-queue` page
  keeps its write-nothing behaviour unchanged.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

1. **The page records intent, not outcomes.** A new admin page, `/app/admin/g3-signoff`, writes the
   owner's decision for a unit (certify, request revision, escalate, with criteria, notes and an
   attestation) to a new Supabase table, `g3_signoffs`. A row there is an *instruction to sign*.
   No gate, build, banner or status report ever reads it.
2. **Git stays the only record the gate counts.** The crew's sync step (`scripts/crew/signoff-sync.mjs`,
   run from `tick.sh`) turns queued rows into the existing Spec 017 artefacts: a certification JSON
   under `reviews/unit-NN/G3/` and an appended tracker row. It batches them into one PR. The unit is
   certified only when that PR merges, exactly as if the owner had committed the files by hand.
   `check:pipeline-gate`, `report-content-status.mjs` and Article VII are unchanged.
3. **Decisions bind to the inputs that were reviewed.** The desk data (`static/g3-desk.json`, built
   at prebuild) carries each unit's input manifest digest. The ledger row stores it. The sync
   recomputes the digest on `origin/main` and marks the row `stale` instead of signing if the unit
   changed after the decision. Article VII §4's freshness rule therefore holds for the ledger path.
4. **Only admins write; only the service role syncs.** The table has RLS with admin-only read, and
   no client insert/update grants. Writes go through `record_g3_signoff` and `withdraw_g3_signoff`
   (admin, security definer, audited in `admin_action_history`). Rows are marked synced or failed
   only by `mark_g3_signoff_synced`, which only `service_role` can execute.
5. **The pull request remains the trust control.** The sync PR is never auto-merged by the crew. It
   lists every unit, decision and reviewer initials, and the owner merges it.

## Consequences

### Positive

- One place shows every unit waiting for G3, its agent verdict, criteria, findings, tracker history
  and ledger state. The owner can decide one unit or a batch of clean `pass` units in one action.
- No new secret reaches the browser, and no GitHub token sits in an edge function.
- Every decision has a durable, queryable history (who, when, on which inputs, which PR).

### Negative

- A second place now holds review-related state. The ADR's rule that nothing reads it for a gate
  must be kept: a future feature that derives publication from `g3_signoffs` would breach
  Article V.1 and needs its own ADR.
- Sign-offs are no longer instant: a decision reaches Git at the next crew tick (15 min) and then
  needs a merge.
- Batch certification on agent evidence risks rubber-stamping. The attestation flag, editable
  criteria and the reviewer-initials check in the PR are the mitigation, not a guarantee.

## Alternatives Considered

- **Download bundle plus a local apply script.** Keeps FR-009 intact, but the owner works from
  several devices and wanted decisions visible in the dashboard, not in local files.
- **The page opens the PR itself** through an edge function holding a GitHub token. Instant, but it
  adds a long-lived write credential to the web tier and skips the crew's gate run.

## References

- Spec 017 (`specs/017-reviewer-role/spec.md`), FR-009 and `contracts/certification.md`
- ADR-0019 (independent agents for G3/G5), ADR-0026 (publication tiers), ADR-0030 (crew)
- Migration `supabase/migrations/0050_g3_signoffs.sql`
