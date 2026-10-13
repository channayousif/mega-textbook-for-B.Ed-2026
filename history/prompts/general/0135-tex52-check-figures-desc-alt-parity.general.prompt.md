---
id: 0135
title: Assert figure <desc> matches carrier alt (TEX-52)
stage: general
date: 2026-10-13
surface: agent
model: gemini-3.8-flash-high
feature: none
branch: agent/TEX-52
user: WebLeadAgy
command: null
labels: ["weblead", "webleadagy", "figures", "gate", "parity", "tex-52"]
links:
  spec: null
  ticket: TEX-52
  adr: null
  pr: null
files:
  - scripts/check-figures.mjs
  - tests/unit/figures-gate.test.mjs
  - history/prompts/general/0135-tex52-check-figures-desc-alt-parity.general.prompt.md
tests:
  - vitest run tests/unit/figures-gate.test.mjs -> 44/44 PASS
  - npm run check:figures -> fails on desc/alt drift; catches all 20 unmerged mismatches in EFMP-302 Unit 1 on main; 0 mismatches on PR #139
---

## Prompt

TEX-52: check:figures should assert <desc> == carrier alt (the gap that hid the TEX-25 calque)

## Response snapshot

In `scripts/check-figures.mjs`, updated `lintSvg` and `checkUnit` to assert that the `<desc>` text of each placed figure equals the carrier `alt` in the matching locale (EN for `<figId>.svg` and `.dark.svg`, UR for `<figId>.ur.svg` and `.ur.dark.svg`). Carrier lookup checks both `topic-*.mdx` and `index.mdx` using `attr` (supporting both double-quoted and single-quoted `alt='...'` attributes). For dark variants, the failure message directs authors to regenerate with `npm run figures:variants` after updating the light source. Updated `tests/unit/figures-gate.test.mjs` test fixtures to match carrier alt, and added 4 new unit tests covering EN light mismatch, UR light mismatch, dark variant fix instructions, and single-quoted carrier alt. Repository-wide scan identified 40 units across 7 courses with un-synced `<desc>` strings outside EFMP-302 Unit 1; filed unassigned child issue TEX-54 for BilingualAuthor / board operator to schedule the content pass.

## Outcome

- ✅ Impact: Closes the validation gap in `check:figures` that hid `<desc>` drift from page alt text.
- 🧪 Tests: `tests/unit/figures-gate.test.mjs` 44/44 PASS.
- 📁 Files: `scripts/check-figures.mjs`, `tests/unit/figures-gate.test.mjs`, `history/prompts/general/0135-tex52-check-figures-desc-alt-parity.general.prompt.md`.
- 🔁 Next prompts: Board to review and merge PR #139 (EFMP-302 U1 32/32 parity); assign TEX-54 to BilingualAuthor to sync remaining 40 units.
- 🧠 Reflection: Fixtures in test suite also had drift between validSvg default desc and figureEl default alt; aligned fixtures and added regression assertions.

## Handoff (for CEO and agents)

- Shipped / changed: `scripts/check-figures.mjs` asserts `<desc> == carrier.alt` in both locales for placed SVGs and dark variants.
- Decisions the team must respect: Carrier alt is the authority; `<desc>` must be synced to it, not the reverse. Dark variants must be regenerated via `npm run figures:variants`.
- Pending / next owner: Board to review draft PR; BilingualAuthor / Board to address out-of-unit drift documented in TEX-54.
- Paperclip issues affected: TEX-52, TEX-54, TEX-25.

## Evaluation notes (flywheel)

- Failure modes observed: Cross-issue writes rejected without task binding; delegation cycle when assigning child issue back to parent issue creator.
- Graders run and results (PASS/FAIL): Vitest unit tests PASS (44/44).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
