---
id: 2482
title: Merge course tracker summary status
stage: general
date: 2026-11-15
surface: agent
model: GPT-6 Codex
feature: maintenance-2026-W46
branch: crew/maint-2026-w46-m1
user: owner
command: crew maint_refactor M1
labels: ["codex", "maintenance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/batch.mjs
  - scripts/crew/crew.mjs
  - tests/crew/batch.test.mjs
  - history/prompts/general/2482-merge-course-tracker-summary-status.general.prompt.md
tests:
  - "node --test tests/crew/*.test.mjs: 119 baseline tests passed; 114 final tests passed"
  - "npm run build:content-status followed by npm run check:content: all 14 gates passed"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Implemented M1 summary row keys and atomic status block merging; removed the unused append-only merger and its tests. Added EFPG-401-shaped regression cases. No push or PR requested.

## Outcome

- ✅ Impact: Parallel unit author changes merge across summary and stage tables while competing summary edits remain conflicts.
- 🧪 Tests: Crew tests pass before and after. All 14 content gates passed.
- 📁 Files: Batch merge helper, dispatcher documentation comment, regression tests and this required PHR.
- 🔁 Next prompts: Independent crew maintenance review.
- 🧠 Reflection: Treat the status heading and following prose as one block to avoid mixing summaries from different authors.

## Handoff (for CEO and agents)

- Shipped / changed: Unit-only summary row keys, atomic status resolution, obsolete helper removal and regression coverage.
- Decisions the team must respect: Only status blocks prefer ours on competing edits. Other row conflicts still return null. Glossary handling and the five-fix ceiling remain unchanged.
- Pending / next owner: Owner review required for protected scripts; dispatcher owns PR creation.
- Paperclip issues affected: 2026-W46 M1; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Existing stage-only matching omitted new-course summary rows and treated status changes as plain-line conflicts.
- Graders run and results (PASS/FAIL): PASS: baseline 119 crew tests and final 114 crew tests; all 14 content gates passed.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent review of the bounded maintenance diff.
