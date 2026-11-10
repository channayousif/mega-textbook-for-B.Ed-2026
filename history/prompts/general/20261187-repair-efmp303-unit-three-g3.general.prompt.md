---
id: 20261187
title: Repair EFMP-303 Unit 3 from the latest G3 report
stage: general
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u03-repair_en-r1
user: crew
command: opencode worker on .crew/brief.md
labels: ["crew", "opencode", "efmp-303", "unit-03", "g3-repair"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: history/adr/0019-agent-review-independence.md
  pr: null
files:
  - specs/content/efmp-303/figures/unit-03.md
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-03/G2/20261109T235850396Z-gates.json
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-bloom-bands.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-concept-graph.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-depth-gate.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-docs-sync.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-figures.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-no-answer-keys.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-no-em-dash.txt
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/validate-content.txt
  - static/img/figures/efmp-303/unit-03/fig-U3-3.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-3.dark.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-5.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-5.dark.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.dark.svg
  - history/prompts/general/20261187-repair-efmp303-unit-three-g3.general.prompt.md
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-303/unit-03/fig-U3-3.svg static/img/figures/efmp-303/unit-03/fig-U3-5.svg static/img/figures/efmp-303/unit-03/fig-U3-3.ur.svg static/img/figures/efmp-303/unit-03/fig-U3-5.ur.svg
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of the latest G3 report (20261108T203238Z-g3-desk-d0b970f8.json) to EFMP-303 Unit 3. Verified every finding against current bytes: findings 2-7 were already repaired on main by earlier jobs (fig-U3-2 redesigned with verified Vision 2025 values and clean geometry; strategic-planning text, figure, teacher notes and RRQ 9 aligned; source passages, retrieval dates and claim boundaries recorded; MCQ labels and RRQ 2/7 marking repaired; concept and coverage mappings corrected; worked examples and the offline provided passage in place). Repaired the one residual blocking finding: fig-U3-3 and fig-U3-5 were redrawn so the boxes read 1-2-3 on the top row and 4-5-6 on the bottom row, with an explicit wrap arrow from stage 3 to stage 4 and, in U3-3, a dashed outer feedback loop from stage 6 back to stage 1. EN, UR and dark variants updated; the figure manifest repair record and the Unit 3 G3 tracker row appended. Refreshed the Unit 3 G2 evidence because the figure edit invalidated its input manifest.

## Outcome

- ✅ Impact: EFMP-303 Unit 3 G3 finding 1 resolved; all 14 content gates pass.
- 🧪 Tests: `npm run check:content` all 14 gates pass; `measure-figure-text.mjs` exits 0 for fig-U3-3, fig-U3-5 and their UR/dark variants.
- 📁 Files: 8 figure files, figure manifest, tracker, refreshed G2 evidence and this PHR.
- 🔁 Next prompts: fresh independent G3 review of Unit 3 after owner authorisation (ADR-0019).
- 🧠 Reflection: the latest G3 report was run against a pre-repair state for findings 2-7; always diff the report input manifest against current bytes before editing.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U3-3 and fig-U3-5 redrawn to reading order 1-2-3 / 4-5-6 with an explicit wrap arrow and a dashed outer feedback loop from stage 6 to stage 1 in U3-3 (EN, UR and dark variants); figure manifest repair record updated; Unit 3 G3 tracker row appended; G2 evidence refreshed and tracker repointed.
- Decisions the team must respect: G3 stays unticked and advisory; findings 2-7 were verified already repaired on main; finding 8 (review prerequisites and presentation) remains an owner action.
- Pending / next owner: fresh independent G3 with blind solving before keys, author provenance, parent-frozen handoff, current page renders and owner G1 reconciliation.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: stale review reports describe a pre-repair state; diff the report input manifest against current bytes.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS; `measure-figure-text.mjs` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
