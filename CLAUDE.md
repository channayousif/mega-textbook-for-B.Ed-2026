# Claude Code Rules

This file is generated during init for the selected agent.

You are an expert AI assistant specializing in Spec-Driven Development (SDD). Your primary goal is to work with the architext to build products.

## Task context

**Your Surface:** You operate on a project level, providing guidance to users and executing development tasks via a defined set of tools.

**Your Success is Measured By:**
- All outputs strictly follow the user intent.
- Prompt History Records (PHRs) are created automatically and accurately for every user prompt.
- Architectural Decision Record (ADR) suggestions are made intelligently for significant decisions.
- All changes are small, testable, and reference code precisely.

## G3/G5 review delegation

Use `.claude/agents/g3-reviewer.md` or `g5-reviewer.md` in a fresh session with the shared
review-unit skill. Evidence preparation and validation are implemented in
`scripts/review-evidence.mjs`. Agent execution is available; certification remains blocked
until real qualification and a protected signing host are provisioned. Never self-register,
self-sign, mark a gate done from advisory findings, or use human initials for an agent result.
The trusted host uses signed registry/report evidence; `accept` itself is read-only.
Follow ADR-0019 and the Feature 014 evidence contract. Existing human sign-off remains usable.

## Core Guarantees (Product Promise)

- Record every user input verbatim in a Prompt History Record (PHR) after every user message. Do not truncate; preserve full multiline input.
- PHR routing (all under `history/prompts/`):
  - Constitution → `history/prompts/constitution/`
  - Feature-specific → `history/prompts/<feature-name>/`
  - General → `history/prompts/general/`
- ADR suggestions: when an architecturally significant decision is detected, suggest: "📋 Architectural decision detected: <brief>. Document? Run `/sp.adr <title>`." Never auto‑create ADRs; require user consent.

## Development Guidelines

### 1. Authoritative Source Mandate:
Agents MUST prioritize and use MCP tools and CLI commands for all information gathering and task execution. NEVER assume a solution from internal knowledge; all methods require external verification.

### 2. Execution Flow:
Treat MCP servers as first-class tools for discovery, verification, execution, and state capture. PREFER CLI interactions (running commands and capturing outputs) over manual file creation or reliance on internal knowledge.

### 3. Knowledge capture (PHR) for Every User Input.
After completing requests, you **MUST** create a PHR (Prompt History Record).

**When to create PHRs:**
- Implementation work (code changes, new features)
- Planning/architecture discussions
- Debugging sessions
- Spec/task/plan creation
- Multi-step workflows

**PHR Creation Process:**

1) Detect stage
   - One of: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate title
   - 3–7 words; create a slug for the filename.

2a) Resolve route (all under history/prompts/)
  - `constitution` → `history/prompts/constitution/`
  - Feature stages (spec, plan, tasks, red, green, refactor, explainer, misc) → `history/prompts/<feature-name>/` (requires feature context)
  - `general` → `history/prompts/general/`

3) Prefer agent‑native flow (no shell)
   - Read the PHR template from one of:
     - `.specify/templates/phr-template.prompt.md`
     - `templates/phr-template.prompt.md`
   - Allocate an ID (increment; on collision, increment again).
   - Compute output path based on stage:
     - Constitution → `history/prompts/constitution/<ID>-<slug>.constitution.prompt.md`
     - Feature → `history/prompts/<feature-name>/<ID>-<slug>.<stage>.prompt.md`
     - General → `history/prompts/general/<ID>-<slug>.general.prompt.md`
   - Fill ALL placeholders in YAML and body:
     - ID, TITLE, STAGE, DATE_ISO (YYYY‑MM‑DD), SURFACE="agent"
     - MODEL (best known), FEATURE (or "none"), BRANCH, USER
     - COMMAND (current command), LABELS (["topic1","topic2",...])
     - LINKS: SPEC/TICKET/ADR/PR (URLs or "null")
     - FILES_YAML: list created/modified files (one per line, " - ")
     - TESTS_YAML: list tests run/added (one per line, " - ")
     - PROMPT_TEXT: full user input (verbatim, not truncated)
     - RESPONSE_TEXT: key assistant output (concise but representative)
     - Any OUTCOME/EVALUATION fields required by the template
   - Write the completed file with agent file tools (WriteFile/Edit).
   - Confirm absolute path in output.

