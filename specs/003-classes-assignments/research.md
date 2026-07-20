# Phase 0 Research: Virtual Classes, Assignments & Assessments

**Feature**: 003-classes-assignments | **Date**: 2026-07-19 | **Spec**: [spec.md](./spec.md)

No `NEEDS CLARIFICATION` markers remain in the Technical Context — this feature extends the
existing architecture established by Spec 002 (self-hosted Supabase, RLS-only authorization, no
application server; ADR-0006/ADR-0007), so most "what stack" questions are already settled. The
open questions here are how nine feature-specific requirements map onto that architecture without
an application server and without letting restricted content leak into the Git-tracked static
bundle.

---

## R1 — Where do answer keys and quiz correct-answers live?

**Decision**: Exclusively in Supabase Postgres (`answer_keys`, `quiz_items.correct_option`),
gated by `is_verified_teacher()`/`is_admin()`. Never in Git/MDX.

**Rationale**: `contracts/unit-frontmatter.schema.json` and `contracts/course-overview.schema.json`
(Spec 001) already **forbid** `answer_key`/`answers`/`marking_scheme`/`rubric_answers` front-matter
keys, and `scripts/check-no-answer-keys.mjs` fails the build if any such content reaches
`docs/`, `i18n/`, or `build/`. This is a hard constitutional constraint (Art. V.2: "Anything
shipped in the static bundle is public — treat it as such"), not a Spec 003 choice to make.
`docs/semester-1/efmp-301/unit-01/teacher-notes.mdx` confirms the existing convention: it holds
teaching strategies, not answer keys — "no assessment items" is stated in its own
`blooms_summary`. FR-013's official answer key/marking rubric must therefore live in the
database, restricted the same way Spec 002 already built for exactly this purpose.

**Alternatives considered**: A gated static route (build-time exclusion + server-side proxy) —
rejected, would need an application server the constitution forbids (Art. V.1). Encrypting the
MDX and decrypting client-side — rejected, the decryption key would itself ship to every browser.

---

## R2 — How is a multiple-choice quiz auto-graded without an application server?

**Decision**: A `SECURITY DEFINER` Postgres RPC function, `submit_quiz_attempt(assignment_id,
answers jsonb)`, callable directly from the browser via PostgREST with the student's own JWT. It
looks up `quiz_items.correct_option` (bypassing RLS internally, like `is_admin()`), scores the
attempt, inserts one `quiz_attempts` row, and returns only the score — the correct answers never
leave the database.

**Rationale**: Matches the `is_admin()`/`is_verified_teacher()`/`current_profile_id()` pattern
already in `supabase/migrations/0004_is_admin.sql` and `0010_verified_teacher_gate.sql` — this
codebase's established idiom for "logic that must run with elevated privilege but is triggered by
an ordinary authenticated user," and needs no service-role key (unlike Spec 002's two Edge
Functions, which exist *because* `auth.admin.*` calls require the service-role key). No Edge
Function is needed anywhere in this feature — everything is a plain authenticated RLS write or a
`SECURITY DEFINER` RPC using the caller's own JWT.

**Alternatives considered**: Score client-side and trust the submitted score — rejected outright,
trivially forgeable. A new Edge Function — rejected, adds a service-role surface (Art. V.1 risk)
for a job plain Postgres already does safely.

---

## R3 — How does a class get auto-archived when its teacher's role/status changes?

