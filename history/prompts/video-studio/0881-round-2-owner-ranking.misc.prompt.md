---
id: 0881
title: Round 2 owner ranking
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "blind-test"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/results-2026-10-26.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json (urdu-tts inactive)
tests:
 - voice:blind --unblind wrote results-2026-10-26.csv (18 rows, text only; key stays in MEDIA_ROOT)
---

## Prompt

b01, u05, u06 are the best and b07, b08, b09, u07, u08, u09 are the worst,

## Response snapshot

Recorded the ranking in the scorecard's `major_errors` column (no 1-5 scores were given), then
unblinded. Best: U05 chatterbox-hi take 3 (reference ustani-a), U06 chatterbox-hi take 2
(reference ustani-b), B01 chatterbox-v3 take 1 (reference shagird-a). Worst: all six urdu-tts takes.

## Outcome

- Impact: Chatterbox Multilingual (Hindi T3 for the teacher, V3 T3 for the student) leads; urdu-tts is dropped.
- Tests: see `tests`.
- Files: see `files`.
- Next prompts: owner supplies a consented 15-20 s reference clip to clone with chatterbox-hi; optionally retry the V3 decoder; voice lock (V005) only on explicit owner approval.
- Reflection: both Ustani winners are chatterbox-hi with different references, so the engine matters more than the reference voice; U01 (same engine and reference as U05) was not picked, so seed variance is real and final renders should generate several takes.

## Handoff (for CEO and agents)

- Shipped / changed: unblinded round 2 results committed as text; spec progress updated. PR #336.
- Decisions the team must respect: urdu-tts is out; no voice is locked; FLEURS references are evaluation only (PI-08).
- Pending / next owner: owner reference recording; owner approval for any voice lock.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: the owner ranks rather than scores 1-5; the scorecard has no ranking column, so ranks went into `major_errors`.
- Graders run and results (PASS/FAIL): none.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): chatterbox-hi with an owner reference, 3 seeds per passage.
