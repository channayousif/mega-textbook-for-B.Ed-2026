---
id: 2473
title: VS-005 LongCat assessment and open-model video bench on Kaggle
stage: plan
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: video-studio
branch: feat/vs-005-open-video-models
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "vs-005", "kaggle", "longcat", "wan2.2"]
links:
  spec: video-studio/specs/005-open-video-models/spec.md
  ticket: null
  adr: video-studio/history/adr/0004-longcat-deferred.md
  pr: null
files:
 - video-studio/specs/005-open-video-models/spec.md
 - video-studio/specs/005-open-video-models/plan.md
 - video-studio/specs/005-open-video-models/tasks.md
 - video-studio/specs/005-open-video-models/candidates.json
 - video-studio/specs/005-open-video-models/shots.json
 - video-studio/specs/005-open-video-models/scorecard.csv
 - video-studio/kaggle/video_bench.py
 - video-studio/kaggle/workflows/wan22_ti2v.json
 - video-studio/kaggle/workflows/hunyuan15_i2v.json
 - video-studio/scripts/video-bench.ts
 - video-studio/scripts/video-blind.ts
 - video-studio/scripts/lib/video-bench.ts
 - video-studio/tests/video-bench.test.ts
 - video-studio/history/adr/0004-longcat-deferred.md
 - video-studio/history/reviews/2026-11-09-video-model-licence-check.md
 - video-studio/config/providers.yaml
 - video-studio/package.json
tests:
 - node --import tsx --test tests/video-bench.test.ts (7/7 pass)
 - tsc --noEmit --strict on the four new TypeScript files (clean)
 - python3 kaggle/video_bench.py --selftest on a locally packed set with real stills (30 graphs ok; composited start frames inspected by eye)
 - python3 -I kaggle/video_bench.py --verify-only (passes untouched, fails after tampering; inside the test)
---

## Prompt

feature update: revise the video studio implimentation with longcat-video model (See its github and huggingface) resaerch properly, see oppertunities and limitations, is it possible to run on kaggle GPU notebook

Owner answers to the clarifying questions (same session):
- On how to proceed: "search for any other feasible alternative on huggingface and others"
- On which capability matters: "i was disappointed with previous video results, more professional video animation is expected, need image to video or text to video setup"

## Response snapshot

Researched LongCat-Video and LongCat-Video-Avatar-1.5 (GitHub, Hugging Face file trees, a measured
local test, ComfyUI and GGUF community builds) against the Kaggle T4 x2 runner. The verdict: not
practical. It peaks at 41.6 GB VRAM at 480p, defaults to FlashAttention-2 and bf16 (neither works
on sm_75), the Avatar INT8 DiT is 15.9 GB, there are only GGUF and block-swap routes with no
T4 report, and two GPUs do not pool memory. Surveyed alternatives. Wan2.2-TI2V-5B (Apache-2.0) has
a measured Kaggle T4 run (214 s for 1280x704x25 frames, fp16 equals fp32). HunyuanVideo-1.5 fits,
but its licence bars displaying output in the EU, UK and South Korea. The owner approved a plan of
benchmark first, then integrate on a pass. Built the VS-005 bench: pinned candidates with
Hugging Face revisions and SHA-256s, a fixed nine-sixteen shot list with a 3D style arm,
ComfyUI API graphs from the official Comfy-Org templates, a Kaggle job (pinned ComfyUI, hash-checked
downloads, one server per T4, VRAM and RAM metrics, x264 encode, output manifest, smoke mode),
pack/run/fetch and blind/unblind CLIs, and tests. Amended VS-ADR-0004 to "deferred: hardware".
No Kaggle run yet.

## Outcome

- ✅ Impact: LongCat question answered with evidence; a ready-to-run, provenance-safe bench for free open-model I2V/T2V on Kaggle, aimed at the owner's "more professional" goal.
- 🧪 Tests: 7/7 unit tests, a strict typecheck of the new files, the Python selftest with real stills, and a tamper test.
- 📁 Files: spec 005 (6 files), Kaggle job and 2 workflows, 3 scripts, 1 test, ADR-0004 amendment, licence review, provider note, npm scripts.
- 🔁 Next prompts: "run the video bench smoke test" (`npm run video:bench -- all --smoke`), then the full bench, then `npm run video:blind` with Flow and puppet reference clips.
- 🧠 Reflection: the decisive evidence was a third-party measured Kaggle T4 run (unsloth PR #12476), not vendor VRAM claims; licence text read directly changed the Hunyuan verdict.

## Handoff (for CEO and agents)

- Shipped / changed: VS-005 bench tooling in `video-studio/` (no media, no Kaggle run yet); VS-ADR-0004 amended to "deferred: hardware"; the `video.longcat` provider note updated.
- Decisions the team must respect: LongCat is not run on Kaggle T4. Wan2.2-TI2V-5B is the active candidate. HunyuanVideo-1.5 stays inactive and is never used in a published episode (licence section 5(c)). The bench produces evaluation clips only; nothing enters an episode before a pass, owner approval and an ADR extending VS-ADR-0011 to generative assets. No ADR was created (owner consent required; suggested `/sp.adr kaggle-video-generation`).
- Pending / next owner: the owner (or Claude on request) runs `npm run video:bench -- all --smoke`, then the full bench (Kaggle GPU quota). The owner supplies `flow_<shot>_s1.mp4` and `puppet_<shot>_s1.mp4` reference clips and scores the blind set. OV004 is the owner's decision on a Hunyuan evaluation. The `queue/budget.json` tracker (001 T033) is still unbuilt; the bench logs GPU minutes to `$MEDIA_ROOT/video-benchmark/gpu-log.jsonl`.
- Paperclip issues affected: none (Paperclip retired; no crew job).

## Evaluation notes (flywheel)

- Failure modes observed: the HF API redirected renamed Comfy-Org repos (needed `curl -L`); `python3 -I` hid user-site Pillow locally (Kaggle has it system-wide); the PHR IDs 2471-2472 were taken on an unmerged branch.
- Graders run and results (PASS/FAIL): unit tests PASS; strict typecheck PASS; selftest PASS; tamper test PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): the smoke run; if 121 frames at 704x1280 exceed 20 GPU-minutes per clip, try 81 frames or a 4-8 step distillation LoRA for the 5B model.
