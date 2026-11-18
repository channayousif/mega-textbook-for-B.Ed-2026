---
id: 20261171
title: Redesign PR 2 icon pack, patterns, motion hook and ui primitives
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/redesign-icons
user: M Yousif Channa
command: none
labels: [board-direct, redesign, icons]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/icons/paths.ts
  - src/components/icons/Icon.tsx
  - src/components/icons/styles.module.css
  - src/components/ui/ (PageHeader, Panel, StatTile, StatusPill, EmptyState, DataTable, FormField, LoadingMark)
  - src/lib/useReveal.ts
  - src/lib/dashboardNav.ts
  - src/components/AppDashboardShell.tsx
  - src/css/tokens.css
  - src/css/custom.css
  - static/img/patterns/
  - tests/unit/icon-pack.test.mjs
tests:
  - npx vitest run tests/unit/icon-pack.test.mjs
  - npx tsc --noEmit
  - npm run build
---

## Prompt

ok good, delete the safer ones, now continue to redesign job

## Response snapshot

Second redesign PR, built from the board drawings: the 78-icon pack (24px grid, 1.8 stroke, base path in currentColor plus an amber accent path, three icons mirrored in RTL), shared app primitives in src/components/ui/, a reveal-on-scroll hook that leaves content visible without JavaScript and under reduced motion, three pattern SVGs under 2 KB, and icons beside each dashboard menu item. No page layout changes beyond the menu icons.

## Outcome

- ✅ Impact: the building blocks PRs 3 to 8 use; the dashboard menu gains icons.
- 🧪 Tests: icon-pack unit test (3 pass); tsc clean for new files (pre-existing errors in LogoCarousel, CourseNavBar and Footer are unchanged); build, see PR.
- 📁 Files: icons, ui primitives, useReveal, patterns, dashboard nav.
- 🔁 Next prompts: PR 3 landing and site art.
- 🧠 Reflection: the board icon source carried numbers like 4.800; the emitter trims them so the module stays small.

## Handoff (for CEO and agents)

- Shipped / changed: `@site/src/components/icons/Icon` (name, size, accent, label) and `ICONS`; `@site/src/components/ui` primitives; `useReveal` with `[data-reveal]` CSS in tokens.css; static/img/patterns/.
- Decisions the team must respect: icons are decorative unless given `label`; status pills always pair an icon with a word, never colour alone; every pill colour pair is measured AA in light and dark; new motion must stop under prefers-reduced-motion and leave content visible without JavaScript.
- Pending / next owner: owner review and merge; PRs 3 to 8 adopt these primitives.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a regex edit first put the nav icon inside the label object; tsc caught it.
- Graders run and results (PASS/FAIL): vitest PASS, tsc PASS for changed files.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
