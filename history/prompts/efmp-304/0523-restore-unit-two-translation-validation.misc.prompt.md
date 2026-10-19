---
id: 0523
title: Restore Unit Two Translation Validation
stage: misc
date: 2026-10-18
surface: agent
model: GPT-6 Codex
feature: efmp-304
branch: crew/efmp-304-u02-translate-r1
user: board-direct
command: Read .crew/brief.md
labels: ["board-direct", "translation", "g4", "retry"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-304/reviews/unit-02/G4/retry-verification.md
  - history/prompts/efmp-304/0523-restore-unit-two-translation-validation.misc.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
  - node specs/content/efmp-304/translations/unit-02/check-mirror.mjs
  - npm run figures:variants:check
  - Temporary reviewed check with automatic draft restoration
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Regenerated the missing ignored content-status artifact, verified the existing six-page Urdu mirror and unchanged 44-file manifest, and recorded retry validation in the handoff while preserving the existing G4 row. Translation stays draft; no review certification.

## Outcome

- ✅ Impact: Resolved the reported checkout validation failure without changing translated content.
- 🧪 Tests: All 13 draft content gates passed; mirror checker and 796 figure variants passed. Temporary reviewed run found only open G4/G5 rows and temporary report staleness.
- 📁 Files: Translation handoff and this PHR; existing G4 tracker row preserved. Generated status JSON remains ignored.
- 🔁 Next prompts: English author repairs, full-page Urdu render inspection and fresh independent G5.
- 🧠 Reflection: Generate ignored checkout artifacts before comparing gate results. Structural verification does not certify semantic parity.

## Handoff (for CEO and agents)

- Shipped / changed: Existing translation revalidated and missing local status artifact regenerated.
- Decisions the team must respect: Keep translation_status draft and G4 in progress; do not mark G3/G5 done. Preserve existing translations and frozen terminology bank.
- Pending / next owner: English author resolves G3 findings; authorised rendering session inspects full Urdu pages; independent reviewer handles G5; curriculum owner approves unbanked terminology.
- Paperclip issues affected: No Paperclip actions; existing handoff associates follow-up with TEX-23.

## Evaluation notes (flywheel)

- Failure modes observed: Ignored static/content-status.json was missing after checkout. Editing the bound translation handoff invalidated the G2 manifest. Restored both the handoff and tracker, and moved retry notes to the excluded review-output folder.
- Graders run and results (PASS/FAIL): Draft content gates PASS 13/13; mirror PASS; variants PASS. Temporary reviewed run intentionally FAIL on unfinished stage rows and temporary report staleness only.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Run full-page RTL and A4 inspection in an authorised rendering session.
