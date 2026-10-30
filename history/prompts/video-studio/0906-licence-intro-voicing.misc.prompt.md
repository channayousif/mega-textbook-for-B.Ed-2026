---
id: 0906
title: Voice the licence intro episode
stage: misc
date: 2026-10-31
surface: agent
model: claude-opus-5-5
feature: video-studio
branch: feature/video-studio-licence-voice
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "licence"]
links:
  spec: specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json
 - video-studio/specs/003-urdu-voice-benchmark/eval-set-adr0014.json
 - video-studio/specs/003-urdu-voice-benchmark/results-licence-intro-summary.json
 - video-studio/specs/003-urdu-voice-benchmark/results-licence-intro-review.csv
 - video-studio/episodes/20261030-licence-intro/episode.json
 - video-studio/episodes/20261030-licence-intro/approvals.jsonl
tests:
 - voice:bench all --eval on Kaggle (24 takes, chatterbox-hi, T4)
 - validate('episode') ok
---

## Prompt

approved, start the voicing

## Response snapshot

Confirmed the owner's script approval in approvals.jsonl (2026-10-30T20:45:56Z). Archived the
ADR-0014 eval set (eval-set-adr0014.json; media eval/ moved to eval-adr0014/), wrote an eval set
of the eight licence-intro lines with Devanagari for Chatterbox (STEDA as इस्टीडा after the lexicon
`say` اسٹیڈا), seeds 3401-3403, Bilal lively. Ran it on Kaggle; picked per line the lowest CER, then
the highest reference similarity: L01 s3403, L02 s3401, L03 s3403, L04 s3401, L05 s3401, L06 s3403,
L07 s3401, L08 s3403. Imported all eight (consents narrator-01/02 checked; Bilal's lines got
`warm, tempo 1.06`). Speech totals 50.7 s. Recorded script_review -> script_approved -> awaiting_assets.

## Outcome

- Impact: every line is voiced and pending the owner's asset review.
- Tests: all 24 takes ran; STEDA heard as اسٹیڈا in 3/3 takes (the L02 CER of 0.097 is the
  Latin-vs-Urdu spelling, not a mispronunciation); Rubric heard as روبرک in 2/3 takes.
  L07 and L08 carry pause flags (1.1-1.4 s after "اچھا!" and between L08's sentences).
- Files: eval set, results, episode manifest, owner approval log.
- Next prompts: owner listens to $MEDIA_ROOT/20261030-licence-intro/listen-all.wav, then the
  episodeProps production fix, then the assets gate.
- Reflection: approve.ts records approvals.jsonl but does not move episode status; the move was
  recorded by hand citing the approval.

## Handoff (for CEO and agents)

- Shipped: licence-intro voice takes (media only, hashes in episode.json); STEDA's Devanagari spelling
  इस्टीडा is now tested (3/3) and can be added to the brand-bible lexicon.
- Decisions to respect: takes stay `pending` until the owner's assets gate; agents never accept them.
- Pending: owner listening review (replace takes with `voice:import --reason` if needed); Claude:
  episodeProps production fix (non-rejected takes under a valid assets approval); render after the
  assets gate. Ustani mouth_M/E/O still owed by the owner.
- Paperclip issues affected: none.
