---
id: 20261194
title: Illustrate EFMP-303 Unit Four
stage: general
date: 2026-11-14
surface: agent
model: GPT-6 (Codex)
feature: 009-figure-rendering
branch: crew/efmp-303-u04-illustrate
user: a2ahs
command: crew illustrate
labels: ["codex", "efmp-303", "unit-04", "illustrations"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - static/img/figures/efmp-303/unit-04/fig-U4-7.webp
  - static/img/figures/efmp-303/unit-04/fig-U4-6.webp
  - static/img/figures/efmp-303/unit-04/fig-U4-5.webp
  - specs/content/efmp-303/figures/unit-04.md
  - specs/content/efmp-303/figures/unit-04.banner.md
  - specs/content/efmp-303/tasks.md
  - docs/semester-2/efmp-303/unit-04/index.mdx
  - docs/semester-2/efmp-303/unit-04/topic-01.mdx
  - docs/semester-2/efmp-303/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-02.mdx
tests:
  - npm run build:content-status
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs EFMP-303 4
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated, visually inspected, optimised and placed three Unit 4 raster illustrations in English and Urdu. Preserved approved prompts and English alt text. Refresh deterministic G2 evidence after committing the changed inputs.

## Outcome

- ✅ Impact: Two topic scenes and one unit banner now render in both locales.
- 🧪 Tests: Baseline all 14 content gates pass; final validation and fresh G2 evidence recorded in follow-up commit.
- 📁 Files: Three WebP assets, six MDX carriers, two manifests, Unit 4 tracker and G2 evidence.
- 🔁 Next prompts: Independent G3 and G5 reviews remain open.
- 🧠 Reflection: Reject images that omit concrete objects required by the approved alt text.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U4-5 banner, fig-U4-6 report/classroom contrast and fig-U4-7 unused science kits; bilingual Figure placements.
- Decisions the team must respect: Approved prompts and English alt text unchanged; shared WebP per locale; no SVG edits or certification.
- Pending / next owner: Independent reviewers own fresh G3 and G5 plus narrow-screen and A4 page inspection on a permitted host.
- Paperclip issues affected: Crew job efmp-303-u04-illustrate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Rejected first two fig-U4-6 generations for missing bound report; second also had an empty carton. Reset status to prompt-only before each targeted rerun. Accepted third attempt after visual inspection.
- Graders run and results (PASS/FAIL): Baseline check:content PASS (14/14); final check and G2 results recorded in subsequent evidence commit.
- Prompt variant (if applicable): Approved manifest prompts plus unmodified repository house style via agy. 2026-11-14: accepted fig-U4-5 and fig-U4-7 reported Imagen; accepted fig-U4-6 reported gemini-3.1-flash-image. Outputs 1376x768, 142.0 KB, 105.6 KB and 112.5 KB respectively.
- Next experiment (smallest change to try): Review actual page layout and print appearance independently without changing approved scene meaning.
