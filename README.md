# B.Ed (4-Year) Mega Textbook & Learning Platform

A bilingual (English + Urdu) digital textbook and learning platform for the B.Ed (4-Year)
programme, University of Sindh, Faculty of Education, Elsa Kazi Campus, Hyderabad. Built on
[Docusaurus](https://docusaurus.io/) v3 with a self-hosted [Supabase](https://supabase.com/)
backend for application state (auth, classes, grading, teacher/student dashboards).

Governance, requirements, and every architectural decision are recorded under [`.specify/`](.specify/),
[`specs/`](specs/), and [`history/adr/`](history/adr/) — see [`.specify/memory/constitution.md`](.specify/memory/constitution.md)
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
npm run check:no-answer-keys    # answer-key leak scan
```

CI (`.github/workflows/ci.yml`) runs all of the above on every push/PR.

## Content authoring pipeline

Adding or revising a unit follows the process defined in
[`specs/006-content-pipeline/`](specs/006-content-pipeline/): a fixed stage sequence (course
intake → unit spec → EN draft/review → UR translation/review → assets → publish), gated by:

- `specs/content/style-guide.md` — readability, register, localization, citation, and diagram
  rules; the maintained answer-key marker pattern list.
- `specs/content/terminology.csv` — the shared EN↔UR term bank every translator consults.
- `specs/content/<course-code>/content-spec.md` — the approved, per-course source of truth (must
  carry `status: approved` before any unit under it may be drafted or merged).
- `specs/content/<course-code>/tasks.md` — the per-course task tracker (one row per unit per
  stage) that CI checks before allowing a merge.

A required CI step, `npm run check:pipeline-gate`, blocks merging a unit's draft unless its
course's content-spec is approved, its tracker rows are marked done with reviewer initials, and
(for units touching Urdu) its declared key terms match the terminology bank. Quiz-bank and
answer-key content is never committed to this repository — it's staged in a git-ignored per-unit
worksheet under `specs/content/<course-code>/.staging/` and entered manually into the backend via
Supabase Studio. See [`specs/006-content-pipeline/quickstart.md`](specs/006-content-pipeline/quickstart.md)
for the full walkthrough.

## Content depth standard

[`specs/007-content-depth-standard/`](specs/007-content-depth-standard/) adds a **concept-coverage
depth standard** on top of the pipeline so a unit's depth is a checkable condition, not a matter
of reviewer stamina:

- `specs/content/style-guide.md` gains a `## Unit depth standard` section (frozen at
  `version: "2.0"`): every course-guide sub-topic on a unit's **enumerated checklist** gets its
  own named subsection; `index.mdx` must carry `## Common misconceptions` **and**
  `## Further reading`; the formative set is a numbered list of **≥ 5 items**; the unit's total
  `est_reading_minutes` must sit inside the content-spec's `**Depth budget**` band. Language
  register is unchanged — deeper *concepts*, not harder *words* (Constitution Art. III.1).
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
  Spec 001 validators — it replaces neither.

`references/depth-standard.md` inside the skill restates the same rules and **must be kept in
sync** with the `## Unit depth standard` section of `style-guide.md`; changing either requires
updating the other and bumping `style-guide.md`'s `version`.

## Contribution flow

1. Branch from `main` (`NNN-feature-name`, matching the `specs/` directory it implements).
2. Follow the Spec-Driven Development workflow: spec → plan → tasks → implementation (see
   `.specify/memory/constitution.md` Article IV).
3. Open a PR; CI must pass (content validation, pipeline gate, depth gate, answer-key scan, unit
   tests, RLS tests, e2e, Lighthouse budget — see `.github/workflows/ci.yml`).
4. Reference the relevant `specs/NNN-*/` directory and, for architecturally significant
   decisions, the matching `history/adr/` entry.
