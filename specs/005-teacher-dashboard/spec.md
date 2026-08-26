# Feature Specification: Teacher Dashboard, Feedback & Book Improvement Loop

**Feature Branch**: `005-teacher-dashboard`
**Created**: 2026-07-24
**Status**: Draft
**Input**: User description: "@SDD/005-teacher-dashboard.md" — Teacher cockpit for tracking teaching
activity, recording structured feedback on book activities, suggesting improvements to any part of
the book (moderated by an admin into the authoring pipeline), and reviewing student/class
performance analytics.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See my teaching day at a glance (Priority: P1)

A signed-in teacher opens their dashboard home and immediately sees, across all of their classes:
how many submissions are waiting to be graded per class, upcoming assignment due dates, and their
students' most recent activity — the same "what do I need to know right now?" entry point the
student dashboard already provides, built for a teacher's workload instead.

**Why this priority**: This is the dashboard's reason to exist day-to-day. Every other area
(teaching log, feedback, suggestions, analytics) is something a teacher visits deliberately; this
is what tells them where to spend the next ten minutes.

**Independent Test**: Give a teacher two classes with a mix of graded and ungraded submissions and
assignments due at different times. Open the dashboard and confirm both classes show an accurate
ungraded count, due dates are visible and correctly ordered, and recent student activity appears —
fully testable with only this story built, reusing Spec 003's existing class/assignment data.

**Acceptance Scenarios**:

1. **Given** a teacher with classes that have ungraded submissions, **When** they open the
   dashboard, **Then** each class shows its own ungraded-submission count, not a combined total.
2. **Given** a teacher with assignments due at different times across classes, **When** they view
   the overview, **Then** the soonest-due items across all classes appear first.
3. **Given** a teacher with no ungraded work and nothing due soon, **When** they open the
   dashboard, **Then** the overview states plainly that they're caught up.

---

### User Story 2 - Suggest an improvement to any part of the book (Priority: P1)

While reading any page of the textbook, a teacher clicks "Suggest improvement," picks a category
(typo, clarity, factual, pedagogy, translation, other), and files a note tied to that exact page
and section — without leaving the page or losing their place. They can later find that suggestion
again in "My Suggestions" and see its current status.

**Why this priority**: This is the strategic core of the feature: turning every teacher into a
curriculum reviewer is what feeds continuous improvement of the textbook. It is independently
valuable and testable even before an admin moderation queue exists to act on it — a teacher can
file and track a suggestion on its own.

**Independent Test**: As a teacher, open any unit page, file a suggestion in one category, then
open "My Suggestions" and confirm it appears with the correct page, section anchor, locale, and
category, and a status of "submitted."

**Acceptance Scenarios**:

1. **Given** a teacher viewing any book page, **When** they use "Suggest improvement," **Then** the
   suggestion is filed with that exact page's slug, the nearest section heading, and the page's
   current locale captured automatically — nothing the teacher has to type in manually.
2. **Given** a teacher has filed one or more suggestions, **When** they open "My Suggestions,"
   **Then** each one shows its category, body, and current status.
3. **Given** a teacher's suggestion status changes later, **When** they revisit "My Suggestions,"
   **Then** the updated status and any admin note are visible.

---

### User Story 3 - Moderate incoming suggestions (Priority: P2)

An admin opens a moderation queue of every suggestion filed by any teacher, filters it by status,
category, or course, and moves each one through submitted → under review → accepted or rejected,
leaving a note explaining the decision.

**Why this priority**: Without moderation, filed suggestions accumulate with no outcome and the
improvement loop stalls. It naturally follows Story 2 — there must be suggestions before there is
anything to moderate — so it ships second, not first.

**Independent Test**: Seed three suggestions in different categories and courses. As an admin,
filter the queue by each dimension in turn, transition one suggestion to "accepted" with a note,
and confirm the filing teacher sees the new status and note on their own tracker.

**Acceptance Scenarios**:

1. **Given** suggestions exist across multiple statuses, categories, and courses, **When** an admin
   filters the queue, **Then** only matching suggestions appear.
2. **Given** an admin changes a suggestion's status and adds a note, **When** the filing teacher
   next opens "My Suggestions," **Then** they see the new status and the note.
