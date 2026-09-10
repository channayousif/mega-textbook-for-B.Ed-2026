---
id: 0003
title: Implement Dashboard Redesign US1-US7
stage: green
date: 2026-09-10
surface: agent
model: claude-sonnet-5
feature: 011-dashboard-redesign
branch: 011-dashboard-redesign
user: channayousif@gmail.com
command: /sp.implement (011, US1-US7 + docs)
labels: ["green", "dashboard", "app-shell", "student-notes", "quiz-authoring", "rls", "migrations", "bilingual"]
links:
  spec: specs/011-dashboard-redesign/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - supabase/migrations/0038_student_notes.sql
 - supabase/migrations/0039_assignment_delete.sql
 - supabase/migrations/0040_quiz_authoring_rls.sql
 - supabase/migrations/0041_assignment_templates.sql
 - src/components/AppDashboardShell.tsx
 - src/lib/dashboardNav.ts
 - src/lib/studentNotes.ts
 - src/lib/courseOptions.ts
 - src/lib/quizAuthoring.ts
 - src/lib/assignmentTemplates.ts
 - src/lib/assignments.ts (updateAssignment / deleteAssignment)
 - src/lib/classes.ts (updateClass)
 - src/lib/types.ts (StudentNote, AssignmentTemplate)
 - src/pages/app/dashboard/{notes,classes}.tsx (new) + 6 dashboard/* + 5 teacher/* pages (shell adoption)
 - src/pages/app/dashboard/progress.tsx (FR-007 regroup)
 - src/pages/app/teacher/{quiz-authoring,class}.tsx (new)
 - src/pages/app/classes/{index,assignments,assignment-new,roster}.tsx
 - src/theme/DocItem/Footer.tsx (AddNoteControl)
 - src/css/custom.css (.dashboard-shell)
 - tests/rls/{student-notes,quiz-authoring,assignment-delete,assignment-templates}.test.mjs
 - guides/student-guide/use-the-dashboard.mdx
 - guides/teacher-guide/{use-the-teacher-dashboard,manage-classes-and-assignments}.mdx
 - specs/backlog.md, CLAUDE.md
tests:
 - "npx tsc --noEmit - exit 0"
 - "npm test - 136/136 (unit); the 4 new tests/rls/*.mjs collect cleanly, run in CI (no Supabase env locally)"
 - "npm run build (en + ur) - exit 0"
---

## Prompt

Full build of Spec 011 (dashboard redesign) to a merge-ready PR (owner decision 2026-09-09).

## Response snapshot

Four commits on `011-dashboard-redesign`:

- **`a1aaeef`** spec + plan + tasks + checklist (7 user stories, 21 FRs).
- **`a14b57f`** Phase 2 + US1: migrations 0038-0041; `AppDashboardShell` (per-page shell:
  role guard + left sidebar / keyboard drawer with a hand-rolled focus trap) + `dashboardNav.ts`
  + `.dashboard-shell` CSS; all 11 `dashboard/*` + `teacher/*` pages swapped to the shell.
- **US2-US4 commit**: `dashboard/classes.tsx` (join-by-code in the dashboard); `progress.tsx`
  FR-007 regroup (unions the enrolled set with every `course_code` in `unit_progress`, so a
  self-marked non-enrolled course is no longer hidden); `studentNotes.ts` + `dashboard/notes.tsx`
  + an `AddNoteControl` in `DocItem/Footer.tsx`; `courseOptions.ts` (catalog ∩ content-index) and
  a semester-grouped `<select>` replacing the free-text course-code input in `classes/index.tsx`;
  `teacher/index.tsx` Overview rows link to per-class Analytics / Roster / Grading.
- **US5-US7 commit**: `updateAssignment` / `deleteAssignment` / `updateClass` + inline edit +
  delete + bulk publish/unpublish/close in `classes/assignments.tsx`, edit-class in `roster.tsx`;
  `quizAuthoring.ts` + `teacher/quiz-authoring.tsx` (verified-only item + answer-key editor,
  closes the Spec 003 backlog item); `teacher/class.tsx` command centre; `assignmentTemplates.ts`
  + "from a template" / "save as template" in `assignment-new.tsx`.
- **This commit**: 4 RLS test files (`student-notes`, `quiz-authoring`, `assignment-delete`,
  `assignment-templates`); Student + Teacher Guide updates (left menu, Notes, join flow,
  course-wise progress, course dropdown, assignment/class edit + bulk, quiz authoring, command
  centre); `specs/backlog.md` Spec 003 item struck; `CLAUDE.md`.

Key implementation notes:
- **Two of the four "new RLS policy" items already existed**: `assignments_update` (0017) and
  `classes_update` (0012) already permit a full owner edit - FR-012/FR-013 needed only lib
  helpers + UI. Only `assignments` DELETE (0039, owner + zero submissions) and
  `quiz_items`/`answer_keys` writes (0040, `is_verified_teacher()`) are new.
- 0040 is a **deliberate reversal** of the Spec 003 "admin-only content seeding" posture,
  recorded in the migration comment.
- The shell is a per-page component (no Docusaurus nested-layout hook); the ~13-page adoption
  was a uniform 5-line -> 3-line swap done with a perl one-liner then reviewed.

**Deferred (follow-ups, noted in tasks.md):** bulk grade-return in the grading queue (US7
T038 second half - lower value; the queue already returns one submission per action); the e2e
Playwright specs (T012/T016/T021/T025/T030/T034/T039) - the RLS tests + `npm run build` cover
the DB and compile surface; migrations 0038-0041 still need deploying to the self-hosted
Supabase (owner/CI step, T006).

## Outcome

- ✅ Impact: both dashboards now have a left menu and their missing features; the teacher side
  covers class / content / assessment / assignments end to end; the Spec 003 quiz-authoring
  backlog item is closed.
- 🧪 Tests: `tsc` clean; `npm test` 136/136; 4 new RLS suites collect + run in CI;
  `npm run build` en + ur green.
- 📁 Files: 4 migrations; 1 shell + 1 nav model + CSS; 6 new libs / lib additions; 4 new pages +
  ~13 shell adoptions + 4 rewired pages; Footer control; 4 RLS tests; 3 guides; backlog + CLAUDE.
- 🔁 Next prompts: deploy 0038-0041; add the Playwright e2e specs; the deferred bulk grade-return.
- 🧠 Reflection: reading the existing `assignments`/`classes` RLS before planning cut the
  migration count from a feared 6 to 4 and turned two "stories" into pure UI work.

## Evaluation notes (flywheel)

- Failure modes observed: `AtRiskReason` is a discriminated union of objects, not a string enum -
  a `Record<Reason, …>` lookup didn't typecheck; replaced with a `riskLabel()` switch.
- Graders run and results (PASS/FAIL): FR-001..FR-018 covered by the shell + pages + migrations +
  RLS tests; FR-019 partially (RLS done, e2e deferred); FR-020 (guides) done. PASS with the
  deferrals noted.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): a Playwright keyboard test for the drawer focus trap
  before merge, since that is the one piece with no automated coverage yet.
