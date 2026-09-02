# Specification Quality Checklist: Figure Rendering

**Purpose**: Validate specification completeness and quality before planning
**Created**: 2026-08-30
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details beyond the artefact names the structure *is* (mirrors Spec 007/008 precedent — a content-infrastructure spec names file roles and gate conditions because the structure is the product)
- [x] Focused on reader value (figures render on the page) and author value (a repeatable skill)
- [x] Written for non-technical stakeholders where it matters (User Stories)
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain — the four owner decisions (HF MCP raster route; hybrid SVG-first; full SDD; render Unit 1 now) were settled before drafting
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable (KB budgets, Lighthouse ≥ 0.90, gate exit codes, zero-question skill run)
- [x] Success criteria are technology-agnostic where they can be (SC-001/004/006); asset formats named where they are the contract (SC-003)
- [x] All acceptance scenarios are defined
- [x] Edge cases identified (mixed marker/`<Figure>` state, oversize raster, URL-not-bytes from MCP, draft Urdu stub, alt drift)
- [x] Scope is clearly bounded (Out of Scope lists CDN/srcset/lightbox/MT/back-fill)
- [x] Dependencies and assumptions identified (owner configures HF MCP; the four Unit 1 figures are all SVG-authorable)

## Feature Readiness

- [x] Every FR has a matching acceptance scenario or success criterion
- [x] User scenarios cover the author flow, the reader outcome, and the gate
- [x] No constitution amendment required (Art. VII already names `check:figures`; Art. III.8 / V.5 satisfied, not changed) — recorded as an assumption for the plan's Constitution Check to confirm
- [x] The Spec 008 boundary is preserved: `author-unit` writes markers + `prompt-only`; `generate-figures` renders them
