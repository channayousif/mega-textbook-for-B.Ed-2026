---
id: 0890
title: V005 voice lock, owner approval
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "v005"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/brand/voices/ustani.md (new voice card)
 - video-studio/brand/voices/shagird.md (new voice card)
 - video-studio/brand/brand-bible.yaml (character voice status)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md (V005 done)
tests:
 - reference SHA-256 recomputed from $MEDIA_ROOT/voice-benchmark/refs and owner-samples
 - npm test; tsc --noEmit; zero em dashes
---

## Prompt

ok approve

## Response snapshot

The owner approved the V005 lock after the round 7 report. Wrote voice cards for Ustani and Bilal:
`chatterbox-hi` (Chatterbox Multilingual Hindi finetune, pinned commit), default style
(exaggeration 0.5, cfg 0.5), the Sample.mp3 and sample-male.mp3 references with SHA-256, the
pronunciation lexicon as the spelling source. The references are ElevenLabs-generated and their
rights are not secured, so each card blocks the render gate until the owner records a rights basis.

## Outcome

- Impact: V005 done; voices, engine, settings and lexicon are fixed for VS-003 V006/V007.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: secure the reference rights (ElevenLabs plan terms or consented recordings); V006 import validation; V007 first short.
- Reflection: the lock was recorded from an explicit owner chat approval; the earlier owner ruling (rights before publishing) is kept as a hard block on the card instead of being dropped.

## Handoff (for CEO and agents)

- Shipped / changed: locked voice cards `brand/voices/{ustani,shagird}.md`. PR #336.
- Decisions to respect: owner lock 2026-10-27 (chatterbox-hi, default style, those two references, the lexicon). Changing a card needs an ADR. No episode using these voices may pass the render gate until the card records the rights basis; agents never fill that line.
- Pending: owner secures reference rights; V006, V007; merge of PR #336 (owner).
- Paperclip issues affected: none.
