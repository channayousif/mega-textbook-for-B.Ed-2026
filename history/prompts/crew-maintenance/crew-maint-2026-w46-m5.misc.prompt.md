---
id: crew-maint-2026-w46-m5
title: crew maint_refactor MAINT unit 466
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: crew-maintenance
branch: crew/maint-2026-w46-m5
user: crew
command: crew maint_refactor
labels: ["crew", "claude", "maint_refactor"]
links:
  spec: specs/maintenance/2026-W46/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/build-g3-desk.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/review-facts.mjs
 - tests/crew/review-facts.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w46-m5

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w46-m5`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Do maintenance task M5 of 2026-W46 (weekly-maintenance skill, the section for area "code").

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| M5 | code | Let the planner and the G3 desk read review reports written one folder below the gate directory | scripts/crew/review-facts.mjs, scripts/crew/crew.mjs, scripts/build-g3-desk.mjs, tests/crew/review-facts.test.mjs | an exported helper returns file and parsed JSON for every json file directly in a gate directory and in its immediate subdirectories, not deeper; latestReport in crew.mjs and the report listing in build-g3-desk.mjs both use it; the review_en and review_ur stage text tells reviewers to write the report JSON directly under reviews/unit-NN/G3 or G5; pickLatestReport is unchanged; tests with a temporary directory show a flat report and a nested report are both returned, a nested manifest.json without disposition is dropped by pickLatestReport, a report two levels down is ignored, and a flat-only directory gives the same result as before; the PR body lists every unit whose latest report or cycle count changes on current main, from a before-and-after run that is not committed; a comment cites 2026-W46 M5 and the EFMP-407 Units 5 and 8 escalations; registry.md is not touched; node --test tests/crew/*.test.mjs passes with 0 failures | medium |

The survey's spec and plan follow (they are on the survey branch `crew/maint-2026-w46-survey` and reach main with the next hourly batch):

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
- **Evidence:** `ops/crew/README.md:28-31` says a blocked fast-forwa

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The files this task names (scripts/crew/review-facts.mjs, scripts/crew/crew.mjs, scripts/build-g3-desk.mjs, tests/crew/review-facts.test.mjs) and what must change with them to stay consistent: callers, tests and docs. Nothing else.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Added gateJsonEntries so the crew planner and the G3 desk read review reports one folder below the gate directory, told reviewers to write report JSON directly under reviews/unit-NN/G3 or G5, and added tests.

## Outcome

- Impact: maint_refactor for MAINT Unit 466 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added gateJsonEntries so the crew planner and the G3 desk read review reports one folder below the gate directory, told reviewers to write report JSON directly under reviews/unit-NN/G3 or G5, and added tests.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - On merge, EFMP-407 U7 (revise) and GQUR-301 U16 (escalate) get a G3 report for the first time, so the planner will plan new work for them. Watch the first planning run after the merge.
  - Ten units' cycle counts go up by one (GNAS-301 U2 and U6 reach 7). If anything reads `g3Cycles` as an ADR-0019 limit, those units may now count as out of cycles.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
