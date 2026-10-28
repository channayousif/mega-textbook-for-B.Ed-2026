---
id: 20261031
title: fix-efmp303-u04-figure-geometry
stage: green
date: 2026-10-27
surface: terminal
model: opencode/LongCat-2.0
feature: efmp-303
branch: crew/efmp-303-u04-fix
user: a2ahs
command: ".crew/brief.md execution"
labels: [opencode]
links:
  spec: specs/content/efmp-303/
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-04/fig-U4-1.svg
  - static/img/figures/efmp-303/unit-04/fig-U4-1.ur.svg
  - static/img/figures/efmp-303/unit-04/fig-U4-1.dark.svg
  - static/img/figures/efmp-303/unit-04/fig-U4-1.ur.dark.svg
  - docs/semester-2/efmp-303/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-01.mdx
  - specs/content/efmp-303/tasks.md
tests:
  - scripts/measure-figure-text.mjs
  - npm run figures:variants
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs EFMP-303 4
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

The brief directed: fix fig-U4-1.svg text-geometry (1 overlap), follow svg-authoring.md "Fit and spacing", measure until 0, run figures:variants, update Figure carriers, commit, prepare gate evidence, update tasks.md G2/G3 rows.

## Response snapshot

- Ran measure-figure-text.mjs: found "Share findings with decision makers" (x=222, anchor=start) overlapping "Compare actual against planned" (x=558, anchor=end) by 110.1px, both at y=399.
- Moved the left label from y=399 to y=420 to clear the overlap (stacked vertically per "Rows grow with the text").
- Grew viewBox height from 470 to 450, repositioned wordmark from y=460 to y=438 (12px inside bottom-right).
- Applied identical changes to the .ur.svg mirror.
- Regenerated dark variants via `npm run figures:variants` (2 written).
- Updated Figure `height={470}` to `height={450}` in both EN and UR topic-01.mdx carriers.
- Committed the figure fix (0d91f1d9).
- Ran `prepare-gate-evidence.mjs EFMP-303 4`: all 8 gates PASS, new G2 evidence written.
- Updated tasks.md: pointed G2 row at new gates file, appended stale-G3 note to G3 row.
- Committed tracker update (03268baf).
- Verified `check:content` shows no finding not also present on origin/main (check:content-status failure is pre-existing).

## Outcome

- ✅ Impact: fig-U4-1.svg and its Urdu mirror now pass measure-figure-text.mjs with 0 problems. Dark variants regenerated. Figure carrier heights updated. G2 gate evidence refreshed.
- 🧪 Tests: measure-figure-text.mjs exits 0 for all 8 unit-04 SVGs. figures:variants writes 2 dark variants. check:content passes 12/13 (content-status failure is pre-existing on main).
- 📁 Files: 6 changed in figure commit, 1 in tracker commit, plus 2 untracked G2 evidence artifacts.
- 🔁 Next prompts: Owner should decide whether to mark G3 stale note as actioned or run a fresh G3 review.
- 🧠 Reflection: The "stack the labels vertically, grow the viewBox" approach from the svg-authoring reference worked cleanly. The content-status.json staleness predates this job and belongs to another task.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U4-1.svg (EN + UR + dark variants) geometry repaired; Figure carriers updated; G2 evidence refreshed; tasks.md rows updated.
- Decisions the team must respect: ViewBox height changed from 470 to 450 — both topic-01.mdx carriers reflect this. Do not revert the height attributes independently of the SVG.
- Pending / next owner: G3 en-review is flagged stale and needs a fresh independent G3 run (ADR-0019). Translation_status remains draft across all 5 mirror files pending independent G5 review.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: none introduced by this job. The single content gate failure (check:content-status) predates this work.
- Graders run and results (PASS/FAIL): measure-figure-text PASS, figures:variants PASS, check:content 12/13 PASS (pre-existing failure).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
