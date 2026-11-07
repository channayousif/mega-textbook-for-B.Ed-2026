---
id: crew-efmp-407-u03-author-conflict2
title: crew fix EFMP-407 unit 3 conflict2
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u03-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
  - specs/content/efmp-407/tasks.md
  - history/prompts/efmp-407/crew-efmp-407-u03-author-conflict2.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u03-author conflicts with main (specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md, specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

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
- (efmp-407-u03-author-conflict1, fix, opencode) `course-overview.mdx` is now on main, so Unit 3's `coming_soon: true` can be cleared by the next job (regenerate `static/content-status.json` after).
- (efmp-407-u03-author-conflict1, fix, opencode) banner `fig-U3-7` remains `prompt-only`; Chromium figure geometry measurement is deferred to CI.
- (efmp-407-u03-author-conflict1, fix, opencode) the branch's author PHR is now `20261144` (was `20261143`, taken on main by Unit 1's PHR).
- (efmp-407-u03-author, author, agy) Staged with `coming_soon: true` and tracker `G2: ▣` matching repo precedent (`efmp-406` Unit 4) because `course-overview.mdx` is owned and created by concurrent sibling job `crew/efmp-407-u01-author`; once `course-overview.mdx` merges, `coming_soon: true` can be cleared to ungate full G2 evidence generation and subsequent G3 review. Chromium figure geometry measurement is deferred to CI.

## Response snapshot

Fetched origin and merged origin/main (8 commits, Unit 2 authoring) into `crew/efmp-407-u03-author`. Resolved the two conflicts: combined main's Unit 2 tracker rows and source note with this branch's Unit 3 rows and bound excerpt (main first, then branch), and merged the two `unesco-2017-esd-objectives.md` bound files into one excerpt file because both Unit 2 and Unit 3 cite that source key. Regenerated `static/content-status.json` and left all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-407 Unit 3 by opencode (attempt 2, conflict with advanced main).
- Tests: npm run check:content passed (14/14) after regenerating the ignored content-status report.
- Files: 3 file(s) listed above; the merge also imported main's Unit 2 docs, specs, figures and PHRs.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into `crew/efmp-407-u03-author`; resolved the `tasks.md` and `unesco-2017-esd-objectives.md` conflicts by keeping main's entries first and appending this branch's; regenerated `static/content-status.json`; all 14 content gates pass.
- Decisions the team must respect: the shared source key `unesco-2017-esd-objectives` is cited by both Unit 2 and Unit 3, so its two bound files were merged into one file rather than renamed; G3/G5 stay advisory and unsigned.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - `course-overview.mdx` is now on main, so Unit 3's `coming_soon: true` can be cleared by the next job; doing so requires real G2 evidence first or `check:pipeline-gate` will fail on the `G2: ▣` row. Regenerate `static/content-status.json` afterwards.
  - banner `fig-U3-7` remains `prompt-only`; Chromium figure geometry measurement is deferred to CI.
  - main's `tasks.md` `## Unit 2 backward-design alignment` table still carries five stray Unit 1 tracker rows (a merge artifact from `48c3d7c21`). They are harmless to the gates (the parser reads them as duplicate Unit 1 rows) but a cleanup owner may remove them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
