<!--
SYNC IMPACT REPORT (v2.1.0)
===========================
Version change: 2.0.0 → 2.1.0
Bump rationale: MINOR — a stated capability is narrowed, not reversed. Article V.3 previously
  granted "a user MAY switch their own role between these two" (student/teacher). Spec 002's
  clarify session (2026-07-18, Q1 answer D) established that the role is self-selectable at
  SIGN-UP ONLY and thereafter changeable by an admin alone, so a teacher cannot strand an
  active class by self-downgrading. No existing spec is invalidated (Spec 002 already encodes
  this as FR-010/FR-010a; Spec 001 does not touch roles). Detected by the Constitution Check
  gate during /sp.plan for 002-authentication and confirmed by the owner.

Modified: Article V.3 — "a user MAY switch their own role between these two" → roles are
  self-selectable at sign-up only; the role is immutable to the account holder afterwards and
  changeable only by an admin.

Downstream artifacts: specs/002-authentication/spec.md already aligned (FR-010, FR-010a,
  US3 acceptance scenario 5). ADR-0005 unaffected in substance (its verified_teacher gate
  stands); its role-switching prose should note the sign-up-only restriction.

--- prior report (v2.0.0) retained below ---

SYNC IMPACT REPORT
==================
Version change: 1.1.0 → 2.0.0
Bump rationale: MAJOR — backward-incompatible redefinition of a governance principle. The
  former non-negotiable rule "Teacher role assignment requires admin approval — no
  self-declared teachers" (Article V.3, reinforced by Article IX.3) is REVERSED: the teacher
  role is now self-selectable, and admin control moves to a separate `verified_teacher`
  capability that gates answer keys/restricted material. Reversing a stated non-negotiable is
  a breaking governance change even though no already-approved spec is invalidated (Spec 001
  does not touch roles; Spec 002 is being drafted to match). Source: /sp.clarify (2026-07-17)
  owner decision + ADR-0005.

Source: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  (Proposed) and specs/002-authentication/spec.md Clarifications (Session 2026-07-17).

Modified principles/articles:
  - Article V.3 — Roles: "Teacher role assignment requires admin approval — no self-declared
    teachers" → self-selectable `student`/`teacher` roles (default student; admin never
    self-selectable); teacher grants peer-teaching only; restricted-material access gated
    behind an admin-granted `verified_teacher` capability (default off). Renamed to
    "Roles and restricted-material access."
  - Article IX.3 — Authentication & Access: "Teacher-role elevation is an explicit admin
    action and MUST be recorded" → the audited admin action is now the `verified_teacher`
    grant (access to answer keys/restricted material); self-selecting teacher needs no approval.

