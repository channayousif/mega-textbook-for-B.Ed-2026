---
id: 20261175
title: Redesign PR 6 sign-in pages and student dashboard; merge PRs 4 and 5 on green
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/redesign-student
user: M Yousif Channa
command: none
labels: [board-direct, redesign, auth, dashboard]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/AuthFrame.tsx
  - src/pages/app/login.tsx
  - src/pages/app/signup.tsx
  - src/pages/app/reset.tsx
  - src/pages/app/confirm-feedback.tsx
  - src/components/AchievementBadge.tsx
  - src/pages/app/dashboard/*.tsx (loading states, achievements)
  - src/components/StudentDashboardGuard.tsx
  - src/css/custom.css
tests:
  - npx tsc --noEmit
  - npm run build
  - npm run check:all
  - npx playwright test (auth and dashboard specs)
---

## Prompt

merge on gree, move on

merge on green, move on

## Response snapshot

Merged #489 (PR 5) on green. #488 (PR 4) failed e2e: the tall header pushed topic titles below the reader-chrome limit, so course pages now keep the compact logo; 17 affected e2e tests passed locally, CI went green and a merge-on-green job merged it. Then PR 6: a shared AuthFrame puts a teal art panel (bilingual logo, classroom scene, Urdu tagline) beside the sign-in, sign-up, reset and feedback-confirmation forms on wide screens, with the forms' markup unchanged; every /app page gets soft cards, an amber step under the page title and, on wide screens, a teal sidebar with the current item on paper; student pages and their guard show the branded loading mark instead of "Loading..."; the achievements page shows step-shaped badges, muted until earned.

## Outcome

- ✅ Impact: auth pages and the student area take the v2 look; teacher, classes, admin and reviewer pages pick up the shared panel and sidebar styles too.
- 🧪 Tests: tsc clean for changed files; build PASS; auth screenshots EN light, UR dark and phone; see PR for gates and e2e.
- 📁 Files: AuthFrame, four auth pages, badges, student pages, custom.css.
- 🔁 Next prompts: PR 7 teacher and classes; PR 8 admin, reviewer and G3 desk.
- 🧠 Reflection: signed-in dashboard screens could not be checked by eye without test logins; the owner was asked for them.

## Handoff (for CEO and agents)

- Shipped / changed: `AuthFrame` wraps auth forms; `.work-card` and `.work-panel` are soft cards site-wide; `.dashboard-shell__sidebar` is teal on wide screens only; `AchievementBadge` maps the four achievement keys to board badges.
- Decisions the team must respect: the auth art is decorative and hidden on phones and in print; loading states use `ui/LoadingMark` with real text for screen readers; queries, guards, routes and test ids are untouched.
- Pending / next owner: owner-provided test logins (student, teacher, admin) to check signed-in screens by eye.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an inline max-width on the form's main element included the new padding and squeezed the form; the width moved to an inner wrapper.
- Graders run and results (PASS/FAIL): build PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
