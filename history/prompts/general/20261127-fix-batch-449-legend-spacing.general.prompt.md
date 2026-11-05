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
tests:
  - Scoped figures:variants:check PASS
  - check:content pending
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR 449 checks and failed run 42034498302. The only reported geometry failure is a zero-pixel gap between pie legend entries 2 and 5 in both English variants. Move the right legend column from x=655 to x=675, preserving all labels and chart data.

## Outcome

- Impact: Restored space between legend columns with a four-attribute repair.
- Tests: Scoped dark-variant freshness passed; content gates pending.
- Files: English source SVG and derived dark SVG.
- Next prompts: CI must confirm browser geometry.
- Reflection: Reuse CI measurements to make a bounded spacing repair.

## Handoff (for CEO and agents)

- Shipped / changed: Shifted two right-column pie legend labels 20 pixels right in both variants.
- Decisions the team must respect: No G3/G5 certification or publication-state changes. No push or PR creation.
- Pending / next owner: CI must run browser geometry; the crew brief prohibits local Playwright and builds.
- Paperclip issues affected: PR 449; no issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Adjacent legend labels touched at x=655.
- Graders run and results (PASS/FAIL): Scoped variant freshness PASS; content gates pending.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Rerun CI figure-geometry on the committed repair.
