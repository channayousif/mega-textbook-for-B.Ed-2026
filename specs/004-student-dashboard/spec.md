# Feature Specification: Student Dashboard

**Feature Branch**: `004-student-dashboard`
**Created**: 2026-07-20
**Status**: Draft
**Input**: User description: "start spec 004 student dashboard @SDD/004-student-dashboard.md"

## Clarifications

### Session 2026-07-20

- Q: How many consecutive days of self-tracked study must a student log to earn the "study streak" achievement (FR-008)? → A: 3 consecutive days.
- Q: FR-008 calls this the "self-tracked" study streak, but the Assumptions section defines streak days as counting units completed "by any method" (including grades/quizzes). Which should the achievement actually use? → A: Self-marking only — the streak counts only days on which the student self-marked a unit studied; grade/quiz completions on their own do not count toward this achievement's streak.
- Q: Does the "completed every assignment in a class on time" achievement (FR-008) apply to a class that currently has zero published assignments? → A: No — a class must have at least 1 published assignment for this achievement to be attainable; a class with none is not vacuously eligible.

### Session 2026-07-20 (follow-up)

- Q: FR-001 enumerates five dashboard areas and doesn't mention achievements, but User Story 6's Acceptance Scenario 3 refers to students navigating to "the achievements area." Is Achievements a sixth distinct area, or does it live only inside the Home area? → A: Sixth distinct area with its own nav destination — newly earned badges also surface as a preview on Home, but the full catalog (earned and unearned, with "how to reach it" guidance) lives on its own Achievements page.

### Session 2026-07-20 (second follow-up)

- Q: What load-time budget should the dashboard's home area meet, and at what scale (semesters of history, classes per semester)? → A: Under 2 seconds at the 95th percentile (p95), for a student with up to 8 semesters of history and up to 6 classes per semester — matching the B.Ed program's existing 8-semester structure as the realistic worst case.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See what's due right now, at a glance (Priority: P1)

A student signed in to the platform opens their dashboard home and immediately sees, without
scrolling on a phone: their current semester, the classes they're enrolled in this term, the
assignments and quizzes due soonest across all of those classes, and their most recently returned
grades. This is the first screen a student sees, and it must answer "what do I need to know right
now?" on its own.

**Why this priority**: This is the dashboard's entry point and reason to exist. Everything else
(deep grade history, coverage tracking, past semesters, badges) is something a student visits
deliberately; this is what they see by default. It is the smallest slice that still delivers the
platform's promise of "one place to see my academic life."

**Independent Test**: Enroll a student in two active classes with assignments at varying due
dates and give them two recent grades. Open the dashboard on a 360px-wide screen and confirm the
current semester, both classes, a due-soon list ordered by urgency, and recent grades are all
visible above the first scroll — fully testable with only this story built.

**Acceptance Scenarios**:

1. **Given** a student enrolled in classes with upcoming and overdue assignments, **When** they
   open the dashboard, **Then** items due within 48 hours appear first, ahead of items due later.
2. **Given** a student with no pending work, **When** they open the dashboard, **Then** the
   overview states plainly that they're caught up rather than showing an empty area.
3. **Given** a student on a phone-sized screen, **When** they open the dashboard, **Then** the
   current semester, class list, due-soon items, and recent grades are all reachable without
   opening a menu or scrolling past the fold.

---

### User Story 2 - See every grade and test score without hunting (Priority: P1)

A student opens their Grades area and sees every assignment and test they've had marked, with
their score, across every class they've ever taken this term — without a class or cohort average
shown alongside it.

**Why this priority**: Closing the loop on submitted work is the other half of "what's my
situation right now," equal in priority to seeing what's due. Grades are today scattered one
assignment page at a time; this consolidates them.

**Independent Test**: Grade several submissions and a quiz attempt for one student across two
classes, then open Grades and confirm every mark appears with no class-average figure anywhere
on the page — testable independently of User Story 1, since it reads a different data slice.

**Acceptance Scenarios**:

1. **Given** a student with graded work in multiple classes, **When** they open Grades, **Then**
   every returned mark appears with its maximum, its class, and its assignment title.
2. **Given** any grade shown, **When** the student views the page, **Then** no class or cohort
   average appears anywhere near it.
3. **Given** a teacher corrects a previously returned grade, **When** the student next opens
   Grades, **Then** the corrected value is shown, never the original.

---

### User Story 3 - Track how much of each subject I've covered (Priority: P2)

