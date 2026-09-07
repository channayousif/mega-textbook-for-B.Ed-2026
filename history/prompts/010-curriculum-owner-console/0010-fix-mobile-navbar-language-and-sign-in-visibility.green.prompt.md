---
id: 0010
title: Fix mobile navbar language and sign-in visibility
stage: green
date: 2026-09-07
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: fix/mobile-navbar-visibility
user: channayousif@gmail.com
command: "I have noticed on mobile viewport: 1. Language options are not displaying on prominent place 2. Sign in/up status is not displayed - fix the missing elements. and the feedback/suggestions option may be implimented as tooltip per paragraph to be more precise alongwith general feedback on the page."
labels: ["navbar", "mobile", "accessibility", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/22
files:
 - docusaurus.config.ts
 - src/components/NavbarAuthWidget.tsx
 - src/components/DashboardNavLink.tsx
 - src/components/TeacherDashboardNavLink.tsx
 - src/components/MobileTopBarWidgets.tsx
 - src/components/MobileTopBarWidgets.module.css
 - src/theme/NavbarItem/ComponentTypes.tsx
 - src/css/custom.css
tests:
 - TypeScript compile: clean
 - unit suite: 136/136 passing
 - production build: both locales (en + ur), exit 0
 - tests/e2e/navigation.spec.ts: 3/3 passing
 - tests/e2e/dashboard-rtl.spec.ts: passing
 - tests/e2e/teacher-dashboard-rtl.spec.ts: passing
 - manual Playwright mobile-viewport checks (iPhone 13 emulation): signed-out collapsed bar, signed-out drawer primary menu, signed-in student drawer (Dashboard/Guide/Sign out present), locale-toggle tap navigates to /ur/..., desktop no-duplicate-widget
---

## Prompt

I have noticed on mobile viewport:
1. Language options are not displaying on prominent place
2. Sign in/up status is not displayed
fix the missing elements.

and the feedback/suggestions option may be implimented as tooltip per paragraph to be more precise alongwith general feedback on the page.

## Response snapshot

Reproduced the report first rather than guessing: started a local dev server, drove a real Chromium instance (Playwright, since neither the Chrome-DevTools MCP nor the Playwright MCP had a `chrome` channel binary installed in this sandbox - worked around it with a direct Playwright script using the already-installed Chromium build) at an iPhone-13 viewport, and inspected the actual rendered DOM/CSS.

Root cause: Infima hides every `.navbar__item`-classed element at
<=996px (`.navbar__item { display: none }`). Docusaurus's own navbar
items survive this by rendering different markup
(`<li class="menu__list-item"><a class="menu__link">`) on their
second, `mobile: true` pass inside the hamburger drawer. This repo's
three custom items - `NavbarAuthWidget` (Spec 002), `DashboardNavLink`
(Spec 004), `TeacherDashboardNavLink` (Spec 005) - never implemented
that mobile variant, so "Sign in" and (signed in) the account link,
Dashboard/Guide links, and Sign out were completely invisible on any
viewport <=996px, not merely squeezed off-screen - confirmed via
`getComputedStyle` showing `display: none` with no ancestor hidden.

Fixed all three to accept `mobile`/`onClick` props (already passed by
Docusaurus) and swap to the correct mobile markup, matching
`DefaultNavbarItemMobile`'s own convention exactly. Separately, since
even the *working* locale dropdown was still two taps deep (open
hamburger, then "Back to main menu") with zero visible hint in the
always-collapsed bar, added a new `MobileTopBarWidgets` component: a
compact locale-switch + sign-in-status pair rendered directly in the
collapsed mobile bar (no tap needed), registered as its own
`custom-mobileTopBar` navbar item, deliberately NOT using the
`navbar__item` class (so Infima's rule doesn't hide it), CSS-hidden at
desktop widths, and self-suppressed on its own mobile re-render to
avoid duplicating inside the drawer. Reused Docusaurus's own
`useAlternatePageUtils` (`@docusaurus/theme-common/internal`) for
correct locale-switch URLs rather than hand-rolling path logic. Added
padding to `.navbar__items--right` at mobile widths (RTL-mirrored) so
the search icon - which Docusaurus makes `position: absolute` at this
breakpoint - doesn't render on top of the new widgets.

Verified with a throwaway service-role-created test student (deleted
after) signed in on a real mobile-emulated browser: collapsed bar shows
"اردو" + display-name pills with no overlap; hamburger drawer's
primary menu lists Languages, Dashboard, Guide, name, Sign out in
order; tapping the locale pill actually navigates to `/ur/...`; desktop
rendering is byte-for-byte unchanged (verified via screenshot, no
duplicate control).

Ran the full verification pass (TypeScript, unit suite, both-locale
production build, e2e navigation + RTL specs) before committing.
Committed on a fresh `fix/mobile-navbar-visibility` branch (had
initially committed directly on `main` by mistake - caught before
pushing, corrected via `git branch` + `git reset --hard` since nothing
had been pushed yet - main was never touched on the remote) and opened
PR #22.

The second half of the request (per-paragraph feedback tooltips) was
explicitly scoped OUT of this fix and called out in the PR body as a
separate, larger interaction-model decision - Spec 010's
`content_feedback` already supports passage-scoped feedback via text
selection, and a hover/tap tooltip per paragraph is a materially
different UI that deserves its own design pass, not a quick addition
bundled into a mobile-visibility bugfix.

## Outcome

- ✅ Impact: language switch and sign-in status are now visible on mobile without opening the hamburger menu at all; the hamburger drawer's own menu also correctly lists Sign in/Dashboard/Guide/Sign out again (previously silently absent on any <=996px viewport, a latent bug since Specs 002/004/005 shipped, not something Spec 010 introduced).
- 🧪 Tests: TypeScript clean; 136/136 unit; both-locale production build; e2e navigation.spec.ts (3/3) + dashboard-rtl.spec.ts + teacher-dashboard-rtl.spec.ts all passing; manual mobile-viewport Playwright verification signed-out and signed-in.
- 📁 Files: 8 files (6 modified, 2 new), 279 insertions / 28 deletions.
- 🔁 Next prompts: user needs to review/merge PR #22; the per-paragraph feedback-tooltip request still needs its own scoping/design discussion before implementation.
- 🧠 Reflection: reproducing the bug live (real browser, real viewport, real computed styles) before touching any code turned what could have been a guess-and-check CSS-tweaking session into a precise, one-shot fix - worth doing by default for any "X isn't showing up" visual report rather than reasoning about framework CSS purely from reading source. Also caught and self-corrected a process slip (committing directly on `main` instead of branching first) before it reached the remote.

## Evaluation notes (flywheel)

- Failure modes observed: initially committed directly on `main` instead of branching first - self-caught before any push, corrected locally with no remote impact.
- Graders run and results (PASS/FAIL): N/A (bugfix session, not a code-review stage).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
