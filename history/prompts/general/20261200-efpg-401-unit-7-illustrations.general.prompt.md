---
id: 20261200
title: Produce EFPG-401 Unit 7 raster illustrations
stage: general
date: 2026-11-15
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/efpg-401-u07-illustrate
user: crew
command: Read .crew/brief.md
labels: ["codex", "illustrations", "efpg-401"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
 - docs/semester-3/efpg-401/unit-07/
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/
 - specs/content/efpg-401/figures/unit-07.md
 - specs/content/efpg-401/figures/unit-07.banner.md
 - specs/content/efpg-401/tasks.md
 - specs/content/efpg-401/reviews/unit-07/G2/
 - static/img/figures/efpg-401/unit-07/
tests:
 - Visual inspection of all three source and optimized illustrations
 - WebP optimizer size and dimension checks
 - npm run build:content-status
 - npm run check:content
 - node scripts/prepare-gate-evidence.mjs EFPG-401 7
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated, inspected, optimized and placed two topic scenes and one unit banner in English and Urdu. Preserved approved English prompts and alt text. Refreshed G2 evidence.

## Outcome

- ✅ Impact: Unit 7 now has shared raster illustrations in both locales.
- 🧪 Tests: All 14 content gates pass on origin/main and final branch; G2 deterministic checks pass.
- 📁 Files: Three WebP assets, six MDX carriers, two manifests, tracker, G2 evidence and this PHR.
- 🔁 Next prompts: Independent G3 and G5 reviews remain pending.
- 🧠 Reflection: Generation success alone is insufficient; inspected teaching contrast, clothing, absence of text and agreement with alt text before placement.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U7-5 banner and fig-U7-6/fig-U7-7 topic scenes placed with Urdu alt text.
- Decisions the team must respect: Approved prompts and English alt text retained. No G3/G5 certification or publication performed.
- Pending / next owner: Independent reviewers own G3/G5; Urdu remains draft.
- Paperclip issues affected: EFPG-401 Unit 7 illustrate crew job; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Gemini topic generation returned QUOTA_EXHAUSTED; required banner attempt also failed and was stopped after 73 seconds. Quota reset reported as 2026-11-17T11:00:06Z. Used approved Codex built-in imagegen fallback serially on 2026-11-15. Images saved as exec-33576f80-17ad-40f7-8851-78d08c018b74.png (fig-U7-6), exec-fcfb980e-d7e2-4dc8-93b5-70479402ae5f.png (fig-U7-7), exec-2a861d1c-4d6c-4cfd-9cbd-c0865d8a6b2a.png (fig-U7-5). Topic scenes optimized at 1200px (136.2 and 108.1 KB); banner required 1100px (133.2 KB). One optimizer invocation raced the pending resize and failed on a missing input; rerun after resize passed.
- Graders run and results (PASS/FAIL): PASS: visual inspection, WebP budget, content gates and refreshed G2 evidence.
- Prompt variant (if applicable): Approved manifest prompts plus explicit no-text, dress and prohibited-imagery constraints.
- Next experiment (smallest change to try): None required for this bounded production job.
