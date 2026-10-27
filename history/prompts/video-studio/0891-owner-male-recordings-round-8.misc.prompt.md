---
id: 0891
title: Owner male recordings, round 8
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "round-8", "consent"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/kaggle/voice_bench.py (eval voices = segment characters, so one round compares references)
 - video-studio/scripts/voice-bench.ts (usage comment)
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json (refs shagird-rec1, shagird-rec3)
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json (round 8), eval-set-round7.json (renamed)
 - video-studio/specs/003-urdu-voice-benchmark/results-round8-summary.json, results-round8-review.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - local: ffmpeg probe, loudness, noise floor, bandwidth, ECAPA between takes and against the locked refs
 - voice:bench all --eval on Kaggle: 90 clips, ok in 955 s, Whisper and ECAPA OK
 - tsc --noEmit
---

## Prompt

here are the male voices i recorded with consent @"WhatsApp Audio 2026-10-27 at 7.57.14 PM.mp4" @"WhatsApp Audio 2026-10-27 at 7.54.55 PM.mp4" @ed0a7f741ccdd6d8469ab02e909c36a1.wav all voices are mine. avaluate

## Response snapshot

Moved the three files out of the repo root into `$MEDIA_ROOT/voice-benchmark/owner-recordings/`
(bilal-rec-1..3, hashed). The WAV is a cleaner copy of the 7.57 PM take, so there are two takes.
Both are clean (no clipping, full band) and one speaker. Cut 14.4 s and 13.5 s references and ran
round 8 on Kaggle against the locked ElevenLabs Bilal: all three references clone consistently;
the WAV clone has the lowest CER and is closest to its reference. Drafted the consent record
`narrator-01` in `$MEDIA_ROOT/consents/` for the owner to complete.

## Outcome

- Impact: the owner's own voice is a viable Bilal reference with clear rights once the consent record is signed.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner listens to the three reels and decides whether Bilal switches to their voice (card change plus ADR).
- Reflection: a local CPU Whisper run was stopped because the production host was overloaded by other sessions; transcription belongs on Kaggle.

## Handoff (for CEO and agents)

- Shipped / changed: round 8 results and runner support for several references per character. PR #336.
- Decisions to respect: the Bilal card stays on the ElevenLabs reference until the owner decides; a switch needs an ADR and the signed `narrator-01` consent record (owner only).
- Pending: owner listening and decision; consent record; V006, V007.
- Paperclip issues affected: none.
