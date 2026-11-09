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
- [ ] OV017 Smoke run on Kaggle (`npm run video:bench -- all --smoke`); compare with the 214 s reference.
- [ ] OV018 Full bench run; record GPU minutes.
- [ ] OV019 Owner supplies `flow_<shot>_s1.mp4` and `puppet_<shot>_s1.mp4` reference clips in `$MEDIA_ROOT/video-benchmark/inbox/`.
- [ ] OV020 Blind review and unblind; write the verdict against the pass criteria in spec.md.

## Phase C - integration (blocked on a pass and an owner-approved ADR)
- [ ] OV030 ADR: Kaggle as a generator for video assets (`/sp.adr`).
- [ ] OV031 Provider, schema fields, `kaggle:clips` job, Studio panel (plan.md section 3).
