# Quickstart: Curriculum-owner console and the content-improvement loop

## 1. Apply migrations (order matters)

Against the self-hosted Supabase instance (same flow as Specs 002-005's `quickstart.md`):

```bash
supabase/migrations/0032_self_assessment_checks.sql
supabase/migrations/0033_content_feedback.sql
supabase/migrations/0034_content_feedback_author_role_trigger.sql
supabase/migrations/0035_content_feedback_status_transitions.sql
supabase/migrations/0036_self_assessment_checks_student_role_guard.sql
supabase/migrations/0037_content_feedback_guest_access.sql
```

`0036` is a post-implementation addition (not in the original plan): RLS regression testing
found that `self_assessment_checks_insert`/`_update`'s `student_id = current_profile_id()`
check says nothing about the caller's *role*, so a teacher could insert a row naming their own
profile id and read it straight back - `0036` adds an `is_student()` helper (mirrors
`is_admin()`) and requires it in both policies' `WITH CHECK`, closing the gap at the database
layer to match `DocItem/Content.tsx`'s client-side role gate (Constitution Art. IX.2).

`0037` is a second post-implementation follow-up (2026-09-07, curriculum-owner request): opens
`content_feedback` to a signed-out guest, nullable `author_id` + `guest_email`/
`guest_confirmation_token`/`guest_confirmed_at`, plus `confirm_guest_feedback()` (`SECURITY
DEFINER`, `anon`-executable). See "6. Guest feedback (Edge Function + Resend)" below for the
non-SQL half of this change - it does not work from the migration alone.

`0032` includes its own `enforce_self_assessment_immutable_identity()` guard trigger and RLS in
one file (mirrors the single-file precedent of `0024_unit_progress.sql`); `content_feedback`'s
guard trigger is split into its own file (`0035`) to mirror Spec 005's `0030`/`0031` split, since
it is the more complex, multi-transition trigger.

## 2. Refactor the two gate scripts before writing the report (Story 4 depends on this)

1. Extract `scripts/check-figures.mjs`'s manifest-table parser and per-row status logic into
   `scripts/lib/figure-manifest.mjs`, exporting `parseManifest()` and a `figureStatusFor(unitDir,
   ...)`-shaped function. Re-run `tests/unit/figures-gate.test.mjs` - it MUST still pass
   unchanged (the extraction is behavior-preserving).
2. Extract `scripts/check-unit-depth.mjs`'s `checkLegacy()`/`checkTopic()` computations (minus
   the `err()` side effects) into `scripts/lib/unit-depth.mjs`, returning a result object the
   gate script converts to `err()` calls exactly as before. Re-run the depth-gate fixture tests -
   same requirement.
3. Extract `countChecklistInSection()` (currently private to `check-unit-depth.mjs`) into
   `scripts/lib/mdx-sections.mjs` and have both `check-unit-depth.mjs` and
   `build-content-index.mjs` import it (research.md R5).

Only after all three extractions pass their existing tests unchanged, write
`scripts/report-content-status.mjs` importing the three shared modules (FR-033 - it must not
re-derive any of this logic itself).

## 3. Wire the report into the build and CI

- `package.json`: add `"check:content-status": "node scripts/report-content-status.mjs"`; add it
  to `prestart`/`prebuild` alongside the existing `build-content-index.mjs` call.
- `.github/workflows/ci.yml`: add a step after "Figure marker gate" -
  `run: npm run check:content-status || echo "::warning::content-status report failed"` -
  informational only, never blocking (FR-032).

## 4. Frontend build order

