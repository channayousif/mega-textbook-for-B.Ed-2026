---
id: 2434
title: Sourced Pakistan map for GPKS-402 U4
stage: misc
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: gpks-402
branch: feat/gpks-402-u4-sourced-map
user: M Yousif Channa
command: none
labels: ["board-direct", "gpks-402", "figures", "maps", "sourced-assets"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gpks-402/unit-04/fig-U4-6.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-6.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-8.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-8.dark.svg
 - docs/semester-2/gpks-402/unit-04/topic-03.mdx
 - specs/content/gpks-402/figures/unit-04.md
 - specs/content/gpks-402/tasks.md
 - specs/content/gpks-402/reviews/unit-04/G2/20261028T213208553Z-gates.json
 - ops/figure-sources/gpks-402/fig-U4-6-build_map.py
tests:
 - npm run check:content (13/13 pass)
 - rendered light and dark variants and compared side by side with the Survey of Pakistan folio map
---

## Prompt

the svg map created in crew: batch 2026-10-28 14:15Z, 3 jobs (GPKS-402)- #366
#366 is highly inaccurate, maps are highly sensitive artifacts. it should be actual approved not an approximate or careless sketch. replace immediately. one more thing, why should we generate each and every figure when we can download an opensource/free and better alternative we can fetch and modify according to our needs.

## Response snapshot

PR B of the approved plan (PR A, #368, withdrew the freehand map). New fig-U4-6 is built only from
Natural Earth 5.1.1 public-domain data. The national outline comes from ne_10m_admin_0_countries_pak
(Pakistan point of view). The Pakistan-administered area comes from de facto ne_10m_admin_0_countries
plus the Siachen area west of the LoC. The disputed territory is the difference. The Line of Control and
Working Boundary come from ne_10m_admin_0_boundary_lines_land, split near Chhamb (32.9 N). The frontier
undefined is the disputed edge with China. Mountains, Thar/Cholistan and the Indus Delta come from
geography_regions_polys, and the Indus, Jhelum, Chenab, Ravi and Sutlej from rivers_lake_centerlines.
Labels and notes follow the Survey of Pakistan folio map (2026): Gilgit-Baltistan, AJK, Indian Illegally
Occupied Jammu and Kashmir (disputed territory), the LoC plebiscite note, and the frontier-undefined note.
Junagadh, Manavadar and Sir Creek are noted as too small for this scale. The file is 18.7 KB, under
the 20 KB budget. The table from #368 is kept as fig-U4-8, after the five regions. The generator is
committed so the map can be rebuilt. The PR is opened as a draft, and merging waits for owner sign-off.

## Outcome

- ✅ Impact: GPKS-402 Topic 4.3 gets a geographically accurate map once the owner signs it off.
- 🧪 Tests: check:content 13/13. Light and dark renders inspected. Side-by-side comparison with the official map.
- 📁 Files: map and table figures (light and dark), topic-03.mdx, the manifest, the tracker, G2 evidence, and the generator script.
- 🔁 Next prompts: owner sign-off on this PR; PR C (ADR-0032, skill rule, check:figures map rule).
- 🧠 Reflection: Natural Earth's LoC feature includes the Working Boundary, and its Siachen
  polygon sits apart from both countries. Both needed handling to match the Survey of Pakistan map.

## Handoff (for CEO and agents)

- Shipped / changed: a sourced map of Pakistan as fig-U4-6 (draft PR). The regions table moves to fig-U4-8.
- Decisions the team must respect: do not edit fig-U4-6 by hand. Change it with
  ops/figure-sources/gpks-402/fig-U4-6-build_map.py and Natural Earth data, then get it signed off
  again. Maps of real territory are never drawn freehand or AI-generated.
- Pending / next owner: the owner signs off on the PR (compare with the Survey of Pakistan folio map).
  After the merge, the crew retries gpks-402-u04-translate, and the Urdu `.ur.svg` translates labels only,
  never the geometry. gpks-402-u04-review_en needs a fresh review of the changed bytes.
- Paperclip issues affected: none (Paperclip retired; crew board tracks work).

## Evaluation notes (flywheel)

- Failure modes observed: none new. The original failure, a freehand map, is recorded in PHR 2433.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): check:figures requires a `Source:` note on any map row.
