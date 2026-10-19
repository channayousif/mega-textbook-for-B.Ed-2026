---
id: crew-efmp-304-u01-repair_en-conflict5
title: crew fix EFMP-304 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: efmp-304
branch: crew/efmp-304-u01-repair_en
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-01/topic-02.mdx
 - docs/semester-2/efmp-304/unit-01/topic-03.mdx
 - docs/semester-2/efmp-304/unit-01/unit-assessment.mdx
 - history/prompts/efmp-304/0529-crew-efmp-304-u01-repair-en-conflict2-verify.misc.prompt.md
 - history/prompts/efmp-304/20261019-merge-main-conflict5.misc.prompt.md
 - history/prompts/efmp-304/20261019-repair-unit-one-g3-findings.green.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u01-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u01-repair_en-conflict2.misc.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u01-repair_en-conflict3.misc.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u01-repair_en-conflict4.misc.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u01-repair_en.misc.prompt.md
 - history/prompts/general/0531-merge-main-conflict3-clean.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/unit-assessment.mdx
 - specs/content/efmp-304/concepts/unit-01.md
 - specs/content/efmp-304/figures/unit-01.md
 - specs/content/efmp-304/reviews/unit-01/G2/20261019T121920528Z-gates.json
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/validate-content.txt
 - specs/content/efmp-304/reviews/unit-01/G3/repair-handoff-20261019.md
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-1.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-10.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-10.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-4.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-repair_en-conflict5

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/efmp-304-u01-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

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
- (efmp-304-u01-repair_en-conflict4, fix, opencode) Independent G3/G5 review for EFMP-304 Unit 1 still pending  -  inspect Figure 3 cosmetic footer intersection per earlier job notes.
- (efmp-304-u01-repair_en-conflict4, fix, opencode) Translation remains draft; narrow-width/A4 rendered inspection pending.
- (efmp-304-u01-repair_en-conflict3, fix, opencode) Independent G3/G5 review for EFMP-304 Unit 1 still pending  -  inspect Figure 3 cosmetic footer intersection per earlier job notes.
- (efmp-304-u01-repair_en-conflict3, fix, opencode) Translation remains draft; narrow-width/A4 rendered inspection pending.
- (efmp-304-u01-repair_en-conflict2, fix, opencode) EFMP-304 Unit 1 fresh independent G3/G5 review still pending; inspect Figure 3 cosmetic footer intersection per earlier job notes.


## Response snapshot

Merged latest main, restored the generated status prerequisite, verified clean content gates, and committed the work record.

## Outcome

- Impact: fix for EFMP-304 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 40 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged latest main, restored the generated status prerequisite, verified clean content gates, and committed the work record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.
  - Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
