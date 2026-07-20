---
id: 0020
title: Run Lighthouse accessibility audit and fix findings
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: null
labels: [accessibility, lighthouse, wcag, color-contrast, table-headers, chrome-devtools-mcp]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - src/css/custom.css
  - src/pages/app/classes/roster.tsx
  - src/pages/app/classes/index.tsx
  - src/pages/app/classes/assignments.tsx
  - specs/003-classes-assignments/quickstart.md
tests:
  - Lighthouse accessibility audits — 11 page+role combinations (7 teacher, 4 student), all 8 new pages, against a real signed-in session on the live self-hosted instance — 100/100 with zero failing audits (including zero-weight/informational) after fixes
  - npm run test:e2e (full 29-spec suite, workers=1) — all pass
  - npm run test:rls — 38/39 files, 1 skipped (unchanged)
  - npx tsc --noEmit — clean
---

## Prompt

yes, run the Lighthouse a11y pass

## Response snapshot

User asked to follow up on a gap flagged in the previous "is it fully tested" answer: no
dedicated accessibility audit had been run for the new pages, despite Constitution Art. VII's
engineering gate listing it.

Tried the `chrome-devtools-mcp:a11y-debugging` skill's intended path first — the MCP server's
`lighthouse_audit`/`new_page` tools failed immediately: no Chrome binary at the expected
`/opt/google/chrome/chrome` path in this sandbox, and the MCP server's own launch config isn't
something this session can edit. Ran the `chrome-devtools-mcp:troubleshooting` skill to confirm
this wasn't one of its known `--autoConnect`/DevToolsActivePort failure modes before giving up on
that path.

Fell back to running `lighthouse` directly via CLI against the already-installed Playwright
Chromium (`~/.cache/ms-playwright/chromium-1228`), launched with `--remote-debugging-port=9333`
and signed in via a real login flow first. First attempt (`lighthouse <url> --port=9333`) silently
audited the *login page*, not the target — traced via `finalDisplayedUrl` in the report, not
assumed: Lighthouse's default CLI attach mode opens a fresh, unauthenticated browser context even
when connecting to a running instance, and `--disable-storage-reset` didn't change that. Fixed by
switching to Lighthouse's Node API (`lighthouse(url, flags, config, page)`) driven from a small
isolated npm scratch project (`puppeteer-core` + `lighthouse`, installed outside the actual
project so `package.json`/`package-lock.json` stayed untouched), passing the exact already-
authenticated Puppeteer `Page` object — confirmed via `finalDisplayedUrl` matching the real
target URL with its query string intact this time.

Seeded one class (teacher + student, an assignment with a graded submission, a quiz with one
item) directly against the live instance, then ran a full accessibility-only Lighthouse pass
against all 8 new pages under both roles (7 as teacher, 4 as student — pages that only render for
one role weren't double-audited). Found two real issues:

1. **Color contrast** (`roster.tsx`, score 96/100): Infima's default `.button--danger` (white
   text on `#fa383e`) computes to a 3.75:1 contrast ratio against WCAG AA's 4.5:1 minimum for
   normal text — confirmed by computing the actual sRGB relative luminance, not just trusting the
   audit's verdict. `grep`'d for the same class across the whole `src/` tree and found it also
   used in Spec 002's `profile.tsx` (its own danger button) — fixed as a global rule in
   `custom.css` (not scoped to roster.tsx) since it's the same underlying framework-default bug,
   using `--ifm-color-danger-darkest` (an existing shade already in Infima's palette, 6.88:1 —
   not an invented color).
2. **Unlabeled actions column** (`assignments.tsx`, weight-0/non-scoring but real): axe's
   `td-has-header` rule flagged an empty `<th />` on 4 tables' actions columns (roster.tsx x2,
   index.tsx, assignments.tsx) — visually obvious to sighted users from the buttons inside, but
   unlabeled for screen readers navigating cell-by-cell. Added a `.sr-only` utility (standard
   clip-rect pattern, new in custom.css) and `<span className="sr-only">Actions</span>` inside
   each empty header.

