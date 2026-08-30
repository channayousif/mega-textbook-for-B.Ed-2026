# Quickstart: Rich Unit Pedagogy — Nested Per-Topic Learning Cycles

**Feature**: 008-rich-unit-pedagogy | **Date**: 2026-08-27

Stand up the per-topic unit structure standard, its gates, and the rewritten `author-unit` skill,
then prove it by re-restructuring EFMP-302 Unit 1's **English** content. No new npm dependency; no
database. Node 22+, `npm` (matches Specs 001–007).

Sequence matters: **the constitution amendment is blocking** and the `style-guide.md` `version`
bump is **last** (after the human Content gate). Do not merge between the Urdu-handoff `tasks.md`
edit and the human Content-gate pass — `check:pipeline-gate` is red for Unit 1 by design in that
window.

---

## 1. Amend the constitution (blocking — FR-024)

`.specify/memory/constitution.md`: v2.5.0 → **v2.6.0** (MINOR). Prepend a `SYNC IMPACT REPORT
(v2.6.0)` block, then edit:

- **Art. III.1** — one-line reaffirmation: the richer structure does not raise the language register.
- **Art. III.3** — new-shape units carry a per-topic formative+summative cycle *and* a unit-end
  10 MCQ / 10 RRQ / 5 ERQ bank with rubrics; the Analyze-or-higher rule holds at both levels.
- **Art. III.6** — the Spec 008 per-topic layout is a permitted alternative carrier of the guide's
  teaching/practical/assessment sections; "MUST NOT be invented where the guide is silent" unchanged.
- **Art. V.2** — carve-out: a bounded `## Answers and marking guidance` final section of
  `unit-assessment.mdx` / `course-review.mdx` is *intentionally public* self-study content, distinct
  from the RLS-protected LMS quiz/answer-key store (Spec 003), which stays backend-only and
  `verified_teacher`-gated. The "static bundle is public" principle is unchanged.
- **Art. VI.1 "Standard versioning"** — re-run for v3.0: proving unit = EFMP-302 Unit 1; the
  EFMP-301 Unit 1 re-proof at v3.0 is the immediate next content task (prose note now, tracker rows
  when scheduled); EFMP-302 Unit 1 is the working depth exemplar until then.
- **Art. VII** — add a "Figure gate" row under the Engineering gate.

Downstream-artefact review in the sync block: `.specify/templates/*` (no hardcoded article numbers —
confirm), `specs/006` FR-004 note (§4), `specs/007` unaffected, `style-guide.md` v2.0→v3.0 covered
by the amended VI.1.

## 2. Draft the v3.0 style-guide sections (do NOT bump `version` yet — FR-026, D5)

`specs/content/style-guide.md`:

- **`## Unit structure standard`** — the nested model (unit opening → topics → unit-end matter →
  course-end matter); the nine-part cycle with the exact headings from `contracts/topic-cycle.md`;
  file naming (`topic-NN.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`, `course-review.mdx`);
  the opt-in rule (`### Topic list` + `topic-*.mdx`); "legacy five-file units are unchanged and not
  required to migrate"; the single sanctioned `sidebar_position` (`course-review.mdx` → `900`).
- **`## Answers and marking guidance policy`** — the bounded-block rule verbatim (one canonical
  case-sensitive heading, `unit-assessment.mdx` / `course-review.mdx` only, must be the final `##`
  section, ≤ 1 per file); how `scripts/check-no-answer-keys.mjs` implements it so authors don't trip.
- **`## Figure markers and manifests`** — marker grammar, `fig-U<n>-<seq>` IDs, the alt-text
  requirement (Art. III.8), the `specs/content/<course>/figures/unit-NN.md` manifest,
  `npm run check:figures`, "nothing renders yet".
- **`## Assessment blueprint defaults`** — add the unit-end 10/10/5 bank + per-topic cycle
  assessments alongside the existing defaults.
- **`## What the depth gate checks vs. the human Content gate`** — add automated rows (cycle-heading
  presence/order, per-topic formative/checklist counts, 10/10/5 counts, answers-block-is-final,
  figure↔manifest consistency) and human rows (topic-grouping quality, figure-prompt aptness, rubric
  soundness, whether the real-life hook lands).
- **`## Answer-key marker patterns`** — note the new bounded exception.
- Description-only note in `contracts/style-guide-frontmatter.schema.json` (`"3.0"` marker; pattern
  already admits it).

Rename `.claude/skills/author-unit/references/depth-standard.md` → `structure-standard.md`; keep the
reciprocal "sync with `style-guide.md`'s `## Unit structure standard`" directive in both files.

## 3. Add the contracts (Phase 1 `contracts/`)

