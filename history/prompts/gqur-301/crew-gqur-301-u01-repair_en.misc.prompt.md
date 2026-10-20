---
id: crew-gqur-301-u01-repair_en
title: crew repair_en GQUR-301 unit 1
stage: misc
date: 2026-10-20
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-01/topic-02.mdx
 - docs/semester-2/gqur-301/unit-01/unit-assessment.mdx
 - history/prompts/gqur-301/0539-gqur-301-u01-g3-repairs.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-01/G2/20261019T235035407Z-gates.json
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/validate-content.txt
 - specs/content/gqur-301/sources/unit-01.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-1.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-2.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-3.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-4.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-5.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-5.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-6.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-7.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-7.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-8.dark.svg
 - static/img/figures/gqur-301/unit-01/fig-U1-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u01-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-01/`.

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
From `specs/content/gqur-301/reviews/unit-01/G3/459abd64-a834-454a-bb77-eaf0f571110a.json` (disposition: revise). Resolve each one:
- [blocking] X1 ACCESSIBILITY / figure geometry overflow: scripts/measure-figure-text.mjs reports 24 text-geometry errors across static/img/figures/gqur-301/unit-01/*.svg and *.dark.svg. (1) In fig-U1-1.svg and fig-U1-1.dark.svg, text "e.g. time (12.4 min)" at x=733 with text-anchor: middle overflows the 780px viewBox right edge by 12.9px; the bounding rect (x=690 width=85) is also too narrow. Repair: adjust position leftward (e.g. x=725) or widen/re-position the container. (2) In fig-U1-2 through fig-U1-8 (both .svg and .dark.svg), the watermark "<text x="760" y="460" class="wm" aria-hidden="true">text...
- [blocking] M1 ASSESSMENT / mathematical counting error in RRQ 5 model answer: In docs/semester-2/gqur-301/unit-01/unit-assessment.mdx:242-249, RRQ 5 gives raw teacher ages (28, 35, 42, 31, 38, 45, 29, 33, 40, 36, 44, 32). Grouping by width 10 starting at 20-29 yields 20-29: 2 (28, 29); 30-39: 6 (31, 32, 33, 35, 36, 38); 40-49: 4 (40, 42, 44, 45). However, the author's answer key table incorrectly gives frequencies 3, 5, 4. Repair: update RRQ 5 model answer table to frequency 2 for interval 20-29, and frequency 6 for interval 30-39.
- [blocking] S1 SOURCES / missing mapped citations in topic-02.mdx: In specs/content/gqur-301/coverage/unit-01.md:7-9, U1-03 maps to lane2023 and U1-04 maps to ncc-maths. However, docs/semester-2/gqur-301/unit-01/topic-02.mdx mentions neither lane2023 nor ncc-maths anywhere in prose or in its "## Further reading" section. Repair: add Lane (2023) and National Curriculum Council (ncc-maths) citations into topic-02.mdx prose and "## Further reading".
- [advisory] M2 ASSESSMENT / unequal interval width in MCQ 10 Option B: In docs/semester-2/gqur-301/unit-01/unit-assessment.mdx:118-121, MCQ 10 option B specifies intervals "8-10, 11-13, 14-16, 17-20". The first three intervals have width 3 while the final interval has width 4. In a unit teaching frequency distributions, intervals should maintain equal class width (e.g. 17-19) unless explicitly discussed. Recommend revising Option B to "8-10, 11-13, 14-16, 17-19".
- [advisory] S2 SOURCES / unverifiable sources declaration format: In specs/content/gqur-301/sources/unit-01.md:20-32, "## Unverifiable sources" discusses portal-level nature of pbs and ncc-maths, but does not explicitly cite D-2026-0001 or state formal retrieval dates and attempt logs per Constitution Art. VII standards. Recommend aligning the declaration with D-2026-0001 convention.
- [advisory] X2 ACCESSIBILITY / live browser inspection: Automated live browser inspection (360x780 narrow viewport swipe testing and A4 print stylesheet DOM verification) was not executed in compliance with the crew brief constraint ("never run npm run build or a dev server"). Structural accessibility, heading hierarchies, alt text, and SVG text geometry were verified statically.

## Notes from earlier jobs on this unit
- (gqur-301-u01-review_en-conflict1, fix, codex) Prior review findings remain for the unit repair job: SVG overflows, RRQ 5 counts, and topic-02 citations.
- (gqur-301-u01-review_en-conflict1, fix, codex) Prior review findings remain for the unit repair job: SVG overflows, RRQ 5 counts, and topic-02 citations.
- (gqur-301-u01-review_en, review_en, agy) Fix 24 SVG text geometry overflows across all 8 figures in static/img/figures/gqur-301/unit-01/ (add text-anchor: end; to .wm class for wordmark; adjust x/width on fig-U1-1 continuous example).
- (gqur-301-u01-review_en, review_en, agy) Fix RRQ 5 model answer table in docs/semester-2/gqur-301/unit-01/unit-assessment.mdx to frequencies 2, 6, 4 (author key incorrectly states 3, 5, 4 for the 12 teacher ages).
- (gqur-301-u01-review_en, review_en, agy) Add lane2023 and ncc-maths citations to docs/semester-2/gqur-301/unit-01/topic-02.mdx prose and Further reading as mapped in coverage/unit-01.md.


## Response snapshot

Applied G3 report 459abd64's findings to GQUR-301 Unit 1 (re-laid out fig-U1-1, right-aligned the wordmark in 14 SVGs, fixed RRQ 5 to 2/6/4 and MCQ 10 option B to 17-19, added Lane and NCC citations to topic-02, dated the D-2026-0001 source declarations), refreshed G2 evidence, and added an unticked G3 tracker row and PHR 0539.

## Outcome

- Impact: repair_en for GQUR-301 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied G3 report 459abd64's findings to GQUR-301 Unit 1 (re-laid out fig-U1-1, right-aligned the wordmark in 14 SVGs, fixed RRQ 5 to 2/6/4 and MCQ 10 option B to 17-19, added Lane and NCC citations to topic-02, dated the D-2026-0001 source declarations), refreshed G2 evidence, and added an unticked G3 tracker row and PHR 0539.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 16 unit-01 SVGs have not been re-measured in Chromium. Run `node scripts/measure-figure-text.mjs static/img/figures/gqur-301/unit-01/*.svg` where a browser is allowed, and check the new fig-U1-1 layout.
  - X2 (narrow-viewport and A4 print check) is still open, the NCC progression grid PDF has not been found or read, and the unit has no Urdu version yet (G4 pending).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
