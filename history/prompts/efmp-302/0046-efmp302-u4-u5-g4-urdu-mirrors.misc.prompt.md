---
id: "0046"
title: "EFMP-302 Units 4 and 5 Urdu mirrors complete"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 023-author-efmp-302
branch: 023-author-efmp-302
user: orchestrator
command: completion-agent phase 3 (G4 translation)
labels: [efmp-302, unit-04, unit-05, g4, urdu, translation, figures, feat023]
links:
  spec: specs/023-author-efmp-302/spec.md
  ticket: null
  adr: ADR-0022, ADR-0024
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-04/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/ (7 files)
  - static/img/figures/efmp-302/unit-04/ (8 .ur.svg + 8 .ur.dark.svg)
  - static/img/figures/efmp-302/unit-05/ (8 .ur.svg + 8 .ur.dark.svg)
  - specs/content/efmp-302/reviews/unit-04/G4-renders-ur/
  - specs/content/efmp-302/reviews/unit-05/G4-renders-ur/
tests:
  - self-checks both units: file sets, component counts, 35 items each, no em dash, no stray English
  - reviewed-flip check:content -> parity + figures gates green (only by-design G4/G5 rows fail)
  - figures:variants:check -> OK (450 then 458)
  - render-inspect --locale ur -> 0 defects both units, all pages clippedElems=0
---

## Prompt

Phase 3 continuation: translate Units 4 and 5 into their complete Urdu mirrors at G4, each after
its fresh G3 pass settled the English bytes.

## Response snapshot

Unit 4 (14,958 words): index (key_terms: Professional Standards, National Professional Standards
for Teachers, Teacher Licensing, Teacher Certification), four topics, assessment, teacher notes;
eight .ur.svg variants with the career timeline and nesting diagram mirrored. Unit 5 (15,763
words): index (key_terms: Stress, Teacher Burnout, Multi-grade Classroom, Digital
Professionalism), four topics, assessment, teacher notes; eight .ur.svg variants with the burnout
path and three-regions diagram mirrored. Both units: heading vectors, components and item counts
match the English exactly; transliterated option letters with order preserved; citations stay
Latin; academic-plain register; zero em dash; two stray English words in Unit 5 prose caught and
fixed by self-check before commit. All gates green; both render inspections 0 defects.

## Outcome

- ✅ Impact: Units 4 and 5 fully bilingual at draft; only Unit 6's mirror remains.
- 🧪 Tests: as listed, all green.
- 📁 Files: as listed; commits b15b4bd, 4e4cdd7.
- 🔁 Next prompts: Unit 6 G3 (running), then Unit 6's G4, then the G5 campaign.
- 🧠 Reflection: the caption/wordmark same-baseline trap recurred twice (fig-U4-1, fig-U4-3);
  right-anchoring captions at x=758 (clear of the wordmark at ~795) is now the standing fix, and
  measure-figure-text catches it every time.

## Evaluation notes (flywheel)

- Failure modes observed: two caption/wordmark overprints, both caught by measure-figure-text
  before commit; one transient port conflict in render-inspect, resolved by moving ports.
- Graders run and results: all listed gates PASS.
- Prompt variant: translate-unit skill, main loop.
- Next experiment: Unit 6's Urdu mirror (the course's closing unit) after its G3 lands.
