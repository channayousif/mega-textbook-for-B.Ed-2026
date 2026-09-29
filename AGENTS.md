# Repository guidance

## Read first

- Read `CLAUDE.md` for the existing project workflow and prompt-history requirements.
- Read `.specify/memory/constitution.md` before making changes. It is the authoritative project constitution; older technology and policy summaries may be stale.
- Consult the relevant `specs/<feature>/spec.md`, `plan.md`, and `tasks.md`, plus applicable decisions in `history/adr/`.
- Keep changes focused on the requested task. Never commit secrets or expose `.env.local` values.

## Project map

B.Ed textbook and learning platform: Docusaurus 3, React 18, TypeScript 5.6, self-hosted Supabase. Node.js 22+; npm.

Two content tracks (Feature 015):
- `docs/` — B.Ed degree corpus, grouped by `semester-NN/course-code/unit-NN/`
- `licence/` — teaching-licence corpus, flat `course-code/unit-NN/` (no semesters)

Shared structure:
- `src/`: pages, components, theme overrides, libs
- `i18n/ur/`: Urdu translations (Docusaurus plugin dirs, named by plugin id)
- `catalog/`, `contracts/`: course metadata and content schemas
- `specs/content/`: style guide (v4.4, frozen), terminology.csv (frozen pair), per-course specs/trackers/coverage/sources/figures/concepts
- `static/img/figures/<course>/unit-NN/`: published figure assets (`.svg`, `.ur.svg`, `.webp`)
- `scripts/`: validation, generation, review tooling (`scripts/lib/gates.mjs` is the gate authority)
- `supabase/`: backend config and migrations
- `tests/`: unit, browser, rls, review

## Development and validation

Env loading: `.env.local` supplies `DOCUSAURUS_SUPABASE_URL`, `DOCUSAURUS_SUPABASE_ANON_KEY`; RLS tests additionally need `SUPABASE_SERVICE_ROLE_KEY`.

Commands:
- `npm start` / `npm run build` — run prestart hooks (`build-content-index`, `report-content-status`) automatically
- `npm test` — vitest unit tests (`npm test -- <file>` for a focused run)
- `npm run test:rls` — RLS tests; needs live Supabase + service-role key; config refuses to run unconfigured (no silent skip)
- `npm run test:e2e` — Playwright; needs build + browsers
- `npm run test:review` — review-evidence tests
- `npm run check:content` — fast content gates (skill fix loops)
- `npm run check:all` — full gate suite (CI superset)

Gate authority is `scripts/lib/gates.mjs` (`CONTENT_GATES` vs `FULL_GATES`). `check-docs-sync` asserts the CI workflow step list matches `FULL_GATES` both ways — a gate added here but forgotten in CI fails the build.

CI runs against a live shared Supabase instance with concurrency serialization (`shared-supabase` group, `queue: max`). Running `test:rls` locally while CI is in flight races on shared fixture rows.

Host limits: this host also serves production (2 CPU / 12 GB). Concurrent heavy jobs froze it on 2026-09-20 and 2026-09-24. Run build, start/serve, `npm ci`, vitest, Playwright/Chromium and `sharp` jobs one at a time, prefixed with `flock /tmp/mega-book-heavy.lock`; never from parallel sub-agents; kill any dev server when done. See CLAUDE.md "Host resource limits".

## Content work

Read `specs/content/style-guide.md` and the course's content spec and tracker before editing units. Authoring, translation, review and revision skills live in `.claude/skills/` (`author-unit`, `translate-unit`, `generate-figures`, `review-unit`, `revise-topic`, `evaluate-intake`).

Unit structure (Spec 008 per-topic standard): `unit-NN/index.mdx`, `topic-NN.mdx`, `unit-assessment.mdx` (+ optional `unit-teacher-notes.mdx`); optional course-level `course-review.mdx`. Legacy five-file units are exempt from per-topic rules.

Content in Git; quiz banks/answer keys stay backend-only (RLS-protected, `verified_teacher`-gated). Answer keys are forbidden everywhere except the bounded final `## Answers and marking guidance` section of an assessment page. Assessment banks: 10 MC + 10 restricted-response + 5 extended-response per unit.

Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in authored content — `check:no-em-dash`. En dash (U+2013) is permitted for numeric ranges.

