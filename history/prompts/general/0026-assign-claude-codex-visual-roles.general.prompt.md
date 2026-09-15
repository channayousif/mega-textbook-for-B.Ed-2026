---
id: 0026
title: Assign Claude Codex Visual Roles
stage: general
date: 2026-09-15
surface: agent
model: GPT-5
feature: none
branch: chore/comparator-base-bank-decoupling-and-en-first
user: a2ahs
command: /sp.adr Capability-Based Claude and Codex Visual Authoring
labels: [agent-roles, image-generation, adr, course-figures]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
  - CLAUDE.md
  - AGENTS.md
  - README.md
  - .claude/skills/author-unit/references/figure-prompts.md
  - .claude/skills/generate-figures/SKILL.md
  - .claude/skills/generate-figures/references/svg-authoring.md
  - .claude/skills/generate-figures/references/raster-codex-handoff.md
  - .claude/skills/generate-figures/references/raster-hf-mcp.md (removed)
  - specs/009-figure-rendering/spec.md
  - specs/content/style-guide.md
  - history/adr/0012-figure-rendering-component-manifest-lifecycle-and-the-generate-figures-skill.md
  - history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  - history/prompts/general/0026-assign-claude-codex-visual-roles.general.prompt.md
tests:
  - npm run validate:content (PASS through check:content)
  - npm run check:docs-sync (PASS)
  - npm run check:no-em-dash (PASS)
  - npm run check:figures (PASS)
  - npm run check:pipeline-gate (FAIL on pre-existing EFMP-302 Units 2-5 draft tracker rows)
  - git diff --check (PASS)
  - ADR placeholder scan (PASS)
---

## Prompt

now tell the decision to claude in CLAUDE.md and run /sp.adr

## Response snapshot

Recorded the accepted capability-based Claude and Codex visual-authoring decision in CLAUDE.md
and ADR-0024. Claude now owns pedagogy, prompts, alt text and SVG schematics, while Codex owns
generated raster illustrations, raster editing, optimisation and placement. Updated the active
figure skills and documentation to remove the conflicting Claude Hugging Face generation route.

## Outcome

- ✅ Impact: Established one auditable figure handoff and exclusive raster ownership for Codex.
- 🧪 Tests: Documentation, figure and content-style checks passed; the full content wrapper stops
  at unrelated in-progress EFMP-302 tracker rows.
- 📁 Files: Updated both agent contracts, figure skills, active documentation and ADR-0024.
- 🔁 Next prompts: Use Claude to author an illustration brief, then ask Codex to render it.
- 🧠 Reflection: Assigning authority by asset type preserves Claude's text-native strengths and
  Codex's raster capability without changing the established figure schema.

## Evaluation notes (flywheel)

- Failure modes observed: The `/sp.adr` prerequisite script cannot resolve a `chore/...` branch;
  the prior Claude skill and Spec 009 still assigned raster generation to Hugging Face MCP.
- Graders run and results (PASS/FAIL): ADR significance PASS; alternatives and tradeoffs PASS;
  docs sync PASS; figure gate PASS; no-em-dash PASS; pipeline gate unrelated FAIL.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Exercise one real `Kind: illustration` manifest row
  through the Claude-to-Codex handoff and final content gates.
