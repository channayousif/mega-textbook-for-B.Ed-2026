---
id: 0552
title: translate-gqur-301-unit-twelve-urdu
stage: green
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u12-translate-r1
user: board-direct
command: "Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."
labels: ["translation", "urdu-mirror", "gqur-301", "unit-12"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/unit-assessment.mdx
  - history/prompts/gqur-301/0552-translate-gqur-301-unit-twelve-urdu.green.prompt.md
tests:
  - npm run check:content (12/13 gates pass; check:content-status pre-existing failure on origin/main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated GQUR-301 Unit 12 (bivariate analysis) into its complete Urdu G4 mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/`. Created four files: `index.mdx` (with `key_terms` block), `topic-01.mdx` (scatter plots), `topic-02.mdx` (interpretation of relationships), and `unit-assessment.mdx` (10/10/5 bank with bounded answers). All headings, components (`<Figure>`, `<Glossary>`, `<PrintHandout>`, `<TranslationStatusBadge>`), and structure match the English baseline 1:1. MCQ option letters transliterated to Urdu (الف/ب/ج/د). Bloom tags translated. Answers section heading translated. No English answer-key prose left in Urdu files. `translation_status` stays `draft` per skill.

## Outcome

- Shipped: Complete Urdu G4 mirror for GQUR-301 Unit 12 (4 files, 347 lines)
- Decisions: `.ur.svg` figure variants NOT created (generate-figures skill owns this, not translate-unit); noted in handoff
- Pending: `.ur.svg` variants for all 4 figures (fig-U12-1 through fig-U12-4) need generate-figures run before unit can be flipped to `reviewed`
- Tests: `npm run check:content` passes 12/13 gates; `check:content-status` fails on origin/main too (pre-existing, unrelated)

## Handoff (for CEO and agents)

- Shipped / changed: Four Urdu MDX files for GQUR-301 Unit 12 at G4 (translate-unit skill). translation_status: draft.
- Decisions the team must respect: `.ur.svg` figure variants are generate-figures output, NOT translate-unit. The `<Figure src>` in Urdu topic files already points to `.ur.svg` paths.
- Pending / next owner: `.ur.svg` variants for all 4 figures (fig-U12-1 concept-map, fig-U12-2 table, fig-U12-3 diagram, fig-U12-4 table) need generate-figures Step 5 run before G5 review.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: None in this run.
- Graders run and results: check:content PASS (12/13 gates; 1 pre-existing failure on origin/main)
- Prompt variant: null
- Next experiment: null
