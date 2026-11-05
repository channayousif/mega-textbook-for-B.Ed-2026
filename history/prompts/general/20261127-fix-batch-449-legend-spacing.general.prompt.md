---
id: 20261127
title: Fix Batch 449 Legend Spacing
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 Codex
feature: content-pipeline
branch: crew/batch-20261105-1316
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, ci-fix]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/449
files:
  - static/img/figures/gqur-301/unit-02/fig-U2-3.svg
  - static/img/figures/gqur-301/unit-02/fig-U2-3.dark.svg
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-02/G2/20261105T135028825Z-gates.json
  - specs/content/gqur-301/reviews/unit-02/G2/logs-20261105T135028825Z/
tests:
  - Scoped figures:variants:check PASS
  - Final npm run check:content PASS (14/14 gates)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR 449 checks and failed run 42034498302. The only reported geometry failure is a zero-pixel gap between pie legend entries 2 and 5 in both English variants. Move the right legend column from x=655 to x=675, preserving all labels and chart data.

## Outcome

- Impact: Restored space between legend columns with a four-attribute repair.
- Tests: Scoped dark-variant freshness and all 14 content gates passed.
- Files: English source SVG, derived dark SVG, refreshed G2 evidence and tracker reference.
- Next prompts: CI must confirm browser geometry.
- Reflection: Reuse CI measurements to make a bounded spacing repair.

## Handoff (for CEO and agents)

- Shipped / changed: Shifted two right-column pie legend labels 20 pixels right in both variants; refreshed deterministic G2 evidence against commit 6e8b583ff and updated its latest tracker reference. The historical earlier G2 row remains unchanged.
- Decisions the team must respect: No G3/G5 certification or publication-state changes. No push or PR creation.
- Pending / next owner: CI must run browser geometry; the crew brief prohibits local Playwright and builds.
- Paperclip issues affected: PR 449; no issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Adjacent legend labels touched at x=655; duplicate historical tracker rows require updating the latest row. The local generated status report required regeneration; the baseline checkout also lacked that ignored artifact.
- Graders run and results (PASS/FAIL): Scoped variant freshness PASS; final content gates PASS (14/14).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Rerun CI figure-geometry on the committed repair.
