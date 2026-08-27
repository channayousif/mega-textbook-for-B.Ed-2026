# Quickstart: Content Depth Standard & Reusable Unit-Authoring Skill

**Feature**: 007-content-depth-standard | **Date**: 2026-08-27

Stand up the depth standard, wire its CI gate, and prove it by re-drafting EFMP-302 Unit 1's
English content. No new npm dependency; no database. Node 22+, `npm` (matches Specs 001–006).

## 1. Seed the standard in the style guide (FR-001, FR-007, FR-013, research.md R7/R8)

Edit `specs/content/style-guide.md`:

- Add `## Unit depth standard` — the concept-coverage hard rule (every `### Sub-topic
  checklist` entry → its own named subsection in its FR-004 folding-rule file; grouping only
  if each is still individually covered in the matrix); the soft no-padding length rule
  (precise, ≈ one Pakistan-grounded example per sub-topic, **no word floor**); required
  `## Common misconceptions` + `## Further reading` blocks in `index.mdx`; **formative ≥ 5
  items written as a numbered list** (state this — it is what the gate counts); register
  ceiling restatement (Constitution Art. III.1 — deeper concepts, not harder words).
- Add `## What the depth gate checks vs. the human Content gate` — the FR-013 split.
- Bump front matter `version: "1.0"` → `version: "2.0"` **as the last step of the feature**
  (after §5 passes), not now. `terminology.csv` is untouched (research.md R8).
- One-line description note in `contracts/style-guide-frontmatter.schema.json` (pattern
  already admits `"2.0"` — no structural change).

## 2. Add the format contracts (Phase 1 `contracts/`)

`specs/007-content-depth-standard/contracts/` holds `content-spec-v2.md`,
`coverage-matrix.md`, `sources-consulted.md`. These are prose format contracts (the artefacts
have no front matter) — no copy step into repo-root `contracts/`, unlike Spec 006's JSON
schemas.

## 3. Build the depth gate (FR-012, research.md R2/R4/R6/R7)

Create `scripts/check-unit-depth.mjs` — same skeleton as `scripts/check-pipeline-gate.mjs`
(`CONTENT_ROOT` override, `gray-matter`, hand-rolled table parser, `errors[]`, non-zero exit
with a per-unit message). Per non-`coming_soon` EN unit under `docs/`:

1. Load the course `content-spec.md`; find the `## Unit N` subsection; parse the
   `### Sub-topic checklist` table. **No table → skip the unit** (out of scope, R4).
2. `specs/content/<course>/coverage/unit-NN.md` — parse; fail if missing, if any checklist
   `ID` has no row, or if any row has a blank `File`/`Section`/`Source`.
3. `specs/content/<course>/sources/unit-NN.md` — fail if any coverage `Source` lacks a `Key`
   here, or any non-`no-external-source` `Key` is unreferenced (FR-012e).
4. EN `index.mdx` — fail if **either** the `## Common misconceptions` heading **or** the
   `## Further reading` heading is missing (FR-005 mandates both).
5. `formative.mdx` — count `/^\s*\d+\.\s/m`; fail if < 5.
6. Sum `est_reading_minutes` across the five EN files; parse `**Depth budget**`'s `A–B`
   range; fail if the sum ∉ `[A, B]`.

```bash
npm run check:depth-gate   # add "check:depth-gate": "node scripts/check-unit-depth.mjs" to package.json
```

Add fixture tests `tests/unit/depth-gate.test.mjs` (mirror `tests/unit/pipeline-gate.test.mjs`
+ `_helpers.mjs`): happy path; no checklist → exit 0; missing coverage file; unmapped ID;
blank cell; dangling `Source`; missing "Common misconceptions" (further reading present);
missing "Further reading" (misconceptions present); 4 formative items; reading-minutes sum
below/above band; `coming_soon` skipped — each failing case asserts the message names the
condition. `npm test` picks the file up.

## 4. Build the authoring skill (FR-011, research.md R5/R10)

`.claude/skills/author-unit/SKILL.md` (+ `references/depth-standard.md`,
`references/pedagogy-checklist.md`, `references/citation-and-register.md`). `SKILL.md`
workflow: **source-gather** (read the guide sub-unit verbatim; pull mapped readings;
`WebSearch`/`WebFetch` a topically-related open-access substitute when one is unavailable,
recording exact URL/DOI; offline → author-provided + FR-004 escalation; never fabricate a
citation) → **UbD backward design** (CLOs → understandings → assessment evidence → content;
Bloom table) → **draft the five files** to `references/depth-standard.md` → **self-review +
emit** `coverage/unit-NN.md` and `sources/unit-NN.md`. Keep `references/depth-standard.md` in
sync with `style-guide.md`'s `## Unit depth standard` section.

## 5. Prove it on EFMP-302 Unit 1 (FR-015, SC-001…SC-006)

1. **Expand** `specs/content/efmp-302/content-spec.md` to `contracts/content-spec-v2.md`:
   add `## Course Description`, `## Reading list` (the guide's Suggested Readings — full APA +
   DOI — in `Scheme-and-Course-guides/extracted-text/1st 2026.txt` ~lines 940–990; each
   tagged to unit(s)), `## Week schedule`, `## Standards & frameworks anchors` (NPST Pakistan,
   UNESCO/NACTE). In the `## Unit 1` subsection add the `### Sub-topic checklist` table (every
   leaf bullet of guide 1.1–1.4), `**Depth budget**`, prerequisites, misconceptions, mapped
   readings, worked-examples plan, best-practice notes.
