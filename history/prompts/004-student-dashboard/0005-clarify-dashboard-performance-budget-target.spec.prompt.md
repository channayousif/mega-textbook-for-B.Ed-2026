---
id: 0005
title: Clarify dashboard performance budget target
stage: spec
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "performance", "non-functional", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-student-dashboard/spec.md
tests:
 - none (spec-only change)
---

## Prompt

/sp.clarify

(No additional user input text was provided; this is a third `/sp.clarify` invocation on the same
feature spec within this conversation, following two earlier sessions that resolved achievement
logic (streak threshold/scope, zero-assignment edge case) and information architecture
(achievements as a sixth dashboard area).)

## Response snapshot

Re-ran `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` (unchanged paths) and
re-read the fully-clarified `specs/004-student-dashboard/spec.md` end to end. Performed a fresh
taxonomy scan focused on categories not yet touched by the prior two sessions. Found every
category Clear or already Resolved except **Non-Functional Quality Attributes: Performance** —
the spec had zero latency/throughput target anywhere, in contrast to Spec 003
(classes-assignments), which explicitly set a p95 response-time SC via its own `/sp.clarify`
session. This mattered here specifically because FR-013 requires the dashboard to reflect live
state on every load with no manual refresh (no staleness tolerance), which is a direct fork in
architecture: compute coverage/achievement figures live on each request vs. precompute/cache them.
Without a concrete budget, `/sp.plan` would have to guess which approach the performance
requirement actually demands.

Asked one targeted question (not padded to the 5-question cap, since no further high-impact gap
was found): what load-time budget the dashboard's home area should meet, and at what scale
(semesters of history, classes per semester). Offered three options — a tight 2s p95 bound scaled
to the B.Ed program's existing 8-semester structure (recommended, since Spec 001's scaffold
already establishes 8 semesters as the platform's realistic upper bound and a dashboard a student
checks often warrants a tighter budget than Spec 003's submission/grading actions), a looser 5s
p95 bound reusing Spec 003's exact threshold, or deferring entirely to `/sp.plan`. User accepted
the recommended 2s p95 @ 8 semesters / 6 classes.

Integrated the answer into `specs/004-student-dashboard/spec.md`:
- Appended a `### Session 2026-07-20 (second follow-up)` Q&A bullet under the existing
  `## Clarifications` section.
- Added a new **SC-008** measurable outcome stating the 2s p95 budget at the stated scale,
  following the existing Success Criteria section's format and numbering (no renumbering needed
  since this was purely additive at the end of the list).

## Outcome

- ✅ Impact: Closes the spec's last non-functional gap (a concrete, testable performance budget)
  before `/sp.plan`, giving the architecture phase an explicit target to design against (live
  query vs. cached/materialized coverage and achievement figures) instead of an implicit,
  undiscovered assumption.
- 🧪 Tests: None run (spec-only edit); SC-008 becomes a testable target once implemented (e.g., a
  load-test fixture seeded with 8 semesters / 6 classes per semester).
- 📁 Files: `specs/004-student-dashboard/spec.md` (Clarifications appended; new SC-008 added to
  Success Criteria).
- 🔁 Next prompts: `/sp.plan` — spec has now been clarified across three sessions (achievement
  logic, information architecture, performance budget) with no outstanding high-impact ambiguity
  identified across the full taxonomy scan.
- 🧠 Reflection: Each `/sp.clarify` re-invocation in this conversation surfaced a different
  taxonomy category the prior pass hadn't fully covered (functional/achievement details → IA
  contradiction → non-functional performance), suggesting a single clarify pass benefits from
  explicitly walking all 10 taxonomy categories rather than stopping once the first few
  high-signal ambiguities are resolved.

## Evaluation notes (flywheel)

- Failure modes observed: The first two `/sp.clarify` sessions did not surface the missing
  performance budget because they focused on the checklist's pre-flagged risk area and then on a
  narrative consistency check (FR-001 vs. User Story 6), without a systematic non-functional-
  attributes pass. This third invocation caught it only because the taxonomy was walked fresh
  end-to-end.
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for `/sp.clarify`
  output; manual grep confirmed SC-008 and its Clarifications entry are consistent and
  non-duplicated).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Have `/sp.clarify` always explicitly state, even when
  no question is asked for a category, a one-line coverage note per taxonomy category in its
  working memory before generating candidate questions — would likely have caught the performance
  gap on the first pass instead of the third.
