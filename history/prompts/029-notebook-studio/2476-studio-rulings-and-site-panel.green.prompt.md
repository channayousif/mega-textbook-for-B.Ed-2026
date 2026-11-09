---
id: 2476
title: Studio rulings and the Study Studio site panel
stage: green
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
  - scripts/notebook-studio/postprocess-report.mjs
  - scripts/notebook-studio/ingest.mjs
  - scripts/check-studio-manifest.mjs
  - scripts/build-studio-index.mjs
  - specs/studio/studio-manifest.schema.json
  - specs/studio/efmp-301/unit-04.json
  - specs/studio/efmp-301/unit-04-topic-01-mindmap-labels.json
  - specs/studio/efmp-301/unit-04-topic-01-review.md
  - static/studio/efmp-301/unit-04/topic-01/
  - src/lib/studioMarkdown.ts
  - src/components/Studio/
  - src/theme/DocItem/Content.tsx
  - package.json
  - AGENTS.md
  - specs/029-notebook-studio/
  - tests/unit/notebook-studio.test.mjs
tests:
  - tests/unit/notebook-studio.test.mjs
  - npm run check:content (14/14 PASS)
---

## Prompt

1. Audio Winning Student Attention Through Lesson Structure is more interesting and easy to follow, urdu versions are still need to be explored
2. good
3. deck b clearly wins, find ways to minimize typos.
4. Good, Agree
5. ok
6. ok

(Follow-ups in the same exchange, verbatim:)

can we edit a slide in nlm

urdu version is excellent.

## Response snapshot

Rulings: poster option A, deck option B, the audio brief format (Part 1, "Winning Student Attention Through Lesson Structure") as the model, Urdu audio approved. Typo control for decks: feed Gemini the Claude-checked script (slides v4-brand) then proofread every slide; v4 came back with 0 typos and no long dashes; `nlm slides revise` regenerates flagged slides (PPTX is image-only). Built the site side: report post-processor, ingest, manifest schema and gate, index builder, and the Study Studio panel (poster, mind map with recall mode, brief, study guide, listen with go-deeper reveal, teacher slides). All Studio data was moved out of review-bound paths (specs/content, contracts, gates.mjs) after confirming the ADR-0027 scope rule; the gate runs inside npm test.

## Outcome

- ✅ Impact: Topic 4.1 shows a Study Studio panel in EN and UR with no topic MDX edits and no stale review evidence.
- 🧪 Tests: Studio unit tests 18/18; check:content 14/14 including pipeline-gate.
- 📁 Files: see front matter.
- 🔁 Next prompts: owner picks audio/slide hosting; quiz import; rollout.
- 🧠 Reflection: placing data in specs/content/<course>/ or contracts/ would have re-opened certified units; check review-evidence scope before choosing a path.

## Handoff (for CEO and agents)

- Shipped / changed: Feature 029 pilot on branch feat/029-notebook-studio (draft PR).
- Decisions the team must respect: poster = brand template from checked content; deck = Gemini drawn from a checked script, proofread per slide; audio = 2-3 min brief with memory hooks plus optional parts; Urdu Studio text keeps English terms; Studio files stay outside review-bound paths; gate lives in npm test, not gates.mjs.
- Pending / next owner: owner chooses hosting for audio and slides; Urdu-reader check of UR assets; quiz v2 import; rollout plan; Urdu corpus register proposal (separate track).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: literal long dashes written into source files by the editor tool (fixed to escapes); initial placement in bound paths (moved).
- Graders run and results (PASS/FAIL): vitest PASS; check:content PASS.
- Prompt variant (if applicable): slides v4-brand, audio v2, _common v2.
- Next experiment (smallest change to try): quiz v2 exclusion list; second topic through the full pipeline to time it.
