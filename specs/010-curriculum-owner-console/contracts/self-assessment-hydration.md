# Contract: Self-Assessment Checklist Hydration

**Feature**: 010-curriculum-owner-console | **Date**: 2026-09-05

Governs how `src/theme/DocItem/Content.tsx` (new swizzle) turns the static, disabled checkboxes
Spec 008's `## Self-assessment checklist` section already renders into a live, persisted control
- without editing a single topic file (FR-008). Read by the component's own implementation and
by `tests/e2e/self-assessment-*.spec.ts`.

## Activation condition

The component only acts on a page whose `useDoc().frontMatter` carries a `topic_no` (present
only on `topic-NN.mdx`, per `contracts/topic-cycle.md`). Every other page - `index.mdx`,
`unit-assessment.mdx`, legacy five-file units, anything outside `docs/` - is passed through to
`@theme-original/DocItem/Content` unmodified.

**Role gate (implementation drift, T046)**: activation additionally requires the caller be
either signed out or `role === 'student'`. A signed-in teacher or admin browsing a topic page
gets the plain, non-interactive checklist - the same fallback as an out-of-scope topic - never
their own synced account row. This is not optional polish: `self_assessment_checks`'s SELECT
policy is `student_id = current_profile_id() or is_admin()`, with no role check at all, so a
teacher inserting a row using their own `profile.id` as `student_id` would otherwise pass the
INSERT policy and then read that exact row straight back on their next load - silently
defeating Art. VIII.1/FR-006's "not even a teacher sees this" guarantee for their own data.
Caught by `tests/rls/curriculum-owner-console-full-isolation.test.mjs`'s teacher-isolation case.

## Locating the section (research.md R2)

1. Read `useDoc().toc`, the flat list of `{value, id, level}` heading entries for the page.
2. Filter to `level === 2` (the nine `##` cycle headings) - `count` MUST be 9 for activation to
   proceed at all; if not, render the original content unmodified (a mismatch means this topic
   file does not yet match the cycle contract, and the plain, non-interactive checkboxes are
   still a fully correct, spec-compliant render per FR-002).
3. Take the **6th** entry (part 6 of 9, "Self-assessment checklist" - the position is fixed by
   the contract, not the heading's literal text, so this works identically in `ur` where the
   heading is translated) and resolve `document.getElementById(entry.id)`.
4. Walk forward through DOM siblings from that heading element until the first `<ul>` is found
   (skipping only whitespace text nodes and the heading's own anchor-link `<a>`; hitting another
   heading (`H1`-`H6`) first without finding a `<ul>` means "no items" - render unmodified).

## Reading items

For each `<li>` child of that `<ul>`, in document order (`item_position` = 1-based index):

- `checkboxEl = li.querySelector('input[type="checkbox"]')` - if absent, this `<li>` is not a
  checklist item (a malformed list); skip it, do not assign it a position (positions are dense
  only over `<li>` elements that actually carry a checkbox).
- `text = normalize(li.textContent)` where `normalize` is `trim()` + collapse runs of whitespace
  to a single space - the same normalization `item_text_snapshot` is stored with (data-model.md).

## Wiring

