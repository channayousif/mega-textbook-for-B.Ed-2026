---
id: crew-efmp-407-u01-review_en-conflict1
title: crew fix EFMP-407 unit 1
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u01-review_en
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u01-review_en.misc.prompt.md
 - history/prompts/general/20261144-review-efmp407-unit-one-english.general.prompt.md
 - history/prompts/general/20261145-resolve-efmp407-review-merge.general.prompt.md
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex.json
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/commands.json
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-content-after-tracker.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-content-final.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-content.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-figures.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/input-verification.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/retrieval-limitations.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/static-accessibility.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/logs/validate-content.txt
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/manifest.json
 - specs/content/efmp-407/reviews/unit-01/G3/20261107-codex/summary.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u01-review_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u01-review_en conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-01/`.

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
- (efmp-407-u01-review_en, review_en, codex) Fresh review needs complete source binding, run provenance, independent assessment solving and browser/print evidence.
- (efmp-407-u01-review_en, review_en, codex) Author must repair Orr attribution disclosure and RRQ-09 source qualifications.
- (efmp-407-u01-review_en, review_en, codex) Fresh review needs complete source binding, run provenance, independent assessment solving and browser/print evidence.
- (efmp-407-u01-author, author, claude) Figure text geometry is unmeasured (`measure-figure-text.mjs` needs a browser, forbidden by the brief), so check CI's `figure-geometry` result on the six SVGs and fix any overlap before translating labels.
- (efmp-407-u01-author, author, claude) Topic 1.2 teaches that the Brundtland Report came from a commission and tells learners how to handle the guide's "conferences" wording (D-2026-0076, G-2026-169); keep this in the Urdu mirror, and G3 should check the one Orr sentence, which rests on secondary sources.


## Response snapshot

Resolved the EFMP-407 tracker conflict while preserving main’s work and the advisory Unit 1 review with G3 open.

## Outcome

- Impact: fix for EFMP-407 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the EFMP-407 tracker conflict while preserving main’s work and the advisory Unit 1 review with G3 open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
