# Maintenance spec, 2026-W47

Survey window: 2026-11-15 to 2026-11-22 (origin/main at `178a61188`). Inputs: `git log --since=2026-11-15`
on origin/main (481 commits, 297 non-merge, 37 in `scripts/`), the 2026-W46 survey
(`specs/maintenance/2026-W46/`), `specs/intelligence/daily/2026-11-15.md` through `2026-11-21.md`
(`2026-11-14.md` was read by W46 and is re-read here only where a candidate recurred),
`specs/intelligence/registry.md` (I-0001 to I-0030), the crew board and `cron.log` (read 2026-11-22
02:10 PKT) and the standing checks in `.claude/skills/weekly-maintenance/references/survey-checklist.md`.

## Findings

### F1. All five W46 code tasks and D1 merged on 2026-11-15; the registry still lists I-0026 to I-0030 as proposed
- **Evidence:** PRs #588 (M2), #589 (M3), #590 (M4), #592 (D1), #593 (M1) and #594 (M5) merged between
  21:31 and 22:02 UTC on 2026-11-14, that is 02:31 to 03:02 PKT on 2026-11-15. The code is live:
  `scripts/crew/batch.mjs:118` (I-0026), `scripts/crew/decisions.mjs:6` (I-0027),
  `scripts/crew/intel.mjs:122` (I-0028), `scripts/crew/brief.mjs:5` (I-0029) and
  `scripts/crew/review-facts.mjs:16` (I-0030). `specs/intelligence/registry.md:47-51` still shows all
  five as `proposed` with an empty **Adopted** slot.
- **Why it matters:** the harvest measures only `adopted` rows, so five live fixes are unmeasured and
  the digests cannot report their effect. The W46 D1 task added the rows; the W47 D1 task must close them.

### F2. `prepare-gate-evidence` rejects a lowercase course code
- **Evidence:** `scripts/lib/review-evidence.mjs:183` validates the course with `^[A-Z]{2,4}-\d{3}(--)?$`,
  and `scripts/prepare-gate-evidence.mjs:148,152` passes the raw argument through. Briefs and paths use
  lowercase (`efpg-401`), so the worker loses a turn on `invalid unit or stage`. Dailies 2026-11-19 C4
  and 2026-11-20 C5 (two handoffs on different courses, plus the 2026-11-19 repair PHR).
- **Why it matters:** the W46 M4 brief rule tells every content job to run this command, so the casing
  gap now hits exactly the jobs the rule targets. One line fixes it.

