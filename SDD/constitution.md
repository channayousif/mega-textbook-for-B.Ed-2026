# CONSTITUTION
## B.Ed (4-Year) Mega Textbook & Learning Platform
**University of Sindh, Faculty of Education, Elsa Kazi Campus, Hyderabad**
**Version 1.1 — Ratified: [pending your approval]**

This constitution is the highest-authority document of the project. Every spec, plan, task, and line of code must comply with it. Amendments require an explicit version bump and a written rationale.

> **Amendment 1.0 → 1.1 (rationale):** The complete course guides for all 8 semesters are now available locally under `Scheme-and-Course-guides/` (previously only a few Semester I guides existed in a remote Drive folder). This amendment (a) makes the local folder the source of truth for the full catalog, (b) enriches the content pipeline to capture each guide's teaching strategies, suggested practical activities, reading materials, practical work, and assessment criteria, (c) scaffolds all 8 semesters while prioritizing content for Semesters 1–4 under the new 2026 scheme, and (d) records the GECE assessment split (60% summative / 40% formative). Affected specs (001, 003, 006) and the roadmap were updated in the same change.

---

## Article I — Purpose

Build a bilingual (English + Urdu) digital textbook and learning platform for the B.Ed (4-Year) programme (UGE Policy 2023 v1.1, aligned with HEC's 2025 Proposed Curriculum for Education, applicable from 2026; 8 semesters, 132 credit hours), serving:

1. **Students** — as a primary or teacher-guided secondary learning resource.
2. **Teachers** — as a teaching companion (activities, handouts, formative/summative assessments) and a virtual class manager (assignments, grading, progress tracking).

## Article II — Guiding Document Supremacy

1. The **approved Scheme of Study** (`Scheme-and-Course-guides/B.Ed 4 Year board.docx`) and the **official course guides** (local folder `Scheme-and-Course-guides/`, covering all 8 semesters — Sem I–II as PDF, Sem III–VIII as DOCX) are the sole source of truth for WHAT is taught.
2. No unit, SLO, activity, or assessment ships unless it traces to a course guide item. Traceability is recorded in each unit's front-matter (`clo_refs:` field).
3. If a course guide is ambiguous or missing, the gap is logged in `specs/gaps.md` and escalated to the curriculum owner (Yousif) — never invented. (All 8 semesters' guides are now text-extracted; open board-vs-guide discrepancies for Sems I/II are tracked in `specs/gaps.md`, e.g. GNAS code, Pakistan Studies placement, Fehm-e-Quran code.)

## Article III — Content Quality Standards (non-negotiable)

1. **Simple English**: student-facing prose targets an accessible register for a fresh HSC/intermediate graduate. No graduate-level jargon without a bilingual glossary entry.
2. **Urdu parity**: every student-facing unit has a complete, human-reviewed Urdu version. Machine translation may draft; a human quality pass is mandatory before publish. Register: academic-plain (درسی مگر عام فہم), not literary/archaic.
3. **Bloom's tagging**: every assessment item carries a Bloom's level tag. Formative sets skew Remember→Apply; summative sets include Analyze+.
4. **Pakistan-grounded examples**: case studies and examples use Pakistani/Sindh classroom contexts wherever the subject allows.
5. **Citations**: definitions and claims cite the course guide, HEC document, or a named academic source. Original prose only — no reproduction of copyrighted textbook passages. Each course guide's **recommended books/resources are a permitted starting point** — used for scoping and listed as bibliographic references only, never reproduced.
6. **Guide-section fidelity**: where a course guide provides them, every course/unit incorporates the guide's **Teaching/Instructional Strategies**, **Suggested Practical Activities (optional)**, **Suggested Instructional/Reading Materials**, **Practical Work** (group work, group/individual assignments, presentations), and **Assessment Criteria** (class test, mid-term, assignment evaluation, attendance, participation). These fold into the existing unit files and a per-course overview page (see Spec 006); they are not invented where the guide is silent.
7. **Assessment weighting**: for the affiliated GECEs (colleges), assessment is **60% summative and 40% formative** by default. Assessment blueprints in the pipeline follow this split; per-unit deviations must be justified in the unit spec.
8. **Accessibility**: semantic heading hierarchy, alt text on all images/diagrams, no color-only meaning, RTL-correct Urdu rendering.

## Article IV — Spec-Driven Development Law

1. **Order of work**: Constitution → Feature Spec → Plan → Tasks → Implementation → Review Gate. No implementation before its spec is approved.
2. Each feature lives in `specs/NNN-feature-name/` containing `spec.md` (what & why), `plan.md` (how), `tasks.md` (checklist with acceptance criteria).
3. A task is **Done** only when its acceptance criteria pass and the review gate (Article VII) is cleared.
4. Scope changes amend the spec first, then the code. "Spec drift" (code diverging from spec) is a defect.

## Article V — Architecture Principles

1. **Content and application are separate concerns.**
   - Content (the textbook) = Markdown/MDX in a Git repository, rendered by **Docusaurus**. Versioned, diffable, reviewable.
   - Application state (users, submissions, grades, feedback) = a managed backend (**Supabase**: Postgres + Auth + Row-Level Security + Storage). Docusaurus is static and MUST NOT be trusted with secrets or access control.
2. **Security lives in the backend.** Answer keys, grades, and submissions are protected by database Row-Level Security, never by "hidden" static pages. Anything shipped in the static bundle is public — treat it as such.
3. **Roles**: `student`, `teacher`, `admin` (curriculum owner). Role assignment for teachers requires admin approval (no self-declared teachers).
4. **One course = one content module.** Adding a course must never require changing platform code — only adding content folders + metadata.
5. **Offline-tolerant & low-bandwidth first**: the site must be usable on low-end mobile devices and unreliable connections common in Sindh. Budget: content pages usable at < 200 KB first load (excluding images), images lazy-loaded and compressed.
6. **Free-tier friendly**: initial deployment must run on free/low-cost tiers (e.g., Vercel/Netlify/GitHub Pages for the site, Supabase free tier for the backend) with a documented upgrade path.

## Article VI — Scope Discipline

1. **Build once, scale by semester.** The platform is built once. **All 8 semesters are scaffolded** (folders + metadata from the Scheme of Study and each guide's unit list). **Content-creation priority is Semesters 1–4** for the new 2026 scheme (Sem 1 → 2 → 3 → 4), then Semesters 5–8. The **golden unit** that sets the quality bar remains EFMP-301 (Educational Psychology), Unit 1.
2. Features not in an approved spec are out of scope. A parking lot (`specs/backlog.md`) captures ideas without blocking delivery.
3. Real-time features (live chat, video, notifications beyond email) are explicitly **Phase 3+** and require a new spec.

## Article VII — Review Gates

Before any unit or feature is marked complete:

| Gate | Checks | Owner |
|---|---|---|
| Content gate | CLO traceability • simple-English readability • Urdu parity & register • Bloom's tags • citations • accessibility | Curriculum owner |
| Engineering gate | Spec compliance • RLS policies tested • responsive/RTL rendering verified • Lighthouse performance pass | Developer |
| Teacher gate (per course, once) | One practicing teacher dry-runs the unit's activities & assessments | Pilot teacher |

## Article VIII — Data Protection & Ethics

1. Student data (grades, submissions) is confidential: visible only to the student, their enrolled teacher(s), and admin. Enforced via RLS, verified by tests.
2. Collect the minimum: name, email, role, enrollment. No CNIC, phone, or address in v1.
3. Passwords are never stored in plaintext (delegated to the auth provider). Google OAuth and email/password are the only sign-in methods in v1.
4. Students may request account deletion; deletion anonymizes submissions rather than destroying teacher gradebooks.

## Article IX — Amendment Procedure

Propose the change in writing → assess impact on existing specs → bump constitution version → update affected specs before touching code.

This procedure was followed for the 1.0 → 1.1 amendment (see rationale in the header): impact assessed on Specs 001, 003, 006 and the roadmap, all updated in the same change.

---
*Ratification pending review by the curriculum owner.*
