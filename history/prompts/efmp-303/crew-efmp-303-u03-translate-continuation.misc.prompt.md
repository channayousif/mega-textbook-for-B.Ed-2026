---
id: crew-efmp-303-u03-translate-continuation
title: Complete Unit Three Urdu Mirror
stage: misc
date: 2026-10-18
surface: agent
model: gpt-6
feature: efmp-303
branch: crew/efmp-303-u03-translate
user: board
command: execute .crew/brief.md
labels: [board-direct, crew, translation, efmp-303]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/
  - static/img/figures/efmp-303/unit-03/
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/translations/unit-03/
  - history/prompts/efmp-303/crew-efmp-303-u03-translate-continuation.misc.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
  - temporary reviewed conditional parity check, flags restored
  - npm run figures:variants:check
  - structural parity and frozen terminology assertions
  - Chromium figure inspection with local Nastaliq font through scripts/heavy.sh
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing six-page Urdu translation, repaired corrupt text and a reversed scenario, supplied six Urdu SVGs and generated dark variants, and documented draft handoff and deterministic checks. Generated the ignored content-status report before validation. No build, server, push or PR.

## Outcome

- Impact: Complete draft mirror with figure dependencies and terminology proposals recorded.
- Tests: All 13 content gates pass on main and the final draft branch; structural and figure variant checks pass. Conditional checks expose only intentionally open review stages and temporary status-report freshness.
- Files: Six Urdu pages, twelve SVGs, Unit 3 tracker notes, local translation evidence and this PHR.
- Next prompts: Content owner repairs G3 findings, render host inspects full Urdu pages, independent reviewer handles G5.
- Reflection: Draft status hides conditional parity checks; temporarily exercising them found missing figure dependencies and description mismatches.

## Handoff (for CEO and agents)

- Shipped / changed: Finished the prior translation commit's missing Urdu figures, repaired translation defects and recorded source-bound handoff.
- Decisions the team must respect: Frozen terminology unchanged; translation_status stays draft; tracker stages remain open per translate-unit Step 7; no self-certification.
- Pending / next owner: Content owner handles existing English G3 findings and terminology proposals. Render host and fresh independent G5 reviewer handle page/print and semantic acceptance after source repairs.
- Paperclip issues affected: None identified; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Ignored generated report absent in fresh checkout; conditional parity disabled for draft; garbled prose and worst/best reversal in earlier attempt.
- Graders run and results (PASS/FAIL): Final content gates PASS, main content gates PASS, structural parity PASS, figure variants PASS. Temporary reviewed run FAIL only for open G4/G5 rows and transient content-status freshness; flags restored.
- Prompt variant (if applicable): Crew brief continuation.
- Next experiment (smallest change to try): Obtain permitted full-page narrow/A4 inspection after English repair freeze.
