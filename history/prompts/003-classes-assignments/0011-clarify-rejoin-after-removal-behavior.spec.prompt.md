---
id: 0011
title: Clarify rejoin-after-removal behavior
stage: spec
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "spec", "classes-assignments", "post-planning"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/spec.md
tests:
 - none (spec-stage clarification; no code changes — plan.md/data-model.md/tasks.md are now stale as a result and were flagged to the user, not yet resynced)
---

## Prompt

(No additional user input provided — `/sp.clarify` invoked with empty arguments to run the standard clarification workflow against the current feature spec on branch `003-classes-assignments`. Unusually, this ran *after* `/sp.plan`, `/sp.tasks`, and two `/sp.analyze` passes had already completed for this feature, rather than before, as the command's own note anticipates.)

## Response snapshot

Ran the taxonomy scan against `specs/003-classes-assignments/spec.md`, which already carried 7 clarifications from the original pre-planning session. Most categories were already Clear. One genuine gap stood out: FR-018 defines what happens when a teacher removes a student, but the spec never addressed what happens if that student later re-enters the class's still-valid join code — and this had been quietly resolved as an *unreviewed implementation choice* during `/sp.plan` (`data-model.md`'s `join_class_by_code` RPC currently auto-reactivates a `'removed'` enrollment row on rejoin), never surfaced as a spec-level decision. Asked exactly this one question, recommending "blocked until teacher restores" (matching how a deliberate remove-for-cause action should behave, and avoiding the case where a removed student trivially undoes it by re-entering a code they already have) over "rejoin allowed" (Google-Classroom-style silent reactivation) or "new code required" (disruptive to the rest of the roster). User selected the recommended option.

Integrated the answer into `spec.md`: appended the Q&A to the existing `### Session 2026-07-19` heading (same calendar date as the original session, so no new heading was created, keeping to the "only `## Clarifications`/`### Session YYYY-MM-DD`" structural rule); amended FR-018 to state the block explicitly; added a new **FR-022** for the teacher's restore capability (own-class-only, matching the existing removal ownership boundary); added an Edge Case bullet distinguishing the "you were removed" message from a generic "invalid code" denial (deliberately non-uniform, since a removed student is a known former member, not an unrelated guesser — a different privacy posture than the existing uniform-denial rule for `join_class_by_code`'s other failure modes); updated the Enrollment entity's Key Entities description.

Flagged clearly to the user (in the completion report, not silently): this decision **contradicts** the already-built `data-model.md`/`contracts/classes-operations.md`/`tasks.md`, which currently assume silent auto-reactivation on rejoin and have no task for a "restore" action at all. Offered to sync those artifacts directly rather than re-running `/sp.plan` from scratch, since the change is narrowly scoped (one RPC's behavior + one new teacher capability), not architectural.

## Outcome

- ✅ Impact: Closed a genuine, previously-undetected spec gap that had already been silently resolved the "wrong" way (from the owner's actual intent) at the planning-artifact level — caught before implementation began, not after. Added a new functional requirement (FR-022) and a new user-facing capability (restore) that hadn't existed in any artifact until now.
- 🧪 Tests: None run — spec-only change. `tasks.md` will need a new RLS test (removed student's rejoin attempt is blocked with a specific message; restore reactivates; a teacher cannot restore another teacher's removed student) once synced.
- 📁 Files: `specs/003-classes-assignments/spec.md` (Clarifications, FR-018, FR-022, Edge Cases, Key Entities).
- 🔁 Next prompts: user to decide whether to sync `data-model.md`/`contracts/classes-operations.md`/`tasks.md` now (offered) or defer.
- 🧠 Reflection: Running `/sp.clarify` *after* `/sp.plan`/`/sp.tasks` rather than before — against the command's own stated expectation — still found real value here: planning inevitably makes small user-facing behavioral choices (like RPC upsert-vs-reject semantics) that read as "implementation details" in the moment but are actually product decisions that should have been surfaced. Worth treating "does this RPC/trigger choice have an observable, testable user-facing consequence?" as a signal to route the decision through clarify even mid-implementation, rather than letting it settle silently into a data-model.md prose note.

## Evaluation notes (flywheel)

- Failure modes observed: First edit attempt created a new `### Session 2026-07-19 (post-planning follow-up)` heading, which violates the command's own validation rule ("only allowed new headings: `## Clarifications`, `### Session YYYY-MM-DD`") since the parenthetical suffix makes it a non-matching heading text and duplicates a date that already has a session heading. Caught and corrected immediately by re-editing to append the bullet under the existing `### Session 2026-07-19` heading instead of introducing a second one for the same date.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): If the user approves syncing, the smallest correct change is: (1) `data-model.md`'s `join_class_by_code` — remove the "reactivating a prior removed row" upsert behavior, replace with a distinct rejection when a `'removed'` row exists; (2) add a `restoreStudent()` RLS policy/lib task and roster UI control mirroring T068/T069's `removeStudent()` pattern; (3) one new RLS test.
