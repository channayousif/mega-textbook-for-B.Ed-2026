---
id: 0001
title: Clarify teacher dashboard spec ambiguities
stage: spec
date: 2026-07-24
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "teacher-dashboard", "analytics", "overview"]
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

(No additional free-text input provided; command run with empty user input against the active
feature spec at `specs/005-teacher-dashboard/spec.md`.)

## Response snapshot

Ran the structured ambiguity scan across the taxonomy (functional scope, domain/data model,
interaction/UX, non-functional, integration, edge cases, constraints, terminology, completion
signals, misc/placeholders) against `specs/005-teacher-dashboard/spec.md`. Identified 4 high-impact
ambiguities and resolved them one at a time via sequential multiple-choice questions, integrating
each accepted answer into the spec immediately:

1. FR-010 "falling trend" (explicit `NEEDS CLARIFICATION` marker in the source spec) → defined as
   the student's last 3 graded scores each strictly lower than the one before it. Removed the
   marker and rewrote FR-010 with both at-risk criteria spelled out precisely (≥2 missed deadlines
   = assignments past due with no submission; OR the falling-trend definition above).
2. FR-002 "recent student activity" (undefined scope/size) → fixed feed of the 10 most recent
   activity items, newest first.
3. FR-002 "upcoming assignment due dates" (unbounded) → bounded to the 5 soonest-due assignments
   across all of the teacher's classes.
4. Recent-activity data source (submissions only vs. submissions + quiz attempts, given Spec 003
   has both) → both are merged into one feed ordered by timestamp.

Added a `## Clarifications` / `### Session 2026-07-24` section with all 4 Q&A bullets, and updated
FR-002 and FR-010 in place to encode the resolved definitions directly into the requirements text
(no contradictory or stale text left behind). Verified no `NEEDS CLARIFICATION` markers remain via
grep. Reported a coverage summary: all previously Partial/Missing high-impact categories now
Resolved; remaining lower-impact details (e.g., score-distribution chart bucketing, exact
unit-coverage percentage formula) deferred to `/sp.plan` as non-blocking. Suggested next command:
`/sp.plan`.

## Outcome

- ✅ Impact: Removed the spec's only explicit `NEEDS CLARIFICATION` marker (FR-010 at-risk trend
  definition) and closed 3 additional latent ambiguities in FR-002 (Overview scope) that would have
  caused rework or mismatched acceptance tests during planning/implementation. Spec is now
  unambiguous on Analytics at-risk logic and Overview data bounds.
- 🧪 Tests: None run — clarification is a spec-only edit; testability of the affected acceptance
  scenarios (US1, US6) is improved but no test suite exists yet for this feature.
- 📁 Files: `specs/005-teacher-dashboard/spec.md` (added Clarifications section; edited FR-002 and
  FR-010).
- 🔁 Next prompts: `/sp.plan` to produce the implementation plan for 005-teacher-dashboard.
- 🧠 Reflection: Kept to 4 of the max 5 questions — stopped once all high-impact categories were
  resolved rather than spending the full quota on lower-value questions (e.g., score-distribution
  chart format), consistent with the "stop when critical ambiguities are resolved" rule.

## Evaluation notes (flywheel)

- Failure modes observed: None. One internal consistency issue caught and self-corrected: the
  Clarifications bullet for Q2 (recent-activity size) initially said "10 most recent submissions,"
  which would have contradicted Q4's later answer (submissions + quizzes merged). Reworded the Q2
  bullet to "10 most recent activity items ... (source refined below)" so the history stays
  internally consistent rather than contradictory.
- Graders run and results (PASS/FAIL): N/A — no automated grader configured for spec-clarify stage.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
