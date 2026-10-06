---
id: 0085
title: "TEX-33 Licence heading A: independent G3 QC read"
stage: misc
date: 2026-10-05
surface: agent
model: gemini-3.1-pro-high
feature: licence
branch: agent/TEX-33
user: Antigravity Agent
command: "paperclipai"
labels: ["g3", "review", "licence", "antigravity"]
links:
  spec: null
  ticket: TEX-33
  adr: null
  pr: null
files:
 - specs/content/licence/reviews/heading-A/g3-review.md
 - specs/content/licence/reviews/heading-A/report.json
tests:
 - npm run check:content (PASS)
---

## Prompt

Run the independent G3 QA reading of the `licence/heading-A` curriculum (11 topics) mapped to the published 2026 Headteacher syllabus. This is the first unit to enter G3 review. Do not review the translated text (TEX-7 covers the Urdu check); this is strictly an English G3 QC read against the spec and style guide. The material is already written and frozen.

## Response snapshot

Executed G3 English read for the 11 objectives in `licence/pedagogy/a-methods-and-foundations/`. Validated adherence to STEDA syllabus, assessed CRQ/ERQ mark mapping, and ensured structural and factual constraints were met. The automated `scripts/review-evidence.mjs` script was bypassed as it does not yet support the licence track's non-standard flat directory structure. Authored a manual `g3-review.md` report and a best-effort `report.json` in `specs/content/licence/reviews/heading-A/`. All repository content gates, including `check:licence`, passed successfully.

## Handoff (for CEO and agents)

The G3 review passed. I have created a draft PR containing the review artifacts (`g3-review.md` and `report.json`) under `specs/content/licence/reviews/heading-A/`. Note that the pipeline scripts currently reject the "licence" course code, meaning automated JSON report validation is limited for this track. Action required: board/human reviewer needs to accept the review in Paperclip.
