---
id: 20261285
title: Full-size viewer for wide figures on phones
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-figure-zoom
user: M Yousif Channa
command: owner ruling on #822 and #809
labels: [board-direct, figures]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#822"
  adr: null
  pr: null
files:
  - src/components/FigureZoom.tsx
  - src/components/Figure.tsx
  - src/css/custom.css
  - tests/e2e/figure-zoom.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tsc (no errors in changed files)
  - tests/e2e/figure-zoom.spec.ts (CI)
---

## Prompt

(AskUserQuestion answers) #809: "Hold until the freeze batch (Recommended)". #822: "Tap to open full size (Recommended)".

## Response snapshot

#809 is held: a comment on the issue records the ruling, it carries `blocked:owner` and sits in
"Blocked on owner" on the board. For #822, every figure at least 700 px wide (or with no declared
width) gets a "View full size" control in its caption, shown only below 760 px. It opens a native
full-screen dialog with the figure at its natural width (at least 720 px; the dark variant in dark
mode), where the reader pans by scrolling and can pinch to zoom; Escape or the close button
closes it and focus returns. The inline figure and desktop layout are unchanged; print hides it.

## Outcome

- ✅ Impact: wide schematics become readable on phones in both languages.
- 🧪 Tests: e2e for the phone viewer and no control on desktop.
- 📁 Files: see list above.
- 🔁 Next prompts: #823 (scroll affordance) may now be unnecessary; #812 Chart.
- 🧠 Reflection: the corpus mostly declares 780 px or wider, and 656 figures declare no width, so the threshold covers nearly every schematic.

## Handoff (for CEO and agents)

- Shipped / changed: #822 (the PR closes it); #809 held for the freeze batch.
- Decisions the team must respect: owner ruling 2026-11-26: phones get a tap-to-open viewer, not forced inline scrolling; #809 waits for the freeze batch.
- Pending / next owner: owner tries the viewer on a phone after deploy.
- Paperclip issues affected: none; GitHub #822, #809.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): tsc PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
