---
id: 20261282
title: Grey out the Urdu toggle and add a callout on untranslated pages
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-untranslated-toggle
user: M Yousif Channa
command: continue (#807)
labels: [board-direct, i18n]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#807"
  adr: null
  pr: null
files:
  - src/plugins/urdu-pages.mjs
  - src/lib/urduAvailability.ts
  - docusaurus.config.ts
  - src/components/LanguageToggle.tsx
  - src/components/LanguageToggle.module.css
  - src/components/LanguageToggleNavbarItem.tsx
  - src/components/TranslationStatusBadge.tsx
  - src/theme/DocItem/Content.tsx
  - tests/e2e/untranslated-toggle.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tsc (no errors in changed files)
  - plugin run locally: 139 of 992 pages have no Urdu file (6.9 KB of global data)
  - tests/e2e/untranslated-toggle.spec.ts (CI)
---

## Prompt

continue

(Also recorded here: with the owner's approval in this session, migration 0058 from PR #893 was
dry-run inside BEGIN/ROLLBACK and then applied to the production database in one transaction with
`notify pgrst, 'reload schema'`; tests/rls/student-notes.test.mjs passed 5/5 against it.)

## Response snapshot

The navbar toggle sits outside the doc context, so a new local plugin (`src/plugins/urdu-pages.mjs`)
lists, as global data, every docs/guides/licence page whose Urdu file is missing (139 of 992). The
doc page checks its own source against the list and tells the toggle through a small shared store
(`src/lib/urduAvailability.ts`). On an English page without Urdu, the Urdu segment becomes a greyed
button (`aria-disabled`, bilingual tooltip) that shows a bilingual callout when tapped instead of
opening an English fallback; the phone drawer item is greyed too. The Urdu route of such a page
shows the callout directly; the old "not yet available" badge (only on hand-placed index pages) now
stays silent so the notice never doubles.

## Outcome

- ✅ Impact: readers are told plainly when a page has no Urdu yet, everywhere.
- 🧪 Tests: e2e for the greyed toggle, the callout on both routes, and a translated page.
- 📁 Files: see list above.
- 🔁 Next prompts: #808 assessment cards.
- 🧠 Reflection: listing the missing pages instead of the translated ones keeps the global data small.

## Handoff (for CEO and agents)

- Shipped / changed: #807 (the PR closes it). Migration 0058 is LIVE (2026-11-26).
- Decisions the team must respect: Urdu availability comes from file existence in `i18n/ur/<plugin>/current`; draft translations still count as available (the draft badge stays).
- Pending / next owner: merge #893 promptly, because main's old notes RLS test now fails against the live 0058.
- Paperclip issues affected: none; GitHub #807, #806.

## Evaluation notes (flywheel)

- Failure modes observed: a missing useMemo import, caught by tsc.
- Graders run and results (PASS/FAIL): tsc PASS; RLS 5/5 PASS (0058)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
