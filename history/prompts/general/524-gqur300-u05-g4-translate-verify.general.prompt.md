---
id: 524
title: gqur300-u05-g4-translate-verify
stage: green
date: 2026-10-18
surface: agent
model: LongCat-2.0
feature: 015-licence-content-tree
branch: crew/gqur-300-u05-translate-r1
user: opencode
command: translate-unit
labels: [gqur-300, unit-05, urdu, g4, translate]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-300/reviews/unit-05/G4/handoff.md (created)
  - specs/content/gqur-300/tasks.md (G4 row updated ▢ → ▣)
tests:
  - npm run check:content (12/13 pass; content-status pre-existing on main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified the existing Urdu mirror (already merged to main by a prior attempt) against the English baseline: all 6 files have matching heading-level vectors, component counts, and figure IDs. The temporary reviewed-flip test confirmed structural parity gates pass with only the expected 11 unbanked-terms and tracker-row findings. Wrote the G4 handoff, updated the G4 tracker row to ▣, kept translation_status draft. The 11 statistics terms and the Mode/عاد discrepancy are proposed to the owner.

## Outcome

- ✅ Impact: GQUR-300 Unit 5 G4 Urdu translation recorded complete; handoff written; corpus gate green (excluding pre-existing content-status)
- 🧪 Tests: check:content 12/13 pass; content-status fails identically on origin/main (gitignored generated artifact)
- 📁 Files: 1 created (handoff.md), 1 modified (tasks.md)
- 🔁 Next prompts: owner banks 11 statistics terms; fresh independent G5 review with rendered Urdu evidence
- 🧠 Reflection: The mirror was already merged; this job was pure verification + tracker recording. The temporary reviewed-flip technique surfaces the parity gates that otherwise stay silent under draft.

## Handoff (for CEO and agents)

- Shipped / changed: G4 handoff file at specs/content/gqur-300/reviews/unit-05/G4/handoff.md; G4 tracker row marked ▣ with full detail
- Decisions the team must respect: translation_status stays draft (not reviewed); no G3/G5 row flipped; 11 key_terms proposed to owner not silently banked
- Pending / next owner: Curriculum owner banks 11 statistics terms (or rules on Mode/عاد); independent G5 reviewer obtains rendered Urdu desktop/narrow/A4 evidence
- Paperclip issues affected: null
