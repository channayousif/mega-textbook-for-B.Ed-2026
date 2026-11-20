# Implementation Plan: Media Studio

**Branch**: `030-media-studio` | **Date**: 2026-11-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/030-media-studio/spec.md`

## Summary

Three pipelines make media today: course teasers (`studio-teaser`, `scripts/notebook-studio/teaser.mjs`,
Veo via gflow), Notebook Studio (`studio-media`, `media-ledger.mjs`, NotebookLM via `nlm`) and crew
figures (`generate-illustration.mjs` with `scripts/lib/image-producers.mjs`). They duplicate the ledger
engine (`advance` vs `advanceTeaser`), brand constants and status names, and only images have producer
fallback and quota handling. This plan merges them into one Media Studio: a shared job model and
ledger engine, one producer registry for image, audio and video, versioned recipes, shared quality
gates, crew drafting with owner gates, and public teasers on the site. It runs in six phases; each
leaves the existing tools working (FR-019).

## Technical Context

**Language/Version**: Node.js 22 (ESM `.mjs` scripts), TypeScript 5.6 / React 18 for the site
**Primary Dependencies**: none new. ffmpeg, local whisper (`~/.local/bin/whisper`, turbo, `--language ur`),
gflow-cli MCP over the SSH tunnel (18800 MCP, 18801 files), `nlm`, youtube-uploader MCP, Docusaurus 3
**Storage**: JSON ledgers in git (`specs/studio/**`); media files outside git (`~/studio-media/`);
quota state in `~/.cache/mega-book/`
**Testing**: vitest (`tests/crew/`, notebook-studio tests), `check-studio-manifest`, `review-evidence`,
`check-docs-sync`; all heavy runs through `scripts/heavy.sh`
**Target Platform**: the 2-CPU OCI host (crew, assembly, checks); the owner's Windows PC (gflow)
**Project Type**: repository scripts plus site components
**Performance Goals**: teasers under 30 s; at most one A/V job at a time; at most two heavy jobs host-wide
**Constraints**: no credits before script approval; private uploads first; owner alone makes media
public; no media in git; no gate script may import `scripts/media/` (review-evidence binding,
`scripts/review-evidence.mjs:26`); figure manifests keep v2 and `unit-NN.` naming (ADR-0027)
**Scale/Scope**: ~18 course teasers, ~12 Notebook Studio kinds per unit, ~158 pending illustrations

## Constitution Check

- **Art. III (content quality)**: media is checked against approved scripts and topic text (QG2); no
  answer keys or quiz items in media. PASS.
- **Art. IV (spec-driven)**: spec, plan, ADR and decision entry precede code. PASS.
- **Art. V (architecture)**: smallest viable diff per phase; adapters keep old CLIs; no new dependency. PASS.
- **Art. VII (review gates)**: no gate imports the shared core, so no accepted review goes stale;
  publishing stays an owner act (VII.8). PASS.
- **Art. VIII (data and ethics)**: tokens stay outside git; AI-disclosure flag on every upload. PASS.
- **Host limits (AGENTS.md)**: ffmpeg and whisper run under `heavy.sh`; one A/V crew job at a time. PASS.

## Architecture

### Job model and ledger (FR-001 to FR-003)
- `scripts/media/ledger.mjs`: one engine (`load`, `save`, `advance` with a per-kind `REQUIRES` map,
  `recordTake`, sha256 duplicate check, upload-quota guard) and one JSON schema.
- One state vocabulary: planned, scripted, approved, generating, generated, qa-pass, assembled,
  uploaded-private, owner-approved, public, placed. Kinds skip steps they do not need.
- Kinds: `image.schematic`, `image.illustration`, `audio.brief`, `audio.deeper`, `video.overview`,
  `video.teaser`, `doc.poster`, `doc.mindmap`, `doc.brief`, `doc.studyguide`, `doc.slides`.
- `teaser.mjs` and `media-ledger.mjs` become thin adapters; existing ledgers load unchanged (old
  status names map to the shared vocabulary).

### Producer registry (FR-004 to FR-008)
- `scripts/media/producers/`: moved from `image-producers.mjs` and `image-quota.mjs`, with the medium
  and output type lifted out. Outcomes: success, quota (with reset), unavailable, failed.
- Image: agy, gflow nano, Codex (ADR-0036 order). Video clip: `gflow.video`, `manual.flow`.
  Audio/video overview: `nlm`. SVG: Codex, Claude.
- `gflow.video`: `wait:false` submit, per-teaser project reuse (#656), recovery of finished but
  unreported clips by media id or by watching `Downloads\gflow-cli` over 18801, `r2v` with a
  presenter ingredient, voice preset recorded in the script.
- `manual.flow`: copy-button prompt page (`scripts/media/prompt-page.mjs`); picks clips up from the
  download folder and splits joined clips at speech pauses.
- `generate-illustration.mjs` stays the single image entry point (ADR-0029 point 4).

### Recipes and gates (FR-009 to FR-011)
- `specs/studio/recipes/<name>@<version>.json`; each job records the recipe id and version.
- Teaser recipe v2: presenter (Flow Character ingredient, preset voice) in shots 1 and 5, off-screen
  voice over action with a named camera move in shots 2-4, Urdu at most 18 words a shot, voice 1.25x.
- QG0 script check, QG1 `media-qa.mjs`, QG2 local whisper plus frame look (or topic comparison for
  docs), QG3 post-upload check. Owner gates: script approval, spot-check, public.

### Crew integration (FR-012 to FR-016)
- Planner stages `teaser_script` (stops at `scripted`), `teaser_clips` (only when `approved` and a
  producer answers), `media_assemble` (ffmpeg under `heavy.sh`), `audio_overview` (`nlm`).
- Same hold and requeue logic as `illustrate` (#629, #639); one A/V job at a time.
- BOARD.md lists owner actions: scripts to approve, private uploads to spot-check, items to publish.
  Publishing is an owner command via `crew-cmd`.

### Site (FR-017)
- Build-time media index (extends `static/studio-index.json`) lists only `public` teasers.
- `src/components/Studio/TeaserPlayer.tsx` (reuses `youtubeEmbed` from `src/lib/studioMedia.ts`,
  youtube-nocookie, lazy 9:16 iframe) on course overview pages (`src/theme/DocItem/Content.tsx`,
  `isCourseOverview`) and as a click-to-load button on cards (`src/components/CourseCatalog/index.tsx`).
  English pages fall back to the Urdu teaser (D-2026-0083).

## Phases

| Phase | Scope | Exit check |
|---|---|---|
| 1 | Spec, plan, ADR, decision entry | ADR accepted; decision logged |
| 2 | Shared core and adapters, no behaviour change | crew and notebook-studio tests pass unchanged; `review-evidence` no stale bindings; `check-docs-sync` |
| 3 | `gflow.video`, `manual.flow`, `nlm` producers; whisper QG2 | one gflow shot returns its clip with no owner download; manual round trip on one teaser |
| 4 | Crew stages and owner-gate queues | dry run stops at `scripted`; no credits before `approved`; quota hold and requeue |
| 5 | Site embed | `scripts/heavy.sh npm run build`; public teaser plays on overview and card; private never renders |
| 6 | One `media-studio` skill; pointers from `studio-teaser`, `studio-media`, `generate-figures`; AGENTS.md sections merged | docs sync passes |

Pilot: EFMP-302 v2 on recipe v2 (about 40 credits) after Phase 3; the owner confirms before a batch.

## Project Structure

### Documentation (this feature)

```text
specs/030-media-studio/
├── spec.md
├── plan.md
├── checklists/requirements.md
└── tasks.md            # /sp.tasks
```

### Source Code (repository root)

```text
scripts/media/
├── ledger.mjs          # shared engine and schema
├── brand.mjs           # BRAND, SITE, CHANNEL, clean, LONG_DASH
├── prompt-page.mjs     # manual.flow prompt page
└── producers/          # agy, gflow (image, video), codex, manual-flow, nlm; quota state
scripts/notebook-studio/ # teaser.mjs, media-ledger.mjs become adapters
scripts/generate-illustration.mjs  # unchanged entry point, imports moved producers
specs/studio/recipes/   # versioned recipes
src/components/Studio/TeaserPlayer.tsx
tests/media/            # engine, producer and recipe tests
```

**Structure Decision**: a new `scripts/media/` library outside the gate import closure; existing
entry points stay as adapters so nothing downstream changes in Phase 2.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Producers move out of `scripts/lib/` | audio and video need the same contract and quota handling | copying the producer code per medium repeats today's duplication |
| Crew may call gflow for video | owner ruling 2026-11-20: crew drafts, owner gates | owner-run only leaves teasers waiting on the owner for every step |
