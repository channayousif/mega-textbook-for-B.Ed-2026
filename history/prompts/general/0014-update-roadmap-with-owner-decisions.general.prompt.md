---
id: 0014
title: Update roadmap with owner decisions
stage: general
date: 2026-09-12
surface: agent
model: claude-opus-5
feature: none
branch: docs/roadmap-2026-09
user: M Yousif Channa
command: update/extend SDD/ROADMAP.md and ask clarifying questions
labels: ["roadmap", "planning", "content-velocity", "review-pipeline", "licence-overlay"]
links:
  spec: null
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/40
files:
 - SDD/ROADMAP.md (rewritten head, appendix preserved verbatim)
 - history/prompts/general/0014-update-roadmap-with-owner-decisions.general.prompt.md
tests:
 - npm run check:content (7/7 gates pass)
 - appendix diff against HEAD (identical apart from the em-dash swap)
 - npm run test:review on main after merging PR #40 (21/21)
---

## Prompt

i want you to update/extend the @SDD/ROADMAP.md and ask clarifying questions regarding any ambiguities or decissions

## Response snapshot

Merged PR #40 first (both checks green, squashed to `4a9324b`, branch deleted, 21/21 on main).

Asked four decisions before writing, since each changed a different section. Owner answers:
licence-overlap content priority; two-stage Urdu review (agent, then an admin-panel `reviewer`
role, plus visitor feedback); deliberately independent market posture with no endorsement sought;
land style-guide v4.0 now.

Rewrote the roadmap head and preserved the course-catalog appendix verbatim. New or corrected:

- **Actual state table** - 2 units at standard, 13 of 37 authorable courses, 1 reviewed Urdu
  mirror, against 34 app pages / 42 migrations / 21,540 lines of specs.
- **Corpus arithmetic** - 48 rows less 5 practicum and 6 unallocated electives = 37 authorable,
  ~222 units; Semesters I-IV window is 26 courses, ~156 units. Flagged the 48-vs-57 discrepancy
  against the repositioning plan as open rather than resolving it silently.
- **Phases 1-4 marked delivered**; the eight off-roadmap specs (007-014) recorded in a table,
  six of them classified as authoring-standard rebuilds.
- **Phase 5 post-mortem** - the original `~6-8 weeks/semester` implied 5.1 units/week; actual is
  0.25. Replaced the estimate with a measurement task and gave Phase 5 a gate that can fail,
  which is the structural cause: every engineering phase had a spec, CI and a merge review, and
  content had a footnote.
- **Licence overlay** - Tier 1/Tier 2 course ordering by STEDA test weight, the licence-blueprint
  prerequisite artefact, and the item bank as first sellable artefact. Noted `GENG-300/301` are
  `bilingual: false` and cheaper per unit.
- **Two-stage review pipeline.** Three sub-questions were raised rather than assumed, and all
  three were answered in the same exchange: the human `reviewer` certifies and the agent prepares
  (agent certification is the target state once the comparator base supports qualification, G3
  before G5); the `reviewer` role is accepted as its own spec, including the Art. VII amendment
  and reviewer identity on tracker rows; feedback is authenticated-only across all roles, which
  is already built in `content_feedback` and needs only the new role to inherit insert.
- **Decisions locked in** extended to 8, including the domain migration (ADR-0016), the
  independent posture and v4.0.
- Open question 4 (suggestion access) **closed from implementation**: `improvement_suggestions`
  is teacher-only, `content_feedback` is any authenticated reader. Both paths already exist.

Two decisions were recorded against advice, with the reasoning preserved for the next reader: the
independent posture gets a consequence note (buyer becomes the individual candidate, so price
against printed licence guides rather than per-seat software), and v4.0 gets a cost note (ninth
standard revision; previous eight each invalidated finished work) plus three binding mitigations -
additive concept layer that must not flip `EFMP-302` U1 out of `reviewed`, widen the front-matter
patterns in the same pass, and v4.0 is the last revision before the freeze.

## Outcome

- ✅ Impact: roadmap now matches reality, carries the four new owner decisions, and gives Phase 5 a failing gate.
- 🧪 Tests: check:content 7/7; appendix verified identical to HEAD apart from the em-dash swap; test:review 21/21 on main.
- 📁 Files: SDD/ROADMAP.md (152 to 367 lines). Uncommitted in the working tree.
- 🔁 Next prompts: land v4.0, then the licence blueprint, then spec the `reviewer` role. Two questions remain open: the 48-vs-57 course count, and the Phase 5 unit target (blocked on the five-unit measurement).
- 🧠 Reflection: the most useful thing in this pass was not new planning but recording what the last plan got wrong and why, so the same footnote is not repeated.

## Evaluation notes (flywheel)

- Failure modes observed: a phase without a gate drifts by 20x unobserved; owner answers can conflict with the project's own constitution, which must be surfaced rather than reconciled silently.
- Graders run and results (PASS/FAIL): check:content PASS; appendix-preservation diff PASS; zero em dash PASS (15 pre-existing removed).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): set one Phase 5 unit target with a date after the five-unit measurement, and see whether a failing gate changes behaviour.
