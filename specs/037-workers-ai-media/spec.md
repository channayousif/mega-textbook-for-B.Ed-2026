# Feature 037: Workers AI for media checks and drafts

**Status**: active | **Created**: 2026-11-28 | **Owner**: curriculum owner (board-direct)

## Why

QG2 runs local whisper turbo on the 2-CPU production host as a heavy job. Cloudflare, already the
site's DNS provider, gives 10,000 free Workers AI neurons a day. A calibration on all 24 teaser clips
on disk gave the same QG2 verdict as local whisper on 24 of 24 (D-2026-0103).

## What

1. QG2 transcription on Workers AI `@cf/openai/whisper-large-v3-turbo` when the host has the token,
   local whisper otherwise or when Workers AI refuses (daily cap, limit, unreachable).
2. Text drafts (`scripts/media/cfai-text.mjs`): YouTube descriptions, social captions and alt text first
   drafts, always labelled DRAFT and checked by Claude or the owner.
3. No images (owner ruling 2026-11-28, D-2026-0103).

## Requirements

- FR-001: Free allowance only: a host ledger per UTC day with a 9,000-neuron cap; a call that would
  cross it is refused before it is sent. Never the Workers Paid plan.
- FR-002: The token stays host-local (`~/.config/mega-book/cloudflare-ai.env`, mode 600, Workers AI scope).
- FR-003: A Workers AI refusal never fails QG2; it falls back to local whisper and says so.
- FR-004: Drafts write nothing to content, ledgers or manifests.