### F3. The mandatory local SVG check disagrees with CI on Urdu figures
- **Evidence:** CI's `figure-geometry` job runs `node scripts/measure-figure-text.mjs --changed <base>`
  (`.github/workflows/ci.yml:99`) on a runner whose fallback face is DejaVu Sans. The script
  (`scripts/measure-figure-text.mjs:69`) measures with whatever fonts the local Playwright resolves,
  normally Noto Nastaliq, and has no flag to force the CI face. Dailies 2026-11-13 C5 and 2026-11-19 C3
  (PR #642 went red after passing locally; the fix job hand-built a DejaVu-forced copy). W46 deferred
  this with "recheck next week"; it recurred.
- **Why it matters:** a worker can follow the brief's mandatory local run, see exit 0, and still get a
  red PR and a CI-fix job. The check that is supposed to prevent the defect cannot reproduce CI.

### F4. A provider config or auth failure spends a job's attempts as if it were bad work
- **Evidence:** `QUOTA_RE` (`scripts/crew/workers.mjs:74`) matches rate, quota, capacity and 429 text,
  but not `model is not supported when using Codex with a ChatGPT account`, `Failed to authenticate`
  or `UNAUTHENTICATED (code 401)`. `reapOne` (`scripts/crew/crew.mjs:870-877`) only refunds the attempt
  and cools the worker on `QUOTA_RE`; anything else counts as a failed attempt and retries. Dailies
  2026-11-14 C1 (two Cloudflare auth blocks) and 2026-11-19 C1 (5 two-line logs across 3 jobs;
  `efpg-401-u03-translate` lost attempts 1 and 2 before attempt 3 landed on another worker). W46
  deferred the 2026-11-14 case with "one day each. Recheck next week"; it recurred.
- **Why it matters:** a bad model name or a transient auth block burns all three attempts and leaves the
  job `gate_red` for the lead, when the worker isn't at fault and the next worker would likely succeed.

### F5. Two branches adding the same unit-stage row differently merge into a duplicate row
- **Evidence:** `mergeTrackerRows` (`scripts/crew/batch.mjs:207-209`) keeps a new keyed row from both
  sides and only skips theirs when the lines are identical. When ours and theirs each add a row with the
  same Unit and Stage key but different text, both are kept, producing two rows for one stage. The
  pipeline gate reads the last row, so evidence pointed at the first is invisible. Dailies 2026-11-15 C4,
  2026-11-16 C4 and 2026-11-17 C4; live examples in `specs/content/gict-300/tasks.md` (Unit 4 G3) and
  `specs/content/gqur-301/tasks.md` (Unit 7 G2).
- **Why it matters:** duplicate rows split gate pointers and force workers to repoint both, which is
  how a finished unit can still read as unfinished.

### F6. The `plan_illustrations` brief is silent on the Urdu topic files
- **Evidence:** `scripts/crew/crew.mjs:337` tells the worker to add the `FIGURE[...]` marker "in the
  English topic file" and says nothing about the Urdu mirror. Daily 2026-11-19 C2: 7 handoffs from 7
  plan jobs, with workers splitting between copying the marker into Urdu (EFPG-401 U3/U5, GQUR-301
  U15/U16) and adding nothing (GSOS-301 U1/U2), leaving illustrate to cope with both states.
- **Why it matters:** the generate-figures skill already makes the placing job write the Urdu `<Figure>`;
  the brief should say so once instead of letting every plan job rediscover the rule.

### F7. CI still does not run the crew's own tests
- **Evidence:** `.github/workflows/ci.yml:216` runs `npm test`, which `vitest.config.ts:10` limits to
  `tests/unit/**/*.test.mjs`; `:219` runs `npm run test:review`. There is no `npm run test:crew`, and
  `package.json:42` defines it. W46 flagged this as the fourth week; this is the fifth.
- **Why it matters:** a crew regression such as the retry-accepts-prior-commits bug (open PR #682) is
  not caught by CI. The CI file is owner-only, so this is a proposal, not a task.

### F8. `.specify/memory/agent-reference.md` is two weeks stale
- **Evidence:** "Active Technologies" (`.specify/memory/agent-reference.md:231-261`) ends at
  `017-reviewer-role`; "Recent Changes" (`:263-264`) lists only `001-content-platform`. Feature 029
  (Notebook Studio), Feature 030 (Media Studio), ADR-0036 and ADR-0037, D-2026-0093 and D-2026-0094 and
  the multi-producer illustration route are all absent. W46 F7 deferred it twice.
- **Why it matters:** it is the background every new agent reads. Deferred again: no reader has hit it,
  and this week's docs slot goes to F1.

### F9. Feature 030 Media Studio landed; the docs and tests kept up
- **Evidence:** `scripts/media/` (states, ledger, brand, recipes, producers, status, teaser-clips, qg2),
  `scripts/crew/media.mjs`, ADR-0037 and D-2026-0094, with `ops/crew/README.md:165-182` and the AGENTS.md
  media sections updated in the same PRs. Tests exist: `tests/crew/media-stages.test.mjs` and
  `tests/unit/media-*.test.mjs`. `node --test tests/crew/*.test.mjs` passes 150 with 0 failures.
- **Why it matters:** the week's largest change is documented and tested; the survey records it so the
  next intake of intelligence starts from the new architecture.

### F10. gflow paid-clip recovery is implemented in Feature 030
- **Evidence:** `scripts/media/producers/gflow-video.mjs:128-209` journals every submission, recovers a
  journalled clip via `gflow_download_media` before any retake, and throws with the submission intact.
  Dailies 2026-11-20 C6 and 2026-11-21 C1 describe the pre-Feature-030 behaviour. The remaining
  `structlog` TypeError is inside the external gflow CLI, not this repository.
- **Why it matters:** the candidate is largely addressed; only the external logging gap remains.

### F11. Open PR #682 fixes a retry that discards an earlier attempt's commits
- **Evidence:** `gh pr view 682` (branch `fix/crew-retry-prior-commits`): `efpg-401-u01-plan_illustrations`
  went `gate_red` after attempt 1 committed and died on an auth error, and every retry found nothing new
  to commit, which `finishSuccess` read as failure. The PR adds a pure `workMade` helper in
  `scripts/crew/checks.mjs`. It is not in the registry.
- **Why it matters:** a real crew integrity gap, already fixed in an open PR. No task is queued, because
  a task would conflict with the PR; the registry should record the lesson once it merges.

### F12. The image-quota stage cooldown landed outside the survey and is not in the registry
- **Evidence:** PR #629 (`d5718dc7a`, merge `9f7e84daf`) merged 2026-11-16 17:03 PKT and added
  `scripts/lib/image-quota.mjs` plus `imageQuotaRequeue` (`scripts/crew/crew.mjs:836-857`), which holds
  `illustrate` when every producer is out and rejects PHR-only output. Dailies 2026-11-15 C1,
  2026-11-16 C2, 2026-11-17 C2 and 2026-11-18 C2 describe the churn it ended. `specs/intelligence/registry.md`
  has no row for it.
- **Why it matters:** it is a lasting change the digests already reference; a registry row lets the
  harvest report whether the quota signal actually fell.

### F13. Standing checks
- **Crew tests:** `node --test tests/crew/*.test.mjs`: 150 pass, 0 fail (W46: 119). No test gap in the
  new media core.
- **ADR register:** `history/adr/README.md` has 37 files and 37 rows; every linked ADR resolves and every
  ADR carries a status line. No task.
- **PHR hygiene:** 190 PHRs added since 2026-11-15; none is missing a Handoff section. Duplicate numeric
  ID prefixes across `history/prompts/*/` persist (recorded only, as in W46).
- **Gaps:** `specs/gaps.md` carries resolved status lines for G-2026-156, -165, -175, -185, -196, -205
  and G-2026-211 to -214, all closed by D-2026-0093. No obsolete item found.
- **Growth:** `scripts/crew/crew.mjs` is 1,731 lines; `scripts/crew/*.mjs` plus `scripts/media/*.mjs` and
  `scripts/media/producers/*.mjs` total 5,552 lines. The new media modules are tested; `crew.mjs` gained
  the media planner, owner commands and requeue paths.
- **Red jobs:** 0 on the board at 2026-11-21 21:08 UTC; 1400 merged, 2 running, 6 queued, 1 ready.
- **Dead code:** W46 M1 deleted `mergeAppendOnly`; no new dead export found this week.

### Not acted on this week (owner territory)
- **Deployed SHA mismatch forces premature review escalations** (2026-11-16 C1): `planner.mjs` queues
  `review_en` before the unit's commit reaches production, and the reviewer's `render-review` unavailable
  finding forces an escalate that blocks translate. One day. Whether an unavailable render should be an
  advisory note or an escalation is a governance call.
- **Illustration setting versus prose geography** (2026-11-14 C4, 2026-11-19 C6): a content standard for
  the owner, not a maintenance task.
- **Desk carry-forward reports and shared source excerpts** (W46 carry-forward): bound gate code and the
  ADR-0032 sign-off ledger; owner decisions.
- **Existing duplicate tracker rows** (`specs/content/gict-300/tasks.md`, `specs/content/gqur-301/tasks.md`):
  the code fix in M4 stops new ones; cleaning the existing rows is content work outside maintenance scope.
- **ADR suggestions:** the review-cycle re-authorisation protocol and the G3/G5 signing runner (W46 carry-
  forward), plus a possible ADR for D-2026-0093's standing intake rules.
- **CI `npm run test:crew`:** owner-only file, fifth week.

## Goals for this week

- **G1.** The registry records W46's adoptions, the image-quota fix and this week's proposals (F1, F12).
- **G2.** `prepare-gate-evidence` accepts a lowercase course code (F2).
- **G3.** `measure-figure-text` can reproduce CI's font fallback (F3).
- **G4.** A provider config or auth failure cools the worker and refunds the attempt (F4).
- **G5.** Two branches adding the same unit-stage row differently raise a merge conflict, not a duplicate (F5).
- **G6.** The `plan_illustrations` brief states the Urdu rule once (F6).
