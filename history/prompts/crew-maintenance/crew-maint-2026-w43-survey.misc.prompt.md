---
id: crew-maint-2026-w43-survey
title: crew maint_survey MAINT unit 430
stage: misc
date: 2026-10-24
surface: agent
model: claude
feature: crew-maintenance
branch: crew/maint-2026-w43-survey
user: crew
command: crew maint_survey
labels: ["crew", "claude", "maint_survey"]
links:
  spec: specs/maintenance/2026-W43/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/maintenance/2026-W43/intelligence.md
 - specs/maintenance/2026-W43/plan.md
 - specs/maintenance/2026-W43/spec.md
 - specs/maintenance/2026-W43/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w43-survey

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w43-survey`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Run the 2026-W43 maintenance survey (weekly-maintenance skill, "Survey"). Look at what changed since 2026-10-17 and at this week's intelligence (`specs/intelligence/daily/`, `specs/intelligence/registry.md`), and write `specs/maintenance/2026-W43/spec.md`, `plan.md`, `tasks.md` and `intelligence.md`.

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/maintenance/2026-W43/` only: the survey writes its four files and changes nothing else.

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

Wrote the 2026-W43 maintenance survey (spec, plan, six ranked tasks and intelligence decisions) under specs/maintenance/2026-W43/ and changed nothing else.

## Outcome

- Impact: maint_survey for MAINT Unit 430 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote the 2026-W43 maintenance survey (spec, plan, six ranked tasks and intelligence decisions) under specs/maintenance/2026-W43/ and changed nothing else.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - M1, M3 and M4 all edit scripts/crew/crew.mjs in different functions, and M1 to M4 each add a row to specs/intelligence/registry.md, so whichever merges later may need a rebase.
  - tests/crew/workers.test.mjs was already failing before this job (it expects codex, the chain now gives agy_claude); M3 fixes it.
  - After M1 untracks static/content-status.json, branches that still change it will hit a modify/delete merge conflict; M1's acceptance requires resolveSharedConflicts to handle that.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
