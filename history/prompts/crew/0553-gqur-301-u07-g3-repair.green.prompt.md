---
id: 0553
title: GQUR-301 U7 G3 repair F1-F5
stage: green
date: 2026-10-24
surface: agent
model: claude-opus-5-5
feature: gqur-301
branch: crew/gqur-301-u07-repair_en
user: channayousif
command: crew/brief.md
labels: ["crew", "revise-topic", "gqur-301", "unit-07", "g3-repair"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-07/topic-02.mdx
  - docs/semester-2/gqur-301/unit-07/unit-assessment.mdx
  - docs/semester-2/gqur-301/unit-07/unit-teacher-notes.mdx
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-07/G2/20261024T160350863Z-gates.json
tests:
  - node scripts/prepare-gate-evidence.mjs GQUR-301 7 (8/8 pass)
  - npm run check:content (12/13; check:content-status stale for Unit 15 on origin/main too)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the G3 report 01a16053-0c98-79b0-b814-6bb6281aec8c findings to Unit 7 (English only;
no Urdu mirror exists yet).
- F1: ERQ 2 and ERQ 4 Band 3 no longer demand an unasked change or code-length cost.
- F2: topic-02 Worked example 2, RRQ 10 (now with section sizes 110/100/90) and ERQ 4 check
  section-letter codes section by section (100 or 1,000 codes per section).
- F3: ERQ 4 is now a real-data task. Trainees record section sizes and last year's admissions
  from their practicum school's admission register, with source and date. The rubric gains a
  Real data row and marks the judgement against each trainee's own figures. Teacher notes say
  when to set it.
- F4: RRQ 9 adds the part scores and then rounds only the total down.
- F5: the ERQ 2 rubric says at least four days repeat, not four distinct timetables.
Refreshed G2 evidence and appended an advisory repair row for G3, which stays open.

## Outcome

- Content gates green except check:content-status. That gate flags a stale entry for Unit 15
  figures, which origin/main also reports, so it is out of scope here.
- npm run build not run (crew brief forbids it); MDX render not verified.

## Handoff (for CEO and agents)

- Shipped: U7 assessment and topic-02 repairs on crew/gqur-301-u07-repair_en (not pushed).
- Decision to respect: Unit 7 meets the real-Pakistan-data requirement through a
  trainee-collected data ERQ (ERQ 4), not through a published dataset.
- Pending: a fresh independent G3 review. P1-P4 (author-run provenance, open G1 per
  D-2026-0070, rendered inspection, answer-blind verification) go to the evaluator or review
  host. The G4 Urdu mirror is not started.
- Paperclip issues: none (crew job gqur-301-u07-repair_en).
