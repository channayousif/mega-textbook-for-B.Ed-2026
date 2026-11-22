---
id: crew-maint-2026-w47-m4
title: crew maint_refactor MAINT unit 475
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: crew-maintenance
branch: crew/maint-2026-w47-m4
user: crew
command: crew maint_refactor
labels: ["crew", "agy", "maint_refactor"]
links:
  spec: specs/maintenance/2026-W47/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/batch.mjs
 - tests/crew/batch.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w47-m4

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w47-m4`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Do maintenance task M4 of 2026-W47 (weekly-maintenance skill, the section for area "code").

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| M4 | code | Return a tracker conflict when both sides add the same unit-stage row differently | scripts/crew/batch.mjs, tests/crew/batch.test.mjs | mergeTrackerRows returns null when ours and theirs each add a new row with the same Unit and Stage key but different text, instead of keeping both; an identical new row on both sides is still kept once; new rows for different units still both merge; tests cover the duplicate-key conflict, the identical case and the different-unit case, and all existing mergeTrackerRows tests pass; status blocks, summary rows, glossary and content-status handling, exclusionReason text and the five-fix ceiling are unchanged; a comment cites 2026-W47 M4 and the 2026-11-15 C4, 2026-11-16 C4 and 2026-11-17 C4 digests; node --test tests/crew/*.test.mjs passes with 0 failures | medium |

The survey's spec and plan follow (they are on the survey branch `crew/maint-2026-w47-survey` and reach main with the next hourly batch):

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
- **Evidence:** "Active Te

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The files this task names (scripts/crew/batch.mjs, tests/crew/batch.test.mjs) and what must change with them to stay consistent: callers, tests and docs. Nothing else.

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

Made mergeTrackerRows return null on conflicting new rows sharing the same unit and stage key and added tests for duplicate keys, identical rows, and distinct units.

## Outcome

- Impact: maint_refactor for MAINT Unit 475 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Made mergeTrackerRows return null on conflicting new rows sharing the same unit and stage key and added tests for duplicate keys, identical rows, and distinct units.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
