---
id: crew-efmp-407-u03-author-conflict3
title: crew fix EFMP-407 unit 3
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
 - docs/semester-3/efmp-407/unit-03/index.mdx
 - docs/semester-3/efmp-407/unit-03/topic-01.mdx
 - docs/semester-3/efmp-407/unit-03/topic-02.mdx
 - docs/semester-3/efmp-407/unit-03/topic-03.mdx
 - docs/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - history/prompts/efmp-407/crew-efmp-407-u03-author-conflict1.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-author-conflict2.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-author-conflict3.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-author.green.prompt.md
 - history/prompts/general/20261144-author-efmp-407-unit-three.general.prompt.md
 - specs/content/efmp-407/authoring/unit-03.md
 - specs/content/efmp-407/concepts/unit-03.md
 - specs/content/efmp-407/coverage/unit-03.md
 - specs/content/efmp-407/figures/unit-03.banner.md
 - specs/content/efmp-407/figures/unit-03.md
 - specs/content/efmp-407/sources/texts/akkari-maleq-2020-gce.md
 - specs/content/efmp-407/sources/texts/khoo-jorgensen-2021.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/sources/unit-03.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-author-conflict3

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
- (efmp-407-u03-author-conflict2, fix, opencode) Unit 3 `coming_soon: true` can now be cleared, but only after real G2 evidence exists (tracker row is `G2: ▣`, so clearing it now fails `check:pipeline-gate`); regenerate `static/content-status.json` afterwards.
- (efmp-407-u03-author-conflict2, fix, opencode) main's `## Unit 2 backward-design alignment` table still carries five stray Unit 1 tracker rows (merge artifact from `48c3d7c21`); harmless to gates but a cleanup owner may remove them.
- (efmp-407-u03-author-conflict2, fix, opencode) banner `fig-U3-7` remains `prompt-only`; Chromium figure geometry measurement is deferred to CI.
- (efmp-407-u03-author-conflict1, fix, opencode) `course-overview.mdx` is now on main, so Unit 3's `coming_soon: true` can be cleared by the next job (regenerate `static/content-status.json` after).
- (efmp-407-u03-author-conflict1, fix, opencode) banner `fig-U3-7` remains `prompt-only`; Chromium figure geometry measurement is deferred to CI.


## Response snapshot

Merged origin/main into crew/efmp-407-u03-author, resolved the tasks.md and unesco-2017-esd-objectives.md conflicts keeping both sides' content, regenerated static/content-status.json, and committed the merge and PHR with all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-407 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u03-author, resolved the tasks.md and unesco-2017-esd-objectives.md conflicts keeping both sides' content, regenerated static/content-status.json, and committed the merge and PHR with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 3 `coming_soon: true` can now be cleared, but only after real G2 evidence exists (tracker row is `G2: ▣`, so clearing it now fails `check:pipeline-gate`); regenerate `static/content-status.json` afterwards.
  - main's `## Unit 2 backward-design alignment` table still carries five stray Unit 1 tracker rows (merge artifact from `48c3d7c21`); harmless to gates but a cleanup owner may remove them.
  - banner `fig-U3-7` remains `prompt-only`; Chromium figure geometry measurement is deferred to CI.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
