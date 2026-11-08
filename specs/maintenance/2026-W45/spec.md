# Maintenance spec, 2026-W45

Survey window: 2026-10-31 to 2026-11-08 (origin/main at `9f59e7d5`). Inputs: `git log --since=2026-10-31`
on origin/main (907 non-merge commits, 7 of them in `scripts/crew/`), the 2026-W44 survey
(`specs/maintenance/2026-W44/`), `specs/intelligence/daily/2026-11-01.md` through `2026-11-07.md`
(there is no 2026-11-05 digest), `specs/intelligence/registry.md` (I-0001 to I-0019), the crew board
(`~/.crew/mega-book/board.json`, `cron.log`, read 2026-11-08 17:40 PKT) and the standing checks in
`.claude/skills/weekly-maintenance/references/survey-checklist.md`.

## Findings

### F1. All six W44 tasks merged; the registry still calls five of them `proposed`
- **Evidence:** #392 (M2), #393 (M1), #394 (M3), #395 (D1), #396 (A1), #397 (S1) merged between
  2026-11-01 03:45 and 10:20 PKT (`18a8cff4`, `e571fdf8` plus the follow-up `d58f7bf3`, `003c8290`,
  `33dea9f7`, `1d1d5fde`, `f455d401`). `specs/intelligence/registry.md` still lists I-0015 to I-0019
  as `proposed` with an empty **Adopted** slot. The 2026-11-07 digest (C1, "Registry") asks the
  survey to correct this.
- **Why it matters:** without an adopted slot the harvest cannot compare before and after, so the
  digests' effect lines for these five rows are estimates.

### F2. The append-only tracker merge (I-0015) catches almost none of the real conflicts
- **Evidence:** since #393 went live (2026-11-01 10:15 PKT) the board records 129 batch exclusions;
  125 of them name a course `specs/content/<course>/tasks.md`, and 4 jobs hit the five-fix ceiling
  (`gqur-301-u15-repair_en` is still `gate_red`). 130 of the 413 jobs created this week are
  `-conflictN` merge fixes (31%, up from 22% in W44). `mergeAppendOnly`
  (`scripts/crew/batch.mjs:81-105`) returns null unless every base line survives on both sides,
  but jobs rewrite their own unit's rows in place (`G2 en-draft` evidence, `G3 en-review` notes;
  see `specs/content/gicp-400/tasks.md:7-37`). The 2026-11-07 digest (C1) replayed 20 tracker merges
  made by conflict fixes since 2026-11-04: the helper resolved 1, and a comparison keyed on
  (Unit, Stage) found no two sides changing the same row differently in any of the 20. Digests
  2026-11-03 C5, 2026-11-04 C3, 2026-11-06 C2, 2026-11-07 C1.
- **Why it matters:** this is now the largest single cost in the crew: almost a third of all
  launches, and the ceiling turns finished units red.

### F3. Every batch CI failure this week was `figure-geometry`, because the brief forbids the check that would catch it
- **Evidence:** all 15 batch CI-fix jobs created since 2026-11-01 (`batch-20261102-0200-cifix1`
  to `batch-20261107-1545-cifix1`) were queued for the `figure-geometry` check alone (board,
  `feedback`). The common brief rule (`scripts/crew/crew.mjs:220`) says "never run `npm run build`, a
  dev server or Playwright"; `scripts/measure-figure-text.mjs:36` imports Chromium from
  `playwright-core`, so workers skip it, although AGENTS.md ("Figure lifecycle") requires running it
  after every SVG text edit. Two fixes wrote a DejaVu metric simulator instead
  (`batch-20261106-1031-cifix1`, `batch-20261106-2100-cifix1`), and dozens of tracker notes say
  "Chromium geometry check not run under the crew brief's browser prohibition"
  (`specs/content/gicp-400/tasks.md:16`). Digests 2026-11-01 C2, 11-02 C6, 11-03 C10, 11-04 C2,
  11-06 C5, 11-07 C5 (six of six digests).
- **Why it matters:** each failure blocks the hourly batch until a blind repair lands. The check is
  heavy (a Chromium run), but `scripts/heavy.sh` already queues it under the two-slot host limit.

