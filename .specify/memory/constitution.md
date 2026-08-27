<!--
SYNC IMPACT REPORT (v2.5.0)
===========================
Version change: 2.4.0 → 2.5.0
Bump rationale: MINOR — Article VI.1 gains a new, materially expanded requirement ("Standard
  versioning"): when the content quality standard is versioned up (the style-guide /
  terminology-bank freeze marker, Spec 006 FR-007), the golden unit MUST be re-proven at the
  new version as the immediate next content task after the proving unit, and a "working depth
  exemplar" fills the gap until it is. No existing principle is removed or redefined, and no
  approved spec is invalidated — Feature 007's approach (prove on EFMP-302 Unit 1, re-proof
  EFMP-301 Unit 1 as the tracked next task) is exactly what the new wording permits. Source:
  owner instruction, this session (Feature 007 planning surfaced the tension).

Modified: Article VI.1 — the golden unit (EFMP-301 Unit 1) is now named explicitly as "the
  canonical exemplar for unit structure, CLO/SLO traceability, and bilingual parity", and a
  "Standard versioning" paragraph is appended covering proving unit vs golden unit, the
  re-proof obligation, and the working-depth-exemplar fallback. Items VI.2 and VI.3 are
  unchanged and NOT renumbered (they are cross-referenced across specs/ and history/adr/).

Downstream artifacts reviewed this amendment (2026-08-27):
  ✅ .specify/templates/plan-template.md — "Constitution Check" derives generically, no
     hardcoded article numbers (confirmed at v2.4.0, unchanged); no edit needed.
  ✅ .specify/templates/spec-template.md — no hardcoded article references; no edit needed.
  ✅ .specify/templates/tasks-template.md — no hardcoded article references; no edit needed.
  ✅ specs/007-content-depth-standard/plan.md — Constitution Check VI.1 row + note + risks
     updated in the same branch to cite the amended VI.1 (re-proof of EFMP-301 Unit 1 is now
     an explicit constitutional obligation, tracked as the immediate next content task, not a
     mere "governance smell").
  ✅ specs/007-content-depth-standard/spec.md — Dependencies line referencing "Art. VI.1
     (golden-unit-first)" reworded to "Art. VI.1 (golden-unit exemplar + standard-versioning
     re-proof)".
  ℹ history/adr/0010 — references "Art. VI.1's golden-unit-first discipline"; still accurate,
     left as-is (an ADR records the decision as-of its date).

Follow-up TODOs:
  - Feature 007 execution MUST include (or immediately follow with) a tracked task to bring
    EFMP-301 Unit 1 to style-guide v2.0 per the amended VI.1.
  - Prior TODOs carried forward from v2.4.0 (author README.md; decide which spec owns the
    Student/Teacher Guide initial authoring; v2.3.0 carried items) — untouched by this
    amendment.

--- prior report (v2.4.0) retained below ---

SYNC IMPACT REPORT (v2.4.0)
===========================
Version change: 2.3.0 → 2.4.0
Bump rationale: MINOR — a new governance article is added (Article X — Documentation for
  Multiple Audiences); no existing principle is redefined or removed, and no approved spec is
  invalidated. Source: owner instruction, this session — "update for maintaining Project docs
  for different readers, mainly the main project docs as github readme, a student guide, teacher
  docs."

Added: Article X — Documentation for Multiple Audiences. Establishes three distinct,
  purpose-built documentation surfaces (README for contributors, Student Guide, Teacher Guide),
  each written for its own reader and never merged; ties their upkeep to the spec-drift rule
  (Article IV.4) and adds a Docs gate row to Article VII's review-gate table.

Renumbered: former Article X (Amendment Procedure & Versioning) → Article XI. The intro's
  "(Article X)" cross-reference updated to "(Article XI)".

