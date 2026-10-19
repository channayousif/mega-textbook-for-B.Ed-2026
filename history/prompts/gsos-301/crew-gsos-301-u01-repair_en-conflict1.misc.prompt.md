---
id: crew-gsos-301-u01-repair_en-conflict1
title: crew fix GSOS-301 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u01-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-01/topic-01.mdx
 - docs/semester-2/gsos-301/unit-01/topic-02.mdx
 - docs/semester-2/gsos-301/unit-01/topic-03.mdx
 - history/prompts/general/0534-gsos-301-u01-merge-main.general.prompt.md
 - history/prompts/gsos-301/0002-complete-unit-one-g3-repairs.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u01-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-03.mdx
 - specs/content/gsos-301/reviews/unit-01/G2/20261019T154654433Z-gates.json
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/validate-content.txt
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u01-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/gsos-301-u01-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

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
- (gsos-301-u01-repair_en, repair_en, codex) G3 remains unticked; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending.
- (gsos-301-u01-repair_en, repair_en, codex) G3 remains unticked; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending.
- (gsos-301-u01-translate-r1, translate, agy) When English G3 citation revisions land (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.), sync the citation keys in Urdu topic prose and Further reading.
- (gsos-301-u01-translate-r1, translate, agy) Proposed sociology terms (عمرانیات، مثبتیت، فعلیت، وغیرہ) are documented in reviews/unit-01/G4/translation-handoff.md for CurriculumOwner banking in terminology.csv.
- (gsos-301-u01-translate, translate, opencode) ** Six `.ur.svg` figure variants are still missing (generate-figures scope); they are not required while `translation_status: draft` but will be needed before `reviewed`. The 10 `key_terms` entries use sociology terms not present in `terminology.csv`; they pass the gate now (bank check is dormant at `draft`) but must be owner-approved before `reviewed`. The G3 advisory report flagged figure text-geometry overflows on all 6 SVGs and two citation mismatches in the English source  -  translate f...

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Merged origin/main onto crew/gsos-301-u01-repair_en (no conflicts) and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for GSOS-301 Unit 1 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 43 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main onto crew/gsos-301-u01-repair_en (no conflicts) and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 review remains unticked on GSOS-301 Unit 1; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending. Six `.ur.svg` figure variants still missing (generate-figures scope). Citation sync to Urdu topics pending English G3 citation revisions (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
