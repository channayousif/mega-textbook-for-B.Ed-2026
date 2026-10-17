---
id: 0175
title: Diagnose Unit Six CI Failure
stage: misc
date: 2026-10-17
surface: agent
model: gpt-6
feature: efmp-302
branch: crew/efmp-302-u06-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["board-direct", "crew", "codex", "ci"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/180
files:
  - history/prompts/efmp-302/0175-diagnose-unit-six-ci-failure.misc.prompt.md
tests:
  - scripts/heavy.sh npm run check:content (13/13 PASS, exit 0)
  - gh pr checks 180
  - gh run view 39054343473 --log-failed
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief read for this request:

# Crew job efmp-302-u06-translate-cifix1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u06-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #180 (checks: build). Run `gh pr checks 180` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
EFMP-302 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.

## Response snapshot

All 13 content gates pass. PR #180 failed in the Unit tests step of the build job,
not in MDX compilation. tests/unit/rls-fixture-isolation.test.mjs:69 expected
workflow-level concurrency after CI moved serialization to individual database jobs.
Current origin/main already repairs the assertion in commit
71f406c40a75d0604f5ec4b9fe5724404ff06fa2,
`test(ci): assert the Supabase lock per job after the content fast lane`.
The checked-out branch predates the CI change; the PR was tested combined with its base.
No Unit 6 source change is warranted. The shared test repair is outside this job's scope.
No build, dev server, push or PR creation performed.

## Outcome

- Impact: Diagnosed CI failure and confirmed existing upstream repair.
- Tests: check:content 13/13 PASS; no findings require a main-baseline run.
- Files: Required PHR only; existing content preserved.
- Next prompts: Crew lead refreshes PR CI against current main.
- Reflection: Inspect the failed step instead of assuming the build job failed in compilation.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded CI diagnosis and successful content validation.
- Decisions the team must respect: No G3/G5, translation status or publication state changed. Shared CI repair belongs to main.
- Pending / next owner: Crew lead owns refreshing PR CI against current main. Remote CI success is not claimed; this branch remains unpushed.
- Paperclip issues affected: None; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Historical PR CI used a stale concurrency assertion. Initial gh run view needed an explicit run ID; rerun succeeded. The python alias was unavailable; used python3 to write this record.
- Graders run and results (PASS/FAIL): Content gates PASS (13/13); historical PR build FAIL with repair already on main.
- Prompt variant (if applicable): efmp-302-u06-translate-cifix1
- Next experiment (smallest change to try): Refresh CI with main's existing test repair.