`specs/008-rich-unit-pedagogy/contracts/` holds `content-spec-v3.md`, `coverage-matrix-v2.md`,
`topic-cycle.md`, `end-of-unit-assessment.md`, `end-of-course-review.md`, `figures-manifest.md`
(prose format contracts — no repo-root copy) and `course-review.schema.json` (front matter *is*
present — **copy to repo-root `contracts/`**, which `validate-content.mjs` compiles).

- `contracts/unit-frontmatter.schema.json` (+ mirror to `specs/008-.../contracts/`): add optional
  `topic_no` (int ≥ 1), `topic_label` (string, minLength 1); keep the `not/anyOf` answer-key key
  ban; description note that both are required in practice on `topic-*.mdx`.
- Add a one-line "extended by Spec 008" pointer atop
  `specs/007-content-depth-standard/contracts/{content-spec-v2,coverage-matrix}.md`.

## 4. Supersede Spec 006 FR-004 in part (FR-025)

`specs/006-content-pipeline/spec.md`: add a superseding note **under** the FR-004 folding table
(FR-004 not deleted). The five-file rule remains the default and governs every non-opted-in unit;
Spec 008 introduces the opt-in `index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx` shape, selected
by `### Topic list` + `topic-*.mdx`; the folding table's guide-section→destination intent is
preserved (strategies/practical → `unit-teacher-notes.mdx`; activities/formative/summative → each
topic's cycle; readings → each topic's `## Further reading`). Touch SC-005 / Key Entities only if
they say "five files" literally.

## 5. Build the gates + red-first tests (FR-014, FR-018–021)

**Write the failing tests first**, then implement:

- `tests/unit/depth-gate.test.mjs` — extend `makeDepthFixture()` with `layout: 'topic'`; add
  new-shape cases (happy path; missing/misordered cycle heading names heading+topic; formative < 3;
  no self-check; signal disagreement / count mismatch; unassigned or double-assigned sub-topic ID;
  missing `unit-assessment.mdx`; MCQ 9 / RRQ 11 / ERQ 4; a `##` after the answers heading;
  reading-minutes sum outside band; coverage `File: topic-99.mdx`; a topic file unreferenced by
  coverage) **+ the existing legacy fixture still passes** (regression).
- `tests/unit/validate-layout.test.mjs` *(new)* — legacy passes; new-shape passes; gap after
  `topic-01`; stray `formative.mdx` in a new-shape folder; `topic_no` ≠ ordinal; missing
  `topic_label`; bad `course-review.mdx` front matter.
- `tests/unit/figures-gate.test.mjs` *(new)* — legacy skipped; topic with no marker; malformed id
  `fig-1-2`; duplicate id across two topics; marker absent from manifest / manifest row with no
  marker; blank `alt`; `Topic` mismatch; happy path.
- `tests/unit/no-answer-keys.test.mjs` *(new)* — `"correct answer"` in `topic-01.mdx` fails; same
  phrase inside the bounded block of `unit-assessment.mdx` passes; bounded block with a trailing
  `## Notes` fails; `answer_key:` in `unit-assessment.mdx` front matter fails;
  `## Answers and marking guidance (teachers)` does not open the exception; two canonical headings
  fail; `course-review.mdx` bounded block passes; legacy `summative.mdx` with "marking scheme"
  still fails.
- `tests/unit/parity.test.mjs` — new-shape reviewed fixture with matching EN/UR topic files passes;
  dropped UR heading fails at that index; missing UR `topic-02.mdx` fails.

Then implement:

- **`scripts/check-figures.mjs`** *(new)* + `package.json` `"check:figures": "node
  scripts/check-figures.mjs"`. Shape = `check-unit-depth.mjs`. Rules: `contracts/figures-manifest.md`.
- **`scripts/check-unit-depth.mjs`** — replace `UNIT_FILES`/`FOLDING_FILES` with a per-unit set; add
  `detectLayout()` (both signals; loud failure on disagreement) and `parseTopicList()`; legacy path
  byte-for-byte; new-shape path adds the ten checks of FR-020.
- **`scripts/validate-content.mjs`** — branch on `topic-*.mdx`; new-shape path requires
  `index.mdx` + `unit-assessment.mdx`, contiguous `topic-01..NN`, forbids the four legacy pooled
  files, `topic_no === NN` + `topic_label` per topic; add `checkCourseReview()`; make the EN↔UR
  parity loop iterate the dynamic union of EN+UR unit-folder `.mdx` names.
