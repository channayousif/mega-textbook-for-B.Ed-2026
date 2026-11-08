---
id: 20261182
title: Dashboard rebuild PR E, teacher and classes pages
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/teacher-pages
user: M Yousif Channa
command: none
labels: [board-direct, redesign, dashboard, accessibility]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/app/teacher/index.tsx and the other teacher pages
  - src/pages/app/classes/*.tsx
  - src/components/ui/AppPageTitle.tsx, ui.module.css, index.ts
  - src/css/app.css
tests:
  - npx tsc --noEmit
  - node scripts/qa/shoot-app.mjs --roles teacher
  - npx playwright test (teacher and classes specs)
  - npm run check:all
---

## Prompt

merge on green, move on

continue

## Response snapshot

Approved plan PR E on the shell from PR C. Teacher home: a welcome card with the next action (ungraded count and Grade now, or the soonest due date, or the clear-state message), four stat tiles, and list cards for ungraded submissions by class (data-testid ungraded-count-row kept; the per-class Analytics, Roster and Grading links became chip buttons, fixing axe link-in-text-block), upcoming due dates, recent activity and quick links; "caught up" appears once. Every teacher and classes page now has a page header with an icon (AppPageTitle supplies a localized one where the content had no title). Analytics bars and quiz-authoring cards moved from inline styles to CSS; list rows wrap instead of squeezing titles; long sidebar labels wrap; bare forms and tables get card surfaces; every classes table scrolls inside a focusable, named region, which fixed a phone overflow the screenshots found on /app/classes. No query, test id, label or route changed.

## Outcome

- ✅ Impact: the teaching area shares the student area's layout and components.
- 🧪 Tests: tsc clean; npm run check:all 20/20 PASS; 72 signed-in teacher shots (EN and UR, light and dark, 1440 and 390): no overflow, no broken images, zero axe violations; 21 tests in 16 teacher, classes and a11y e2e specs PASS locally against the live Supabase after two CSS fixes.
- 📁 Files: teacher and classes pages, AppPageTitle, ui and app CSS.
- 🔁 Next prompts: PR F admin, reviewer and profile.
- 🧠 Reflection: card styling on bare tables needs a scroll wrapper, or wide tables push the page sideways on phones.

## Handoff (for CEO and agents)

- Shipped / changed: teacher home on WelcomeCard, StatTile and ListCard; AppPageTitle; .chip-link, .row-actions, .table-scroll regions.
- Decisions the team must respect: actions inside list rows are chip links, not inline text links; wide tables always sit in a .table-scroll region with a name and tabIndex.
- Pending / next owner: PR F.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: forcing display: table on bare tables removed Infima's in-place scrolling (caught by teacher-dashboard-rtl on /ur/app/admin/suggestions); an absolutely positioned sr-only label escaped a scroll box; chips squeezed row titles to one letter; bare tables overflowed phones; a scripted edit left a duplicate className that tsc caught.
- Graders run and results (PASS/FAIL): check:all PASS; e2e PASS; shots clean.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
