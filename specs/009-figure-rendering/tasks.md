---
description: "Task list for 009-figure-rendering"
---

# Tasks: Figure Rendering

**Input**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`
**Tests**: TDD for the gate rewrite (T009 red-first precedes T010).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallel-safe (different files, no dependency on an incomplete task)
- **[Story]**: `US1` author render flow · `US2` reader-facing render · `US3` the gate

## Path conventions

Single Docusaurus-rooted project. Component in `src/`; gate + optimiser in `scripts/`; tests in
`tests/unit/`; skill in `.claude/skills/generate-figures/`; contracts in `specs/009-figure-rendering/contracts/`;
assets in `static/img/figures/`.

---

## Phase 1: Contracts & governance

- [x] T001 [P] Add a top pointer to `specs/008-rich-unit-pedagogy/contracts/figures-manifest.md`: "**Superseded for rendered units by `specs/009-figure-rendering/contracts/figure-manifest-v2.md`.**" and mark the "Lifecycle note" as executed by Spec 009. [FR-014]
- [x] T002 `specs/content/style-guide.md` `## Figure markers and manifests`: rewrite to the v2 manifest (`| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`), the `prompt-only → generated → placed` lifecycle, the `<Figure>` end-state (id == marker id, alt verbatim, src == `/img/figures/…`), the `.ur.svg` bilingual rule, the asset-path grammar, and the "carrier = comment **or** `<Figure>`" definition. Bump front-matter `version: "3.0"` → `"3.1"`. [FR-010, FR-014]
- [x] T003 [P] `.gitignore`: add `specs/content/**/figures/.staging/`. [FR-004]
- [x] T004 [P] `specs/backlog.md`: add a "## From 008-rich-unit-pedagogy" section noting the figure image-pass is delivered by Spec 009 (`generate-figures` skill + `<Figure>` + manifest v2). [FR-017]

**Checkpoint**: the v2 manifest contract is the reference; style guide at 3.1.

---

## Phase 2: The `<Figure>` component (US2)

- [x] T005 [P] [US2] Create `src/components/Figure.tsx` per `contracts/figure-component.md` — pure function component, props `id`/`src`/`alt`/`caption?`/`kind?`, renders `<figure className="figure figure--{kind}" id={id}><img src alt loading="lazy" decoding="async">[<figcaption>]</figure>`. Mirror the `ActivityCard.tsx` shape. [FR-007]
- [x] T006 [US2] `src/theme/MDXComponents.tsx`: `import Figure` and add it to the exported map (so topic files need no import). [FR-007]
- [x] T007 [P] [US2] `src/css/custom.css`: add a `.figure` block — centred, `margin: 1.5rem auto`, `img { max-width: 100%; height: auto; border: 1px solid var(--ifm-color-emphasis-300); border-radius: 6px; }`, `.figure--diagram img { max-width: 640px; }`, `figcaption` muted+small; **inside the existing `@media print` block** add `.figure { break-inside: avoid; }`. No directional properties (RTL-neutral). [FR-007]

**Checkpoint**: `<Figure src="/img/…" alt="…" />` renders anywhere in MDX; `npm run build` still green (component unused so far).

---

## Phase 3: The figure gate rewrite (US3)

### Red-first tests