3. **Given** a signed-in teacher (not an admin) attempts to reach the moderation queue, **Then**
   they are denied access, consistent with the platform's existing role gating.

---

### User Story 4 - Keep a teaching diary (Priority: P2)

After running a unit or activity in class, a teacher logs it in seconds: which unit/activity, the
class, the date, how long it took, and a short reflection — building a running record of what they
actually taught and when.

**Why this priority**: A lightweight habit that pays off over a term, but no other area depends on
it existing first, so it ships alongside (not ahead of) the feedback and suggestion stories.

**Independent Test**: As a teacher, log one teaching activity end-to-end in under 30 seconds by a
stopwatch, then confirm it appears in "My Teaching Log" with all fields intact.

**Acceptance Scenarios**:

1. **Given** a teacher has just run a unit's activity in class, **When** they log it, **Then** the
   entry is saved with the unit/activity, class, date, duration, and reflection all in one flow.
2. **Given** several logged entries, **When** the teacher views "My Teaching Log," **Then** entries
   appear ordered most-recent-first, each attributed to the correct class.
3. **Given** a teacher is timed logging one activity from a cold start, **When** they complete it,
   **Then** the whole action takes 30 seconds or less.

---

### User Story 5 - Record structured feedback on a book activity (Priority: P2)

After running a book activity, a teacher rates it 1–5, notes what worked and what didn't, and
records how long it actually took — feedback an admin can later aggregate across every teacher who
ran that same activity.

**Why this priority**: This is the other half of the improvement loop alongside suggestions —
structured signal on existing content, rather than a one-off note — but it depends on nothing else
shipping first and can be built alongside the teaching log.

