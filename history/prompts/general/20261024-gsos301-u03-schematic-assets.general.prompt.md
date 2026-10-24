---
id: 20261024
title: Render GSOS-301 Unit 3 schematics
stage: general
date: 2026-10-24
surface: CLI
model: gpt-6
feature: 009-figure-rendering
branch: crew/gsos-301-u03-figures
user: crew
command: crew brief
labels: [codex]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gsos-301/unit-03/
  - specs/content/gsos-301/figures/unit-03.md
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-03/G2/
  - static/content-status.json
tests:
  - npm run check:content
  - npm run figures:variants:check
  - scripts/heavy.sh npm test -- tests/unit/figure-palette.test.mjs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Created four English schematics, four mirrored Urdu schematics and eight generated dark variants. Reconciled prompt-only manifest rows with existing English Figure carriers. Preserved figure prompts, English alt text and course prose. Refreshed deterministic G2 evidence after committing the bound inputs.

## Outcome

- Impact: Missing schematic assets supplied at existing placements.
- Tests: Content gates, palette tests and dark freshness checks; browser and build checks excluded by brief.
- Files: Unit 3 figure assets, manifest, G2 evidence and derived status.
- Next prompts: Urdu author wires assets when Unit 3 translation resumes.
- Reflection: Existing Figure carriers referenced missing assets despite prompt-only manifest rows.

## Handoff (for CEO and agents)

- Shipped / changed: Four bilingual schematics with light and dark assets.
- Decisions the team must respect: Existing author-owned role terminology retained; no pedagogical certification or G3/G5 status change.
- Pending / next owner: English author resolves advisory review findings; Urdu translator creates missing Unit 3 carriers and verifies localized descriptions. Browser text measurement and site inspection remain for an authorized browser session.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Figure edits stale G2 input evidence and derived content status. Sharp requires token substitution in temporary previews; committed SVG tokens preserved.
- Graders run and results (PASS/FAIL): Palette 46/46 PASS; figure structural and variant checks PASS; all 13 final content gates PASS.
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): Review the assets in the site after translation resumes.
