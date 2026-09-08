---
id: 0001
title: Spec Visual Density Standard
stage: spec
date: 2026-09-08
surface: agent
model: claude-sonnet-5
feature: 012-visual-density-standard
branch: 012-visual-density-standard
user: channayousif@gmail.com
command: /sp.specify 012-visual-density-standard
labels: ["spec", "content-pipeline", "figures", "visual-density", "constitution", "spec-008", "spec-009"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/012-visual-density-standard/spec.md
 - specs/012-visual-density-standard/checklists/requirements.md
tests:
 - "Spec quality checklist (specs/012-visual-density-standard/checklists/requirements.md) - all 16 items PASS"
---

## Prompt

/sp.specify 012-visual-density-standard — Raise the content pipeline's figure/visual requirement
from "at least one figure per topic" to a hard, gated visual-density standard. Every topic-*.mdx
must carry at least two figure carriers; every unit must carry at least one non-table diagram
whose archetype is a concept map, flowchart, or timeline. Introduce an archetype taxonomy (table,
concept-map, flowchart, timeline, diagram, illustration) on the figure manifest and the <Figure>
component. Enforce the new minimums in scripts/check-figures.mjs with fixture tests. Amend the
constitution (new Art. III figure-density clause, governance version bump) and bump
specs/content/style-guide.md (which re-freezes terminology.csv). Update the author-unit and
generate-figures skills and the per-course content-spec Figure plan shape. Retrofit EFMP-302
Unit 1 as the proving unit (add the extra diagrams, render them, update the figure manifest). Per
Constitution Art. VI.1 the golden unit EFMP-301 Unit 1 must then be brought to the new standard
as the immediate-next content task (tracked in backlog, not done here). Rationale: a visual is
worth a thousand words; unit prose is currently too text-heavy and figure density is left to
author discretion.

(Origin: user message item 4 - "there should be more diagrams, concept maps, flow charts or
timelines within the topics, remember a visual worth thousand words. reinforce the relevant
unit/topic writing skills/content pipeline." Governance decisions taken via AskUserQuestion
2026-09-08: hard enforcement, its own spec, retrofit EFMP-302 U1 as the proving unit.)

## Response snapshot

Created branch `012-visual-density-standard` and `specs/012-visual-density-standard/spec.md`
(number forced to 012; 011 is reserved for the dashboard redesign).

The spec raises the figure floor from one-per-topic to **two-plus per topic file** and adds a
**one concept-map / flowchart / timeline per unit** rule, with every figure classified by a
closed six-value archetype (table, concept-map, flowchart, timeline, diagram, illustration)
recorded on the manifest. Four prioritised user stories: P1 the figures gate enforces the floor
(the MVP); P2 authors plan/place to the standard via the updated skills + content-spec Figure
plan; P2 EFMP-302 Unit 1 retrofit as the Art. VI.1 proving unit (both locales, all gates green);
P3 the governance record (Art. III clause + governance version bump, style-guide `version` bump
re-freezing the terminology bank, `author-unit` twin kept in sync, backlog entry for the
EFMP-301 Unit 1 golden re-proof). 15 functional requirements, 7 success criteria, edge cases
(same-archetype pair satisfies the count; illustrations do not satisfy the schematic rule;
single-topic unit; non-topic files exempt; reviewed-unit new figure needs the Urdu mirror;
legacy five-file units skipped). Scope excludes authoring EFMP-301 U1, other courses/units, and
Spec 011.

One deliberate open decision left for `/sp.plan`: manifest-shape - a new `Archetype` column vs
widening the existing `Kind` enum. Flagged in Assumptions, not as a [NEEDS CLARIFICATION].

Spec quality checklist written and all 16 items pass. No clarification markers.

## Outcome

- ✅ Impact: the "more diagrams" request is now a bounded, testable spec with a proving unit and a
  governance trail; ready for `/sp.plan`.
- 🧪 Tests: spec quality checklist 16/16 PASS.
- 📁 Files: `specs/012-visual-density-standard/spec.md`, `.../checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan` for 012 (surface the manifest-shape + gate-refactor decisions, and
  the `/sp.adr` for the taxonomy + gate-minimum). Then implement gate + constitution + skills,
  then the EFMP-302 U1 retrofit.
- 🧠 Reflection: kept the spec at WHAT-level by naming pipeline artifacts by role and pushing
  script/manifest mechanism to the plan.

## Evaluation notes (flywheel)

- Failure modes observed: risk of leaking HOW (script internals) into the spec - mitigated by
  role-naming and an explicit deferred-decision note.
- Graders run and results (PASS/FAIL): content-quality 4/4 · requirement-completeness 8/8 ·
  feature-readiness 4/4 → PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.plan`, decide manifest column vs enum by
  which keeps `scripts/lib/figure-manifest.mjs` diff smallest and back-compatible with v2 rows.
