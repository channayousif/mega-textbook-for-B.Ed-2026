---
id: 2465
title: Illustrate EFMP-407 Unit 5 raster banner
stage: general
date: 2026-11-08
surface: agent
model: Gemini 3.8 Flash
feature: efmp-407
branch: crew/efmp-407-u05-illustrate
user: owner
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["agy", "illustration", "efmp-407", "unit-05"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-05/index.mdx
  - specs/content/efmp-407/figures/unit-05.banner.md
  - specs/content/efmp-407/figures/unit-05.illustration-notes.md
  - specs/content/efmp-407/figures/unit-05.md
  - specs/content/efmp-407/reviews/unit-05/G2/20261108T130249567Z-gates.json
  - specs/content/efmp-407/tasks.md
  - static/img/figures/efmp-407/unit-05/fig-U5-7.webp
  - history/prompts/general/2465-efmp-407-u05-illustrate.general.prompt.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Executed illustration task for EFMP-407 Unit 5 per ADR-0029. Ran topic scenes check (zero illustration rows; all six topic figures are placed schematics). Ran unit banner generation via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 5 --banner`, producing `static/img/figures/efmp-407/unit-05/fig-U5-7.webp` (102.8 KB, 1376x768 WebP). Visually inspected the generated asset against approved prompt, alt text, authentic Pakistani/Sindhi dress, inclusive classroom setting, absence of text, and no maps or flags. Placed the banner `<Figure>` in `docs/semester-3/efmp-407/unit-05/index.mdx`, marked the manifest row placed, documented inspection and draft Urdu alt text in `unit-05.illustration-notes.md`. Refreshed stale G2 gate evidence for Unit 5, and verified that all 14 content gates pass.

## Outcome

- Impact: Produced and placed compliant raster banner for EFMP-407 Unit 5, with clean G2 evidence freshness.
- Tests: All 14 content gates PASS with npm run check:content.
- Files: Placed WebP asset, updated English index.mdx and banner manifest, added illustration notes, refreshed G2 evidence, updated tasks.md, content-status cache, and this PHR.
- Next prompts: Independent G3 English review and G5 Urdu review remain open.
- Reflection: Automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. Refreshing stale G2 evidence immediately after placing banner maintains green gate status.

## Handoff (for CEO and agents)

- Shipped / changed: Placed unit banner fig-U5-7 in English index.mdx and updated unit-05.banner.md to placed. Added unit-05.illustration-notes.md with visual inspection notes and draft Urdu alt text. Refreshed G2 evidence following English file updates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything. Urdu translation mirror does not yet exist; when created, banner should be placed reusing English WebP.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placed banner fig-U5-7.webp in English unit index, updating unit-05.banner.md to placed.
  - Refreshed G2 gate evidence and updated tasks.md pointer following English file updates.
  - Independent G3 English review and G5 Urdu review remain open and uncertified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
