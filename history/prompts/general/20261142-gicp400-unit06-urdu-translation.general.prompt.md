---
id: 20261142
title: GICP-400 Unit 6 complete draft Urdu mirror
stage: general
date: 2026-11-07
surface: agent
model: GPT-6 (Codex)
feature: none
branch: crew/gicp-400-u06-translate
user: crew
command: Read .crew/brief.md and execute the translation job
labels: ["codex", "gicp-400", "unit-06", "translation"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gicp-400/reviews/unit-06/G4/check-draft.log
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-06/unit-assessment.mdx
  - specs/content/gicp-400/reviews/unit-06/G4/check-main.log
  - specs/content/gicp-400/reviews/unit-06/G4/check-reviewed.log
  - specs/content/gicp-400/reviews/unit-06/G4/font-metrics.log
  - specs/content/gicp-400/reviews/unit-06/G4/parity.log
  - specs/content/gicp-400/reviews/unit-06/G4/translation-handoff.md
  - specs/content/gicp-400/tasks.md
  - static/img/figures/gicp-400/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-1.ur.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-2.ur.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-3.ur.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/gicp-400/unit-06/fig-U6-4.ur.svg
  - history/prompts/general/20261142-gicp400-unit06-urdu-translation.general.prompt.md
tests:
  - "npm run check:content: all 14 gates pass on origin/main and final draft"
  - "Temporary reviewed-status content run: only expected unfinished G4/G5 findings"
  - "MDX compile and structural parity checks: four files pass"
  - "Eight key terms, 40 MCQ options, 10/10/5 assessment bands: pass"
  - "Nastaliq font metrics: zero findings over 126 figure labels"
  - "npm run figures:variants:check: pass"
  - "Browser, build and A4 checks: not run under crew prohibition"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Delivered four Urdu MDX mirrors and four Urdu schematic light/dark pairs. All content gates pass. Recorded the existing G4 row as draft delivery without completion or review certification. Added the translation handoff and verification logs. Committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Complete draft Urdu teaching and assessment content for GICP-400 Unit 6, bound to the frozen terminology bank.
- 🧪 Tests: All 14 final draft gates and origin/main gates pass. Forced parity yields only the expected unfinished G4/G5 rows. Extra structure and font-metric checks pass.
- 📁 Files: Four MDX mirrors, eight SVG assets, existing G4 tracker notes, handoff, check logs and this PHR.
- 🔁 Next prompts: Authorised host: inspect actual Urdu pages at desktop and 360px plus A4, run Chromium figure geometry; qualified independent reviewers: complete G3 and G5.
- 🧠 Reflection: Conditional draft gates must be exercised explicitly; font metrics caught eight Nastaliq collisions, and previews exposed a split Latin article reference.

## Handoff (for CEO and agents)

- Shipped / changed: Complete draft Urdu mirror, assessment answers/rubrics, RTL schematics, bank-bound key_terms, handoff and deterministic logs.
- Decisions the team must respect: English baseline b7863ac41dd9c97acb5460ef63c4c2c6dcf1c6e0 is unchanged. translation_status stays draft; G3/G5 remain open. Existing G4 row records delivery only. No terminology-bank, gate-script, approved-spec or publication changes.
- Pending / next owner: Authorised rendering host owns browser geometry and desktop/narrow/A4 inspection. Curriculum owner owns proposed terminology choices; fresh independent sessions own G3/G5. Original 25th Amendment gazette qualification remains unresolved.
- Paperclip issues affected: No ticket supplied; crew job gicp-400-u06-translate.

## Evaluation notes (flywheel)

- Failure modes observed: Skill Step 7 forbids appending G4 completion despite the brief requesting a row: updated only the existing open row. Sharp needs preview-only CSS token substitution. Eight initial font collisions were fixed. Latin 175A required bidi isolation.
- Graders run and results (PASS/FAIL): PASS: final draft content gates, baseline gates, explicit structural and terminology parity, MDX compilation, font metrics and dark freshness. Expected FAIL: forced reviewed run with G4/G5 unfinished. NOT RUN: prohibited build/browser/A4 checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Inspect this frozen translation on an authorised browser host before independent G5 acceptance.
