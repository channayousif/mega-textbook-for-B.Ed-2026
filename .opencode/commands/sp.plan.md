---
description: "Create an implementation plan for a feature"
---

# /sp.plan

Create an implementation plan for the current feature.

## Steps

1. Read the feature spec from `specs/*/spec.md` (detect from branch or ask user)
2. Read the constitution at `.specify/memory/constitution.md`
3. Read existing plans for patterns (most recent 2-3 in `specs/*/plan.md`)
4. Verify constitution alignment (Articles III, IV, V, VI, VII)
5. Extract technical context from spec and research
6. Define project structure
7. Write plan to `specs/<feature>/plan.md` using template from `.specify/templates/plan-template.md`
8. Run `.specify/scripts/bash/update-agent-context.sh opencode` to update agent context

## Output

- Plan written to `specs/<feature>/plan.md`
- Constitution check results
- Next step: run `/sp.tasks` to create the task list
