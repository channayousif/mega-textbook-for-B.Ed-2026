---
id: crew-efmp-305-u02-repair_en-conflict2
title: crew fix EFMP-305 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u02-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-02/topic-01.mdx
 - docs/semester-2/efmp-305/unit-02/topic-02.mdx
 - history/prompts/efmp-305/523-unit-two-merge-content-gates.misc.prompt.md
 - history/prompts/efmp-305/crew-efmp-305-u02-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-305/crew-efmp-305-u02-repair_en.misc.prompt.md
 - history/prompts/general/0534-efmp-305-u02-merge-main-pass-gates.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-02.mdx
 - specs/content/efmp-305/reviews/unit-02/G2/20261019T134925266Z-gates.json
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/validate-content.txt
 - specs/content/efmp-305/sources/unit-02.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u02-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/efmp-305-u02-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

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
- (efmp-305-u02-repair_en, repair_en, claude) Urdu topic 2.2 Further reading has the corrected Florian citation and DOI link, but the Urdu description line was left as it was; G5 should check it.
- (efmp-305-u02-repair_en, repair_en, claude) `static/content-status.json` is git-ignored and goes stale after any edit; run `npm run build:content-status` before `check:content`.
- (efmp-305-u02-translate-r1, translate, agy) All 4 .ur.svg figure variants are wired in topics 1 and 2 with exact carrier alt matching SVG desc tags.
- (efmp-305-u02-translate-r1, translate, agy) All 5 key_terms in index.mdx are bound to terminology.csv; translation_status stays draft pending independent G5.
- (efmp-305-u02-translate-r1, translate, agy) Proposed terms for owner: learner diversity (متعلمین کا تنوع), impairment (خرابی), handicap (ہینڈی کیپ / ماحولیاتی رکاوٹ), labelling (لیبلنگ / منفی ٹھپا لگانا), stigma (داغ / عیب).


## Response snapshot

Merged origin/main into crew/efmp-305-u02-repair_en (no conflicts), rebuilt content-status.json, and verified all 13 content gates pass.

## Outcome

- Impact: fix for EFMP-305 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-305-u02-repair_en (no conflicts), rebuilt content-status.json, and verified all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu topic 2.2 Further reading still needs G5 to verify the Florian citation description line was updated correctly alongside the DOI link.
  - translation_status stays draft pending independent G5 review; proposed UR terms (learner diversity, impairment, handicap, labelling, stigma) queued for owner.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
