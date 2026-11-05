---
id: crew-gqur-301-u10-repair_en
title: crew repair_en GQUR-301 unit 10
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u10-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261126-gqur-unit-ten-render-blocker.general.prompt.md
 - specs/content/gqur-301/reviews/unit-10/repair-en-handoff.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u10-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u10-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-10/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 10 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 10 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-10/`.

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
From `specs/content/gqur-301/reviews/unit-10/G3/20261102T212207Z-g3-desk-36d2970a.json` (disposition: revise). Resolve each one:
- [blocking] render-review (mandatory for a pass per review-evidence.md) could not be executed because the crew brief prohibits running a dev server or Playwright on the shared production host. Accessibility criterion (visual rendering, 360px table scroll, A4 print clipping) remains unverified. No rendered PNG artifact was produced.

## Notes from earlier jobs on this unit
- (gqur-301-u10-translate, translate, codex) Translation remains draft; independent G3/G5 review, terminology approval and browser/A4 Urdu inspection remain pending.
- (gqur-301-u10-translate, translate, codex) Translation remains draft; independent G3/G5 review, terminology approval and browser/A4 Urdu inspection remain pending.
- (gqur-301-u10-review_en, review_en, opencode) Owner must provision a non-production host to run render-review and close the accessibility criterion before a pass is possible. G3 independence (ADR-0019) remains in effect  -  no G3 sign-off, no tracker row, no registry entry from this advisory report.
- (gqur-301-u10-author, author, codex) Independent G3 review, Urdu translation and localized figures, and G5 review remain open.
- (gqur-301-u10-author, author, codex) Independent G3 review, Urdu translation and localized figures, and G5 review remain open.


## Response snapshot

Recorded Unit 10’s unresolved rendering blocker and required advisory tracker row without claiming G3 completion.

## Outcome

- Impact: repair_en for GQUR-301 Unit 10 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded Unit 10’s unresolved rendering blocker and required advisory tracker row without claiming G3 completion.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Rendering remains blocked pending an authorised non-production host.
  - Rendering remains blocked pending an authorised non-production host.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
