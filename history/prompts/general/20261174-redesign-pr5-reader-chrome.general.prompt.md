---
id: 20261174
title: Redesign PR 5 reader chrome
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/redesign-reader
user: M Yousif Channa
command: none
labels: [board-direct, redesign, reader]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/CourseNavBar/index.tsx
  - src/components/CourseNavBar/styles.module.css
  - src/css/tokens.css
tests:
  - npx tsc --noEmit
  - npm run build
  - npm run check:all
---

## Prompt

Change the video mark, continue merge  PR 1 2 3, move to next

## Response snapshot

Merged #487 after its CI passed on the main-merged head; #485 and #486 deployed live and were checked on textbook.com.pk (theme colour, manifest, v2 logo and favicon). Then PR 5, reader chrome from the v2 Reader board, with no change to running text or print: a unit progress strip along the course bar's bottom edge (one segment per topic, earlier topics teal, the current one amber, with an EN/UR label for screen readers); topic-cycle section headings get icon tiles from the PR 2 pack (teal line, amber accent on a tint square, a dark-mode set, hidden in high-contrast mode); the current topic in the full topic list is a teal pill; and the Next card is the one filled card.

## Outcome

- ✅ Impact: reader pages take the v2 identity around the text; reading column, tools and print unchanged.
- 🧪 Tests: tsc clean for changed files; build PASS; screenshots of a topic page EN light, UR dark, phone, section heading and Next card; strip labels read "Topic 2 of 4 in this unit" and its Urdu form; no overflow.
- 📁 Files: course bar, its styles, tokens.css reader rules.
- 🔁 Next prompts: PR 6 auth and student dashboard.
- 🧠 Reflection: the strip shows position, not completion, so it needs no account or stored progress.

## Handoff (for CEO and agents)

- Shipped / changed: `UnitSteps` in CourseNavBar reads the last breadcrumb level and counts only /topic-NN/ pages; topic section icons are data URIs generated from src/components/icons/paths.ts.
- Decisions the team must respect: nothing animated or patterned behind running text; section icons stay decorative and disappear in high-contrast mode; new icon tiles should be generated from the pack, not drawn separately.
- Pending / next owner: owner review and merge; PR 4 (#488) awaits review too.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: custom.css loads after tokens.css, so the Next card rule needed a two-class selector to win.
- Graders run and results (PASS/FAIL): build PASS; check:all see PR.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
