# Tasks: Media Studio

**Input**: Design documents from `specs/030-media-studio/` (spec.md, plan.md; ADR-0037; D-2026-0094)
**Prerequisites**: plan.md (required), spec.md (user stories)

**Tests**: Included. FR-019 and SC-007 require each phase to leave existing tests green, and FR-018
requires a guard that no content gate depends on the new shared core.

**Organization**: Tasks are grouped by user story. Paths are repository-relative. Heavy jobs
(`vitest`, `npm run build`, ffmpeg, whisper) always run through `scripts/heavy.sh`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on an unfinished task)
- **[Story]**: US1-US6 from spec.md

---

## Phase 1: Setup

**Purpose**: create the shared-core skeleton and its isolation guard before any code moves.

- [x] T001 Create the folders `scripts/media/`, `scripts/media/producers/`, `specs/studio/recipes/` (each with a one-line README.md stating its purpose and the FR-018 rule that no content gate may import `scripts/media/`)
- [x] T002 [P] Write the isolation guard `tests/unit/media-isolation.test.mjs` (vitest, so CI runs it through `npm test` without a new gate): walk the static import closure of `scripts/lib/gates.mjs` and of every script it lists in `CONTENT_GATES` and `FULL_GATES`, plus `scripts/review-evidence.mjs` and `scripts/lib/review-evidence.mjs`, and fail if any resolved path is under `scripts/media/`
- [x] T003 [P] Add `"test:media": "vitest run tests/unit/media-"` to `package.json`. Media tests live in `tests/unit/media-*.test.mjs` so CI runs them through `npm test`; adding a CI step would need a `gates.mjs` edit, and `gates.mjs` is a review-evidence input

---

## Phase 2: Foundational (blocking)

**Purpose**: the shared job model, state vocabulary and ledger engine that every story uses. No
behaviour change for existing tools.

- [ ] T004 Write the job schema `specs/studio/media-job.schema.json` (JSON Schema 2020-12): `key`, `kind` (enum: `video.teaser`, `audio.brief`, `audio.deeper`, `video.overview`, `doc.poster`, `doc.mindmap`, `doc.brief`, `doc.studyguide`, `doc.slides`, `image.schematic`, `image.illustration`), `scope` {course, unit?, topic?, locale}, `recipe` {name, version}, `producers` (ordered list), `state`, `gates` (QG0-QG3, script, owner; each {verdict, by, date, note}), `takes` (shot/part, take, producer, model, credits, source enum generated|recovered|manual|shared|derived, file, qa), `outputs`, `notes`
- [ ] T005 Implement `scripts/media/states.mjs`: the shared vocabulary in order (`planned, scripted, approved, generating, generated, checked, assembled, uploaded-private, owner-approved, public, placed`), a per-kind `PATH` map listing which states each kind uses, a per-state `REQUIRES` map of evidence fields and gate verdicts, and `nextState(kind, state)`
- [ ] T006 Implement `scripts/media/ledger.mjs`: `load(path)`, `save(path, ledger)` (atomic write via temp file + rename, and an advisory `flock`-style lock file so two writers cannot lose updates), `advance(ledger, key, to, fields)` enforcing `states.mjs`, `recordTake(...)` with a sha256 duplicate check, and `uploadsOn(ledgers, day)` with the daily upload cap moved from `scripts/notebook-studio/media-ledger.mjs`
- [ ] T007 [P] Implement `scripts/media/brand.mjs` with `BRAND`, `SITE`, `CHANNEL`, `LONG_DASH` and `clean()` copied verbatim from `scripts/notebook-studio/teaser.mjs` and `scripts/notebook-studio/media-ledger.mjs` (one source of truth; both files re-export from it in US6)
- [ ] T008 Implement `scripts/media/legacy.mjs`: read-only mappers from the teaser ledger states (`planned … public`) and the Notebook Studio ledger and manifest states to the shared vocabulary, without rewriting the source files (FR-003)
- [ ] T009 [P] Write `tests/unit/media-states.test.mjs` and `tests/unit/media-ledger.test.mjs`: legal and illegal transitions per kind, evidence enforcement, duplicate sha256 refusal, concurrent `save` from two processes keeps both updates, upload cap
- [ ] T010 [P] Write `tests/unit/media-legacy.test.mjs`: load the real `specs/studio/teasers/media-teasers.json` and one real `specs/studio/<course>/unit-NN.json` from the repo and assert every item maps to a shared state with no data loss

