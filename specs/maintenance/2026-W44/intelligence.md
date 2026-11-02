# Intelligence decisions, 2026-W44

Read: `specs/intelligence/daily/2026-10-25.md` through `2026-10-31.md` (every digest since
2026-10-24; `2026-10-24.md` was read by W43) and `specs/intelligence/registry.md` (I-0001 to
I-0014). A candidate is promoted only with recurrence on two or more days and evidence a reviewer can
open. Registry changes below are made by task D1 alone; IDs are fixed here so parallel tasks cannot
collide (2026-10-26 C6, 2026-10-27 C4). This survey edits nothing outside `specs/maintenance/2026-W44/`.

## Promoted

| Candidate (digests) | Task | Registry row D1 adds (status `proposed`) |
|---|---|---|
| Concurrent unit jobs conflict on `tasks.md` rows, mass batch exclusions and five-fix ceilings (10-29 C3, 10-30 C8, 10-31 C3; board: 45 of 85 named exclusions) | M1 | I-0015 "Resolve append-only `tasks.md` conflicts in the batch", kind crew fix, home `scripts/crew/batch.mjs`, `resolveSharedConflicts` in `scripts/crew/crew.mjs`, signature `could not join a batch after n merge fixes`, evidence "2026-W44 M1; 45 of 85 batch exclusions 2026-10-26 to 2026-10-31 named a course tasks.md; 13 five-fix ceilings" |
| Claude's `hit your 5-hour limit` evades `QUOTA_RE` (10-29 C2, 10-30 C9; 12 logs) | M2 | I-0016 "Recognise the hyphenated 5-hour quota message", kind crew fix, home `scripts/crew/workers.mjs` (`QUOTA_RE`), signature empty (the digest clusters it under the generic `worker exited n:`, which other causes share), evidence "2026-W44 M2; 10 worker exit failures on 2026-10-29" |
| `translate-unit`'s temporary `reviewed` flip trips `check:pipeline-gate` (10-24 C2, 10-25 C10, 10-26 C8, 10-28 C2) | S1 | I-0017 "Name the findings the temporary reviewed flip is expected to raise", kind skill, home `.claude/skills/translate-unit/SKILL.md` (Step 5), signature `step n of translate-unit trips check:pipeline-gate because flipping translation_status to reviewed asserts that gn and gn tracker rows are already done.`, evidence "2026-W44 S1; 16 pipeline-gate log errors and 4 job failures on 2026-10-28" |
| Translation dispatched behind an unrepaired G3 `escalate` (10-26 C2, 10-27 C3, 10-31 C1) | M3 | I-0018 "Hold translate while the latest G3 report is an unrepaired escalate", kind planner fix, home `scripts/crew/planner.mjs` (`stagesFor`), signature `english author must repair scoring and unresolved gn findings before translation resumes; status remains draft.`, evidence "2026-W44 M3; GPKS-402 U6 translate and translate-r1 stopped on an active escalate" |
| Harvester clusters passing notices and ternary source lines (10-28 C7, 10-29 C6, 10-29 C9, 10-30 C10; W43 deferred) | M2 | I-0019 "Harvester drops passing notices and ternary source lines", kind crew fix, home `scripts/crew/intel.mjs` (`LOG_NOISE`), signature `n cosmetic wordmark collision(s) - reported, not failed.`, evidence "2026-W44 M2; 13 wordmark and 19 ternary noise signals since 2026-10-19" |

## Registry status changes (D1)

Slots are the first harvest (`00` or `12`, Asia/Karachi) after the PR merged.

| Row | Change | Slot | Basis |
|---|---|---|---|
| I-0007 | `proposed` to `adopted` | 2026-10-25-12 | #326 merged 2026-10-25 10:30 PKT |
| I-0008 | `proposed` to `adopted` | 2026-10-25-12 | #326 (brief rule) |
| I-0009 | `proposed` to `adopted` | 2026-10-25-12 | #326; regressed once by `d70aa57a` (2026-10-27), repaired by `5ebaff2f` (2026-10-28) |
| I-0010 | `proposed` to `adopted` | 2026-10-26-12 | #327 merged 2026-10-26 03:24 PKT |
| I-0013 | `proposed` to `adopted` | 2026-10-27-00 | #329 merged 2026-10-26 15:12 PKT |
| I-0014 | `proposed` to `adopted` | 2026-10-27-00 | #328 merged 2026-10-26 15:48 PKT |
| I-0012 | `candidate` to `retired` | | duplicate of I-0008 (same title, signature and evidence); row kept for history |

## Deferred

