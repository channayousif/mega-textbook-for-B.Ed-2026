---
id: 20261306
title: Produce and place raster illustrations for GQUR-301 Unit 11
stage: general
date: 2026-11-28
surface: cli
model: gemini-3.8-flash
feature: GQUR-301
branch: crew/gqur-301-u11-illustrate
user: crew
command: scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 11 --producer gflow
labels: [crew, illustrate, gqur-301, gflow]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-raster-illustrations.md
  pr: null
files:
  - docs/semester-2/gqur-301/unit-11/index.mdx
  - docs/semester-2/gqur-301/unit-11/topic-01.mdx
  - docs/semester-2/gqur-301/unit-11/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-02.mdx
  - specs/content/gqur-301/figures/unit-11.banner.md
  - specs/content/gqur-301/figures/unit-11.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-11/G2/20261127T192915847Z-gates.json
  - static/img/figures/gqur-301/unit-11/fig-U11-5.webp
  - static/img/figures/gqur-301/unit-11/fig-U11-6.webp
  - static/img/figures/gqur-301/unit-11/fig-U11-7.webp
tests:
  - scripts/prepare-gate-evidence.mjs gqur-301 11
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated three raster illustrations (fig-U11-5 unit banner, fig-U11-6 Sukkur exam hall, and fig-U11-7 Nawabshah science guessing simulation) using gflow (Nano Banana). Inspected every image for authentic Sindh settings and attire, absence of readable text, no sacred figures/scripture, and accurate pedagogical alignment with alt text. Placed `<Figure>` elements in English and Urdu unit files, transitioned figure manifests to `placed`, generated and recorded fresh G2 gate evidence, and verified all 14 content gates pass.

## Outcome

- ✅ Impact: All three raster illustrations for GQUR-301 Unit 11 generated, verified, placed in English and Urdu MDX files, with manifests updated to `placed` and G2 evidence refreshed.
- 🧪 Tests: `prepare-gate-evidence.mjs` and `npm run check:content` (all 14 gates) passed cleanly.
- 📁 Files: Updated MDX unit files, Urdu translations, figure manifests, tasks tracker, and added WebP figures under `static/img/figures/gqur-301/unit-11/`.
- 🔁 Next prompts: Next pipeline stage for GQUR-301 Unit 11 (independent G3 English review or G4 Urdu review).
- 🧠 Reflection: An intermittent WAF rejection from gflow on one image was cleanly resolved upon retry; updating the latest G2 tracker row restored pipeline gate passing status.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed raster illustrations fig-U11-5, fig-U11-6, and fig-U11-7 in GQUR-301 Unit 11; manifests updated to `placed`; refreshed G2 gate evidence and updated authoritative tracker row in `tasks.md`.
- Decisions: Retained existing approved prompts and alt texts verbatim, translating alt text for Urdu `<Figure>` components.
- Pending / next: G3 English review remains open pending fresh independent review under ADR-0019; G1 intake re-evaluation remains open for owner/evaluator resolution.
