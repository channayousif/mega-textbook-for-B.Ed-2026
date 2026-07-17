# SPEC 004 — Student Dashboard

**Status:** Draft for approval • **Depends on:** 002, 003

## 1. Problem & Goal
A student needs one place to see their academic life on the platform: current semester classes, pending and graded assignments, test scores, chapter (unit) coverage, subject (course) coverage, and past-semester records — so the platform works as a personal progress record across the 4-year programme.

## 2. User Stories
- **D1**: As a student, my dashboard home shows: current semester, enrolled classes, assignments due soon, and recent grades — above the fold on mobile.
- **D2**: As a student, per course I see **chapter coverage**: which units I've marked complete / have graded work in, as a progress bar (e.g., 4/8 units).
- **D3**: As a student, I see **subject coverage** for the semester: % of courses with active progress.
- **D4**: As a student, I open "Grades" and see every assignment/test with marks, class average is NOT shown (privacy; backlog item pending policy).
- **D5**: As a student, I switch to a **past semester** and see an archived read-only record (classes, grades, coverage) — my transcript-style history.
- **D6**: As a student, I mark a unit "studied" manually even without an assignment (self-tracking), and it counts toward coverage.
- **D7**: As a student, achievements (badges) appear for milestones: first submission, unit streaks, 100% unit coverage in a course, all-assignments-on-time in a class.

## 3. Data Additions
```
unit_progress(id, student_id, unit_id, source self|assignment|quiz, completed_at)
achievements(id, code, title_en, title_ur, description_en, description_ur, icon)
student_achievements(id, student_id, achievement_id, earned_at)
```
- Coverage(course) = distinct completed units ÷ total units in course.
- Semester record = derived view over enrollments/grades filtered by class `term_label`; archiving a class freezes it into the "past records" tab.

## 4. Functional Requirements
| ID | Requirement |
|---|---|
| SD1 | Route `/app/student` (role-gated) with tabs: Overview • Assignments • Grades • Progress • History. |
| SD2 | Overview cards ordered by urgency (due < 48h first). |
| SD3 | Progress visuals: per-course unit progress bars + semester ring chart; pure CSS/SVG (no heavy chart lib) to respect the performance budget. |
| SD4 | History tab groups by `term_label`; read-only. |
| SD5 | Achievement engine: DB triggers/edge function evaluate rules on submission/grade/progress insert; duplicates impossible (unique constraint). |
| SD6 | Every label bilingual; numerals follow locale. |
| SD7 | Empty states teach the next step ("Join your first class with a code from your teacher"). |

## 5. RLS
Students read/write only their own `unit_progress`; read own `student_achievements`; achievements catalog is public-read.

## 6. Step-by-Step Build Plan
1. Migration 003: tables + coverage views + RLS.
2. Achievement rule functions (start with 4 rules above) + backfill script.
3. Build Overview tab (cards) → Assignments tab (reuse Spec 003 list) → Grades tab.
4. Build Progress tab (bars + ring) + "mark unit studied" button surfaced also on each Docusaurus unit page for logged-in students.
5. Build History tab from archived classes.
6. Bilingual copy pass + mobile QA on a small Android viewport.

## 7. Acceptance Criteria
- [ ] With seeded fixtures (2 semesters of data), all five tabs render correct numbers, verified against SQL by hand.
- [ ] Marking a unit studied on the book page instantly updates coverage on the dashboard.
- [ ] Archived class data appears only under History and is immutable from the UI.
- [ ] Achievements fire exactly once per rule per student.
- [ ] Dashboard usable one-handed on a 360px-wide screen.
