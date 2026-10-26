---
id: 0879
title: Parler mirror and blind takes
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
 - video-studio/kaggle/voice_bench.py
 - video-studio/scripts/voice-bench.ts, video-studio/scripts/lib/kaggle.ts
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json
tests:
 - voice:bench on Kaggle T4 x2: COMPLETE 25.6 min; 12 takes hash-verified (MMS 6, Parler 6)
 - Parler Ustani takes 56.8-58.3 s with 7 sentence pauses (previously cut at 30.2 s)
 - voice:blind: 12 takes blinded (U01-U06, B01-B06), key only in MEDIA_ROOT
---

## Prompt

HF token attached

(Later: "i saved hf token in .env,local", "ok, let me know when the takes are ready", "are the takes ready?")

## Response snapshot

The attached Kaggle secret was visible but the secrets service returned ConnectionError on every
lookup from API-pushed runs (5 retries). Using the owner's HF_TOKEN from the git-ignored
.env.local, downloaded ai4bharat/indic-parler-tts (3.75 GB) to MEDIA_ROOT and mirrored it as the
private Kaggle dataset vs-model-indic-parler-tts; the kernel loads it from the mount with no
secret. `datasets status` returns 403 for that dataset, so readiness falls back to listing its
files. First Parler takes were cut at 30.2 s (Parler's per-generation cap); now generated per
sentence with 0.35 s pauses. 12 takes verified and blinded for the owner.

## Outcome

- ✅ Impact: two-character Parler voices and MMS takes ready for the owner's blind listening test.
- 🧪 Tests: see `tests` above.
- 📁 Files: listed above; model and audio only in MEDIA_ROOT and private Kaggle datasets.
- 🔁 Next prompts: owner scores blind; adds AI Studio takes (re-blind); `voice:blind -- --unblind`.
- 🧠 Reflection: checking take lengths caught a silent truncation that would have biased the test.

## Handoff (for CEO and agents)

- Shipped / changed: `voice:bench -- mirror` (private model mirror), sentence-wise Parler generation, tolerant dataset readiness check, secret diagnostics.
- Decisions the team must respect: never commit or print the HF token; gated models run from a private Kaggle mirror; Kaggle secrets are not usable from API-pushed runs.
- Pending / next owner: owner scores `~/video-studio-media/voice-benchmark/scorecard.csv`; AI Studio takes still optional; voice lock (V005) only on owner approval.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Kaggle secrets ConnectionError in API runs; datasets status 403 on a large private dataset; Parler 30 s generation cap.
- Graders run and results (PASS/FAIL): hash verification PASS; take-length check PASS after fix.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): cache the Parler venv as a private dataset to cut the 22-minute Parler step.
