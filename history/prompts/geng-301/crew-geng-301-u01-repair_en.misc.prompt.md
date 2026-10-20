---
id: crew-geng-301-u01-repair_en
title: crew repair_en GENG-301 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: claude
feature: geng-301
branch: crew/geng-301-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-01/unit-assessment.mdx
 - history/prompts/geng-301/0537-geng-301-u01-g3-repairs.misc.prompt.md
 - specs/content/geng-301/reviews/unit-01/G2/20261019T230326859Z-gates.json
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/validate-content.txt
 - specs/content/geng-301/sources/unit-01.md
 - specs/content/geng-301/tasks.md
 - static/img/figures/geng-301/unit-01/fig-U1-1.dark.svg
 - static/img/figures/geng-301/unit-01/fig-U1-1.svg
 - static/img/figures/geng-301/unit-01/fig-U1-2.dark.svg
 - static/img/figures/geng-301/unit-01/fig-U1-2.svg
 - static/img/figures/geng-301/unit-01/fig-U1-3.dark.svg
 - static/img/figures/geng-301/unit-01/fig-U1-3.svg
 - static/img/figures/geng-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/geng-301/unit-01/fig-U1-4.svg
 - static/img/figures/geng-301/unit-01/fig-U1-5.dark.svg
 - static/img/figures/geng-301/unit-01/fig-U1-5.svg
 - static/img/figures/geng-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/geng-301/unit-01/fig-U1-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u01-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-01/`.

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
From `specs/content/geng-301/reviews/unit-01/G3/20261019T000000000Z-g3.json` (disposition: revise). Resolve each one:
- [blocking] RRQ 5 answer key misidentifies the topic sentence. The model answer at unit-assessment.mdx:205 states the topic sentence is sentence 3 and quotes A library corner in a primary classroom encourages independent reading, but this sentence is the first sentence of the passage (line 120), not the third. The correct topic sentence is sentence 1. This is a factual error in the answer key that would mislead a self-study learner.
- [advisory] Source binding inconsistency: content-spec.md lists openstax2021 sections 6.7 and 10.6 as a mapped open-access reading for Unit 1, but sources/unit-01.md binds writing2015 (University of Minnesota Writing for Success section 6.2) instead. The prose claims are supported by the bound sources, but the content-spec and sources-consulted records disagree on which open-access text was used. The open-access floor is met by writing2015.
- [advisory] SVG wordmark overflow: the decorative textbook.com.pk watermark overflows the viewBox right edge by 43-47px in all 12 figure SVG files (6 figures x light/dark). Reported by scripts/measure-figure-text.mjs. The wordmark is aria-hidden=true so it does not affect screen-reader accessibility or instructional meaning, but it may clip visually at the right edge.

## Notes from earlier jobs on this unit
- (geng-301-u01-review_en-conflict1, fix, codex) RRQ 5 sentence-number correction and rendered accessibility review remain pending with the author and independent reviewer.
- (geng-301-u01-review_en-conflict1, fix, codex) RRQ 5 sentence-number correction and rendered accessibility review remain pending with the author and independent reviewer.
- (geng-301-u01-review_en, review_en, codex) RRQ 5 needs correction from “sentence 3” to “sentence 1”; rendered accessibility review remains pending.
- (geng-301-u01-review_en, review_en, codex) RRQ 5 needs correction from “sentence 3” to “sentence 1”; rendered accessibility review remains pending.


## Response snapshot

Fixed the GENG-301 Unit 1 RRQ 5 answer key, recorded why OpenStax is not a bound source, right-aligned the watermark in all 12 figure SVGs, refreshed G2 evidence, and added an open G3 "repairs applied" tracker row.

## Outcome

- Impact: repair_en for GENG-301 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed the GENG-301 Unit 1 RRQ 5 answer key, recorded why OpenStax is not a bound source, right-aligned the watermark in all 12 figure SVGs, refreshed G2 evidence, and added an open G3 "repairs applied" tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 1 needs a fresh independent G3 review; the RRQ 5 fix and the watermark fix are both in place.
  - OpenStax (`openstax2021`) is listed in the frozen content-spec for all GENG-301 units but is not bound for Unit 1, because its terms bar ingestion by language models; changing the spec is an owner decision.
  - Figure SVGs whose stylesheet centres all text need a `.wm` rule, or the watermark runs off the right edge; check the other GENG-301 units.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
