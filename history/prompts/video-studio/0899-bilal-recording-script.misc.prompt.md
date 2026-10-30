---
id: 0899
title: Bilal reference recording script
stage: misc
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-cast
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "round-10", "recording"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0012-bilal-voice-owner-recording.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/372
files:
 - video-studio/brand/recording/bilal-reference-script.md (new)
tests:
 - none
---

## Prompt

create a script for the fresh recording

## Response snapshot

Wrote a five-line Urdu script (about 35 s per take) in Bilal's voice that moves through greeting,
curious question, "aha" delight, a shy-then-confident line and an energetic CTA, plus recording
instructions: quiet room, phone 15-20 cm off-axis, highest-quality recorder sent as a document, stand
and smile, slightly fast, three takes in one file. Kept it outside `brand/voices/` so the voice-card
digest does not change.

## Outcome

- Impact: the owner can record a livelier Bilal reference.
- Tests: none.
- Files: see `files`.
- Next prompts: owner records and uploads `bilal-rec-4.wav`; Claude checks it, adds its hash to `narrator-01`, cuts the reference and compares it with reel C on Kaggle.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Bilal reference recording script. PR #372.
- Decisions to respect: new owner recordings for Bilal fall under consent `narrator-01` once their hash is added to the record; a reference change needs an ADR.
- Pending: the recording (owner); evaluation (Claude).
- Paperclip issues affected: none.
