# Phase 0 Research: Curriculum-owner console and the content-improvement loop

Ten decisions resolve every fork this feature raises. No `NEEDS CLARIFICATION` markers
remain - both spec.md clarify-session questions (2026-09-05) are answered, and every
open design question below is closed by an explicit choice with rejected alternatives.

## R1 - Self-assessment interactivity without touching topic source

**Decision**: the checklist stays exactly what Spec 008 already writes -
`## Self-assessment checklist` followed by `- [ ] statement` lines, zero new front matter,
zero new import in `topic-NN.mdx` (FR-008). Interactivity is layered on top, client-side,
by a new swizzled wrapper (`src/theme/DocItem/Content.tsx`, alongside the already-swizzled
`DocItem/Footer.tsx`) that, after the page mounts: reads `topic_no` from `useDoc()`'s front
matter (absent on every page except `topic-NN.mdx` - the gate reserves this section to
per-topic units, per `contracts/topic-cycle.md`); if present, locates the heading Docusaurus's
own slugger already assigns the id `self-assessment-checklist` to; walks forward to the
following `<ul>`; and, for each `<li><input type="checkbox" disabled></li>` in document order,
removes `disabled`, wires an `onChange`, and uses **the item's position in that list** as its
identity - never its text, which can be edited by an author at any time (FR-009).

**Rationale**: Docusaurus's MDX-to-HTML pipeline already renders a GFM task list as
`<input type="checkbox" disabled>`; hydrating those exact nodes is strictly additive to the
render, touches no content file, and needs no new dependency. The heading-id selector is the
same "stable anchor Docusaurus derives from the heading text" idiom `findNearestSectionAnchor`
(Spec 005, `DocItem/Footer.tsx`) already relies on for its own section anchor.

**Alternatives considered**: (a) a new `<SelfAssessmentChecklist>` MDX component the author
imports into every topic file, mirroring `<Figure>` - rejected, it fails FR-008 outright and
would touch all authored topics again; (b) a remark plugin transforming the section at build
time - rejected, adds a build-time dependency for what a `useEffect` DOM walk does for free and
is harder to reason about for RTL/Urdu pages where the same heading text is translated (the id
would differ per locale, so the component reads the *position* of the "Self-assessment
checklist" heading among the doc's headings rather than hardcoding an English id - see R2).

## R2 - Locale-proof heading lookup

**Decision**: locate the checklist heading by matching `useDoc().toc` for the entry whose
**level and position** corresponds to the sixth `##` heading of a topic cycle (contract:
`topic-cycle.md`, part 6 of 9) rather than by literal id/text match, so the Urdu page (with a
translated heading, e.g. "خود جانچ کی فہرست") still finds it. As a defensive fallback, if the
component ever finds more or fewer than nine top-level `##` entries in `toc` (a legacy unit, or
a not-yet-migrated topic file), it renders nothing extra - the plain, disabled checkboxes stay,
degrading to exactly today's non-interactive read (FR-002's "remain fully readable... for every
visitor" is satisfied either way, since the underlying markdown never changes).

**Rationale**: keeps the interactivity strictly additive and never a hard requirement for the
page to render; a checklist section that doesn't match the expected shape simply stays static
text, matching the constraint that a richer feature must never break the plain-English guarantee
gate for units this feature doesn't reach yet.

## R3 - Item identity: position + wording snapshot, never free text

**Decision**: the persisted row's identity is
`(student_id, course_code, unit_no, topic_no, locale, item_position)`, one-based, with a
`item_text_snapshot` column holding the item's normalized text (`trim` + collapse internal
whitespace) at the moment it was last ticked. On load, the component compares each rendered
item's normalized text against any stored row's snapshot at that position; a mismatch is treated
as "this position's meaning changed" (FR-009) - the item renders **unticked** regardless of the
stored `checked` value, and the stored row is left alone (not deleted) until the student
explicitly acts on the item again, at which point the write overwrites both `checked` and
`item_text_snapshot` for that position. A reordering or removal (edge case) is indistinguishable
from a wording change under this rule and is handled identically - by design, since the gate
guarantees EN/UR item counts and order match (spec.md Assumptions), so this only ever fires on a
genuine author edit.

