---
description: "Create a Prompt History Record for the current interaction"
---

# /sp.phr

Create a Prompt History Record (PHR) for the current user interaction.

## When to Create

After every user message that involves implementation work, planning, debugging, spec/task/plan creation, or multi-step workflows.

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
5. Fill ALL placeholders: ID, TITLE, STAGE, DATE_ISO, SURFACE, MODEL, FEATURE, BRANCH, USER, COMMAND, LABELS, LINKS, FILES_YAML, TESTS_YAML, PROMPT_TEXT (verbatim), RESPONSE_TEXT, OUTCOME/EVALUATION fields
6. Write the completed file

## Shell Fallback

If agent-native tools unavailable:
```bash
.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json
```

## Validation

- No unresolved placeholders
- Title, stage, dates match front-matter
- PROMPT_TEXT is complete (not truncated)
- File exists at expected path
