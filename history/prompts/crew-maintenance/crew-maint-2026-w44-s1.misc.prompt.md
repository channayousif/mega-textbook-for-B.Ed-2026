---
id: crew-maint-2026-w44-s1
title: crew maint_skill MAINT unit 444
stage: misc
date: 2026-10-31
surface: agent
model: claude
feature: crew-maintenance
branch: crew/maint-2026-w44-s1
user: crew
command: crew maint_skill
labels: ["crew", "claude", "maint_skill"]
links:
  spec: specs/maintenance/2026-W44/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - .claude/skills/translate-unit/SKILL.md
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w44-s1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w44-s1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Do maintenance task S1 of 2026-W44 (weekly-maintenance skill, the section for area "skill").

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| S1 | skill | Tell translators which pipeline-gate findings the temporary reviewed flip is expected to raise | .claude/skills/translate-unit/SKILL.md | the Step 5 paragraph on flipping both index.mdx files to reviewed says that check:pipeline-gate then reports the unit's G4 ur-translation and G5 ur-review tracker rows as not done, that those two findings for this unit are expected and must not be fixed by writing tracker rows, and that every other finding including a key term or terminology.csv finding must be fixed before flipping back; the instruction to flip back and the grep that confirms it stay; the text cites the digests 2026-10-24 C2 to 2026-10-28 C2 and registry I-0017; no gate script changes; no em dash | low |

The survey's spec and plan follow (they are on the survey branch `crew/maint-2026-w44-survey` and reach main with the next hourly batch):

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
- **Evidence:** #3

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The files this task names (.claude/skills/translate-unit/SKILL.md) and what must change with them to stay consistent: callers, tests and docs. Nothing else.

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

Added a paragraph to translate-unit Step 5 saying the temporary reviewed flip makes check:pipeline-gate report the unit's G4/G5 tracker rows as not done, which is expected and must not be fixed with tracker rows, while every other finding, key-term ones included, must be fixed before flipping back (cites digests 10-24 C2 to 10-28 C2 and I-0017).

## Outcome

- Impact: maint_skill for MAINT Unit 444 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added a paragraph to translate-unit Step 5 saying the temporary reviewed flip makes check:pipeline-gate report the unit's G4/G5 tracker rows as not done, which is expected and must not be fixed with tracker rows, while every other finding, key-term ones included, must be fixed before flipping back (cites digests 10-24 C2 to 10-28 C2 and I-0017).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - registry row I-0017 exists only on the D1 branch (`crew/maint-2026-w44-d1`, 33dea9f7), not on main, so the reviewer should check the citation against that branch.
  - the new advice to drop an unbanked term from `key_terms` is safe because only `check:pipeline-gate` reads `key_terms`; grep found no other consumer in `scripts/`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
