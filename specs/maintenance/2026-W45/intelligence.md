# Intelligence decisions, 2026-W45

Read: `specs/intelligence/daily/2026-11-01.md` through `2026-11-07.md` (every digest since 2026-10-31;
`2026-10-31.md` was read by W44; there is no `2026-11-05.md`, and the board has no 11-05 distill job)
and `specs/intelligence/registry.md` (I-0001 to I-0019). A candidate is promoted only with recurrence
on two or more days and evidence a reviewer can open. Registry changes below are made by task D1
alone, with IDs fixed here. This survey edits nothing outside `specs/maintenance/2026-W45/`.

## Promoted

| Candidate (digests) | Task | Registry row D1 adds or changes (status `proposed`) |
|---|---|---|
| Brief's Playwright ban stops workers running `measure-figure-text`, so CI `figure-geometry` fails batches (11-01 C2, 11-02 C6, 11-03 C10, 11-04 C2, 11-06 C5, 11-07 C5; all 15 batch CI fixes this week) | M1 | I-0020 "Brief permits and requires the SVG geometry check through heavy.sh", kind brief / skill, home `scripts/crew/brief.mjs` (`briefRules`), signature `ci failed on pr #n (checks: figure-geometry). run <code> and <code> to read the failure, fix it`, evidence "2026-W45 M1; 15 of 15 batch CI-fix jobs 2026-11-02 to 2026-11-07 were figure-geometry" |
| Workers hit stale content-status after their own edits and query it through git (11-04 C7, 11-06 C3, 11-07 C7; W44 deferred) | M1 | I-0011 (existing candidate): status to `proposed`, home to `scripts/crew/brief.mjs` (`briefRules`); title, signature and evidence unchanged |
| `intel_distill` routed to opencode, which rejects the log directory the skill reads (11-07 C4; the rejection signature also on 11-03, 11-06 effect lines) | M1 | I-0025 "Keep opencode off the intel_distill chain", kind crew fix, home `scripts/crew/workers.mjs` (`STAGES.intel_distill`), signature empty (I-0008 owns the shared rejection signature), evidence "2026-W45 M1; intel-2026-11-07-distill lost two attempts to external_directory rejections" |
| Tracker conflicts still exclude most ready jobs because jobs edit their own rows in place (11-03 C5, 11-04 C3, 11-06 C2, 11-07 C1) | M2 | I-0021 "Merge course tracker conflicts by row key", kind crew fix, home `scripts/crew/batch.mjs`, `resolveSharedConflicts` in `scripts/crew/crew.mjs`, signature `left out of the batch: <path> conflicts with main (<path>).; merge fix queued`, evidence "2026-W45 M2; 125 of 129 exclusions after I-0015 named a course tasks.md; 130 of 413 jobs this week were merge fixes; replay resolved 1 of 20" |
| owner-sync logs the same blocked line every tick and reaches nobody (11-04 C1, 11-06 C1, 11-07 C2) | M3 | I-0022 "Report a blocked owner checkout once per change and notify the owner", kind crew fix, home `scripts/crew/sync-owner-checkout.sh`, signature `owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha`, evidence "2026-W45 M3; 144 cron signals a day, 471 lines in cron.log, owner checkout 775 behind on 2026-11-08" |
| Harvester splits review findings at their rubric label and keeps only the oldest evidence (11-01 signatures `fn sources`, `fn readability`, `fn <path>`; 11-04 C5; 11-07 C3) | M4 | I-0023 "Harvest review findings past their label and keep the newest evidence", kind crew fix, home `scripts/crew/intel.mjs` (`reviewSignals`, `foldSignals`), signature `fn sources`, evidence "2026-W45 M4; 12 label-only clusters with 88 recent signals on 2026-11-04; 2026-11-06 C3 cited October logs for a 24-hour count" |
| Sibling author jobs start before the course overview exists (11-03 C6, 11-07 C6) | M5 | I-0024 "One author job writes a missing course overview before its siblings", kind planner fix, home `scripts/crew/planner.mjs`, `plan` in `scripts/crew/crew.mjs`, signature empty (the harvest folds it into the generic pipeline-gate cluster), evidence "2026-W45 M5; GICP-400 U1, U2, U4 and EFMP-406 U2 to U5 stopped or collided on course-overview.mdx; 14 held author jobs for EFPG-401 and GUHQ-301 lack one" |

## Registry status changes (D1)

Slot is the first harvest (`00` or `12`, Asia/Karachi) after the PR merged; the crew's tick pulls main
every 15 minutes.

| Row | Change | Slot | Basis |
|---|---|---|---|
| I-0015 | `proposed` to `adopted` | 2026-11-01-12 | #393 merged 2026-11-01 10:15 PKT (with the blank-line fix `d58f7bf3`) |
| I-0016 | `proposed` to `adopted` | 2026-11-01-12 | #392 merged 2026-11-01 10:13 PKT |
| I-0017 | `proposed` to `adopted` | 2026-11-01-12 | #397 merged 2026-11-01 10:20 PKT |
| I-0018 | `proposed` to `adopted` | 2026-11-01-12 | #394 merged 2026-11-01 10:17 PKT |
| I-0019 | `proposed` to `adopted` | 2026-11-01-12 | #392 merged 2026-11-01 10:13 PKT |
| I-0011 | `candidate` to `proposed`, home `scripts/crew/brief.mjs` (`briefRules`) | | promoted to M1 (see above) |