2. **Re-draft** the five EN files in `docs/semester-1/efmp-302/unit-01/` using the skill —
   every checklist sub-topic gets its own named subsection; ≈ one Pakistani-classroom example
   per sub-topic; `## Common misconceptions` + `## Further reading` in `index.mdx`; formative
   ≥ 5 numbered items; summative keeps its rubric + ≥ 1 Analyze item. Recompute each file's
   `est_reading_minutes`.
3. **Emit** `specs/content/efmp-302/coverage/unit-01.md` and
   `specs/content/efmp-302/sources/unit-01.md` per the contracts (≥ 3 distinct scholarly
   sources — SC-002).
4. **Urdu handoff** (FR-016/FR-017): set `translation_status: draft` on the five UR files in
   `i18n/ur/…/semester-1/efmp-302/unit-01/`; append `Unit 1 | G4 ur-translation | ▢` and
   `Unit 1 | G5 ur-review | ▢` rows to `specs/content/efmp-302/tasks.md`. (Actual Urdu
   re-work is downstream.)
5. Run the gates:

```bash
npm run validate:content
npm run check:pipeline-gate
npm run check:depth-gate
npm run check:no-answer-keys
npm test
```

All MUST pass. Then a curriculum-owner **human Content gate** pass on the re-drafted unit
(SC-003) — traceability, register held, examples apt, substitutes on-topic.

6. **Freeze**: set `style-guide.md` `version: "2.0"` (SC-007).

## 6. Wire CI (FR-012)

In `.github/workflows/ci.yml` `build` job, after the "Pipeline gate" step and before
"Answer-key safety check":

```yaml
- name: Depth gate (concept coverage, required blocks, formative floor)
  run: npm run check:depth-gate
```

## 7. Docs (Constitution Art. X.2, FR-018)

Add a "Content depth standard" section to `README.md` — what the standard requires, where the
coverage matrix / sources list live, how to run `check:depth-gate`, and the
`author-unit` skill. Note the `references/depth-standard.md` ↔ `style-guide.md` sync rule.

## Verification checklist

- [ ] `style-guide.md` has `## Unit depth standard` + `## What the depth gate checks…`;
      `version: "2.0"` set only after §5 passes
- [ ] `scripts/check-unit-depth.mjs` exists; `npm run check:depth-gate` exits 0 against the
      re-drafted EFMP-302 Unit 1 and skips every unmigrated unit
- [ ] `tests/unit/depth-gate.test.mjs` covers the ten cases above; `npm test` green
- [ ] `.claude/skills/author-unit/SKILL.md` + three `references/` files exist
- [ ] `specs/content/efmp-302/content-spec.md` expanded; `## Unit 1` has the checklist +
      depth budget; still `status: approved`
- [ ] `specs/content/efmp-302/coverage/unit-01.md` maps 100% of the Unit 1 checklist (SC-001);
      `sources/unit-01.md` has ≥ 3 scholarly sources (SC-002)
- [ ] EFMP-302 Unit 1 five EN files re-drafted; `## Common misconceptions` + `## Further
      reading` present; formative ≥ 5 numbered items; reading-minutes sum within the budget band
- [ ] UR five files `translation_status: draft`; `tasks.md` has the G4/G5 revision rows
- [ ] `ci.yml` runs `check:depth-gate` in the `build` job
- [ ] `README.md` has the "Content depth standard" section
- [ ] Follow-up logged: bring EFMP-301 Unit 1 (constitutional golden unit) to v2.0

## Implementation results (2026-08-27, /sp.implement)

Machine-verifiable items all green:

- `style-guide.md` — `## Unit depth standard` + `## What the depth gate checks…` added;
  `version` **left at `"1.0"`** — T032 bumps it to `"2.0"` only after the human Content gate
  (T036) clears, per FR-014 / step 5.6.
- `scripts/check-unit-depth.mjs` + `tests/unit/depth-gate.test.mjs` (17 cases) — `npm test`
  45/45 green; `npm run check:depth-gate` passes against the re-drafted EFMP-302 Unit 1 and
  skips every un-migrated unit.
- `.claude/skills/author-unit/` — `SKILL.md` + `references/{depth-standard,pedagogy-checklist,
  citation-and-register}.md`.
- `specs/content/efmp-302/content-spec.md` — expanded (Course Description, Reading list,
  Week schedule, Standards anchors); Unit 1 has the 14-row `### Sub-topic checklist` +
  `**Depth budget**: 14 sub-topics; 45–70 reading-min`; `status: approved` unchanged.
- `coverage/unit-01.md` (14/14 checklist IDs mapped) + `sources/unit-01.md` (7 guide-required
  scholarly sources) — SC-001, SC-002 met.
- Five EN files re-drafted; unit-total `est_reading_minutes` = 65 (band 45–70); formative = 8
  numbered items; summative rubric + Analyze task.
- UR five files → `translation_status: draft`; `efmp-302/tasks.md` Unit 1 G2/G3 → `▣`,
  G4/G5 → `▢`; `ci.yml` runs `check:depth-gate`; `README.md` has the section.
- Follow-up logged in `specs/content/efmp-301/content-spec.md` + `specs/backlog.md`.

**Completed 2026-08-27:** the curriculum owner reviewed and approved the re-drafted EFMP-302
Unit 1 and the expanded content-spec (T013, T036) — `efmp-302/tasks.md` Unit 1 G2/G3 set to
`✅ YM`; `style-guide.md` `version` bumped to `"2.0"` (T032); `terminology.csv` confirmed
unchanged and the schema validates `"2.0"` (T033). **All 41 tasks done.** Full gate suite
green: `validate:content`, `check:pipeline-gate`, `check:depth-gate`, `check:no-answer-keys`,
`npm test` (45/45). The unit's `ur` route falls back to EN behind the Spec 001 FR-003 banner
until the downstream G4/G5 Urdu re-review.
