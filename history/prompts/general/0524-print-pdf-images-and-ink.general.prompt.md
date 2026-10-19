---
id: "0524"
title: "Print PDF images and ink"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/print-pdf-images-and-ink
user: M Yousif Channa
command: fix print / save as PDF
labels: ["board-direct", "print", "figures", "a11y"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/lib/printPage.ts
 - src/components/PrintHandout.tsx
 - src/theme/Root.tsx
 - src/css/custom.css
 - tests/e2e/handout-print.spec.ts
 - history/prompts/general/0524-print-pdf-images-and-ink.general.prompt.md
tests:
 - Playwright print-to-PDF of the live EFMP-302 U1 topic-01 page (EN + UR, light + dark) with the fix injected
 - tsc --noEmit (11 errors, all pre-existing on main)
 - tests/e2e/handout-print.spec.ts new regression (runs in CI)
---

## Prompt

I have noticed that on Print/Save PDF at each page: 1. Images are not properly displayed. 2. the text is greyed, not sharp, the print will be dull. fix it.

## Response snapshot

Reproduced on the live site with headless Chromium print-to-PDF. Images: figures are loading="lazy";
at print time 0 of 3 visible figures had loaded in light mode and 1 of 3 in dark mode (the light copy a
dark-mode reader never saw is display:none on screen). Root.tsx's beforeprint switch to eager could not
help because the snapshot does not wait for the fetches. Text: print kept the dark theme's #e3e3e3 body
text and light headings on white paper; light mode's greys were also faint.
Fix: src/lib/printPage.ts loads every image, then calls window.print(); used by the PrintHandout button
and by a Ctrl/Cmd+P handler in Root.tsx (beforeprint stays as a best-effort fallback for the browser
menu). The A4 @media print block now forces the light ramp, darker greys and #000 body text in either
theme. Verified: 3/3 figures loaded and body text rgb(0,0,0) in light and dark, EN and UR.

## Outcome

- Impact: printed handouts include every figure and print in black ink.
- Tests: listed above.
- Files: listed above.
- Reflection: printing from the browser's own menu (not the button or Ctrl/Cmd+P) can still miss
  images that were never scrolled into view; that path cannot be delayed.

## Handoff (for CEO and agents)

- Shipped: print image loading + print ink palette.
- Decisions to respect: print media always uses the light palette regardless of screen theme.
- Pending: CI e2e; owner merge (deploys to production).
- Paperclip issues affected: none (Paperclip paused).