Rebuilt, restarted the server, and re-ran every audit that could have been affected — all 11
page+role combinations now score 100/100 with zero failing audits at all (including the
weight-0 one). Ran the full E2E suite afterward to confirm the CSS/markup changes caused no
functional regression; one flaky failure in `assignments-publish-submit.spec.ts` reproduced only
under 2-worker parallel execution and passed cleanly both in isolation and under `--workers=1`,
confirming it was resource contention, not a real regression (the change is purely visual/ARIA,
touching no application logic). Documented the full audit methodology and both findings in
quickstart.md, matching the pattern already established for every other live validation this
session. Cleaned up all fixture data, the scratch npm project, and every background process
(browser instances, the rebuilt `npm run serve`).

## Outcome

- ✅ Impact: closes the accessibility-audit gap explicitly named in the prior turn's "is it fully
  tested" answer. All 8 new pages verified at 100/100 Lighthouse accessibility score with zero
  failing audits (including non-scoring ones), under both teacher and student authenticated
  sessions, against the live self-hosted instance — not estimated, not code-review-only.
- 🧪 Tests: 11 Lighthouse audits (100/100, 0 failures, all). Full E2E suite (29/29, `--workers=1`,
  confirmed the one parallel-run flake was pre-existing contention, not a regression). RLS suite
  unchanged (38/39, 1 skip). tsc clean.
- 📁 Files: 1 shared CSS file (2 new rules: `.sr-only` utility, `.button--danger` contrast
  override), 3 page files (4 empty `<th />` cells labeled), quickstart.md extended with the full
  methodology and findings.
- 🔁 Next prompts: the two fixed issues are global CSS rules, so they already apply everywhere,
  including Spec 002's own pages that share the same classes (`profile.tsx`'s danger button gets
  the contrast fix for free; its own empty-`<th onClick>` in `admin/users.tsx` was flagged as a
  related-but-out-of-scope finding, not fixed). No further Spec 003 action needed on this front.
- 🧠 Reflection: the MCP tool's Chrome-binary-not-found failure and the CLI attach mode's silent
  session-loss were both the kind of thing that would have produced a false "100/100, all clear"
  result if not independently verified via `finalDisplayedUrl` — a fabricated-looking clean pass
  is exactly as dangerous as a real bug if the audit target was wrong. This is the same discipline
  this whole session has run on since US3 (verify against the live instance, don't trust a claim
  that looks plausible), just applied to a new tool this time instead of a new migration.

## Evaluation notes (flywheel)

- Failure modes observed: (1) chrome-devtools MCP server misconfigured for this sandbox (no
  Chrome binary at its expected path) — an environment gap, not something fixable from within
  this session; (2) Lighthouse CLI's `--port` attach mode silently auditing an unauthenticated
  context instead of the intended authenticated one — caught only by checking `finalDisplayedUrl`
  in the report rather than trusting the score; (3) a real WCAG AA contrast failure in a framework
  default, present since Spec 002 but only surfaced now because no prior session had run this
  specific audit; (4) a real (if zero-weight) screen-reader table-navigation gap, same root cause
  (framework/pattern reused without an explicit label) across 4 tables.
- Graders run and results (PASS/FAIL): Lighthouse accessibility — PASS (11/11 pages, 100/100, 0
  failures). E2E — PASS (29/29 sequential). RLS — PASS (38/39, 1 skip unchanged). tsc — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): if a chrome-devtools MCP Chrome binary ever becomes
  available in this environment, retry the originally-intended `lighthouse_audit` tool path (mode:
  "snapshot" on an already-navigated authenticated page) — it would avoid the whole
  Puppeteer-bridge workaround this session needed, and is worth confirming produces the same
  result once the environment gap is fixed.
