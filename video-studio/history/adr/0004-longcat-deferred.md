# VS-ADR-0004 - LongCat avatar deferred
Status: Accepted (deferred) · Date: 2026-10-24 · Amended 2026-10-25

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

## Consequences
v1 ships without dependency on an unverified tool.
