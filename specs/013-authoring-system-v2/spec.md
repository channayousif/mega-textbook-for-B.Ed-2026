# Feature Specification: Authoring system v2 - figure colour, branding, SEO, and standard enforcement

**Feature Branch**: `013-authoring-system-v2`
**Created**: 2026-09-11
**Status**: Draft
**Input**: User description: "i want you to evaluate the content authoring system, make it more organised, and reinforced. The SVGs created are monochrome and somewhat dull, it can be made more interesting by setting some eyecandy coloring standards so the book doesnot get endlessly boring. we can add branding textbook.com.pk to the media assets to standout in google search. Also think about SEO optimized content creation system and follow best practices for google seo and others."

## Why this feature exists

An audit of the authoring system (2026-09-11) found the owner's three observations are all
real, and that two of them rest on outright defects rather than taste:

- **Figures do not theme with the site.** All 16 committed SVGs theme themselves with
  `@media (prefers-color-scheme: dark)`, which follows the *operating system*. Docusaurus
  themes by toggling `[data-theme]` on `<html>`, and `src/css/custom.css` has no `[data-theme]`
  rules at all. A light-OS reader who clicks the site's dark toggle sees white figure plates
  punched into a dark page.
- **Figures are greyscale by prescription.** The `generate-figures` skill hands every author a
  hard-coded eight-grey boilerplate. The census across all 16 files is eight greys and zero
  hue. Constitution Art. III.8 forbids colour as the *sole* carrier of meaning; it has been
  read as forbidding colour outright.
- **The site is close to invisible to search.** No page sets a `description`, so every topic
  page in the book ships the same fallback meta description in both locales. The declared
  favicon does not exist. There is no social card, no `robots.txt`, no sitemap index, and 35
  auth-gated pages sit in the sitemap.
- **A fourth, unasked-for problem blocks all of the above**: the standard lives as prose
  duplicated up to seven times per constant, with no machine-readable source. Drift has
  already happened. Any colour or branding rule written today would be advisory only, because
  no gate reads a single byte of a committed SVG.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Figures follow the reader's chosen theme (Priority: P1)

A student reading at night clicks the site's dark-mode toggle. Every figure follows, instead of
staying a glaring white plate.

**Why this priority**: It is a live visual defect on the only unit with figures, it affects
every reader who uses the toggle, and no colour standard can be built on a broken theming
mechanism.

**Independent Test**: Build both locales, open a topic page, toggle light/dark, and confirm
every figure's ground and ink follow the page. Print-preview and confirm figures render light
on A4 regardless of OS theme.

**Acceptance Scenarios**:

1. **Given** a reader whose OS is light, **When** they switch the site to dark mode, **Then**
   every figure renders on the dark ground with light ink.
2. **Given** a reader whose OS is dark, **When** they switch the site to light mode, **Then**
   every figure renders on the light ground with dark ink.
3. **Given** any reader, **When** they print a unit handout, **Then** figures render in the
   light palette on white paper.
4. **Given** a screen-reader user in either theme, **When** they reach a figure, **Then**
   exactly one image is exposed and it carries the full alt text.

---

### User Story 2 - Figures are branded and worth looking at (Priority: P1)

A student meets a concept map that uses colour to group ideas, and carries a small
`textbook.com.pk` wordmark plus a visible attribution line, so the diagram is recognisable if
it is reused elsewhere.

**Why this priority**: This is the owner's stated request, and figure assets are the most
re-shared surface the project has.

**Independent Test**: Render the retrofitted EFMP-302 Unit 1 and confirm each figure draws from
the published palette, carries the wordmark, and shows the attribution caption in both locales.

**Acceptance Scenarios**:

1. **Given** any rendered figure, **When** it is displayed, **Then** it carries exactly one
   `textbook.com.pk` wordmark, positioned bottom-right in English and bottom-left in Urdu.
2. **Given** any rendered figure, **When** it is displayed, **Then** a visible attribution line
   appears in the caption, rendered left-to-right even inside an RTL page.
3. **Given** any figure, **When** every colour is removed from it, **Then** it still reads -
   colour is redundant with shape, dash pattern or label (Art. III.8).
4. **Given** the wordmark, **When** a screen reader traverses the figure, **Then** the wordmark
   is not announced and does not appear in the figure's description.

---

### User Story 3 - The standard enforces itself (Priority: P2)

An author (human or agent) who ships an off-palette figure, an unbranded figure, a stale dark
variant, or a missing Urdu variant is stopped by CI rather than by a reviewer's memory.

**Why this priority**: Without it, US1 and US2 decay on the next unit. It also closes a live
Urdu-parity hole.

**Independent Test**: Introduce each violation into a fixture and confirm the gate fails with a
named reason; revert and confirm it passes.

**Acceptance Scenarios**:

1. **Given** a figure using a colour outside the published palette, **When** the figure gate
   runs, **Then** it fails naming the figure and the offending value.
2. **Given** a placed schematic of any archetype whose `.ur.svg` is missing, **When** the gate
   runs, **Then** it fails - not only for `Kind: diagram`.
3. **Given** a `.dark.svg` that no longer matches its source, **When** the gate runs, **Then**
   it fails and names the command that regenerates it.
