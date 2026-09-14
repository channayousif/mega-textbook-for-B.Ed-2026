---
id: 0003
title: Tasks reviewer capability
stage: tasks
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role
user: M Yousif Channa
command: /sp.tasks 017-reviewer-role
labels: ["tasks-017", "reviewer", "rls", "guard-privileged-columns", "postgres-enum"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0015-download-and-commit.md
  pr: https://github.com/channayousif/mega_book_for_B.Ed/pull/51
files:
 - specs/017-reviewer-role/tasks.md (new, 36 tasks)
 - history/prompts/017-reviewer-role/0002-resolve-open-questions-and-plan.plan.prompt.md (backfilled)
tests:
 - checklist format validated mechanically (36 tasks, 0 malformed, IDs sequential T001-T036)
 - zero em dash (Art. III.9) verified in tasks.md
 - read 0008_guard_privileged_columns.sql and 0009_write_privilege_audit.sql to check FR-001's premise
---

## Prompt

merge 51 when green, then tasks

## Response snapshot

Task generation turned up three things that reading only the design documents would have missed.

**`guard_privileged_columns()` does not protect a column merely because the column is new.**
FR-001 states that the guard "blocks self-grant" as though it were already true. It is not:
`0008_guard_privileged_columns.sql` tests `role`, `verified_teacher`, `status`, `deleted_at` and
`auth_user_id` **by name**. A `reviewer` column shipped without a matching branch would be freely
self-grantable by any account under the 0005 own-row policy. `write_privilege_audit()` in `0009`
enumerates columns by name too, so without a branch there the audit row FR-001 requires would never
be written at all. T007 and T008 exist for this, and are the load-bearing tasks of the feature.

**The enum value needs its own migration file.** PostgreSQL permits `alter type ... add value`
inside a transaction but forbids using the new value in that same transaction, and the Supabase CLI
runs each migration file in one. Since `0044` defines a function whose body writes `'reviewer'` and
is exercised by tests immediately afterwards, the split into `0043` (the enum alone) and `0044`
(everything else) is required rather than stylistic. That deviates from plan.md's single migration,
so tasks.md records the deviation and its reason instead of absorbing it silently.

**Two of success criterion 5's five assertions have no database surface, by design.** "Reviewer
reads queue" and "reviewer cannot alter another reviewer's certification" are listed as RLS
assertions, but certifications are Git artefacts and the queue is derived from a build-time JSON
report, so neither is a row anyone could alter. Writing tests against tables that do not exist
would be worse than saying so, so they are covered as what they actually are: a structural
assertion that the capability grants no new write anywhere (T013), and Git's append-only history.

One design gap was closed rather than deferred. data-model.md §4 says Postgres owns "queue state"
but specifies no table, while plan.md budgets "one column, one enum value, one function, RLS".
The resolution consistent with both is that there is **no queue table**: `report-content-status.mjs`
already derives every other per-unit fact from the tracker files, so T018 extends it to emit
per-unit G3/G5 gate state and the queue is built from `static/content-status.json`. Postgres
therefore never learns anything about a gate outcome, which is exactly Art. V.1's requirement.

Organisation follows Feature 015's precedent: spec.md is requirements-based with no P1/P2 user
stories, so the four increments come from plan.md's Phase 2 ordering, preserving its property that
the backend is provably safe before any UI exists. MVP is Phase 2 plus Phase 3 - the capability
exists, is unforgeable, is audited, dies with a suspension, and can be granted through the real
page, which is the half of the feature carrying all the security risk.

## Outcome

- ✅ Impact: 36 tasks across 7 phases, with the self-grant hole in FR-001's premise caught before implementation rather than after.
- 🧪 Tests: checklist format validated mechanically; 5 RLS tests and 2 unit-test files specified.
- 📁 Files: specs/017-reviewer-role/tasks.md, plus the backfilled plan PHR.
- 🔁 Next prompts: /sp.analyze, or /sp.implement starting at Phase 2.
- 🧠 Reflection: the spec asserted a security property ("the guard blocks self-grant") that the code did not yet provide. Specs inherit premises from the codebase, and that inheritance goes stale the moment the codebase is asked to do something new.

## Evaluation notes (flywheel)

- Failure modes observed: a functional requirement phrased as a statement of existing fact rather than as work to be done, which is how a security branch gets omitted; a data model naming state it never gave a schema.
- Graders run and results (PASS/FAIL): checklist format PASS (36/36); ID sequence PASS; em dash PASS (zero); FR-001 premise check FAIL against the repository, corrected into T007/T008.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): when a spec says an existing guard "blocks" something, grep the guard for the column name before accepting it.
