---
id: crew-maint-2026-w43-m3-revise1
title: crew fix MAINT unit 436
stage: misc
date: 2026-10-25
surface: agent
model: opencode
feature: maint
branch: crew/maint-2026-w43-m3
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/maint/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew-maintenance/crew-maint-2026-w43-m3.misc.prompt.md
 - history/prompts/general/20261028-resolve-maintenance-merge-conflict.general.prompt.md
 - history/prompts/general/541-honor-provider-quota-reset.general.prompt.md
 - history/prompts/maint/crew-maint-2026-w43-m3-conflict1.misc.prompt.md
 - scripts/crew/crew.mjs
 - scripts/crew/workers.mjs
 - specs/intelligence/registry.md
 - tests/crew/workers.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w43-m3-revise1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w43-m3`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
An independent reviewer (claude, anthropic) asked for changes to maintenance PR #329:

Every M3 acceptance item is met and the crew tests pass (67/67), but the PR also changes the stored `last_error` from the last 300 characters of the failure tail to the first 300 of a 4000-character tail, an out-of-scope change that drops the limit message from the lead's status table.
in `scripts/crew/crew.mjs`, keep `cool()` storing the end of the failure text (`last_error: reason.slice(-300)`, or pass the 4000-char tail only to `resetMinutes` and keep `tail.slice(-300)` as the reason), and change the `last_error` assertion at `tests/crew/workers.test.mjs:67` to match.

Make exactly those changes and nothing else, within the original task:

Do maintenance task M3 of 2026-W43 (weekly-maintenance skill, the section for area "code").

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| M3 | code | Cool a worker until the provider's stated quota reset, and fix the stale worker-chain test | scripts/crew/workers.mjs, scripts/crew/crew.mjs, tests/crew/workers.test.mjs, specs/intelligence/registry.md | workers.mjs exports a pure resetMinutes(text) that returns 3807 for Resets in 63h26m50s (seconds rounded up), parses forms without seconds, returns null for resets 11pm or try again at 7:00 AM or text with no reset, and caps at 10080 minutes; cool() cools for the larger of the strike cooldown and resetMinutes of the failure tail; the a worker in avoid test expects agy_claude; QUOTA_RE and the attempt refund are unchanged; node --test tests/crew/*.test.mjs passes with 0 failures; one registry row added as proposed with the 2026-10-22 C5 signature | medium |

The survey's spec and plan follow (they are on the survey branch `crew/maint-2026-w43-survey` and reach main with the next hourly batch):

# Maintenance spec, 2026-W43

Survey window: 2026-10-17 to 2026-10-25 (origin/main at `cab50248`). First weekly survey: no
earlier `specs/maintenance/<week>/` exists, so the window starts at the crew's launch (ADR-0030).
Inputs: `git log --since=2026-10-17` on origin/main (1,294 commits, 27 of them in `scripts/crew/`),
`specs/intelligence/daily/2026-10-20.md` through `2026-10-24.md`, `specs/intelligence/registry.md`,
the crew board (`~/.crew/mega-book/board.json`, read 2026-10-25 02:00 PKT) and the standing checks in
`.claude/skills/weekly-maintenance/references/survey-checklist.md`.

## Findings

### F1. `static/content-status.json` is gitignored but tracked on main, and workers regenerate it by hand
- **Evidence:** `.gitignore:16-18` ignores it; `git ls-files static/content-status.json` lists it.
  It became tracked in `29b513d6` (2026-10-22, "rebuild content-status.json for GSOS-301 Unit 4
  G2", 1,485 lines added) and has been rewritten in 30 commits since. The code still assumes it is
  untracked: `scripts/crew/crew.mjs:499-501` (`gateFindings` comment "is gitignored, so a fresh
  worktree lacks it"), `.github/workflows/ci.yml:113` and `:254`. `prepareWorktree`
  (`scripts/crew/crew.mjs:270-287`) never generates it. `resolveSharedConflicts`
  (`scripts/crew/crew.mjs:757-776`) exists because branches conflict on it in almost every batch.
  At `cab50248` the tracked copy happens to be current (`node scripts/report-content-status.mjs
  --check` passes), but every branch that touches content makes it stale for the next one.
- **Intelligence:** the largest cluster all week: I-0007 in every digest (2026-10-20 C1,
  2026-10-21 C2 and C9, 2026-10-22 C1, 2026-10-23 C1 with 57 signals, 2026-10-24 C1 with 51
  signals and over 340 in total). 2026-10-24 C1 found the tracked-and-stale root cause; a G3
  reviewer reproduced it on clean main
  (`specs/content/gsos-301/reviews/unit-03/G3/01a16968-f1c8-7233-add1-497c86787970.json:233`).
- **Why it matters:** it is the first gate failure most workers see, it wastes turns on git
  recovery of a generated file, it fakes red gates, and it is a standing batch-merge conflict.
  The file is not a bound review input (no `input_manifest` names it), so untracking it changes no
  evidence.

### F2. Workers write scratch files to `/tmp` and headless runs reject the tool call
- **Evidence:** registry I-0008; 2026-10-20 C2, 2026-10-21 C8, 2026-10-23 effects (25 total),
  2026-10-24 C5 (30 total; `log:efmp-301-u01-review_ur.1.log:238`,
  `log:efmp-302-u02-repair_en-conflict2.1.log:412`). The brief rules
  (`scripts/crew/crew.mjs:197-204`, `briefRules`) say nothing about where scratch files go.
- **Why it matters:** each rejection aborts or derails a turn; a one-line brief rule is the
  cheapest fix available.

### F3. The planner queues translation for units whose latest G3 verdict is an unrepaired `revise`
- **Evidence:** `scripts/crew/planner.mjs:30` pushes `translate` whenever the mirror is incomplete,
  regardless of `f.g3Report.disposition`. Digests: 2026-10-21 C4 (6 handoffs), 2026-10-23 C6
  (12 handoffs: GQUR-301 U6, U8, U12, GSOS-301 U4), 2026-10-24 C8 (GQUR-301 U13). The GSOS-301 U3
  Urdu mirror of 2026-10-25 copied English defects that G3 had already flagged (role strain vs
  role conflict, RRQ guidance) and now waits on an English fix and a re-translation.
- **Why it matters:** each such job produces only a handoff saying "separate English author must
  repair ... before G4 resumes", and any mirror it does write must be redone after the repair.

### F4. Quota cooldown ignores the reset time the provider reports
- **Evidence:** `cool()` (`scripts/crew/crew.mjs:417-423`) uses `COOLDOWN_MIN = [30, 120, 360]`
  (`scripts/crew/workers.mjs:75`) by strike count only. Board: 21 limit events since 2026-10-17
  (claude 9, codex 5, agy 4, agy_claude 3), cooled 30 min (9), 120 min (8), 360 min (4). Logs
  report resets 48 to 63 hours away (`log:gqur-301-u11-author.1.log:1-2` "Resets in 63h26m50s",
  `log:gqur-301-u05-translate.1.log:1-2`). Digests 2026-10-22 C5, 2026-10-23 C3.
- **Why it matters:** a worker with a multi-day reset is retried every few hours, each retry burns
  a launch and a log, and the job's next worker waits behind it.

### F5. A quarter of all crew jobs are batch merge fixes, and the board does not say which file conflicted
- **Evidence:** 81 of 343 jobs created since 2026-10-17 are `-conflictN` merge fixes; 70 "merge fix
  queued" events, 2 jobs hit the five-fix ceiling (`queueMergeFix`, `scripts/crew/crew.mjs:779-784`).
  Conflict exclusions per day: 12, 5, 5, 9, 7 (2026-10-19 to 2026-10-23). The exclusion reason
  (`scripts/crew/crew.mjs:819`) records only "`<branch>` conflicts with main", never the paths, so
  neither the lead nor the digests can tell glossary, tracker and content-status conflicts apart
  (the digests guess: 2026-10-20 C7, 2026-10-21 C1, 2026-10-22 C3, 2026-10-24 C4).
- **Why it matters:** serialising branches by shared file (the digests' proposed fix) needs to know
  which files conflict; a diagnostic is the safe first step.

### F6. No ADR register
- **Evidence:** `history/adr/README.md` does not exist; 29 ADR files, numbering skips 0028. The
  weekly-maintenance pipeline names it as a standing artifact
  (`.claude/skills/weekly-maintenance/references/adr-register.md`, owner 2026-10-19).
- **Why it matters:** ADR-0024 is amended by 0029 and 0030; readers cannot see today's state of a
  decision without opening every file.

### F7. `ops/crew/README.md` no longer matches the code
- **Evidence:** `ops/crew/README.md:3` and `:20` say "four" agent CLIs and workers; the table and
  `scripts/crew/workers.mjs:47-66` have five (claude, codex, agy, agy_claude, opencode).
  Step 6 (`ops/crew/README.md:53-56`) repeats the `gh pr merge --admin` sentence twice. The README
  never mentions `npm run test:crew` (`package.json:38`), the crew's own test command.
- **Why it matters:** the README is the lead's runbook (crew-lead skill); stal

## Scope
The files this task names (scripts/crew/workers.mjs, scripts/crew/crew.mjs, tests/crew/workers.test.mjs, specs/intelligence/registry.md) and what must change with them to stay consistent: callers, tests and docs. Nothing else.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (maint-2026-w43-m3-conflict1, fix, codex) Prior local generated-status change preserved in stash `crew-conflict1-existing-generated-status`.
- (maint-2026-w43-m3-conflict1, fix, codex) Prior local generated-status change preserved in stash `crew-conflict1-existing-generated-status`.
- (maint-2026-w43-m3, maint_refactor, codex) Changes touch protected scripts and require owner approval.
- (maint-2026-w43-m3, maint_refactor, codex) Changes touch protected scripts and require owner approval.


## Response snapshot

Changed `cool()` to store the last 300 chars of the failure tail (`reason.slice(-300)`) instead of the first 300, and updated the matching test assertion.

## Outcome

- Impact: fix for MAINT Unit 436 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 8 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Changed `cool()` to store the last 300 chars of the failure tail (`reason.slice(-300)`) instead of the first 300, and updated the matching test assertion.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
