---
id: crew-geng-300-u02-repair_en
title: crew repair_en GENG-300 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-02/topic-02.mdx
 - docs/semester-1/geng-300/unit-02/topic-03.mdx
 - docs/semester-1/geng-300/unit-02/unit-assessment.mdx
 - docs/semester-1/geng-300/unit-02/unit-teacher-notes.mdx
 - history/prompts/geng-300/crew-geng-300-u02-repair_en.misc.prompt.md
 - specs/content/geng-300/reviews/unit-02/G2/20261019T140746718Z-gates.json
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-02/fig-U2-5.dark.svg
 - static/img/figures/geng-300/unit-02/fig-U2-5.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u02-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json` (disposition: revise). Resolve each one:
- [blocking] Approved blueprint requirement missing: specs/content/geng-300/content-spec.md:107-108 requires the summative assessment to include one Analyze-or-higher item comparing two texts for audience and purpose. In docs/semester-1/geng-300/unit-02/unit-assessment.mdx, no item in the 10 MCQs, 10 RRQs, or 5 ERQs performs this comparison (ERQ 2 presents a single passage on girls education and asks for the four moves of text analysis on that single text). Repair request: rework ERQ 2 (or restructure within the 5-ERQ blueprint) to provide two contrasting passages on the same topic and require learners ...
- [blocking] RRQ 3 mark scheme arithmetic discrepancy: in docs/semester-1/geng-300/unit-02/unit-assessment.mdx:178-179, RRQ 3 stem header specifies (4 marks), but the mark scheme allocates: Names all four strategies: skimming, scanning, SQ4R, critical reading (1 each up to 4). One mark per correct use case (up to 4). This allocates 8 payable marks against a 4-mark total, so a marker cannot apply the scheme consistently. Repair request: adjust the mark scheme allocation to 1 mark per strategy correctly named with its use case (4 marks total), or raise the question total to 8 marks.
- [blocking] Leaf subtopic U2-05 omitted from prose: specs/content/geng-300/content-spec.md:117 specifies subtopic U2-05 as Reading strategies: making predictions, summarising, questioning. In docs/semester-1/geng-300/unit-02/topic-02.mdx, making predictions is completely omitted from the text (zero occurrences in prose or checks); summarising and questioning are only referenced in passing as steps in SQ4R without explicit instruction on predictive reading strategies. Repair request: add explicit instruction and practice on making predictions before and during reading under ### Reading strategies in top...
- [advisory] In-text figure references and teacher notes contain cross-reference discrepancies: in topic-02.mdx:78-81, prose refers to The figure above maps common note-taking formats... but the preceding figure is fig-U2-5 (reading strategies table), while note-taking table fig-U2-6 is placed in topic-03.mdx. In topic-03.mdx:56-57, prose refers to The figure above maps the listening process... immediately following fig-U2-6, while the listening process diagram is fig-U2-3 at line 24. Furthermore, unit-teacher-notes.mdx:71-72 incorrectly describes fig-U2-6 as a concept map and fig-U2-3 as a flowchart. R...
- [advisory] MCQ answer key distribution skew: across the 10 MCQs in unit-assessment.mdx:155-167, correct options are 1 a, 5 b, 4 c, and 0 d. Option d is never the correct key. Repair request: redistribute correct keys across options a-d at next bank revision.
- [advisory] Cosmetic wordmark bounding overlap in fig-U2-5: measure-figure-text.mjs reports shape .panel [14,368,750,456] overlaps with the wordmark box at y=463.3 by 74.3 x 6.5px in fig-U2-5.svg and fig-U2-5.dark.svg. All text remains within the 780x470 viewBox. Repair request: adjust bottom panel margin away from wordmark.


## Response snapshot

Repaired GENG-300 Unit 2 by adding predictive reading instruction, reworking ERQ 2 into a two-text comparative analysis item, fixing RRQ 3 mark arithmetic, rebalancing MCQ keys, correcting figure cross-references and SVG panel margins, and refreshing G2 evidence with an advisory tracker row.

## Outcome

- Impact: repair_en for GENG-300 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GENG-300 Unit 2 by adding predictive reading instruction, reworking ERQ 2 into a two-text comparative analysis item, fixing RRQ 3 mark arithmetic, rebalancing MCQ keys, correcting figure cross-references and SVG panel margins, and refreshing G2 evidence with an advisory tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Repaired ERQ 2 comparative item covers subtopics U2-01 and U2-02 at Analyze level with contrasting rural girls' education passages; fresh G3 review can verify blueprint alignment.
  - GENG-300 is an English-only course (bilingual: false); no Urdu translation or G5 review rows are required.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
