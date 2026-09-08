---
id: 0003
title: ADR Visual Density Standard
stage: misc
date: 2026-09-08
surface: agent
model: claude-sonnet-5
feature: 012-visual-density-standard
branch: 012-visual-density-standard
user: channayousif@gmail.com
command: /sp.adr visual-density-standard-and-figure-archetype-taxonomy
labels: ["adr", "figures", "visual-density", "taxonomy", "constitution", "content-pipeline"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md
  pr: null
files:
 - history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md
tests:
 - "ADR significance checklist: impact + alternatives + cross-cutting scope - all PASS"
 - "Grader checklist: clustered decision (D1-D4 as one standard), 5 alternatives w/ rationale, pros+cons, concise - PASS"
---

## Prompt

/sp.adr visual-density-standard-and-figure-archetype-taxonomy — Records the Spec 012 decisions:
(D1) raise the figures-gate floor from >=1 to >=2 figure carriers per topic-*.mdx and add a
>=1 concept-map/flowchart/timeline per unit rule; (D2) introduce a closed six-value figure
archetype taxonomy (table, concept-map, flowchart, timeline, diagram, illustration) recorded on
the figure manifest by widening the existing manifest Kind enum rather than adding a new column;
(D3) per-topic count is an archetype-blind carrier count; (D4) scope guard unchanged (new-shape
units only). Alternatives considered: soft style-guide-only nudge (rejected: figure density
stayed at author discretion), a separate Archetype manifest column (rejected: larger parser
surface, two fields that can disagree), a higher minimum or a per-unit total (rejected: not
evidenced as needed). Cross-cutting: touches the constitution (new Art. III.10, governance
2.7.0 -> 2.8.0), the content style guide (version 3.2 -> 3.3, re-freezes terminology.csv),
scripts/check-figures.mjs + scripts/lib/figure-manifest.mjs, the <Figure> component, and the
author-unit / generate-figures skills. Builds on ADR-0011 (per-topic unit pedagogy) and ADR-0012
(figure rendering component + manifest lifecycle).

## Response snapshot

One decision cluster, one ADR: **ADR-0017 - Visual-density Standard and Figure Archetype
Taxonomy** (`create-adr.sh` -> id 0017). Status Accepted.

Clustered D1-D4 as a single standard (they ship together in Spec 012 and would be revised
together), not four atomic ADRs. Filled: Context (Spec 008/009 lineage, the one-figure floor, the
owner instruction + AskUserQuestion decisions, the constraints); Decision (D1 gate floor >=2/topic
+ >=1 schematic/unit + Art. III.10 + style-guide 3.3; D2 six-value archetype by widening the
`Kind` enum, not a new column; D3 archetype-blind per-topic count; D4 scope guard unchanged; plus
proving unit EFMP-302 U1 and the queued EFMP-301 U1 re-proof); Positive + Negative consequences
(guaranteed second visual + schematic vs higher bar for every unit, retrofit cost, hard-gate
judgement calls, reclassification pass, terminology re-freeze risk, fourth Art. III amendment in
three versions); five Alternatives with rationale (soft nudge; separate Archetype column; higher
minimum / per-unit total; per-topic archetype diversity; a new article instead of a III sub-point).

Significance test PASS on all three (impact - a non-negotiable content bar + gate + manifest +
component + skills; alternatives - five, with tradeoffs; scope - constitution, style guide,
gate, manifest lib, component, two skills). No conflict with ADR-0011 / ADR-0012 - this ADR
extends both (built on the markers; widened the `Kind` column).

## Outcome

- ✅ Impact: the taxonomy + gate-minimum decision has a permanent rationale record with the five
  rejected alternatives; ready for `/sp.tasks`.
- 🧪 Tests: significance + grader checklists PASS.
- 📁 Files: `history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md`; this PHR.
- 🔁 Next prompts: `/sp.constitution` (apply Art. III.10 + v2.8.0), `/sp.tasks` for 012, then
  implement gate + manifest lib + tests + `<Figure>` + style-guide + skills, then EFMP-302 U1
  retrofit.
- 🧠 Reflection: kept it to one ADR - D1-D4 are one standard, and four ADRs would have been the
  over-granular failure mode the skill warns about.

## Evaluation notes (flywheel)

- Failure modes observed: over-granular ADRs (avoided - one cluster); missing alternatives
  (avoided - five listed).
- Graders run and results (PASS/FAIL): clustered decision ✔ · >=1 alternative w/ rationale ✔
  (five) · pros+cons ✔ · concise-but-sufficient ✔ -> PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): if a seventh archetype is ever needed, this ADR gets
  a short "Superseded in part by ADR-00NN" note rather than a rewrite.
