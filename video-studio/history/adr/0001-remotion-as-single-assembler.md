# VS-ADR-0001 - Remotion is the single assembler
Status: Accepted · Date: 2026-10-24

## Context
Brand consistency, captions, CTA cards and timing must be identical across every short.
Generative video tools (Veo, LongCat) vary run to run and cannot render Urdu text reliably.

## Decision
All assembly - layout, captions, text, diagrams, transitions, audio mix, end card - happens in a
Remotion composition driven by episode JSON. Generative tools supply only raw ingredients
(voice lines, B-roll clips, illustrations).

## Consequences
+ Deterministic re-renders; brand changes apply to every future episode by editing one file.
+ No credits spent on things code can draw (diagrams, titles).
− Requires a one-time template build (Phase 4).

## Alternatives considered
Editing each short in CapCut/Descript (manual, inconsistent); generating whole shorts in Veo
(no control over Urdu text, CTA or consistency; costs 5–8 clips per short).
