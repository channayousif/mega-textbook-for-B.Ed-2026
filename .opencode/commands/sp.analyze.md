---
description: "Analyze feature scope, dependencies, and risks"
---

# /sp.analyze

Analyze the full scope of a feature before planning.

## When to Use

Before planning, to understand the full scope of a feature.

## Process

1. Read the feature spec from `specs/*/spec.md`
2. Read the constitution at `.specify/memory/constitution.md`
3. Check for existing research in `specs/*/research.md`
4. Identify dependencies, risks, and open questions
5. Check for spec drift (code diverging from spec)

## Output

- Scope summary
- Dependency list
- Risk assessment
- Open questions for user
- Recommendation: proceed to `/sp.plan` or clarify first
