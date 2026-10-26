---
id: 0882
title: Round 3 owner voice samples
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
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json (refs now the owner samples; FLEURS refs kept under _round2)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - voice:bench all --only=chatterbox-hi,chatterbox-v3 on Kaggle T4 x2: 15.0 min, 12 takes hash-verified (Ustani 48-55 s, Bilal 15-18 s)
 - voice:blind: 15 takes blinded (12 new plus 3 round-2 winners as anchors)
 - npm test 12/12; check:no-media OK; em-dash scan OK
---

## Prompt

i have added 4 voices in @base-voice-samples/

(Then, to "How should I use them?": "Test-only cloning (Recommended)")

## Response snapshot

Identified the four files as ElevenLabs Voice Library previews (Reva x2, Saira, Kamran) and asked how
to use them, since the voices belong to their creators and ElevenLabs. Owner chose test-only cloning.
Moved the files out of the untracked, non-ignored `base-voice-samples/` in the public repo into
`$MEDIA_ROOT/voice-benchmark/owner-samples/`, converted them to WAV references (three were WAV files
named .mp3; Kamran is only 3.6 s), archived round 2 media to `round2/`, ran Chatterbox Hindi and V3 on
Kaggle with each female voice once per engine and Kamran three times per engine, and blinded the 12
takes together with the three round-2 winners as anchors.

## Outcome

- Impact: 15 blind takes ready (U01-U08, B01-B07).
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner ranks the round 3 blind set; a longer (10 s or more) Kamran sample would help the male voice.
- Reflection: chatterbox still uses the V2 decoder for both T3 variants.

## Handoff (for CEO and agents)

- Shipped / changed: round 3 references and takes. PR #336.
- Decisions the team must respect: owner ruling 2026-10-27: ElevenLabs preview voices are test-only cloning references and are never published; a winning voice needs its rights secured (ElevenLabs plan or consented recording, PI-08) before any lock (V005, owner only).
- Pending / next owner: owner ranks round 3.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: owner media was dropped into an untracked, non-ignored folder at the repo root; one filename held a character that broke direct paths.
- Graders run and results (PASS/FAIL): Kaggle hash verification PASS; tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): if a voice wins, secure rights and record a 15-20 s consented clip in that style.
