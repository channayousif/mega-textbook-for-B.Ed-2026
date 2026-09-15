# /sp.plan - Create Implementation Plan

## Phase 0: Research & Discovery

1. Read the feature spec: `specs/{{FEATURE_DIR}}/spec.md`
2. Read the constitution: `.specify/memory/constitution.md`
3. Read existing plans for patterns: `specs/*/plan.md` (most recent 2-3)
4. Check for existing research: `specs/{{FEATURE_DIR}}/research.md`

## Phase 1: Constitution Check

Verify the plan aligns with the current constitution version. Check:
- Article III: Content Quality Standards
- Article IV: Spec-Driven Development Law
- Article V: Architecture Principles
- Article VI: Scope Discipline
- Article VII: Review Gates

## Phase 2: Technical Context

Extract from spec and research:
- Language/Version
- Primary Dependencies
- Storage
- Testing approach
- Target Platform
- Performance Goals
- Constraints

## Phase 3: Project Structure

Define the directory layout for this feature.

## Phase 4: Write Plan

Create `specs/{{FEATURE_DIR}}/plan.md` from template `.specify/templates/plan-template.md`.

## Phase 5: Update Agent Context

Run: `.specify/scripts/bash/update-agent-context.sh opencode`

## Output

- Plan written to `specs/{{FEATURE_DIR}}/plan.md`
- Constitution check results
- Next: Run `/sp.tasks` to create the task list
