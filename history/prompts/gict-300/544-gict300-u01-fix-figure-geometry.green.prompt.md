---
id: 544
title: "Fix GICT-300 Unit 1 figure text-geometry (fig-U1-2.ur spill, fig-U1-3 overlap)"
stage: green
date: 2026-10-27T17:15:00Z
surface: figure text-geometry repair (SVG label fit and spacing)
model: LongCat-2.0
feature: 009
branch: crew/gict-300-u01-fix
user: owner
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: [opencode]
links:
  spec: null
  ticket: gict-300-u01-fix
  adr: null
  pr: null
files:
  - static/img/figures/gict-300/unit-01/fig-U1-2.ur.svg
  - static/img/figures/gict-300/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/gict-300/unit-01/fig-U1-3.svg
  - static/img/figures/gict-300/unit-01/fig-U1-3.dark.svg
  - specs/content/gict-300/tasks.md
  - specs/content/gict-300/reviews/unit-01/G2/20261027T171320721Z-gates.json
tests:
  - scripts/measure-figure-text.mjs (all unit-01 SVGs pass)
  - npm run check:content (12/13 pass; check:content-status pre-existing failure)
  - npm run figures:variants (2 dark variants regenerated)
---

## Prompt

Crew brief: fix figure text-geometry problems reported by scripts/measure-figure-text.mjs for GICT-300 Unit 1 (fig-U1-2.ur.svg spill, fig-U1-3.svg overlap), regenerate dark variants, prepare G2 gate evidence, and mark G3 stale in tasks.md.

## Response snapshot

1. Measured all unit-01 SVGs; identified two defects:
   - fig-U1-2.ur.svg: header tspan `text-anchor="end"` spilled RTL labels 84px into adjacent panel [16,48,204,104]
   - fig-U1-3.svg: "Beads for counting" and "Gears for arithmetic" only 1.1px apart (need 4)
2. First fix attempt replaced ALL `text-anchor="end"` with "middle" including parent `<text>` title/caption elements, breaking RTL title/caption alignment and causing overflow. Reverted.
3. Applied targeted fix: replaced `text-anchor="end"` only within `<tspan>` tags (46 occurrences), preserving parent `<text>` anchors at "end".
4. fig-U1-3.svg: moved "Gears for arithmetic" from y=163 to y=173, eliminating vertical band overlap while keeping label inside its panel.
5. All 16 SVGs pass measure-figure-text.mjs.
6. Ran `npm run figures:variants` -> 2 dark variants regenerated.
7. Committed figure fixes (a54edf5c).
8. Ran `node scripts/prepare-gate-evidence.mjs GICT-300 1` -> G2 evidence written.
9. Updated tasks.md: G2 row points to new gates file; G3 row appended "Stale since the figure-geometry repair; needs a fresh G3 run".
10. Committed gate evidence + tasks update (77ee630f).
11. `npm run check:content`: 12/13 pass. `check:content-status` fails due to pre-existing stale `content-status.json` from another job (confirmed by stashing local changes - failure persists).

## Outcome

- ✅ Impact: Both figure text-geometry defects repaired; all unit-1 SVGs pass measurement; G2 evidence refreshed; G3 correctly marked stale.
- 🧪 Tests: measure-figure-text.mjs exits 0 for all unit-01 SVGs; check:content 12/13 (one pre-existing failure outside scope).
- 📁 Files: 4 SVG sources + dark variants, G2 gates.json + logs, tasks.md.
- 🔁 Next prompts: A fresh G3 en-review run on GICT-300 Unit 1 (owner action - agent reviews are advisory under ADR-0019).
- 🧁 Reflection: Bulk string replacement of `text-anchor="end"` is dangerous in RTL SVGs because parent `<text>` and `<tspan>` elements need different anchors. Always scope replacements to the specific element type.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U1-2.ur.svg (tspan anchors), fig-U1-3.svg (note y-position), dark variants regenerated, G2 evidence refreshed, tasks.md G2/G3 rows updated.
- Decisions the team must respect: G3 review is now stale and must be re-run after this commit; G2 evidence is current for the post-repair state.
- Pending / next owner: Fresh G3 en-review run (owner-scheduled; agent reviews advisory under ADR-0019). After G3 passes, G4/G5 Urdu mirror may need re-check.
- Paperclip issues affected: gict-300-u01-fix

## Evaluation notes (flywheel)

- Failure modes observed: Bulk replacement of text-anchor="end" -> "middle" broke RTL title/caption alignment. Lesson: scope SVG attribute replacements to specific element types (tspan vs text).
- Graders run and results (PASS/FAIL): measure-figure-text.mjs PASS (all), check:content PASS (12/13, one pre-existing), figures:variants PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
