---
id: crew-gent-401-u04-translate
title: crew translate GENT-401 unit 4
stage: misc
date: 2026-11-24
surface: agent
model: gemini-3.8-flash
feature: gent-401
branch: crew/gent-401-u04-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/unit-teacher-notes.mdx
  - specs/content/gent-401/reviews/unit-04/G4/translation-handoff.md
  - specs/content/gent-401/tasks.md
  - static/img/figures/gent-401/unit-04/fig-U4-1.ur.dark.svg
  - static/img/figures/gent-401/unit-04/fig-U4-1.ur.svg
  - static/img/figures/gent-401/unit-04/fig-U4-2.ur.dark.svg
  - static/img/figures/gent-401/unit-04/fig-U4-2.ur.svg
  - static/img/figures/gent-401/unit-04/fig-U4-3.ur.dark.svg
  - static/img/figures/gent-401/unit-04/fig-U4-3.ur.svg
  - static/img/figures/gent-401/unit-04/fig-U4-4.ur.dark.svg
  - static/img/figures/gent-401/unit-04/fig-U4-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated GENT-401 Unit 4 into its complete Urdu mirror (5 files: index, topic-01, topic-02, unit-assessment, unit-teacher-notes) following translate-unit skill, with 4 localized RTL schematic SVGs and derived dark variants, verified text geometry, exact structural and heading parity, key_terms bound to terminology.csv, zero em dashes, and all 14 content gates passing.

## Outcome

- Impact: Urdu translation for GENT-401 Unit 4 by agy.
- Tests: npm run build:content-status && npm run check:content passed cleanly.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror for GENT-401 Unit 4 (index.mdx, topic-01.mdx, topic-02.mdx, unit-assessment.mdx, unit-teacher-notes.mdx) under i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/; four localized .ur.svg figures with derived .ur.dark.svg twins; task tracker updated; translation handoff recorded.
- Decisions the team must respect: translation_status stays draft pending independent G5 review; no self-certification.
- Pending / next owner: independent G5 reviewer (g5-reviewer agent).
- Notes for the next job on this unit:
  - Proposed terms for terminology.csv banking: "Business plan" -> "کاروباری منصوبہ", "Executive summary" -> "انتظامی خلاصہ", "Vision statement" -> "تصور کا بیان", "Mission statement" -> "مقصد کا بیان", "Marketing plan" -> "مارکیٹنگ کا منصوبہ", "Operational plan" -> "عملیاتی منصوبہ", "Organizational structure" -> "تنظیمی ڈھانچہ", "4Ps" -> "مارکیٹنگ مکس (مصنوع، قیمت، مقام، تشہیر)", "Quality check" -> "معیار کی جانچ".
  - Figures fig-U4-1 through fig-U4-4 have clean measured text geometry and derived dark variants.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
