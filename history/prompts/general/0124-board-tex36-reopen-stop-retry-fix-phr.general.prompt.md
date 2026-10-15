---
id: 0124
title: board-tex36-reopen-stop-retry-fix-phr
stage: general
date: 2026-10-12
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-36
user: M Yousif Channa
command: ASK CEO TO FINALIZE tex-36 rebranding, solve its issues / stop the retry run and fix the PHR first
labels: ["board-direct", "paperclip", "tex-36", "rebranding", "ci"]
links:
  spec: null
  ticket: TEX-36
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/113
files:
  - history/prompts/general/0123-tex36-rev8-finalize-rebrand.general.prompt.md
  - history/prompts/general/0124-board-tex36-reopen-stop-retry-fix-phr.general.prompt.md
tests:
  - gh pr view 113 / gh run view 37898933849 --log-failed (read-only)
  - git diff origin/main...agent/TEX-36 em dash scan (0 after fix)
---

## Prompt

ASK CEO TO FINALIZE tex-36 rebranding, solve its issues

tex-36 rebranding is slow?

stop the retry run and fix the PHR first

## Response snapshot

1. TEX-36 was marked done while PR #113 was open with CI red: 41 "G2 en-draft: stale or incomplete input manifest" findings, caused by the PR editing `.specify/memory/constitution.md`, a hashed input of every G2 manifest (`scripts/lib/review-evidence.mjs:166,190`). The branch was also 49 commits behind main, added 30 lines with em dashes, left the Urdu mirrors unaligned and shipped a 404 KB `adtti.png`. Reopened TEX-36 (done -> todo), posted a six-point finalize brief (comment 034e24a0) and invoked the CEO heartbeat.
2. Slowness: three CEO runs failed on "Insufficient token quota" (18:51-19:35Z); run 9b310213 did the rev8 fixes and rev9 contrast fix, then timed out at 3600s; retry run 67cce519 started at 20:49Z after the work was already done. PR #113 CI green, waiting only on board review.
3. Cancelled retry run 67cce519 (cancelled 21:07:44Z; it pushed nothing). Fixed PHR 0123: removed its quoted em dash and corrected the Urdu child issue from TEX-50 (the Unit 6 review issue) to TEX-51.

## Outcome

- TEX-36 reopened and briefed; CEO retry run cancelled; PHR 0123 corrected on agent/TEX-36.
- An earlier uncommitted draft of this record (0122 in the main checkout) is superseded by this file; ID 0122 is taken by PR #135.

## Handoff (for CEO and agents)

- Shipped / changed: PR #113 is green and complete (rebrand, constitution untouched, zero em dash in the diff, `adtti.png` 48 KB). PHR 0123 corrected.
- Decisions the team must respect: the branding PR does not touch the constitution; Article I audience wording, if wanted, is a separate amendment. TEX-36 stays in_progress until PR #113 merges. Do not re-run TEX-36 work; it is finished.
- Pending / next owner: board approves and merges PR #113. TEX-51 (Urdu landing, contact, intro alignment) is the follow-up; its title wrongly starts "TEX-50:" and should read "TEX-36:".
- Paperclip issues affected: TEX-36, TEX-51.