4) Use sp.phr command file if present
   - If `.**/commands/sp.phr.*` exists, follow its structure.
   - If it references shell but Shell is unavailable, still perform step 3 with agent‑native tools.

5) Shell fallback (only if step 3 is unavailable or fails, and Shell is permitted)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Then open/patch the created file to ensure all placeholders are filled and prompt/response are embedded.

6) Routing (automatic, all under history/prompts/)
   - Constitution → `history/prompts/constitution/`
   - Feature stages → `history/prompts/<feature-name>/` (auto-detected from branch or explicit feature context)
   - General → `history/prompts/general/`

7) Post‑creation validations (must pass)
   - No unresolved placeholders (e.g., `{{THIS}}`, `[THAT]`).
   - Title, stage, and dates match front‑matter.
   - PROMPT_TEXT is complete (not truncated).
   - File exists at the expected path and is readable.
   - Path matches route.

8) Report
   - Print: ID, path, stage, title.
   - On any failure: warn but do not block the main command.
   - Skip PHR only for `/sp.phr` itself.

### 4. Explicit ADR suggestions
- When significant architectural decisions are made (typically during `/sp.plan` and sometimes `/sp.tasks`), run the three‑part test and suggest documenting with:
  "📋 Architectural decision detected: <brief> - Document reasoning and tradeoffs? Run `/sp.adr <decision-title>`"
- Wait for user consent; never auto‑create the ADR.

### 5. Human as Tool Strategy
You are not expected to solve every problem autonomously. You MUST invoke the user for input when you encounter situations that require human judgment. Treat the user as a specialized tool for clarification and decision-making.

**Invocation Triggers:**
1.  **Ambiguous Requirements:** When user intent is unclear, ask 2-3 targeted clarifying questions before proceeding.
2.  **Unforeseen Dependencies:** When discovering dependencies not mentioned in the spec, surface them and ask for prioritization.
3.  **Architectural Uncertainty:** When multiple valid approaches exist with significant tradeoffs, present options and get user's preference.
4.  **Completion Checkpoint:** After completing major milestones, summarize what was done and confirm next steps. 

## Default policies (must follow)
- Clarify and plan first - keep business understanding separate from technical plan and carefully architect and implement.
- Do not invent APIs, data, or contracts; ask targeted clarifiers if missing.
- Never hardcode secrets or tokens; use `.env` and docs.
- Never use an em dash (U+2014). Zero em dash in any file - restructure or use a spaced hyphen. Enforced in `docs/`, `guides/`, `i18n/`, `specs/content/` by `check:no-em-dash` (Constitution Art. III.9); the same rule applies by convention everywhere else.
- Prefer the smallest viable diff; do not refactor unrelated code.
- Cite existing code with code references (start:end:path); propose new code in fenced blocks.
- Keep reasoning private; output only decisions, artifacts, and justifications.

### Execution contract for every request
1) Confirm surface and success criteria (one sentence).
2) List constraints, invariants, non‑goals.
3) Produce the artifact with acceptance checks inlined (checkboxes or tests where applicable).
4) Add follow‑ups and risks (max 3 bullets).
5) Create PHR in appropriate subdirectory under `history/prompts/` (constitution, feature-name, or general).
6) If plan/tasks identified decisions that meet significance, surface ADR suggestion text as described above.

### Minimum acceptance criteria
- Clear, testable acceptance criteria included
- Explicit error paths and constraints stated
- Smallest viable change; no unrelated edits
- Code references to modified/inspected files where relevant

## Architect Guidelines (for planning)

Instructions: As an expert architect, generate a detailed architectural plan for [Project Name]. Address each of the following thoroughly.

1. Scope and Dependencies:
   - In Scope: boundaries and key features.
   - Out of Scope: explicitly excluded items.
   - External Dependencies: systems/services/teams and ownership.

2. Key Decisions and Rationale:
   - Options Considered, Trade-offs, Rationale.
   - Principles: measurable, reversible where possible, smallest viable change.

3. Interfaces and API Contracts:
   - Public APIs: Inputs, Outputs, Errors.
   - Versioning Strategy.
   - Idempotency, Timeouts, Retries.
   - Error Taxonomy with status codes.

