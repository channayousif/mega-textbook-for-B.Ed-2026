---
id: 0028
title: Fix EFMP-301 Unit 6 figure text-geometry overflows
stage: general
date: 2026-10-27T05:45:00Z
surface: opencode
model: longcat/LongCat-2.0
feature: null
branch: crew/efmp-301-u06-fix
user: crew
command: .crew/brief.md job efmp-301-u06-fix
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-06/fig-U6-1.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-1.dark.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-2.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-2.dark.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-3.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-3.dark.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-4.svg
  - static/img/figures/efmp-301/unit-06/fig-U6-4.dark.svg
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-06/G2/20261027T054219823Z-gates.json
tests:
  - scripts/measure-figure-text.mjs (all 8 SVGs pass)
  - npm run check:content (all 13 gates pass)
  - npm run figures:variants (4 dark variants written)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

Crew job efmp-301-u06-fix: fix 9 text-geometry problems across 4 SVGs in EFMP-301 Unit 6. Follow generate-figures svg-authoring "Fit and spacing" guidance. Measure with measure-figure-text.mjs until exit 0, regenerate dark variants, then run prepare-gate-evidence.mjs and update tasks.md.

## Response snapshot

Identified 9 issues via measure-figure-text.mjs: fig-U6-1.svg had 6 (overlap + 5 spills from 118px panels too narrow for 14-17 char labels at 14px), fig-U6-2.svg had 1 (3.1px gap between neighboring table cells), fig-U6-3.svg had 1 (36.1px spill from a panel too short for its label), fig-U6-4.svg had 1 (16.2px overlap between table cells in adjacent columns).

Fix strategy for fig-U6-1: widened all five Maslow step panels from 118px to 148px and reduced the body class from 14px to 13px so every label fits within its panel without wrapping or overlap. Shifted all internal coordinates (text, icons, paths) by each panel's delta. Moved the y-axis arrow from x=100 to x=10 (clear of the widened panels) and extended the grid line to span the new panel area.

For fig-U6-2: wrapped "the midday meal that changed" to two lines ("the midday meal" / "that changed") and shifted "Class 3's afternoons" down to y=137.

For fig-U6-3: wrapped "the next attempt follows expectation" to two lines and grew the panel from height=70 to height=90.

For fig-U6-4: wrapped "the demonstration jar, the story" to two lines and shifted "that starts on their street" down to y=261.

Dark variants regenerated via `npm run figures:variants`. All 8 light/ur SVGs pass measure-figure-text.mjs. G2 evidence regenerated and committed the new hash; tasks.md G2 row pointed at the new gates file and G3 row flagged stale.

## Outcome

- ✅ Impact: All 9 text-geometry defects resolved; all 8 EFMP-301 Unit 6 SVGs (light + ur) pass measure-figure-text.mjs; all 13 content gates pass.
- 🧪 Tests: measure-figure-text.mjs exits 0 for all 8 SVGs; npm run check:content all 13 gates pass; npm run figures:variants regenerates 4 dark variants.
- 📁 Files: 8 SVG files modified (4 light + 4 dark), tasks.md updated (G2 gates ref + G3 stale note), new G2 gates evidence file written.
- 🔠 Next prompts: G3 en-review for EFMP-301 Unit 6 needs a fresh run (flagged stale in tasks.md).
- 🧠 Reflection: Widening panels + a 1px font reduction avoided the vertical reflow that wrapping would have triggered in the Maslow pyramid (where all five steps share a baseline); for the tables, wrapping was the right call since rows can grow independently.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-301 Unit 6 SVGs (fig-U6-1 through fig-U6-4, light + dark) repaired for text-geometry; G2 en-draft re-certified; G3 en-review marked stale.
- Decisions the team must respect: fig-U6-1 body font is now 13px (not 14px) to fit the widened 148px panels; do not re-widen or re-shrink without re-measuring.
- Pending / next owner: G3 en-review for EFMP-301 Unit 6 needs a fresh independent run; owner to schedule after this PR lands.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: None new; confirmed that 118px panels are too narrow for 16-17 char labels at 14px - a pattern to check in future figure authoring.
- Graders run and results (PASS/FAIL): measure-figure-text.mjs PASS; check:content PASS (13/13).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
