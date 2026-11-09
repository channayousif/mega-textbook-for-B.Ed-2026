---
id: 2474
title: Gemini Notebook MCP setup and EFMP-301 4.1 pilot
stage: general
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-notebook-studio
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, gemini-notebook, mcp]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/notebook-studio/build-source-pack.mjs
  - tests/unit/notebook-studio-source-pack.test.mjs
  - specs/studio/prompts/
  - .gitignore
tests:
  - tests/unit/notebook-studio-source-pack.test.mjs (7 pass)
---

## Prompt

New feature : i want to intigrate with notebooklm using its mcp server, Search for creative ways i can inttgrate each topic with it, i can think of adding slide deck, concept maps, video overviews, infographics ... to enrich the content we have :[

{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notebooklm"]
    }
  }
}

]

(Follow-ups in the same exchange, verbatim:)

Help me connect to the remote Gemini Notebook MCP server (`https://notebook.googleapis.com/mcp`). Follow these exact steps:1. Check if `gcloud` is installed and ask me which Google Cloud PROJECT_ID to use (you can list my projects with `gcloud projects list --limit=10` or check `gcloud config get-value project`).2. Enable the Gemini Notebook API on that project:   gcloud services enable notebook.googleapis.com --project="$PROJECT_ID"3. Authenticate Application Default Credentials (ADC) with a personal Google Account (Google Workspace accounts are not yet supported) that has signed in to https://notebook.google.com at least once, requesting the `notebook` OAuth scope (standard `gcloud auth print-access-token` lacks this scope):   gcloud auth application-default login --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/notebook"4. Mint an access token:   ACCESS_TOKEN=$(gcloud auth application-default print-access-token)5. Verify connectivity to `https://notebook.googleapis.com/mcp` using HTTP POST with headers `Authorization: Bearer $ACCESS_TOKEN`, `x-goog-user-project: $PROJECT_ID`, `Content-Type: application/json`, `MCP-Protocol-Version: 2026-07-28`, and `Mcp-Method: tools/list`, sending JSON-RPC `{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {"_meta": {"io.modelcontextprotocol/protocolVersion": "2026-07-28"}}}`.6. Configure the `gemini-notebook-api` remote HTTP MCP server in my current coding environment with URL `https://notebook.googleapis.com/mcp` and headers `Authorization: Bearer <TOKEN>` and `x-goog-user-project: <PROJECT_ID>`

A community MCP for generation only

ok go on

ok

## Response snapshot

The pasted package does not exist (npm 404); NotebookLM is now Gemini Notebook. Installed gcloud 592.0.0 (aarch64 tarball, ~/google-cloud-sdk), enabled notebook.googleapis.com on mega-edu-textbook, signed ADC in through the owner's own Desktop OAuth client (gcloud's default client is blocked for the notebook scope) with a loopback exchange, verified tools/list (7 tools: notebooks + sources only, no Studio generation) and registered `gemini-notebook-api` at user scope with `~/bin/notebook-mcp-refresh` for the ~1 h token. Owner chose a community MCP for generation: installed `notebooklm-mcp-cli` 0.16.2 with uv, cookie login (cURL `-b` parsing workaround), registered `gemini-notebook-studio` at user scope. Built the source-pack builder (answers never included) and ran the 4.1 pilot in every format, EN and UR, with reviews.

## Outcome

- ✅ Impact: both MCPs live; pilot evidence for every Studio format with cost per format.
- 🧪 Tests: source-pack builder 7/7.
- 📁 Files: builder, tests, prompt library, .gitignore entry.
- 🔁 Next prompts: owner review of the pilot artifacts.
- 🧠 Reflection: the official MCP has no Studio tools yet; generation needs the cookie-based community tool, which is a ToS risk the owner accepted.

## Handoff (for CEO and agents)

- Shipped / changed: user-scope MCP config and credentials (outside the repo); source-pack builder and prompts in the feature branch.
- Decisions the team must respect: generation is owner-run on this host only, never CI or crew; credentials stay in ~/.config/gcloud and ~/.notebooklm-mcp-cli, never in git.
- Pending / next owner: owner re-exports cookies when the community login expires (incognito session lasts longer); OAuth app in Testing needs a weekly re-sign-in.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: pasted MCP package did not exist; gcloud default ADC client blocked for sensitive scope; normal-browser cookies rotated within ~2 h.
- Graders run and results (PASS/FAIL): vitest PASS.
- Prompt variant (if applicable): prompts v1.
- Next experiment (smallest change to try): incognito-session cookies for a longer-lived login.
