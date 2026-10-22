---
id: 20261021
title: Translate Unit Ten into Urdu
stage: green
date: 2026-10-22
surface: agent
model: GPT-6
feature: gqur-301
branch: crew/gqur-301-u10-translate
user: crew
command: execute .crew/brief.md
labels: ["crew", "codex", "gqur-301-u10-translate", "translation"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gqur-301/20261021-translate-unit-ten-urdu.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/_category_.json
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/unit-assessment.mdx
  - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-before-manifest-restore.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-final.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-generated-status.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-main.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-parity-final.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-parity.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/figure-variants-check.txt
  - specs/content/gqur-301/reviews/unit-10/translation-validation/handoff.md
  - specs/content/gqur-301/reviews/unit-10/translation-validation/input-snapshot.json
  - specs/content/gqur-301/reviews/unit-10/translation-validation/structural-check.txt
  - specs/content/gqur-301/tasks.md
  - static/img/figures/gqur-301/unit-10/fig-U10-1.ur.dark.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-1.ur.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-2.ur.dark.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-2.ur.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-3.ur.dark.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-3.ur.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-4.ur.dark.svg
  - static/img/figures/gqur-301/unit-10/fig-U10-4.ur.svg
tests:
  - "npm run check:content: all 13 gates pass in final draft state"
  - "Temporary reviewed parity probes: expected open G4/G5 and transient local status findings only"
  - "figures:variants:check: 922 sources pass"
  - "Direct structural parity and all four MDX body compilations pass"
  - "SVG XML parsing, file budgets and page alt/description equality pass"
  - "git diff --check passes"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all four GQUR-301 Unit 10 pages, its category label and four SVGs with derived dark variants. Preserved assessment 10/10/5 items, metadata, component calls and cognitive demand. Recorded terminology proposals, a snapshot and validation logs. The existing G4 row contains a factual note without a new row, status change, initials or completion claim. Translation remains draft and G3/G5 remain open. Final content gates pass. Commit locally without pushing or opening a PR.

## Outcome

- Impact: Complete draft Urdu mirror prepared against ed514d033892f876f6c66a8bf7edc9372c04fba5; English unit bytes are unchanged.
- Tests: All 13 final content gates, dark freshness, direct structural parity, MDX compilation and XML checks pass. The initial main baseline had only a missing ignored status artifact, generated locally with build:content-status.
- Files: Four Urdu MDX pages, category label, eight Urdu SVG sources/variants, existing G4 row note and translation-validation records.
- Next prompts: Owner resolves proposed terminology; separate reviewer settles G3 dependency and performs independent G5 and actual page rendering.
- Reflection: Temporary reviewed flags expose otherwise dormant parity checks and must be restored. A descriptive English manifest edit also invalidates G2, so that edit was reverted and all original English inputs preserved.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Unit 10 draft Urdu mirror, localized figures and reproducible input snapshot; details in specs/content/gqur-301/reviews/unit-10/translation-validation/handoff.md.
- Decisions the team must respect: Bank unchanged; concept labels are proposals. Translation stays draft; no G3/G5 sign-off, G4 completion, publication change or fabricated reviewer identity. translate-unit Step 7 forbids an appended G4 row; only its existing factual note was updated.
- Pending / next owner: Curriculum owner resolves unbanked terms; independent G3/G5 reviewers handle acceptance. Owner provisions an authorized non-production host for desktop/narrow/A4 browser inspection, prohibited in this crew job. Local Sharp preview inspection does not replace it.
- Paperclip issues affected: None; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Missing generated content-status at the main baseline; expected G4/G5 failures under the temporary reviewed probe; a transient G2 freshness failure from an English manifest header edit, resolved by reverting that edit. One physically wrapped English rubric row was normalized for table-shape comparison. A preview import path was corrected without installing packages.
- Graders run and results (PASS/FAIL): Final check:content PASS (13/13); figures:variants:check PASS; structural parity/MDX compile/XML checks PASS; temporary reviewed probes deliberately FAIL only on open review lifecycle and local generated-state mismatch.
- Prompt variant: .crew/brief.md, gqur-301-u10-translate.
- Next experiment: Inspect actual Urdu pages on the authorized render host, then compare passages in an independent G5 session after G3 is accepted.
