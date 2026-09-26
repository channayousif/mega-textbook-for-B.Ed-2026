# Feature Specification: Student and teacher dashboard redesign

> **Home-page iteration (Feature 025, 2026-09-26):** The dashboard shell and tools remain,
> while both home pages now prioritize the next action and add retryable error states.
> See `specs/025-admin-review-workflows/spec.md`.

**Feature Branch**: `011-dashboard-redesign`
**Created**: 2026-09-09
**Status**: Draft
**Input**: User request: "student dashboard needs to be redesigned with all functionality.
currently there is no any left side menu, join classroom with code, Personal note taking space
and record, topics marked as studied (course wise). teachers dashboard also needs makeover, it
doesnot look like one. course code should be selected from a dropdown list. Think about what a
teacher can do with its class and content and assessment, assignments?"

Owner decisions (AskUserQuestion, 2026-09-08):

- **Notes storage**: a new Supabase table with RLS (`student_notes`), not a browser-only store.
- **Teacher makeover**: a full rethink including analytics - a shell/sidebar, a catalog-driven
  course dropdown, in-app links to analytics and drill-down, edit/delete of assignments, edit of
  class details, a verified-teacher UI to author quiz items and answer keys, a per-class command
  centre, assignment templates, and bulk actions. Analytics stay CSS/SVG (no charting dependency,
  Constitution Art. V.5).
- Full SDD: this `specs/011-dashboard-redesign/` set precedes implementation.

## Context

The authenticated area (`/app/**`) is a set of independent pages. Each renders
`<Layout><SomeGuard><main className="container auth-page">…` with no shared shell, no sidebar,
and no sub-navigation; pages are cross-linked by hand-written `<Link>`s and query strings
(`?classId=`, `?studentId=`). There is no `/app` index. The **student dashboard**
(`src/pages/app/dashboard/*`) has six pages (Home, Progress, Grades, Assignments, History,
Achievements) but no menu, no note-taking anywhere in the product, and a Progress page that only
shows courses the student has an active class enrollment in - a unit self-marked as studied on a
course with no class never appears. Joining a class by code lives on a separate
`/app/classes` page, not in the dashboard.

The **teacher dashboard** (`src/pages/app/teacher/*`) has an Overview plus Analytics, a
per-student drill-down, a teaching log, and a feedback page - but Overview links only to
`/app/classes`, nothing links to Analytics at all (it needs a hand-typed `?classId=`), class
creation takes the course code as **free text**, there is no way to edit or delete an assignment
after creating it, no way to edit a class, and `quiz_items` / `answer_keys` can only be seeded
administratively (a standing backlog item from Spec 003).

This feature turns both dashboards into navigable tools: one shared app shell with a left-side
menu, the missing student features (join-by-code in place, personal notes, course-wise progress),
and a teacher surface that covers the real teacher workflow - class, content, assessment,
assignments - with a course dropdown, reachable analytics, full assignment and class management,
and verified-teacher quiz authoring.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A shared app shell with a left-side menu (Priority: P1) 🎯 MVP

A signed-in student or teacher opens any dashboard page and sees a persistent **left-side menu**
listing the areas available to their role, with the current area highlighted. On a narrow screen
the menu collapses to a button that opens a drawer; the drawer traps focus, closes on `Escape`
and on a backdrop tap, and every item is reachable by keyboard. The content area keeps the
existing page-width and spacing conventions. The correct role gate still applies (a student who
reaches a teacher page still sees the "this view is for teachers" notice).

**Why this priority**: Without a shell there is no "dashboard" - just loose pages. Every other
story in this feature hangs an item on this menu.

**Independent Test**: Sign in as a student; from Dashboard Home reach Progress, Grades,
Assignments, Notes, Classes, History and Achievements using only the menu, with the active item
marked. Shrink to 360px: the menu becomes a drawer, opens and closes by keyboard, and traps
focus while open. Repeat as a teacher for the teacher menu.

