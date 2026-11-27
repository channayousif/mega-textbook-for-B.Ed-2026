# VS-005 plan - research record, bench design, integration path

## 1. Research record (2026-11-09)

Sources: the LongCat-Video GitHub README and Hugging Face file trees, the longcatai.net local
test (16 clips, measured VRAM), kijai/ComfyUI-WanVideoWrapper issue 1780, the
vantagewithai Avatar-1.5 GGUF tree, unsloth PR #12476 (Kaggle T4 measurements), the Wan2.2
README, vdf.ai's November 2026 local-model survey, WanGP issue 2109 (Turing notes), Kaggle's
notebook docs, and the Comfy-Org workflow templates.

### Kaggle GPU session
2x T4 (16 GB, about 15 GiB usable each), Turing sm_75: fp16 tensor cores only; no bf16, no fp8
compute, no FlashAttention-2. 4 CPUs, 29-31 GB host RAM, 12 h per session, about 30 GPU-hours a
week. Disk is the hidden limit: HunyuanVideo-1.5's full download exceeds it, so only the single
repackaged ComfyUI files are used. Context parallelism splits activations, not weights, so a
model must fit on one card (with offload) per process.

### LongCat-Video and LongCat-Video-Avatar
| Item | Finding |
|---|---|
| Model | 13.6B dense DiT; T2V, I2V, continuation, minute-long video; 720p/30 fps target |
| Licence | MIT (weights and code); no trademark or patent grant |
| VRAM | 41.6 GB peak at 832x480, 45-61 frames, 8 steps (48 GB card, xFormers) |
| Kernels | FlashAttention-2 on by default; xFormers works; bf16 weights |
| Avatar-1.5 | Whisper-large-v3 audio encoder (multilingual), 8-step distillation, INT8 DiT 15.9 GB, bf16 32 GB, fp8 16.9 GB |
| Community low-VRAM | Avatar-1.5 GGUF Q2_K 8.3 GB, Q3_K_M 9.9 GB, Q4_K_M 12.1 GB, Q8 19.1 GB (ComfyUI-WanVideoWrapper, WanGP) |
| Speed reference | PRO 6000 (Blackwell): 93 frames in about 2 min with distillation |
| Known issues | degradation after about 30 s of continuation; camera zoom drift; 16 fps lip-sync model |

Verdict: not practical on a T4. Only a Q3/Q4 GGUF with CPU block swap could load. It is
unproven (no T4 report), and from the PRO 6000 figure scaled to a T4's fp16 throughput it is
estimated at 30-80 minutes per 6 s clip. That would consume most of a 12 h session for one
episode. LongCat stays a watch item for larger free GPUs or the owner's own PC (VS-ADR-0004
amendment).

### Candidates that fit a T4
| Candidate | Licence | Weights used (repackaged) | T4 evidence | Status |
|---|---|---|---|---|
| Wan2.2-TI2V-5B | Apache-2.0 | 10.0 GB fp16 DiT + 6.7 GB fp8 umT5 + 1.4 GB VAE | 214 s for 1280x704x25f, 20 steps (ComfyUI, Kaggle T4); fp16 LPIPS 0.0016 vs fp32 | active |
| HunyuanVideo-1.5 480p I2V step-distilled | Tencent Hunyuan Community | 8.3 GB fp8-stored DiT + 9.4 GB fp8 Qwen2.5-VL + 0.4 GB byT5 + 2.5 GB VAE + 0.9 GB SigLIP | fp16 LPIPS 0.044 vs fp32 (B200 only) | inactive: licence section 5(c) bars displaying output in the EU, UK and South Korea, so not for published shorts |
| Kandinsky 6.0 Lite | MIT | 7.5 GB transformer + 16.6 GB encoder | none on a T4 | not packed |

Excluded: LTX-2.x (32 GB minimum per Lightricks), MiniMax H3 (licence excludes several
territories; 1 h per 5 s clip on an 8 GB Turing card), Wan2.2-A14B (fp16 LPIPS 0.158 against fp32 and
14 GB per expert in fp8).

**Quality expectation.** Open 5-8B models at 480p-720p make 5 s clips that trail Veo 3, which
the owner already has in Flow. What they add is unlimited free takes, I2V anchored on approved
character and set art, and full provenance. The blind review decides.

## 2. Bench design (phase B, built)

```
npm run video:bench -- pack [--smoke] [--only=id,...]
  validate candidates.json + shots.json  ->  inject brand art_style  ->  copy workflows and stills
  ->  manifest.json (SHA-256 of every input)  ->  private dataset <user>/vs-video-bench
npm run video:bench -- run      push kernel vs-video-bench-run (GPU T4 x2, internet on), wait
npm run video:bench -- fetch    verify output-manifest against the packed inputs, copy clips to
                                $MEDIA_ROOT/video-benchmark/clips/, append gpu-log.jsonl
npm run video:blind [-- --append | --unblind]
```

On Kaggle, `video_bench.py`:
1. verifies every input hash, then refuses to run without a GPU;
2. clones ComfyUI at the pinned commit, checks `HEAD`, and installs its requirements without
   touching Kaggle's CUDA torch;
3. per active candidate: checks free disk, downloads each file at the pinned revision, checks its
   SHA-256, starts one ComfyUI server per GPU (sdpa attention), queues the jobs round-robin, then
   deletes the weights before the next candidate;
4. composites I2V start frames (set cover-fitted to 9:16, cast layers anchored bottom-centre);
5. encodes each clip from the saved PNG frames with x264 (CRF 18, yuv420p), and samples
   `nvidia-smi` and `/proc/meminfo` every 2 s for peak VRAM and host RAM;
6. writes `report.json` and `output-manifest.json`.

`--selftest <dir>` builds and checks every graph (and composites stills when present) on any
machine without a GPU; `--verify-only <dir>` is the tamper test.

Workflow graphs in `kaggle/workflows/` are ComfyUI API JSON with `$name` placeholders. Values
come from `candidates.json`; the Wan settings follow Comfy-Org's
`video_wan2_2_5B_ti2v.json` template (uni_pc, simple, 20 steps, CFG 5, shift 8, 24 fps). The
HunyuanVideo step-distilled settings (8 steps, CFG 1, shift 7, euler) are not in an official
template and are marked unverified.

GPU-hour logging: Kaggle session minutes go to `$MEDIA_ROOT/video-benchmark/gpu-log.jsonl`. The
shared `queue/budget.json` (001 T033) is not built yet; when it is, the bench should add to it.

## 3. Integration (phase C, only after a pass)

Decision needed first: using Kaggle for *generative assets* extends VS-ADR-0011, which covers
alignment, render, audit and stills. 📋 Architectural decision detected: Kaggle as the
generator for video assets. Document? Run `/sp.adr kaggle-video-generation` (owner consent
required; no ADR has been created).

Then:
- `config/providers.yaml`: `video.kaggle-wan22` (mode remote, pinned model and revision,
  rights_note "Apache-2.0 open weights, generated on the owner's free Kaggle quota").
- `contracts/script.schema.json`: optional `source_image` and `motion_prompt` on `visual` for
  `kind: broll`; the asset manifest's `source_tool` records `wan2.2-ti2v-5b@<revision>` with
  prompt, seed and take.
- `npm run kaggle:clips -- <episode>` generates N takes per shot into `inbox/`; the existing asset
  import, reviewer subagents (brand-qa for cultural depiction) and the owner's asset gate follow.
  Rendering never regenerates (constitution VII, X).
- Studio: an asset-stage panel (shot list, launch, status, quota used, take picker) writing the
  same files as the CLI.
- The owner applies platform AI-content disclosure when publishing (constitution VIII).
