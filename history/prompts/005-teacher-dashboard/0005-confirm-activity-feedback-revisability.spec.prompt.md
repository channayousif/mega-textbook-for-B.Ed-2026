---
id: 0005
title: Confirm activity feedback revisability
stage: spec
date: 2026-07-24
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "teacher-dashboard", "activity-feedback"]
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

(No additional free-text input provided; command re-run a fourth time, this time *after*
`/sp.plan` had already produced plan.md/research.md/data-model.md/contracts/quickstart.md for
005-teacher-dashboard.)

## Response snapshot

Since the spec had already passed two full clarify rounds (6 questions resolved, confirmed
ambiguity-free in a prior pass) and Phase 0/1 planning artifacts already existed, a plain re-scan
of spec.md alone would have found nothing new. Instead, cross-checked the *plan's own design
decisions* against the spec to find any place planning had to make an unconfirmed assumption on
the user's behalf — the highest-value thing a clarify pass can still do once a spec already reads
as internally consistent.

Found one: `data-model.md`'s `activity_feedback` entity documents an "upsert, not error, on repeat
submission" design decision, explicitly flagged there as "not explicitly specified by the spec."
This is exactly the kind of unconfirmed assumption that belongs in spec.md once identified, not
left as an architect's unilateral call — especially since Teaching Log Entries (the sibling entity)
are explicitly immutable with no FR allowing edits, so Activity Feedback's mutability could
reasonably have gone the same way.

Asked the question directly. Answer: yes, revisable — confirming the plan's existing assumption
rather than overturning it. Recorded the Q&A in spec.md's `## Clarifications` session (now 7
questions total across all rounds today), and promoted the previously-implicit behavior into
explicit requirement text: FR-007 gained a sentence ("Re-submitting feedback for an activity the
teacher has already rated MUST update their existing record in place, not create a second one.")
and the Activity Feedback Key Entity gained a clause contrasting it with Teaching Log Entry's
immutability. Verified no `NEEDS CLARIFICATION` markers remain. **No changes were needed to
plan.md/research.md/data-model.md/contracts/quickstart.md** — the plan's design already matched
the confirmed answer; this pass converted an assumption into a ratified spec requirement, it did
not invalidate any prior planning work.

## Outcome

- ✅ Impact: Closed the one place this feature's planning had made an unconfirmed behavioral
  assumption on the user's behalf. The assumption turned out correct, so no rework was triggered,
  but the requirement is now traceable to spec.md/FR-007 rather than living only as a design-doc
  footnote — future readers of spec.md (not just data-model.md) can now see this is a deliberate
  requirement, not an implementation detail.
- 🧪 Tests: None run — spec-only edit. `contracts/teacher-dashboard-operations.md`'s existing
  contract test checklist item 4 ("A teacher can insert then re-rate (upsert) their own
  `activity_feedback`...") already covers this behavior; no new test item needed.
- 📁 Files: `specs/005-teacher-dashboard/spec.md` only (new Clarifications bullet; FR-007 and the
  Activity Feedback Key Entity both gained an explicit sentence).
- 🔁 Next prompts: `/sp.tasks` — planning artifacts are unchanged and still valid; this was a
  spec-traceability fix, not new design work.
- 🧠 Reflection: When `/sp.clarify` is invoked after `/sp.plan` already exists, re-scanning spec.md
  in isolation is the wrong move if it already passed a full clarify cycle — the higher-value check
  is auditing the plan's own "not explicitly specified by the spec" footnotes (Complexity Tracking,
  research.md decision rationales) for exactly this kind of unconfirmed assumption, then verifying
  each one against the user directly.

## Evaluation notes (flywheel)

- Failure modes observed: None — the assumption was confirmed, not overturned, so this pass found
  no rework-triggering gap. Worth noting for calibration: not every post-plan clarify pass will end
  this cleanly; if the answer had been "no, one-shot only," this would have required reopening
  data-model.md's RLS design (dropping the `UPDATE` policy) and contracts' checklist item 4.
- Graders run and results (PASS/FAIL): N/A — no automated grader configured for spec-clarify stage.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Standardize a specific step in the clarify workflow for
  "spec already fully clarified, plan already exists" invocations: grep the plan/research/data-model
  docs for phrases like "not explicitly specified," "assumed," or "design decision" and treat each
  hit as a candidate clarification question, rather than re-running the generic taxonomy scan
  against spec.md alone.
