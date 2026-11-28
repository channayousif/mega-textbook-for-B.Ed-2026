# Tasks: Feature 038 - Content Pack v2

## Stage 0: Plan and records
- [x] T001 Audit existing media systems; spec, PLAN-v2, plan and tasks
- [x] T002 Decision D-2026-0104 (pack model, international audience, new cast, admin page, provenance rules)
- [x] T003 Owner approves PLAN-v2 (2026-11-28); ADR-0040 adopted

## Stage 1: Data model
- [x] T004 Migration `0060_content_packs.sql`: tables, private upload bucket (50 MB, no video), admin RPCs; applied to live Supabase 2026-11-28 after the owner's "ok"
- [x] T005 RLS tests for both tables and the bucket (`tests/rls/content-packs.test.mjs` passes live)
- [x] T006 Manifest kinds `longform`, `short`, `infographic`, `deck_pdf` and new fields; schema tests
- [x] T007 Media kinds `video.longform`, `video.short`, `doc.infographic` in `states.mjs`; playlist map in `brand.mjs`

## Stage 2: Cast
- [x] T008 `specs/studio/characters/_style-guide.md` and four character folders (Noor, Sami, Lena, Zara); descriptions approved by the owner 2026-11-28
- [ ] T009 Character sheets with gflow Nano Banana; owner locks season 1; register in Flow (Flow image caps full on 2026-11-28 until 00:00 PKT)

## Stage 3: Flow kit
- [x] T010 Prompt formula, shot-list template, credit log, prompt library (`specs/studio/flow/`)

## Stage 4: Pack scripts
- [x] T011 `intake.mjs` (topic MDX and objectives to `topic.json`)
- [x] T012 `debrand.mjs` (ffmpeg scene and brightness detection, fallback, `cuts.json`, confirmed render; tested on 3 real overviews)
- [x] T013 `captions.mjs` (SRT and word timings from Workers AI whisper)
- [x] T014 `highlights.mjs` (rank `[SHORT-CANDIDATE]` blocks and transcript windows)
- [x] T015 `reframe.mjs` (stacked 9:16 layout, or centred crop)
- [x] T016 `metadata.mjs` (titles, chapters, tags, subtitles, captions, disclosure; draft, check, youtube payloads)
- [x] T017 `embed.mjs` (manifest rows validated against the schema; StudioPanel rendering of the new kinds is T022)
- [x] T018 Unit tests for T011-T017 (`tests/unit/media-pack-scripts.test.mjs`, 17 tests)

## Stage 5: Remotion templates
- [ ] T019 Confirm Remotion licence terms
- [ ] T020 `LongformFrame`, `ShortVertical`, `Opener`, `Closer`, `ChapterCard`, `InfographicFooter` with a `locale` prop. Owner ruling 2026-11-28: the small "Gemini Notebook" corner mark on NotebookLM slides stays untouched; the frame is laid out around it, never over or cropping it
- [ ] T021 Kaggle render job for pack compositions

## Stage 6: Admin page
- [ ] T022 `/app/admin/content-packs` list and 12 stage panels, uploads, checklists, cut and highlight confirmation; StudioPanel renders `longform`, `short`, `infographic`, `deck_pdf`
- [ ] T023 E2E test behind admin auth

## Stage 7: Prompts
- [x] T024 `specs/studio/prompts/pack/*` (angle, script, NotebookLM steering, Flow shots, metadata, translation) and the v2 audience section of `_common.md`

## Stage 8: Crew
- [ ] T025 `pack_*` stages in `scripts/crew/media.mjs`, owner gates kept, pacing report, Shorts schedule
- [ ] T026 `studio-pack` skill; update `media-studio`, mark `studio-teaser` superseded for new work

## Stage 9: Sample
- [ ] T027 One sample pack end to end, uploaded private, with a time, credit and manual-steps report
