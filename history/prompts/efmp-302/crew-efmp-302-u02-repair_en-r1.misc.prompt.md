---
id: crew-efmp-302-u02-repair_en-r1
title: crew repair_en EFMP-302 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-302
branch: crew/efmp-302-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-302/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u02-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
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
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-302/reviews/unit-02/G3/20261102T212207Z-g3-desk-d78cf623.json` (disposition: revise). Resolve each one:
- [blocking] fig-U2-5 (Rest four-component flowchart, the primary schematic of load-bearing Topic 2.3 / U2-10) superposes two failure-branch labels in both English theme variants: "was outweighed" (x 488.0-585.6, left-aligned at x=488) prints over "did not follow through" (x 467.8-600.0, right-aligned at x=600) on the same baseline band y 139-153 of static/img/figures/efmp-302/unit-02/fig-U2-5.svg and fig-U2-5.dark.svg - 97.6x14 bounding-box overlap with 281 and 270 shared ink pixels (logs-feat023-r2/fig-U2-5-collision-detail.json; 4x crops under renders-feat023-r2/). A learner cannot read which failure...
- [advisory] Carried unresolved from cycle 1: U2-12 Reflective Decision Making (guide 2.3 leaf bullet 3) is taught (topic-03.mdx:124-144) and formatively assessed (topic-03.mdx:175; decision-log practicum :201-211), but the 10/10/5 summative bank contains no direct item on it; the concept graph maps it to MCQ-09 and ERQ-05 (specs/content/efmp-302/concepts/unit-02.md CON:EFMP-302-2-18), which engage it only obliquely. The same applies, more weakly since the guide marks them as examples, to social media among the 2.4 dilemma types (formatively assessed at topic-04.mdx:162-163 only). The approved blueprint...
- [advisory] Carried unresolved from cycle 1: bebeau1999 full text remains unread (SAGE 403); the bound evidence is an OpenAlex record summary supporting the four component names, their order and attribution, while the unit central claim that failing any one component prevents ethical action (topic-03.mdx:46-48) and the per-stage failure characterisation rest on record-level support plus the unit own labelled gloss. The sources register declares exactly this boundary and marks it for checking before certification (specs/content/efmp-302/sources/unit-02.md ## Source gaps). Recorded so the limitation stay...
- [advisory] New this cycle, measured: fig-U2-1.svg and fig-U2-1.dark.svg carry the pre-existing cosmetic shape-wordmark graze - the .focus highlight rect (x 574, y 16, 190x438) underlaps the wordmark by 88.3x4.5px (measure-figure-text.log; this review measured the same 88.4x4 against .focus and .grid). The wordmark is the last element in document order in all 8 figures so it is never occluded, and its contrast moves only from 2.94:1 on white to 2.51:1 over the focus fill; it is a decorative, aria-hidden branding mark. This is the reported-not-failed class prior reviews accepted (specs/gaps.md G-2026-62...

## Notes from earlier jobs on this unit
- (efmp-302-u02-fix, fix, opencode) G3 review is stale since this repair; owner sign-off under G-2026-63 needed before a fresh independent G3 run. G5 Urdu review remains pending per ADR-0019. Urdu fig-U2-1/fig-U2-5 box overlaps still need a reviewer's ink-overlap check.
- (efmp-302-u02-repair_en-conflict4, fix, opencode) Third G3 review still needs owner sign-off under G-2026-63 before a fresh independent G3 review; G5 review remains pending per ADR-0019; Urdu fig-U2-1/fig-U2-5 box overlaps need a reviewer's ink-overlap check.
- (efmp-302-u02-repair_en-conflict4, fix, opencode) Do not push or open a PR per the brief; this branch awaits the next crew job.
- (efmp-302-u02-repair_en-conflict3, fix, opencode) Per prior notes, a third G3 review cycle needs owner sign-off under G-2026-63 before a fresh independent G3 review of this unit; G5 review remains pending per ADR-0019; Urdu fig-U2-1/fig-U2-5 box overlaps need a reviewer's ink-overlap check.
- (efmp-302-u02-repair_en-conflict2, fix, opencode) Two G3 review cycles used; a third needs owner sign-off under G-2026-63 before fresh G3 review.


## Response snapshot

Confirmed that every finding in G3 report desk-d78cf623 was already repaired on main and added an unticked advisory G3 row for EFMP-302 Unit 2 recording the evidence, with no content edits.

## Outcome

- Impact: repair_en for EFMP-302 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Confirmed that every finding in G3 report desk-d78cf623 was already repaired on main and added an unticked advisory G3 row for EFMP-302 Unit 2 recording the evidence, with no content edits.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All d78cf623 findings were already resolved on main, so the next step is a fresh independent G3 review, and running it needs owner sign-off under G-2026-63 (no review cycles are left under ADR-0019).
  - The Urdu fig-U2-5 and fig-U2-1 variants still need a reviewer to check that no text overlaps; G5 stays pending per ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
