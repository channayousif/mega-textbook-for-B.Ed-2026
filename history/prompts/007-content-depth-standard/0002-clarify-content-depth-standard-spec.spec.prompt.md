---
id: 0002
title: Clarify content depth standard spec
stage: spec
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.clarify
labels: [content-pipeline, depth-standard, clarify, spec]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/007-content-depth-standard/spec.md
 - specs/007-content-depth-standard/checklists/requirements.md
 - history/prompts/007-content-depth-standard/0002-clarify-content-depth-standard-spec.spec.prompt.md
tests:
 - none (specification clarification only; no code changed)
---

## Prompt

/sp.clarify (no additional argument text)

Interactive clarification loop over `specs/007-content-depth-standard/spec.md`. Four questions
asked and answered:

1. Q: Where do the per-unit coverage matrix and sources-consulted list live?
   User answer: A — committed files under `specs/content/<course-code>/coverage/unit-NN.md`
   and `specs/content/<course-code>/sources/unit-NN.md`, outside `docs/`, discovered by the
   depth gate walking `specs/content/`.
2. Q: Does the authoring skill retrieve sources from the web?
   User answer: A — yes; skill uses web search/fetch to locate and verify open-access sources
   (exact URL/DOI recorded), degrades gracefully to author-provided material + FR-004
   escalation when retrieval unavailable; never invents a citation.
3. Q: Is the per-unit depth budget enforced by the gate or advisory?
   User answer: A — advisory; gate enforces only enumerated-checklist concept coverage, not
   the budget's concept count. The budget's target reading-minutes range IS used as the
   expected band for the FR-012(d) `est_reading_minutes` check.
4. Q: What authoritative list is the coverage matrix checked against, and at what granularity?
   User answer: "yes" (accepted recommendation) = A — the content-spec unit subsection
   enumerates the guide sub-topics as an explicit checklist at leaf-bullet granularity; the
   gate does a structured comparison of `coverage/unit-NN.md` against that declared list
   (Spec 006 FR-016c pattern), never a parse of raw guide text; fidelity of the list to the
   source guide is the curriculum owner's job at the human Content gate.

## Response snapshot

Ambiguity scan: most taxonomy categories already Clear (spec was written detailed, with a
prior planning-session clarifications block). Four Partial/Missing points selected by
Impact×Uncertainty; all four resolved.

Spec edits applied incrementally and saved after each:
- Added `### Session 2026-08-27 (/sp.clarify)` under `## Clarifications` with the four Q/A
  bullets.
- Q1 → FR-002, FR-003 (added the two file paths), Key Entities (Unit Coverage Matrix,
  Sources-Consulted List), Assumptions (governance-not-docs location).
- Q2 → FR-011 (skill uses web search/fetch to locate+verify open-access sources, exact
  URL/DOI, graceful degradation).
- Q3 → FR-009 (depth budget is authoring guidance, concept count not gated), FR-012(d)
  (`est_reading_minutes` checked against the depth-budget range, not a computed figure),
  Assumptions (reading-minutes band = the budget's range).
- Q4 → new FR-009a (per-unit enumerated guide-sub-topic checklist is the authoritative graded
  list), FR-001 / FR-002 / FR-012(a) reworded to reference the checklist, Key Entities
  (Expanded Course Content-Spec now lists the checklist; Unit Coverage Matrix graded against
  it), SC-001 / SC-008 updated.
- Normalized body shorthand `coverage.md` → "coverage matrix" in user stories and edge cases;
  left the earlier planning-session bullets' wording intact as historical record.
- Updated `checklists/requirements.md` Notes to record the clarify pass.

Validation: `## Clarifications` has exactly 4 new bullets, no duplicates; 4 asked (≤5); only
allowed new headings added; canonical terms consistent across edited sections; no contradictory
leftover text.

## Outcome

- ✅ Impact: Spec 007 de-risked on the four points that most shape `/sp.plan` — the depth-gate
  script now has a defined discovery path, a defined authoritative list to compare against,
  and a defined reading-minutes band; the skill has a defined source-retrieval behavior.
- 🧪 Tests: none — spec only.
- 📁 Files: `specs/007-content-depth-standard/spec.md` (Clarifications + FR-001/002/003/009/
  009a/011/012 + Key Entities + SC-001/008 + Assumptions), `checklists/requirements.md`, this
  PHR.
- 🔁 Next prompts: `/sp.plan` — design `check-unit-depth.mjs` (walks `specs/content/`, parses
  the content-spec enumerated checklist vs `coverage/unit-NN.md`, checks required blocks /
  formative ≥5 / reading-minutes band / matrix↔sources consistency), the
  `.claude/skills/author-unit/` layout, the `content-spec` schema diff (adds enumerated
  checklist + depth budget + course description + reading list + week schedule + standards
  anchors), the CI wiring, and the EFMP-302 Unit 1 re-draft sequence.
- 🧠 Reflection: Q4 was the highest-value clarification — without a declared checklist the
  gate would have needed a fragile parser for OCR-quality guide text; anchoring on the
  content-spec enumeration reuses Spec 006's FR-016c "structured comparison, not prose scan"
  precedent.

## Evaluation notes (flywheel)

- Failure modes observed: n/a (clarification).
- Graders run and results (PASS/FAIL): Clarifications structure check — PASS (4 bullets, ≤5
  asked, headings valid, terminology consistent).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.plan`, decide the concrete file format of
  the enumerated checklist and `coverage/unit-NN.md` (Markdown table rows keyed by a stable
  sub-topic id vs free-text bullets) — a stable id makes the structured comparison exact and
  the failure message precise.
