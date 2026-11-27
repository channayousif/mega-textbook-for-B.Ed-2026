# Plan: Feature 036 - second-account media producers

## agy2 (done in the first PR)

| Where | Change |
|---|---|
| `scripts/media/producers/image.mjs` | `agyProducerFor({ name, bin, home })`; `agy2Producer` runs `ops/crew/bin/agy2` and reads `~/.agy2/.gemini/antigravity-cli/log` for its quota; UNAUTHENTICATED is `UnavailableError` |
| `scripts/media/producers/quota.mjs` | `PRODUCERS` and `FALLBACK_HOURS` include `agy2` |
| `scripts/media/producers/index.mjs` | `REGISTRY.image` includes `agy2` |
| `scripts/media/pacing.mjs` | channel `agy2.image` (same limits as `agy.image`) |
| `scripts/crew/resources.mjs` | lane `agy2` in `LANES`, `IMAGE_LANES`, `LANE_PRODUCER`, `laneChannels` |
| `scripts/crew/planner.mjs` | `MAX_ILLUSTRATE` 4 |
| `scripts/crew/workers.mjs` | `imageQuotaProducer` recognises agy2 |

## gflow2 (next)

- davinci: `gflow2-serve.service` (`--profile <second>`, port 18810) and `gflow2-files.service` (18811,
  its own `...\gflow-cli` downloads folder); media-tunnel forwards both.
- Producers take `{ mcpUrl, filesUrl, profile, projectsFile, journalFile }` instead of globals, so each
  account keeps its own Flow project cache and never-pay-twice journal.
- Channels `gflow2.image`, `gflow2.video`; lane `flow2`; `teaser_clips` may use `flow` or `flow2` for
  different teasers.

## nlm2 (next)

- `nlm login --profile second`; davinci refresh route on a second workspace-chrome CDP port.
- `studio_media` brief takes the profile from its lane; channel `nlm2.studio`; lane `notebook2`.
