---
id: 20261276
title: Mobile navbar initial avatar and sign-in icon
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-mobile-navbar-avatar
user: M Yousif Channa
command: continue to next issue (#801)
labels: [board-direct, navbar]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#801"
  adr: null
  pr: null
files:
  - src/components/MobileTopBarWidgets.tsx
  - src/components/MobileTopBarWidgets.module.css
  - i18n/ur/code.json
  - tests/e2e/mobile-navbar-avatar.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tsc (no errors in changed files)
  - tests/e2e/mobile-navbar-avatar.spec.ts (CI)
---

## Prompt

merge on green, close the issues when done. continue to next issue

## Response snapshot

In the phone top bar (`MobileTopBarWidgets`), the signed-in display-name pill (up to 76 px of
text) is now a round 36 px disc with the reader's initial inside a 44 px link, labelled "Your
profile: <name>" (Urdu: آپ کی پروفائل: <name>). Signed out, the "Sign in" text pill is a sign-in
icon in the same disc with the accessible name "Sign in". The bar now holds the hamburger, logo, the
compact EN | اردو toggle (the owner's 2026-11-08 choice, kept), the profile icon and search. The
unused `.pill` style is removed. Added an e2e for the signed-out icon.

## Outcome

- ✅ Impact: the phone top bar gives the logo more room; profile and sign-in are icons.
- 🧪 Tests: tsc clean; e2e on CI.
- 📁 Files: see list above.
- 🔁 Next prompts: #802 landing image optimisation.
- 🧠 Reflection: `initialOf` uses Array.from so an Urdu name's first letter is a whole code point.

## Handoff (for CEO and agents)

- Shipped / changed: #801 (the PR closes it).
- Decisions the team must respect: the language toggle stays the segmented EN | اردو control on phones.
- Pending / next owner: owner checks the bar on a phone after deploy.
- Paperclip issues affected: none; GitHub #801.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): tsc PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
