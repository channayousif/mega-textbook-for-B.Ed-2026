---
id: crew-gqur-301-u12-author-conflict1
title: crew fix GQUR-301 unit 12
stage: misc
date: 2026-10-21
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u12-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-12/index.mdx
 - docs/semester-2/gqur-301/unit-12/topic-01.mdx
 - docs/semester-2/gqur-301/unit-12/topic-02.mdx
 - docs/semester-2/gqur-301/unit-12/unit-assessment.mdx
 - glossary.json
 - history/prompts/gqur-301/027-merge-conflict-resolution.green.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u12-author.green.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u12-figures-g2.green.prompt.md
 - specs/content/gqur-301/concepts/unit-12.md
 - specs/content/gqur-301/coverage/unit-12.md
 - specs/content/gqur-301/figures/unit-12.md
 - specs/content/gqur-301/reviews/unit-12/G2/20261021T065608298Z-gates.json
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261021T065608298Z/validate-content.txt
 - specs/content/gqur-301/sources/unit-12.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-12/fig-U12-1.dark.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-1.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-2.dark.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-2.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-3.dark.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-3.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-4.dark.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u12-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u12-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u12-author conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-12/`.

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
- (gqur-301-u12-author, author, opencode) G3 independent review still pending (separate run); G4 Urdu mirror needs `.ur.svg` variants for all 4 figures.


## Response snapshot

Resolved the single merge conflict in glossary.json by keeping both sides' entries (main's 5 dispersion terms first, then this branch's 6 bivariate terms), committed the merge, and confirmed check:content introduces no new findings beyond origin/main.

## Outcome

- Impact: fix for GQUR-301 Unit 12 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the single merge conflict in glossary.json by keeping both sides' entries (main's 5 dispersion terms first, then this branch's 6 bivariate terms), committed the merge, and confirmed check:content introduces no new findings beyond origin/main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 independent review still pending for Unit 12 (separate run); G4 Urdu mirror needs `.ur.svg` variants for all 4 figures.
  - `check:content-status` stale on both main and this branch  -  pre-existing, owned by another job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
