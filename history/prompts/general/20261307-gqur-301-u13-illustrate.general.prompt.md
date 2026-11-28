---
id: 20261307
title: Produce and place raster illustrations for GQUR-301 Unit 13
stage: general
date: 2026-11-28
surface: cli
model: gemini-3.8-flash
feature: GQUR-301
branch: crew/gqur-301-u13-illustrate
user: crew
command: scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 13 --producer gflow
labels: [crew, illustrate, gqur-301, gflow]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-raster-illustrations.md
  pr: null
files:
  - docs/semester-2/gqur-301/unit-13/index.mdx
  - docs/semester-2/gqur-301/unit-13/topic-01.mdx
  - docs/semester-2/gqur-301/unit-13/topic-02.mdx
  - specs/content/gqur-301/figures/unit-13.banner.md
  - specs/content/gqur-301/figures/unit-13.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-13/G2/20261127T215700514Z-gates.json
  - static/img/figures/gqur-301/unit-13/fig-U13-5.webp
  - static/img/figures/gqur-301/unit-13/fig-U13-6.webp
  - static/img/figures/gqur-301/unit-13/fig-U13-7.webp
tests:
  - scripts/prepare-gate-evidence.mjs gqur-301 13
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated three raster illustrations (fig-U13-5 unit banner, fig-U13-6 scatter plot debrief, and fig-U13-7 regression line prediction) using gflow (Nano Banana). Inspected every image for authentic Sindh settings and attire, absence of readable text, no sacred figures/scripture, and accurate pedagogical alignment with alt text. Placed `<Figure>` elements in English unit files (Unit 13 has no Urdu mirror yet), transitioned figure manifests to `placed`, generated and recorded fresh G2 gate evidence, updated `tasks.md`, and verified all 14 content gates pass.

## Outcome

- ✅ Impact: All three raster illustrations for GQUR-301 Unit 13 generated, verified, placed in English MDX files, with manifests updated to `placed` and G2 evidence refreshed.
- 🧪 Tests: `prepare-gate-evidence.mjs` and `npm run check:content` (all 14 gates) passed cleanly.
- 📁 Files: Updated MDX unit files, figure manifests, tasks tracker, G2 evidence and logs, and added WebP figures under `static/img/figures/gqur-301/unit-13/`.
- 🔁 Next prompts: Next pipeline stage for GQUR-301 Unit 13 (Urdu translation / G5 review, or independent G3 English review).
- 🧠 Reflection: Image generation via gflow and optimization to WebP completed smoothly; G2 gate evidence prepared and verified clean against all content gates.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed raster illustrations fig-U13-5, fig-U13-6, and fig-U13-7 in GQUR-301 Unit 13; manifests updated to `placed`; refreshed G2 gate evidence and updated authoritative tracker row in `tasks.md`.
- Decisions: Retained existing approved prompts and alt texts verbatim; placed banner in index.mdx and topic illustrations in topic-01.mdx and topic-02.mdx.
- Pending / next: Urdu mirror does not exist yet (translation job will carry figure markers and translated alt text); G3 English review remains open pending fresh independent review under ADR-0019; G1 authority and author/run provenance remain open.
