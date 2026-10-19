---
id: crew-efmp-305-u06-translate-r1
title: crew verify EFMP-305 unit 6
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u06-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u06-translate-r1.misc.prompt.md
tests:
 - npm run check:content
 - npm run figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(.crew/brief.md body: Translate EFMP-305 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Scope: EFMP-305 Unit 6 only. Continue, do not restart. Done when check:content reports no finding origin/main does not, all work committed, CREW-SUMMARY line.)

## Response snapshot

Verified EFMP-305 Unit 6 Urdu mirror already complete on origin/main: 6 UR files present with clean heading and figure parity, all 6 .ur.svg/.ur.dark.svg variants wired (figures:variants:check clean), all 4 key_terms validate against terminology.csv, G4 row already recorded in tasks.md, translation_status stays draft. All 13 content gates pass except repo-wide check:content-status (gitignored static/content-status.json missing on all branches, out of scope).

## Outcome

- Impact: verification-only for EFMP-305 Unit 6; no content changes required, translation already merged.
- Tests: check:content PASS (12/13; only repo-wide check:content-status fails); figures:variants:check PASS.
- Files: 1 file(s) — this PHR.
- Next prompts: G5 independent Urdu review by a fresh g5-reviewer session.
- Reflection: branch was identical to origin/main at start; work was a re-verification, not a re-translation.

## Handoff (for CEO and agents)

- Shipped / changed: verification record (PHR) for EFMP-305 Unit 6 G4; no content edits.
- Decisions the team must respect: translation_status stays draft across all 6 UR files; G3/G5 stay advisory until qualified sign-off; no agent self-certification.
- Pending / next owner: G5 independent Urdu review by a fresh g5-reviewer session (do not self-review). Curriculum owner should ratify proposed terms: classroom culture (جماعتی ماحول کا چلن), empathy (ہمدردی), class charter (جماعتی عہد نامہ), buddy rota (ساتھی باری نامہ), shared support plan (مشترکہ معاونت منصوبہ).
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none in scope.
- Graders run and results (PASS/FAIL): check:content PASS, figures:variants:check PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
