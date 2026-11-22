---
id: crew-maint-2026-w47-survey
title: crew maint_survey MAINT unit 470
stage: misc
date: 2026-11-21
surface: agent
model: opencode
feature: crew-maintenance
branch: crew/maint-2026-w47-survey
user: crew
command: crew maint_survey
labels: ["crew", "opencode", "maint_survey"]
links:
  spec: specs/maintenance/2026-W47/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/maintenance/2026-W47/intelligence.md
 - specs/maintenance/2026-W47/plan.md
 - specs/maintenance/2026-W47/spec.md
 - specs/maintenance/2026-W47/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w47-survey

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w47-survey`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Run the 2026-W47 maintenance survey (weekly-maintenance skill, "Survey"). Look at what changed since 2026-11-14 and at this week's intelligence (`specs/intelligence/daily/`, `specs/intelligence/registry.md`), and write `specs/maintenance/2026-W47/spec.md`, `plan.md`, `tasks.md` and `intelligence.md`.

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/maintenance/2026-W47/` only: the survey writes its four files and changes nothing else.

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

Wrote and committed the 2026-W47 maintenance survey (spec, plan, tasks, intelligence) in specs/maintenance/2026-W47/, recording W46's adoptions and promoting five recurring candidates.

## Outcome

- Impact: maint_survey for MAINT Unit 470 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote and committed the 2026-W47 maintenance survey (spec, plan, tasks, intelligence) in specs/maintenance/2026-W47/, recording W46's adoptions and promoting five recurring candidates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - M1 to M5 touch protected scripts and go to the owner; D1 (registry) is the only row that may merge on green.
  - Existing duplicate tracker rows in specs/content/gict-300 and gqur-301 still need a content cleanup; M4 only stops new ones.
  - Open PR #682 (a retry accepts an earlier attempt's commits) is a related crew fix not in the registry; record it if it merges.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
