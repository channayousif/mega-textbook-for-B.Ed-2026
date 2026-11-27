---
id: 20261301
title: Produce and place raster illustrations for EFPC-411 Unit 3
stage: general
date: 2026-11-27
surface: cli
model: gemini-3.8-flash
feature: EFPC-411
branch: crew/efpc-411-u03-illustrate
user: crew
command: scripts/heavy.sh node scripts/generate-illustration.mjs EFPC-411 3 --producer gflow
labels: [crew, illustrate, efpc-411, gflow]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-raster-illustrations.md
  pr: null
files:
  - docs/semester-4/efpc-411/unit-03/index.mdx
  - docs/semester-4/efpc-411/unit-03/topic-01.mdx
  - docs/semester-4/efpc-411/unit-03/topic-02.mdx
  - docs/semester-4/efpc-411/unit-03/topic-03.mdx
  - docs/semester-4/efpc-411/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-04.mdx
  - specs/content/efpc-411/figures/unit-03.banner.md
  - specs/content/efpc-411/figures/unit-03.md
  - specs/content/efpc-411/tasks.md
  - static/img/figures/efpc-411/unit-03/fig-U3-9.webp
  - static/img/figures/efpc-411/unit-03/fig-U3-10.webp
  - static/img/figures/efpc-411/unit-03/fig-U3-11.webp
  - static/img/figures/efpc-411/unit-03/fig-U3-12.webp
  - static/img/figures/efpc-411/unit-03/fig-U3-13.webp
tests:
  - scripts/prepare-gate-evidence.mjs EFPC-411 3
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated five raster illustrations (fig-U3-9 unit banner and fig-U3-10 through fig-U3-13 topic scenes) using gflow (Nano Banana). Verified each image for visual pedagogy, absence of text/calligraphy, authentic Pakistani dress/setting, and alignment with alt text. Placed `<Figure>` components in English and Urdu mirror files, transitioned manifests to `placed`, updated G2 gate evidence and tracker row, and passed all content gates.

## Outcome

- ✅ Impact: All five raster illustrations for EFPC-411 Unit 3 generated, inspected, placed in English and Urdu topic files, and verified via automated gates.
- 🧪 Tests: `prepare-gate-evidence.mjs` and `npm run check:content` passed with zero errors.
- 📁 Files: 17 files modified/created across unit MDX, Urdu translations, manifests, task tracker, and static assets.
- 🔁 Next prompts: Next pipeline stage for EFPC-411 Unit 3 (G3 English review or G4 Urdu review).
- 🧠 Reflection: Rate-limiting and pacing on gflow required patience; retrying with proper spacing allowed clean generation without hitting quota locks.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed raster illustrations fig-U3-9 through fig-U3-13 in EFPC-411 Unit 3; manifests updated to placed; G2 gate evidence refreshed and recorded in tasks.md.
- Decisions the team must respect: Reused single WebP asset for both English and Urdu mirrors per ADR-0029 with localized alt text.
- Pending / next owner: Independent G3 English review and G5 Urdu review remain open.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Initial WAF 403 on banner call resolved upon spaced retry.
- Graders run and results (PASS/FAIL): PASS on all content gates.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
