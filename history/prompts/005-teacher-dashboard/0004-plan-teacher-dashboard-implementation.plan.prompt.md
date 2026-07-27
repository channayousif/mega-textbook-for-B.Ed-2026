---
id: 0004
title: Plan teacher dashboard implementation
stage: plan
date: 2026-07-24
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.plan
labels: ["planning", "teacher-dashboard", "rls", "data-model", "docusaurus"]
links:
  spec: specs/005-teacher-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-teacher-dashboard/plan.md
 - specs/005-teacher-dashboard/research.md
 - specs/005-teacher-dashboard/data-model.md
 - specs/005-teacher-dashboard/contracts/teacher-dashboard-operations.md
 - specs/005-teacher-dashboard/quickstart.md
 - CLAUDE.md
tests:
 - none (planning stage; no code changes)
---

## Prompt

/sp.plan

(No additional free-text input provided; command run against the fully clarified feature spec at
`specs/005-teacher-dashboard/spec.md` — 2 clarify sessions complete, no `NEEDS CLARIFICATION`
markers remain.)

## Response snapshot

Ran `.specify/scripts/bash/setup-plan.sh --json` to get FEATURE_SPEC/IMPL_PLAN/SPECS_DIR/BRANCH,
then read the constitution (v2.4.0) and Specs 003/004's plan.md/data-model.md/research.md/
contracts/quickstart.md as style and architectural precedent before writing anything.

Before drafting Technical Context, surveyed the actual codebase (not just spec.md) to avoid
planning against a stale mental model: confirmed `/app/classes/*` (Spec 003 — `index.tsx`,
`roster.tsx`, `queue.tsx`, `gradebook.tsx`, `assignment.tsx`, `assignment-new.tsx`, `quiz.tsx`)
already fully implements what FR-001 calls the "Classes" and "Grading" dashboard areas; confirmed
`src/lib/gradebookExport.ts` already contains the exact grades+`quiz_best_scores` merge Analytics
needs; confirmed `src/lib/unitProgress.ts`'s `fetchTotalUnitsForCourse()` (Spec 004) is directly
reusable for FR-011's coverage denominator; confirmed the `guides` Docusaurus docs-plugin instance
(Spec 004, ADR-0009) already exists generically and needs zero config changes for a Teacher Guide;
confirmed via Context7 (Docusaurus docs, per the user's global MCP-first rule) that `useDoc()`
exposes a `toc` array usable for "nearest section heading" detection with no new dependency.

These findings materially changed the plan's shape: rather than treating all six FR-001 areas as
new build, the plan explicitly scopes Classes/Grading as *reused* (navigation to existing pages,
not rebuilt) and only Overview, My Teaching Log, Feedback & Suggestions, and Analytics as new.

Produced all Phase 0/1 artifacts:
- **plan.md** — Summary, Technical Context, a 14-row Constitution Check table (two ⚠️ rows for the
  Docs gate/Teacher Guide obligation, both fulfilled-not-violated), Project Structure (new
  `src/lib/*.ts`, `src/pages/app/teacher/*`, `src/pages/app/admin/{suggestions,feedback}.tsx`,
  extended `Footer.tsx`/`ComponentTypes.tsx`, `guides/teacher-guide/`), a 3-row Complexity Tracking
  table, 3 Risks, and Follow-ups.
- **research.md** — 8 resolved decisions (R1–R8): the suggest-improvement/give-feedback widget's
  slug/anchor/locale capture with no new dependency; course/unit references as unvalidated
  pointers; FR-011 coverage computed independently of Spec 004's `unit_progress` (direct
  implementation of the 2026-07-24 clarification); Analytics reusing `gradebookExport.ts`'s merge
  pattern instead of a new SQL view; a guard trigger enforcing `improvement_suggestions`' one-
  directional status graph; Teacher Guide placement (zero new config, per ADR-0009); no new npm
  dependency; migration numbering (0028–0031).
- **data-model.md** — 3 new tables (`teaching_log_entries`, `activity_feedback`,
  `improvement_suggestions`) with full RLS, the status-transition guard trigger, a 10-item access-
  control matrix with negative assertions, and a "Read-only query shapes" table for Overview/
  Analytics backed entirely by existing Spec 003 tables plus Spec 004's `fetchTotalUnitsForCourse`.
- **contracts/teacher-dashboard-operations.md** — permitted operations, denial shapes, and a
  16-item contract test checklist covering every FR plus both clarification-resolved edge cases.
- **quickstart.md** — migration order, Teacher Guide verification (no config change needed), a
  14-item end-to-end checklist, and 4 failure modes most likely to bite (weakened `WITH CHECK`
  subquery, `AFTER` vs. `BEFORE` trigger timing, accidentally querying `unit_progress`, wrong docs
  instance).

Ran `.specify/scripts/bash/update-agent-context.sh claude`, which appended this feature's tech
stack to `CLAUDE.md`'s "Active Technologies" section without disturbing prior entries.

## Outcome

- ✅ Impact: A complete, codebase-grounded implementation plan that avoids duplicating Spec 003's
  already-shipped Classes/Grading UI, correctly implements both 2026-07-24 clarifications (FR-011's
  independent coverage source, FR-007's dropped estimate comparison) in concrete schema/query
  terms, and closes the Teacher Guide obligation (Constitution Art. X) with zero new
  Docusaurus config by reusing Spec 004's ADR-0009 infrastructure.
- 🧪 Tests: None run — planning stage. `data-model.md`'s access-control matrix and
  `contracts/`'s 16-item checklist define what `/sp.tasks`/`/sp.implement` must eventually satisfy
  in `tests/rls/` and `tests/e2e/`.
- 📁 Files: `specs/005-teacher-dashboard/{plan.md, research.md, data-model.md, quickstart.md,
  contracts/teacher-dashboard-operations.md}` (all new); `CLAUDE.md` (agent-context append via
  script, prior entries preserved).
- 🔁 Next prompts: `/sp.tasks` to generate the dependency-ordered task list from this plan.
- 🧠 Reflection: Reading the actual `/app/classes/*` pages before planning (rather than trusting
  spec.md's FR-001 area list at face value) prevented a plan that would have proposed rebuilding
  substantial, already-shipped Spec 003 functionality — the single highest-value check this
  session made.

## Evaluation notes (flywheel)

- Failure modes observed: None. One deliberate implementation decision made without a formal
  clarify question (judged low-impact/plan-level per the clarify workflow's own "avoid trivial
  stylistic preferences" rule): `activity_feedback` uses upsert-on-repeat-submission semantics
  rather than erroring, since neither spec.md's acceptance scenarios nor its Key Entities section
  specify first-vs-repeat behavior, and silently updating in place is the least-surprising default.
- Graders run and results (PASS/FAIL): N/A — no automated grader configured for the plan stage.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a spec names dashboard "areas" that might overlap
  with a prior spec's already-shipped pages, grep the actual `src/pages/app/` tree for existing
  routes matching those area names before drafting Project Structure — this should become a
  standard first step for any future dashboard-shaped spec in this repo, not something discovered
  ad hoc each time.
