---
id: 20261307
title: Redraw EFMP-303 Unit 3 schematics
stage: green
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: 032-textbook-visuals
branch: crew/efmp-303-u03-refresh_figures
user: crew
command: crew refresh_figures efmp-303 u03
labels: [claude, crew, figures]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-03/
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-03/G2/
tests:
  - scripts/measure-figure-text.mjs on all 24 Unit 3 SVG files
  - npm run check:svg-style
  - scripts/prepare-gate-evidence.mjs EFMP-303 3
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The brief it names:

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

Redrew fig-U3-1 to fig-U3-6 (English and Urdu, dark twins derived) with the four layer groups, named
nodes and connectors. Same file names, ids, alt text, manifest rows and labels. All six are simple
schematics, so none became a raster. Codex was tried first and was over its usage limit (until
2026-12-18), so Claude authored the SVGs. Rendered English beside Urdu in light and dark, and fixed
Urdu bidi order, tight Urdu table rows and fig-U3-5 sub-labels touching their boxes.

## Outcome

- ✅ Impact: Unit 3 schematics meet the Feature 032 structure standard.
- 🧪 Tests: text measurement, SVG style and G2 evidence gates pass; the check:content result is in the job output.
- 📁 Files: 24 SVG files, the course tracker, new G2 evidence.
- 🔁 Next prompts: fresh G3 run for Unit 3.
- 🧠 Reflection: the geometry check passes Urdu strings whose digits and punctuation are in the wrong order; only a render shows it.

## Handoff (for CEO and agents)

- Shipped / changed: redrawn Unit 3 schematics on the branch; not pushed, no PR.
- Decisions the team must respect: Urdu SVG labels with digits or punctuation are wrapped in U+202B and U+202C, not direction="rtl".
- Pending / next owner: fresh G3 run; G5 check of the Urdu labels.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu bidi misordering invisible to measure-figure-text.
- Graders run and results (PASS/FAIL): measure-figure-text PASS, check:svg-style PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add RTL embedding to the mirror script for Urdu text.
