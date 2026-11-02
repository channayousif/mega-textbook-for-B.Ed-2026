---
id: crew-efmp-406-u02-author-conflict3
title: crew fix EFMP-406 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u02-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-04/index.mdx
 - docs/semester-3/efmp-406/unit-04/topic-01.mdx
 - docs/semester-3/efmp-406/unit-04/topic-02.mdx
 - docs/semester-3/efmp-406/unit-04/unit-assessment.mdx
 - docs/semester-3/efmp-406/unit-04/unit-teacher-notes.mdx
 - history/prompts/efmp-406/crew-efmp-406-u02-author-conflict3.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u04-author-conflict1.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u04-author-conflict2.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u04-author.green.prompt.md
 - history/prompts/general/20261051-author-efmp-406-unit-four.general.prompt.md
 - specs/content/efmp-406/authoring/unit-04.md
 - specs/content/efmp-406/concepts/unit-04.md
 - specs/content/efmp-406/coverage/unit-04.md
 - specs/content/efmp-406/figures/unit-04.md
 - specs/content/efmp-406/glossary/unit-04.json
 - specs/content/efmp-406/sources/texts/alcolea-2020-mil.md
 - specs/content/efmp-406/sources/texts/cc-licenses.md
 - specs/content/efmp-406/sources/texts/furenes-2021-screen.md
 - specs/content/efmp-406/sources/texts/greenhow-2009-sns.md
 - specs/content/efmp-406/sources/unit-04.md
 - specs/content/efmp-406/tasks.md
 - static/img/figures/efmp-406/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-1.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-2.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-3.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-4.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-author-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u02-author conflicts with main (specs/content/efmp-406/sources/texts/alcolea-2020-mil.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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
- (efmp-406-u02-author-conflict2, fix, opencode) Course overview still says only Unit 1 is available; update that line once Units 2 and 3 merge.
- (efmp-406-u02-author-conflict2, fix, opencode) Unit 2 design files under `specs/content/efmp-406/design/` bind to every unit's manifest (their `unit-02-*` names miss the unit-scoping regex), so future Unit 2 additions there will re-invalidate other units' G2 evidence.
- (efmp-406-u02-author-conflict1, fix, opencode) Course overview still says only Unit 1 is available; update that line once Units 2 and 3 merge. Orphaned stale G2 evidence files (unit-01: 20261102T081459685Z, unit-02: 20261102T074938805Z) remain in the repo but are unreferenced.
- (efmp-406-u02-author, author, claude) The Unit 2 branch carries the course overview, `_category_.json` and `tasks.md` exactly as in PR #405; when merging, keep #405's overview and every unit's tracker rows.
- (efmp-406-u02-author, author, claude) The `crew/efmp-406-u03-author` branch has a different `course-overview.mdx` and `_category_.json`, so it will conflict with #405 and this branch.

## Response snapshot

Merged origin/main into `crew/efmp-406-u02-author`, resolved the add/add conflict in `specs/content/efmp-406/sources/texts/alcolea-2020-mil.md` by combining both units' bound records, and all 13 content gates pass.

## Outcome

- Impact: fix for EFMP-406 Unit 2 by opencode (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into `crew/efmp-406-u02-author`; resolved the `alcolea-2020-mil.md` add/add conflict by keeping main's U4 record and folding in this branch's U2 access note and scope, so the single source key now documents both U2-03 and U4-03; `tasks.md` auto-merged with every unit's tracker rows intact; regenerated the gitignored `static/content-status.json`.
- Decisions the team must respect: the shared source record keeps main's wording and adds the U2 note; G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Course overview still says only Unit 1 is available; update that line once Units 2 and 3 merge.
  - Unit 2 design files under `specs/content/efmp-406/design/` bind to every unit's manifest (their `unit-02-*` names miss the unit-scoping regex), so future Unit 2 additions there will re-invalidate other units' G2 evidence.
  - `tasks.md` Unit 1 and Unit 3 G2 evidence paths now point at this branch's refreshed files (`20261102T092118159Z`, `20261102T114853349Z`); main still carries the older paths. Both sets of evidence files exist, so a future merge should keep the newest.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