For each item: remove the `disabled` attribute Docusaurus's GFM renderer sets; set `checked` from
the resolved state (below); attach `onChange` -> upsert (Contract A, `console-operations.md`)
with `{course_code, unit_no, topic_no, locale, item_position, item_text_snapshot: text, checked:
event.target.checked}`, optimistic-UI on the checkbox, revert on a write error with an inline
message (same pattern as `DocItem/Footer.tsx`'s existing `error`/`aria-live` handling).

**Write-path decision is read live, not frozen (implementation drift, T046)**: the `onChange`
handler decides account-vs-`localStorage` by reading a `profileRef.current` ref (always holding
the latest `profile` from `useAuth()`) at the moment of the click - never a `profile`/`signedIn`
value closed over when the handler was attached. `AuthContext` genuinely fires more than one
`setSession`/`setProfile` update around a single sign-in/out transition (an `onAuthStateChange`
update racing `signOut()`'s own explicit calls); a handler that decided once, at attach time,
could act on a value that had already gone stale by the time the user actually clicked. Found by
`tests/e2e/self-assessment-checklist.spec.ts`.

**Re-hydration is keyed on `role`+`loading`, never on `profile`/`profile?.id`
(implementation drift, T046)**: the effect that finds the list, resolves each item's initial
`checked` state, and attaches handlers depends on `[course_code, unit_no, topic_no, locale, role,
loading]`. `role` (derived from `profile?.role`, a primitive) only changes on a genuine sign-in/
out transition, so this only re-hydrates when it must - a version keyed on `profile?.id` re-ran
on every one of AuthContext's redundant updates, and each re-run reset every checkbox's `checked`
to a freshly-recomputed value, capable of stomping a tick made a moment earlier if a stale run's
DOM-mutating code executed after the click. The effect also returns early while `loading` is
true: `role`/`profile` both read as `null` during AuthContext's own not-yet-resolved window,
indistinguishable from "genuinely signed out" by value alone - hydrating during that window on a
freshly-signed-in page load reads `localStorage` for what is about to turn out to be a signed-in
session, and the resulting checked-state can coincidentally match the not-yet-merged account
state, masking that the real merge into the account never actually ran.

**`insertHint`/`insertErrorContainer` are idempotent (implementation drift, T046)**: each replaces
any existing element carrying its own testid under the list's parent rather than inserting
another one alongside it, as a second line of defence against any future re-hydration pass
independent of the fixes above.

## Resolving each item's checked state on load

- **Signed in, any load** (research.md R4): attempt the merge first (whatever `sa:`-prefixed
  local keys currently exist, usually none - a signed-in session's own writes never touch
  `localStorage`), then proceed as "signed in" below. Not gated by a persistent flag - the
  `ignoreDuplicates: true` upsert makes a repeat attempt against an already-covered position a
  safe no-op, and each attempted key is deleted on success, so this correctly picks up local
  ticks from *any* later sign-out-then-tick-then-sign-in cycle, not only the device's first ever
  sign-in (a flag-based version of this shipped first and was found, by
  `tests/e2e/self-assessment-checklist.spec.ts`, to permanently disable every merge after the
  first - see research.md R4's "Implementation drift" note).
- **Signed in**: fetch the student's `self_assessment_checks` rows for
  `(course_code, unit_no, topic_no, locale)` (one query, all positions at once). For a position
  with a stored row: if `normalize(stored.item_text_snapshot) === text`, render `checked =
  stored.checked`; otherwise (FR-009) render `checked = false` and do **not** write anything back
  merely for having detected the mismatch - the stale row is left as-is until the student next
  toggles that item.
- **Signed out, or `getSupabase()` unavailable** (Edge case "Account services unavailable"): read
  `localStorage['sa:<course>:<unit>:<topic>:<locale>:<position>']`; if absent, `checked = false`.
  Every write for this session target goes to `localStorage` only, and the section shows the
  "sign in to sync across devices" hint (FR-003) once, above the list. The hint text is a
  bilingual `MESSAGES` dict keyed by `useDocusaurusContext().i18n.currentLocale`, the same
  convention every other reader-facing control in this codebase follows (Art. III.8/X) - it is
  not hardcoded English. The mechanism itself is locale-agnostic by construction (position-keyed,
  never heading text or item wording), so it works identically in `ur` **once a topic's Urdu
  translation actually has real `- [ ]` checklist items** - as of this writing, no course's Urdu
  translation does yet (every `## خود جائزہ فہرست` section in this repo is still a `<!-- TODO -->`
  placeholder), a content gap tracked separately from this feature.
  `tests/e2e/self-assessment-checklist.spec.ts` asserts `ur`/RTL rendering of the page and the
  graceful-fallback path (below) this real, currently-incomplete content exercises today.

## What this contract does NOT cover

Whether the underlying `- [ ]` markdown renders correctly at all (that is Spec 008's
`topic-cycle.md` contract and `check-unit-depth.mjs`'s job); the Progress-area roll-up query
(`data-model.md`'s "Extended content-index record" + `console-operations.md` table A); the
merge-on-sign-in trigger point itself (an `AuthContext` state-change effect, not part of this
component).