### F4. Workers still hit a stale `content-status.json` after their own edits and chase it through git
- **Evidence:** I-0011 (candidate since W43) is the open half of the content-status work:
  `prepareWorktree` regenerates the ignored file once (`scripts/crew/crew.mjs:549-551`), so any later
  tracker or unit edit makes the next `check:content` fail. Stale errors: 27 (11-04), 27 (11-06),
  10 (11-07), 271 in total; `git show origin/main:static/content-status.json` and
  `git ls-files --error-unmatch` attempts in 11-04 C7, 11-06 C3, 11-07 C7. W44 deferred the brief
  rule because the signal had fallen; it rose again with the course focus on EFMP and GICP units.
- **Why it matters:** low cost per job, but it is one of the most frequent error signatures, and the
  brief line that prevents it is one sentence.

### F5. owner-sync logs the same blocked line every tick and nobody who can act sees it
- **Evidence:** `scripts/crew/sync-owner-checkout.sh:36-40` (added by `f2b20559`, 2026-11-02) logs
  `owner-sync: fast-forward blocked (n behind): error: ...` on every 15-minute tick; `cron.log` has
  471 such lines and the owner checkout is now 775 commits behind. `cronSignals`
  (`scripts/crew/intel.mjs:92-95`) counts each one (144 a day, 11-06 C1). The owner checkout has five
  modified tracked files; `AGENTS.md` is now identical to origin/main (PR #493 merged it),
  `scripts/heavy.sh` differs only in mode, `README.md` (+8 lines), `package.json` (adds
  `http-proxy`) and `package-lock.json` (+1) carry real edits. Digests 2026-11-04 C1, 11-06 C1, 11-07 C2.
- **Why it matters:** the sync was added so the owner's checkout follows main; blocked silently it
  does nothing, and it floods the harvest. The script is right not to stash; the owner must keep or
  discard those edits (owner action, not a task).

### F6. The harvester hides the defect text of review findings and shows only old evidence
- **Evidence:** `reviewSignals` (`scripts/crew/intel.mjs:116`) takes the text before the first
  `: ` or `. `, so findings that begin with a rubric label (`F02 sources: ...`) or a carry-forward
  marker (`Previous finding 1: ...`) collapse into clusters such as `fn sources`, `fn assessment`,
  `fn <path>` (2026-11-01 C1, C8, C9 signatures; 11-04 C5: 12 such clusters, 88 recent signals).
  `foldSignals` (`intel.mjs:134`) stops adding evidence once `MAX_EVIDENCE` (5) is reached, so a
  long-lived cluster only ever lists its oldest sources; 2026-11-06 C3 cited October logs for a
  24-hour count (11-07 C3).
- **Why it matters:** the digest is the crew's only learning loop; it reads the wrong logs and
  cannot tell review defects apart.

### F7. New courses reach author fan-out without a course overview
- **Evidence:** `prepare-gate-evidence` requires `<course>/course-overview.mdx` before sealing G2;
  the planner queues every unit's `author` job at once (`scripts/crew/crew.mjs:175`), and the
  `author-unit` skill never mentions the overview. GICP-400 Units 1, 2 and 4 stopped on "missing
  required input: docs/semester-3/gicp-400/course-overview.mdx" and Unit 2 was then excluded for
  conflicting on that file (11-07 C6); EFMP-406 Units 2 to 5 had the same collision (11-03 C6). The
  planner now holds 14 author jobs for EFPG-401 and GUHQ-301 (`cron.log`, 2026-11-08), and neither
  course has an overview on main.
- **Why it matters:** the next two courses will repeat it unless the planner sequences the first
  author job.

### F8. `intel_distill` is routed to a worker that cannot read the logs it must read
- **Evidence:** `STAGES.intel_distill.chain` (`scripts/crew/workers.mjs:59`) lists `opencode` third;
  opencode auto-rejects reads outside its worktree, and the `intel-distill` skill's step 1 reads
  `~/.crew/<project>/logs/`. `intel-2026-11-07-distill` lost two attempts (about 30 minutes) this
  way before handover (11-07 C4); `I-0002` caught the idle exits but its retry message gives no
  cause.
- **Why it matters:** a daily job that silently burns attempts; removing one chain entry fixes it.

### F9. `ops/crew/README.md` step 5 still says every conflicting job gets a merge fix
- **Evidence:** `ops/crew/README.md:58-59` ("A job that conflicts ... is left out and gets a merge fix
  on its own branch"). Since W43 and W44, `resolveSharedConflicts`
  (`scripts/crew/crew.mjs:839-870`) resolves batch conflicts confined to `glossary.json`,
  `static/content-status.json` and course `tasks.md` itself. Digest 2026-11-02 C3.
- **Why it matters:** the lead reads exclusions against this text.

### F10. Standing checks
- **Crew tests:** `node --test tests/crew/*.test.mjs`: 98 pass, 0 fail (83 last week).
  `.github/workflows/ci.yml` still does not run `npm run test:crew` (owner-only, third week).
- **ADR register:** `history/adr/README.md` has a row for every ADR file 0001 to 0033 (no 0028);
  no ADR was added or amended this week. No task.
- **Agent reference:** `.specify/memory/agent-reference.md` "Recent Changes" (line 263) lists only
  `001-content-platform`, and "Active Technologies" stops at Feature 017, while this week landed the
  brand v2 redesign (#485 to #494), heavy-job admission (#493, `scripts/heavy.sh`), the SVG style gate
  (`c01a4ed7`, `check:svg-style`) and per-course catalog evidence binding (`5beb6f28`). Deferred: the
  docs slot this week goes to F1 and F9, and a history rewrite of that file is better done once the
  redesign PRs settle.
- **PHR IDs:** 222 duplicate numeric ID prefixes across `history/prompts/*/` (144 last week). Paths
  stay unique; recorded only.
- **Growth:** `scripts/crew/crew.mjs` grew 21 lines to 1,533; `batch.mjs` +36 (`mergeAppendOnly`),
  `planner.mjs` +41 (escalate hold, illustrate split), `sync-owner-checkout.sh` new (50 lines). No new
  function over 80 lines in the added hunks.

### Not acted on this week (owner territory)
- **G3 sign-off queue:** 78 units await G3 sign-off (`cron.log`, 2026-11-08; 57 on 11-06, 69 on
  11-07) and the planner plans 0 jobs per tick apart from the focus course. ADR-0019 is right that
  workers cannot sign; the queue only drains through the owner or a qualified signing host
  (11-06 C6, 11-07 C10).
- **Review-evidence binding:** translation handoffs under `specs/content/<course>/translations/`
  bind as English G2 inputs (11-03 C3, 11-07 C9; third week), hyphenated unit design files bind to
  every unit (11-03 C1), hyphenated excerpt keys escape the manifest (11-03 C2), and the stale-manifest
  error names no paths (11-03 C4). All live in `scripts/lib/review-evidence.mjs`, whose edits re-open
  bound G2 manifests corpus-wide. Owner question.
- **`measure-figure-text` left edge:** the script checks only the right and bottom edges
  (`scripts/measure-figure-text.mjs:111-112`), so right-to-left text clipped on the left passes CI
  (11-07 C8, one figure, not rendered by the digest). Better taken up after F3's fix, when workers
  run it locally and the effect on existing Urdu figures can be surveyed.
- **Temporary reviewed flip (I-0017):** pipeline-gate failures fell from 13 jobs (11-04) to 4
  (11-06) after #397; an isolated `--check-parity` mode (11-03 C8, 11-04 C6) is a gate-script change.
- 📋 Architectural decision detected: a dedicated off-host qualification and render-signing runner
  for ADR-0019 G3/G5 evidence, so units awaiting sign-off stop starving the planner. Document? Run
  `/sp.adr g3-g5-signing-runner`. (Raised by the 2026-11-06 and 2026-11-07 digests; the decision is
  the owner's.)

## Goals for this week

- **G1.** Workers run the SVG geometry check through `scripts/heavy.sh` before handing off, regenerate
  content-status before their gates, and `intel_distill` never lands on a worker that cannot read the
  logs (F3, F4, F8).
- **G2.** Batch merges resolve course tracker conflicts in which the two sides change different rows
  (F2).
- **G3.** A blocked owner checkout is reported once per change and reaches the owner (F5).
- **G4.** Harvested review clusters carry the defect text, and cluster evidence shows recent sources
  (F6).
- **G5.** A new course gets its overview from one author job before its sibling author jobs start
  (F7).
- **G6.** The registry records what W44 adopted and this week's proposals, and the crew README
  describes the batch's own conflict resolution (F1, F9).
