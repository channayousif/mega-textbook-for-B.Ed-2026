---
id: crew-geng-301-u05-repair_en-r1
title: crew repair_en GENG-301 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/556-repair-geng301-unit-five-g3.general.prompt.md
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u05-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-05/`.

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
From `specs/content/geng-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-a5cfa8c0.json` (disposition: revise). Resolve each one:
- [blocking] Content findings 1-6 in specs/content/geng-301/reviews/unit-05/G3/20261019-codex-review/summary.md#blocking-content-findings require author repairs.
- [uncertain] Author run identity and parent-prepared handoff missing; local diagnostic manifest cannot establish full provenance. Required current rendered desktop/narrow/A4 inspection unavailable because brief forbids rebuilding or serving. See summary.

## Notes from earlier jobs on this unit
- (geng-301-u05-repair_en-conflict3, fix, opencode) Unit 5 still needs a fresh independent G3 review plus provenance/render inspection; G3/G5 stay advisory and unsigned.
- (geng-301-u05-repair_en-conflict3, fix, opencode) The merge pulled main's changes to efmp-305 unit-05, efmp-406 unit-03, geng-301 unit-02 and gict-300 onto this branch; they are outside this job's scope.
- (geng-301-u05-repair_en-conflict2, fix, codex) Unit 5 still needs fresh independent G3 review and provenance/render inspection.
- (geng-301-u05-repair_en-conflict2, fix, codex) Unit 5 still needs fresh independent G3 review and provenance/render inspection.
- (geng-301-u05-repair_en-conflict1, fix, opencode) Merge was clean (no overlapping files with origin/main); branch content intact and all 14 content gates pass.


## Response snapshot

Verified the six blocking content findings were already repaired in the committed Unit 5 files and appended the Unit 5 G3 tracker row for report 20261108T203238Z-g3-desk-a5cfa8c0.json.

## Outcome

- Impact: repair_en for GENG-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the six blocking content findings were already repaired in the committed Unit 5 files and appended the Unit 5 G3 tracker row for report 20261108T203238Z-g3-desk-a5cfa8c0.json.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The latest G3 report (20261108T203238Z-g3-desk-a5cfa8c0.json) is stale; its input manifest does not match current Unit 5 bytes, so the next review must be run against the repaired files.
  - Unit 5 still needs author provenance and desktop/narrow/A4 render inspection; no Urdu mirror exists.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
