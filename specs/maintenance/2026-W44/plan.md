# Maintenance plan, 2026-W44

One approach per goal in `spec.md`. M1, M2 and M3 touch `scripts/crew/` and S1 touches
`.claude/skills/`; A1 touches `history/adr/`. All of these are protected paths, so those PRs go to
the owner. D1 (`specs/intelligence/registry.md`, `ops/crew/README.md`) is the only task that may merge
on green CI and a passing review.

**Registry ownership this week.** Last week three tasks appended registry rows in parallel and
collided on IDs (2026-10-26 C6, 2026-10-27 C4, commit `68635871` renumbering M4's row to I-0014).
This week only D1 edits `specs/intelligence/registry.md`. It adds the rows for M1, M2, M3 and S1
with IDs fixed here (I-0015 to I-0019, see `intelligence.md`) and status `proposed`. The code and
skill tasks do not touch the registry.

**No shared files.** M1 edits `crew.mjs` (`resolveSharedConflicts`) and `batch.mjs`; M2 edits
`workers.mjs` and `intel.mjs`; M3 edits `planner.mjs`; each has its own test file. No two tasks
change the same file, so the PRs merge in any order.

## G1: tracker-row conflicts resolve in the batch (M1, risk medium)

- Add a pure helper to `scripts/crew/batch.mjs`, for example `mergeAppendOnly(base, ours, theirs)`,
  that returns merged text when every change on both sides, relative to the merge base, is a pure
  insertion of whole lines (no base line removed or changed), placing our inserted lines before
  theirs at each insertion point; it returns `null` for any other shape (an edited or deleted line,
  the same line changed on both sides, a missing stage).
- In `resolveSharedConflicts` (`scripts/crew/crew.mjs:835-853`), accept paths matching
  `specs/content/<course>/tasks.md` alongside `glossary.json` and `static/content-status.json`. For
  each, read stages 1 to 3 (`git show :N:<path>`, as the glossary branch already does), call the
  helper, write and `git add` the result, or return false when it returns `null` so the job gets
  its merge fix as today.
- Why it is safe: `check:pipeline-gate` takes the last row for a unit and stage as authoritative
  (`specs/content/gpks-402/tasks.md:20`), so keeping both sides' new rows loses nothing; a job that
  rewrote an existing row (for example the Units table) is not append-only and still goes to a merge
  fix. `tasks.md` is not a bound review input (`scripts/lib/review-evidence.mjs:206-207`). The batch's
  content gate (`newFindings`) and registry guard still run on the merged result.
- Medium because it writes course trackers automatically in every batch, and a wrong merge would
  record a stage row a unit did not earn. The append-only test bounds it: the merge can only keep
  lines one of the two sides wrote.
- Must not break: the glossary merge, the content-status branch, batch membership, the five-fix
  ceiling, `exclusionReason`'s text (I-0014's signature), the dispatcher's content-path rule for
  workers (this is dispatcher code, not a worker diff).

## G2: every quota stop recognised; harvester noise dropped (M2, risk low)

- `QUOTA_RE` (`scripts/crew/workers.mjs:72`): let the word before `limit` contain a hyphen, for
  example `hit your ([\w-]+ )?limit`, so `You've hit your 5-hour limit · resets 7:10pm` matches.
  `resetMinutes` keeps returning `null` for that clock form, so the strike cooldown applies (W43 M3
  design, unchanged).
- `LOG_NOISE` (`scripts/crew/intel.mjs:73`): drop lines containing `reported, not failed` and lines
  whose first non-space character is `?` (a ternary branch copied from script source).
- Tests: add the quoted 5-hour line to the `QUOTA_RE` tests in `tests/crew/workers.test.mjs`, and
  keep every existing match and non-match; add both noise lines plus one real error line that must
  still be kept to `tests/crew/intel.test.mjs`.
- Must not break: the attempt refund on a quota stop, `resetMinutes`, `pickWorker`'s cooling
  exclusion, real error extraction in `intel.mjs`.

## G3: hold translation behind an unrepaired escalate (M3, risk low)

- In `stagesFor` (`scripts/crew/planner.mjs:41-52`), widen the hold from an unrepaired `revise` to an
  unrepaired `revise` or `escalate` (G3 not done, `!f.g3Repaired`). Do not plan `repair_en` for an
  `escalate`: escalated findings wait for the owner, who sends a unit back for repair (that is what
  sets `g3Repaired`, see `reReviewDue`, `planner.mjs:65-68`).
- Update the header comment (`planner.mjs:16-21`) that says an `escalate` still lets the draft
  mirror go ahead; record the date and the GPKS-402 U6 evidence.
- Must not break: `awaitingG3` (an escalated unit is still listed for the owner), `reReviewDue`, the
  repair path for `revise`, translation for `pass` and for units with no G3 report (English-first
  publication, ADR-0022, is permitted, not required; holding a mirror does not block it).

## G4: translate-unit's pre-handoff check without a guaranteed red (S1, risk low)

- `.claude/skills/translate-unit/SKILL.md:164-171`: keep the flip (it is what turns the parity checks
  on), and say exactly what to expect: while both `index.mdx` files are `reviewed`,
  `check:pipeline-gate` reports that the unit's `G4 ur-translation` and `G5 ur-review` tracker rows
  are not done (`scripts/check-pipeline-gate.mjs:211-216`). Those two findings for this unit are
  expected and are not to be "fixed" by writing tracker rows; every other finding, including a
  `key term ... terminology.csv` finding from the same gate, must be fixed before flipping back.
- Cite the evidence in the skill text (digests 2026-10-24 C2 to 2026-10-28 C2; registry I-0017).
- Must not change any gate, the G4/G5 tracker semantics, or the rule that the flag is flipped back
  before handoff. Owner PR (protected path).

## G5: registry and crew README match what shipped (D1, risk low)

- `specs/intelligence/registry.md`: set I-0007, I-0008, I-0009, I-0010, I-0013 and I-0014 to
  `adopted` with the slot from `intelligence.md` (the first harvest after each merge). Set I-0012 to
  `retired` (duplicate of I-0008; keep the row). Leave I-0011 a `candidate`. Add I-0015 to I-0019
  exactly as `intelligence.md` lists them, status `proposed`. Change no other row.
- `ops/crew/README.md`: describe the one-course focus (owner ruling 2026-10-28, `focusCourse` in
  `scripts/crew/planner.mjs`, the Focus line of `BOARD.md`) and the G3 sign-off sync
  (`scripts/crew/signoff-sync.mjs`, ADR-0032) in a few sentences each, verified against the code.
- Must not break `npm run check:docs-sync`. Prefer short factual text to caveats.

## G6: ADR register current (A1, risk low)

- Add the ADR-0031 row and mention it in the relevant "Current state by area" paragraph, following
  `.claude/skills/weekly-maintenance/references/adr-register.md`.
- Record ADR-0033 as amending ADR-0024 and ADR-0029: in the register's rows and, as an allowed
  hygiene fix, in the status lines of those two ADR files ("amended by ADR-0033 (2026-10-29) for ...",
  naming only what ADR-0033 itself says it amends).
- Must not change any Decision, Consequences or Alternatives section. Every link resolves. Owner PR.

## Deferred to the owner (no task)

- Render-inspection severity in `review-unit`, `/translations/` in review-evidence `bound()`, CI
  `npm run test:crew`, platform e2e flakes, style-guide ranges: see `spec.md`, "Not acted on".
- ADR suggestion on the crew's scheduling and batching rulings (see `spec.md`).
