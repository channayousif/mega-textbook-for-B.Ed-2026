---
id: 2464
title: Illustrate EFMP-407 Unit 4 raster banner
stage: general
date: 2026-11-08
surface: agent
model: Gemini 3.8 Flash
feature: none
branch: crew/efmp-407-u04-illustrate
user: owner
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["agy", "illustration", "efmp-407", "unit-04"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx
  - specs/content/efmp-407/figures/unit-04.banner.md
  - specs/content/efmp-407/figures/unit-04.illustration-notes.md
  - specs/content/efmp-407/figures/unit-04.md
  - specs/content/efmp-407/reviews/unit-04/G2/20261107T200113556Z-gates.json
  - specs/content/efmp-407/tasks.md
  - static/img/figures/efmp-407/unit-04/fig-U4-7.webp
  - history/prompts/general/2464-efmp-407-u04-illustrate.general.prompt.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Executed illustration task for EFMP-407 Unit 4 per ADR-0029. Ran topic scenes check (zero illustration rows; all six topic figures are placed schematics). Ran unit banner generation via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 4 --banner`, producing `static/img/figures/efmp-407/unit-04/fig-U4-7.webp` (59.5 KB, 1376x768 WebP). Inspected the generated asset against approved prompt, alt text, cultural dress, absence of text, and no maps or flags. Placed the banner `<Figure>` in `docs/semester-3/efmp-407/unit-04/index.mdx` and its Urdu mirror `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx`, marked the manifest row placed, documented inspection in `unit-04.illustration-notes.md`, committed the clean baseline, and refreshed stale G2 evidence using `node scripts/prepare-gate-evidence.mjs --refresh-stale`. Rebuilt content-status cache and verified all 14 content gates pass cleanly.

## Outcome

- Impact: Produced and placed compliant raster banner for EFMP-407 Unit 4, with clean G2 evidence freshness.
- Tests: All 14 content gates PASS with npm run check:content.
- Files: Placed WebP asset, updated English and Urdu index.mdx and banner manifest, added illustration notes, refreshed G2 evidence, updated tasks.md, content-status cache, and this PHR.
- Next prompts: Independent G3 and G5 reviews remain open.
- Reflection: Automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. Refreshing stale G2 evidence immediately after placing banner maintains green gate status.

## Handoff (for CEO and agents)

- Shipped / changed: Placed unit banner fig-U4-7 in English and Urdu index.mdx and updated unit-04.banner.md to placed. Added unit-04.illustration-notes.md with inspection notes. Refreshed G2 evidence following English file updates.
- Decisions the team must respect: Preserve approved prompts and alt text verbatim; do not claim G3/G5 certification.
- Pending / next owner: Independent G3 English review and G5 Urdu review.
- Paperclip issues affected: efmp-407-u04-illustrate; no ticket identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
