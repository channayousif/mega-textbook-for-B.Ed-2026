---
id: 0002
title: Clarify Spec 010 feedback scope and sign-in merge
stage: misc
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarify", "spec-010", "content-feedback", "self-assessment"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/010-curriculum-owner-console/spec.md
tests:
 - "n/a (spec phase) - structural validation: 2 Q bullets match 2 accepted answers, only allowed headings added, no em dash, no unresolved placeholders"
---

## Prompt

/sp.clarify

(No arguments - ran the standard ambiguity-scan workflow against the active feature spec,
specs/010-curriculum-owner-console/spec.md, on branch 010-curriculum-owner-console.)

## Response snapshot

Ran the full taxonomy scan (Functional Scope, Domain & Data Model, Interaction & UX,
Non-Functional, Integration, Edge Cases, Constraints, Terminology, Completion Signals, Misc)
against the spec written in PHR 0001. Most categories were already Clear (the approved
implementation plan had pre-resolved the major forks) or reasonably Deferred as low-impact for
this small single-institution deployment (data-volume/scale, observability, feedback
rate-limiting - the last matching the existing platform pattern of RLS ownership + admin
moderation with no formal rate limit anywhere). Two high-impact, materially-forking questions
were identified and asked one at a time with a recommended option each:

- **Q1 (Functional Scope)**: should general + passage feedback reach only the nine-part topic
  files, or every content page in a unit? User chose **A - every content page in a unit**
  (topic files, unit opening, unit-assessment, unit-teacher-notes, course-review), matching the
  existing teacher "suggest improvement" flow's reach.
- **Q2 (Domain & Data Model / Interaction)**: on first sign-in, should locally-stored
  self-assessment ticks merge into the account or be discarded? User chose **A - merge on
  first sign-in**; the account is authoritative from that point on.

Both answers were integrated incrementally: a `## Clarifications` / `### Session 2026-09-05`
section was added right after the Overview with both Q/A bullets, and each answer was folded
into the specific sections it affects rather than left as a separate note - matching the house
pattern seen in Specs 004/005 (refine the existing FR/scenario text in place):

- Q1 → FR-010, FR-011, FR-022, FR-023, FR-025, the "Content feedback item" and "Feedback
  export bundle" entities, User Story 2's acceptance scenarios (added one, renumbered the
  rest), and User Story 5's narrative + first two acceptance scenarios - all broadened from
  "topic file/page" to "content page/file" with topic fields explicitly optional off topic
  pages.
- Q2 → FR-003 (added the merge sentence), the "Sign-in after local ticks" edge case (rewritten
  from a hedged default to a decided behavior), and a new acceptance scenario 4 on User
  Story 1.

Validated after each write: exactly one `- Q:` bullet per accepted answer (2 total, matching 2
questions asked), only `## Clarifications` and `### Session 2026-09-05` added as new headings,
no contradictory earlier statement left (the old hedged "adopted... nothing is silently lost"
edge-case wording was replaced, not duplicated), no em dash introduced, no unresolved
placeholders.

## Outcome

- ✅ Impact: Spec 010 now has zero ambiguity in its two highest-impact open questions; FR-010/
  011/022/023/025 and the feedback/export entities correctly scope to "any unit content page,"
  which changes the planned `content_feedback` schema (topic fields nullable) and the
  `revise-topic` skill's file-selection logic (not topic-only). FR-003 now states a testable
  one-time-merge behavior instead of an implicit assumption.
- 🧪 Tests: none (spec phase). Structural validation of the clarify integration: PASS (bullet
  count, heading allowlist, no contradictions, no em dash, no placeholders).
- 📁 Files: specs/010-curriculum-owner-console/spec.md (edited).
- 🔁 Next prompts: `/sp.plan` for Spec 010 (raise the four ADR candidates already listed in the
  spec's "Architectural decisions to record during planning" section).
- 🧠 Reflection: the taxonomy scan surfaced that I had silently decided the sign-in-merge
  behavior while drafting the spec in PHR 0001 rather than flagging it - worth double-checking
  future spec-writing passes for edge-case bullets that read as decided but were actually
  defaults invented in the moment.

## Evaluation notes (flywheel)

- Failure modes observed: one - an edge case was written in the initial spec draft as if
  already decided when it was actually an unconfirmed default; caught by this clarify pass
  before it reached planning.
- Graders run and results (PASS/FAIL): clarify structural validation PASS (bullet-count match,
  heading allowlist, contradiction scan, em-dash scan, placeholder scan).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a future `/sp.specify` pass invents a default
  for an edge case rather than deriving it from explicit user input, mark it inline (e.g. "-
  default, unconfirmed -") so `/sp.clarify` can find it by grep instead of by full re-scan.
