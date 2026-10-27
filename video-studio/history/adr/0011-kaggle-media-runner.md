# VS-ADR-0011 - Kaggle notebook as the media-compute runner
Status: Accepted (owner direction 2026-10-25: "consider the rendering job on kaggle notebook with its free quota of T4 x2 GPU boost") · Date: 2026-10-26

## Context
The parent repo is developed on the 2-CPU / 12 GB production host that also serves textbook.com.pk;
heavy jobs there froze the live site twice (2026-09-20, 2026-09-24). The host has no system FFmpeg
and 26 GB free disk. Remotion renders (Chromium + FFmpeg) and Whisper alignment are heavy. The
owner has a free Kaggle account with GPU quota.

Verified limits (Kaggle docs and staff posts, re-check at spike time): GPU sessions have 4 CPU cores,
29 GB RAM and a 12 h limit; GPU quota is about 30 h/week, and a T4 x2 hour counts as one hour;
`/kaggle/working` output is about 20 GB. Internet and GPU need a phone-verified account.
Remotion's bundled Linux x64 FFmpeg includes `h264_nvenc` (`--hardware-acceleration if-possible`);
GPU frame capture needs `--chrome-mode=chrome-for-testing --gl=vulkan`, unproven inside Kaggle.

## Decision
Alignment (faster-whisper large-v3 on CUDA, forced to the approved script order), render, audit and
still extraction run as one pinned Kaggle notebook job per episode. The server or the owner's PC
packs a hashed bundle of approved inputs into a **private** dataset version, pushes the notebook with
the Kaggle CLI, then fetches the outputs into `$MEDIA_ROOT/<episode>/` and re-verifies every SHA-256
before `render_review`. The notebook re-verifies input hashes first and fails closed. The render
gate binds the downloaded bytes. Final masters use software x264 for determinism; NVENC is for
previews only. A CPU-only Kaggle session is the fallback when GPU quota is spent.

## Consequences
+ No heavy media job on the production host; full FFmpeg and a GPU at 0 USD.
+ Better Urdu alignment (large-v3) than CPU whisper.cpp medium.
+ GPU also serves the VS-003 open-source TTS benchmark.
- Amends VS constitution V: free remote compute is allowed (no billing account). The Kaggle API
  token is a credential: kept in `~/.kaggle/kaggle.json` (chmod 600), never in the repo or the Studio.
- Third-party processing: narrator consent must name Kaggle (brand/consents/README.md); datasets are
  private and deleted after `render_approved` unless the owner keeps them.
- Quota and availability risk: Kaggle can change limits; GPU hours are logged in `queue/budget.json`
  with an 80% warning; `local` (owner's PC) stays a supported provider.
- Cold start: npm install of Remotion and the browser each session; mitigated by a cached private
  "toolchain" dataset with pinned versions.

## Alternatives considered
Render on the production host (rejected: host limits, no FFmpeg); owner's PC only (kept as
fallback; needs Node, FFmpeg and a capable machine); paid cloud GPU (rejected: constitution V).
Recorded at the parent level in ADR-0031.
