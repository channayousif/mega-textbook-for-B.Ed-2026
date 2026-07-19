---
id: 0020
title: Fix mobile RTL search/toggle overlap
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 001-content-platform
branch: main
user: channayousif@gmail.com
command: null
labels: ["rtl", "css", "mobile", "rtlcss"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/css/custom.css
tests:
 - "PASS: npx playwright test (against production build) — 12/12 non-skipped"
 - "Verified live on www.a2ahs.com/ur/ at a 375px mobile viewport: toggle x=24, search x=299 (no overlap), hamburger opens the sidebar drawer, no horizontal scroll on a translated content page"
---

## Prompt

check the mobile view too

(follow-up to the previous session's navbar/sidebar LTR-pinning fix for the Urdu locale —
user asked to check mobile after confirming desktop looked good)

## Response snapshot

Screenshotted EN and UR at a 375px mobile viewport. English mobile was clean (hamburger left,
search right). Urdu mobile showed only a search icon in the top-left, no hamburger visible at
all — but `.navbar__toggle` was confirmed present and "visible" in the DOM; the real problem was
a full overlap: the toggle button (`x:24, w:30`) and the mobile search container (`x:16, w:44`)
occupied nearly identical screen space, so the search icon was rendered on top, visually hiding
the sidebar toggle.

Root cause: Infima's mobile breakpoint (`max-width: 996px`) switches the search box to
`position: absolute`, anchored `right` in the English source CSS; rtlcss auto-flips that to
`left` for the `ur` build — correct for a *fully*-mirrored layout, but the previous fix already
pinned the mobile sidebar toggle to stay on the left via `direction: ltr`, so with both now
targeting the left edge, they collided instead of sitting on opposite sides as they do in
English.

Fixed with a mobile-only (`@media (max-width: 996px)`) override, again using rtlcss's
`/*rtl:ignore*/` directive so it isn't itself re-flipped. No stable class exists on the search
container div (only a hashed CSS-module name), so targeted it structurally via the stable
`.navbar__search` class it wraps (`div:has(> .navbar__search)`), matching the same `:has()`
technique from the prior fix.

## Outcome

- ✅ Impact: mobile Urdu navbar now matches English exactly (hamburger left, search right); the
  sidebar drawer opens correctly on tap; verified no regression to the actual RTL content
  rendering or the 360px no-horizontal-scroll requirement.
- 🧪 Tests: e2e suite against the real production build, 12/12 non-skipped passing; live
  verification at a real mobile viewport confirmed non-overlapping positions and a functioning
  drawer toggle.
- 📁 Files: `src/css/custom.css` only.
- 🔁 Next prompts: none required.
- 🧠 Reflection: the previous session's fix was verified at desktop viewport only — this mobile
  check caught a real, separate collision that desktop testing couldn't have revealed, since
  Infima's mobile breakpoint uses an entirely different (`position: absolute`) layout strategy
  for the search box that desktop doesn't. Worth remembering for any future navbar-chrome change
  in this codebase: check both viewport classes, not just the one that happened to be reviewed
  first.

## Evaluation notes (flywheel)

- Failure modes observed: a fix verified correct at one viewport size silently broke a different,
  narrower-viewport-only CSS code path (Infima's `max-width: 996px` absolute-positioning
  strategy for the search box) that wasn't exercised by the desktop-only verification in the
  prior fix.
- Graders run and results (PASS/FAIL): e2e suite (production build) 12/12 non-skipped PASS; live
  mobile position check PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when fixing any navbar/layout CSS in this project,
  screenshot-verify at both a desktop and a ~375px mobile viewport before considering the fix
  complete, since Infima's own breakpoint-specific layout strategies (flex vs. absolute
  positioning) aren't guaranteed to share the same failure/success mode.
