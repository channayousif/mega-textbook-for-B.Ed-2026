---
id: 20261216
title: gflow reuses one Flow project, tunnel set up, teaser batch 2 started
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/gflow-project-reuse
user: M Yousif Channa
command: none
labels: [board-direct, gflow, crew, studio-teaser]
links:
  spec: null
  ticket: null
  adr: history/adr/0036-multi-producer-raster-illustrations-with-per-producer-quotas.md
  pr: null
files:
  - scripts/lib/image-producers.mjs
  - tests/crew/image-producers.test.mjs
  - .claude/skills/studio-teaser/SKILL.md
  - ops/crew/README.md
tests:
  - npm run test:crew (139 pass)
---

## Prompt

help me start gflow serve here on windows laptop

(then, during setup: "done, check", "check now", "kill", "vscode shows two ports autoforwarded",
"taking long time, still no response", "start creating videos and images, the 701 flow credits will
reset tomorrow", "approve all", "why each video or image creates a separate flow project?", "ok")

## Response snapshot

Guided the owner through starting `gflow serve` (18800) and the `http.server` file server (18801)
on the Windows PC. VS Code's `RemoteForward` lines held the server ports but passed no traffic
(curl 52); with the owner's go-ahead ("kill") Claude ended the two stale VS Code SSH sessions on
the server, the config lines were removed and a dedicated `ssh -N -R ...` window now carries the
tunnel. Verified: MCP 200, `gflow_auth_status` authenticated (a2ahs-alpha), file server 200, crew
status "agy ok · gflow ok · codex ok". Wrote six Urdu teaser scripts (branch feat/teasers-batch2),
which the owner approved; the first two veo_fast shots timed out in gflow after Flow's credit gate
(600 s, approvals=1), charging 40 credits (701 to 661) with no download. Answered why every call
made a new Flow project (no `project` id; `project_name` only titles a new one) and fixed it.

## Outcome

- ✅ Impact: gflow illustrations share one Flow project (state in ~/.cache/mega-book/gflow-project.json, rotated every 50 images, GFLOW_PROJECT pins one); the teaser skill now keeps one project per teaser.
- 🧪 Tests: npm run test:crew, 139 pass (new rotation test; producer test asserts project_name then reuse).
- 📁 Files: image-producers.mjs, its test, studio-teaser SKILL.md, ops/crew/README.md.
- 🔁 Next prompts: retry one teaser shot after `gflow update` (0.101.2); recover the two paid clips from Flow.
- 🧠 Reflection: a port probe ("gflow ok") is not a working tunnel; check an MCP initialize round trip.

## Handoff (for CEO and agents)

- Shipped / changed: gflow project reuse for illustrations; teaser skill step 4 uses `project` after shot 1.
- Decisions the team must respect: never pass only `project_name` to gflow expecting reuse; the tunnel is a dedicated `ssh -N -R 18800... -R 18801...` window, not VS Code RemoteForward.
- Pending / next owner: owner updates gflow to 0.101.2 and checks the two paid clips in Flow; Claude reruns the teaser driver (6 approved teasers, about 600 credits) before the credit reset.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: gflow agent-only composer timed out at 600 s after the credit gate (paid, no file); a gflow logging TypeError hid the media id.
- Graders run and results (PASS/FAIL): test:crew PASS; check-docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): one shot on gflow 0.101.2 inside a per-teaser project.
