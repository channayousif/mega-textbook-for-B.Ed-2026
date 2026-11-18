# ADR-0028: Platform expansion beyond B.Ed and teaching licence

- **Status:** Accepted by owner instruction on 2026-11-08 (drafted 2026-10-02). Acceptance
  commits the direction; it does not amend the constitution. No grade 9-12 content is
  published until Articles I and II are amended as point 1 of the Decision requires.
- **Date:** 2026-10-02 (accepted 2026-11-08)
- **Scope:** Platform scope, audience, and content-track architecture.
- **Constitution:** Article I (Purpose) and Article II (Guiding Document Supremacy) require
  amendment before this expansion is ratified.

## Context

The platform was purpose-built for the B.Ed (4-Year) programme at the University of Sindh,
Faculty of Education, Elsa Kazi Campus, Hyderabad, with a secondary teaching-licence track
(Feature 015). The constitution's Article I defines the purpose narrowly: a bilingual textbook
and learning platform for B.Ed students and teachers, with content authority derived from the
university's Scheme of Study and HEC curriculum.

The owner has decided to expand the platform's scope to serve a more diverse audience from
grade 9 to 12 (secondary and higher-secondary). This is not a minor addition - it changes who
the platform serves, what content authority governs new tracks, and how the content tree is
organised.

## Decision

**The platform expands beyond B.Ed and teaching licence to serve grades 9-12.**

This expansion requires:

1. **Constitution amendment (MAJOR):** Article I's purpose clause must be broadened to
   encompass secondary and higher-secondary education, not solely B.Ed. Article II's guiding
   document supremacy must recognise new curriculum authorities (e.g. BISE boards, HEC
   secondary-school curricula) alongside the existing university Scheme of Study.
2. **New content track:** A third track (e.g. `secondary/`) for grade 9-12 content, following
   the same Spec 008 per-topic standard but governed by its own curriculum sources.
3. **Catalog expansion:** `catalog/courses.json` must accommodate secondary-school courses
   with their own metadata (board, grade level, subject).
4. **Style guide extension:** The existing style guide (v4.4, frozen) may need a version bump
   to address register and assessment differences for younger learners.

## Alternatives considered

- **Keep the platform B.Ed-only and build a separate platform for grades 9-12.** Rejected:
  the existing infrastructure (auth, dashboards, content pipeline, bilingual framework,
  Supabase backend) is reusable, and maintaining two platforms doubles the operational burden.
- **Add grades 9-12 content under the existing B.Ed track.** Rejected: the content authority,
  curriculum sources, and assessment patterns are fundamentally different; mixing them
  under one track would violate Article II's traceability requirement.

## Consequences

### Positive

- The platform serves a far larger student population.
- Existing infrastructure (auth, RLS, dashboards, content pipeline, figure lifecycle,
  bilingual framework) is reused rather than rebuilt.
- The content-track architecture (Feature 015) already supports multiple tracks; a third
  track is a natural extension.

### Negative

- **Constitution amendment is required and non-trivial.** Article I and Article II are
  foundational; broadening them affects every existing spec and gate.
- **New curriculum authorities must be identified and integrated.** Article II's guiding
  document supremacy currently points to a single source (the university Scheme of Study).
  Secondary-school content will have different authoritative documents (BISE curricula,
  textbooks, board exams).
- **The style guide may need significant revision.** Register, assessment patterns, and
  figure density for grades 9-12 differ from B.Ed; the frozen v4.4 guide may not apply
  cleanly.
- **Existing gates assume B.Ed context.** Gates like `check:bloom-bands` and
  `check:source-floor` may need track-aware variants.

## References

- ADR-0020 (content tracks), ADR-0022 (English-first corpus with deferred Urdu parity).
- Constitution Article I (Purpose), Article II (Guiding Document Supremacy).
- `specs/006-content-pipeline/` (content authoring pipeline).
- `catalog/courses.json` (course metadata).

