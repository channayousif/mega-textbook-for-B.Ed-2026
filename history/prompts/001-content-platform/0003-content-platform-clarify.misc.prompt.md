---
id: 0003
title: Content platform clarify
stage: misc
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.clarify
labels: [clarification, spec, traceability, urdu, search, handouts]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/spec.md
 - specs/001-content-platform/data-model.md
 - specs/001-content-platform/research.md
 - specs/001-content-platform/contracts/unit-frontmatter.schema.json
tests:
 - none (clarification phase)
---

## Prompt

/sp.clarify

(No additional user input. Ran the clarification workflow: scanned spec.md for ambiguity across the taxonomy, asked high-impact questions, and integrated answers back into the spec + already-generated plan artifacts.)

## Response snapshot

Asked 4 high-impact questions (+1 disambiguation), all answered:

1. **`clo_refs` format** → SLO-format identifiers `SLO:<course-code>-<unit-no>-<n>` (e.g. `SLO:EFMP-301-1-2`). Field key stays `clo_refs` per Constitution II.2; flagged an open terminology note (possible future Constitution PATCH to rename `slo_refs`).
2. **Draft Urdu display** → render the Urdu draft with a visible "draft translation" badge at top. Disambiguation: the reader-submitted translation-quality rating (badge + auto-flag-for-review) the owner described requires a backend → **deferred to Spec 005**; 001 ships only the editorial `translation_status` draft badge.
3. **"Coming soon" units** → visible in sidebar marked "coming soon", excluded from the search index.
4. **Handout scope** → generate A4 PDFs from `activities.mdx`, `formative.mdx`, and `summative.mdx` (all public framing).

Integrated into spec.md: new `## Clarifications` → `### Session 2026-07-17` (4 bullets + terminology note); updated FR-003, FR-006, FR-009, FR-011, the Unit entity, Dependencies, and Out of Scope. Propagated to prevent spec drift: unit-frontmatter.schema.json (SLO `clo_refs` pattern), data-model.md (SLO format, handout sources, coming-soon search exclusion), research.md R5/R6.

## Outcome

- ✅ Impact: 4 material ambiguities resolved and encoded; spec + plan artifacts consistent; one scope item (reader translation ratings) correctly pushed to Spec 005.
- 🧪 Tests: none (clarification phase).
- 📁 Files: spec.md + 3 plan artifacts updated.
- 🔁 Next prompts: /sp.tasks (plan is already done); /sp.plan re-run unnecessary since artifacts were updated in place.
- 🧠 Reflection: One answer (reader rating) implied a backend feature conflicting with the static/anonymous scope — the disambiguation question kept 001 in-scope and routed the feature to 005.

## Evaluation notes (flywheel)

- Failure modes observed: none; user's translation-rating request surfaced a scope boundary that the disambiguation resolved cleanly.
- Graders run and results (PASS/FAIL): spec structure valid; ≤5 questions; no lingering contradictions.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): confirm with curriculum owner whether the traceability field should be renamed `slo_refs` (Constitution PATCH) before authoring begins.
