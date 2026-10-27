---
id: 0878
title: Voice benchmark with Parler and AI Studio
stage: misc
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "kaggle"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/{candidates.json,passages.json,handoff-ai-studio.md,spec.md}
 - video-studio/kaggle/voice_bench.py
 - video-studio/scripts/voice-bench.ts, video-studio/scripts/voice-blind.ts
 - video-studio/scripts/lib/kaggle.ts (uploadDataset, waitForDataset, waitForKernel), scripts/kaggle-run.ts, scripts/kaggle-pack.ts
 - video-studio/package.json
tests:
 - tsc clean; npm test 12/12
 - npm run voice:bench -- all on Kaggle T4 x2: COMPLETE 1.6 min; 6 MMS takes hash-verified; Parler skipped (secret not attached)
---

## Prompt

ok, i hear the voice, it is working but it needs improvement

(Then, answering the follow-up on the upgrade route: "Parler + AI Studio benchmark (Recommended)".)

## Response snapshot

Researched free Urdu TTS: Indic Parler-TTS (Apache-2.0, Urdu supported, voice set by a text
description, gated on Hugging Face) is the best open-source upgrade over MMS. Built the VS-003
benchmark: passages from a certified unit's Urdu page, per-character Parler descriptions, an AI
Studio handoff for the owner's manual takes, a Kaggle job that generates seeded takes per candidate
in isolated environments and loudness-normalises them, and a blinding tool with an unblind step.
First run produced 6 MMS takes; Parler waits for the owner's HF_TOKEN Kaggle secret.

## Outcome

- ✅ Impact: the voice choice now runs as a fair, blind, reproducible benchmark rather than ad hoc tweaks.
- 🧪 Tests: see `tests` above.
- 📁 Files: listed above; all audio stays in `$MEDIA_ROOT/voice-benchmark/`.
- 🔁 Next prompts: owner attaches HF_TOKEN and makes AI Studio takes; rerun voice:bench; voice:blind; owner scores.
- 🧠 Reflection: candidates that cannot run are reported as skipped with the reason, never silently dropped.

## Handoff (for CEO and agents)

- Shipped / changed: `npm run voice:bench -- pack|run|fetch|all`, `npm run voice:blind [-- --unblind]`, benchmark inputs in specs/003.
- Decisions the team must respect: the blind key stays in MEDIA_ROOT; no voice is locked until the owner scores blind and approves (V005); Parler runs in its own Python 3.11 venv (pins transformers 4.46.1).
- Pending / next owner: owner: accept Indic Parler-TTS terms, create HF read token, add Kaggle secret `HF_TOKEN` and attach it to notebook vs-voice-bench-run; owner: 6 AI Studio takes into `~/video-studio-media/voice-benchmark/inbox/`.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none in this run; Parler path untested until the secret exists.
- Graders run and results (PASS/FAIL): typecheck PASS; tests PASS; Kaggle run PASS; hash verification PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): if Parler mispronounces terms, add pronunciation respellings to the passage for TTS only.
