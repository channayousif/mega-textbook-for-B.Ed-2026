---
id: 20261188
title: Resolve EFMP-407 Unit 8 merge conflicts
stage: misc
date: 2026-11-10
surface: agent
model: longcat-2.0
feature: efmp-407
branch: crew/efmp-407-u08-repair_en
user: crew
command: Execute .crew/brief.md
labels: ["crew", "opencode", "efmp-407", "conflict"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/tasks.md
  - history/prompts/efmp-407/20261188-resolve-efmp407-unit08-merge-conflicts.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u08-repair_en conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
- (efmp-407-u08-repair_en, repair_en, agy) G3 review findings F1-F8 from 20261108T203238Z-g3-desk-04abd597.json are repaired in EN and UR mirrors; G3 tracker row appended leaving G3 unticked.
- (efmp-407-u08-repair_en, repair_en, agy) G2 gate evidence refreshed at specs/content/efmp-407/reviews/unit-08/G2/20261110T024249494Z-gates.json and all 14 content gates are green.
- (efmp-407-u08-illustrate, illustrate, agy) Banner fig-U8-5.webp is placed in both English and Urdu unit index files, with unit-08.banner.md set to placed.
- (efmp-407-u08-illustrate, illustrate, agy) G2 gate evidence has been refreshed to cover the English index update, and all 14 content gates are green.
- (efmp-407-u08-illustrate, illustrate, agy) G3 English review and G5 Urdu review remain open and uncertified; Jumani and Abbasi (2015) attribution finding belongs to repair_en.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Fetched origin and merged origin/main into crew/efmp-407-u08-repair_en. The only conflict was the shared tracker `specs/content/efmp-407/tasks.md`: main appended a Unit 1 G3 row and this branch appended a Unit 8 G3 row at the same location. Kept both, main's Unit 1 row first then the branch's Unit 8 row, and preserved main's gate-path and Unit 5 row updates. The four shared registries were untouched by this branch and matched main exactly. Regenerated `static/content-status.json`, then all 14 content gates passed.

## Outcome

- Impact: crew/efmp-407-u08-repair_en now merges cleanly with origin/main; Unit 8 repair content and tracker rows are preserved alongside main's Unit 1 and Unit 5 updates.
- Tests: npm run check:content PASS (14/14) after regenerating static/content-status.json.
- Files: one conflict resolution in specs/content/efmp-407/tasks.md plus this PHR.
- Next prompts: downstream G3 English review, G4/G5 Urdu work, and any Unit 8 follow-up.
- Reflection: the shared per-course tracker is the recurring collision point for parallel unit jobs on EFMP-407.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 11cbacf11 on crew/efmp-407-u08-repair_en resolving the tasks.md conflict; PHR 20261188.
- Decisions the team must respect: main's tracker entries were preserved verbatim; the branch's Unit 8 rows were added alongside, not instead of, main's entries.
- Pending / next owner: crew lead (auto-merge when CI is green); Unit 8 G3/G5 remain open and uncertified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: parallel unit jobs on one course collide on the shared tracker; the previous attempt exited without committing.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): crew conflict brief v1.
- Next experiment (smallest change to try): allocate PHR IDs from a shared sequence at job dispatch time.