**Rationale**: matches the edge cases verbatim ("stored ticks that point at a position that no
longer exists are ignored; remaining ticks align to current items by position") without needing
a stable per-item id the content format doesn't have and FR-008 forbids adding.

## R4 - Signed-out storage and the merge-then-delete mechanism

**Decision**: `localStorage`, keyed `sa:<courseCode>:<unitNo>:<topicNo>:<locale>:<position>` ->
`{checked, text}`, exactly mirrors the account row shape. On every signed-in load, the component
merges whatever `sa:`-prefixed keys currently exist (in practice, usually none - a signed-in
session's own writes go straight to the account, never through `localStorage`): for every local
key whose `(course, unit, topic, locale, position)` tuple has **no** existing account row, insert
one (`checked`, `item_text_snapshot: text`) from the local value via `mergeLocalChecks()`'s
`ignoreDuplicates: true` upsert; a tuple the account already has a row for is left untouched (the
account's history wins, per the clarification). On a successful call (whether it inserted or was
a no-op against an existing row), the attempted local keys are **deleted** - reconciliation with
the account is what retires a local key, not a separate one-time flag.

**Implementation drift (post-implementation fix, found by `tests/e2e/self-assessment-checklist.
spec.ts`)**: the original design gated this behind a persistent `sa-merged:<profileId>`
`localStorage` flag, set after the first successful merge attempt regardless of whether it found
anything to merge. That broke the exact case it exists for: a student's very first sign-in on a
device (zero local ticks yet) still counts as a trivially-successful merge, so the flag got set
immediately - permanently disabling every *later* sign-out-then-tick-then-sign-in cycle on that
device, since `runMergeIfNeeded` returned at its very first line once the flag existed. The
merge-then-delete design above has no such flag: idempotency comes entirely from
`ignoreDuplicates: true` at the database layer (a duplicate/conflicting local entry is safely
ignored, never overwrites the account) plus deleting a key once it has been reconciled either
way, so repeated sign-out/sign-in cycles over the device's whole lifetime each correctly attempt
whatever local data exists at that moment - not just the first one.

**Rationale**: this is exactly the clarified behavior (session 2026-09-05, Q2) expressed as the
smallest possible client-side operation - one batched upsert per signed-in load (a no-op when
there is nothing local to merge), no new table, no server-side merge logic, and it composes with
R3's position-keyed identity without change.

**Alternatives considered**: merging on every page load using a plain overwrite-upsert (no
`ignoreDuplicates`) - rejected, it would re-import stale local ticks even after the student had
since unticked the same item on another device, silently overwriting their own later action;
explicitly ruled out by "after that first merge, the account's own record is authoritative." The
design actually shipped (above) also attempts a merge on every signed-in load, but safely - the
`ignoreDuplicates: true` upsert can only ever *add* a position the account has no row for yet, it
can never overwrite one the account already has, so running it repeatedly (once per sign-in, for
the device's whole lifetime) is exactly as safe as running it once and carries none of this
alternative's risk. A persistent one-time flag (the design initially shipped with) was considered
unnecessary in hindsight and was removed after it caused the regression described above.

## R5 - Progress roll-up needs a per-topic item count, sourced once

**Decision**: extend `scripts/build-content-index.mjs`'s existing per-topic record (Spec 003
T034) with one new field, `self_assessment_count`, computed by a **shared** helper,
`countChecklistInSection()`, extracted out of `scripts/check-unit-depth.mjs` into
`scripts/lib/mdx-sections.mjs` and imported by both scripts - not re-implemented a third time.
The Progress area (FR-004) then computes a topic's completion fraction as
`(distinct ticked positions <= self_assessment_count) / self_assessment_count`, summed across a
unit's topics for the unit figure and across a course's units for the course figure, using the
already-fetched `content-index.json` the Progress area (Spec 004) and Assignments picker
(Spec 003) both already `fetch()` at runtime.

**Rationale**: the count must come from content, not be hand-maintained in Postgres (Art. V.1);
`build-content-index.mjs` already walks every topic file once per build and is the established
place a per-topic derived number is added to the existing JSON asset, with zero new endpoint.
Extracting the counting regex to a shared module (rather than copying `check-unit-depth.mjs`'s
private `countChecklistInSection`) is what lets this and Article's "no divergent second
implementation" posture (echoed in FR-033 for the Story 4 report) both hold for free.

## R6 - Reader feedback capture scope is the Spec 008 file set, not every page

**Decision**: the feedback control (comment button + optional passage capture) renders only on
the five page kinds spec.md's own acceptance scenarios name by shape: a per-topic unit's
`index.mdx` (**unit opening**), `topic-NN.mdx` (**topic**), `unit-assessment.mdx`,
`unit-teacher-notes.mdx` (**unit-teacher-notes**), and a course-level `course-review.mdx`
(**course-level review**). A legacy five-file unit (`activities.mdx`/`formative.mdx`/
`summative.mdx`/`teacher-notes.mdx`, no `topic-*.mdx` present) gets no reader-feedback control in
this feature - only the existing teacher-only "suggest improvement" control (FR-016, unchanged).
Page kind is derived from the file's own path segment, the same `deriveSourceKindFromPath`
idiom `DocItem/Footer.tsx` already uses for the teacher activity-feedback control, extended with
one more branch per kind.

**Rationale**: the clarification session's answer ("every content page in a unit... matching the
reach of the existing teacher suggest-improvement flow") names exactly these five kinds by their
Spec 008 filenames in its own wording and in every acceptance scenario ("unit opening,
unit-assessment, unit-teacher-notes, or course-level review page (**not a topic file**)" - AS4).
Reading it as "literally every doc page regardless of shape" would require inventing a `page_kind`
value for `activities.mdx`/`formative.mdx`/`summative.mdx` the spec never names and no acceptance
scenario exercises; the five-kind reading is the one every acceptance scenario is written against.

## R7 - Passage capture is `window.getSelection()`, no annotation library

**Decision**: on `mouseup`/`touchend` inside the rendered doc body, read
`window.getSelection().toString()`; if non-empty and the click originated on a "give feedback on
this passage" affordance, cap it client-side at 2,000 characters (reject with a message above
that, matching FR-017's cap) and capture up to 100 characters of the selection's own containing
block's text immediately before and after it as `passage_context` (best-effort re-location
material, never itself displayed). The nearest section is found by the identical
`findNearestSectionAnchor` walk `SuggestImprovementControl` (Spec 005) already runs over
`useDoc().toc`, extracted to a shared `src/lib/docPosition.ts` so both controls import one
implementation. Selection direction (LTR body text vs. RTL Urdu) is irrelevant here -
`Selection.toString()` already returns text in **logical reading order**, not visual order,
which is exactly what the edge case ("the stored quote is in reading order, not visual order")
requires with no extra handling.

**Rationale**: `window.getSelection()` is a standard browser API - zero new dependency (repo
Assumption: "No new third-party library is added for text selection/anchoring"). A real
annotation library (Hypothesis-style range anchoring, `dom-anchor-text-quote`, etc.) would solve
re-location more robustly but is exactly the complexity Story 2's own framing rejects ("Best-effort
passage re-location built in-house rather than adopting an annotation library" - one of the four
`/sp.adr` candidates spec.md names).

## R8 - Two new tables, not a shared generic "feedback" table

**Decision**: `self_assessment_checks` and `content_feedback` are two distinct tables, not one
generic polymorphic "student activity" table, and `content_feedback` is itself distinct from
Spec 005's existing `improvement_suggestions` (a third, admin-facing feedback stream - the
`/sp.adr` candidate #1 spec.md names). See `data-model.md` for full schemas.

**Rationale**: the three streams have materially different shapes and access rules -
`self_assessment_checks` is student-own-only + admin-aggregate-only (never teacher-visible, Art.
VIII.1); `content_feedback` is author-own + admin-all with a four-state lifecycle and passage
anchoring; `improvement_suggestions` is teacher-filed with a five-state lifecycle and no passage
concept at all. A shared polymorphic table would need nullable columns for whichever shape
doesn't apply, weaker RLS predicates (a single `USING` clause trying to express three different
visibility rules), and a shared status enum wide enough to be meaningless for any one stream -
exactly the kind of accidental coupling Spec 005's plan already rejected once for a smaller
version of the same question (its own `activity_feedback` vs. `improvement_suggestions` split).

