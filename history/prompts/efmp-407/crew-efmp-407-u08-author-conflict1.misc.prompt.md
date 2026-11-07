---
id: crew-efmp-407-u08-author-conflict1
title: crew fix EFMP-407 unit 8
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u08-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-08/index.mdx
 - docs/semester-3/efmp-407/unit-08/topic-01.mdx
 - docs/semester-3/efmp-407/unit-08/topic-02.mdx
 - docs/semester-3/efmp-407/unit-08/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-08/unit-teacher-notes.mdx
 - history/prompts/efmp-407/crew-efmp-407-u08-author.green.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u08-author-conflict1.misc.prompt.md
 - specs/content/efmp-407/authoring/unit-08.md
 - specs/content/efmp-407/concepts/unit-08.md
 - specs/content/efmp-407/coverage/unit-08.md
 - specs/content/efmp-407/figures/unit-08.banner.md
 - specs/content/efmp-407/figures/unit-08.md
 - specs/content/efmp-407/reviews/unit-07/G2/20261107T100546088Z-gates.json
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T100546088Z/validate-content.txt
 - specs/content/efmp-407/reviews/unit-08/G2/20261107T082658818Z-gates.json
 - specs/content/efmp-407/reviews/unit-08/G2/20261107T100505650Z-gates.json
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/validate-content.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T100505650Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md
 - specs/content/efmp-407/sources/texts/sindh-rte-act-2013.md
 - specs/content/efmp-407/sources/texts/wals-2024-whole-school.md
 - specs/content/efmp-407/sources/unit-08.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-08/fig-U8-1.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-1.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-2.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-2.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-3.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-3.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-4.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-4.svg
tests:
 - npm run check:content
 - git diff --check
---

## Prompt

# Crew job efmp-407-u08-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u08-author conflicts with main (specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md, specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
- (efmp-407-u08-author, author, agy) Banner figure fig-U8-5 is prompt-only in specs/content/efmp-407/figures/unit-08.banner.md awaiting illustration pass.
- (efmp-407-u08-author, author, agy) All ten Urdu concept labels in specs/content/efmp-407/concepts/unit-08.md are authored and require G5 review.
- (efmp-407-u08-author, author, agy) Figure text geometry on four placed SVGs is unmeasured locally (Chromium forbidden by brief); CI figure-geometry measures them.

## Response snapshot

Merged origin/main into crew/efmp-407-u08-author, combining the shared jumani-abbasi-2015 bound source note (main's Unit 7 passage first, this branch's Unit 8 excerpt second) and preserving every tracker row, then refreshed the Unit 8 and Unit 7 G2 evidence that the shared source change invalidated and regenerated the ignored content-status report.

## Outcome

- Impact: fix for EFMP-407 Unit 8 by opencode (attempt 1).
- Tests: npm run check:content passed 14/14 in the job worktree; origin/main baseline passed 13/14 with only its stale ignored content-status report failing; git diff --check passed.
- Files: 52 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: Shared bound source changes invalidate every unit that cites the key, so a successful textual merge still needs fresh G2 evidence for each affected unit.

## Handoff (for CEO and agents)

- Shipped / changed: Merge committed; main's Unit 7 bound source passage retained verbatim and this branch's Unit 8 excerpt appended in the same file; all main and branch tracker rows preserved; Unit 8 G2 evidence refreshed and its row repointed; Unit 7 G2 evidence refreshed and its row repointed because the shared source file is bound to both units; ignored static/content-status.json regenerated.
- Decisions the team must respect: Main entries retained; no registry changes, no G3/G5 certification, no human initials, no push or PR.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). Unit 8 G3 review, Urdu translation, banner fig-U8-5 illustration and browser figure geometry remain separate jobs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: Initial merged run found stale Unit 7 and Unit 8 G2 manifests and a stale ignored content-status report.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14); git diff --check PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
