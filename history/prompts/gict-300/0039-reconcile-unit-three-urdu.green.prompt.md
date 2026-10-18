---
id: 0039
title: Reconcile Unit Three Urdu
stage: green
date: 2026-10-18
surface: agent
model: GPT-6 (Codex)
feature: gict-300
branch: crew/gict-300-u03-translate
user: board
command: crew brief implementation
labels: ["board-direct", "gict-300", "translation", "G4"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/unit-teacher-notes.mdx
  - specs/content/gict-300/tasks.md
  - static/img/figures/gict-300/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/gict-300/unit-03/fig-U3-1.ur.svg
  - static/img/figures/gict-300/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/gict-300/unit-03/fig-U3-3.ur.svg
  - static/img/figures/gict-300/unit-03/fig-U3-5.ur.dark.svg
  - static/img/figures/gict-300/unit-03/fig-U3-5.ur.svg
  - static/img/figures/gict-300/unit-03/fig-U3-6.ur.dark.svg
  - static/img/figures/gict-300/unit-03/fig-U3-6.ur.svg
  - static/img/figures/gict-300/unit-03/fig-U3-7.ur.dark.svg
  - static/img/figures/gict-300/unit-03/fig-U3-7.ur.svg
  - static/img/figures/gict-300/unit-03/fig-U3-8.ur.dark.svg
  - static/img/figures/gict-300/unit-03/fig-U3-8.ur.svg
  - specs/content/gict-300/translation/unit-03-handoff.md
  - history/prompts/gict-300/0039-reconcile-unit-three-urdu.green.prompt.md
tests:
  - npm run check:content (initial and final draft runs)
  - npm run check:content (temporary reviewed parity diagnostic, restored)
  - npm run build:content-status (regenerate ignored local report after G4 tracker change)
  - npm run figures:variants:check
  - Direct EN/UR metadata, heading, component, glossary, URL and assessment comparison
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Resumed the existing seven-file Urdu mirror, repaired semantic/register/reference defects, reconciled Urdu figure descriptions and labels, regenerated affected dark variants, bound key_terms to accepted terminology, and recorded G4 in progress with a translation handoff. All translation statuses remain draft. Committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Unit 3 Urdu mirror reconciled to English baseline 02ec0cff; no review certification claimed.
- 🧪 Tests: All 13 draft content gates and global dark freshness passed. The temporary reviewed check exposed only incomplete G4/G5 rows and generated status-report staleness; structural and terminology parity passed.
- 📁 Files: Seven Urdu MDX files, six Urdu SVGs and their derived dark twins, Unit 3 G4 tracker row, handoff and PHR.
- 🔁 Next prompts: Fresh independent G3/G5 dependency validation and rendered Urdu inspection; owner terminology decisions.
- 🧠 Reflection: Existing translations needed semantic comparison even with passing draft gates. The brief prohibits builds and dev servers, so rendering remains explicitly unverified.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired complete Urdu mirror, figure labels and descriptions; recorded G4 progress and detailed handoff at specs/content/gict-300/translation/unit-03-handoff.md.
- Decisions the team must respect: Keep translation_status draft. G4 progress is not certification. Leave G3/G5, English content and frozen bank unchanged. Retain 13 unbanked concept-label proposals in the handoff rather than declaring them accepted key_terms.
- Pending / next owner: Review owner: fresh G3 prerequisite and G5 with desktop, narrow and A4 rendering; curriculum owner: 13 proposed operating-system terms.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Temporary reviewed flag activates G4/G5 completion enforcement and changes generated status expectations. A finally block restored original draft bytes. The G4 progress change also required regeneration of the ignored local content-status report before the final draft rerun.
- Graders run and results (PASS/FAIL): PASS: final draft content gates, dark freshness, direct parity comparison and diff whitespace. EXPECTED FAIL: reviewed diagnostic completion claims. NOT RUN: build/render under explicit crew restriction.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent reviewer inspects the repaired frozen bundle without translator reasoning.