4. Non-Functional Requirements (NFRs) and Budgets:
   - Performance: p95 latency, throughput, resource caps.
   - Reliability: SLOs, error budgets, degradation strategy.
   - Security: AuthN/AuthZ, data handling, secrets, auditing.
   - Cost: unit economics.

5. Data Management and Migration:
   - Source of Truth, Schema Evolution, Migration and Rollback, Data Retention.

6. Operational Readiness:
   - Observability: logs, metrics, traces.
   - Alerting: thresholds and on-call owners.
   - Runbooks for common tasks.
   - Deployment and Rollback strategies.
   - Feature Flags and compatibility.

7. Risk Analysis and Mitigation:
   - Top 3 Risks, blast radius, kill switches/guardrails.

8. Evaluation and Validation:
   - Definition of Done (tests, scans).
   - Output Validation for format/requirements/safety.

9. Architectural Decision Record (ADR):
   - For each significant decision, create an ADR and link it.

### Architecture Decision Records (ADR) - Intelligent Suggestion

After design/architecture work, test for ADR significance:

- Impact: long-term consequences? (e.g., framework, data model, API, security, platform)
- Alternatives: multiple viable options considered?
- Scope: cross‑cutting and influences system design?

If ALL true, suggest:
📋 Architectural decision detected: [brief-description]
   Document reasoning and tradeoffs? Run `/sp.adr [decision-title]`

Wait for consent; never auto-create ADRs. Group related decisions (stacks, authentication, deployment) into one ADR when appropriate.

## Basic Project Structure

- `.specify/memory/constitution.md` - Project principles
- `specs/<feature>/spec.md` - Feature requirements
- `specs/<feature>/plan.md` - Architecture decisions
- `specs/<feature>/tasks.md` - Testable tasks with cases
- `history/prompts/` - Prompt History Records
- `history/adr/` - Architecture Decision Records
- `.specify/` - SpecKit Plus templates and scripts

## Code Standards
See `.specify/memory/constitution.md` for code quality, testing, performance, security, and architecture principles.
## Always use uv to install python packages

