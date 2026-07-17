---
id: 0006
title: Clarify glossary scope and form
stage: misc
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarify", "glossary", "i18n", "spec-plan-sync"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/spec.md
 - specs/001-content-platform/data-model.md
 - specs/001-content-platform/plan.md
 - specs/001-content-platform/quickstart.md
 - specs/001-content-platform/research.md
 - specs/001-content-platform/contracts/glossary.schema.json
tests:
 - none (spec/plan artifacts only)
---

## Prompt

/sp.clarify (no additional user input) — second clarify pass, run after /sp.plan.

Re-scan the (already heavily clarified) feature spec for remaining high-impact ambiguity and encode answers back into the spec.

## Response snapshot

Ran check-prerequisites.sh; re-scanned the spec (7 prior clarifications, plan already produced). Most categories Clear/Resolved. Identified one genuine high-impact functional gap: the **bilingual glossary** — required by Constitution III.1 and mentioned in Assumptions, but with no FR, entity, or defined form (only a `<Glossary>` component named in the plan).

Asked 1 question → **A**: In scope as an **inline `<Glossary term="...">` MDX component** backed by a `glossary.json` data file of `{term, definition_en, definition_ur}` entries; no separate glossary page; adding a term is a data-only change.

Integrated into spec: Clarifications bullet, new **FR-016**, new **Glossary term** Key Entity. To prevent spec↔plan drift (Constitution IV.4 — plan was produced earlier this same session), also propagated the decision to the plan artifacts: new **Glossary term** entity + validation rules in data-model.md, new **contracts/glossary.schema.json**, structure-tree + validator + Constitution-Check updates in plan.md, component/validation note in quickstart.md, and the resolved-unknowns row in research.md.

Deferred (plan-level, not asked): search-engine Urdu tokenization choice (R5 verify-at-build), reading-estimate derivation, analytics/observability, content licensing.

## Outcome

- ✅ Impact: Closed the last high-impact functional ambiguity (glossary); spec + all plan artifacts consistent and ready for /sp.tasks.
- 🧪 Tests: none (spec/plan only); glossary now has a testable validation rule (missing `<Glossary term>` key or missing EN/UR fails the build).
- 📁 Files: spec.md, data-model.md, plan.md, quickstart.md, research.md, contracts/glossary.schema.json.
- 🔁 Next prompts: /sp.tasks; optionally /sp.adr for the grouped plan decisions.
- 🧠 Reflection: One question was enough — resisted padding to the 5-cap. Chose to sync plan artifacts immediately rather than leave known drift.

## Evaluation notes (flywheel)

- Failure modes observed: a constitutionally-required feature (glossary) had slipped through spec as an Assumption only, with no FR/entity — surfaced by cross-checking Constitution III.1 against the FR list.
- Graders run and results (PASS/FAIL): N/A (no code).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): during /sp.tasks, ensure a dedicated task covers `glossary.json` + `<Glossary>` + the validator's glossary-ref check.
