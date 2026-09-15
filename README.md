# B.Ed (4-Year) Mega Textbook & Learning Platform

A bilingual (English + Urdu) digital textbook and learning platform for the B.Ed (4-Year)
programme, University of Sindh, Faculty of Education, Elsa Kazi Campus, Hyderabad. Built on
[Docusaurus](https://docusaurus.io/) v3 with a self-hosted [Supabase](https://supabase.com/)
backend for application state (auth, classes, grading, teacher/student dashboards).

Governance, requirements, and every architectural decision are recorded under [`.specify/`](.specify/),
[`specs/`](specs/), and [`history/adr/`](history/adr/) - see [`.specify/memory/constitution.md`](.specify/memory/constitution.md)
for the project's non-negotiable principles.

## Local setup

Requires Node.js 22+.

```bash
npm install
npm start          # dev server, http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in the Supabase URL/anon key to exercise
authenticated features (classes, dashboards, submissions) locally.

## Build & test

```bash
npm run build             # static build (both EN and UR locales)
npm test                  # unit tests (Vitest)
npm run test:e2e          # end-to-end tests (Playwright, needs a build)
npm run validate:content  # content-shape gate: front-matter, EN<->UR parity, glossary refs
npm run check:pipeline-gate     # content-pipeline gate: tracker/content-spec/terminology (see below)
npm run check:depth-gate        # content depth gate: concept coverage / required blocks / formative floor (see below)
npm run check:figures           # figure marker <-> manifest consistency for per-topic units (see below)
npm run check:no-answer-keys    # answer-key leak scan
```

CI (`.github/workflows/ci.yml`) runs all of the above on every push/PR.

## Content authoring pipeline

Adding or revising a unit follows the process defined in
[`specs/006-content-pipeline/`](specs/006-content-pipeline/): a fixed stage sequence (course
intake → unit spec → EN draft/review → UR translation/review → assets → publish), gated by:

- `specs/content/style-guide.md` - readability, register, localization, citation, and diagram
  rules; the maintained answer-key marker pattern list.
- `specs/content/terminology.csv` - the shared EN↔UR term bank every translator consults.
- `specs/content/<course-code>/content-spec.md` - the approved, per-course source of truth (must
  carry `status: approved` before any unit under it may be drafted or merged).
- `specs/content/<course-code>/tasks.md` - the per-course task tracker (one row per unit per
  stage) that CI checks before allowing a merge.

A required CI step, `npm run check:pipeline-gate`, blocks merging a unit's draft unless its
course's content-spec is approved, its tracker rows are marked done with reviewer initials, and
(for units touching Urdu) its declared key terms match the terminology bank. Quiz-bank and
answer-key content is never committed to this repository - it's staged in a git-ignored per-unit
worksheet under `specs/content/<course-code>/.staging/` and entered manually into the backend via
Supabase Studio. See [`specs/006-content-pipeline/quickstart.md`](specs/006-content-pipeline/quickstart.md)
for the full walkthrough.

## Independent G3/G5 reviewers

The repository now includes `g3-reviewer` and `g5-reviewer` Claude agent definitions, backed
by `.claude/skills/review-unit/SKILL.md`. Invoke the appropriate agent in a fresh session
against a frozen unit checkout. Other hosts can load the same skill explicitly.

```bash
npm run review:evidence -- prepare EFMP-302 1 G3 /tmp/g3-review-run
npm run review:evidence -- validate path/to/report.json
npm run test:review
```

Preparation creates a manifest, not a frozen copy. The parent host must preserve the reviewed
checkout. Reviewers produce findings and evidence without changing content or tracker rows.
See [the review contract](specs/014-agent-review-governance/contracts/review-evidence.md).

**Commit before you prepare.** The manifest is built from git's index, so it describes a
commit rather than one machine's working tree. `prepare` refuses to run while any bound input
is modified, staged or untracked, and names the offending paths: a bundle built over local
scratch files is one no other host, CI included, can reproduce.

**Activation state:** review execution is available; automatic G3/G5 certification is not yet
qualified. The registry starts empty. Synthetic evidence tests and excerpt exercises are not
academic qualification. Provision `CONTENT_REVIEW_PUBLIC_KEY` in CI and a separate protected
Ed25519 signing host, then record real owner-approved held-out qualification before enabling
an entry. Never commit or expose the private key to authors, reviewers or PR jobs.

The trust root is a CI secret rather than a committed file, so that a pull request cannot
swap it. The cost is local: once the first `agent:` tracker row exists, `check:pipeline-gate`
fails closed off CI with `CONTENT_REVIEW_PUBLIC_KEY is not provisioned`. Export the public key
locally to reproduce the CI result; without it, trust CI's run of that gate.

`accept` verifies signatures, reviewer scope and current evidence without writing tracker rows.
A trusted host may then append `agent:<id>` and `review:<report-path>` to the existing tracker.
The pipeline rejects unsigned, stale, unqualified or revoked agent evidence. Existing human
reviews remain valid. [ADR-0019](history/adr/0019-independent-agents-for-g3-g5-review.md)
and Constitution v3.0.0 define the delegation and audit requirements.

## Licence track

Most content is the B.Ed degree corpus, under `docs/semester-N/<course>/unit-NN/`. A second
content track holds material the Sindh Teaching Licence test assesses but the 2026 scheme does
not teach - `EED-313` Classroom Management was a Foundation course in the 2025 scheme and was
restructured away with no successor, while the licence still tests it.

Licence content lives in `licence/<course>/unit-NN/` and renders at `/licence/`, with its Urdu
mirror under `i18n/ur/docusaurus-plugin-content-docs-licence/`. It is deliberately absent from the
semester sidebar: showing a non-scheme course there would imply it is part of the approved
programme. It is reachable from its own navbar entry and from offline search.

Both tracks face the same gates. `scripts/lib/content-roots.mjs` is the single definition of where
content lives, so adding a course to either track stays a content-only change, which
`npm run check:add-course` proves on every CI run.

See [ADR-0020](history/adr/0020-content-tracks.md),
[`specs/015-licence-content-tree/`](specs/015-licence-content-tree/) and
[`specs/content/licence-blueprint.md`](specs/content/licence-blueprint.md).

## Content depth standard

[`specs/007-content-depth-standard/`](specs/007-content-depth-standard/) adds a **concept-coverage
depth standard** on top of the pipeline so a unit's depth is a checkable condition, not a matter
of reviewer stamina:

- `specs/content/style-guide.md` gains a `## Unit depth standard` section (frozen at
  `version: "2.0"`): every course-guide sub-topic on a unit's **enumerated checklist** gets its
  own named subsection; `index.mdx` must carry `## Common misconceptions` **and**
  `## Further reading`; the formative set is a numbered list of **≥ 5 items**; the unit's total
  `est_reading_minutes` must sit inside the content-spec's `**Depth budget**` band. Language
  register is unchanged - deeper *concepts*, not harder *words* (Constitution Art. III.1).
