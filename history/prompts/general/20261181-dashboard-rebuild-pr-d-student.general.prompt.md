---
id: 20261181
title: Dashboard rebuild PR D, student pages
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/student-pages
user: M Yousif Channa
command: none
labels: [board-direct, redesign, dashboard, accessibility]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/app/dashboard/index.tsx, progress.tsx, assignments.tsx, grades.tsx, history.tsx, achievements.tsx, notes.tsx, classes.tsx
  - src/components/ui/Donut.tsx
  - src/css/app.css
tests:
  - npx tsc --noEmit
  - node scripts/qa/shoot-app.mjs --roles student (88 shots)
  - npx playwright test (11 student specs, 16 tests)
  - npm run check:all
---

## Prompt

merge on green, move on

## Response snapshot

Approved plan PR D, the student area on PR C's shell and primitives. Home: a welcome card whose greeting is the page h1, naming the next assignment and its due time with one action (or the join-a-class or nothing-due message), four stat tiles (classes this semester, assignments to do, recent average with a meter, badges earned), and list cards for due soon (each row keeps data-testid due-soon-item), recent grades with bars, your classes and recently earned badges; "all caught up" appears once, in Due soon. Progress: a page header, a donut for courses with progress, a bar chart of units covered per course with a hidden data table, each course as a card with a named progress bar (fixing axe aria-progressbar-name) and its unit buttons, and the self-assessment card. Assignments, grades and classes use DataTable (a named, focusable scroll region) with status pills and grade bars; history, achievements and notes get page headers and cards. Inline styles moved to app.css except two computed bar widths. No query, test id, label or route changed.

## Outcome

- ✅ Impact: the student area reads as one app with a clear next step and real numbers.
- 🧪 Tests: tsc clean; 88 signed-in student shots (EN and UR, light and dark, 1440 and 390): no overflow, no broken images, zero axe violations; 16 student e2e tests PASS locally against the live Supabase after one fix; check:all see PR.
- 📁 Files: eight student pages, Donut, app.css.
- 🔁 Next prompts: PR E teacher and classes; PR F admin, reviewer and profile.
- 🧠 Reflection: chart labels that repeat a course code broke two specs' exact text matches; data shown twice needs a different spelling in the chart.

## Handoff (for CEO and agents)

- Shipped / changed: student pages use WelcomeCard, StatTile, ListCard, DataTable, StatusPill, Donut, BarChart, EmptyState.
- Decisions the team must respect: specs match course codes and some phrases exactly once per page; charts label courses with a space ("EFMP 301"); keep "all caught up" in one place.
- Pending / next owner: PRs E and F.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: duplicate course-code text from the chart; a 0% donut drew a dot from its round cap.
- Graders run and results (PASS/FAIL): e2e PASS after the fix; shots clean.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
