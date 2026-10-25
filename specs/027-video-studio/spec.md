# Feature Specification: Video Studio sub-project (Urdu shorts)

**Feature Branch**: `feature/video-studio`
**Created**: 2026-10-26
**Status**: Approved for integration (owner, 2026-10-26); implementation gated per phase
**Input**: Owner-supplied package `video-studio-sdd-ri` v1.5, evaluated 2026-10-25 and patched to v1.6
**Decision record**: ADR-0031 (parent), VS-ADR-0011 (Kaggle media runner)

## Why this is a thin spec
Constitution Art. VI.3 requires a new spec for video. The detailed requirements already live in the
sub-project and are the single editable source of truth; this file states the parent-level contract
and points to them. Do not copy requirements here.

| Detail | Source of truth |
|---|---|
| Pipeline (harvest, script, assets, align, render, publish pack) | `video-studio/specs/001-urdu-shorts-pipeline/` (VS-001) |
| Local Studio console | `video-studio/specs/002-studio-console/` (VS-002) |
| Urdu voice benchmark | `video-studio/specs/003-urdu-voice-benchmark/` (VS-003) |
| Production integrity (digests, owner-only approvals, publish gate) | `video-studio/specs/004-production-integrity/` (VS-004) |
| Principles | `video-studio/memory/constitution.md` v1.2 (subordinate to the parent constitution) |

## Parent-level requirements (binding on every VS feature)
- **FR-001** The parent site's build, deploy, `package.json`, lockfile and content gates are unchanged
  by anything under `video-studio/`.
- **FR-002** No media file (video, audio, image, stills, subtitle files), consent record or Kaggle
  credential is ever tracked in git. Checked by `scripts/check-no-media-in-video-studio.mjs` in CI.
- **FR-003** Content is read only through `scripts/lib/content-roots.mjs`; only published units
  (`certified`, `provisional` or `gated` in `static/content-status.json`; owner ruling 2026-10-26)
  may be scripted or linked in a CTA. `unpublished` units never are.
- **FR-004** Terminology comes from `specs/content/terminology.csv` and `glossary.json`.
- **FR-005** Heavy media work (render, alignment, audit, stills) runs on Kaggle or the owner's PC,
  never on the production host; any local heavy job uses `flock /tmp/mega-book-heavy.lock`.
- **FR-006** Approvals at the three gates are recorded only by owner action; agents never write them.
- **FR-007** 0 USD metered spend; free tiers and existing subscriptions only.
- **FR-008** Every acting prompt gets a PHR under `history/prompts/video-studio/`; zero em dashes in
  `video-studio/` (CI runs the em-dash gate with `--scan-dir video-studio`).

## Success criteria
- **SC-001** After installation, `npm run check:content` gives the same result as before.
- **SC-002** A full sample render round trip leaves `git status` free of media.
- **SC-003** VS-001 Checkpoint 0: a 10 s sample MP4 rendered on Kaggle with correct Nastaliq
  shaping in stills extracted from the encoded file.

## Out of scope
Live or interactive video on the site; automatic posting; paid APIs; English or Sindhi versions (v1).
