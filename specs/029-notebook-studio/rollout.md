# Study Studio rollout plan (per course)

**Status:** proposed for the owner's approval (GitHub #818, Feature 034 T031) · **Date:** 2026-11-27

## Where things stand

- Pilot: EFMP-301 Unit 4, 3 topics, 14 media items (audio EN 5 including "go deeper" parts, audio
  UR 3, video EN 3, video UR 3) plus poster, mind map, study guide and slides. Five pilot items are
  uploaded private and wait for the owner's watch (#814). GENG-300 Unit 1 has a ledger too.
- The crew runs the Studio (`crew studio on`, 2026-11-25). `studio_media` plans the next certified
  unit (G3 done; focus course first, then catalogue order) when no unit is mid-way and fewer than
  two wait for the owner. It reports 28 certified units eligible.
- The corpus averages 2.9 topics per unit (458 topics in 158 per-topic units).

## What limits the pace

The daily caps (`.claude/skills/media-studio/SKILL.md`, defaults) are the bottleneck, not compute:

| Channel | Per day |
|---|---|
| NotebookLM artifacts (`nlm.studio`) | 6 |
| YouTube uploads | 4 |

The owner's watch is the third limit: every audio and video item is watched before it goes public.

## Two recipes

| Recipe | Per topic | Per unit | NotebookLM per unit | YouTube per unit | Days per unit at the caps |
|---|---|---|---|---|---|
| **Full** (the pilot) | audio brief EN+UR, video EN+UR, poster, mind map, study guide | slides | about 20 | about 12 | about 3.5 |
| **Lean** (proposed default) | audio brief EN+UR, mind map | video overview EN+UR, study guide | about 12 | about 8 | about 2 |

The figures are estimates from the caps and the 2.9-topic average. Owner watch time is extra: about
8 items per lean unit, against about 12 per full unit.

## Proposed order

1. **Finish the pilot** (EFMP-301 Unit 4): the owner watches the five private items (#814).
2. **Semester 1, lean recipe**, course by course in catalogue order: EFMP-301, EFMP-302, GENG-300,
   GNAS-301, GICT-300, GQUR-300. Semester 1 serves the most readers, and its units are the most
   reviewed. Only certified units qualify (the crew's existing rule).
3. **Full recipe on request only**: the owner names a unit (for example one a teacher uses in
   class), and the crew runs the full recipe there.
4. **Semesters 2 to 4, lean**, in catalogue order as units are certified.
5. **Review after the first 10 lean units**: watch counts, YouTube views per item, and owner
   rejects. Keep, extend or cut the recipe from that evidence.

At about 2 days per lean unit, the 28 eligible units take roughly 8 weeks if the owner keeps up
with the watch queue. The crew already holds new units while two wait, so the owner sets the pace.

## Rules that stay

- Owner approval before anything goes public (`crew approve-studio`); private uploads first.
- Urdu items get an Urdu-reader check (#816) before wider Urdu rollout.
- Studio files stay out of `specs/content/`, `contracts/` and `scripts/lib/gates.mjs`, so no review
  evidence goes stale (Feature 029).
- Quiz items never go into a Studio asset.

## Decision needed from the owner

Approve the **lean recipe as default** and the **order** above, or name changes. On approval, the
crew's Studio planner gets the lean recipe (a recipe file under `specs/studio/`) and this plan's
status becomes "approved".
