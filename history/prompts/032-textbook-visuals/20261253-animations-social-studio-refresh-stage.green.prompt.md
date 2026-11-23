---
id: 20261253
title: Process the unfinished plans - animations in posts and Studio, refresh_figures crew stage, fig-U4-1 raster row
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/032-raster-and-media
user: M Yousif Channa
command: what are you waiting for? start processing it
labels: [board-direct, figures, crew, social]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/social/updates.mjs (animation media lines)
  - scripts/build-studio-index.mjs, src/components/Studio/StudioPanel.tsx (Animations tab)
  - tests/e2e/figure-animation.spec.ts
  - scripts/crew/{crew,planner,review-facts,workers}.mjs, ops/crew/README.md (refresh_figures)
  - specs/content/efmp-301/figures/unit-04.md (fig-U4-1 raster row), G2 evidence, tracker
  - specs/031-social-updates/tasks.md, specs/032-textbook-visuals/tasks.md
tests:
  - node --test tests/crew/*.test.mjs (169 pass)
  - vitest social-updates, figure-animations, studio tests (pass)
  - npm run check:content (pass)
---

## Prompt

what are you waiting for? start processing it,

## Response snapshot

- Removed 10 merged worktrees (kept wt-teasers: the host cross-post job points at it).
- fig-U4-1 raster: every image producer is out (Codex monthly limit until 18 December, agy until
  2026-11-24 11:00 UTC, gflow offline). The manifest row is now Kind illustration, prompt-only,
  with a no-text prompt and a full description; the crew illustrate job will place it.
- Social roundup announces public animated figures as media lines.
- Study Studio panel lists a topic's animations in an Animations tab; the Gemini disclaimer shows
  only when Notebook items are present.
- e2e spec for Watch it animate.
- Crew stage refresh_figures with an owner switch (`crew refresh on|off`), the candidate rule
  (uncertified, not awaiting sign-off, unstructured schematics), one job at a time, brief, tests.
- Phase C (flashcards, self-check) needs an owner decision: Unit 4 marks only one glossary term and
  two key terms, so cards would need new authored definitions; self-check needs server-side marking.

## Outcome

- ✅ Impact: animations reach posts and the Study Studio; the crew can redraw figures on the owner's word.
- 🧪 Tests: crew 169 pass; vitest pass; check:content pass.
- 📁 Files: see front matter.
- 🔁 Next prompts: queue the illustrate job for EFMP-301 U4 with a note to swap the SVG Figure;
  owner `crew refresh on` after a pilot; owner decision on Phase C data; Phase B slides.
- 🧠 Reflection: the plan's flashcard source assumed glossary coverage the corpus does not have.

## Handoff (for CEO and agents)

- Shipped / changed: see files.
- Decisions the team must respect: D-2026-0097, D-2026-0098; refresh_figures never on certified or
  sign-off units; off until the owner switches it on.
- Pending / next owner: Claude: illustrate job for fig-U4-1, Phase B. Owner: refresh pilot go-ahead,
  Phase C data source.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an escaped closing backtick in a brief template; a test pinning every
  stage chain (updated).
- Graders run and results (PASS/FAIL): crew tests PASS; content gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): dry-run the planner with refresh on and list candidates.
