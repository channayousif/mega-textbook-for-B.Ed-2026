---
id: 20261249
title: Textbook visuals - which skills to adopt, the router skill and the four-phase plan
stage: plan
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/032-textbook-visuals
user: M Yousif Channa
command: analyse the repo and suggest the best solution
labels: [board-direct, figures, skills]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/textbook-visuals/SKILL.md
  - specs/032-textbook-visuals/spec.md
  - specs/032-textbook-visuals/tasks.md
  - specs/decisions/log.md
tests:
  - node scripts/check-docs-sync.mjs
---

## Prompt

analyse the repo also search yourself and suggest the best solution: i also searched and got the answer: search ten skills for claude for web texttbook to illustate topics of book and create diagrams, presentations and tables and make the book interactive [list of ten skills: canvas-design, svg-diagram/diagram-design, excalidraw, mermaid, d3-visualization, frontend-slides, pptx, xlsx, web-artifacts-builder/inline-visualizer, frontend-design; install via the Anthropic marketplace and community repos; a master textbook-style skill]

we can rewrite existing figures and diagrams to improved versions

(owner choices: "Uncertified first"; "Crew stage, course by course"; earlier: "Both, in two PRs";
"Study Studio videos, Social and Shorts, On the topic page"; "Silent + on-screen captions";
"EFMP-301 Unit 4")

## Response snapshot

- Analysis against the repo's rules (review-bound MDX and figures, data-driven enhancement, Urdu
  RTL, accessibility, print, host limits, no media in git). canvas-design, pptx, xlsx, docx,
  frontend-design, theme-factory, dataviz and skill-creator are already installed.
- Verdicts: keep generate-figures over generic SVG skills; Mermaid only as a layout aid; skip
  excalidraw; canvas-design only for posters and social art; adopt frontend-slides (MIT), pptx,
  light xlsx, dataviz for GQUR charts; build flashcards, self-checks and charts as data-driven
  components; adopt animated-diagrams for animated figures.
- Redrawing figures: 104 uncertified units (605 English schematics) via a crew stage first;
  35 certified units (215) only when they next re-open for review; units awaiting G3 sign-off
  excluded too. Reason: placed figures are bound into G2/G3 evidence; G2 regenerates
  automatically, G3 needs a fresh review and the owner's sign-off.
- This PR: the `textbook-visuals` router skill, Feature 032 spec and tasks, D-2026-0097.

## Outcome

- ✅ Impact: one place decides how a topic is shown, under one shared look.
- 🧪 Tests: docs-sync.
- 📁 Files: see front matter.
- 🔁 Next prompts: Phase A animated figures (tool install, pipeline, EFMP-301 U4 pilot); Phase D crew stage.
- 🧠 Reflection: most "install these ten skills" lists ignore a repo's evidence rules; data-driven
  components are what let a reviewed book grow new visuals.

## Handoff (for CEO and agents)

- Shipped / changed: router skill, spec, tasks, decision entry.
- Decisions the team must respect: D-2026-0097; never rewrite review-bound files to add a visual.
- Pending / next owner: Claude: Phases A to D in order.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): route new figure markers through the router at authoring time.
