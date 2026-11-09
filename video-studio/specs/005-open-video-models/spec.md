# VS-005 - Open-model image/text-to-video on Kaggle

**Status:** benchmark tooling built 2026-11-09, no Kaggle run yet. **Priority:** after the owner's
verdict that the puppet renders are not professional enough. **Role:** decide, with measured
evidence and a blind owner review, whether a free open-weight video model on the owner's Kaggle
T4 x2 quota can supply professional animated clips for the Urdu shorts. Integration into the
episode pipeline (phase C) waits for a pass, the owner's approval and an ADR.

## Background
- The owner asked to revise the studio around LongCat-Video (meituan-longcat). Research
  (2026-11-09, `plan.md`) found it impractical on a Kaggle T4: 41.6 GB peak VRAM at 480p
  (8 steps, bf16), FlashAttention-2 in the default config, a 15.9 GB INT8 Avatar DiT, and only
  community GGUF builds (9.7-12.1 GB) with CPU block swap, which nobody has published on a T4.
  VS-ADR-0004 is amended with this finding.
- Two T4s do not pool memory: each process holds the full model. The T4 (sm_75) has fp16 only,
  no bf16, no fp8 compute and no FlashAttention-2.
- Wan2.2-TI2V-5B (Apache-2.0) is measured on a Kaggle T4 in ComfyUI at 214 s for 1280x704,
  25 frames, 20 steps, with fp16 output matching fp32 (LPIPS 0.0016; unsloth PR #12476).
  HunyuanVideo-1.5 (8.3B) is fp16-safe too, but its licence forbids displaying output in the EU,
  UK and South Korea (section 5(c)), which conflicts with public shorts; it stays inactive
  (`history/reviews/2026-11-09-video-model-licence-check.md`).

## User story
As the owner, I can see the same six shots produced by each free open-model candidate, next to
Flow (Veo) clips and the current puppet render, without knowing which is which, and decide
whether any candidate is good enough to become a video provider.

## Requirements
- OV-01 Candidates, pinned weights and settings live in `candidates.json`: Hugging Face repo,
  40-character revision, every file's SHA-256 and size, licence, supported shot kinds, sampler
  settings and their source. The Kaggle job refuses a file whose hash differs.
- OV-02 The shot list (`shots.json`) is fixed across candidates: 9:16, the brand's locked
  `art_style` prompt suffix and negative (injected from `brand/brand-bible.yaml` at pack time,
  never copied), two seeds per shot. I2V start frames are composited on Kaggle from approved
  cast and set PNGs in `$MEDIA_ROOT/brand-assets/`.
- OV-03 A style arm (shots S7, S8) repeats S1 and S3 in a polished 2.5D/3D look, so the owner can
  tell whether "professional" needs a brand art-style change. That change is a locked item and
  needs its own ADR; the bench never changes the brand bible.
- OV-04 The bench runs only on Kaggle (`kaggle/video_bench.py`), never on the production host.
  It installs ComfyUI at a pinned commit, uses sdpa attention and tiled VAE decode, runs one
  ComfyUI server per T4, and records per clip: wall seconds, whether the model was cold, peak
  VRAM, peak host RAM, seed, steps, size and output SHA-256.
- OV-05 `npm run video:bench -- all --smoke` runs one shot alone on GPU 0 and then twice in
  parallel on both GPUs: it checks the 214 s reference and measures one versus two processes.
- OV-06 Every output is hash-listed in `output-manifest.json`, bound to the packed input
  manifest; `fetch` refuses outputs from different inputs or with a wrong hash.
- OV-07 `npm run video:blind` blinds clips per shot (bench clips plus owner-supplied
  `flow_*` and `puppet_*` clips in `$MEDIA_ROOT/video-benchmark/inbox/`), and `--unblind` writes
  `results-<date>.csv` here. The key never enters git.
- OV-08 No media enters git. Clips, stills and reports stay in `$MEDIA_ROOT/video-benchmark/`.
- OV-09 Characters are original (constitution VIII); prompts never name a real person, brand or
  copyrighted character, and never ask for on-screen text (captions stay in Remotion).

## Pass criteria (owner-scored)
1. At least 4 of the 6 base shots (S1-S6) get 4 or more out of 5 on "professional" for one
   candidate, and its character shots keep the character recognisable (identity 4 or more).
2. No more than 20 GPU-minutes per accepted 5 s clip, measured on Kaggle.
3. One episode's clips (about six 5 s shots, two takes each) fit in one 12 h session.
4. No disk, RAM or NaN (black frame) failure in the full bench.

A pass leads to phase C in `plan.md`. A fail is recorded here, and Flow stays the only B-roll
provider.

## Out of scope
- Lip-synced talking shots (LongCat-Avatar-1.5, InfiniteTalk, Wan2.2-S2V): none fits a T4 today.
- Any paid API or billed GPU (constitution V).
- Changing an episode, approval or render: the bench produces evaluation clips only.
