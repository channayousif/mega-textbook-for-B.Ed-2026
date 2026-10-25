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
- **Why it matters:** the README is the lead's runbook (crew-lead skill); stale counts mislead.

### F8. Crew tests are red on main and CI does not run them
- **Evidence:** `node --test tests/crew/*.test.mjs`: 59 pass, 1 fail.
  `tests/crew/workers.test.mjs:17-21` expects `codex` after `claude` is avoided for `author`, but
  `agy_claude` was inserted second in every claude chain (`scripts/crew/workers.mjs:48-49`).
  `.github/workflows/ci.yml` runs `npm run test:review` (`:168`) but never `npm run test:crew`.
- **Why it matters:** a red suite nobody runs stops protecting the dispatcher; every
  `maint_refactor` task is told to keep this suite green. CI is owner-only, so adding the step is a
  proposal, not a task.

### F9. Duplicate PHR IDs keep accumulating
- **Evidence:** 59 ID collisions across `history/prompts/*/` (for example `general/0531`,
  `0532`, `0534`, `0535`; `efmp-305/0153`..`0155`; `gqur-301/0551`..`0553`); 49 of them involve a
  file added since 2026-10-17. All 614 PHRs added this week have a `## Handoff` section.
- **Why it matters:** parallel sessions take the same "next free ID". Low harm (paths stay
  unique), so this week records it only; renaming would churn links.

### F10. Effects of adopted intelligence (board and digests)
- I-0005 worked: "fails npm run check:content" batch exclusions were 32 on 2026-10-19 and 0 on every
  day after its adoption (board history).
- I-0001 worked (signal 0 since adoption); I-0006 caught duplicate glossary keys on
  2026-10-24 (`job:gsos-301-u03-author`); I-0002 fires as designed. Details in `intelligence.md`.

### Not acted on this week (owner territory)
- G2 manifests left stale by English edits (2026-10-20 C3, 10-22 C2, 10-23 C2, 10-24 C3): the fix
  touches the evidence contract (ADR-0019, ADR-0027, Feature 014). Owner question.
- Render inspection severity in `review-unit` (2026-10-21 C5, 10-22 C4, 10-24 C6): digests disagree
  on the direction; the skill is the evidence contract. Owner question.
- Adding `npm run test:crew` to CI (F8): `.github/workflows/ci.yml` is owner-only.
- 📋 Architectural decision detected: the 2026-10-19 owner rulings (one hourly batch PR instead of a
  PR per job; weekly self-maintenance PRs that merge on green CI plus an independent cross-family
  review) change ADR-0030's merge model, and ADR-0030's status line does not record them.
  Document? Run `/sp.adr crew-batching-and-self-maintenance`.

## Goals for this week

- **G1.** Fresh worktrees start with a current `content-status.json` that git does not track, and
  workers keep scratch files inside the worktree (F1, F2; I-0007, I-0008).
- **G2.** The planner stops queueing translation behind an unrepaired G3 `revise` (F3).
- **G3.** Publish the ADR register (F6).
- **G4.** `ops/crew/README.md` matches the code (F7).
- **G5.** Batch exclusions name the conflicting files (F5).
- **G6.** Quota cooldown honours a parseable provider reset, and the crew suite is green (F4, F8).
