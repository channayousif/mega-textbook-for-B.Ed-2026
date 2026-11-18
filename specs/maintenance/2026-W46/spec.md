# Maintenance spec, 2026-W46

Survey window: 2026-11-07 to 2026-11-15 (origin/main at `33d5feca4`). Inputs: `git log --since=2026-11-07`
on origin/main (717 non-merge commits, 7 of them in `scripts/crew/`), the 2026-W45 survey
(`specs/maintenance/2026-W45/`), `specs/intelligence/daily/2026-11-08.md` through `2026-11-14.md`
(`2026-11-07.md` was read by W45), `specs/intelligence/registry.md` (I-0001 to I-0025), the crew board
(`~/.crew/mega-book/board.json`, `decisions.json`, `BOARD.md`, `cron.log`, read 2026-11-15 02:10 PKT)
and the standing checks in `.claude/skills/weekly-maintenance/references/survey-checklist.md`.

## Findings

### F1. All six W45 tasks merged on 2026-11-08; the board still asks the owner to merge them
- **Evidence:** #497 (M1), #504 (D1), #498 (M2), #500 (M3), #501 (M4), #502 (M5) merged between
  20:12 and 22:49 PKT on 2026-11-08 (`2875d26e6`, `c31170308`, `680443bf2`, `f6b0dd181`,
  `0923447f2`, `c029f47b0`); `~/crew-system` contains `c029f47b0`, so the code is live. Yet
  `decisions.json` still holds C-017 to C-021 as `open`, and `BOARD.md:9-13,33-37` still asks
  "PR #49n ... is green but touches protected files ... Merge it?" for all five. `managePrs`
  (`scripts/crew/crew.mjs:1002`) calls `landed()` when a PR is `MERGED` but never closes the PR's
  open decision (`ask`, `crew.mjs:1103-1109`, only ever opens one). The registry still lists
  I-0011 and I-0020 to I-0025 as `proposed` with no **Adopted** slot.
- **Why it matters:** the digests read the board and the registry, so for five days they said the
  W45 fixes were "awaiting merge" (2026-11-09 C2, C4; 11-10 C6, C8; 11-11 C2, C8, C9; 11-12 and 11-13
  effect lines for I-0020 to I-0023) and measured nothing against them. The owner is asked to decide
  things already decided.

### F2. The row merge (I-0021) works on stage tables but not on a new course's summary and status lines
- **Evidence:** batch exclusions fell from 129 (W45 window) to 20 since 2026-11-09 00:00 PKT, and
  merge-fix jobs from 130 of 413 (31%) to 20 of 247 (8%). All 20 exclusions came on 2026-11-10; 17 of
  them are the five parallel EFPG-401 author jobs, and `efpg-401-u03-author` and `efpg-401-u05-author`
  hit the five-fix ceiling (board history, "could not join a batch after 5 merge fixes", 22:16 UTC).
  Each author job rewrites three things in `specs/content/efpg-401/tasks.md`: the `## Status:` line
  (line 3), the prose paragraph below it (line 5), and its own row of the `## Units` table
  (lines 9-17, header `| Unit | Title | EN draft | ... |`). `trackerLines`
  (`scripts/crew/batch.mjs:114-139`) keys only rows of tables with both a Unit and a Stage column,
  so the Units rows and the status lines are plain lines, and `mergeTrackerRows`
  (`batch.mjs:154-239`) returns null for any plain-line change on both sides. Digests 2026-11-12
  C1, 11-13 C4 (and C4, C5 on the merge-fix wording, which these conflicts caused).
- **Why it matters:** every new course with parallel authors repeats it (EFPG-401 and GUHQ-301 were
  next), and the ceiling turns finished units red; two still are.

### F3. Review reports written one folder down are invisible to the planner, which then burns the last review cycle
- **Evidence:** `latestReport` (`scripts/crew/crew.mjs:86-93`) and `build-g3-desk.mjs:34` read only
  `*.json` directly under `reviews/unit-NN/G3/`. Five crew review reports sit one level down
  (`specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json`,
  the same for EFMP-407 Units 7 (twice) and 8 and GICP-400 Unit 1), and nine older ones in
  `round-02/` or timestamp folders (GNAS-301 Units 1 to 6, GQUR-301 Unit 16, EFMP-303 Unit 4). For
  EFMP-407 Units 5 and 8 the planner saw no report, queued `review_en-r1` before any repair, and the
  second reviewer escalated on unchanged inputs, using the unit's last ADR-0019 cycle. Digests
  2026-11-08 C1, 11-09 C1, 11-10 C1 (16 review signals a day, 32 in total).
- **Why it matters:** a wasted review is the most expensive job the crew runs, and an exhausted cycle
  needs the owner to reopen it.

### F4. Jobs that edit English unit files are never told to refresh G2 evidence
- **Evidence:** no skill names `scripts/prepare-gate-evidence.mjs` (`grep` over `.claude/skills/`
  finds nothing), and no stage brief in `scripts/crew/crew.mjs:216-223` mentions it, yet any edit to
  a unit, its figures manifest, sources or coverage stales the unit's G2 manifest and turns
  `check:pipeline-gate` red. Illustrate jobs placing banners (EFMP-407 Units 5 to 7, PHRs 2465 to
  2467), author and repair jobs that skip it (4 pipeline-gate failures, 11-11 C4) and a refresh that
  dropped its `logs-*` directory (11-14 C2). Digests 2026-11-09 C8, 11-10 C5, 11-11 C4, 11-14 C2.
