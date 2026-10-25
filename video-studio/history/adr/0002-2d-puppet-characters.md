# VS-ADR-0002 - Characters are 2D puppets animated in Remotion
Status: Accepted · Date: 2026-10-24

## Context
Owner chose animated characters and subscription-only tools. Veo character consistency via
reference images is good but not perfect, costs credits per shot, and Urdu lip-sync from
Veo's native dialogue is unreliable.

## Decision
Each character is designed once (Gemini / ChatGPT images), split into layers (body, head,
eyes open/closed, 5 mouth shapes, 3 gestures) and animated in Remotion. Mouth shapes follow
the voice track's amplitude; blinks and idle motion are procedural and seeded.

## Consequences
+ 100% consistent characters in every frame of every episode, zero credits.
+ Works with any voice file; re-voicing a line needs no new video.
− Mouth movement follows loudness, not phonemes - readable "talking", not true lip-sync. Acceptable for a 2D explainer style.
− Animation style is simpler ("explainer" look, not cinematic). Acceptable for the audience.
− One-time design and layer-cutting effort (Phase 1).

## Alternatives considered
Veo "ingredients" for talking shots (credits, drift, lip-sync); LongCat avatar (see VS-ADR-0004).
