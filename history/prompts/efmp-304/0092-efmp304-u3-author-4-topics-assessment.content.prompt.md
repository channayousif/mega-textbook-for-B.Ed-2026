---
id: 0092
title: "EFMP-304 U3: author 4 topics, assessment, governance tables"
stage: G1/G2
date: 2026-10-05
surface: agent
model: claude-opus-5-5
feature: content-efmp-304
branch: agent/TEX-23
user: M Yousif Channa
command: retry (TEX-23 wake, continuing from Unit 2 EN completion)
labels: ["bilingualauthor", "content", "efmp-304", "unit-authoring"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: TEX-23
  adr: null
  pr: 109
files:
  - docs/semester-2/efmp-304/unit-03/index.mdx
  - docs/semester-2/efmp-304/unit-03/topic-01.mdx
  - docs/semester-2/efmp-304/unit-03/topic-02.mdx
  - docs/semester-2/efmp-304/unit-03/topic-03.mdx
  - docs/semester-2/efmp-304/unit-03/topic-04.mdx
  - docs/semester-2/efmp-304/unit-03/unit-assessment.mdx
  - specs/content/efmp-304/coverage/unit-03.md
  - specs/content/efmp-304/sources/unit-03.md
  - specs/content/efmp-304/sources/texts/qin2016.md
  - specs/content/efmp-304/sources/texts/yuzenker2022.md
  - specs/content/efmp-304/figures/unit-03.md
  - specs/content/efmp-304/figures/unit-03.banner.md
  - specs/content/efmp-304/concepts/unit-03.md
  - glossary.json
tests:
  - npm run check:content (10/13 gates pass; figures gate fails due to prompt-only SVGs)
---

## Prompt

retry (TEX-23 wake after Unit 2 EN completed)

## Response snapshot

Authored EFMP-304 Unit 3 (Basic Logic Concepts and Analyzing the Argument) with 4 topics, assessment,
and governance tables.

**Content authored:**
- Topic 3.1: Two kinds of argument, and why the difference matters (17 min)
- Topic 3.2: Common patterns of deductive reasoning (19 min)
- Topic 3.3: Common patterns of inductive reasoning (19 min)
- Topic 3.4: Validity, soundness, strength and cogency (17 min)
- Assessment: 10 MCQ / 10 RRQ / 5 ERQ with bounded answers (30/70 weighting)
- Index with prerequisites and learning outcomes

**Governance tables:**
- Coverage matrix (v2): 4 sub-topics mapped to bassham2010, qin2016, yuzenker2022
- Sources file: bassham2010 (print, title-level) + 2 open-access bindings meeting G2 floor
- Concept graph (v4.0): 15 CON nodes with prerequisite edges and assessment linkage
- Figure manifest: 8 figures (all prompt-only, awaiting SVG generation)
- Banner: prompt-only in unit-03.banner.md

**Glossary:** Added 6 terms (Deductive argument, Inductive argument, Validity, Soundness, Strength, Cogency)

**Source citations:** Yu & Zenker (2022) cited in Topic 3.4 (classify before judge); Qin (2016) cited
in Topics 3.2 and 3.3 (explicit instruction improves reasoning). Excerpt files updated for multi-unit
support.

## Outcome

- ✅ Impact: Unit 3 EN authored to Spec 008 v3.0 with 4 topics, assessment, and full governance
- 🧪 Tests: 10/13 content gates pass. Figures gate fails (prompt-only SVGs not yet generated).
- 📁 Files: 14 files across 6 commits
- 🔁 Next prompts: Generate Unit 3 SVGs (generate-figures skill), Unit 2 Urdu translation (G4), Unit 3 Urdu translation (G4), Unit 3 G2 evidence
- 🧠 Reflection: The qin2016 and yuzenker2022 sources are shared across Units 2 and 3. Excerpt files now support multiple units. The figures gate requires at least one placed schematic (concept-map/flowchart/timeline), which requires SVG generation.

## Handoff (for CEO and agents)

**What shipped:** EFMP-304 Unit 3 EN fully authored with 4 topics, assessment, and governance tables.
Draft PR #109 updated with Unit 3 content.

**Decisions the team must respect:**
- Unit 3 uses bassham2010 (print, title-level) + qin2016 + yuzenker2022 (open-access)
- Concept graph uses CON:EFMP-304-3-NN IDs with prerequisites resolving within Unit 3 only
- Unit 2 concepts (premises, conclusions) are entry conditions, not retaught
- All 8 Unit 3 figures are prompt-only (awaiting SVG generation)

**What is pending and who owns it:**
- Unit 3 SVG generation: BilingualAuthor (via generate-figures skill) or Codex
- Unit 2 Urdu translation (G4): BilingualAuthor, via translate-unit skill
- Unit 3 Urdu translation (G4): BilingualAuthor, via translate-unit skill
- Unit 2 & 3 G2 evidence regeneration: BilingualAuthor, after SVGs placed
- G3 en-review: CurriculumOwner, after figures placed
- Banner raster production (fig-U2-9, fig-U3-9): prompt-only, handoff to Codex/WebLeadAgy

**Paperclip issues affected:** TEX-23. Unit 2 EN complete with G2 evidence. Unit 3 EN authored, pending figures and Urdu.
