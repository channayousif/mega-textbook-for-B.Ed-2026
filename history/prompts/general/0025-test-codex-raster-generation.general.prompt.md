---
id: 0025
title: Test Codex raster generation
stage: general
date: 2026-09-14
surface: agent
model: GPT-5
feature: none
branch: chore/comparator-base-bank-decoupling-and-en-first
user: a2ahs
command: image generation test
labels: [image-generation, raster, course-figures, validation]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0025-test-codex-raster-generation.general.prompt.md
tests:
  - Built-in image generation completed successfully
  - npm run optimize:figure first render failed correctly at 159.2 KB
  - npm run optimize:figure revised render passed at 72.6 KB and 1536 by 1024 pixels
  - Optimized WebP inspected visually
---

## Prompt

lets test the it

## Response snapshot

Generated a preview raster illustration for a B.Ed course page showing collaborative teacher education in Sindh. The first detailed render exceeded the repository's 150 KB raster budget. A targeted flatter revision compressed successfully to a 72.6 KB, 1536 by 1024 WebP and retained acceptable visual quality. The preview was not placed in a course because no current manifest row requests an illustration.

## Outcome

- Impact: Proved that Codex image generation works with the repository's raster optimization pipeline.
- Tests: Generation, budget-failure handling, successful WebP optimization, and visual inspection all completed.
- Files: This prompt history record only; generated previews remain outside committed course assets.
- Next prompts: Select or add an illustration row in a course figure manifest for a production placement test.
- Reflection: Flat editorial imagery is substantially more compatible with the 150 KB course-asset budget than detailed painterly imagery.

## Evaluation notes (flywheel)

- Failure modes observed: The first 1536 by 1024 render compressed to 159.2 KB, exceeding the hard budget by 9.2 KB.
- Graders run and results (PASS/FAIL): First optimization expected FAIL; revised optimization PASS; visual inspection PASS.
- Prompt variant (if applicable): v2 simplified background and texture.
- Next experiment (smallest change to try): Assign one real manifest row the illustration archetype and run generation through placement and content gates.