4. **Given** a shared constant restated in a skill document, **When** that constant changes in
   code, **Then** the docs-sync gate fails until the prose is regenerated.
5. **Given** an author following any skill, **When** they run the documented gate command,
   **Then** it runs the same superset CI runs, including `check:pipeline-gate`.

---

### User Story 4 - Pages are findable and shareable (Priority: P1)

A student searching for their course finds the right page, with a meaningful snippet; sharing
it on WhatsApp shows a real preview card.

**Why this priority**: The book is public and free; being unfindable defeats its purpose. The
duplicate-description defect affects every page.

**Independent Test**: Build and inspect the emitted HTML and sitemaps.

**Acceptance Scenarios**:

1. **Given** any content page, **When** its HTML is inspected, **Then** it carries a distinct
   `description` of its own, in its own language.
2. **Given** any page shared to a social or messaging app, **When** the preview renders,
   **Then** an image and a real description appear.
3. **Given** the generated sitemaps, **When** they are inspected, **Then** no `/app/*` or
   `/search/` URL appears, and both locales are reachable from a sitemap index named in
   `robots.txt`.
4. **Given** any page, **When** the browser requests the favicon, **Then** it resolves rather
   than 404s.
5. **Given** a course or unit page, **When** it is tested for structured data, **Then** valid
   schema.org markup is present and error-free.

---

### User Story 5 - Titles match how students actually search (Priority: P3)

A student typing a real query reaches the page, because its title carries the course code and
subject terms rather than only a positional label.

**Why this priority**: Real upside, but it touches the most files and carries the most
editorial judgement, so it goes last.

**Independent Test**: After each course, run `validate:content` and confirm the EN/UR parity
gate still passes and no URL changed.

**Acceptance Scenarios**:

1. **Given** a retitled page, **When** the parity gate runs, **Then** it passes, because
   heading *structure* is unchanged.
2. **Given** a retitled page, **When** its URL is requested, **Then** it is unchanged from
   before the rewrite.
3. **Given** a retitled page, **When** a reader reads it, **Then** it still reads as a textbook
   and not as search bait.

---

## Requirements *(mandatory)*

### Functional

- **FR-001** Figures MUST theme from the site's own theme attribute, never the OS preference.
- **FR-002** The rendering path MUST produce no theme flash and MUST keep each figure available
  at a stable, crawlable image URL.
- **FR-003** Exactly one image per figure MUST be exposed to assistive technology in either
  theme, carrying the full alt text.
- **FR-004** All figure colour MUST come from a single published token set, declared once per
  file; no colour literal may appear elsewhere in the file.
- **FR-005** Every token used for text MUST meet WCAG AA (4.5:1) against its intended ground in
  both themes.
- **FR-006** Colour MUST remain redundant with shape, dash pattern or label (Art. III.8).
- **FR-007** Every figure MUST carry exactly one `textbook.com.pk` wordmark, mirrored for RTL,
  hidden from assistive technology, and absent from the figure's description.
- **FR-008** Every rendered figure MUST show a visible attribution line in its caption,
  direction-isolated so it does not reorder inside RTL text.
- **FR-009** The dark variant MUST be derived deterministically from its source, and CI MUST
  fail if a committed variant is stale.
- **FR-010** The figure gate MUST read committed SVG bytes and enforce: palette conformance,
  the wordmark, viewBox sanity, `role`/`title`/`desc`, the size budget, absence of scripts and
  external references, and absence of em dashes in text nodes.
- **FR-011** The Urdu-variant requirement MUST key on the asset being an SVG, not on one
  archetype.
- **FR-012** Shared constants MUST have one machine-readable source, with prose copies
  generated from it and a gate proving they match.
- **FR-013** A single documented gate command MUST run the same superset CI runs.
- **FR-014** Every content page MUST carry its own `description`, enforced by the validator.
- **FR-015** The site MUST provide a favicon, a social card image, `robots.txt`, and a sitemap
  index covering both locales.
- **FR-016** Auth-gated and search pages MUST be excluded from the sitemap.
- **FR-017** Content pages MUST emit valid schema.org structured data.
- **FR-018** Figures MUST declare intrinsic dimensions so they do not shift layout.
- **FR-019** Title and heading rewrites MUST NOT change any URL or any heading's level.

### Non-functional

- **NFR-001** No new runtime dependency (Art. V.5).
- **NFR-002** Every script stays offline; no network call in CI.
- **NFR-003** Added page weight per figure stays within a few KB.

## Success Criteria *(mandatory)*

- **SC-001** Every figure follows the site theme toggle in both directions, verified visually.
- **SC-002** 100% of content pages carry a distinct meta description in their own language.
- **SC-003** Zero `/app/*` or `/search/` URLs in either sitemap.
- **SC-004** The figure gate fails on each of five seeded violations and passes when reverted.
- **SC-005** Every published token clears WCAG AA for its intended use in both themes.
- **SC-006** No URL changes and no parity-gate regression from the title rewrite.
- **SC-007** The favicon and social card resolve on a deployed preview.

## Out of Scope

- Authoring new units (EFMP-301 Unit 1 remains the next content task, at the version this
  spec freezes).
- Raster/illustration generation; the raster path is untouched.
- Analytics, Search Console verification, or any third-party tag.
- Backlinks, off-site SEO, or content marketing.
