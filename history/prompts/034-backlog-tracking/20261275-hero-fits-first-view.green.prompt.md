---
id: 20261275
title: Landing hero fits the first viewport
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-hero-fits-view
user: M Yousif Channa
command: continue to next issue (#800)
labels: [board-direct, landing]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#800"
  adr: null
  pr: null
files:
  - src/pages/index.tsx
  - src/components/landing/landing.module.css
  - src/css/custom.css
  - specs/034-backlog-tracking/tasks.md
tests:
  - Playwright measurement against production with the new CSS injected and the ticker moved (scratchpad script, run through scripts/heavy.sh)
  - CI build and e2e on the PR
---

## Prompt

merge on green, close the issues when done. continue to next issue

## Response snapshot

Measured production: at 1366x768 the hero buttons ended at 970 px (navbar 114 px, two-row news
ticker 108 px, hero padding, a 5-line H1); at 360x740 they ended at 863 px. Prototyped CSS on the
live page with Playwright, then ported it: the news ticker now renders after the hero; hero padding
scales with viewport height; the text column is wider (1.12fr/0.88fr); tagline, H1 and lead margins
are tighter; phones get a smaller tagline, H1 and buttons; Urdu desktop H1 is smaller but keeps the
2.6 Nastaliq line height; a navbar dropdown label no longer wraps under its caret. Measured after
(prototype): CTA bottoms 607-727 px on 1280x720, 1366x768 and 1920x1080 (EN and UR), and 495-521 px
on 390x844 and 360x740 with the ticks visible too. The tall bilingual header logo is kept (logo kit
ruling).

## Outcome

- ✅ Impact: heading, lead and buttons are in the first view at common desktop and phone sizes.
- 🧪 Tests: prototype measurements above; CI build and e2e on the PR.
- 📁 Files: see list above.
- 🔁 Next prompts: #801 mobile navbar.
- 🧠 Reflection: injecting candidate CSS into production with Playwright is a cheap substitute for a local build while the agents slice cannot fit one.

## Handoff (for CEO and agents)

- Shipped / changed: #800 (the PR closes it).
- Decisions the team must respect: the landing ticker sits below the hero; keep the 2.6 Nastaliq line height on Urdu headings.
- Pending / next owner: owner eyeballs the deployed hero; Stage 3 continues with #801.
- Paperclip issues affected: none; GitHub #800.

## Evaluation notes (flywheel)

- Failure modes observed: the first prototype applied the two-column grid to phones; fixed by limiting it to >= 997 px (the source keeps the existing 996 px single-column rule).
- Graders run and results (PASS/FAIL): measurement PASS at all ten viewport/locale pairs.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a Playwright e2e that asserts the hero CTA is above the fold.
