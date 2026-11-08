---
id: 0098
title: fix-google-sheets-mcp-connection-error
stage: general
date: 2026-10-08
surface: agent
model: gemini-3.8-flash-high
feature: none
branch: main
user: Muhammad Yousif Channa
command: fix Connect Google Sheets Secure MCP sign-in Internal server error
labels: ["board-direct", "paperclip", "ops", "mcp", "google-sheets", "diagnostics"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0098-fix-google-sheets-mcp-connection-error.general.prompt.md
tests:
  - journalctl --user -u paperclip --since '1 hour ago'
  - node test on createPaperclipCloudConnector startAuthorization
  - npm run check:no-em-dash
---

## Prompt

fix:
Connect Google Sheets
Secure MCP sign-in

Cancel
Access · Sign in · Ready
Google Sheets couldn’t connect
Internal server error

Try again
Back

## Response snapshot

Investigated the Paperclip journalctl logs and cloud connector code on `davinci` via SSH to diagnose the `Internal server error` during Google Sheets connection:
- Root cause identified:
  - When clicking "Connect Google Sheets", Paperclip defaults to `paperclip-write` ("Connect with Paperclip").
  - This delegates OAuth to the hosted broker at `https://my.paperclip.app/v1/connector/sessions` for profile `sheets.write`.
  - Upstream `my.paperclip.app` returned `HTTP 404 {"error":"PROFILE_NOT_AVAILABLE"}` because Google Sheets is not yet provisioned on the cloud connector broker (only Gmail and Drive are currently supported).
  - The Paperclip server threw `PaperclipCloudConnectorError`, resulting in an unhandled HTTP 500 error returned to the UI.
- Direct OAuth with Google (`customer-write-oauth`) also fails with HTTP 403 because `https://sheetsmcp.googleapis.com/mcp/v1` requires registration in the Google Workspace Developer Preview.
- For the Da Vinci Art Store project, Google Sheets is not required: listing drafts were already migrated to local workspace CSV at `/home/ubuntu/davinciartstore/.paperclip/listing_drafts.csv` and DAVA-2 is completed.
- Operational check:
  - Detected and cleared a hung manual heartbeat process (`75644bcd-1eb4-49a2-ab1a-aa9ffd61c626`) on `davinci` that finished its loop but did not exit cleanly.
  - Successfully unblocked queued run `d3c519b2-ee23-4a12-89fa-cb16b43ce9bc`, allowing the CEO to actively execute on DAVA-47 (elevated Gelato API access for mockup generation).

## Outcome

- Diagnosed exact failure mechanism for both the Paperclip Cloud broker 500 error and Google Sheets MCP 403 error.
- Clarified that Da Vinci Art Store already runs on local CSV files and does not depend on Google Sheets.
- Cleared hung process on `davinci` and unblocked CEO Dava execution on DAVA-47.
- Tests: Server journal and API verification passed; no-em-dash check passed.
- Files: Recorded PHR 0098.

## Handoff (for CEO and agents)

- Shipped / changed: Diagnosed Google Sheets MCP connector failure, unblocked hung CEO heartbeat run, and documented resolution.
- Decisions the team must respect: Google Sheets MCP via `paperclip-write` is unavailable upstream at `my.paperclip.app`; Da Vinci Art Store uses local workspace files under `/home/ubuntu/davinciartstore/.paperclip/`.
- Pending / next owner: User does not need to connect Google Sheets for current DAVA tasks.
- Paperclip issues affected: DAVA-47 (unblocked and executing).

