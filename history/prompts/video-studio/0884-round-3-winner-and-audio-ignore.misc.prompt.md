---
id: 0884
title: Round 3 winner and audio ignore
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "gitignore"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - .gitignore (audio ignored repo-wide, plus base-voice-samples/)
 - video-studio/scripts/voice-blind.ts (unblind never overwrites an earlier results file)
 - video-studio/specs/003-urdu-voice-benchmark/results-round3-2026-10-27.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - git check-ignore confirms Sample.mp3 and base-voice-samples/x.mp3 are ignored; no tracked .mp3/.wav in the repo
 - npm test; tsc --noEmit; check:no-media
---

## Prompt

yes, u12 is the best

## Response snapshot

"yes": added `base-voice-samples/` and repo-wide audio extensions to the root `.gitignore` (the site
ships no audio, checked with git ls-files). "u12 is the best": recorded it and unblinded: U12 is
`chatterbox-hi` take 3 cloning the owner's ElevenLabs `Sample.mp3` voice. The unblind wrote
`results-2026-10-26.csv` again (UTC date) and overwrote the round 2 results; restored it from git, saved
round 3 as `results-round3-2026-10-27.csv`, and changed voice-blind.ts to add a -2, -3 suffix instead
of overwriting.

## Outcome

- Impact: leading voice is Chatterbox Hindi with the Sample voice; test-only until rights are secured.
- Tests: see `tests`.
- Files: see `files`.
- Next prompts: owner secures the rights to the Sample voice (ElevenLabs plan covering it, or a consented human recording in that style), then approves a lock (V005).
- Reflection: dated output names collide across rounds on the same UTC day.

## Handoff (for CEO and agents)

- Shipped / changed: round 3 results, audio ignore rule, unblind overwrite fix. PR #336.
- Decisions the team must respect: owner-supplied ElevenLabs voices are test-only; no voice is locked; only the owner records V005.
- Pending / next owner: rights for the Sample voice; a matching male voice for Bilal (no Bilal pick in round 3).
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: unblind overwrote an earlier results file (fixed).
- Graders run and results (PASS/FAIL): tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): more seeds of chatterbox-hi with the Sample voice to check consistency.
