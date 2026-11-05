---
id: crew-gqur-300-u06-repair_en-conflict1
title: crew fix GQUR-300 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-300
branch: crew/gqur-300-u06-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gqur-300/unit-06/topic-01.mdx
 - docs/semester-1/gqur-300/unit-06/topic-02.mdx
 - docs/semester-1/gqur-300/unit-06/topic-03.mdx
 - docs/semester-1/gqur-300/unit-06/unit-assessment.mdx
 - docs/semester-1/gqur-300/unit-06/unit-teacher-notes.mdx
 - history/prompts/gqur-300/crew-gqur-300-u06-repair_en-conflict1.misc.prompt.md
 - history/prompts/gqur-300/crew-gqur-300-u06-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/unit-teacher-notes.mdx
 - specs/content/gqur-300/concepts/unit-06.md
 - specs/content/gqur-300/coverage/unit-06.md
 - specs/content/gqur-300/reviews/unit-06/G2/20261105T125412430Z-gates.json
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-bloom-bands.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-concept-graph.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-depth-gate.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-docs-sync.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-figures.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-no-answer-keys.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-no-em-dash.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/validate-content.txt
 - specs/content/gqur-300/sources/texts/mcclure2020.md
 - specs/content/gqur-300/sources/unit-06.md
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u06-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-300-u06-repair_en conflicts with main (specs/content/gqur-300/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-06/`.

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
- (gqur-300-u06-repair_en, repair_en, agy) G2 gate manifest was refreshed and committed under `specs/content/gqur-300/reviews/unit-06/G2/20261105T125412430Z-gates.json`; G3 remains unticked (`▢`) awaiting fresh independent review.
- (gqur-300-u06-repair_en, repair_en, agy) Point-of-use Steen (2001) disclosures (`cited at bibliographic level under D-2026-0001; claims uncorroborated by local full text`) and balanced MCQ options (3 a, 2 b, 3 c, 2 d) are mirrored identically across EN and Urdu.
- (gqur-300-u06-review_en-conflict1, fix, agy) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- (gqur-300-u06-review_en, review_en, codex) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- (gqur-300-u06-review_en, review_en, codex) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.

## Feedback from the previous attempt
npm run check:content has 3 finding(s) that main does not have:
✗ Pipeline gate failed with 2 finding(s):
- GQUR-300 Unit 2 (docs/semester-1/gqur-300/unit-02): G2 en-draft: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gqur-300-u06-repair_en-conflict1/specs/content/gqur-300/reviews/unit-02/G2/20261105T123854707Z-gates.json'
- GQUR-300 Unit 4 (docs/semester-1/gqur-300/unit-04): G2 en-draft: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gqur-300-u06-repair_en-conflict1/specs/content/gqur-300/reviews/unit-04/G2/20261105T122519489Z-gates.json'


## Response snapshot

Merged origin/main into crew/gqur-300-u06-repair_en, resolved the tasks.md tracker conflict keeping both sides, and regenerated content-status so all 14 content gates pass.

## Outcome

- Impact: fix for GQUR-300 Unit 6 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-300-u06-repair_en, resolved the tasks.md tracker conflict keeping both sides, and regenerated content-status so all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - static/content-status.json is gitignored and was regenerated locally (CI regenerates it before the gate, so no commit needed).
  - Unit 6 G3 remains unticked (`▢`) awaiting fresh independent review; the branch's unit-06 repairs and G2 evidence are unchanged by the merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
