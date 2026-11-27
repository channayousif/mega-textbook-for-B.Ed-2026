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

## As built (2026-11-28)

- One `gflow serve` on davinci drives both accounts per call (verified: `gflow_auth_status` and
  `gflow_get_credits` for `a2ahs-beta`), so gflow2 needed no second server, ports or tunnel.
- gflow2 images: `gflow2Producer` (profile `a2ahs-beta`, `gflow-project2.json`), channel `gflow2.image`,
  lane `flow2`. gflow2 clips: `gflow2Video` (own projects file and journal, channel `gflow2.video`) is
  the next producer in `REGISTRY.clip`; clips stay on one `flow` lane because teaser jobs share one
  ledger, so the two accounts never adopt each other's clips from the shared downloads folder.
- nlm2: lane `notebook2` passes nlm profile `second` and channel `nlm2.studio` into the studio brief;
  `STUDIO_IN_PROGRESS` = 2 lets two units run at once. `workspace-chrome-2` user unit on davinci.
