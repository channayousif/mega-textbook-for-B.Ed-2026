---
id: crew-gqur-301-u04-translate
title: Translate GQUR Unit Four Urdu
stage: misc
date: 2026-10-22
surface: agent
model: GPT-6
feature: gqur-301
branch: crew/gqur-301-u04-translate
user: board-direct
command: Read .crew/brief.md and carry it out completely
labels: ["board-direct", "crew", "gqur-301", "translation"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/unit-teacher-notes.mdx
  - static/img/figures/gqur-301/unit-04/fig-U4-1.ur.dark.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-1.ur.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-2.ur.dark.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-2.ur.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-3.ur.dark.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-3.ur.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-4.ur.dark.svg
  - static/img/figures/gqur-301/unit-04/fig-U4-4.ur.svg
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-04/translation-validation/draft-content-gates.txt
  - specs/content/gqur-301/reviews/unit-04/translation-validation/handoff.md
  - specs/content/gqur-301/reviews/unit-04/translation-validation/origin-main-content-gates.txt
  - specs/content/gqur-301/reviews/unit-04/translation-validation/structural-parity.txt
  - specs/content/gqur-301/reviews/unit-04/translation-validation/temporary-reviewed-content-gates.txt
  - history/prompts/gqur-301/crew-gqur-301-u04-translate.misc.prompt.md
tests:
  - npm run check:content (baseline, temporary reviewed, restored draft)
  - npm run optimize:figure -- --svg (four Urdu SVGs)
  - npm run figures:variants
  - npm run figures:variants:check
  - Explicit structural, component, terminology and assessment parity checks
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all five Unit 4 pages and localized four SVGs with derived dark variants. Preserved draft status, recorded an open G4 progress note and committed translation validation and handoff. No build, browser run, push or PR.

## Outcome

- ✅ Impact: Complete draft Urdu mirror of GQUR-301 Unit 4.
- 🧪 Tests: Twelve of thirteen content gates pass; sole missing generated content-status finding matches origin/main. Temporary parity flags exposed only expected open G4/G5 rows. Explicit structural checks and figure variants pass.
- 📁 Files: Five Urdu MDX pages, eight SVG files, one tracker note, five validation/handoff files and this PHR.
- 🔁 Next prompts: Fresh independent G5 with rendered Urdu inspection and owner consideration of statistical terminology proposals.
- 🧠 Reflection: Draft flags hide parity checks; temporary activation was reverted and explicit component/assessment checks supplemented it.

## Handoff (for CEO and agents)

- Shipped / changed: Full draft translation, figures and baseline-comparison logs.
- Decisions the team must respect: Frozen terminology bank and English baseline unchanged. G3/G5 unchanged; G4 remains open without reviewer identity. Translation is not certification.
- Pending / next owner: Review owner: independent G5, accepted G3 dependency and rendered desktop/narrow/A4 checks. Curriculum owner: proposed statistical terms.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Missing ignored content-status artifact on baseline. Expected G4/G5 failures during temporary reviewed run. Initial custom list check misread a wrapped English data value as a numbered item; corrected the matcher and reran successfully.
- Graders run and results (PASS/FAIL): Content gates: baseline-equivalent failure only. Conditional structural/figure/terminology checks: PASS. Figures variants: PASS. Explicit parity checks: PASS. Rendered review: not run, prohibited by brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent G5 rendered inspection with this frozen bundle.
