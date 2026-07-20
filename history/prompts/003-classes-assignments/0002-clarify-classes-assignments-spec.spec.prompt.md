---
id: 0002
title: Clarify classes/assignments spec
stage: spec
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "spec", "classes-assignments"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/spec.md
tests:
 - none (spec-stage clarification; no code changes)
---

## Prompt

(No additional user input provided — `/sp.clarify` invoked with empty arguments to run the standard clarification workflow against the current feature spec on branch `003-classes-assignments`.)

## Response snapshot

Ran the `/sp.clarify` ambiguity scan against `specs/003-classes-assignments/spec.md` (which already had 2 clarifications resolved from a prior session). Identified 5 high-impact gaps via taxonomy coverage scan and asked them sequentially:

1. **Resubmission** — Can a student edit/resubmit before grading or only before the due date? → User: editable/resubmittable any time before the due date; new submission overwrites the prior one (no version history); locked once the due date passes.
2. **Quiz retakes** — Single attempt, best-of-many, or latest-of-many? → User: unlimited retakes before the due date; highest (best) score is the score of record.
3. **Archive reversibility** — Is archiving (manual FR-015 or automatic FR-020) permanent or reversible? → User: both reversible; eligible teacher or admin can reactivate; an auto-archived class (role change/suspension) can only be reactivated by an admin, not the ineligible former teacher.
4. **Unpublish** — Can a teacher hide a published assignment again, and under what conditions? → User: always allowed regardless of submissions; students lose visibility of the assignment and their own submission/grade until republished; nothing is deleted.
5. **SC-005 performance target** — What does "no noticeable slowdown" at 200 students mean numerically? → User: under 5 seconds at p95 for submit/grading-queue/roster actions.

Integrated each answer incrementally into the spec: added 5 new bullets under `## Clarifications > ### Session 2026-07-19`; updated FR-005, FR-007, FR-015, FR-017, FR-020; updated Key Entities (Class, Assignment, Submission, Quiz item, added new **Quiz attempt** entity); added 2 new Edge Cases bullets (reactivation, unpublish); reworded SC-005 with the quantified p95 target. Saved after each integration. Final validation pass confirmed no unresolved placeholders, no duplicate/contradictory statements, and consistent terminology throughout.

Reported a coverage summary (all taxonomy categories Clear/Resolved except Reliability/Observability, deferred to `/sp.plan` as low-impact) and recommended proceeding to `/sp.plan`.

## Outcome

- ✅ Impact: Closed 5 material spec ambiguities (resubmission behavior, quiz retake scoring, archive reversibility, assignment unpublish lifecycle, and a quantified performance SLA) that would otherwise have caused rework at planning/implementation time. Spec is now clarify-complete (7 total Q&As across 2 sessions, at the 5-question session cap).
- 🧪 Tests: None run — spec-only change, no code/tests affected at this stage.
- 📁 Files: `specs/003-classes-assignments/spec.md` (Clarifications section, FR-005/007/015/017/020, Key Entities, Edge Cases, SC-005).
- 🔁 Next prompts: `/sp.plan` to generate the implementation plan for 003-classes-assignments.
- 🧠 Reflection: Spec already had solid coverage from a prior session; remaining gaps clustered around state-machine edge cases (resubmit/retake/unpublish/reactivate) that acceptance scenarios didn't explicitly walk through — worth checking for this pattern (implicit reversibility/repeatability of user actions) earlier in future spec-writing passes.

## Evaluation notes (flywheel)

- Failure modes observed: None during this session — all 5 questions were answered on the first pass without disambiguation retries.
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for spec-clarification stage).
- Prompt variant (if applicable): Standard `/sp.clarify` taxonomy-scan flow, unmodified.
- Next experiment (smallest change to try): N/A.