- Each migrated `content-spec.md` `## Unit N` subsection carries a `### Sub-topic checklist`
  table (the authoritative list) plus a `**Depth budget**` line, prerequisites, misconceptions,
  mapped readings, and a worked-examples plan.
- Per unit: `specs/content/<course-code>/coverage/unit-NN.md` (sub-topic → file → section →
  source) and `specs/content/<course-code>/sources/unit-NN.md` (full citations, URL/DOI, kind).
- The `.claude/skills/author-unit/` skill drives the source-gather → backward-design →
  draft-five-files → self-review workflow that produces those files.
- A required CI step, `npm run check:depth-gate`, runs for **every unit whose content-spec
  subsection has a `### Sub-topic checklist`** and blocks a merge on any structural shortfall;
  units without a checklist are grandfathered. It is additive to `check:pipeline-gate` and the
  Spec 001 validators - it replaces neither.

`references/structure-standard.md` inside the skill restates the same rules and **must be kept in
sync** with the `## Unit depth standard` / `## Unit structure standard` sections of
`style-guide.md`; changing either requires updating the other and bumping `style-guide.md`'s
`version`.

## Unit structure standard (per-topic layout)

[`specs/008-rich-unit-pedagogy/`](specs/008-rich-unit-pedagogy/) adds an **opt-in alternative
unit shape** in which each topic is a self-contained nine-part learning cycle. Legacy five-file
units are unchanged and are not required to migrate.

- A unit is on this standard **only** when *both* signals are present: a `### Topic list` table
  in its `content-spec.md` `## Unit N` subsection **and** `topic-*.mdx` files in its `docs/`
  folder. Exactly one present (or a row-count mismatch) is a **loud depth-gate failure**.
- **File set:** `index.mdx` (opening only - outcomes / prerequisites / `## In this unit` /
  how-to-use, no exposition) · `topic-01.mdx … topic-NN.mdx` (zero-padded, contiguous; front
  matter carries `topic_no` + `topic_label`) · `unit-assessment.mdx` (`## Unit summary` + a
  fixed **10 MCQ / 10 RRQ / 5 ERQ** bank + a final `## Answers and marking guidance` section) ·
  optional `unit-teacher-notes.mdx` · optional course-level `course-review.mdx` (the only content
  file allowed `sidebar_position`, `900`).