**Checkpoint**: shared core exists, nothing imports it yet, `npm run test:media` and `npm run test:crew` pass.

---

## Phase 3: User Story 6 - Existing work keeps working (P1)

**Goal**: the existing teaser, Notebook Studio and figure tools run on the shared core with no change in behaviour.

**Independent test**: after this phase the existing suites pass unchanged, existing ledgers load unchanged, and `tests/unit/media-isolation.test.mjs` passes.

- [ ] T011 [US6] Make `scripts/notebook-studio/teaser.mjs` re-export `BRAND`, `SITE`, `CHANNEL`, `LONG_DASH`, `clean` from `scripts/media/brand.mjs` and route `saveLedger` through `scripts/media/ledger.mjs` `save()` (locking) while keeping `advanceTeaser` and the CLI output identical
- [ ] T012 [US6] Make `scripts/notebook-studio/media-ledger.mjs` re-export the brand constants and use `scripts/media/ledger.mjs` for load/save and the upload cap, keeping its CLI and `allLedgers` output identical
- [ ] T013 [US6] Move `scripts/lib/image-producers.mjs` and `scripts/lib/image-quota.mjs` to `scripts/media/producers/image.mjs` and `scripts/media/producers/quota.mjs`; leave the old paths as one-line re-exports so `scripts/generate-illustration.mjs` (the single image entry point, ADR-0029 point 4) and `tests/crew/image-producers.test.mjs` work unchanged
- [ ] T014 [US6] Run `scripts/heavy.sh npx vitest run tests/unit/notebook-studio*.test.mjs`, `npm run test:crew`, `npm run test:media`, `node scripts/check-docs-sync.mjs` and `node scripts/check-studio-manifest.mjs` (if present) and record the results in the phase PHR; fix only regressions this feature caused
- [ ] T015 [US6] Confirm no accepted review became stale: run the review-evidence binding check used by CI (see `scripts/lib/review-evidence.mjs` bound-file list) against `origin/main` and this branch and record that the bound set is unchanged

**Checkpoint**: Phase 2 of the plan is complete; the move can stop here (FR-019).

---

## Phase 4: User Story 2 - Energetic teasers from a versioned recipe (P1)

**Goal**: teaser prompts, presenter and pacing come from a versioned recipe; every teaser records its recipe version.

**Independent test**: a two-shot pilot is generated from recipe v2; the assembled Short is under 30 s and whisper still recognises every narrated word at 1.25×.

