---
id: crew-efmp-303-u03-refresh_figures
title: crew refresh_figures EFMP-303 unit 3
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u03-refresh_figures
user: crew
command: crew refresh_figures
labels: ["crew", "claude", "refresh_figures"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/032-textbook-visuals/20261307-efmp-303-u03-refresh-figures.green.prompt.md
 - specs/content/efmp-303/reviews/unit-03/G2/20261127T203951987Z-gates.json
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261127T203951987Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-6.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-6.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u03-refresh_figures

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u03-refresh_figures`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Redraw the placed SVG schematics of EFMP-303 Unit 3 to the improved standard (Feature 032 phase D, D-2026-0097/0098; owner, 2026-11-23: "we can rewrite existing figures and diagrams to improved versions"). Read `.claude/skills/generate-figures/references/svg-authoring.md` (structure layers and ids, connectors, grid, flowchart shapes, the self-check) and `references/bilingual-figures.md`. For every `static/img/figures/efmp-303/unit-03/fig-*.svg` without `id="layer-nodes"`: redraw it as the same figure, keeping its file name, figure id, alt text, manifest row and meaning (a visual redraw, never a content change: no new facts, labels or arrows the text does not support). A complex picture (people, rooms, objects, dense pictograms) is not redrawn as SVG: leave it and say so in your handoff, since D-2026-0098 makes it a raster for the owner to schedule. Rebuild each Urdu twin from the new English drawing with the Urdu labels of the old `.ur.svg`, then `node scripts/mirror-figure-rtl.mjs <file.ur.svg>` (never a whole-drawing transform); number lines, charts and curves keep their left-to-right axes. Run `npm run figures:variants`, `node scripts/measure-figure-text.mjs <every changed svg>` until it exits 0, and `npm run check:svg-style`. Render every changed figure, English beside Urdu, with `scripts/heavy.sh` and read the images: every label visible (no text on a dark shape drawn ink on ink, nothing painted over by a later shape), nothing clipped, Urdu right to left. Commit, then `scripts/heavy.sh node scripts/prepare-gate-evidence.mjs EFMP-303 3` (repoint the G2 row) and `npm run check:content`. If the unit's latest G3 row is ⏳ or carries an agent report, append a ▢ G3 row: "figures redrawn (Feature 032); the review above predates it; needs a fresh G3 run". Do not edit topic MDX, assessments or any other unit.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-03/`.

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
- (efmp-303-u03-plan_illustrations, plan_illustrations, claude) The prose places Topic 3.2 in Swabi and Topic 3.3 in Khyber Pakhtunkhwa, but `fig-U3-9` and `fig-U3-10` follow the brief's Sindh-setting rule and name no city. Check that this mismatch is acceptable before generating them.
- (efmp-303-u03-plan_illustrations, plan_illustrations, claude) The illustrate job still has to generate, inspect and place `fig-U3-7` to `fig-U3-10`, then replace the English and Urdu markers with `<Figure>` elements.
- (efmp-303-u03-repair_en-r1, repair_en, opencode) G3 stays unticked; fresh independent blind solving, author provenance, parent-frozen handoff, page renders and owner G1 reconciliation remain pending.
- (efmp-303-u03-repair_en-r1, repair_en, opencode) origin/main advanced by 21 commits during the session, including a Unit 1 G3 row appended to the same `specs/content/efmp-303/tasks.md` table; expect a possible merge conflict there.
- (efmp-303-u03-repair_en-r1, repair_en, opencode) Unit 3 G2 evidence was refreshed and its tracker row repointed to `20261109T235850396Z-gates.json`.


## Response snapshot

Redrew EFMP-303 Unit 3's six SVG schematics and their Urdu and dark twins to the layered standard, refreshed G2 evidence and added a G3 rerun row.

## Outcome

- Impact: refresh_figures for EFMP-303 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Redrew EFMP-303 Unit 3's six SVG schematics and their Urdu and dark twins to the layered standard, refreshed G2 evidence and added a G3 rerun row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - In `fig-U3-4`, the Urdu twin says "نتائج کا ہدف (اسکول)" but the English says "Pass-rate target" with no "(school)"; the manifest prompt also says three columns and a school attendance example, which differ from the figure. Both predate this redraw and were left for G3/G5.
  - Urdu SVG text with digits or punctuation needs a U+202B/U+202C wrap (not `direction="rtl"`); `measure-figure-text.mjs` does not catch wrong ordering, so render to check.
  - Unit 3 needs a fresh G3 run (new ▢ row), and G2 now points to `20261127T203951987Z-gates.json`; sibling jobs also edit `specs/content/efmp-303/tasks.md`, so expect a possible merge conflict.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
