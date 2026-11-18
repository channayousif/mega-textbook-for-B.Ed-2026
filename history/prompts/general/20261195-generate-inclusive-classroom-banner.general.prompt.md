---
id: 20261195
title: Generate inclusive classroom banner
stage: general
date: 2026-11-14
surface: agent
model: GPT-6
feature: efmp-305
branch: crew/efmp-305-u01-illustrate
user: owner
command: imagegen
labels: [codex, imagegen]
links:
  spec: specs/content/efmp-305/figures/unit-01.banner.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-305/figures/.staging/fig-U1-5.png
tests:
 - Visual inspection of generated illustration
 - PNG signature and dimensions verified using file
---

## Prompt

Use your built-in image-generation tool to generate this illustration.
Style: Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan. Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan (for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard). Respectful, inclusive, natural expressions; no stereotypes or caricature. Every adult in the frame wears Pakistani dress: no blazers, suits, jackets or Western office clothing on any teacher, parent or head teacher, including figures in the background or in insets. Clean composition with soft natural light and a calm palette that sits well beside teal (#1f6f5c). Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image, and no maps, globes with country outlines, flags or national emblems; keep wall posters to simple shapes or plants.
Scene: unit banner, wide 16:9 landscape scene: a bright Grade 4 classroom in a government primary school in Sindh where every child learns together in the same room; pupils in white and blue uniforms, girls with dupattas, sit in small mixed groups around pushed-together desks; in one group a boy who uses a wheelchair sits at the desk level with his classmates, sharing a picture card with them; in another a girl with a hearing aid watches a classmate point to a drawing; a slower pupil is helped by a peer beside him; a woman teacher in shalwar kameez and dupatta crouches beside one group, listening and encouraging, not lecturing from the front; a gentle ramp at the classroom door, a plain blackboard with unreadable chalk marks, whitewashed walls, barred window with warm morning light, ceiling fan; no readable text, letters or numbers anywhere, no map, flag or emblem in frame; warm natural light, documentary feel.
Aspect ratio: 16:9 landscape.
Save the image as a PNG file at exactly this path: specs/content/efmp-305/figures/.staging/fig-U1-5.png

## Response snapshot

Generated using the built-in image-generation tool and saved to the exact requested staging path.

## Outcome

- Impact: Created inclusive classroom banner PNG.
- Tests: Visual inspection and PNG format verification passed. Native output is 1672 x 941, approximately 16:9.
- Files: Requested staging PNG and this record.
- Next prompts: Optimisation and placement when requested.
- Reflection: Preserved the staged handoff without altering publication or review status.

## Handoff (for CEO and agents)

- Shipped / changed: Banner PNG in the requested staging location.
- Decisions the team must respect: Built-in image generation; no text or national symbols.
- Pending / next owner: Course owner handles publication and pedagogical acceptance.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: None in generated content; native aspect ratio has minor pixel rounding.
- Graders run and results (PASS/FAIL): PASS visual inspection and PNG validation.
- Prompt variant (if applicable): Final generation prompt recorded below.
- Next experiment (smallest change to try): None required.

## Final generation prompt

Create a 16:9 landscape unit-banner PNG. Warm flat-vector editorial illustration for a teacher-education textbook in Pakistan, documentary observational composition, soft natural morning light, calm palette complementing teal #1f6f5c.
A bright Grade 4 classroom in a government primary school in Sindh where every child learns together in the same room. Pupils in authentic white and blue school uniforms, girls with dupattas, sit in small mixed groups around pushed-together desks. In one group a boy who uses a wheelchair sits at desk level with classmates, sharing a picture card with them; show wheelchair clearly and realistically with room for knees below desk. In another group a girl with a visible behind-ear hearing aid watches a classmate point to a drawing. Another pupil taking more time with his task is helped supportively by a peer beside him. A woman teacher in Pakistani shalwar kameez and dupatta crouches beside a group, listening and encouraging. Respectful, inclusive, natural expressions; no stereotypes or caricature.
Gentle ramp visible at classroom door, plain blackboard with only a few abstract chalk smudges, whitewashed walls, barred window admitting warm morning light, ceiling fan. Every adult, including any background adult, must wear Pakistani dress, no blazers, suits, jackets or Western office clothing. All picture cards and drawings contain simple pictures only.
Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere. No maps, globes with country outlines, flags, national emblems. Any wall poster contains only simple shapes or plants. Clean readable composition with all inclusion interactions visible, warm flat-vector shapes and restrained shading.

