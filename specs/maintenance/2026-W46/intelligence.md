# Intelligence decisions, 2026-W46

Read: `specs/intelligence/daily/2026-11-08.md` through `2026-11-14.md` (every digest since 2026-11-07;
`2026-11-07.md` was read by W45) and `specs/intelligence/registry.md` (I-0001 to I-0025). A candidate is
promoted only with recurrence on two or more days and evidence a reviewer can open. Registry changes
below are made by task D1 alone, with IDs fixed here. This survey edits nothing outside
`specs/maintenance/2026-W46/`.

A caution for reading this week's digests: from 2026-11-09 to 11-13 they describe I-0020 to I-0023 as
"awaiting merge" and PRs #497 to #502 as open. All six merged on 2026-11-08 (spec F1); the digests
inferred otherwise from the stale `BOARD.md` decisions and the `proposed` registry rows. Their effect
lines for those items are therefore re-read below against the board.

## Promoted

| Candidate (digests) | Task | Registry row D1 adds (status `proposed`) |
|---|---|---|
| Stale owner decisions for merged PRs mislead the digests and the owner (11-09 C6; "awaiting merge" in 11-09 to 11-13 effect lines; `BOARD.md` C-017 to C-021) | M2 | I-0027 "Close a PR's open decisions when it merges or closes", kind crew fix, home `scripts/crew/decisions.mjs`, `managePrs` in `scripts/crew/crew.mjs`, signature empty (the harvest has no decision signal), evidence "2026-W46 M2; C-017 to C-021 stayed open for PRs merged 2026-11-08; five digests reported the W45 fixes as unmerged" |
| Unnumbered rubric labels collapse review clusters (11-10 C2, extends I-0023) and distill handoffs echo back as signals (11-13 C2, 11-14 C3) | M3 | I-0028 "Harvest past unnumbered labels and skip the digest's own handoffs", kind crew fix, home `scripts/crew/intel.mjs` (`FINDING_LABEL`, `boardSignals`), signature `assessment`, evidence "2026-W46 M3; 21 label-only review signals in 7 clusters on 2026-11-10; 3 of 5 growing clusters on 2026-11-13 were echoes of job:intel-2026-11-12-distill" |
| Jobs that edit English unit inputs leave G2 evidence stale (11-09 C8, 11-10 C5, 11-11 C4, 11-14 C2) | M4 | I-0029 "Content briefs require refreshing and committing G2 evidence after English input edits", kind brief / skill, home `scripts/crew/brief.mjs` (`briefRules`), signature `✗ pipeline gate failed with n finding(s):` (shared with I-0017's domain; read together), evidence "2026-W46 M4; four of seven digests; no skill or brief named prepare-gate-evidence.mjs" |
| Summary-table and status-line conflicts still exclude parallel authors of a new course (11-12 C1, 11-13 C4; caused 11-12 C4 and C5) | M1 | I-0026 "Merge tracker summary rows and status blocks in the batch", kind crew fix, home `scripts/crew/batch.mjs` (`trackerLines`, `mergeTrackerRows`), signature `could not join a batch after n merge fixes`, evidence "2026-W46 M1; 17 of 20 exclusions since 2026-11-09 were EFPG-401 authors; efpg-401-u03-author and -u05-author hit the five-fix ceiling on 2026-11-10" |
| Review reports one folder down are invisible to the planner, so a premature second review burns the last cycle (11-08 C1, 11-09 C1, 11-10 C1) | M5 | I-0030 "Read review reports one folder below the gate directory", kind planner fix, home `scripts/crew/review-facts.mjs`, `latestReport` in `scripts/crew/crew.mjs`, `scripts/build-g3-desk.mjs`, signature `inherited unresolved finding from <path>`, evidence "2026-W46 M5; EFMP-407 Units 5 and 8 escalated on unchanged inputs; 14 nested reports on main" |

## Registry status changes (D1)

Slot is the first harvest (`00` or `12`, Asia/Karachi) after the PR merged; the crew's tick pulls main
every 15 minutes, and `~/crew-system` contains `c029f47b0`.

| Row | Change | Slot | Basis |
|---|---|---|---|
| I-0011 | `proposed` to `adopted` | 2026-11-09-00 | #497 merged 2026-11-08 20:12 PKT |
| I-0020 | `proposed` to `adopted` | 2026-11-09-00 | #497 merged 2026-11-08 20:12 PKT |
| I-0021 | `proposed` to `adopted` | 2026-11-09-00 | #498 merged 2026-11-08 22:10 PKT |
| I-0022 | `proposed` to `adopted` | 2026-11-09-00 | #500 merged 2026-11-08 22:22 PKT |
| I-0023 | `proposed` to `adopted` | 2026-11-09-00 | #501 merged 2026-11-08 22:25 PKT |
| I-0024 | `proposed` to `adopted` | 2026-11-09-00 | #502 merged 2026-11-08 22:49 PKT |
| I-0025 | `proposed` to `adopted` | 2026-11-09-00 | #497 merged 2026-11-08 20:12 PKT |
| I-0015 | `adopted` to `retired`, note "superseded by I-0021 (2026-W46)" | | its helper `mergeAppendOnly` has no production caller since #498; M1 deletes it |

## Deferred

- **Desk carry-forward reports re-trigger repairs** (11-11 C5, 11-12 C3, 11-13 C6): three days, but
  the reports are the ADR-0032 sign-off ledger and whether a carried finding still needs repair is the
  owner's decision; flagged in `spec.md`.
- **Shared source excerpts** (11-06 C4, 11-08 C2): `scripts/lib/review-evidence.mjs` is bound gate code;
  owner question, third week.
- **Urdu figure metrics under CI font fallback** (11-12 C2, 11-13 C5): both cite the same two PRs of
  2026-11-10, so effectively one day; figure-geometry CI fixes fell from 15 to 3 after I-0020. Recheck.
- **Temporary reviewed flip** (11-08 C5, 11-09 C3): failures 20 (11-08), 2 (11-09), 0 since; I-0017 holds,
  `--check-parity` stays an owner question.
- **Workers reading `/proc/pressure` or git internals outside the worktree** (11-11 C1): one day (14
  rejections), 0 on 11-12 and 11-13. Recheck; a brief sentence if it returns.
- **Gemini 503 capacity errors not cooling the worker** (11-11 C3), **authentication blocks spend
  attempts** (11-14 C1), **stream-truncation suffix splits a quota cluster** (11-13 C1), **multi-day
  cooldowns leave one-family stage chains idle** (11-13 C3): one day each. Recheck next week.
- **Merge-fix brief wording on the status line and out-of-scope sibling files** (11-12 C4, C5): one day,
  and M1 removes the conflicts that produced them.
- **Illustration setting vs prose geography** (11-14 C4): one digest day; a content-standard question
  for the owner (spec "Not acted on").
- **Translation dispatched before English repair** (11-09 C5): one day; I-0010 and I-0018 held both
  units, and the translators stopped correctly.
- **Missing `.ur.dark.svg` checks in translate-unit** (11-12 C7), **coverage vs sources Supports
  mismatch** (11-11 C10): one day each.
- **Stray tracker rows in EFMP-407** (11-08 C9): a content cleanup, not maintenance.

## Rejected

- **G3/G5 signing runner** (11-08 C10, 11-09 C7, 11-10 C4, 11-11 C7, 11-12 C6) and **review-cycle
  re-authorisation** (11-11 C6, 11-14 retained): ADR suggestions for the owner, written in `spec.md`;
  not a maintenance task.
- **Uncorroborated statistics in content** (11-10 C7): content quality for G3 review and the style
  guide, not self-maintenance.
- **Host development slice containment** (11-10 C3): a record of shipped ops work, not a candidate.
- **Owner-sync blocked spam** (11-08 C3, 11-09 C2, 11-10 C6): fixed by I-0022; 0 blocked lines since
  2026-11-10.
- **Opencode on intel_distill** (11-08 C6): fixed by I-0025; the 11-13 digest confirms agy ran it.

## Effects of adopted items

- I-0001, I-0003, I-0004, I-0005, I-0006, I-0016, I-0019: 0 in every digest 11-08 to 11-14. Worked.
- I-0002 (fix job must commit): 4 idle exits (11-08), 19 (11-11, mostly permission rejections),
  2 (11-14). Detector working; 11-14 notes it also rejects a continuation that inherited commits.
- I-0007, I-0009 (content-status): stale errors 22 (11-08), 3 (11-09), 0 (11-10), 3 (11-11), 0 since.
  With I-0011 live from 2026-11-09-00, the stale-status cluster has all but gone.
- I-0008 (inside the worktree): 3 (11-08), 14 (11-11, `/proc/pressure`), 0 on 11-12 and 11-13.
- I-0010, I-0018 (hold translate): held throughout; the two translations that started stopped on
  English defects as the skill requires.
- I-0013 (cool until reset): parsed a 161-hour reset on 11-13 and handed the job to claude. Worked.
- I-0014 (name conflicting files): every exclusion named its paths; that data chose M1.
- I-0017 (reviewed flip): 20 failures (11-08), 2 (11-09), 0 from 11-10. Worked.
- I-0020 (geometry check in the brief): batch figure-geometry CI fixes 15 in W45, 3 this week, all
  on 2026-11-10. Worked; the remainder is the Urdu font case (Deferred).
- I-0021 (row merge): exclusions 129 to 20, merge-fix jobs 31% to 8% of launches. Worked for stage
  rows; the remainder is summary rows and status lines (M1).
- I-0022 (owner-sync once): blocked lines 136 (11-09), 41 (11-10), 0 since. Worked.
- I-0023 (review labels): numbered labels resolved; unnumbered ones remain (M3).
- I-0024 (overview first): 0 overview collisions; EFPG-401's overview landed with its first author.
- I-0025 (opencode off distill): 0 distill rejections; agy ran every distill. Worked.

## Retirement

- I-0015 (append-only tracker merge): retire. I-0021 replaced its role in #498, and the helper has no
  production caller (M1 deletes it). The signature it watched moves to I-0026.
- None other. I-0001's signal is gone, but `reap` still needs per-job isolation.
