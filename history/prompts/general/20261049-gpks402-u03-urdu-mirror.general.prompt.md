---
id: 20261049
title: GPKS-402 Unit 3 Urdu draft mirror
stage: general
date: 2026-10-31
surface: agent
model: GPT-6
feature: content-pipeline
branch: crew/gpks-402-u03-translate
user: crew
command: execute .crew/brief.md
labels: [codex, crew, gpks-402, urdu, G4]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/unit-assessment.mdx
  - static/img/figures/gpks-402/unit-03/fig-U3-1.ur.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-2.ur.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-3.ur.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-4.ur.svg
  - static/img/figures/gpks-402/unit-03/fig-U3-4.ur.dark.svg
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-03/G4/translation-handoff.md
  - specs/content/gpks-402/reviews/unit-03/G4/content-baseline.log
  - specs/content/gpks-402/reviews/unit-03/G4/content-temporary-reviewed.log
  - specs/content/gpks-402/reviews/unit-03/G4/content-final.log
  - specs/content/gpks-402/reviews/unit-03/G4/mirror-check.log
  - history/prompts/general/20261049-gpks402-u03-urdu-mirror.general.prompt.md
tests:
  - npm run check:content (baseline and final, all 13 PASS)
  - Temporary reviewed parity check (expected open G4/G5 and transient status-report findings, restored draft)
  - MDX compilation and structural comparison of all four mirrors (PASS)
  - Frozen key_terms and 10/10/5 assessment counts (PASS)
  - SVG XML, localised labels and exact alt/desc checks (PASS)
  - SVG optimisation and npm run figures:variants:check (PASS)
  - git diff --check (PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all four GPKS-402 Unit 3 pages from English commit 23c211bd6fe0b17fe3e7bcbade5c54b15b9642cb. Preserved the complete assessment, qualifications and source-edition distinctions. Added four mirrored Urdu SVG sources and derived dark twins. Recorded an open G4 row and terminology proposals; retained draft status and open G3/G5. All final content gates pass. Browser-based inspection remains pending under the explicit crew restriction.

## Outcome

- ✅ Impact: Complete Urdu source mirror and figure wiring ready for subsequent geometry, rendering and independent review.
- 🧪 Tests: All 13 final draft content gates pass, matching the clean origin/main baseline; MDX, metadata, headings, component and assessment structure checks pass.
- 📁 Files: Four Urdu MDX pages, eight SVG variants, Unit 3 tracker notes and G4 handoff/check logs.
- 🔁 Next prompts: Authorised geometry and desktop/narrow/A4 inspection, then fresh independent G5 with accepted exact-English G3 dependency.
- 🧠 Reflection: Temporary reviewed checks activate parity but also require honest G4/G5 evidence and a current generated status report. Restore the flag in a finally block and run draft checks sequentially.

## Handoff (for CEO and agents)

- Shipped / changed: Four complete Urdu pages, all 25 assessment items and guidance, four RTL Urdu SVG pairs, banked key_terms, proposals and validation logs. Work committed locally without push or PR.
- Decisions the team must respect: translation_status stays draft; G3/G5 remain open and unsigned. G4 row stays open per translate-unit Step 7. Frozen bank, approved spec and English baseline unchanged. The brief's build/Playwright ban overrides the skill's browser instructions for this run.
- Pending / next owner: An authorised follow-up measures Urdu SVGs and inspects rendered pages at desktop, 360px and A4; a fresh reviewer handles G5; the owner resolves unbanked term proposals.
- Paperclip issues affected: No ticket supplied; crew job gpks-402-u03-translate only.

## Evaluation notes (flywheel)

- Failure modes observed: Initial draft check overlapped the temporary reviewed flag and reported transient content-status staleness. A descriptive figure-manifest header change invalidated G2 input evidence; reverted that change completely and documented Urdu placement in the handoff instead. Neither failure persists in the final state.
- Graders run and results (PASS/FAIL): Final check:content 13/13 PASS; figures:variants:check PASS; MDX compilation and mirror checks PASS; geometry/render inspection NOT RUN because prohibited. Temporary reviewed pipeline intentionally FAILS for open G4/G5, with no parity or terminology findings.
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): Run measure-figure-text.mjs and render-inspect.mjs --locale ur in an explicitly browser-authorised follow-up and repair any visual findings before G5.
