---
id: 0005
title: Fix Mark As Studied Persistence
stage: green
date: 2026-09-08
surface: agent
model: claude-sonnet-5
feature: none
branch: fix/unit-mark-studied-hydration
user: channayousif@gmail.com
command: (direct request - bugfix)
labels: ["bugfix", "spec-004", "unit-progress", "docitem-footer", "hydration"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/theme/DocItem/Footer.tsx
 - tests/e2e/unit-self-mark.spec.ts
tests:
 - "npx tsc --noEmit - exit 0 (clean)"
 - "npm test (vitest) - 136/136 pass"
 - "npm run test:e2e unit-self-mark - Playwright built the site clean; the DB-backed spec SKIPS in this environment (no DOCUSAURUS_SUPABASE_URL / ANON_KEY / SERVICE_KEY). Runs in CI where those are set."
---

## Prompt

i have noticed a few things which needs to be fixed:
1. student clicks on the "mark as studied" but nothing is recorded furthe after page refresh everything resets
2. student dashboard needs to be redesigned with all functionality. currently there is no any left side menu, join classroom with code, Personal note taking space and record, topics marked as studied (course wise)
3. teachers dashboard also needs makeover, it doesnot look like one. course code should be selected from a dropdown list. Think about what a teacher can do with its class and content and assessment, assignments?
4. there should be more diagrams, concept maps, flow charts or timelines within the topics, remember a visual worth thousand words. reinforce the relevant unit/topic writing skills/content pipeline.
5. show me 5 gap decisions
6. re-translate EFMP-302 unit-1, after this.

(This PHR covers item 1 only - the standalone bugfix. Items 2-3 -> Spec 011; item 4 -> Spec 012;
item 5 answered in chat; item 6 -> Workstream D. See the approved plan.)

## Response snapshot

Root cause: the content-page footer "Mark as studied" button in `src/theme/DocItem/Footer.tsx`
(`DocItemFooterWrapper`) wrote to `unit_progress` correctly - RLS permits the `self_marked`
insert, the row persists, and `tests/e2e/unit-self-mark.spec.ts` already asserted the row exists
after a click - but `marked` was ephemeral `useState(false)` with **no read-back on mount**. The
sibling `FeedbackControl` in the same file hydrates via a `fetchOwnFeedback` effect; the
mark-studied control never got the equivalent, so every page load rendered it as unmarked.

Fix (smallest viable diff):
- Imported `fetchOwnUnitProgress` alongside `markUnitStudied` from `@site/src/lib/unitProgress`.
- Added a `markedHydrated` state flag and a `React.useEffect` keyed on
  `[role, profile, courseCode, unitNo]`: for a signed-in student on a unit page it calls
  `fetchOwnUnitProgress()` and `setMarked(true)` when a row matches `course_code` + `unit_no`;
  for everyone else it just flips `markedHydrated` true. RLS scopes the read server-side, so no
  args are needed.
- Gated the button block render on `(markedHydrated || marked)` so the "Mark as studied" button
  is withheld until the read-back resolves - no unmarked flash for an already-studied unit.
- `handleMark` and the idempotent `markUnitStudied` upsert are unchanged.

Test update: `tests/e2e/unit-self-mark.spec.ts` - replaced the assertion that encoded the bug
("the button reappears since DocItemFooter tracks marked as local component state") with: after
navigating back to the unit page, "marked as studied" text is visible and the "Mark as studied"
button has count 0. Docstring updated to match.

Not in this fix (folded into Spec 011): the Progress page only showing class-enrolled courses,
and the absence of a guest / localStorage fallback on the footer control.

## Outcome

- Impact: a self-marked unit now stays marked across reloads and sessions; `unit_progress` still
  gets exactly one row (idempotent upsert unchanged).
- Tests: `tsc` clean; vitest 136/136; the DB-backed e2e spec builds clean and runs in CI (skipped
  locally for lack of Supabase env).
- Files: `src/theme/DocItem/Footer.tsx`, `tests/e2e/unit-self-mark.spec.ts`.
- Next prompts: Workstream C (Spec 012 visual-density standard) then D (EFMP-302 U1 Urdu), then
  Workstream B (Spec 011 dashboards).
- Reflection: the bug and its fix were both already spelled out in the e2e test's own comment -
  the test documented the limitation instead of failing on it.

## Evaluation notes (flywheel)

- Failure modes observed: none new; the missing hydration was a known shipped limitation.
- Graders run and results (PASS/FAIL): tsc PASS; vitest PASS; e2e build PASS / assertions SKIPPED
  (env), to be confirmed green in CI.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in Spec 011, unify the three "mark as studied" entry
  points (footer button, Progress `CourseRow`, `SelfAssessmentPanel`) onto one hydrating control.
