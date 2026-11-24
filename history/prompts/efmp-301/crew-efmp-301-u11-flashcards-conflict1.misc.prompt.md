---
id: crew-efmp-301-u11-flashcards-conflict1
title: crew merge conflict EFMP-301 unit 11 flashcards
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u11-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u11-flashcards-conflict1.misc.prompt.md
 - specs/studio/flashcards-needed.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-flashcards-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-301-u11-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
- (efmp-301-u11-flashcards, flashcards, claude) Only "Anxiety" has a `terminology.csv` pair; the other Urdu card terms (for example نمٹنا, اسی دن بڑھاوا, نجی نقشہ) copy the draft Urdu topic and should be checked again when that topic's G5 review changes its wording.
- (efmp-301-u11-illustrate, illustrate, agy) Qualified subject review of WHO-bound clinical interpretation, urgency, and local referral procedure remains an owner escalation item prior to certification.
- (efmp-301-u11-illustrate, illustrate, agy) Visual render (360px/print) and author session provenance evidence remain unverified under host resource controls.
- (efmp-301-u11-illustrate, illustrate, agy) Unit 11 G3 remains open and unticked pending owner authorisation for a subsequent review cycle under ADR-0019.
- (efmp-301-u11-plan_illustrations, plan_illustrations, claude) The illustrate job still has to generate, inspect and place `fig-U11-5` (banner, `--banner`), `fig-U11-6` and `fig-U11-7`, and swap the EN and UR markers for `<Figure>` elements.

## Response snapshot

Merged origin/main into crew/efmp-301-u11-flashcards, resolved the single conflict in `specs/studio/flashcards-needed.json` by regenerating the coverage index (both efmp-301/10 and efmp-301/11 now have decks, so neither stays listed), amended the merge commit with that result, and left `npm run check:content` fully green.

## Outcome

- Impact: fix for EFMP-301 Unit 11 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree (14/14 gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u11-flashcards and resolved the `specs/studio/flashcards-needed.json` conflict by rerunning `node scripts/build-studio-index.mjs --coverage`; the merged tree has decks for both efmp-301/10 (from main) and efmp-301/11 (this branch), so both units leave the needed list.
- Decisions the team must respect: `flashcards-needed.json` is a generated coverage index, not one of the append-only registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv), so it is resolved by regeneration rather than by union. G3/G5 stay advisory until a qualified sign-off; this PR certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/studio/flashcards/` is gitignored yet main tracks generated decks there; the coverage script rewrites tracked decks for other courses, so restore them (`git checkout -- static/studio/flashcards/`) before committing a merge.
  - Only "Anxiety" has a `terminology.csv` pair; the other Urdu card terms copy the draft Urdu topic and should be rechecked when that topic's G5 review changes its wording.
  - EFMP-301 Unit 11 G3 remains unticked with no reviewer initials, awaiting human sign-off under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
