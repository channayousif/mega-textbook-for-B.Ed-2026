---
id: 0002
title: Content platform plan
stage: plan
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.plan
labels: [docusaurus, i18n, rtl-urdu, content-platform, planning]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/plan.md
 - specs/001-content-platform/research.md
 - specs/001-content-platform/data-model.md
 - specs/001-content-platform/contracts/unit-frontmatter.schema.json
 - specs/001-content-platform/contracts/course-overview.schema.json
 - specs/001-content-platform/contracts/category.schema.json
 - specs/001-content-platform/quickstart.md
 - CLAUDE.md
tests:
 - none (planning phase; test strategy defined in research.md R7)
---

## Prompt

/sp.plan

(No additional user input. Command executed the plan workflow for feature 001-content-platform: ran setup-plan.sh, loaded spec.md + constitution v1.1.0 + plan template, filled Technical Context and Constitution Check, produced Phase 0 research and Phase 1 design artifacts, and updated agent context.)

## Response snapshot

Generated the implementation plan for the Bilingual Content Platform:

- **plan.md**: Docusaurus v3 (TS) static site; i18n en(LTR)/ur(RTL); fixed five-file unit shape + course-overview under `docs/semester-{1..8}/<course-code>/`; Node front-matter validation gate; auto-generated sidebar + local search; A4 handout PDF build step. Constitution Check = PASS across Articles II, III, V, VI, VII (no violations; Complexity Tracking empty). Project structure: single static-site project rooted at repo root (content + platform co-located per Art. V.1).
- **research.md**: R1–R9 resolving all unknowns — framework, i18n/RTL, self-hosted Noto Nastaliq font, gray-matter+ajv validation, `@easyops-cn/docusaurus-search-local`, Playwright handout PDFs, test stack, catalog-driven 8-semester scaffold, GH Actions → Vercel deploy. Deferred (non-blocking) curriculum-owner decisions noted.
- **data-model.md**: Semester/Course/Course-overview/Unit/Resource/Handout entities as folder+front-matter; unit lifecycle state transitions; 7 structural validation rules incl. forbidden answer-key fields (FR-012).
- **contracts/**: JSON Schemas for unit front-matter (required vs shape-checked optional; answer-key fields forbidden via `not`), course-overview, and `_category_.json`.
- **quickstart.md**: 9-step scaffold/run/verify flow with an acceptance-criteria verification map (SC-001…SC-010).
- Ran update-agent-context.sh → CLAUDE.md updated with the stack.

No ADR suggested — all decisions were pre-locked in the Constitution/ROADMAP; no new architecturally significant, multi-option decision surfaced during planning.

## Outcome

- ✅ Impact: Feature 001 has a complete, constitution-compliant implementation plan with design artifacts and contracts, ready for /sp.tasks.
- 🧪 Tests: None run (planning); test strategy = Vitest (validator) + Playwright (RTL/print) + docusaurus build + Lighthouse (research.md R7).
- 📁 Files: 7 artifacts created/updated under specs/001-content-platform/ + CLAUDE.md.
- 🔁 Next prompts: /sp.tasks to generate the dependency-ordered task list; then scaffold Docusaurus baseline.
- 🧠 Reflection: SDD source + Constitution pre-locked the stack, so Phase 0 mostly documented rationale/alternatives rather than resolving open questions; no NEEDS CLARIFICATION remained.

## Evaluation notes (flywheel)

- Failure modes observed: none — spec and constitution were internally consistent.
- Graders run and results (PASS/FAIL): Constitution Check PASS (pre- and post-design).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): confirm Docusaurus v3 i18n/search config against current docs via Context7 before scaffolding.
