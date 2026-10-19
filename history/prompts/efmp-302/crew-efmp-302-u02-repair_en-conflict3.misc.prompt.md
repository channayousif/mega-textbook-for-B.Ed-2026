---
id: crew-efmp-302-u02-repair_en-conflict3
title: crew fix EFMP-302 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: efmp-302
branch: crew/efmp-302-u02-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-302/unit-02/topic-03.mdx
 - docs/semester-1/efmp-302/unit-02/unit-assessment.mdx
 - history/prompts/efmp-302/crew-efmp-302-u02-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u02-repair_en-conflict2.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u02-repair_en.misc.prompt.md
 - history/prompts/general/0531-efmp302-u02-repair-conflict3-merge.general.prompt.md
 - history/prompts/general/20261019-efmp302-u02-repair-merge.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/unit-assessment.mdx
 - specs/content/efmp-302/concepts/unit-02.md
 - specs/content/efmp-302/reviews/unit-02/G2/20261019T122240439Z-gates.json
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-bloom-bands.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-concept-graph.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-depth-gate.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-docs-sync.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-figures.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-no-answer-keys.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-no-em-dash.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/validate-content.txt
 - specs/content/efmp-302/sources/unit-02.md
 - specs/content/efmp-302/tasks.md
 - static/img/figures/efmp-302/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efmp-302/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-302/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/efmp-302/unit-02/fig-U2-1.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u02-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/efmp-302-u02-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-302 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-302-u02-repair_en-conflict2, fix, opencode) Two G3 review cycles used; a third needs owner sign-off under G-2026-63 before fresh G3 review.
- (efmp-302-u02-repair_en-conflict2, fix, opencode) G5 review remains pending per ADR-0019; Urdu fig-U2-1/fig-U2-5 box overlaps need reviewer ink-overlap check.
- (efmp-302-u02-repair_en-conflict1, fix, opencode) Two G3 review cycles already used on this unit; a third needs owner sign-off under G-2026-63. G5 review remains pending per ADR-0019. Urdu fig-U2-1/fig-U2-5 box overlaps need a reviewer's ink-overlap check.
- (efmp-302-u02-repair_en, repair_en, claude) Two G3 review cycles are already used; a third needs the owner's sign-off under G-2026-63 before a fresh independent G3 review of these edits.
- (efmp-302-u02-repair_en, repair_en, claude) ERQ 4 and topic 2.3 changed in both languages, so the existing Unit 2 G5 evidence is older than these edits and needs a fresh G5 review after G3.


## Response snapshot

Merged origin/main into crew/efmp-302-u02-repair_en (clean merge), regenerated static/content-status.json, verified shared registries append-only with no duplicate IDs, and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for EFMP-302 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-302-u02-repair_en (clean merge), regenerated static/content-status.json, verified shared registries append-only with no duplicate IDs, and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Per prior notes, a third G3 review cycle needs owner sign-off under G-2026-63 before a fresh independent G3 review of this unit; G5 review remains pending per ADR-0019; Urdu fig-U2-1/fig-U2-5 box overlaps need a reviewer's ink-overlap check.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
