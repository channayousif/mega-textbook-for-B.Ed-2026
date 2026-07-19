# ADR-0003: Bilingual Reader Rendering and Print Handouts

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-07-17
- **Feature:** 001-content-platform
- **Context:** The core product promise is a textbook readable by its intended audience in *simple English or Urdu* on low-end phones and slow connections — Urdu must render right-to-left in a proper Nastaliq/Naskh face, content is authored and delivered incrementally (so untranslated/draft states will exist), and teachers must print clean A4 handouts for activities/assessments. These are all reader/teacher-facing *presentation* decisions that share the same rendering pipeline and low-bandwidth budget, so they cluster: the locale mechanism, the webfont, the honest translation-state UI, and the handout output change together and against the same constraints (Constitution Art. III.2 Urdu parity, III.8 accessibility, V.5 low-bandwidth).

<!-- Significance checklist (ALL must be true)
     1) Impact: YES — defines the entire reader presentation layer (routing, fonts, RTL, output).
     2) Alternatives: YES — runtime language switch, CDN fonts, hiding untranslated pages, build-time PDF generation.
     3) Scope: YES — spans i18n config, CSS, components, and the handout pipeline. -->

## Decision

Presentation is built on **native Docusaurus i18n plus a self-hosted Urdu font, honest translation states, and client-side print handouts**:

- **Locale mechanism:** native Docusaurus i18n — `en` (default, LTR) and `ur` (RTL) — with a per-page `localeDropdown` toggle and per-locale URLs (`/` and `/ur/`). Untranslated pages use the built-in **default-locale fallback**: the `/ur/` route serves the English body under a prominent "Urdu translation not yet available" banner (never a dead end, never English disguised as Urdu).
- **Webfont:** self-hosted **Noto Nastaliq Urdu** (Arabic-range WOFF2 subset, single weight, `font-display: swap`) with a Naskh/system fallback; `[dir='rtl']` CSS with generous Nastaliq line-height and `unicode-bidi: isolate` for mixed LTR terms/numerals.
- **Translation states (`translation_status`):** `reviewed` (finished bilingual), `draft` (Urdu shown under a "draft translation" badge), and no-UR-file (English fallback + banner) — rendered by a `<TranslationStatusBadge>` component.
- **Handouts:** A4 handouts are produced **client-side** — each `activities/formative/summative` page carries a `<PrintHandout>` control that calls `window.print()` against an A4 `@media print` stylesheet (hides site chrome, preserves RTL/Nastaliq). **No build-time PDF pipeline and no committed `.pdf` artifacts.**

## Consequences

### Positive

- **Per-locale routing/SEO and static search per language**, with a built-in, honest fallback for untranslated content.
- **No third-party font request** on slow connections; subsetting keeps Urdu within the low-bandwidth budget.
- **Handouts are the lightest possible mechanism** — no headless-browser render step in CI, no binaries to keep in sync with content, and they inherit exact on-page styling (fonts, RTL, components).
- **Accessibility-aligned** — semantic headings, aria-labels on the glossary/print controls, RTL correctness (Constitution III.8).

### Negative

- **Nastaliq needs generous line-height and a non-trivial font payload** (~159 KB) that counts against first paint even though the text budget excludes images — must be watched in the Lighthouse gate.
- **Print fidelity depends on the browser's print engine**; there is no pixel-exact, stored, offline PDF (a deliberate trade — revisit if offline distribution becomes a hard requirement).
- **Bilingual parity is an authoring burden** — the honest states help, but the structural guarantee lives in the build gate (ADR-0004), not here.

## Alternatives Considered

- **A. Runtime React language switch (single page, state toggle).** *Rejected:* loses per-locale URLs, SEO, and per-language static search indexing.
- **B. CDN-hosted fonts (Google Fonts link).** *Rejected:* extra origin/request and blocked-request risk on 2G, slower first paint; self-hosting is privacy-simple and budget-friendly.
- **C. Hide or 404 untranslated Urdu pages / standalone "coming soon" UR placeholder.** *Rejected:* hides available English content and adds a route type; fallback+banner is more useful and honest.
- **D. Build-time PDF handouts (Playwright/Puppeteer → `static/handouts/*.pdf`, or `md-to-pdf`).** *Rejected:* extra toolchain, committed binaries drift from content, heavier CI; the print stylesheet meets "clean A4" without any of that.

## References

- Feature Spec: `specs/001-content-platform/spec.md` (FR-001/FR-002/FR-003/FR-011; Clarifications 2026-07-17)
- Implementation Plan: `specs/001-content-platform/plan.md`; Research `specs/001-content-platform/research.md` (R2 i18n/RTL, R3 font, R6 handout delivery)
- Related ADRs: ADR-0002 (platform); ADR-0004 (integrity gate — enforces EN↔UR parity)
- Evaluator Evidence: PHRs `0002`–`0004` (clarify), `0011`/`0013` (implement); CI e2e (read-bilingual, handout-print) in run #5
