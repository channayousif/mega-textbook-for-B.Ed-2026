---
id: crew-efmp-407-u07-repair_en-r1-conflict1
title: crew fix EFMP-407 unit 7
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u07-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u07-repair_en-r1-conflict1.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u07-repair_en-r1.misc.prompt.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-repair_en-r1-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-407-u07-repair_en-r1 conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-07/`.

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
- (efmp-407-u07-repair_en-r1, repair_en, claude) Unit 7 G3 needs a fresh independent review: report f45bf9fe repeats the r1 findings that b02ba6e6e and a9c118a0a had already fixed.
- (efmp-407-u07-repair_en-r1, repair_en, claude) The Urdu side has only `index.mdx`; the translate job must carry the "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
- (efmp-407-u07-repair_en, repair_en, claude) G3 needs a fresh independent review of commits b02ba6e6e and a9c118a0a; the r1 report is now stale.
- (efmp-407-u07-repair_en, repair_en, claude) The Urdu side has only index.mdx, so the translate job should copy the corrected "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
- (efmp-407-u07-illustrate, illustrate, agy) Placed banner fig-U7-5.webp in English and draft Urdu index files, updated unit-07.banner.md to placed, and refreshed G2 gate evidence.


## Response snapshot

Merged origin/main into crew/efmp-407-u07-repair_en-r1, resolved the G3 tracker conflict in specs/content/efmp-407/tasks.md by keeping both entries in order, and verified all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-407 Unit 7 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u07-repair_en-r1, resolved the G3 tracker conflict in specs/content/efmp-407/tasks.md by keeping both entries in order, and verified all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 7 G3 needs a fresh independent review: report f45bf9fe repeats the r1 findings that b02ba6e6e and a9c118a0a had already fixed.
  - The Urdu side has only index.mdx; the translate job must carry the "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
