---
id: 0886
title: Round 4 verdict and model research
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "research", "licensing"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/results-round4-2026-10-27.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - none (research and results recording)
---

## Prompt

all are fine, consistent and usable. research about these models if they are worth trying :[

1. Comparison of the strongest candidates
Model    Urdu capabilities    Voice cloning    License    Assessment
Dia-1.6B-Urdu    Native Urdu fine-tune, 200+ hours of training audio    Not established for this fine-tune    Apache 2.0    Best native-Urdu research candidate
XTTS-v2-Urdu-FT    Urdu-specific fine-tune    Yes    MIT listed for fine-tune; upstream terms need checking    Best candidate for consistent cloned narrators
VoxCPM2    Urdu possible, stronger results through Devanagari    Yes    Apache 2.0    Promising naturalness and pronunciation

]

## Response snapshot

Recorded round 4 as all usable and unblinded it. Researched the three models from their Hugging Face
model cards and API metadata (2026-10-27):
- XTTS-v2-Urdu-FT (suhaibrashid17, MIT label, 217 downloads, Dec 2024, needs a patched coqui tokenizer):
  the base coqui/XTTS-v2 is under the Coqui Public Model License, "only non-commercial use of a machine
  learning model and its outputs"; a fine-tune cannot relicense it, and Coqui has shut down. Not usable
  for publishing; skip.
- VoxCPM2 (openbmb, Apache-2.0, 2B, 48 kHz, ~973k downloads, updated 2026-08): 30 languages incl. Hindi,
  not Urdu, so it reuses the Devanagari passages; cloning with optional style control and "ultimate"
  cloning with the reference transcript; card lists bfloat16 and ~8 GB VRAM, and the T4 has no native
  bf16, so it may need fp16/fp32. Worth one challenger run.
- Dia-1.6B-Urdu (mahwizzzz, Apache-2.0, 67 downloads, Mar 2026): native Urdu script, ~200 h, but the
  training audio was 16 kHz upsampled to 44.1 kHz, the dataset (1DamnAudio, labelled CC-BY-4.0,
  "audiobook") is gated and its source is unverified, the card's code is incomplete, cloning is not shown
  for the fine-tune (base Dia clones from an audio prompt plus its transcript), and base Dia needs ~10 GB.
  Lower priority; one try is cheap.

## Outcome

- Impact: Chatterbox Hindi with the owner's two voices is the working setup; optional challengers named.
- Tests: none.
- Files: see `files`.
- Next prompts: owner decides whether to run a VoxCPM2 (and Dia) challenger round.
- Reflection: model-card licence labels on fine-tunes must be checked against the base model.

## Handoff (for CEO and agents)

- Shipped / changed: round 4 results; model research recorded in the spec. PR #336.
- Decisions the team must respect: XTTS-v2 derivatives are excluded (CPML non-commercial covers outputs). Owner ElevenLabs voices are test-only; no voice is locked.
- Pending / next owner: owner go/no-go for a VoxCPM2/Dia round; rights for the two voices; V005 lock.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: a fine-tune's MIT label hid a non-commercial base licence.
- Graders run and results (PASS/FAIL): none.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): VoxCPM2 with the two owner voices, reading Devanagari, 3 takes each.
