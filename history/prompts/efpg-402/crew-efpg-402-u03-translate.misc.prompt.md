---
id: 20261304
title: EFPG-402 Unit 3 Urdu mirror (G4 draft)
stage: misc
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: efpg-402
branch: crew/efpg-402-u03-translate
user: M Yousif Channa
command: crew translate-unit
labels: [claude, crew, translation]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/
  - static/img/figures/efpg-402/unit-03/*.ur.svg
  - static/img/figures/efpg-402/unit-03/*.ur.dark.svg
  - specs/content/efpg-402/tasks.md
  - specs/content/efpg-402/translations/unit-03/handoff.md
tests:
  - check:content with temporary reviewed flip
  - measure-figure-text
  - figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated EFPG-402 Unit 3 into Urdu (nine files, fourteen `.ur.svg` figures with dark twins), added G4 tracker notes and a translation handoff. translation_status stays draft.

## Outcome

- ✅ Impact: EFPG-402 Unit 3 has a complete draft Urdu mirror ready for independent G5.
- 🧪 Tests: measure-figure-text and figures:variants:check pass; flipped check:content showed only the expected G4/G5 row findings.
- 📁 Files: Urdu unit folder, localized figures, tracker, handoff.
- 🔁 Next prompts: G3 English review, then G5 Urdu review.
- 🧠 Reflection: librsvg previews need CSS variables substituted, otherwise figures render black.

## Handoff (for CEO and agents)

- Shipped / changed: draft Urdu mirror of EFPG-402 Unit 3 on branch crew/efpg-402-u03-translate.
- Decisions the team must respect: translation_status stays draft; no G4 completion claim and no G5 self-review.
- Pending / next owner: G3 and G5 reviewers; owner to rule on proposed terms in translations/unit-03/handoff.md.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: label line counts mismatched twice in the figure script before generation.
- Graders run and results (PASS/FAIL): check:content PASS apart from findings reported by the job; measure-figure-text PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): keep a shared mirror-and-stretch script for Urdu figures in scripts/.
