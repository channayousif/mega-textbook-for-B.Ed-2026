# Maintenance plan, 2026-W46

One approach per goal in `spec.md`. M1 to M5 touch `scripts/crew/` or `scripts/`, protected paths, so
those PRs go to the owner. D1 (`specs/intelligence/registry.md`, `ops/crew/README.md`) is the only task
that may merge on green CI and a passing review.

**Registry ownership.** As in W44 and W45, only D1 edits `specs/intelligence/registry.md`, with the IDs
fixed in `intelligence.md` (I-0026 to I-0030). Code tasks cite their task ID (`2026-W46 Mn`) and the
digest dates in comments, never registry IDs.

**Shared files.** M2 and M5 both change `scripts/crew/crew.mjs`, in different places: M2 the
`MERGED`/`CLOSED` branches of `managePrs` (around line 1002), M5 `latestReport` (lines 86-93) and the
`review_en`/`review_ur` stage text (lines 221-223). M1 owns `batch.mjs`, M3 `intel.mjs`, M4 `brief.mjs`.
Each code task has its own test file or adds to one no other task touches this week.

## G1: summary tables and status lines merge in the batch (M1, risk medium)

- In `trackerLines` (`scripts/crew/batch.mjs:114-139`), also key rows of a table whose header has a
  `Unit` column but no `Stage` column, by (Unit, occurrence number); rows of Unit-and-Stage tables keep
  their current key. Use a different key prefix so a summary key can never equal a stage key.
- Treat the course status block as one unit: the line starting `## Status:` plus every following line
  up to the next line starting `## `. If only one side changed the block, take that side; if both
  changed it differently, take ours (stage 2, the batch branch built from main). This matches what
  merge-fix workers already do ("never change main's entry", 11-12 C4); the block is prose that no
  gate reads (`grep "Status:" scripts/*.mjs scripts/lib/*.mjs` finds no tracker parser), and each
  unit's own rows still carry its state.
- Delete `mergeAppendOnly` and its three tests: nothing imports it since #498 (spec F7); update the
  `mergeTrackerRows` comment that refers to it, and the `resolveSharedConflicts` comment in
  `crew.mjs` only if its wording becomes false (it is the only `crew.mjs` line M1 may change).
- Tests in `tests/crew/batch.test.mjs`, built from the EFPG-401 tracker shape (`## Status:` line, a
  prose paragraph, a `| Unit | Title | EN draft | ... |` table, a stage table): two sides each
  authoring a different unit (both Units rows, both stage rows and both status blocks changed) merge,
  with ours' status block and both units' rows; both sides changing the same Units row differently
  returns null; a status block changed on one side only takes that side; all existing
  `mergeTrackerRows` tests still pass.
- Medium because a wrong merge writes a tracker automatically. Why it is safe: the batch's registry
  and content gates (`newFindings`) still run on the merged result, a both-sides change to one unit's
  row still falls back to a merge fix, and the only content ever discarded is a status summary main
  already has.