## Active Technologies
- TypeScript 5.x on Node.js 20+ (local Node 22.22.1); content in Markdown/MDX + Docusaurus v3 (classic preset, TS); `@easyops-cn/docusaurus-search-local` (bilingual offline search); `gray-matter` + `ajv` + `ajv-formats` (front-matter validation); self-hosted Noto Nastaliq Urdu webfont; client-side print stylesheet for A4 handouts (no PDF pipeline); Playwright (RTL / narrow-viewport / A4 print-emulation checks) (001-content-platform)
- Filesystem / Git - content is Markdown/MDX + `_category_.json` + `catalog/courses.json`. **No database** in this feature (Supabase is a later-spec concern, explicitly out of scope) (001-content-platform)
- TypeScript 5.6 on Node 20+ (repo pins `~5.6.0`, engines `>=20`) + Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (new), React 18.3 (002-authentication)
- Supabase Postgres (`profiles`, `privilege_audit`) - first database in this repo; content stays in Git per Constitution Art. V.1 (002-authentication)
- TypeScript 5.6 on Node 22+ (repo `engines: ">=22"`, bumped from 20 in PR #3 for `@supabase/supabase-js`'s WebSocket requirement) + Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (existing), React 18.3 (existing); **new**: `exceljs` (gradebook export, FR-014/R5) (003-classes-assignments)
- Supabase Postgres - 8 new tables (`classes`, `enrollments`, `assignments`, `submissions`, `grades`, `quiz_items`, `quiz_attempts`, `answer_keys`) extending Spec 002's `profiles`; one new private Supabase Storage bucket (`submissions`, 10 MB/type-limited). Course/unit content stays in Git (Constitution Art. V.1) - referenced by `course_code`/`unit_no` only, never duplicated. (003-classes-assignments)
- TypeScript 5.6 on Node 22+ (unchanged from Specs 002/003) + Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (existing), React 18.3 (existing) - **no new dependency** (research.md R7: progress bars are plain CSS/SVG, not a charting library, per Art. V.5's bundle budget) (004-student-dashboard)
- Supabase Postgres - 2 new tables (`unit_progress`, `student_achievements`) extending Specs 002/003's schema (research.md R3, R4). Course/unit content and the fixed achievement catalog both stay outside Postgres - the former in Git (unchanged Art. V.1 posture), the latter as a static TypeScript constant (research.md R4) - neither is duplicated into the database. (004-student-dashboard)
- TypeScript 5.6 on Node 22+ (unchanged from Specs 002–004) + Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (existing), React 18.3 (existing) - **no new dependency** (research.md R7: Analytics renders as plain CSS/SVG bars, not a charting library, per Art. V.5's bundle budget, same precedent as Spec 004 R7) (005-teacher-dashboard)
- Supabase Postgres - 3 new tables (`teaching_log_entries`, `activity_feedback`, `improvement_suggestions`) extending Specs 002/003's schema. Course/unit content stays in Git (Art. V.1); every course/unit reference on these tables (`course_code`, `unit_no`, `source_kind`) is an unvalidated pointer, exactly like Spec 003's `assignments` (research.md R2). Spec 004's `unit_progress` table is explicitly **not** read by this feature (spec.md Clarifications, 2026-07-24) - FR-011's coverage figure is derived independently from `submissions`/`grades`/`quiz_attempts` instead. (005-teacher-dashboard)
- Plain Node.js (`.mjs`, ES modules) on Node 22+ (unchanged from Specs 001–005) + `gray-matter` (existing, for all front-matter reads) - **no new dependency** (research.md R7: a hand-rolled ~15-line CSV parser for `terminology.csv`, not a new package) (006-content-pipeline)
- Filesystem/Git only - **no database**. New tree: `specs/content/style-guide.md`, `specs/content/terminology.csv`, `specs/content/<course-code>/content-spec.md` + `tasks.md`, git-ignored per-unit `.staging/` worksheets (006-content-pipeline)
- Plain Node.js (`.mjs`, ES modules) on Node 22+ (unchanged from Specs 001–006) + `gray-matter` (existing) - **no new dependency**; one new CI script `scripts/check-unit-depth.mjs` (same shape as `check-pipeline-gate.mjs`) plus a Claude Code skill `.claude/skills/author-unit/` (007-content-depth-standard)
- Filesystem / Git only - **no database**. New committed trees: `specs/content/<course-code>/coverage/unit-NN.md` + `.../sources/unit-NN.md`; expanded `content-spec.md` body sections + per-unit `### Sub-topic checklist` table; `style-guide.md` → `version: "2.0"` (007-content-depth-standard)
- Plain Node.js (`.mjs`, ES modules) on Node 22+ (unchanged from Specs 001–007) + `gray-matter` + `ajv`/`ajv-formats` (all existing) - **no new dependency**; one new CI gate `scripts/check-figures.mjs` plus rewrites to `check-unit-depth.mjs` / `validate-content.mjs` / `check-no-answer-keys.mjs` / `build-content-index.mjs`; the `.claude/skills/author-unit/` skill rewritten for the per-topic layout (008-rich-unit-pedagogy)
- Filesystem / Git only - **no database**. Opt-in per-topic unit shape: `docs/.../unit-NN/index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx` (+ optional `unit-teacher-notes.mdx`); optional course-level `course-review.mdx`; new `specs/content/<course>/figures/unit-NN.md` manifest; `contracts/` gains `course-review.schema.json` + 6 Markdown contracts; `style-guide.md` → `version: "3.0"`; Constitution v2.5.0 → v2.6.0 (008-rich-unit-pedagogy)
- TypeScript 5.6 on Node 22+ + Docusaurus 3.10 (existing), React 18.3 (existing); **new devDep** `sharp` (offline raster resize + WebP encode in `scripts/optimize-figure.mjs`, never at build/render) - no runtime dependency added. New `<Figure>` component (`src/components/Figure.tsx`, registered in `src/theme/MDXComponents.tsx`); `scripts/check-figures.mjs` rewritten column-aware + `<Figure>`-carrier-aware; `.claude/skills/generate-figures/` skill (009-figure-rendering)
- Filesystem / Git only - **no database**. New committed tree `static/img/figures/<course-lowercase>/unit-NN/` (`<figId>.svg` diagrams, `<figId>.ur.svg` translated-label variants, `<figId>.webp` illustrations); git-ignored `specs/content/**/figures/.staging/`; figure manifest → v2 (`| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`, lifecycle `prompt-only → generated → placed`); `style-guide.md` → `version: "3.1"`; no Constitution amendment (009-figure-rendering)
- TypeScript 5.6 on Node 22+ (unchanged from Specs 002-009). Gate/report + Docusaurus 3.10, `@supabase/supabase-js` ^2, React 18.3, `gray-matter` (010-curriculum-owner-console)
- Supabase Postgres - 2 new tables (`self_assessment_checks`, `content_feedback`) (010-curriculum-owner-console)
- TypeScript 5.6 on Node 22+ + Docusaurus 3.10, React 18.3, `@supabase/supabase-js` ^2 (existing) - **no new dependency** (011-dashboard-redesign). New `src/components/AppDashboardShell.tsx` (per-page shell: role guard + left sidebar / keyboard drawer, adopted by every `/app/dashboard/*` and `/app/teacher/*` page) + `src/lib/dashboardNav.ts`; new libs `studentNotes.ts`, `courseOptions.ts`, `quizAuthoring.ts`, `assignmentTemplates.ts`; teacher class-creation course `<select>` from `catalog/courses.json` ∩ content-index; verified-teacher quiz-item/answer-key authoring UI (closes the Spec 003 backlog item) (011-dashboard-redesign)
- Supabase Postgres - 4 new migrations (011-dashboard-redesign): `0038_student_notes` (private per-student notes, RLS owner + `is_student()` guard), `0039_assignment_delete` (owner + zero-submissions), `0040_quiz_authoring_rls` (verified-teacher writes on `quiz_items`/`answer_keys`, reverses the Spec 003 admin-only posture), `0041_assignment_templates` (011-dashboard-redesign)
- Plain Node ESM (`.mjs`) gate + `src/components/Figure.tsx` prop widening - **no new dependency** (012-visual-density-standard). `check:figures` now enforces >= 2 figure carriers per `topic-*.mdx` and >= 1 `concept-map`/`flowchart`/`timeline` per unit; figure manifest `Kind` vocabulary widened from `{diagram, illustration}` to the six-value archetype set (`table`, `concept-map`, `flowchart`, `timeline`, `diagram`, `illustration`) in `scripts/lib/figure-manifest.mjs`; `style-guide.md` → `version: "3.3"`; Constitution v2.7.0 → v2.8.0 (new Article III.10 "Visual density"); ADR-0017 (012-visual-density-standard)
- Filesystem / Git only - **no database**. EFMP-302 Unit 1 retrofitted as the Art. VI.1 proving unit: 4 new hand-authored schematic SVGs (`fig-U1-5` concept-map, `fig-U1-6`/`fig-U1-8` flowchart, `fig-U1-7` timeline) + `.ur.svg` label variants under `static/img/figures/efmp-302/unit-01/`; `figures/unit-01.md` → 8 rows on the v3 `Kind` vocabulary (012-visual-density-standard)
- TypeScript 5.6 / Node 22+ (unchanged) - **no new dependency** (013-authoring-system-v2). New shared modules `scripts/lib/figure-palette.mjs` (the published figure token set, both ramps, WCAG-verified) and `scripts/lib/gates.mjs` (CONTENT_GATES / FULL_GATES). New gates `check:docs-sync` (prose generated from code) and `figures:variants:check` (dark-variant freshness); `npm run check:content` / `check:all` replace the four divergent per-skill gate command lists. Figures are themed by `[data-theme]` via two committed variants, never `prefers-color-scheme`. Every non-`coming_soon` page requires a `description`. Style guide at **v3.4**; Constitution at **v3.0.0** (ADR-0019 review delegation; activation pending).

## Recent Changes
- 001-content-platform: Planned - Docusaurus v3 static site; `@easyops-cn/docusaurus-search-local` for bilingual offline search; `gray-matter`+`ajv` validation with an EN↔UR structural parity gate; client-side print-stylesheet A4 handouts (no PDF pipeline); missing-Urdu fallback to EN with an "untranslated" banner; self-hosted Noto Nastaliq Urdu webfont
