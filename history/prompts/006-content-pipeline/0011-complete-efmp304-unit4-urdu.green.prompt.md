---
id: 0011
title: Complete EFMP304 Unit4 Urdu
stage: green
date: 2026-10-17
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-304-u04-translate
user: owner
command: .crew/brief.md
labels: [board-direct, crew, translation, efmp-304]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/unit-assessment.mdx
  - static/img/figures/efmp-304/unit-04/fig-U4-1.ur.svg through fig-U4-8.ur.svg and derived dark variants
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/translations/unit-04/handoff.md
tests:
  - npm run check:content (baseline, temporary reviewed, final draft)
  - FIGURE_ROOT=static/img/figures/efmp-304/unit-04 npm run figures:variants:check
  - Direct six-page structural, assessment and alt/desc parity assertions
  - Chromium standalone Urdu SVG geometry and visual inspection
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Completed the existing EFMP-304 Unit 4 Urdu mirror against English commit 65d2428e.
Translated remaining metadata, bound key terms to the frozen bank, localised MCQ labels,
and added eight mirrored Urdu schematics plus derived dark variants. Kept draft status,
recorded the existing G4 row, and documented fresh G5 and full-page render work as pending.

## Outcome

- Impact: Completed the scoped G4 translation artifacts without claiming review certification.
- Tests: All 13 final draft content gates pass; temporary reviewed check flags only open G4/G5 rows.
- Files: Six Urdu pages, sixteen SVG assets, tracker, translation handoff and this PHR.
- Next prompts: Fresh independent G5 and full-page RTL/print inspection.
- Reflection: Draft gates alone omit parity checks, so both indexes were temporarily flipped and restored.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 4 Urdu metadata, bank-bound vocabulary, assessment labels and all eight Urdu figure twins.
- Decisions the team must respect: English baseline and shared bank unchanged; all translation statuses remain draft; no G3/G5 certification or publication changes.
- Pending / next owner: Curriculum owner considers unbanked term proposals; independent G5 reviewer checks changed Urdu inputs and full-page RTL/print rendering.
- Paperclip issues affected: No issue touched. Unit 4 figure work relates to existing TEX-49; other units remain outside scope.

## Evaluation notes (flywheel)

- Failure modes observed: Clean checkout lacks ignored content-status artifact. A proposed English manifest note invalidated G2, so it was removed and the translation record placed in its own handoff.
- Graders run and results (PASS/FAIL): Final check:content PASS; scoped variants PASS; structural assertions PASS; standalone figure geometry PASS. Temporary reviewed pipeline correctly fails open G4/G5 rows.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent G5 review of the committed Urdu bundle, with CI build available for rendered inspection.
