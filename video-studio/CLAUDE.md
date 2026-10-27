# video-studio - sub-project instructions

Urdu shorts/reels pipeline that turns Mega Textbook topics into 45–60 s vertical videos with
recurring animated characters and a call to action back to textbook.com.pk.

## Read first
1. `memory/constitution.md` - principles that override everything else here (subordinate to the parent constitution)
2. `specs/001-urdu-shorts-pipeline/spec.md` and `plan.md`
3. `brand/brand-bible.yaml` - never invent a colour, font, voice or character trait
4. `specs/000-discovery/discovery.md` - the approved facts about this repo (paths, routes, tooling)
5. `history/reviews/` - independent reviews and what was adopted; don't reintroduce rejected assumptions
   (e.g. that any Urdu TTS works, or fixed Flow credit prices)

## Parent-repo rules that bind here
This folder is a sub-project of the Mega Textbook repo; the root `AGENTS.md` (loaded via the root
`CLAUDE.md`) still applies. In particular:
- **PHR for every acting prompt**, routed to `history/prompts/video-studio/` at the repo root, with
  `board-direct` (or the agent name) in `labels` and a filled `## Handoff (for CEO and agents)`.
  Commit it in the same PR as the work.
- **Zero em dash (U+2014)** in every file here; use a spaced hyphen.
- **Heavy jobs** (`npm ci` here, `remotion studio`/`render`, Playwright, `sharp`, `vitest`) run one
  at a time on the production host, prefixed `flock /tmp/mega-book-heavy.lock`, after a `free -m`
  check (>= 3 GB available). Renders and alignment go to Kaggle instead (below).
- **Numbering:** this sub-project's specs are `VS-001..`, its ADRs `VS-ADR-0001..`. Bare `ADR-NNNN`
  and `Feature NNN` always mean the parent repo's records.
- **Visuals:** Claude never uses an image generator other than Gemini via `agy`
  (`scripts/generate-illustration.mjs`, root ADR-0029); the owner may use any subscription UI.

## Media storage (VS constitution XIII)
`MEDIA_ROOT` (env var, default `~/video-studio-media`) holds every binary:
`$MEDIA_ROOT/<episode-id>/{inbox,audio,clips,images,render,stills,publish}/`,
`$MEDIA_ROOT/consents/`, `$MEDIA_ROOT/brand-assets/`, `$MEDIA_ROOT/kaggle/{bundle,out}/`.
The repo episode folder holds only `episode.json`, `script.json`, `captions.json`, `handoff.md`,
`source.snapshot.md`, `reviews/`, `approvals.jsonl` and manifests (hashes + `MEDIA_ROOT`-relative
paths). Never `git add -f` a media file; the parent CI gate rejects it.

## Kaggle media runner (VS-ADR-0011)
Alignment, render, audit and still extraction run as one Kaggle notebook job on the owner's free
GPU quota (T4 x2). Flow: `npm run kaggle:pack -- <episode>` (verifies approval digests, builds a
hashed bundle in `$MEDIA_ROOT/kaggle/bundle/`, uploads a **private** dataset version) ->
`npm run kaggle:run -- <episode>` (pushes the pinned notebook) -> `npm run kaggle:fetch -- <episode>`
(downloads into `$MEDIA_ROOT/<episode>/`, re-verifies every SHA-256, then status `render_review`).
The token lives in `~/.kaggle/kaggle.json` (chmod 600), never in the repo. GPU hours are logged in
`queue/budget.json`.

## Operating rules
- **Subscriptions only.** Never add code that calls a paid API or needs a billing account.
  Steps that need Gemini/Flow/ChatGPT UIs are manual providers: the Studio shows instructions
  and accepts uploads (`inbox/` remains a fallback for terminal-only use).
- **Episode state lives in `episodes/<id>/episode.json`** (schema: `specs/001-urdu-shorts-pipeline/contracts/episode.schema.json`).
  Only advance `status` along the state machine in `data-model.md`. Never skip a gate.
- **Three human gates:** `script_approved`, `assets_approved`, `render_approved`. Only the owner sets these.
- **Urdu correctness:** Nastaliq font for captions and titles, right-to-left layout, Western
  digits in on-screen numbers unless the brand bible says otherwise. Terminology ground truth is
  the parent repo's frozen term bank `specs/content/terminology.csv` (term_en,term_ur) and `glossary.json`, then the Urdu source page.
- **Pedagogy:** every short teaches one idea from one source page and links to that page.
- **Provenance:** every accepted asset goes into the manifest with its hash and rights note; approvals are hash-bound (VS-ADR-0008). Never render or publish `mode: sample` episodes as real ones.
- **Never claim** a file, render or generation exists until a command proves it.
- **Never record an approval.** Approvals come only from the owner (Studio button or owner-typed
  `npm run approve`); if the owner says "approve" in chat, give them the command. Integrity rules
  (digests, invalidation graph, publish hard gate) live in `specs/004-production-integrity/`.
- **Media stays out of git** (constitution XIII, `MEDIA_ROOT` above). Commit JSON, prompts and code only.
- Use the skills in `.claude/skills/` instead of improvising. If a skill's guidance is wrong,
  propose an edit to the skill file (reusable intelligence improves over time) and record why
  in `history/adr/` when it is a decision rather than a fix.

## Studio (main way the owner works)
`npm run studio` → http://127.0.0.1:4310 on the server (owner ruling 2026-10-26); the owner opens it
through `ssh -L 4310:127.0.0.1:4310 <server>`. Never bind it to a public interface. Building its web
app is a heavy job (`flock /tmp/mega-book-heavy.lock`); stop the server when a session ends. Spec: `specs/002-studio-console/`. The Studio and
Claude Code edit the same files; keep both working. Every new pipeline capability needs its
Studio screen (instructions, inputs, gate) in the same change. Generative and publishing steps
go through providers (`config/providers.yaml`, VS-ADR-0006) - never call a tool directly from a stage.

## Commands
| Command | Purpose |
|---|---|
| `/video-build` | Work through `tasks.md` (development only) |
| `/video-harvest` | Refresh the topic queue from the site source |
| `/video-new <topic-id>` | Create an episode and draft its script (stops at gate 1) |
| `/video-assets <episode-id>` | Write the asset handoff brief, then check the inbox (stops at gate 2) |
| `/video-render <episode-id>` | Align captions, render, run audits (stops at gate 3) |
| `/video-publish <episode-id>` | Produce upload packs for YouTube / Instagram / Facebook / TikTok |
| `/video-status` | Board of all episodes by status |

## Reviewer subagents
`pedagogy-reviewer`, `urdu-language-reviewer`, `brand-qa-reviewer` (in `.claude/agents/`).
Run them on every script and every render; they report, they never edit.
