# GENG-300 · Functional English - Intake Evaluation

**Evaluator**: agent:evaluator
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-09-22
**Constitution**: Article VII.8
**Spec under evaluation**: `specs/content/geng-300/content-spec.md`
**Course guide**: `Scheme-and-Course-guides/extracted-text/1st 2026.txt` (lines 1-105)

## Manifest verification

- Bundle: `specs/content/geng-300/intake/manifest.json`
- Commit: `8903e823`
- Inputs bound: 54
- Manifest digest: `c1e8972a645d3db867f277ad539d87b42fc2f48bde56a8f0f01b140392c66f674`
- All 54 inputs verified present and unmodified at the bound commit.

## Deterministic checks

| Check | Exit code | Notes |
|---|---|---|
| validate:content | 0 | Content validation passed |
| check:pipeline-gate | 0 | Pipeline gate passed |
| check:depth-gate | 0 | Depth gate passed |
| check:figures | 0 | Figure marker gate passed |
| check:no-em-dash | 0 | No em dash in content |
| check:no-answer-keys | 0 | Answer-key safety check passed |
| check:concept-graph | 0 | Concept graph is consistent |
| check:bloom-bands | 0 | Bloom band gate passed |
| check:source-floor | 1 | No sources files exist yet (expected at intake; sources are authored with units) |
| check:content-status | 0 | Content status valid |
| check:docs-sync | 0 | Docs/code sync passed |

The `check:source-floor` failure is expected and non-blocking at the intake stage: the
content-spec declares `open_access_floor` per course-wide policy, but the actual
`sources/unit-NN.md` files are authored as part of unit authoring (Spec 008 Step 4), which
happens after intake approval. The floor will be enforced when units are authored.

## Criteria

### 1. Identity - APPROVED

Course code GENG-300, title "Functional English", credit hours 3 (3-0), category "General
Education", bilingual: false. Matches `catalog/courses.json` (lines 8-14) and the guide
(`1st 2026.txt:1-3`). No Article II.3 conflict.

### 2. Partition - APPROVED

The guide presents three numbered syllabus sections (`1st 2026.txt:33-56`). The spec maps them
1:1 to three units: Unit 1 "Foundations of Functional English", Unit 2 "Comprehension and
Analysis", Unit 3 "Effective Communication". The partition follows the guide's own numbering.

### 3. Coverage - APPROVED

Every guide sub-topic appears in the spec's `### Sub-topic checklist` exactly once:

- **Section 1** (guide lines 33-41) → U1-01..U1-07: vocabulary building, communicative grammar
  (subject-verb agreement, verb tenses, fragments, run-ons, modifiers, articles, word classes),
  word formation (affixation, compounding, clipping, back formation), sentence structure (simple,
  compound, complex, compound-complex), sound production and pronunciation, plus an integrating
  editing topic.
- **Section 2** (guide lines 42-47) → U2-01..U2-04: purpose/audience/context, contextual
  interpretation (tones, biases, stereotypes, assumptions, inferences), reading strategies
  (skimming, scanning, SQ4R, critical reading), active listening (overcoming barriers, focused
  listening).
- **Section 3** (guide lines 48-56) → U3-01..U3-07: principles of communication (6 Cs), document
  structuring, inclusivity (gender-neutral language, stereotypes, cross-cultural communication),
  public speaking, presentation skills, informal communication, professional writing (e-mails,
  memos, reports, formal letters).

The spec introduces no sub-topic the guide lacks.

### 4. Outcomes - APPROVED

The four CLOs in the spec (`1st 2026.txt:19-32`) are reproduced verbatim from the guide. Each
unit traces to one or more CLOs: Unit 1 → CLO 1, 3; Unit 2 → CLO 2; Unit 3 → CLO 3, 4.

### 5. Readings - APPROVED

The guide lists 10 suggested readings (`1st 2026.txt:63-72`): Azar, Murphy, Straus, Hutchinson
& Waters, Downes, Swan, James & Merickel, Johns & Lenski, Kintsch, Verma & Raman. All are
real, published works. The spec's `## Reading list` reproduces these 10 entries. The course has
a reading list, satisfying the floor.

### 6. Blueprint - APPROVED

Each unit carries a 10 MCQ / 10 RRQ / 5 ERQ bank with Bloom ranges (MCQ Remember-Apply, RRQ
Understand-Analyze, ERQ Analyze-Evaluate/Create) and per-topic minimums (>= 2 MCQ and >= 2 RRQ
per topic). The blueprint is internally consistent and consistent with the style guide.

### 7. Structure - APPROVED

The spec satisfies the style guide's required sections: course-wide items, week schedule
(guide-silent per D-2026-0012), per-unit blocks with sub-topic checklist, topic list, depth
budget, common misconceptions, figure plan, unit-end assessment blueprint, and reading list.
Deterministic checks pass (the source-floor failure is expected at intake, as noted above).

### 8. Decision residue - APPROVED

D-2026-0012 (guide-silent week schedule) is applied correctly. No other confirmed decisions
touch GENG-300. No superseded designs found in the specification.

## Verdict: APPROVED

All 8 criteria pass. The spec is a faithful derivation of the course guide.
