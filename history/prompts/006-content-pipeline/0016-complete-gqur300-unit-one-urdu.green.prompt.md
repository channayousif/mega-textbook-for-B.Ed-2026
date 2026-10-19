---
id: 0016
title: Complete GQUR300 Unit One Urdu
stage: green
date: 2026-10-18
surface: agent
model: Codex
feature: 006-content-pipeline
branch: crew/gqur-300-u01-translate
user: board-direct
command: Read .crew/brief.md and carry it out completely
labels: ["board-direct", "gqur-300", "urdu", "translation"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/006-content-pipeline/0016-complete-gqur300-unit-one-urdu.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/unit-teacher-notes.mdx
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/translations/unit-01/baseline-content.log
  - specs/content/gqur-300/translations/unit-01/content-gates.log
  - specs/content/gqur-300/translations/unit-01/figure-geometry.log
  - specs/content/gqur-300/translations/unit-01/figure-variants.log
  - specs/content/gqur-300/translations/unit-01/handoff.md
  - specs/content/gqur-300/translations/unit-01/isolated-render-metrics.json
  - specs/content/gqur-300/translations/unit-01/nastaliq-geometry.json
  - specs/content/gqur-300/translations/unit-01/parity.log
  - specs/content/gqur-300/translations/unit-01/temporary-reviewed.log
  - static/img/figures/gqur-300/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-3.ur.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-4.ur.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-6.ur.dark.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-6.ur.svg
tests:
  - "npm run check:content: all 13 gates passed"
  - "Temporary reviewed-state content probe: only expected unfinished G4/G5 findings"
  - "Direct six-file parity and 10/10/5 assessment checks: passed"
  - "npm run figures:variants:check: passed, 772 sources"
  - "Figure geometry and local Nastaliq geometry: passed"
  - "Isolated current-MDX preview: 18 desktop, narrow and print-media measurements clean"
  - "git diff --check: passed"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Refreshed all six existing Urdu mirror pages and three localized figure label sets, regenerated dark variants, documented terminology proposals and review dependencies, and kept translation_status draft. All content gates passed. Work committed locally with no push or PR.

## Outcome

- ✅ Impact: A complete Urdu mirror now uses clearer register, faithful quantities and instructions, Urdu Bloom tags and option letters, bank-conformant declared terms and synchronized figure descriptions.
- 🧪 Tests: All 13 content gates passed after refreshing the generated content-status report. Conditional parity checks and additional direct parity checks passed; expected review-status failures during the temporary probe are recorded.
- 📁 Files: Six Urdu MDX files, three Urdu SVG light/dark pairs, the existing G4 row note, translation handoff/check logs and this PHR.
- 🔁 Next prompts: Owner vocabulary rulings and current-English G3 dependency; fresh independent G5 and full-site render inspection.
- 🧠 Reflection: Continued the existing mirror instead of retranslating from scratch. The English baseline was exactly origin/main at job start. Isolated previews provide useful content evidence without violating the no-build/no-dev-server brief.

## Handoff (for CEO and agents)

- Shipped / changed: Complete six-file GQUR-300 Unit 1 draft Urdu mirror repairs and localized figure updates, bound to English commit 30d8def78ac53fcd2ba001f2361559f71a3fad2d. See specs/content/gqur-300/translations/unit-01/handoff.md.
- Decisions the team must respect: Terminology bank and English content were unchanged. Unbanked core terms remain proposals. The translate-unit Step 7 prohibition on appending a G4 completion row was honored: only the existing note was updated, preserving status and empty initials. No G3/G5 certification or reviewed translation claim.
- Pending / next owner: Curriculum owner owns vocabulary rulings and the G3 dependency; a fresh independent G5 reviewer must compare the whole bundle and inspect full-site narrow/A4 rendering. Full Docusaurus build deferred by the brief.
- Paperclip issues affected: None supplied; links.ticket is null and no Paperclip state was touched.

## Evaluation notes (flywheel)

- Failure modes observed: Initial clean origin/main checkout lacked generated content-status.json. A tracker-note change later made that generated file stale; regeneration fixed both. Draft status disables parity checks, so the temporary probe was necessary. Existing dense figure tables remain small on phones.
- Graders run and results (PASS/FAIL): PASS: final check:content, figure variants, parity and geometry. Temporary reviewed probe correctly reported only absent G4/G5 completion claims. Full-site render inspection was not run.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run fresh G5 against the final translation after resolving the accepted-English dependency.
