---
id: 11
title: Repair EFMP302 Unit Five Urdu
stage: misc
date: 2026-10-17
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/efmp-302-u05-translate
user: board-direct
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "translation", "EFMP-302", "unit-05"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/006-content-pipeline/0011-repair-efmp302-unit-five-urdu.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/unit-teacher-notes.mdx
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/final-content.log
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/handoff.md
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/origin-main-content.log
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/parity.log
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/svg-geometry-fallback-font.log
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/svg-geometry-nastaliq.json
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/temporary-reviewed-content.log
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/terminology.md
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/translation-digests.json
  - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/urdu-figures-contact.png
  - specs/content/efmp-302/tasks.md
  - static/img/figures/efmp-302/unit-05/fig-U5-1.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-1.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-2.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-3.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-3.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-4.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-5.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-5.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-6.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-6.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-7.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-7.ur.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-8.ur.dark.svg
  - static/img/figures/efmp-302/unit-05/fig-U5-8.ur.svg
tests:
  - npm run check:content (13/13 pass)
  - temporary-reviewed parity activation (expected open G4/G5 and stale-report findings)
  - structural and assessment parity plus MDX compilation
  - npm run figures:variants:check
  - scripts/heavy.sh node scripts/measure-figure-text.mjs (16 assets pass)
  - isolated bundled-Nastaliq SVG renders (16 assets, zero viewBox overflow)
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired the existing complete Urdu mirror against English 65d2428e, preserved assessment and component parity, refreshed eight Urdu schematics and dark twins, recorded G4 work and pending review, and passed all 13 content gates. Build/server inspection remains pending under the explicit brief restriction. Commit locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Seven Urdu pages repaired with quantity, instruction, negation and register corrections; draft status retained.
- 🧪 Tests: All 13 content gates pass. Explicit structural/assessment/MDX checks and standalone SVG font geometry pass.
- 📁 Files: Seven MDX files, sixteen Urdu SVG files, Unit 5 G4 tracker note, handoff evidence and this PHR.
- 🔁 Next prompts: Authorised full-site render inspection, owner terminology decisions and fresh independent G5 after accepted G3.
- 🧠 Reflection: A pre-existing mirror can pass draft gates while carrying semantic errors. Activate conditional parity without claiming review; distinguish standalone SVG checks from site inspection.

## Handoff (for CEO and agents)

- Shipped / changed: Complete draft mirror repairs, schematic descriptions and labels, derived variants, G4 record and validation evidence.
- Decisions the team must respect: Keep all translation_status fields draft, preserve G3/G5 statuses, do not reuse historical reviews for changed Urdu inputs; no push or PR.
- Pending / next owner: Rendering worker: full-page desktop/narrow/A4 checks. Curriculum owner: terminology and independent G5 dependencies.
- Paperclip issues affected: None assigned; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Initial origin/main lacked ignored content-status JSON. Conditional reviewed probe correctly rejected unfinished G4/G5 rows and detected temporary report staleness.
- Graders run and results (PASS/FAIL): PASS final 13-gate suite, parity and MDX compilation, fresh variants, standalone SVG geometry and diff hygiene. Full-site render not run by brief restriction.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Inspect full Urdu pages at 360px and in A4 on an authorised build.