A student opens Progress and sees, per course, how many of its units they've covered — through
graded work, a quiz, or their own self-marking — as a simple fraction (e.g., 4 of 8 units), plus a
semester-wide figure for what share of their courses currently show any progress at all.

**Why this priority**: Turns scattered completion signals into a legible sense of how far through
each subject a student actually is. Valuable, but a student loses no due-date or grade information
if this ships after Stories 1–2.

**Independent Test**: Give a student graded work covering 4 of 8 units in one course and nothing
in a second course; open Progress and confirm the first course reads 4/8, the second reads 0, and
the semester-level figure reflects the correct share of courses with any recorded progress.

**Acceptance Scenarios**:

1. **Given** a student has completed work covering some units of a course, **When** they view
   Progress, **Then** that course shows the correct completed-units-out-of-total fraction.
2. **Given** a student's courses have differing amounts of progress, **When** they view the
   semester-level figure, **Then** it correctly reflects the share of courses with any progress.
3. **Given** a unit is completed through a quiz, an assignment, and self-marking on different
   occasions, **When** coverage is calculated, **Then** that unit counts exactly once.

---

### User Story 4 - Mark my own study progress (Priority: P2)

A student who has read and studied a unit — even without a graded assignment tied to it — marks
that unit as studied, either from the dashboard or directly from that unit's page in the book, and
it counts toward that course's coverage from then on.

**Why this priority**: Not all learning happens through graded work; without self-marking, a
student who reads ahead or studies independently would see permanently incomplete coverage no
matter how much they've actually done. Depends on Story 3 existing to have somewhere to show up.

**Independent Test**: As a student, open a unit's content page, mark it studied, then return to
Progress and confirm that unit now counts toward the course's coverage fraction, with no
assignment or quiz activity involved.

**Acceptance Scenarios**:

1. **Given** a student is viewing a unit's content page, **When** they mark it studied, **Then**
   it is immediately reflected in that course's coverage the next time they view Progress.
2. **Given** a student marks the same unit studied more than once, **When** coverage is
   calculated, **Then** it is counted only once, not once per marking.
3. **Given** a unit already counted via a graded assignment, **When** the student also marks it
   studied manually, **Then** coverage does not double-count that unit.

---

### User Story 5 - Review my past semesters like a transcript (Priority: P2)

A student switches to History and sees each past semester as a frozen, read-only record: which
classes they took, what they scored, and how much of each course they covered — exactly as it
stood when that semester's classes were archived.

**Why this priority**: The payoff of a multi-year platform is being able to look back. Not needed
for a student's current-term experience, so it can follow the current-term stories, but it's the
feature that makes the platform a genuine 4-year record rather than a single-term tool.

**Independent Test**: Seed two archived past semesters with distinct classes, grades, and
coverage for one student. Switch to History and confirm both semesters appear grouped separately,
each with its own classes/grades/coverage, and nothing on the page is editable.

**Acceptance Scenarios**:

1. **Given** a student has one or more archived past semesters, **When** they open History,
   **Then** each semester's classes, grades, and coverage appear grouped under that semester.
2. **Given** a student is viewing a past semester's record, **When** they look for a way to edit
   or resubmit anything, **Then** no such control is present anywhere on the page.
3. **Given** a student has no past semesters yet, **When** they open History, **Then** they see a
   plain explanation that their record will appear here once a semester ends.

---

### User Story 6 - Get recognized for milestones (Priority: P3)

A student sees achievement badges appear on their dashboard for meaningful milestones: their
first submission, a streak of self-tracked study, reaching 100% unit coverage in a course, and
completing every assignment in a class on time. Newly earned badges surface as a preview on the
dashboard home, and a dedicated Achievements area shows the full catalog — including
not-yet-earned milestones and how to reach them.

**Why this priority**: A motivational layer on top of an already-complete dashboard. No other
story depends on it, and no other story loses value if it ships last.

**Independent Test**: Trigger each of the four starter milestone conditions for a test student one
at a time and confirm the matching badge appears after each; repeat one triggering action and
confirm no duplicate badge is created.

**Acceptance Scenarios**:

1. **Given** a student meets a milestone condition for the first time, **When** the triggering
   event is recorded, **Then** the corresponding achievement appears on their dashboard.
2. **Given** a student has already earned a given achievement, **When** the same condition is
   triggered again, **Then** no second copy of that achievement is created.
3. **Given** a student has earned no achievements yet, **When** they view the achievements area,
   **Then** they see what milestones exist and how to reach them, not an empty area.

---

### Edge Cases

- A student is removed from a class between visits: on the next dashboard load, that class and
  every item from it (pending work, results, coverage) no longer appear anywhere on the dashboard.
