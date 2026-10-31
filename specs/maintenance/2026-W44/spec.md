# Maintenance spec, 2026-W44

Survey window: 2026-10-24 to 2026-11-01 (origin/main at `0df1e476`). Inputs: `git log --since=2026-10-24`
on origin/main (625 non-merge commits, 24 of them in `scripts/crew/`), the 2026-W43 survey
(`specs/maintenance/2026-W43/`), `specs/intelligence/daily/2026-10-25.md` through `2026-10-31.md`,
`specs/intelligence/registry.md` (I-0001 to I-0014), the crew board (`~/.crew/mega-book/board.json`
and `logs/`, read 2026-11-01 02:00 PKT) and the standing checks in
`.claude/skills/weekly-maintenance/references/survey-checklist.md`.

## Findings

### F1. All six W43 tasks merged, but the registry still calls them `proposed`
- **Evidence:** #326 (M1), #327 (M2), #328 (M4), #329 (M3), #331 (A1) and #332 (D1) are merged
  (`774b74d5`, `afc9aaa0`, `63a57bbc`, `61d3320a`, `86a8982e`, `13623cd3`). In
  `specs/intelligence/registry.md` I-0007, I-0008, I-0009, I-0010, I-0013 and I-0014 still say
  `proposed` with an empty **Adopted** slot, so the harvest has no before/after point to measure from.
  I-0012 repeats I-0008 word for word (same title, signature and evidence); I-0011 shares I-0007's
  signature but targets a different home (the worker brief).
- **Why it matters:** the registry is how the digest measures whether a change worked; with no
  adopted slot every effect line is a guess. Daily digests already report effects for these rows
  (2026-10-27 to 2026-10-31 "Effects").

### F2. Concurrent unit jobs conflict on the course tracker; it is now the main batch cost
- **Evidence:** 53 of the 241 jobs created since 2026-10-25 are `-conflictN` merge fixes (board). Of
  the 85 batch exclusions since M4 started naming files (2026-10-26), 45 name
  `specs/content/<course>/tasks.md`, 8 `static/content-status.json` (older branches), 4
  `glossary.json`, 38 are content-gate exclusions. 13 "could not join a batch after 5 merge fixes"
  events on the board. `resolveSharedConflicts` (`scripts/crew/crew.mjs:835-853`) auto-resolves only
  `glossary.json` and `static/content-status.json`. Digests: 2026-10-29 C3 (32 single-path
  conflicts), 2026-10-30 C8, 2026-10-31 C3 (3 ceiling failures, 34 conflicts since 10-28).
