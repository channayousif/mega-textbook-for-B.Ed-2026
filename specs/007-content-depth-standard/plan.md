# Implementation Plan: Content Depth Standard & Reusable Unit-Authoring Skill

**Branch**: `007-content-depth-standard` | **Date**: 2026-08-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-content-depth-standard/spec.md`

## Summary

Add a **concept-coverage depth standard** on top of the Spec 006 pipeline so that a unit's
depth is a checkable condition, not a matter of reviewer stamina. Five artefacts that version
together (ADR-0010): (1) a **"Unit depth standard"** section added to
`specs/content/style-guide.md`, frozen at `version: "2.0"`; (2) an **expanded course
content-spec** — course description, annotated reading list, week schedule, standards anchors,
and per-unit *enumerated guide-sub-topic checklist* + depth budget + prerequisites +
misconceptions + worked-examples plan; (3) a committed **Claude Code skill**
`.claude/skills/author-unit/` driving source-gather → backward-design → draft-five-files →
self-review; (4) a new **CI depth gate** `scripts/check-unit-depth.mjs` (plain Node +
`gray-matter`, same shape as `scripts/check-pipeline-gate.mjs`) that runs only for units whose
content-spec subsection carries the enumerated checklist; (5) **proof** by re-drafting
**EFMP-302 Unit 1**'s English content and emitting its `coverage/unit-01.md` +
`sources/unit-01.md`, with the Urdu mirror's `translation_status` reset and a G4/G5 revision
row opened (the Urdu re-review itself is downstream).

No new npm dependency, no database, no new application surface. The depth gate is **additive**
to Spec 001's `validate-content.mjs`, Spec 006's `check-pipeline-gate.mjs`, and
`check-no-answer-keys.mjs` — none are modified.

Two `/sp.clarify` passes (spec.md `## Clarifications`, sessions 2026-08-27 ×3 incl. planning)
resolved every design fork the gate introduced: artefact location
(`specs/content/<course>/coverage/` + `/sources/`), skill web-retrieval behaviour,
depth-budget advisory-vs-gated, the enumerated checklist as the gate's authoritative list,
gate scope (checklist-presence = opt-in / grandfathering), DoD boundary (EN + handoff, not
full bilingual), and the v2.0 freeze marker (`style-guide.md`'s field alone).

## Technical Context

**Language/Version**: Plain Node.js (`.mjs`, ES modules) on Node 22+ — unchanged from Specs
001–006; no TypeScript for this feature's one build script (matches `validate-content.mjs` /
`check-pipeline-gate.mjs` / `check-no-answer-keys.mjs`).
**Primary Dependencies**: `gray-matter` (existing) for front-matter reads; a ~15-line
hand-rolled Markdown-table parser for the enumerated checklist / coverage matrix (same
approach as `check-pipeline-gate.mjs`'s `parseTasksTable` and `parseCsv`). **No new
dependency.** The `author-unit` skill uses the harness's own `WebSearch`/`WebFetch` at
authoring time (not in CI).
**Storage**: Filesystem / Git only. New committed trees:
`specs/content/<course-code>/coverage/unit-NN.md`,
`specs/content/<course-code>/sources/unit-NN.md`; expanded body sections in
`specs/content/<course-code>/content-spec.md`; a new `## Unit depth standard` +
`## What the depth gate checks` section in `specs/content/style-guide.md` with
`version: "2.0"`. **No database.**
**Testing**: Vitest, extending `tests/unit/` with `depth-gate.test.mjs` — same
`spawnSync`-a-script-against-a-`CONTENT_ROOT`-temp-dir pattern as
`tests/unit/pipeline-gate.test.mjs` and `_helpers.mjs`. No new framework.
**Target Platform**: Same CI (GitHub Actions `ubuntu-latest`, `.github/workflows/ci.yml`) and
same static site (`www.a2ahs.com`) as Specs 001–006. One new CI step in the `build` job.
**Project Type**: Single project (Docusaurus root Spec 001 established). No frontend/backend
split — zero UI, zero Supabase change, zero Edge Function.
**Performance Goals**: `check-unit-depth.mjs`'s walk is the same order of magnitude as
`check-pipeline-gate.mjs`'s whole-`docs/`-tree walk (already proven at CI scale). No new
budget.
**Constraints**: coverage/sources files stay plain Markdown in Git, never a database
(spec.md Assumptions); the checklist↔coverage comparison MUST be structured set-equality on
stable sub-topic IDs, never a prose scan of the extracted guide text (spec.md FR-009a,
research.md R2); the register ceiling (Constitution Art. III.1) is unchanged — the standard
raises concept depth, not language complexity (FR-007); the gate MUST skip a unit whose
content-spec subsection has no enumerated checklist (FR-012 scope rule) so EFMP-301 and
un-migrated units stay green.
**Scale/Scope**: One new script (`check-unit-depth.mjs`), one new test file
(`depth-gate.test.mjs`), one new skill (`.claude/skills/author-unit/` — `SKILL.md` + 3
reference files), three format-contract docs in `contracts/`, one CI step, one
`package.json` script alias, `style-guide.md` → v2.0, the EFMP-302 `content-spec.md`
expansion, and the EFMP-302 Unit 1 EN re-draft + `coverage/unit-01.md` + `sources/unit-01.md`
+ `tasks.md` revision rows + UR `translation_status` reset. Per FR-016, EFMP-302 Units 2–6,
the EFMP-301 golden-unit decision, and the Unit 1 Urdu re-review are explicitly **out of**
this feature's Definition of Done.

**NEEDS CLARIFICATION**: none. The two `/sp.clarify` passes plus ADR-0010 fixed every design
choice; Phase 0 below records them as decided, not open.

## Constitution Check

*GATE: evaluated against Constitution v2.5.0. Re-checked after Phase 1 design below.*

| Article | Requirement | Status |
|---|---|---|
| II.2 | Traceability to guide items; `clo_refs` front-matter | ✅ FR-009a's enumerated sub-topic checklist makes guide→unit traceability finer-grained and machine-checked; `clo_refs` unchanged |
| II.3 | Gaps logged in `specs/gaps.md`, never invented | ✅ FR-004 (no source found → escalate) and FR-010 (guide silent on a required content-spec section → log + escalate) both route to `specs/gaps.md` |
| III.1 | Simple English register for a fresh HSC graduate | ✅ FR-007 makes holding the register an explicit gate condition; FR-013 keeps the "register held?" judgement with the human Content gate; the depth standard raises concepts, not vocabulary |
| III.2 | Urdu parity — human-reviewed UR before publish | ✅ The EN re-draft resets the UR mirror's `translation_status` to `draft` and opens a G4/G5 revision row (FR-017); in the interim the `ur` route falls back to EN behind Spec 001 FR-003's "translation in progress" banner (the sanctioned missing-Urdu state), and the downstream G4/G5 re-review restores reviewed parity. Not a `bilingual: false` carve-out |
| III.3 | Bloom's tagging; formative Remember→Apply, summative Analyze+ | ✅ FR-006 keeps the summative Analyze+ rule and turns "5–8 formative" into a ≥5 floor the gate enforces |
| III.5 | Citations; recommended readings cited only, never reproduced | ✅ FR-003/FR-005 require real citations in a committed sources list; FR-011 forbids the skill inventing a citation; guide readings still referenced only |
| III.6 | Guide-section fidelity — five-file folding rule, no new file types | ✅ The depth standard maps onto the existing FR-004 folding rule; `coverage/` and `sources/` live in `specs/content/` governance space, not as new per-unit *content* files in `docs/` |
| III.7 | 60/40 assessment weighting default | ✅ Untouched — `assessment_weighting` sum-to-100 validator not modified |
| IV | Spec → Plan → Tasks → Implementation → Review Gate order | ✅ spec approved, two `/sp.clarify` passes, this plan; `/sp.tasks` next |
| V.1 | Content/application separation; content stays Markdown/CSV in Git | ✅ Every new artefact is a plain Markdown file under `specs/content/` or `.claude/`; no DB, no backend touch |
| V.2 | Security in the backend; no hidden answer keys in the static bundle | ✅ Depth gate never touches answer content; `check-no-answer-keys.mjs` already scans `specs/content` (Spec 006 R5), so a stray answer in `coverage/`/`sources/` is still caught |
| V.4 | One course = one content module; adding a course = zero platform-code change | ✅ `check-unit-depth.mjs` is generic (walks `docs/`, reads each course's own `content-spec.md`); a new course adds only its content + content-spec/coverage/sources, no script edit |
| VI.1 | Golden unit (EFMP-301 U1) is the canonical exemplar; **Standard versioning** clause (added v2.5.0) — on a standard version bump, prove on a proving unit, then re-proof the golden unit as the immediate next content task; a working depth exemplar covers the gap | ✅ Exactly this feature's shape — proving unit = EFMP-302 U1; the amended VI.1 makes "re-proof EFMP-301 U1 at v2.0" an explicit constitutional obligation for the immediate next content task (tracked, not a blocker on the v2.0 freeze). EFMP-302 U1 is the working depth exemplar until then |
| VII | Content gate (curriculum owner); Engineering gate (CI); Teacher gate (per course, once) | ✅ `check-unit-depth.mjs` is a new Engineering-gate CI check; FR-013 reserves padding / example-aptness / source-relevance / register judgements for the human Content gate (T036). The Teacher gate is per-course-once and already satisfied for EFMP-302 under Spec 006 — not re-run for this re-draft (spec.md Assumptions) |
| X.2 | Docs gate — a spec changing contributor setup/process updates README in the same branch | ✅ FR-018 + a task to add a "Content depth standard" section to `README.md` |
| XI | Amendment procedure & versioning | ✅ Constitution amended in this branch: v2.4.0 → **v2.5.0** (MINOR) — Art. VI.1 gains the "Standard versioning" clause. `style-guide.md` v1.0→v2.0 remains a content-pipeline artefact bump (Spec 006 FR-007 mechanism), now explicitly covered by VI.1 |

**VI.1 (resolved by the v2.5.0 amendment):** The tension — Art. VI.1 named EFMP-301 Unit 1 as
the golden unit "setting the quality bar" while this feature raises that bar and proves it on
EFMP-302 Unit 1 — is now handled in the Constitution itself. The amended VI.1 "Standard
versioning" clause says: on a standard version bump, the raised bar is demonstrated on a
**proving unit** (need not be the golden unit — here EFMP-302 Unit 1), the **golden unit MUST
be brought to the new version as the immediate next content task after the proving unit**
(tracked in the course task tracker, not a blocker on the v2.0 freeze), and until then the
most recently accepted unit at the current version (EFMP-302 Unit 1) is the **working depth
exemplar**. EFMP-301 Unit 1's grandfathering by the depth gate (FR-012 scope rule) is the
mechanism that lets the v2.0 freeze land without CI failing; the re-proof obligation is the
governance counterpart. Risk 1 below tracks the re-proof task.

**Result: PASS — no violations.** Complexity Tracking table is empty: this feature reuses the
`check-pipeline-gate.mjs` script shape, the `pipeline-gate.test.mjs` fixture pattern, the
`check-no-answer-keys.mjs` `specs/content` scan, and the Spec 006 `style-guide.md` freeze
mechanism — it adds one script, one skill, and Markdown.

## Project Structure

### Documentation (this feature)

```text
specs/007-content-depth-standard/
├── plan.md              # This file
├── research.md          # Phase 0 output (R1–R10 — decisions, mostly "confirmed via clarify")
├── data-model.md        # Phase 1 output (file-based entities: checklist, coverage matrix, sources list)
├── quickstart.md        # Phase 1 output (seed style-guide v2 → build gate → prove on EFMP-302 U1 → wire CI)
├── contracts/           # Phase 1 output — format contracts (Markdown, not JSON Schema: these artefacts have no front matter)
│   ├── content-spec-v2.md          # expanded content-spec body structure + the FR-009a checklist table shape
│   ├── coverage-matrix.md          # specs/content/<course>/coverage/unit-NN.md table contract
│   └── sources-consulted.md        # specs/content/<course>/sources/unit-NN.md table contract
├── checklists/
│   └── requirements.md  # already created by /sp.specify (+ updated by both /sp.clarify passes)
└── tasks.md             # Phase 2 output (/sp.tasks — NOT created here)
```

### Source Code (repository root)

No `frontend/`/`backend/` split. This feature adds one Node CLI script, one test, one skill,
and Markdown governance files to the same single Docusaurus-rooted project.

```text
specs/content/                              # existing Spec 006 governance tree — this feature grows it
├── style-guide.md                          # EDITED — +"## Unit depth standard", +"## What the depth gate checks vs the human Content gate", version "1.0" → "2.0"
├── terminology.csv                         # UNCHANGED (FR-014 / clarify Q3 — no version field of its own)
└── efmp-302/
    ├── content-spec.md                     # EDITED — +Course Description, +Reading list (APA+DOI), +Week schedule, +Standards anchors; Unit 1 subsection +enumerated checklist +depth budget +prerequisites +misconceptions +mapped readings +worked-examples plan +best-practice notes
    ├── tasks.md                            # EDITED — +`Unit 1 | G4 ur-translation` / `G5 ur-review` revision rows (translation re-work handoff)
    ├── coverage/
    │   └── unit-01.md                      # NEW — the FR-002 coverage matrix for the re-drafted Unit 1
    └── sources/
        └── unit-01.md                      # NEW — the FR-003 sources-consulted list for Unit 1

docs/semester-1/efmp-302/unit-01/           # EDITED — five EN .mdx files re-drafted to the depth standard
i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/   # EDITED — five UR .mdx files: translation_status reviewed → draft (handoff only; re-translation is downstream)

scripts/
├── check-unit-depth.mjs                    # NEW — the CI depth gate (walks docs/, in-scope iff content-spec subsection has the FR-009a checklist)
├── check-pipeline-gate.mjs                 # UNCHANGED
├── check-no-answer-keys.mjs                # UNCHANGED (already scans specs/content)
└── validate-content.mjs                    # UNCHANGED

tests/unit/
└── depth-gate.test.mjs                     # NEW — fixture tests for check-unit-depth.mjs (pipeline-gate.test.mjs pattern)

.claude/skills/author-unit/                 # NEW — the reusable authoring skill (Claude Code skill, progressive disclosure)
├── SKILL.md                                # driving workflow: source-gather → UbD backward design → draft five files → self-review + emit coverage.md
└── references/
    ├── depth-standard.md                   # the numeric/structural rules, shared source of truth with style-guide.md's section
    ├── pedagogy-checklist.md               # cognitive load, worked-example effect, retrieval practice, UDL, explicit vocabulary, dialogic/inquiry
    └── citation-and-register.md            # APA form, <15-word quote rule, HSC-graduate register, Urdu-translation-friendly phrasing

contracts/                                  # repo-root existing dir
└── style-guide-frontmatter.schema.json     # EDITED — description note only; `version` pattern `^[0-9]+\.[0-9]+$` already admits "2.0" (no structural change)

.github/workflows/ci.yml                    # EDITED — +"Depth gate" step in the `build` job, after "Pipeline gate", before "Answer-key safety check"
package.json                                # EDITED — +`"check:depth-gate": "node scripts/check-unit-depth.mjs"`
README.md                                   # EDITED — +"Content depth standard" contributor section (Constitution Art. X.2)
```

**Structure Decision**: Single project, same repo root as Specs 001–006. The feature's new
"system" is one Node script + one skill + Markdown governance files; it sits alongside
Spec 006's `specs/content/` tree as a second CI-read governance layer over the same
`docs/`/`i18n/` content, never rendered by Docusaurus.

## Phase 0 — Research (`research.md`)

No open unknowns; Phase 0 records the decisions the two `/sp.clarify` passes and ADR-0010
already made, plus the small format choices this plan pins (sub-topic ID scheme, formative
item-count heuristic, reading-minutes aggregation). Full detail in `research.md`. Headlines:

- **R1** — Enumerated checklist lives as a table in the content-spec `## Unit N` subsection
  (`| ID | Guide ref | Sub-topic |`), IDs `U<n>-<seq>` (e.g. `U1-07`), stable once assigned.
  (clarify round-1 Q4 + round-2 Q1.)
- **R2** — The gate is a **structured set-equality** of checklist IDs vs coverage-matrix IDs —
  never a parse of the extracted guide text (clarify Q4).
- **R3** — Coverage matrix & sources list at `specs/content/<course>/coverage/unit-NN.md` and
  `.../sources/unit-NN.md` (clarify round-1 Q1); discovered by walking `specs/content/`.
- **R4** — Depth gate **scope predicate**: a unit is in scope iff its content-spec `## Unit N`
  subsection contains the checklist table; else skipped (grandfathers EFMP-301 + un-migrated
  units) (clarify round-2 Q1).
- **R5** — Skill uses `WebSearch`/`WebFetch` at authoring time to find & verify open-access
  substitutes, recording exact URL/DOI; degrades to author-provided material + FR-004
  escalation offline (clarify round-1 Q2).
- **R6** — Depth budget is **advisory** for concept count; its reading-minutes range is the
  band the gate's `est_reading_minutes` check uses (clarify round-1 Q3). **Aggregation
  (plan decision):** the band is checked against the **unit total** = sum of the five EN
  files' `est_reading_minutes`, not per-file (refines an impractical Assumptions line — see
  "Spec refinements" below).
- **R7** — Formative item-count heuristic (plan decision): count top-level ordered-list items
  (`/^\s*\d+\.\s/m`) in `formative.mdx` after front matter; ≥5 required. Documented in
  `style-guide.md` so authors know what's counted.
- **R8** — v2.0 freeze marker: `style-guide.md`'s `version` field only; `terminology.csv`
  unchanged (clarify round-2 Q3). Existing
  `contracts/style-guide-frontmatter.schema.json` pattern already admits `"2.0"`.
- **R9** — `check-no-answer-keys.mjs` already scans `specs/content` and `.mdx`/`.md` (Spec
  006 R5) — `coverage/` and `sources/` are covered automatically; **no script change**, no
  new `.gitignore` entry (these dirs are committed, not `.staging/`).
- **R10** — Skill packaging: Claude Code skill at `.claude/skills/author-unit/` with
  `SKILL.md` + `references/` (progressive disclosure), matching the skill format the harness
  already loads (clarify round-1 Q5 / ADR-0010).

### Spec refinements applied during planning (Constitution Art. IV.4 — keep spec ↔ plan aligned)

Two impractical/ambiguous readings in the spec are tightened (minimal edits, recorded here):

1. **Reading-minutes aggregation** — `Assumptions` said "each file's `est_reading_minutes`
   falls within the target range"; a single range cannot fit both `teacher-notes.mdx` and
   `index.mdx`. Refined to: the range is checked against the **unit total** (sum of the five
   EN files). FR-012(d) reworded to match.
2. No other changes.

## Phase 1 — Design & Contracts

### Data model (`data-model.md`)

File-based entities (no DB):

- **Enumerated Sub-topic Checklist** — a Markdown table in each migrated `## Unit N`
  subsection of `content-spec.md`: `| ID | Guide ref | Sub-topic |`. `ID` = `U<n>-<seq>`
  (zero-padded seq), unique within the unit, stable once assigned. The authoritative set the
  coverage matrix is graded against (FR-009a).
- **Unit Coverage Matrix** — `specs/content/<course-code>/coverage/unit-NN.md`, front-matter
  optional; body is one Markdown table `| Sub-topic ID | File | Section | Source |`. `File` ∈
  the five folding-rule files. `Section` = the exact heading text of the subsection covering
  that sub-topic. `Source` = a citation key present in the sources list. Every checklist ID
  MUST appear ≥1 time with all cells non-empty.
- **Sources-Consulted List** — `specs/content/<course-code>/sources/unit-NN.md`, body table
  `| Key | Citation | URL/DOI | Supports | Kind |`. `Kind` ∈ `guide-required` |
  `open-access-substitute` | `no-external-source`. Every `Source` in the coverage matrix MUST
  match a `Key` here (FR-012e consistency).
- **Expanded Course Content-Spec** — Spec 006 `content-spec.md` + body sections
  `## Course Description`, `## Reading list` (`| Key | Citation | DOI/URL | Units | Note |`,
  split guide-required / curated-supplementary), `## Week schedule`
  (`| Week(s) | Unit | Sub-topics |`), `## Standards & frameworks anchors`; and per-unit
  additions: the checklist table, `**Depth budget**` line (`N sub-topics; A–B reading-min`),
  `**Prerequisite knowledge**`, `**Common misconceptions**`, `**Mapped readings**` (keys),
  `**Worked-examples plan**`, `**International best-practice notes**`. `status: approved`
  front-matter unchanged.
- **Depth Standard** — a `## Unit depth standard` section in `style-guide.md` (concept-coverage
  hard rule, required blocks, formative ≥5 floor, soft no-padding rule, register-ceiling
  restatement) + a `## What the depth gate checks vs the human Content gate` section (FR-013);
  `version: "2.0"`.

State transitions: the coverage matrix / sources list are re-authored wholesale on each unit
re-draft (no history — hand-edited files, same posture as Spec 006's `tasks.md`). A unit
enters the depth gate's scope the moment its checklist table is added, and cannot leave it
(regression protection).

### Contracts (`contracts/`)

Three Markdown format contracts (these artefacts carry no front matter, so JSON Schema does
not apply — same reasoning by which Spec 006's `data-model.md` pins the `tasks.md` table shape
in prose): `content-spec-v2.md`, `coverage-matrix.md`, `sources-consulted.md`. Each gives the
exact table columns, the ID grammar, an example, and the parser's tolerance rules (leading/
trailing pipes, `-` separator rows skipped, blank cells = failure). Plus a one-line
description bump to `contracts/style-guide-frontmatter.schema.json` (no structural change).

### `scripts/check-unit-depth.mjs` (the gate)

Mirrors `check-pipeline-gate.mjs` exactly: `CONTENT_ROOT` override for fixtures, `gray-matter`
for front matter, hand-rolled table parser, `errors[]` + non-zero exit with a per-unit message
naming the unmet condition (SC-004/SC-007). Algorithm per non-`coming_soon` EN unit:

1. Load the course `content-spec.md`; locate the `## Unit N` subsection; parse the checklist
   table. **No table → unit out of scope → skip** (R4).
2. Read `specs/content/<course>/coverage/unit-NN.md`; parse the matrix. Fail if missing, or if
   any checklist ID is absent / has a blank `File`/`Section`/`Source` (FR-012a).
3. Read `specs/content/<course>/sources/unit-NN.md`; fail if any coverage `Source` has no
   matching `Key`, or vice-versa (FR-012e).
4. Read the EN `index.mdx`; fail if **either** a `## Common misconceptions` heading **or** a
   `## Further reading` heading is missing — FR-005 mandates both blocks, so an absent one is a
   failure (FR-012b / FR-005).
5. Read `formative.mdx`; count `/^\s*\d+\.\s/m` items; fail if < 5 (FR-012c / FR-006).
6. Sum `est_reading_minutes` across the five EN files; parse `**Depth budget**`'s `A–B`
   range from the subsection; fail if the sum is outside `[A, B]` (FR-012d / R6).

### `tests/unit/depth-gate.test.mjs`

`pipeline-gate.test.mjs` pattern: a `makeDepthFixture()` helper builds a minimal in-scope unit
(EN five files + a `content-spec.md` with a 2-row checklist + matching `coverage/unit-01.md` +
`sources/unit-01.md`) under a temp `CONTENT_ROOT`; each test mutates one thing and asserts the
exit code + message. Cases: happy path passes; no checklist → skipped (exit 0); missing
coverage file → fail; unmapped checklist ID → fail; blank coverage cell → fail; coverage
Source with no sources Key → fail; missing "Common misconceptions" (further reading present) →
fail; missing "Further reading" (misconceptions present) → fail; 4 formative items → fail;
reading-minutes sum below / above band → fail; `coming_soon` → skipped. Each failing case also
asserts the failure message names the unmet condition (SC-004).

### `.claude/skills/author-unit/`

`SKILL.md` front matter (`name`, `description` with trigger phrases) + body: the four-step
workflow (source-gather with `WebSearch`/`WebFetch` + graceful offline degradation → UbD
backward design with a Bloom table → draft the five files to `references/depth-standard.md` →
self-review + emit `coverage/unit-NN.md` and `sources/unit-NN.md`). `references/` holds the
pedagogy checklist, the depth standard (kept in sync with `style-guide.md`'s section — one is
the human doc, one the authoring aid; a task notes the sync obligation), and citation/register
rules. Out of scope for the skill: quiz answer keys (stay in Spec 006's `.staging/`).

### Agent context update

Run `.specify/scripts/bash/update-agent-context.sh claude` to add the depth-gate script and
the `author-unit` skill to the active-technologies list. No new language/framework — the
delta is one script alias and one skill path.

### Post-design Constitution re-check

Re-evaluated after the design above: still **PASS**. The design adds no backend, no
dependency, no new content file type in `docs/`; VI.1 is satisfied by the v2.5.0 "Standard
versioning" clause (EFMP-302 U1 = proving unit + working depth exemplar; EFMP-301 U1 re-proof
= the tracked immediate-next content task, Risk 1); the docs-gate task covers X.2.

## Phase 2 — (handled by `/sp.tasks`, not here)

`/sp.tasks` will decompose this into dependency-ordered tasks: contracts & `style-guide.md`
v2.0 first; then `check-unit-depth.mjs` + its failing fixture tests (red) → implementation
(green); then the EFMP-302 `content-spec.md` expansion + Unit 1 checklist; then the Unit 1 EN
re-draft + `coverage/`/`sources/` + `tasks.md` rows + UR `translation_status` reset; then CI
wiring, `package.json`, README; finally the human Content-gate pass on the re-drafted unit
(SC-003).

## Complexity Tracking

> No Constitution Check violations — nothing to justify.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Risks & follow-ups (max 3)

- **EFMP-301 golden-unit re-proof is a constitutional obligation (Art. VI.1, v2.5.0)** — the
  amended VI.1 makes "bring the golden unit to the new standard version as the immediate next
  content task after the proving unit" mandatory. Action: right after this feature ships,
  open an EFMP-301 pipeline task — add the enumerated checklist to its content-spec and
  re-draft Unit 1 to v2.0 — tracked as a row in `specs/content/efmp-301/tasks.md`. Not a
  blocker on this feature's own DoD (FR-016), but not optional either.
- **Formative item-count heuristic is shallow** — `/^\d+\.\s/m` counts ordered-list items and
  can miscount a unit that formats items as headings or a table. Mitigation: the depth
  standard section in `style-guide.md` states the expected format explicitly; the human
  Content gate still reviews assessment quality (FR-013).
- **Skill's `references/depth-standard.md` can drift from `style-guide.md`'s section** — a
  task adds a short "keep these two in sync when either changes" note to both files and to
  the README contributor section.
