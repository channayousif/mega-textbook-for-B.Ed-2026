---
name: topic-harvester
description: Build or refresh queue/topics.json from the Mega Textbook Docusaurus source (textbook + licence track, Urdu locale). Use for /video-harvest, picking the next topic, or scoring how suitable a page is for a 1-minute short.
---

# Topic harvester

## Where content lives (verified 2026-10-26 against the repo; see specs/000-discovery/discovery.md)
- Never re-derive content roots. Import `TRACKS`, `walkCourses`/`walkUnits` from the parent repo's
  `scripts/lib/content-roots.mjs` (ADR-0020). Two tracks today:
  - `pre-service` (B.Ed): `docs/semester-N/<course>/unit-NN/`, default docs plugin,
    routeBasePath `/`, Urdu mirror `i18n/ur/docusaurus-plugin-content-docs/current/semester-N/...`.
  - `licence`: `licence/<course>/unit-NN/`, plugin id `licence`, routeBasePath `/licence`,
    Urdu mirror `i18n/ur/docusaurus-plugin-content-docs-licence/current/...`.
- Units are MDX, usually per-topic: `index.mdx`, `topic-NN.mdx`, `unit-assessment.mdx`, optional
  `unit-teacher-notes.mdx`. Strip `import` lines and JSX (`<Figure>`, `<Glossary>`,
  `<TranslationStatusBadge>`, admonitions) before reading prose. Never harvest from
  `unit-assessment.mdx` answers or teacher notes.
- Route = `https://textbook.com.pk` + `/ur` (Urdu locale) + routeBasePath + path without extension;
  `index.mdx` maps to the folder route; a `slug` front-matter field overrides. Confirm each
  `url_ur` resolves in the built site (`build/ur/...`) before it is used in a CTA (VS-004 PI-05).
- Urdu completeness: the Urdu file's `translation_status` front matter (`draft`, `reviewed`, ...)
  and the presence of the mirror file.

## Publication tier filter (mandatory)
Read `static/content-status.json` (generate it with `npm run build:content-status` at the parent
root if missing; it is git-ignored). Each authored unit has `publication`:
`certified` or `provisional` = eligible; `gated` = listed but flagged `gated`, never scripted
without owner OK; `unpublished` = excluded. Unknown tier = treat as `gated`. A short must never
send viewers to, or amplify, a page the site itself does not publish.

## Procedure
1. Run `npm run harvest` (scripts/harvest.ts). It walks both tracks via `content-roots.mjs`, pairs each English file with its Urdu mirror, reads front matter + headings, applies the tier filter.
2. A page becomes **one topic**; a page with ≥3 H2 sections may yield candidate ideas per H2.
3. Score shortability 1–5:
   +1 single clear concept in title · +1 lists/steps/comparisons present · +1 concrete classroom example ·
   +1 exam relevance (licence track or assessment/pedagogy core) · +1 Urdu mirror present with `translation_status` other than `untranslated`.
   0 if the Urdu page is missing - such topics are listed but flagged `needs_translation`.
4. For the top 40, read the Urdu page and write 1–3 `candidate_ideas` (each must be teachable in ≤150 words).
5. Never delete topics or overwrite `episodes` arrays; merge by `topic_id`.

## topic_id rule
`<section>-<path segments without numeric prefixes>` lower-kebab, max 60 chars, stable across runs.

## Repo paths
Recorded above (2026-10-26). Update this file, not a private note, if they change.
