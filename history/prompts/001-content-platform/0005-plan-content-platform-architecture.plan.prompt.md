---
id: 0005
title: Plan content platform architecture
stage: plan
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.plan
labels: ["plan", "docusaurus", "i18n", "validation", "handout", "constitution-check"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/plan.md
 - specs/001-content-platform/research.md
 - specs/001-content-platform/data-model.md
 - specs/001-content-platform/quickstart.md
 - CLAUDE.md
tests:
 - none (planning artifacts only)
---

## Prompt

/sp.plan (no additional user input)

Execute the implementation planning workflow: run setup-plan.sh, load spec.md + constitution.md, fill Technical Context, run the Constitution Check gate, produce Phase 0 (research.md) and Phase 1 (data-model.md, contracts/, quickstart.md) artifacts, update the agent context file, re-check the Constitution post-design, and report.

## Response snapshot

Ran setup-plan.sh (copied plan template). Found prior Phase 0/1 artifacts (research.md, data-model.md, quickstart.md, contracts/) from an earlier run that were **stale against the 3 new clarifications** just added in the /sp.clarify session. Reconciled them:

- **research.md**: rewrote R6 from a build-time Playwright→`static/handouts/*.pdf` pipeline to a **client-side print-stylesheet** approach (Q3); added a **missing-Urdu fallback** decision to R2 (EN body under `/ur/` + "untranslated" banner, Q1); added the **EN↔UR structural parity gate** (heading-vector comparison for `reviewed` units) to R4 (Q2); updated the resolved-unknowns table.
- **data-model.md**: rewrote the Handout entity (no stored PDF; `<PrintHandout/>` + `@media print`), strengthened validation rule 6 to the build-enforced parity gate, and expanded the Unit per-language state list (no-UR-file, draft, reviewed).
- **quickstart.md**: fallback note in i18n step, `<DownloadHandout>`→`<PrintHandout>`, replaced the generate-handouts PDF step with a print-CSS step, and added FR-001/FR-003 rows to the acceptance map.
- **plan.md**: wrote full plan — Summary, Technical Context (Docusaurus v3 TS static site, `@easyops-cn/docusaurus-search-local`, `gray-matter`+`ajv`, Playwright, no DB), a Constitution Check table (v1.1.0) returning **PASS with zero violations** (empty Complexity Tracking), and a concrete single-project source tree.
- Ran update-agent-context.sh (claude); removed the resulting stale duplicate "Active Technologies" line in CLAUDE.md (old search-plugin + PDF-pipeline wording) and refreshed Recent Changes.

Constitution re-check post-design: unchanged — PASS. Contracts (`unit-frontmatter`, `course-overview`, `category` schemas) already consistent; no change needed.

## Outcome

- ✅ Impact: Feature 001 now has an internally consistent plan + Phase 0/1 artifacts aligned with the clarified spec; ready for /sp.tasks.
- 🧪 Tests: none (planning only); verification strategy captured in quickstart acceptance map (Vitest + Playwright + build + Lighthouse).
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md, CLAUDE.md.
- 🔁 Next prompts: /sp.tasks to generate the dependency-ordered task list; optionally /sp.adr for the significant plan decisions.
- 🧠 Reflection: The prior artifacts predated the clarify session; the main work was reconciliation, not greenfield. Kept the search-library Urdu-tokenization risk (R5) flagged as a verify-at-build item.

## Evaluation notes (flywheel)

- Failure modes observed: stale pre-clarification artifacts silently contradicting the updated spec — caught by reading each before writing.
- Graders run and results (PASS/FAIL): Constitution Check gate = PASS (0 violations).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): during implementation, spike `@easyops-cn/docusaurus-search-local` Urdu tokenization against SC-004 before committing the search choice.
