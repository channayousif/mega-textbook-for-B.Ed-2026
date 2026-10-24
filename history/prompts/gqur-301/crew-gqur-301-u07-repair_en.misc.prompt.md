---
id: crew-gqur-301-u07-repair_en
title: crew repair_en GQUR-301 unit 7
stage: misc
date: 2026-10-24
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u07-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-07/topic-02.mdx
 - docs/semester-2/gqur-301/unit-07/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-07/unit-teacher-notes.mdx
 - history/prompts/crew/0553-gqur-301-u07-g3-repair.green.prompt.md
 - specs/content/gqur-301/reviews/unit-07/G2/20261024T160350863Z-gates.json
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T160350863Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u07-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u07-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-07/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 7 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-07/`.

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
From `specs/content/gqur-301/reviews/unit-07/G3/01a16053-0c98-79b0-b814-6bb6281aec8c.json` (disposition: escalate). Resolve each one:
- [blocking] F1: unit-assessment.mdx ERQ 2 and ERQ 4 full-credit rubrics require unasked proposal-change and code-cost work.
- [blocking] F2: topic-02 ID example, RRQ 10 and ERQ 4 conflate aggregate code capacity with capacity for fixed section membership; require explicit assumptions and conditional marking.
- [blocking] F3: Course-spec real-Pakistan-data task requirement absent from the hypothetical ERQ bank.
- [advisory] F4: RRQ 9 rounding of two 1.5-mark parts is ambiguous.
- [advisory] F5: ERQ 2 requires four repeated days, not necessarily four distinct repeated timetables.
- [uncertain] P1: Author run identity and parent-prepared immutable handoff absent; actual reviewer session ID recorded but exact model build unavailable.
- [uncertain] P2: Unit 7 G1 remains open; intake-3 binds the superseded six-unit scope.
- [uncertain] P3: Required current narrow-screen and A4 rendered inspection prohibited by crew brief; source checks cannot replace it.
- [uncertain] P4: Independent solutions were composed before key retrieval, but initial python file write failed; later persistence is documented and fresh strict answer-blind verification remains pending.

## Notes from earlier jobs on this unit
- (gqur-301-u07-review_en, review_en, codex) Repair assessment findings F1-F3 and resolve G1, provenance and rendered-review gaps before fresh review.
- (gqur-301-u07-review_en, review_en, codex) Repair assessment findings F1-F3 and resolve G1, provenance and rendered-review gaps before fresh review.
- (gqur-301-u07-author, author, claude) The Urdu mirror still needs `.ur.svg` versions of fig-U7-1 to fig-U7-4, and the 7 Urdu concept labels in `concepts/unit-07.md` (none are in `terminology.csv`, so I wrote them) need G5 review.
- (gqur-301-u07-author, author, claude) `course-overview.mdx` still lists Unit 7 as "(coming soon)"; editing it changes a file every unit's review record depends on. `npm run build` has not been run on this branch.
- (gqur-301-u07-author, author, claude) `openstax-algebra` (College Algebra 2e §9.5) is new for this unit and does not count towards the open-access minimum; Units 8+ may reuse it and its excerpt file `sources/texts/openstax-algebra.md`.


## Response snapshot

Repaired GQUR-301 Unit 7 G3 findings F1-F5 (per-section code capacity in topic-02/RRQ 10/ERQ 4, rubrics aligned to the questions, ERQ 4 turned into a collected real-school-data task, RRQ 9 rounding and ERQ 2 repeat wording clarified), refreshed G2 evidence and appended an advisory repair row with G3 left open.

## Outcome

- Impact: repair_en for GQUR-301 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GQUR-301 Unit 7 G3 findings F1-F5 (per-section code capacity in topic-02/RRQ 10/ERQ 4, rubrics aligned to the questions, ERQ 4 turned into a collected real-school-data task, RRQ 9 rounding and ERQ 2 repeat wording clarified), refreshed G2 evidence and appended an advisory repair row with G3 left open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - ERQ 4 is now a collected real-school-data task; a fresh G3 reviewer should judge whether this meets the course-spec real-Pakistan-data requirement.
  - P1-P4 (author-run provenance, open G1 under D-2026-0070, rendered/A4 inspection, answer-blind verification) were not repairable by the author and remain open.
  - There is no Urdu mirror yet; G4 must translate the repaired ERQ 2/4, RRQ 9/10 and topic-02 Worked example 2.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