## Deferred

- **Temporary reviewed flip needs an isolated parity mode** (11-03 C8, 11-04 C6, 11-06 C7; extends
  I-0017). Failures fell from 13 jobs (11-04) to 4 (11-06) after #397. A `--check-parity` flag means a
  gate-script change, which re-opens bound G2 manifests; owner question. Recheck the I-0017 signal
  next week.
- **Review-evidence binding defects** (11-03 C1, C2, C3, C4; 11-07 C9): `scripts/lib/review-evidence.mjs`
  is bound gate code; owner question, flagged in `spec.md` (translation handoffs are the third week).
- **G3 sign-off queue** (11-06 C6, 11-07 C10): ADR suggestion in `spec.md`; the owner's decision.
- **Harvester decision-prose noise** (11-02 C1): one day, and only in maintenance-job logs that read
  ADR text. Recheck once M4 lands.
- **`mergeAppendOnly` greedy base matching** (11-02 C2): M2 replaces the helper's role for trackers;
  no task of its own.
- **Bare `python` in scratch scripts** (11-02 C5, 11-03 C9): two days, 3 events, none since 11-03.
  An AGENTS.md line is cheap but protected; recheck next week.
- **Urdu figure margins under CI font fallback** (11-04 C8, 11-06 C9) and **`measure-figure-text` left
  edge** (11-07 C8): M1 should cut these by letting workers measure; revisit the skill buffer rule and
  the left-edge check with W46 data.
- **Stale catalog note in content specs** (11-04 C4): one day, and the fix is in approved
  `specs/content/*/content-spec.md` files, which are content and bound inputs; owner.
- **Shared source excerpts invalidate sibling manifests** (11-06 C4): one day; evidence-contract design,
  owner.
- **Author-unit skill says schematic figures stay `prompt-only`** (11-03 C7): one day; the gate
  (`scripts/check-figures.mjs:155-162`) already stops it. Recheck; a skill task if it recurs.
- **Retry feedback should quote a rejected tool path** (11-07 C4, second half): one day; M1 removes the
  costliest case.

## Rejected

- **Source verification, readability and arithmetic checks in `author-unit`** (11-01 C1, C8, C9),
  **stem and rubric divergence gate** (11-01 C5), **fabricated excerpt headers gate** (11-06 C8): content
  quality that the G3 review is designed to catch, and author-unit rules on source verification need
  the owner's view (W44 deferral stands); not self-maintenance.
- **Blind-solve bundles without answer keys** (11-01 C3, 11-02 C7): a review-contract change
  (ADR-0019, Feature 014), not crew maintenance.
- **Author run ID in review briefs** (11-01 C7): one day; review provenance is the evidence contract's.
- **Leaked e2e accounts and unpaged admin queries** (11-01 C10): fixed by PHR 2438 (paged
  `fetchAllPages`, leak-proof cleanup); platform work.
- **Translation retry behind an escalate** (11-01 C4): fixed by #394 (I-0018); 0 premature translate
  jobs since.
- **Cross-branch registry citations** (11-02 C4): handled in this week's plan (code tasks cite task IDs).

## Effects of adopted items

- I-0001 (reap each job alone): 0 in every digest 11-01 to 11-07. Worked.
- I-0002 (fix job must commit): caught 1 idle exit on 11-03 and 2 each on 11-06 and 11-07. Detector
  working; its message does not say why the run idled (11-07 C4).
- I-0003 (fresh checks only): 0 duplicate fix jobs from stale CI all week.
- I-0004 (planner from real verdicts and mirrors): 0 translation loops all week.
- I-0005 (content-status before batch gate): 0 exclusions for stale content-status alone.
- I-0006 (registry guard): registries intact through every merge fix.
- I-0007 (generate missing content-status): 1 recent "missing" signal on 11-07 against 132 total.
  Worked.
- I-0008 (scratch inside the worktree): 2 to 3 rejections a day (11-03, 11-06, 11-07; 43 total).
  Partly worked; the remainder is opencode reading outside its worktree (M1 removes the distill case).
- I-0009 (untracked content-status): no merge conflicts on it; stale errors continue (27, 27, 10 a day)
  because workers edit after generation, which I-0011 (M1) targets.
- I-0010 (hold translate behind revise): held throughout. Worked.
- I-0013 (cool until provider reset): 0 reset evasions. Worked.
- I-0014 (name conflicting files): every exclusion names its paths; that data chose M2.
- I-0015 (append-only tracker merge): little effect. 125 of 129 exclusions after it still named a
  tracker; the 11-07 replay resolved 1 of 20. Superseded in purpose by I-0021 (M2); keep the row,
  since M2 may reuse the helper for non-row lines.
- I-0016 (hyphenated quota message): 0 unrecognised 5-hour stops after #392. Worked.
- I-0017 (expected reviewed-flip findings): pipeline-gate job failures 13 (11-04), 4 (11-06). Partly
  worked; see Deferred.
- I-0018 (hold translate behind escalate): 0 premature translate jobs against an escalate. Worked.
- I-0019 (harvester noise): wordmark and ternary lines gone; other noise is M4's.

## Retirement

- None. I-0001's signal is gone, but `reap` still needs per-job isolation; I-0015's helper stays in use
  until M2 lands and is reviewed again in W46.