## R9 - The content/figure status report reuses the gates' own parsing, not a new walk

**Decision**: extract the manifest table parser and per-row status logic already in
`scripts/check-figures.mjs` into `scripts/lib/figure-manifest.mjs`, and the per-unit
authored/planned + language-completion + depth-check-pass/fail computation already in
`scripts/check-unit-depth.mjs`'s `checkUnit()`/`checkTopic()`/`checkLegacy()` into
`scripts/lib/unit-depth.mjs`, changing each function's contract from "push to a shared `errors`
array" to "return a small result object" the calling gate script then turns into `err()` calls
exactly as before (byte-for-byte behavior preserved - both `check-figures.mjs` and
`check-unit-depth.mjs` keep passing their existing fixture tests unchanged). The new
`scripts/report-content-status.mjs` (Story 4) imports the same two shared modules, walks `docs/`
once (the same `dirs()`/`topicFilesIn()` idiom every other content script uses), and assembles a
per-course/per-unit record from their return values plus each row's production `Status` -
**never re-parsing a manifest or re-deriving a depth verdict itself**.

**Rationale**: this is FR-033 verbatim ("MUST reuse the existing manifest-reading and
depth-check logic rather than re-deriving it, so it cannot drift from the gates"). Shelling out
to the two gate scripts as child processes and scraping their console output was considered and
rejected - it would give pass/fail, not the granular per-course counts and the pending-figures
list Story 4's acceptance scenarios require, and parsing another script's human-readable stderr
as a data format is exactly the kind of coupling a shared library call avoids.

## R10 - "Refresh" is a re-fetch of a build-time artifact, not a live re-run

**Decision**: `report-content-status.mjs` writes `static/content-status.json` (same convention
as `content-index.json`), including a `generated_at` timestamp, and runs from `prestart`/
`prebuild` (alongside the existing `build-content-index.mjs` call) plus one new, explicitly
non-blocking CI step (`|| echo "::warning::..."`, the same posture as the existing Lighthouse
step) - never gating the build (FR-032). The console's "content-status refresh" control (FR-028,
Story 6) re-`fetch()`s that same JSON file and displays its `generated_at`; it does **not**
trigger a live rebuild. A genuinely fresh number only appears after the next deploy, which the
project's existing CI-gated cron pipeline already produces on every merge to `main` (no new
deploy-trigger infrastructure is introduced by this feature).

**Rationale**: the site is a static Docusaurus build with no application server (Art. V.1); the
only process that can re-walk `docs/` is a build. Inventing a way for a browser button to
shell out to a fresh git checkout would mean either a new privileged Edge Function with
filesystem/build access (a real new attack surface and infrastructure cost the Constitution's
cost-controlled-infrastructure principle, Art. V.6, weighs against for a P3 convenience) or a
webhook into the existing deploy cron (still a new authenticated trigger surface). Re-fetching
the artifact the next real deploy already refreshes is the smallest change that still lets the
owner see a real "last produced" time and never claims data is fresher than it is.

## Spec refinements applied during planning (Constitution Art. IV.4)

None required a spec.md edit - every fork above is a plan-level implementation decision within
spec.md's stated Assumptions and Clarifications (self-assessment position-keying, the five-kind
feedback scope, and the report's reuse-not-rederive rule were all already implied or explicit;
this research.md just pins the exact mechanism).
