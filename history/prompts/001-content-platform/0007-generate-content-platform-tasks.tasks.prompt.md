---
id: 0007
title: Generate content platform tasks
stage: tasks
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.tasks
labels: ["tasks", "docusaurus", "i18n", "glossary", "user-stories"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/tasks.md
tests:
 - none (task list only; test tasks defined for implementation)
---

## Prompt

/sp.tasks — generate the dependency-ordered task list (ensure a task covers glossary.json + <Glossary> + the validator's glossary-reference check).

## Response snapshot

Ran check-prerequisites.sh (AVAILABLE_DOCS: research, data-model, contracts/, quickstart) and read the tasks template. Generated `tasks.md` with **41 tasks** organized by the four user stories, following the strict checklist format (checkbox + ID + [P]? + [Story]? + file path).

Structure:
- Phase 1 Setup (T001–T005): Docusaurus TS scaffold, deps, scripts, self-hosted Nastaliq font.
- Phase 2 Foundational (T006–T011): i18n/RTL config, base CSS+font, repo `contracts/` schemas, **base validator** (schema + five-file + forbidden answer-key + path agreement), MDX component shells, base CI.
- Phase 3 US1 (P1, MVP) T012–T021: bilingual read/RTL/toggle, TranslationStatusBadge (draft + untranslated fallback), **Glossary component + glossary.json + validator glossary-ref check**, EN↔UR parity check, golden unit EN+UR.
- Phase 4 US2 (P1) T022–T026: Semester→Course→Unit nav + active trail, bilingual local search, coming_soon render + search-index exclusion.
- Phase 5 US3 (P2) T027–T031: five sections + course overview, PrintHandout (`window.print()`), A4 print stylesheet, no-answer-keys verification.
- Phase 6 US4 (P3) T032–T036: catalog/courses.json, scaffold-catalog.mjs, materialize 8 semesters, missing-metadata + add-course-zero-diff guarantees.
- Phase 7 Polish T037–T041: Lighthouse budget, a11y sweep, deployment, golden-unit gate freeze, quickstart acceptance run.

Tests included (Constitution Art. VII engineering gate + SC-007 "100%" require automation): Vitest for validator fixtures, Playwright for render/RTL/print/nav/search.

**User's explicit request satisfied**: glossary is covered by T014 (validator-ref test), T017 (component + glossary.json), T018 (validator glossary-reference check) — called out in the tasks.md Notes.

## Outcome

- ✅ Impact: Feature 001 has an executable, dependency-ordered, per-story task list ready for /sp.implement.
- 🧪 Tests: defined as tasks (not yet run) — Vitest + Playwright mapped to acceptance criteria.
- 📁 Files: specs/001-content-platform/tasks.md.
- 🔁 Next prompts: /sp.implement (start with Phase 1→2→US1 MVP); optionally /sp.analyze for cross-artifact consistency, or /sp.adr for the grouped plan decisions.
- 🧠 Reflection: Kept validator-extension tasks (T016/T018/T026) sequential since they edit one shared file; US1 authors its own golden unit so the MVP doesn't block on the full catalog scaffold (US4).

## Evaluation notes (flywheel)

- Failure modes observed: none; risk carried forward is Urdu search tokenization (T025) — spike before locking the search library.
- Graders run and results (PASS/FAIL): N/A (no code executed).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): during /sp.implement, complete Foundational then validate US1 end-to-end on a 360px viewport before starting US2.
