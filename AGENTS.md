# Repository guidance

## Read first

- Read `CLAUDE.md` for the existing project workflow and prompt-history requirements.
- Read `.specify/memory/constitution.md` before making changes. It is the authoritative project constitution; older technology and policy summaries may be stale.
- Consult the relevant `specs/<feature>/spec.md`, `plan.md`, and `tasks.md`, plus applicable decisions in `history/adr/`.
- Keep changes focused on the requested task. Never commit secrets or expose `.env.local` values.

## Project map

B.Ed textbook and learning platform: Docusaurus 3, React 18, TypeScript 5.6, self-hosted Supabase. Node.js 22+; npm.

Two content tracks (Feature 015):
- `docs/` — B.Ed degree corpus, grouped by `semester-NN/course-code/unit-NN/`
- `licence/` — teaching-licence corpus, flat `course-code/unit-NN/` (no semesters)

Shared structure:
- `src/`: pages, components, theme overrides, libs
- `i18n/ur/`: Urdu translations (Docusaurus plugin dirs, named by plugin id)
- `catalog/`, `contracts/`: course metadata and content schemas
- `specs/content/`: style guide (v4.4, frozen), terminology.csv (frozen pair), per-course specs/trackers/coverage/sources/figures/concepts
- `static/img/figures/<course>/unit-NN/`: published figure assets (`.svg`, `.ur.svg`, `.webp`)
- `scripts/`: validation, generation, review tooling (`scripts/lib/gates.mjs` is the gate authority)
- `supabase/`: backend config and migrations
- `tests/`: unit, browser, rls, review

## Development and validation

Env loading: `.env.local` supplies `DOCUSAURUS_SUPABASE_URL`, `DOCUSAURUS_SUPABASE_ANON_KEY`; RLS tests additionally need `SUPABASE_SERVICE_ROLE_KEY`.

Commands:
- `npm start` / `npm run build` — run prestart hooks (`build-content-index`, `report-content-status`) automatically
- `npm test` — vitest unit tests (`npm test -- <file>` for a focused run)
- `npm run test:rls` — RLS tests; needs live Supabase + service-role key; config refuses to run unconfigured (no silent skip)
- `npm run test:e2e` — Playwright; needs build + browsers
- `npm run test:review` — review-evidence tests
- `npm run check:content` — fast content gates (skill fix loops)
- `npm run check:all` — full gate suite (CI superset)

Gate authority is `scripts/lib/gates.mjs` (`CONTENT_GATES` vs `FULL_GATES`). `check-docs-sync` asserts the CI workflow step list matches `FULL_GATES` both ways — a gate added here but forgotten in CI fails the build.

CI runs against a live shared Supabase instance with concurrency serialization (`shared-supabase` group, `queue: max`). Running `test:rls` locally while CI is in flight races on shared fixture rows.

## Content work

Read `specs/content/style-guide.md` and the course's content spec and tracker before editing units. Authoring/review/revision skills live in `.claude/skills/`.

Unit structure (Spec 008 per-topic standard): `unit-NN/index.mdx`, `topic-NN.mdx`, `unit-assessment.mdx` (+ optional `unit-teacher-notes.mdx`); optional course-level `course-review.mdx`. Legacy five-file units are exempt from per-topic rules.

Content in Git; quiz banks/answer keys stay backend-only (RLS-protected, `verified_teacher`-gated). Answer keys are forbidden everywhere except the bounded final `## Answers and marking guidance` section of an assessment page. Assessment banks: 10 MC + 10 restricted-response + 5 extended-response per unit.

Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in authored content — `check:no-em-dash`. En dash (U+2013) is permitted for numeric ranges.

Figure lifecycle: `prompt-only → generated → placed`. `Kind` archetypes: table, concept-map, flowchart, timeline, diagram, illustration. Manifest at `specs/content/<course>/figures/unit-NN.md`. Visual density: ≥2 figures per topic, ≥1 concept-map/flowchart/timeline per unit.

English-first publication is permitted with the required untranslated banner; Urdu parity is a corpus-completion requirement (not a per-unit gate). G3/G5 reviews require independent reviewers — see `CLAUDE.md` and ADR-0019. Do not self-certify or fabricate human initials.

## Work records

Record user requests via `.specify/templates/phr-template.prompt.md` (routing in `CLAUDE.md`). Suggest significant architectural decisions for an ADR; do not create an ADR without authorization.

## Visuals

ADR-0024 governs the Claude/Codex boundary. Claude owns prose, figure briefs, alt text, SVG schematics, and `prompt-only` manifest rows. Codex owns raster generation, WebP optimization, placement, and raster manifest transitions. Don't silently rewrite authored inputs during raster production.
