---
id: crew-efmp-305-u06-repair_en-r1
title: crew repair_en EFMP-305 unit 6 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u06-repair_en-r1
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-305/crew-efmp-305-u06-repair_en-r1.misc.prompt.md
  - specs/content/efmp-305/reviews/unit-06/G3/20261110-repair-notes.md
  - specs/content/efmp-305/tasks.md
tests:
  - npm run build:content-status
  - npm run check:content
  - UNICEF PDF SHA-256 comparison and passage inspection
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the latest G3 report findings for EFMP-305 Unit 6. The 193-minute depth finding is stale (report input hashes predate commit 24d5f43d7; current total is 149, gate exits 0). The research-context advisory needs no edit. The UNICEF full text was re-retrieved on 2026-11-10 with a matching SHA-256 and corrected page locators, recorded in a new review-folder repair note. The shared source records were left unchanged to preserve the Unit 1 and Unit 6 G2 evidence bindings. Appended the advisory tracker row and left G3 unticked.

## Outcome

- Impact: resolved the EFMP-305 Unit 6 G3 repair findings for report 20261108T203238Z-g3-desk-2a3b76c3.json without invalidating accepted G2 evidence.
- Tests: all 14 content gates pass after an ignored content-status cache refresh.
- Files: 3 file(s), listed above. Scratch PDF and extracted text stay in .crew/.
- Next prompts: fresh independent G3; existing draft Urdu still needs independent G5 and rendered inspection.
- Reflection: the report's input manifest predates the reading-minutes recompute, so verify current bytes before editing content.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 6 repair note for the 20261108 G3 report, advisory Unit 6 G3 tracker row naming 20261108T203238Z-g3-desk-2a3b76c3.json, and this PHR.
- Decisions the team must respect: keep the approved 140-170 band; retain empirical caveats; no certification, publication change or reviewer identity substitution; do not edit shared source records bound by G2 evidence without refreshing that evidence.
- Pending / next owner: independent reviewer owns fresh G3; G5 and fresh Urdu render inspection remain pending from earlier jobs.
- Paperclip issues affected: no ticket supplied in the crew brief; historical Unit 6 references TEX-78 and TEX-84 are unchanged.

## Evaluation notes (flywheel)

- Failure modes observed: the reported 193-minute total does not reproduce (current values are 6, 33, 38, 34, 29, 9). The HTTP 403 no longer reproduces. Editing the shared unicef2014 source record invalidated Unit 1 and Unit 6 G2 evidence and generated status, so the repair lives in the review folder instead.
- Graders run and results (PASS/FAIL): all 14 content gates PASS; git diff --check PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): fresh independent review of current inputs.
