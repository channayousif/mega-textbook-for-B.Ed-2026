---
id: 20261202
title: gflow-cli on Windows, tunnel and first Veo smoke clip
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teasers
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, google-flow, gflow, windows, smoke-test]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega_book_for_B.Ed/pull/557
files:
  - .claude/skills/studio-teaser/SKILL.md
tests:
  - MCP initialize over the tunnel (gflow-cli 0.98.0, then 0.101.0); gflow_get_credits 761
  - First t2v (4 s, veo_3_1_lite) timed out after 600 s, approvals=0, no credits spent
  - Second t2v (8 s, veo_3_1_lite, 9:16) completed for 10 credits (751 left)
  - media-qa --kind clip on the fetched clip passes (720x1280, 7.9 s, stereo AAC, no black runs)
  - Four frames inspected (teacher in shalwar kameez and dupatta, green board, no text); speech check deferred (nlm auth expired)
---

## Prompt

(Several owner messages during Windows setup, verbatim in order.)

py -3.12 -m gflow_cli auth login --browser chrome -> ImportError: DLL load failed while importing _pydantic_core: An Application Control policy has blocked this file. [pasted]

[pasted] Signed in ... Renamed profile from default to a2ahs-alpha ... Credits: 761

[pasted] mkdir $env:USERPROFILE\gflow-out -Force; ... The filename, directory name, or volume label syntax is incorrect. (run in Command Prompt)

[pasted] gflow serve ... [Errno 10048] error while attempting to bind on address ('127.0.0.1', 8000)

reconnected, tunnel is up

check

[pasted] serve log: TransportTimeoutError: agent-only composer: no finished video within 600s of submit (approvals=0), then TypeError: can only concatenate str (not "list") to str

[pasted] Flow agent reply: "Your default video model is Veo 3.1 - Lite, which only supports an 8-second video duration ... Which option would you prefer?"

its up again

its serving now

restarted with the exact path, serving now, [pasted dir listing of Downloads\gflow-cli]

## Response snapshot

- **Smart App Control.** The owner's PC blocks unsigned code: first uv's `python.exe`, then the
  unsigned DLLs inside pip packages. In the end the python.org Python 3.12 run with
  `py -3.12 -m gflow_cli` worked, and sign-in succeeded.
- **Ports.** Windows port 8000 was in use, so both ends of the tunnel now use 18800/18801. The MCP
  is registered at user scope as `gflow`.
- **First clip failed.** The owner's account is on the migrated flow.google.com, where gflow
  drives Flow's agent chat. A 4 s Lite request made the agent ask a question (Lite only supports
  8 s there). gflow can only approve the credit gate, so it timed out after 600 s and spent
  nothing; a logging bug in 0.98.0 hid the reason. The owner then updated gflow to 0.101.0.
- **Second clip worked.** The 8 s Lite clip cost 10 credits. gflow saves clips to
  `Downloads\gflow-cli\<flow_media_id>.mp4`, so the clip server now serves that folder.
- **Checks.** The clip passes QG1, and its frames look right.
- **Skill.** The skill's setup, generate and fetch steps now match all of the above.

## Outcome

- ✅ Impact: the Flow -> server path works end to end (generate on Windows, fetch over the tunnel, QG1 on the server).
- 🧪 Tests: smoke clip passes media-qa --kind clip; frames inspected.
- 📁 Files: studio-teaser SKILL.md (Windows route, ports, Flow agent-chat behaviour, output path).
- 🔁 Next prompts: owner re-exports nlm cookies for QG2 speech checks; owner approves the EFMP-301 script and picks the narrator character; teaser playlists; pilot.
- 🧠 Reflection: gflow_list_models can disagree with Flow's live UI (Lite listed with 4 s); always request 8 s and read the Flow agent reply before retrying a timeout.

## Handoff (for CEO and agents)

- Shipped / changed: SKILL.md updates on feat/029-teasers (PR #557). 10 Flow credits spent on one smoke clip (kept locally in ~/studio-media/teasers/smoke, not uploaded).
- Decisions the team must respect: D-2026-0082 unchanged; Flow runs only from the owner's PC; every shot request uses duration 8 and an explicit profile.
- Pending / next owner:
  - owner: nlm cookie re-export, EFMP-301 script approval, narrator pick, teaser playlists;
  - Claude: QG2 speech check, then the pilot.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Windows Smart App Control blocking unsigned Python and DLLs; cmd vs PowerShell syntax; port clash on Windows; Flow agent asking a question that gflow cannot answer; wrong output folder assumption.
- Graders run and results (PASS/FAIL): media-qa clip PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run the narrator character image and one r2v 8 s veo_fast shot to price and check voice consistency.