- A teacher unpublishes an assignment the student could previously see: it disappears from
  pending work and coverage on next load; any existing grade for it stays out of view until
  republished.
- A class is archived while items from it sit on the current-term views: those items leave the
  active areas and the class moves to History on next load, frozen as it stood.
- A course's total unit count changes mid-semester: coverage for that course recalculates against
  the new total rather than showing a stale or impossible fraction.
- The student has submitted everything and nothing is due: the overview says so plainly ("all
  caught up") rather than showing an empty region.
- Several due items share the same due date: ordering falls back to a stable, predictable
  secondary order (by class then title) so the list never appears to shuffle between visits.
- A quiz's due date passes with no attempts: it appears as closed, not as an actionable overdue
  item (quizzes accept no late attempts).
- A class has zero published assignments: it is not eligible for the "on-time completion of every
  assignment" achievement — an empty assignment list never trivially counts as complete.
- A signed-in teacher or admin navigates to the student dashboard: they are told this view is for
  students and pointed to their own tools instead of seeing a broken or empty page.
- The student switches the site to Urdu: every area — statuses, headings, counts, progress
  figures, and empty states — renders in Urdu with correct right-to-left layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The dashboard MUST be available only to signed-in students and MUST be organized
  into distinct areas — home, all assignments, all grades, subject/unit coverage,
  past-semester history, and achievements — each showing exclusively that student's own data.
- **FR-002**: The dashboard's home area MUST surface, above the first scroll on a phone-sized
  screen: the current semester, the student's enrolled classes, assignments/quizzes due soon
  ordered with anything due within 48 hours first, and the student's most recent grades.
- **FR-003**: The assignments area MUST present every published, not-yet-submitted assignment and
  quiz across all of the student's active classes, ordered soonest-due first; overdue items MUST
  be distinguished from future-due items and MUST state whether a late submission is still
  accepted or the window has closed, with closed items never presented as actionable to-dos.
- **FR-004**: The grades area MUST show every returned assignment and quiz/test score with its
  mark and maximum, and MUST NOT display a class or cohort average anywhere; a corrected grade
  MUST always display its corrected value.
- **FR-005**: The progress area MUST show, per enrolled course, the fraction of that course's
  units the student has covered — through a graded assignment, a quiz, or self-marking — out of
  the course's total unit count, plus a semester-level figure for the share of enrolled courses
  currently showing any recorded progress.
- **FR-006**: A student MUST be able to mark any unit as studied themselves, both from the
  dashboard and from that unit's own content page, independent of any assignment; a unit counts
  toward its course's coverage exactly once regardless of how many times it is marked or through
  how many different means (self-marking, assignment, quiz) it was completed.
- **FR-007**: The history area MUST group a student's past semesters and show each one's classes,
  grades, and coverage exactly as they stood when that semester's classes were archived, with no
  editing or resubmission control exposed anywhere in this area.
- **FR-008**: The platform MUST award a fixed catalog of milestone achievements — first
  submission, a self-tracked study streak, 100% unit coverage in a single course, and on-time
  completion of every assignment in a class — to a student the first time each milestone's
  condition is met, and MUST NOT award the same achievement to the same student more than once.
  The self-tracked study streak triggers on 3 consecutive calendar days on which the student
  self-marked at least one unit studied — grade or quiz completions alone do not advance this
  streak. The on-time-completion achievement requires the class to have at least 1 published
  assignment; a class with none is not eligible for it.
- **FR-009**: The dashboard MUST provide a dedicated achievements area, separate from the home
  area, showing the full fixed catalog of milestones — earned and not-yet-earned alike — with a
  bilingual title, description, and (for unearned milestones) how to reach it; the home area MUST
  additionally surface a preview of the student's most recently earned achievement(s).
- **FR-010**: All dashboard text, labels, and numerals MUST render bilingually (English/Urdu),
  following the platform's existing locale and right-to-left conventions.
- **FR-011**: Every area of the dashboard MUST provide an explicit empty state guiding the student
  to their next step (e.g., joining a class with a code) rather than showing a blank region.
- **FR-012**: A signed-in teacher or admin reaching the student dashboard MUST see a clear notice
  that it is a student-only view with a pointer to their own tools, not an error or another
  student's data.
- **FR-013**: The dashboard MUST reflect the current state of the student's data on every load,
  with no manual refresh beyond loading the page: removed enrollments, unpublished assignments,
  and newly archived classes are never shown as stale or contradictory across areas.

### Key Entities *(include if feature involves data)*

- **Unit Progress**: one record per student per unit, capturing how it was completed (self-marked,
  via a graded assignment, or via a quiz) and when. This is the basis for every coverage figure
  shown anywhere on the dashboard.
- **Achievement (catalog)**: a fixed, platform-wide list of milestone definitions, each with a
  bilingual title and description, identical for every student.
- **Student Achievement**: the record of which achievements a specific student has earned and
  when — at most one per achievement per student, never duplicated.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With a seeded fixture spanning two semesters, every dashboard area shows numbers
  that match a manual check of the underlying records, with zero discrepancies.
- **SC-002**: Marking a unit studied from its content page is reflected in that course's coverage
  figure the very next time the student views the dashboard — no separate sync step is visible.
- **SC-003**: Nothing in an archived past semester's record can be changed from the dashboard;
  only current-term data remains actionable.
- **SC-004**: Each of the four starter achievements is granted to a given student exactly once, no
  matter how many times its triggering condition recurs.
- **SC-005**: Dedicated checks that deliberately attempt to surface another student's classes,
  grades, coverage, or achievements on a student's dashboard all fail — isolation holds to the
  same standard as the rest of the platform.
- **SC-006**: The dashboard is fully usable one-handed on a 360px-wide phone screen, with no
  horizontal scrolling required in any area.
- **SC-007**: The dashboard is fully usable in both English and Urdu, and every area and state
  (due-soon, grades, progress, history, empty, achievements) renders correctly right-to-left in
  Urdu.
- **SC-008**: The dashboard's home area loads in under 2 seconds at the 95th percentile (p95) for
  a student with up to 8 semesters of history and up to 6 classes per semester.

## Assumptions

- **Class/cohort averages are permanently withheld here**: the source requirement is explicit that
  no average is shown on the student dashboard; this is a deliberate privacy placeholder pending a
  separate policy decision, not an oversight to revisit within this feature.
- **Recent grades on the home area**: the overview shows the student's 5 most recent results; the
  complete list always lives in the Grades area.
- **Unit totals per course** are sourced from the content platform's existing chapter/unit
  structure (Spec 001) — this feature does not define or alter what a "unit" is, only tracks a
  student's coverage against the count that already exists.
- **"Current semester" when a student has active classes in more than one semester**: resolved
  during `/sp.analyze` (2026-07-21) — a student can legitimately have active classes spanning more
  than one semester at once (e.g., retaking one while progressing in another). The home area's
  "current semester" label is the **highest** semester number among the student's active classes
  (derived from each class's course via the content platform's semester numbering, Spec 001) — not
  a filter: the class list, due-soon items, and recent grades still include every active class
  regardless of which semester it belongs to. Only the single displayed label picks the highest.
- **Study-streak definition**: resolved via Clarifications (2026-07-20) — the streak counts
  consecutive calendar days on which the student self-marked at least one unit studied
  (self-marking only, not grades/quizzes), and the achievement triggers at 3 consecutive days.
- **No notifications**: email or push notification of due dates, returned grades, or newly earned
  achievements is out of scope; the dashboard is a place a student visits, not a channel that
  reaches out (consistent with the platform's phased notification rules).
- **Entry point, not landing page**: the dashboard is reached from the signed-in navigation; the
  platform's existing "return to where you signed in from" behavior is left untouched. Making the
  dashboard the post-sign-in destination can be revisited once usage data exists.
- **Teacher-side equivalent is a separate feature**: nothing here shows a teacher's view of
  classes; FR-012 only keeps an accidental teacher/admin visit coherent.
- **Quizzes close at their due date**: quizzes accept no late attempts (per the platform's
  existing quiz rules), so a past-due unattempted quiz is always "closed," never "late submission
  possible."

## Dependencies

- **Spec 002 (Authentication & Roles)**: supplies the signed-in student identity and role
  detection the dashboard's access control and FR-012's role notice rely on.
- **Spec 003 (Virtual Classes, Assignments & Assessments)**: supplies class memberships,
  published assignments and quizzes, submission statuses, returned grades, quiz scores, and
  class archiving/term grouping — everything outside of coverage and achievements. This feature
  was explicitly anticipated by Spec 003's "Blocks Spec 004 (student dashboard)" note.
- **Spec 001 (Content Platform)**: supplies the bilingual site shell and navigation the dashboard
  lives inside, and the per-course chapter/unit structure that coverage is measured against, plus
  the unit content pages where self-marking is also exposed.
- Blocks nothing: a teacher-facing dashboard, if specced separately, is a sibling, not a dependent.
