---
id: crew-gent-401-u05-repair_en-conflict1
title: crew merge GENT-401 unit 5 repair branch
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u05-repair_en
user: crew
command: crew merge
labels: ["crew", "claude"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u05-repair_en-conflict1.misc.prompt.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-05/fig-U5-1.svg static/img/figures/gent-401/unit-05/fig-U5-1.dark.svg static/img/figures/gent-401/unit-05/fig-U5-1.ur.svg static/img/figures/gent-401/unit-05/fig-U5-1.ur.dark.svg static/img/figures/gent-401/unit-05/fig-U5-3.svg static/img/figures/gent-401/unit-05/fig-U5-3.dark.svg static/img/figures/gent-401/unit-05/fig-U5-3.ur.svg static/img/figures/gent-401/unit-05/fig-U5-3.ur.dark.svg
---

## Prompt

# Crew job gent-401-u05-repair_en-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u05-repair_en conflicts with main (specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-05/`.

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
- (gent-401-u05-repair_en, repair_en, claude) The next G3 run needs render and A4/360px inspection against https://textbook.com.pk after this and the fig-U5-5 banner are deployed.
- (gent-401-u05-repair_en, repair_en, claude) G5 should check the changed Urdu (topics 5.1 and 5.2, MCQ options and keys, fig-U5-1 and fig-U5-3 labels and alt text); punctuation placement in the fig-U5-3.ur.svg box titles looked odd in a local sharp render and needs a browser check.
- (gent-401-u05-review_en, review_en, claude) The repair job should fix F1 (Imran's savings), F2 (redraw fig-U5-1 lines in all 4 variants, including `.ur.svg`, at the coordinates in `figure-check.md`), F3 (credit Scott at `topic-02.mdx:64`), F4 (rebalance MCQ keys, fix MCQ 3) and F5 (soften the Sintha claim), and F7 (add Scott ch. 10 and ch. 1 to `sources/texts/scott-2017-efmd.md`).
- (gent-401-u05-review_en, review_en, claude) render-review stays unavailable until the deployed SHA includes the fig-U5-5 banner commit. The next G3 run should then use render-inspect against https://textbook.com.pk.
- (gent-401-u05-illustrate, illustrate, agy) Unit banner fig-U5-5 is placed; Unit 5 G3 review and G5 review remain open for independent evaluation.

## Response snapshot

Fetched origin and merged `origin/main` (480 files) into `crew/gent-401-u05-repair_en`. The only
conflict was `specs/content/gent-401/tasks.md`, where main appended four G3 repair rows (Units 1, 6,
4, 7) at the end of the tracker table and this branch appended its Unit 5 G3 repair row at the same
anchor. Resolved append-only: main's four rows first, then this branch's Unit 5 row, no exact
duplicates. The Unit 5 depth-estimate line kept this branch's counts (Topic 5.1 12, total 41), which
are the only side that changed it from the merge base and reflect the repair edits. No registry file
(glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) was touched by
either side, so no ID renumbering was needed. Committed the merge as `c8fb8d5c6`.

Then regenerated `static/content-status.json` and ran `npm run check:content`: all 14 gates pass.
Ran `scripts/heavy.sh node scripts/measure-figure-text.mjs` over the eight fig-U5-1 and fig-U5-3
variants this branch changes; exit 0.

## Outcome

- ✅ Impact: branch is up to date with main and the Unit 5 G3 repair work is preserved alongside main's four other-unit repair rows.
- 🧪 Tests: `npm run check:content` all 14 PASS; measure-figure-text exit 0 on the eight changed SVGs.
- 📁 Files: `specs/content/gent-401/tasks.md` conflict resolved; this PHR added.
- 🔁 Next prompts: a fresh independent G3 run on Unit 5 against the deployed site, then G5 on the Urdu mirror.
- 🧠 Reflection: the conflict was a pure append collision at one table anchor; append-only ordering (main then branch) resolved it without losing either side.

## Handoff (for CEO and agents)

- Shipped / changed: merge `c8fb8d5c6` of origin/main into `crew/gent-401-u05-repair_en`; `tasks.md` now carries main's Unit 1/6/4/7 G3 repair rows plus this branch's Unit 5 row.
- Decisions the team must respect: keep both sides' tracker rows, main's order first; the Unit 5 depth estimate stays at Topic 5.1 12 / total 41 (this branch changed it, main did not).
- Pending / next owner: fresh independent G3 (render and A4/360px inspection against https://textbook.com.pk) and G5; G3 stays unticked and unsigned.
- Paperclip issues affected: crew job gent-401-u05-repair_en-conflict1; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: long-lived branch colliding with main at a single append anchor in a shared tracker.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS; `measure-figure-text` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none; the append-only rule was sufficient.
