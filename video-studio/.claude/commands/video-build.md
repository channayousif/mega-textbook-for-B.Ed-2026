---
description: Build the video-studio pipeline and Studio app by working through both task lists in the agreed order
---
If `specs/000-discovery/discovery.md` is not approved yet, do ONLY read-only discovery (fill it from the template) and stop.
Read `memory/constitution.md`, `specs/001-urdu-shorts-pipeline/{spec,plan,data-model,tasks}.md` and `specs/002-studio-console/{spec,plan,tasks}.md` plus `contracts/api.md`.
Follow the build order: 001 Phase 0 (discovery + render proof) → 001 Phase 1 with VS-003 voice benchmark (`specs/003-urdu-voice-benchmark/`) → 001 Phase 2 → 002 Phase A–B → 001 Phase 3–5 (each with its Studio screen) → 002 Phase C–D → 001 Phase 6–7.
VS-004 tasks (PI001–PI009) are built inside those phases - see `specs/004-production-integrity/tasks.md` for where each belongs; a phase isn't done until its PI tasks and acceptance tests pass.
Use `ui-prototype/studio.html` as the reference for layout, wording and stage instructions (not as code to copy).
Find the first phase in that order with unchecked tasks and implement its tasks, using the project skills.
After each task: run relevant tests, mark it `[x]`, commit referencing the task id.
At the CHECKPOINT: stop and report using this format:
**Goal** · **Task/requirement IDs** · **Files changed** · **Commands run + results** · **Evidence** (output paths only if the file exists) · **Approvals used** · **Parent site build unchanged?** · **Risks/limitations** · **Rollback** · **Manual steps left for the owner**.
Wait for the owner before the next phase. Never claim a render or asset exists without command proof.
$ARGUMENTS
