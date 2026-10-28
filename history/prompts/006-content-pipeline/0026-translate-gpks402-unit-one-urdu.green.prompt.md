---
id: 0026
title: Translate GPKS402 Unit One Urdu
stage: green
date: 2026-10-28
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/gpks-402-u01-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "gpks-402", "urdu"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/unit-assessment.mdx
  - static/img/figures/gpks-402/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-1.ur.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-2.ur.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-3.ur.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-4.ur.svg
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-01/G4/translation-handoff.md
  - specs/content/gpks-402/reviews/unit-01/G4/translation-checks.md
tests:
  - "npm run check:content: all 13 gates pass on baseline and final draft"
  - "Temporary reviewed parity: content and figure parity pass; unfinished G4/G5 and temporary content-status findings only"
  - "npm run figures:variants:check: pass"
  - "Direct file, metadata, headings, component, item-count, glossary and terminology parity: pass"
  - "MDX compile: all four Urdu pages pass; XML parse and SVG size checks pass"
  - "No build, server, Playwright, browser geometry or rendered inspection: prohibited by brief"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all four GPKS-402 Unit 1 pages and four RTL Urdu schematics with dark variants. Preserved the English baseline, draft status and open review gates. Final content checks pass; committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Complete draft Urdu mirror of the settled English Unit 1, including its 10/10/5 assessment and bounded answers.
- 🧪 Tests: All 13 final content gates pass, as on origin/main; dark variants, source parity and direct MDX compilation pass. Rendering and geometry remain unverified under the explicit no-Playwright brief.
- 📁 Files: Four Urdu MDX pages, eight Urdu SVG variants, a G4 tracker note with status untouched, translation handoff and check record, and this PHR.
- 🔁 Next prompts: A permitted rendering job must measure all Urdu SVG text and inspect desktop, narrow and A4 Urdu pages; then fresh independent G5 with the proper G3 dependency.
- 🧠 Reflection: Conditional parity is necessary while draft; the temporary reviewed flag also triggers expected review-status failures. A cosmetic English manifest edit invalidated G2 and was reverted.

## Handoff (for CEO and agents)

- Shipped / changed: Full Urdu mirror from English baseline 0bc193429b1b484ed1bcd9eb4d45fbbe1d28d14a, terminology-bound key_terms, localised and horizontally mirrored figures, derived dark twins.
- Decisions the team must respect: Keep translation_status draft. No G3/G5 certification or signature. Follow translate-unit Step 7: no appended G4 row or done mark; existing row note records draft provenance. English and its evidence inputs remain unchanged.
- Pending / next owner: Rendering owner: geometry measurement and Urdu desktop/narrow/A4 inspection; independent G5: semantic and assessment review and proposed terminology. Qualification/signing owner: accepted G3/G5 evidence path.
- Paperclip issues affected: Crew job gpks-402-u01-translate; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Post-commit checking exposed that translator notes under translations/ entered G2 input manifests; relocated them to the evidence-excluded reviews/unit-01/G4/ folder without changing policy or existing evidence. Temporary reviewed check correctly rejects open G4/G5 rows and stale status data. Editing figure-manifest introductory prose invalidated G2; restored original bytes instead of regenerating evidence. Refreshed the ignored local content-status report after changing the G4 note, because its freshness binds tracker bytes.
- Graders run and results (PASS/FAIL): PASS final 13 content gates, source parity, bank conformance, dark variants, MDX compile, XML and byte budgets. UNVERIFIED browser geometry and rendered Urdu because prohibited. Conditional reviewed run FAIL only on expected lifecycle/status conditions.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the deferred SVG geometry and narrow/A4 inspection in a job explicitly permitted to use Playwright before any G5 pass.
