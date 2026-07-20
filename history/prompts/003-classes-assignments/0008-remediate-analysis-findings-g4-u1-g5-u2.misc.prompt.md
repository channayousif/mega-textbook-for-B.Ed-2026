---
id: 0008
title: Remediate analysis findings G4/U1/G5/U2
stage: misc
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: (none — direct instruction, not a slash command)
labels: ["remediation", "analysis-followup", "tasks", "plan"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/tasks.md
 - specs/003-classes-assignments/plan.md
tests:
 - none (planning-artifact edits only; the added T073/T074 are themselves new test tasks for implementation to write later)
---

## Prompt

fix all HIGH (G2, G3): close before merge, not before starting US1.
- MEDIUM (I1, G4): fix for plan/tasks fidelity.
- LOW (U1, G5, U2): optional.

## Response snapshot

Before editing anything, audited the actual current state of `tasks.md`, `data-model.md`,
`plan.md`, and `quickstart.md` against the `/sp.analyze` findings — a prior turn in this session
(compacted out of visible context, but discoverable via PHR `0005`/`0007` and system reminders
showing unexpected file diffs) had already fixed more than expected:
- **G1** (FR-018 student removal): already fully addressed — `T068`/`T069`/`T070` add
  `removeStudent()`, a roster UI control, and an RLS test.
- **X1** (the CRITICAL `classes` UPDATE-policy/ownership gap from the reconciled analysis):
  partially addressed — data-model.md's `guard_class_updates()` prose now explicitly ties the
  ownership check to `join_code` writes, not just `status` transitions, and T010's test asserts
  the cross-teacher negative case. **Not fully closed**: no task explicitly instructs creating the
  row-level `UPDATE` RLS policy itself (T013 still only lists "SELECT/INSERT policies"); flagged
  to the user, not fixed, since it's outside this turn's requested scope (CRITICAL items X1/G1
  were deliberately not in the user's list).
- **G2** (FR-019 anonymised display): already fully addressed — T044/T051 both now handle a
  tombstoned student's null `full_name` inline, and T071 is a dedicated RLS test.
- **G3** (SC-005 performance): already fully addressed — T072 is a dedicated load/perf-check task.
- **I1** (migration-order doc drift): already fully addressed in *both* plan.md's Project
  Structure list and quickstart.md's §1 prose — both now match tasks.md's actual order exactly.

Confirmed via `grep` that only 4 of the 7 requested items were still open: **G4** (no FR-006
status-enum test), **U1** (no assignment-due-date-edit-preserves-submissions test), **G5** (no
FR-021 regression guard), and **U2** (plan.md still said "27-item" against the actual 26-item
checklist). Fixed all four:
- U2: one-line fix, plan.md L156, "27-item" → "26-item".
- U1: folded into existing T022's description (no new task ID) — added the due-date-edit
  assertion to the same test file rather than spawning a new task for one assertion.
- G4: added `T073 [P] [US2]` — a dedicated RLS/unit test enumerating FR-006's student-facing
  status sequence, explicitly noting it complements (not duplicates) the existing teacher-side
  "missing" assertion.
- G5: added `T074 [P] [US6]` — a regression guard proving a `quiz`-sourced assignment can be
  created/published with an arbitrarily high `max_mark`, guarding the original session-1
  clarification against future accidental restriction.

Followed the numbering convention the prior (compacted) turn had already established for
T068–T072 — new tasks appended with the next available high ID (T073, T074) and inserted
positionally at the end of their story's test block, rather than a full sequential renumber, for
consistency with what was already in the file. Verified afterward: 74 total tasks, T001–T074, no
duplicate IDs.

## Outcome

- ✅ Impact: Closed out all 4 remaining items from the user's fix list (G4, U1, G5, U2) that
  weren't already resolved by an earlier turn; confirmed G2, G3, and I1 needed no further action.
  Surfaced (but did not fix, as it was out of the requested scope) a residual gap in X1: the
  `classes` table still lacks an explicit task creating its row-level `UPDATE` RLS policy, only
  the trigger and its ownership-check prose.
- 🧪 Tests: None run — planning-artifact edits only. The two new tasks (T073, T074) themselves
  specify tests to be written during implementation.
- 📁 Files: `specs/003-classes-assignments/tasks.md` (T022 amended, T073/T074 added — now 74
  tasks total), `specs/003-classes-assignments/plan.md` (L156 "27-item" → "26-item").
- 🔁 Next prompts: User should decide whether to close the residual X1 gap (add an explicit
  `classes` UPDATE-policy task to T013 or a new task) before `/sp.implement`, or proceed as-is.
- 🧠 Reflection: When a user's fix instruction is copy-pasted directly from a prior report, always
  re-verify the current file state before acting on it — don't assume the report is still
  accurate. In this case 3 of the 7 requested fixes (G2, G3, I1) had already been applied in a
  turn this conversation's context no longer directly held, and blindly re-applying them would
  have produced duplicate tasks/edits. Grep-verifying each finding's current status first avoided
  that.

## Evaluation notes (flywheel)

- Failure modes observed: None in this turn — the pre-edit audit caught the already-fixed items
  before any duplicate edits were attempted.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): If the user asks to close X1 fully, the smallest fix
  is amending T013's description to explicitly add `create policy classes_update_own on classes
  for update using (teacher_id = current_profile_id() or is_admin())` alongside its existing
  SELECT/INSERT policies, rather than adding a whole new task.
