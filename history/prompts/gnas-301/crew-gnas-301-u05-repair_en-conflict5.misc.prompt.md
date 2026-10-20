---
id: crew-gnas-301-u05-repair_en-conflict5
title: crew fix GNAS-301 unit 5
stage: misc
date: 2026-10-20
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-05/topic-04.mdx
 - docs/semester-1/gnas-301/unit-05/unit-assessment.mdx
 - history/prompts/019-author-gnas-301/0039-repair-unit-five-g3-findings.green.prompt.md
 - history/prompts/general/0536-gnas301-u05-merge-conflict2.general.prompt.md
 - history/prompts/gnas-301/0045-merge-origin-main-conflict4.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u05-repair_en-conflict1.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u05-repair_en-conflict2.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u05-repair_en-conflict3.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u05-repair_en-conflict4.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u05-repair_en-conflict5.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u05-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-05/unit-assessment.mdx
 - specs/content/gnas-301/concepts/unit-05.md
 - specs/content/gnas-301/coverage/unit-05.md
 - specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md
 - specs/content/gnas-301/reviews/unit-05/G2/20261019T145133819Z-gates.json
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/validate-content.txt
 - specs/content/gnas-301/sources/unit-05.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u05-repair_en-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u05-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u05-repair_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-05/`.

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
- (gnas-301-u05-repair_en-conflict4, fix, opencode) Unit 5 G3 review still owner-gated under G-2026-32  -  see specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md for glossary and source-binding follow-ups.
- (gnas-301-u05-repair_en-conflict3, fix, opencode) Unit 5 G3 remains owner-gated under G-2026-32  -  fresh review needs owner authorization. Repair notes at specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md hold the glossary and source-binding follow-ups.
- (gnas-301-u05-repair_en-conflict3, fix, opencode) Append-only registries (log, gaps, terminology, glossary) merged cleanly  -  this branch added no new entries to them.
- (gnas-301-u05-repair_en-conflict3, fix, opencode) Earlier conflict-resolution commits (conflict1/conflict2) left duplicate PHR rows in tasks.md; the file now has the correct merged set but the row order is not strictly unit-sorted at the tail  -  cosmetic only, no gate impact.
- (gnas-301-u05-repair_en-conflict2, fix, opencode) Unit 5 G3 remains owner-gated under G-2026-32; the repair notes at specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md and the G-2026-32 gate decision are the follow-ups for the next job on this unit.


## Response snapshot

Resolved merge conflict in specs/content/gnas-301/tasks.md (Unit 3 and Unit 5 G3 rows kept, main order), regenerated content-status.json, committed merge and PHR, all 13 content gates pass matching origin/main.

## Outcome

- Impact: fix for GNAS-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved merge conflict in specs/content/gnas-301/tasks.md (Unit 3 and Unit 5 G3 rows kept, main order), regenerated content-status.json, committed merge and PHR, all 13 content gates pass matching origin/main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 G3 review still owner-gated under G-2026-32; glossary and source-binding follow-ups remain in specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
