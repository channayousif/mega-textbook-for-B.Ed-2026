---
id: 0019
title: Complete Phase 9 polish and cross-cutting checks
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.implement
labels: [polish, i18n, rtl, bundle-budget, performance, docusaurus-link, production-build]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/app/classes/index.tsx
  - src/pages/app/classes/roster.tsx
  - src/pages/app/classes/assignments.tsx
  - src/pages/app/classes/assignment-new.tsx
  - src/pages/app/classes/assignment.tsx
  - src/pages/app/classes/queue.tsx
  - src/pages/app/classes/gradebook.tsx
  - src/pages/app/classes/quiz.tsx
  - src/lib/submissions.ts (statusLabel helper)
  - tests/e2e/classes-rtl.spec.ts
  - tests/e2e/classes-lifecycle.spec.ts (trailing-slash regex fix)
  - tests/e2e/assignments-publish-submit.spec.ts (trailing-slash regex + goto fixes)
  - tests/e2e/grading-queue.spec.ts (trailing-slash regex + goto fixes)
  - tests/e2e/gradebook-export.spec.ts (goto fix)
  - tests/e2e/quiz-retake.spec.ts (trailing-slash regex + goto fixes)
  - specs/003-classes-assignments/quickstart.md
  - specs/backlog.md (new)
  - specs/003-classes-assignments/tasks.md
tests:
  - npx tsc --noEmit (clean)
  - npm test (16/16 unit tests)
  - npm run test:rls (38/39 files, 1 skipped)
  - npm run test:e2e against npm run build && npm run serve — full 29/29 suite (Spec 001+002+003 combined)
  - live 200-student performance measurement (roster 127ms p95, grading queue 354ms p95, submission write 36ms p95 — all under the 5s SC-005 target)
---

## Prompt

continue with phase 9 polish

## Response snapshot

Completed all of Phase 9 (T062-T067, T072) — the last phase of Spec 003. All 77/77 tasks in
tasks.md are now checked off.

