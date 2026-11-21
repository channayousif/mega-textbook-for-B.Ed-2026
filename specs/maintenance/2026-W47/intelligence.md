# Intelligence decisions, 2026-W47

Read: `specs/intelligence/daily/2026-11-15.md` through `2026-11-21.md` (every digest since the W46
window closed on 2026-11-15; `2026-11-14.md` was read by W46 and is re-read only where a candidate
recurred) and `specs/intelligence/registry.md` (I-0001 to I-0030). A candidate is promoted only with
recurrence on two or more days and evidence a reviewer can open. Registry changes below are made by
task D1 alone, with IDs fixed here. This survey edits nothing outside `specs/maintenance/2026-W47/`.

A caution for reading this week's digests: the 2026-11-15 to 2026-11-18 digests still describe the
image-quota churn that PR #629 ended on 2026-11-16, and the 2026-11-15 digest predates the W46 task
merges. Their effect lines are re-read below against the board and the merge times.

## Promoted

| Candidate (digests) | Task | Registry row D1 adds (status `proposed`) |
|---|---|---|
| A lowercase course code fails `prepare-gate-evidence` with `invalid unit or stage` (2026-11-19 C4, 2026-11-20 C5) | M1 | I-0032 "Accept a lowercase course code in prepare-gate-evidence", kind crew fix, home `scripts/prepare-gate-evidence.mjs`, signature `invalid unit or stage`, evidence "2026-W47 M1; 2026-11-19 C4 and 2026-11-20 C5; workers passed lowercase course codes from briefs and lost a turn" |
| Local SVG geometry passes while CI's DejaVu fallback fails Urdu figures (2026-11-13 C5, 2026-11-19 C3) | M2 | I-0033 "Give measure-figure-text a CI font mode", kind gate or check, home `scripts/measure-figure-text.mjs`, signature `failure modes observed: urdu subheadings and long body lines overflow their columns under ci's dejavu fallback; local playwright passes because it resolves the`, evidence "2026-W47 M2; 2026-11-13 C5 and 2026-11-19 C3; PR #642 went red after passing locally" |
| A provider config or auth failure spends a job's attempts (2026-11-14 C1, 2026-11-19 C1) | M3 | I-0034 "Cool the worker and refund the attempt on a provider config or auth failure", kind crew fix, home `scripts/crew/workers.mjs`, `reapOne` in `scripts/crew/crew.mjs`, signature `error: the 'gpt-n.n-sol' model is not supported when using codex with a chatgpt account.`, evidence "2026-W47 M3; 2026-11-14 C1 and 2026-11-19 C1; 5 two-line logs across 3 jobs; efpg-401-u03-translate lost attempts 1 and 2" |
| Two branches adding the same unit-stage row differently merge into a duplicate (2026-11-15 C4, 2026-11-16 C4, 2026-11-17 C4) | M4 | I-0035 "Return a tracker conflict when both sides add the same unit-stage row differently", kind crew fix, home `scripts/crew/batch.mjs` (`mergeTrackerRows`), signature `has two unit n gn rows`, evidence "2026-W47 M4; 2026-11-15 C4, 2026-11-16 C4 and 2026-11-17 C4; gict-300 Unit 4 and gqur-301 Unit 7 duplicates" |
| The plan_illustrations brief is silent on the Urdu topic files, so workers split (2026-11-19 C2) | M5 | I-0036 "Tell plan_illustrations jobs not to edit the Urdu topic files", kind crew brief, home `scripts/crew/crew.mjs` (`STAGE_TASK.plan_illustrations`), signature `the urdu topic files carry the new markers with the english prompt and alt text. the illustrate job should turn them into <code> elements with urdu alt text.`, evidence "2026-W47 M5; 2026-11-19 C2; 7 handoffs from 7 plan jobs" |

## Registry status changes (D1)

Slot is the first harvest (`00` or `12`, Asia/Karachi) after the change was live; the crew's tick pulls
main every 15 minutes.

| Row | Change | Slot | Basis |
|---|---|---|---|
| I-0026 | `proposed` to `adopted` | 2026-11-15-12 | #593 merged 2026-11-14 22:01 UTC (03:01 PKT 2026-11-15) |
| I-0027 | `proposed` to `adopted` | 2026-11-15-12 | #588 merged 2026-11-14 21:31 UTC (02:31 PKT 2026-11-15) |
| I-0028 | `proposed` to `adopted` | 2026-11-15-12 | #589 merged 2026-11-14 21:32 UTC (02:32 PKT 2026-11-15) |
| I-0029 | `proposed` to `adopted` | 2026-11-15-12 | #590 merged 2026-11-14 21:33 UTC (02:33 PKT 2026-11-15) |
| I-0030 | `proposed` to `adopted` | 2026-11-15-12 | #594 merged 2026-11-14 22:02 UTC (03:02 PKT 2026-11-15) |
| I-0031 | new, `adopted` | 2026-11-17-00 | PR #629 (`d5718dc7a`, merge `9f7e84daf`) merged 2026-11-16 17:03 PKT; image-quota stage cooldown and PHR-only rejection, `scripts/lib/image-quota.mjs` and `imageQuotaRequeue` in `scripts/crew/crew.mjs` |
| I-0032 to I-0036 | new, `proposed` | | exactly as the Promoted table lists them |

## Deferred

- **Existing duplicate tracker rows** (`specs/content/gict-300/tasks.md`, `specs/content/gqur-301/tasks.md`):
  M4 stops new duplicates at the merge, but cleaning the rows already on main is content work outside
  maintenance scope. The lead or owner should schedule it.
- **Agent reference is stale** (W46 F7, third week): "Active Technologies" ends at 017 and "Recent
  Changes" lists only 001. No reader has hit it and the docs slot goes to D1. Recheck next week.
- **Deployed SHA mismatch forces premature review escalations** (2026-11-16 C1): one day, but the
  consequence is expensive (an escalate blocks translate). Whether an unavailable `render-review` should
  be an advisory note or an escalation is a governance call for the owner.
- **Illustration setting versus prose geography** (2026-11-14 C4, 2026-11-19 C6): a content standard
  question for the owner.
- **gflow structlog TypeError masks a billed-clip error** (2026-11-21 C1): the repository-side recovery
  landed in Feature 030 (`scripts/media/producers/gflow-video.mjs:128-209`); the logging bug is in the
  external gflow CLI.
- **Presenter identity drift across teaser shots** (2026-11-21 C2): one day; a recipe v2 enhancement
  (Flow Character ingredient) for the owner.
- **render-inspect tests SVG geometry on WebP raster illustrations** (2026-11-20 C1): one day; a small
  filter in `scripts/render-inspect.mjs` Section D, recheck next week.
- **Surface the image-quota hold in the daily digest** (2026-11-17 C2, 2026-11-18 C2): two days, but the
  hold is already on `BOARD.md` and the digest is cosmetic; low value.
- **Phantom tracker rows citing report files that do not exist** (2026-11-20 C7): one day; the sample
  was an interrupted review. Recheck.
- **In-place figure edits and CDN caching** (2026-11-20 C8): one day; a deployment or owner decision.
- **Depth budgets omit the index and assessment allowance** (2026-11-20 C3): one day; the Semester 4
  specs were corrected before commit. Recheck.
- **Intake catalog-binding assumption** (2026-11-20 C2): one day; an `evaluate-intake` skill update,
  owner territory while the style guide is frozen.
- **Course design rules recur as intake escalations** (2026-11-20 C4): one day; D-2026-0093 records the
  standing rules, and the style guide is frozen, so the owner decides.
- **OpenClaw gateway transport timeout** (2026-11-18 C1): one day; cron log pollution, low impact.
- **Unsupported Codex model name** (2026-11-19 C1): the live incident is over (the config was changed);
  M3 closes the gap so the next bad name cools the worker.
- **Illustrate and author jobs time out at 3 h while queuing for heavy slots** (2026-11-19 C5): one day;
  needs a measurement of the `heavy.sh` admission wait before changing `CREW_JOB_TIMEOUT`.
- **CI does not run `npm run test:crew`** (W46 carry-forward): owner-only file, fifth week.

## Rejected

- **G3/G5 signing runner and review-cycle re-authorisation** (W46 carry-forward): ADR suggestions for
  the owner, not maintenance tasks.
- **Image-quota churn** (2026-11-15 C1, 2026-11-16 C2, 2026-11-17 C2, 2026-11-18 C2): fixed by PR #629;
  recorded as I-0031 so the harvest can measure it.
- **PHR-only commits count as success** (2026-11-17 C3, 2026-11-18 C3): fixed by PR #629 and the I-0002
  detector; open PR #682 extends the guard to retries that inherit commits.
- **Distill handoff echoes** (2026-11-15 C3): fixed by I-0028; 0 echoes in every later digest.
- **Media work holds the course focus** (2026-11-21): fixed by `a8ae7da6c` (2026-11-21).
- **gflow paid-clip loss** (2026-11-20 C6): fixed by the Feature 030 producer contract and its
  `recover()` path; only the external logging gap remains (Deferred).
- **Opencode on intel_distill** (W46 carry-forward): fixed by I-0025; agy ran every distill this week.

## Effects of adopted items

- I-0001, I-0005, I-0006, I-0007, I-0009, I-0011, I-0016, I-0019, I-0022: 0 signals in every digest
  2026-11-15 to 2026-11-21. Worked.
- I-0002 (fix job must commit): one signal on 2026-11-20 (`giss-401-u05-translate-r1`); the detector
  fired correctly. Open PR #682 extends it to retries that inherit an earlier attempt's commits.
- I-0008 (inside the worktree): 0 signals. Worked.
- I-0010, I-0018 (hold translate): no translation started on an unrepaired G3 this week. Worked.
- I-0013 (cool on provider reset): the image quota was parsed and held; PR #629 extended the same
  handling to the tool quota. Worked.
- I-0017 (reviewed flip): 0 pipeline-gate failures in the window. Worked.
- I-0020 (SVG geometry check in the brief): 0 figure-geometry CI failures except the 2026-11-19 PR #642
  case, which is the CI-font gap (M2). Mostly worked.
- I-0021 (row merge): 0 batch exclusions since adoption. Worked.
- I-0023 (review labels): numbered labels resolved. Worked.
- I-0024 (overview first): 0 overview collisions. Worked.
- I-0025 (opencode off distill): 0 distill rejections; agy ran every distill. Worked.
- I-0026 (summary and status merge): 0 batch exclusions since 2026-11-15. Worked.
- I-0027 (close decisions on landing): the board reads "Needs you: nothing"; C-017 to C-021 are closed.
  Worked.
- I-0028 (skip digest handoffs): 0 distill echo clusters. Worked.
- I-0029 (G2 refresh after English edits): 0 pipeline-gate failures from 2026-11-19 onward. Worked.
- I-0030 (reports one folder down): EFMP-407 U7 and GQUR-301 U16 were found and their cycle counts
  updated. Worked.

## Retirement

- None. I-0015 and I-0012 remain the only retired rows; every adopted row's signal is either gone
  (the fix worked) or still worth watching.