- **Workers' local `content-status.json` goes stale after tracker edits** (I-0011; 10-31 C6, 3 errors
  that day, 218 since 2026-10-17). `prepareWorktree` regenerates the file at job start, but a worker
  that edits a tracker mid-job makes it stale again. A one-line brief rule ("run
  `npm run build:content-status` before `npm run check:content`") is cheap, but the signal fell from
  51 a day (10-24) to 1 to 3 a day; recheck next week before adding to `briefRules`.
- **Re-tracking `content-status.json`** (10-28 C1). One event (`d70aa57a`), repaired by `5ebaff2f`.
  A guard would belong in a gate script, and editing a bound gate script can invalidate corpus
  evidence (10-30 C1). Watch; propose a crew-side guard if it recurs.
- **Render inspection under host limits** (10-26 C10, 10-27 C7, 10-29 C5): fourth week, 18 owner
  escalations in one day. The `review-unit` severity rule is the evidence contract (ADR-0019,
  ADR-0027). Owner question; flagged in `spec.md`.
- **Review evidence binds translation handoffs** (10-27 C1, 10-28 C3): changes `bound()` in
  `scripts/lib/review-evidence.mjs`, which re-scopes sealed evidence. Owner question.
- **G2 manifest left stale by English edits** (10-26 C7; W43 deferred): unchanged, owner ruling still
  needed.
- **CI fix jobs for platform flakes** (10-25 C7, 10-26 C4, 10-30 C2, 10-31 C2): the cause is shared
  Supabase test data and unpaged admin queries (`src/`, `tests/`), platform work outside
  self-maintenance; `queueCiFixes` already holds PRs on systemic failures. Recheck whether a
  content-only batch rule is still needed once the platform fixes land.
- **Urdu figure `desc` versus carrier `alt`** (10-27 C2, 10-28 C8): two days, but the proposed homes
  disagree (translate-unit step versus figure sequencing) and the parity assertion is corpus debt
  already tracked (TEX-61). Recheck next week.
- **Figures generated before Urdu pages exist** (10-25 C2): one day.
- **Unscoped `check:pipeline-gate` trips on sibling units** (10-29 C8; W43 saw 10-20 C8, 10-21 C6):
  needs a `--unit` flag in a bound gate script; recheck with the I-0011 data.
- **Deprecated `Write(...)` deny rule warning** (10-29 C7): one day; `.claude/settings.json:10`
  still has it. Harmless warning; fold into the next `.claude/` task.
- **Brief deters SVG geometry measurement** (10-30 C3): one day.
- **Review provenance omits author session ID** (10-31 C7) and **excerpt key regex** (10-30 C4):
  one day each, both in review-evidence tooling (owner).
- **Author-unit source verification and figure guidance** (10-30 C7, 10-31 C4): one day each; content
  skill changes need the owner's view on what authors must verify.
- **Disk guard stalls silently** (10-26 C3), **approved intake waits unprompted** (10-30 C6): one day
  each; `BOARD.md` "Resume here" already lists held launches and open decisions.

## Rejected

- **Workers-test chain assertion** (10-26 C5, 10-27 C5): fixed on main by #329; suite is 83/0.
- **Leftover merge-fix worktrees hold branches** (10-29 C1): fixed by #358, signal 0 after it.
- **Pre-M1 content-status stashes** (10-27 C6): branches from before M1 are gone; the stash is
  harmless and the cause (tracked file) is removed.
- **Missing `scripts/check-content-status.mjs`** (10-28 C6): the gate is `npm run
  check:content-status` (`package.json:33`), which runs `report-content-status.mjs --check`; the
  errors came from workers guessing a file name. No file is missing.
- **Nested intake directories in bound inputs** (10-25 C6), **intake URL checks** (10-25 C5),
  **figure gate passes prompt-only rows** (10-25 C8), **map sources** (10-30 C5, already enforced by
  `check:map-sources` under ADR-0033), **stem and rubric divergence** (10-31 C5), **style-guide
  ranges** (10-25 C4, 10-29 C4), **policy-claim accuracy** (10-31 C10), **video voice pace**
  (10-31 C9): one day each, or content and governance work outside self-maintenance.
- **Repair jobs handed governance findings** (10-25 C9): one day; scoping review findings is the
  review contract's job.
- **Compound shell commands stage missing files** (10-31 C8): 5 in two weeks; the tool already
  reports the error and the worker retries.

## Effects of adopted items

- I-0001 (reap each job alone): signal 0 in every digest 10-25 to 10-31. Worked.
- I-0002 (fix job must commit): caught 5 redundant translate exits on 10-28 and 2 idle conflict fixes
  on 10-29; detector working as designed.
- I-0003 (fresh checks only): 0 duplicate fix jobs from stale red runs (10-28 to 10-31).
- I-0004 (planner from real verdicts and mirrors): no regression; 10-28 C4 suspected sparse-checkout
  misreads, not confirmed after 10-29.
- I-0005 (content-status before batch gate): 0 batch exclusions for stale content-status all week.
- I-0006 (registry guard): registries intact through every merge-fix this week.
- I-0007 and I-0009 (untracked, regenerated content-status): fell from 51 signals on 10-24 to 1 to 3 a
  day, except the `d70aa57a` regression (43 stale errors on 10-28, 0 after `5ebaff2f`). Worked.
- I-0008 (scratch inside the worktree): 0 permission rejections on 10-26, 10-27, 10-29, 10-30, 10-31;
  5 on 10-28 (`/tmp` and path typos). Mostly worked.
- I-0010 (hold translate behind unrepaired revise): 0 translate jobs behind a `revise` since 10-28;
  the `escalate` gap is promoted as M3.
- I-0013 (cool until provider reset): no strike loops on relative resets; the hyphen gap is promoted
  as M2.
- I-0014 (name conflicting files): every exclusion since 10-26 names its paths; that data chose M1.

## Retirement

- I-0012: retire as a duplicate of I-0008 (see above).
- None of the adopted items: I-0001's signal is gone, but `reap` still needs per-job isolation.