- [ ] T016 [P] [US2] Write `specs/studio/recipes/teaser@1.json` describing the batch-1/2 style (voice-over only, pace 1.12) and `specs/studio/recipes/teaser@2.json` for recipe v2: presenter shots 1 and 5 (presenter description, optional Flow character `entity_id` and voice preset), action shots 2-4 with a required camera move, prompt head and tail (no "9:16" wording, explicit "no camera interface or viewfinder marks"), `word_budget_ur: 18`, `speed: 1.25`, `max_seconds: 30`, model `veo_lite` with no duration argument
- [ ] T017 [P] [US2] Write `specs/studio/recipe.schema.json` and a loader `scripts/media/recipes.mjs` (`loadRecipe(name, version)`, `buildPrompt(recipe, script, shot)`), porting the prompt builder from the batch-3 driver (presenter speaks on camera in shots 1 and 5; unseen woman narrator over action in shots 2-4)
- [ ] T018 [US2] Extend `specs/studio/teaser-script.schema.json` with an optional `recipe` {name, version} field and make `checkScript` in `scripts/notebook-studio/teaser.mjs` enforce the recipe's word budget and, for v2, that shots 2-4 name a camera move (QG0); a script without `recipe` is treated as `teaser@1`
- [ ] T019 [US2] Make `scripts/notebook-studio/assemble-teaser.mjs` take its speed from the script's recipe when `--speed` is not given, and fail QG1 when the encoded Short exceeds the recipe's `max_seconds` (warn only for `teaser@1`)
- [ ] T020 [US2] Backfill `recipe` into the batch-3 scripts `specs/studio/teasers/{gqur-300,efmp-305,geng-301,gpks-402,gqur-301,gsos-301}.json` as `teaser@2` and into all earlier scripts as `teaser@1` (except `efmp-302`, whose public cut F_anSjHwKss is v2; record that in its ledger notes); re-run QG0 on all
- [ ] T021 [P] [US2] Tests in `tests/unit/notebook-studio-teaser.test.mjs`: recipe word budget, camera-move check, speed taken from recipe, over-length fail for v2

**Checkpoint**: recipe v2 is the default for new teasers; earlier teasers keep `teaser@1`.

---

## Phase 5: User Story 4 - Producers fall back and recover without lost credits (P2)

**Goal**: video producers share the image producer contract; finished-but-unreported clips are recovered, never paid twice.

**Independent test**: simulated quota, offline and finished-unreported cases each take the next route, record the reason, and no second paid generation happens for the same shot.

