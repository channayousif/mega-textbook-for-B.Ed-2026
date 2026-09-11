---
id: 0009
title: Amend Constitution Visual Density
stage: constitution
date: 2026-09-08
surface: agent
model: claude-sonnet-5
feature: none
branch: 012-visual-density-standard
user: channayousif@gmail.com
command: /sp.constitution (Article III.10, v2.7.0 -> v2.8.0)
labels: ["constitution", "amendment", "article-iii", "figures", "visual-density", "spec-012"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - "npm run check:no-em-dash - PASS (new v2.8.0 SYNC block and III.10 use spaced hyphens, no U+2014)"
 - "grep verification: III.10 present, v2.8.0 footer, SYNC IMPACT REPORT (v2.8.0) block present"
---

## Prompt

Apply the owner-approved constitution amendment for Spec 012 (approved as written via
AskUserQuestion 2026-09-08): new Article III.10 (Visual density), governance version 2.7.0 ->
2.8.0, Article VII engineering-gate row extended, SYNC IMPACT REPORT (v2.8.0) block added.

## Response snapshot

Edited `.specify/memory/constitution.md`:

1. **New `SYNC IMPACT REPORT (v2.8.0)` block** at the top of the file, prior v2.7.0 report
   retained below it. Records: MINOR rationale (new sub-point, nothing removed/redefined, Specs
   001-011 stay valid, legacy/non-topic pages exempt); the one modified article (III - new III.10,
   III.1-III.9 unchanged and not renumbered) plus the Article VII row extension; the downstream
   artifacts to be reviewed in this branch (style-guide v3.2 -> v3.3 + terminology re-freeze;
   author-unit twin + SKILL.md + figure-prompts.md; check-figures.mjs + figure-manifest.mjs Kind
   enum widened 2 -> 6 + 5 gate fixtures; Figure.tsx kind union + .figure--* CSS; manifest
   contract v2 -> v3 note; generate-figures SKILL + svg-authoring.md; EFMP-302 content-spec Figure
   plan + unit-01 manifest + the retrofit); the Art. VI.1 follow-up (EFMP-301 Unit 1 re-proof to
   style-guide v3.3, recorded in backlog, not done in Spec 012).

2. **New Article III.10 (Visual density)**: every new-shape unit `topic-*.mdx` carries at least
   two figures (marker or `<Figure>`); every new-shape unit includes at least one concept map,
   flowchart, or timeline; every figure classified by one of six archetypes (table, concept-map,
   flowchart, timeline, diagram, illustration) recorded on the figure manifest; legacy five-file
   units and non-topic pages exempt; enforced by `check:figures`; III.8 accessibility applies.

3. **Article VII review-gate table**: the Engineering-gate row's figure-marker/manifest entry
   extended with "+ visual-density floor: >= 2 figures per topic, >= 1
   concept-map/flowchart/timeline per unit (Spec 008 + Spec 012 check:figures)".

4. **Footer**: `Version` 2.7.0 -> 2.8.0; `Last Amended` 2026-09-03 -> 2026-09-08.

Verified: `check:no-em-dash` PASS; grep confirms III.10 text, v2.8.0 footer, and the SYNC block
are present. No other article touched; III.1-III.9 byte-identical.

## Outcome

- ✅ Impact: the visual-density floor is now a non-negotiable content standard; every future unit
  is authored and gated against it.
- 🧪 Tests: `check:no-em-dash` PASS; structural grep checks PASS.
- 📁 Files: `.specify/memory/constitution.md`; this PHR.
- 🔁 Next prompts: `/sp.tasks` for Spec 012; then implement gate + manifest lib + tests +
  `<Figure>` + style-guide v3.3 + skills; then EFMP-302 Unit 1 retrofit; then Workstream D.
- 🧠 Reflection: this is the fourth Article III amendment in three governance versions
  (III.1/III.3/III.6 at v2.6.0, III.9 at v2.7.0, III.10 now) - III.8-III.10 form the
  accessibility / punctuation / visual-density triad.

## Evaluation notes (flywheel)

- Failure modes observed: renumbering risk (avoided - III.10 is additive, III.1-III.9 untouched);
  em-dash in a governance file (avoided - spaced hyphens throughout the new block).
- Graders run and results (PASS/FAIL): amendment procedure (Art. XI.1: written proposal ->
  impact assessment in plan.md -> version bump -> downstream artifacts listed) - PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): after the style-guide v3.3 bump, diff terminology.csv
  to confirm the re-freeze changed zero terms.
