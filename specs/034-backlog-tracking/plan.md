# Plan: Feature 034

Approved by the owner on 2026-11-25 (session plan `create-a-plan-with-jiggly-raven`).

## Stages (each stage is a GitHub milestone)

| Stage | Milestone | Content |
|---|---|---|
| 0 | (this PR) | Spec, labels, milestones, issue template, `issue-sync.mjs`, AGENTS.md rule, superseded plans closed out, backlog triage |
| 1 | (this PR) | Issues created from `tasks.md`, numbers written back |
| 2 | Stage 2 - Quick fixes | Navbar label, CTA copy, admin guide move |
| 3 | Stage 3 - Landing and navbar | Hero above the fold, mobile navbar, images, carousels, character, reviewer section |
| 4 | Stage 4 - Learning features | Floating notes, untranslated-page toggle and callout, assessment cards |
| 5 | Stage 5 - Carried-over engineering | Leftovers from 013, 028, 029, 032 and relevant backlog items |
| 6 | Stage 6 - Owner and infrastructure | Owner-blocked work and open curriculum gaps |

## Labels

- `area:landing`, `area:navbar`, `area:assessment`, `area:notes`, `area:i18n`, `area:admin`,
  `area:crew`, `area:media`, `area:content`, `area:figures`, `area:platform`, `area:ops`,
  `area:review-gov`, `area:curriculum`
- `type:new`, `type:carryover`, `type:backlog`, `type:curriculum-gap`
- `priority:p1`, `priority:p2`, `priority:p3`
- `blocked:owner` for tasks only the owner can unblock

## Tracking loop

1. New or leftover task: add it to the feature's `tasks.md` (or this one), run
   `node scripts/issue-sync.mjs --create specs/<feature>/tasks.md`.
2. Work happens on a branch; the PR says `Closes #N` and ticks the task.
3. `node scripts/issue-sync.mjs` (read-only) lists drift: unticked without an issue, ticked with the
   issue still open.

## Task line format (parsed by `scripts/issue-sync.mjs`)

```
- [ ] T010 Short imperative title (#123)
  - Stage: 2 | Area: navbar | Type: new | Priority: p1 | Owner: no
  - Source: where the task came from
  - Done when: acceptance criteria
```

`Owner: yes` adds `blocked:owner`. Lines after `Done when:` until the next task become the issue body.
