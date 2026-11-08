# Maintenance plan, 2026-W45

One approach per goal in `spec.md`. M1 to M5 touch `scripts/crew/`, a protected path, so those PRs
go to the owner. D1 (`specs/intelligence/registry.md`, `ops/crew/README.md`) is the only task that may
merge on green CI and a passing review.

**Registry ownership.** As in W44, only D1 edits `specs/intelligence/registry.md`, with the IDs fixed
in `intelligence.md` (I-0020 to I-0025). Code tasks do not cite registry IDs in code comments; they
cite this week's task ID (`2026-W45 Mn`) and the digest dates, which already exist on main. That
avoids the W44 cross-branch citation hazard (2026-11-02 C4).

**Shared files.** M1, M2 and M5 each change `scripts/crew/crew.mjs`, in different places: M1 the
`briefRules` function (moved out to `scripts/crew/brief.mjs`) and its import, M2 one condition in
`resolveSharedConflicts`, M5 the author-queue loop in `plan`. Each keeps its logic in its own pure
module so the `crew.mjs` hunk stays a few lines; whichever merges second rebases with no overlap.
M4 owns `intel.mjs`; M3 owns `sync-owner-checkout.sh`. Each code task has its own test file.

## G1: workers measure SVGs, refresh content-status, and distill lands on a worker that can read logs (M1, risk low)

- Move `briefRules` from `scripts/crew/crew.mjs:219-226` to a new pure module
  `scripts/crew/brief.mjs`, exported, unchanged in signature, and import it in `crew.mjs`. `crew.mjs`
  runs on import, so the move is what makes the rule text testable.
- Change the common rule: keep "never run `npm run build` or a dev server", and replace the bare
  "Playwright" ban with "never run the Playwright e2e suite; after adding or editing any SVG, run
  `scripts/heavy.sh node scripts/measure-figure-text.mjs <the svgs>` until it exits 0 (it uses
  Chromium headless, so only through `scripts/heavy.sh`)". AGENTS.md already requires the check;
  `heavy.sh` already enforces the two-slot limit and memory admission (owner ruling 2026-10-13).
- Add one sentence to the common rule: "`static/content-status.json` is git-ignored: run `npm run
  build:content-status` right before `npm run check:content`, and never look it up through git."
  This is I-0011's brief route; it changes no gate script, so no G2 manifest re-opens (2026-11-07 C7).
- Remove `opencode` from `STAGES.intel_distill.chain` in `scripts/crew/workers.mjs:59`. The chain keeps
  `agy`, `codex`, `claude`, `agy_claude`, so the stage still has four workers across three families.
- Tests: `tests/crew/brief.test.mjs` asserts the new sentences for both `self` values, that "never
  run `npm run build`" and "never use `/tmp`" survive, and that the text has no U+2014;
  `tests/crew/worker-chains.test.mjs` asserts `intel_distill` excludes opencode.
- Must not break: the self-maintenance and content variants of the rule, the brief layout other
  briefs depend on, the dispatcher's own heavy-job behaviour, every other stage chain. `heavy.sh` can
  wait up to 30 minutes for admission; a worker waiting there is still inside its job timeout, which
  is hours.

## G2: tracker conflicts resolve by row (M2, risk medium)

- Add a pure helper to `scripts/crew/batch.mjs`, for example `mergeTrackerRows(base, ours, theirs)`,
  that treats each table row whose first two cells are a Unit and a Stage as keyed by
  (Unit, Stage, occurrence number of that key in the file), and every other line as plain text.
  For each keyed row: kept unchanged on both sides, take it; changed or removed on one side only,
  take that side; changed differently on both sides, return null. New keyed rows from both sides
  are kept (ours first) after the last row of the table they were added to. Non-row lines must
  merge under the existing `mergeAppendOnly` rule (insertions only), else null.
- In `resolveSharedConflicts` (`scripts/crew/crew.mjs:846-871`), call the new helper instead of
  `mergeAppendOnly` for course `tasks.md` paths (`mergeAppendOnly` stays exported, and the new helper
  may reuse it for non-row lines); when it returns null the job gets its merge fix as today. Update
  the function's comment, which still says trackers merge only when both sides purely insert.
- Why it is safe: `check:pipeline-gate` takes the last row for a unit and stage as authoritative
  (`scripts/check-pipeline-gate.mjs:136-145`), and a revision appends a new row rather than editing
  the old one, which the occurrence number keeps distinct. Each crew job writes only its own unit's
  rows. `tasks.md` is not a bound review input. The batch gate (`newFindings`) still runs on the
  merged result, so a merge that breaks the gate still excludes the job.
- Medium because it writes course trackers automatically in every batch; a wrong merge could
  record a stage state a unit did not reach. The both-sides-changed rule returns null exactly where
  a person would need to choose.
- Tests must include: two units each rewriting their own `G2` row (merged); both sides rewriting
  the same row differently (null); one side appending a revision row for an existing key (kept as a
  new occurrence); one side deleting a row the other kept unchanged (deleted); a prose line edited
  on one side (null); missing stage (null). Must not break: the glossary merge, the content-status
  branch, `exclusionReason` text (I-0014's signature), the five-fix ceiling, `mergeAppendOnly`'s
  existing tests.

## G3: a blocked owner checkout is reported once and reaches the owner (M3, risk low)

- `scripts/crew/sync-owner-checkout.sh`: keep every refusal exactly as it is (never stash, reset or
  overwrite; always exit 0). Store the last blocked reason (the git message without the behind count)
  in `${CREW_STATE_DIR:-$HOME/.crew/mega-book}/owner-sync.state`. Print the `owner-sync: ... blocked`
  line only when the reason differs from the stored one, or the stored one is more than 24 hours
  old. When the reason first appears or changes, run `node scripts/crew/crew.mjs notify "<one line
  with the behind count and file list>"` once (the command comes from an environment variable with
  that default, so tests can stub it), ignoring its failure. Remove the state file when main is level
  or fast-forwards.
