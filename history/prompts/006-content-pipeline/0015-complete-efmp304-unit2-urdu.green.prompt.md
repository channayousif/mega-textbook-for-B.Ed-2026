---
id: 0015
title: Complete EFMP304 Unit2 Urdu
stage: green
date: 2026-10-18
surface: agent
model: GPT-6 (Codex)
feature: 006-content-pipeline
branch: crew/efmp-304-u02-translate
user: repository owner via crew brief
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "codex", "crew", "efmp-304", "urdu", "G4"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - "history/prompts/006-content-pipeline/0015-complete-efmp304-unit2-urdu.green.prompt.md"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/index.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-01.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-02.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-03.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-04.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/unit-assessment.mdx"
  - "specs/content/efmp-304/tasks.md"
  - "specs/content/efmp-304/translations/unit-02/check-content-baseline.log"
  - "specs/content/efmp-304/translations/unit-02/check-content-final.log"
  - "specs/content/efmp-304/translations/unit-02/check-content-temporary-reviewed.log"
  - "specs/content/efmp-304/translations/unit-02/check-mirror.log"
  - "specs/content/efmp-304/translations/unit-02/check-mirror.mjs"
  - "specs/content/efmp-304/translations/unit-02/check-variants.log"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-1.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-1.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-2.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-2.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-3.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-3.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-4.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-4.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-5.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-5.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-6.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-6.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-7.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-7.ur.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-8.ur.dark.png"
  - "specs/content/efmp-304/translations/unit-02/fig-U2-8.ur.png"
  - "specs/content/efmp-304/translations/unit-02/figure-geometry.log"
  - "specs/content/efmp-304/translations/unit-02/handoff.md"
  - "specs/content/efmp-304/translations/unit-02/input-hashes.json"
  - "specs/content/efmp-304/translations/unit-02/inspect-figures.mjs"
  - "static/img/figures/efmp-304/unit-02/fig-U2-1.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-1.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-2.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-2.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-3.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-3.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-4.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-4.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-5.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-5.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-6.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-6.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-7.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-7.ur.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-8.ur.dark.svg"
  - "static/img/figures/efmp-304/unit-02/fig-U2-8.ur.svg"
tests:
  - "npm run check:content (initial baseline, final draft and temporary reviewed)"
  - "node specs/content/efmp-304/translations/unit-02/check-mirror.mjs"
  - "scripts/heavy.sh node specs/content/efmp-304/translations/unit-02/inspect-figures.mjs"
  - "SVG optimisation for eight Urdu sources"
  - "npm run figures:variants:check"
  - "git diff --check"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Completed the six-page EFMP-304 Unit 2 draft Urdu mirror, 10/10/5 assessment parity, nine bank-bound key terms, eight Urdu SVGs and eight derived dark variants. Recorded progress in the existing G4 row without a done mark or reviewer initials. All 13 final draft content gates pass; direct mirror/MDX checks and 16 standalone figure viewBox/font checks pass. Kept translation_status draft and G3/G5 open. No build, server, push or PR.

## Outcome

- ✅ Impact: Replaced defective Urdu prose and English metadata/alts with a complete draft mirror of English baseline 88efbd7d574d44a5dc1b4052cb8615e8c63c6ab3.
- 🧪 Tests: Final draft 13/13 PASS. Temporary reviewed parity/figures/terms passed, with expected unfinished G4/G5 rows and transient stale generated status. All flags reverted. Standalone figures and MDX compilation passed.
- 📁 Files: Six Urdu MDX pages, sixteen Urdu SVG assets, existing Unit 2 G4 tracker row, scoped handoff and validation evidence, and this PHR.
- 🔁 Next prompts: English author resolves existing G3 escalation; refresh changed translation passages; fresh independent G5 and full-page RTL/print inspection.
- 🧠 Reflection: A green draft gate does not enforce parity. Enabled conditional checks temporarily and also compared component identities, assessment counts and metadata directly. Standalone figure inspection does not establish full-page rendering.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Unit 2 draft mirror and figure variants, with reproducible checks and input-bound standalone screenshots under specs/content/efmp-304/translations/unit-02/.
- Decisions the team must respect: Never mark this bundle reviewed from translator checks. The brief explicitly requested a tracker record; update the existing G4 row to in-progress without appending, claiming done or self-signing. Frozen terminology and English inputs remain unchanged.
- Pending / next owner: English author owns the existing conceptual/source/rubric G3 defects; shared glossary owner owns malformed Urdu definitions; curriculum owner owns proposed terminology; fresh independent reviewer owns G5 and page/print inspection. Local build/server prohibited by brief.
- Paperclip issues affected: Existing Unit 2 translation follow-up to TEX-23; no Paperclip issue/API changed.

## Evaluation notes (flywheel)

- Failure modes observed: Pre-existing missing ignored content-status artifact; draft parity gates default off; eight missing Urdu SVGs; poor shared glossary definitions outside scope; open English G3 dependencies.
- Graders run and results (PASS/FAIL): Final draft content gates PASS; mirror/MDX/assessment self-check PASS; all 16 standalone SVG font/viewBox checks PASS; variant freshness PASS; page/print inspection NOT RUN under brief restriction.
- Prompt variant (if applicable): crew/efmp-304-u02-translate
- Next experiment (smallest change to try): After English repairs, render every Urdu page at desktop, 360px and A4 widths in a separately authorised review session.