- **`scripts/check-no-answer-keys.mjs`** — the bounded `## Answers and marking guidance` exception
  (`research.md` R6): split patterns into front-matter (4) vs prose (3); for
  `(unit-assessment|course-review)\.mdx$` locate the exact canonical heading (`>1` → error; `0` →
  whole-file scan; `1` at line k → error if any `^##\s` after k, else scan `[0,k)` with all 7 and
  `[k,EOF)` with the 4 front-matter patterns only); built-HTML suppresses only the prose patterns
  for the two route names.
- **`scripts/build-content-index.mjs`** — index `topic-*` (`kind:'topic'`), `unit-assessment`
  (`kind:'assessment'`), `course-review` (`kind:'course-review'`); legacy path unchanged; fix any
  search-e2e doc-count fixture.
- **`.github/workflows/ci.yml`** — new `Figure marker gate` step running `npm run check:figures` in
  the `build` job, **after** the depth-gate step, **before** "Answer-key safety check".
- **`src/theme/DocItem/Footer.tsx`** — `deriveSourceKindFromPath`: a tail matching `^topic-\d+$` or
  equal to `unit-assessment` / `course-review` returns `null` (no per-activity feedback control).

Regression floor — all green with zero changes to legacy units:

```bash
npm run validate:content
npm run check:pipeline-gate
npm run check:depth-gate
npm run check:figures
npm run check:no-answer-keys
npm run check:add-course
npm test
```

## 6. Rewrite the `author-unit` skill (FR-022–023)

