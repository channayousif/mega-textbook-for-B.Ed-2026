# SPEC 003 — Virtual Classes, Assignments & Assessments

**Status:** Draft for approval • **Depends on:** 001, 002 • **Blocks:** 004, 005

## 1. Problem & Goal
Teachers need to run a "virtual class": enroll their real students, assign work drawn from the book (activities, formative/summative assessments), collect submissions, and grade them. This is the transactional heart of the platform and lives entirely in the backend.

## 2. Core Concepts (Data Model)
```
semesters(id, number, year_label)                       -- seeded from Scheme of Study
courses(id, semester_id, code, title_en, title_ur, credit_hours)
units(id, course_id, unit_no, slug, title_en, title_ur) -- mirrors Docusaurus slugs
classes(id, course_id, teacher_id, name, join_code, term_label, is_archived)
enrollments(id, class_id, student_id, status active|removed, joined_at)
assignments(id, class_id, unit_id, type activity|formative|summative|custom,
            title, instructions_md, due_at, max_marks, allow_late, published_at)
submissions(id, assignment_id, student_id, submitted_at, text_md,
            file_path, status submitted|late|graded|returned)
grades(id, submission_id, marks, feedback_md, graded_by, graded_at)
quiz_banks(id, unit_id, visibility teacher_only)         -- answer keys live HERE, not in the static site
quiz_items(id, bank_id, question_md, options_json, answer_json, blooms_level)
```

## 3. RLS Policy Matrix (must be tested)
| Table | Student | Teacher | Admin |
|---|---|---|---|
| classes | read if enrolled | CRUD own | read all |
| enrollments | read own; insert via valid join_code | read/update for own classes | all |
| assignments | read if enrolled & published | CRUD in own classes | read |
| submissions | CRUD own (until graded) | read/update in own classes | read |
| grades | read own | CRUD in own classes | read |
| quiz_banks/items | **no access** | read (approved teachers) | CRUD |

## 4. User Stories
- **C1**: As a teacher, I create a class for a course, get a 6-character join code, and share it.
- **C2**: As a student, I enter a join code and appear in the class roster.
- **C3**: As a teacher, I create an assignment from a unit's activity/formative/summative in ≤ 3 clicks (prefilled title + link to the unit), set due date and marks, and publish.
- **C4**: As a student, I see my assignments per class with due dates; I submit text and/or a file (PDF/image/docx ≤ 10 MB) before the deadline; late submissions are flagged if allowed.
- **C5**: As a teacher, I open a submission queue per assignment, grade with marks + feedback, and return it.
- **C6**: As a teacher, I view the teacher-only answer key / marking rubric for any book assessment.
- **C7**: As a teacher, I export my gradebook for a class as CSV/XLSX.

## 5. Functional Requirements
| ID | Requirement |
|---|---|
| VC1 | Join codes: unique, regenerable, revocable; joining requires login. |
| VC2 | Assignment creation UI can pick any unit item via course→unit→type selector synced from `units` (seeded to match Docusaurus slugs; a sync script keeps them aligned). |
| VC3 | File uploads to Supabase Storage bucket `submissions/` with per-owner RLS; virus-scan is out of scope v1 but file types whitelist enforced. |
| VC4 | Grading returns trigger a status change visible to the student (no email in v1; backlog). |
| VC5 | Auto-graded MCQ formative quizzes (from `quiz_items`) render in-app; scores write straight to `grades`. Written work is manually graded. |
| VC6 | Deadlines evaluated in Asia/Karachi timezone. |
| VC7 | All UI strings bilingual EN/UR. |

## 6. Step-by-Step Build Plan
1. Migration 002: tables in §2 + RLS in §3 + seed script (all 8 semesters + their courses/units from `Scheme-and-Course-guides/B.Ed 4 Year board.docx` & the per-semester guides; content authored Sems 1–4 first but the catalog is seeded whole).
2. Unit-sync script: reads Docusaurus front-matter → upserts `units` (run in CI so book and DB never drift).
3. Teacher: class CRUD + roster + join-code screens.
4. Student: join-class flow + "My classes" list.
5. Assignment builder (teacher) + assignment list/detail (student).
6. Submission flow: text editor + file upload + deadline logic.
7. Grading queue + return flow + gradebook table + CSV/XLSX export.
8. MCQ quiz player + auto-grading for formative banks.
9. RLS test matrix automated; load-test with 200 simulated students on free tier.

## 7. Acceptance Criteria
- [ ] Full happy path demo: teacher creates class → student joins → assignment published → student submits file → teacher grades → student sees marks + feedback.
- [ ] A student can never query another student's submission or any `quiz_items` row (proven by failing queries in tests).
- [ ] Gradebook export opens correctly in Excel with Urdu names intact (UTF-8 BOM).
- [ ] Late logic: submission after `due_at` marked `late` only when `allow_late=true`, else blocked with a clear bilingual message.
