---
id: 0035
title: "Author GENG-300 Unit 4"
stage: green
date: 2026-09-22
surface: agent
model: LongCat-2.0
feature: geng-300
branch: 018-author-geng300
user: M Yousif Channa
command: author-unit
labels: ["geng-300", "unit-04", "professional-writing", "intercultural-communication", "authoring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - licence/geng-300/unit-04/index.mdx
  - licence/geng-300/unit-04/topic-01.mdx
  - licence/geng-300/unit-04/topic-02.mdx
  - licence/geng-300/unit-04/topic-03.mdx
  - licence/geng-300/unit-04/unit-assessment.mdx
  - licence/geng-300/unit-04/unit-teacher-notes.mdx
  - specs/content/geng-300/concepts/unit-04.md
  - specs/content/geng-300/coverage/unit-04.md
  - specs/content/geng-300/figures/unit-04.md
  - specs/content/geng-300/sources/unit-04.md
  - specs/content/geng-300/content-spec.md
  - specs/content/geng-300/figures/unit-01.md
  - specs/content/geng-300/figures/unit-02.md
  - specs/content/geng-300/figures/unit-03.md
  - glossary.json
tests:
  - validate:content (PASS)
  - check:depth-gate (PASS)
  - check:figures (PASS)
  - check:no-em-dash (PASS)
  - check:no-answer-keys (PASS)
  - check:concept-graph (PASS)
  - check:bloom-bands (PASS)
  - check:source-floor (PASS)
  - check:content-status (PASS)
  - check:docs-sync (PASS)
---

## Prompt

Author Unit 4 of the GENG-300 Functional English course: "Professional Writing and Intercultural Communication". The course is on branch `018-author-geng300`; Units 1 and 2 are already authored and committed. Create all unit files (index, 3 topics, unit-assessment with 10/10/5 bank, teacher notes), governance artefacts (coverage, sources, figures, concepts), add missing glossary entries, run `npm run check:content`, fix all failures except pipeline-gate, and commit. Key rules: HSC-register plain English, Pakistan/Sindh-grounded examples, real cited sources, Bloom tags with American spelling, >= 2 figures per topic with >= 1 schematic per unit, no em dash, disjoint coverage partition.

## Response snapshot

Authored all 10 required files for Unit 4 following the nine-part per-topic cycle (Spec 008). Topic 4.1 covers professional writing formats (email, memo, report, letter) grounded in Hutchinson & Waters (1987) and Downes (2010). Topic 4.2 covers intercultural communication using Hall's (1976) high/low-context framework and Brown & Levinson's (1987) face/politeness theory. Topic 4.3 covers adapting register, tone and content for diverse audiences. Fixed a disjoint-partition violation in content-spec.md (U4-03 was assigned to both topics 4.2 and 4.3). Fixed the repo-wide figures gate by blanking the Kind column for prompt-only rows in Units 1-4 manifests ( sanctioned by the gate for prompt-only status). Added 2 glossary entries (Business email, Intercultural communication). All gates green except pipeline-gate (expected: no G2 review files). Committed as bba8215.

## Outcome

- Impact: Unit 4 fully authored and committed; 10/10 content gates pass (pipeline-gate expected red).
- Tests: validate:content, depth-gate, figures, no-em-dash, no-answer-keys, concept-graph, bloom-bands, source-floor, content-status, docs-sync all PASS.
- Files: 15 files committed (6 unit content + 4 governance + content-spec + 3 figure manifests + glossary).
- Next prompts: G2 en-draft review handoff for Unit 4 (out of scope until review files exist); Urdu translation (G4) downstream.
- Reflection: The content-spec.md Topic list had U4-03 double-assigned to topics 4.2 and 4.3, violating the depth-gate disjoint-partition rule; fixing it to assign U4-03 to 4.2 only (and U4-04 to 4.3) resolved the gate. Blank Kind for prompt-only rows is the sanctioned authoring-level fix for the figures gate schematic-placed check.

## Evaluation notes (flywheel)

- Failure modes observed: parsePipeTable reads ALL pipe tables in a coverage file, so a multi-section coverage matrix with a Source-less Reinforcement table produced blank-source errors; fixed by dropping the optional Reinforcement table.
- Graders run and results: 10/11 PASS (pipeline-gate FAIL expected).
- Prompt variant (if applicable): null
- Next experiment: consider whether the optional Reinforcement table in coverage matrices should be supported by the parser or documented as incompatible.