**Decision**: A new `AFTER UPDATE OF role, status ON profiles` trigger,
`archive_classes_on_teacher_ineligibility()`, `SECURITY DEFINER`, added in Spec 003's own
migration (does not modify Spec 002's existing trigger set). Fires when `OLD.role='teacher' AND
NEW.role<>'teacher'`, or `NEW.status='suspended' AND OLD.status<>'suspended'`; archives every
`active` class owned by that profile.

**Rationale**: Direct extension of the exact pattern Spec 002 used for
`write_privilege_audit()` (also an `AFTER UPDATE ON profiles` trigger). `0010_verified_teacher_gate.sql`
explicitly anticipates this: its demo fixture comment says "Superseded, not extended, once Spec
003 lands... Spec 003 owns the actual answer-key/restricted-material tables" — confirming Spec
003 is expected to add its own migrations on top of, not inside, Spec 002's files.

**Alternatives considered**: Checking teacher eligibility lazily at read-time (compute "is this
class really live?" on every query) — rejected: FR-020 requires the class to *become* archived
(a durable, auditable state change, visible in exports/history), not merely appear archived to
viewers.

---

## R4 — How are upload type/size limits (FR-009) enforced without a server round-trip?

**Decision**: A private Supabase Storage bucket `submissions` configured with
`file_size_limit = 10485760` (10 MB) and an `allowed_mime_types` allowlist (PDF, DOC/DOCX, PNG,
JPEG), enforced by Storage itself at upload time. A `SECURITY DEFINER` helper,
`can_access_submission_file(path)`, backs the bucket's read policy so a teacher can download only
files belonging to their own classes and a student only their own.

**Rationale**: Supabase Storage supports these limits natively at the bucket-config level — no
custom validation code, no server in the middle, and the rejection is immediate and clear before
anything is recorded (FR-009's "rejected... before it counts as a submission attempt").

**Alternatives considered**: Validating type/size in a client-side check only — rejected as the
sole control, since it's trivially bypassable and wouldn't satisfy Art. IX.2 ("authorize... at
the database layer, not only in the UI" — the same principle extends to input constraints that
protect storage costs and the RLS/ownership boundary).

---

## R5 — How is the gradebook exported to a spreadsheet with correct Urdu names (FR-014, SC-007)?

**Decision**: Client-side generation of a native `.xlsx` file (not `.csv`) using `exceljs`,
dynamically imported only when the export action is triggered (not bundled into the base app
chunk). Data is queried straight from Supabase with the requesting teacher's own RLS-scoped
session — no export endpoint or server round-trip.

**Rationale**: `.xlsx` is UTF-8/Unicode-native, so Urdu names render correctly in any spreadsheet
program without the BOM/encoding workarounds `.csv` requires (a common source of "garbled
characters" bugs — the exact failure SC-007 is written to catch). No spreadsheet library exists
in `package.json` yet; `exceljs` is added as a new dependency, dynamically imported on the
gradebook page only, mirroring how Spec 002 kept `@supabase/supabase-js` off content pages to
protect the Art. V.5 bundle budget.

**Alternatives considered**: `xlsx` (SheetJS) — comparable capability, but `exceljs`'s streaming
writer and cleaner styling API are a better fit for a gradebook table; either would satisfy the
requirement, this is a low-stakes choice. Server-generated export — rejected, no application
server exists to generate it (Art. V.1).

---

## R6 — How is a Pakistan Standard Time deadline (FR-008) evaluated correctly?

**Decision**: Store all deadlines as `timestamptz` (UTC internally, as Postgres always does).
Comparisons (`now() > due_at`) are timezone-agnostic instant comparisons — PKT only matters for
*display* (formatting a UTC instant into `Asia/Karachi` wall-clock time for humans) and for
*input* (a teacher picking a due date/time is shown and edits it in PKT, converted to UTC on
save).

**Rationale**: This is the standard, correct way to handle a fixed-offset timezone deadline —
Pakistan does not observe DST, so `Asia/Karachi` is a constant UTC+5 offset with no ambiguity
window to design around. No new library or server-side cron is needed; the "evaluate in PKT"
requirement is satisfied by consistent instant comparison plus correct display formatting.

**Alternatives considered**: Storing due dates as naive local time strings — rejected, ambiguous
and error-prone across client timezones (a teacher grading from outside Pakistan, for instance).

---

## R7 — How does "best score of unlimited quiz retakes" (clarified 2026-07-19) get computed at 200-student scale?

**Decision**: A plain indexed aggregate — `max(score)` over `quiz_attempts` grouped by
`(assignment_id, student_id)`, exposed as a view `quiz_best_scores`. No cached/denormalized
"best score" column.

**Rationale**: At the feature's stated scale (SC-005: 200 students/class), an indexed `MAX()`
over a few dozen attempts per student is well within the <5s p95 budget with no caching
complexity. A cached column would need its own trigger-maintenance code for a problem the
database already solves in one indexed query — unjustified complexity at this scale.

**Alternatives considered**: A trigger-maintained `best_score` column on `quiz_attempts` or a new
per-student-per-assignment summary table — rejected as premature optimization; revisit only if a
future spec raises the scale target materially beyond SC-005.

---

## R8 — Join code format and collision handling

**Decision**: 6-character codes drawn from a 32-symbol alphabet that excludes visually ambiguous
characters (`0/O`, `1/I`): `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`. Generated by a Postgres function,
inserted with a `UNIQUE` constraint on `classes.join_code`; the rare `23505` collision (32⁶ ≈ 1.07
billion combinations, so a collision is a near-non-event at this project's scale) is retried by
the client.

**Rationale**: Matches the spec's own Assumptions ("comparable to widely used classroom tools");
short enough to read aloud or write on a board, the excluded characters prevent the single most
common transcription error in shared classroom codes.

**Alternatives considered**: UUID-based codes — rejected, unusable for FR-001's "short code
students share/type" requirement. A dedicated `join_codes` history table — rejected (over R9)
since old codes simply stop matching any row on reissue, requiring no separate tombstone record
for spec-compliant behavior (US1 AS3 only requires the old code to fail cleanly, not to report
*why* it failed).

---

## R9 — Reusable Spec 002 primitives this feature builds on

`is_admin(uid)`, `is_verified_teacher(uid)`, and `current_profile_id()` (all `SECURITY DEFINER`,
`supabase/migrations/0004_is_admin.sql` and `0010_verified_teacher_gate.sql`) are reused as-is
for every RLS policy and guard trigger in this feature. `0010`'s
`_verified_teacher_gate_demo` fixture table is dropped in this feature's first migration, per its
own comment ("Superseded, not extended, once Spec 003 lands").

All new foreign keys pointing at a person (`teacher_id`, `student_id`, `graded_by`,
`created_by`) reference `profiles(id)`, **not** `auth.users(id)` — required by Spec 002's
`profiles` design (`id` is independent of `auth_user_id` specifically so that Spec 003's rows
survive account deletion via the tombstone pattern, FR-019/FR-021).
