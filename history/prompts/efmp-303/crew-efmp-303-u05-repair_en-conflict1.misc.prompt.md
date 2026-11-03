---
id: crew-efmp-303-u05-repair_en-conflict1
title: crew fix EFMP-303 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-05/topic-01.mdx
 - docs/semester-2/efmp-303/unit-05/topic-02.mdx
 - docs/semester-2/efmp-303/unit-05/unit-assessment.mdx
 - history/prompts/efmp-303/crew-efmp-303-u05-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-303/crew-efmp-303-u05-repair_en-r1.misc.prompt.md
 - history/prompts/efmp-303/crew-efmp-303-u05-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/unit-assessment.mdx
 - specs/content/efmp-303/concepts/unit-05.md
 - specs/content/efmp-303/coverage/unit-05.md
 - specs/content/efmp-303/reviews/unit-05/G2/20261103T071412577Z-gates.json
 - specs/content/efmp-303/reviews/unit-05/G2/20261103T084218376Z-gates.json
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T071412577Z/validate-content.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/validate-content.txt
 - specs/content/efmp-303/reviews/unit-05/G3/crew-repair-en-handoff.md
 - specs/content/efmp-303/sources/texts/gem-unitfive-2020.md
 - specs/content/efmp-303/sources/texts/nep-unitfive-2009.md
 - specs/content/efmp-303/sources/texts/wb-unitfive-2023.md
 - specs/content/efmp-303/sources/unit-05.md
 - specs/content/efmp-303/sources/unit-05/ncc.md
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-2.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-2.ur.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u05-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-303-u05-repair_en conflicts with main (specs/content/efmp-303/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-303 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-05/`.

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
- (efmp-303-u05-repair_en, repair_en, opencode) G3 row left unticked with the advisory repair suggestion; a fresh independent G3 run (then G5) owns acceptance.
- (efmp-303-u05-repair_en, repair_en, opencode) `specs/content/efmp-303/sources/texts/nep2009.md` and `gem-report2020.md` must stay deleted because other units cite those keys and their presence invalidates Units 1, 2, 4 and 6 G2 evidence.
- (efmp-303-u05-repair_en, repair_en, opencode) `static/content-status.json` is gitignored and must be regenerated locally (`npm run build:content-status`) after tracker edits.
- (efmp-303-u05-fix, fix, codex) Regenerated static/content-status.json remains uncommitted; it was already modified at task start.
- (efmp-303-u05-fix, fix, codex) G3 needs a fresh independent run.


## Response snapshot

Merged origin/main into crew/efmp-303-u05-repair_en, union-resolved the tasks.md tracker conflict (main's Unit 4 and Unit 3 rows, then this branch's Unit 5 row), regenerated the gitignored content-status report, and committed the merge plus its PHR with all 13 content gates passing.

## Outcome

- Impact: fix for EFMP-303 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 44 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-303-u05-repair_en, union-resolved the tasks.md tracker conflict (main's Unit 4 and Unit 3 rows, then this branch's Unit 5 row), regenerated the gitignored content-status report, and committed the merge plus its PHR with all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `specs/content/efmp-303/tasks.md` now carries main's Unit 4 and Unit 3 advisory rows followed by this branch's Unit 5 row; the merge also pulled main's Unit 3/Unit 4 repair changes into the branch.
  - `static/content-status.json` is gitignored and was regenerated with `npm run build:content-status`; regenerate it again after any tracker edit or `check:content-status` fails as stale.
  - Unit 5 G3 stays advisory/open; a fresh independent G3 run (then G5) owns acceptance.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
