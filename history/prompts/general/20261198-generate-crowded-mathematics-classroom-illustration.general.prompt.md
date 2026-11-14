---
id: 20261198
title: Generate crowded mathematics classroom illustration
stage: general
date: 2026-11-14
surface: agent
model: GPT-6
feature: efmp-305
branch: crew/efmp-305-u03-illustrate
user: owner
command: imagegen
labels: [codex, imagegen]
links:
  spec: specs/content/efmp-305/figures/unit-03.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-305/figures/.staging/fig-U3-9.png
tests:
 - Visual inspection
 - PNG format and dimensions checked with file
---

## Prompt

Use your built-in image-generation tool to generate this illustration.
Style: Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan. Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan (for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard). Respectful, inclusive, natural expressions; no stereotypes or caricature. Every adult in the frame wears Pakistani dress: no blazers, suits, jackets or Western office clothing on any teacher, parent or head teacher, including figures in the background or in insets. Clean composition with soft natural light and a calm palette that sits well beside teal (#1f6f5c). Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image, and no maps, globes with country outlines, flags or national emblems; keep wall posters to simple shapes or plants.
Scene: In a crowded Larkana boys' classroom with benches bolted to the floor, groups of six boys twist round on each bench while the teacher walks between rows: on one bench five boys copy from one, on another two argue, on a third they chat about cricket, on a fourth one boy dictates answers, and on a fifth two puzzled boys sit with blank pages.
Aspect ratio: 16:9 landscape.
Save the image as a PNG file at exactly this path: specs/content/efmp-305/figures/.staging/fig-U3-9.png

## Response snapshot

Generated with built-in image generation, revised once and saved at the requested path.

## Outcome

- Impact: Requested staging PNG created.
- Tests: Visual inspection; PNG verified at 1672 x 941, approximately 16:9.
- Files: Staging PNG and this PHR.
- Next prompts: Owner evaluates pedagogical fidelity.
- Reflection: Revision improved style and foreground copying; five distinct groups were not achieved.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U3-9.png staging asset.
- Decisions the team must respect: No manifest transition or publication.
- Pending / next owner: Course owner evaluates. Four bench rows appear, arguing pair is absent, puzzled pair is not clearly distinguished. Counts and twisting seating are imperfect.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Dense scene omitted arguing group despite revision.
- Graders run and results (PASS/FAIL): PASS PNG verification; partial scene fidelity. No readable text or national symbols observed.
- Prompt variant (if applicable): User prompt normalized; revision requested flatter vector style, five rows of six, arguing pair, one foreground writer, and abstract page marks.
- Next experiment (smallest change to try): Fresh five-group composition if revision is requested.
