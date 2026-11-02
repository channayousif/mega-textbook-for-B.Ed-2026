---
id: 20261105
title: Translate EFMP406 Unit Five
stage: general
date: 2026-11-02
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/efmp-406-u05-translate
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "efmp-406", "translation"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/unit-teacher-notes.mdx
  - specs/content/efmp-406/translations/unit-05/handoff.md
  - static/img/figures/efmp-406/unit-05/fig-U5-1.ur.dark.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-1.ur.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-2.ur.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-3.ur.dark.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-3.ur.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/efmp-406/unit-05/fig-U5-4.ur.svg
  - history/prompts/general/20261105-translate-efmp406-unit-five.general.prompt.md
tests:
  - "npm run check:content: all 13 pass in final draft state"
  - "Temporary reviewed check: only expected open G4/G5 findings"
  - "npm run figures:variants:check: pass"
  - "Five-page structural parity and MDX compile: pass"
  - "Urdu SVG optimisation: four files below 20 KB"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all five Unit 5 pages and the complete 10/10/5 assessment bank, including marking guidance. Added four RTL Urdu schematic sources and four derived dark variants. Kept draft status and open review gates. Recorded proposed terminology and rendering limitations in the unit handoff. All final content gates pass. Work committed locally; no push or PR.

## Outcome

- ✅ Impact: Complete Urdu source mirror and figure wiring prepared for later rendered inspection and independent G5.
- 🧪 Tests: All 13 content gates and dark-variant check pass. Conditional parity found only expected open G4/G5. Metadata, heading, component, import, numbering and alt/description checks pass; MDX parses.
- 📁 Files: Five Urdu MDX pages, eight Urdu SVG variants, unit translation handoff and this PHR.
- 🔁 Next prompts: Authorised rendered inspection and SVG measurement, then separate G5 after accepted G3 dependency.
- 🧠 Reflection: The explicit crew prohibition on Playwright also excludes the Chromium-backed SVG geometry tool. Do not infer rendering quality from structural gates.

## Handoff (for CEO and agents)

- Shipped / changed: Five-page Urdu mirror with bank-bound key_terms, full assessment and four mirrored Urdu schematic pairs.
- Decisions the team must respect: translation_status stays draft; no review certification. Current translate-unit skill forbids appending a G4 row. Existing G4/G5 rows remain open. Evaluation uses proposed قدر پیمائی, distinct from مجموعی جائزہ.
- Pending / next owner: Next authorised render worker measures all Urdu SVGs and inspects desktop, narrow and A4 output. Independent G5 reviewer and owner resolve proposed terms. G3 is advisory and unsigned.
- Paperclip issues affected: Crew job efmp-406-u05-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Temporary reviewed state reported exactly open G4/G5 rows. A descriptive existing tracker-row edit caused global content-status staleness and was reverted to preserve scope. No browser evidence available under the brief.
- Graders run and results (PASS/FAIL): PASS: final content gates, conditional structural/terminology parity except expected open stage findings, figure variant freshness, MDX compilation. NOT RUN: build, Playwright, SVG geometry, rendered inspection, per explicit crew limits.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Measure and inspect the frozen Urdu bundle under a rendering-authorised job before G5.
