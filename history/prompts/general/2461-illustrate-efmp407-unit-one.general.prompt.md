---
id: 2461
title: Illustrate EFMP407 Unit One
stage: general
date: 2026-11-07
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/efmp-407-u01-illustrate
user: owner
command: crew brief
labels: ["codex", "illustration", "efmp-407"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - docs/semester-3/efmp-407/unit-01/index.mdx
  - specs/content/efmp-407/figures/unit-01.banner.md
  - specs/content/efmp-407/figures/unit-01.illustration-notes.md
  - static/img/figures/efmp-407/unit-01/fig-U1-7.webp
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/reviews/unit-01/G2/20261107T123059043Z-gates.json
tests:
  - Baseline and final npm run check:content
  - Standard WebP optimizer and visual inspection
  - git diff --check
  - npm run build:content-status (regenerated ignored local cache)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated and placed the Unit 1 banner using the approved Codex fallback after agy failed without a file. Corrected a seated pose to preserve the standing-pose alt. Recorded a draft Urdu placement snippet because no Urdu mirror exists.

## Outcome

- ✅ Impact: English unit banner placed with original prompt and alt retained.
- 🧪 Tests: Baseline passed all 14 content gates. Placement invalidated the prior G2 manifest; scoped deterministic draft gates passed and fresh evidence was recorded with the tracker reference repointed. Optimizer passed at 143.4 KB and 960 x 540.
- 📁 Files: One WebP, English index placement, banner lifecycle, illustration handoff and this PHR.
- 🔁 Next prompts: Translation owner creates Urdu mirror and inserts the recorded snippet. English author supplies any desired topic scene prompts.
- 🧠 Reflection: Inspect alt consistency before placement; reject a visually attractive but contradictory pose.

## Handoff (for CEO and agents)

- Shipped / changed: Banner fig-U1-7 placed in English; shared raster and draft Urdu snippet ready.
- Decisions the team must respect: Approved prompts and English alt unchanged; no SVG, review certification, translation status or publication changes.
- Pending / next owner: Translation owner: Urdu mirror absent. English author: topic manifest has no raster scene rows.
- Paperclip issues affected: efmp-407-u01-illustrate; no ticket identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: agy exited 3 after 611 seconds without PNG. Initial fallback showed seated group and was rejected. Larger WebP versions exceeded budget; final resized version passed.
- Graders run and results (PASS/FAIL): Baseline content gates PASS; optimizer PASS; visual inspection PASS; final content gates PASS after G2 refresh.
- Prompt variant (if applicable): Approved banner prompt plus repository house style, followed by pose-only correction.
- Next experiment (smallest change to try): Place existing shared WebP in Urdu when a mirror becomes available.
