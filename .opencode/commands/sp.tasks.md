---
description: "Create a task list from the implementation plan"
---

# /sp.tasks

Create a task list from the current feature's implementation plan.

## Prerequisites

- `specs/<feature>/plan.md` must exist (run `/sp.plan` first)

## Steps

1. Read the plan from `specs/<feature>/plan.md`
2. Read the spec from `specs/<feature>/spec.md`
3. Read the constitution at `.specify/memory/constitution.md`
4. Generate tasks grouped by user story (US1, US2, US3...)
5. Each task must have a clear acceptance criterion
6. Include exact file paths
7. Mark parallel tasks with [P]
8. Order: Phase 1 (Setup) -> Phase 2 (Foundation) -> Phase 3+ (User Stories)
9. Write to `specs/<feature>/tasks.md` using template from `.specify/templates/tasks-template.md`

## Output

- Tasks written to `specs/<feature>/tasks.md`
- Format: `[ID] [P?] [Story] Description`
