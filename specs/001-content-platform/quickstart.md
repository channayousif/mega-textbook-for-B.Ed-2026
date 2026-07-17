# Quickstart: Bilingual Content Platform

**Feature**: 001-content-platform | **Date**: 2026-07-17

How to scaffold, run, validate, and verify the platform against its acceptance criteria. Follows SDD 001 §6 build plan. Package manager: `npm` (Node 20+; local 22.22.1).

> Verify version-sensitive Docusaurus v3 config (i18n keys, sidebar autogen, search plugin options) against current docs via Context7 (`/facebook/docusaurus`) while implementing — do not trust snapshots.

## 1. Scaffold the site (one-time)

```bash
npx create-docusaurus@latest . classic --typescript   # at repo root
npm install @easyops-cn/docusaurus-search-local gray-matter ajv ajv-formats
npm install -D playwright @playwright/test vitest
npx playwright install chromium
git add -A && git commit -m "chore: docusaurus baseline"
```

## 2. Configure i18n + RTL (FR-001, FR-002)

- In `docusaurus.config.ts`: `i18n.locales = ['en','ur']`, default `en`; `ur` → `direction: 'rtl'`, `htmlLang: 'ur'`.
- Add `localeDropdown` to the navbar (per-page toggle).
- `src/css/custom.css`: `[dir='rtl']` rules; `@font-face` for self-hosted Noto Nastaliq Urdu from `static/fonts/`; Nastaliq `line-height`.
- Missing-Urdu fallback (FR-003, Q1): rely on Docusaurus default-locale fallback so a unit with no `ur` file serves EN under `/ur/`; render `<TranslationStatusBadge variant="untranslated"/>` on such pages. Draft UR files render with the `draft` badge variant.
- Verify: `npm run start -- --locale ur` renders RTL on a 360px viewport with no horizontal scroll; an untranslated unit shows the EN body under the "untranslated" banner (no dead end).

## 3. Front-matter validation gate (FR-009, SC-007)

```bash
npm run validate:content     # scripts/validate-content.mjs against contracts/*.schema.json
```

- Walks `docs/**` + `i18n/ur/**`; fails non-zero naming file + missing/invalid field.
- Wire into `package.json` scripts and CI **before** build.

## 4. Custom MDX components (FR-004 / SDD F4)

Build with fixture pages under a sample unit: `<Glossary term="...">` (bilingual inline definition from `glossary.json`), `<BloomTag>`, `<ActivityCard>`, `<PrintHandout>` (client-side `window.print()`), `<ObjectiveList>`, `<TranslationStatusBadge>` (variants: `draft`, `untranslated`). Seed `glossary.json` (`contracts/glossary.schema.json`); `validate:content` fails if a `<Glossary term>` references a missing key or an entry lacks EN/UR.

## 5. Scaffold all 8 semesters (FR-014, SC-005)

```bash
node scripts/scaffold-catalog.mjs   # from catalog/courses.json
```

Generates `docs/semester-{1..8}/<course-code>/` with `_category_.json`, `course-overview.mdx`, and placeholder `unit-NN` (five files, `coming_soon: true`). Author real content Sems 1–4 first.

## 6. Local search (FR-006, SC-004)

Configure `@easyops-cn/docusaurus-search-local` for both locales; verify a term in EN and in UR each return a relevant opening result.

## 7. Handout printing (FR-011, SC-009)

No PDF build step. Add a `<PrintHandout/>` control to `activities.mdx`, `formative.mdx`, `summative.mdx` and an A4 print stylesheet:

```css
@media print {
  @page { size: A4; margin: 15mm; }
  .navbar, .theme-doc-sidebar-container, .theme-doc-toc-desktop, footer, .print-hidden { display: none !important; }
}
```

Verify: open a handout page → print-preview at A4 → clean pagination, no clipping, chrome hidden, Urdu RTL preserved; confirm no answer keys present.

## 8. Golden unit (SC-008) — freeze the template

Author EFMP-301 (Educational Psychology) Unit 1 end-to-end in EN + UR; pass Content + Engineering + Teacher gates (Constitution Art. VII); then freeze the unit template.

## 9. CI (NFR)

`.github/workflows/ci.yml`: `validate:content` → `docusaurus build` (both locales) → deploy preview on PR, prod on merge to `main`. Lighthouse budget check (FCP < 2.5s Slow-4G; content text < 200 KB).

---

## Acceptance verification map

| Criterion | How to verify |
|---|---|
| SC-001 EN↔UR toggle < 2s, RTL | Playwright locale switch timing + `dir` assertion |
| SC-002 < 2.5s FCP / < 200 KB text | Lighthouse (Slow-4G) + payload check in CI |
| SC-003 unit in ≤ 3 steps | Nav walk Semester → Course → Unit |
| SC-004 95% searches hit | Search fixtures EN + UR |
| SC-005 no dead ends | `coming_soon` placeholders render; link-check build |
| SC-006 add course, zero code | Add dummy course folder + metadata; `git diff` shows no `src/`/config change; build passes |
| SC-007 missing metadata rejected | Fixture unit without `clo_refs` → `validate:content` exits non-zero |
| FR-001 EN↔UR parity gate | Fixture `reviewed` unit with a UR heading removed → `validate:content` exits non-zero naming the divergence |
| FR-003 missing-UR fallback | Unit with no `ur` file → `/ur/` shows EN body + "untranslated" banner (no dead end) |
| SC-008 golden gates | Content + Engineering + Teacher sign-off |
| SC-009 A4 handout clean | Print-preview a handout page at A4 (Playwright print-emulation) — no clipping |
| SC-010 no answer keys public | grep built output; validator forbids answer-key fields |
