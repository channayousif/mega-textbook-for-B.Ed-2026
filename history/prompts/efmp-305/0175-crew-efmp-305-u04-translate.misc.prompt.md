---
id: 0175
title: "Crew efmp-305 u04 translate"
stage: misc
date: 2026-10-18
surface: agent
model: longcat/LongCat-2.0
feature: efmp-305
branch: crew/efmp-305-u04-translate
user: board-direct
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: ["translate", "efmp-305", "unit-04", "urdu", "crew"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/unit-assessment.mdx (new)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/index.mdx (key_terms case fix)
tests:
  - npm run check:content (12/13 pass; 1 pre-existing gitignored content-status.json missing)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

Crew job efmp-305-u04-translate: translate EFMP-305 Unit 4 into its complete Urdu mirror at G4. The Urdu mirror already had index.mdx, topic-01.mdx, topic-02.mdx, and unit-teacher-notes.mdx from earlier work on main. The missing file was unit-assessment.mdx (379 lines, 10 MCQ + 10 RRQ + 5 ERQ with bounded answers). Created the Urdu assessment with all items translated, Bloom tags mapped to the corpus convention (Remember→یاد رکھنا, Understand→سمجھنا, Apply→اطلاق, Analyze→تجزیہ, Evaluate→جائزہ, Create→تخلیق), option letters mapped to Urdu (A→الف, B→ب, C→ج, D→د), item counts and heading structure matched to the English. Fixed a pre-existing key_terms case mismatch in the UR index.mdx (Classroom management→Classroom Management) that would have failed the pipeline gate at reviewed. Ran the temporary flip check (both index.mdx to reviewed, gates run, flipped back to draft). All content gates pass except the pre-existing content-status.json finding.

## Outcome

- ✅ Impact: EFMP-305 Unit 4 now has a complete Urdu mirror (5/5 files). Assessment file is gate-passing and ready for independent G5 review.
- 🧪 Tests: npm run check:content 12/13 pass (the 1 failure is a pre-existing gitignored generated file, not in scope).
- 📁 Files: 1 new (unit-assessment.mdx), 1 modified (index.mdx key_terms case fix).
- 🔁 Next prompts: G5 Urdu review of this unit by an independent reviewer; G6 figure rendering.
- 🧠 Reflection: The existing Urdu translations from earlier work were structurally sound. The key_terms case mismatch was a latent bug that only surfaces at reviewed status.

## Handoff (for CEO and agents)

- Shipped / changed: Created UR unit-assessment.mdx with full 10/10/5 bank + bounded answers; fixed key_terms case in UR index.mdx.
- Decisions the team must respect: translation_status stays draft (G5 not done); no tracker rows flipped; option letter mapping follows assessment-translation.md convention.
- Pending / next owner: G5 Urdu review by an independent g5-reviewer session; the pipeline gate will show G4/G5 tracker rows not done until then (expected).
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: key_terms case mismatch in pre-existing UR index.mdx (latent, only fires at reviewed).
- Graders run and results (PASS/FAIL): npm run check:content 12/13 PASS (1 pre-existing FAIL).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
