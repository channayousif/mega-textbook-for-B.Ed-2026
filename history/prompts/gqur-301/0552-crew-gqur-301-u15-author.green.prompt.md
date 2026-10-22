---
id: 0552
title: "author GQUR-301 Unit 15"
stage: green
date: 2026-10-23
surface: agent
model: longcat/LongCat-2.0
feature: gqur-301
branch: crew/gqur-301-u15-author
user: board-direct
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: ["author-unit", "gqur-301", "hypothesis-testing", "opencode"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-15/index.mdx
  - docs/semester-2/gqur-301/unit-15/topic-01.mdx
  - docs/semester-2/gqur-301/unit-15/topic-02.mdx
  - docs/semester-2/gqur-301/unit-15/topic-03.mdx
  - docs/semester-2/gqur-301/unit-15/unit-assessment.mdx
  - docs/semester-2/gqur-301/unit-15/unit-teacher-notes.mdx
  - docs/semester-2/gqur-301/unit-15/_category_.json
  - specs/content/gqur-301/coverage/unit-15.md
  - specs/content/gqur-301/sources/unit-15.md
  - specs/content/gqur-301/figures/unit-15.md
  - specs/content/gqur-301/concepts/unit-15.md
  - static/img/figures/gqur-301/unit-15/fig-U15-1.svg
  - static/img/figures/gqur-301/unit-15/fig-U15-1.dark.svg
tests:
  - npm run check:content (11/13 PASS; 2 pre-existing on main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored GQUR-301 Unit 15 (Hypothesis Testing) from its approved content-spec, following the author-unit skill end to end. Created index.mdx, three topic files (15.1 concept of hypothesis testing, 15.2 z-test, 15.3 t-test), unit-assessment.mdx with 10/10/5 bank and bounded answers, and unit-teacher-notes.mdx. Emitted all four governance artefacts (coverage, sources, figures, concepts). Converted FIGURE markers to rendered `<Figure>` carriers and hand-authored fig-U15-1 (flowchart) as accessible SVG with its dark variant to satisfy Constitution Art. III.10. Reworked coverage/sources and concept-graph to clear the depth-gate and concept-graph cross-topic item failures. `npm run check:content` reports 11/13 PASS; the two remaining failures (pipeline-gate G2 row not done, content-status.json missing) already exist on origin/main and are out of scope.

## Outcome

- ✅ Impact: GQUR-301 Unit 15 is now a complete per-topic English draft with all governance artefacts, ready for independent G3 review.
- 🧪 Tests: 11/13 content gates pass; 2 pre-existing failures on main.
- 📁 Files: 6 MDX docs + 4 governance tables + 2 SVG assets created.
- 🔁 Next prompts: G3 en-review (independent, fresh session), then G4 ur-translation, then G6 figure generation for the remaining 5 prompt-only figures.
- 🧠 Reflection: The check-figures gate requires at least one schematic to be placed (not just prompt-only) when archetypes are assigned in the manifest, and the SVG `<desc>` must match the carrier alt text byte-for-byte. Both constraints bit on the first pass.

## Handoff (for CEO and agents)

- Shipped / changed: GQUR-301 Unit 15 English draft authored to the per-topic standard (index + topic-01/02/03 + unit-assessment + unit-teacher-notes), coverage matrix (v2), sources-consulted list, figure manifest (v2) with fig-U15-1 placed and the other 5 rows prompt-only, concept graph (v4.0) with 9 concepts.
- Decisions the team must respect: SLOs are SLO:GQUR-301-15-1/2/3 (one per topic, derived from the content-spec's three key-topic rows). The concept graph maps each MCQ/RRQ to a single topic only (the gate enforces this). All sources use registry dates (Semantic Scholar, OpenAlex, NIST) to clear the source-floor.
- Pending / next owner: (1) G3 independent en-review in a fresh session - do not self-review. (2) G4 ur-translation (separate job). (3) Figure generation for fig-U15-2 through fig-U15-6 (schematic SVGs, Codex or generate-figures skill). (4) The tasks.md G2 row for Unit 15 stays open until the human Content gate clears it; pipeline-gate will be red until then (expected).
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: (1) check-figures requires a placed schematic even at authoring stage, not just intent. (2) SVG `<desc>` must match carrier alt exactly. (3) concept-graph cross-topic item citations are rejected. (4) The figure gate reads rendered `<Figure>` carriers, not MDX comment markers, for the per-topic count floor.
- Graders run and results (PASS/FAIL): check:content 11/13 PASS (2 pre-existing on main, not regressions).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
