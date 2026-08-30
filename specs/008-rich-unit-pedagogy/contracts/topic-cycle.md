# Contract: Topic Cycle (the nine-part learning cycle)

**File**: each `docs/semester-N/<course>/unit-NN/topic-NN.mdx` in a new-shape unit
**Read by**: `scripts/check-unit-depth.mjs` (FR-002, FR-020), and the human Content gate
**Format**: MDX. Front matter per `contracts/unit-frontmatter.schema.json` **plus** `topic_no`
(integer ≥ 1, equal to the filename ordinal) and `topic_label` (non-empty string, e.g. `"1.1"`) —
required on `topic-*.mdx` in practice, enforced by `scripts/validate-content.mjs` (JSON Schema
cannot see the filename). No `sidebar_position`.

## The nine sections — canonical headings, checked for presence AND order

| # | Cycle part | Canonical `##` heading | Match regex (case-sensitive) | Minimum the gate enforces |
|---|---|---|---|---|
| 1 | Real-life opening | `## A real classroom situation` | `^##\s+A real classroom situation\s*$` | — (a FIGURE marker usually sits here) |
| 2 | Explanation | `## Explanation` | `^##\s+Explanation\s*$` | — (misconceptions for this topic are handled here) |
| 3 | Collaborative activity | `## Activity: <name>` | `^##\s+Activity[:\s]` | — |
| 4 | Formative check | `## Check your understanding` | `^##\s+Check your understanding\s*$` | ≥ **3** top-level numbered items (`/^\s*\d+\.\s+\S/gm`) |
| 5 | Short summary | `## Summary` | `^##\s+Summary\s*$` | — |
| 6 | Self-assessment checklist | `## Self-assessment checklist` | `^##\s+Self-assessment checklist\s*$` | ≥ **3** task-list items (`/^\s*-\s+\[ \]\s+\S/gm`) |
| 7 | Practicum transfer | `## Try this at your practicum school` | `^##\s+Try this at your practicum school\s*$` | — |
| 8 | Summative task | `## Summative task` | `^##\s+Summative task\s*$` | contains a mini-rubric; human gate checks ≥ 1 Analyze-or-higher demand |
| 9 | Further reading | `## Further reading` | `^##\s+Further reading\s*$` | ≥ **1** citation or link line |

**Order rule**: the nine headings MUST appear in the file in exactly this sequence. Other `##`/`###`
headings MAY appear *between* them (e.g. `### …` sub-headings under `## Explanation`), but the nine
canonical headings themselves MUST be monotonically ordered. The gate failure message names the
first heading that is missing or out of place **and** the topic file.

## Annotated example (abridged)

```mdx
---
title: "Topic 1.1 — What makes teaching a profession"
course_code: EFMP-302
unit_no: 1
topic_no: 1
topic_label: "1.1"
clo_refs: ["SLO:EFMP-302-1-1"]
blooms_summary: "Remember and understand the features of a profession; apply them to teaching."
est_reading_minutes: 20
translation_status: draft
---
import PrintHandout from '@site/src/components/PrintHandout';
import Glossary from '@site/src/components/Glossary';

<PrintHandout />

# Topic 1.1 — What makes teaching a profession

## A real classroom situation
{/* FIGURE[fig-U1-1]: clean flat vector comparison table, three columns (government-school
teacher, shopkeeper, doctor) x four rows (specialised knowledge, formal training, code of
conduct, public accountability), ticks and crosses, high contrast, labelled, no colour-only
meaning; alt: Table comparing a teacher, a shopkeeper and a doctor against the four features of
a profession. */}
> A parent in a Sindh village asks why the new teacher needed two years of training when the
> shopkeeper next door needed none...

## Explanation
A <Glossary term="Profession" /> is an occupation that... (paraphrase-and-cite mapped readings;
name and correct this topic's common misconception here)

## Activity: Profession or occupation?
**Work in pairs. About 20 minutes.**
1. List five jobs in your town...

## Check your understanding
1. Define a profession in one sentence. *(Remember)*
2. Name the four features and give one example of each. *(Understand)*
3. A friend says teaching is "just a job". Give two reasons it is a profession. *(Apply)*

## Summary
Teaching is a profession because it has specialised knowledge, formal training, a code of
conduct, and public accountability...

## Self-assessment checklist
- [ ] I can define a profession and name its four features.
- [ ] I can explain the difference between a profession and an occupation.
- [ ] I can argue, with examples, that teaching is a profession.

## Try this at your practicum school
Ask your cooperating teacher which of the four features they feel most strongly in their daily
work, and note their answer with one concrete example.

## Summative task
Write 200–300 words analysing whether a described teacher's practice shows all four features.
**Mini-rubric**: features identified (4) / evidence used (4) / judgement justified (2).

## Further reading
- Carr, D. (2000). *Professionalism and ethics in teaching*. Routledge.
```

## Parser tolerance

- Front matter stripped via `gray-matter` before heading scanning.
- Headings matched line-anchored, case-sensitive, after `.trimEnd()`.
- `## Activity:` matched as a prefix so the author can name the activity; the other eight are exact.
- Blank lines and prose between headings are ignored for ordering.
- The EN↔UR structural-parity gate (`validate-content.mjs`, Spec 001) compares heading **structure
  and depth**, not literal text — so a translated `## Activity: <اردو نام>` in the reviewed Urdu
  mirror matches the English `## Activity: <name>` without the activity name needing to stay in
  English. The nine fixed headings give parity a stable per-topic target.

## Not checked by the gate (human Content gate, FR-013 analogue)

Whether the real-life situation is apt and Pakistan-grounded; whether the explanation manages
cognitive load and includes a worked example before asking the learner to perform; whether the
activity is genuinely collaborative; whether the formative items are retrieval (not recognition) and
correctly Bloom-levelled; whether the self-assessment items are real "can I…" statements; whether
the practicum task transfers the concept; whether the summative task and its rubric are aligned;
whether the further-reading citations are apt; whether the register held.
