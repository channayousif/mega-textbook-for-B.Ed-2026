---
id: 20261176
title: Redesign PR 7 teacher, classes, admin, reviewer and G3 desk screens
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/redesign-staff
user: M Yousif Channa
command: none
labels: [board-direct, redesign, dashboard]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/app/teacher/*.tsx, classes/*.tsx, admin/*.tsx, profile.tsx (loading states)
  - src/components/AuthGuard.tsx, OwnerConsoleGuard.tsx, ReviewerGuard.tsx, TeacherDashboardGuard.tsx
  - src/components/G3Desk.module.css
  - src/css/custom.css
tests:
  - npx tsc --noEmit
  - npm run check:all
---

## Prompt

merge on green, move on

## Response snapshot

PR 7 combines the plan's PRs 7 and 8, because PR 6's shared CSS already restyled every /app page's cards, titles and sidebar: 44 loading placeholders across teacher, classes, admin, profile and four guards become the branded loading mark; app tables get the Gradebook board's look (a teal rule under the header row, light row rules, tabular numbers, no zebra fill), scoped to app pages so course tables are untouched; the G3 desk's tiles and lanes become soft cards with the state colours unchanged. Queries, guards, routes and test ids are untouched.

## Outcome

- ✅ Impact: all signed-in areas share the v2 look.
- 🧪 Tests: tsc clean for changed files; check:all see PR; signed-in e2e in CI.
- 📁 Files: staff pages' loading states, guards, G3 desk CSS, app table CSS.
- 🔁 Next prompts: PR 8 clean-up (v1 leftovers, unused CSS, budgets).
- 🧠 Reflection: the plan's separate teacher and admin PRs were mostly covered by shared CSS in PR 6, so one smaller PR replaced two.

## Handoff (for CEO and agents)

- Shipped / changed: every /app loading state uses `ui/LoadingMark`; app table styling lives under .dashboard-shell__main, .work-panel and .table-scroll.
- Decisions the team must respect: G3 desk state colours are semantic and stay as they are; course-page tables keep their own styling.
- Pending / next owner: signed-in screenshots need owner test logins.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): see PR.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
