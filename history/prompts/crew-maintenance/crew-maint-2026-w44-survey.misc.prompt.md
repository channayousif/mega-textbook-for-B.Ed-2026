---
id: crew-maint-2026-w44-survey
title: crew maint_survey MAINT unit 440
stage: misc
date: 2026-10-31
surface: agent
model: claude
feature: crew-maintenance
branch: crew/maint-2026-w44-survey
user: crew
command: crew maint_survey
labels: ["crew", "claude", "maint_survey"]
links:
  spec: specs/maintenance/2026-W44/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/maintenance/2026-W44/intelligence.md
 - specs/maintenance/2026-W44/plan.md
 - specs/maintenance/2026-W44/spec.md
 - specs/maintenance/2026-W44/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w44-survey

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w44-survey`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Run the 2026-W44 maintenance survey (weekly-maintenance skill, "Survey"). Look at what changed since 2026-10-24 and at this week's intelligence (`specs/intelligence/daily/`, `specs/intelligence/registry.md`), and write `specs/maintenance/2026-W44/spec.md`, `plan.md`, `tasks.md` and `intelligence.md`.

Follow `.claude/skills/weekly-maintenance/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/maintenance/2026-W44/` only: the survey writes its four files and changes nothing else.

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

Wrote the 2026-W44 maintenance survey (spec, plan, six tasks, intelligence decisions) in specs/maintenance/2026-W44/ and committed it without touching anything else.

## Outcome

- Impact: maint_survey for MAINT Unit 440 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote the 2026-W44 maintenance survey (spec, plan, six tasks, intelligence decisions) in specs/maintenance/2026-W44/ and committed it without touching anything else.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - M1 is the only medium-risk task: it writes course `tasks.md` files automatically during the batch, so the reviewer should check that the merge helper returns null whenever either side changes or deletes an existing line.
  - Only D1 may edit `specs/intelligence/registry.md` this week; if M1, M2, M3 or S1 touch it, send them back for revision.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
