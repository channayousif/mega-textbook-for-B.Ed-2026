---
id: 0880
title: Voice round 2 Hindi cloning
stage: misc
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "kaggle", "hindi", "voice-cloning"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/passages-devanagari.json (new)
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
 - video-studio/kaggle/voice_bench.py
 - video-studio/scripts/voice-bench.ts, video-studio/scripts/voice-blind.ts
tests:
 - voice:bench on Kaggle T4 x2, run 1 (15.9 min) and run 2 (17.9 min): chatterbox-hi and chatterbox-v3 OK, 12 takes hash-verified each run; urdu-tts errored (tortoise conditioning shape), rerun with --only=urdu-tts
 - V3 S3Gen decoder rejected by S3Gen(meanflow=True) and S3Gen(); takes use the V2 decoder (recorded in kaggle-report.json)
 - voice:blind: 12 Chatterbox takes blinded (U01-U06, B01-B06)
 - tsc --noEmit; node --test tests/*.test.ts 12/12; check:no-media OK; em-dash scan OK
---

## Prompt

i dont like any of those voices, we need better than that, search for other options, some hindi options may also be explored, thonk out of the box

(Then: "yes start the kaggle round, show me the transliteration")

## Response snapshot

Researched alternatives (Seed-VC re-voicing of a real recording; Hindi-trained cloning with
Chatterbox Multilingual (MIT) and IndicF5 (MIT, gated); Azure ur-PK Uzma/Asad free tier; Gemini
TTS ur-PK preview and hi-IN GA; Chirp 3 HD ur-IN; Uplift AI Orator; urdu-tts). On "start", wrote a
Devanagari transliteration of both passages spelled by Urdu pronunciation (nuqta, vo/ye, silent
letters dropped, URL spelled out), chose four clean reference clips from Google FLEURS ur_pk
(CC-BY-4.0; two female, two male) stored only in MEDIA_ROOT, deactivated round 1 (MMS, Parler,
takes archived to MEDIA_ROOT/voice-benchmark/round1), and added chatterbox-hi, chatterbox-v3 and
urdu-tts engines to the Kaggle job with per-sentence generation and per-take reference cycling.

## Outcome

- Impact: 12 Chatterbox takes ready to score blind; urdu-tts pending its rerun.
- Tests: see `tests`.
- Files: see `files`. No media in git (refs and takes live in MEDIA_ROOT).
- Next prompts: owner checks the transliteration and scores the blind set; owner accepts the IndicF5 terms; owner records a 15-20 s consented reference clip (enables Seed-VC and a real cloning target).
- Reflection: the Hindi single-language T3 loads with the V2 decoder; the V3 decoder needs code not in the pinned Chatterbox commit.

## Handoff (for CEO and agents)

- Shipped / changed: VS-003 round 2 candidates and engines (Chatterbox Hindi and V3, urdu-tts, IndicF5 inactive), Devanagari passages, `voice:bench --only=`, `voice:blind --append`. PR #336.
- Decisions the team must respect: FLEURS speakers are evaluation references only; any published voice must clone a consented recording (PI-08). Round 1 voices are rejected by the owner. Media and the blind key stay in MEDIA_ROOT.
- Pending / next owner: owner scores the blind set and corrects the transliteration if needed; owner accepts IndicF5 terms on Hugging Face; owner records a reference clip; Azure / Gemini / Uplift takes by the owner go to `inbox/`; Claude adds urdu-tts takes with `voice:blind -- --append` when its rerun succeeds.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: Kaggle dataset upload skips subfolders (`-r skip`), so packed files must be flat; tortoise-tts-fast reads `voice_samples[i][0]`; Chatterbox V3 decoder state dict incompatible with the pinned S3Gen.
- Graders run and results (PASS/FAIL): Kaggle hash verification PASS; tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): clone the owner's own consented clip with chatterbox-hi.
