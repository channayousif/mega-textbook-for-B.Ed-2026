---
id: 20261263
title: Spec 011 browser tests, three product fixes they found, migration 0057
stage: green
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: 011-dashboard-redesign
branch: feat/011-dashboard-e2e
user: M Yousif Channa
command: none
labels: [board-direct, e2e, rls, migration]
links:
  spec: specs/011-dashboard-redesign/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - tests/e2e/_dashboardFixtures.ts
  - tests/e2e/dashboard-shell.spec.ts
  - tests/e2e/dashboard-join-and-progress.spec.ts
  - tests/e2e/student-notes.spec.ts
  - tests/e2e/teacher-course-dropdown-and-nav.spec.ts
  - tests/e2e/teacher-manage-assignments-classes.spec.ts
  - tests/e2e/quiz-authoring.spec.ts
  - src/lib/teacherOverview.ts
  - src/pages/app/teacher/index.tsx
  - src/pages/app/teacher/quiz-authoring.tsx
  - src/lib/assignments.ts
  - supabase/migrations/0057_class_details_editable.sql
  - tests/rls/class-details-edit.test.mjs
  - tests/rls/class-guard-trigger.test.mjs
  - specs/011-dashboard-redesign/tasks.md
  - specs/013-authoring-system-v2/tasks.md
tests:
  - playwright (served build) 9/9 across the six new specs
  - vitest rls class-details-edit + class-guard-trigger 7/7 (live Supabase, after 0057)
---

## Prompt

implement the platform tasks first

(Then, across the session: "hold both, add the quiz migration"; "finish the 011 tests and open the
PR, impose safe and realistic limits on madia creation ..." ; "Apply 0057 now". The media pacing
and quiz-draft work have their own PHRs, 20261262 and 20261260.)

## Response snapshot

Wrote the seven open Spec 011 test tasks as six Playwright specs with a shared fixture helper
(service-role users, sign-in through the form, teardown of classes then users): T012/T013 shell
navigation, 360px drawer keyboard focus trap, 44px targets and axe WCAG 2.2 AA in EN and UR; T016
join from the dashboard and course-grouped Progress; T021 notes create/edit/delete/filter and
isolation; T025 course dropdown and link-only reach of analytics and a student drill-down; T030
assignment edit/delete and class rename; T034 verified-teacher quiz authoring and the gated notice.

The tests found three product defects, all fixed here:
1. T024 (ticked done) never linked recent-activity rows to the student drill-down, and no
   reachable page linked there at all: `fetchRecentActivity` now returns `studentId` and the
   overview rows link to `/app/teacher/student`.
2. Deleting an assignment that has submissions was refused by RLS silently (no error, zero rows),
   so the "Cannot delete" message never appeared: `deleteAssignment` asks for the row back and
   reports `not_deleted`.
3. The roster page's "Edit details" (FR-013, T028) never worked: 0013's guard refused every
   non-admin name/term change. Migration 0057 (applied live 2026-11-24 with the owner's approval,
   one transaction, PostgREST reloaded) lets the owning eligible teacher change name and term;
   course, owner and creation time stay admin-only. New `tests/rls/class-details-edit.test.mjs`;
   `class-guard-trigger`'s immutable-column case now asserts the course instead of the name.
Also: quiz option inputs gained accessible names ("Option A"...). Test-side lessons: the site's
`trailingSlash: true` means typed URLs with a query need the slash (the static server's redirect
drops the query); the drawer toggle's name flips Open/Close menu.

Spec 013 T051/T052 were verified done in September and ticked with their evidence.

## Outcome

- ✅ Impact: Spec 011 has no open tasks; three real teacher-facing defects fixed.
- 🧪 Tests: Playwright 9/9; RLS 7/7.
- 📁 Files: six specs + fixture, four source files, migration 0057, two RLS tests, two tasks files.
- 🔁 Next prompts: FR-013's course change remains open (assignments are bound to course units) - owner decides whether it is wanted.
- 🧠 Reflection: tasks were ticked for features whose end-to-end path had never been exercised; writing the e2e found three of them broken.

## Handoff (for CEO and agents)

- Shipped / changed: migration 0057 is LIVE. Teachers can rename a class and change its term. Assignment-delete refusals now explain themselves. Recent activity links to the student page.
- Decisions the team must respect: until this PR merges, CI's `rls` job fails `class-guard-trigger` on every PR (it ran against the live 0057); merge this first. Class course and owner stay admin-only.
- Pending / next owner: owner rules on FR-013's course edit. Local e2e builds need `NODE_OPTIONS=--max-old-space-size=4096` (the default 2 GB heap runs out).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: default Node heap OOM in `docusaurus build`; background jobs dying with the session (fixed by `setsid nohup`); `pkill -f` patterns matching their own wrapper.
- Graders run and results (PASS/FAIL): Playwright PASS 9/9; RLS PASS 7/7.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add `NODE_OPTIONS=--max-old-space-size=4096` to `npm run build` itself so every local build has the heap it needs.