**T062 (bilingual pass)**: asked the user to resolve a real scope ambiguity first — FR-016's
literal text ("all... text... MUST be available in both English and Urdu") reads stricter than
Spec 002's own precedent (only dynamic status/error messages bilingual; static labels stay
English, per login.tsx). User chose to match the Spec 002 precedent. Added `MESSAGES` objects
(matching assignment.tsx's existing pattern) to all 8 classes pages, covering every `setError`/
`setMessage`/`window.confirm`/pending-button-label/computed-status string — none left untranslated.
Added a shared `statusLabel()` helper in submissions.ts for the FR-006 computed-status text reused
across assignments.tsx and queue.tsx.

**T063 (RTL verification)** surfaced the session's most consequential finding: `/ur/app/classes`
rendered `dir="ltr"` under plain `npm start` — traced to Docusaurus dev mode only serving one
locale at a time (confirmed via the generated `.docusaurus/routes.js`, which had zero `/ur/`
routes). Switched to `npm run build && npm run serve` for RTL testing, which then exposed a real,
feature-wide bug: every internal link across all 8 classes pages used raw `<a href="/app/...">`
(hard-coded, no locale prefix) instead of `@docusaurus/Link` (which auto-prefixes locale via
`withBaseUrl`) — so any click while on the Urdu locale silently dropped the user back to English.
Fixed all 8 occurrences across 5 files (the 2 remaining raw `<a>` tags, pointing at external
Supabase Storage signed URLs, correctly stayed as-is). This also surfaced a second, unrelated
finding: `docusaurus serve`'s underlying static server issues a genuine HTTP 301 that drops the
query string entirely when redirecting a query-stringed URL to its trailing-slash canonical form
— confirmed via raw `curl -v`, then confirmed the actual deployed production site (www.a2ahs.com,
tested against Spec 002's live password-reset link) does NOT have this bug, since it's served by a
different, correctly-behaving web server. Fixed by making every E2E `page.goto()` call to a
classes page with a query string request the trailing-slash form directly, sidestepping the
redirect regardless of which server handles it. All 6 classes-domain E2E specs, then the complete
29-spec suite (Spec 001+002+003), pass against the real production build.

**T064 (bundle budget)**: measured directly from the build already produced for T063 rather than
re-deriving from code inspection — `main.js` 147.0 KB gzip (200 KB budget; Spec 002's post-T060-fix
baseline was 146.6 KB, so Spec 003 added ~0.4 KB gzip to the shared chunk). `exceljs` absent from
`main.js` entirely, confirmed living in its own 257 KB gzip chunk loaded only on the export click.

**T065**: ran `npm run test:rls` and `npm run test:e2e` verbatim (not just equivalent commands) —
both green, folded into the same production-build verification as T063.

**T066 (quickstart live validation)**: found and fixed a real documentation gap — quickstart.md's
`docker compose exec` commands fail with "no configuration file provided" when run from this
repo's root (confirmed via direct testing), because `docker-compose.yml` actually lives in
`~/supabase-project` (which Spec 002's own quickstart.md establishes via a `cd` step Spec 003's
never restated). Added a note. Also ran the auto-archive spot-check for real through the live
admin UI (changing a teacher's role via `/app/admin/users`, not just simulated via the service
role) and confirmed the trigger fires end-to-end.

**T067**: created `specs/backlog.md` (didn't exist yet) with plan.md's three documented follow-ups.

**T072 (200-student performance check)**: seeded a real class directly against the live instance —
200 students (via bulk SQL insert for speed, not 200 sequential GoTrue admin API calls), 200
enrollments, 180 submissions, 150 grades (representative — not every student submits, not every
submission is graded). Measured p95 over real RLS-authenticated JWT clients (not the service
role): roster 127ms, grading queue 354ms, submission write 36ms — all 14-139x under the 5s target.
Cleanup needed an explicit SQL `DELETE` beyond the code's own cleanup logic, since the 200
directly-SQL-inserted `auth.users` rows weren't visible to `supabase.auth.admin.listUsers()` (a
measurement-technique wrinkle, not a product bug) — verified zero perf200-* rows remain afterward.

## Outcome

- ✅ Impact: Phase 9 (Polish & Cross-Cutting Concerns) complete. **All 77/77 tasks in
  specs/003-classes-assignments/tasks.md are now checked off — Spec 003 is fully implemented.**
  Found and fixed one genuinely significant, feature-wide bug (locale-prefix-losing internal
  links) that would have broken bilingual navigation for every Urdu-locale user on first click,
  and one documentation gap (quickstart.md's missing working-directory context) — both would have
  shipped invisibly since neither this session's earlier dev-mode-only E2E runs nor any prior
  session had ever tested against a real production build or literally executed the quickstart
  doc's own commands.
- 🧪 Tests: tsc clean. Unit 16/16. RLS 38/39 files (1 skipped by design). E2E 29/29 — the complete
  suite (Spec 001+002+003), run against a real `npm run build && npm run serve`, not dev mode, for
  the first time all session. Bundle budget measured (147.0 KB gzip < 200 KB). Performance measured
  live at 200-student scale (all three actions 14-139x under the 5s target).
- 📁 Files: 8 classes pages bilingual-ized + link-fixed, 1 lib helper added, 6 E2E spec files
  fixed for production-build URL behavior, 1 new E2E spec (classes-rtl.spec.ts), quickstart.md
  extended with 2 new sections + 1 doc-gap fix, specs/backlog.md created, tasks.md fully checked off.
- 🔁 Next prompts: Spec 003 is complete and ready for PR/merge. Natural next steps: open a PR
  against main, consider whether the newly-found link/query-string bugs warrant a quick look at
  Spec 001/002's own pages (same raw-`<a href>` pattern likely exists there too, per the earlier
  grep showing zero prior `@docusaurus/Link` usage anywhere in `src/`), and eventually a Spec 004/
  005 (student/teacher dashboards) that surfaces this feature's data per spec.md's own "Blocks"
  note.
- 🧠 Reflection: this phase's two most valuable findings (locale-prefix links, production-build-only
  RTL routing) were only reachable by literally building and serving the production artifact —
  neither dev-mode testing (used for every E2E run earlier this session) nor code review would
  have caught either. This reinforces the pattern this whole session established starting at US3:
  claims about behavior are only as good as the environment they were checked in, and "close to
  production" isn't the same as production. Worth carrying into every future feature's own Phase 9:
  budget time for at least one full build+serve pass, not just dev-server E2E runs.

## Evaluation notes (flywheel)

- Failure modes observed: (1) Docusaurus dev server single-locale limitation — an environment
  quirk, not a bug, but easy to misread as one; (2) real cross-cutting app bug — raw `<a href>`
  losing locale prefix on every internal link, present since T018/T019 (US1, much earlier in this
  session) and never caught because no test had ever exercised a real `/ur/` navigation click
  until this task; (3) `docusaurus serve`'s query-string-dropping redirect — a real bug in that
  specific local-preview tool, confirmed NOT present in the actual production deployment; (4) a
  stale/incomplete quickstart.md missing working-directory context that Spec 002's own quickstart
  had already established and Spec 003's should have restated or cross-referenced.
- Graders run and results (PASS/FAIL): tsc — PASS. npm test — PASS (16/16). npm run test:rls —
  PASS (38/39, 1 skip). npm run test:e2e (production build) — PASS (29/29). Bundle budget — PASS
  (147.0 KB < 200 KB). Performance — PASS (all three actions under 5s p95 by 14-139x).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): grep Spec 001/002's own `src/pages/` for the same raw
  `<a href="/...">` pattern this session found in Spec 003 — if present, the same locale-prefix
  bug likely affects the navbar/auth pages too, and is worth a small, separate fix outside this
  spec's own scope.