- Must not break: the stage-row rules, the glossary and content-status branches, `exclusionReason`
  text (I-0014's signature), the five-fix ceiling.

## G2: a PR's decisions close when the PR lands (M2, risk low)

- Add a pure helper (for example `closePrDecisions(decisions, pr, how, at)` in a new
  `scripts/crew/decisions.mjs`) that marks every `open` item with that `pr` as `status: 'closed'`,
  with `closedAt` and a `note` such as `PR #n merged outside the crew` or `PR #n closed`, and returns
  the closed IDs. Call it from `managePrs` (`scripts/crew/crew.mjs:1002-1004`) in the `MERGED` and
  `CLOSED` branches, and push one event line naming the closed IDs so the owner sees them dropped.
- Every "open decisions" list already filters on `status === 'open'` (`crew.mjs:1222,1256,1285`,
  `resume.mjs:30`), so a closed item drops out of `BOARD.md`, status and resume text with no change
  there. `handleCommand` (`crew.mjs:1170`) answers any non-open item with "was already answered:
  <answer>", which would print `undefined` for a closed one: make it say "was closed: <note>" for
  `closed` items, and never act on them.
- On the first tick after merge it closes C-017 to C-021 (their jobs are already `merged`, so add the
  same sweep for open decisions whose job is `merged` or `closed`, not only for PRs seen this tick).
- Tests in `tests/crew/decisions.test.mjs`: open item for the PR closes; answered items and items for
  other PRs are untouched; the job-status sweep closes a decision whose job is merged.
- Must not break: `ask`, decision numbering (`decisions.items.length + 1`), the owner-approval path
  (`ownerApproved`), the `C-### merge` command.

## G3: harvest past unnumbered labels, ignore digest echoes (M3, risk low)

- `FINDING_LABEL` (`scripts/crew/intel.mjs:116`): make it case-insensitive and also strip one leading
  unnumbered rubric area (`sources`, `pedagogy`, `assessment`, `accessibility`, `authority`,
  `readability`, `structure`, `language`, optionally `/word`), `Prior finding n partly unresolved`,
  `Prior finding n unresolved` and `Carry-forward prior finding n`, each ending in `: `. A message that
  is only a label keeps today's result (the existing fallback in `findingClause`).
- `boardSignals` (`intel.mjs:55-67`): skip handoff notes of jobs whose `stage` is `intel_distill`;
  keep their failure events (a broken distill job is still a signal).
- Tests in `tests/crew/intel.test.mjs`: `Assessment: <defect>.`, `Prior finding 2 partly unresolved:
  <defect>.` and `Carry-forward prior finding 1: <defect>.` yield the defect clause; the W45 cases
  still pass; an `intel_distill` job's handoff is dropped and its failure kept.
- Must not break: `LOG_NOISE`, `cronSignals`, `phrSignals`, `foldSignals`.

## G4: content jobs refresh G2 evidence (M4, risk low)

- In `briefRules` (`scripts/crew/brief.mjs`), content variant only (`self` false), add: "If you
  changed any English unit file or its figures manifest, sources, coverage or concepts, commit, then
  run `node scripts/prepare-gate-evidence.mjs <COURSE> <unit>`, commit the JSON and every `logs-*`
  directory it writes, and point the unit's `G2 en-draft` tracker row at the new file before
  `npm run check:content`." Verify the exact command form against
  `scripts/prepare-gate-evidence.mjs:19-20` and that it refuses a dirty tree (hence "commit, then").
- No gate script, skill or `scripts/lib/` file changes, so no G2 manifest re-opens. A skill update
  (author-unit, generate-figures) is a follow-up if the signal persists.
- Tests in `tests/crew/brief.test.mjs`: the sentence is in the content variant and not in the self
  variant; the existing assertions still pass; no U+2014.
- Must not break: the self-maintenance variant, every existing sentence.

## G5: reports one folder down count (M5, risk medium)

- Add an fs helper, for example `reportEntries(dir)` in `scripts/crew/review-facts.mjs`, returning
  `{ file, json }` for `*.json` directly in `dir` and in its immediate subdirectories (one level
  only). Use it in `latestReport` (`scripts/crew/crew.mjs:86-93`) and `scripts/build-g3-desk.mjs:34`
  so the planner and the desk agree. `pickLatestReport` already ignores files without a
  `disposition`, so bundle `manifest.json` and `commands.json` files drop out.
- Append to the `review_en` and `review_ur` stage text: write the report JSON directly under
  `reviews/unit-NN/G3/` (or `G5/`); its logs may go in a subfolder.
- Medium because `cycles` (`planner.mjs:194-195`) rises for units with nested reports, which can move
  a unit to "cycle exhausted" or change its latest disposition. Before and after, print every unit's
  latest report and cycle count on a copy of main (a one-off script under the worktree's `.crew/`,
  not committed) and list each changed unit in the PR body; the units in spec F3 are the expected set.
- Tests: a temporary directory with a flat report, a nested report and a nested `manifest.json`
  yields two report entries; deeper nesting is ignored; `pickLatestReport` results for flat-only
  directories are unchanged.
- Must not break: `pickLatestReport`, `awaitingG3`, `stagesFor`, the desk's unit list.

## G6: registry and crew README match what shipped (D1, risk low)

- `specs/intelligence/registry.md`: set I-0011 and I-0020 to I-0025 to `adopted`, slot
  `2026-11-09-00` (all six PRs merged 2026-11-08 between 20:12 and 22:49 PKT; the tick pulls main
  every 15 minutes). Set I-0015 to `retired` with the note "superseded by I-0021 (2026-W46)". Add
  I-0026 to I-0030 exactly as `intelligence.md` lists them, status `proposed`. Change no other row.
- `ops/crew/README.md` step 1 (lines 28-31): say a blocked fast-forward is logged when its reason
  changes or after 24 hours and notifies the owner once (`scripts/crew/sync-owner-checkout.sh`,
  state in `owner-sync.state`).
- Must not break `npm run check:docs-sync`. No em dash.

## Deferred to the owner (no task)

- Desk carry-forward reports, shared source excerpts, Urdu font metrics, illustration setting vs
  prose, the EFMP-407 stray rows, the two ADR suggestions, CI `npm run test:crew`: see `spec.md`,
  "Not acted on".
- Retry `efpg-401-u03-author` and `efpg-401-u05-author` after M1 merges.
