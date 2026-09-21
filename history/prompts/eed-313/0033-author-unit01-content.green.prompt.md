---
id: 0033
title: author EED-313 Unit 1 content
stage: green
date: 2026-09-21
surface: agent
model: LongCat-2.0
feature: eed-313
branch: main
user: a2ahs
command: continue prior work (user said "ok go on" to author EED-313 Unit 1)
labels: ["author-unit", "eed-313", "licence-track", "unit-01", "green"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - licence/eed-313/unit-01/index.mdx
  - licence/eed-313/unit-01/topic-01.mdx
  - licence/eed-313/unit-01/topic-02.mdx
  - licence/eed-313/unit-01/topic-03.mdx
  - licence/eed-313/unit-01/topic-04.mdx
  - licence/eed-313/unit-01/unit-assessment.mdx
  - licence/eed-313/unit-01/unit-teacher-notes.mdx
  - specs/content/eed-313/coverage/unit-01.md
  - specs/content/eed-313/sources/unit-01.md
  - specs/content/eed-313/figures/unit-01.md
  - specs/content/eed-313/concepts/unit-01.md
  - glossary.json
tests:
  - node scripts/validate-content.mjs licence/eed-313/unit-01
  - node scripts/check-unit-depth.mjs licence/eed-313/unit-01
  - node scripts/check-bloom-bands.mjs licence/eed-313/unit-01
  - node scripts/check-concept-graph.mjs licence/eed-313/unit-01
  - node scripts/check-no-answer-keys.mjs licence/eed-313/unit-01
  - node scripts/check-no-em-dash.mjs licence/eed-313/unit-01
  - node scripts/check-docs-sync.mjs
---

## Prompt

"/resume" then continue prior work. Earlier in the session: resolved G-2026-16 (EFMP-304 16-wk/3-2-3-3-2-3), approved EED-313 intake (G-2026-20 Unit 5 restored, G-2026-21 all reading sources added). User then said "ok go on" to author EED-313 Unit 1 content.

## Response snapshot

- Loaded the author-unit skill and all 6 reference files (structure-standard, pedagogy-checkitem, item-writing, answers-block-formatting, figure-prompts, citation-and-register).
- Verified the Ertmer & Newby (1993) DOI resolves to Wiley (302 redirect confirmed); the four guide-required books are print-only and listed under `## Unverifiable sources`.
- Authored 7 content files at licence/eed-313/unit-01/ following the nine-part topic cycle: index.mdx, topic-01.mdx (How humans learn: three theories), topic-02.mdx (What classroom management is, and is not), topic-03.mdx (Reading a real classroom), topic-04.mdx (Designing the environment on purpose), unit-assessment.mdx (10/10/5 bank with model answers, point-by-point mark schemes, analytic rubrics), unit-teacher-notes.mdx.
- Emitted 4 governance artefacts: coverage/unit-01.md, sources/unit-01.md, figures/unit-01.md (8 prompt-only markers), concepts/unit-01.md (14 concepts, SLO refs, G5-flagged Urdu labels).
- Added 11 glossary entries (Behaviourism, Cognitivism, Constructivism, Classroom management, Discipline, Physical environment, Social environment, Classroom observation, Well-managed classroom, Learning resources, Classroom challenges).
- Fixed gate failures iteratively: clo_refs format (CLO: -> SLO:), description length, Analyse/Analyze spelling, concept-graph cross-topic MCQ/RRQ duplicates, source Supports cell coverage-matrix alignment.
- All 7 content gates green. Figures gate is expected to fail at author-unit stage (requires generate-figures rendering pass with SVGs, wordmarks, theme tokens, dark variants).
- Committed as b706926.

## Outcome

- ✅ Impact: EED-313 Unit 1 fully authored (19 sub-topics, 4 topics, 10/10/5 bank) in the licence tree. Content is ready for G3 review once figures are rendered.
- 🧪 Tests: validate-content, check-unit-depth, check-bloom-bands, check-concept-graph, check-no-answer-keys, check-no-em-dash, check-docs-sync all PASS. check-figures fails as expected (prompt-only markers, no rendered SVGs).
- 📁 Files: 12 new/modified files committed (b706926). 8 content files, 4 governance artefacts, glossary entries.
- 🔁 Next prompts: render figures via generate-figures skill (8 schematics), then G3 review of Unit 1. Then author Units 2-5.
- 🧠 Reflection: the figures gate's rendered-output requirement (wordmarks, :root tokens, dark variants) is intentionally a separate skill boundary - author-unit stops at prompt-only markers. The Analyse/Analyze spelling inconsistency (British vs American) is a recurring trap; the gate expects American spelling. Source Supports cells must match the coverage matrix exactly, including reinforcement rows.

## Evaluation notes (flywheel)

- Failure modes observed: clo_refs used CLO: prefix instead of SLO: format; descriptions exceeded 200-char limit; British "Analyse" spelling rejected by bloom-bands gate; concept-graph MCQ/RRQ items cited across multiple topics; source Supports cells misaligned with coverage matrix.
- Graders run and results (PASS/FAIL): 7/7 content gates PASS at commit b706926.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): on author-unit, default to SLO: format for clo_refs and American spelling for Bloom tags to avoid the two most common gate failures.
