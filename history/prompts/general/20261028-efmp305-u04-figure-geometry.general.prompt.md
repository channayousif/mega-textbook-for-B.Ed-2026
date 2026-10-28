---
id: 20261028-efmp305-u04-figure-geometry
title: "Fix fig-U4-3.ur.svg text-geometry spill in EFMP-305 Unit 4"
stage: general
date: 2026-10-28T19:24:00Z
surface: cli
model: longcat/LongCat-2.0
feature: general
branch: crew/efmp-305-u04-fix
user: opencode
command: crew
labels: [opencode]
links:
  spec: null
  ticket: efmp-305-u04-fix
  adr: null
  pr: null
files:
  - path: static/img/figures/efmp-305/unit-04/fig-U4-3.ur.svg
    change: "repositioned 40 cm label from x=1125 (text-anchor=end) to x=75 (text-anchor=start) to clear box spill"
  - path: static/img/figures/efmp-305/unit-04/fig-U4-3.ur.dark.svg
    change: "regenerated dark variant via npm run figures:variants"
  - path: specs/content/efmp-305/tasks.md
    change: "updated G2 gates pointer to new evidence file; flagged G3 en-review stale"
  - path: specs/content/efmp-305/reviews/unit-04/G2/20261027T192354658Z-gates.json
    change: "committed fresh G2 gate evidence post-repair"
  - path: static/content-status.json
    change: "regenerated after tasks.md change"
tests:
  - name: measure-figure-text.mjs (all unit-04 SVGs)
    result: "PASS - all 8 SVGs measured clean, fig-U4-3.ur.svg no longer spills"
  - name: npm run figures:variants
    result: "PASS - 1 dark variant written"
  - name: npm run check:content
    result: "PASS - all 13 content gates pass"
---

## Prompt

Crew job efmp-305-u04-fix: fix the figure text-geometry problem reported by scripts/measure-figure-text.mjs for EFMP-305 Unit 4. One issue total: fig-U4-3.ur.svg had the "40 cm" label spilling 40px out of its containing .box rect. Follow the svg-authoring.md fit-and-spacing guidance, measure until clean, run figures:variants, then prepare gate evidence and update the unit's G2/G3 tracker rows.

## Response snapshot

Diagnosed the spill: `fig-U4-3.ur.svg` had `<text x="1125" y="535" text-anchor="end">40 cm</text>` whose bounding box started inside `.box [973,476,1085,521]` and extended 40px past its right edge. The English version places the same label at `x="75" text-anchor="start"`. Applied the mirror fix to the Urdu SVG: moved the label to `x="75" text-anchor="start"`. Ran `measure-figure-text.mjs` - all 8 unit-04 SVGs pass. Ran `figures:variants` - dark variant regenerated. Ran `prepare-gate-evidence.mjs EFMP-305 4` - G2 evidence written. Updated tasks.md: G2 points to new gates file, G3 flagged stale. Regenerated content-status.json. All 13 content gates pass.

## Outcome

- ✅ Impact: fig-U4-3.ur.svg geometry defect resolved; no label spills; all content gates pass.
- 🧪 Tests: measure-figure-text.mjs clean for all 8 unit-04 SVGs; check:content 13/13 pass.
- 📁 Files: 2 SVG sources + 1 dark variant + 1 tasks.md + 1 gates evidence + 1 content-status.json.
- 🔁 Next prompts: fresh independent G3 en-review is needed (flagged stale in tracker).
- 🧠 Reflection: the spill was a single-line edit - the RTL label had been placed at the far right (x=1125) where it fell inside the last bench box; mirroring the English left-side placement (x=75) was the minimal fix.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U4-3.ur.svg and .ur.dark.svg repaired; G2 evidence refreshed; G3 en-review marked stale.
- Decisions the team must respect: G3 en-review must be re-run independently before any further progress on Unit 4; the viewBox height did not change, so no Figure carrier updates were needed.
- Pending / next owner: fresh independent G3 en-review for EFMP-305 Unit 4 (owner action).
- Paperclip issues affected: efmp-305-u04-fix.

## Evaluation notes (flywheel)

- Failure modes observed: RTL dimension labels placed at the far edge of a diagram can silently fall inside a box rect and trigger spill checks even when visually they appear outside the main content area.
- Graders run and results (PASS/FAIL): PASS on all measures.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a - task complete.
