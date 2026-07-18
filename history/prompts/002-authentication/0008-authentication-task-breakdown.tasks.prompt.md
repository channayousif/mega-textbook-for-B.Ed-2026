---
id: 0008
title: Authentication task breakdown
stage: tasks
date: 2026-07-18
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.tasks
labels: ["tasks", "authentication", "supabase", "rls", "test-plan"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - specs/002-authentication/tasks.md
tests:
 - none run (task-generation phase); 18 test tasks + 1 harness specified
---

## Prompt

/sp.tasks

(Task generation for feature 002-authentication from plan.md, spec.md, research.md,
data-model.md, contracts/auth-operations.md, and quickstart.md.)

## Response snapshot

Generated `specs/002-authentication/tasks.md`: **66 tasks across 8 phases**, organised by user
story so each is independently implementable and testable.

Phase breakdown: Setup 6 · Foundational 14 · US1 11 · US2 4 · US3 10 · US4 5 ·
Account lifecycle 8 · Polish 8.

**Tests treated as required, not optional.** Spec SC-004 mandates "a documented access-control
test set" and Constitution Art. VII's engineering gate requires "RLS policies tested", so 18
test tasks plus a harness (T020) are in scope — 11 of them RLS *negative-case* tests. The task
file states explicitly that a missing negative test is a failing gate, because the risk here is
an over-permissive policy leaking answer keys and no happy-path test can detect that.

Design decisions encoded in the ordering:
- Phase 2 migrations are a strict chain (T007→T008→T009→T010→T011/T012→T013/T014/T015):
  `is_admin()` must exist before any policy referencing it, tables before their triggers.
  The client track (T016–T019) runs parallel to that chain.
- The sign-up trigger task (T013) carries an explicit allowlist requirement, since
  `raw_user_meta_data` is user-controlled and would otherwise permit self-assigning `admin`.
- Suspension (T054) is specified as status column **plus** `auth.admin.signOut(...,'global')`,
  because a status column alone leaves a live session working until token expiry.
- T006 adds a build-time guard failing the build if a service-role key pattern appears under
  `src/` — Constitution Art. V.1 violation is release-blocking.

**Coverage gap surfaced**: FR-020, FR-021, and FR-022 (suspension and self-service deletion)
have **no owning user story** in spec.md. FR-020 arguably supports US3's admin story; FR-021/022
belong to no story at all. Rather than silently attaching them to an unrelated story or dropping
them, they were placed in a clearly-labelled Phase 7 with a note recommending spec.md gain a
user story on a later pass. Implementable as written, so not blocking.

Format validation run via grep: 66 tasks, zero malformed entries, zero duplicate IDs, story
labels correctly present only on US phases (US1×11, US2×4, US3×10, US4×5) and absent from
Setup/Foundational/Lifecycle/Polish. One self-correction: the summary line initially claimed 24
test tasks; actual count is 18 + harness, corrected after the grep.

## Outcome

- ✅ Impact: Spec 002 is decomposed into executable tasks; ready for `/sp.implement`.
- 🧪 Tests: none run (planning artifact). 18 test tasks + harness specified, 11 negative-case RLS.
- 📁 Files: specs/002-authentication/tasks.md
- 🔁 Next prompts: `/sp.implement` (or start at Phase 1 manually). MVP checkpoint is end of Phase 3.
- 🧠 Reflection: Mapping every task back to an FR exposed that three requirements had no user story behind them — a gap invisible while reading spec.md top-to-bottom, but obvious once tasks must be attributed to a story. Task generation doubles as a spec-coverage audit.

## Evaluation notes (flywheel)

- Failure modes observed: my own summary miscounted test tasks (24 claimed vs 18 actual) — caught only by grepping the generated file rather than trusting the narrative. Worth verifying counts mechanically whenever they are asserted.
- Graders run and results (PASS/FAIL): format validation PASS (66 tasks, 0 malformed, 0 duplicate IDs, story labels correctly scoped); count reconciliation FAIL then corrected.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when generating tasks, emit the per-phase counts by grep before writing the summary section, so narrative numbers are derived rather than estimated.
