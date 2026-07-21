---
id: 0011
title: Close remaining analyze findings for dashboard
stage: misc
date: 2026-07-21
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: manual (follow-up to a second /sp.analyze verification pass)
labels: ["remediation", "consistency-fix", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-student-dashboard/tasks.md
 - specs/004-student-dashboard/plan.md
 - specs/004-student-dashboard/contracts/dashboard-operations.md
tests:
 - none (planning-artifact edits only; no code changed)
---

## Prompt

resolve all

## Response snapshot

Closed the two findings surfaced by the second `/sp.analyze` verification pass (run after the
first remediation round): G4 (the Assignments area had zero dedicated E2E test — the previous
G1 fix had added 360px checks to Grades/Progress/History/Achievements but never noticed T013
lacked a test task to extend in the first place) and I5 (contracts/dashboard-operations.md's two
rows for Home's current-semester label and due-soon shape still had pre-remediation generic
wording, not yet synced with data-model.md/tasks.md's E1/U1 fixes).

**G4**: Added new task **T051** (`tests/e2e/dashboard-assignments.spec.ts`) to Phase 3's "Tests
for User Story 1" section, positioned right after T010 — asserts FR-003's overdue-vs-future
distinction, late-acceptance wording (open/overdue-late-allowed/closed), closed-items-never-
actionable, the quiz-closed-not-overdue edge case, and a 360px/no-horizontal-scroll check
(SC-006), closing the last area that Success Criterion hadn't reached. Followed the same
continue-from-current-max ID convention as the prior round's T049/T050 (and Spec 003's own
T068–T077 precedent) rather than renumbering the file. Also restored `dashboard-assignments.spec.ts`
to plan.md's Project Structure e2e file list — it had been deliberately removed during the first
remediation round (I4) because no task created it at the time; now that T051 does, the file
belongs back in the list.

**I5**: Updated contracts/dashboard-operations.md's "Home: current semester + classes" and
"Home/Assignments: due soon / all pending" rows to state the highest-semester label rule and the
`allow_late`/computed-state fields, matching the wording already present in data-model.md's
corresponding rows since the first remediation round.

Verified via grep: tasks.md now has 51 tasks (T001–T051), confirmed sequential and unique with no
duplicates; `dashboard-assignments.spec.ts` appears in tasks.md's T051 and in plan.md's brace-
expansion file list (`dashboard-{home,assignments,grades,progress,history,achievements}.spec.ts`
— grep for the literal expanded string doesn't match a brace pattern, so this was double-checked
directly against the line); both contracts.md rows now carry the `/sp.analyze` resolution note.

## Outcome

- ✅ Impact: SC-006 (360px/no-horizontal-scroll "in any area") now has task coverage across all
  six dashboard areas, the last of the three HIGH-severity Success-Criterion gaps from the
  original `/sp.analyze` report. All artifacts (spec.md, plan.md, data-model.md,
  contracts/dashboard-operations.md, tasks.md) are now mutually consistent with zero known
  residual findings from either analysis pass.
- 🧪 Tests: None run (planning-artifact edits only); tasks.md now specifies T051 as an additional
  test task beyond the prior round's 50, for 51 total.
- 📁 Files: `specs/004-student-dashboard/tasks.md` (new T051 inserted into Phase 3);
  `specs/004-student-dashboard/plan.md` (e2e file list restored `dashboard-assignments.spec.ts`);
  `specs/004-student-dashboard/contracts/dashboard-operations.md` (2 rows synced to match
  data-model.md's already-updated wording).
- 🔁 Next prompts: `/sp.implement` — the plan/task set has now survived two `/sp.analyze` passes
  with all findings closed.
- 🧠 Reflection: The second `/sp.analyze` pass caught something the first remediation round's own
  verification missed — G1's fix pattern was "find existing e2e test tasks and add a 360px
  assertion," which silently skipped T013 precisely because no e2e test task existed there yet to
  find. This is a useful general lesson: when a coverage-gap fix works by *extending* existing
  tasks, always separately check whether every required target actually *has* an existing task to
  extend, rather than assuming the fix's search pattern found everything.

## Evaluation notes (flywheel)

- Failure modes observed: None in this session — the fixes were mechanical once both gaps were
  correctly diagnosed by the prior verification pass. The interesting failure mode (G1's
  incomplete fix) was diagnosed in the *previous* turn's analysis, not this one.
- Graders run and results (PASS/FAIL): Format grader — PASS: `grep -cE '^\- \[ \] T[0-9]{3}'` on
  tasks.md returns 51, matching 51 unique sequential IDs (T001–T051) with no gaps or duplicates.
  Content grader — PASS: `dashboard-assignments.spec.ts` and the `/sp.analyze` resolution notes
  are present in exactly the files intended (tasks.md T051, plan.md's file tree, contracts.md's
  two rows), verified by targeted grep post-edit.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a coverage-gap remediation is phrased as "add X
  to every existing task of type Y," explicitly enumerate the full expected set of Y first (here:
  all 6 dashboard areas' e2e tests) and diff it against what actually exists, rather than pattern-
  matching over existing tasks and assuming the matched set is complete.
