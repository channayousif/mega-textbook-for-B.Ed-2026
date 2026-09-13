# Validation record: Feature 016

Style guide v4.0 landed 2026-09-13.

## FR-003: the additive design holds *(the feature's main risk)*

| | Before | After |
|---|---|---|
| `EFMP-302` U1 `translation_status` (EN) | `reviewed` | **`reviewed`** |
| `EFMP-302` U1 `translation_status` (UR) | `reviewed` | **`reviewed`** |
| `EFMP-301` U1 `translation_status` | `draft` | `draft` |
| Files touched under `docs/` or `i18n/` | - | **none** |

`git status --porcelain docs i18n` is empty after both retrofits. The only `reviewed` Urdu mirror
in the repository survived the ninth standard revision untouched, which is what FR-003 existed to
guarantee and what the roadmap made binding.

## Success criterion 2: all five checks fire, each naming the offending ID

| Mutation | Reported |
|---|---|
| Dropped every topic-1.4 concept | `sub-topic U1-11 (topic 1.4) is reached by no concept` |
| Concept pointed at topic `9.9` | `concept CON:EFMP-302-1-1 names topic "9.9", which is not in the unit's ### Topic list` |
| Made `1-1` require `1-3`, which requires `1-1` | `prerequisite cycle: CON:EFMP-302-1-1 -> CON:EFMP-302-1-3 -> CON:EFMP-302-1-1` |
| Prerequisite `CON:EFMP-302-1-99` | `lists prerequisite "CON:EFMP-302-1-99", which is not a concept in this unit` |
| Cited item `MCQ-99` | `cites assessment item "MCQ-99", which the unit does not contain` |

The cycle check reports the **path**, not merely that one exists, which is the difference between
a usable error and a puzzle.

## Success criteria 3, 4, 5

Both retrofitted units carry a complete concepts file whose prerequisite edges form a DAG:
`EFMP-302` U1 has 15 concepts over 4 topics, `EFMP-301` U1 has 17 over 4. `npm run check:content`
runs **8 gates**, and the skill files picked up the new one through `check:docs-sync -- --fix`
rather than hand-editing. The style guide reads `version: "4.0"` with a matching `**v4.0**` entry.

## Findings

**1. Assessment item IDs needed no prose change at all.** The roadmap and the repositioning plan
both described FR-004 as "the one place prose is touched". Reading `unit-assessment.mdx` showed the
items are already numbered beneath three named headings, so `MCQ-01 … ERQ-05` are derivable from
what is on the page. FR-004 was rewritten to derive rather than author, which turned FR-003 from an
intention into a property of the design: there was never anything to touch.

**2. The golden unit is not depth-gated, and has not been since Spec 007.** `EFMP-301`'s
content-spec keeps its tables at document level with no `## Unit 1` heading, so
`unitSectionLines` returns `null` and `check:depth-gate` skips the unit silently. The gate passes
because it never looks. Found while building the concept gate against the same helper. This feature
handles both spec shapes by falling back to the whole document; **fixing the depth-gate gap is
recorded in `specs/backlog.md`**, because adding the heading may surface depth findings hidden for
months and is therefore a task of unknown size, not a one-line fix.

**3. The bidirectional docs-sync check earned its keep.** Registering the gate in `CONTENT_GATES`
immediately failed `check:docs-sync` with "the gate-commands block is out of date" in two skill
files. That assertion was made bidirectional during Feature 015; before that it only checked
FULL_GATES subset-of CI and would have let the skills drift silently.

## FR-011: the freeze begins

v4.0 is the last standard revision until **50 units** exist. Two units carry a concept graph today.
Further standard improvements are recorded in `specs/backlog.md` and applied in one batch when the
freeze lifts - including the deferred schema widening (FR-008) and cross-unit prerequisite edges.
