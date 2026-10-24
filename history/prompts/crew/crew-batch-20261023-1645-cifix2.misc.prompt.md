---
id: crew-batch-20261023-1645-cifix2
title: crew fix CREW unit 0 rls timeout
stage: misc
date: 2026-10-24
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261023-1645
user: crew
command: crew fix
labels: ["crew", "opencode", "fix", "rls"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/content-status.json
 - history/prompts/crew/crew-batch-20261023-1645-cifix1.misc.prompt.md
 - history/prompts/general/540-batch-20261023-cifix1-diagnose.general.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261023-1645-cifix2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261023-1645`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #317 (checks: rls). Run `gh pr checks 317` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#317) changes, which belong to the crew jobs gsos-301-u06-author, gsos-301-u03-review_en, gqur-301-u13-figures. Change only what the merge or CI needs.

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
- (batch-20261023-1645-cifix1, fix, opencode) e2e failure `suggestion-moderation.spec.ts:75` ("Fix typo A" filter → 2 elements) is pre-existing on main and needs either stale-row cleanup or per-run unique body text in a separate job  -  it will not clear from content changes. RLS check was still pending at wrap-up; this branch has no RLS/source changes vs main, so it is expected to pass when CI's shared-supabase queue releases it.
- (batch-20261022-2300-cifix1, fix, opencode) The new G2 evidence is at `specs/content/gqur-301/reviews/unit-13/G2/20261022T233625258Z-gates.json`; the old `20261022T193430944Z-gates.json` and its logs are still on disk (untracked, harmless). CI build (`npm run build`) was not run locally per host-limit policy  -  the fix was validated via `check:content` only.
- (batch-20261019-1915-cifix1, fix, codex) Remote CI still needs a rerun; its failure was temporary Git-directory cleanup in shared tests outside this batch's scope.
- (batch-20261019-1915-cifix1, fix, codex) Remote CI still needs a rerun; its failure was temporary Git-directory cleanup in shared tests outside this batch's scope.

## Response snapshot

Confirmed RLS failure on PR #317 is a 30000ms timeout on tests/rls/enrollment-restore.test.mjs > student restoration after removal > a teacher cannot restore a student removed from another teacher's class. Build, changes, and e2e all pass. All 13 content gates (check:content) pass. git diff origin/main confirms no RLS or source-table changes on this branch vs main. The enrollment-restore test file is outside the batch's scoped content files (gsos-301-u06-author, gsos-301-u03-review_en, gqur-301-u13-figures). The hang is shared-Supabase contention on the UPDATE that RLS should silently reject; it cannot be fixed by content changes. Committed the prestart-hook content-status.json regeneration. No other in-scope fix exists.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 2, RLS leg).
- Tests: npm run check:content — all 13 gates PASS.
- Files: committed static/content-status.json (timestamp/commit refresh only).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: RLS timeout is a shared-infra contention issue, not a content defect; the branch's content gates are clean.

## Handoff (for CEO and agents)

- Shipped / changed: committed the content-status.json prestart regeneration; confirmed check:content green; no RLS/content code changes made.
- Decisions the team must respect: this branch intentionally carries no RLS or schema changes — the failing test is shared-Supabase contention, not a logic error introduced here.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). RLS timeout may clear on a CI rerun once the shared-supabase queue drains.
- Notes for the next job on this unit:
  - e2e failure `suggestion-moderation.spec.ts:75` ("Fix typo A" filter → 2 elements) is pre-existing on main and needs either stale-row cleanup or per-run unique body text in a separate job — it will not clear from content changes.
  - RLS `enrollment-restore.test.mjs` timeout is also pre-existing/shared-contention; cifix1 and cifix2 both confirm no in-scope content fix exists.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: shared-Supabase query timeout (30s) on an RLS negative-case UPDATE.
- Graders run and results (PASS/FAIL): check:content PASS (13/13 gates).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): trigger a CI rerun after the shared-supabase queue clears; no code change needed.
