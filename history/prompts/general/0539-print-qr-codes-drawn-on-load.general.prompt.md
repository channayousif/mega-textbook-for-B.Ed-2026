---
id: "0539"
title: "Print QR codes drawn on load"
stage: green
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/print-qr-preload
user: M Yousif Channa
command: On Page load, encoder should create the qr code once and store them
labels: ["board-direct", "print", "qr"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/lib/printPage.ts
 - src/theme/Root.tsx
 - tests/unit/print-page.test.mjs
 - tests/e2e/handout-print.spec.ts
 - history/prompts/general/0538-investigate-missing-print-qr-codes.general.prompt.md
 - history/prompts/general/0539-print-qr-codes-drawn-on-load.general.prompt.md
tests:
 - vitest tests/unit/print-page.test.mjs (9 pass, 2 new)
 - playwright tests/e2e/handout-print.spec.ts against a local build (9 pass, 1 new)
 - tsc --noEmit (no errors in touched files)
---

## Prompt

On Page load, encoder should create the qr code once and store them. serve them when Print/Save as pdf button is clicked. if page is updated, the stored qr codes should exper and need to be generated again.

## Response snapshot

- `prepareLinkQrCodes()` draws a page's link QR codes once and stores them in memory under
  `qrCacheKey(pathname, urls)`. A new `PrintQrPreparer` in Root runs it in an idle callback (3 s timeout,
  setTimeout fallback) on first load and after every client-side navigation. Pages without links never
  load the encoder.
- Every print path serves the stored codes as clones. `beforeprint` (browser Print / Save as PDF menu)
  now inserts them synchronously. If the path or any link URL changed since, the key no longer matches,
  so the codes expire and are drawn again before insertion.
- A print that starts before the page settles now only prepares codes for the next print, instead of
  inserting them late, after `afterprint` had cleared the page.
- Tests: unit test for the expiry key; e2e test that the menu path (`beforeprint`) gets the stored code
  on topic-01, then after client-side navigation the new code for topic-02. The existing Ctrl+P test now
  waits for hydration; it failed once on a cold server because it pressed Ctrl+P before React attached the
  handler, then passed 4/4 and in the full run.
- Storage is in memory per tab: drawing takes milliseconds and a new deploy reloads the page anyway, so
  localStorage would add expiry problems without saving time.

## Outcome

- Impact: QR codes print from the browser's own menu and Save as PDF, not only from the print button
  and Ctrl+P.
- Note: the encoder chunk (qrcode-generator) now loads on every page view that has off-page links,
  after the page is idle.

## Handoff (for CEO and agents)

- Shipped: PR for stored print QR codes (see PR link).
- Decisions to respect: QR codes are prepared at idle on pages with links; do not move the encoder back
  to print-time loading, or the browser menu loses the codes again.
- Pending: owner merges; production deploys automatically after CI.
- Paperclip issues affected: none.
