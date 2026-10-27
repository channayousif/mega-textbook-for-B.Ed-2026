# VS-ADR-0006 - Provider adapters as the seam for future automation
Status: Accepted · Date: 2026-10-24

## Context
v1 is manual (subscriptions only), but the owner plans API-based automation later.

## Decision
Each generative/publishing stage goes through a provider interface (`describe`, `accept`, `run`)
selected in `config/providers.yaml`. Manual providers return instructions and accept uploads;
API providers generate directly. Both write identical outputs.

## Consequences
+ Automating a stage = add one provider file + flip config; no UI or data changes.
+ Stages can be automated one at a time (likely order: publish → voice → B-roll).
− Slight abstraction cost now.

## Future automation path (each needs its own ADR)
1. YouTube Data API upload (free quota, OAuth) - removes manual YouTube upload.
2. Gemini TTS API - voices generated per line automatically.
3. Veo via Gemini API - B-roll per shot (pay per second → constitution amendment).
4. Meta Graph API for Instagram/Facebook Reels (business account).
5. Scheduler: nightly job drafts scripts for the next 3 topics, waiting at the script gate.