- [ ] T022 [US4] Generalise the producer contract in `scripts/media/producers/index.mjs`: `produce(job, part) -> { status: 'ok'|'quota'|'unavailable'|'failed', file?, resetAt?, reason, credits, mediaId? }`, a per-medium registry (image: agy, gflow nano, codex; clip: gflow.video, manual.flow; overview: nlm; schematic: codex, claude) and per-producer quota records in `~/.cache/mega-book/media-quota.json` (keep the image file path working)
- [ ] T023 [US4] Implement `scripts/media/producers/gflow-video.mjs` from the batch-3 driver: Streamable HTTP MCP over `node:http` with `agent: false` and `connection: close`, a 15-minute request timeout mapped to `unavailable`, a liveness probe of both tunnel ports before each call, one Flow project per teaser (persisted in `~/.cache/mega-book/gflow-projects.json`), `veo_lite` without `duration`, file fetched over 18801
- [ ] T024 [US4] Implement recovery in `scripts/media/producers/gflow-video.mjs`: before any retake of a shot, compare the Flow credit balance and the PC download folder listing against the ledger; adopt an unreferenced clip (by `flow_media_id`, or by newest unclaimed file in the teaser's project) as the shot's take with `source: 'recovered'`; refuse a retake while an unexplained charge exists (FR-006)
- [ ] T025 [P] [US4] Implement `scripts/media/producers/manual-flow.mjs`: emit the copy-button prompt page (`scripts/media/prompt-page.mjs`, ported from the batch-2 scratchpad builder) and ingest files from the download folder; split joined clips at speech pauses with ffmpeg `silencedetect` (nearest pause to each 8 s boundary, within about 1 s) and record each segment with `source: 'manual'`
- [ ] T026 [P] [US4] Implement `scripts/media/producers/nlm.mjs` wrapping the existing studio-media generate and download steps; expired cookies return `unavailable`, not `failed`
- [ ] T027 [P] [US4] Implement `scripts/media/qg2.mjs`: local whisper turbo (`~/.local/bin/whisper --model turbo --language ur`) transcript, a normalised word-match score against the approved line (Latin-script English words compared by transliteration-insensitive matching), a 3-frame strip per take for the reviewer, and verdict suggestion pass / pass-with-notes / fail
- [ ] T028 [P] [US4] Tests in `tests/unit/media-producers.test.mjs` with stub MCP and file servers: quota hold and fallback order, offline skip without spending an attempt, finished-unreported recovery with no second generate call, socket reset and timeout mapped to `unavailable`

**Checkpoint**: one live gflow shot returns its clip with no owner download; one manual round trip works.

---

## Phase 6: User Story 1 - The crew drafts a course teaser and the owner approves it (P1)

**Goal**: the crew drafts, generates, checks, assembles and uploads private; the owner approves scripts and publishes.

**Independent test**: for one course without a teaser the crew stops at "awaiting script approval" with zero credits spent; after approval it ends at "awaiting spot-check" with a private Short.

- [ ] T029 [US1] Add planner stages in `scripts/crew/planner.mjs`: `teaser_script` (course has an overview page and no teaser ledger item), `teaser_clips` (item `approved` and a clip producer is available), `media_assemble` (all shots have passing takes) and `audio_overview`; keep one audio/video job in flight, mirroring the `illustrate` slot logic (FR-016)
- [ ] T030 [US1] Write the stage briefs in `scripts/crew/brief.mjs`: `teaser_script` drafts with `scripts/media/recipes.mjs`, runs QG0 and stops at `scripted` (never spends credits); `teaser_clips` runs `gflow-video` then QG1/QG2; `media_assemble` assembles under `scripts/heavy.sh`, runs encoded QG1, uploads private with the AI-disclosure flag, thumbnail and playlist, runs QG3
- [ ] T031 [US1] Enforce FR-012 and FR-013 in code: `teaser_clips` refuses unless `gates.script.verdict === 'approve'` by the owner and the script sha256 still matches the approved one (a changed script returns the item to `scripted`); no crew code path may call `update_video` with `privacy_status: public`
- [ ] T032 [US1] Add owner commands to `crew-cmd` (in `scripts/crew/crew.mjs`): `approve-script <key>`, `publish <key>`, `reject <key> <note>`; `publish` sets public through the youtube-uploader route and records `owner-approved` then `public`
- [ ] T033 [US1] Hold and requeue: when no clip producer is available, hold `teaser_clips` without spending an attempt; on `quota`, requeue with the producer's reset time (reuse `imageQuotaRequeue` / `launchQueued` patterns in `scripts/crew/crew.mjs`)
- [ ] T034 [P] [US1] Tests in `tests/crew/media-stages.test.mjs`: dry run queues `teaser_script` and stops at `scripted`; no generate call before approval; changed script voids approval; crew never publishes

**Checkpoint**: Phase 4 of the plan is complete; SC-001 and SC-002 hold in a dry run.

---

## Phase 7: User Story 3 - One place to see and steer all media (P2)

**Goal**: one status view of every media job and every pending owner action.

**Independent test**: with jobs of at least four kinds in progress, one report lists them all with a shared state name and groups pending owner actions.

- [ ] T035 [US3] Implement `scripts/media/status.mjs`: gather the teaser ledger, Notebook Studio ledgers and manifests, and figure manifests through `scripts/media/legacy.mjs`; print every job with kind, scope, shared state, producer and next owner action; print producer availability and reset times from the quota file; `--json` for machines
- [ ] T036 [US3] Add an owner-action section to the crew `BOARD.md` writer in `scripts/crew/crew.mjs` from `scripts/media/status.mjs` (scripts to approve, Shorts to spot-check with QG2 notes, items to publish)
- [ ] T037 [P] [US3] Tests in `tests/unit/media-status.test.mjs` using fixture ledgers of four kinds

---

## Phase 8: User Story 5 - Public teasers on the site (P3)

**Goal**: public teasers play on course overview pages and behind a play button on course cards.

**Independent test**: after a build, a course with a public teaser shows a player on its overview page and a play button on its card; a course with a private teaser shows neither.

- [ ] T038 [US5] Extend `scripts/build-studio-index.mjs` to add `teasers: { <COURSE-CODE>: { youtube_id, title, locale } }` to `static/studio-index.json`, only for ledger items in state `public` (never `uploaded-private` or later private states)
- [ ] T039 [P] [US5] Create `src/components/Studio/TeaserPlayer.tsx` (+ `TeaserPlayer.module.css`): a 9:16 frame that loads `youtubeEmbed()` from `src/lib/studioMedia.ts` (youtube-nocookie) only after a tap, with a poster image from `i.ytimg.com`, accessible button label in both locales, and no layout shift
- [ ] T040 [US5] Render `TeaserPlayer` on course overview pages in `src/theme/DocItem/Content.tsx` where `isCourseOverview` is true, reading the course's teaser from the studio index; serve the Urdu teaser on both locales (D-2026-0083)
- [ ] T041 [US5] Add a "▶ Teaser" button to course cards in `src/components/CourseCatalog/index.tsx` that opens `TeaserPlayer` in a dialog (focus trap, Escape closes) only for courses with a public teaser
- [ ] T042 [P] [US5] Tests: `tests/unit/studio-index-teasers.test.mjs` (private items excluded) and a Playwright check in `tests/browser/` that the overview player and card button appear for a public teaser and the iframe is absent until tapped
- [ ] T043 [US5] Run `scripts/heavy.sh npm run build`, check one overview page and one card in a browser, then stop any server started

---

## Phase 9: Polish & cross-cutting

- [ ] T044 Write the merged skill `.claude/skills/media-studio/SKILL.md` (recipes, producers, checks, owner gates, social cross-posting, gflow route and its known failure modes) and reduce `.claude/skills/studio-teaser/SKILL.md`, `.claude/skills/studio-media/SKILL.md` and `.claude/skills/generate-figures/SKILL.md` to their kind-specific steps plus a pointer; fix the stale "Codex handoff" text in `generate-figures`
- [ ] T045 [P] Update `ops/crew/README.md` and the AGENTS.md "Visuals" and "Gemini Notebook Studio" sections to point to Media Studio and ADR-0037, in one place each
- [ ] T046 [P] Make `scripts/notebook-studio/social-post.mjs` record cross-posts through `scripts/media/ledger.mjs` and add `--draft` documentation (Facebook draft reels; TikTok inbox; Instagram has no draft API) to the merged skill
- [ ] T047 Run the full verification set from plan.md (test:media, test:crew, notebook-studio vitest, check-docs-sync, isolation guard, review-evidence bound-set comparison) and record results in the closing PHR

---

## Dependencies & execution order

- **Phase 1 → Phase 2** block everything.
- **US6 (Phase 3)** must finish before any story changes behaviour; it proves FR-018/FR-019.
- **US2 (Phase 4)** needs Phase 2 only; it can run in parallel with US4.
- **US4 (Phase 5)** needs Phase 2 and T013 (moved producers).
- **US1 (Phase 6)** needs US2 (recipes) and US4 (producers, recovery).
- **US3 (Phase 7)** needs Phase 2 and T008; it can start after Phase 3.
- **US5 (Phase 8)** needs only the ledger `public` state; it can run in parallel with US1-US4.
- **Polish** last.

## Parallel examples

- Phase 2: T007, T009 and T010 together after T005/T006.
- US2: T016 and T017 together, then T018-T020, with T021 alongside.
- US4: T025, T026, T027 and T028 together once T022/T023 exist.
- US5: T039 and T042 alongside T038.

## Implementation strategy

1. **MVP**: Phases 1-3 (shared core + US6). Merge as one PR; nothing changes for users.
2. **Increment 2**: US2 + US4 (recipes, producers, recovery). Validate with one live Lite shot and one manual round trip.
3. **Increment 3**: US1 (crew drafting with owner gates). Dry run first, then one real course.
4. **Increment 4**: US3 and US5 (status view, site embed). US5 can ship earlier if the owner wants teasers on the site sooner.
5. **Polish**: skill merge and docs.

Each increment is its own PR with its PHR, and each leaves existing tools working (FR-019).
