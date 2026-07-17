# SPEC 005 — Teacher Dashboard, Feedback & Book Improvement Loop

**Status:** Draft for approval • **Depends on:** 002, 003

## 1. Problem & Goal
Teachers need a cockpit to (a) track their teaching activities, (b) record feedback on book activities they ran, (c) suggest improvements to any part of the book, (d) review student submissions and performance. Part (c) is strategic: it turns every teacher into a curriculum reviewer, feeding continuous improvement of the textbook — a loop the curriculum owner moderates.

## 2. User Stories
- **T1**: As a teacher, my dashboard home shows: my classes, ungraded submission count per class, upcoming due dates, and recent student activity.
- **T2**: As a teacher, I log a **teaching activity record**: which unit/activity I ran, date, class, duration, and a reflection note — building my own teaching diary.
- **T3**: As a teacher, after running a book activity I record **structured feedback**: rating (1–5), what worked, what didn't, time it actually took vs. estimate.
- **T4**: As a teacher, on any book page I click "Suggest improvement" and file a suggestion (typo / clarity / factual / pedagogy / translation) tied to that exact page & section; I can track its status (submitted → under review → accepted → published / rejected with reason).
- **T5**: As an admin, I triage suggestions in a moderation queue; accepted ones become content tasks in the authoring pipeline (Spec 006).
- **T6**: As a teacher, I open **performance analytics** per class: score distribution per assignment, per-student trend, unit-wise average, and at-risk flags (≥2 missed deadlines or falling trend).
- **T7**: As a teacher, I drill into one student's full record within my class (their submissions, grades, coverage).

## 3. Data Additions
```
teaching_logs(id, teacher_id, class_id, unit_id, activity_ref, taught_on,
              duration_min, reflection_md)
activity_feedback(id, teacher_id, unit_id, activity_ref, rating 1..5,
                  worked_md, improve_md, actual_minutes)
suggestions(id, author_id, page_slug, locale, section_anchor,
            category typo|clarity|factual|pedagogy|translation|other,
            body_md, status submitted|review|accepted|rejected|published,
            admin_note, created_at, resolved_at)
```

## 4. Functional Requirements
| ID | Requirement |
|---|---|
| TD1 | Route `/app/teacher` (approved teachers only) with tabs: Overview • Classes • Grading • My Teaching Log • Feedback & Suggestions • Analytics. |
| TD2 | "Suggest improvement" button injected on every Docusaurus doc page (auth-aware component) capturing `page_slug` + nearest heading anchor automatically. |
| TD3 | Analytics computed via SQL views (no heavy client computation); charts in lightweight SVG. |
| TD4 | At-risk flag rules documented in the spec and shown with an explanation tooltip — flags are advisory, never labels on the student's own view. |
| TD5 | Admin moderation queue at `/app/admin/suggestions` with filters (status, category, course) and one-click status transitions + note. |
| TD6 | Aggregated activity_feedback per activity visible to admin (avg rating, common issues) to prioritize revisions. |
| TD7 | All strings bilingual EN/UR. |

## 5. RLS
Teachers CRUD their own logs/feedback/suggestions; read analytics only for their classes. Admin reads all; only admin transitions suggestion status. Students: no access to any table in this spec.

## 6. Step-by-Step Build Plan
1. Migration 004: tables + analytics views + RLS.
2. Overview tab (counts + queues) reusing Spec 003 queries.
3. Teaching Log CRUD (fast entry form: ≤ 30 seconds to log one activity).
4. Activity Feedback form linked from log entries and from unit pages.
5. Suggestion widget on doc pages + teacher's "My suggestions" tracker.
6. Admin moderation queue + status workflow + link-out to content task creation (Spec 006).
7. Analytics tab: distribution, trends, unit averages, at-risk list; validate numbers against hand-computed fixtures.
8. Bilingual copy pass + mobile QA.

## 7. Acceptance Criteria
- [ ] A suggestion filed from a book page lands in the admin queue carrying the correct slug + anchor + locale.
- [ ] Status changes are visible to the suggesting teacher with admin note.
- [ ] Analytics figures match manual SQL on fixtures (documented calculation sheet).
- [ ] A teacher of Class A can see zero data from Class B (RLS test).
- [ ] Logging one teaching activity takes ≤ 30s (timed usability check).
