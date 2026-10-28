---
id: crew-geng-300-u01-repair_en-r1
title: crew repair_en GENG-300 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: geng-300
branch: crew/geng-300-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u01-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-01/`.

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
From `specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run7c5e7ce2.json` (disposition: revise). Resolve each one:
- [blocking] SVG text viewBox overflow in fig-U1-1 and fig-U1-3 (4 files total: light and dark variants). Site wordmark textbook.com.pk extends to x=814.3, overflowing the 780px viewBox right edge by 34.3px to 34.6px. Root cause: CSS rule text { text-anchor: middle } overrides presentation attribute text-anchor="end" on <text class="wm" x="768" ...>. Repair: add text-anchor: end to .wm CSS class rule or remove text-anchor: middle from the global text selector in static/img/figures/geng-300/unit-01/fig-U1-1.svg, fig-U1-1.dark.svg, fig-U1-3.svg, and fig-U1-3.dark.svg.
- [blocking] RRQ 3 mark scheme arithmetic discrepancy in docs/semester-1/geng-300/unit-01/unit-assessment.mdx:182-184. The stem asks to Name the four word-formation processes and give one example of each with header (4 marks). The mark scheme allocates 4 marks for naming processes (Names all four processes: affixation, compounding, clipping, back formation (1 each)) PLUS up to 4 marks for examples (One mark per example that correctly illustrates the process (up to 4)), totaling 8 payable marks. Repair: align the stem mark total and scheme breakdown (e.g., allocate 0.5 mark per process name and 0.5 mark ...
- [blocking] RRQ 4 grammatical classification error in stem and mark scheme in docs/semester-1/geng-300/unit-01/unit-assessment.mdx:107-109 and 185-188. The sentence After the meeting ended, the teachers went to the staffroom and discussed the new timetable consists of one dependent clause (After the meeting ended) and one independent clause with a compound predicate (the teachers went to the staffroom and discussed the new timetable). It is a complex sentence, not compound-complex. The mark scheme erroneously credits classifying it as compound-complex and asserts discussed the new timetable is an indep...
- [advisory] Figures manifest preamble status discrepancy in specs/content/geng-300/figures/unit-01.md:6-7. The narrative preamble asserts Every figure is Status: prompt-only - the rendering pass is a separate skill (Spec 009), whereas all rows in the table below have status placed. Repair: update the preamble text to reflect that all 6 figures have been generated and placed.
- [advisory] Check your understanding item 3 in docs/semester-1/geng-300/unit-01/topic-02.mdx:101-102 repeats the compound predicate structure: After the rain stopped, the children went outside and played in the mud. Like RRQ 4, played in the mud is a coordinate predicate sharing the subject the children, making this sentence complex rather than compound-complex. Repair: add a subject to the second coordinate verb (e.g., and they played in the mud) if intended as an example of a compound-complex sentence.
- [advisory] Cosmetic wordmark collisions in fig-U1-2 and fig-U1-6 (both light and dark variants). In fig-U1-2, panel-d rect [585,70,765,450] overlaps the wordmark bounding box by 89.3 x 0.5px. In fig-U1-6, panel rect [470,398,760,454] overlaps the wordmark bounding box by 84.3 x 4.5px. These do not cause SVG viewBox overflow and are reported as non-failing cosmetic overlaps by measure-figure-text.mjs, but adjusting panel margins or wordmark vertical position would improve layout polish.

## Notes from earlier jobs on this unit
- (geng-300-u01-review_en-r1-conflict1, fix, agy) G3 review for GENG-300 Unit 1 remains open and unsigned (cycle 2 advisory pass recorded under ADR-0019).
- (geng-300-u01-review_en-r1-conflict1, fix, agy) GENG-300 is English-only (bilingual: false) so G4 translation and G5 Urdu review are waived; next pipeline step is G6 asset review.
- (geng-300-u01-review_en-r1, review_en, agy) GENG-300 Unit 1 G3 review cycle 2 completed with disposition pass; all three prior blocking defects were confirmed resolved in commit 8a0b7828.
- (geng-300-u01-review_en-r1, review_en, agy) Advisory finding F1 notes minor 1.5px to 2.0px panel boundary clearance for 3 consonant labels in fig-U1-3, which remains inside the SVG canvas and does not affect readability.
- (geng-300-u01-review_en-r1, review_en, agy) Course is English-only (bilingual: false), so G4 Urdu translation and G5 Urdu review stages are waived; next pipeline step is G6 asset review.


## Response snapshot

Confirmed that all six run7c5e7ce2 G3 findings for GENG-300 Unit 1 were already fixed and added the "advisory: revise; repairs applied" tracker row, with G3 left open.

## Outcome

- Impact: repair_en for GENG-300 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Confirmed that all six run7c5e7ce2 G3 findings for GENG-300 Unit 1 were already fixed and added the "advisory: revise; repairs applied" tracker row, with G3 left open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - run7c5e7ce2 is older than run41b4c5ae, yet the job planner picked it as the latest report, probably because it sorts filenames alphabetically ("run4…" before "run7…"). It may choose a stale report again for other units.
  - All G3 findings for Unit 1 are resolved (8a0b7828, 3a482d34). The next step is a fresh G3 run on the current HEAD, not another repair.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
