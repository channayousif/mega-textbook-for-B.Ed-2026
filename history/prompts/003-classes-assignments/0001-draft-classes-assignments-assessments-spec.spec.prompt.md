---
id: 0001
title: Draft classes assignments assessments spec
stage: spec
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.specify
labels: ["spec", "classes", "assignments", "grading", "quizzes"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/spec.md
 - specs/003-classes-assignments/checklists/requirements.md
tests:
 - "n/a — specification artifact, no code"
---

## Prompt

create feature specs from  @SDD/003-classes-assignments.md and @SDD/ROADMAP.md

## Response snapshot

`check-prerequisites.sh --json` requires a `NNN-feature-name` branch and failed on `main` (both
prior features already merged). Created branch `003-classes-assignments` via
`create-new-feature.sh` (auto-detected number 003, matching both the existing 001/002 sequence
and the source SDD doc's own numbering).

Read `SDD/003-classes-assignments.md` (the internal, schema-oriented engineering draft — tables,
RLS matrix, migration plan) and `SDD/ROADMAP.md` (architecture picture, build-order, locked
decisions) and translated the engineering content into a stakeholder-facing spec: 6 prioritized,
independently-testable user stories (class setup/enrollment, assign-and-submit, grade-and-return,
answer-key access, gradebook export, auto-graded quizzes — P1/P1/P1/P2/P2/P3), 21 functional
requirements, 7 technology-agnostic success criteria, and a Key Entities section, stripping
implementation specifics (table names, RLS, Storage buckets) while preserving every real business
rule.

Found exactly 2 genuine ambiguities meeting the "no reasonable default exists, real scope impact"
bar (out of many candidates considered and rejected as having clear defaults — co-teaching,
join-code security model, submission edit/delete semantics, archived-class behavior, file-type
specifics — all recorded under Assumptions instead): (1) what happens to a class if an admin
changes/suspends its owning teacher mid-term — explicitly flagged by Spec 002's own spec.md as
deferred to this feature, not something invented here; (2) whether auto-graded MCQ scoring is
formative-only (matching the SDD source's literal wording) or available to any assignment type.
Presented both via `AskUserQuestion` with a recommended option each; owner chose "auto-archive"
for (1) and "any assignment type, including summative" for (2). Updated FR-020/FR-021 in place,
added a `## Clarifications` section (matching Spec 002's established convention), and re-verified
zero `[NEEDS CLARIFICATION]` markers remain before finalizing.

Generated the Specification Quality Checklist per the command's own literal structure; all items
now pass.

## Outcome

- ✅ Impact: Spec 003 (Virtual Classes, Assignments & Assessments) is fully drafted, clarified,
  and ready for `/sp.plan` — closing two items Spec 002 explicitly left open for this feature
  (teacher-role-change handling; deleted-student gradebook anonymisation) in the same pass.
- 🧪 Tests: n/a (specification artifact).
- 📁 Files: `specs/003-classes-assignments/spec.md`, `specs/003-classes-assignments/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan` to produce the implementation plan; `/sp.tasks` after that.
- 🧠 Reflection: the source SDD document was unusually mature/precise for a "raw feature
  description" (a full schema, RLS matrix, and acceptance criteria already existed) — most of the
  spec-writing effort went into finding the genuine remaining gaps rather than filling obvious
  ones, and into deliberately translating implementation-shaped source content (table/column
  names, RLS policies) into WHAT/WHY language without losing precision.

## Evaluation notes (flywheel)

- Failure modes observed: none — `check-prerequisites.sh`'s branch requirement was a known,
  cleanly-handled constraint (main branch, both prior features merged), not a defect.
- Graders run and results (PASS/FAIL): Specification Quality Checklist — all items PASS after
  the clarification round.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
