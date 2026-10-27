---
id: crew-batch-20261027-0132-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: crew
branch: crew/batch-20261027-0132
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-sync-batch-ci-geometry-repairs.general.prompt.md
 - static/content-status.json
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-1.ur.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.dark.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261027-0132-cifix1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261027-0132`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #342 (checks: figure-geometry). Run `gh pr checks 342` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#342) changes, which belong to the crew jobs efmp-304-u06-fix, gsos-301-u01-fix, gnas-301-u06-fix, efmp-303-u06-fix, efmp-301-u02-fix, efmp-301-u04-fix. Change only what the merge or CI needs.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (batch-20261023-1645-cifix2, fix, opencode) e2e `suggestion-moderation.spec.ts:75` and RLS `enrollment-restore.test.mjs` timeout are both pre-existing on main / shared-contention  -  neither clears from content changes; needs a CI rerun after shared-supabase queue drains.
- (batch-20261023-1645-cifix2, fix, opencode) No RLS, schema, or enrollment-policy changes exist on this branch vs main (`git diff origin/main` confirms); the next job should not touch `tests/rls/`.
- (batch-20261023-1645-cifix2, fix, opencode) Batch scoped to gsos-301-u06-author, gsos-301-u03-review_en, gqur-301-u13-figures only.
- (batch-20261023-1645-cifix1, fix, opencode) e2e failure `suggestion-moderation.spec.ts:75` ("Fix typo A" filter → 2 elements) is pre-existing on main and needs either stale-row cleanup or per-run unique body text in a separate job  -  it will not clear from content changes. RLS check was still pending at wrap-up; this branch has no RLS/source changes vs main, so it is expected to pass when CI's shared-supabase queue releases it.
- (batch-20261022-2300-cifix1, fix, opencode) The new G2 evidence is at `specs/content/gqur-301/reviews/unit-13/G2/20261022T233625258Z-gates.json`; the old `20261022T193430944Z-gates.json` and its logs are still on disk (untracked, harmless). CI build (`npm run build`) was not run locally per host-limit policy  -  the fix was validated via `check:content` only.


## Response snapshot

Copied eight CI-proven Urdu SVG repairs onto this branch and committed the status refresh and required work record.

## Outcome

- Impact: fix for CREW Unit 0 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 10 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Copied eight CI-proven Urdu SVG repairs onto this branch and committed the status refresh and required work record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - EFMP-301 U4 fig-U4-3 and EFMP-303 U6 fig-U6-2 still need separate visual redraws per the prior repair record.
  - EFMP-301 U4 fig-U4-3 and EFMP-303 U6 fig-U6-2 still need separate visual redraws per the prior repair record.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
