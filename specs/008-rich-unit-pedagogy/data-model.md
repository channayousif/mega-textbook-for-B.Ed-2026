# Phase 1 Data Model: Rich Unit Pedagogy

**Feature**: `008-rich-unit-pedagogy` | **Date**: 2026-08-27

All entities are **files in Git** — no database, no new dependency. This model extends Spec 006's
`specs/content/` governance tree and Spec 007's checklist/coverage/sources entities. Field-level
contracts live in `contracts/`.

---

## 1. Unit-opening file — `docs/semester-N/<course>/unit-NN/index.mdx` (new-shape)

The unit's orientation page; replaces `index.mdx`'s legacy role as the exposition body.

| Aspect | Value |
|---|---|
| Front matter | The existing unit schema (`contracts/unit-frontmatter.schema.json`): `title, course_code, unit_no, clo_refs, blooms_summary, est_reading_minutes, translation_status`. No `topic_no`/`topic_label`. No `sidebar_position`. |
| Required body sections | `## Unit learning outcomes`; `## Prerequisite knowledge`; **`## In this unit`** — an ordered list, one item per topic file, each linking `./topic-NN`, item count **==** the number of `topic-*.mdx` files; `## How to use this unit`. |
| Components | `<TranslationStatusBadge status="…" />` at the top (unchanged). No `<PrintHandout />`. |
| Gate | Depth gate checks `## In this unit` presence + item-count == topic count. The Spec 007 `## Common misconceptions` / `## Further reading` requirement does **not** apply here in a new-shape unit (it moves to the topic files). |

---

## 2. Topic file — `docs/semester-N/<course>/unit-NN/topic-NN.mdx`

One per topic; carries the full nine-part cycle.

| Aspect | Value |
|---|---|
| Filename | `topic-NN.mdx`, `NN` zero-padded, contiguous from `01`. |
| Front matter | The unit schema **plus** two fields required in practice on `topic-*.mdx` (enforced in `validate-content.mjs`, not JSON Schema — the schema cannot see the filename): `topic_no` (integer ≥ 1, **==** the filename ordinal) and `topic_label` (string, e.g. `"1.1"`). `clo_refs` = the subset of the unit's SLO refs this topic serves. No `sidebar_position`. The answer-key key ban applies. |
| Required body sections (in order) | `## A real classroom situation` → `## Explanation` → `## Activity: <name>` → `## Check your understanding` → `## Summary` → `## Self-assessment checklist` → `## Try this at your practicum school` → `## Summative task` → `## Further reading`. Contract: `contracts/topic-cycle.md`. |
| Per-section minimums (gated) | `## Check your understanding`: ≥ 3 top-level numbered items. `## Self-assessment checklist`: ≥ 3 `- [ ]` items. `## Further reading`: ≥ 1 citation/link line. `## Summative task`: contains a mini-rubric (human gate checks ≥ 1 Analyze-or-higher). |
| Content rules | ~one concrete Pakistan/Sindh-grounded example per sub-topic the topic teaches (Art. III.4); paraphrase-and-cite the mapped/substitute readings in `## Explanation`; address that topic's misconceptions in `## Explanation`; define new technical terms on first use (`glossary.json` + `<Glossary>`); register unchanged (Art. III.1). |
| Figures | ≥ 1 `{/* FIGURE[fig-U<n>-<seq>]: …; alt: … */}` marker, usually in `## A real classroom situation` or `## Explanation`. |
| Components | `<PrintHandout />` at the top (a topic cycle is a self-contained printable lesson); `<Glossary>` inline as needed. |

---

## 3. End-of-unit matter file — `docs/semester-N/<course>/unit-NN/unit-assessment.mdx`

| Aspect | Value |
|---|---|
| Front matter | The unit schema. `blooms_summary` describes the bank's spread. |
| Required body sections (in order) | `## Unit summary` (the chapter summary); `## Summative assessment` containing `### Multiple-choice questions (MCQs)` (**exactly 10** top-level numbered items), `### Restricted-response questions (RRQs)` (**exactly 10**), `### Extended-response questions (ERQs)` (**exactly 5**); `## Answers and marking guidance` — **MUST be the file's final top-level (`##`) section**. Contract: `contracts/end-of-unit-assessment.md`. |
| Answers section contents | `### MCQ answer key` (letter + one-line justification); `### RRQ model answers and mark schemes`; `### ERQ rubrics` (analytic; ≥ 1 demanding Analyze-or-higher). Prose answer material only — **no** `answer_key:` / `answers:` / `marking_scheme:` / `rubric_answers:` front-matter keys anywhere. |
| Gate | Depth gate: `## Unit summary` present; 10/10/5 counts exact; `## Answers and marking guidance` present and last. Answer-key gate: the bounded exception applies to this file (R6); a `##` heading after the answers heading → failure. |
| Components | `<PrintHandout />` at the top. |