Downstream artifacts reviewed this amendment (2026-07-20):
  ✅ .specify/templates/plan-template.md — "Constitution Check" section derives from this file
     generically (no hardcoded article numbers found via grep); no change needed.
  ✅ .specify/templates/spec-template.md — no hardcoded article references found; no change
     needed.
  ✅ .specify/templates/tasks-template.md — no hardcoded article references found; no change
     needed.
  ⚠ README.md — does not yet exist at repo root. Creating it satisfies this amendment's new
     Article X.1 obligation but is separate implementation work, not a constitution edit.
  ⚠ Student Guide / Teacher Guide — do not yet exist. No spec currently owns them; the natural
     home is a new or existing feature spec (see Follow-up TODOs) since Article X only mandates
     that they exist and stay in sync, not their authoring.

Follow-up TODOs:
  - Author `README.md` at repo root (contributor-facing: setup, build/test, contribution flow,
    links to specs/ADRs) — no spec currently tracks this; consider a small standalone task or
    folding into whichever spec next touches root-level project scaffolding.
  - Decide which feature spec owns the Student Guide and Teacher Guide's initial authoring (likely
    Spec 004/005's dashboards, since those are the first features giving students/teachers a
    workflow substantial enough to document) — flagged for the owner, not decided here.
  - Prior TODOs carried forward from v2.3.0 (additional English-only courses flagged the same
    way as GENG-300; Feature 001 Vercel-reference reconciliation; specs/gaps.md G-2026-02..05
    catalog-code reconciliation) — untouched by this amendment.

--- prior report (v2.3.0) retained below ---

SYNC IMPACT REPORT (v2.3.0)
===========================
Version change: 2.2.0 → 2.3.0
Bump rationale: MINOR — Article III.2's Urdu-parity requirement, previously unconditional for
  every student-facing unit, gains an explicit carve-out for courses designated English-only by
  the subject matter itself (e.g. GENG-300 Functional English). This materially narrows a
  non-negotiable content obligation rather than merely clarifying wording, so it is not a PATCH;
  it does not remove or invalidate any existing approved unit's requirements (no unit currently
  relies on the old unconditional wording — GENG-300 is still unauthored/`coming_soon`), so it is
  not MAJOR. Source: owner instruction, this session — "there are some english only courses that
  do not require urdu translation like Functional english."

Modified: Article III.2 — added the `bilingual: false` course-level exemption from the Urdu-parity
  gate, naming GENG-300 Functional English as the first instance.

Downstream artifacts updated in this amendment (same session, 2026-07-19):
  ✅ specs/001-content-platform/spec.md — new Clarifications entry (session 2026-07-19); FR-001
     and FR-003 amended with the `bilingual: false` exemption and its `/ur/` fallback behavior
     (no "not yet available" banner when the absence is by design); Key Entities' Course line
     updated.
  ✅ specs/001-content-platform/data-model.md — Course entity gains a `bilingual` field; Unit's
     per-language render "State" list gains the English-only-course case.
  ✅ contracts/course-overview.schema.json (and its specs/001-content-platform/contracts/ copy) —
     new optional `bilingual` boolean property, default `true`.
  ✅ scripts/validate-content.mjs — the EN<->UR structural-parity gate now reads the parent
     course's `bilingual` flag (via a new `isBilingualCourse()` helper) and skips entirely for
     English-only courses, regardless of `translation_status`.
  ✅ docs/semester-1/geng-300/course-overview.mdx — `bilingual: false` set (GENG-300 is the first
     course flagged this way).
  ✅ catalog/courses.json — GENG-300's entry gains `"bilingual": false` for reference; this file
     is a human/scaffold reference, not read by the validator.

Follow-up TODOs:
  - If additional English-only courses are identified beyond GENG-300, flag them the same way
    (`bilingual: false` in their `course-overview.mdx`) — no further code or spec change needed,
    the mechanism is general.
  - Prior TODOs carried forward from v2.2.0 (Feature 001 Vercel-reference reconciliation;
    specs/gaps.md G-2026-02..05 catalog-code reconciliation) — untouched by this amendment.

--- prior report (v2.2.0) retained below ---

