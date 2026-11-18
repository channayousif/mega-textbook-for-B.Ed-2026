---
id: crew-maint-2026-w45-m5
title: crew maint_refactor MAINT unit 456
stage: misc
date: 2026-11-08
surface: agent
model: opencode
feature: crew-maintenance
branch: crew/maint-2026-w45-m5
user: crew
command: crew maint_refactor
labels: ["crew", "opencode", "maint_refactor"]
links:
  spec: specs/maintenance/2026-W45/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
 - scripts/crew/planner.mjs
 - tests/crew/planner.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w45-m5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w45-m5`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Do maintenance task M5 of 2026-W45 (weekly-maintenance skill, the section for area "code").

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| M5 | code | Queue one author job to write a missing course overview before its sibling author jobs | scripts/crew/planner.mjs, scripts/crew/crew.mjs, tests/crew/planner.test.mjs | planner.mjs exports a pure helper returning the spec units to queue author for: all units not on disk, except that only the lowest such unit is returned while the course has no course-overview.mdx and no unit on disk; crew.mjs uses it where it queues spec-only author jobs, computing the overview from the course content root, and marks that job so its brief says the course has no course-overview.mdx and the job must write it, modelled on an existing course overview; the plan output names courses waiting for an overview; tests cover no overview and no units (lowest only), overview present (all missing units), no overview with one unit on disk (the rest), and unchanged focusCourse results; the header comment cites 2026-W45 M5 and the GICP-400 and EFMP-406 evidence; registry.md is not touched; node --test tests/crew/*.test.mjs passes with 0 failures | medium |

The survey's spec and plan follow (they are on the survey branch `crew/maint-2026-w45-survey` and reach main with the next hourly batch):

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
  `foldSignals` (`intel.mjs:134`) stops adding evidence once `MAX_EVIDENCE` (5) is reached, s

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The files this task names (scripts/crew/planner.mjs, scripts/crew/crew.mjs, tests/crew/planner.test.mjs) and what must change with them to stay consistent: callers, tests and docs. Nothing else.

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

Added `planner.authorQueue` to sequence a course's lowest missing unit as the first author job when its course-overview.mdx is absent, wired it into `crew.mjs` with an `overview: false` job mark, a brief sentence modelled on `docs/semester-3/gicp-400/course-overview.mdx`, and a plan-output note naming courses waiting for an overview.

## Outcome

- Impact: maint_refactor for MAINT Unit 456 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added `planner.authorQueue` to sequence a course's lowest missing unit as the first author job when its course-overview.mdx is absent, wired it into `crew.mjs` with an `overview: false` job mark, a brief sentence modelled on `docs/semester-3/gicp-400/course-overview.mdx`, and a plan-output note naming courses waiting for an overview.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - EFMP-408 has a draft content-spec, so `specUnits()` lists it with zero units; the `units.length` gate keeps it out of the waiting-overview note since no author job can be queued for it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
