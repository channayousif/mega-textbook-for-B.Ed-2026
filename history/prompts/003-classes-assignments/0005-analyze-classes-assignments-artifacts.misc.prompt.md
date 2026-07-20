---
id: 0005
title: Analyze classes-assignments artifacts
stage: misc
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.analyze
labels: ["analysis", "cross-artifact-consistency", "spec-review"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - (none — read-only analysis, no files modified)
tests:
 - (none run — analysis only)
---

## Prompt

(empty — /sp.analyze invoked with no additional user input; command body per .claude/commands/sp.analyze.md)

## Response snapshot

Ran a read-only cross-artifact consistency analysis across spec.md (21 FRs, 7 SCs, 6 user stories), plan.md, tasks.md (T001–T067), data-model.md, contracts/classes-operations.md, quickstart.md, checklists/requirements.md, and the constitution (v2.3.0). Produced a Markdown findings report (no files modified) with 6 findings, none CRITICAL:

- I1 (HIGH, Inconsistency): plan.md's Project Structure migration-filename list (0013_enrollments.sql...0023_submissions_storage_bucket.sql) completely disagrees with tasks.md's actual migration numbering (0013_class_guard_trigger.sql...0023_quiz_attempts.sql) from 0013 onward.
- I2 (MEDIUM, Inconsistency): quickstart.md §1's prose migration-application order contradicts tasks.md's actual dependency order (guard/ineligibility triggers apply right after `classes`, not last; `answer_keys` before `quiz_items`/`quiz_attempts`).
- C1 (HIGH, Coverage Gap): FR-018 (student removal from roster) has no implementing task — T018's classes.ts has no removeStudent function, T020's roster.tsx has no removal control, no dedicated test exercises the removal transition.
- C2 (HIGH, Coverage Gap): FR-019 (deleted student's anonymized gradebook display) is referenced nowhere in tasks.md despite being a required contract-test item in contracts/classes-operations.md §H.
- C3 (HIGH, Coverage Gap): SC-005 (200-student class, <5s p95 for key actions) has zero verification task in Phase 9; T067 only defers pagination *beyond* SC-005's scale, a different concern.
- U1 (HIGH, Underspecification): guard_class_updates()'s spec text ties ownership+eligibility checks explicitly only to the `status` column transition, not to bare `join_code` reissue/revoke; combined with T013 only adding SELECT/INSERT ownership policies (no UPDATE ownership policy), it's ambiguous whether a non-owning teacher could reissue/revoke another teacher's join code. T010's RLS test never asserts the negative case either.

Coverage summary: 19/21 FRs mapped to tasks (90.5%), all 67 tasks trace to at least one requirement/gate, no duplicate or vague/unmeasurable requirements found. Offered to draft concrete remediation edits for all 6 findings; awaiting user decision before making any changes.

## Outcome

- ✅ Impact: Read-only analysis; identified 2 documentation-drift inconsistencies and 3 real requirement-coverage gaps (FR-018, FR-019, SC-005) plus one security-relevant spec ambiguity (join_code ownership check) before implementation begins.
- 🧪 Tests: None run (analysis only, per command's strictly-read-only constraint).
- 📁 Files: None modified.
- 🔁 Next prompts: User to decide whether to (a) request concrete remediation edits to tasks.md/data-model.md/plan.md/quickstart.md, (b) manually patch tasks.md, or (c) re-run /sp.tasks with the gaps folded in.
- 🧠 Reflection: The migration-numbering drift (I1/I2) is a predictable artifact of /sp.tasks reordering migrations by user-story dependency after /sp.plan had already proposed a linear enums→tables→triggers→RPCs ordering — worth checking for this pattern whenever /sp.tasks runs after /sp.plan on a feature with many migrations.

## Evaluation notes (flywheel)

- Failure modes observed: None in this session; no re-runs needed.
- Graders run and results (PASS/FAIL): N/A — no automated grader invoked for this analysis.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): If the user requests remediation, patch tasks.md's migration filenames to match tasks.md's own actual numbering in plan.md/quickstart.md first (lowest-risk, no new task content), then add C1/C2/C3's missing tasks.
