# Plan: 027 Video Studio sub-project

Architecture, stack and phases: `video-studio/specs/001-urdu-shorts-pipeline/plan.md` and
`video-studio/specs/002-studio-console/plan.md`. Parent decisions: ADR-0031. Compute: VS-ADR-0011.

## Constitution check
| Article | Status |
|---|---|
| IV (SDD order) | This spec + VS specs; implementation per phase checkpoint |
| V.1 content in Git | Read-only consumer; no content duplicated |
| V.6 cost control | 0 USD; Kaggle free tier and existing subscriptions |
| VI.3 video is Phase 3+ with a new spec | Satisfied by this spec and ADR-0031; wording amendment deferred because the constitution is a bound review input |
| Host limits (AGENTS.md) | Heavy media on Kaggle; flock for any local heavy job |

## Integration points in the parent repo
- `.gitignore` media block, `tsconfig.json` exclude, root `.claude/settings.json` deny rules
- `scripts/check-no-media-in-video-studio.mjs` + `npm run check:no-media`; CI steps for it and for
  the em-dash gate with `--scan-dir video-studio`
- `AGENTS.md` project-map pointer
- Not changed, on purpose: `scripts/lib/gates.mjs`, `scripts/check-no-em-dash.mjs`,
  `.specify/memory/constitution.md` (all bound review-evidence inputs)

## Rollback
Revert the feature commits. Before deleting `video-studio/`, back up owner-created files
(`episodes/`, `queue/`) and remember media lives in `$MEDIA_ROOT`, outside the repo.
