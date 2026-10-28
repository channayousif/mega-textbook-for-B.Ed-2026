---
id: 544
title: fix-efmp-302-u01-figure-geometry-overlap
stage: general
date: 2026-10-27T19:10:00Z
surface: cli
model: opencode/LongCat-2.0
feature: efmp-302
branch: crew/efmp-302-u01-fix
user: a2ahs
command: /sp.crew or similar crew dispatch
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-302/unit-01/fig-U1-5.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-5.ur.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-5.dark.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-5.ur.dark.svg
  - static/img/figures/efmp-302/unit-01/content-status.json
  - specs/content/efmp-302/tasks.md
  - specs/content/efmp-302/reviews/unit-01/G2/20261027T190642552Z-gates.json
tests:
  - measure-figure-text.mjs fig-U1-5.svg / fig-U1-5.ur.svg
  - npm run check:content (except pre-existing content-status.json failure)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely.

## Response snapshot

1. Ran `measure-figure-text.mjs` and confirmed one hard failure: fig-U1-5.svg has "is marked by" and "is not just" overlapping by 15.6px at the same y=120.
2. Separated the two labels vertically in both the English and Urdu SVGs: "is marked by" / "محض نہیں" moved to y=100; "is not just" / "خصوصیات" moved to y=135.
3. Ran `npm run figures:variants` to derive the dark twins.
4. Committed the figure fix with conventional message.
5. Ran `prepare-gate-evidence.mjs EFMP-302 1` - all gates PASS, wrote new G2 evidence file.
6. Updated tasks.md: pointed G2 en-draft row at the new gates file; appended "Stale since the figure-geometry repair; needs a fresh G3 run" to the G3 row.
7. Committed tracker update.
8. Verified `check:content` - the only failure (`check:content-status`) is pre-existing on origin/main, not introduced by this work.

## Outcome

- ✅ Impact: fig-U1-5 no longer fails measure-figure-text; the concept-map labels are now readable.
- 🧪 Tests: measure-figure-text passes for fig-U1-5 (both EN and UR); G2 gates regenerated and all pass.
- 📁 Files: 5 figure files (EN/UR light + dark variants), content-status.json, tasks.md, G2 gates evidence.
- 🔁 Next prompts: a fresh independent G3 en-review for EFMP-302 Unit 1 is now owed (the G3 row is stale).
- 🧠 Reflection: the two labels shared a y-coordinate; the simplest fix was vertical separation within the gap between the first and second rows.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U1-5 labels separated vertically; dark variants rebuilt; G2 evidence regenerated; G3 row marked stale.
- Decisions the team must respect: only the light .svg/.ur.svg were edited; dark variants were derived, not hand-edited.
- Pending / next owner: EFMP-302 Unit 1 needs a fresh independent G3 en-review (ADR-0019).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: two inline labels placed at the same y-coordinate with overlapping x-extents; the measure tool catches this.
- Graders run and results (PASS/FAIL): measure-figure-text PASS for fig-U1-5; G2 gates all PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
