---
id: 2447
title: EFMP-303 Unit 1 G3 desk-review repair (140ce781)
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/efmp-303-u01-repair_en
user: M Yousif Channa
command: crew job efmp-303-u01-repair_en
labels: [claude, crew, efmp-303, g3-repair]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-01/fig-U1-8.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-8.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.dark.svg
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-01/G2/20261103T183510555Z-gates.json
tests:
  - node scripts/measure-figure-text.mjs fig-U1-8 (4 variants, exit 0, no wordmark collision)
  - npm run check:content (14 of 14 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the three findings of specs/content/efmp-303/reviews/unit-01/G3/20261102T212819Z-g3-desk-140ce781.json:
(1) advisory, stale G1 note: the Unit 1 G1 tracker row now records that G0/G1 intake was approved
under D-2026-0063 (owner-confirmed 2026-10-10, intake-3/evaluation.md) and content-spec.md is
`status: approved`; the row stays unticked for CurriculumOwner formalization;
(2) advisory, fig-U1-8 wordmark overlap: the wordmark baseline moved from y=510 to y=517 in the EN,
dark, UR and UR-dark variants, so it sits below the last panel (ends y=505) inside the 520 viewBox;
measure-figure-text reports no collision;
(3) uncertain, no live render: still not performed, because the crew brief forbids build, dev server
and browser runs. Recorded as pending in the new G3 row.
Appended an unticked G3 advisory repair row, refreshed Unit 1 G2 evidence and appended its tracker row.
The figure manifest (a hashed intake-3 input) was not edited.

## Outcome

- ✅ Impact: two advisory findings resolved; the render finding is carried forward; G3 stays open.
- 🧪 Tests: npm run check:content passes (14/14) after regenerating the gitignored static/content-status.json.
- 📁 Files: 4 fig-U1-8 SVG variants, tracker, new G2 evidence.
- 🔁 Next prompts: fresh independent G3 review of EFMP-303 Unit 1 with 360px and A4 print inspection.
- 🧠 Reflection: SVG edits stale the G2 manifest; commit first, then prepare-gate-evidence needs a clean tree.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U1-8 wordmark moved clear of the last panel (all 4 variants); G1 tracker note reconciled with D-2026-0063; G2 evidence refreshed.
- Decisions the team must respect: G1 row left unticked; only the CurriculumOwner formalizes it.
- Pending / next owner: fresh independent G3 reviewer; rendered 360px and A4 print check on a host that may build; G5 Urdu review still pending.
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: first check:content run flagged a stale G2 manifest and a stale gitignored content-status.json.
- Graders run and results (PASS/FAIL): measure-figure-text PASS; check:content PASS.
- Prompt variant (if applicable): crew repair_en brief.
- Next experiment (smallest change to try): none.
