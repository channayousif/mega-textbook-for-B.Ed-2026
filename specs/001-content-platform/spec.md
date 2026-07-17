# Feature Specification: Bilingual Content Platform

**Feature Branch**: `001-content-platform`
**Created**: 2026-07-17
**Status**: Draft
**Input**: User description: "create feature specs from SDD/001-content-platform.md and SDD/ROADMAP.md — bilingual Docusaurus content platform"

## Overview

A public, bilingual (English + Urdu) digital textbook for the B.Ed (4-Year) programme. Students read the full textbook in simple English or Urdu on any device, including low-end phones on slow connections. Teachers see per-unit teaching resources beside the content. The catalog spans all 8 semesters (132 credit hours); content is authored Semesters 1–4 first. Adding or growing a course is a content-only change — no rebuild of the platform. This feature is the reading/publishing foundation; user accounts, submissions, and dashboards are separate features that build on top of it.

## Clarifications

### Session 2026-07-17

- Q: What format should the required `clo_refs` traceability field use? → A: SLO-format identifiers `SLO:<course-code>-<unit-no>-<n>` (e.g. `SLO:EFMP-301-1-2`). The Constitution-mandated front-matter key stays `clo_refs`; its entries are SLO references (see Open Terminology note below).
- Q: When a unit's Urdu version exists but is not yet human-reviewed (`translation_status: draft`), what does the `ur` route show? → A: Render the Urdu draft with a visible "draft translation" badge at the top of the page. (A reader-submitted translation-quality rating that would drive the badge and auto-flag low-quality pages requires a backend and is **deferred to Spec 005**; not built here.)
- Q: How should scaffolded "coming soon" placeholder units behave in navigation and search? → A: Visible in the sidebar labeled "coming soon" (no dead ends), but excluded from the search index.
- Q: Which unit files should the handout generator render to A4 PDFs? → A: `activities.mdx`, `formative.mdx`, and `summative.mdx` (all public framing; answer keys are backend-only, so all three are public-safe). *(Delivery mechanism later clarified — see the print-stylesheet bullet below and FR-011; there is no build-time PDF generator.)*
- Q: What does the `ur` route render when a unit has NO Urdu file at all (not even a draft)? → A: Fall back to the English content (Docusaurus default-locale fallback) with a prominent "Urdu translation not yet available" banner — no dead route, and English is never misrepresented as Urdu.
- Q: Is EN↔UR structural parity build-enforced or editorial only? → A: Fully build-enforced — when a unit is marked `translation_status: reviewed`, the build MUST fail if the EN and UR versions diverge in section-file presence and heading structure/section counts. (Draft/untranslated units are exempt from the heading-parity gate; they carry their own badge/banner.)
- Q: How is the A4 handout produced and delivered? → A: Print stylesheet — each handout page carries a "Print / Save as PDF" button that opens the browser print dialog against an A4 `@media print` stylesheet; the reader's browser produces the PDF. No server-side/build-time PDF pipeline and no committed `.pdf` files in this feature.
- Q: Is the bilingual glossary in scope here, and in what form? → A: In scope — an inline `<Glossary term="...">` MDX component backed by a `glossary.json` data file of `{term, definition_en, definition_ur}` entries (tooltip/expandable, surfaced where the term appears). No separate glossary page in this feature; adding a term is a data-only edit.

> **Open terminology note (for curriculum owner):** Constitution v1.1.0 Art. II.2 names the traceability field `clo_refs`; this feature uses SLO-format values inside it. If the field itself should be renamed `slo_refs`, that requires a Constitution PATCH — tracked as a follow-up, not resolved here.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read any unit in English or Urdu (Priority: P1)

A student opens any unit and reads it in simple English, then toggles to Urdu (اردو), which renders right-to-left in a proper Nastaliq/Naskh font at a comfortable line height. The meaning, structure, and examples match across both languages.

**Why this priority**: This is the core product promise — the textbook itself, readable by its intended audience in their language. Without it there is no platform. It is a complete, demonstrable MVP on its own.

**Independent Test**: Publish one fully translated unit; open it on a phone; switch EN↔UR; confirm RTL layout, correct font, and content parity.

**Acceptance Scenarios**:

