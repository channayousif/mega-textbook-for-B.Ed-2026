---
id: crew-gqur-301-u15-repair_en-conflict1
title: crew fix GQUR-301 unit 15
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u15-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-15/topic-01.mdx
 - docs/semester-2/gqur-301/unit-15/topic-02.mdx
 - docs/semester-2/gqur-301/unit-15/topic-03.mdx
 - docs/semester-2/gqur-301/unit-15/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-15/unit-teacher-notes.mdx
 - history/prompts/gqur-301/crew-gqur-301-u15-repair_en-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u15-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/unit-teacher-notes.mdx
 - specs/content/gqur-301/reviews/unit-15/G2/20261105T153507950Z-gates.json
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261105T153507950Z/validate-content.txt
 - specs/content/gqur-301/sources/texts/u15-lane-2026.md
 - specs/content/gqur-301/sources/texts/u15-nist-2026.md
 - specs/content/gqur-301/sources/texts/u15-openstax-2026.md
 - specs/content/gqur-301/sources/unit-15.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u15-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u15-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

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
- (gqur-301-u15-repair_en, repair_en, opencode) F12 rendered accessibility and F14 G1 authority remain open for the evaluator; a fresh authorised render session must inspect all six figures in both themes.
- (gqur-301-u15-repair_en, repair_en, opencode) The Urdu mirror now matches the repaired English; the G5 reviewer should confirm the new statistical Urdu terminology.
- (gqur-301-u15-repair_en, repair_en, opencode) Next G3 should re-verify the ERQ 2 key (two-tailed p = 0.036, one-tailed p = 0.018) and the newly bound source notes.
- (gqur-301-u15-figures, figures, claude) Urdu labels in fig-U15-1 to fig-U15-6 were only checked by font measurement, not in a browser; run `scripts/measure-figure-text.mjs` and do a G5 read. The glossary has no Urdu statistics terms, so "نارمل منحنی" and "فیصلہ کن قدر" are unconfirmed.
- (gqur-301-u15-figures, figures, claude) The fig-U15-2 and fig-U15-3 fixes are figure-only. The G3 findings on the ERQ 2 and RRQ 10 keys, the 6 broken citation links and sources/unit-15.md are still open for the author repair.


## Response snapshot

Merged origin/main into crew/gqur-301-u15-repair_en, resolved the tasks.md conflict by keeping both sides' rows, regenerated content-status, and left all 14 content gates passing with the merge and PHR committed.

## Outcome

- Impact: fix for GQUR-301 Unit 15 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u15-repair_en, resolved the tasks.md conflict by keeping both sides' rows, regenerated content-status, and left all 14 content gates passing with the merge and PHR committed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/content-status.json` is a gitignored build artifact; regenerate it (`npm run build:content-status`) after any content-affecting merge or `check:content-status` fails.
  - The merge pulled in main's repairs for other courses (geng-301 unit 3, gqur-301 unit 8, gsos-301 unit 2); those are main's work, not this branch's.
  - Unit 15 G3 stays open/unticked; F12 rendered accessibility, F13 source bundle and F14 G1 authority remain for the review host, and the Urdu mirror needs a G5 read of the new statistical terminology.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