`.claude/skills/author-unit/SKILL.md` — new triggers ("restructure a unit", "re-draft to the
per-topic standard", "…up to the unit structure standard / v3.0 style guide"). Four steps:
(1) gather + verify sources per topic (never fabricate a citation/DOI); (2) per-topic backward
design (understandings → the topic's formative check + summative task → a Bloom mini-table over that
topic's sub-topic IDs) + plan the 10/10/5 bank; (3) draft `index.mdx` opening, each `topic-NN.mdx`
to `contracts/topic-cycle.md` with ≥ 1 FIGURE marker, `unit-assessment.mdx` with the bounded
answers section last, optional `unit-teacher-notes.mdx`; recompute all `est_reading_minutes`;
register unchanged; (4) emit `coverage/unit-NN.md` (v2), `sources/unit-NN.md`, `figures/unit-NN.md`,
run `validate:content && check:depth-gate && check:figures && check:no-answer-keys && test`.
Re-draft handoff updated for the new file set.

`references/`: `structure-standard.md` (renamed, the full rule set + reciprocal sync note);
`pedagogy-checklist.md` (expanded for the nine parts); `item-writing.md` *(new)* — MCQ/RRQ/ERQ
rules + the 10/10/5 blueprint; `answers-block-formatting.md` *(new)* — the delimiter rule + why
`check:no-answer-keys` won't trip; `figure-prompts.md` *(new)* — prompt craft + `fig-U<n>-<seq>` IDs
+ alt-text; `citation-and-register.md` (note: per-topic `## Further reading` replaces the single
unit-level list).

## 7. Expand EFMP-302's content-spec to v3 (FR-015–017)

`specs/content/efmp-302/content-spec.md`, `## Unit 1`:

- add `### Topic list` — the 4-topic partition of `U1-01…U1-14` (1.1 → U1-01…U1-04, 1.2 →
  U1-05…U1-06, 1.3 → U1-07…U1-10, 1.4 → U1-11…U1-14);
- add a `Topic` column to `### Sub-topic checklist`;
- re-baseline `**Depth budget**` to `14 sub-topics; 4 topics; A–B reading-min` (set `A–B` from the
  drafted total in §8; expect ~100–150);
- add `**Figure plan**` (`fig-U1-1…fig-U1-4`, one per topic) and `**Unit-end assessment blueprint**`
  (10/10/5, Bloom spread, per-topic targeting);
- add a course-level `## Course review plan`.

Curriculum owner reviews and re-affirms `status: approved`; record on the Unit 1 `G1` row.

## 8. Re-restructure EFMP-302 Unit 1 (English) via the skill (FR-029 DoD)

`docs/semester-1/efmp-302/unit-01/`:

| File | From |
|---|---|
| `index.mdx` | → unit opening (`## In this unit` → 4 topics, `## Unit learning outcomes`, `## Prerequisite knowledge`, `## How to use this unit`) |
| `topic-01.mdx` … `topic-04.mdx` | new — the nine-part cycle each + ≥ 1 FIGURE marker |
| `unit-assessment.mdx` | new — `## Unit summary` (from the current `## Key ideas in this unit`) + 10 MCQ + 10 RRQ + 5 ERQ + `## Answers and marking guidance` (last) |
| `unit-teacher-notes.mdx` | from `teacher-notes.mdx` |

Delete `activities.mdx` / `formative.mdx` / `summative.mdx` / `teacher-notes.mdx`. The current
`summative.mdx` "analyse a described teacher's practice" task → an ERQ and/or `topic-03`'s
`## Summative task`.

Emit: `specs/content/efmp-302/coverage/unit-01.md` (v2 — `File` = `topic-0N.mdx` /
`unit-assessment.mdx`; `Section` = the sub-heading under each topic's `## Explanation`); update
`specs/content/efmp-302/sources/unit-01.md` (same 7 keys, now cited per-topic); create
`specs/content/efmp-302/figures/unit-01.md`. Recompute every `est_reading_minutes`; finalise the
`**Depth budget**` band from the actual total. `<PrintHandout />` on each `topic-*.mdx`,
`unit-assessment.mdx`.

## 9. Gate green on the real unit

```bash
npm run validate:content && npm run check:depth-gate && npm run check:figures \
  && npm run check:no-answer-keys && npm test
```

All green. Leave EFMP-302 Unit 1 `G2 en-draft` / `G3 en-review` at `▣` (re-opened from `✅`).
`check:pipeline-gate` is expected **red** for Unit 1 until the human Content gate — by design.

## 10. Urdu-mirror handoff (FR-028)

`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/`: delete orphan UR
`activities.mdx` / `formative.mdx` / `summative.mdx`; keep UR `index.mdx` (→ new opening skeleton);
rename `teacher-notes.mdx` → `unit-teacher-notes.mdx`; add UR `topic-01…topic-04.mdx` +
`unit-assessment.mdx` as **heading-only skeleton stubs** mirroring the EN heading vectors, all
`translation_status: draft`; update `<TranslationStatusBadge status="draft" />`. Parity gate skips
`draft` units; the `ur` route falls back to EN behind the Spec 001 FR-003 banner.
`specs/content/efmp-302/tasks.md`: re-open `Unit 1 | G2/G3` to `▣`, note the `G4/G5` scope change.

## 11. Human Content gate → freeze → docs → records

1. Curriculum owner passes the human Content gate on EFMP-302 Unit 1 → sets `G2 en-draft` /
   `G3 en-review` to `✅` with initials; `check:pipeline-gate` goes green again.
2. **Now** bump `specs/content/style-guide.md` `version` `"2.0"` → `"3.0"` (FR-026).
3. `README.md` — add a "Unit structure standard" contributor section (Constitution Art. X.2):
   the per-topic model, `topic-*.mdx` / `unit-assessment.mdx` / `course-review.mdx`,
   `npm run check:figures`, the answers policy, the `figures/` manifest, the
   `structure-standard.md` ↔ `style-guide.md` sync rule.
4. `specs/content/efmp-301/content-spec.md` + `specs/backlog.md` — a `> **Pending:**` prose note for
   the EFMP-301 Unit 1 v3.0 re-proof (no `▢` tracker rows — that would break the deploy cron; the
   Spec 007 T034 lesson). Confirm `check:pipeline-gate` stays green for EFMP-301.
5. New `history/adr/00NN-nested-per-topic-unit-pedagogy.md` (the five-decision cluster) + a PHR per
   stage under `history/prompts/008-rich-unit-pedagogy/`.
6. Reconcile any implementation drift (heading text, ID grammar, parser behaviour) back into
   `plan.md` / `data-model.md` / `contracts/` (Constitution Art. IV.4).

## Verification (end-to-end)

```bash
# full local gate set — regression floor + the proving unit
npm run validate:content && npm run check:pipeline-gate && npm run check:depth-gate \
  && npm run check:figures && npm run check:no-answer-keys && npm run check:add-course && npm test
npm run build            # en + ur
npm run check:no-answer-keys   # against build/ output

# targeted
npx vitest run tests/unit/depth-gate.test.mjs tests/unit/validate-layout.test.mjs \
  tests/unit/figures-gate.test.mjs tests/unit/no-answer-keys.test.mjs tests/unit/parity.test.mjs

# gate-teeth (SC-004): delete a cycle heading / drop an MCQ / add a section after the answers
# block → the relevant gate fails naming the condition; revert.

# build spot-check: sidebar shows index → topic-01..04 → unit-assessment (→ unit-teacher-notes)
# in order; each topic + the assessment page render a Print button; the answers section renders
# as ordinary content; /ur/ Unit 1 falls back to English behind the "translation in progress" banner.
```

Green regression floor across EFMP-301, GENG-300 (`bilingual:false`), EFMP-302 U2–U6, gict-300,
gnas-301, gqur-300, and the `ZZZ-999` scaffold = SC-007. The re-restructured EFMP-302 Unit 1 green
on every English-side gate + the human Content gate, with committed coverage/sources/figures = SC-003.