1. **Given** a published unit in both languages, **When** a student selects Urdu, **Then** the page renders right-to-left with the Urdu webfont and the same sections as the English version.
2. **Given** a unit whose Urdu version is not yet human-reviewed, **When** it is built, **Then** it is clearly marked as draft/untranslated rather than shown as complete.
3. **Given** a slow (2G/3G) connection on a small screen, **When** the student opens a content page, **Then** the readable text appears quickly and the layout fits a narrow viewport without horizontal scrolling.
4. **Given** a unit marked `translation_status: reviewed` whose EN and UR versions have mismatched sections or heading structure, **When** the site is built, **Then** the build fails with a message identifying the divergence.

---

### User Story 2 - Navigate the catalog and find content (Priority: P1)

A student browses by Semester → Course → Unit, always seeing where they are, and can search the whole book (English and Urdu) and jump straight to a result.

**Why this priority**: Reading is only useful if learners can locate the right material across a large, multi-semester catalog. Navigation and search are what make the textbook usable at scale, so they ship alongside reading.

**Independent Test**: With several courses scaffolded, browse the sidebar to a unit, confirm the active trail, then search a term in each language and open a result.

**Acceptance Scenarios**:

1. **Given** the scaffolded catalog, **When** a student opens the navigation, **Then** it is organized Semester → Course → Unit and highlights the current location.
2. **Given** a search term in English, **When** the student searches, **Then** matching units are returned with enough context to choose one, and selecting a result opens that unit.
3. **Given** a search term in Urdu, **When** the student searches, **Then** relevant Urdu results are returned.

---

### User Story 3 - Teachers use per-unit teaching resources (Priority: P2)

On any unit, a teacher sees distinct sections — Content, Activities, Formative, Summative, Teacher Notes — plus the course-wide overview (teaching strategies, assessment criteria, recommended resources). Teachers can download a clean, printable handout for an activity or assessment.

**Why this priority**: Teachers are the second core audience and drive classroom adoption, but the teaching layer depends on readable content existing first, so it is P2.

**Independent Test**: On a completed unit, open each teaching section, view the course overview, and download an activity handout as a print-ready file.

**Acceptance Scenarios**:

1. **Given** a completed unit, **When** a teacher views it, **Then** Content, Activities, Formative, Summative, and Teacher Notes are each reachable.
2. **Given** an activity or public assessment, **When** the teacher uses its "Print / Save as PDF" control, **Then** the browser print dialog opens against an A4 print stylesheet and produces a clean page that prints correctly on A4.
3. **Given** any published page, **When** it is inspected, **Then** no answer keys or private marking material appear anywhere in the public content.

---

### User Story 4 - Add or grow a course without platform changes (Priority: P3)

The curriculum owner adds a new course, or new units to an existing course, purely by adding content folders and metadata. Navigation, search, and validation pick it up automatically; no platform code changes.

**Why this priority**: This keeps the "mega textbook" economically maintainable across 40+ courses and years of growth, but it is an operability property rather than an end-user journey, so P3.

**Independent Test**: Add a dummy course anywhere in the catalog with only new folders/metadata; confirm it appears in navigation and search with no code change; then confirm a unit missing required metadata is rejected before publish.

**Acceptance Scenarios**:

1. **Given** a new course folder with valid metadata, **When** the site is built, **Then** the course appears in navigation and search with no code modification.
2. **Given** a unit missing a required traceability field (course reference, unit number, or curriculum-outcome references), **When** the site is built, **Then** the build fails with a clear message identifying the missing field.
3. **Given** a course with only placeholder units (not yet authored), **When** a student browses to it, **Then** its unwritten units are clearly marked "coming soon" rather than shown as dead ends.

### Edge Cases

