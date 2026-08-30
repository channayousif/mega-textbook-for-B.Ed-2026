# Implementation Plan: Rich Unit Pedagogy — Nested Per-Topic Learning Cycles

**Branch**: `008-rich-unit-pedagogy` | **Date**: 2026-08-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-rich-unit-pedagogy/spec.md`
**Design source**: the owner-approved plan `/home/a2ahs/.claude/plans/1-restructure-the-unit-jazzy-river.md` (authoritative for structure and decisions; this file formalises it into SDD artefacts).

## Summary

Introduce an **opt-in alternative unit shape** in which each topic is a self-contained nine-part
learning cycle, followed by an end-of-unit matter file (chapter summary + a fixed 10/10/5 question
bank + a bounded answers section) and, at course level, a course-review file. Add **figure markers**
(prompt + alt text, never rendered) with a manifest and a consistency gate. Amend the answer-key
policy so self-study keys/rubrics are permitted **only** inside one bounded, final
`## Answers and marking guidance` section of the two end-matter file types. Rewrite the `author-unit`
skill to produce all of this.

Delivered exactly like Spec 007: a constitution amendment (v2.5.0 → **v2.6.0**), new and superseding
Markdown contracts + one new JSON Schema, a `data-model.md`, a rewritten skill, a README section, an
ADR, PHRs — and **proven end-to-end on EFMP-302 Unit 1** (English) with the Urdu-mirror handoff,
before any rollout.

**Additive guarantee (SC-007):** every legacy five-file unit and course passes every gate with no
edits. The new shape is selected per unit only when both signals agree: `topic-*.mdx` files on disk
**and** a `### Topic list` table in the course content-spec's `## Unit N` subsection — the same
"declared table = opt-in" mechanism Spec 007 uses for its `### Sub-topic checklist`.

Key design forks (all settled before spec — see `research.md`): full SDD delivery; per-topic files
supersede Spec 006 FR-004 *in part*; a tightly-bounded answer-key exception (exact canonical
heading, two-file whitelist, must-be-final-section, ≤1 per file); comment-marker + manifest + gate
for figures; unit-scoped `fig-U<n>-<seq>` IDs; `course-review.mdx` is the single content file
allowed `sidebar_position`; `unit-teacher-notes.mdx` optional.

## Technical Context

