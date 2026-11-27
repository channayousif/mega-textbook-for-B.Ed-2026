---
id: 2488
title: GQUR-301 Unit 14 raster illustrations and placement
stage: green
date: 2026-11-28
surface: agent
model: gemini-3.8-flash
feature: none
branch: crew/gqur-301-u14-illustrate
user: crew
command: Read .crew/brief.md and carry it out
labels: [agy, illustrate, gqur-301]
links:
  spec: null
  ticket: null
  adr: history/adr/0029-gemini-illustrations.md
  pr: null
files:
  - docs/semester-2/gqur-301/unit-14/index.mdx
  - docs/semester-2/gqur-301/unit-14/topic-01.mdx
  - docs/semester-2/gqur-301/unit-14/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
  - specs/content/gqur-301/figures/unit-14.banner.md
  - specs/content/gqur-301/figures/unit-14.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-14/G2/20261127T222937139Z-gates.json
  - static/img/figures/gqur-301/unit-14/fig-U14-5.webp
  - static/img/figures/gqur-301/unit-14/fig-U14-6.webp
  - static/img/figures/gqur-301/unit-14/fig-U14-7.webp
tests:
  - scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 14 --producer agy2
  - scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 14 --producer agy2 --banner
  - node scripts/prepare-gate-evidence.mjs GQUR-301 14
  - npm run build:content-status && npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Task section of the brief, verbatim:

## Task
Produce the raster illustrations for GQUR-301 Unit 14 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 14 --producer agy2` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's agy2 image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (agy2 is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

## Response snapshot

Generated `fig-U14-6`, `fig-U14-7`, and `fig-U14-5` with agy2 (`scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 14 --producer agy2` and `--banner`), inspected all three images against pedagogical and cultural criteria, placed them as `<Figure>` elements in English and Urdu MDX unit files, marked manifest rows `placed`, committed, generated fresh G2 gate evidence, updated the G2 tracker row in `tasks.md`, and validated all 14 content gates.

## Outcome

- ✅ Impact: GQUR-301 Unit 14 now has all raster illustrations generated, inspected, and placed in both locales.
- 🧪 Tests: `prepare-gate-evidence` passed; all 14 content gates passed cleanly.
- 📁 Files: 3 new WebP illustrations, updated English and Urdu topic and index MDX files, manifests, G2 evidence JSON and logs, and `tasks.md`.
- 🔁 Next prompts: Unit 14 G3 English review / G4 Urdu translation validation.
- 🧠 Reflection: Following the mandated two-stage commit protocol (content + manifests first, then prepare gate evidence and update tracker) ensured clean reproducibility.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed fig-U14-5, fig-U14-6, and fig-U14-7; updated figure manifests and Urdu mirror topics/index; refreshed G2 gate evidence and updated tasks.md.
- Decisions the team must respect: G3 remains open and unsigned pending independent review under ADR-0019.
- Pending / next owner: G3 English review and subsequent translation verification.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; image generation and gate runs succeeded cleanly on first attempt.
- Graders run and results (PASS/FAIL): all 14 content gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
