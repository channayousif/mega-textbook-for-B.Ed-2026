---
id: 2466
title: Illustrate EFMP-407 Unit 6 raster banner
stage: general
date: 2026-11-08
surface: agent
model: Gemini 3.8 Flash
feature: efmp-407
branch: crew/efmp-407-u06-illustrate
user: owner
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["agy", "illustration", "efmp-407", "unit-06"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/index.mdx
  - specs/content/efmp-407/figures/unit-06.banner.md
  - specs/content/efmp-407/figures/unit-06.illustration-notes.md
  - specs/content/efmp-407/figures/unit-06.md
  - static/img/figures/efmp-407/unit-06/fig-U6-7.webp
  - history/prompts/general/2466-efmp-407-u06-illustrate.general.prompt.md
  - history/prompts/efmp-407/crew-efmp-407-u06-illustrate.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Executed illustration task for EFMP-407 Unit 6 per ADR-0029. Ran topic scenes check (zero illustration rows; all six topic figures are placed schematics). Ran unit banner generation via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 6 --banner`, producing `static/img/figures/efmp-407/unit-06/fig-U6-7.webp` (111.3 KB, 1376x768 WebP). Visually inspected the generated asset against approved prompt, alt text, authentic Pakistani/Sindhi dress, absence of text, and no maps or flags. Placed the banner `<Figure>` in `docs/semester-3/efmp-407/unit-06/index.mdx` and its Urdu mirror `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/index.mdx`, marked the manifest row placed, documented inspection and draft Urdu alt text in `unit-06.illustration-notes.md`. Refreshed stale G2 gate evidence for Unit 6, and verified that all 14 content gates pass.

## Outcome

- Impact: Produced and placed compliant raster banner for EFMP-407 Unit 6, with clean G2 evidence freshness.
- Tests: All 14 content gates PASS with npm run check:content.
- Files: Placed WebP asset, updated English and Urdu index.mdx and banner manifest, added illustration notes, refreshed G2 evidence, updated tasks.md, and recorded PHRs.
- Next prompts: Independent G3 English review and G5 Urdu review remain open.
- Reflection: Automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. Refreshing stale G2 evidence immediately after placing banner maintains green gate status.

## Handoff (for CEO and agents)

- Shipped / changed: Placed unit banner fig-U6-7 in English and Urdu index.mdx and updated unit-06.banner.md to placed. Added unit-06.illustration-notes.md with visual inspection notes and draft Urdu alt text. Refreshed G2 evidence following English file updates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything. Preserve approved prompts and alt text verbatim.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placed banner fig-U6-7.webp in English and Urdu unit index files, updating unit-06.banner.md to placed.
  - Refreshed G2 gate evidence and updated tasks.md pointer following English file updates.
  - Independent G3 English review and G5 Urdu review remain open and uncertified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
