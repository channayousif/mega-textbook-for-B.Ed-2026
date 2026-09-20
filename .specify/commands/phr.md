# /sp.phr - Create Prompt History Record

## When to Create

After every user message that involves:
- Implementation work (code changes, new features)
- Planning/architecture discussions
- Debugging sessions
- Spec/task/plan creation
- Multi-step workflows

## PHR Location Rules

All PHRs live under `history/prompts/`:

1. **Constitution stage**: `history/prompts/constitution/`
   - Naming: `0001-title.constitution.prompt.md`

2. **Feature stages**: `history/prompts/<feature-name>/`
   - Stages: spec, plan, tasks, red, green, refactor, explainer, misc
   - Naming: `0001-title.<stage>.prompt.md`

3. **General stage**: `history/prompts/general/`
   - Naming: `0001-title.general.prompt.md`

## Creation Process

1. Detect stage from context
2. Generate title (3-7 words, slug for filename)
3. Allocate ID (increment from existing)
4. Copy template from `.specify/templates/phr-template.prompt.md`
5. Fill ALL placeholders:
   - ID, TITLE, STAGE, DATE_ISO, SURFACE="agent"
   - MODEL, FEATURE, BRANCH, USER
   - COMMAND, LABELS
   - LINKS: SPEC/TICKET/ADR/PR
   - FILES_YAML, TESTS_YAML
   - PROMPT_TEXT (verbatim, not truncated)
   - RESPONSE_TEXT (concise but representative)
   - OUTCOME/EVALUATION fields

## Shell Fallback

If agent-native tools unavailable:
```bash
.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json
```

## Validation

- No unresolved placeholders
- Title, stage, dates match front-matter
- PROMPT_TEXT is complete
- File exists at expected path
