---
id: 20261280
title: Redesign the closing panel's climbing character
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-climb-redesign
user: M Yousif Channa
command: continue to next issue (#804)
labels: [board-direct, landing]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#804"
  adr: null
  pr: null
files:
  - src/components/landing/ClimbArt.tsx
  - src/components/landing/climb.module.css
  - specs/034-backlog-tracking/tasks.md
tests:
  - Standalone render (esbuild + renderToStaticMarkup) with frames captured at 0.6-7 s in LTR and RTL via Playwright (scratchpad)
---

## Prompt

merge on green, close the issues when done. continue to next issue

## Response snapshot

The old climb was confusing: a figure at a quarter of the art's height walked a 9.4 s glide over
five unlabelled steps. The redesign ties it to the page's own story: four steps carrying the same
icons as the "Read, Practise, Check, Apply in your school" ladder higher on the page; each step's
badge lights as she reaches it; she is 25% larger; step-ups are arcs; the amber trace follows her;
the climb takes 6 s; on the top step she lifts her book under the star. The viewBox grows to
560x280 to fit the raised book. Badge icons are flipped back on Urdu pages so they never read
mirrored. Reduced motion, no JavaScript and server HTML show the end pose. Keyframes are
generated from the step geometry. Frames were checked in both directions.

## Outcome

- ✅ Impact: the closing animation tells one clear story that matches the page.
- 🧪 Tests: frame captures in LTR and RTL.
- 📁 Files: see list above.
- 🔁 Next prompts: Stage 4 (#806 notes widget, #807 untranslated pages, #808 assessment cards).
- 🧠 Reflection: rendering one component standalone (esbuild local-css + Web Animations currentTime) gives deterministic animation frames without a site build.

## Handoff (for CEO and agents)

- Shipped / changed: #804 PR, held for the owner's approval (the issue's done-when).
- Decisions the team must respect: the closing art's steps mirror the climb section's four icons; keep them in step if that ladder changes.
- Pending / next owner: owner approves the frames, then the PR merges.
- Paperclip issues affected: none; GitHub #804.

## Evaluation notes (flywheel)

- Failure modes observed: the first version drew the trace at a constant rate, running ahead of her; fixed by deriving trace keyframes from her path.
- Graders run and results (PASS/FAIL): visual frames PASS (agent check); owner approval pending
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
