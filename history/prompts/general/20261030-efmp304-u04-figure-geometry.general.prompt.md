---
id: 20261030
title: Repair EFMP-304 Unit 4 figure geometry
stage: general
date: 2026-10-27
surface: cli
model: gpt-6
feature: content
branch: crew/efmp-304-u04-fix
user: owner
command: Read .crew/brief.md
labels: [codex, crew, figure-geometry]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-304/unit-04/fig-U4-5.svg
  - static/img/figures/efmp-304/unit-04/fig-U4-5.dark.svg
  - static/img/figures/efmp-304/unit-04/fig-U4-7.svg
  - static/img/figures/efmp-304/unit-04/fig-U4-7.dark.svg
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-04/G2/
tests:
  - SVG geometry measurement: all 32 unit sources and variants passed
  - Visible wording comparison: passed
  - Content gates: final verification after G2 refresh
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired figure 5 wordmark anchoring and figure 7 table wrapping and row padding. Regenerated dark variants. Refresh G2 after the repair commit, record stale G3, and rerun content gates.

## Outcome

- ✅ Impact: Removed all 16 reported geometry failures without changing wording.
- 🧪 Tests: All 32 SVG assets measure cleanly; wording comparison passes. Final content run follows refreshed G2 evidence.
- 📁 Files: Two light SVGs, their generated dark twins, G2 evidence and tracker.
- 🔁 Next prompts: Independent G3 review, followed by dependent G5 review.
- 🧠 Reflection: CSS text anchoring overrides presentation attributes; wrapping requires adequate row height.

## Handoff (for CEO and agents)

- Shipped / changed: Figure geometry repairs and regenerated variants; fresh G2 evidence is prepared after committing inputs.
- Decisions the team must respect: Preserve all English and Urdu wording, viewBoxes, prose and review status.
- Pending / next owner: Curriculum owner arranges fresh independent G3 and dependent G5.
- Paperclip issues affected: EFMP-304 Unit 4; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial content run identified stale G2 evidence and an intermediate generated variant, addressed before final verification.
- Graders run and results (PASS/FAIL): Geometry PASS; wording preservation PASS; final content results recorded in completion commit.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No further geometry change planned.
