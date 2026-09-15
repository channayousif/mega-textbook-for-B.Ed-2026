# /sp.adr - Suggest Architecture Decision Record

## When to Suggest

After design/architecture work, test for ADR significance:

1. **Impact**: Long-term consequence? (framework, data model, API, security, platform)
2. **Alternatives**: Multiple viable options considered with tradeoffs?
3. **Scope**: Cross-cutting and influences system design?

If ALL three are true, suggest:
> "Architectural decision detected: [brief]. Document reasoning and tradeoffs?"

## Rules

- NEVER auto-create ADRs without user consent
- Group related decisions into one ADR when appropriate
- Wait for explicit user approval before proceeding

## Creation (after user consent)

1. Run: `.specify/scripts/bash/create-adr.sh --title "<title>" --json`
2. Fill template placeholders in `history/adr/NNNN-title.md`
3. Set status to "Proposed"
4. Link to related feature spec

## Output

- ADR created at `history/adr/NNNN-title.md`
- Status: Proposed (requires user review)
