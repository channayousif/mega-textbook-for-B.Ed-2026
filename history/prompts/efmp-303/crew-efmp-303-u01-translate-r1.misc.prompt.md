---
id: crew-efmp-303-u01-translate-r1
title: crew re-verify EFMP-303 unit 1 G4 Urdu mirror
stage: misc
date: 2026-10-19
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u01-translate-r1
user: crew
command: crew translate re-verify
labels: ["crew", "claude", "translate", "verify"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u01-translate-r1.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Brief: Crew job efmp-303-u01-translate-r1

Task: Translate EFMP-303 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

## Response snapshot

The Urdu mirror for EFMP-303 Unit 1 was already complete on origin/main from a prior agy pass (branch crew/efmp-303-u01-translate, PHR crew-efmp-303-u01-translate). This r1 branch was created from main with no new content changes needed. Re-verified the full mirror: all 13 content gates pass, structural parity (7 files, 8 figures, 3 glossaries, 6 print handouts, heading vectors), assessment bank (10/10/5), and key_terms (Curriculum/نصاب, Development/نشوونما) confirmed against terminology.csv. Temporary reviewed flip confirmed parity gates are silent-clean; reverted both index files to draft.

## Outcome

- Impact: verified (no-op) — EFMP-303 Unit 1 Urdu mirror already complete and merged on main.
- Tests: npm run check:content 13/13 PASS.
- Files: 1 file added (this PHR); no content files changed.
- Next prompts: crew lead should flip G4 tracker row to ✅ if the board accepts the prior agy mirror as G4-done, then dispatch an independent G5 review.
- Reflection: branch was spun from main already containing the merged translate; the r1 re-verify was a guard against a stale branch and came back clean.

## Handoff (for CEO and agents)

- Shipped / changed: nothing new; this PHR records the r1 verification pass.
- Decisions the team must respect: translation_status stays draft; G4/G5 tracker rows must not be flipped by this session. The G4 row remains ▣ in tasks.md.
- Pending / next owner: independent G5 Urdu review of EFMP-303 Unit 1 remains pending (G5 ▢).
- Notes for the next job on this unit:
  - All 8 .ur.svg/.ur.dark.svg variants wired in topics 1-4; figures:variants:check clean.
  - Structural, figure, and terminology parity verified clean under temporary reviewed flip (reverted).
  - Proposed unbanked terms recorded in translation-handoff.md (Development sense split: نشوونما vs ترقی).
  - G3 escalated (host brief constraints); board G0/G1 intake still pending.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none (clean mirror, clean gates).
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief v1 re-verify (r1)
- Next experiment (smallest change to try): none
