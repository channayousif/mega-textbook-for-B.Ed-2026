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
- [ ] T008 `specs/studio/characters/_style-guide.md` and four character folders
- [ ] T009 Character sheets with gflow Nano Banana; owner locks season 1; register in Flow

## Stage 3: Flow kit
- [ ] T010 Prompt formula, shot-list template, credit log, prompt library

## Stage 4: Pack scripts
- [ ] T011 `intake.mjs` (topic MDX and objectives to `topic.json`)
- [ ] T012 `debrand-notebooklm.py` (scene and black-frame detection, fallback, `cuts.json`, confirmed render)
- [ ] T013 `transcribe-srt.mjs` (word-level SRT from the Workers AI route)
- [ ] T014 `find-highlights.mjs` (rank `[SHORT-CANDIDATE]` blocks and transcript windows)
- [ ] T015 `reframe-vertical.mjs` (stacked 9:16 layout)
- [ ] T016 `make-metadata.mjs` (titles, chapters, tags, subtitles, captions, disclosure)
- [ ] T017 `make-embed.mjs` (manifest rows through `place-media.mjs`)
- [ ] T018 Unit tests for T011-T017

## Stage 5: Remotion templates
- [ ] T019 Confirm Remotion licence terms
- [ ] T020 `LongformFrame`, `ShortVertical`, `Opener`, `Closer`, `ChapterCard`, `InfographicFooter` with a `locale` prop
- [ ] T021 Kaggle render job for pack compositions

## Stage 6: Admin page
- [ ] T022 `/app/admin/content-packs` list and 12 stage panels, uploads, checklists, cut and highlight confirmation
- [ ] T023 E2E test behind admin auth

## Stage 7: Prompts
- [ ] T024 `specs/studio/prompts/pack/*` and the v2 audience section of `_common.md`

## Stage 8: Crew
- [ ] T025 `pack_*` stages in `scripts/crew/media.mjs`, owner gates kept, pacing report, Shorts schedule
- [ ] T026 `studio-pack` skill; update `media-studio`, mark `studio-teaser` superseded for new work

## Stage 9: Sample
- [ ] T027 One sample pack end to end, uploaded private, with a time, credit and manual-steps report
