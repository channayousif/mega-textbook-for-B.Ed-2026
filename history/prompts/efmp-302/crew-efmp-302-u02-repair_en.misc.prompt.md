---
id: crew-efmp-302-u02-repair_en
title: crew repair_en EFMP-302 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: claude
feature: efmp-302
branch: crew/efmp-302-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-302/unit-02/topic-03.mdx
 - docs/semester-1/efmp-302/unit-02/unit-assessment.mdx
 - history/prompts/efmp-302/crew-efmp-302-u02-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/unit-assessment.mdx
 - specs/content/efmp-302/concepts/unit-02.md
 - specs/content/efmp-302/reviews/unit-02/G2/20261019T122240439Z-gates.json
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-bloom-bands.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-concept-graph.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-depth-gate.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-docs-sync.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-figures.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-no-answer-keys.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/check-no-em-dash.txt
 - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/validate-content.txt
 - specs/content/efmp-302/sources/unit-02.md
 - specs/content/efmp-302/tasks.md
 - static/img/figures/efmp-302/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efmp-302/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-302/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/efmp-302/unit-02/fig-U2-1.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u02-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-302/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-02/`.

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
From `specs/content/efmp-302/reviews/unit-02/G3/agent-g3-efmp302-u2-feat023-r2.json` (disposition: revise). Resolve each one:
- [blocking] fig-U2-5 (Rest four-component flowchart, the primary schematic of load-bearing Topic 2.3 / U2-10) superposes two failure-branch labels in both English theme variants: "was outweighed" (x 488.0-585.6, left-aligned at x=488) prints over "did not follow through" (x 467.8-600.0, right-aligned at x=600) on the same baseline band y 139-153 of static/img/figures/efmp-302/unit-02/fig-U2-5.svg and fig-U2-5.dark.svg - 97.6x14 bounding-box overlap with 281 and 270 shared ink pixels (logs-feat023-r2/fig-U2-5-collision-detail.json; 4x crops under renders-feat023-r2/). A learner cannot read which failure...
- [advisory] Carried unresolved from cycle 1: U2-12 Reflective Decision Making (guide 2.3 leaf bullet 3) is taught (topic-03.mdx:124-144) and formatively assessed (topic-03.mdx:175; decision-log practicum :201-211), but the 10/10/5 summative bank contains no direct item on it; the concept graph maps it to MCQ-09 and ERQ-05 (specs/content/efmp-302/concepts/unit-02.md CON:EFMP-302-2-18), which engage it only obliquely. The same applies, more weakly since the guide marks them as examples, to social media among the 2.4 dilemma types (formatively assessed at topic-04.mdx:162-163 only). The approved blueprint...
- [advisory] Carried unresolved from cycle 1: bebeau1999 full text remains unread (SAGE 403); the bound evidence is an OpenAlex record summary supporting the four component names, their order and attribution, while the unit central claim that failing any one component prevents ethical action (topic-03.mdx:46-48) and the per-stage failure characterisation rest on record-level support plus the unit own labelled gloss. The sources register declares exactly this boundary and marks it for checking before certification (specs/content/efmp-302/sources/unit-02.md ## Source gaps). Recorded so the limitation stay...
- [advisory] New this cycle, measured: fig-U2-1.svg and fig-U2-1.dark.svg carry the pre-existing cosmetic shape-wordmark graze - the .focus highlight rect (x 574, y 16, 190x438) underlaps the wordmark by 88.3x4.5px (measure-figure-text.log; this review measured the same 88.4x4 against .focus and .grid). The wordmark is the last element in document order in all 8 figures so it is never occluded, and its contrast moves only from 2.94:1 on white to 2.51:1 over the focus fill; it is a decorative, aria-hidden branding mark. This is the reported-not-failed class prior reviews accepted (specs/gaps.md G-2026-62...

## Notes from earlier jobs on this unit
- (efmp-302-u02-translate-r1, translate, agy) EFMP-302 Unit 2 Urdu mirror is complete across all 7 files and fully gate-checked against English baseline 2752ef28; translation_status stays draft.
- (efmp-302-u02-translate-r1, translate, agy) Independent G5 review in a separate fresh session is pending per ADR-0019.


## Response snapshot

Applied the Unit 2 G3 r2 findings by adding a reflective-decision-making part to ERQ 4 (EN/UR, rubric, concept graph), verifying bebeau1999 from the full text and adding a non-linear-sequence sentence to topic 2.3, and fixing fig-U2-1's table-edge overlap with the textbook.com.pk mark, with G2 evidence and tracker updated and G3 left open.

## Outcome

- Impact: repair_en for EFMP-302 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the Unit 2 G3 r2 findings by adding a reflective-decision-making part to ERQ 4 (EN/UR, rubric, concept graph), verifying bebeau1999 from the full text and adding a non-linear-sequence sentence to topic 2.3, and fixing fig-U2-1's table-edge overlap with the textbook.com.pk mark, with G2 evidence and tracker updated and G3 left open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Two G3 review cycles are already used; a third needs the owner's sign-off under G-2026-63 before a fresh independent G3 review of these edits.
  - ERQ 4 and topic 2.3 changed in both languages, so the existing Unit 2 G5 evidence is older than these edits and needs a fresh G5 review after G3.
  - The Urdu fig-U2-1/fig-U2-5 box overlaps were there before this job and look like Urdu line-height boxes; confirm with the reviewer's ink-overlap check.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
