# Studio server API (127.0.0.1:4310)

All JSON. Errors: `{ error: { code, message, hint? } }`. IDs validated against `^[0-9]{8}-[a-z0-9-]+$`.

## Board & topics
| Method | Path | Returns |
|---|---|---|
| GET | `/api/board` | `{ episodes: EpisodeSummary[], budget, nextTopics: Topic[] }` |
| GET | `/api/topics?section=&q=&unused=1` | `Topic[]` |
| GET | `/api/topics/:topicId/source` | `{ title_ur, markdown_ur, url_ur }` |
| POST | `/api/episodes` `{ topicId, idea? }` | `Episode` (status `scripting`) + optional job id |

## Episode
| Method | Path | Notes |
|---|---|---|
| GET | `/api/episodes/:id` | episode + script + reviews + assets + captions + stage locks |
| PUT | `/api/episodes/:id/script` | body = script.json; schema-validated; bumps version; resets approvals per 001 rules |
| POST | `/api/episodes/:id/gate` `{ gate: "script"\|"assets"\|"render", decision: "approve"\|"changes", note? }` + header `X-Owner-Token` | writes history `by: owner`; **403** without a valid owner token (see "Owner token") |
| GET | `/api/episodes/:id/stage/:stage` | `{ locked, lockReason?, instructions, items: StageItem[] }` from providers' `describe()` |

## Assets
| Method | Path | Notes |
|---|---|---|
| POST | `/api/episodes/:id/assets/:itemId` (multipart `file`) | manual provider `accept()`; returns normalised asset + checks |
| POST | `/api/episodes/:id/assets/:itemId/generate` | api provider `run()` as job; 409 if provider is manual |
| DELETE | `/api/episodes/:id/assets/:itemId` | removes current take |
| POST | `/api/episodes/:id/assets/:itemId/select` `{ take }` | choose take |
| GET | `/media/:id/*` | streams files from the episode folder (read-only, path-checked) |

## Captions
| PUT | `/api/episodes/:id/captions` | body = captions.json (nudged timings) |

## Jobs
| Method | Path | Notes |
|---|---|---|
| POST | `/api/jobs` `{ kind, episodeId? }` | kind ∈ harvest, draft_script, review_script, ingest_all, align, render, audit, review_render, publish_pack |
| GET | `/api/jobs/:jobId` | status, progress, result |
| GET | `/api/events` | SSE: `job.progress`, `job.log`, `job.done`, `fs.changed` |

## Brand & providers
| GET | `/api/brand` | parsed brand bible + cast asset URLs |
| GET | `/api/providers` | per stage: active provider id, mode, available providers, disabled reasons |

## Owner token (VS-004 PI-03)
On start the server generates a random 256-bit token, keeps it in memory only, and prints it once in
the owner's terminal (and as a one-time `?t=` link that the SPA moves into `sessionStorage`). It is
never written to disk, so an agent shell on the same host cannot read it from a file. Every gate
POST, and every `publish`-stage POST, must carry it in `X-Owner-Token`; a missing or wrong token is
403 and is logged. Restarting the server rotates it. Security test (PI006): `curl` the gate without
the token from the same host and expect 403.

