---
id: 20261196
title: Generate differentiated science classroom banner
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
  spec: specs/content/efmp-305/figures/unit-03.banner.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-305/figures/.staging/fig-U3-7.png
tests:
 - Visual inspection of generated illustration
 - PNG format and dimensions checked with file
---

## Prompt

Use your built-in image-generation tool to generate this illustration.
Style: Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan. Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan (for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard). Respectful, inclusive, natural expressions; no stereotypes or caricature. Every adult in the frame wears Pakistani dress: no blazers, suits, jackets or Western office clothing on any teacher, parent or head teacher, including figures in the background or in insets. Clean composition with soft natural light and a calm palette that sits well beside teal (#1f6f5c). Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image, and no maps, globes with country outlines, flags or national emblems; keep wall posters to simple shapes or plants.
Scene: unit banner, wide 16:9 landscape scene: a Grade 6 science lesson in a crowded government girls' school in Sindh, about fifty pupils on fixed benches in long rows, where one lesson is reaching every learner; pairs of girls on each bench have turned towards each other to talk through the same question; the papers on the benches differ: some pairs have a worksheet with large simple pictures of a leaf, sun and water drops, others a plainer sheet with more writing lines, and one girl in thick glasses holds an enlarged sheet close to her face; near the front a woman teacher in shalwar kameez and dupatta bends beside a quiet pupil who is answering her aloud while the teacher listens and makes a small note; a potted green plant stands on the teacher's table in the sunlight; pupils in white and blue uniforms with white dupattas; plain blackboard with an unlabelled chalk drawing of a leaf, whitewashed walls, barred window with warm morning light, ceiling fan; no readable text, letters or numbers anywhere, no map, flag or emblem in frame; warm natural light, documentary feel.
Aspect ratio: 16:9 landscape.
Save the image as a PNG file at exactly this path: specs/content/efmp-305/figures/.staging/fig-U3-7.png

## Response snapshot

Generated with the built-in image-generation tool and saved to the requested staging path.

## Outcome

- Impact: Created the differentiated science classroom banner.
- Tests: Visual inspection passed for dress, classroom interactions, varied worksheets, enlarged sheet and absence of lettering or national symbols. PNG verified; native dimensions 1672 x 941, approximately 16:9 with pixel rounding.
- Files: Requested staging PNG and this record.
- Next prompts: Optimisation and placement when requested.
- Reflection: Kept staging separate from publication.

## Handoff (for CEO and agents)

- Shipped / changed: Banner PNG at the requested staging path.
- Decisions the team must respect: Built-in generation; preserved the figure ID and planned scene.
- Pending / next owner: Course owner handles pedagogical acceptance and placement.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Native aspect ratio has minor pixel rounding.
- Graders run and results (PASS/FAIL): PASS visual inspection and PNG verification.
- Prompt variant (if applicable): Final generation prompt below.
- Next experiment (smallest change to try): None required.

## Final generation prompt

Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan. Wide 16:9 landscape unit banner. Scene: a Grade 6 science lesson in a crowded government girls' school in Sindh, about fifty pupils on fixed benches in long rows, where one lesson is reaching every learner; pairs of girls on each bench have turned towards each other to talk through the same question; the papers on the benches differ: some pairs have a worksheet with large simple pictures of a leaf, sun and water drops, others a plainer sheet with more blank writing lines (only empty straight rules, no writing), and one girl in thick glasses holds an enlarged sheet close to her face; near the front a woman teacher in shalwar kameez and dupatta bends beside a quiet pupil who is answering her aloud while the teacher listens and makes a small note in a small notebook (no visible writing); a potted green plant stands on the teacher's table in the sunlight; pupils in white and blue uniforms with white dupattas; plain blackboard with an unlabelled chalk drawing of a leaf, whitewashed walls, barred window with warm morning light, ceiling fan. Authentic Sindh Pakistani setting, people, dress and classroom objects. Respectful, inclusive, natural expressions; no stereotypes or caricature. Every adult in Pakistani dress, including any background figures: no blazers, suits, jackets or Western office clothing. Clean composition with soft natural light and calm palette beside teal (#1f6f5c), warm natural light and documentary feel rendered in flat-vector editorial style. Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere. No maps, globes with country outlines, flags or national emblems; wall decorations if any only simple shapes or plants. Output PNG, 16:9 landscape.

