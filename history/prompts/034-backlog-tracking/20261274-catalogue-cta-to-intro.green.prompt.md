---
id: 20261274
title: Point the catalogue CTAs at /intro
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-stage2-quick-fixes
user: M Yousif Channa
command: owner ruling on #798
labels: [board-direct, landing]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#798"
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/870
files:
  - src/pages/index.tsx
tests:
  - CI build on PR #870
---

## Prompt

yes

(Context: asked whether "Explore the course catalogue" should go to `/intro` instead of the on-page programme chooser `#who`.)

## Response snapshot

Changed both landing CTAs (hero, and "Start with one topic today") in `src/pages/index.tsx` from `#who` to `/intro`. The analytics event names are unchanged.

## Outcome

- ✅ Impact: the CTA label and its destination now match.
- 🧪 Tests: CI build on PR #870.
- 📁 Files: src/pages/index.tsx
- 🔁 Next prompts: Stage 3 (#800-#805).
- 🧠 Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: landing CTAs go to `/intro` (part of #798, PR #870).
- Decisions the team must respect: owner ruling 2026-11-26: "Explore the course catalogue" links to `/intro`.
- Pending / next owner: none.
- Paperclip issues affected: none; GitHub #798.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
