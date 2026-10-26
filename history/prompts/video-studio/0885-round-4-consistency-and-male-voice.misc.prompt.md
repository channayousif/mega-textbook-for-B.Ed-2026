---
id: 0885
title: Round 4 consistency and male voice
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
 - video-studio/kaggle/voice_bench.py (a candidate may set its own `takes`)
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json (Bilal ref is the owner male sample; chatterbox-hi takes 9)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - voice:bench all --only=chatterbox-hi on Kaggle T4 x2: 18 takes in 866 s, hash-verified (Ustani 52.5-53.5 s, Bilal 15.8-18.1 s)
 - voice:blind: 17 takes (6 new Ustani, 9 Bilal, 2 anchors)
 - npm test; check:no-media; py_compile
---

## Prompt

yes, make more takes of U12, added @sample-male.mp3

## Response snapshot

Confirmed `sample-male.mp3` is ElevenLabs-generated (C2PA), male (median F0 150 Hz), 38.2 s; applied the
test-only ruling, moved it to `$MEDIA_ROOT/voice-benchmark/owner-samples/`, cut a 13.4 s reference.
Added a per-candidate `takes` override, ran chatterbox-hi with 9 takes, archived round 3 and the
repeat takes 1-3, and blinded 6 new U12-setup takes and 9 Bilal takes with the original U12 and the
round-2 Bilal pick as anchors.

## Outcome

- Impact: round 4 blind set U01-U07, B01-B10 ready.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner ranks round 4.
- Reflection: same seed on a new Kaggle session gives the same length but different bytes, so a published take must be kept as a file, not regenerated from its seed.

## Handoff (for CEO and agents)

- Shipped / changed: round 4 takes; per-candidate take count. PR #336.
- Decisions the team must respect: Chatterbox output is not bit-reproducible across Kaggle sessions; approvals must bind the downloaded bytes (as the render gate already does). Owner ElevenLabs voices remain test-only.
- Pending / next owner: owner ranks round 4; rights for any winning voice; voice lock (V005) owner only.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: none new.
- Graders run and results (PASS/FAIL): Kaggle hash verification PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): if U12 quality holds across seeds, run a full episode script with that setup.
