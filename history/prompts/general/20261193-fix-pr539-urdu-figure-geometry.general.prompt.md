---
id: 20261193
title: Fix PR539 Urdu figure text geometry
stage: general
date: 2026-11-11
surface: agy
model: gemini-3.8-flash
feature: efpg-401
branch: crew/batch-20261110-2101
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: [agy, crew, ci-fix, efpg-401]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/539
files:
  - static/img/figures/efpg-401/unit-07/fig-U7-4.ur.svg
  - static/img/figures/efpg-401/unit-07/fig-U7-4.ur.dark.svg
  - history/prompts/general/20261193-fix-pr539-urdu-figure-geometry.general.prompt.md
tests:
  - npm run check:content (14/14 gates PASS)
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-401/unit-07/fig-U7-4.ur.svg static/img/figures/efpg-401/unit-07/fig-U7-4.ur.dark.svg (PASS)
  - node scripts/build-figure-variants.mjs --check (1366 figures PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR #539 checks and failed CI run 42901046182 (figure-geometry). CI failed on `fig-U7-4.ur.svg` and `fig-U7-4.ur.dark.svg` with an overlap of 57.8px between "0-3 نمبر" and "4. گرامر اور املا (Grammar and spelling)". Shortened the parenthetical English technical term to `(Grammar)` matching the single-word pattern used in the other three criteria (`(Content)`, `(Organisation)`, `(Vocabulary)`), and reduced `.sh` from 14px to 13px in both light and dark variants. Both SVGs now pass with generous clearance under local and CI fallback font configurations.

## Outcome

- ✅ Impact: Minimal repair resolving CI figure-geometry collision; all educational meaning and structure preserved.
- 🧪 Tests: All 14 content gates pass; measure-figure-text passes on both edited SVGs; build-figure-variants check OK.
- 📁 Files: Two SVG files and this PHR.
- 🔁 Next prompts: CI figure-geometry will verify the repair on PR update.
- 🧠 Reflection: CI fallback font metrics for mixed Urdu/English text require compact parentheticals and 13px subheadings to avoid box-width collisions.

## Handoff (for CEO and agents)

- Shipped / changed: Updated Criterion 4 label to `4. گرامر اور املا (Grammar)` and reduced `.sh` font size to 13px in `fig-U7-4.ur.svg` and `fig-U7-4.ur.dark.svg`.
- Decisions the team must respect: No G3/G5 status, publication state, reviewer registry or evidence changes. No push and no PR opened. Zero em dashes used.
- Pending / next owner: CI figure-geometry check on PR #539.
- Paperclip issues affected: PR #539; crew job batch-20261110-2101-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: Criterion 4 heading overflowed horizontal panel space in CI's fallback font, overlapping the marks label by 57.8px.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS; build-figure-variants --check PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): Confirm PR #539 CI passes.
