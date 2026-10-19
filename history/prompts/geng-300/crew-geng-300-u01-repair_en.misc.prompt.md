---
id: crew-geng-300-u01-repair_en
title: crew repair_en GENG-300 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: geng-300
branch: crew/geng-300-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-01/topic-02.mdx
 - docs/semester-1/geng-300/unit-01/unit-assessment.mdx
 - history/prompts/geng-300/0174-repair-unit-one-g3-findings.misc.prompt.md
 - specs/content/geng-300/figures/unit-01.md
 - specs/content/geng-300/reviews/unit-01/G2/20261019T135001511Z-gates.json
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-01/fig-U1-1.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-1.svg
 - static/img/figures/geng-300/unit-01/fig-U1-2.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-2.svg
 - static/img/figures/geng-300/unit-01/fig-U1-3.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-3.svg
 - static/img/figures/geng-300/unit-01/fig-U1-6.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u01-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
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
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run7c5e7ce2.json` (disposition: revise). Resolve each one:
- [blocking] SVG text viewBox overflow in fig-U1-1 and fig-U1-3 (4 files total: light and dark variants). Site wordmark textbook.com.pk extends to x=814.3, overflowing the 780px viewBox right edge by 34.3px to 34.6px. Root cause: CSS rule text { text-anchor: middle } overrides presentation attribute text-anchor="end" on <text class="wm" x="768" ...>. Repair: add text-anchor: end to .wm CSS class rule or remove text-anchor: middle from the global text selector in static/img/figures/geng-300/unit-01/fig-U1-1.svg, fig-U1-1.dark.svg, fig-U1-3.svg, and fig-U1-3.dark.svg.
- [blocking] RRQ 3 mark scheme arithmetic discrepancy in docs/semester-1/geng-300/unit-01/unit-assessment.mdx:182-184. The stem asks to Name the four word-formation processes and give one example of each with header (4 marks). The mark scheme allocates 4 marks for naming processes (Names all four processes: affixation, compounding, clipping, back formation (1 each)) PLUS up to 4 marks for examples (One mark per example that correctly illustrates the process (up to 4)), totaling 8 payable marks. Repair: align the stem mark total and scheme breakdown (e.g., allocate 0.5 mark per process name and 0.5 mark ...
- [blocking] RRQ 4 grammatical classification error in stem and mark scheme in docs/semester-1/geng-300/unit-01/unit-assessment.mdx:107-109 and 185-188. The sentence After the meeting ended, the teachers went to the staffroom and discussed the new timetable consists of one dependent clause (After the meeting ended) and one independent clause with a compound predicate (the teachers went to the staffroom and discussed the new timetable). It is a complex sentence, not compound-complex. The mark scheme erroneously credits classifying it as compound-complex and asserts discussed the new timetable is an indep...
- [advisory] Figures manifest preamble status discrepancy in specs/content/geng-300/figures/unit-01.md:6-7. The narrative preamble asserts Every figure is Status: prompt-only - the rendering pass is a separate skill (Spec 009), whereas all rows in the table below have status placed. Repair: update the preamble text to reflect that all 6 figures have been generated and placed.
- [advisory] Check your understanding item 3 in docs/semester-1/geng-300/unit-01/topic-02.mdx:101-102 repeats the compound predicate structure: After the rain stopped, the children went outside and played in the mud. Like RRQ 4, played in the mud is a coordinate predicate sharing the subject the children, making this sentence complex rather than compound-complex. Repair: add a subject to the second coordinate verb (e.g., and they played in the mud) if intended as an example of a compound-complex sentence.
- [advisory] Cosmetic wordmark collisions in fig-U1-2 and fig-U1-6 (both light and dark variants). In fig-U1-2, panel-d rect [585,70,765,450] overlaps the wordmark bounding box by 89.3 x 0.5px. In fig-U1-6, panel rect [470,398,760,454] overlaps the wordmark bounding box by 84.3 x 4.5px. These do not cause SVG viewBox overflow and are reported as non-failing cosmetic overlaps by measure-figure-text.mjs, but adjusting panel margins or wordmark vertical position would improve layout polish.


## Response snapshot

Repaired Unit 1 assessment scoring, clause examples, SVG wordmarks and manifest wording, then recorded repairs and refreshed G2 evidence.

## Outcome

- Impact: repair_en for GENG-300 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 1 assessment scoring, clause examples, SVG wordmarks and manifest wording, then recorded repairs and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open and unsigned; fresh independent review is pending.
  - G3 remains open and unsigned; fresh independent review is pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
