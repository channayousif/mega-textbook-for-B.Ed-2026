---
id: 20261197
title: Generate varied classroom responses illustration
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
 - specs/content/efmp-305/figures/.staging/fig-U3-8.png
tests:
 - Visual inspection
 - PNG format and dimensions checked with file
---

## Prompt

Use your built-in image-generation tool to generate this illustration.
Style: Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan. Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan (for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard). Respectful, inclusive, natural expressions; no stereotypes or caricature. Every adult in the frame wears Pakistani dress: no blazers, suits, jackets or Western office clothing on any teacher, parent or head teacher, including figures in the background or in insets. Clean composition with soft natural light and a calm palette that sits well beside teal (#1f6f5c). Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image, and no maps, globes with country outlines, flags or national emblems; keep wall posters to simple shapes or plants.
Scene: illustration, landscape 16:9: a Grade 6 science lesson in a government girls' school in Hyderabad, Sindh, seen from the side of the room; fifty-one pupils on fixed benches in seven rows, one textbook shared on each bench; at the front a woman teacher in her thirties in shalwar kameez and dupatta stands at the blackboard pointing to a chalk drawing of a leaf with arrows, explaining to the whole class in one way; across the rows the girls respond very differently to the same lesson: some write answers confidently, some copy word for word from the open textbook, some have drawn a careful leaf diagram and written nothing, some sit with their pens still, looking lost; on the back bench one girl sits with an empty exercise book closed in front of her, withdrawn; in the second row one girl has her hand raised high with a curious, eager expression, as if asking a question beyond the lesson; pupils in white and blue uniforms with white dupattas; plain blackboard with unlabelled chalk marks, whitewashed walls, barred window with morning light, ceiling fan; no readable text, letters or numbers anywhere, no map, flag or emblem in frame; warm natural light, documentary feel.
Aspect ratio: 16:9 landscape.
Save the image as a PNG file at exactly this path: specs/content/efmp-305/figures/.staging/fig-U3-8.png

## Response snapshot

Generated with the built-in image-generation tool and saved to the requested staging path.

## Outcome

- Impact: Created the requested classroom illustration.
- Tests: PNG verified. Visually checked Pakistani dress, leaf diagram, barred window, varied pupil expressions, raised hand and absence of readable text or national symbols.
- Files: Requested staging PNG and this record.
- Next prompts: Course owner assesses pedagogical acceptance before optimisation and placement.
- Reflection: Exact pupil count, seven rows and one shared textbook per bench are not reliably met by the generated composition.

## Handoff (for CEO and agents)

- Shipped / changed: Staging illustration fig-U3-8.png.
- Decisions the team must respect: Built-in tool used; no publication or manifest transition.
- Pending / next owner: Course owner evaluates staging image. The generated image has more individual open books than requested and the raised hand is not clearly in the second row. Exact pupil count and row count are unverified.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Dense classroom counting and exact book distribution were imperfect. Native output is approximately 16:9 with pixel rounding.
- Graders run and results (PASS/FAIL): PASS PNG verification; partial visual fidelity, with limitations recorded above.
- Prompt variant (if applicable): User prompt followed by production clarification below.
- Next experiment (smallest change to try): Target book sharing and exact row arrangement if revision is requested.

## Final generation prompt

Use your built-in image-generation tool to generate this illustration.
Style: Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan. Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan (for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard). Respectful, inclusive, natural expressions; no stereotypes or caricature. Every adult in the frame wears Pakistani dress: no blazers, suits, jackets or Western office clothing on any teacher, parent or head teacher, including figures in the background or in insets. Clean composition with soft natural light and a calm palette that sits well beside teal (#1f6f5c). Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image, and no maps, globes with country outlines, flags or national emblems; keep wall posters to simple shapes or plants.
Scene: illustration, landscape 16:9: a Grade 6 science lesson in a government girls' school in Hyderabad, Sindh, seen from the side of the room; fifty-one pupils on fixed benches in seven rows, one textbook shared on each bench; at the front a woman teacher in her thirties in shalwar kameez and dupatta stands at the blackboard pointing to a chalk drawing of a leaf with arrows, explaining to the whole class in one way; across the rows the girls respond very differently to the same lesson: some write answers confidently, some copy word for word from the open textbook, some have drawn a careful leaf diagram and written nothing, some sit with their pens still, looking lost; on the back bench one girl sits with an empty exercise book closed in front of her, withdrawn; in the second row one girl has her hand raised high with a curious, eager expression, as if asking a question beyond the lesson; pupils in white and blue uniforms with white dupattas; plain blackboard with unlabelled chalk marks, whitewashed walls, barred window with morning light, ceiling fan; no readable text, letters or numbers anywhere, no map, flag or emblem in frame; warm natural light, documentary feel.
Aspect ratio: 16:9 landscape.
Save the image as a PNG file at exactly this path: specs/content/efmp-305/figures/.staging/fig-U3-8.png

Production clarification: Render landscape 16:9. Side-of-room wide view with seven clearly separated bench rows, fifty-one girls total (eight in each of the first two rows, seven in each remaining row). Make the varied pupil responses readable through pose and expression. All pages must contain only blank areas or leaf drawings and nonlinguistic small strokes, absolutely no writing or pseudo-text. One eager raised hand in the second row; withdrawn pupil and closed book on the last bench. Teacher is the only adult. Save generated PNG output.

