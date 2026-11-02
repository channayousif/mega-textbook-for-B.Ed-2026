---
id: 20261042
title: Complete GPKS-402 Unit 4 Urdu mirror
stage: general
date: 2026-11-02
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/gpks-402-u04-translate
user: owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "gpks-402-u04-translate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/*.mdx
  - static/img/figures/gpks-402/unit-04/*.ur.svg
  - static/img/figures/gpks-402/unit-04/*.ur.dark.svg
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-04/G4/translation-handoff.md
  - history/prompts/general/20261042-gpks402-unit-four-urdu-mirror.general.prompt.md
tests:
  - npm run check:content
  - conditional reviewed parity run, restored to draft
  - npm run figures:variants:check
  - supplemental metadata, heading, component and assessment comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Completed the five-page Urdu draft mirror, seven Urdu SVG pairs, terminology wiring and G4 handoff; kept draft status and open review gates. All 13 content gates pass.

## Outcome

- ✅ Impact: Unit 4 has a complete Urdu translation draft ready for independent review.
- 🧪 Tests: All 13 draft gates pass; conditional parity reports only expected governance/publication findings. Browser checks prohibited by brief.
- 📁 Files: Five MDX pages, fourteen SVGs, tracker note, handoff and this PHR.
- 🔁 Next prompts: Independent G5 preparation with permitted geometry and rendered Urdu checks, after exact accepted G3 dependency.
- 🧠 Reflection: Preserved prior draft work; explicit Urdu Glossary children prevent English fallback labels.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror and localized schematic variants, committed on crew branch.
- Decisions the team must respect: Terminology bank and English baseline unchanged; translation_status remains draft; no self-certification.
- Pending / next owner: Fresh independent reviewer owns G5; permitted browser session must run geometry and desktop/narrow/A4 inspection.
- Paperclip issues affected: Crew job gpks-402-u04-translate; no supplied ticket.

## Evaluation notes (flywheel)

- Failure modes observed: Draft gates hide parity checks; temporary reviewed flags expose expected open review gates and stale publication report.
- Graders run and results (PASS/FAIL): PASS: 13 final draft content gates and dark freshness. Conditional parity structural checks pass; G4/G5 completion intentionally absent.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Measure Urdu SVG geometry and inspect rendered Urdu when browser jobs are permitted.
