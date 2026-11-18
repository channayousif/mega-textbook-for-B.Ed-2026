---
id: 20261133
title: Translate GISS-401 Unit 6 Urdu mirror
stage: general
date: 2026-11-06
surface: agent
model: GPT-6 Codex
feature: 008-rich-unit-pedagogy
branch: crew/giss-401-u06-translate
user: crew
command: Read and execute .crew/brief.md
labels: ["codex", "giss-401", "unit-06", "urdu", "G4"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/unit-assessment.mdx
  - specs/content/giss-401/reviews/unit-06/G4/translation-handoff.md
  - static/img/figures/giss-401/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-1.ur.svg
  - static/img/figures/giss-401/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-2.ur.svg
  - static/img/figures/giss-401/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-3.ur.svg
  - static/img/figures/giss-401/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-4.ur.svg
  - static/img/figures/giss-401/unit-06/fig-U6-5.ur.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-5.ur.svg
  - static/img/figures/giss-401/unit-06/fig-U6-6.ur.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-6.ur.svg
  - history/prompts/general/20261133-translate-giss-401-unit-06-urdu.general.prompt.md
tests:
  - "npm run check:content - untouched origin/main baseline PASS, 14/14"
  - "Temporary reviewed parity run - expected open G4/G5 findings only"
  - "npm run check:content - restored draft PASS, 14/14"
  - "npm run figures:variants:check - PASS"
  - "Urdu MDX compilation and structural/citation comparison - PASS, five files"
  - "Serial Sharp light/dark figure previews - inspected, twelve variants"
  - "git diff --check - PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated the five GISS-401 Unit 6 pages, including the complete 10/10/5 bank and final marking guidance. Added six Urdu SVGs and six derived dark variants, a frozen-bank key_terms block, and a detailed G4 handoff. All 14 content gates pass with translation_status restored to draft. No push or PR; no review certification.

## Outcome

- ✅ Impact: Complete draft Urdu mirror and localised figures are ready for an independent review handoff.
- 🧪 Tests: All 14 baseline and final content gates passed; active parity run had only the two expected open G4/G5 rows. MDX compilation, metadata/headings/components/citation comparisons and variant freshness passed.
- 📁 Files: Five Urdu MDX pages, twelve SVG assets, one unit-scoped handoff and this PHR.
- 🔁 Next prompts: Independent G3 acceptance, permitted browser/geometry validation, then independent G5 review.
- 🧠 Reflection: Raster preview inspection found hidden labels caused by SVG painting order and tight Nastaliq line spacing; mirror shapes with labels and inspect after localisation.

## Handoff (for CEO and agents)

- Shipped / changed: Five-page Urdu draft, full assessment guidance, all six localised figures with dark variants; terminology proposals and validation limits recorded at specs/content/giss-401/reviews/unit-06/G4/translation-handoff.md.
- Decisions the team must respect: Keep every translation_status draft. Follow translate-unit Step 7 by retaining the existing open G4 tracker row rather than appending or certifying a row. Keep the frozen terminology bank, English baseline and G3/G5 evidence unchanged.
- Pending / next owner: The independent reviewer needs accepted G3 for the exact English baseline and qualified Islamic Studies review. CI or a permitted validation session owns browser SVG geometry, narrow and A4 checks. Curriculum owner owns unbanked terminology decisions.
- Paperclip issues affected: No ticket supplied; crew job giss-401-u06-translate only.

## Evaluation notes (flywheel)

- Failure modes observed: Initial copied SVGs inherited empty class attributes. Urdu previews exposed paint-order hiding, tight wrapped labels and mixed-digit bidi; corrected without changing English. Staging exposed that the authoring-folder handoff was bound as course content and invalidated G2 manifests; moved this lifecycle record into reviews/unit-06/G4, the evidence directory excluded by the existing contract. A temporary reviewed flag made the generated status report stale; regenerated and restored draft. Final MDX compilation caught an unsupported angle-bracket DOI autolink; replaced it with a standard Markdown link and reran validation.
- Graders run and results (PASS/FAIL): PASS: final check:content 14/14, variants freshness, MDX structural checks. EXPECTED: temporary reviewed G4/G5 open findings. NOT RUN: build, browser, A4 and measure-figure-text, prohibited by crew brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Measure the frozen Urdu SVGs in CI and inspect actual Urdu pages in narrow/A4 layouts before independent G5 acceptance.
