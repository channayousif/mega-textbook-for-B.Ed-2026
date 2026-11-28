---
id: 20261315
title: Content Pack v2 Stage 2 cast bible draft
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 038-content-pack-v2
branch: feature/038-stage2-cast
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "content-pack", "cast"]
links:
  spec: specs/038-content-pack-v2/spec.md
  ticket: null
  adr: history/adr/0040-content-pack-v2-supersedes-the-teaser-model.md
  pr: null
files:
 - specs/studio/characters/README.md
 - specs/studio/characters/_style-guide.md
 - specs/studio/characters/{noor,sami,lena,zara}/{profile.yaml,voice.yaml,prompt-block.txt,sheet.md}
 - specs/038-content-pack-v2/tasks.md
tests:
 - check-studio-manifest passes; no em dash in new files
---

## Prompt

ok

(reply to: "may I create these tables on the live database now? ... Stage 2 (the new cast) can start alongside it.")

## Response snapshot

Drafted the season 1 cast bible: a style token (flat 2D vector, teal outlines, cel shading, house
palette from brand.mjs, blank signs, no text or logos), sets, aspect rules and sheet contents, plus
four characters with profile, voice and verbatim prompt block: Noor (Mentor, Flow voice Sulafat),
Sami (Trainee, Achird), Lena (Skeptic, Kore), Zara (Student, Leda). Voices come from
`gflow_character_voices` (static list, no credits). None is titled or credentialed. Running series:
Staffroom Questions, Lesson Plan Clinic, Myth or Fact?, From the Back Row. No images were generated:
sheets wait for the owner's review of the descriptions and for media hours.

## Outcome

- ✅ Impact: a reviewable cast exists; prompts can now reuse fixed character blocks.
- 🧪 Tests: studio checker pass.
- 📁 Files: listed above.
- 🔁 Next prompts: owner reviews names, looks and voices; then sheets with gflow Nano Banana in media hours and owner lock (T009).
- 🧠 Reflection: draft the words first; images cost credits and are only worth making once the descriptions are approved.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/characters/ (draft, not locked).
- Decisions the team must respect: paste prompt-block.txt verbatim; no character is presented as a real or credentialed expert; Zara never appears outside a classroom setting.
- Pending / next owner: owner approves or edits the cast; T009 sheet generation and lock.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): studio checker PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): one front-view take per character to test the style token before full sheets.
