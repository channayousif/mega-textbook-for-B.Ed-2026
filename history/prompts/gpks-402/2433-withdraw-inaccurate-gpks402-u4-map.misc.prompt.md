---
id: 2433
title: Withdraw inaccurate GPKS-402 U4 map
stage: misc
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: gpks-402
branch: fix/gpks-402-u4-map-takedown
user: M Yousif Channa
command: none
labels: ["board-direct", "gpks-402", "figures", "maps", "hotfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gpks-402/unit-04/fig-U4-6.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-6.dark.svg
 - docs/semester-2/gpks-402/unit-04/topic-03.mdx
 - specs/content/gpks-402/figures/unit-04.md
 - specs/content/gpks-402/tasks.md
 - specs/content/gpks-402/reviews/unit-04/G2/20261028T210510787Z-gates.json
 - specs/content/gpks-402/reviews/unit-04/G2/logs-20261028T210510787Z/
tests:
 - npm run check:content (13/13 pass)
 - npm run build
 - rendered fig-U4-6 to PNG and inspected it
---

## Prompt

the svg map created in crew: batch 2026-10-28 14:15Z, 3 jobs (GPKS-402)- #366
#366 is highly inaccurate, maps are highly sensitive artifacts. it should be actual approved not an approximate or careless sketch. replace immediately. one more thing, why should we generate each and every figure when we can download an opensource/free and better alternative we can fetch and modify according to our needs.

## Response snapshot

Rendered fig-U4-6 (placed by batch PR #366) and confirmed it is a freehand outline: invented border,
Thar drawn as a piece outside the country, Jammu and Kashmir missing. Owner chose (AskUserQuestion):
take it down now with an accurate stand-in; build the real map from Natural Earth 5.1.1 Pakistan
point-of-view boundaries checked against the Survey of Pakistan 2020 political map, with owner sign-off;
source maps and real-world images from PD/CC0/CC BY material, keep course schematics hand-authored.

This PR (plan step PR A): fig-U4-6 is now a table of the five physical regions (every cell from the
Topic 4.3 prose), same figure ID, kind `table`. Alt text updated, and the prose "map of physical zones"
reference now points to the table. Withdrawal note added to the manifest. Fresh G2 evidence recorded.
`crew stop gpks-402-u04-translate` issued so the Urdu job does not mirror the bad map.

## Outcome

- ✅ Impact: the inaccurate map of Pakistan is off the site as soon as this merges and deploys.
- 🧪 Tests: check:content 13/13 pass; site build; visual check of the rendered table.
- 📁 Files: one figure (light and dark), topic-03.mdx, the U4 manifest, the tracker row, and G2 evidence.
- 🔁 Next prompts: PR B (sourced map, draft, owner sign-off); PR C (ADR-0032 sourced-figure policy, skill and gate rule).
- 🧠 Reflection: the gates check that an SVG exists and is accessible, not that a map is geographically
  true. A real-territory map must never be a freehand schematic.

## Handoff (for CEO and agents)

- Shipped / changed: GPKS-402 U4 fig-U4-6 replaced by a physical-regions table. The freehand map is withdrawn.
- Decisions the team must respect: maps of real territory are never drawn freehand or AI-generated.
  They are built from sourced boundary data (Natural Earth, Pakistan view), checked against the Survey
  of Pakistan, and need owner sign-off before `placed`. Maps and real-world photos or documents may be
  downloaded and adapted from PD/CC0/CC BY sources, with provenance recorded. Schematics stay hand-authored.
- Pending / next owner: lead (Claude) builds the sourced map (PR B, draft) and the ADR, skill and gate
  rule (PR C). The owner signs off the map. After this merges, the crew must `crew retry
  gpks-402-u04-translate`. `gpks-402-u04-review_en` was reviewed on the old bytes, so its evidence will
  be stale and it needs a re-review.
- Paperclip issues affected: none (Paperclip retired; crew board tracks work).

## Evaluation notes (flywheel)

- Failure modes observed: a worker accepted a manifest prompt asking for a "map-style diagram" and drew a
  country outline from memory. The gates passed it.
- Graders run and results (PASS/FAIL): check:content PASS; build: see PR checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): check:figures rejects map-of-real-territory rows that lack a `Source:` provenance note.