- **Cause:** jobs of the focused course (#361, one course at a time) each append their own
  `| Unit | Stage | Status | Initials | Notes |` rows or a per-unit section at the same place in
  one `tasks.md`. Git sees two additions at one point as a conflict even though neither side removed
  anything. `check:pipeline-gate` takes "the last row for a unit and stage" as authoritative
  (`specs/content/gpks-402/tasks.md:20`), so keeping both sides' added lines is safe when each side
  writes rows for its own unit. `tasks.md` is not a bound review input
  (`scripts/lib/review-evidence.mjs:206-207` excludes `/tasks.md`).
- **Why it matters:** every such conflict costs a worker launch, and the five-fix ceiling turns
  finished units red (`queueMergeFix`, `scripts/crew/crew.mjs:856-868`).

### F3. Claude's "hit your 5-hour limit" message is not recognised as a quota stop
- **Evidence:** `QUOTA_RE` (`scripts/crew/workers.mjs:72`) has `hit your (\w+ )?limit`; `\w` does not
  match the hyphen in `5-hour`, and the line has no other matching term. `node -e` check:
  `/hit your (\w+ )?limit/i.test("You've hit your 5-hour limit")` is `false`. 12 logs carry
  `You've hit your 5-hour limit · resets 7:10pm (Etc/GMT-5)` (for example
  `logs/gpks-402-u02-review_en.1.log`, `gpks-402-u04-author-conflict2.1.log`). Digests 2026-10-29 C2
  (10 worker exit failures), 2026-10-30 C9.
- **Why it matters:** an unrecognised quota stop is treated as a worker failure: the job burns an
  attempt (no refund) and the worker is not cooled, so it is relaunched straight into the limit.

### F4. Translation is still queued behind an unrepaired G3 `escalate` with blocking defects
- **Evidence:** `stagesFor` (`scripts/crew/planner.mjs:41-52`) holds `translate` only for an
  unrepaired `revise` (W43 M2). GPKS-402 U6 was translated and retried while its G3 report was an
  `escalate` with blocking source and scoring findings; both jobs only wrote stop handoffs
  (`gpks-402-u06-translate`, `gpks-402-u06-translate-r1`). Digests 2026-10-26 C2, 2026-10-27 C3,
  2026-10-31 C1; the 2026-10-31 effect line for I-0010 records the gap.
- **Why it matters:** wasted launches, and any mirror written must be redone after the repair. An
  escalated unit already waits for the owner, and `reReviewDue` (`planner.mjs:65-68`) treats an
  owner send-back as `g3Repaired`, so holding translation until then loses nothing.

### F5. `translate-unit` tells workers to run `check:content` with a temporary `reviewed` flag, which always trips the pipeline gate
- **Evidence:** `.claude/skills/translate-unit/SKILL.md:169-171` says flip both `index.mdx` files to
  `reviewed` and run `npm run check:content`. With `reviewed` set, `check:pipeline-gate` asserts that
  the G4 and G5 tracker rows are already done, which they cannot be mid-translation. Digests 2026-10-24
  C2, 2026-10-25 C10, 2026-10-26 C8, 2026-10-28 C2 (16 pipeline-gate log errors, 15 gate failures, 4
  job failures in one day). Deferred in W43 for lack of recurrence; it has now recurred on four days.
- **Why it matters:** a guaranteed false red in the skill's own procedure; workers either chase it or
  learn to ignore gate output.

### F6. The ADR register is a week behind
- **Evidence:** `history/adr/README.md` has no row for ADR-0031 (video studio, accepted 2026-10-26);
  rows 0032 and 0033 exist. ADR-0033 amends ADR-0024 and ADR-0029
  (`history/adr/README.md:67`), but the status lines of `0024-*.md:5` and the ADR-0029 file do not
  record it, and the register's 0024 row (`:60`) lists only 0029 and 0030.
- **Why it matters:** the register is the one place a reader learns today's state of a decision;
  figure authors reading ADR-0024 do not learn that real-territory maps now need sourced data.

### F7. `ops/crew/README.md` does not describe this week's crew behaviour
- **Evidence:** #361 (`41c84e28`, owner ruling 2026-10-28) made the planner finish one course before
  starting the next (`focusCourse` in `scripts/crew/planner.mjs`, a Focus line in `BOARD.md`); the
  README never mentions it (`grep -i focus ops/crew/README.md` finds nothing). The G3 sign-off sync
  (`scripts/crew/signoff-sync.mjs`, ADR-0032, #345) is the largest crew addition of the week (220
  lines) and is not described either.
- **Why it matters:** the README is the lead's runbook; a lead who does not know about the focus rule
  will read withheld author jobs as a planner bug.

### F8. Harvester noise keeps producing candidates
- **Evidence:** `LOG_NOISE` (`scripts/crew/intel.mjs:73`) does not drop passing notices
  (`n cosmetic wordmark collision(s) - reported, not failed.`, 2026-10-28 C7, 2026-10-29 C9, 13 total)
  or lines that begin with a ternary `?` copied from script source (`? <code>`, 2026-10-29 C6,
  2026-10-30 C10, 19 total). W43 deferred this as "first candidate for W44".
- **Why it matters:** each noise cluster costs a digest slot and a triage paragraph; low value, very
  low risk.

### F9. Standing checks
- **Crew tests:** `node --test tests/crew/*.test.mjs`: 83 pass, 0 fail (W43 F8 fixed by #329).
  `.github/workflows/ci.yml` still does not run `npm run test:crew` (owner-only).
- **content-status re-tracked once:** `d70aa57a` (2026-10-27, "rebuild stale content-status.json")
  committed the ignored file again; 43 stale errors followed (2026-10-28 C1) until `5ebaff2f`
  untracked it. `git ls-files static/content-status.json` is empty on `0df1e476`. One event, already
  repaired; recorded, no task.
- **PHR IDs:** 144 duplicate four-digit IDs across `history/prompts/*/` (59 last week). Paths stay
  unique; recorded only, as in W43.
- **Growth:** `scripts/crew/crew.mjs` grew 137 lines this week to 1,512; no single new function over
  80 lines found in the added hunks. `scripts/crew/signoff-sync.mjs` is new (220 lines) with
  `tests/crew/signoff-sync.test.mjs`.

### Not acted on this week (owner territory)
- **Render inspection under host limits** (2026-10-26 C10, 10-27 C7, 10-29 C5 with 18 owner-escalation
  handoffs in a day): the fourth week this recurs. The fix is a severity rule in `review-unit`, the
  evidence contract (ADR-0019, ADR-0027). Owner question, now the costliest open one.
- **Review evidence binds `/translations/` handoffs** (2026-10-27 C1, 2026-10-28 C3): a change to
  `bound()` in `scripts/lib/review-evidence.mjs` re-scopes sealed evidence; and editing a bound gate
  script can invalidate corpus evidence (2026-10-30 C1). Owner question.
- **CI fix jobs dispatched for platform flakes** (2026-10-25 C7, 10-26 C4, 10-30 C2, 10-31 C2): the
  root cause is shared Supabase test data and unpaged admin queries in `src/` and `tests/`; the
  crew already holds PRs on systemic CI failures (`queueCiFixes`, `scripts/crew/crew.mjs:799-826`). Platform work,
  not self-maintenance.
- **Style-guide formative range and ERQ word counts** (2026-10-25 C4, 2026-10-29 C4): style-guide
  edits re-open corpus G2 evidence; curriculum-owner decisions.
- 📋 Architectural decision detected: the 2026-10-28 owner ruling that the crew finishes one course
  before starting the next (#361) changes ADR-0030's scheduling model, alongside the 2026-10-19
  batching rulings already suggested in W43. Document? Run `/sp.adr crew-scheduling-and-batching`.

## Goals for this week

- **G1.** Batch merges resolve tracker-row conflicts in `tasks.md` without a merge-fix job (F2).
- **G2.** Every quota stop the providers print is recognised, and harvester noise stops forming
  clusters (F3, F8).
- **G3.** The planner holds translation behind an unrepaired G3 `escalate` as it does behind a
  `revise` (F4).
- **G4.** `translate-unit`'s pre-handoff check gives real parity coverage without a guaranteed red
  (F5).
- **G5.** The registry records what was adopted and when, and the crew README describes the focus
  rule and the sign-off sync (F1, F7).
- **G6.** The ADR register covers ADR-0031 and records ADR-0033's amendments (F6).
