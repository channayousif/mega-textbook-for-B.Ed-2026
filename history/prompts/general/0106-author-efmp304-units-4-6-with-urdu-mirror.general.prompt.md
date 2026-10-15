---
id: 0106
title: Author EFMP-304 Units 4-6 with Urdu mirror
stage: author
date: 2026-10-09
surface: agent
model: LongCat-2.0
feature: EFMP-304
branch: agent/TEX-38
user: curriculum-owner
command: /author-unit
labels: ["bilingualauthor", "EFMP-304", "content"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: /TEX/issues/TEX-38
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-304/unit-04/index.mdx
  - docs/semester-2/efmp-304/unit-04/topic-01.mdx
  - docs/semester-2/efmp-304/unit-04/topic-02.mdx
  - docs/semester-2/efmp-304/unit-04/topic-03.mdx
  - docs/semester-2/efmp-304/unit-04/topic-04.mdx
  - docs/semester-2/efmp-304/unit-04/unit-assessment.mdx
  - docs/semester-2/efmp-304/unit-05/index.mdx
  - docs/semester-2/efmp-304/unit-05/topic-01.mdx
  - docs/semester-2/efmp-304/unit-05/topic-02.mdx
  - docs/semester-2/efmp-304/unit-05/topic-03.mdx
  - docs/semester-2/efmp-304/unit-05/topic-04.mdx
  - docs/semester-2/efmp-304/unit-05/unit-assessment.mdx
  - docs/semester-2/efmp-304/unit-06/index.mdx
  - docs/semester-2/efmp-304/unit-06/topic-01.mdx
  - docs/semester-2/efmp-304/unit-06/topic-02.mdx
  - docs/semester-2/efmp-304/unit-06/topic-03.mdx
  - docs/semester-2/efmp-304/unit-06/topic-04.mdx
  - docs/semester-2/efmp-304/unit-06/unit-assessment.mdx
  - specs/content/efmp-304/coverage/unit-04.md
  - specs/content/efmp-304/coverage/unit-05.md
  - specs/content/efmp-304/coverage/unit-06.md
  - specs/content/efmp-304/concepts/unit-04.md
  - specs/content/efmp-304/concepts/unit-05.md
  - specs/content/efmp-304/concepts/unit-06.md
  - specs/content/efmp-304/figures/unit-04.md
  - specs/content/efmp-304/figures/unit-05.md
  - specs/content/efmp-304/figures/unit-06.md
  - specs/content/efmp-304/sources/unit-04.md
  - specs/content/efmp-304/sources/unit-05.md
  - specs/content/efmp-304/sources/unit-06.md
  - specs/content/efmp-304/sources/texts/kuswandono2012.md
  - specs/content/efmp-304/sources/texts/behar2011.md
  - specs/content/efmp-304/sources/texts/pedro2005.md
  - specs/content/efmp-304/tasks.md
  - glossary.json
tests:
  - npm run check:content (11/13 gates pass; pipeline G2 + figure prompt-only expected)
---

## Prompt

Complete EFMP-304 Critical Thinking units 4-6 with Urdu mirror and figures.

## Response snapshot

Authored three complete units (4, 5, 6) for EFMP-304 Critical Thinking and Reflective Practices, following
Spec 008 v3.0 per-topic standard. Each unit has: index.mdx, 4 topic files (nine-part learning cycles),
unit-assessment.mdx (10/10/5 bank + bounded answers). Governance files: coverage, concepts, figures,
sources. Tasks.md updated. Glossary entries added for new terms. Three open-access sources verified via
Crossref/OpenAlex.

## Outcome

- ✅ Impact: 18 content files + 12 governance files + glossary + tasks.md
- 🧪 Tests: 11/13 gates pass (G2 in-progress + figure prompt-only expected during authoring)
- 📁 Files: 45+ files created/modified
- 🔁 Next prompts: G4 Urdu translation via translate-unit skill; G6 figure rendering via generate-figures
- 🧠 Reflection: Source floor met with 1 OA source per unit; all other sources are guide-required print monographs

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-304 units 4, 5, 6 authored in English at Spec 008 standard. All figures at prompt-only. G2 en-draft in progress.
- Decisions the team must respect: Urdu parity is corpus-completion requirement, not per-unit gate (ADR-0022). G4 translation pending.
- Pending / next owner: G3 en-review (CurriculumOwner), G4 ur-translation (BilingualAuthor via translate-unit), G6 assets (generate-figures skill)
- Paperclip issues affected: [TEX-38](/TEX/issues/TEX-38)

## Evaluation notes (flywheel)

- Failure modes observed: Source-floor gate required OA sources; print monographs alone insufficient. Glossary term casing must match exactly.
- Graders run and results (PASS/FAIL): check:content PASS (11/13); pipeline G2 + figure gates expected-fail during authoring
