---
id: 0003
title: Content pipeline unit spec terminology clarifications
stage: spec
date: 2026-08-24
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: 006-content-pipeline
user: channayousif@gmail.com
command: /sp.clarify
labels: ["content-pipeline", "clarify", "sdd"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-content-pipeline/spec.md
 - specs/006-content-pipeline/checklists/requirements.md
tests:
 - none (spec-refinement stage; no code or automated tests introduced)
---

## Prompt

(empty — `/sp.clarify` invoked again with no arguments, in a resumed session, running a fresh
ambiguity scan against `specs/006-content-pipeline/spec.md` as it stood after the prior
`/sp.clarify` pass)

## Response snapshot

Re-ran the prerequisite check and re-scanned the already-clarified spec (which had 7 prior
clarification bullets from the same-day `/sp.specify` + first `/sp.clarify` passes) against the
full ambiguity taxonomy. Most categories were already solid, but three gaps remained — all tied to
the FR-016 CI gate's actual implementability and to a previously-unnoticed missing artifact
location — and were resolved via three sequential clarification questions:

1. **Unit Spec file location** — User Story 2 and the Key Entities list referenced a "Unit Spec"
   (G1 output) with no FR ever defining where it lives. Confirmed: a per-unit subsection inside
   the course's single `content-spec.md`, not a separate file — consistent with the
   single-file-per-course pattern the rest of the pipeline already uses. Integrated into FR-002,
   the Unit Spec key entity, and User Story 2's opening description.

2. **Terminology-bank CI check granularity** — FR-016c required CI to check that a unit's Urdu
   "terms conform to terminology.csv," but a full-text scan of free-form Urdu prose against every
   bank entry isn't reliably automatable (inflected forms, synonyms). Confirmed: a structured
   comparison only — each unit declares a front-matter key-terms list (part of its Unit Spec
   subsection), and CI checks only those listed terms' UR translations against the bank. Integrated
   into FR-016c and the terminology-gap edge case, with an explicit note that unlisted terms stay a
   human-only concern at the UR review gate (Story 3).

3. **"Frozen v1" verification mechanism** — FR-017's Definition of Done required "the frozen style
   guide and terminology bank v1" with no way to check that state. Confirmed: a `version`
   front-matter field on `style-guide.md`, authoritative for both itself and the terminology bank
   as a pair (they freeze together); bumping it is required for any further edit. Integrated into
   FR-006/FR-007/FR-017 and the Style Guide key entity.

Each answer was appended as a new bullet under the existing `## Clarifications` → `### Session
2026-08-24` heading (same day as the spec's creation and the prior clarify pass — no new
subheading created, keeping to the "only `## Clarifications` / `### Session YYYY-MM-DD`" heading
rule) for a running total of 10 clarification bullets. Updated
`specs/006-content-pipeline/checklists/requirements.md`'s Notes to record all ten resolved items
and explicitly defer two remaining low-impact items (CI trigger path scope, content-author
access/roles) to `/sp.plan`. Verified via grep after each edit: no `[NEEDS CLARIFICATION]`
markers, no duplicate/stray headings, single Clarifications section.

## Outcome

- ✅ Impact: Closed a missing-artifact gap (Unit Spec had no defined home) and two feasibility gaps
  in the already-specified CI gate (terminology check and freeze-verification mechanism) that would
  have caused real rework during `/sp.plan` or `/sp.tasks` if left unresolved.
- 🧪 Tests: none — spec-refinement stage only.
- 📁 Files: `specs/006-content-pipeline/spec.md` (updated), `specs/006-content-pipeline/checklists/requirements.md` (updated).
- 🔁 Next prompts: `/sp.plan` for Spec 006.
- 🧠 Reflection: A second `/sp.clarify` pass on an already-clarified spec still found real gaps —
  specifically ones introduced by the first pass's own answers (the FR-016 CI gate created new
  surface area that hadn't existed in the original draft). Running the taxonomy scan again after
  a round of edits, rather than assuming "already clarified" means "fully clear," caught a
  legitimate missing Unit Spec location and two automation-feasibility issues.

## Evaluation notes (flywheel)

- Failure modes observed: initially added a `### Session 2026-08-24 (continued)` subheading to
  distinguish this pass, then caught that it violates the workflow's own validation rule (only
  `## Clarifications` and `### Session YYYY-MM-DD` are allowed new headings) and corrected it to
  append bullets under the existing same-day heading instead.
- Graders run and results (PASS/FAIL): spec quality checklist — PASS (all items); Clarifications
  structural validation (single `## Clarifications`, single `### Session 2026-08-24`, 10 bullets,
  no duplicates, no stray headings) — PASS after the self-correction above.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
