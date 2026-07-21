---
id: 0006
title: Plan student dashboard architecture and schema
stage: plan
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.plan
labels: ["planning", "architecture", "data-model", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-student-dashboard/plan.md
 - specs/004-student-dashboard/research.md
 - specs/004-student-dashboard/data-model.md
 - specs/004-student-dashboard/contracts/dashboard-operations.md
 - specs/004-student-dashboard/quickstart.md
 - CLAUDE.md
tests:
 - none (planning artifacts only; no code/tests written this session)
---

## Prompt

/sp.plan

(No additional user input text was provided.)

## Response snapshot

Ran `.specify/scripts/bash/setup-plan.sh --json` to scaffold `plan.md` and resolve paths. Read
the fully-clarified `spec.md` (13 FRs, 8 SCs, 3 clarification sessions) and the current
constitution (v2.4.0, ratified/amended 2026-07-20, notably adding Article X — Documentation for
Multiple Audiences, whose own Sync Impact Report names Spec 004/005 as the natural home for the
Student/Teacher Guides' initial authoring).

Investigated the existing codebase before designing anything, since this feature builds almost
entirely on Specs 002/003's schema and this repo's established conventions rather than introducing
new infrastructure:
- Read Spec 003's `plan.md`/`data-model.md` in full to understand the existing `classes`/
  `enrollments`/`assignments`/`submissions`/`grades`/`quiz_items`/`quiz_attempts`/`answer_keys`
  schema, its RLS/trigger idioms (`SECURITY DEFINER` for cross-user writes, guard triggers for
  column-level restrictions RLS can't express), and its migration numbering (next free: `0024`).
- Delegated a research task (Explore agent) to determine how a course's total unit count could be
  known without duplicating Git-tracked content into Postgres — found that `catalog/courses.json`
  and `course-overview.mdx` front matter have no unit-count field, that Spec 001's "every unit-NN/
  folder contains exactly five files" rule means the existing Spec-003-built
  `scripts/build-content-index.mjs` / `static/content-index.json` already contains enough data to
  derive `total_units = count(distinct unit_no)` per course with zero script changes.
- Inspected `src/lib/`, `src/pages/app/`, `src/contexts/`, and `src/theme/` to confirm the app's
  established patterns: flat query-param pages (no nested routes), local `{en,ur}`-keyed `MESSAGES`
  dictionaries for bilingual UI strings (not react-intl, not a database table), `AuthGuard`'s
  cosmetic-only role-gating pattern, and the swizzled `NavbarItem/ComponentTypes.tsx` precedent for
  registering new navbar items.
- Confirmed neither `README.md` nor any Student/Teacher Guide exists yet anywhere in the repo, and
  that `docusaurus.config.ts` has a single docs-plugin instance rooted at `/` for curriculum
  content — informing the decision to add a second, separate docs-plugin instance for guides.

Designed and wrote all Phase 0/1 artifacts:
- **research.md** — 7 resolved questions (R1–R7): total-unit-count derivation from
  `content-index.json` (R1); a deliberately non-uniform achievement architecture — 3 of 4
  achievements as pure, event-driven `SECURITY DEFINER` Postgres triggers, with the 4th (100%
  course coverage) as one narrowly-scoped, explicitly-justified client-assisted/server-verified RPC
  exception, since its denominator lives only in Git (R2); a single `unit_progress` table
  populated from three write paths via `ON CONFLICT DO NOTHING`, unifying self-marking/grading/
  quiz-attempt completion into one queryable record per FR-006's "exactly once" requirement (R3);
  the achievement catalog as static TypeScript code, not a database table, matching this repo's
  established bilingual-`MESSAGES`-dict convention (R4); a swizzled `theme/DocItem/Footer` for the
  unit-page "mark as studied" control, activating automatically wherever `course_code`/`unit_no`
  front matter already exists — no per-file content-author action needed (R5); a second
  Docusaurus docs-plugin instance for the Student Guide, keeping its topic-based navigation
  separate from the curriculum's semester/course/unit-based sidebar (R6); and confirming no new
  npm dependency is needed — progress bars are plain CSS/SVG (R7).
- **data-model.md** — 2 new tables (`unit_progress`, `student_achievements`), their RLS policies
  (including the `WITH CHECK (method = 'self_marked')` restriction that forces all
  non-self-marked writes through `SECURITY DEFINER` triggers), 7 new trigger/helper/RPC functions,
  a full access-control matrix with 9 negative assertions, and a table of the 8 read-only query
  shapes (over existing Spec 003 tables, no new schema) backing the dashboard's other five areas.
- **contracts/dashboard-operations.md** — permitted operations, denial shapes, and a 13-item
  contract test checklist covering every FR and both the zero-assignment-class and
  self-marking-scope clarifications from the prior `/sp.clarify` sessions.
- **quickstart.md** — migration order (`0024`–`0027`), Student Guide setup verification, a
  10-item end-to-end verification checklist, and 3 failure modes most likely to bite (missing
  `SECURITY DEFINER` on cross-user sync triggers, the client-initiated coverage-achievement RPC
  never being wired into the UI, and Docusaurus docs-plugin id collision).
- **plan.md** — Summary, Technical Context (no new dependency; 2 new tables; SC-008's 2s p95
  budget), a 14-row Constitution Check table (all Article V/VI/VIII/IX rows ✅; two ⚠️ rows for
  Article VII's Docs gate and the new Article X, both resolved by scoping the Student Guide's
  initial authoring into this same plan, not deferred), Project Structure (6 new
  `src/pages/app/dashboard/*` pages, a new `guides/` docs-plugin content tree, 4 new migrations),
  Complexity Tracking (3 deliberate choices, none a constitutional violation), Risks (3, each with
  blast radius and mitigation), and Follow-ups (Teacher Guide explicitly deferred to whichever
  future spec changes teacher workflow).

Ran `.specify/scripts/bash/update-agent-context.sh claude`, which appended this feature's
language/framework/database summary to `CLAUDE.md`'s "Active Technologies"/"Recent Changes"
sections (verified via grep — matches the existing verbose-entry convention already present for
Specs 002/003, no manual cleanup needed).

Surfaced one ADR suggestion at the end of plan.md (per CLAUDE.md's protocol, consent required, not
auto-created): the second-Docusaurus-docs-plugin-instance decision for the Student/Teacher Guides
passes the three-part significance test (long-term impact on every future spec's docs
architecture; real alternatives considered — folding into the existing docs tree; cross-cutting
scope) — `/sp.adr docs-plugin-instance-for-usage-guides`.

## Outcome

- ✅ Impact: Spec 004 has a complete, internally consistent Phase 0/1 design ready for `/sp.tasks`
  — every FR maps to either an existing Spec 003 read path or one of the 2 new tables/7 new
  functions; the one architecturally awkward point (a Git-derived number needed for a
  Postgres-side achievement check) is resolved with an explicit, bounded, low-blast-radius
  exception rather than either ignored or over-engineered with a new sync pipeline; the
  previously-undiscussed Article X Docs-gate obligation is caught and scoped into this plan rather
  than surfacing as a surprise at review time.
- 🧪 Tests: None run this session (planning artifacts only); `data-model.md`'s access-control
  matrix (9 assertions) and `contracts/dashboard-operations.md`'s test checklist (13 items) are
  the specifications `/sp.tasks` should decompose into actual `tests/rls/` files.
- 📁 Files: `specs/004-student-dashboard/{plan.md, research.md, data-model.md, quickstart.md,
  contracts/dashboard-operations.md}` (all new); `CLAUDE.md` (agent-context auto-update, Active
  Technologies section).
- 🔁 Next prompts: `/sp.tasks` to decompose this plan into a dependency-ordered task list; the
  user may separately choose to run `/sp.adr docs-plugin-instance-for-usage-guides` for the
  flagged architectural decision.
- 🧠 Reflection: Reading Spec 003's actual `data-model.md`/`plan.md` before designing anything (
  rather than working from the spec text alone) was what surfaced the `SECURITY DEFINER`
  cross-user-write pattern this feature's sync/grant triggers needed — without that precedent,
  the natural first instinct would have been a plain trigger, which would have silently failed
  under RLS the moment a teacher (not the student) triggers a grade insert.

## Evaluation notes (flywheel)

- Failure modes observed: None during this session — the one design point that could have gone
  wrong (assuming a uniform architecture for all 4 achievements) was caught by explicitly tracing
  each achievement's data dependencies before committing to "all triggers" or "all RPCs."
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for `/sp.plan` output;
  Constitution Check table is the plan's own internal gate, self-assessed against v2.4.0's article
  text with no unresolved ⚠️ items left unaddressed).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a constitution amendment lands in the same
  session as a feature's planning work (as Article X did here), explicitly diff the constitution's
  own Sync Impact Report against the feature's Constitution Check table before finalizing it —
  this session did that deliberately, but it would be easy for a future planning pass to miss a
  same-day constitutional obligation if it isn't a standing habit.