- [x] T008 [P] [US3] Extend `tests/unit/figures-gate.test.mjs` fixture builder for the v2 manifest (7 columns) + a `<Figure>` carrier form + `static/img/figures/...` asset files under the temp `CONTENT_ROOT`.
- [x] T009 [P] [US3] Add failing cases to `tests/unit/figures-gate.test.mjs`: (a) `prompt-only` unit + legacy unit still pass (regression floor); (b) a topic file whose comment marker was replaced by `<Figure id="fig-U1-1" alt="…" />` → gate accepts it as the carrier; (c) a `placed` row whose `Src` file is missing under `static/` → fail naming the id + path; (d) a `generated`/`placed` row with `Kind: sketch` → fail (not in enum); (e) a `placed` row while the EN topic file still has the *comment* (no `<Figure>`) → fail; (f) a `reviewed` bilingual unit, `Kind: diagram`, `placed`, with no `<figId>.ur.svg` → fail; (g) a `reviewed` unit `placed` with no UR `<Figure id>` → fail; (h) `Src` non-blank on a `prompt-only` row → fail; (i) `Src` blank on a `generated` row → fail. Run — they fail against the current script. [SC-004]
- [x] T010 [US3] Rewrite `scripts/check-figures.mjs`: column-aware manifest parse (header row → name→index map; tolerate 5-col Spec 008 and 7-col v2); add `<Figure id="…" [alt="…"] />` extraction over `matter().content` alongside `markersIn`; define **carrier** = comment marker OR `<Figure>` and use it for "every topic file has ≥1", "carrier-set == manifest-id-set both ways", "Topic == carrier file's topic_label"; add a per-row branch: for `Status ∈ {generated, placed}` → `Kind` in `{diagram, illustration}`, `Src` non-blank; for `placed` → `Src` file exists at `ROOT/static/<Src>`, EN topic file has `<Figure id>`, and for a `reviewed` bilingual unit the UR topic file has `<Figure id>` + (`diagram`) `<figId>.ur.svg` exists; for `prompt-only` → the **exact Spec 008 checks, unchanged**. Every failure names the unit + condition. **Greens T009.** [FR-011, FR-012, FR-013]
- [x] T011 [US3] Run `npm run check:figures` against the real repo — EFMP-302 Unit 1 is still all `prompt-only`, so it MUST stay green (regression floor). Fix any drift.

**Checkpoint (US3)**: `npx vitest run tests/unit/figures-gate.test.mjs` all green; real-repo `check:figures` green.

---

## Phase 4: The offline optimiser

- [x] T012 [P] Add `sharp` to `devDependencies` in `package.json` (`npm i -D sharp`); add `"optimize:figure": "node scripts/optimize-figure.mjs"` to scripts. [plan Complexity Tracking]
- [x] T013 Create `scripts/optimize-figure.mjs` (offline, no network): raster mode — `sharp(in).resize({ width/height ≤ 1600, withoutEnlargement: true }).webp({ quality: 80 })` → write `out`; exit non-zero if `out` bytes > 150 KB naming the size. `--svg` mode — strip `<!-- -->` comments + collapse runs of whitespace between tags; assert ≤ 20 KB; write. Usage `node scripts/optimize-figure.mjs [--svg] <in> <out>`. [FR-005, FR-016]
- [x] T014 [P] Add a smoke test `tests/unit/optimize-figure.test.mjs`: `--svg` on a whitespace-heavy SVG string shrinks it and stays valid XML; an over-budget synthetic input exits non-zero. (Raster mode: assert it errors cleanly on a missing input; a full sharp round-trip is optional — keep the test offline + fast.)

**Checkpoint**: `npm run optimize:figure -- --svg a.svg a.svg` works; `npm test` green.

---

## Phase 5: The `generate-figures` skill (US1)

