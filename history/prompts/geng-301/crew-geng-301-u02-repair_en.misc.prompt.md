---
id: crew-geng-301-u02-repair_en
title: crew repair_en GENG-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: claude
feature: geng-301
branch: crew/geng-301-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-02/topic-01.mdx
 - docs/semester-2/geng-301/unit-02/topic-02.mdx
 - docs/semester-2/geng-301/unit-02/topic-03.mdx
 - docs/semester-2/geng-301/unit-02/topic-04.mdx
 - docs/semester-2/geng-301/unit-02/unit-assessment.mdx
 - history/prompts/geng-301/0538-geng-301-u02-g3-repairs.misc.prompt.md
 - specs/content/geng-301/reviews/unit-02/G2/20261019T231851684Z-gates.json
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/validate-content.txt
 - specs/content/geng-301/sources/unit-02.md
 - specs/content/geng-301/tasks.md
 - static/img/figures/geng-301/unit-02/fig-U2-1.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-1.svg
 - static/img/figures/geng-301/unit-02/fig-U2-2.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-2.svg
 - static/img/figures/geng-301/unit-02/fig-U2-3.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-3.svg
 - static/img/figures/geng-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-4.svg
 - static/img/figures/geng-301/unit-02/fig-U2-5.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-5.svg
 - static/img/figures/geng-301/unit-02/fig-U2-6.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-6.svg
 - static/img/figures/geng-301/unit-02/fig-U2-7.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-7.svg
 - static/img/figures/geng-301/unit-02/fig-U2-8.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
From `specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.json` (disposition: revise). Resolve each one:
- [blocking] SVG text geometry overflow in all 16 figure files under static/img/figures/geng-301/unit-02/. All 8 figures (light and dark variants) fail scripts/measure-figure-text.mjs with the wordmark textbook.com.pk extending 38.8px to 43.0px beyond the 780px viewBox right edge. In all 16 SVG files, reposition the wordmark inward (e.g. x <= 740) or ensure text-anchor="end" is respected by scoped CSS.
- [blocking] Subtopic U2-05 (Drafting: writing for a purpose and audience from the first draft onward) taught in topic-02.mdx:53-60 has no corresponding assessment item in unit-assessment.mdx across all 10 MCQs, 10 RRQs, and 5 ERQs. Furthermore, concepts/unit-02.md:10 erroneously maps concept CON:GENG-301-2-6 (Purpose and audience) to RRQ-08, which actually tests disorganized paragraphs from omitting outlining/planning (Topic 2.1 pre-writing). Add or adjust an assessment item testing purpose and audience and align concepts/unit-02.md.
- [blocking] Mark scheme arithmetic contradiction in unit-assessment.mdx:189. RRQ 5 stem asks to list three things checked during proof reading with total marks stated as (2), but the mark scheme allocates: "1 for each correct category named (need all three for full marks, partial for two)". Awarding 1 mark each for three categories sums to 3 marks, contradicting the 2-mark total. Reconcile the marks arithmetic.
- [blocking] Bloom demand misclassification and malformed MCQ 10 option in unit-assessment.mdx. MCQ 7 is labelled Apply but is identical in demand to MCQ 4 (Understand), testing simple definition recognition of revision vs editing. RRQ 5 is labelled Apply but requires simple recall of 3 proof reading categories (Remember). In MCQ 10, the question asks "Which two stages of the process did they use?" for mind-mapping and outlining, offering option B "Pre-writing and pre-writing", which is semantically malformed since pre-writing is a single stage. Adjust Bloom tags and rephrase MCQ 10.
- [blocking] Incomplete unverifiable source declarations and reading list divergence. In sources/unit-02.md:12-21, the four print monographs (axelrod2016, williams2017, johnson2016, strunk2000) are listed under ## Unverifiable sources without retrieval attempts, retrieval dates, and owner authorization citation under D-2026-0001 (Constitution Art. VII). In content-spec.md:218, the approved open-access reading is openstax2021 (sections 8.5 and 8.7), but sources/unit-02.md and coverage/unit-02.md bind writing2015 instead. Neither openstax2021 nor writing2015 is cited in topic prose or Further reading. Rec...
- [advisory] Typographical errors and quotation attribution in topic prose: topic-01.mdx:60 misidentifies author as "Axelerod and Cooper (2016)"; topic-02.mdx:41 quotes "you cannot edit a blank page" as a verbatim quotation from Williams & Bizup (2017) when it is a widespread composition aphorism; topic-04.mdx:64 contains missing subject "because the gave a concrete example"; unit-assessment.mdx:191 is missing a period after "6 **Model:**".

## Notes from earlier jobs on this unit
- (geng-301-u02-review_en-conflict1, fix, opencode) GENG-301 Unit 2's 5 blocking G3 revise defects (SVG wordmark overflow, U2-05 summative omission, RRQ 5 mark scheme contradiction, incomplete source declarations) remain from the earlier `agy` review  -  this branch's content was not touched, only the merge and gate fix.
- (geng-301-u02-review_en, review_en, agy) GENG-301 Unit 2 G3 review recorded 5 blocking revise defects: wordmark text overflow in all 16 SVGs under static/img/figures/geng-301/unit-02/, subtopic U2-05 omitted from summative assessments, RRQ 5 mark scheme arithmetic contradiction, and incomplete unverifiable source declarations.
- (geng-301-u02-review_en, review_en, agy) Advisory tracker entry is recorded in specs/content/geng-301/tasks.md leaving G3 unticked and unsigned.


## Response snapshot

Applied all six Unit 2 G3 findings (wordmark CSS in 16 SVGs, new purpose-and-audience RRQ 8, RRQ 5 marks, Bloom tags, MCQ 10 wording, source declarations and open-access note, typos), refreshed the G2 evidence, and added an unticked G3 repair row and PHR 0538.

## Outcome

- Impact: repair_en for GENG-301 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all six Unit 2 G3 findings (wordmark CSS in 16 SVGs, new purpose-and-audience RRQ 8, RRQ 5 marks, Bloom tags, MCQ 10 wording, source declarations and open-access note, typos), refreshed the G2 evidence, and added an unticked G3 repair row and PHR 0538.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The wordmark fix was not re-measured with `scripts/measure-figure-text.mjs`, because that script runs Chromium and this job was barred from it; the next G3 reviewer should run it on `static/img/figures/geng-301/unit-02/`.
  - There is no Urdu mirror of Unit 2 yet, so these edits are English only. The content-spec still lists `openstax2021` as the open-access reading; changing that spec is an owner decision that affects all GENG-301 units.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
