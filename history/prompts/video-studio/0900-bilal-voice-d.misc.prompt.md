---
id: 0900
title: Bilal voice D locked
stage: misc
date: 2026-10-30
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-bilal-d
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "adr", "bilal", "tone-shaping"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0014-bilal-lively-style-tone-shaping.md
  pr: null
files:
 - video-studio/history/adr/0014-bilal-lively-style-tone-shaping.md (new)
 - video-studio/brand/voices/shagird.md (settings, post-processing, evidence)
 - video-studio/scripts/lib/voice-fx.ts (new), scripts/lib/audio.ts, scripts/lib/consent.ts, scripts/lib/voice-import.ts
 - video-studio/kaggle/voice_bench.py (character_styles)
 - video-studio/specs/001-urdu-shorts-pipeline/contracts/episode.schema.json (voice.post)
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json, eval-set-round10.json (renamed), results-adr0014-* (new), spec.md
 - video-studio/episodes/20261028-sample-positive-reinforcement/episode.json (Bilal takes replaced, re-render)
 - video-studio/tests/voice-import.test.ts
tests:
 - npm test (video-studio): 21 pass (1 new); npm run typecheck: pass
 - TypeScript tone shaping vs the Python reel D on the same clip: within 0.1 dB per band, same length
 - Kaggle voice:bench --eval: 9 lively clips; Kaggle re-render of the V007 short
---

## Prompt

select the D voice video-studio-media/voice-benchmark/eval/reels/bilal-D-lively-warm-faster.wav

## Response snapshot

Recorded VS-ADR-0014 and changed Bilal's card: `lively` style (0.75/0.35), `warm` tone shaping and
tempo 1.06. Ported the reel's EQ and compressor to TypeScript so `voice:import` applies them from the
card (Remotion's FFmpeg has no EQ filter), with tests; taught the Kaggle eval runner per-character
styles. Re-voiced Bilal's three lines in the sample short, imported them as corrections, and
re-rendered.

## Outcome

- Impact: every future Bilal line sounds like reel D without manual steps.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner watches the re-rendered short; owner generates the cast images (handoff-cast.md).
- Reflection: compare a port against the original on the same input before trusting it; done here.

## Handoff (for CEO and agents)

- Shipped / changed: VS-ADR-0014, Bilal card, tone-shaping import step, re-voiced sample short.
- Decisions to respect: Bilal lines are generated in `lively` and imported only through `voice:import` (which applies `warm` and tempo 1.06); changing the preset or tempo needs an ADR.
- Pending: owner review of the short; cast images (owner); a livelier owner reference recording stays optional.
- Paperclip issues affected: none.