**Independent Test**: As a teacher, submit feedback for one activity (rating, what-worked,
what-didn't, actual time), then as an admin, confirm that activity's aggregated view shows the
correct average rating and surfaces the recorded issue text.

**Acceptance Scenarios**:

1. **Given** a teacher has just run a book activity, **When** they submit feedback linked from
   either their log entry or the activity's own page, **Then** the rating and notes are saved
   against that specific activity.
2. **Given** multiple teachers have rated the same activity, **When** an admin views its aggregated
   feedback, **Then** the average rating and common issues are both visible.
3. **Given** a teacher has not yet rated a given activity, **When** they view it, **Then** they are
   invited to give feedback rather than shown a blank or broken control.

---

### User Story 6 - See how my classes are performing (Priority: P3)

A teacher opens Analytics for one class and sees the score distribution per assignment, each
student's trend over time, a unit-by-unit average, and an advisory flag on any student who appears
to be struggling — with a plain-language explanation of why each flag was raised.

**Why this priority**: High-value insight, but it summarizes data the platform already has from
Spec 003 rather than introducing anything new to teach or track; a class is still fully manageable
without it, so it ships after the core logging/feedback/suggestion loops.

**Independent Test**: Seed one class with graded assignments across several students, including one
student who meets the at-risk criteria. Open Analytics and confirm the distribution, per-student
trends, and unit averages all match a manual calculation on the same fixture, and only the one
qualifying student is flagged, with a tooltip explaining why.

**Acceptance Scenarios**:

1. **Given** a class with graded assignments, **When** a teacher opens Analytics, **Then** the
   score distribution per assignment matches a manual check of the underlying grades.
2. **Given** a student meets the at-risk criteria, **When** the teacher views the class analytics,
   **Then** that student is flagged with a tooltip explaining the specific reason.
3. **Given** analytics are shown to the teacher, **When** a student later views their own dashboard
   (Spec 004), **Then** no at-risk flag or label of any kind appears on the student's own view.

---

### User Story 7 - Drill into one student's full record (Priority: P3)

From within a class, a teacher opens a single student's record and sees everything relevant to that
class: their submissions, grades, and unit coverage — without navigating away to separate pages.

**Why this priority**: A natural extension of Analytics (Story 6) for a teacher who wants to go
one level deeper on a specific student; it has no value independent of a class already existing,
so it ships last alongside Analytics.

**Independent Test**: As a teacher, open one student's drill-down view within a class and confirm
their submissions, grades, and coverage figures all match that student's records exactly, with
nothing from any other class visible.

**Acceptance Scenarios**:

1. **Given** a teacher opens a student's record within one of their classes, **When** the page
   loads, **Then** that student's submissions, grades, and coverage for that class are all shown
   together.
2. **Given** a teacher views a student's drill-down, **When** they look for data from a class they
   don't teach, **Then** none is present.

---

### Edge Cases

- A teacher has zero classes: the dashboard home explains how to create one rather than showing an
  empty overview.
- A suggestion is filed on a page that is later renamed or removed: the suggestion keeps its
  originally captured slug/anchor as a historical record; the moderation queue still shows it.
- A class is archived while it has ungraded submissions or unresolved analytics: it moves out of
  the active overview the same way archiving already works for students (Spec 003/004 precedent).
- A teacher logs a teaching activity for a unit/activity they have no assignment tied to: logging
  is independent of assignments, so this is a normal, valid entry.
- An admin rejects a suggestion: the filing teacher sees "rejected" with the admin's reason; no
  content task of any kind is created.
- Two different teachers file feedback on the same activity with wildly different ratings: both
  are retained individually; the aggregate average reflects all of them, not just one.
- A student attempts to reach any route under this feature (teacher dashboard, moderation queue,
  suggestion widget submission): access is denied, consistent with the platform's existing
  role-gating pattern (mirrors FR-012 from Spec 004, applied in the opposite direction).
- A class has 200 students (the platform's existing scale ceiling, Spec 003 SC-005): the overview,
  grading-queue counts, and analytics all remain usable within the platform's existing performance
  budget for that scale.
- The teacher switches the site to Urdu: every area — labels, statuses, categories, empty states,
  and the at-risk explanation tooltip — renders in Urdu with correct right-to-left layout.

## Clarifications

### Session 2026-07-24

- Q: FR-010 flags an at-risk student on "≥2 missed deadlines or falling trend" but doesn't define "falling trend" precisely. What should count as a falling trend? → A: Last 3 scores declining — each of the student's last 3 graded scores is lower than the one before it (strict monotonic decline over the most recent 3 data points).
- Q: FR-002 says the Overview shows "recent student activity" but doesn't define what counts as activity or how much to show. What should it display? → A: Last 10 items — a fixed-size feed of the 10 most recent activity items across all of the teacher's classes, newest first (source refined below).
- Q: FR-002's "upcoming assignment due dates" isn't bounded — should the Overview show all future due dates, or a bounded set/window? → A: Next 5 items — a fixed count of the 5 soonest-due assignments across all classes, regardless of how far out they are.
- Q: Spec 003 has two kinds of student work: assignment submissions and quiz attempts. Should the Overview's "recent student activity" feed (10 most recent) include both, or just assignment submissions? → A: Submissions + quizzes — both assignment submissions and quiz attempts are merged into one feed, ordered by timestamp.
- Q: FR-011 lets a teacher see a student's "unit coverage," but Spec 004's `unit_progress` table has RLS that explicitly denies teachers any access ("coverage is more private here than grades"). How should "unit coverage" be sourced? → A: Derive independently — computed from data teachers already see (submissions, grades, quiz_attempts), e.g. % of the course's units with at least one graded submission/quiz attempt for that student; `unit_progress` and its RLS stay untouched.
- Q: FR-007 asks a teacher to record "actual time taken vs. the book's estimate," but no per-activity time estimate exists anywhere (only a per-file, reading-time `est_reading_minutes` in Spec 001). Where should the "book's estimate" come from? → A: Drop the comparison — FR-007 records only the actual time taken; no baseline estimate is compared against.
- Q: Can a teacher revise their own previously-submitted Activity Feedback rating for an activity, or is it one-shot like a Teaching Log Entry? → A: Yes, revisable — re-submitting feedback for the same activity updates the existing record in place (new rating/notes/time overwrite the old), rather than erroring or creating a second row.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The teacher dashboard MUST be available only to signed-in users with the teacher
  role, at a dedicated route organized into distinct areas: Overview, Classes, Grading, My Teaching
  Log, Feedback & Suggestions, and Analytics.
- **FR-002**: The Overview area MUST show, across all of the teacher's classes: an ungraded
  submission count per class, the 5 soonest-due assignments across all classes ordered
  soonest-first, and recent student activity — a fixed-size feed of the 10 most recent items
  (merging assignment submissions and quiz attempts across all of the teacher's classes), newest
  first; a teacher with nothing pending MUST see an explicit "caught up" state rather than an empty
  region.
- **FR-003**: A "Suggest improvement" control MUST be available on every book content page to a
  signed-in teacher, capturing the page's slug, the nearest section heading, and the page's current
  locale automatically, alongside a teacher-chosen category (typo, clarity, factual, pedagogy,
  translation, other) and free-text body.
- **FR-004**: A teacher MUST be able to view every suggestion they have filed, each showing its
  category, body, current status (submitted, under review, accepted, rejected, published), and any
  admin note.
- **FR-005**: An admin MUST have a moderation queue listing every suggestion from every teacher,
  filterable by status, category, and course, with the ability to transition a suggestion's status
  and attach a note; only an admin MUST be able to change a suggestion's status.
- **FR-006**: A teacher MUST be able to log a teaching activity record (unit/activity reference,
  class, date, duration, reflection) in a single, fast entry flow, and MUST be able to view their
  own log ordered most-recent-first.
- **FR-007**: A teacher MUST be able to record structured feedback on a book activity they have run
  (rating 1–5, what worked, what didn't, actual time taken), reachable both from a teaching log
  entry and from the activity's own content page. Re-submitting feedback for an activity the
  teacher has already rated MUST update their existing record in place, not create a second one.
- **FR-008**: An admin MUST be able to view aggregated feedback per activity — average rating and
  the recorded what-didn't-work notes — across every teacher who has rated it, to prioritize
  content revisions.
- **FR-009**: The Analytics area MUST show, per class: score distribution per assignment,
  per-student score trend over time, and a unit-by-unit class average, computed from the same
  submission/grade/quiz-score data Spec 003 already records — introducing no new source of truth
  for scores.
- **FR-010**: The Analytics area MUST flag a student as at-risk when they meet either of the
  following criteria: (a) ≥2 missed deadlines (assignments past due with no submission or quiz
  attempt), or (b) a falling trend, defined as the student's last 3 graded scores each being
  strictly lower than the one before it. The area MUST show a plain-language explanation of the
  specific reason for each flag (which criterion was met and the underlying figures), and MUST NOT
  surface any at-risk flag or label anywhere on that student's own dashboard (Spec 004).
- **FR-011**: A teacher MUST be able to drill into one student's record within a class they teach,
  seeing that student's submissions, grades, and unit coverage for that class together, with no
  data from any other class or any class the teacher doesn't teach. Unit coverage MUST be derived
  from data the teacher already has access to (submissions, grades, quiz attempts) — the percentage
  of the course's units with at least one graded submission or quiz attempt for that student — and
  MUST NOT read Spec 004's `unit_progress` table, which remains inaccessible to teachers by design.
- **FR-012**: Every area, label, category name, status, and the at-risk explanation MUST render
  bilingually (English/Urdu), following the platform's existing locale and right-to-left
  conventions.
- **FR-013**: A signed-in student or an unapproved/non-teacher user reaching any route in this
  feature (dashboard, suggestion filing, moderation queue) MUST be denied access consistently with
  the platform's existing role-gating pattern.
- **FR-014**: Every area of the teacher dashboard MUST provide an explicit empty state guiding the
  teacher to their next step (e.g., creating a class) rather than showing a blank region.

### Key Entities *(include if feature involves data)*

- **Teaching Log Entry**: one record per logged classroom activity — which teacher, which class,
  which unit/activity, when it happened, how long it took, and the teacher's own reflection note.
- **Activity Feedback**: one record per teacher per book activity they have rated — a 1–5 rating,
  free-text notes on what worked and what didn't, and the actual time taken. Multiple teachers may
  each leave one record for the same activity. Unlike a Teaching Log Entry, this record is
  revisable: a teacher re-rating an activity they've already rated updates their one record rather
  than adding another.
- **Improvement Suggestion**: one record per suggestion filed against a specific book page/section,
  carrying its category, body, the filing teacher, its current status, and an optional admin note.
  Status moves in one direction: submitted → under review → accepted/rejected, and (for accepted
  suggestions only) → published once the resulting content change ships.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A suggestion filed from any book page lands in the admin moderation queue carrying
  the correct page slug, section anchor, and locale, with zero manual re-entry by the teacher.
- **SC-002**: A status change made by an admin (with note) is visible on the filing teacher's own
  tracker without the teacher needing to take any action to refresh it.
- **SC-003**: With a seeded fixture of graded assignments across several students, every Analytics
  figure (distribution, trend, unit average) matches a manually computed reference sheet with zero
  discrepancies.
- **SC-004**: A teacher of one class sees zero data — classes, students, submissions, grades, or
  analytics — belonging to a class they do not teach, verified by dedicated isolation checks.
- **SC-005**: Logging one teaching activity, from opening the entry form to it appearing in the
  log, takes 30 seconds or less in a timed usability check.
- **SC-006**: The teacher dashboard is fully usable in both English and Urdu, with every area and
  state rendering correctly right-to-left in Urdu.
- **SC-007**: A student account attempting to reach any route in this feature is denied access in
  100% of attempts, with no partial data ever visible before the denial.

## Assumptions

- **Teacher role, not a new "verified" gate**: this feature uses the existing self-selectable
  `teacher` role from Spec 002 as-is; it does not require or introduce any new approval workflow.
  Answer-key/restricted-material access remains governed entirely by Spec 002's separate "verified
  teacher" capability and is untouched by this feature.
- **"Suggest improvement" widget is teacher-only for this feature**: every user story naming this
  capability (Story 2) describes a teacher; students do not see this control on book pages, and
  filing is not opened to any other role in this spec. A future spec could extend it.
- **Spec 006 (authoring pipeline) does not exist yet**: this feature's own scope stops at recording
  a suggestion's status as `accepted`; actually turning an accepted suggestion into a content
  authoring task is explicitly Spec 006's future responsibility. This feature exposes `published`
  as a status an admin can set manually once a resulting content change ships, with no automated
  linkage to any authoring system required now.
- **Activity reference reuses Spec 003's existing shape**: `activity_ref` (teaching log and
  feedback) identifies a book activity the same way Spec 003 already links assignments to content —
  by course, unit, and `source_kind` (`activity`/`formative`/`summative`) — not a new free-text or
  ID scheme.
- **Analytics performance budget reuses the platform's existing precedent**: Spec 003 SC-005
  already establishes a 5-second p95 budget for class actions at 200 students; Analytics, built on
  the same underlying data via SQL views, targets the same budget rather than defining a new one.
- **No notifications**: no email or push notification for new suggestion status changes, low
  ratings, or at-risk flags is in scope; a teacher/admin must visit the dashboard to see them,
  consistent with Spec 004's same no-notifications posture.

## Dependencies

- **Spec 002 (Authentication & Roles)**: supplies the signed-in teacher/admin identity and role
  detection this feature's access control (FR-001, FR-005, FR-013) relies on.
- **Spec 003 (Virtual Classes, Assignments & Assessments)**: supplies classes, rosters, published
  assignments, submissions, grades, and quiz scores that the Overview, Grading, and Analytics areas
  read directly — this feature introduces no new source of truth for any of that data.
- **Spec 001 (Content Platform)**: supplies the book pages the "Suggest improvement" widget attaches
  to, and the unit/activity structure (`source_kind`) that teaching-log and feedback entries
  reference.
- **Spec 004 (Student Dashboard)**: establishes the role-gating and empty-state conventions this
  feature's opposite-direction access denial (FR-013) and empty states (FR-014) follow; this
  feature's at-risk flag (FR-010) is explicitly excluded from Spec 004's student-facing view.
  Conversely, Spec 004's `unit_progress` table (and its teacher-excluding RLS) remains untouched by
  this feature — FR-011's "unit coverage" is computed independently from Spec 003 data instead.
- **Blocks Spec 006 (future authoring pipeline)**: accepted suggestions (`status='accepted'`) are
  the input signal a future authoring-pipeline spec is expected to consume; this feature does not
  depend on Spec 006 existing to be complete on its own.
