---
id: 20261147
title: EFMP407 unit four G2 evidence
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: content-efmp-407
branch: crew/efmp-407-u04-author
user: crew
command: crew brief
labels: [claude, crew]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-04/index.mdx
  - docs/semester-3/efmp-407/unit-04/unit-teacher-notes.mdx
  - static/img/figures/efmp-407/unit-04/fig-U4-1.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-3.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-5.svg
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/reviews/unit-04/G2/20261107T074842577Z-gates.json
  - history/prompts/general/20261147-efmp407-unit-four-g2-evidence.general.prompt.md
tests:
  - "gates:evidence EFMP-407 4: all draft gates PASS"
  - "check:content: see the crew job's final output"
  - "Sharp re-render of six light figures, inspected by eye"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Merged origin/main, which now carries the EFMP-407 course overview from Unit 1, so the earlier G2 blocker no longer applies. Resolved the shared tracker conflict keeping Unit 1 and Unit 4 rows. Read the unit against its spec, centred flowchart box labels in both themes, removed internal review-process wording from two reader pages, prepared real G2 evidence and repointed the tracker row.

## Outcome

- ✅ Impact: Unit 4's G2 row is done on genuine deterministic evidence.
- 🧪 Tests: All draft gates passed in evidence preparation. No build, dev server or Playwright was run, as the brief prohibits them.
- 📁 Files: Listed above. This branch's earlier PHRs were renumbered to 20261145 and 20261146 because Unit 1 merged 20261143.
- 🔁 Next prompts: Independent G3 review, Urdu translation and G5 review, banner illustration.
- 🧠 Reflection: The previous blocker was resolved by the sibling Unit 1 merge; check origin/main before treating a course-level file as missing.

## Handoff (for CEO and agents)

- Shipped / changed: English Unit 4 merged with main, G2 evidence recorded, three flowchart-style figures relabelled.
- Decisions the team must respect: G3, G4 and G5 remain open. No review certification or publication authority is claimed. Preserve topic labels 4.1-4.3 and figure IDs fig-U4-1 to fig-U4-6.
- Pending / next owner: CI `figure-geometry` owns browser text measurement, not yet run on these SVGs. Translation job owns six pages and six RTL SVGs. Illustration job owns banner fig-U4-7, still prompt-only. Jones, Selby and Sterling (2010) and Tilbury and Wortman (2004) were not consulted, as sources/unit-04.md records. Boeve-de Pauw et al. was read through indexed publisher text after a direct fetch timed out.
- Paperclip issues affected: none; EFMP-407 Unit 4 crew job only.

## Evaluation notes (flywheel)

- Failure modes observed: A stale local preview image showed label collisions that the committed SVG had already fixed; re-render before editing.
- Graders run and results (PASS/FAIL): gates:evidence draft gates PASS.
- Prompt variant (if applicable): crew continuation with pipeline feedback
- Next experiment (smallest change to try): Merge origin/main at the start of any continuation whose blocker lies outside unit scope.
