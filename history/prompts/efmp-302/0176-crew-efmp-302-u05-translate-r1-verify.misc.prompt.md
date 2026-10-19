---
id: crew-efmp-302-u05-translate-r1-verify
title: crew verify EFMP-302 unit 5 Urdu mirror r1
stage: misc
date: 2026-10-18
surface: agent
model: longcat/LongCat-2.0
feature: efmp-302
branch: crew/efmp-302-u05-translate-r1
user: crew
command: crew translate r1
labels: ["crew", "claude", "translate", "verify"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
 files:
  - history/prompts/efmp-302/0176-crew-efmp-302-u05-translate-r1-verify.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

Crew job efmp-302-u05-translate-r1: Translate EFMP-302 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Scope: EFMP-302 Unit 5 only. Continue, do not restart. Done when check:content reports no new findings vs origin/main, all work committed, CREW-SUMMARY line emitted.

## Response snapshot

Verified the seven-file Urdu mirror (index, topic-01..04, unit-assessment, unit-teacher-notes) already present on origin/main from the 2026-10-17 Codex G4 run (PHR crew-efmp-302-u05-translate.misc.prompt.md). Confirmed structural parity: identical heading counts, all three <Glossary> carriers mirrored (Burnout, Multi-grade Classroom, Occupational Status), eight schematic <Figure> carriers pointing at .ur.svg variants, four raster illustrations, 10 MCQs with answer-key letters correctly mapped (d→د, c→ج, a→الف, b→ب), 10 RRQs, 5 ERQs. Verified key_terms block (Stress, Teacher Burnout, Multi-grade Classroom, Digital Professionalism) against terminology.csv - all accepted. Spot-checked semantic parity: hedge "may or may not travel" preserved as "لاگو بھی ہو سکتے ہیں اور نہیں بھی", quantity "262 Norwegian" preserved exactly, negations intact. All figure variants present (.svg, .dark.svg, .ur.svg, .ur.dark.svg; .webp for illustrations). Glossary.json definitions_ur present for all three terms. Ran npm run check:content: initial run flagged only static/content-status.json missing (gitignored generated file); generated via npm run build:content-status; rerun shows all 13 gates PASS. No new findings vs origin/main.

## Outcome

- Impact: verified EFMP-302 Unit 5 Urdu mirror is complete and gate-clean; no new translation work required.
- Tests: npm run check:content 13/13 PASS.
- Files: 0 translated (already on main); 1 PHR written.
- Next prompts: G5 independent Urdu review remains pending (open row); no further G4 work owed.
- Reflection: translation already shipped in prior merged PR; this r1 run confirms nothing regressed.

## Handoff (for CEO and agents)

- Shipped / changed: verified EFMP-302 Unit 5 G4 Urdu mirror is complete and gate-clean; no content changes made.
- Decisions the team must respect: G4 ur-translation row stays open (ADR-0019 - agent evidence cannot close it); translation_status stays draft; only an accepted G5 earns reviewed.
- Pending / next owner: independent G5 Urdu review (open row); full-site narrow/A4 render inspection deferred by crew brief prohibition on builds/dev servers.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (13/13)
- Prompt variant (if applicable): crew brief v1 r1 verify
- Next experiment (smallest change to try): none
