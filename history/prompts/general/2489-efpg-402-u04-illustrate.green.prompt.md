---
id: 2489
title: EFPG-402 Unit 4 raster illustrations and placement
stage: green
date: 2026-11-28
surface: agent
model: gemini-3.8-flash
feature: none
branch: crew/efpg-402-u04-illustrate
user: crew
command: Read .crew/brief.md and carry it out
labels: [agy, illustrate, efpg-402]
links:
  spec: null
  ticket: null
  adr: history/adr/0029-gemini-illustrations.md
  pr: null
files:
  - docs/semester-4/efpg-402/unit-04/index.mdx
  - docs/semester-4/efpg-402/unit-04/topic-01.mdx
  - docs/semester-4/efpg-402/unit-04/topic-02.mdx
  - docs/semester-4/efpg-402/unit-04/topic-03.mdx
  - docs/semester-4/efpg-402/unit-04/topic-04.mdx
  - docs/semester-4/efpg-402/unit-04/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-05.mdx
  - specs/content/efpg-402/figures/unit-04.banner.md
  - specs/content/efpg-402/figures/unit-04.md
  - specs/content/efpg-402/tasks.md
  - specs/content/efpg-402/reviews/unit-04/G2/20261127T233524764Z-gates.json
  - static/img/figures/efpg-402/unit-04/fig-U4-11.webp
  - static/img/figures/efpg-402/unit-04/fig-U4-12.webp
  - static/img/figures/efpg-402/unit-04/fig-U4-13.webp
  - static/img/figures/efpg-402/unit-04/fig-U4-14.webp
  - static/img/figures/efpg-402/unit-04/fig-U4-15.webp
  - static/img/figures/efpg-402/unit-04/fig-U4-16.webp
tests:
  - scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 4 --producer gflow
  - scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 4 --producer gflow --banner
  - node scripts/prepare-gate-evidence.mjs EFPG-402 4
  - npm run build:content-status && npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Task section of the brief, verbatim:

## Task
Produce the raster illustrations for EFPG-402 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 4 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

## Response snapshot

Generated `fig-U4-12` through `fig-U4-16` and unit banner `fig-U4-11` using `gflow` via `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 4 --producer gflow` (and with `--banner`). Inspected all six generated images against pedagogical and cultural guidelines (absence of text, correct regional attire, no sacred figures/scripture, teaching efficacy). Placed `<Figure>` components in English and Urdu MDX files, updated manifests and tracker, prepared G2 gate evidence via `node scripts/prepare-gate-evidence.mjs EFPG-402 4`, and verified all 14 content gates with `npm run build:content-status && npm run check:content`.

## Outcome

- Impact: EFPG-402 Unit 4 raster illustrations (5 topic scenes + 1 unit banner) are generated, inspected, placed in English and Urdu mirrors, and validated through all repository content gates.
- Tests: `prepare-gate-evidence` passed; `check:content` passed all 14 gates cleanly.
- Files: 6 WebP images placed; updated topic and index MDX in EN and UR; updated manifests; updated tasks.md; new G2 gate evidence and logs.
- Next prompts: Independent qualified G3 English content review and G5 Urdu review.
- Reflection: The pipeline executed cleanly with gflow providing authentic illustrations adhering strictly to text-free, cultural dress, and pedagogical accuracy standards.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed fig-U4-11 (banner) and fig-U4-12 to fig-U4-16 (topic scenes). Placed Figure components in English and Urdu topic/index MDX files. Updated manifests to placed. Recorded fresh G2 gate evidence (20261127T233524764Z-gates.json) and updated tasks.md.
- Decisions the team must respect: G3 English review and G5 Urdu review remain open and unsigned per ADR-0019.
- Pending / next owner: Independent G3/G5 reviews.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; image generation, inspection, placement, and validation all succeeded on first pass.
- Graders run and results (PASS/FAIL): all 14 content gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
