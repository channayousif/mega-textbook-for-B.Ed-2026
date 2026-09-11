---
id: 0007
title: Merge PR 30 and PR 26
stage: green
date: 2026-09-10
surface: agent
model: claude-opus-5
feature: none
branch: fix/unit-mark-studied-hydration
user: channayousif@gmail.com
command: (chat)
labels: ["merge", "ci", "e2e", "spec-004", "flake-diagnosis"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/26
files:
 - tests/e2e/unit-self-mark.spec.ts
 - src/theme/DocItem/Footer.tsx
 - history/prompts/general/0006-merge-pr-30-and-26.general.prompt.md
tests:
 - npx playwright test tests/e2e/unit-self-mark.spec.ts (local, against the live Supabase)
 - npm test (136/136)
 - npx tsc --noEmit
---

## Prompt

merge #30 and #26

## Response snapshot

PR #30 (`chore/revised-board-scheme-2026`, the revised board scheme adopted as final
authority) was fully green - build SUCCESS, e2e SUCCESS on run 34559477894 - and was merged
with a merge commit, matching the repo's convention.

PR #26 was **not** merged on request. Its own e2e job (run 34332093212) failed 3/3 retries on
`tests/e2e/unit-self-mark.spec.ts:66`, the assertion this PR itself introduced. Merging it
would have shipped a red branch into `main`.

Diagnosis, from the Playwright trace artifact rather than from inference:

```
09:13:03.823  POST /rest/v1/unit_progress?on_conflict=... ->  -1  net::ERR_ABORTED
09:13:04.056  GET  /rest/v1/unit_progress?select=*        -> 200  (no row - correctly)
```

The self-mark upsert was **aborted by the test's own navigation**, so the row was never
written and the new hydration read had nothing to find. Cause: the post-click assertion was
`expect(page.getByText(/studied/i)).toBeVisible()`, and `/studied/i` also matches the button's
own label "Mark as studied". It therefore resolved before the POST was even sent, and the
following `page.goto()` cancelled it. On `main` this was invisible because the old test clicked
the button a second time on the revisit, which wrote the row before the final row-count check.
Locally the write wins the race (spec passes in 6.1s); on CI it loses, deterministically.

The application fix (read `unit_progress` back on mount) was therefore correct all along - the
test was what was wrong.

Changes:
- `tests/e2e/unit-self-mark.spec.ts` - wait for `/marked as studied/i`, the success state that
  only renders after `markUnitStudied()` resolves, so the write is guaranteed to land before
  the test navigates away.
- `src/theme/DocItem/Footer.tsx` - wrap the hydration read in `try/catch/finally` so a thrown
  `not_configured` (or an unreachable API) still resolves `markedHydrated` instead of leaving
  an unhandled rejection and withholding the control forever.

## Outcome

- ✅ Impact: #30 merged. #26 corrected rather than merged red; the root cause was a test-side
  navigation race, not a defect in the persistence fix.
- 🧪 Tests: `npm test` 136/136; `tsc --noEmit` clean; the e2e spec re-run locally against the
  live Supabase.
- 📁 Files: 1 e2e spec, 1 theme component, 1 PHR.
- 🔁 Next prompts: merge #26 once CI is green; then #27 -> #28 (retarget to main); #29 after
  migrations 0038-0041 are deployed.
- 🧠 Reflection: a regex assertion that matches both the "before" and "after" state of a
  control is not an assertion. `/studied/i` matching "Mark as studied" made the test pass
  vacuously and hid an aborted write.

## Evaluation notes (flywheel)

- Failure modes observed: an ambiguous locator regex silently satisfied by the pre-action
  state; a write-then-navigate race that only manifests on slower CI runners.
- Graders run and results (PASS/FAIL): unit suite PASS (136/136); tsc PASS; e2e PASS locally.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): audit the other e2e specs for post-action
  assertions whose locator also matches the pre-action state.
