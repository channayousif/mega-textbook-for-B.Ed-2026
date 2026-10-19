---
id: crew-geng-301-u02-repair_en-conflict1
title: crew fix GENG-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: geng-301
branch: crew/geng-301-u02-repair_en
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-02/topic-01.mdx
 - docs/semester-2/geng-301/unit-02/topic-02.mdx
 - docs/semester-2/geng-301/unit-02/topic-03.mdx
 - docs/semester-2/geng-301/unit-02/topic-04.mdx
 - docs/semester-2/geng-301/unit-02/unit-assessment.mdx
 - history/prompts/geng-301/0538-geng-301-u02-g3-repairs.misc.prompt.md
 - history/prompts/geng-301/crew-geng-301-u02-repair_en-conflict1.misc.prompt.md
 - history/prompts/geng-301/crew-geng-301-u02-repair_en.misc.prompt.md
 - specs/content/geng-301/reviews/unit-02/G2/20261019T231851684Z-gates.json
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/validate-content.txt
 - specs/content/geng-301/sources/unit-02.md
 - specs/content/geng-301/tasks.md
 - static/img/figures/geng-301/unit-02/fig-U2-1.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-1.svg
 - static/img/figures/geng-301/unit-02/fig-U2-2.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-2.svg
 - static/img/figures/geng-301/unit-02/fig-U2-3.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-3.svg
 - static/img/figures/geng-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-4.svg
 - static/img/figures/geng-301/unit-02/fig-U2-5.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-5.svg
 - static/img/figures/geng-301/unit-02/fig-U2-6.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-6.svg
 - static/img/figures/geng-301/unit-02/fig-U2-7.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-7.svg
 - static/img/figures/geng-301/unit-02/fig-U2-8.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-repair_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u02-repair_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
- (geng-301-u02-repair_en, repair_en, claude) The wordmark fix was not re-measured with `scripts/measure-figure-text.mjs`, because that script runs Chromium and this job was barred from it; the next G3 reviewer should run it on `static/img/figures/geng-301/unit-02/`.
- (geng-301-u02-repair_en, repair_en, claude) There is no Urdu mirror of Unit 2 yet, so these edits are English only. The content-spec still lists `openstax2021` as the open-access reading; changing that spec is an owner decision that affects all GENG-301 units.
- (geng-301-u02-review_en-conflict1, fix, opencode) GENG-301 Unit 2's 5 blocking G3 revise defects (SVG wordmark overflow, U2-05 summative omission, RRQ 5 mark scheme contradiction, incomplete source declarations) remain from the earlier `agy` review  -  this branch's content was not touched, only the merge and gate fix.
- (geng-301-u02-review_en, review_en, agy) GENG-301 Unit 2 G3 review recorded 5 blocking revise defects: wordmark text overflow in all 16 SVGs under static/img/figures/geng-301/unit-02/, subtopic U2-05 omitted from summative assessments, RRQ 5 mark scheme arithmetic contradiction, and incomplete unverifiable source declarations.
- (geng-301-u02-review_en, review_en, agy) Advisory tracker entry is recorded in specs/content/geng-301/tasks.md leaving G3 unticked and unsigned.


## Response snapshot

Verified main integration, preserved the existing Unit 2 repairs, passed all content gates, and committed the required work record.

## Outcome

- Impact: fix for GENG-301 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified main integration, preserved the existing Unit 2 repairs, passed all content gates, and committed the required work record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
