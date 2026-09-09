---
id: 0001
title: Spec Dashboard Redesign
stage: spec
date: 2026-09-09
surface: agent
model: claude-sonnet-5
feature: 011-dashboard-redesign
branch: 011-dashboard-redesign
user: channayousif@gmail.com
command: /sp.specify 011-dashboard-redesign
labels: ["spec", "dashboard", "app-shell", "student-notes", "teacher-tools", "rls", "spec-003", "spec-004", "spec-005"]
links:
  spec: specs/011-dashboard-redesign/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/011-dashboard-redesign/spec.md
 - specs/011-dashboard-redesign/checklists/requirements.md
tests:
 - "Spec quality checklist (specs/011-dashboard-redesign/checklists/requirements.md) - all 16 items PASS"
---

## Prompt

/sp.specify 011-dashboard-redesign - Redesign the student and teacher dashboards into real,
navigable tools. Shared authenticated app shell with a left-side menu (drawer on mobile).
Student: left menu, join a classroom by code from the dashboard, a personal note-taking space
backed by a new Supabase table with RLS, a course-wise view of topics/units marked as studied.
Teacher: a real dashboard shell and sub-navigation, course from a catalog dropdown instead of a
free-text box, in-app links to analytics and drill-down, edit/delete assignments, edit class
details, a verified-teacher UI to author quiz items and answer keys, a per-class command centre,
assignment templates, bulk actions, analytics as CSS/SVG. Bilingual labels, 44px targets,
keyboard-navigable drawer.

(Origin: user message items 2 and 3. Owner decisions via AskUserQuestion 2026-09-08: new
Supabase table for notes; full teacher rethink including analytics.)

## Response snapshot

Branch `011-dashboard-redesign` and `specs/011-dashboard-redesign/spec.md`.

Seven prioritised user stories: P1 the shared app shell + left menu (MVP - everything else hangs
an item on it); P2 join-a-class-in-the-dashboard + course-wise Progress that includes
self-marked-but-not-enrolled courses; P2 personal notes (new `student_notes` store, private per
student, taggable to course/unit/topic, addable from a content page); P2 the teacher dashboard
shell + catalog course dropdown + reachable analytics; P3 full assignment + class management
(edit/delete, RLS); P3 verified-teacher quiz-item / answer-key authoring UI (closes the Spec 003
backlog item); P3 per-class command centre + assignment templates + bulk actions.

21 functional requirements, 8 success criteria, edge cases (loading-state shell, zero-class
student, renamed/removed course on a note, long note, delete-with-submissions refusal, teacher
who loses verification, partial bulk failure, Sem-1-only catalog). Key entities: nav model
(in code), student note, derived course option, assignment template, quiz item/answer key,
derived command centre. Dependencies on Specs 002-005 + 010 + the catalog; scope explicitly
excludes the `/app/admin/*` owner console, any charting dep, and the auth/role model.

Two open decisions handled: (a) both major scoping calls were taken by the owner earlier and are
in the spec's "Owner decisions" block, so zero [NEEDS CLARIFICATION]; (b) assignment-template
storage (server table vs client) flagged in Assumptions for `/sp.plan`, defaulting to a server
table for cross-device parity with the notes decision.

Spec quality checklist: 16/16 pass.

## Outcome

- ✅ Impact: the dashboard-redesign request is a bounded, testable spec ready for `/sp.plan`.
- 🧪 Tests: spec quality checklist 16/16.
- 📁 Files: `specs/011-dashboard-redesign/spec.md`, `.../checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan` (app-shell component design, `student_notes` migration + RLS, the
  assignment/class edit + quiz-authoring RLS additions, the `/sp.adr` for the shared-shell
  pattern + verified-teacher write elevation). Then `/sp.tasks`, then implement MVP-first.
- 🧠 Reflection: kept it at WHAT-level by naming the surfaces (shell, `student_notes`, course
  dropdown, RLS) without prescribing component structure or migration columns.

## Evaluation notes (flywheel)

- Failure modes observed: scope sprawl risk across seven stories - mitigated by strict P1/P2/P3
  priorities and an "Independent Test" per story so each can ship alone.
- Graders run and results (PASS/FAIL): content-quality 4/4 · requirement-completeness 8/8 ·
  feature-readiness 4/4 -> PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.plan`, decide whether the app shell is a
  route wrapper or a per-page component, by which keeps the diff to the ~13 existing pages
  smallest.