- **The nine cycle headings, checked for presence and order:** `## A real classroom situation` →
  `## Explanation` → `## Activity: <name>` → `## Check your understanding` (≥3 numbered) →
  `## Summary` → `## Self-assessment checklist` (≥3 `- [ ]`) → `## Try this at your practicum
  school` → `## Summative task` → `## Further reading` (≥1 line).
- **Figures** are authored as inline `{/* FIGURE[fig-U<n>-<seq>]: <prompt>; alt: <alt> */}`
  comments, one per topic, tracked in `specs/content/<course>/figures/unit-NN.md`.
  `npm run check:figures` enforces carrier ↔ manifest consistency; legacy units are skipped.

### Rendering figures

[`specs/009-figure-rendering/`](specs/009-figure-rendering/) turns those prompt-markers into
committed, accessible, lazy-loaded images that render in both locales.

- The **`.claude/skills/generate-figures/`** skill handles classification and SVG schematics,
  while Codex handles generated raster illustrations under ADR-0024: classify each marker →
  `diagram` (hand-authored self-contained SVG, `<title>`/`role="img"`, a
  `prefers-color-scheme` block, ≤ 20 KB) or `illustration` (Claude prepares the prompt-only
  handoff; Codex generates, inspects and optimises the raster to WebP ≤ 150 KB) → **replace** the
  comment with `<Figure id=… src=… alt=… />`
  → mirror into the Urdu topic file with a translated-label `<figId>.ur.svg` → move the manifest
  row `prompt-only → generated → placed`.
- `<Figure>` (`src/components/Figure.tsx`, registered globally) renders
  `<figure><img loading="lazy" decoding="async"></figure>`; `src` is a root-absolute
  `/img/figures/<course>/unit-NN/<figId>.<ext>` into `static/`. Styled by the `.figure` block in
  `src/css/custom.css` (light/dark, `break-inside: avoid` in `@media print`).
- `npm run optimize:figure -- [--svg] <in> <out>` (`scripts/optimize-figure.mjs`, offline,
  `sharp` devDep) resizes + WebP-encodes a raster, or strips SVG whitespace; hard-fails over
  budget.
- The manifest becomes v2 - `| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`
  (contract: [`figure-manifest-v2.md`](specs/009-figure-rendering/contracts/figure-manifest-v2.md)).
  `check:figures` keeps the exact Spec 008 code path for `prompt-only` and legacy units; the new
  checks (carrier is a `<Figure>`, `Src` asset exists, `Kind` enum, UR `<Figure>` + `.ur.svg`)
  apply only from `generated`/`placed`.
- **Answers policy:** the prose patterns *answer key / marking scheme / correct answer* are
  permitted **only** inside the single, final `## Answers and marking guidance` section of
  `unit-assessment.mdx` / `course-review.mdx`. The four front-matter answer-key keys are
  forbidden everywhere. `npm run check:no-answer-keys` implements the bounded exception; the
  RLS-protected Spec 003 LMS quiz store is separate and stays `verified_teacher`-gated.
- Per unit: `coverage/unit-NN.md` is v2 (`File` ∈ the new-shape set; every `topic-NN.mdx`
  referenced; coverage agrees with the `### Topic list` on where each sub-topic is taught).
- `style-guide.md` gains `## Unit structure standard`, `## Answers and marking guidance policy`
  and `## Figure markers and manifests` sections (`version: "3.0"`; bumped to `"3.1"` when
  Spec 009 rewrote the figure section for the rendering pass).
- The `.claude/skills/author-unit/` skill authors a whole unit to this standard and emits the
  coverage / sources / figures artefacts.

## Admin tooling

- **Curriculum-owner console** (`/app/admin/overview`, admin-only): content/figure status
  (reused from `npm run check:content-status`, never re-derived), reader-feedback counts
  with inline triage, the self-assessment aggregate, and platform-wide progress - plus a
  catalog-edit form that only ever produces a downloadable `courses.json`, never a database
  write. The full triage queue and passage-anchored feedback context live at
  `/app/admin/feedback-queue`. See `specs/010-curriculum-owner-console/quickstart.md`.

## Contribution flow

1. Branch from `main` (`NNN-feature-name`, matching the `specs/` directory it implements).
2. Follow the Spec-Driven Development workflow: spec → plan → tasks → implementation (see
   `.specify/memory/constitution.md` Article IV).
3. Open a PR; CI must pass (content validation, pipeline gate, depth gate, figure gate,
   answer-key scan, unit tests, RLS tests, e2e, Lighthouse budget - see
   `.github/workflows/ci.yml`).
4. Reference the relevant `specs/NNN-*/` directory and, for architecturally significant
   decisions, the matching `history/adr/` entry.
