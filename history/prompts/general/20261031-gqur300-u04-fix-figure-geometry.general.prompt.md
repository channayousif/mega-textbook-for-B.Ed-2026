---
id: 20261031
title: "Repair GQUR-300 Unit 4 figure text-geometry defects"
stage: general
date: 2026-10-27
surface: "static/img/figures/gqur-300/unit-04 (fig-U4-4.svg, fig-U4-4.ur.svg, fig-U4-6.svg) + dark variants + G2 evidence + tasks.md"
model: longcat/LongCat-2.0
feature: "015-content-corpus"
branch: "crew/gqur-300-u04-fix"
user: "a2ahs"
command: "/home/a2ahs/crew-wt/gqur-300-u04-fix/.crew/brief.md"
labels: ["opencode", "figure-geometry", "gqur-300", "unit-04"]
links:
  spec: "specs/content/gqur-300/figures/unit-04.md"
  ticket: null
  adr: null
  pr: "339 (introduced overlap and spill checks)"
files:
  - "static/img/figures/gqur-300/unit-04/fig-U4-4.svg"
  - "static/img/figures/gqur-300/unit-04/fig-U4-4.ur.svg"
  - "static/img/figures/gqur-300/unit-04/fig-U4-6.svg"
  - "static/img/figures/gqur-300/unit-04/fig-U4-4.dark.svg"
  - "static/img/figures/gqur-300/unit-04/fig-U4-4.ur.dark.svg"
  - "static/img/figures/gqur-300/unit-04/fig-U4-6.dark.svg"
  - "specs/content/gqur-300/reviews/unit-04/G2/20261027T162332529Z-gates.json"
  - "specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/*.txt"
  - "specs/content/gqur-300/tasks.md"
tests:
  - "scripts/measure-figure-text.mjs (all 12 unit-04 SVGs pass)"
  - "npm run figures:variants (3 dark variants regenerated)"
  - "npm run check:content (12/13 pass; content-status pre-existing on origin/main)"
---

## Prompt

Read `.crew/brief.md` in the current directory and carry it out completely. The brief asked to fix 4 figure text-geometry problems reported by `scripts/measure-figure-text.mjs` for GQUR-300 Unit 4: fig-U4-4.svg (1), fig-U4-4.ur.svg (2), fig-U4-6.svg (1). Follow the svg-authoring guide's "Fit and spacing" section. After committing, run `prepare-gate-evidence.mjs GQUR-300 4`, point the G2 en-draft row at the new gates file, and append a stale note to the G3 row.

## Response snapshot

1. Ran `measure-figure-text.mjs` to confirm the 4 failures:
   - fig-U4-4.svg: "a classroom 8 m by 6 m needs" spills 5.2px out of header panel [30,56,760,96]
   - fig-U4-4.ur.svg: caption overprints wordmark (ends 257.8, wordmark starts 12); "8 بہ 6 میٹر کلاس روم کو" spills 1.7px out of panel [20,56,750,96]
   - fig-U4-6.svg: "square metres, then litres" overlaps "length x height, then / 10" by 8.5px

2. Fixed fig-U4-4.svg: shifted first-row small text from y=100/120 to y=108/128 so its baseline clears the header panel bottom (y=96).

3. Fixed fig-U4-4.ur.svg: same row shift (y=100/120 to y=108/128) plus moved the RTL caption from x=150 to x=630 to clear the wordmark at x=12.

4. Fixed fig-U4-6.svg: wrapped "square metres, then litres" onto two lines (y=368 "square metres," / y=388 "then litres") to clear the formula text at y=376.

5. Ran `measure-figure-text.mjs` again: all 12 unit-04 SVGs pass (0 problems).

6. Ran `npm run figures:variants`: 3 dark variants regenerated.

7. Committed SVG fixes (852ec616).

8. Ran `prepare-gate-evidence.mjs GQUR-300 4`: wrote fresh G2 evidence with post-fix SVG hashes.

9. Updated tasks.md: G2 en-draft row now points at `20261027T162332529Z-gates.json`; G3 en-review row appended "Stale since the figure-geometry repair; needs a fresh G3 run".

10. Committed evidence + tasks.md (1fff375b).

11. Ran `check:content`: 12/13 pass. The one failure (`check:content-status`) is pre-existing on origin/main (content-status.json was generated for commit d5ff559c but origin/main HEAD is 0deb05f4) and belongs to another job.

## Outcome

- ✅ Impact: All 4 measure-figure-text.mjs findings for GQUR-300 Unit 4 are resolved. The unit's G2 gate evidence is refreshed and its G3 row is correctly flagged as stale pending a fresh review.
- 🧪 Tests: measure-figure-text.mjs exits 0 for all 12 unit-04 SVGs; figures:variants regenerates dark twins; check:content passes 12/13 gates (the 1 failure is pre-existing on origin/main).
- 📁 Files: 6 SVG sources + 3 dark variants + 1 G2 evidence JSON + 8 G2 log files + tasks.md.
- 🔁 Next prompts: A fresh G3 review run for GQUR-300 Unit 4 (the G3 row is now explicitly flagged as stale).
- 🧠 Reflection: The measure script's spill check uses the text's midY to find the smallest containing rect; a baseline shift of just 8px was enough to move the first-row small text below the header panel's y2=96, which removed it from the panel's holder set entirely. For the RTL caption, the wordmark sits at bottom-left (x=12) so the caption had to move to the right (x=630) rather than just down.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U4-4.svg/.ur.svg and fig-U4-6.svg geometry repaired; dark variants regenerated; G2 evidence refreshed; tasks.md G2/G3 rows updated.
- Decisions the team must respect: The G3 en-review row for Unit 4 is stale and must be re-run before any G3 certification. The 12 unbanked key_terms noted in the G4 row remain the owner's responsibility.
- Pending / next owner: Fresh G3 review run for GQUR-300 Unit 4 (owner or crew lead). The content-status.json staleness is a separate job.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: The measure script's holder-rect logic means a text element can be "caught" by a panel rect even when its baseline is below the panel, because the check uses the text's vertical mid-band (cy ± 0.45em). A small baseline shift that moves midY past the panel's y2 is sufficient.
- Graders run and results (PASS/FAIL): measure-figure-text.mjs PASS (0 problems); check:content 12/13 PASS (1 pre-existing FAIL on origin/main).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
