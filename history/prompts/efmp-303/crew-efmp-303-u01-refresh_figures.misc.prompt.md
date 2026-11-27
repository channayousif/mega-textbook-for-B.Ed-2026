---
id: crew-efmp-303-u01-refresh_figures
title: crew refresh_figures EFMP-303 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u01-refresh_figures
user: crew
command: crew refresh_figures
labels: ["crew", "claude", "refresh_figures"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u01-refresh_figures.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-01/G2/20261127T005405134Z-gates.json
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261127T005405134Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - specs/content/svg-style-baseline.json
 - static/img/figures/efmp-303/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-1.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-2.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-4.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-4.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-6.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-6.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-7.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-7.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-7.ur.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u01-refresh_figures

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u01-refresh_figures`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Redraw the placed SVG schematics of EFMP-303 Unit 1 to the improved standard (Feature 032 phase D, D-2026-0097/0098; owner, 2026-11-23: "we can rewrite existing figures and diagrams to improved versions"). Read `.claude/skills/generate-figures/references/svg-authoring.md` (structure layers and ids, connectors, grid, flowchart shapes, the self-check) and `references/bilingual-figures.md`. For every `static/img/figures/efmp-303/unit-01/fig-*.svg` without `id="layer-nodes"`: redraw it as the same figure, keeping its file name, figure id, alt text, manifest row and meaning (a visual redraw, never a content change: no new facts, labels or arrows the text does not support). A complex picture (people, rooms, objects, dense pictograms) is not redrawn as SVG: leave it and say so in your handoff, since D-2026-0098 makes it a raster for the owner to schedule. Rebuild each Urdu twin from the new English drawing with the Urdu labels of the old `.ur.svg`, then `node scripts/mirror-figure-rtl.mjs <file.ur.svg>` (never a whole-drawing transform); number lines, charts and curves keep their left-to-right axes. Run `npm run figures:variants`, `node scripts/measure-figure-text.mjs <every changed svg>` until it exits 0, and `npm run check:svg-style`. Render every changed figure, English beside Urdu, with `scripts/heavy.sh` and read the images: every label visible (no text on a dark shape drawn ink on ink, nothing painted over by a later shape), nothing clipped, Urdu right to left. Commit, then `scripts/heavy.sh node scripts/prepare-gate-evidence.mjs EFMP-303 1` (repoint the G2 row) and `npm run check:content`. If the unit's latest G3 row is ⏳ or carries an agent report, append a ▢ G3 row: "figures redrawn (Feature 032); the review above predates it; needs a fresh G3 run". Do not edit topic MDX, assessments or any other unit.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-303-u01-illustrate, illustrate, agy) Topic 1.3's prose sets the classroom in Lahore (and has a pupil call the female teacher "Sir"), so fig-U1-12 names no city instead of Sindh; check whether the prose should change in a future revision pass.
- (efmp-303-u01-illustrate, illustrate, agy) Narrow 360px and A4 print render inspection remains undone (requires a host permitted to run a browser/build).
- (efmp-303-u01-illustrate, illustrate, agy) G1 row remains unticked awaiting formal CurriculumOwner sign-off on D-2026-0063.
- (efmp-303-u01-plan_illustrations, plan_illustrations, claude) Topic 1.3's prose sets the classroom in Lahore (and has a pupil call the female teacher "Sir"), so `fig-U1-12` names no city instead of Sindh. Check whether the prose should change.
- (efmp-303-u01-plan_illustrations, plan_illustrations, claude) The illustrate job needs to generate, inspect and place `fig-U1-9` to `fig-U1-13`, then swap the EN/UR markers for `<Figure>` elements.


## Response snapshot

Redrew EFMP-303 Unit 1's eight SVG schematics (English, Urdu and dark variants) to the improved standard with the committed labels unchanged, refreshed the G2 evidence and tracker, and added the PHR.

## Outcome

- Impact: refresh_figures for EFMP-303 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 44 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Redrew EFMP-303 Unit 1's eight SVG schematics (English, Urdu and dark variants) to the improved standard with the committed labels unchanged, refreshed the G2 evidence and tracker, and added the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 1 needs a fresh G3 run; the G5 reviewer should check the redrawn Urdu SVGs, including numeral order such as "5 تا 3 تا 2 تا 2".
  - fig-U1-4's main connectors are now double-headed to match its alt text; reviewers should confirm that reading.
  - SVG text in `.ur.svg` files needs `&#x200F;` around labels that start with a number or end with punctuation, or they display in the wrong order.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
