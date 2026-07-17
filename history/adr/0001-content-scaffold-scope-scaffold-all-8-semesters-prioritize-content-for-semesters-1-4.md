# ADR-0001: Content Scaffold Scope — Scaffold All 8 Semesters, Prioritize Content for Semesters 1–4

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-07-17
- **Feature:** SDD platform foundation (Constitution + Specs 001/003/006 + ROADMAP)
- **Context:** The complete course guides for all 8 semesters (132 CH) are now available under `Scheme-and-Course-guides/` — previously only a few Semester I guides existed and the SDD framed delivery as a "Semester I, 6-course pilot." With the full catalog known, we had to choose how much of the 8-semester structure to commit to up front versus how much to defer, balancing the constitutional "build once, scale by semester" principle (Art. VI) and the low-bandwidth/free-tier constraints (Art. V) against the curriculum owner's directive to prioritize Semesters 1–4 for the new 2026 scheme. This decision shapes the content folder model, the DB seed, sidebar generation, CI front-matter validation, and the authoring-pipeline cadence — so it is cross-cutting rather than an isolated content choice.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? — YES: fixes the folder/seed/validation model for the life of the project.
     2) Alternatives: Multiple viable options considered with tradeoffs? — YES: Sem-1-only pilot vs full-8 scaffold vs full-8 content now.
     3) Scope: Cross-cutting concern (not an isolated detail)? — YES: spans Docusaurus structure, Supabase seed, CI, and the pipeline. -->

## Decision

Adopt a **"scaffold-wide, author-deep-by-priority"** content strategy:

- **Structure (all 8 semesters, now):** scaffold `docs/semester-{1..8}/<course-code>/` folders + per-course `course-overview.mdx` + per-unit metadata for the entire 132-CH catalog, generated from the board scheme and each guide's unit list. The Docusaurus sidebar, `units` DB seed (Spec 003), and CI front-matter validation (Spec 001 F3) all target the full catalog.
- **Content (Semesters 1–4 first):** drive full-pipeline authoring (Spec 006 G0–G7, EN+UR, review gates) in priority order Sem 1 → 2 → 3 → 4, then Semesters 5–8. The golden unit remains EFMP-301 U1.
- **Unit file model (fixed):** the five per-unit files (`index`, `activities`, `formative`, `summative`, `teacher-notes`) are frozen; course-guide sections (teaching strategies, suggested practical activities, reading materials, practical work, assessment criteria) **fold into** them plus the course-overview page — no new per-unit file types.
- **Assessment default:** 60% summative / 40% formative for the affiliated GECEs, encoded in front-matter `assessment_weighting`.

## Consequences

### Positive

- **Structure stabilizes once.** Adding or authoring any course later is content-only (new folders/front-matter), never a code or schema change — satisfies Constitution Art. V.4 ("one course = one content module").
- **DB/book never drift on scope.** The `units` seed and unit-sync (Spec 003) cover the whole catalog from day one, so classes/assignments can reference any course as guides mature.
- **Clear delivery focus.** Content effort concentrates on Sems 1–4 (the owner's priority and the 2026-scheme entry cohort) without hiding the eventual full scope from navigation or planning.
- **Discrepancies surface early.** Scaffolding the full catalog forced a board-vs-guide reconciliation, captured in `specs/gaps.md` (G-2026-02..05).

### Negative

- **Empty-shell risk.** Sems 5–8 folders exist with little/no content; the sidebar must clearly mark "coming soon" states or students hit dead ends. Requires an empty-state convention.
- **Metadata debt.** Placeholder front-matter across ~50+ courses must stay valid as CI evolves; a schema change touches many files at once.
- **Upfront scaffolding cost** before any Sem 5–8 payoff, and ongoing temptation to author out of priority order.

## Alternatives Considered

- **A. Semester-I-only pilot (the prior plan).** Scaffold + content just the 6 Sem I courses; add later semesters when reached. *Rejected:* understates now-known scope, risks repeated structural churn (sidebar, seed, validation) each time a semester is added, and provides no catalog-wide navigation for planning.
- **B. Scaffold + author all 8 semesters immediately.** Full breadth and depth at once. *Rejected:* violates the sustainable-cadence and quality-gate discipline (Art. VI/VII), spreads review capacity too thin, and delays the owner-prioritized Sems 1–4.
- **C. Add dedicated per-unit files for each guide section** (e.g., `reading-materials.mdx`, `practical-work.mdx`) instead of folding. *Rejected:* multiplies the document count (already ~3,000+), complicates the template and CI, and most guide sections are course-wide, not per-unit — better served by the course-overview page.

## References

- Feature Spec: `SDD/001-content-platform.md`, `SDD/003-classes-assignments.md`, `SDD/006-content-pipeline.md`
- Implementation Plan: `/home/a2ahs/.claude/plans/revise-the-sdd-constitution-md-and-wild-flask.md`; Constitution `SDD/constitution.md` (v1.1, Art. VI); `SDD/ROADMAP.md` (Course Catalog appendix)
- Related ADRs: none (first ADR)
- Evaluator Evidence: `history/prompts/general/0002-revise-sdd-for-8-semester-guides.general.prompt.md`; discrepancy log `specs/gaps.md`
