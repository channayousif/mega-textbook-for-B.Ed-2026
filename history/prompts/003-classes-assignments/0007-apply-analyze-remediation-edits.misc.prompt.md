---
id: 0007
title: Apply analyze remediation edits
stage: misc
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.analyze (follow-up)
labels: ["analysis", "remediation", "spec-review"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/plan.md
 - specs/003-classes-assignments/quickstart.md
 - specs/003-classes-assignments/data-model.md
 - specs/003-classes-assignments/tasks.md
tests:
 - (none run — documentation/task-list edits only, no code changed)
---

## Prompt

Yes, draft the remediation edits for all

(followed by, after drafts were presented: "apply all")

## Response snapshot

Drafted then applied concrete remediation edits for all 6 findings from PHR 0005's /sp.analyze report:

- I1: plan.md's Project Structure migration-filename list (lines ~110-116) rewritten to match tasks.md's actual numbering (0013_class_guard_trigger.sql...0023_quiz_attempts.sql) instead of the stale linear enums→tables→triggers→RPCs list.
- I2: quickstart.md §1's migration-order prose rewritten to match tasks.md's actual dependency order (guard/ineligibility triggers right after `classes`, before `enrollments`; `answer_keys` before `quiz_items`/`quiz_attempts`).
- U1: data-model.md's `guard_class_updates()` spec now explicitly states the ownership check (`teacher_id = current_profile_id()`) applies to `join_code` changes too, not only `status` transitions; tasks.md's T010 extended with the negative-case assertion (non-owner cannot change another class's `join_code`/`status`).
- C1: tasks.md gained T068 (`removeStudent` in classes.ts), T069 (roster.tsx "Remove student" control), T070 (RLS test for the removal transition and cross-teacher denial) — closing FR-018's coverage gap.
- C2: tasks.md gained T071 (RLS test for tombstoned-student grade/submission survival) and extended T044 (grading queue) + T051 (gradebook export) to render an anonymized placeholder for `profiles.full_name IS NULL` rows — closing FR-019's coverage gap.
- C3: tasks.md gained T072, a Phase 9 performance check seeding a 200-student class and measuring p95 latency against SC-005's <5s target.

tasks.md now has 72 tasks (was 67); verified via grep count. No code was touched — all edits are to specs/003-classes-assignments/{plan,quickstart,data-model,tasks}.md.

## Outcome

- ✅ Impact: All 6 /sp.analyze findings (2 HIGH inconsistencies, 3 HIGH coverage gaps, 1 HIGH underspecification) resolved at the spec/plan/tasks level before implementation begins; FR-018 and FR-019 now have full task coverage, SC-005 has a verification task, and the join_code ownership ambiguity is closed in both the design doc and its test task.
- 🧪 Tests: None run — these are planning-artifact edits (task list additions, doc corrections), not code; the new/extended test tasks (T010, T044, T051, T070, T071, T072) will be executed once /sp.implement reaches them.
- 📁 Files: specs/003-classes-assignments/plan.md, quickstart.md, data-model.md, tasks.md (all four edited in place).
- 🔁 Next prompts: Proceed to /sp.implement (or continue reviewing tasks.md T068-T072 placement/dependencies first if desired).
- 🧠 Reflection: Appending new tasks as T068-T072 (rather than renumbering the whole file to slot them into their logical phase position) avoided invalidating every existing task's cross-reference (`depends on T0XX`) — the right tradeoff for an incremental amendment to an already-numbered 67-task file.

## Evaluation notes (flywheel)

- Failure modes observed: None — all six Edit calls succeeded on the first attempt since the file states were already in context from the prior /sp.analyze read.
- Graders run and results (PASS/FAIL): N/A — no automated grader invoked.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When /sp.implement runs, confirm T068-T072 get picked up correctly despite being appended out of their phase's natural position in the file (they're still correctly labeled with [Story] tags and phase-appropriate placement within their sections, just numbered non-sequentially at the tail).