1. `src/lib/selfAssessment.ts` - upsert/read/aggregate helpers over `self_assessment_checks`
   (mirrors `unitProgress.ts`'s shape).
2. `src/theme/DocItem/Content.tsx` (new swizzle) - the hydration logic in
   `contracts/self-assessment-hydration.md`.
3. `src/lib/contentFeedback.ts` - submit/read-own/admin-queue/transition/`exportUnitFeedback()`
   helpers (mirrors `suggestions.ts`'s shape).
4. `src/lib/docPosition.ts` - extract `findNearestSectionAnchor()` out of `DocItem/Footer.tsx` so
   both the existing "Suggest improvement" control and the new feedback control share it.
5. `DocItem/Footer.tsx` - add the reader feedback control (any signed-in reader, the five page
   kinds from research.md R6), alongside the existing student/teacher controls already there.
6. `src/components/OwnerConsoleGuard.tsx` - the owner-only gate for `/app/admin/overview`,
   mirroring `StudentDashboardGuard.tsx`'s dedicated-message pattern (US3 AS4).
7. `src/pages/app/admin/overview.tsx` - the console (Story 3): content-status panel (reads
   `/content-status.json`), feedback-queue summary + inline triage (links to `feedback-queue.tsx`
   below), self-assessment aggregate panel, progress aggregates (reuses Spec 004/005 query
   helpers).
8. `src/pages/app/admin/feedback-queue.tsx` - the full triage queue (Story 2): filter, quoted
   passage in context, status transitions, export button.
9. `src/pages/app/dashboard/progress.tsx` - extend with the self-assessment roll-up panel
   (Story 1 FR-004), separate from the existing unit-coverage panel.

## 5. The revision procedure (Story 5)

1. From `feedback-queue.tsx`, the owner exports one unit's open/planned items
   (`exportUnitFeedback()`, Markdown, downloaded or copied).
2. The owner runs the `.claude/skills/revise-topic/` skill (new, this feature), pointing it at
   the export. The skill: reads each named file, proposes a minimal edit addressing each quoted
   passage/comment, mirrors the edit into the file's translation, and runs `npm run
   validate:content && npm run check:depth-gate && npm run check:figures && npm run
   check:no-answer-keys && npm run check:no-em-dash && npm test`.
3. A quoted passage no longer found verbatim in its file is reported as stale and skipped (edge
   case) - never guessed at.
4. After the owner reviews and merges the change set, they return to `feedback-queue.tsx` and
   explicitly resolve (or decline) each addressed item, optionally citing the merge commit/PR as
   `resolution_ref` (FR-024 - the skill itself never touches `status`).

## 6. Guest feedback (Edge Function + Resend) — 2026-09-07 follow-up

`0037`'s schema half is not enough on its own — a signed-out submission needs its own
server-side validation and a confirmation email, which is exactly what
`supabase/functions/guest-feedback-submit/` exists for (self-hosted Edge Functions, same
deploy mechanism as `admin-suspend`/`admin-list-users` — see `specs/002-authentication/
quickstart.md` §7, "Edge Functions — admin user list, suspension & deletion").

1. Deploy the function code (hot-loaded, no restart):
   ```bash
   cp -r supabase/functions/* supabase-project/volumes/functions/
   ```
2. Wire the Resend credential into the `functions` service in `supabase-project/docker-compose.yml`
   (the SAME account/key already verified for GoTrue's SMTP relay, ADR-0006 — called over
   Resend's HTTP API here instead of SMTP, no new external secret):
   ```yaml
   environment:
     RESEND_API_KEY: ${SMTP_PASS}
     RESEND_FROM_EMAIL: ${SMTP_ADMIN_EMAIL}
     SITE_URL: https://www.a2ahs.com
   ```
   Unlike a function-code change, an environment change needs the container recreated:
   ```bash
   docker compose up -d functions
   ```
3. Verify directly (no browser needed) — a real request should insert a row, stamp
   `author_role='guest'`, and get a `200` back only once Resend actually accepts the send:
   ```bash
   curl -X POST "$DOCUSAURUS_SUPABASE_URL/functions/v1/guest-feedback-submit" \
     -H "Content-Type: application/json" -H "apikey: $DOCUSAURUS_SUPABASE_ANON_KEY" \
     -d '{"email":"you@example.com","pageKind":"topic","courseCode":"EFMP-302","topicNo":1,
          "unitNo":1,"locale":"en","scope":"whole_page","comment":"test"}'
   ```
   Then confirm with the token the row got (`select guest_confirmation_token from
   content_feedback order by created_at desc limit 1`):
   ```bash
   curl -X POST "$DOCUSAURUS_SUPABASE_URL/rest/v1/rpc/confirm_guest_feedback" \
     -H "Content-Type: application/json" -H "apikey: $DOCUSAURUS_SUPABASE_ANON_KEY" \
     -d '{"p_token":"<token>"}'   # -> true, once; -> false on a second call
   ```
4. This function is deliberately **not** covered by the automated RLS/e2e suites — a real call
   sends a real email through the production relay every time, which repeated CI runs would turn
   into a steady stream of bounces to necessarily-fake addresses (a sending-domain reputation
   risk ADR-0006 already treats as a real concern). Verify it by hand, the same way
   `admin-suspend`/`admin-list-users`/`delete-account` already are (that same §7's own "Common
   failure modes" table). `tests/rls/content-feedback-guest-access.test.mjs` covers everything
   the schema/RPC can be tested for without touching the function or Resend at all.

## 7. Verification checklist

- [ ] A student ticks two items on one topic in EN; reload, and on a second signed-in browser,
      both show ticked (SC-001).
- [ ] The same student signs out, ticks a third item locally, signs back in: the third item
      merges into their account exactly once; a second sign-out/sign-in cycle does not re-run the
      merge or clobber a since-changed item (research.md R4).
- [ ] Editing one checklist item's wording between two visits renders that item unticked on the
      next load, without disturbing the student's other ticks on the same topic (FR-009); the
      checklist and its "sign in to sync" hint both render correctly in `ur`/RTL with translated
      text (`/sp.analyze` finding G1/G4).
- [ ] Ticking every self-assessment item across a unit shows the non-blocking "mark as studied"
      prompt but never itself writes to `unit_progress` - only the student's own click on the
      prompt does (FR-005; `/sp.analyze` finding G2).
- [ ] A teacher account's every query path against `self_assessment_checks` returns zero rows
      (SC-002, contract test checklist #4).
- [ ] A signed-in reader selects a sentence on a `topic-NN.mdx` page, submits passage feedback in
      under 30 seconds, and the owner's queue shows the exact quote in context, filterable by
      topic and status in under 15 seconds (SC-003, SC-004; `/sp.analyze` finding G3).
- [ ] A submission with `comment` over 4,000 characters or a passage over 2,000 characters is
      rejected (FR-017, contract test checklist #16; `/sp.analyze` finding U1).
- [ ] Editing a topic's live text after a passage is filed against it does not change the queue's
      display of that item's original quoted passage (FR-021; `/sp.analyze` finding G5).
- [ ] A non-owner's attempt to transition a `content_feedback` row's status is rejected, and an
      out-of-sequence transition by the owner is rejected (SC-007).
- [ ] `npm run build` (en + ur) regenerates `static/content-status.json`; a course with no figure
      manifest shows zero figures outstanding, not an error (SC-006, SC-010).
- [ ] The overview and triage queue render correctly in `ur`/RTL, and a non-owner sees the
      dashboard-guard "not for this role" notice (SC-008, US3 AS4/AS5).
- [ ] `npm run validate:content && npm run check:depth-gate && npm run check:no-answer-keys`
      all stay green with zero topic-source files touched, confirming FR-008's "no content-source
      change" guarantee (`/sp.analyze` finding I1).
- [ ] The existing "suggest improvement" flow (`SuggestImprovementControl`) and unit-coverage
      self-marking (`markUnitStudied`) behave exactly as before (SC-009, regression floor).
- [ ] **2026-09-07 follow-up**: a signed-out visitor sees the same feedback control as a signed-in
      reader, with upfront text-selection guidance visible before the form opens (FR-010a); after
      submitting, "Give more feedback" resets the control for a second item on the same page
      without a reload (FR-012a); a guest's submission requires an email, and the confirmation
      page (`/app/confirm-feedback`) correctly reports success for a real token, and "invalid or
      already used" for a stale or unknown one (FR-013); the triage queue's Author column shows
      a signed-in reader's role or a guest's email + confirmation status (FR-018a).

## Failure modes most likely to bite

- **Hydration finds the wrong `<ul>`.** If a topic file ever inserts another list (e.g. inside
  `## Explanation`) between the heading and the checklist's own `<ul>`, the "first `<ul>` after
  the 6th `##`" walk (contract: `self-assessment-hydration.md`) would need to stop at the first
  heading it meets first - it already does; the risk is a future topic file breaking the nine-
  heading-count precondition silently degrading to "no interactivity" rather than a loud gate
  failure. Mitigation: `check-unit-depth.mjs`'s existing nine-heading-order check (contract:
  `topic-cycle.md`) already guards this at CI time for every topic file.
- **The three script extractions (step 2) introduce a behavioral drift.** Mitigation: run the
  existing `figures-gate.test.mjs`/depth-gate fixture suites before writing a single line of
  `report-content-status.mjs`, and treat any red test as a blocking regression, not something the
  new script papers over.
- **`content-status.json` goes stale between deploys and the console's "last produced" timestamp
  quietly reads as fresher than it is.** Mitigation: the timestamp is always the file's own
  `generated_at`, never "now" - research.md R10's explicit scope limit; the Teacher/Student
  Guides and this quickstart both say plainly that "refresh" re-reads, it does not re-run.