**Acceptance Scenarios**:

1. **Given** a signed-in student on `/app/dashboard/`, **When** the page renders, **Then** a
   left-side menu lists the student areas, the current one carries `aria-current`, and every
   item is a real link.
2. **Given** the viewport is below the mobile breakpoint, **When** the page renders, **Then** the
   menu is a toggle button; opening it shows a drawer that holds keyboard focus until closed,
   and closes on `Escape`, on a backdrop tap, and on selecting an item.
3. **Given** a signed-in teacher, **When** they open any `/app/teacher/*` page, **Then** the
   same shell renders the teacher menu (Overview, Classes, Assignments, Grading, Analytics, Quiz
   authoring, Teaching log, Feedback).
4. **Given** a signed-in student who navigates to a teacher URL, **When** the page renders,
   **Then** the role gate's existing "this view is for teachers" notice shows inside the shell,
   not a blank page.
5. **Given** every menu label and every new user-facing string, **When** the locale is Urdu,
   **Then** the label renders in Urdu; tap targets are at least 44px.

---

### User Story 2 - A student joins a class and sees course-wise progress from the dashboard (Priority: P2)

A student opens **My classes** in the dashboard menu, enters a join code, and is enrolled
without leaving the dashboard; the same page lists their current classes. They open **Progress**
and see their work grouped **by course**: for each course, the units and topics they have marked
as studied, and how far through the course that is - and this includes a course they have
self-marked in even if they are not in a class for it.

