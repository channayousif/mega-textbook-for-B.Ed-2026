# /sp.tasks - Create Task List

## Prerequisites

- `specs/{{FEATURE_DIR}}/plan.md` must exist (run `/sp.plan` first)

## Steps

1. Read the plan: `specs/{{FEATURE_DIR}}/plan.md`
2. Read the spec: `specs/{{FEATURE_DIR}}/spec.md`
3. Read the constitution: `.specify/memory/constitution.md`
4. Check for existing tasks: `specs/{{FEATURE_DIR}}/tasks.md`

## Task Generation Rules

- Group tasks by user story (US1, US2, US3...)
- Each task must have a clear acceptance criterion
- Include exact file paths
- Mark parallel tasks with [P]
- Order: Phase 1 (Setup) → Phase 2 (Foundation) → Phase 3+ (User Stories)

## Output

- Tasks written to `specs/{{FEATURE_DIR}}/tasks.md`
- Format: `[ID] [P?] [Story] Description`
