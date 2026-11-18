---
id: 2475
title: Studio round two from owner pilot feedback
stage: general
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-notebook-studio
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/prompts/_common.md
  - specs/studio/prompts/audio.md
  - specs/studio/prompts/quiz.md
  - specs/studio/prompts/study-guide.md
  - specs/studio/prompts/infographic-brand.md
  - specs/studio/prompts/slides-brand.md
  - specs/studio/efmp-301/unit-04-mnemonics.md
tests:
  - none (generation and review round)
---

## Prompt

i have studied the produced the generated material, 1. Audio overview seems promising and of good enough quality. however it should be not be too lengthy, it should be quick and precise briefing for now. lengthy audios are ignored. Prefer to include MNEMONICS in the brief. we can also split the clip into many and reveal it gradually for more interested listeners
2. Urdu content has numerous typos and includes complex words we donot often speak or translates english terminology which makes things more complex. it is better to use english terms instead of translating them. 
3. Slide decks donot follow the website look and feel. both are different. It should have every element meaningful, not merely for decoration also should match with look and feel of our brand and website design.
4. i am wondering how mindmaps can be used?
5. infographs feel randomly made, design should reflect branding and design patterns.
6. try Quiz 
7. reports also excellent refernce material for the students

## Response snapshot

Plan round 2 approved with owner choices (try both visual options on 4.1; Urdu register for Studio and corpus, corpus as a separate track; audio split by generating short parts). Built source-checked mnemonics, audio v2 (brief + two go-deeper parts), Urdu register v2, a quiz trial (10/10 accurate, 6/10 usable after removing bank duplicates), study guides (Gemini adds an answer key, so it is stripped), and a bake-off page comparing brand-template posters and decks (A) with brand-steered Gemini images (B).

## Outcome

- ✅ Impact: evidence for every owner question; bake-off artifact for the decision.
- 🧪 Tests: none in this round.
- 📁 Files: prompt v2 set, mnemonics.
- 🔁 Next prompts: owner rulings on poster and deck options.
- 🧠 Reflection: image-baked text is the typo source; feeding a checked script fixes it.

## Handoff (for CEO and agents)

- Shipped / changed: prompts v2 and the mnemonic file in the branch; bake-off page (private artifact).
- Decisions the team must respect: Urdu Studio text keeps English technical terms; quizzes only ever go to quiz_items as drafts; study-guide answer sections are removed before publishing.
- Pending / next owner: Urdu corpus register proposal is a separate track needing its own decision.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: quiz duplicates of the unit bank; study guide answer key; poster typos in every Gemini image.
- Graders run and results (PASS/FAIL): n/a.
- Prompt variant (if applicable): audio v2, quiz v2, _common v2, slides v3/v4-brand.
- Next experiment (smallest change to try): quiz v2 with the exclusion list.
