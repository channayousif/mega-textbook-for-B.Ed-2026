---
id: 20261261
title: Media producers and sign-ins moved to a persistent desktop on davinci
stage: green
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: ops/davinci-media-route
user: M Yousif Channa
command: none
labels: [board-direct, media, ops, gflow, notebooklm]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/761
files:
  - .claude/skills/media-studio/SKILL.md
  - .claude/skills/studio-teaser/SKILL.md
  - ops/development/README.md
  - ops/development/media-davinci/media-tunnel.service
  - ops/development/media-davinci/gflow-serve.service
  - ops/development/media-davinci/gflow-files.service
  - ops/development/media-davinci/workspace-chrome.service
  - ops/development/media-davinci/tigervnc.conf
  - specs/decisions/log.md
tests:
  - gflow image t2i (Nano Banana) on davinci, image inspected
  - MCP gflow_auth_status over the media-tunnel: authenticated, wire accepted
  - MCP gflow_generate_video veo_lite 8 s (10 credits), fetched with fetchClip over 18801, ffprobe 720x1280 h264+aac 7.93 s
  - nlm login --provider openclaw --cdp-url http://127.0.0.1:18802, then nlm login --check (4 notebooks)
---

## Prompt

is it practical to install light weight gui and chrome on dava to signin to flow and meta to be independent of my laptop? this will be more persistent for media

(Plan mode; owner answers: Meta for Meta AI image/video and Business Suite tasks; include
NotebookLM. Plan approved, then the owner signed in over VNC.)

## Response snapshot

Checked first (read-only): davinci is Ubuntu 24.04 aarch64, 2 vCPU, 12 GB, already had XFCE,
xrdp, xvfb, Chromium and Python 3.12. gflow-cli claims Linux x86_64 only and needs a
chrome-strategy profile (real Google Chrome); Google's apt repo now ships `google-chrome-stable`
for arm64. `nlm` can take a session from any Chrome over CDP.

Done:
- davinci: `google-chrome-stable` 158 (arm64, signed Google repo), `tigervnc-standalone-server`,
  gflow-cli 0.106.0 via uv. Spike: Playwright `channel="chrome"` launches it with
  `navigator.webdriver=false`; Flow loads.
- `tigervncserver@:1` (localhost-only XFCE desktop; Debian reads `~/.vnc/` Perl config),
  user units `workspace-chrome` (NotebookLM, meta.ai, Business Suite; DevTools 127.0.0.1:9222),
  `gflow-serve` (127.0.0.1:18800, profile a2ahs-alpha, output `~/Downloads/gflow-cli`),
  `gflow-files` (127.0.0.1:18801). Linger on; all enabled at boot.
- Production host: user unit `media-tunnel` (`ssh -N -L` 18800, 18801, 15901 VNC, 18802 DevTools).
  The crew's producers are unchanged; `producerStatus()` reports `gflow ok`.
- Owner signed in over VNC (laptop tunnel `-L 45901:127.0.0.1:15901`; Windows reserves 5901 and
  15901). First gflow login timed out (Flow app sign-in not completed); retried with a 30-minute
  limit, verified as a2ahs.alpha@gmail.com, profile auto-named a2ahs-alpha.
- Verified: a Nano Banana still; `gflow_auth_status` over MCP; an 8 s veo_lite clip in 1 min 41 s
  fetched with the crew's `fetchClip`; nlm refreshed from the workspace Chrome (the old login had
  expired). Test clip and image moved out of the served folder (the clip producer adopts
  unclaimed files).
- Docs: media-studio "gflow route" now davinci primary, PC fallback; nlm refresh command;
  studio-teaser description and D-2026-0082 note; ops README section and unit copies.

## Outcome

- ✅ Impact: Flow clips and images, NotebookLM and Meta sessions no longer depend on the owner's laptop; the crew's teaser and image jobs can run whenever davinci is up.
- 🧪 Tests: still, auth status, one 10-credit clip end to end, nlm check; all pass.
- 📁 Files: two skills, ops README, five unit/config copies.
- 🔁 Next prompts: optional Meta AI producer spec.
- 🧠 Reflection: "x86_64 only" upstream was a packaging statement, not a hard limit, once Google shipped arm64 Chrome; a 2-minute headless probe settled it before the owner spent time signing in.

## Handoff (for CEO and agents)

- Shipped / changed: davinci hosts gflow (18800), its output folder (18801), a VNC desktop and a workspace Chrome; the production host's `media-tunnel` unit forwards them. No crew code change.
- Decisions the team must respect: davinci is the primary Flow route and the laptop the fallback (stop `media-tunnel` first). Keep `~/Downloads/gflow-cli` free of stray `.mp4` files. Everything stays localhost-only behind SSH; no OCI resources or security-list rules were added.
- Pending / next owner: the host change is recorded as D-2026-0099 (appended at the owner's instruction; D-2026-0082 left unchanged so reports citing it stay valid). Meta AI as a crew producer would need its own spec. Watch davinci memory (about 5 GB free with both Chromes).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Debian tigervnc ignored `~/.config/tigervnc` (exit 1); gflow login timed out when only Google was signed in; Flow signed in inside the workspace Chrome does not create a gflow profile; `pkill -f` patterns killed their own ssh wrapper twice.
- Graders run and results (PASS/FAIL): manual end-to-end checks PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): a crew health line that calls `gflow_auth_status` (not just a port probe) and alerts when the Flow session expires.
