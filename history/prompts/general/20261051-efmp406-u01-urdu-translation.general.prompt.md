---
id: 20261051
title: Translate EFMP-406 Unit 1 into Urdu
stage: general
date: 2026-11-02
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/efmp-406-u01-translate
user: crew owner
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "efmp-406", "urdu-translation"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-01/unit-teacher-notes.mdx
  - static/img/figures/efmp-406/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-1.ur.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-2.ur.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-3.ur.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-4.ur.svg
  - specs/content/efmp-406/translations/unit-01/handoff.md
  - specs/content/efmp-406/translations/unit-01/logs/check-content-draft.txt
  - specs/content/efmp-406/translations/unit-01/logs/check-content-origin-main.txt
  - specs/content/efmp-406/translations/unit-01/logs/check-content-temporary-reviewed.txt
  - specs/content/efmp-406/translations/unit-01/logs/mdx-syntax.txt
  - specs/content/efmp-406/translations/unit-01/logs/parity-self-check.txt
  - history/prompts/general/20261051-efmp406-u01-urdu-translation.general.prompt.md
tests:
  - npm run check:content (origin/main baseline, temporary reviewed parity, final draft)
  - Source parity and terminology self-check
  - MDX compilation for all five Urdu files
  - SVG optimisation for four Urdu sources
  - npm run figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all five EFMP-406 Unit 1 pages and four figure sources, generated four dark variants, recorded terminology proposals and validation limits, and retained draft status and open review gates. All 13 final content gates pass. Work committed locally without a push or PR.

## Outcome

- ✅ Impact: Complete Urdu draft mirror with the 10/10/5 assessment bank, model answers, rubrics and RTL-localised SVG labels.
- 🧪 Tests: Baseline and final draft: 13/13 content gates pass. Temporary reviewed run: parity and terminology pass; expected open G4/G5 rows and temporary content-status staleness documented. MDX, source self-check and dark-variant freshness pass.
- 📁 Files: Five Urdu pages, eight SVGs, translation handoff with five check logs, and this PHR.
- 🔁 Next prompts: Independent G5 session with accepted G3 dependency and permission to run geometry and desktop/narrow/A4 render inspection.
- 🧠 Reflection: Source parity cannot prove meaning or readable rendered Urdu; distinguish translator self-checks from independent review.

## Handoff (for CEO and agents)

- Shipped / changed: Five Urdu pages; four light and four derived dark SVGs; per-unit handoff and actual gate logs.
- Decisions the team must respect: Keep translation_status draft and all G3/G5 statuses open. Current translate-unit Step 7 forbids appending a G4 tracker row, so the existing tracker was left unchanged. Terminology bank and English baseline are unchanged.
- Pending / next owner: Independent reviewer owns G5 comparison and assessment solve. A permitted session must run Playwright-based SVG measurement and actual RTL/A4 inspection, forbidden in this brief. Owner decides proposed terms and course catalog entry.
- Paperclip issues affected: Crew job efmp-406-u01-translate; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Temporary reviewed indexes caused content-status staleness, resolved by restoring draft. python is unavailable; used python3 without installing packages. Browser checks prohibited by brief, clearly recorded as unverified.
- Graders run and results (PASS/FAIL): PASS: all 13 final content gates, MDX syntax, source structural/terminology self-check, dark-variant freshness. NOT RUN: build, Playwright geometry, rendered RTL/print inspection.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run geometry and render inspection in a permitted independent review session; do not infer a pass from content-gate success.
