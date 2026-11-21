# scripts/media/producers

One module per producer behind one contract (`index.mjs`): a producer is `async (job, part, ctx)` and returns `{ status, file?, resetAt?, reason, credits?, mediaId?, source? }`.

| status | meaning | `produce()` does |
|---|---|---|
| `ok` | made; `file` is local | returns it |
| `quota` | out until `resetAt` | records it in `~/.cache/mega-book/media-quota.json`, tries the next producer |
| `unavailable` | offline, cookies expired, timeout | tries the next producer; no attempt spent |
| `failed` | this part failed | returns it (counts an attempt) |
| `held` | the owner must act (unexplained charge, manual step) | returns it; never falls back, because the next route could spend credits again |

Registry (fallback order): image `agy, gflow, codex` (throwing form in `image.mjs`, quota in `image-quota.json`, ADR-0029); clip `gflow.video, manual.flow`; overview `nlm`; schematic `codex, claude`.

- `gflow-video.mjs`: Veo over gflow's MCP on the owner's PC (tunnel 18800/18801). Fresh connection per request, 15-minute timeout, `veo_lite` with no `duration`, one Flow project per teaser (`~/.cache/mega-book/gflow-projects.json`). Every submission is journalled (`gflow-video-journal.json`); before any retake the producer recovers a finished clip (by media id, or the unclaimed file that landed in Downloads\gflow-cli) and holds while a Flow charge is unexplained (FR-006). `node scripts/media/producers/gflow-video.mjs journal | clear <key> <part>`.
- `manual-flow.mjs`: writes a copy-button prompt page and holds; ingests `<key>_shot-<n>.mp4` from Downloads\gflow-cli or `~/studio-media/inbox`; `splitJoined` cuts a joined clip at the pause nearest each 8 s boundary.
- `nlm.mjs`: NotebookLM audio/video through the `nlm` CLI; resumable by artifact id; expired cookies are `unavailable`.
- QG2 speech check: `scripts/media/qg2.mjs` (whisper turbo, word match across Urdu and Latin spellings, 3-frame strip, suggested verdict).

No content gate, nothing a content gate imports, and nothing the review-evidence binding walks may import scripts/media/ (FR-018, ADR-0037); tests/unit/media-isolation.test.mjs enforces it (run by CI through npm test).
