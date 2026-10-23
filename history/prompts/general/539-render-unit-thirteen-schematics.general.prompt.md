---
id: 539
title: Render unit thirteen schematics
stage: general
date: 2026-10-23
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/gqur-301-u13-figures
user: board
command: crew brief
labels: [board-direct, figures, gqur-301]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-301/unit-13/
  - specs/content/gqur-301/figures/unit-13.md
  - specs/content/gqur-301/reviews/unit-13/figure-validation/
  - specs/content/gqur-301/reviews/unit-13/G2/
  - specs/content/gqur-301/tasks.md
tests:
  - npm run check:content (compared with origin/main)
  - npm run check:figures
  - FIGURE_ROOT=static/img/figures/gqur-301/unit-13 npm run figures:variants:check
  - scripts/heavy.sh npm test -- tests/unit/figure-palette.test.mjs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Rendered four planned schematic figures with Urdu and dark variants, preserved existing English placements and authored inputs, and refreshed deterministic evidence. No build, browser, push or PR.

## Outcome

- Impact: Four missing schematic assets delivered in both languages and palettes.
- Tests: Figure gate, dark freshness and 46 palette assertions pass; content checks compared with main.
- Files: Sixteen SVGs, figure manifest, production validation records and deterministic G2 refresh.
- Next prompts: Translation owner places Urdu figures when the blocked Unit 13 translation proceeds.
- Reflection: Existing Figure carriers had no assets; completed their lifecycle rather than rewriting prose.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 13 English and Urdu schematics with theme variants.
- Decisions the team must respect: Preserve prompts, alt text and English placements; no G3/G5 certification.
- Pending / next owner: Translation owner must wire assets into absent Urdu topics. Separate author/reviewer owns existing G3 defects. Site rendering remains for a permitted follow-up.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Existing missing assets and prompt-only manifest; asset changes invalidate G2 evidence. Main already has stale content-status output.
- Graders run and results (PASS/FAIL): 46 palette tests PASS; figure and variant checks PASS; content baseline comparison recorded in figure-validation.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Review Urdu asset labels with the translated topics once available.
