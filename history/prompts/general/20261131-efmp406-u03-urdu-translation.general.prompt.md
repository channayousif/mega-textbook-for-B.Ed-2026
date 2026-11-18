---
id: 20261131
title: Translate EFMP406 Unit Three
stage: general
date: 2026-11-05
surface: agent
model: opencode
feature: 006-content-pipeline
branch: crew/efmp-406-u03-translate-r1
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["opencode", "crew", "efmp-406", "translation"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/unit-assessment.mdx
  - specs/content/efmp-406/translations/unit-03/handoff.md
  - specs/content/efmp-406/translations/unit-03/logs/check-content-draft.txt
  - specs/content/efmp-406/translations/unit-03/logs/check-content-temporary-reviewed.txt
  - specs/content/efmp-406/translations/unit-03/logs/check-content-final.txt
  - specs/content/efmp-406/translations/unit-03/logs/mdx-syntax.txt
  - specs/content/efmp-406/translations/unit-03/logs/parity-self-check.txt
  - static/img/figures/efmp-406/unit-03/fig-U3-1.ur.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-2.ur.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-3.ur.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-4.ur.svg
  - static/img/figures/efmp-406/unit-03/fig-U3-4.ur.dark.svg
  - history/prompts/general/20261131-efmp406-u03-urdu-translation.general.prompt.md
tests:
  - "npm run check:content: all 14 pass in final draft state"
  - "Temporary reviewed check: only expected open G4/G5 findings plus temporary content-status staleness"
  - "npm run figures:variants:check: pass (1138 figures)"
  - "Four-page structural parity and MDX compile: pass"
  - "Urdu SVG optimisation: four files 5.0-8.0 KB, below 20 KB"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all four Unit 3 pages and the complete 10/10/5 assessment bank, including marking guidance, from the post-G3-repair English baseline. Added four RTL Urdu schematic sources at the gate-required 780 canvas width and four derived dark variants. Kept draft status and open review gates. Recorded proposed terminology and rendering limitations in the unit handoff. All final content gates pass. Work committed locally; no push or PR.

## Outcome

- ✅ Impact: Complete Urdu source mirror and figure wiring prepared for later rendered inspection and independent G5.
- 🧪 Tests: All 14 content gates and the dark-variant check pass. Conditional parity found only expected open G4/G5. Metadata, heading, component, import, numbering, link, figure-ID and option-order checks pass; MDX parses.
- 📁 Files: Four Urdu MDX pages, eight Urdu SVG variants, unit translation handoff with five check logs, and this PHR.
- 🔁 Next prompts: Authorised rendered inspection and SVG measurement, then separate G5 after accepted G3 dependency.
- 🧠 Reflection: The explicit crew prohibition on Playwright also excludes the Chromium-backed SVG geometry tool. Do not infer rendering quality from structural gates. The `check:svg-style` gate requires new Urdu figures at canvas width 760 or 780; the English sources at 800/820 are grandfathered, so the mirror script rescales to 780.

## Handoff (for CEO and agents)

- Shipped / changed: Four-page Urdu mirror with bank-bound key_terms, full assessment and four mirrored Urdu schematic pairs at 780 canvas width.
- Decisions the team must respect: translation_status stays draft; no review certification. Current translate-unit skill forbids appending or editing a G4 row. Existing G4/G5 rows remain open.
- Pending / next owner: Next authorised render worker measures all Urdu SVGs and inspects desktop, narrow and A4 output. Independent G5 reviewer and owner resolve proposed terms. G3 is advisory and unsigned; the English baseline is the post-repair commit 24e7302b2.
- Paperclip issues affected: Crew job efmp-406-u03-translate-r1; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The first mirror script emitted `transform` after the self-closing slash, producing invalid XML; the second replaced `<title>`/`<desc>` without allowing attributes, leaving English in both. Both were caught by XML parsing and fixed. The `check:svg-style` gate rejects new Urdu figures whose viewBox width is not 760 or 780.
- Graders run and results (PASS/FAIL): PASS: final content gates, conditional structural/terminology parity except expected open stage findings, figure variant freshness, MDX compilation, XML well-formedness, option-order and answer-key self-solve. NOT RUN: build, Playwright, SVG geometry, rendered inspection, per explicit crew limits.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Measure and inspect the frozen Urdu bundle under a rendering-authorised job before G5.