- A unit exists in English but its Urdu version is missing or still a machine draft — it must never be presented as a finished bilingual unit. When missing entirely, the `ur` route falls back to English content under a "Urdu translation not yet available" banner (per FR-003); when a machine draft exists, it renders under a "draft translation" badge.
- Urdu text mixes with English terms or numerals — mixed-direction content must remain readable and correctly aligned.
- Search finds a term only in one language — results should still be useful, and the reader should be able to reach the corresponding page in their language.
- Images or diagrams fail to load on a poor connection — text remains readable and meaning is not lost (alt text, no color-only meaning).
- A course guide is silent on a section (e.g., no suggested activities) — that section is simply omitted, not invented.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The platform MUST present every unit in two languages — English (default, left-to-right) and Urdu (right-to-left) — with a per-page language toggle. Structural parity MUST be build-enforced: for any unit marked `translation_status: reviewed`, the build MUST fail if the EN and UR versions diverge in section-file presence or in heading structure / section counts. (Units in `draft` or with no Urdu file yet are exempt from the heading-parity gate and instead carry the badge/banner defined in FR-003.)
- **FR-002**: Urdu content MUST render right-to-left in an appropriate Nastaliq/Naskh webfont with legible line spacing, including a fallback when the primary font is unavailable.
- **FR-003**: A unit's Urdu version MUST be publishable as "reviewed" only after a human quality pass; un-reviewed translations MUST be visibly distinguished from finished ones. When `translation_status: draft`, the `ur` route MUST render the Urdu draft with a visible "draft translation" badge at the top of the page (rather than hiding it or substituting English). When a unit has **no Urdu file at all**, the `ur` route MUST fall back to the English content (default-locale fallback) with a prominent "Urdu translation not yet available" banner — the route MUST NOT dead-end, and the fallback English MUST NOT be presented as though it were Urdu.
- **FR-004**: The catalog MUST be organized Semester → Course → Unit, and navigation MUST always indicate the reader's current location.
- **FR-005**: Navigation for all 8 semesters MUST be generated from the content structure and metadata, so adding a course requires no platform code change.
- **FR-006**: Readers MUST be able to search the full book in both English and Urdu and open a chosen result directly. Un-authored ("coming soon") placeholder units MUST be excluded from the search index so they never appear as empty results.
- **FR-007**: Each unit MUST expose the sections Content, Activities, Formative, Summative, and Teacher Notes; each course MUST expose a course overview carrying course-wide teaching strategies, assessment criteria, and recommended resources.
- **FR-008**: Each course-guide-derived section (teaching strategies, suggested practical activities [optional], reading materials, practical work, assessment criteria, recommended books) MUST be folded into these existing sections/overview — no new per-unit section types are introduced.
- **FR-009**: Every unit MUST carry traceability metadata linking it to its course and curriculum outcomes; publishing MUST be blocked when required metadata is missing. Outcome references use SLO-format identifiers `SLO:<course-code>-<unit-no>-<n>` (e.g. `SLO:EFMP-301-1-2`) recorded in the `clo_refs` front-matter field.
- **FR-010**: Assessment framing MUST default to a 60% summative / 40% formative weighting for the affiliated colleges (GECEs), with per-unit deviations justified in the unit's own record via an `assessment_weighting_note` front-matter field. When `assessment_weighting` is present it MUST sum to 100 (build-enforced by a custom validator check).
- **FR-011**: The platform MUST provide a clean, print-ready A4 handout for each activity and each publicly shareable assessment — specifically from `activities.mdx`, `formative.mdx`, and `summative.mdx` (all public framing; answer keys never appear in these files per FR-012). Delivery MUST use a print-stylesheet approach: each such page carries a "Print / Save as PDF" control that opens the browser print dialog against an A4 `@media print` stylesheet (correct RTL/Nastaliq for Urdu handouts). No server-side/build-time PDF-generation pipeline and no committed `.pdf` artifacts are in scope for this feature.
- **FR-012**: Answer keys and private marking material MUST NOT appear anywhere in the public content; they belong to a separate, access-controlled feature.
- **FR-013**: Every page MUST meet baseline accessibility: semantic heading order, alt text on images/diagrams, no color-only meaning, and correct right-to-left rendering for Urdu.
- **FR-014**: All 8 semesters MUST be scaffolded (present in structure and metadata); authored content is delivered Semesters 1–4 first, and un-authored units MUST be clearly marked as forthcoming.
- **FR-015**: One fully authored, bilingual "golden" unit (Educational Psychology, Unit 1) MUST pass content, engineering, and teacher review before the unit template is frozen as the quality bar.
- **FR-016**: Specialized terms MUST be definable via an inline glossary component (`<Glossary term="...">`) that surfaces a bilingual definition (English + Urdu) in place. Entries live in a `glossary.json` data file as `{term, definition_en, definition_ur}`; adding or editing a term is a content/data-only change (no platform code change). A separate browsable glossary page is out of scope for this feature.

### Key Entities *(include if feature involves data)*

