---
id: crew-efmp-408-u02-author-conflict2
title: crew fix EFMP-408 unit 2 conflict 2
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u02-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-408/crew-efmp-408-u02-author-conflict2.misc.prompt.md
 - docs/semester-4/efmp-408/unit-02/index.mdx
 - docs/semester-4/efmp-408/unit-02/topic-01.mdx
 - docs/semester-4/efmp-408/unit-02/topic-02.mdx
 - docs/semester-4/efmp-408/unit-02/topic-03.mdx
 - docs/semester-4/efmp-408/unit-02/unit-assessment.mdx
 - docs/semester-4/efmp-408/unit-02/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/efmp-408/crew-efmp-408-u02-author-conflict1.misc.prompt.md
 - history/prompts/efmp-408/crew-efmp-408-u02-author-merge.misc.prompt.md
 - history/prompts/efmp-408/crew-efmp-408-u02-author.green.prompt.md
 - specs/content/efmp-408/concepts/unit-02.md
 - specs/content/efmp-408/coverage/unit-02.md
 - specs/content/efmp-408/figures/unit-02.banner.md
 - specs/content/efmp-408/figures/unit-02.md
 - specs/content/efmp-408/reviews/unit-02/G2/20261124T181004352Z-gates.json
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261124T181004352Z/validate-content.txt
 - specs/content/efmp-408/sources/unit-02.md
 - specs/content/efmp-408/tasks.md
 - static/img/figures/efmp-408/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-2.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-3.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-4.dark.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-4.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-5.dark.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-5.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-6.dark.svg
 - static/img/figures/efmp-408/unit-02/fig-U2-6.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-408/unit-01/*.svg
---

## Prompt

# Crew job efmp-408-u02-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-408-u02-author conflicts with main (specs/content/efmp-408/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-02/`.

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
- (efmp-408-u02-author-conflict1, fix, claude_crew) The brief's predicted `specs/content/efmp-408/tasks.md` conflict was stale; main never touched EFMP-408, so the merge was clean and both sides' tracker rows survive.
- (efmp-408-u02-author-conflict1, fix, claude_crew) Unit 2 G4 Urdu translation and independent G3/G5 review remain open; banner figure fig-U2-7 stays prompt-only for the illustrate job.
- (efmp-408-u02-author, author, claude_crew) Six figures are placed with measured-clean light and dark variants; banner fig-U2-7 stays prompt-only for the illustrate job.
- (efmp-408-u02-author, author, claude_crew) Unit 2 evidence notes live in sources/unit-02.md, not the shared sources/texts excerpts, so Unit 1's G2 evidence stays valid.
- (efmp-408-u02-author, author, claude_crew) Urdu concept labels in concepts/unit-02.md are authored (Validity, Reliability, Bloom's Taxonomy are banked); G4/G5 is the next job.

## Response snapshot

Merged origin/main into `crew/efmp-408-u02-author`, resolved the one conflict in `specs/content/efmp-408/tasks.md` as a union (main's newer Unit 1 row with the Urdu translation state, this branch's newer Unit 2 authored row and Unit 2 stage rows), confirmed the append-only registries were untouched by main, measured the merged Unit 1 SVGs clean, and recorded all 14 content gates passing with zero findings.

## Outcome

- ✅ Impact: fix for EFMP-408 Unit 2 by claude_crew (attempt 2, conflict resolution).
- 🧪 Tests: `npm run check:content` passed (14/14 gates) in the job worktree; `measure-figure-text` exited 0 on the merged Unit 1 SVGs.
- 📁 Files: 38 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge (Unit 2 G4 Urdu translation).
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main into `crew/efmp-408-u02-author` with the `specs/content/efmp-408/tasks.md` conflict resolved as a union; Unit 2 tracker rows and reading estimates preserved, main's Unit 1 Urdu state preserved.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job certifies nothing and self-signed nothing. The shared registries were append-only and main added no entries to them, so no ID rekeying was needed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The conflict was real this time (main added Unit 1 Urdu translation plus its tracker rows); the merged table keeps main's Unit 1 row and this branch's Unit 2 row.
  - Unit 2 G4 Urdu translation and independent G3/G5 review remain open; banner figure fig-U2-7 stays prompt-only for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS (exit 0)
- Prompt variant (if applicable): crew brief v1 (conflict2 retry)
- Next experiment (smallest change to try): none