- **Why it matters:** four of seven digests; each case costs a retry or a repair and is fixed by one
  brief sentence. The single-unit mode does not repoint the tracker row
  (`prepare-gate-evidence.mjs:122-146` repoints only under `--refresh-stale`), so the brief must say so.

### F5. The harvester still collapses unnumbered rubric labels and re-harvests its own digests
- **Evidence:** `FINDING_LABEL` (`scripts/crew/intel.mjs:116`) is case-sensitive and needs a number,
  so desk-review findings such as `Assessment: <defect>` or `Prior finding 2 partly unresolved:
  <defect>` still fold into `assessment`, `pedagogy`, `accessibility`, `prior findingn partly
  unresolved` (11-10 C2: 21 recent signals in 7 clusters). `boardSignals` (`intel.mjs:55-67`) harvests
  every job's handoff notes, including those of `intel_distill` jobs, so 3 of the 5 growing clusters
  on 2026-11-13 and 3 on 11-14 were the previous day's digest echoed back (11-13 C2, 11-14 C3).
- **Why it matters:** the digest is the crew's learning loop; echoes inflate recurrence, and label
  clusters hide the defect.

### F6. The crew README still describes the old owner-sync behaviour
- **Evidence:** `ops/crew/README.md:28-31` says a blocked fast-forward "logs `owner-sync: ... blocked`
  to `cron.log`". Since #500 (`scripts/crew/sync-owner-checkout.sh:8-19`) it logs only when the
  reason changes or after 24 hours and notifies the owner once. `cron.log` now shows
  `owner-sync: moved main by n commit(s)` and no blocked lines since 2026-11-10.
- **Why it matters:** the lead reads cron.log against this text.

### F7. Standing checks
- **Crew tests:** `node --test tests/crew/*.test.mjs`: 119 pass, 0 fail (98 last week).
  `.github/workflows/ci.yml` still does not run `npm run test:crew` (owner-only, fourth week).
- **Dead code:** `mergeAppendOnly` (`scripts/crew/batch.mjs:81-105`) has no production caller since
  #498; only `tests/crew/batch.test.mjs:80-97` imports it.
- **ADR register:** `history/adr/README.md` has rows for ADR-0034 and ADR-0035 (added 2026-11-09)
  and the ADR-0028 acceptance; 35 files, 35 rows. No task.
- **Agent reference:** "Recent Changes" (`.specify/memory/agent-reference.md:263`) still lists only
  `001-content-platform` (deferred since W45); this week added Features 028 (news ticker, #517) and
  029 (Notebook Studio, #519). Deferred again: no reader has hit it, and this week's docs slot goes
  to F1 and F6.
- **PHR IDs:** 247 duplicate numeric ID prefixes across `history/prompts/*/` (222 last week); 3 of
  the 412 PHRs added this week have no Handoff section. Recorded only.
- **Growth:** `batch.mjs` +134 lines (`mergeTrackerRows`, 86 lines, tested), `planner.mjs` +81,
  `crew.mjs` +10 net to 1,543, new `review-facts.mjs` (34 lines, used by `crew.mjs` and
  `build-g3-desk.mjs`, no test of its own; its pure helpers live in `planner.mjs`, which is tested).
- **Red jobs:** `gqur-301-u15-repair_en` (since W45), `efpg-401-u03-author`, `efpg-401-u05-author`
  are `gate_red`. The two EFPG-401 jobs can be retried (`crew retry <job>`) once M1 lands.

### Not acted on this week (owner territory)
- **Desk carry-forward reports:** the 28 G3 desk reports written at `20261108T203238Z` repeat
  earlier findings against post-repair hashes, and 54 `repair_en` jobs ran this week (11-11 C5,
  11-12 C3, 11-13 C6). The desk and its reports are ADR-0032's sign-off ledger; whether a carried
  finding should re-trigger repair is the owner's call.
- **Shared source excerpts** re-stale sibling G2 manifests (11-06 C4, 11-08 C2; `kiran-2021-gtm-clt.md`
  in one EFPG-401 exclusion): `scripts/lib/review-evidence.mjs` is bound gate code; owner question.
- **Urdu font metrics under CI fallback** (11-12 C2, 11-13 C5, both citing the same two PRs on
  2026-11-10): figure-geometry CI fixes fell from 15 to 3 after #497. Recheck next week before
  changing `scripts/measure-figure-text.mjs`.
- **Illustration setting vs prose geography** (11-14 C4; EFMP-303, EFPG-401, GNAS-301 handoffs): the
  plan_illustrations brief fixes "a Sindh school"; whether prose set elsewhere wins is a content
  standard question for the owner.
- **Stray Unit 1 rows in the EFMP-407 Unit 2 table** (`specs/content/efmp-407/tasks.md:54-58`,
  11-08 C9): content cleanup, outside maintenance scope.
- 📋 Architectural decision detected: a protocol for reopening an ADR-0019 review cycle after a unit
  exhausted both cycles and was repaired (11-11 C6, repeated in 11-14's retained signals). Document?
  Run `/sp.adr review-cycle-reauthorisation`. The signing-runner suggestion from W45 also still stands
  (11-08 C10 to 11-12 C6).

## Goals for this week

- **G1.** Course tracker conflicts in summary tables and status lines resolve in the batch (F2).
- **G2.** Decisions about a PR close when the PR merges or closes (F1).
- **G3.** The harvest keeps defect text for unnumbered labels and ignores the digest's own handoffs (F5).
- **G4.** Every content job that edits English unit inputs refreshes and commits its G2 evidence (F4).
- **G5.** The planner and the G3 desk see review reports written one folder down (F3).
- **G6.** The registry records what W45 adopted and this week's proposals, and the crew README
  describes owner-sync as it behaves (F1, F6).
