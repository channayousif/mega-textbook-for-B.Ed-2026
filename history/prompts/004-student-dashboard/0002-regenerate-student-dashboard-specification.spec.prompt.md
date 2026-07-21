---
id: 0002
title: Regenerate student dashboard specification
stage: spec
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.specify
labels: [spec, student-dashboard, progress, achievements, history, bilingual]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-student-dashboard/spec.md (overwritten)
  - specs/004-student-dashboard/checklists/requirements.md (overwritten)
tests:
  - "Spec quality checklist: 16/16 items pass on first validation iteration"
  - "Zero [NEEDS CLARIFICATION] markers — all candidate ambiguities had low-risk defaults, recorded under Assumptions"
---

## Prompt

start spec 004 student dashboard @SDD/004-student-dashboard.md

## Response snapshot

Found that `004-student-dashboard` already had a complete, validated spec from an earlier session
(narrower scope: read-only aggregation of Spec 003 data only, no progress/achievements/history).
Asked the user how to proceed given the existing work; they chose to regenerate from scratch using
the actual source brief at `SDD/004-student-dashboard.md`, which describes a materially larger
feature than the prior draft.

Rewrote `spec.md` in full from that source brief, translating its D1–D7 user stories and SD1–SD7
functional requirements into business-language spec sections (stripping implementation notes:
route path `/app/student`, DB triggers/edge functions, CSS/SVG-only chart rendering, migration
numbering — all deferred to `/sp.plan`):

- **US1 (P1)** — dashboard home: semester, classes, due-soon work, recent grades, above-the-fold
  on mobile.
- **US2 (P1)** — Grades area: every mark, explicitly never a class/cohort average.
- **US3 (P2)** — Progress: per-course unit coverage fraction + semester-level coverage share.
- **US4 (P2)** — self-marking a unit studied (dashboard + book page), idempotent, no double-count
  across self-mark/assignment/quiz.
- **US5 (P2)** — History: frozen, read-only past-semester record grouped by term.
- **US6 (P3)** — achievements: 4 starter milestones, awarded exactly once per student.
- 12 FRs, 3 key entities (Unit Progress, Achievement catalog, Student Achievement), 7 SCs
  (including isolation and one-handed-mobile-usability criteria), 9 edge cases.
- Zero clarification markers; used Assumptions for study-streak definition, recent-grades count
  on overview (5), unit-totals sourced from Spec 001, and the explicit "no class average" rule
  from the source brief.

Rewrote the quality checklist: 16/16 pass, with notes explaining the scope change from the prior
draft and flagging the streak-definition default as the one most worth `/sp.clarify` attention.

## Outcome

- ✅ Impact: Spec 004 now reflects the full source brief's scope (5 areas + achievements) instead
  of the earlier session's narrower aggregation-only draft; planning-ready.
- 🧪 Tests: quality checklist 16/16 on first iteration; zero clarification markers outstanding.
- 📁 Files: spec.md + checklists/requirements.md under specs/004-student-dashboard/ (both
  overwritten, superseding PHR 0001's narrower version).
- 🔁 Next prompts: `/sp.clarify` (recommended — streak definition is the default most likely to
  need an explicit owner call) or straight to `/sp.plan`.
- 🧠 Reflection: worth flagging to the user that this spec is now materially bigger than the one
  PHR 0001 described (adds Progress, self-marking, History, and Achievements) — plan/tasks sizing
  should account for that before committing to a single-PR delivery like Spec 003's US1+US2 slice.

## Evaluation notes (flywheel)

- Failure modes observed: none — the pre-existing spec was caught before being silently
  overwritten by re-running the same command blind; user was asked explicitly before regenerating.
- Graders run and results (PASS/FAIL): spec quality checklist — PASS (16/16, first iteration).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none — proceed to clarify/plan.
