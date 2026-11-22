---
id: crew-gcce-400-u06-author-conflict1
title: crew fix GCCE-400 unit 6
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u06-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-06/index.mdx
 - docs/semester-4/gcce-400/unit-06/topic-01.mdx
 - docs/semester-4/gcce-400/unit-06/topic-02.mdx
 - docs/semester-4/gcce-400/unit-06/topic-03.mdx
 - docs/semester-4/gcce-400/unit-06/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-06/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gcce-400/crew-gcce-400-u06-author-conflict1.green.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u06-author.green.prompt.md
 - specs/content/gcce-400/concepts/unit-06.md
 - specs/content/gcce-400/coverage/unit-06.md
 - specs/content/gcce-400/figures/unit-06.banner.md
 - specs/content/gcce-400/figures/unit-06.md
 - specs/content/gcce-400/reviews/unit-06/G2/20261122T122147614Z-gates.json
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/ali-2023-misinformation.md
 - specs/content/gcce-400/sources/texts/coe-2019-dce.md
 - specs/content/gcce-400/sources/texts/iftikhar-2023-digital-divide.md
 - specs/content/gcce-400/sources/texts/khalid-2026-social-media-civic.md
 - specs/content/gcce-400/sources/unit-06.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-06/fig-U6-1.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-1.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-2.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-2.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-3.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-3.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-4.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-4.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-5.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-5.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-6.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u06-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gcce-400-u06-author conflicts with main (glossary.json, specs/content/gcce-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GCCE-400 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-06/`.

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
- (gcce-400-u06-author, author, claude_crew) Branch base is 4823107ca; origin/main advanced to 430e60570 (Unit 2 merged) while this job ran, so merge main before opening the PR (a plain `git diff origin/main..HEAD` shows Unit 2 as deleted).
- (gcce-400-u06-author, author, claude_crew) G3 en-review stays open; the reviewer should confirm the CoE handbook attribution (read via an Internet Archive snapshot because rm.coe.int returns HTTP 403 here), the Shair et al. (2022) figures and the Pakistani examples in `specs/content/gcce-400/sources/unit-06.md`.
- (gcce-400-u06-author, author, claude_crew) Banner `fig-U6-7` is prompt-only for the illustrate job and no `.ur.svg` exists yet (Urdu mirror is a separate job); the seven new glossary entries' Urdu definitions are authored and need G5 checking.


## Response snapshot

Merged origin/main into crew/gcce-400-u06-author and resolved the glossary.json and GCCE-400 tasks.md conflicts by keeping both sides (main's Unit 2 entries first, then this branch's Unit 6 entries), with all 14 content gates passing.

## Outcome

- Impact: fix for GCCE-400 Unit 6 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 40 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gcce-400-u06-author and resolved the glossary.json and GCCE-400 tasks.md conflicts by keeping both sides (main's Unit 2 entries first, then this branch's Unit 6 entries), with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 G3 en-review stays open; the reviewer should confirm the CoE handbook attribution (rm.coe.int returns HTTP 403 here, use the Internet Archive snapshot), the Shair et al. (2022) figures and the Pakistani examples in `specs/content/gcce-400/sources/unit-06.md`.
  - Banner `fig-U6-7` is prompt-only and no `.ur.svg` exists yet (Urdu mirror is a separate job); the seven new glossary entries' Urdu definitions are authored and need G5 checking.
  - In the tasks.md conflict the branch's combined Unit 1 + Unit 6 reading-estimate paragraph was consolidated into a Unit 6-only paragraph so main's Unit 1 and general sentences stay verbatim; check that wording if the tracker is regenerated.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