- Update the script's header comment to say so. `ops/crew/README.md` step 1 stays true (it still
  logs to `cron.log`), so M3 does not edit the README; D1 owns it this week.
- Tests: `tests/crew/owner-sync.test.mjs` builds a bare origin and a checkout under a temporary
  directory (the `tests/crew/worktrees.test.mjs` pattern), dirties a tracked file, runs the script
  twice with a stub notify command, and asserts one blocked line and one notify call; then cleans the
  file and asserts a fast-forward and no state file.
- Must not break: the fast-forward path, the not-on-main ref move, the rebase/merge-in-progress
  skips, `tick.sh` (`|| true`).

## G4: harvested review clusters carry the defect; evidence shows recent sources (M4, risk low)

- `reviewSignals` (`scripts/crew/intel.mjs:113-118`): before splitting, strip one leading rubric or
  carry-forward label: `F<n>` or `P<n>` or `R<n>` or `A-<n>` optionally followed by `, blocking`,
  `, uncertain` or `, advisory` and one lower-case area word, ending in `: `; and
  `Previous finding <n>: `, `Prior finding <n> remains: `, `P<n> carried: `. A message that is only a
  label keeps today's behaviour.
- `foldSignals` (`intel.mjs:125-137`): keep the five newest distinct sources (drop the oldest when
  full) instead of the first five.
- Tests in `tests/crew/intel.test.mjs`: the 2026-11-04 C5 examples (`F02 sources: <defect>.` and
  `Previous finding 1: <defect>.`) yield the defect clause; a message without a label is unchanged;
  folding seven sources keeps the last five in order.
- Expected effect: `review:fn sources`-style clusters stop growing and new clusters with defect text
  appear; the harvest treats them as new clusters. No registry row uses those signatures.
- Must not break: `LOG_NOISE` (I-0019), `cronSignals`, `phrSignals`, cluster counting per slot.

## G5: one author job writes the course overview first (M5, risk medium)

- Add a pure helper to `scripts/crew/planner.mjs`, for example `authorQueue(unitsInSpec, onDisk,
  hasOverview)`, returning the unit numbers to queue `author` for: every spec unit not on disk, but
  only the lowest such unit while the course has no `course-overview.mdx` and no unit on disk.
  Use it at `scripts/crew/crew.mjs:175`, computing `hasOverview` from the course's content root (the
  path `prepare-gate-evidence` checks).
- The queued job records that the overview is missing (for example `overview: false` on the job),
  and the brief of that author job says the course has no
  `course-overview.mdx` yet and the job must write it, modelled on an existing course's overview
  (for example `docs/semester-3/gicp-400/course-overview.mdx`), as part of its commit.
- Medium because a gate-red first author job now holds the course's other authors; the lead sees it
  as a red job, and the held count is printed with the existing `held n author job(s)` line or a new
  `waiting for course overview` note on the plan output.
- Tests in `tests/crew/planner.test.mjs`: no overview and no units on disk queues only the lowest
  unit; overview present queues all missing units; no overview but one unit on disk queues the
  rest; the focus rule (`focusCourse`) results are unchanged.
- Must not break: `focusCourse`, the held-author logic for unstarted courses, `stagesFor`.

## G6: registry and crew README match what shipped (D1, risk low)

- `specs/intelligence/registry.md`: set I-0015 to I-0019 to `adopted`, slot `2026-11-01-12` (all
  merged 2026-11-01 between 10:13 and 10:20 PKT; the crew's tick pulls main within 15 minutes, before
  the 12:00 harvest). Set I-0011 to `proposed` with home `scripts/crew/brief.mjs` (`briefRules`).
  Add I-0020 to I-0025 exactly as `intelligence.md` lists them, status `proposed`. Change no other row.
- `ops/crew/README.md` step 5 (lines 54-61): say that before excluding a job the batch resolves
  conflicts confined to `glossary.json`, `static/content-status.json` and course `tasks.md` files
  itself (`resolveSharedConflicts` in `scripts/crew/crew.mjs`, `scripts/crew/batch.mjs`), and only an
  unresolved conflict gets a merge fix; describe the tracker rule in words that stay true whether or
  not M2 has merged (for example "when the two sides' changes can be combined").
- Must not break `npm run check:docs-sync`. No em dash.

## Deferred to the owner (no task)

- G3 signing host (ADR suggestion), review-evidence binding fixes, `measure-figure-text` left-edge
  check, `--check-parity`, CI `npm run test:crew`: see `spec.md`, "Not acted on".
- Owner checkout: commit or discard the edits to `README.md`, `package.json` and `package-lock.json`
  in `~/mega_book_for_B.Ed` (the other two files already match main), so owner-sync can resume.
