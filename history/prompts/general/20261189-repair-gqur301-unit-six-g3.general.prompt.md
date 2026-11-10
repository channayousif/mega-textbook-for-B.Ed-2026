---
id: 20261189
title: Repair GQUR Unit 6 findings (latest desk report)
stage: general
date: 2026-11-10
surface: agent
model: opencode (LongCat-2.0)
feature: none
branch: crew/gqur-301-u06-repair_en-r1
user: crew
command: Read .crew/brief.md and carry it out
labels: [opencode, crew, gqur-301, unit-06]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-301/tasks.md
  - history/prompts/general/20261189-repair-gqur301-unit-six-g3.general.prompt.md
tests:
  - npm run check:content (all 14 gates pass)
  - scripts/heavy.sh npm test
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified that the latest desk report's content findings F3-F7 were already repaired on main in commit 6110bffe8 and match this report's frozen input manifest, so no further content edits were required. Appended an unticked advisory G3 tracker row naming the report. F1, F2 and F8 remain with owner and review hosts. No push and no PR.

## Outcome

- ✅ Impact: Recorded the repair pass for the latest desk report and confirmed the Unit 6 English content already satisfies its F3-F7 findings.
- 🧪 Tests: npm run check:content passes all 14 gates; scripts/heavy.sh npm test passes.
- 📁 Files: specs/content/gqur-301/tasks.md tracker row; this PHR.
- 🔁 Next prompts: Fresh independent G3 after authority and provenance resolution, authorised figure geometry plus narrow-screen and A4 inspection, then Urdu translation.
- 🧠 Reflection: Summary statistics prompt diagnosis; a standard deviation alone cannot select a teaching programme or establish a universal claim about every class.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory G3 tracker row for specs/content/gqur-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-79674f38.json; PHR.
- Decisions the team must respect: G3 and G5 stay open with no certification; the latest desk report re-issues the 20261102 findings against the same post-repair bytes, so the repair pass verifies rather than re-edits.
- Pending / next owner: Owner/evaluator owns G1 authority; review host owns historical author provenance, authorised figure geometry and narrow/A4 rendered inspection; translator owns the still-absent Urdu mirror after prerequisites.
- Paperclip issues affected: gqur-301-u06-repair_en-r1; no ticket identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The 20261108 desk report carries findings identical to the 20261102 report while its input manifest hashes the post-repair files, so the report is a carry-forward rather than a fresh review. Manifest hashes for the mdx and fig-U6-6 SVGs were recomputed and matched.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14); scripts/heavy.sh npm test PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of the committed repaired inputs on an authorised host.
