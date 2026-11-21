# Maintenance plan, 2026-W47

One approach per goal in `spec.md`. M1 to M5 touch `scripts/` or `.claude/`-adjacent code, protected
paths, so those PRs go to the owner. D1 (`specs/intelligence/registry.md`) is the only task that may
merge on green CI and a passing review.

**Registry ownership.** As in W44, W45 and W46, only D1 edits `specs/intelligence/registry.md`, with the
IDs fixed in `intelligence.md` (I-0031 to I-0036). Code tasks cite their task ID (`2026-W47 Mn`) and the
digest dates in comments, never registry IDs.

**Shared files.** M3 owns `scripts/crew/workers.mjs` and one branch in `scripts/crew/crew.mjs`; M5 owns the
`plan_illustrations` entry of `STAGE_TASK` in `scripts/crew/crew.mjs`. They do not overlap. M4 owns
`scripts/crew/batch.mjs`. M1 owns `scripts/prepare-gate-evidence.mjs`. M2 owns
`scripts/measure-figure-text.mjs`. Each code task has its own test file or adds to one no other task
touches this week.

## G1: the registry matches what shipped (D1, risk low)

- `specs/intelligence/registry.md`: set I-0026 to I-0030 to `adopted`, slot `2026-11-15-12` (all six PRs
  merged 2026-11-14 21:31 to 22:02 UTC, that is 02:31 to 03:02 PKT on 2026-11-15; the tick pulls main
  every 15 minutes, so the first harvest after the merge is 12:00 PKT).
- Add I-0031 (image-quota stage cooldown) as `adopted`, slot `2026-11-17-00` (PR #629 merged 2026-11-16
  17:03 PKT; the first harvest after is 00:00 on 2026-11-17), exactly as `intelligence.md` lists it.
- Add I-0032 to I-0036 exactly as `intelligence.md` lists them, status `proposed`. Change no other row.
- Must not break `npm run check:docs-sync`. No em dash.

## G2: a lowercase course code works (M1, risk low)

- In `scripts/prepare-gate-evidence.mjs`, uppercase the course argument once, before `requireClean` and
  `writeEvidence` use it, so the validation in `scripts/lib/review-evidence.mjs:183` passes and the
  evidence JSON's `course_code` stays uppercase. Do not change the regex or any library function: the
  gate evidence schema and the review-evidence manifests are hashed, and a library change would stale
  every accepted review.
- Acceptance is a command run on a clean worktree: `node scripts/prepare-gate-evidence.mjs efmp-301 1`
  gets past `invalid unit or stage` (it then runs the draft gates, so expect a few minutes). The
  uppercase invocation is unchanged.
- Must not break: `--refresh-stale`, the dirty-tree refusal, the evidence JSON shape, the tracker repoint.

## G3: the local SVG check can match CI (M2, risk medium)

- Add a `--ci-fonts` flag to `scripts/measure-figure-text.mjs`. When set, inject a style that forces the
  CI fallback face (DejaVu Sans) on every `<text>` before measuring, so a local run reproduces the
  runner's glyph widths. The default path is unchanged.
- Document the flag in the header next to `--changed` and `--report`, and cite the 2026-11-13 C5 and
  2026-11-19 C3 digests in a comment.
- Medium because it changes what the mandatory local check measures. Why it is safe: the default is
  untouched, CI does not pass the flag yet, and the flag only makes the local result stricter (DejaVu is
  wider than Noto Nastaliq for the Urdu lines that overflowed).
- Acceptance: run the flag on a Urdu SVG that CI flagged (the PR #642 case) and see the same overflow
  the default misses. A worker may add a fixture under `.crew/` for the run; nothing is committed.
- Must not break: `--changed`, `--report`, the exit codes, the existing overflow and wordmark rules.

## G4: provider config and auth failures refund the attempt (M3, risk medium)

- Add a `PROVIDER_RE` (or extend `QUOTA_RE`) in `scripts/crew/workers.mjs` matching `model is not
  supported`, `Failed to authenticate`, `UNAUTHENTICATED (code 401)` and `Attention Required`. In
  `reapOne` (`scripts/crew/crew.mjs:870`), treat a match like `QUOTA_RE`: cool the worker, decrement
  `attempts`, requeue, and do not mark the job failed.
- Export the regex if that keeps the test simple, and add tests to `tests/crew/workers.test.mjs` for the
  new patterns plus the existing quota cases. Cite the 2026-11-14 C1 and 2026-11-19 C1 digests.
- Medium because cooling a worker is a behaviour change. Why it is safe: the new patterns are
  provider-side failures, not work failures, and the existing quota path already does exactly this.
  Keep `COOLDOWN_MIN` and the three-attempt ceiling unchanged.
- Must not break: `QUOTA_RE`, `IMAGE_QUOTA_RE`, `resetMinutes`, `pickWorker`, the gate_red path.

## G5: a duplicate unit-stage key is a conflict, not a silent duplicate (M4, risk medium)

- In `mergeTrackerRows` (`scripts/crew/batch.mjs:207-209`), when a new keyed row from theirs has the same
  key as a new row from ours but different text, return null so the batch falls back to a merge fix,
  instead of keeping both. An identical new row on both sides stays kept once; new rows for different
  units still both merge.
- Tests in `tests/crew/batch.test.mjs`: both sides add a different G3 row for Unit 4 returns null; the
  same row on both sides is kept once; two different units merge. All existing `mergeTrackerRows` tests
  must pass. Cite the 2026-11-15 C4, 2026-11-16 C4 and 2026-11-17 C4 digests.
- Medium because more cases become merge fixes. Why it is safe: a both-sides change to one unit's row
  already returns null, the batch's registry and content gates still run, and the only behaviour change
  is that a genuine duplicate is surfaced instead of written silently.
- Must not break: status blocks, summary rows, the glossary and content-status branches,
  `exclusionReason` text, the five-fix ceiling.

## G6: the plan_illustrations brief states the Urdu rule (M5, risk low)

- In `STAGE_TASK.plan_illustrations` (`scripts/crew/crew.mjs:337`), add one sentence: the `FIGURE[...]`
  marker belongs in the English topic file only, and the illustrate job adds the Urdu `<Figure>` with
  Urdu alt text when it places the image. Export `STAGE_TASK` so `tests/crew/brief.test.mjs` can assert
  the sentence is present for `plan_illustrations` and absent for `author`. Cite the 2026-11-19 C2 digest.
- Must not break: every other stage's text, `brief()`, the media stages.

## Deferred to the owner (no task)

- Deployed SHA mismatch versus review escalation, illustration setting versus prose, desk carry-forward
  reports, shared source excerpts, the existing duplicate tracker rows, the ADR suggestions and CI
  `npm run test:crew`: see `spec.md`, "Not acted on".
