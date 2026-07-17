---
id: 0004
title: Clarify content platform spec
stage: misc
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarify", "i18n", "validation", "handout-pdf"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/spec.md
tests:
 - none (spec-only change)
---

## Prompt

/sp.clarify (no additional user input)

Detect and reduce ambiguity in the active feature spec (specs/001-content-platform/spec.md), asking up to 5 targeted clarification questions (max) one at a time, and encode each accepted answer back into the spec's `## Clarifications` section plus the most relevant Requirements/Scenarios/Entities.

## Response snapshot

Ran check-prerequisites.sh; loaded spec.md; performed structured ambiguity scan. Spec was already thorough with a prior clarification session (4 Q&As). Identified 3 genuinely high-impact, non-plan-level behavioral gaps and asked them sequentially:

- Q1 — `ur` route behavior when NO Urdu file exists (distinct from prior draft-status case) → **A**: Fall back to English content (default-locale fallback) with a prominent "Urdu translation not yet available" banner; no dead route; English never presented as Urdu.
- Q2 — EN↔UR structural parity: build-enforced or editorial? → **C**: Fully build-enforced — build fails when a `translation_status: reviewed` unit's EN and UR versions diverge in section-file presence or heading structure/section counts (draft/untranslated exempt).
- Q3 — How the A4 handout is produced/delivered → **A**: Print-stylesheet approach — per-page "Print / Save as PDF" control opens the browser print dialog against an A4 `@media print` stylesheet; no server-side/build-time PDF pipeline and no committed `.pdf` artifacts.

Integrated each answer: added 3 bullets to `### Session 2026-07-17`; updated FR-001 (parity gate), FR-003 (missing-Urdu fallback), FR-011 (print-stylesheet delivery); added US1 acceptance scenario 4 (parity build-fail); revised US3 acceptance scenario 2, SC-009, the Edge Case on missing/draft Urdu, and the Handout entity. Saved after each integration.

## Outcome

- ✅ Impact: Resolved 3 high-impact behavioral ambiguities (i18n fallback, translation parity validation, handout delivery mechanism) that materially shape the i18n config, the validation pipeline, and task decomposition ahead of /sp.plan.
- 🧪 Tests: none (spec-only change); new acceptance criteria are testable at build/review time.
- 📁 Files: specs/001-content-platform/spec.md.
- 🔁 Next prompts: /sp.plan for this feature.
- 🧠 Reflection: Spec was already well-clarified; stopped at 3 questions rather than padding to the 5 cap. Deferred the bilingual-search-engine choice (Urdu tokenization risk) as a plan-level tech decision.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): During /sp.plan, evaluate whether the chosen local search library (`@docusaurus/theme-search-local` vs `docusaurus-lunr-search`) actually tokenizes Urdu well enough to meet FR-006/SC-004.
