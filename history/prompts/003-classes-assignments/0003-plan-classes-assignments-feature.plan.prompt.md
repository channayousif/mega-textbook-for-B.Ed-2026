---
id: 0003
title: Plan classes/assignments feature
stage: plan
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.plan
labels: ["plan", "architecture", "classes-assignments", "supabase", "rls"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/plan.md
 - specs/003-classes-assignments/research.md
 - specs/003-classes-assignments/data-model.md
 - specs/003-classes-assignments/contracts/classes-operations.md
 - specs/003-classes-assignments/quickstart.md
 - CLAUDE.md (auto-updated by update-agent-context.sh)
tests:
 - none (planning stage; test checklist authored in contracts/classes-operations.md §H for /sp.tasks and implementation to execute)
---

## Prompt

(No additional user input provided — `/sp.plan` invoked with empty arguments to run the standard planning workflow against the clarified feature spec on branch `003-classes-assignments`.)

## Response snapshot

Ran `.specify/scripts/bash/setup-plan.sh --json`, then researched the existing codebase before writing anything: read the fully-clarified `spec.md` (7 Q&As), the constitution (v2.3.0), Spec 002's `plan.md`/`data-model.md`/`contracts/auth-operations.md` (established the self-hosted-Supabase-no-app-server architecture this feature must extend), Spec 001's `unit-frontmatter.schema.json`/`course-overview.schema.json`/`check-no-answer-keys.mjs` (confirmed answer keys are categorically forbidden from Git content — a hard constraint, not a choice), the actual `docs/semester-1/efmp-301/unit-01/` file layout (confirmed unit items are `activities.mdx`/`formative.mdx`/`summative.mdx`/`teacher-notes.mdx`, not a fine-grained per-item ID scheme), and `supabase/migrations/0004_is_admin.sql`/`0010_verified_teacher_gate.sql` (found `is_admin()`, `is_verified_teacher()`, `current_profile_id()` already built and explicitly intended for this feature to reuse — `0010`'s own comment: "Superseded, not extended, once Spec 003 lands").

Produced all Phase 0/1 artifacts:
- **research.md** — 9 decisions (R1–R9): answer keys/correct-answers live only in Postgres (never Git); MCQ auto-grading via a `SECURITY DEFINER` RPC (`submit_quiz_attempt`) so correct answers never reach the client; auto-archive via an `AFTER UPDATE ON profiles` trigger mirroring Spec 002's audit-trigger idiom; upload limits enforced at the Supabase Storage bucket-config level; gradebook export as client-side `.xlsx` via `exceljs` (not `.csv`, to avoid Urdu-name mojibake); PKT deadlines as plain UTC-instant comparisons; best-quiz-score via an indexed `MAX()` view, no caching; 6-char ambiguity-free join codes; and the Spec 002 primitives reused unmodified.
- **data-model.md** — 7 new entities (`classes`, `enrollments`, `assignments`, `submissions`, `grades`, `quiz_items`/`quiz_attempts`, `answer_keys`), each with explicit state transitions encoding all 5 of the 2026-07-19 clarifications (resubmit-until-due-date, quiz-best-of-unlimited-retakes, reversible archiving via a real-time eligibility check rather than a stored `archived_reason` gate, always-unpublishable assignments, quantified SC-005). Documented two deliberate non-additions (no `auto_graded` column, no generic class-editing capability) with rationale rather than silently including them. Full access-control matrix with 10 required negative-test assertions.
- **contracts/classes-operations.md** — operation-by-operation contract (no REST API, PostgREST + 2 RPCs only) with a 27-item test checklist covering every FR and clarification.
- **quickstart.md** — migration order, new Storage bucket creation, happy-path and RLS verification tables, 4 documented failure modes.
- **plan.md** — Summary, Technical Context, Constitution Check (no violations; V.5 bundle-budget flagged as a measurable check, same posture as Spec 002), Project Structure (new `src/pages/app/classes/...` tree, migrations `0011`–`0023`), Complexity Tracking (3 deliberate choices), Risks (3), Follow-ups (3).

Ran `.specify/scripts/bash/update-agent-context.sh claude`, which updated `CLAUDE.md`'s Active Technologies/Recent Changes sections automatically.

## Outcome

- ✅ Impact: Full Phase 0–1 planning artifact set produced for 003-classes-assignments, extending Spec 002's self-hosted-Supabase/RLS-only architecture with zero new Edge Functions and zero constitutional violations. Every one of the 5 same-day spec clarifications is traced through to a concrete schema/RLS design decision, not left implicit.
- 🧪 Tests: None executed at this stage; a 27-item contract test checklist (contracts/classes-operations.md §H) and a 10-item RLS negative-assertion list (data-model.md) are authored for `/sp.tasks` to convert into actual test tasks.
- 📁 Files: `specs/003-classes-assignments/{plan,research,data-model,quickstart}.md`, `specs/003-classes-assignments/contracts/classes-operations.md` (all new); `CLAUDE.md` (auto-updated Active Technologies).
- 🔁 Next prompts: `/sp.tasks` to generate `tasks.md`; optionally `/sp.analyze` first for cross-artifact consistency.
- 🧠 Reflection: Reading Spec 001's build-gate scripts and Spec 002's actual migration files (not just their spec/plan prose) surfaced two load-bearing facts neither this feature's own spec nor a surface-level read would have revealed — the categorical Git-content ban on answer keys, and that `is_verified_teacher()` was deliberately pre-built for this exact feature. Worth treating "read the actual enforcement code, not just the spec," as standard practice before planning any feature that extends prior work.

## Evaluation notes (flywheel)

- Failure modes observed: None — no constitutional gate failures, no unresolved NEEDS CLARIFICATION markers going into or out of Phase 0.
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for plan-stage).
- Prompt variant (if applicable): Standard `/sp.plan` workflow, unmodified.
- Next experiment (smallest change to try): N/A.
