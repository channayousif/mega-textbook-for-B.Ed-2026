---
id: 0006
title: Tasks licence content tree
stage: tasks
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.tasks
labels: ["spec-015", "tasks", "content-tracks", "refactor-first"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - specs/015-licence-content-tree/tasks.md
tests:
 - npm run check:content (7/7)
 - format validation: 44/44 tasks match the checklist grammar, IDs sequential, zero malformed
---

## Prompt

run /sp.tasks

## Response snapshot

`spec.md` declares no P1/P2/P3 user stories - it is requirements-based (FR-001 to FR-014) because
the feature is infrastructure. Rather than invent stories, derived three increments from the plan's
Phase 2 ordering, which preserves its central property: the refactor is proven on the existing
corpus **before** the licence track exists, so FR-009's byte-identical acceptance cannot be
confounded by the new track.

- **US1 (P1, MVP)** - one definition of where content lives. Eight consumers port to the walker;
  zero behaviour change. Ships alone and is worth shipping alone: it removes six duplicated
  derivations whether or not the licence track ever lands.
- **US2 (P2)** - the licence track exists, renders and is gated. Invisible to users.
- **US3 (P3)** - licence courses become first-class in catalogue and app.

44 tasks across six phases. Tests included, because the spec requests them in substance: FR-009's
acceptance is a before/after comparison and success criterion 2 requires each gate to "fail for the
right reason when deliberately broken", which is a mutation test. T029 spells out all six
mutations rather than leaving "deliberately broken" to interpretation.

Two decisions worth recording:

- **T001 captures a baseline to disk** before anything changes, so FR-009's comparison is
  mechanical rather than remembered. The directory is git-ignored by T002.
- **An explicit ordering constraint** is called out in Dependencies: T021 must not precede T019.
  Adding the licence track before the baseline diff would make a degree regression
  indistinguishable from new-track behaviour, which is the entire reason the plan ordered it this
  way and the easiest thing for an implementer to reorder by accident.

Largest parallel opportunity is Phase 3, where six gate ports touch six different files. The two
most intricate consumers, `validate-content.mjs` and `review-evidence.mjs`, are deliberately left
sequential.

## Outcome

- ✅ Impact: the feature is now executable task by task, with the refactor-before-feature ordering protected by an explicit constraint.
- 🧪 Tests: check:content 7/7; 44/44 tasks match the checklist grammar; IDs sequential; 19 marked parallelisable.
- 📁 Files: specs/015-licence-content-tree/tasks.md (177 lines) plus this PHR.
- 🔁 Next prompts: /sp.implement, starting with Phase 1-2 and stopping at the US1 checkpoint for review.
- 🧠 Reflection: the template assumes user stories and this spec has none. Deriving increments from the plan's own ordering was better than forcing story language onto an infrastructure refactor.

## Evaluation notes (flywheel)

- Failure modes observed: a task template whose primary organisation (user stories) does not fit an infrastructure spec; "deliberately broken" as an acceptance phrase that means nothing without enumerating the mutations.
- Graders run and results (PASS/FAIL): checklist format 44/44 PASS; sequential IDs PASS; every task carries a file path PASS; each story independently testable PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run Phase 1-3 only and confirm the T019 baseline diff is genuinely byte-identical, since that single result decides whether the refactor was safe.
