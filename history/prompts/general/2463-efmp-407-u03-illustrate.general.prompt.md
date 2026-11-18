---
id: 2463
title: Illustrate EFMP-407 Unit 3 raster banner
stage: general
date: 2026-11-07
surface: agent
model: Gemini 3.8 Flash
feature: none
branch: crew/efmp-407-u03-illustrate
user: owner
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["agy", "illustration", "efmp-407", "unit-03"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-03/index.mdx
  - specs/content/efmp-407/figures/unit-03.banner.md
  - specs/content/efmp-407/figures/unit-03.illustration-notes.md
  - specs/content/efmp-407/figures/unit-03.md
  - specs/content/efmp-407/reviews/unit-03/G2/20261107T185101143Z-gates.json
  - specs/content/efmp-407/tasks.md
  - static/content-status.json
  - static/img/figures/efmp-407/unit-03/fig-U3-7.webp
  - history/prompts/general/2463-efmp-407-u03-illustrate.general.prompt.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Executed illustration task for EFMP-407 Unit 3 per ADR-0029. Ran topic scenes check (zero illustration rows; all six topic figures are placed schematics). Ran unit banner generation via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 3 --banner`, producing `static/img/figures/efmp-407/unit-03/fig-U3-7.webp` (61.7 KB, 1376x768 WebP). Inspected the generated asset against approved prompt, alt text, cultural dress, absence of text, and no maps or flags. Placed the banner `<Figure>` in `docs/semester-3/efmp-407/unit-03/index.mdx`, marked the manifest row placed, documented inspection in `unit-03.illustration-notes.md`, committed the clean baseline, and refreshed stale G2 evidence using `node scripts/prepare-gate-evidence.mjs --refresh-stale` per brief note 32. Rebuilt content status cache and verified all 14 content gates.

## Outcome

- ✅ Impact: Produced and placed compliant raster banner for EFMP-407 Unit 3, with clean G2 evidence freshness.
- 🧪 Tests: All 14 content gates PASS with npm run check:content.
- 📁 Files: Placed WebP asset, updated index.mdx and banner manifest, added illustration notes, refreshed G2 evidence, updated tasks.md, content-status cache, and this PHR.
- 🔁 Next prompts: Translation pass resumes once English author resolves G3 findings.
- 🧠 Reflection: Automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. Refreshing stale G2 evidence immediately after placing banner maintains green gate status.

## Handoff (for CEO and agents)

- Shipped / changed: Placed unit banner fig-U3-7 in docs/semester-3/efmp-407/unit-03/index.mdx and updated unit-03.banner.md to placed. Added unit-03.illustration-notes.md with handoff snippet for Urdu translation. Refreshed G2 evidence following English file updates.
- Decisions the team must respect: Preserve approved prompts and alt text verbatim; do not claim G3/G5 certification.
- Pending / next owner: Urdu placement awaits translation job after English author resolves outstanding G3 findings.
- Paperclip issues affected: efmp-407-u03-illustrate; no ticket identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: None in generation; image complied on first pass with zero text and authentic attire.
- Graders run and results (PASS/FAIL): PASS: npm run check:content (all 14 content gates).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Maintain established illustration-notes format for downstream translation handoffs.
