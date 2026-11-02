---
id: 20261106
title: Translate EFMP406 Unit Six
stage: general
date: 2026-11-02
surface: agent
model: opencode
feature: 006-content-pipeline
branch: crew/efmp-406-u06-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["opencode", "crew", "efmp-406", "translation"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-teacher-notes.mdx
  - specs/content/efmp-406/translations/unit-06/handoff.md
  - specs/content/efmp-406/translations/unit-06/logs/check-content-draft.txt
  - specs/content/efmp-406/translations/unit-06/logs/check-content-origin-main.txt
  - specs/content/efmp-406/translations/unit-06/logs/check-content-temporary-reviewed.txt
  - specs/content/efmp-406/translations/unit-06/logs/mdx-syntax.txt
  - specs/content/efmp-406/translations/unit-06/logs/parity-self-check.txt
  - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.svg
  - history/prompts/general/20261106-efmp406-u06-urdu-translation.general.prompt.md
tests:
  - "npm run check:content: all 13 pass in final draft state"
  - "Temporary reviewed check: only expected open G4/G5 findings plus temporary content-status staleness"
  - "npm run figures:variants:check: pass"
  - "Five-page structural parity and MDX compile: pass"
  - "Urdu SVG optimisation: four files below 20 KB"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all five Unit 6 pages and the complete 10/10/5 assessment bank, including marking guidance. Added four RTL Urdu schematic sources and four derived dark variants. Kept draft status and open review gates. Recorded proposed terminology and rendering limitations in the unit handoff. All final content gates pass. Work committed locally; no push or PR.

## Outcome

- ✅ Impact: Complete Urdu source mirror and figure wiring prepared for later rendered inspection and independent G5.
- 🧪 Tests: All 13 content gates and dark-variant check pass. Conditional parity found only expected open G4/G5. Metadata, heading, component, import, numbering and alt/description checks pass; MDX parses.
- 📁 Files: Five Urdu MDX pages, eight Urdu SVG variants, unit translation handoff with five check logs, and this PHR.
- 🔁 Next prompts: Authorised rendered inspection and SVG measurement, then separate G5 after accepted G3 dependency.
- 🧠 Reflection: The explicit crew prohibition on Playwright also excludes the Chromium-backed SVG geometry tool. Do not infer rendering quality from structural gates.

## Handoff (for CEO and agents)

- Shipped / changed: Five-page Urdu mirror with bank-bound key_terms, full assessment and four mirrored Urdu schematic pairs.
- Decisions the team must respect: translation_status stays draft; no review certification. Current translate-unit skill forbids appending a G4 row. Existing G4/G5 rows remain open.
- Pending / next owner: Next authorised render worker measures all Urdu SVGs and inspects desktop, narrow and A4 output. Independent G5 reviewer and owner resolve proposed terms. G3 is advisory and unsigned.
- Paperclip issues affected: Crew job efmp-406-u06-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The inline YAML form `assessment_weighting: {summative: 60, formative: 40}` is read as an MDX expression by `@mdx-js/mdx`; the corpus convention is the expanded block. Temporary reviewed state reported exactly open G4/G5 rows. No browser evidence available under the brief.
- Graders run and results (PASS/FAIL): PASS: final content gates, conditional structural/terminology parity except expected open stage findings, figure variant freshness, MDX compilation. NOT RUN: build, Playwright, SVG geometry, rendered inspection, per explicit crew limits.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Measure and inspect the frozen Urdu bundle under a rendering-authorised job before G5.
