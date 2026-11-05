---
id: crew-gnas-301-u01-repair_en-r1
title: crew repair_en GNAS-301 unit 1
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gnas-301
branch: crew/gnas-301-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/019-author-gnas-301/0040-reconcile-unit-one-g3-repairs.misc.prompt.md
 - specs/content/gnas-301/reviews/unit-01/repair-20261105.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-repair_en-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

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
From `specs/content/gnas-301/reviews/unit-01/G3/20261102T213114Z-g3-desk-00b73da1.json` (disposition: revise). Resolve each one:
- [advisory] who-water-2023 excerpt support note section heading retains legacy unit label. In specs/content/gnas-301/sources/texts/who-water-2023.md line 18, the heading reads "## What this supports in GNAS-301 Unit 2", though lines 23-25 explicitly document Unit 1's Topic 1.3 (U1-06) usage for the over-2-billion water-stressed population figure. The heading was retained to avoid invalidating Unit 2's G2 evidence closure. When Unit 2 evidence is refreshed, the heading should be made unit-neutral.
- [uncertain] Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc) pass from source, but visual accessibility remains unverified in this session until a permitted browser/print inspection can be run on a live build.
- [uncertain] Text-geometry defects detected in Unit 1 SVG figure assets. Running node scripts/measure-figure-text.mjs static/img/figures/gnas-301/unit-01/*.svg reports 10 text geometry issues across four figures: (1) fig-U1-2.dark.svg and fig-U1-2.svg spill 21.4px out of panel [30,56,750,96] ("One Sindh classroom example"); (2) fig-U1-3.ur.dark.svg and fig-U1-3.ur.svg overprint the wordmark (ends 180, wordmark starts 12) ("مسائل (رنگین تیر)"); (3) fig-U1-6.dark.svg and fig-U1-6.svg have overlapping text (11.2px) between "withdrawals already highly stressed" and "stay below renewal: quotas", and "Managem...

## Notes from earlier jobs on this unit
- (gnas-301-u01-review_en-conflict1, fix, claude) Unit 1 G3 is still open and escalated (report `12ce2621-...json`): 10 figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6 and fig-U1-8 still need fixing.
- (gnas-301-u01-review_en, review_en, agy) 10 figure text geometry defects detected across fig-U1-2, fig-U1-3.ur, fig-U1-6, and fig-U1-8 need SVG coordinate adjustments so measure-figure-text.mjs passes.
- (gnas-301-u01-review_en, review_en, agy) Live 360px viewport, table horizontal scrolling, and A4 print view inspection remain unperformed due to job brief limits and must be verified on a live build before G3 certification.
- (gnas-301-u01-review_en, review_en, agy) who-water-2023.md:18 heading retains legacy Unit 2 label to protect Unit 2 G2 evidence; make unit-neutral when Unit 2 evidence is refreshed.
- (gnas-301-u01-fix, fix, opencode) fig-U1-6 viewBox height is now 490 (not 470) - both Figure carriers updated; do not revert without updating them. G3 en-review for Unit 1 remains owner-gated under G-2026-24; needs a fresh review run when authorized.


## Response snapshot

Verified existing SVG repairs, documented each finding, and appended the advisory Unit 1 tracker row with G3 unticked.

## Outcome

- Impact: repair_en for GNAS-301 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified existing SVG repairs, documented each finding, and appended the advisory Unit 1 tracker row with G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
  - Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
