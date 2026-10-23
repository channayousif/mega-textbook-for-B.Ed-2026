---
id: 855
title: "Fix glossary.json duplicate and removed terms"
stage: general
date: 2026-10-23
surface: agent
model: "LongCat-2.0 (longcat/LongCat-2.0)"
feature: none
branch: crew/gsos-301-u03-author
user: board-direct
command: "Read .crew/brief.md and carry it out completely"
labels: ["board-direct", "gsos-301", "glossary", "crew-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - glossary.json
tests:
  - "npm run check:content (13 gates, all pass)"
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

The brief identified that the previous attempt on this branch broke the append-only rule for glossary.json: duplicate terms (organization, bureaucracy) were appended, and 7 statistics terms from main were deleted. I fixed both violations by restoring all 465 main entries exactly as-is and re-appending only the 8 genuinely new sociology terms. All 13 content gates pass after the fix.

## Outcome

- ✅ Impact: glossary.json now has 473 entries (465 from main + 8 new), no duplicates, no removed terms
- 🧪 Tests: `npm run check:content` - all 13 gates pass
- 📁 Files: glossary.json
- 🔁 Next prompts: none for this unit; G3 review is the next stage
- 🧠 Reflection: the append-only registry rule is easy to violate when adding terms that already exist under different contexts; the fix is to keep main's entries and only append truly new terms

## Handoff (for CEO and agents)

- Shipped / changed: glossary.json restored to append-only compliance; duplicate Organization/Bureaucracy entries removed; 7 deleted statistics terms restored
- Decisions the team must respect: glossary.json is append-only; never modify or remove existing entries, only add new ones after the main set
- Pending / next owner: G3 English review for GSOS-301 Unit 3 (not part of this job)
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: previous attempt created duplicate entries AND removed existing entries from main
- Graders run and results (PASS/FAIL): check:content - PASS (13/13)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
