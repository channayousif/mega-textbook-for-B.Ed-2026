---
id: 20261022
title: Translate GQUR301 Unit16 Urdu
stage: green
date: 2026-10-22
surface: agent
model: GPT-6 Codex
feature: gqur-301
branch: crew/gqur-301-u16-translate
user: owner
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "crew", "gqur-301", "translation"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/unit-teacher-notes.mdx
  - specs/content/gqur-301/reviews/unit-16/translation-validation/check-content-draft.txt
  - specs/content/gqur-301/reviews/unit-16/translation-validation/check-content-origin-main.txt
  - specs/content/gqur-301/reviews/unit-16/translation-validation/check-content-temporary-reviewed.txt
  - specs/content/gqur-301/reviews/unit-16/translation-validation/figure-variants.txt
  - specs/content/gqur-301/reviews/unit-16/translation-validation/handoff.md
  - specs/content/gqur-301/reviews/unit-16/translation-validation/source-parity.txt
  - specs/content/gqur-301/tasks.md
  - static/img/figures/gqur-301/unit-16/fig-U16-1.ur.dark.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-1.ur.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-2.ur.dark.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-2.ur.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-3.ur.dark.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-3.ur.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-4.ur.dark.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-4.ur.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-5.ur.dark.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-5.ur.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-6.ur.dark.svg
  - static/img/figures/gqur-301/unit-16/fig-U16-6.ur.svg
  - history/prompts/gqur-301/20261022-translate-gqur301-unit16-urdu.green.prompt.md
tests:
  - npm run check:content (13/13 pass, draft)
  - origin/main check:content (13/13 pass)
  - Temporary reviewed check:content (only expected open G4/G5 rows fail)
  - Six-page source parity and MDX compilation (pass)
  - SVG optimization and figures:variants:check (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all six Unit 16 pages and six figure pairs, preserved draft status, recorded the existing tracker note and handoff, and passed all 13 final content gates. Committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Complete Urdu draft mirror ready for independent review preparation.
- 🧪 Tests: Final content and origin/main baseline both pass all 13 gates; explicit conditional parity and terminology checks pass apart from deliberately unfinished G4/G5 lifecycle claims.
- 📁 Files: Six MDX pages, twelve SVG assets, existing G4 tracker note, handoff, validation logs and this PHR.
- 🔁 Next prompts: Permitted host renders Urdu; curriculum owner resolves proposed terms; fresh independent G5 follows accepted G3.
- 🧠 Reflection: A green source check cannot establish semantic or rendered Urdu review.

## Handoff (for CEO and agents)

- Shipped / changed: Full six-page Urdu draft including 10/10/5 assessment and final marking guidance; six RTL-localized figure pairs.
- Decisions the team must respect: English baseline unchanged; no tracker completion or new G4 row per translate-unit Step 7; all translation_status values remain draft.
- Pending / next owner: Rendering host owns 360px/A4/Nastaliq inspection; owner owns unbanked terminology; independent G5 reviewer owns bilingual review after accepted G3.
- Paperclip issues affected: No Paperclip issue supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Initial missing generated content-status file resolved by regeneration. Temporary reviewed run correctly rejects open G4/G5 rows. Build and browser checks prohibited by brief.
- Graders run and results (PASS/FAIL): Final check:content PASS; origin/main PASS; source parity PASS; MDX syntax PASS; dark freshness PASS. No rendering or independent review claim.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Render complete Urdu bundle on a host permitted to build and run render-inspect.
