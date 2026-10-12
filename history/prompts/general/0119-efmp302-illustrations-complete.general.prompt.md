---
id: 0119
title: EFMP-302 illustrations complete
stage: general
date: 2026-10-11
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/illustrations-efmp302-u4-6
user: M Yousif Channa
command: continue / retry (resumed session)
labels: ["board-direct", "illustrations", "gemini", "agy", "adr-0029", "efmp-302", "ux"]
links:
  spec: null
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
 - specs/content/efmp-302/figures/unit-04.md
 - specs/content/efmp-302/figures/unit-05.md
 - specs/content/efmp-302/figures/unit-06.md
 - specs/content/efmp-302/figures/unit-05.banner.md
 - specs/content/efmp-302/figures/unit-06.banner.md
 - docs/semester-1/efmp-302/unit-04/topic-04.mdx
 - docs/semester-1/efmp-302/unit-05/{index,topic-01..04}.mdx
 - docs/semester-1/efmp-302/unit-06/{index,topic-01..04}.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-0{4,5,6}/ (same files)
 - static/img/figures/efmp-302/unit-0{4,5,6}/fig-U*.webp (11 files)
 - specs/content/efmp-302/reviews/unit-0{4,5,6}/G2/20261012T0344*-gates.json
 - specs/content/efmp-302/tasks.md
tests:
 - check:figures PASS
 - check:no-em-dash PASS
 - prepare-gate-evidence EFMP-302 4, 5, 6 (all G2 gates PASS)
---

## Prompt

continue

retry

(Resumed board-direct session; the standing request from 2026-10-04 is "OK, ITS NOW IN BETTER shape, contunue" - finish the reading-UX plan and the illustration rollout.)

## Response snapshot

Finished the EFMP-302 illustration rollout that PR #98 began. The 11 rows held back on 2026-10-04 by the Gemini image quota (Topic 4.4, Units 5-6 banners and topic scenes) were restored on a fresh branch from main, generated serially through `scripts/generate-illustration.mjs` (no quota stop this time, 90-200 s each), inspected one by one, and placed in EN and UR with Urdu alt text. One alt text (fig-U5-12) was corrected to match the image. G2 gate evidence refreshed for Units 4-6 and tracker rows updated. EFMP-302 now has a banner on every unit and an opening scene on every topic (Units 1-6: 6 banners, 25 topic scenes).

## Outcome

- ✅ Impact: all six EFMP-302 units illustrated in both locales.
- 🧪 Tests: figure, em-dash and G2 gate runs above.
- 📁 Files: see list.
- 🔁 Next prompts: roll illustrations to the next course (EFMP-301 or GENG-300), one PR per course; G5 spot-check of the new Urdu alt texts.
- 🧠 Reflection: quota is shared with other agy users on the same Google account (WebLead, GrowthLead); about 15 images per window is the planning figure.

## Handoff (for CEO and agents)

- Shipped: 11 illustrations completing EFMP-302 (PR for branch `ux/illustrations-efmp302-u4-6`); G2 evidence for EFMP-302 Units 4-6 refreshed (`20261012T0344*`).
- Decisions to respect: ADR-0029 - Gemini via agy is a raster producer; Claude inspects every image before `placed` and rejects maps, flags, text or wrong scenes. Unit banners live in sidecar `figures/unit-NN.banner.md` (the `.banner` name keeps evidence unit-scoped). Never edit `scripts/check-figures.mjs` for this: it is hashed into every unit's review evidence.
- Pending: G5 spot-check of the Urdu alt texts added to EFMP-302 Units 1-6 (owner: Reviewer); next course rollout (owner: board-direct session or BilingualAuthor with agy access); the image quota is shared with WebLead/GrowthLead agy runs.
- Paperclip issues affected: none directly; relevant to TEX-24 (image QC).

## Evaluation notes (flywheel)

- Failure modes observed: none in this batch; earlier quota exhaustion now handled by the generator's exit-3 path.
- Graders run and results (PASS/FAIL): check:figures PASS, check:no-em-dash PASS, G2 gates PASS.
- Prompt variant (if applicable): house style with no maps/flags and the dress rule.
- Next experiment (smallest change to try): pre-write the next course's prompts and Urdu alt texts so a full quota window goes to generation only.
