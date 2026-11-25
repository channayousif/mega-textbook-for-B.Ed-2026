---
id: 20261278
title: Learning aids and Features become carousels
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-carousels
user: M Yousif Channa
command: continue to next issue (#803)
labels: [board-direct, landing]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#803"
  adr: null
  pr: null
files:
  - src/components/landing/Carousel.tsx
  - src/components/landing/carousel.module.css
  - src/components/landing/landing.module.css
  - src/pages/index.tsx
  - tests/e2e/landing-carousel.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tsc (no errors in changed files)
  - tests/e2e/landing-carousel.spec.ts (CI)
---

## Prompt

merge on green, close the issues when done. continue to next issue

## Response snapshot

Added a `Carousel` component: a native scroll-snap row (three cards on desktop, two on tablets, one
plus a peek on phones) with previous/next buttons that scroll one page, arrow-key support on the
focusable track, disabled buttons at either end, reduced-motion support, RTL-aware direction and
chevrons, a print fallback to a three-column grid, and no-JavaScript reading as a plain scrollable
row (buttons render after hydration). "Learning aids" (gallery) and "Features" now use it; the
gallery's rotation and grid rules are gone (the caption style is kept), and the gallery images'
`sizes` follow the new card widths. Stacked on the #802 branch because both edit the gallery.

## Outcome

- ✅ Impact: both sections swipe on phones and scroll with buttons or keys elsewhere.
- 🧪 Tests: e2e for buttons and keys in English and Urdu; CI build.
- 📁 Files: see list above.
- 🔁 Next prompts: #804 moving character, #805 Become a reviewer section.
- 🧠 Reflection: no local build was possible (agents slice at 5.3 of 6 GiB), so behaviour is pinned by e2e instead of screenshots.

## Handoff (for CEO and agents)

- Shipped / changed: #803 (the PR closes it).
- Decisions the team must respect: reuse `src/components/landing/Carousel.tsx` for any further landing card rows.
- Pending / next owner: owner eyeballs the carousels after deploy.
- Paperclip issues affected: none; GitHub #803.

## Evaluation notes (flywheel)

- Failure modes observed: carousel files first landed in the #802 worktree; moved with a stash to a stacked branch.
- Graders run and results (PASS/FAIL): tsc PASS for changed files
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
