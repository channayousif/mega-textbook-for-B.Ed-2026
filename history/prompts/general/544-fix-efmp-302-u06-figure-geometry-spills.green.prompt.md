---
id: 544
title: fix efmp-302-u06 figure-geometry spills
stage: green
date: 2026-10-27T14:45:00+05:00
surface: figures
model: opencode/LongCat-2.0
feature: 009-figure-rendering
branch: crew/efmp-302-u06-fix
user: crew
command: /sp.brief
labels: [crew, opencode]
links:
  spec: null
  ticket: efmp-302-u06-fix
  adr: null
  pr: null
files:
  - static/img/figures/efmp-302/unit-06/fig-U6-2.svg
  - static/img/figures/efmp-302/unit-06/fig-U6-2.dark.svg
  - static/img/figures/efmp-302/unit-06/fig-U6-3.svg
  - static/img/figures/efmp-302/unit-06/fig-U6-3.dark.svg
  - specs/content/efmp-302/reviews/unit-06/G2/20261027T094109321Z-gates.json
  - specs/content/efmp-302/tasks.md
  - static/content-status.json
tests:
  - scripts/measure-figure-text.mjs (all 16 SVGs pass, was 7 failures)
  - npm run check:content (all 13 gates pass)
---

## Prompt

Read .crew/brief.md and carry it out completely. Task: fix 7 text-geometry problems reported by scripts/measure-figure-text.mjs for EFMP-302 Unit 6 (4 in fig-U6-2.svg, 3 in fig-U6-3.svg).

## Response snapshot

fig-U6-2.svg: grew all `.ro` rects from h=26 to h=44, bumped `.m` font-size from 10.5px to 12px, wrapped the four long "rules out" labels into two lines, shifted rows 2 and 3 down, moved the center node from y=200 to y=212, updated all six arrow paths, and moved the caption down to avoid overlap with the row-3 `.ro` rect.

fig-U6-3.svg: moved the four `.t` transition labels from y=106/122 to y=54/76 so they sit above the stage boxes (s1/s2/s3) instead of overlapping them.

Ran `npm run figures:variants` to derive dark twins, `node scripts/prepare-gate-evidence.mjs EFMP-302 6` to regenerate G2 evidence, updated the G2 row in tasks.md to point at the new gates file, and marked the G3 row stale.

## Outcome

- ✅ Impact: All 7 text-geometry failures resolved (0 remaining). All content gates pass.
- 🧪 Tests: scripts/measure-figure-text.mjs exits 0 for all 16 SVGs in the unit; npm run check:content 13/13 PASS.
- 📁 Files: fig-U6-2.svg, fig-U6-3.svg + dark twins regenerated; G2 gate evidence regenerated; tasks.md G2/G3 rows updated; content-status.json rebuilt.
- 🔁 Next prompts: A fresh G3 en-review is needed for Unit 6 (the row is now marked stale).
- 🧠 Reflection: The caption in fig-U6-2 needed a second pass — after growing the `.ro` rects, the caption text overlapped the row-3 rect vertically. Moving the caption from y=410/430 to y=424/442 fixed it. fig-U6-3 was a clean single-pass fix.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U6-2 and fig-U6-3 (EN + dark variants) now pass measure-figure-text.mjs. G2 evidence regenerated and tasks.md updated.
- Decisions the team must respect: No wording changes beyond line breaks. Urdu `.ur.svg` files were not touched and continue to pass.
- Pending / next owner: G3 en-review row is marked stale and needs a fresh run; owner should schedule it.
- Paperclip issues affected: efmp-302-u06-fix

## Evaluation notes (flywheel)

- Failure modes observed: After wrapping labels and growing rects, the caption text overlapped the adjacent `.ro` rect (vertical bounding-box overlap detected by the Chromium-based measure). Fixed by shifting the caption down.
- Graders run and results (PASS/FAIL): measure-figure-text PASS, check:content PASS, check:figures PASS, check:pipeline-gate PASS.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A — task complete.