**Language/Version**: Plain Node.js (`.mjs`, ES modules) on Node 22+ — unchanged from Specs 001–007.
The new gate script and the rewrites to the three existing gate scripts stay plain Node (matching
`validate-content.mjs` / `check-pipeline-gate.mjs` / `check-unit-depth.mjs` /
`check-no-answer-keys.mjs`).
**Primary Dependencies**: `gray-matter` (existing) for front-matter reads; `ajv` + `ajv-formats`
(existing) for the one new JSON Schema (`course-review.schema.json`); hand-rolled pipe-table parsing
(same helper shape as `check-unit-depth.mjs`'s `parsePipeTable`). **No new dependency.** The
`author-unit` skill uses the harness's own `WebSearch`/`WebFetch` at authoring time, never in CI.
**Storage**: Filesystem / Git only. New committed trees:
`specs/content/<course-code>/figures/unit-NN.md`; new-shape unit folders under
`docs/semester-N/<course>/unit-NN/` (`index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx`
[+ `unit-teacher-notes.mdx`]); an optional course-level `course-review.mdx`; new/edited body
sections in `specs/content/<course>/content-spec.md`; new sections in `specs/content/style-guide.md`
(`version` `"2.0"` → `"3.0"`). **No database.**
**Testing**: Vitest, extending `tests/unit/` — new-shape cases in `depth-gate.test.mjs` and
`parity.test.mjs`, and three new files `validate-layout.test.mjs`, `figures-gate.test.mjs`,
`no-answer-keys.test.mjs`. Same `spawn`-a-script-against-a-`CONTENT_ROOT`-temp-dir pattern as
`pipeline-gate.test.mjs` / `depth-gate.test.mjs`. No new framework.
**Target Platform**: Same CI (GitHub Actions `ubuntu-latest`, `.github/workflows/ci.yml`) and static
site (`www.a2ahs.com`) as Specs 001–007. One new CI step (`check:figures`) in the `build` job, after
the depth-gate step and before the answer-key step.
**Project Type**: Single project (Docusaurus root, Spec 001). No frontend/backend split — zero
Supabase change, zero Edge Function, one small swizzle tweak (`src/theme/DocItem/Footer.tsx`
path-derivation for the new file names).
**Performance Goals**: the new gate and the rewritten gates walk the same `docs/` tree as
`check-unit-depth.mjs` today — same order of magnitude, already proven at CI scale. No new budget.
**Constraints**: legacy path stays byte-for-byte (SC-007 regression floor); the answer-key
exception must be non-exploitable (exact canonical heading, two-file whitelist, must-be-final-section,
front-matter key ban retained); the register ceiling (Constitution Art. III.1) is unchanged
(FR-007); the new-shape gate runs **iff** both opt-in signals are present, and fails loudly if only
one is (FR-018); figure markers are authoring comments and never render (FR-012).
**Scale/Scope**: one new gate script (`scripts/check-figures.mjs`); rewrites to
`scripts/check-unit-depth.mjs`, `scripts/validate-content.mjs`, `scripts/check-no-answer-keys.mjs`,
`scripts/build-content-index.mjs`; six Markdown format contracts + one new JSON Schema; edits to
`contracts/unit-frontmatter.schema.json` and `contracts/style-guide-frontmatter.schema.json`;
`.github/workflows/ci.yml` + `package.json`; `specs/006-content-pipeline/spec.md` (FR-004 note);
`.specify/memory/constitution.md` → v2.6.0; `specs/content/style-guide.md` → v3.0; the rewritten
`.claude/skills/author-unit/` (SKILL.md + 5 reference files); the EFMP-302 `content-spec.md` v3
expansion; the EFMP-302 Unit 1 EN re-restructure (`index` + 4 `topic-*` + `unit-assessment` +
`unit-teacher-notes`, delete the 4 legacy files) + `coverage/unit-01.md` (v2) + `sources/unit-01.md`
+ `figures/unit-01.md` + `tasks.md` rows + the UR handoff; README section; ADR + PHRs. Per FR-029,
EFMP-302 Units 2–6, other courses, the EFMP-301 golden-unit re-proof at v3.0, EFMP-302's actual
`course-review.mdx`, and the Unit 1 Urdu re-translation are **out of** this feature's DoD.

**NEEDS CLARIFICATION**: none. The four owner decisions (AskUserQuestion, this session) plus the
approved plan fixed every fork; Phase 0 records them as decided.

## Constitution Check

*GATE: evaluated against Constitution v2.5.0. Re-checked after Phase 1 design below.*
*Update 2026-08-27: the required v2.6.0 amendment (below) has since been applied (`.specify/memory/constitution.md`, tasks T004 ✅). The ⚠→✅ rows are now plain ✅ against the amended text.*

| Article | Requirement | Status |
|---|---|---|
| II.2 | Traceability to guide items; `clo_refs` front-matter | ✅ The `### Topic list` partitions the Spec 007 sub-topic checklist (which already traces every leaf to a guide ref); each `topic-*.mdx` carries the subset of `clo_refs` it serves. Traceability gets *finer*, not looser |
| II.3 | Gaps logged in `specs/gaps.md`, never invented | ✅ FR-017 routes a guide-silent required declaration to `specs/gaps.md`; the skill's source-gather step keeps the Spec 007 "no source found → `no-external-source` row + escalation" rule |
| III.1 | Simple-English register for a fresh HSC graduate | ✅ FR-007 makes "register unchanged" an explicit standard clause; the human Content gate still judges whether it held (FR-013 analogue). Amendment adds a one-line reaffirmation (FR-024) — no substantive change |
| III.2 | Urdu parity — human-reviewed UR before publish | ✅ FR-028: the EN re-restructure resets the UR mirror to `draft` and opens G4/G5 revision rows; the `ur` route falls back to EN behind Spec 001 FR-003's banner until re-review. Not a `bilingual:false` carve-out |
| III.3 | Bloom's tagging; formative Remember→Apply, summative Analyze+ | ⚠→✅ **Amendment (FR-024, MINOR).** III.3 gains: a new-shape unit carries a per-topic formative+summative cycle *and* a unit-end 10 MCQ / 10 RRQ / 5 ERQ bank with rubrics; the Analyze-or-higher rule holds at both the per-topic `## Summative task` and the unit-end `### ERQ rubrics`. No existing obligation weakened |
| III.5 | Citations; recommended readings cited only, never reproduced | ✅ Each topic's `## Further reading` and the coverage/sources artefacts carry real citations; the skill still may not fabricate a citation/DOI; guide readings referenced only |
| III.6 | Guide-section fidelity — five-file folding rule, no new file types | ⚠→✅ **Amendment (FR-024/FR-025, MINOR).** III.6 gains: the Spec 008 per-topic layout is a permitted alternative carrier of the same guide sections (strategies/practical → `unit-teacher-notes.mdx`; activities/formative/summative → the topic cycle; readings → per-topic `## Further reading`). Spec 006 FR-004 is superseded *in part*, not deleted; "MUST NOT be invented where the guide is silent" unchanged |
| III.7 | 60/40 assessment weighting default | ✅ Untouched — `assessment_weighting` sum-to-100 validator not modified; the 10/10/5 bank is a fixed structure, not a weighting change |
| III.8 | Accessibility — alt text on all images/diagrams, semantic headings | ✅ Every figure marker MUST carry non-empty alt text (FR-014, enforced by `check:figures`); the nine-part cycle is a fixed semantic `##` hierarchy with no skipped levels |
| IV | Spec → Plan → Tasks → Implementation → Review Gate order | ✅ spec approved + quality checklist; this plan; `/sp.tasks` next |
| V.1 | Content/application separation; content stays Markdown in Git | ✅ Every new artefact is Markdown/JSON under `specs/`, `docs/`, `contracts/`, `.claude/`; no DB, no backend touch (the `Footer.tsx` tweak is a display-only path guard) |
| V.2 | Security in the backend; no hidden answer keys in the static bundle | ⚠→✅ **Amendment (FR-024, the pivotal change).** V.2 gains a carve-out: a bounded `## Answers and marking guidance` final section of `unit-assessment.mdx` / `course-review.mdx` is *intentionally public* self-study content (as in a printed textbook), **distinct** from the RLS-protected LMS quiz/answer-key store (Spec 003), which stays backend-only and `verified_teacher`-gated. The "static bundle is public" principle itself is unchanged; the front-matter answer-key key ban (FR-009) is retained absolutely; `check-no-answer-keys.mjs` still scans everywhere else with no loss of coverage (FR-010). See Complexity Tracking |
| V.4 | One course = one content module; adding a course = zero platform-code change | ✅ All new gates are generic (walk `docs/`, read each course's own `content-spec.md`); a new course adds only content + governance files. `check:add-course` stays green (SC-007) |
| VI.1 | Golden unit (EFMP-301 U1) is the canonical exemplar; **Standard versioning** clause (v2.5.0) — on a version bump, prove on a proving unit, then re-proof the golden unit as the immediate next content task; a working depth exemplar covers the gap | ✅ Exactly this feature's shape — proving unit = EFMP-302 U1; **amendment re-runs the clause for v3.0** (FR-024): EFMP-301 U1's re-proof at v3.0 is the tracked immediate-next content task (prose note now, tracker rows when scheduled), EFMP-302 U1 is the working exemplar until then. EFMP-301 stays grandfathered by the opt-in predicate (no `### Topic list` → legacy path) so the v3.0 freeze lands without CI failing |
| VII | Content gate (curriculum owner); Engineering gate (CI); Teacher gate (per course, once) | ⚠→✅ **Amendment (FR-024, MINOR).** VII's review-gate table gains a "Figure gate" row under the Engineering gate. `check:figures` + the new-shape depth/answer/validator checks are Engineering-gate CI; FR-013-analogue judgements (topic-grouping quality, figure-prompt aptness, rubric soundness, whether the real-life hook lands, register) stay with the human Content gate. Teacher gate for EFMP-302 already satisfied under Spec 006 — not re-run for this re-restructure (spec Assumptions) |
| X.2 | Docs gate — a spec changing contributor setup/process updates README same branch | ✅ FR-027 + a task adding a "Unit structure standard" section to `README.md` |
| XI | Amendment procedure & versioning | ✅ Constitution amended in this branch v2.5.0 → **v2.6.0** (MINOR — several materially expanded requirements, no principle removed or redefined, no approved spec invalidated). `style-guide.md` v2.0→v3.0 is a content-pipeline artefact bump (Spec 006 FR-007 mechanism), covered by the amended VI.1 |

**Result: PASS with a required constitution amendment (v2.6.0) and one justified complexity entry**
(the V.2 answer-key carve-out — see Complexity Tracking). No principle is removed or redefined; no
approved spec is invalidated. The amendment is the first blocking task in `/sp.tasks`.

📋 **Architectural decision recorded**: [ADR-0011 — Nested Per-Topic Unit Pedagogy, Bounded Answer
Keys, and Figure Markers](../../history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md)
(Accepted 2026-08-27). Covers the five-decision cluster: (1) a nested per-topic learning cycle as an
opt-in alternative to the flat five-file unit; (2) bounded self-study answer keys in published
content (Art. V.2 carve-out) vs. the RLS-protected Spec 003 LMS bank; (3) comment-marker + manifest
+ CI-gate for teaching figures, nothing rendered; (4) the two-signal opt-in predicate
(`### Topic list` + `topic-*.mdx`) with loud failure on disagreement; (5) EFMP-302 Unit 1 as the
v3.0 proving unit + the EFMP-301 golden-unit re-proof obligation.

## Project Structure

### Documentation (this feature)

```text
specs/008-rich-unit-pedagogy/
├── plan.md              # This file
├── research.md          # Phase 0 — R1–R13 (decisions, mostly "settled by owner + approved plan")
├── data-model.md        # Phase 1 — file-based entities (topic file, end-matter, topic list, figure manifest, coverage v2, …)
├── quickstart.md        # Phase 1 — amend constitution → v3.0 style guide → contracts → gates+red tests → skill → content-spec v3 → prove on EFMP-302 U1 → Urdu handoff → CI/README
├── contracts/           # Phase 1 — 6 Markdown format contracts + 1 JSON Schema
│   ├── content-spec-v3.md          # supersedes 007/contracts/content-spec-v2.md — +`### Topic list`, +`Topic` column, per-topic budgets, `**Figure plan**`, `**Unit-end assessment blueprint**`, course-level `## Course review plan`
│   ├── coverage-matrix-v2.md       # supersedes 007/contracts/coverage-matrix.md — `File` enum = new-shape set; every topic file referenced ≥1
│   ├── topic-cycle.md              # NEW — the nine `##` headings, order, per-part minimums, annotated example, parser tolerance
│   ├── end-of-unit-assessment.md   # NEW — `unit-assessment.mdx` skeleton; 10/10/5; the bounded answers-section delimiter rule
│   ├── end-of-course-review.md     # NEW — `course-review.mdx` skeleton; the `sidebar_position` exception; shared bounded-block rule
│   ├── figures-manifest.md         # NEW — marker grammar + regex, `fig-U<n>-<seq>` IDs, manifest columns, Status enum, EN↔UR id-parity
│   └── course-review.schema.json   # NEW — front-matter contract for course-review.mdx (registered in validate-content.mjs)
├── checklists/
│   └── requirements.md  # created by /sp.specify
└── tasks.md             # Phase 2 — /sp.tasks, NOT created here
```

### Source Code (repository root)

No `frontend/`/`backend/` split. This feature adds one Node gate script, rewrites three, adds tests,
rewrites one skill, and grows the Markdown governance tree — all in the same Docusaurus-rooted project.

```text
.specify/memory/constitution.md            # EDITED — v2.5.0 → v2.6.0 (Art. III.1 reaffirm, III.3, III.6, V.2 carve-out, VI.1 re-run, VII figure-gate row) + SYNC IMPACT REPORT block

specs/006-content-pipeline/spec.md         # EDITED — superseding note under the FR-004 folding table (FR-004 not deleted; SC-005 / Key Entities touched only if they say "five files" literally)

specs/007-content-depth-standard/contracts/
├── content-spec-v2.md                     # EDITED — one-line "extended by Spec 008" pointer at top
└── coverage-matrix.md                     # EDITED — one-line "extended by Spec 008" pointer at top

specs/content/
├── style-guide.md                         # EDITED — +`## Unit structure standard`, +`## Answers and marking guidance policy`, +`## Figure markers and manifests`; `## Assessment blueprint defaults` + gate-vs-human table extended; `## Answer-key marker patterns` note; version "2.0" → "3.0" (LAST, after the human Content gate — T-freeze)
├── terminology.csv                        # UNCHANGED
└── efmp-302/
    ├── content-spec.md                    # EDITED — `## Unit 1`: +`### Topic list`, +`Topic` column on `### Sub-topic checklist`, re-baselined `**Depth budget**`, +`**Figure plan**`, +`**Unit-end assessment blueprint**`; course-level +`## Course review plan`; owner re-affirms status: approved (G1)
    ├── tasks.md                           # EDITED — re-open `Unit 1 | G2 en-draft` / `G3 en-review` to ▣; note the G4/G5 scope change to the per-topic layout
    ├── coverage/unit-01.md               # REWRITTEN — v2: File ∈ {index.mdx, topic-01..04.mdx, unit-assessment.mdx, unit-teacher-notes.mdx}; Section = exact heading under each topic's `## Explanation`
    ├── sources/unit-01.md                # EDITED — same 7 keys, now cited in per-topic `## Further reading`
    └── figures/
        └── unit-01.md                    # NEW — the FR-013 figure manifest (fig-U1-1..fig-U1-4, one per topic)

docs/semester-1/efmp-302/unit-01/          # RE-RESTRUCTURED
├── index.mdx                              # → unit opening (topic map)
├── topic-01.mdx … topic-04.mdx           # NEW — one nine-part cycle each + ≥1 FIGURE marker
├── unit-assessment.mdx                   # NEW — chapter summary + 10 MCQ / 10 RRQ / 5 ERQ + `## Answers and marking guidance` (final)
├── unit-teacher-notes.mdx                # NEW — from teacher-notes.mdx
└── (activities.mdx, formative.mdx, summative.mdx, teacher-notes.mdx  → DELETED)

i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/   # HANDOFF
├── index.mdx                              # → new opening skeleton, translation_status: draft
├── topic-01.mdx … topic-04.mdx           # NEW — heading-only skeleton stubs mirroring EN heading vectors, draft
├── unit-assessment.mdx                   # NEW — heading-only skeleton stub, draft
├── unit-teacher-notes.mdx                # RENAMED from teacher-notes.mdx
└── (activities.mdx, formative.mdx, summative.mdx  → DELETED as orphans)

scripts/
├── check-figures.mjs                      # NEW — figure marker ↔ manifest gate (check-unit-depth.mjs shape)
├── check-unit-depth.mjs                   # EDITED — detectLayout(); parseTopicList(); 10 new-shape checks; legacy path byte-for-byte
├── validate-content.mjs                   # EDITED — legacy/new-shape branch off `topic-*.mdx`; checkCourseReview(); dynamic EN↔UR parity file set
├── check-no-answer-keys.mjs               # EDITED — the bounded `## Answers and marking guidance` exception
├── build-content-index.mjs               # EDITED — index topic-* / unit-assessment / course-review
├── check-pipeline-gate.mjs               # UNCHANGED
└── scaffold-catalog.mjs                  # UNCHANGED (note in plan: do NOT "upgrade" it)

tests/unit/
├── depth-gate.test.mjs                   # EDITED — makeDepthFixture({layout:'topic'}); new-shape cases + legacy regression
├── parity.test.mjs                       # EDITED — new-shape reviewed EN/UR fixtures
├── validate-layout.test.mjs             # NEW
├── figures-gate.test.mjs                # NEW
└── no-answer-keys.test.mjs              # NEW

.claude/skills/author-unit/               # REWRITTEN
├── SKILL.md                              # new triggers + per-topic backward design + draft topic cycle + 10/10/5 bank + FIGURE markers + emit coverage/sources/figures + run gates
└── references/
    ├── structure-standard.md            # RENAMED from depth-standard.md — the nine-part skeleton + every gate rule; reciprocal sync note
    ├── pedagogy-checklist.md            # EXPANDED for the nine parts
    ├── item-writing.md                  # NEW — MCQ/RRQ/ERQ rules + the 10/10/5 blueprint
    ├── answers-block-formatting.md      # NEW — the delimiter rule + why check:no-answer-keys won't trip
    ├── figure-prompts.md                # NEW — prompt craft, fig-U<n>-<seq> IDs, alt-text
    └── citation-and-register.md         # EDITED — note: per-topic `## Further reading` replaces the single unit-level list

contracts/                                # repo-root live copies (validate-content.mjs compiles these)
├── unit-frontmatter.schema.json          # EDITED — +optional topic_no, topic_label; answer-key key ban unchanged
├── course-review.schema.json             # NEW — mirrored from specs/008-.../contracts/
└── style-guide-frontmatter.schema.json   # EDITED — description note only ("3.0" is the Spec 008 freeze marker)

src/theme/DocItem/Footer.tsx              # EDITED — deriveSourceKindFromPath: `^topic-\d+$` / `unit-assessment` / `course-review` → null
.github/workflows/ci.yml                  # EDITED — +`Figure marker gate` step (after depth gate, before answer-key check)
package.json                              # EDITED — +`"check:figures": "node scripts/check-figures.mjs"`
README.md                                 # EDITED — +"Unit structure standard" contributor section
history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md   # NEW (Accepted 2026-08-27) — the five-decision cluster
history/prompts/008-rich-unit-pedagogy/   # NEW — PHRs per stage
```

**Structure Decision**: Single project, same repo root as Specs 001–007. The feature's new "system"
is one Node gate + rewrites to three gates + one rewritten skill + Markdown/JSON governance files.
It sits alongside Spec 006/007's `specs/content/` tree as a second CI-read governance layer over the
same `docs/`/`i18n/` content, never rendered by Docusaurus (figure markers included).

## Phase 0 — Research (`research.md`)

No open unknowns. Phase 0 records the decisions the four owner questions + the approved plan already
made, plus the small format choices this plan pins. Headlines (full detail in `research.md`):

- **R1 — Opt-in predicate.** New-shape iff `topic-*.mdx` on disk **and** a `### Topic list` table in
  the content-spec `## Unit N` subsection. Exactly one signal present, or a count mismatch → depth
  gate **fails loudly** (never silently picks a layout). Mirrors Spec 007 R4.
- **R2 — File naming.** `topic-NN.mdx` zero-padded single ordinal (not `topic-1-1.mdx`) — sorts
  correctly under the autogenerated sidebar to 99 topics; `1-1` reintroduces the
  `topic-1-10 < topic-1-2` bug and duplicates the folder's unit number. Human "Topic 1.1" label
  comes from `title` / `topic_label`, not the filename.
- **R3 — Nine-part cycle headings.** Fixed canonical `##` text, checked in order (see
  `contracts/topic-cycle.md`). Plain, translation-friendly, regex-stable.
- **R4 — End-of-unit matter file** = `unit-assessment.mdx` (new name; not a repurposed
  `summative.mdx`). `unit-teacher-notes.mdx` (renamed from `teacher-notes.mdx`) is **optional** and
  sorts after the topics.
- **R5 — End-of-course matter** = a **new course-level** `course-review.mdx` (its own schema), not
  an extension of `course-overview.mdx` (different purpose/shape). It is the single content file
  permitted `sidebar_position` (`900`), so it sorts after the last unit.
- **R6 — Answer-key exception.** `check-no-answer-keys.mjs` allows the three prose patterns
  (`answer key`, `marking scheme`, `correct answer`) **only** below one exact, case-sensitive
  `## Answers and marking guidance` heading, only in files matching `(unit-assessment|course-review)\.mdx$`,
  only when no `##` heading follows it, only when ≤1 such heading exists. The four front-matter key
  patterns still fire everywhere including inside the block. Built-HTML: suppress only the prose
  patterns for the two route names.
- **R7 — Figure marker grammar.** `{/* FIGURE[fig-U<unitNo>-<seq>]: <prompt>; alt: <alt> */}`,
  regex `/\{\/\*\s*FIGURE\[(fig-U\d+-\d+)\]:\s*([\s\S]+?);\s*alt:\s*([\s\S]+?)\s*\*\/\}/g`; prompt ≥
  10 non-space chars, alt non-empty; unit-scoped sequence; `U<n>` must equal the folder unit number.
- **R8 — Figure manifest** `specs/content/<course>/figures/unit-NN.md`, one table
  `| Figure ID | Topic | Prompt | Alt text | Status |`, `Status ∈ {prompt-only, generated, placed}`
  (all `prompt-only` now). Marker set == manifest set both ways; each row's `Topic` == the
  `topic_label` of the file the marker sits in. Reviewed bilingual units: UR topic files carry the
  same marker IDs (comments are outside heading-vector parity).
- **R9 — Reading-minutes band re-baseline.** The depth budget band now sums `index.mdx` + every
  `topic-*.mdx` + `unit-assessment.mdx` (+ `unit-teacher-notes.mdx` if present). Expect ~2–3× the
  legacy band; set EFMP-302 U1's band from the actual drafted total; publish a per-topic band
  (~12–25 min) in `content-spec-v3.md`. Only the band is gated; `N`/`T` counts stay advisory.
- **R10 — Coverage matrix v2.** `File` enum becomes the dynamic new-shape set; `Section` maps a
  sub-topic to its topic file + exact heading (normally a sub-heading under `## Explanation`); new
  invariant: every `topic-NN.mdx` referenced by ≥1 coverage row. Sources contract unchanged;
  coverage↔sources mutual consistency unchanged.
- **R11 — `course-review.schema.json`.** `required: [title, course_code]`; `course_code` pattern as
  elsewhere; optional `sidebar_position` (number), `translation_status` (`[draft, reviewed]`),
  `bilingual`, `resources[]`; same `not/anyOf` answer-key key ban. Registered in
  `validate-content.mjs` via a `checkCourseReview()` mirroring `checkOverview()`.
- **R12 — Skill packaging.** One Claude Code skill, no sub-agent wrapper — the research → design →
  draft → self-review → run-gates loop needs the harness's own `WebSearch`/`WebFetch` and the
  "run gate, read failure, fix, re-run" cycle in the main loop; an isolation boundary buys nothing
  (mirrors Spec 007 R10 / ADR-0010).
- **R13 — `build-content-index.mjs`.** Index `topic-*.mdx` (`kind: 'topic'`),
  `unit-assessment.mdx` (`kind: 'assessment'`), `course-review.mdx` (`kind: 'course-review'`);
  legacy `KIND_FILES` path unchanged. Fix any search-e2e doc-count fixture.

### Spec refinements applied during planning (Constitution Art. IV.4)

None. The spec's requirements and the approved plan agree; this plan only pins format detail the
spec deliberately deferred (heading text, ID grammars, parser tolerances → the contracts).

## Phase 1 — Design & Contracts

### Data model (`data-model.md`)

File-based entities (no DB): **Unit-opening file**, **Topic file** (+ `topic_no` / `topic_label`
front matter), **End-of-unit matter file**, **Optional unit teacher-notes file**, **Course-review
file** (+ its schema), **Topic list** (content-spec table — the opt-in), **Sub-topic checklist
(extended with a `Topic` column)**, **Depth budget (re-baselined)**, **Figure marker**, **Figure
manifest**, **Unit coverage matrix v2**, **Answers-and-marking-guidance section**, **Unit structure
standard** (style-guide v3.0), **Authoring skill**. State: coverage/sources/figures artefacts are
re-authored wholesale on each re-restructure; a unit enters new-shape scope the moment its
`### Topic list` + `topic-*.mdx` both exist and cannot silently leave it (regression protection).

### Contracts (`contracts/`)

Six Markdown format contracts (these artefacts either carry no front matter or are content bodies,
so JSON Schema does not apply — same reasoning Spec 007 used for its three): `content-spec-v3.md`,
`coverage-matrix-v2.md`, `topic-cycle.md`, `end-of-unit-assessment.md`, `end-of-course-review.md`,
`figures-manifest.md`. Plus one new JSON Schema `course-review.schema.json` (front matter *is*
present on that file) mirrored to repo-root `contracts/`. Plus a description-only note on
`contracts/unit-frontmatter.schema.json` (new optional `topic_no`/`topic_label`) and
`contracts/style-guide-frontmatter.schema.json` (`"3.0"` marker; pattern already admits it).

### `scripts/check-figures.mjs` (the new gate)

Mirrors `check-unit-depth.mjs`: `CONTENT_ROOT` override, `gray-matter`, hand-rolled table parser,
`errors[]` + non-zero exit with a per-unit message. Walks `docs/` new-shape units; enforces
FR-014 (every topic ≥1 marker; well-formed unique IDs; non-empty prompt/alt; marker↔manifest
both-way match with `Topic` == `topic_label`; UR marker-ID parity for reviewed bilingual units).
Legacy units (no `topic-*.mdx`) → skipped, exit 0.

### `scripts/check-unit-depth.mjs` rewrite

Replace module-level `UNIT_FILES`/`FOLDING_FILES` with a per-unit computed set. Add
`detectLayout(unitDir, sectionLines)` → `'legacy' | 'topic'` (both signals; loud failure on
disagreement) and `parseTopicList(sectionLines)`. Legacy path runs the existing five 007 checks
byte-for-byte. New-shape path adds the ten checks of FR-020 (topic-file set matches list + contiguous;
checklist↔topic partition total+disjoint; nine cycle headings in order per topic; per-topic
formative ≥3 and checklist ≥3; per-topic `## Further reading` ≥1; `index.mdx` `## In this unit`
count == topic count; `unit-assessment.mdx` `## Unit summary` + 10/10/5 + `## Answers and marking
guidance` last; coverage `File` ∈ new-shape set + every topic file referenced; reading-minutes sum
across the new-shape set ∈ the re-baselined band). Every failure names the condition and the file.

### `scripts/validate-content.mjs` rewrite

Branch on `topicFiles = readdir(unitDir).filter(/^topic-(\d{2})\.mdx$/)`: empty → legacy path
unchanged; non-empty → require `index.mdx` + `unit-assessment.mdx`, `topic-01..NN` contiguous,
**forbid** the four legacy pooled files, `unit-teacher-notes.mdx` optional, `topic_no === NN` +
`topic_label` present per topic file. Add `checkCourseReview()`. EN↔UR parity (T016): iterate the
dynamic union of EN+UR unit-folder `.mdx` names instead of `UNIT_FILES`; guards unchanged.

### `scripts/check-no-answer-keys.mjs` rewrite

Per R6. Split patterns into `FRONT_MATTER_PATTERNS` (4) and `PROSE_PATTERNS` (3). Non-matching
files: scan whole file with all 7 (unchanged). Files matching `(unit-assessment|course-review)\.mdx$`:
locate the exact canonical heading; `>1` → error; `0` → scan whole file; `1` at line *k* → error if
any `^##\s` after *k*, else scan `[0,k)` with all 7 and `[k,EOF)` with only the 4 front-matter
patterns. Built-HTML: suppress only `PROSE_PATTERNS` for the two route names. `EXCLUDE`
(style-guide.md) unchanged.

### Tests

`depth-gate.test.mjs` (extend `makeDepthFixture` with `layout:'topic'`; ~17 new cases + legacy
regression); `validate-layout.test.mjs`, `figures-gate.test.mjs`, `no-answer-keys.test.mjs` (new);
`parity.test.mjs` (new-shape reviewed EN/UR fixtures). Red-first: each written to fail before its
implementation task.

### `.claude/skills/author-unit/` rewrite

`SKILL.md`: new triggers; Step 1 gather+verify sources per topic; Step 2 per-topic backward design
(understandings → the topic's formative check + summative task → a Bloom mini-table over that topic's
sub-topic IDs) + plan the 10/10/5 bank; Step 3 draft `index.mdx` opening / each `topic-NN.mdx` to
`contracts/topic-cycle.md` with ≥1 FIGURE marker / `unit-assessment.mdx` with the bounded answers
section last / optional `unit-teacher-notes.mdx`, recompute `est_reading_minutes`, register
unchanged; Step 4 emit `coverage/unit-NN.md` (v2) + `sources/unit-NN.md` + `figures/unit-NN.md`,
run `validate:content && check:depth-gate && check:figures && check:no-answer-keys && test`.
Re-draft handoff updated for the new file set. `references/`: rename `depth-standard.md` →
`structure-standard.md`; expand `pedagogy-checklist.md`; add `item-writing.md`,
`answers-block-formatting.md`, `figure-prompts.md`; note in `citation-and-register.md`.

### Agent context update

Run `.specify/scripts/bash/update-agent-context.sh claude` to add the new gate + the rewritten
skill to the active-technologies list. No new language/framework — the delta is one script alias,
one JSON schema, and a rewritten skill.

### Post-design Constitution re-check

Re-evaluated after the design above: **PASS with the v2.6.0 amendment applied and one Complexity
Tracking entry**. The design adds no backend, no dependency, no new *rendered* content type; the V.2
carve-out is bounded, gated and reversible; VI.1 is satisfied by re-running the Standard-versioning
clause; the docs-gate task covers X.2; III.8 is strengthened (alt text now gated).

## Phase 2 — (handled by `/sp.tasks`, not here)

`/sp.tasks` decomposes this into dependency-ordered tasks per the approved plan's 12 phases:
constitution v2.6.0 (blocking) → v3.0 style-guide sections (version bump deferred) + skill-reference
rename → contracts → FR-004 note → gates + red-first tests → implement gates → skill rewrite →
EFMP-302 content-spec v3 + owner re-approval → proving-unit draft via the skill → gate green on the
real unit → Urdu handoff → app wiring → human Content gate → **then** style-guide `version` "3.0" +
README + EFMP-301 re-proof note + ADR + PHR + drift reconciliation. Merge gate: do not merge between
the Urdu-handoff `tasks.md` edit and the human Content-gate pass (`check:pipeline-gate` red for
Unit 1 by design in that window — the Spec 007 lesson).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **Art. V.2 answer-key carve-out** — bounded self-study keys/rubrics become intentionally public content in `unit-assessment.mdx` / `course-review.mdx` | The book is a *primary* self-study resource (Constitution Art. I.1). A chapter-end question bank with no way to self-check is pedagogically inert; every comparable B.Ed textbook prints answers at the back. The owner chose this explicitly (AskUserQuestion, this session) | **Answers out-of-book** (teacher-only / git-ignored) — rejected: defeats the self-study purpose for the majority of users who are not in a teacher-managed class. **Answers only in `teacher-notes.mdx`** — rejected: still needs the gate relaxed, still hides them from self-learners, and mixes assessment keys into teaching guidance. The chosen path keeps the RLS-protected *graded* LMS bank (Spec 003) fully separate and `verified_teacher`-gated, retains the front-matter key ban absolutely, keeps `check-no-answer-keys.mjs` scanning everywhere else, and confines the exception to one canonical, must-be-last heading in two named file types — bounded and reversible |

## Risks & follow-ups (max 3)

- **EFMP-301 golden-unit re-proof at v3.0 is a constitutional obligation (Art. VI.1, re-run in
  v2.6.0).** Action: right after this feature ships, add a `### Topic list` to
  `specs/content/efmp-301/content-spec.md` `## Unit 1` and restructure EFMP-301 Unit 1 to v3.0 —
  tracked as a prose `> **Pending:**` note now (a `▢` tracker row would flip the published unit to
  "not done" in `check-pipeline-gate.mjs` and break the deploy cron — the Spec 007 T034 lesson),
  tracker rows when it is scheduled on its own branch. Not a blocker on this feature's DoD (FR-029).
- **Reading-minutes budget explosion.** A nine-part cycle × ~4 topics + a 25-item bank is ~2–3× the
  legacy band; every course's `**Depth budget**` must be re-baselined per restructure. Mitigation:
  set EFMP-302 U1's band from the actual drafted total; publish a per-topic band and loosen the
  style guide's "±25%" guidance to a documented range; only the band is gated (FR-016).
- **The `check-no-answer-keys.mjs` exception is a loosened safety gate.** A delimiter-logic bug
  risks a real stray key slipping through inside `unit-assessment.mdx` or false merge blocks.
  Mitigation: exact case-sensitive canonical heading, two-name filename whitelist, hard
  "must-be-final-section" check, ≤1 heading/file, the front-matter key ban retained absolutely, and
  a dedicated `tests/unit/no-answer-keys.test.mjs` carrying the exploit cases (near-miss heading,
  trailing section, double heading, front-matter key inside the block, legacy file unchanged).
