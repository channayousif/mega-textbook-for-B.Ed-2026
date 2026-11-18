---
id: crew-gicp-400-u05-review_en-conflict1
title: crew fix GICP-400 unit 5
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u05-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261136-review-gicp400-unit-five.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u05-review_en-conflict1.misc.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u05-review_en.misc.prompt.md
 - specs/content/gicp-400/reviews/unit-05/G3/01a1b1eb-32bb-7f02-87be-49f565e1880b.json
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/assessment-check.md
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-content-direct.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-content.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-figures.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/commands.json
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/manifest.json
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/review-notes.md
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/source-check.md
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/static-inspection.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/validate-content.txt
 - specs/content/gicp-400/reviews/unit-05/G3/crew-review-20261106/verify-manifest.txt
 - specs/content/gicp-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u05-review_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gicp-400-u05-review_en conflicts with main (specs/content/gicp-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GICP-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-05/`.

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
- (gicp-400-u05-review_en, review_en, codex) Author should correct Figure 5.6’s resource-condition alt text.
- (gicp-400-u05-review_en, review_en, codex) G3 remains escalated pending source/provenance checks, rendered review and a fresh blind assessment solve.
- (gicp-400-u05-review_en, review_en, codex) Author should correct Figure 5.6’s resource-condition alt text.
- (gicp-400-u05-author, author, claude) GPKS-402 Unit 4 (`topic-01`, `topic-02`, `unit-assessment`) still mentions Article 184(3), and the `glossary.json` entry "Judiciary" omits the Federal Constitutional Court; both are out of this job's scope, so check them against the Twenty-seventh Amendment, and make the same check on GICP-400 Unit 6.
- (gicp-400-u05-author, author, claude) The G3 reviewer should check the legal paraphrases of Articles 175E, 175F, 199 and 233, and the owner should decide whether to update the content-spec's figure plan and `pak-constitution-1973` reading-list note.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Merged origin/main into `crew/gicp-400-u05-review_en`, resolving the sole conflict in `specs/content/gicp-400/tasks.md` by keeping main's Unit 2 rows then this branch's Unit 5 G3 advisory row, with no ID or shared-registry collisions, and left all 14 content gates passing.

## Outcome

- Impact: fix for GICP-400 Unit 5 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into `crew/gicp-400-u05-review_en`, resolving the sole conflict in `specs/content/gicp-400/tasks.md` by keeping main's Unit 2 rows then this branch's Unit 5 G3 advisory row, with no ID or shared-registry collisions, and left all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/content-status.json` is gitignored and must be regenerated before `check:content` in a fresh worktree.
  - G3 stays `▢` advisory; Figure 5.6 alt-text repair, source/provenance checks, rendered review and a fresh blind assessment solve remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
