---
id: 0002
title: Clarify unit coverage and activity estimate gaps
stage: spec
date: 2026-07-24
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "teacher-dashboard", "rls", "data-model"]
links:
  spec: specs/005-teacher-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-teacher-dashboard/spec.md
tests:
 - none (spec-stage clarification; no code changes)
---

## Prompt

/sp.clarify

(No additional free-text input provided; command re-run with empty user input against the same
active feature spec at `specs/005-teacher-dashboard/spec.md`, which already carried 4 resolved
clarifications from an earlier session today.)

## Response snapshot

Re-scanned the spec's remaining Requirements/Key Entities/Dependencies text for ambiguity beyond
the 4 items already resolved. Rather than guessing, spawned an Explore agent to check whether two
FR-referenced data sources actually exist in the codebase before framing questions:

1. FR-007's "actual time taken vs. the book's estimate" — the agent found no per-activity duration
   field anywhere; the only related field is Spec 001's per-file `est_reading_minutes`
   (`contracts/unit-frontmatter.schema.json:14,43`), which is a reading-time estimate, not an
   activity-time one, and Spec 003's `assignments` table
   (`supabase/migrations/0017_assignments.sql:9-24`) has no duration column at all.
2. FR-011's "unit coverage" — the agent found that Spec 004's `unit_progress` table
   (`supabase/migrations/0024_unit_progress.sql:14-42`) has RLS that explicitly denies teachers any
   access, with the design rationale "coverage is more private here than grades" documented in
   Spec 004's plan (Art. VIII.1). FR-011 as originally written would have silently required either
   violating that documented privacy decision or reading a table the teacher role cannot access —
   a real architectural conflict, not just a wording gap.

Asked both as clarification questions. Resolved: (1) unit coverage will be derived independently
from data teachers already see (submissions/grades/quiz_attempts — % of course units with at least
one graded submission or quiz attempt for that student), leaving `unit_progress` and its RLS
completely untouched; (2) the book's-estimate comparison is dropped from FR-007 entirely — the
feature now only records actual time taken, with no baseline to compare against.

Integrated both answers immediately: appended 2 new bullets to the existing `## Clarifications` /
`### Session 2026-07-24` section (now 6 total for the day); rewrote FR-011 to spell out the derived
coverage definition and explicitly exclude `unit_progress`; removed the "vs. the book's estimate"
language from User Story 5, FR-007, and the Activity Feedback key entity; added a Dependencies bullet
under Spec 004 noting `unit_progress` stays untouched and coverage is computed independently.
Verified via grep that no stale "book's estimate" language survives in live requirement text (only
the historical Q&A bullet references it) and no `NEEDS CLARIFICATION` markers remain.

## Outcome

- ✅ Impact: Caught and resolved a genuine cross-spec architectural conflict (FR-011 vs. Spec 004's
  documented teacher-exclusion RLS on `unit_progress`) before planning — this would otherwise have
  surfaced as a security/design contradiction mid-implementation or during RLS test-writing. Also
  closed a data-availability gap in FR-007 that had no real source to satisfy it.
- 🧪 Tests: None run — spec-only edit. The resolution means FR-011's future RLS/isolation tests
  (SC-004) will assert teachers can compute coverage from submissions/grades/quiz_attempts without
  needing any `unit_progress` grant, and FR-007's tests will drop any "estimate delta" assertion.
- 📁 Files: `specs/005-teacher-dashboard/spec.md` (2 new Clarifications bullets; edited FR-007,
  FR-011, User Story 5 description, Activity Feedback entity, and the Spec 004 Dependencies bullet).
- 🔁 Next prompts: `/sp.plan` to produce the implementation plan for 005-teacher-dashboard.
- 🧠 Reflection: Verifying claims against the actual codebase (via a research subagent) before
  drafting clarification questions caught a conflict that a purely textual/spec-only ambiguity scan
  would have missed — the FR-011 language read as internally consistent on its own, and only
  contradicted Spec 004's migration/RLS and plan rationale, which live outside this spec file.

## Evaluation notes (flywheel)

- Failure modes observed: None during this pass. The first /sp.clarify session in this thread had
  scoped its scan to the spec file only; this second pass shows that a scan limited to one file can
  miss cross-spec contradictions, so checking sibling specs'/migrations' concrete artifacts for any
  FR that references data outside the current feature is worth doing as standard practice.
- Graders run and results (PASS/FAIL): N/A — no automated grader configured for spec-clarify stage.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a FR references data owned by a prior spec,
  proactively grep that prior spec's migrations/RLS/plan for exclusions or constraints before
  finalizing the requirement text, rather than relying solely on the current spec's internal
  consistency.
