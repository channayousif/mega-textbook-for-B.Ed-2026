---
id: 20261269
title: Crew producer lanes, Study Studio run by the crew, social roundup from 09:00, Meta AI spec
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/crew-media-resources
user: M Yousif Channa
command: none
labels: [board-direct, crew, media-studio, social, studio, meta]
links:
  spec: specs/033-meta-ai-producer/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/resources.mjs
  - scripts/crew/crew.mjs
  - scripts/crew/media.mjs
  - scripts/crew/workers.mjs
  - scripts/crew/planner.mjs
  - scripts/crew/social.mjs
  - scripts/generate-illustration.mjs
  - tests/crew/resources.test.mjs
  - tests/crew/studio-stages.test.mjs
  - tests/crew/media-stages.test.mjs
  - tests/crew/planner.test.mjs
  - tests/crew/social-stage.test.mjs
  - tests/crew/worker-chains.test.mjs
  - .claude/skills/media-studio/SKILL.md
  - .claude/skills/studio-media/SKILL.md
  - .claude/skills/social-updates/SKILL.md
  - ops/crew/README.md
  - specs/033-meta-ai-producer/spec.md
  - specs/033-meta-ai-producer/checklists/requirements.md
  - history/prompts/general/20261269-crew-media-lanes-studio-social-meta-spec.general.prompt.md
tests:
  - node --test tests/crew/*.test.mjs (200 pass; 14 new)
  - vitest tests/unit/media-isolation.test.mjs (3 pass, under scripts/heavy.sh)
  - npm run check:docs-sync (in sync)
  - crew.mjs plan and tick --dry-run against a copy of the live crew state (studio on in the copy)
  - generate-illustration.mjs EFMP-304 6 --producer codex --dry-run (per-producer lock, no lock left)
---

## Prompt

do all three fixes, make the crew handle planning and scheduling and managing resources

Plan feedback: "we can use diffrent media producers in parallel (eg notebook, flow, meta, agy, codex) each producer has max one slot in allotted time already decided"

## Response snapshot

Added a crew resource manager (`scripts/crew/resources.mjs`): every outside-service stage runs on a producer lane (notebook, flow, agy, codex, meta reserved, youtube, social), one running job per lane, lanes in parallel and outside the text slots, only in media hours and only while the lane's paced channel has room today; in media hours media jobs pick a worker before text jobs, the social roundup first; jobs writing one ledger never overlap; BOARD.md gets "Today's media plan". Illustrate jobs are pinned to a free image producer (`--producer`), with one image-generation lock per producer and up to three illustrate jobs in flight. Fix 1: the social roundup is due from 09:00 PKT and can run on claude, agy_claude, claude_crew or codex. Fix 2: the Study Studio is run by the crew (`crew studio on|off|status`): `studio_media` (was `audio_overview`) resumes any item to qa3-pass and plans the next certified unit; `crew approve-studio` / `crew reject-studio` take the owner's spot-check; `studio_publish` publishes and places only approved items; MCP stages fall back to claude_crew. Fix 3: `specs/033-meta-ai-producer/spec.md`, blocked on a terms review and the owner's smoke-test go.

## Outcome

- ✅ Impact: media work stops waiting behind authoring and behind one cooling worker; EFMP-301 Unit 4's stuck Study Studio items get a job; social posts get the whole media window.
- 🧪 Tests: 200 crew tests pass (14 new); media isolation and docs-sync pass; dry runs show the lanes and wait reasons.
- 📁 Files: see files.
- 🔁 Next prompts: after merge, turn on `crew studio on`; owner answers the Meta spec's open questions and runs the smoke test.
- 🧠 Reflection: worker capacity (agy, codex, claude cooling) is now the binding constraint, not slots; the board shows it per lane.

## Handoff (for CEO and agents)

- Shipped / changed: crew scheduling (lanes), Study Studio stages and owner commands, social roundup hour and chain, per-producer image lock. Deploys when this PR merges (`~/crew-system` fast-forwards from main each tick).
- Decisions the team must respect: one job per producer lane in media hours (owner, 2026-11-25); Study Studio media only from certified units (G3 done); nothing goes public without `crew approve-studio` or `crew publish`; claude_crew may run MCP media stages when claude is cooling. ADR candidate: per-producer parallel raster generation relaxes ADR-0029's "serial" wording (now serial per producer).
- Pending / next owner: owner turns on `crew studio on` after merge (the session will do it at the owner's instruction); owner reviews `specs/033-meta-ai-producer/spec.md` and its open questions; owner watches EFMP-301 Unit 4 items when the crew asks.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a stage name outside isCorpusStage's prefixes would have held course focus (caught by an existing test); the old single image lock serialised all producers.
- Graders run and results (PASS/FAIL): crew tests PASS; media isolation PASS; docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): after a week, compare media items made per day before and after lanes from the pacing ledger.
