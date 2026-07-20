---
id: 0010
title: Resolve N1 join-code eligibility and N2 test ordering
stage: misc
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: (none — direct instruction, not a slash command)
labels: ["remediation", "analysis-followup", "rls-fix", "data-model", "tasks"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/data-model.md
 - specs/003-classes-assignments/contracts/classes-operations.md
 - specs/003-classes-assignments/tasks.md
tests:
 - none (planning-artifact edits only; T010's amended description now specifies the suspended-owner-cannot-reissue assertion for implementation to write)
---

## Prompt

N1:  just row ownership is enough, suspended teacher will not be able to issue join code. N2: agree

## Response snapshot

Resolved the two findings from the re-run `/sp.analyze` pass with the owner's explicit direction
on N1, reconciling it against how the rest of the codebase actually enforces "suspended."

**N1** — the owner's two stated goals ("just ownership" + "suspended teacher blocked") are not
achievable with a single flat rule, because `current_profile_id()` (Spec 002) only excludes
tombstoned profiles, not suspended ones — pure ownership alone would *not* block a suspended
teacher during their token's remaining TTL. Resolved by splitting the `classes` guard trigger's
two governed columns into two different strictness levels (documented as an explicit owner
decision, 2026-07-19):
- `join_code`: ownership **+ `is_active_user()`** only — blocks a suspended teacher (matching
  every other protected write in this codebase's Spec 002 baseline), but does *not* additionally
  require them to still hold the `teacher` role, since a role change away from `teacher` already
  triggers auto-archival regardless (FR-020), making a stricter role-check on `join_code`
  redundant.
- `status`: unchanged — ownership + full eligibility (`role='teacher' AND status='active'`), the
  stricter check FR-020's reactivation clarification already required.

Applied this resolution across all three affected artifacts so they now agree:
- `data-model.md`: rewrote the guard-trigger bullet to state both strictness levels explicitly,
  with the rationale inline (why `join_code` doesn't need the role-check).
- `contracts/classes-operations.md` §A: changed "owning teacher (eligible)" → "owning teacher
  (active — not suspended...)" for the Reissue/Revoke rows specifically, to stop implying the
  stricter check applies there.
- `tasks.md`: rewrote T014 to specify both strictness levels; extended T010's test description to
  add the suspended-owner-cannot-reissue assertion (no new task ID — folded into the existing
  guard-trigger test, same pattern used for prior LOW-severity folds).

**N2** — moved the `T070` line (an RLS test) from the end of the "### Implementation for User
Story 1" section, where it sat after its own dependent implementation tasks (T068/T069), to
immediately before "### Implementation for User Story 1" begins — i.e., into the "### Tests for
User Story 1" section where it belongs, positioned last among that section's tests. Pure line move
via two Edit calls (delete from old position, insert at new position); no renumbering, since the
task ID itself was never the problem, only its section placement.

Verified afterward: still 74 tasks (T001–T074), no duplicate IDs, T070 now correctly precedes
T013–T021/T068/T069 in file order.

## Outcome

- ✅ Impact: Closes both findings from the re-run analysis. All 11 findings raised across the two
  `/sp.analyze` passes on this feature (X1, G1, G2, G3, I1, G4, U1, G5, U2, N1, N2) are now
  resolved with no known open gaps in `spec.md`/`plan.md`/`tasks.md`/`data-model.md`/`contracts/`.
- 🧪 Tests: None run — planning-artifact edits; T010 now specifies the concrete assertion
  (suspended owner blocked from `join_code` reissue) for implementation to write and prove.
- 📁 Files: `specs/003-classes-assignments/data-model.md` (`classes` guard-trigger section
  rewritten with two-tier strictness), `specs/003-classes-assignments/contracts/classes-operations.md`
  (§A wording corrected), `specs/003-classes-assignments/tasks.md` (T010, T014 descriptions
  updated; T070 relocated).
- 🔁 Next prompts: No further `/sp.analyze` findings outstanding — ready for `/sp.implement`.
- 🧠 Reflection: The owner's two-part instruction ("just ownership" + "suspended blocked") looked
  contradictory at first read against `current_profile_id()`'s actual definition (no status
  check), but wasn't actually a contradiction to resolve by picking one side — it was a
  specification of two independent constraints that required composing a slightly richer rule
  (`ownership + is_active_user()`, short of full `eligibility`) rather than reusing either of the
  two checks already defined elsewhere in the design. Worth checking whether a stated requirement
  is actually satisfiable by an *existing* primitive before assuming it maps onto one, rather than
  picking the nearest match.

## Evaluation notes (flywheel)

- Failure modes observed: None — traced `current_profile_id()`'s actual SQL definition
  (`0004_is_admin.sql`, checked earlier in this session) before concluding pure ownership wouldn't
  suffice, rather than assuming.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A — analysis/remediation loop is now closed for this
  feature; next step is implementation.
