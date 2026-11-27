---
id: 20261281
title: Floating notes widget for students and teachers
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-notes-widget
user: M Yousif Channa
command: continue (#806)
labels: [board-direct, notes]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#806"
  adr: null
  pr: null
files:
  - src/components/NotesWidget/index.tsx
  - src/components/NotesWidget/styles.module.css
  - src/theme/DocItem/Content.tsx
  - src/pages/app/dashboard/notes.tsx
  - src/pages/app/teacher/notes.tsx
  - src/lib/dashboardNav.ts
  - supabase/migrations/0058_notes_for_teachers.sql
  - tests/rls/student-notes.test.mjs
  - tests/e2e/notes-widget.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tsc (no errors in changed files)
  - tests/e2e/notes-widget.spec.ts and tests/rls/student-notes.test.mjs (CI; RLS needs 0058 applied live)
---

## Prompt

continue

## Response snapshot

Added a floating Notes button on every textbook page (inline end, above the back-to-top button on
desktop and above the reader bottom bar on phones, icon-only there). It opens a non-modal panel:
signed-out readers get a sign-in link; students and teachers write a private note tied to the page
(course, unit and topic from front matter, page title as the note title), see the page's three
latest notes, and follow "All my notes" to their dashboard Notes. Escape closes and returns focus.
Teachers needed database support: migration 0058 adds `is_teacher()` (mirroring `is_student()`)
and widens the student_notes INSERT and UPDATE checks to student or teacher; ownership rules are
unchanged and admins still cannot write notes. The RLS test now asserts a teacher can keep notes
but cannot read or forge a student's. Teachers get a Notes page at `/app/teacher/notes` (the
student list component, shared) and a sidebar entry.

## Outcome

- ✅ Impact: notes can be taken from anywhere while reading, by students and teachers.
- 🧪 Tests: e2e (signed-out path), RLS test updated; both on CI.
- 📁 Files: see list above.
- 🔁 Next prompts: #807 untranslated pages, #808 assessment cards.
- 🧠 Reflection: the CI RLS suite runs against the live database, so the policy change must be applied before the PR can go green.

## Handoff (for CEO and agents)

- Shipped / changed: #806 PR; migration 0058 must be applied to production (owner approval) before merge.
- Decisions the team must respect: student_notes keeps its name; `student_id` is the author's profile id for students and teachers.
- Pending / next owner: owner approves applying 0058 live; then CI reruns and the PR merges.
- Paperclip issues affected: none; GitHub #806.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): tsc PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
