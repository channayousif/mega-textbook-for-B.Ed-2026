---
id: 0006
title: Produce EFPG Unit Two Illustrations
stage: green
date: 2026-11-15
surface: agent
model: GPT-6 Codex
feature: 009-figure-rendering
branch: crew/efpg-401-u02-illustrate
user: crew
command: Read .crew/brief.md
labels: [codex, illustrations, efpg-401]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - docs/semester-3/efpg-401/unit-02/index.mdx
  - docs/semester-3/efpg-401/unit-02/topic-01.mdx
  - docs/semester-3/efpg-401/unit-02/topic-02.mdx
  - docs/semester-3/efpg-401/unit-02/topic-03.mdx
  - docs/semester-3/efpg-401/unit-02/topic-04.mdx
  - docs/semester-3/efpg-401/unit-02/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-05.mdx
  - specs/content/efpg-401/figures/unit-02.banner.md
  - specs/content/efpg-401/figures/unit-02.md
  - history/prompts/009-figure-rendering/0006-produce-efpg-unit-two-illustrations.green.prompt.md
  - specs/content/efpg-401/figures/unit-02.production.md
  - static/img/figures/efpg-401/unit-02/fig-U2-11.webp
  - static/img/figures/efpg-401/unit-02/fig-U2-12.webp
  - static/img/figures/efpg-401/unit-02/fig-U2-13.webp
  - static/img/figures/efpg-401/unit-02/fig-U2-14.webp
  - static/img/figures/efpg-401/unit-02/fig-U2-15.webp
  - static/img/figures/efpg-401/unit-02/fig-U2-16.webp
tests:
  - Baseline npm run build:content-status and npm run check:content passed all 14 gates.
  - Final content gates and refreshed G2 evidence recorded after placement.
  - Visual inspection of all generated sources and final WebPs.
  - git diff --check.
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced, inspected, optimised and placed five topic scenes and a unit banner in English and Urdu, preserving approved English prompts and descriptions. Used the authorised Codex fallback after both required Gemini commands reported quota exhaustion. Recorded provenance and refreshed deterministic G2 evidence.

## Outcome

- ✅ Impact: Six planned raster figures now appear in both locales.
- 🧪 Tests: All 14 baseline gates passed. Final gate results are recorded with the committed evidence refresh.
- 📁 Files: Six WebPs, twelve MDX placements, two manifests, production notes and G2 evidence.
- 🔁 Next prompts: Independent G3/G5 review; review job should inspect rendered Urdu and pronunciation mouth detail.
- 🧠 Reflection: A successful image render does not establish pedagogical accuracy. The pronunciation image needed three targeted edits after rejection.

## Handoff (for CEO and agents)

- Shipped / changed: Five topic scenes and one banner, shared WebPs with Urdu alt descriptions, provenance and production inspection record.
- Decisions the team must respect: Preserve approved prompts and English alt text; no certification or publication-state changes. Gemini exhausted until 2026-11-17T11:00:06Z; Codex built-in image tool used under ADR-0029.
- Pending / next owner: Content owner owns the existing Peshawar story versus generic Sindh prompt discrepancy. Independent reviewers own G3/G5 and rendered-page inspection. No local build, server or browser was run.
- Paperclip issues affected: Crew job efpg-401-u02-illustrate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Gemini quota exhaustion; composition exceeded 150 KB at 1200 px; pronunciation initially duplicated the trainee and rendered an unclear mouth position. Reused staging, reduced three sources to 1100 px and inspected revised pronunciation output.
- Graders run and results (PASS/FAIL): Baseline content gates PASS; final content gates and G2 refresh recorded in follow-up evidence commit.
- Prompt variant (if applicable): Approved manifest prompts plus repository house-style constraints; targeted pronunciation edits documented in unit-02.production.md.
- Next experiment (smallest change to try): Independent review of classroom meaning and Urdu alt wording at rendered widths.
