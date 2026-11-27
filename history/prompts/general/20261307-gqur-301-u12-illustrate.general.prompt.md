---
id: 20261307
title: Produce and place raster illustrations for GQUR-301 Unit 12
stage: general
date: 2026-11-28
surface: cli
model: gemini-3.8-flash
feature: GQUR-301
branch: crew/gqur-301-u12-illustrate
user: crew
command: scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 12 --producer gflow
labels: [crew, illustrate, gqur-301, gflow]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-raster-illustrations.md
  pr: null
files:
  - docs/semester-2/gqur-301/unit-12/index.mdx
  - docs/semester-2/gqur-301/unit-12/topic-01.mdx
  - docs/semester-2/gqur-301/unit-12/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
  - specs/content/gqur-301/figures/unit-12.banner.md
  - specs/content/gqur-301/figures/unit-12.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-12/G2/20261127T212856564Z-gates.json
  - static/img/figures/gqur-301/unit-12/fig-U12-5.webp
  - static/img/figures/gqur-301/unit-12/fig-U12-6.webp
  - static/img/figures/gqur-301/unit-12/fig-U12-7.webp
tests:
  - scripts/prepare-gate-evidence.mjs gqur-301 12
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated three raster illustrations (fig-U12-5 unit banner, fig-U12-6 Sukkur girls' school courtyard scatter plot simulation, and fig-U12-7 Sukkur school staffroom correlation versus causation discussion) using gflow (Nano Banana). Inspected every image for authentic Sindh settings and attire, absence of readable text/numbers, no sacred figures/scripture, and accurate pedagogical alignment with alt text. Placed `<Figure>` elements in English and Urdu unit files, transitioned figure manifests to `placed`, generated and recorded fresh G2 gate evidence, and verified all 14 content gates pass.

## Outcome

- ✅ Impact: All three raster illustrations for GQUR-301 Unit 12 generated, verified, placed in English and Urdu MDX files, with manifests updated to `placed` and G2 evidence refreshed.
- 🧪 Tests: `prepare-gate-evidence.mjs` and `npm run check:content` (all 14 gates) passed cleanly.
- 📁 Files: Updated MDX unit files, Urdu translations, figure manifests, tasks tracker, and added WebP figures under `static/img/figures/gqur-301/unit-12/`.
- 🔁 Next prompts: Next pipeline stage for GQUR-301 Unit 12 (independent G3 English review or G4 Urdu review).
- 🧠 Reflection: The gflow image generation executed cleanly without quota exhaustion; placing the banner and topic figures in both English and Urdu mirrors followed by refreshing G2 gate evidence ensured complete gate compliance across the corpus.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed raster illustrations fig-U12-5, fig-U12-6, and fig-U12-7 in GQUR-301 Unit 12; manifests updated to `placed`; refreshed G2 gate evidence and updated authoritative tracker row in `tasks.md`.
- Decisions: Retained approved prompts and alt texts verbatim, translating alt text for Urdu `<Figure>` components.
- Pending / next: G3 English review remains open pending fresh independent review under ADR-0019; G1 intake re-evaluation remains open for owner/evaluator resolution.
