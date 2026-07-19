# ADR-0004: Content Integrity Build Gate and Data-Driven Catalog

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-07-17
- **Feature:** 001-content-platform
- **Context:** A "mega textbook" of 3,000+ documents across 40+ courses, authored incrementally by multiple people in two languages, cannot rely on editorial vigilance alone to stay correct. The Constitution requires SLO/CLO traceability (Art. II), Urdu parity (III.2), a 60/40 GECE assessment split (III.7), no answer keys in public content (V.2), and that adding a course be content-only (V.4); the spec requires missing metadata to be "rejected 100% of the time" (SC-007). How correctness is *mechanically enforced at build time*, and how the catalog is *generated* so growth stays content-only, are one coupled concern: the validator and the scaffold generator share the same schemas and the same "content is data, not code" philosophy, and would change together.

<!-- Significance checklist (ALL must be true)
     1) Impact: YES — defines the publish gate and the growth mechanism for the life of the content.
     2) Alternatives: YES — editorial-only, remark-lint, Zod, hand-created folders, full prose diffing.
     3) Scope: YES — spans front-matter contracts, CI, the generator, and every content file. -->

## Decision

Enforce content correctness with a **build-time validation gate**, and drive catalog growth from a **machine-readable catalog + generator**:

- **Contracts:** JSON-Schema files (`contracts/*.schema.json`) for unit front-matter, course-overview, category, and glossary — required-vs-optional made explicit; contracts double as published artifacts.
- **Validator (`scripts/validate-content.mjs`, `gray-matter` + `ajv`):** walks `docs/**` + `i18n/ur/**` and blocks the build (non-zero, per-file message) on: missing required front-matter (SLO `clo_refs`, Bloom summary, reading estimate, translation status); the fixed five-file unit shape; forbidden answer-key fields; front-matter↔folder-path agreement; **build-enforced EN↔UR structural (heading-vector) parity** for `reviewed` units; **glossary-reference resolution** (`<Glossary term>` → bilingual entry); and the **assessment_weighting sum-to-100** cross-field rule. A companion `check-no-answer-keys.mjs` scans sources + built output; `check-add-course.mjs` asserts adding a course changes no `src/`/config file.
- **Data-driven catalog:** `catalog/courses.json` (8 semesters, per-course code/title/credit-hours/category/priority) + `scripts/scaffold-catalog.mjs` generate the folder tree, `_category_.json`, course-overview stubs, and `coming_soon` placeholder units (with `noindex` so they stay in the sidebar but out of search). Idempotent — never overwrites authored content.
- **CI:** all checks run before `docusaurus build`; unit-level checks are covered by Vitest fixtures; parity/glossary/weighting/no-answer-keys are each proven to *fail* on bad input.

## Consequences

### Positive

- **100% metadata rejection guarantee** (SC-007) and no silent content drift; the gate is the enforcement point for several constitutional articles at once.
- **Language-agnostic parity** — comparing heading vectors avoids false positives from legitimate translation differences while catching untranslated/half-translated `reviewed` units.
- **One-entry course additions** — a new course is a `courses.json` entry + re-run; the generator keeps 40+ courses consistent (Constitution V.4, SC-006).
- **Contracts are documentation** — the schemas are the single source of truth for authors and CI alike.

### Negative

- **Custom cross-field checks live outside the schema** (weighting sum, parity, glossary refs, path agreement) — more bespoke code than pure schema validation, and the validator is a shared file that grows.
- **Heading-vector parity won't catch prose divergence** (only structure); deep meaning parity still needs human review (delegated per ADR-0003 / Constitution VII).
- **A schema change touches many files at once** across the scaffolded catalog (metadata debt, shared with ADR-0001).

## Alternatives Considered

- **A. Editorial-only review (no automation).** *Rejected:* cannot meet SC-007's "100% of the time"; doesn't scale to 3,000+ docs / two languages.
- **B. Docusaurus front-matter schema plugins / remark-lint only.** *Rejected:* limited cross-field and custom rules (sum-to-100, EN↔UR parity, glossary refs), and couples validation to build internals rather than a standalone CI step.
- **C. Zod (code-first) instead of ajv/JSON-Schema.** *Rejected (close call):* fine at runtime, but JSON Schema doubles as the published, language-neutral contract artifact.
- **D. Hand-create course folders; encode the catalog only in the board DOCX.** *Rejected:* error-prone, drift-prone, and not machine-consumable at build time.
- **E. Full prose/paragraph diffing for parity.** *Rejected:* brittle, fights idiom and sentence-splitting, produces false positives.

## References

- Feature Spec: `specs/001-content-platform/spec.md` (FR-005/FR-009/FR-010/FR-012/FR-016; SC-006/SC-007/SC-010)
- Implementation Plan: `specs/001-content-platform/plan.md`; Research `specs/001-content-platform/research.md` (R4 metadata gate, R8 scaffold); Data model `specs/001-content-platform/data-model.md`; Contracts `specs/001-content-platform/contracts/`
- Related ADRs: ADR-0001 (scaffold scope + unit-file model); ADR-0002 (platform); ADR-0003 (rendering — parity is enforced here, states rendered there)
- Evaluator Evidence: PHRs `0007` (tasks), `0009`/`0011` (remediation/implement), `0014` (CI green); Vitest fixtures `tests/unit/*.test.mjs`