- **Semester**: One of the 8 programme terms; groups courses; ordered; carries priority (1–4 first).
- **Course**: A subject within a semester (code, English title, Urdu title, credit hours); owns a course overview and a set of units.
- **Unit**: A chapter within a course; has English and Urdu versions; carries the five sections, traceability metadata (course reference, unit number, curriculum-outcome references as SLO-format `SLO:<course-code>-<unit-no>-<n>`, reading estimate, translation status), and optional resources/strategies/assessment-weighting.
- **Course overview**: Course-wide teaching strategies, assessment criteria, and recommended resources, referenced by that course's units.
- **Recommended resource / reading material**: A bibliographic reference drawn from the course guide, listed for scoping and further reading — never reproduced as content.
- **Handout**: A print-optimized rendering of an activity or public assessment, produced client-side via a "Print / Save as PDF" control against an A4 print stylesheet (no stored PDF file).
- **Glossary term**: A specialized term with a bilingual definition (`term`, `definition_en`, `definition_ur`) stored in `glossary.json` and surfaced inline via the `<Glossary term="...">` component; a content/data record, not a page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reader can switch any published unit between English and Urdu and continue reading in under 2 seconds, with Urdu correctly right-to-left.
- **SC-002**: On a simulated slow-4G connection, the readable text of a content page appears in under 2.5 seconds and the page's text payload stays under 200 KB (excluding images).
- **SC-003**: A reader can locate a specific unit from the catalog home in 3 navigation steps or fewer (Semester → Course → Unit).
- **SC-004**: 95% of searches in either language return at least one relevant result that opens the intended page.
- **SC-005**: The full 8-semester catalog is browsable, with un-authored units clearly marked "coming soon" and zero dead-end links.
- **SC-006**: Adding a new course anywhere in the catalog requires only new content folders and metadata — measured as zero platform-code changes in the change set.
- **SC-007**: A unit missing required traceability metadata is rejected before publish 100% of the time.
- **SC-008**: The golden unit passes all three review gates (content, engineering, teacher) before the template is frozen.
- **SC-009**: An activity handout prints (or saves to PDF via the browser print dialog) cleanly on A4 with no clipped content.
- **SC-010**: No answer keys or private marking material are discoverable in the public content (verified by review of the published output).

## Assumptions

- Simple-English register targets a fresh HSC/intermediate graduate; specialized terms get a bilingual glossary entry.
- Urdu register is academic-plain (درسی مگر عام فہم), not literary/archaic; machine translation may draft but a human reviews before "reviewed" status.
- The public site is read-only and anonymous; no login is required to read (accounts are a separate feature).
- Per-item Bloom's-level tagging (Constitution III.3 — including summative sets reaching Analyze or above) is enforced by the content-authoring pipeline (Spec 006). This platform carries a unit-level `blooms_summary` field and renders a `<BloomTag>` component, but does not itself validate per-item Bloom coverage.
- Sindhi locale, offline packaging, and hosted third-party search are out of scope here (backlog).
- Board-vs-guide catalog discrepancies for Semesters I/II (e.g., GNAS code, Pakistan Studies placement, Fehm-e-Quran code) follow the board scheme until the curriculum owner resolves them; open items are tracked in `specs/gaps.md`.

## Dependencies

- Governed by the project Constitution (`.specify/memory/constitution.md`, v1.1.0) — content quality, guide-section fidelity, scope discipline, and review gates.
- Source of truth for catalog and content: the course guides under `Scheme-and-Course-guides/`.
- The content-authoring pipeline (SDD Spec 006) supplies the authored units and course overviews that this platform publishes.
- Downstream features (accounts/roles, classes & assignments, dashboards — SDD Specs 002–005) depend on this platform but are out of scope here.
- Reader-submitted translation-quality ratings (the reader-facing rating that would drive an Urdu-translation quality badge and auto-flag low-quality pages for review) require backend storage and are delivered by the suggestion/feedback loop in Spec 005; this feature only ships the editorial `translation_status` draft badge.

## Out of Scope

- User accounts, roles, submissions, grading, dashboards (separate features).
- Answer keys / private assessment material (access-controlled backend feature).
- Reader-submitted translation-quality ratings and the resulting auto-flag-for-review workflow (needs a backend — deferred to Spec 005).
- Sindhi locale; offline packaging; hosted search service; real-time features.
