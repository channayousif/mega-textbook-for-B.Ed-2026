---
id: crew-efpc-411-u01-author-cifix1
title: crew fix EFPC-411 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u01-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: 882
files:
 - history/prompts/efpc-411/crew-efpc-411-u01-author-cifix1.misc.prompt.md
 - supabase/migrations/0058_notes_for_teachers.sql
 - tests/rls/student-notes.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u01-author-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #882 (checks: rls). Run `gh pr checks 882` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
- (efpc-411-u01-author, author, agy) Unit 1 English draft is ready for independent G3 review; banner figure fig-U1-9 is prompt-only for the illustration pipeline.

## Response snapshot

Read the failed RLS job, found the branch's `tests/rls/student-notes.test.mjs` was stale against the live shared Supabase (main's migration 0058 lets teachers keep notes, and main's test asserts that), fast-forwarded the branch to the PR head and merged `origin/main` (e42d48673) so the test and migration match the deployed schema, then ran `npm run build:content-status` and `npm run check:content` (14/14 gates green). Committed the PHR.

## Outcome

- Impact: fix for EFPC-411 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14/14 gates) in the job worktree after the merge.
- Files: 3 file(s), listed above; the merge commit itself is `a4dcd67da` (parents 5f411147c and e42d48673).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged `origin/main` into `crew/efpc-411-u01-author` so the RLS suite's `student-notes` test and migration 0058 match the live shared Supabase; no EFPC-411 content file changed.
- Decisions the team must respect: the RLS failure was schema drift on the shared database, not an EFPC-411 content defect; the fix is the main merge, not a test edit. G3/G5 stay advisory until a qualified sign-off.
- Pending / next owner: crew lead (push the branch so PR #882 re-runs CI, then auto-merge when green).
- Notes for the next job on this unit:
  - Unit 1 English draft is ready for independent G3 review; banner figure fig-U1-9 is prompt-only for the illustration pipeline.
  - The branch is now current with `origin/main` (e42d48673); re-run `npm run check:content` after any further main merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
