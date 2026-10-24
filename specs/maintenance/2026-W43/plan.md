# Maintenance plan, 2026-W43

One approach per goal in `spec.md`. Four of the six tasks touch `scripts/crew/`, a protected path,
so their PRs go to the owner. M1, M3 and M4 all edit `scripts/crew/crew.mjs` in different functions
(`prepareWorktree`/`briefRules`/`resolveSharedConflicts`, `cool`/`reapOne`, `batchPhase`); keep each
hunk inside its function so the PRs merge in any order. M1 to M4 each append one row to
`specs/intelligence/registry.md`; append at the end of the table and keep main's rows as they are.

## G1: current, untracked content-status in every worktree (M1, risk medium)

- `git rm --cached static/content-status.json`; `.gitignore:16-18` already ignores it, so it stays
  ignored afterwards. Do not delete the generator or the gate.
- `prepareWorktree` runs `node scripts/report-content-status.mjs` (allowFail, as `gateFindings`
  does) after creating or reusing a worktree, so the worker's first `check:content` sees a current
  file.
- `resolveSharedConflicts` must handle the modify/delete conflict that every branch still carrying
  the tracked file will hit once main stops tracking it: for `static/content-status.json` keep it
  untracked (`git rm --cached --ignore-unmatch`) and regenerate, instead of `git checkout --ours`,
  which fails when "ours" deleted it.
- Add to the common brief rule (`briefRules`): keep scratch, backup and review-prepare output inside
  the worktree (for example `.crew/tmp/`), never `/tmp`, because headless runs reject paths outside
  the worktree.
- Medium because it changes how every job starts and how batches resolve conflicts, and
  `scripts/` is protected (owner PR).
- Must not break: CI (`ci.yml:123`, `:257` already generate the file before checking it), the
  production build (the prestart hook regenerates it), `gateFindings`, the batch gate, any review
  evidence (no `input_manifest` names the file).

## G2: no translate behind an unrepaired `revise` (M2, risk low)

- In `stagesFor` (`scripts/crew/planner.mjs:21-33`), do not push `translate` while
  `u.gates.G3 !== 'done'` and the latest G3 report is `revise` and not repaired (`!f.g3Repaired`).
  `repair_en` is already planned in that case; translation follows once the repair lands.
- Leave `escalate` and units without a G3 report unchanged: English-first publication with draft
  mirrors is allowed (ADR-0022), and escalated units wait for the owner anyway.
- Must not break: the existing planner tests, the I-0004 mirror-completeness rule, `awaitingG3`.

## G3: ADR register (A1, risk low)

- Generate `history/adr/README.md` exactly as `.claude/skills/weekly-maintenance/references/adr-register.md`
  says: clusters first, then one row per ADR file in number order. Note that 0028 is not in the
  sequence, without inventing a reason.
- Status lines record later amendments (for example ADR-0024 amended by 0029 and 0030).
- Must not change any ADR's Decision, Consequences or Alternatives; ADR file edits limited to broken
  links and missing back-links. Always an owner PR (protected path).

## G4: crew README matches the code (D1, risk low)

- `ops/crew/README.md`: five workers, not four (`:3`, `:20`); remove the duplicated
  `gh pr merge --admin` sentence in step 6 (`:53-56`); name `npm run test:crew` as the crew's test
  command. Verify each number against `scripts/crew/workers.mjs` and `package.json`.
- Prefer deleting stale text to adding caveats. Must not break `npm run check:docs-sync`.

## G5: conflicting files in the exclusion reason (M4, risk low)

- Before `git merge --abort` in `tryMerge` (`scripts/crew/crew.mjs:813-821`), read
  `git diff --name-only --diff-filter=U` and pass the list to a pure helper in
  `scripts/crew/batch.mjs` (for example `conflictReason(branch, files)`) that builds the message,
  listing at most a few paths.
- Keep the message's start "`<branch>` conflicts with main" unchanged, so the
  intelligence signature that registry readers already track still matches.
- Must not change which jobs join a batch, the five-fix ceiling, or `resolveSharedConflicts`.

## G6: provider-aware cooldown and a green crew suite (M3, risk medium)

- Add a pure `resetMinutes(text)` to `scripts/crew/workers.mjs` that parses the relative form seen
  in the logs (`Resets in 63h26m50s`, `resets in 2h5m`) and returns minutes, or null when the text
  has no parseable relative reset. Cap at 7 days so a garbled number cannot park a worker for ever.
- `cool()` uses the larger of the strike cooldown and the parsed reset; unparseable or absolute
  clock forms (`resets 11pm`, `try again at 7:00 AM`) keep the strike cooldown.
- Fix the stale expectation in `tests/crew/workers.test.mjs:17-21` (the chain after claude is now
  `agy_claude`), and add `resetMinutes` tests from the quoted log lines.
- Medium because a wrong parse can keep a healthy worker idle for days; the cap and the
  fallback bound that. The `health <worker> ok` command (`crew.mjs` `health`) still clears it.
- Must not break: `QUOTA_RE` matching, the attempt refund on a limit, `pickWorker`'s cooling
  exclusion.

## Deferred to the owner (no task)

- Run `npm run test:crew` in CI (`.github/workflows/ci.yml`, owner-only).
- G2 manifest refresh after English edits and render-severity guidance in `review-unit`: both touch
  the review evidence contract (ADR-0019, ADR-0027).
- ADR suggestion on the 2026-10-19 batching and self-maintenance rulings (see `spec.md`).