SYNC IMPACT REPORT (v2.2.0)
===========================
Version change: 2.1.0 → 2.2.0
Bump rationale: MINOR — the backend hosting model is redefined (managed/hosted → self-hosted on
  project-controlled infrastructure) and a "free-tier friendly" cost mandate is relaxed to a
  "cost-controlled infrastructure" one. This changes an operational commitment, not a user-facing
  authorization or content principle, and does not invalidate any approved spec's requirements or
  acceptance criteria — Spec 002's migrations, RLS policies, and client code are the same
  self-hosted-or-cloud-portable Supabase OSS stack either way (see ADR-0006). Source: owner
  decision, this session — `#decision: we will go with selfhosted backend. we will need it in
  future also. we must have strong foundations` — confirmed via AskUserQuestion
  ("Self-hosted Supabase (Recommended)").

Modified: Article V.1 — "a managed backend (**Supabase**: ...)" → "a **self-hosted Supabase**
  stack ... running on infrastructure the project controls."
Modified: Article V.6 — renamed "Free-tier friendly" → "Cost-controlled infrastructure";
  "MUST run on free/low-cost tiers (e.g., Vercel/Netlify/GitHub Pages ..., Supabase free tier
  for the backend)" → runs on infrastructure the project already owns/controls; a future move
  to a metered vendor tier requires a new ADR.

