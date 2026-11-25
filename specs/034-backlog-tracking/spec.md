# Feature 034: Backlog consolidation and issue tracking

**Status**: active | **Created**: 2026-11-25 | **Owner**: curriculum owner (board-direct)

## Why

Most feature plans in `specs/NNN-*/tasks.md` end with a few unticked tasks: owner-blocked steps,
checks after a deploy, and follow-ups nobody owns. `specs/backlog.md` and `specs/gaps.md` hold more.
Nothing made these visible, so they piled up. The repository had issues and Projects enabled but no
issues, no milestones and only the default labels.

## What

1. One consolidated task list (`tasks.md`) holding every unfinished task from earlier plans, every
   still-relevant `specs/backlog.md` item, every open `specs/gaps.md` entry, and the owner's new site
   tasks of 2026-11-25.
2. Each task becomes a GitHub issue with a stage milestone and labels, so it can be tracked and
   discussed. The issue number is written back next to the task.
3. A repeatable sync: `scripts/issue-sync.mjs` reports unticked tasks that have no issue, and ticked
   tasks whose issue is still open. It also creates missing issues on request (the `sp.taskstoissues`
   flow, run with `gh` because no GitHub MCP server is connected).
4. A Projects board (Todo, In progress, Blocked on owner, In review, Done) once the owner grants the
   `project` token scope.

## Owner rulings (2026-11-25)

- Scope: everything (open tasks, backlog, open curriculum gaps, new tasks).
- Tracking: labels, stage milestones and a Projects board.
- The admin guide moves into the admin console behind the admin role check.

## Rules

- Any task left unticked at the end of a feature PR carries an issue number `(#N)`; PRs close issues
  with `Closes #N` (AGENTS.md, Work records).
- Unit assessment cards (T021) change rendering only: no unit MDX edits, no answer keys on the client.
- Nothing here edits `specs/content/`, gate scripts or `Scheme-and-Course-guides/`, so no G2/G3
  evidence goes stale. Tasks that would (T024, T049) say so and need the owner's approval.

## Success criteria

- `node scripts/issue-sync.mjs` reports zero unticked tasks without an issue across `specs/**/tasks.md`.
- Every stage milestone's open issue count matches the unticked tasks of that stage.
