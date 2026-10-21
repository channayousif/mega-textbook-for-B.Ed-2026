---
id: 018
title: Translate GQUR301 Unit3 Urdu
stage: green
date: 2026-10-21
surface: agent
model: GPT-6 (Codex)
feature: 008-rich-unit-pedagogy
branch: crew/gqur-301-u03-translate
user: board-direct
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "gqur-301", "urdu", "G4"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/008-rich-unit-pedagogy/018-translate-gqur301-unit3-urdu.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/_category_.json
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/unit-teacher-notes.mdx
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/translations/unit-03/check-content-final.txt
  - specs/content/gqur-301/translations/unit-03/check-content-parity.txt
  - specs/content/gqur-301/translations/unit-03/handoff.md
  - specs/content/gqur-301/translations/unit-03/structural-check.txt
  - static/img/figures/gqur-301/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-1.ur.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-3.ur.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-4.ur.dark.svg
  - static/img/figures/gqur-301/unit-03/fig-U3-4.ur.svg
tests:
  - npm run check:content
  - temporary reviewed parity probe, then restored draft
  - npm run figures:variants:check
  - direct EN-UR structural comparison
  - local Sharp figure preview inspection
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated the five Unit 3 pages and category metadata; localised four SVG figures and generated dark twins. Retained draft status and independent review boundaries. Recorded the terminology proposals, structural checks and rendering restrictions; committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Complete Urdu draft mirror for GQUR-301 Unit 3, bound to the frozen bank and the existing English baseline.
- 🧪 Tests: All 13 content gates pass in draft state. Temporary reviewed probe passes parity and terminology, failing only unfinished G4/G5 rows. Figure variants and direct structural comparison pass.
- 📁 Files: Five Urdu MDX pages, category metadata, eight SVG assets, translation handoff and validation logs, existing G4 note, and this PHR.
- 🔁 Next prompts: Independent G3 dependency, owner terminology decisions and separate G5 with actual browser/print rendering.
- 🧠 Reflection: Conditional parity gates were deliberately exercised without retaining a false reviewed claim.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror and four localised light/dark SVG pairs, with validation and handoff records.
- Decisions the team must respect: English unchanged; bank, glossary, policy and G3/G5 untouched. Existing G4 row notes work without a status flip, initials or new row, following translate-unit Step 7. No publication claim.
- Pending / next owner: Curriculum owner: unbanked terms and glossary-label difference. Independent G3/G5 reviewers: English acceptance and passage/assessment equivalence. Authorised renderer: desktop/narrow/A4 inspection. Brief prohibited build/server/Playwright.
- Paperclip issues affected: null; no Paperclip issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial missing generated content-status JSON fixed with its generator. Temporary reviewed probe correctly rejects unfinished G4/G5. Sharp preview lacks CSS variable resolution, handled in preview-only buffers. Inherited figure descriptions/geometry are flagged for independent review.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates in draft state; figure dark variants; metadata/file/headings/components/figure-alt parity; 10/10/5 bank. EXPECTED FAIL: reviewed G4/G5 completion checks. NOT RUN: browser and print inspection, prohibited by brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent passage comparison and actual rendered Urdu inspection after English dependency acceptance.
