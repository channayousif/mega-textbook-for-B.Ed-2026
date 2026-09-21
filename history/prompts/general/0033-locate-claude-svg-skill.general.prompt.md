---
id: 0033
title: Locate Claude SVG Skill
stage: general
date: 2026-09-21
surface: agent
model: GPT-5
feature: none
branch: main
user: unknown
command: repository skill discovery
labels: [svg, claude-skills, figures]
links:
  spec: null
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
 - history/prompts/general/0033-locate-claude-svg-skill.general.prompt.md
tests:
 - Not run (documentation lookup only)
---

## Prompt

look for claude skill to generate svg images

## Response snapshot

Located `.claude/skills/generate-figures/SKILL.md`. It renders figure markers into SVG schematics, with Codex as the primary SVG author and Claude as the fallback. Claude prepares the handoff, then optimises, places, mirrors, and validates completed figures.

## Outcome

- ✅ Impact: Identified the repository workflow for SVG figure generation.
- 🧪 Tests: Not run; no implementation changed.
- 📁 Files: Added this prompt history record only.
- 🔁 Next prompts: Provide a course and unit to generate its schematic figures.
- 🧠 Reflection: The skill clearly separates schematic SVGs from raster illustrations under ADR-0024.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): Not applicable.
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): Inspect a target unit's figure markers before rendering.
