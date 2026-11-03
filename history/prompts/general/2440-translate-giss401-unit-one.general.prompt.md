---
id: 2440
title: Translate GISS-401 Unit 1 into Urdu
stage: general
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/giss-401-u01-translate
user: crew
command: carry out .crew/brief.md
labels: [codex, crew, giss-401, translation]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/unit-assessment.mdx
  - static/img/figures/giss-401/unit-01/fig-U1-1.ur.svg
  - static/img/figures/giss-401/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/giss-401/unit-01/fig-U1-2.ur.svg
  - static/img/figures/giss-401/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/giss-401/unit-01/fig-U1-3.ur.svg
  - static/img/figures/giss-401/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/giss-401/unit-01/fig-U1-4.ur.svg
  - static/img/figures/giss-401/unit-01/fig-U1-4.ur.dark.svg
  - specs/content/giss-401/reviews/unit-01/G4/translation-handoff.md
  - specs/content/giss-401/reviews/unit-01/G4/content-gates.txt
  - specs/content/giss-401/reviews/unit-01/G4/conditional-parity-gates.txt
  - specs/content/giss-401/reviews/unit-01/G4/source-parity.txt
  - history/prompts/general/2440-translate-giss401-unit-one.general.prompt.md
tests:
  - npm run check:content (baseline and final draft state, all 13 pass)
  - npm run check:content (temporary reviewed state, only expected G4/G5 pipeline findings)
  - npm run figures:variants:check (pass)
  - Source metadata, heading, component, figure and numbered-item parity (pass)
  - All four Urdu MDX bodies compile with @mdx-js/mdx (pass)
  - Four serial Sharp figure previews inspected under scripts/heavy.sh
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all four GISS-401 Unit 1 pages, including the complete assessment and public guidance. Localised four SVGs and derived their dark variants. Final content checks pass all 13 gates. Status remains draft; tracker review rows remain open. Detailed terminology proposals and deferred browser checks are recorded in the G4 translation handoff. All work is committed locally without a push or PR.

## Outcome

- ✅ Impact: Complete Urdu source mirror and localised teaching assets ready for independent comparison.
- 🧪 Tests: Baseline and final draft content gates pass; conditional parity passes except expected open G4/G5 rows; dark variants and MDX compilation pass.
- 📁 Files: Four Urdu MDX pages, eight SVG variants, translation handoff, three validation logs and this PHR.
- 🔁 Next prompts: Qualified G3 sign-off, permitted browser geometry and Urdu narrow/A4 inspection, independent G5 comparison, owner terminology banking.
- 🧠 Reflection: Draft gates alone do not exercise bilingual parity; the temporary reviewed-state check is necessary and both statuses must be restored.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu index, two topics and full 10/10/5 assessment for English baseline ee21e1a43a5fcc61ed6a96ce0b43b8020a6af12a; four localised figures plus derived dark twins.
- Decisions the team must respect: translate-unit Step 7 forbids appending a G4 tracker row, so the brief's instruction to record it as the skill says is fulfilled with a separate handoff and unchanged open tracker rows. No review, publication, banking or certification is claimed. No English content or governing documents changed.
- Pending / next owner: Independent Islamic Studies reviewer owns G3; fresh G5 reviewer owns semantic and assessment equivalence; a permitted validation session owns browser geometry, narrow Urdu and A4 print inspection; curriculum owner owns unbanked terms listed in the handoff. The brief prohibits builds, dev servers and Playwright, so none was run.
- Paperclip issues affected: No issue identifier was supplied; crew job giss-401-u01-translate.

## Evaluation notes (flywheel)

- Failure modes observed: Repeated scratch translation writes initially duplicated the Urdu key_terms block; fixed by deriving frontmatter from the English source. Temporary reviewed status also stales the generated content-status file; regenerated it before each relevant check and restored draft afterward.
- Graders run and results (PASS/FAIL): Final check:content PASS, 13/13; figures:variants:check PASS; source parity and MDX compilation PASS; conditional pipeline FAIL only for expected open G4/G5 rows. Browser checks NOT RUN per brief.
- Prompt variant (if applicable): crew brief, translate-unit workflow.
- Next experiment (smallest change to try): Run the prohibited-in-this-job browser checks in an explicitly permitted validation job before G5 acceptance.
