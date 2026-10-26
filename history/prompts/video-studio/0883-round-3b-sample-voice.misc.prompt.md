---
id: 0883
title: Round 3b sample voice
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "kaggle", "voice-cloning"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json (Ustani ref is the owner Sample; round 3 refs kept under _round3)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - voice:bench all --only=chatterbox-hi,chatterbox-v3 on Kaggle T4 x2: 6 Ustani takes with the Sample reference (52-55 s), hash-verified; repeat Kamran takes discarded (same seeds as round 3)
 - voice:blind --append: 21 takes blinded (U09-U14 new; earlier IDs unchanged)
---

## Prompt

i have added one more @Sample.mp3

(Then: "status")

## Response snapshot

Found the file is ElevenLabs-generated (C2PA manifest, author Eleven Labs Inc., trainedAlgorithmicMedia),
female (median F0 233 Hz), 44.1 s; applied the existing test-only ruling, moved it from the repo root to
`$MEDIA_ROOT/voice-benchmark/owner-samples/`, cut a 13.3 s reference, ran both Chatterbox engines on
Kaggle, and appended the six Ustani takes to the round 3 blind set as U09-U14. "status": reported the
Kaggle run at 9 of about 15 minutes.

## Outcome

- Impact: round 3 blind set is now U01-U14 and B01-B07.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner ranks round 3.
- Reflection: the bench always runs both characters; a per-character filter would save GPU time on single-voice additions.

## Handoff (for CEO and agents)

- Shipped / changed: round 3b reference and takes. PR #336.
- Decisions the team must respect: owner-supplied ElevenLabs voices are test-only references (ruling 2026-10-27); rights first, then an owner-only lock (V005).
- Pending / next owner: owner ranks round 3.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: owner media dropped at the repo root again.
- Graders run and results (PASS/FAIL): Kaggle hash verification PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add a `--character=` filter to voice:bench.