---

## 4. Optional unit teacher-notes file — `docs/semester-N/<course>/unit-NN/unit-teacher-notes.mdx`

| Aspect | Value |
|---|---|
| Presence | Optional. Included only where the course guide supplies teaching strategies / practical work (Art. III.6). |
| Front matter | The unit schema. `blooms_summary` notes "no assessment items". |
| Body | Teaching strategies, sequencing, likely misconceptions and how to handle them, a "Practical work" block. **No assessment items.** |
| Sorting | The `unit-` prefix sorts it after every `topic-*.mdx`. |

---

## 5. Course-review file — `docs/semester-N/<course>/course-review.mdx` (course-level, optional)

| Aspect | Value |
|---|---|
| Presence | Optional (FR-006 "MAY"). Authored when a course is fully restructured — **not** in this feature's DoD for EFMP-302. |
| Front matter | New schema `contracts/course-review.schema.json`: `required [title, course_code]`; optional `sidebar_position` (set to `900`), `translation_status`, `bilingual`, `resources[]`; same answer-key key ban. |
| Required body sections | `## Course summary`; `## Practice questions` (`### MCQs` / `### RRQs` / `### ERQs`); `## Project ideas for your practicum school` (real-school project briefs); `## Answers and marking guidance` (final section, same bounded rule). Contract: `contracts/end-of-course-review.md`. |
| Sorting | `sidebar_position: 900` — the **only** sanctioned `sidebar_position` in content — sorts it after the last unit. Mirror the key in the UR i18n copy. |
| Components | `<PrintHandout />` at the top. |

---

## 6. Topic list — table in `specs/content/<course>/content-spec.md`, `## Unit N` subsection

The opt-in declaration and the partition the depth gate checks the draft against.

| Aspect | Value |
|---|---|
| Location | Under `## Unit N`, alongside the Spec 007 `### Sub-topic checklist`. |
| Table | `\| Topic \| Title \| Sub-topic IDs \| Reading-min \| Figures \|`. `Topic` = display label (`1.1`); `Sub-topic IDs` = comma-separated checklist IDs (`U1-01, U1-02`); `Reading-min` = a per-topic sub-band (`18–26`); `Figures` = planned figure IDs (`fig-U1-1`). |
| Invariant | **Total + disjoint** — every `### Sub-topic checklist` ID appears in **exactly one** topic row's `Sub-topic IDs` cell. |
| Opt-in | The **presence** of this table (with `topic-*.mdx` on disk) puts the unit on the new-shape gates (R1). |
| Contract | `contracts/content-spec-v3.md`. |

---

## 7. Sub-topic checklist (extended) — Spec 007 entity, `## Unit N` subsection

| Change | The table gains a `Topic` column: `\| ID \| Guide ref \| Topic \| Sub-topic \|`. So the checklist→topic partition is **declared**, not inferred. |
|---|---|
| Unchanged | Still the authoritative concept inventory the coverage matrix is graded against; ID grammar `^U<unit-no>-\d{2,}$`; stable once assigned; faithful to the guide (curriculum-owner responsibility). |

---

## 8. Depth budget (re-baselined) — line in `## Unit N` subsection

| Aspect | Value |
|---|---|
| Format | `**Depth budget**: N sub-topics; T topics; A–B reading-min`. |
| Gated | Only `A–B` — the target band for `sum(est_reading_minutes)` across `index.mdx` + every `topic-*.mdx` + `unit-assessment.mdx` (+ `unit-teacher-notes.mdx` if present). |
| Advisory | `N` (sub-topic count) and `T` (topic count) — not compared by the gate. |
| Magnitude | ~2–3× the legacy band. EFMP-302 U1: from `45–70` to a value set from the actual draft (est. ~100–150). |

---

## 9. Figure marker — inline comment in a `topic-*.mdx`

| Aspect | Value |
|---|---|
| Syntax | `{/* FIGURE[fig-U<unitNo>-<seq>]: <generation prompt>; alt: <alt text> */}` |
| ID grammar | `^fig-U\d+-\d+$`; `<unitNo>` **==** the folder unit number; `<seq>` unique within the unit. |
| Fields | `prompt` ≥ 10 non-space chars; `alt` non-empty (Art. III.8). |
| Rendering | Never — it is an MDX comment. |
| Contract | `contracts/figures-manifest.md`. |

---

## 10. Figure manifest — `specs/content/<course>/figures/unit-NN.md`

