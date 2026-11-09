# VS-ADR-0004 - LongCat avatar deferred
Status: Accepted (deferred: hardware) · Date: 2026-10-24 · Amended 2026-10-25, 2026-11-09

## Context
LongCat-Video-Avatar can turn a portrait + audio into a lip-synced talking video. It is
open-weight; whether the owner's LongCat subscription exposes it through a web UI is unknown (spec OQ1).

## Decision
Not used in v1. The `visual.kind` enum may gain `presenter_clip` later, sourced from LongCat,
if it can be used through the existing subscription with an animated-style portrait and the
results beat the puppet approach in a side-by-side test.

## Amendment 2026-10-25
The owner's LongCat subscription is the LongCat chat service; that does not establish access to
avatar video generation or an API. Stays deferred. A free open-weight run of LongCat-Avatar on a
free GPU could be evaluated later under the same rules as VS-003 (licence check, owner review).

## Amendment 2026-11-09 (owner asked to revise the studio around LongCat-Video; VS-005)
The free open-weight run named above was assessed against the Kaggle T4 x2 runner (VS-ADR-0011).
It is not practical there:
- LongCat-Video is a 13.6B dense model; a measured local run peaked at 41.6 GB VRAM at 832x480,
  8 steps. The default config uses FlashAttention-2 and bf16, neither of which the T4 (sm_75) supports.
- Avatar-1.5 (May 2026; Whisper-large-v3 audio encoder, 8-step distillation) ships a 15.9 GB INT8
  DiT; only community GGUF builds (Q3 about 9.7 GB, Q4_K_M 12.1 GB) could load on a 16 GB card,
  with CPU block swap. Nobody has published a T4 run, and the estimate is 30-80 min per 6 s clip.
- Two T4s do not pool memory, so the second GPU does not help a model that does not fit one.
The licence (MIT) is fine. Status becomes "deferred: hardware": revisit if Kaggle offers 24 GB+
GPUs or the owner's own PC can run it. VS-005 benchmarks models that do fit a T4
(Wan2.2-TI2V-5B first); see `specs/005-open-video-models/`.

## Consequences
v1 ships without dependency on an unverified tool.
