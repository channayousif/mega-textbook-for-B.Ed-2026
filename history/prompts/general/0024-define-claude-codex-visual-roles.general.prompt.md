---
id: 0024
title: Define Claude Codex visual roles
stage: general
date: 2026-09-14
surface: agent
model: GPT-5
feature: none
branch: chore/comparator-base-bank-decoupling-and-en-first
user: a2ahs
command: discussion
labels: [agent-roles, image-generation, course-figures]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0024-define-claude-codex-visual-roles.general.prompt.md
tests:
  - Reviewed existing figure skill, style guide, asset pipeline, and official Codex documentation
---

## Prompt

on this repo two agents claude and codex work togather, i want to develop roles for both such that they donot contraduct, claude cannot work on image generation since its a text only, i want to use codex for generating raster images and enrichment of visual elements in courses, can codex generate images?

## Response snapshot

Confirmed that Codex can generate and edit raster images through its built-in image generation tool. Recommended a capability-based division: Claude owns course prose, pedagogy, source accuracy, figure briefs, alt text, and deterministic SVG schematics; Codex owns raster generation and editing, image optimization, placement, and visual enrichment. The existing figure manifest and validation gates should serve as the handoff contract.

## Outcome

- Impact: Established a proposed non-overlapping responsibility model for Claude and Codex.
- Tests: Reviewed repository figure governance and official OpenAI documentation.
- Files: This prompt history record only.
- Next prompts: Formalize the role contract in repository agent instructions and update the figure-generation workflow.
- Reflection: Separate responsibilities by asset type and authority, with shared manifests as the coordination boundary.

## Evaluation notes (flywheel)

- Failure modes observed: The existing Claude figure skill still names a Hugging Face raster-generation route, which overlaps the proposed Codex role.
- Graders run and results (PASS/FAIL): Repository workflow inspection PASS; capability verification PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Add explicit Claude and Codex ownership sections and revise the raster route in the figure skill.
