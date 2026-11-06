---
id: 20261136
title: Author GICP-400 Unit 6
stage: general
date: 2026-11-06
surface: agent
model: claude-opus-5-5
feature: gicp-400
branch: crew/gicp-400-u06-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-06/index.mdx
 - docs/semester-3/gicp-400/unit-06/topic-01.mdx
 - docs/semester-3/gicp-400/unit-06/topic-02.mdx
 - docs/semester-3/gicp-400/unit-06/unit-assessment.mdx
 - specs/content/gicp-400/concepts/unit-06.md
 - specs/content/gicp-400/coverage/unit-06.md
 - specs/content/gicp-400/figures/unit-06.md
 - specs/content/gicp-400/figures/unit-06.banner.md
 - specs/content/gicp-400/sources/unit-06.md
 - specs/content/gicp-400/sources/texts/ (seven notes)
 - specs/content/gicp-400/reviews/unit-06/G2/
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-06/ (four SVGs and dark variants)
tests:
 - npm run check:content
 - node scripts/prepare-gate-evidence.mjs GICP-400 6
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored GICP-400 Unit 6 in English from the approved spec: index, Topics 6.1 and 6.2, a 10/10/5 assessment, four placed schematic figures with dark variants, a prompt-only banner row, governance records, and G2 gate evidence. The constitutional text was read as amended to the Twenty-seventh Amendment of 2025.

## Outcome

- ✅ Impact: Unit 6 exists at draft stage and teaches the current courts and Article 239, not the 2012 text.
- 🧪 Tests: check:content has no Unit 6 finding. The eight G2 draft gates pass. Chromium checks and the site build were not run, as the brief prohibits them.
- 📁 Files: unit pages, governance records, seven source notes, eight SVG files, G2 evidence, tracker rows.
- 🔁 Next prompts: figure geometry in CI; G3 English review; G4 translation.
- 🧠 Reflection: the author-unit skill says figures are a later pass, but check:figures requires rendered figures, so they were authored here, as Units 1 and 5 did.

## Handoff (for CEO and agents)

- Shipped / changed: GICP-400 Unit 6 English draft, committed on crew/gicp-400-u06-author. Not pushed, and no PR opened.
- Decisions the team must respect: Unit 6 keeps `pak-constitution-1973` for the bound Unit 1 note only and records later articles under `pak-constitution-amended-2025`, because editing the Unit 1 note would invalidate Unit 1's G2 evidence. `hussain-kokab-2012-18th.md` is byte-identical to Unit 5's copy so the branches merge cleanly.
- Pending / next owner: G3 to G6 remain open for their own jobs. The owner should note that the reading-list note names only the 25th Amendment as later than the 2012 PDF, while the 26th and 27th also change this unit's articles. Glossary entries for Majlis-e-Shoora and Constitutional amendment are missing; glossary.json was out of scope.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: sharp renders CSS-variable SVGs black unless the variables are resolved first; the source paper and the case note each misstate a date or interval that the primary text settles; the transcription of Article 48(1) prints "after fifteen days" where the Act says "within".
- Graders run and results (PASS/FAIL): G2 draft gates PASS; see check:content note in the job's final output for the full suite.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): reconcile the author-unit skill's "figures are a later pass" with check:figures, which fails without rendered figures.
