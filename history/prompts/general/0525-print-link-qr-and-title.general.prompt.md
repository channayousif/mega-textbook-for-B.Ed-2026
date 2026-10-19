---
id: "0525"
title: "Print link QR codes and title"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/print-qr-and-title
user: M Yousif Channa
command: print links as QR codes, subject | unit | topic title
labels: ["board-direct", "print", "qr"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/lib/printPage.ts
 - src/theme/Root.tsx
 - src/components/PrintHandout.tsx
 - src/css/custom.css
 - package.json
 - package-lock.json
 - tests/unit/print-page.test.mjs
 - tests/e2e/handout-print.spec.ts
 - history/prompts/general/0525-print-link-qr-and-title.general.prompt.md
tests:
 - vitest tests/unit/print-page.test.mjs (7 pass)
 - Playwright print-to-PDF of the live EFMP-302 U1 topic-01 page, EN light + UR dark, helper bundled and injected; QR decoded from the PDF with OpenCV
 - tests/e2e/handout-print.spec.ts new test (runs in CI)
---

## Prompt

I have noticed that on Print/Save PDF at each page: 1. links shoud be as QR codes for easy access. 2. on top of the page, title is printed, it should be subject|unit|topic format.   fix it.

## Response snapshot

Owner chose: QR codes for external links and links to other textbook pages (not # anchors or
breadcrumbs), printed beside each link. While printing, src/lib/printPage.ts adds a 20 mm QR (SVG built
from qrcode-generator, loaded only on print) with the short URL after each such link, and sets
document.title to the breadcrumbs minus the home and semester crumbs joined with " | " (the browser
prints it in the page header). afterprint restores the title and removes the codes. Button and
Ctrl/Cmd+P await the encoder; the browser menu path is best effort. Verified on the live page:
title "EFMP-302 · Teaching Profession | Unit 1 · Understanding Teaching | Topic 1.1 · What makes teaching
a profession" (and the Urdu equivalent), QR decodes to https://doi.org/10.1016/j.sbspro.2010.12.444.

## Outcome

- Impact: printed pages carry scannable links and a subject | unit | topic header.
- Tests: listed above.
- Files: listed above.
- Reflection: stacked on #272 (same print path); merge #272 first. The browser shows the header only
  when its "Headers and footers" print option is on.

## Handoff (for CEO and agents)

- Shipped: link QR codes + print title.
- Decisions to respect: QR scope = external + other textbook pages, placed beside each link (owner, 2026-10-19).
  New runtime dependency qrcode-generator (MIT, no deps), loaded only when printing.
- Pending: CI; owner merges #272 then this PR (deploys to production).
- Paperclip issues affected: none.
