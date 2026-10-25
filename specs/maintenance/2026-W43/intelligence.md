# Intelligence decisions, 2026-W43

Read: `specs/intelligence/daily/2026-10-20.md`, `2026-10-21.md`, `2026-10-22.md`, `2026-10-23.md`,
`2026-10-24.md` (every digest since 2026-10-17) and `specs/intelligence/registry.md` (I-0001 to
I-0008). A candidate is promoted only with recurrence on two or more days and evidence a reviewer
can open. Registry rows below are what the named task adds; this survey edits nothing outside
`specs/maintenance/2026-W43/`.

## Promoted

| Candidate (digests) | Task | Registry row to add or change |
|---|---|---|
| Fresh worktrees run gates on a missing content-status file: I-0007 (10-20 C1, 10-21 C2, 10-22 C1, 10-23 C1, 10-24 C1) | M1 | I-0007: status `candidate` to `proposed`, home `scripts/crew/crew.mjs` (`prepareWorktree`), signature unchanged (`✗ <path> is missing. run: npm run build:content-status`) |
| The tracked copy of content-status goes stale on main (10-24 C1; also 10-21 C9, git pathspec errors on the generated file) | M1 | new, `proposed`: "Stop tracking `static/content-status.json`", kind crew fix, home `static/content-status.json` (untracked) and `resolveSharedConflicts`, signature `✗ <path> is stale - it no longer describes the working tree.` |
| Workers write scratch files to `/tmp` and the tool call is rejected: I-0008 (10-20 C2, 10-21 C8, 10-24 C5) | M1 | I-0008: status `candidate` to `proposed`, home `scripts/crew/crew.mjs` (`briefRules`), signature unchanged |
| Translation queued behind open English G3 defects (10-21 C4, 10-23 C6, 10-24 C8) | M2 | new, `proposed`: "Hold translate while the latest G3 report is an unrepaired revise", kind planner fix, home `scripts/crew/planner.mjs` (`stagesFor`), signature `separate english author must resolve gn fn-fn before translation resumes.` |
| Provider quota resets span days, cooldown does not (10-22 C5, 10-23 C3) | M3 | new, `proposed`: "Cool a worker until the provider's stated reset", kind crew fix, home `scripts/crew/workers.mjs` (`resetMinutes`), `cool()`, signature `error: individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns.` |
| Concurrent branches conflict in the hourly batch (10-20 C7, 10-21 C1, 10-22 C3, 10-24 C4) | M4 (first step only) | new, `proposed`: "Name the conflicting files in a batch exclusion", kind crew fix, home `scripts/crew/batch.mjs`, `batchPhase`; signature empty (a diagnostic does not lower the signal). Serialising branches by shared file waits until a week of named conflicts shows which files matter; M1 removes one of them. |

## Deferred

- **English edits leave the G2 manifest stale** (10-20 C3, 10-22 C2, 10-23 C2, 10-24 C3; 32 board
  failures by 10-24). Strong recurrence, but any reseal or refresh rule touches the review evidence
  contract (ADR-0019, ADR-0027, Feature 014), and 10-22 C2 already warns against automatic
  resealing. Needs an owner ruling on who may refresh G2 and when.
- **Render inspection unavailable under the host limits** (10-21 C5, 10-22 C4, 10-24 C6). The
  digests disagree: 10-22 says escalation is the correct outcome under `review-unit`, 10-24 says it
  should be advisory. The skill is the evidence contract, so this is an owner decision, not a
  maintenance task.
- **Repo-level gates fail on sibling units during reviews** (10-20 C8, 10-21 C6). No signal after
  2026-10-21; recheck next week before adding `--unit` flags to gate scripts.
- **Harvester counts code and quoted text as errors** (10-20 C9, 10-21 C7; ADR-0024 quote noise in
  10-24). Real and cheap (`LOG_NOISE` in `scripts/crew/intel.mjs`), but it only affects digest
  noise; it lost the six-row cut to fixes that save worker turns. First candidate for W44.
- **Translate-unit's temporary `reviewed` flip trips `check:pipeline-gate`** (10-24 C2, 11
  signals). Seen on one day only. Registry: add as `candidate` (skill, home
  `.claude/skills/translate-unit/SKILL.md`, signature `n of n content gates failed: check:pipeline-gate.`)
  in the next registry-touching PR; promote in W44 if it recurs.
- **Edit calls fail on a mismatched `oldString`** (10-23 C4, 10-24 C9; 5 in total). The tool already
  reports the error and the worker retries; a written rule would not change CLI behaviour. Watch.
- **Review evidence changed after preparation** (10-23 C5). One day; the stale-manifest half is the
  G2 item above.
- **Duplicate glossary terms in author jobs** (10-24 C7). One day; I-0006 already blocks the damage.
- **Vocabulary advisories in G5** (10-20 C10, 10-21 C10). No signal after 2026-10-21, and the
  terminology bank is a frozen owner artifact.
- **Figure `.ur.svg` and dark-variant gaps** (10-20 C5). One day, 3 signals.
- **Exit without committing on already satisfied tasks** (10-20 C4). 10-23 found the wrapper mixes
  causes (quota, content-status, idle runs); M1 and M3 remove two of them. Recheck after they land.
- **ADR-0019 two-cycle exhaustion stalls units** (10-21 C3). Needs an owner escalation path; no new
  evidence after 2026-10-21.

## Rejected

- **Unbanked domain terms** (10-20 C6): banking terms is a curriculum-owner content decision, not
  self-maintenance.
- **Separate fix for git operations on the generated file** (10-21 C9): the same cause as the stale
  tracked copy; folded into M1.

## Effects of adopted items

- I-0001 (reap each job alone): signal at 0 since adoption (10-20, 10-21, 10-24). Worked.
- I-0002 (fix job must commit): detector; 22 firings by 10-24, catching idle runs as designed.
- I-0003 (judge only fresh checks): no measurable signal in any digest; no claim.
- I-0004 (planner from real verdicts and mirrors): no regression shown (10-22, 10-23); F3 in
  `spec.md` is a separate gap it did not cover.
- I-0005 (regenerate content-status before the batch gate): worked. Board history shows 32 batch
  exclusions for "fails npm run check:content" on 2026-10-19 and none on any later day; digests
  10-20 to 10-24 agree.
- I-0006 (shared registry guard): worked; blocked duplicate glossary keys from
  `job:gsos-301-u03-author` on 2026-10-24.

## Retirement

None proposed. I-0001's signal is gone, but its home (`reap` in `scripts/crew/crew.mjs`) still
needs the per-job isolation; the others are either detectors or too recent to judge.
