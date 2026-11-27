# Feature 036: Second-account media producers

**Status**: active | **Created**: 2026-11-28 | **Owner**: curriculum owner (board-direct)

## Why

The illustration backlog is 106 prompt-only images, and agy (Gemini) is on quota until 2 December.
The owner has a second Google Pro account, already signed in for the crew's `agy2` text worker
(ADR-0039). Using it for media doubles the free capacity of each Google producer.

## What

Each second-account producer is its own producer, with its own quota record, pacing channel
(D-2026-0100 limits per account) and crew lane (one running job each):

1. `agy2`: Gemini images through `ops/crew/bin/agy2` (HOME=~/.agy2). **This PR.**
2. `gflow2`: Nano Banana images and Veo clips through a second `gflow serve` profile on davinci.
   Needs the owner to sign the second account into a Chrome profile there.
3. `nlm2`: NotebookLM through a second `nlm` profile, so two Study Studio units can run at once.
   Needs the owner's `nlm login --profile second`.

## Owner rulings (2026-11-27)

- Use the second account for agy images, Flow and NotebookLM.
- Order of image producers: agy, agy2, gflow, (gflow2), codex.

## Requirements

- FR-001: A second-account producer never shares quota, pacing or project state with the first.
- FR-002: An account with no login is skipped (unavailable), never retried in a loop.
- FR-003: Media rules unchanged: workers call generators only through `generate-illustration.mjs` and
  `teaser-clips.mjs`; no credits before script approval; nothing goes public except by the owner.