| Aspect | Value |
|---|---|
| Body | One table `\| Figure ID \| Topic \| Prompt \| Alt text \| Status \|`. |
| `Status` enum | `prompt-only` \| `generated` \| `placed` — all `prompt-only` in this feature. |
| Invariants | marker-ID set **==** manifest-ID set (both directions); each row's `Topic` **==** the `topic_label` of the file its marker sits in; no blank cells. |
| Bilingual | For `translation_status: reviewed` bilingual units, UR `topic-*.mdx` carry the same marker IDs. `draft` → skipped. |

---

## 11. Unit coverage matrix v2 — `specs/content/<course>/coverage/unit-NN.md`

| Change | `File` enum extended to the new-shape set: `index.mdx`, `topic-01.mdx … topic-NN.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`. `Section` = the exact heading (normally a sub-heading under a topic's `## Explanation`). |
|---|---|
| New invariant | Every `topic-NN.mdx` is named by **≥ 1** coverage row. |
| New invariant | For every checklist ID, **≥ 1** coverage row names the exact `topic-NN.mdx` its `### Topic list` row assigns it to (hard failure otherwise — the coverage matrix and the topic partition must agree on where a concept is taught). Extra rows for the same ID naming other files are allowed. |
| Unchanged | Every `### Sub-topic checklist` ID appears ≥ 1 time, all cells non-empty; `Source` is a `Key` in the sources list; a second "Reinforcement" table is permitted (its rows still obey the column rules). |
| Contract | `contracts/coverage-matrix-v2.md` (supersedes 007's `coverage-matrix.md`). |

---

## 12. Sources-consulted list — `specs/content/<course>/sources/unit-NN.md`

**Unchanged** from Spec 007 (`| Key | Citation | URL/DOI | Supports | Kind |`, `Kind ∈ guide-required
| open-access-substitute | no-external-source`). Coverage↔sources mutual consistency unchanged.

---

## 13. Answers-and-marking-guidance section — body section, two file types only

| Aspect | Value |
|---|---|
| Where | `unit-assessment.mdx` and `course-review.mdx` only. |
| Heading | Exactly `## Answers and marking guidance` (case-sensitive, no trailing text), ≤ 1 per file, **the file's final `##` section**. |
| Contents | Prose answer keys, model answers, mark schemes, analytic rubrics. **No** answer-key front-matter keys. |
| Enforcement | `check-no-answer-keys.mjs` bounded exception (R6); `validate-content.mjs` schema key ban still applies. |

---

## 14. Unit structure standard — sections in `specs/content/style-guide.md` (`version: "3.0"`)

New sections: `## Unit structure standard` (the nested model + the nine-part cycle + file naming +
the opt-in rule + "legacy units unchanged" + the single `sidebar_position` exception);
`## Answers and marking guidance policy`; `## Figure markers and manifests`. Extended:
`## Assessment blueprint defaults` (the 10/10/5 bank + per-topic cycle assessments);
`## What the depth gate checks vs. the human Content gate` (new automated + human rows);
`## Answer-key marker patterns` (note the bounded exception). `version` bumped to `"3.0"` **last**
(D5). Kept in sync with `.claude/skills/author-unit/references/structure-standard.md` (FR-023).

---

## 15. Authoring skill — `.claude/skills/author-unit/`

`SKILL.md` + `references/` (`structure-standard.md` [renamed], `pedagogy-checklist.md` [expanded],
`item-writing.md` [new], `answers-block-formatting.md` [new], `figure-prompts.md` [new],
`citation-and-register.md` [note]). Not read by any gate; it **produces** the coverage matrix,
sources list and figure manifest and runs the gate set. One skill, no sub-agent (R12).

---

## State transitions

- **Legacy → new-shape**: a unit enters new-shape scope the moment its `## Unit N` subsection gains
  a `### Topic list` **and** `topic-*.mdx` files land. Irreversible in practice (a unit cannot
  silently regress). A partial state (one signal only, or count mismatch) is a **loud depth-gate
  failure**, not a silent fallback (R1).
- **Half-migration blocked**: `validate-content.mjs` rejects any legacy pooled file
  (`activities.mdx` / `formative.mdx` / `summative.mdx` / `teacher-notes.mdx`) in a folder that also
  has `topic-*.mdx`.
- **Re-restructure of a reviewed unit**: the EN re-restructure resets the UR mirror to
  `translation_status: draft`, deletes UR orphan files, adds UR heading-only skeleton stubs, and
  opens `G4 ur-translation` / `G5 ur-review` revision rows in the course `tasks.md`; the `ur` route
  falls back to EN behind the Spec 001 FR-003 banner until re-review (FR-028).
- **Governance artefacts** (coverage / sources / figures) are re-authored wholesale on each
  re-restructure — hand-edited Markdown, no history, same posture as Spec 006's `tasks.md`.
