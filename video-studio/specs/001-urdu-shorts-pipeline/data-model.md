# Data model - VS-001

## Episode state machine

```
queued ──/video-new──▶ scripting ──▶ script_review ──(owner)──▶ script_approved
                                         │ changes requested ◀──┘
script_approved ──/video-assets──▶ awaiting_assets ──(inbox complete)──▶ asset_review
asset_review ──(owner)──▶ assets_approved
assets_approved ──/video-render──▶ rendering ──▶ render_review ──(owner)──▶ render_approved
render_approved ──/video-publish──▶ packed ──(owner confirms upload)──▶ published
any ──(owner)──▶ shelved
```
Rules
- Only the owner moves an episode into `*_approved`, `published` or `shelved`, and only through
  an owner action: the Studio gate button, or `npm run approve -- <episode> <gate>` typed by the
  owner in their own terminal (it requires an interactive terminal and a typed confirmation, so
  Claude's non-interactive shell cannot run it). Claude never writes approvals, even if the owner
  says "approve" in chat - Claude replies with the command or points to the Studio button
  (VS-004 PI-03; enforced by deny rules in `.claude/settings.json`).
- Approvals are append-only events in `episodes/<id>/approvals.jsonl`
  (`{gate, decision, by, at, digests, checklist, note}`); `episode.json.approvals` mirrors the
  latest valid event per gate. Events are never edited or deleted.
- Editing `script.json` after `script_approved` sends the episode back to `script_review`.
- Replacing any asset after `assets_approved` sends it back to `asset_review`.

## Approval invalidation (constitution X)
Each approval stores the hashes it covered:
- script approval → `{source: source_sha256, script: sha256(script.json)}`
- assets approval → `{manifest: sha256 of the sorted accepted-asset hashes}`
- render approval → `{final: sha256(render/final.mp4)}`
Invalidation follows the dependency graph in `specs/004-production-integrity/dependency-graph.md`
(canonical digest rules live there too): a change voids only the approvals and outputs that
depend on it - e.g. a new voice card voids asset and render approvals; a hashtag change only
regenerates the publish pack. Stale outputs are kept for audit but cannot be used until
regenerated and re-approved. Mismatches fail closed.
Before any stage runs, `scripts/lib/episode.ts` recomputes the hashes. Mismatch → the approval
is voided, status returns to the matching `*_review`, and a history entry explains why (e.g.
"source page changed since script approval"). `/video-harvest` also flags episodes whose source
page hash changed.

## Modes
`mode: production` (default) or `sample`. Sample episodes come from `fixtures/` and exist for
render proofs and tests; production commands (`render` for publishing, `publish`) refuse them,
and the Studio shows a SAMPLE ribbon on them.

## Files per episode
Text files live in `video-studio/episodes/<id>/` (committed). Every media file lives in
`$MEDIA_ROOT/<id>/` (never committed, VS constitution XIII); the table's `audio/`, `clips/`, `images/`,
`render/`, `stills/`, `publish/` and `inbox/` paths are relative to that folder.

| File | Written by | Purpose |
|---|---|---|
| `episode.json` | scripts | identity, status, history, source, budget use |
| `script.json` | urdu-script-writer | structured script (contract) |
| `reviews/<reviewer>-<n>.md` | subagents | findings, severity, line refs |
| `handoff.md` | asset-handoff | owner's to-do list for subscription UIs |
| `inbox/*` | owner | raw downloads |
| `audio/<line_id>.wav` | ingest | normalised 48 kHz mono, −16 LUFS per line |
| `clips/<shot_id>.mp4` | ingest | 1080×1920, 30 fps, muted |
| `images/<shot_id>.png` | ingest | 1080×1920 or layered |
| `captions.json` | align | per-line word timings |
| `render/captions.ur.srt`, `render/captions.ur.vtt` | render | sidecar Urdu subtitles for platforms that accept caption files |
| `source.snapshot.md` | new-episode | frozen copy of the Urdu source page used for the script |
| `render/final.mp4` | render | deliverable |
| `publish/<platform>.md`, `publish/cover.png` | publish-pack | upload packs |

## Episode ID
`<YYYYMMDD>-<topic_id>` e.g. `20261101-bed-s1-c3-u2-classroom-management`.

## Topic (queue/topics.json item)
```json
{
  "topic_id": "bed-efmp-301-unit-01-topic-01",
  "section": "textbook | licence",
  "track": "pre-service | licence",
  "programme": "B.Ed(H) | STEDA",
  "course_code": "EFMP-301",
  "unit_no": 1,
  "publication": "certified | provisional | gated",
  "path": "docs/semester-1/efmp-301/unit-01/topic-01.mdx",
  "path_ur": "i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01/topic-01.mdx",
  "translation_status_ur": "draft",
  "title_en": "...",
  "title_ur": "...",
  "url_ur": "https://textbook.com.pk/ur/semester-1/efmp-301/unit-01/topic-01",
  "shortability": 4,
  "candidate_ideas": ["..."],
  "episodes": []
}
```
Paths and routes follow `.claude/skills/topic-harvester/SKILL.md` (verified against the repo).
Licence topics live under `licence/<course>/...` with Urdu at
`i18n/ur/docusaurus-plugin-content-docs-licence/current/...` and routes under `/ur/licence/...`.
Shortability (1–5): one clear idea, concrete examples present, visualisable, exam-relevant.

## Usage accounting
Each episode's `usage` records non-dollar subscription use: images generated, clips generated,
voice attempts, Flow credits, owner minutes (Studio timer per stage), render seconds, and
`metered_cost_usd: 0` (constant in v1). `/video-status` totals these per month.

## Budget (queue/budget.json)
```json
{ "month": "2026-11", "flow_credits_total": 1000, "flow_credits_used": 120,
  "warn_at": 0.8, "entries": [{ "episode_id": "...", "shot_id": "b1", "model": "veo-3.1-fast", "credits": 20 }] }
```