Added sections: none.
Removed sections: none (the admin-approval obligation is relocated to the verified_teacher grant).

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — "Constitution Check" gate derives from this file
     at plan time; no hardcoded principle text; verified by grep (no admin-approval strings).
  ✅ .specify/templates/spec-template.md — mandatory sections compatible; no change needed.
  ✅ .specify/templates/tasks-template.md — no hardcoded principle references; no change needed.
  ⚠ .specify/templates/commands/*.md — directory absent/empty in this repo; nothing to reconcile.

Downstream artifacts updated in this amendment:
  ✅ SDD/ROADMAP.md — Decision #4 rewritten to match (self-selectable teacher + verified_teacher gate).

Follow-up TODOs:
  ✅ ADR-0005 is Accepted; the amendment landed in commit 9b996bd, and the ADR's Decision
     section was updated for the v2.1.0 sign-up-only narrowing.
  - Prior TODO carried forward: reconcile ROADMAP course catalog codes once specs/gaps.md
    G-2026-02..05 are resolved (GNAS code, Pakistan Studies placement, Fehm-e-Quran code, GSOS CH).
-->

# CONSTITUTION
## B.Ed (4-Year) Mega Textbook & Learning Platform
**University of Sindh, Faculty of Education, Elsa Kazi Campus, Hyderabad**

This constitution is the highest-authority document of the project. Every spec, plan, task,
and line of code MUST comply with it. Amendments require an explicit version bump and a
written rationale (Article X).

---

## Article I — Purpose

Build a bilingual (English + Urdu) digital textbook and learning platform for the B.Ed
(4-Year) programme (UGE Policy 2023 v1.1, aligned with HEC's 2025 Proposed Curriculum for
Education, applicable from 2026; 8 semesters, 132 credit hours), serving:

1. **Students** — as a primary or teacher-guided secondary learning resource.
2. **Teachers** — as a teaching companion (activities, handouts, formative/summative
   assessments) and a virtual class manager (assignments, grading, progress tracking).

## Article II — Guiding Document Supremacy

1. The **approved Scheme of Study** (`Scheme-and-Course-guides/B.Ed 4 Year board.docx`) and
   the **official course guides** (local folder `Scheme-and-Course-guides/`, covering all 8
   semesters — Sem I–II as PDF, Sem III–VIII as DOCX) are the sole source of truth for WHAT
   is taught.
2. No unit, SLO/CLO, activity, or assessment ships unless it traces to a course-guide item.
   Traceability MUST be recorded in each unit's front-matter (`clo_refs:` field).
3. If a course guide is ambiguous or missing, the gap MUST be logged in `specs/gaps.md` and
   escalated to the curriculum owner (Yousif) — never invented. All 8 semesters' guides are
   now text-extracted; open board-vs-guide discrepancies for Sems I/II (e.g. GNAS code,
   Pakistan Studies placement, Fehm-e-Quran code) are tracked in `specs/gaps.md`.

**Rationale:** Content authority derives from the university/HEC curriculum, not from
authors' preference; traceability makes accreditation review auditable.

## Article III — Content Quality Standards (non-negotiable)

1. **Simple English**: student-facing prose targets an accessible register for a fresh
   HSC/intermediate graduate. No graduate-level jargon without a bilingual glossary entry.
2. **Urdu parity**: every student-facing unit MUST have a complete, human-reviewed Urdu
   version before publish. Machine translation MAY draft; a human quality pass is mandatory.
   Register: academic-plain (درسی مگر عام فہم), not literary/archaic.
3. **Bloom's tagging**: every assessment item MUST carry a Bloom's-level tag. Formative sets
   skew Remember→Apply; summative sets MUST include Analyze or above.
4. **Pakistan-grounded examples**: case studies and examples use Pakistani/Sindh classroom
   contexts wherever the subject allows.
5. **Citations**: definitions and claims cite the course guide, HEC document, or a named
   academic source. Original prose only — no reproduction of copyrighted textbook passages.
   Each course guide's recommended books/resources are a permitted starting point — used for
   scoping and listed as bibliographic references only, never reproduced.
6. **Guide-section fidelity**: where a course guide provides them, every course/unit MUST
   incorporate the guide's **Teaching/Instructional Strategies**, **Suggested Practical
   Activities (optional)**, **Suggested Instructional/Reading Materials**, **Practical Work**
   (group work, group/individual assignments, presentations), and **Assessment Criteria**
   (class test, mid-term, assignment evaluation, attendance, participation). These fold into
   the existing unit files and a per-course overview page (see Spec 006); they MUST NOT be
   invented where the guide is silent.
7. **Assessment weighting**: for the affiliated GECEs (colleges), assessment is **60%
   summative and 40% formative** by default. Assessment blueprints in the pipeline follow
   this split; per-unit deviations MUST be justified in the unit spec.
8. **Accessibility**: semantic heading hierarchy, alt text on all images/diagrams, no
   color-only meaning, and RTL-correct Urdu rendering are required on every page.

## Article IV — Spec-Driven Development Law

1. **Order of work**: Constitution → Feature Spec → Plan → Tasks → Implementation → Review
   Gate. No implementation before its spec is approved.
2. Each feature lives in `specs/NNN-feature-name/` containing `spec.md` (what & why),
   `plan.md` (how), and `tasks.md` (checklist with acceptance criteria).
3. A task is **Done** only when its acceptance criteria pass and the review gate (Article
   VII) is cleared.
4. Scope changes amend the spec first, then the code. "Spec drift" (code diverging from
   spec) is a defect and MUST be fixed by realigning code or amending the spec.

## Article V — Architecture Principles

1. **Content and application are separate concerns.**
   - Content (the textbook) = Markdown/MDX in a Git repository, rendered by **Docusaurus**.
     Versioned, diffable, reviewable.
   - Application state (users, submissions, grades, feedback) = a managed backend
     (**Supabase**: Postgres + Auth + Row-Level Security + Storage). Docusaurus is static
     and MUST NOT be trusted with secrets or access control.
2. **Security lives in the backend.** Answer keys, grades, and submissions are protected by
   database Row-Level Security, never by "hidden" static pages. Anything shipped in the
   static bundle is public — treat it as such.
3. **Roles and restricted-material access.** The roles are `student`, `teacher`, and `admin`
   (curriculum owner). The `student` and `teacher` roles are **self-selectable at sign-up
   only** (default `student`) so a capable student MAY lead a peer study group. Once an
   account exists its role is **immutable to the account holder**: changing it is an admin
   action. This prevents a teacher from stranding an active class by self-downgrading. The
   `admin` role is **never** self-selectable — it is seeded or assigned only by an existing
   admin. The teacher role grants **peer-teaching
   capabilities only** (create classes, assign, give feedback, view own students' work); it
   MUST NOT by itself grant access to answer keys or other restricted teaching material.
   Access to restricted material is a separate **`verified_teacher` capability**, granted only
   by an admin (default off), enforced at the backend per Article V.2. (This reverses the
   former "teacher requires admin approval" rule; rationale and alternatives in ADR-0005.)
4. **One course = one content module.** Adding a course MUST NOT require changing platform
   code — only adding content folders + metadata.
5. **Offline-tolerant & low-bandwidth first**: the site MUST be usable on low-end mobile
   devices and unreliable connections common in Sindh. Budget: content pages usable at
   < 200 KB first load (excluding images); images lazy-loaded and compressed.
6. **Free-tier friendly**: initial deployment MUST run on free/low-cost tiers (e.g.,
   Vercel/Netlify/GitHub Pages for the site, Supabase free tier for the backend) with a
   documented upgrade path.

## Article VI — Scope Discipline

1. **Build once, scale by semester.** The platform is built once. **All 8 semesters MUST be
   scaffolded** (folders + metadata from the Scheme of Study and each guide's unit list).
   **Content-creation priority is Semesters 1–4** for the new 2026 scheme (Sem 1 → 2 → 3 → 4),
   then Semesters 5–8. The **golden unit** that sets the quality bar is EFMP-301
   (Educational Psychology), Unit 1.
2. Features not in an approved spec are out of scope. A parking lot (`specs/backlog.md`)
   captures ideas without blocking delivery.
3. Real-time features (live chat, video, notifications beyond email) are explicitly
   **Phase 3+** and require a new spec.

## Article VII — Review Gates

Before any unit or feature is marked complete, all applicable gates MUST pass:

| Gate | Checks | Owner |
|---|---|---|
| Content gate | CLO traceability • simple-English readability • Urdu parity & register • Bloom's tags • citations • guide-section fidelity • accessibility | Curriculum owner |
| Engineering gate | Spec compliance • RLS policies tested • responsive/RTL rendering verified • Lighthouse performance pass | Developer |
| Teacher gate (per course, once) | One practicing teacher dry-runs the unit's activities & assessments | Pilot teacher |

## Article VIII — Data Protection & Ethics

1. Student data (grades, submissions) is confidential: visible only to the student, their
   enrolled teacher(s), and admin. Enforced via RLS and verified by automated tests.
2. Collect the minimum: name, email, role, enrollment. No CNIC, phone, or address in v1.
3. Passwords are never stored in plaintext (delegated to the auth provider).
4. Students MAY request account deletion; deletion anonymizes submissions rather than
   destroying teacher gradebooks.

## Article IX — Authentication & Access

1. Google OAuth and email/password are the **only** sign-in methods in v1; any additional
   provider requires a new spec.
2. Every authenticated action MUST be authorized against the caller's role (Article V.3)
   at the database layer, not only in the UI.
3. **Verified-teacher elevation** — granting the `verified_teacher` capability (access to
   answer keys and other restricted material) — is an explicit admin action and MUST be
   recorded (who granted, when). Self-selecting the `teacher` role is not an elevation and
   requires no approval.

## Article X — Amendment Procedure & Versioning

1. **Procedure**: propose the change in writing → assess impact on existing specs, plans,
   and templates → bump this constitution's version → update affected specs before touching
   code.
2. **Semantic versioning** of this document:
   - **MAJOR**: backward-incompatible governance changes — a principle is removed or
     redefined in a way that invalidates existing specs.
   - **MINOR**: a new principle/article or a materially expanded requirement is added.
   - **PATCH**: clarifications, wording, or typo fixes with no change to obligations.
3. **Compliance review**: every plan's "Constitution Check" gate MUST verify alignment with
   the current version. Violations are tracked in the plan's Complexity Tracking table with
   justification or are rejected.

---

**Version**: 2.1.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-07-18
