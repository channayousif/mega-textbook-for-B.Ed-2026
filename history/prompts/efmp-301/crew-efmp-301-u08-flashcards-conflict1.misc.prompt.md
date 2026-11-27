---
id: crew-efmp-301-u08-flashcards-conflict1
title: crew flashcards EFMP-301 unit 8
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u08-flashcards
user: crew
command: crew flashcards
labels: ["crew", "claude_crew", "flashcards"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u08-flashcards-conflict1.misc.prompt.md
 - specs/studio/flashcards-needed.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-flashcards-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-301-u08-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
- (efmp-301-u08-flashcards, flashcards, claude) The Urdu mirrors of topics 8.1 to 8.3 use "کاؤنٹرائزنگ" for "management" throughout the body text, not only in the figure description; the deck avoids it, and a G5 or translation job should fix the topics.
- (efmp-301-u08-flashcards, flashcards, claude) `static/studio/flashcards/` is git-ignored but 61 files under it are still tracked, so `build-studio-index.mjs` dirties other courses' files; restore them before committing.
- (efmp-301-u08-refresh_figures, refresh_figures, claude) The old Urdu labels were kept word for word, typos included, for a G5 or translation job to fix: "تعلمی" in fig-U8-1 should be "تعلیمی", "کام کرتے والی" should be "کام کرتی", and the fig-U8-2 description still has the known mistranslation "کاؤنٹرائزنگ".
- (efmp-301-u08-refresh_figures, refresh_figures, claude) To change these figures again, edit and run `.crew/u8/run.sh` (it generates the files and mirrors the Urdu), then `npm run figures:variants` and measure again. Do not edit the `.ur.svg` coordinates by hand.
- (efmp-301-u08-illustrate, illustrate, agy) G2 gate evidence refreshed and committed at 20261113T053607656Z-gates.json.

## Response snapshot

Merged `origin/main` into `crew/efmp-301-u08-flashcards` and resolved the single conflict in
`specs/studio/flashcards-needed.json` by dropping both independently removed entries (`efmp-301/7`
from main, `efmp-301/8` from this branch), because both units now have authored decks. Committed the
merge and this PHR, restored the tracked `static/studio/flashcards/` files that
`build-studio-index.mjs --coverage` dirtied, and confirmed all 14 content gates pass.

## Outcome

- Impact: conflict resolution for EFMP-301 Unit 8 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14 content gates) in the job worktree.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged `origin/main` and resolved `specs/studio/flashcards-needed.json` by dropping
  both `efmp-301/7` (main's removal) and `efmp-301/8` (this branch's removal), matching the documented
  `crew/efmp-301-u07-flashcards-conflict1` precedent.
- Decisions the team must respect: the merge keeps this branch's added `efmp-409/3`, `efmp-409/4`,
  `efmp-409/5` rows (auto-merged, not on main) and does not regenerate the list, so `efpc-411/2` and
  `efpc-411/3` are not in it yet.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `specs/studio/flashcards-needed.json` is generated by `node scripts/build-studio-index.mjs --coverage`;
    a fresh run would also add `efpc-411/2` and `efpc-411/3` (main added those units without decks).
    The merge diff was kept minimal, so they are not in the list yet.
  - `build-studio-index` rewrites tracked files under `static/studio/flashcards/` for other courses;
    restore them with `git checkout -- static/studio/` before committing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