Figure lifecycle: `prompt-only → generated → placed`. `Kind` archetypes: table, concept-map, flowchart, timeline, diagram, illustration. Manifest at `specs/content/<course>/figures/unit-NN.md`. Visual density: ≥2 figures per topic, ≥1 concept-map/flowchart/timeline per unit.

English-first publication is permitted with the required untranslated banner; Urdu parity is a corpus-completion requirement (not a per-unit gate). G3/G5 reviews require independent reviewers — see `CLAUDE.md` and ADR-0019. Do not self-certify or fabricate human initials.

## Work records

Record user requests via `.specify/templates/phr-template.prompt.md` (routing in `CLAUDE.md`). Suggest significant architectural decisions for an ADR; do not create an ADR without authorization.

## Visuals

ADR-0024 governs the Claude/Codex boundary. Claude owns prose, figure briefs, alt text, SVG schematics, and `prompt-only` manifest rows. Codex owns raster generation, WebP optimization, placement, and raster manifest transitions. Don't silently rewrite authored inputs during raster production.

## Antigravity (`agy`) review and approved implementation jobs

Antigravity may run in either of two explicitly separated modes. A **review run** remains an
independent reviewer on a different vendor, model family and quota pool from the authoring
session. `.agents/skills.json` exposes the repository skills from `.claude/skills/`.
An **implementation run** may work only on an admin-approved `agent_jobs` item, on its assigned
`agent/job-<uuid>` branch, and may open a draft pull request. It has no review authority over
material it authored. The host must use a separate fresh run for any subsequent review, with
no shared conversation or hidden state and with ADR-0019's independence requirements intact.

Scope for every **review run**:

- **Write only** under `specs/content/<course>/reviews/`. Never write to `docs/`, `licence/`,
  `i18n/`, `static/img/`, `catalog/`, `src/`, `supabase/`, or any `specs/content/**/tasks.md`.
- **Never** append a tracker row, mark a gate done, sign evidence, self-register in
  `specs/reviewers/registry.json`, merge, publish, or use human initials for an agent result.
- **Never author or revise content in a review run.** Implementation is a separate approved job.
- Record a real `reviewer_run_id` (the `agy` conversation ID). A placeholder such as `UNSUPPLIED`
  or `TODO` is rejected by `acceptProvisionalReport` and voids the review.
- Independence is the basis for trusting an unregistered reviewer: do not review material this
  session drafted, and do not run a cycle beyond ADR-0019's limit of two without owner
  authorisation recorded in `specs/decisions/log.md`.

In an **implementation run**, follow the approved job instructions and repository gates. Do
not change reviewer registry, signed evidence, tracker gate status, or publication state. Report
the diff and checks to the admin job queue and open a **draft** PR. The implementation run must
never certify or recommend approval for its own output. Raster illustration production remains
with Codex under ADR-0024. The `revise-topic` skill is available for bounded content-revision
jobs; the `review-unit` skill is for separate independent review runs only.

Invocation, verified 2026-09-20 against `agy` 1.2.7:

```bash
agy -p "<task>" --add-dir /home/a2ahs/mega_book_for_B.Ed \
    --model gemini-3.1-pro-high --effort high \
    --output-format json --print-timeout 55m
```

`--add-dir` is required and there is no `--cwd`: without it the workspace is unset, and neither
`AGENTS.md` nor `.agents/skills.json` is loaded. Headless runs cannot prompt for a tool
permission, so a denied command aborts the turn while still reporting `status: SUCCESS` with an
empty response; the cause is printed on stderr. `permissions.allow` does not fix this, because
project scope clears it ("no grants for project ... cleared project permissions"). Set
`toolPermission: "always-proceed"` in `~/.gemini/antigravity-cli/settings.json` instead, which
is narrower than `--dangerously-skip-permissions`. Do not pass `--disable-slash-commands`, which
switches off skill expansion. `--mode plan` cannot be used for review, because the reviewer must
write its report. See `history/adr/0019-*` and the Feature 014 evidence contract.

The change from reviewer-only policy is an ADR candidate recorded in
`specs/decisions/adr-proposals.md`; no ADR has been adopted yet.
