---
id: "0538"
title: "Investigate missing print QR codes"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: what happened to the qr codes
labels: ["board-direct", "print", "qr", "diagnosis"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/274
files: []
tests:
 - headless Chromium against live textbook.com.pk (EFMP-302 U1 index, topic-01, topic-02, UR topic-01)
---

## Prompt

what happened to the qr codes, i donot see any on pdf print. there was a pr for it dig out

## Response snapshot

PR #274 (print QR beside each off-page link, plus subject | unit | topic print title) merged to main
2026-10-19 11:28Z (d10054da) and is deployed (deployed SHA 4d7d41a8 contains it; encoder in the live
bundle). Live test: the print button and Ctrl+P add the codes (topic-01: 1, unit index: 4), and the code
renders 20 mm under print media. Two reasons they are rarely seen:
1. The browser's own Print / Save as PDF menu fires `beforeprint`, which cannot wait. On the first print
   the encoder is not loaded yet, so the snapshot has no QR (measured 0 at beforeprint, 1 a moment later).
2. Topic pages carry very few links: one DOI under "Further reading" at the end of each topic page.
   References and sources are plain text, so they get no code.

## Outcome

- Impact: diagnosis only; nothing changed.
- Proposed fix (awaiting owner): preload the encoder when the page goes idle so `beforeprint` always has
  it; optionally give QR codes to DOIs/URLs in the reference list.

## Handoff (for CEO and agents)

- Shipped: nothing.
- Pending: owner choice on the preload fix and on QR for references.
- Paperclip issues affected: none.
