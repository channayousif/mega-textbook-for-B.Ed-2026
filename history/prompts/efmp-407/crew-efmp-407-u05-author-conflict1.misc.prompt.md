---
id: crew-efmp-407-u05-author-conflict1
title: crew fix EFMP-407 unit 5
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u05-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-05/index.mdx
 - docs/semester-3/efmp-407/unit-05/topic-01.mdx
 - docs/semester-3/efmp-407/unit-05/topic-02.mdx
 - docs/semester-3/efmp-407/unit-05/topic-03.mdx
 - docs/semester-3/efmp-407/unit-05/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-05/unit-teacher-notes.mdx
 - history/prompts/efmp-407/20261145-author-efmp407-unit05-english.general.prompt.md
 - history/prompts/efmp-407/20261146-resolve-efmp407-unit05-conflicts.general.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u05-author.green.prompt.md
 - specs/content/efmp-407/authoring/unit-05.md
 - specs/content/efmp-407/concepts/unit-05.md
 - specs/content/efmp-407/coverage/unit-05.md
 - specs/content/efmp-407/figures/unit-05.banner.md
 - specs/content/efmp-407/figures/unit-05.md
 - specs/content/efmp-407/reviews/unit-05/G2/20261107T075510461Z-gates.json
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T075510461Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/iucn-pakistan-2004-tek.md
 - specs/content/efmp-407/sources/texts/kahlown-1994-karez.md
 - specs/content/efmp-407/sources/texts/owuor-2008-indigenous.md
 - specs/content/efmp-407/sources/texts/pakistan-constitution-1973.md
 - specs/content/efmp-407/sources/texts/un-crc-1989.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/sources/texts/unesco-2020-gemr.md
 - specs/content/efmp-407/sources/texts/zidny-2020-indigenous.md
 - specs/content/efmp-407/sources/unit-05.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-1.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-2.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-3.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-3.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-5.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-6.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u05-author conflicts with main (specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md, specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-05/`.

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
- (efmp-407-u05-author, author, agy) Banner illustration fig-U5-7 is planned in specs/content/efmp-407/figures/unit-05.banner.md as prompt-only; requires an illustrate job.
- (efmp-407-u05-author, author, agy) Stages G3 (English review), G4 (Urdu translation), and G5 (Urdu review) remain open for downstream reviewer and translation sessions.


## Response snapshot

Merged origin/main into crew/efmp-407-u05-author, resolved the UNESCO source-note and tracker conflicts by keeping both sides' entries, renumbered the colliding Unit 5 PHR (20261144 -> 20261145), and left all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-407 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u05-author, resolved the UNESCO source-note and tracker conflicts by keeping both sides' entries, renumbered the colliding Unit 5 PHR (20261144 -> 20261145), and left all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Banner fig-U5-7 is still prompt-only in specs/content/efmp-407/figures/unit-05.banner.md and needs an illustrate job; G3/G4/G5 remain open.
  - The shared UNESCO 2017 source note now serves both Unit 2 and Unit 5; future merges must preserve both units' passages.
  - tasks.md's "Unit 2 backward-design alignment" table still contains Unit 1 rows from main (pre-existing copy-paste, preserved verbatim per the brief, not fixed here).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
