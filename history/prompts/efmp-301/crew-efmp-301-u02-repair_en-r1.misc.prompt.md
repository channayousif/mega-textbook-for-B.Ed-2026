---
id: crew-efmp-301-u02-repair_en-r1
title: crew repair_en EFMP-301 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261114-repair-efmp301-unit-two-sources-binding.general.prompt.md
 - specs/content/efmp-301/coverage/unit-02.md
 - specs/content/efmp-301/reviews/unit-02/G2/20261103T041919512Z-gates.json
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/validate-content.txt
 - specs/content/efmp-301/sources/unit-02.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u02-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-02/`.

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
- (efmp-301-u02-repair_en, repair_en, claude) A fresh G3 run on current HEAD is needed. The visual and print check at 360px is still open, and Unit 2 has already used both of its ADR-0019 review cycles, so the owner has to authorise another one.
- (efmp-301-u02-repair_en, repair_en, claude) Any further edit to sources/unit-02.md makes the G2 evidence stale again. Rerun `scripts/heavy.sh npm run gates:evidence -- EFMP-301 2` on a clean tree and update the tracker's G2 row.
- (efmp-301-u02-review_en, review_en, agy) Finding 2 remains unresolved because specs/content/efmp-301/sources/unit-02.md table omits seifert-hk while line 6 claims both guide books are bound (the excerpt already exists at sources/texts/seifert-hk.md).
- (efmp-301-u02-review_en, review_en, agy) Dynamic 360px viewport and print inspection could not be performed due to brief restrictions forbidding build and server runs; full visual G3 certification remains pending browser inspection.
- (efmp-301-u02-fix, fix, opencode) G3 en-review is stale and needs a fresh run after the figure-geometry repair. The fig-U2-3 viewBox height changed from 470 to 520; no `<Figure>` carrier height attributes needed updating for EFMP-301's topic-02.mdx.


## Response snapshot

Added seifert-hk to the EFMP-301 Unit 2 sources table and to coverage rows U2-1, U2-4 and U2-6, regenerated the G2 evidence, and added an advisory "revise; repairs applied" G3 tracker row with G3 left unticked.

## Outcome

- Impact: repair_en for EFMP-301 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added seifert-hk to the EFMP-301 Unit 2 sources table and to coverage rows U2-1, U2-4 and U2-6, regenerated the G2 evidence, and added an advisory "revise; repairs applied" G3 tracker row with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Checking the unit at a 360px-wide screen and in A4 print is still not done. It needs a browser, and the brief bans one.
  - Unit 2 has used both of its ADR-0019 review cycles, so a fresh G3 review needs the owner's authorisation.
  - `seifert-hk` is listed only as a supporting source and is not cited in the unit text; any later edit to `sources/unit-02.md` makes the G2 evidence out of date again.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