**Why this priority**: These are the three student gaps the request names ("join classroom with
code", "topics marked as studied (course wise)") that are not new data, only surfacing.

**Independent Test**: As a student with no enrollments, join a class by code from the dashboard
menu and see it appear in the list. Mark a unit studied on a course you are not enrolled in;
open Progress and confirm that course and unit now appear under a course-wise grouping alongside
enrolled courses.

**Acceptance Scenarios**:

1. **Given** a student on the dashboard **My classes** page, **When** they submit a valid join
   code, **Then** they are enrolled and the class appears in their class list without a full
   page navigation away from the dashboard.
2. **Given** an invalid, already-used, or removed-student code, **When** they submit it,
   **Then** the existing join-error messages (invalid code / already enrolled / removed) show in
   place.
3. **Given** a student who has marked units studied across two courses, one enrolled and one
   not, **When** they open Progress, **Then** both courses appear, each with its units/topics
   marked studied and a progress indicator, and the not-enrolled course is not hidden.
4. **Given** a course page's per-topic self-assessment checklist the student has completed,
   **When** they open Progress, **Then** the course-wise view shows the topic-level completion
   alongside the unit-level "studied" state.

---

### User Story 3 - A student keeps personal notes (Priority: P2)

A student opens **Notes** in the dashboard menu, writes a note, and it is saved to their
account. They can edit and delete their notes, filter them by course, and - from a unit or topic
page - add a note about that page that then appears in Notes tagged to the course/unit/topic.
Notes are visible only to that student.

**Why this priority**: "Personal note taking space and record" is a named request and is genuinely
new - no note feature exists anywhere in the product.

**Independent Test**: As a student, create three notes (one from the Notes page, two from
different content pages), edit one, delete one, filter by course. Sign in as a different student
and confirm none of the first student's notes are visible.

**Acceptance Scenarios**:

1. **Given** a signed-in student on the Notes page, **When** they save a note, **Then** it
   persists to their account and is listed newest-first; on return in a later session it is
   still there.
2. **Given** an existing note, **When** they edit its text or delete it, **Then** the change
   persists and the list updates.
3. **Given** the student is reading a unit or topic page, **When** they add a note from that
   page, **Then** the note is stored tagged to that course (and unit/topic where applicable) and
   appears under that course when Notes is filtered by course.
4. **Given** two students, **When** each opens Notes, **Then** each sees only their own notes;
   no query or API path returns another student's notes.
5. **Given** a signed-out reader, **When** they view the same content page, **Then** the
   add-a-note affordance is either absent or invites sign-in; no note is created without a
   signed-in student.

---

### User Story 4 - A teacher dashboard that reads as one, with a course dropdown and reachable analytics (Priority: P2)

A teacher opens the dashboard and sees the same shell with a teacher menu that links **every**
teacher area, including Analytics and per-student drill-down. Creating a class, they pick the
**course from a dropdown** built from the catalog (bilingual course names, grouped by semester),
limited to courses that actually have content; they never type a course code. From Overview,
each class links straight to its analytics and to a student's drill-down.

**Why this priority**: "it doesnt look like one" and "course code should be selected from a
dropdown" are the two explicit teacher asks; reachable analytics is the largest usability gap.

**Independent Test**: As a teacher, from Overview reach Analytics for a specific class and a
specific student's drill-down using only links/menu. Create a class and confirm the course is
chosen from a dropdown of catalog courses (with content), not a text box, and that the created
class carries the chosen `course_code`.

**Acceptance Scenarios**:

1. **Given** a teacher on any `/app/teacher/*` page, **When** it renders, **Then** the teacher
   menu links Overview, Classes, Assignments, Grading, Analytics, Quiz authoring, Teaching log,
   and Feedback, with the current area marked.
2. **Given** the class-creation form, **When** it renders, **Then** the course field is a
   `<select>` populated from the catalog, grouped by semester, showing bilingual course names,
   and offering only courses that have authored content; there is no free-text course-code
   input.
3. **Given** a teacher with classes, **When** they open Overview, **Then** each class row links
   to that class's Analytics and its roster, and the recent-activity entries link to the
   relevant student's drill-down.
4. **Given** a class with no course content yet, **When** the dropdown is built, **Then** that
   course is absent (or shown disabled with a reason), so a class cannot be created for a course
   with nothing to teach.

---

### User Story 5 - A teacher manages assignments and classes fully (Priority: P3)

A teacher edits an assignment's title, instructions, due date, maximum mark, and late policy
after creating it, and can delete an assignment that has no submissions. They edit a class's
name, term label, and course. Only the owning teacher can do either.

**Why this priority**: "Think about what a teacher can do with its class and assignments" - today
the answer is "create and publish, nothing else". It is P3 because the create path already works.

**Independent Test**: As a teacher, create an assignment, then change its due date and max mark
and confirm the change persists for students. Delete an assignment with no submissions; confirm
one with submissions cannot be silently destroyed. Edit a class name and term and confirm the
roster and dashboards reflect it. As a different teacher, confirm neither edit is possible.

**Acceptance Scenarios**:

1. **Given** an assignment the teacher owns, **When** they edit its fields and save, **Then**
   the new values persist and students see the updated assignment.
2. **Given** an assignment with no submissions, **When** the owning teacher deletes it, **Then**
   it is removed; **Given** one with submissions, deletion is refused with an explanation.
3. **Given** a class the teacher owns, **When** they edit its name, term, or course, **Then**
   the change persists and appears in the roster and in both dashboards.
4. **Given** a teacher who does not own the assignment or class, **When** they attempt an edit
   or delete, **Then** the database refuses it (not only the UI).

---

### User Story 6 - A verified teacher authors quiz items and answer keys (Priority: P3)

A **verified** teacher opens **Quiz authoring**, picks a course and unit, and creates,
edits, and removes quiz items (stem, options, correct option, Bloom tag) and the answer
keys / marking guidance for that unit. A teacher who is not verified, and a student, cannot
reach or perform any of this. This closes the standing Spec 003 backlog item.

**Why this priority**: It removes an operational bottleneck (admin-only seeding) but is not
required for the dashboards to be usable, so P3.

**Independent Test**: As a verified teacher, add two quiz items to a unit and an answer key,
edit one, delete one; open the class quiz view and confirm the new items are assignable. As an
unverified teacher and as a student, confirm the authoring page is gated and the database
refuses the writes.

**Acceptance Scenarios**:

1. **Given** a verified teacher on Quiz authoring for a chosen course + unit, **When** they add
   a quiz item with a stem, options, a correct option, and a Bloom tag, **Then** it is stored
   and becomes available to assign to a class.
2. **Given** the same teacher, **When** they edit or delete an item or an answer key they
   authored, **Then** the change persists.
3. **Given** an unverified teacher or a student, **When** they navigate to Quiz authoring or
   attempt a write, **Then** the page shows the gated notice and the database rejects the write.
4. **Given** the class-facing quiz views, **When** a student takes the quiz, **Then** the
   correct option is never exposed to the student (the existing public/private split is
   unchanged).

---

### User Story 7 - A per-class command centre, assignment templates, and bulk actions (Priority: P3)

A teacher opens a **class command centre** that combines, for one class, the roster snapshot,
the ungraded queue, upcoming due dates, and at-risk students. They save an assignment's
configuration as a **template** and reuse it when creating another assignment. On the
assignments list they select several assignments and publish, unpublish, or close them in one
action; in the grading queue they return several already-marked submissions at once.

**Why this priority**: Efficiency features that build on US4/US5; valuable but not blocking.

**Independent Test**: Open the command centre for a class and confirm it shows the four panels
for that class only. Save a template from one assignment and create a second assignment from it.
Select three assignments and unpublish them in one action; return two graded submissions in one
action.

**Acceptance Scenarios**:

1. **Given** a class, **When** the teacher opens its command centre, **Then** it shows that
   class's roster count, ungraded count, next due dates, and at-risk students, each linking to
   the relevant detail page.
2. **Given** an assignment, **When** the teacher saves it as a template and later creates a new
   assignment from that template, **Then** the new assignment is pre-filled with the template's
   title pattern, instructions, max mark, and late policy.
3. **Given** several selected assignments, **When** the teacher applies publish / unpublish /
   close, **Then** all selected assignments change state and the list reflects it.
4. **Given** several submissions that already carry a mark, **When** the teacher applies "return
   selected", **Then** all of them move to returned in one action.

---

### Edge Cases

- **The shell around an already-loading auth state**: the menu renders but items that need a
  resolved role are disabled or hidden until `loading` clears (the same `loading`-gated pattern
  the navbar widgets use); no flash of a wrong-role view.
- **A student in zero classes**: the dashboard still renders; Progress shows self-marked courses
  only; **My classes** shows the join form and an empty list.
- **A note tagged to a course later renamed or removed from the catalog**: the note keeps its
  `course_code` string and still lists; a missing course label falls back to the code.
- **A very long note**: stored and displayed with a sane maximum length; the list truncates with
  a "show more".
- **Deleting an assignment that has submissions**: refused, with a message; never cascades.
- **A teacher who loses `verified_teacher` after authoring quiz items**: their existing items
  remain; they can no longer add or edit (RLS enforces this at write time).
- **Bulk action partially fails** (one assignment already closed): the action reports which
  succeeded and which did not; it does not roll the successful ones back.
- **The catalog has only Semester 1 populated**: the course dropdown shows only those courses;
  it does not block on the empty later semesters.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A shared authenticated **app shell** MUST wrap every `/app/dashboard/*` and
  `/app/teacher/*` page: a persistent left-side menu (role-aware items), the existing role gate,
  and a content frame that preserves current page width and spacing.
- **FR-002**: Below a mobile breakpoint the menu MUST collapse to a toggle that opens a drawer;
  the drawer MUST trap focus while open and close on `Escape`, on a backdrop activation, and on
  item selection.
- **FR-003**: The active menu item MUST carry `aria-current`; every item MUST be a real link;
  every label MUST be bilingual; every interactive target MUST be at least 44px.
- **FR-004**: The **student menu** MUST link: Home, Progress, Assignments, Grades, Achievements,
  **Notes**, **My classes** (join + list), and History.
- **FR-005**: The **teacher menu** MUST link: Overview, Classes, Assignments, Grading,
  Analytics, **Quiz authoring**, Teaching log, and Feedback & suggestions.
- **FR-006**: The student MUST be able to **join a class by code from within the dashboard**
  (reusing the existing join RPC and its invalid / already-enrolled / removed error handling)
  and see their current classes on the same page.
- **FR-007**: The student **Progress** view MUST group by course and show, per course, the units
  and topics marked studied and a progress indicator, and MUST include courses the student has
  self-marked in **even without a class enrollment** in that course.
- **FR-008**: A new **`student_notes`** store MUST let a signed-in student create, list, edit,
  and delete personal notes; a note MAY be tagged to a course and optionally a unit and topic;
  notes MUST be private to the owning student, enforced at the database layer.
- **FR-009**: From a unit or topic content page a signed-in student MUST be able to add a note
  tagged to that course/unit/topic; a signed-out reader MUST NOT be able to create a note.
- **FR-010**: Class creation MUST take the **course from a catalog-driven dropdown** (bilingual
  names, grouped by semester), limited to courses that have authored content; the free-text
  course-code input MUST be removed. All downstream uses of `course_code` continue to inherit
  from the class.
- **FR-011**: The teacher dashboard MUST provide **in-app navigation** to per-class Analytics
  and per-student drill-down (from Overview and the menu); no teacher view may require a
  hand-typed query string to be reached.
- **FR-012**: The owning teacher MUST be able to **edit an assignment** (title, instructions,
  due date, maximum mark, late policy) after creation, and **delete an assignment that has no
  submissions**; deletion of an assignment with submissions MUST be refused. Enforced by RLS.
- **FR-013**: The owning teacher MUST be able to **edit a class**'s name, term label, and
  course. Enforced by RLS.
- **FR-014**: A **verified teacher** MUST be able to author (create / edit / delete)
  `quiz_items` and `answer_keys` for a course + unit through a dedicated page; an unverified
  teacher and a student MUST be refused both in the UI and by RLS. The student-facing quiz views
  MUST continue to hide the correct option.
- **FR-015**: A **per-class command centre** MUST present, for one class, the roster count, the
  ungraded-submission count, upcoming due dates, and at-risk students, each linking to detail.
- **FR-016**: A teacher MUST be able to save an assignment configuration as a **template** and
  create a new assignment pre-filled from it.
- **FR-017**: The assignments list MUST support **multi-select publish / unpublish / close**;
  the grading queue MUST support **bulk return** of already-marked submissions. A partially
  failing bulk action MUST report per-item outcome and not roll back the successes.
- **FR-018**: Analytics and any progress bars MUST remain **CSS/SVG** with no charting
  dependency (Constitution Art. V.5, Spec 005 precedent).
- **FR-019**: Every new database policy MUST have an RLS regression test; every new user flow
  (shell nav, join-in-dashboard, notes CRUD, course dropdown, assignment edit/delete, class
  edit, quiz authoring gate, bulk actions) MUST have an end-to-end test.
- **FR-020**: A spec that changes a student- or teacher-facing workflow MUST update the matching
  guide (Student Guide / Teacher Guide) in the same branch (Constitution Art. X.2).
- **FR-021**: No change to the authentication or role model (Spec 002); the `verified_teacher`
  capability check reuses the existing `is_verified_teacher` function.

### Key Entities

- **App shell / navigation model**: a per-role ordered list of menu items - a bilingual label,
  a target route, an icon, and an "active when" match. Not persisted; defined in code.
- **Student note**: a private record owned by one student - an id, the owner, an optional
  `course_code` and optional `unit_no` / `topic_no`, an optional title, a body, and created /
  updated timestamps.
- **Course option**: a derived list (not stored) - catalog courses intersected with the set of
  `course_code`s that have authored content, grouped by semester, carrying bilingual names.
- **Assignment template**: a saved assignment configuration a teacher can reuse - a name, a
  title pattern, instructions, a maximum mark, and a late policy. Owned by the teacher.
- **Quiz item / answer key**: existing tables, now writable by a verified teacher for a course +
  unit under new RLS policies; the student-facing view of a quiz item still omits the correct
  option.
- **Class command centre**: a derived per-class view composed from existing queries (roster,
  ungraded queue, due dates, at-risk) - no new storage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From any dashboard page, a student or teacher can reach every other area in their
  role's menu in one click, with the current area visibly marked - no hand-typed URLs.
- **SC-002**: On a 360px screen the menu is a keyboard-operable drawer that traps focus; all
  targets are at least 44px; verified with an automated accessibility check.
- **SC-003**: A student can join a class and see it listed without leaving the dashboard, and
  the Progress view shows 100% of the courses the student has any studied-mark in, enrolled or
  not.
- **SC-004**: A student's notes persist across sessions and devices and are never returned to
  another student by any query or API path (RLS test).
- **SC-005**: 100% of new classes are created with a course chosen from the catalog dropdown;
  zero classes can be created for a course with no authored content.
- **SC-006**: A teacher can edit and (where empty) delete an assignment, edit a class, and - if
  verified - author quiz items and answer keys; a non-owning teacher, an unverified teacher, and
  a student are refused by the database in every case (RLS tests).
- **SC-007**: `npm run build` (both locales), `npm test`, and `npm run test:e2e` pass; every new
  RLS policy and every new user flow has a test.
- **SC-008**: The Student Guide and Teacher Guide describe the new navigation, notes, join
  flow, course dropdown, assignment/class management, and quiz authoring.

## Assumptions

- The app shell is adopted for `/app/dashboard/*` and `/app/teacher/*` only; `/app/admin/*`
  (Spec 010's owner console) is out of scope and keeps its own guard/layout.
- Notes are plain text (newlines preserved), with a maximum length; no rich-text or Markdown
  rendering in v1.
- Assignment templates are stored server-side (a small owned table), consistent with the
  notes decision, so they follow the teacher across devices - confirmed in `/sp.plan`.
- "At-risk students" in the command centre reuse the Spec 005 analytics definition unchanged.
- The course dropdown's "has content" test is the set of distinct `course_code`s in the
  build-time content index (the same source `assignment-new.tsx` already filters units against).
- Query-string routing (`?classId=`, `?studentId=`) is kept; no new dynamic routes.
- No new runtime dependency; analytics/progress visuals stay CSS/SVG.

## Dependencies

- **Spec 002** - auth, the `profiles` role model, `is_verified_teacher`; unchanged.
- **Spec 003** - `classes`, `enrollments`, `assignments`, `submissions`, `grades`, `quiz_items`,
  `answer_keys`, the join-by-code RPC, the gradebook export; extended with edit/delete + new RLS.
- **Spec 004** - `unit_progress` and the content index that backs course-wise progress.
- **Spec 005** - the teacher analytics / at-risk logic reused by the command centre.
- **Spec 010** - `self_assessment_checks` for the topic-level completion shown in Progress; the
  `/app/admin/*` console is not touched.
- **Catalog** - `catalog/courses.json` (bilingual names) via the existing runtime reader.

## Out of Scope

- Any redesign of the `/app/admin/*` owner console (Spec 010).
- A charting library or any new runtime dependency.
- Changes to the sign-in / role-selection / verified-teacher-elevation model (Spec 002).
- Changes to the student quiz-taking or submission UX beyond what the shell and templates touch.
- Rich-text notes, shared/exported notes, or note search beyond a course filter in v1.
- The content pipeline and figures (Spec 012) and the EFMP-302 Urdu re-translation - separate
  work streams.