- [x] T015 [US1] Create `.claude/skills/generate-figures/SKILL.md` — triggers ("generate figures", "render the figure markers", "create the images for <course> unit N", "turn the figure prompts into images"); inputs (a unit with markers + a `prompt-only` manifest; the four `references/`); the loop: classify `Kind` → diagrams author SVG → illustrations HF-MCP-or-brief → `optimize:figure` → place `<Figure>` (marker removed) → mirror UR + `.ur.svg` → manifest v2 row + `Status` → run `validate:content && check:figures && check:no-answer-keys && test && build`. "One skill, no sub-agent." Boundary note: `author-unit` writes markers + `prompt-only`; this renders them. [FR-001, FR-015]
- [x] T016 [P] [US1] `.claude/skills/generate-figures/references/svg-authoring.md` — the archetypes (comparison table; relationship triangle/Venn; node-and-arrow web; two-panel split; left-to-right flow) as clean flat vector SVG; the boilerplate (`viewBox`, `role="img"`, `<title>`+`<desc>`, `<style>` with a light palette + `@media (prefers-color-scheme: dark)` overrides, system-font `font-family`); rules — no external font/image, meaning via shape+label not colour, ≤ 20 KB, labels in the unit's plain register; a worked example (the fig-U1-1 comparison table). [FR-003, SC-005]
- [x] T017 [P] [US1] `.claude/skills/generate-figures/references/raster-hf-mcp.md` — the HF MCP config the owner sets (`https://huggingface.co/mcp`, Bearer HF token, add an image Space / Dynamic Spaces); detect a connected image-gen tool at run time (don't hardcode a name); call with `Prompt` + aspect; fetch the URL/bytes in-turn; `npm run optimize:figure`. The no-tool fallback: the `unit-NN.brief.md` format + the `.staging/` ingest. [FR-004]
- [x] T018 [P] [US1] `.claude/skills/generate-figures/references/placement.md` — the marker → `<Figure>` replacement (alt verbatim, id == marker id, src == manifest `Src`); the manifest v2 row edit; the `Status` lifecycle; re-run the gate set; the incremental-unit rule. [FR-008, FR-010]
- [x] T019 [P] [US1] `.claude/skills/generate-figures/references/bilingual-figures.md` — `<figId>.ur.svg` (copy + translate visible labels, RTL text-anchor, Nastaliq stack); mirror `<Figure>` into the UR `topic-NN.mdx` pointing at `.ur.svg` (diagram) or reusing `.webp` with translated `alt` (illustration); `draft` vs `reviewed` gate posture. [FR-009]
- [x] T020 [US1] `.claude/skills/author-unit/references/figure-prompts.md`: replace "a later, out-of-scope pass generates the images" with a pointer to the `generate-figures` skill; keep the boundary (author-unit stops at `prompt-only`). [FR-015]
- [x] T021 [P] README.md: add a "Rendering figures" paragraph under the "Unit structure standard" section — `generate-figures` skill, `<Figure>`, `static/img/figures/`, the SVG-first + HF-MCP-raster split, `npm run optimize:figure`. [Constitution Art. X.2]

**Checkpoint (US1)**: the skill + its four references exist; `author-unit` points at it.

---

## Phase 6: Render EFMP-302 Unit 1 (US1 + US2) 🎯 proving unit

- [x] T022 [P] Author `static/img/figures/efmp-302/unit-01/fig-U1-1.svg` — the four-features comparison table (3 columns × 4 rows, tick/cross glyphs + text, `<title>`, dark-mode block). `npm run optimize:figure -- --svg` it; confirm ≤ 20 KB. [FR-003]
- [x] T023 [P] Author `fig-U1-3.svg` — the accountability/autonomy/collegiality triangle with the "specialised knowledge and training" base bar + "held in balance" caption. Optimise; ≤ 20 KB. [FR-003]
- [x] T024 [P] Author `fig-U1-4.svg` — the central "who am I becoming as a teacher?" node with six labelled influence boxes + arrows. Optimise; ≤ 20 KB. [FR-003]
- [x] T025 Author `fig-U1-2.svg` — the two-panel "industrial" vs "inquiry" classroom scene as flat vector (rows of desks + a lone figure vs clustered groups + a kneeling figure), panels labelled. Its Spec 008 prompt says "clean flat vector" → `Kind: diagram`. (If the owner later wants a raster, re-run via HF MCP.) Optimise; ≤ 20 KB. [FR-002, FR-003]
- [x] T026 [P] Author the four `.ur.svg` variants (`fig-U1-1.ur.svg` … `fig-U1-4.ur.svg`) — structurally identical, visible labels translated to Urdu, `text-anchor`/`direction` set for RTL, Nastaliq font stack. Optimise each; ≤ 20 KB. [FR-009]
- [x] T027 Replace the `{/* FIGURE[fig-U1-N] */}` comment in each `docs/semester-1/efmp-302/unit-01/topic-0N.mdx` with `<Figure id="fig-U1-N" src="/img/figures/efmp-302/unit-01/fig-U1-N.svg" alt="<marker alt verbatim>" />`. [FR-008]
- [x] T028 Replace the marker in each `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-0N.mdx` stub with `<Figure id="fig-U1-N" src="/img/figures/efmp-302/unit-01/fig-U1-N.ur.svg" alt="<Urdu alt>" />`. [FR-009]
- [x] T029 Rewrite `specs/content/efmp-302/figures/unit-01.md` to the v2 table — add `Kind: diagram` and `Src: /img/figures/efmp-302/unit-01/fig-U1-N.svg` to all four rows; set `Status: placed`. Update the header prose. [FR-010]
- [x] T030 Run `npm run validate:content && npm run check:figures && npm run check:no-answer-keys && npm test`. Fix every finding. [SC-001, SC-004]
- [x] T031 `npm run build` (en + ur) green; `npm run serve` + headless-chromium visual check — all four EN figures legible in light **and** dark (Docusaurus theme propagates `color-scheme` to the `<img>` SVG), all four UR figures render with translated labels, markup is `<figure><img loading="lazy" decoding="async">` with the `/img/figures/...` path in both `build/` and `build/ur/`. Lighthouse not re-run this pass, but the added markup is a11y-neutral-to-positive: non-empty `alt` on every image, semantic `<figure>`, each SVG carries `role="img"` + `<title>`/`<desc>`, no colour-only meaning. [SC-002, SC-006]

**Checkpoint (proving unit)**: EFMP-302 Unit 1's four figures render in both locales; all gates + build green.

---

## Phase 7: Polish

- [x] T032 [P] `.specify/scripts/bash/update-agent-context.sh claude` — add the `<Figure>` component, `generate-figures` skill, `sharp` (devDep) to Active Technologies in `CLAUDE.md`.
- [x] T033 [P] Reconcile any implementation drift (final `<Figure>` prop names, SVG boilerplate, gate parser tolerances) back into `plan.md` / `data-model.md` / `contracts/`. [Constitution Art. IV.4]
- [x] T034 `/sp.adr` — ADR-0012 for the figure-rendering decision cluster: `<Figure>` (revisits ADR-0011 rejected alt. D), the `prompt-only → generated → placed` lifecycle + carrier concept, SVG-first with HF-MCP raster, `.ur.svg` bilingual diagrams, `sharp` devDep.
- [x] T035 PHRs under `history/prompts/009-figure-rendering/`: `0001-implement-…green` (embeds the full gate/build verification), `0002-plan-…plan` + `0003-tasks-…tasks` (backfill — the dir was empty).
- [ ] T036 Final verification: `npm run validate:content && npm run check:pipeline-gate && npm run check:depth-gate && npm run check:figures && npm run check:no-answer-keys && npm run check:add-course && npm test && npm run build && npm run check:no-answer-keys` — all green. Commit + PR.

---

## Dependencies

```
Phase 1 (contracts/governance)  ──►  Phase 2 (<Figure>)  ──►  Phase 3 (gate rewrite, TDD)
                                                              └─ T009 (red) ─► T010 ─► T011
Phase 4 (optimiser)             needs nothing from 2/3 — [P] with them
Phase 5 (skill)                 needs Phase 1 (contracts) + Phase 2 (<Figure> exists) + Phase 4 (optimise:figure)
Phase 6 (render Unit 1)         needs Phase 2 + 3 + 4 + 5
  T022–T026 [P]  ─►  T027 ─► T028 ─► T029 ─► T030 ─► T031
Phase 7 (polish)               needs Phase 6
```

## Parallel examples

- **Phase 1**: T001, T003, T004 in parallel; T002 alone (style-guide.md).
- **Phase 2**: T005, T007 in parallel; T006 after T005.
- **Phase 5 references**: T016, T017, T018, T019, T021 in parallel once T015 lands.
- **Phase 6 assets**: T022, T023, T024, T026 in parallel; T025 alone (judgement call on Kind);
  then T027 → T028 → T029 sequential (shared files / manifest).

## Out of scope (follow-ups, not tasks — FR-017)

- Rendering figures for EFMP-302 Units 2–6 or any other course (no per-topic markers yet).
- A raster re-do of `fig-U1-2` via HF MCP (the SVG stands unless the owner asks).
- `srcset` / `<picture>` / an image CDN / a lightbox.
- Comparing `<figId>.svg` and `<figId>.ur.svg` element counts in the gate.
