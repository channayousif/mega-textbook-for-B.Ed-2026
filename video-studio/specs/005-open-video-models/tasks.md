# Tasks - VS-005 Open-model video on Kaggle

## Phase A - records
- [x] OV001 Research LongCat-Video and alternatives against the Kaggle T4 (plan.md section 1).
- [x] OV002 Amend VS-ADR-0004 with the T4 finding; update the `video.longcat` provider note.
- [x] OV003 Licence notes for the candidates (`history/reviews/2026-11-09-video-model-licence-check.md`).
- [ ] OV004 Owner decides whether HunyuanVideo-1.5 may run as an evaluation-only reference (its licence bars displaying output in the EU, UK and South Korea, so never in a published episode).

## Phase B - bench
- [x] OV010 `candidates.json` with pinned revisions and SHA-256s (fetched from the Hugging Face API 2026-11-09).
- [x] OV011 `shots.json`: six base shots plus a two-shot style arm, two seeds.
- [x] OV012 `kaggle/workflows/*.json` API graphs from the Comfy-Org templates.
- [x] OV013 `kaggle/video_bench.py` (verify, ComfyUI pin, downloads, two workers, metrics, encode, manifests, `--selftest`, `--verify-only`).
- [x] OV014 `scripts/video-bench.ts` (pack, run, fetch, all, `--smoke`, `--only`).
- [x] OV015 `scripts/video-blind.ts` and `scorecard.csv`.
- [x] OV016 `tests/video-bench.test.ts`.
- [x] OV017 Smoke run on Kaggle (2026-11-09, session 13.3 min, torch 2.11.0+cu130, 2x T4): Wan2.2-5B S1, 704x1280, 25 frames,
  20 steps: 285 s cold on GPU 0 and 276 s cold on GPU 1 while GPU 0 was busy (both include model load; the 214 s reference
  excludes it). Peak VRAM 14.9 GB of 15, peak host RAM 26.3 GB of 31 with two workers, 0 black frames. Identity, outfit and
  flat-2D style held in every frame. The two "warm" rows (6 s) were ComfyUI cache hits on an identical graph, now fixed by
  a distinct seed per smoke run. Both GPUs produced byte-identical clips for the same seed.
- [x] OV018 Full bench run (2026-11-09, session 400.8 min on 2x T4; 16/16 clips verified, 0 black frames):
  Wan2.2-5B, 704x1280, 121 frames (5 s at 24 fps), 20 steps. 2,666-3,098 s per clip per GPU (median about 2,800 s);
  with two workers about 25 quota-minutes per clip. Peak VRAM 12.3-14.7 GB, peak host RAM 20.0-26.7 GB. Claude's
  frame review of the contact sheets (`$MEDIA_ROOT/video-benchmark/sheets/`), pending the owner's blind scores:
  - I2V character shots (S1, S2, S5) keep identity, outfit and the flat-2D style; motion is subtle and natural
    (hand gestures, nods, blinks; in S5 Ustani turns towards Bilal).
  - I2V set shot S3: smooth forward camera glide, stable geometry.
  - T2V shots (S4, S6) ignore the brand style suffix: S4 is a semi-realistic mixed look with mosque-like arches
    (cultural framing to check), S6 is photorealistic (hands are good). Use I2V from brand stills, not T2V.
  - Style arm (S7, S8) has no visible effect: an I2V start frame fixes the look, so a 3D style needs a 3D start
    image, not a prompt.
  - Speed fails pass criterion 2 (no more than 20 GPU-minutes per accepted clip). Next levers: fewer frames
    (81 = 3.4 s), a step-distillation LoRA (4-8 steps), or a smaller frame size.
- [ ] OV019 Owner supplies `flow_<shot>_s1.mp4` and `puppet_<shot>_s1.mp4` reference clips in `$MEDIA_ROOT/video-benchmark/inbox/`.
- [ ] OV020 Blind review and unblind; write the verdict against the pass criteria in spec.md.

## Phase C - integration (blocked on a pass and an owner-approved ADR)
- [ ] OV030 ADR: Kaggle as a generator for video assets (`/sp.adr`).
- [ ] OV031 Provider, schema fields, `kaggle:clips` job, Studio panel (plan.md section 3).
