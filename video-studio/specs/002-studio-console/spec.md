# VS-002 - Studio Console (one-page app)

Status: Draft for approval · Created 2026-10-24 · Owner: Yousif
Depends on: 001 (data model, contracts, scripts). Supersedes 001's "drop files in inbox/" UX.

## 1. Problem
VS-001 makes the owner switch between a terminal, a handoff markdown file, three web
tools and a file manager, renaming downloads by hand. That is slow, error-prone and hard to
hand over to a teammate.

## 2. Goal
A local single-page app - **Mega Textbook Studio** - that walks one episode through every stage
on one screen: what to do, what to copy, where to go, where to drop the result, and a button
for each human gate. Each stage is built on a provider interface so a manual step can later
become an API call without changing the screen or the data.

## 3. Scope
In: localhost web app started with `npm run studio`; all stages of 001; live updates when
Claude Code changes files; manual providers for voice, B-roll, images and publishing.
Out (v1): hosting on the internet, user accounts, mobile layout beyond basic, paid APIs.

## 4. User stories and acceptance criteria

### US-8 Home board (P1)
- AC8.1 Shows episodes as cards grouped by status with the next action and its owner (you / Claude).
- AC8.2 Shows Flow credits used this month with a bar (warn ≥80%).
- AC8.3 "New episode" opens the topic picker.

### US-9 Topic picker (P1)
- AC9.1 Searchable, filterable list of `queue/topics.json` (section, programme, shortability, unused only).
- AC9.2 Opens the Urdu source page in a side panel (iframe or fetched text) before choosing.
- AC9.3 "Draft script" starts a script job (see US-15) or shows the exact Claude Code command to copy.

### US-10 Stage stepper (P1)
- AC10.1 One episode view with a stepper: Script → Voices → Visuals → Preview → Render → Publish.
- AC10.2 Each stage shows: a 2–4 line instruction box, a checklist, and a "done when" rule.
- AC10.3 Locked stages explain why they're locked (e.g. "Approve the script first").
- AC10.4 Gate buttons (Approve script / assets / render) write the history entry `by: owner`; "Request changes" takes a note.
- AC10.5 Each gate shows its part of `checklists/review-checklist.md`; Approve is enabled only when all items are ticked; ticks and the covered hashes are saved in `approvals`.
- AC10.6 If a hash check voids an approval, the stage shows why (e.g. "source page changed") and returns to review.
- AC10.7 Sample-mode episodes show a SAMPLE ribbon and have no Publish stage.

### US-11 Script stage (P1)
- AC11.1 Urdu lines shown RTL in Nastaliq, editable inline, grouped by segment, speaker colour-coded.
- AC11.2 Live word count and estimated duration meter (target band 45–60 s).
- AC11.3 Reviewer findings appear next to the line they refer to, with severity badges.
- AC11.4 Saving validates against `script.schema.json`; invalid saves are blocked with the reason.
- AC11.5 Source excerpts shown in a side panel; clicking an excerpt highlights the lines citing it.

### US-12 Voices stage (P1) - replaces handoff.md section A
- AC12.1 One card per line, grouped by character, in recording order.
- AC12.2 Each card shows the active voice provider's instructions: character, locked voice card (provider, voice/narrator, style prompt), TTS or reading text (lexicon respellings applied) with **Copy** buttons, and an **Open <tool>** link when the provider has one. A narrator provider shows a reading script and recording tips instead.
- AC12.3 A drop zone on each card accepts the downloaded audio; the server renames it to `<line_id>_<character>.wav`, normalises it, and shows a waveform/player, duration vs estimate, and any warnings.
- AC12.3b After upload the card shows a rights/consent note (pre-filled per tool, editable) that goes into the asset manifest.
- AC12.4 "Replace" and "Mark pronunciation issue" (adds a lexicon suggestion) per card.
- AC12.5 Progress bar: n of N lines received.

### US-13 Visuals stage (P1) - replaces handoff.md sections B and C
- AC13.1 One card per B-roll/illustration shot with the prompt (Copy), tool, settings checklist (9:16, 8 s, Fast model), credit cost, reference images to attach (downloadable thumbnails), and **Open Flow / Open Gemini / Open ChatGPT** links.
- AC13.2 Drop zone → auto-named, normalised, previewed; "Takes" allows keeping up to 3 and choosing one.
- AC13.3 On accepting a clip the owner enters the model name and credits shown in Flow (not hard-coded); these go into usage and the budget.
- AC13.4 "Swap to diagram" converts a broll line to a free Remotion diagram (edits script → back to script review only if wording changes).

### US-14 Preview stage (P1)
- AC14.1 Embedded **Remotion Player** plays the episode with current assets before rendering - no render wait.
- AC14.2 Missing assets show as labelled placeholders, so preview works at any stage.
- AC14.3 Caption timing view: per-line word chips; nudge ±100 ms; low-confidence lines highlighted and must be reviewed before Approve assets; saves to `captions.json`.
- AC14.4 "Approve assets" gate lives here (after the owner has listened and watched).

### US-15 Jobs (P1)
- AC15.1 Long tasks (harvest, script draft, reviews, align, render, audit) run as server jobs with live log and progress (Server-Sent Events).
- AC15.2 Claude jobs run through the locally installed Claude Code CLI in non-interactive mode (`claude -p`) using the owner's existing login; if unavailable, the UI shows the command to paste in the terminal instead.
- AC15.3 Only one render job at a time; jobs survive a page refresh.

### US-16 Render stage (P1)
- AC16.1 "Render" button → job with % progress; result video player; audit table (pass/fail per check); reviewer verdicts.
- AC16.2 "Approve render" gate.

### US-17 Publish stage (P2)
- AC17.0 Download buttons include `captions.ur.srt`.
- AC17.1 Tabs per platform with title, description, pinned comment and hashtags, each with Copy; cover and video download buttons; AI-label reminder checkbox.
- AC17.2 URL fields; saving all → status `published`.

### US-18 Settings (P2)
- AC18.1 Read-only view of brand bible and cast (with puppet layer previews and voice samples).
- AC18.2 Provider modes per stage from `config/providers.yaml` (all `manual` in v1), shown with the reason any API mode is disabled.

## 5. Non-functional
- NFR5 Binds to 127.0.0.1 only; no auth; refuses uploads > 500 MB or with unexpected types.
- NFR6 The file system remains the source of truth: the app reads/writes the same episode files Claude Code uses, so either can be used at any time.
- NFR7 Owner hands-on time per episode ≤20 min (down from 25).
- NFR8 Works in current Chrome/Edge/Firefox on desktop; Urdu renders correctly.

## 6. Open questions
- OQ4 Is running `claude -p` from the app acceptable, or should the app only show commands to copy? (VS-ADR-0007 proposes allowed, off by default.)
- OQ5 Does a teammate need to use the Studio from another computer? (would need ADR for LAN access + a password)
