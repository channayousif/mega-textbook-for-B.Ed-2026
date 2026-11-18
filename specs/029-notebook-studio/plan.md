# Plan: Feature 029

Approved plan: `~/.claude/plans/new-feature-i-optimized-hoare.md` (round 2, after the owner's pilot review).

## Data flow
1. `scripts/notebook-studio/build-source-pack.mjs` turns a topic MDX (EN or UR) into clean Markdown (no JSX, figures as alt text, answers never included).
2. Owner-run generation with `nlm` in the pilot notebook, steered by `specs/studio/prompts/*.md` (versioned).
3. Review against the topic; findings logged in `specs/studio/<course>/unit-NN-topic-NN-review.md`.
4. `scripts/notebook-studio/ingest.mjs` writes cleaned text assets to `static/studio/<course>/unit-NN/topic-NN/` (reports via `postprocess-report.mjs`; mind map labels from `unit-NN-topic-NN-mindmap-labels.json`).
5. `specs/studio/<course>/unit-NN.json` records every artifact (schema `specs/studio/studio-manifest.schema.json`); only `placed` rows reach the site.
6. `scripts/build-studio-index.mjs` (prestart/prebuild) writes `static/studio-index.json` (gitignored); `src/components/Studio/StudioPanel.tsx`, mounted in `src/theme/DocItem/Content.tsx`, renders it.

## Enforcement
`scripts/check-studio-manifest.mjs` (also `npm run check:studio`) validates manifests and assets. It runs inside `npm test`
(`tests/unit/notebook-studio.test.mjs`) rather than as a new `CONTENT_GATES` entry, because editing `scripts/lib/gates.mjs`
re-opens about a hundred units' review evidence (owner ruling 2026-11-03).