Downstream artifacts updated in this amendment (same session, 2026-07-18):
  ✅ specs/002-authentication/plan.md — Technical Context and Constitution Check table rewritten
     for self-hosted (VPS + Kong:8000), a "Gate resolution (Art. V.1/V.6)" section added.
  ✅ specs/002-authentication/quickstart.md — §1 rewritten as a self-hosted Docker Compose
     walkthrough (verified against Supabase's own self-hosting docs, not assumed); §3 migration
     application and §7 Edge Function deployment rewritten for the self-hosted flow (no cloud
     `supabase link`/`functions deploy`); §4's admin-seeding SQL also fixed to key on
     `auth_user_id`, not `id` (a pre-existing, unrelated bug found while editing this section).
  ✅ specs/002-authentication/tasks.md — T063 no longer references a Vercel preview environment.
  ✅ SDD/ROADMAP.md — architecture diagram and Decision #1 updated to self-hosted; the
     "Domain & hosting" open question marked resolved.
  ⚠ specs/002-authentication/spec.md and research.md still use technology-agnostic or
     historical-alternative language ("a managed backend service", "rejected: Vercel serverless")
     — left as-is; spec.md is explicitly implementation-agnostic by its own framing, and
     research.md's line documents a rejected alternative, not a current claim.
  — Feature 001's plan.md/research.md/tasks.md (site hosting: "Vercel primary, GitHub Pages
     fallback") are **out of scope for this amendment** — that is ADR-0002's decision for the
     *site*, not this ADR's backend decision, and the site's actual hosting reality (nginx →
     apache2 on this VPS) predates and is independent of today's change. Left flagged, not fixed.

Follow-up TODOs:
  - Reconcile Feature 001's ADR-0002/plan.md Vercel references against the site's actual
    self-hosted deployment — a separate, pre-existing inaccuracy, not created by this amendment.
  - Prior TODO carried forward: reconcile ROADMAP course catalog codes once specs/gaps.md
    G-2026-02..05 are resolved (GNAS code, Pakistan Studies placement, Fehm-e-Quran code, GSOS CH).

--- prior report (v2.1.0) retained below ---

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
written rationale (Article XI).

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
   version before publish, **except units belonging to a course explicitly designated
   English-only** (e.g. GENG-300 Functional English, where the subject itself is the
   English language) — such courses are flagged `bilingual: false` in their course-overview
   metadata and are exempt from the Urdu-parity gate. Machine translation MAY draft; a human
   quality pass is mandatory for every course that is not so exempted. Register: academic-plain
   (درسی مگر عام فہم), not literary/archaic.
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
   - Application state (users, submissions, grades, feedback) = a **self-hosted Supabase**
     stack (Postgres + Auth + Row-Level Security + Storage) running on infrastructure the
     project controls, not a third-party managed tier. Docusaurus is static and MUST NOT be
     trusted with secrets or access control. (Rationale and alternatives in ADR-0006.)
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
6. **Cost-controlled infrastructure**: the platform runs on infrastructure the project already
   owns or controls rather than a metered vendor tier — the static site and the self-hosted
   Supabase backend (Art. V.1) share the project's existing server. This trades a hosted
   provider's free-tier caps and pause-on-inactivity risk for direct operational ownership
   (backups, upgrades, uptime). A future move to a managed or additional-cost tier requires a
   new ADR.

## Article VI — Scope Discipline

1. **Build once, scale by semester.** The platform is built once. **All 8 semesters MUST be
   scaffolded** (folders + metadata from the Scheme of Study and each guide's unit list).
   **Content-creation priority is Semesters 1–4** for the new 2026 scheme (Sem 1 → 2 → 3 → 4),
   then Semesters 5–8. The **golden unit** that sets the quality bar is EFMP-301
   (Educational Psychology), Unit 1 — the canonical exemplar for unit structure, CLO/SLO
   traceability, and bilingual parity.

   **Standard versioning.** The content quality standard is versioned by the
   `specs/content/style-guide.md` + terminology-bank freeze marker (Spec 006 FR-007). When
   that standard is bumped to a new version, the raised bar is first demonstrated on one
   **proving unit** (which need NOT be the golden unit). The golden unit MUST then be brought
   to the new standard version as the **immediate next content task after the proving unit**,
   recorded as a row in its course's pipeline task tracker; the version bump itself is not
   blocked on it. Until the golden unit is re-proven at the current standard version, the most
   recently accepted unit authored at that version is the **working depth exemplar** in its
   place.
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
| Docs gate | A shipped spec that changes a student/teacher workflow or contributor setup updates the matching guide (Student Guide, Teacher Guide, or README — Article X) in the same branch | Feature author |

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

## Article X — Documentation for Multiple Audiences (non-negotiable)

1. The project MUST maintain three distinct, purpose-built documentation surfaces. Each is
   written for one reader and MUST NOT be merged into a generic catch-all document:
   - **README** (`README.md`, repo root) — for developers and contributors: what the project
     is, local setup, how to build/test, contribution flow, and links to `specs/`, ADRs, and
     the constitution. Technical register; assumes engineering literacy.
   - **Student Guide** — for students: how to navigate the platform, join a class, submit
     work, read grades, and use the dashboard. Plain-English register per Article III.1,
     extended here from curriculum prose to app/workflow text; bilingual per Article III.2,
     since it is student-facing.
   - **Teacher Guide** — for teachers: class, assignment, and grading workflows, the teacher
     dashboard, and what `verified_teacher`-gated features unlock. Written for a pedagogical,
     non-technical reader; describes role capabilities, never implementation.
2. **Stay-in-sync obligation**: a spec that changes a student- or teacher-facing workflow MUST
   update the corresponding guide in the same feature branch; a spec that changes contributor-
   facing setup or process MUST update the README likewise. This extends the spec-drift rule
   (Article IV.4) to these three surfaces — a stale guide is a defect, not a later cleanup task.
3. **No substitution between surfaces**: a developer setting up the repo MUST NOT need to read
   the Student or Teacher Guide, and a student or teacher MUST NOT be pointed at the README or
   `specs/` to learn how to use the platform.
4. **Location & format**: `README.md` is plain Markdown at repo root, GitHub-rendered. The
   Student Guide and Teacher Guide are bilingual Docusaurus-rendered pages (reusing the same
   content pipeline as curriculum material, per Article V.1's content/app separation — these are
   platform-usage docs, not curriculum content) and are reachable from in-app navigation for the
   relevant signed-in role.

**Rationale:** distinct readers have distinct goals and vocabularies. A single combined
document either drowns non-technical readers in engineering detail or starves contributors of
the internals they need. Article III's Simple English mandate governs curriculum content; this
article extends the same plain-language discipline to platform-usage docs for students and
teachers specifically, while keeping the README technical and separate.

## Article XI — Amendment Procedure & Versioning

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

**Version**: 2.5.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-08-27
