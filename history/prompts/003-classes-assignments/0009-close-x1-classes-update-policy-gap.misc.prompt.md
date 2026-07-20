---
id: 0009
title: Close X1 classes UPDATE policy gap
stage: misc
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: (none — direct instruction, not a slash command)
labels: ["remediation", "rls-fix", "data-model", "tasks"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/data-model.md
 - specs/003-classes-assignments/tasks.md
tests:
 - none (planning-artifact edits only; T013's corrected description is what implementation will follow, and T010's existing test already asserts the resulting owner/non-owner behavior)
---

## Prompt

yes, close X1 too

## Response snapshot

Closed the last open piece of X1 (the CRITICAL finding from the reconciled `/sp.analyze` pass):
`classes` had a `guard_class_updates()` trigger whose ownership-check prose was already fixed, but
no task actually instructed creating the row-level `UPDATE` RLS policy the trigger depends on to
ever fire. Fixed at both levels:

- **data-model.md**: added a new explicit `### RLS policies` section to the `classes` entity,
  ahead of the guard-trigger section, spelling out SELECT (owning teacher/admin), INSERT (own
  `teacher_id`), and — the missing piece — **UPDATE** (`teacher_id = current_profile_id() OR
  is_admin()`), with an explicit note that this is "the row-level policy that lets an UPDATE
  command reach a row at all" and that "the trigger cannot substitute for this policy." Reworded
  the guard-trigger section's opening line to state it "narrows the row-level UPDATE policy above
  to specific columns" rather than presenting the trigger as if it were self-sufficient.
- **tasks.md**: rewrote T013 to explicitly instruct creating all three policies including the
  UPDATE one, with the same causal warning inline ("without this UPDATE policy the trigger has no
  row to act on and every reissue/archive/reactivate would silently affect 0 rows"). Reworded T014
  to state it "narrows T013's row-level UPDATE policy to specific columns; grants no row access by
  itself" — so an implementer reading either task in isolation now sees the dependency stated
  explicitly rather than left implicit.

No new task IDs were needed — T010's existing test (owner can update `join_code`/`status`;
non-owner cannot) already exercises exactly the behavior this fix makes buildable; the gap was
purely in the implementation-instruction text, not in test coverage. Verified afterward: still 74
tasks (T001–T074), no duplicate IDs, no renumbering required.

## Outcome

- ✅ Impact: Fully closes X1 — the last CRITICAL finding from the reconciled analysis. Every
  finding from that report (X1, G1, G2, G3, I1, G4, U1, G5, U2) is now resolved across
  `data-model.md`, `tasks.md`, and `plan.md`.
- 🧪 Tests: None run — planning-artifact edits; T010's already-specified test now has a buildable
  implementation path (T013+T014 together) to actually satisfy.
- 📁 Files: `specs/003-classes-assignments/data-model.md` (new `### RLS policies` subsection under
  `classes`, guard-trigger intro reworded), `specs/003-classes-assignments/tasks.md` (T013, T014
  descriptions rewritten).
- 🔁 Next prompts: All `/sp.analyze` findings closed — ready for `/sp.implement`, or a final
  confirmation pass if the user wants one before implementation starts.
- 🧠 Reflection: This finding is a good example of why "the trigger exists" and "the trigger can
  ever fire" are different claims — a trigger-only design reads as complete until you trace
  whether a companion row-level RLS policy actually lets the triggering command reach a row in the
  first place. Worth explicitly checking this trigger/policy pairing for every future
  guard-trigger pattern in this codebase, not just here.

## Evaluation notes (flywheel)

- Failure modes observed: None — the fix was scoped precisely to the two tasks (T013, T014) and
  one data-model section identified in the prior audit; no speculative additional changes made.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A — this closes the remediation loop opened by
  `/sp.analyze`.
