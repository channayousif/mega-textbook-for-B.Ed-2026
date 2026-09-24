---
id: "0045"
title: "EFMP-302 Unit 3 Urdu mirror complete"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 023-author-efmp-302
branch: 023-author-efmp-302
user: orchestrator
command: completion-agent phase 3 (G4 translation)
labels: [efmp-302, unit-03, g4, urdu, translation, figures, feat023]
links:
  spec: specs/023-author-efmp-302/spec.md
  ticket: null
  adr: ADR-0022, ADR-0024
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/ (8 files)
  - static/img/figures/efmp-302/unit-03/ (10 .ur.svg + 10 .ur.dark.svg)
  - specs/content/efmp-302/reviews/unit-03/G4-renders-ur/
tests:
  - translate-unit self-checks: file set, 10 Figure / 3 Glossary / 7 PrintHandout counts, 35 numbered items - all match
  - reviewed-flip check:content -> parity + figures gates green (only by-design G4/G5 rows fail)
  - npm run figures:variants:check -> OK (442)
  - node scripts/render-inspect.mjs EFMP-302 3 --locale ur -> 0 defects, clippedElems=0 all 8 pages
---

## Prompt

Phase 3: translate Unit 3 (five topics, ten figures) into its complete Urdu mirror at G4, bound
to the frozen terminology bank, academic-plain register, with the .ur.svg figure variants per
the bilingual-figures reference.

## Response snapshot

Translated all eight prose files (18,378 Urdu words): index with the key_terms block (Teacher
Effectiveness / Verbal Communication / Non-verbal Communication - all bank-accepted), five
nine-part topic cycles, the 10/10/5 assessment with transliterated option letters (الف ب ج د,
order preserved) and the translated bounded-answers heading, and the teacher notes. Heading
vectors, components and item counts match the English exactly; citations stay Latin; zero em
dash. Authored all ten .ur.svg variants with RTL-mirrored layouts (row-label columns right,
timeline stations right-to-left, flowchart flow and callouts flipped, emphasis rects
repositioned), Nastaliq-first font stack, geometry identical to the reverted EN schematics;
dark variants derived. All gates green; render inspection over the full Urdu unit at 1280x900,
360x780 and A4 print found 0 defects; visual spot-check of the rendered topic-04 page confirms
legible Nastaliq and correct RTL figure mirroring. translation_status stays draft pending G5.

## Outcome

- ✅ Impact: Unit 3 is now fully bilingual at draft; the Urdu route serves the mirror without
  EN fallback.
- 🧪 Tests: as listed, all green.
- 📁 Files: as listed; commits 3a71fee, d2be0db.
- 🔁 Next prompts: Unit 4 G3 (running), then Units 5-6 G3, then each unit's G4.
- 🧠 Reflection: translating after the G3 pass means the English base is stable; the mirrored
  SVG work is systematic once the column-swap convention from the reviewed unit-02 variants is
  internalized.

## Evaluation notes (flywheel)

- Failure modes observed: none at gate level; the caption/wordmark same-baseline trap in
  fig-U3-1 was caught before measuring by placing captions right-anchored before the wordmark.
- Graders run and results: all listed gates PASS.
- Prompt variant: translate-unit skill, main loop (no sub-agent), per its contract.
- Next experiment: Unit 4's Urdu mirror after its G3 review lands.
