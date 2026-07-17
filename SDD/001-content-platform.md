# SPEC 001 — Bilingual Content Platform (Docusaurus)

**Status:** Draft for approval • **Depends on:** Constitution • **Blocks:** 003, 004, 005

## 1. Problem & Goal
Students need the full textbook readable in simple English and Urdu on any device; teachers need per-unit teaching resources adjacent to the content. Content must be maintainable per-course without touching platform code.

## 2. User Stories
- **S1**: As a student, I open any unit and toggle between English and Urdu (اردو), with Urdu rendered right-to-left in a proper Nastaliq/Naskh font.
- **S2**: As a student, I navigate by Semester → Course → Unit and always see where I am.
- **S3**: As a student, I search the whole book (English and Urdu) and jump to results.
- **S4**: As a teacher, on any unit I see tabs/sections: Content, Activities, Formative, Summative, Teacher Notes.
- **S5**: As a student on a 2G/3G connection, pages load fast and work on a small screen.

## 3. Functional Requirements
| ID | Requirement |
|---|---|
| F1 | Docusaurus v3 site with i18n: `en` (default, LTR) + `ur` (RTL, `direction: rtl`). Verify exact config against current Docusaurus docs at build time. |
| F2 | Docs structure: `docs/semester-{1..8}/<course-code>/` holding a `course-overview.mdx` (course-wide strategies, assessment criteria, recommended resources) + per-unit `unit-NN/{index.mdx, activities.mdx, formative.mdx, summative.mdx, teacher-notes.mdx}`, mirrored under `i18n/ur/...`. The five unit files are fixed — course-guide sections fold into them (see Spec 006 §2 mapping), no new file types. All 8 semesters are scaffolded; content authored Sems 1–4 first. |
| F3 | Unit front-matter schema: required — `course_code`, `unit_no`, `clo_refs[]`, `blooms_summary`, `est_reading_minutes`, `translation_status: draft|reviewed`; optional — `resources[]` (reading materials/recommended books), `teaching_strategies[]`, `assessment_weighting` (default `summative:60,formative:40`). CI fails the build if **required** fields are missing; optional fields are validated for shape only when present. |
| F4 | Custom MDX components: `<Glossary term/>` (bilingual popover), `<BloomTag level/>`, `<ActivityCard/>`, `<DownloadHandout/>` (links to generated PDF), `<ObjectiveList/>`. |
| F5 | Urdu webfont (e.g., Noto Nastaliq Urdu or Jameel Noori via self-hosted files) with fallback; line-height tuned for Nastaliq. |
| F6 | Local search plugin covering both locales (Algolia optional later). |
| F7 | Handout generator: build script converts each `activities.mdx`/assessment file into a clean printable PDF placed in `static/handouts/` (public-safe content only — never answer keys). |
| F8 | Sidebar auto-generated from folder structure + `_category_.json`; adding a course requires zero code changes. |
| F9 | Answer keys are **NOT** in this repo/site (see Spec 005 — they live in the backend, teacher-role gated). |

## 4. Non-Functional
- First contentful paint < 2.5s on simulated Slow 4G; content page payload < 200 KB excl. images.
- Deployable to Vercel/Netlify/GitHub Pages from `main` via CI.
- WCAG 2.1 AA basics: headings, contrast, alt text, keyboard nav.

## 5. Out of Scope
User accounts, dashboards, submissions (Specs 002–005). Sindhi locale (backlog).

## 6. Step-by-Step Build Plan
1. `npx create-docusaurus@latest` → TypeScript classic template; commit baseline.
2. Configure `i18n` (`en`, `ur` with RTL); add Urdu font + CSS (`[dir='rtl']` rules); verify with a sample translated page on mobile widths.
3. Define front-matter schema + a Node validation script wired into CI (`npm run validate:content`).
4. Build the 5 custom MDX components with fixture pages.
5. Create folder scaffold for **all 8 semesters'** courses (from the board scheme + each guide's unit list), with placeholder units + a `course-overview.mdx` per course; author real content for Semesters 1–4 first.
6. Add local search; verify Urdu tokenization acceptably matches.
7. Implement the handout→PDF build step.
8. Wire CI: validate → build both locales → deploy preview → deploy prod on merge.
9. Author Unit 1 of EFMP-301 (Educational Psychology) end-to-end in both languages as the golden template; run all three review gates; freeze the template.

## 7. Acceptance Criteria
- [ ] `ur` locale renders RTL with correct font on Chrome/Android low-end device.
- [ ] Build fails when a unit lacks `clo_refs`.
- [ ] Golden unit (EFMP-301 U1) passes Content + Engineering + Teacher gates.
- [ ] Adding a new course anywhere in the 8-semester catalog requires only new folders/front-matter — zero code changes (proven by test).
- [ ] Handout PDF for one activity downloads and prints cleanly (A4).
