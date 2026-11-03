---
id: crew-geng-300-u04-repair_en
title: crew repair_en GENG-300 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-04/topic-01.mdx
 - docs/semester-1/geng-300/unit-04/topic-02.mdx
 - docs/semester-1/geng-300/unit-04/topic-03.mdx
 - history/prompts/geng-300/crew-geng-300-u04-repair_en.misc.prompt.md
 - specs/content/geng-300/reviews/unit-04/G2/20261103T080843667Z-gates.json
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-04/G2/logs-20261103T080843667Z/validate-content.txt
 - specs/content/geng-300/reviews/unit-04/repair-en-20261103.md
 - specs/content/geng-300/sources/unit-04.md
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-04/fig-U4-1.dark.svg
 - static/img/figures/geng-300/unit-04/fig-U4-1.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u04-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/geng-300/reviews/unit-04/G3/20261102T212207Z-g3-desk-f85a6c35.json` (disposition: revise). Resolve each one:
- [blocking] render-review cannot be performed: job constraints prohibit running npm run build or starting a dev server, so visual inspection of rendered pages and print views is impossible. This is a required check for a passing G3 report per the review-evidence contract.
- [advisory] static/img/figures/geng-300/unit-04/fig-U4-1.svg: text-geometry problem detected by measure-figure-text.mjs. The text closing for the occasion extends to x=696.9, overprinting the wordmark which starts at x=675.7. Additionally, the .panel shape [460,378,780,458] collides with the wordmark by 92.7 x 8.5px.
- [advisory] All four primary sources (hutchinson1987, downes2010, hall1976, brownLevinson1987) are declared unretrievable print monographs per D-2026-0001. Declarations are honest and complete, but claims cannot be independently verified.

## Notes from earlier jobs on this unit
- (geng-300-u04-fix, fix, opencode) G3 en-review row is marked stale  -  needs a fresh independent G3 review run after this geometry fix. The figure geometry check (measure-figure-text.mjs) exits 0 for all unit-04 SVGs; the earlier "panel collides with wordmark" note is cosmetic only.


## Response snapshot

Repaired GENG-300 Unit 4 by expanding fig-U4-1 SVG canvas to separate wordmark and table panel, disclosing unverified source limitations in topics 4.1-4.3 and sources ledger, updating G2 gate evidence, and appending the advisory repair tracker row for G3 report 20261102T212207Z-g3-desk-f85a6c35.json while leaving G3 open.

## Outcome

- Impact: repair_en for GENG-300 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GENG-300 Unit 4 by expanding fig-U4-1 SVG canvas to separate wordmark and table panel, disclosing unverified source limitations in topics 4.1-4.3 and sources ledger, updating G2 gate evidence, and appending the advisory repair tracker row for G3 report 20261102T212207Z-g3-desk-f85a6c35.json while leaving G3 open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The next independent G3 review must be run in a browser-capable environment to execute render-review and measure-figure-text.mjs.
  - Primary sources (hutchinson1987, downes2010, hall1976, brownLevinson1987) remain declared unverified under D-2026-0001 until print monographs are retrieved.
  - G3 remains open (unticked) with an advisory repairs tracker row citing report 20261102T212207Z-g3-desk-f85a6c35.json.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
