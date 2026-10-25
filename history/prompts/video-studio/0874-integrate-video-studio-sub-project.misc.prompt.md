---
id: 0874
title: Integrate video studio sub-project
stage: misc
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none (plan mode, then "start the work on plan")
labels: ["board-direct", "video-studio", "integration", "kaggle", "media-out-of-git"]
links:
  spec: specs/027-video-studio/spec.md
  ticket: null
  adr: history/adr/0031-video-studio-sub-project.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/** (62 files installed from package v1.6, incl. specs/000-discovery/discovery.md, history/adr/0011-kaggle-media-runner.md)
 - specs/027-video-studio/spec.md
 - specs/027-video-studio/plan.md
 - specs/027-video-studio/tasks.md
 - history/adr/0031-video-studio-sub-project.md
 - scripts/check-no-media-in-video-studio.mjs
 - package.json
 - .github/workflows/ci.yml
 - .gitignore
 - tsconfig.json
 - .claude/settings.json
 - AGENTS.md
tests:
 - python3 -I tools/audit_package.py (package v1.6): files 67, issues 0
 - tools/install_overlay.py dry run + --apply: NEW 61, CONFLICTS 0
 - npm run check:content: 13/13 PASS (content-status.json generated first, as in CI)
 - npm run check:docs-sync: PASS with the two new CI steps
 - node scripts/check-no-media-in-video-studio.mjs: PASS on clean tree; FAIL (exit 1) on a force-staged final.mp4
 - git check-ignore: final.mp4, cover.png, stills .png, consent record, .wav, .srt, kaggle.json all ignored
 - node scripts/check-no-em-dash.mjs --scan-dir video-studio: PASS
---

## Prompt

i want you to analyze and evaluate the @/home/a2ahs/mega_book_for_B.Ed/video-studio-sdd-ri @"video-studio-sdd-ri (2).zip" package for the feasipility and intigration with existing systems, it is designed to add video functionality as a subproject of this repo. list the necessary modifications to this repo or the package itself.

(plan feedback 1) consider the rendering job on kaggle notebook  with its free quota of T4 x2 GPU boost

(plan feedback 2) the output videos should not be on the repo and must be properly gitignored

start the work on plan

## Response snapshot

Evaluated the package read-only (66 files; audit 0 issues; installer 0 conflicts) and wrote a plan:
feasible but not installable as-is, with blockers on governance fit, wrong repo paths, the production
host, the public repo and a bypassable approval guard. The owner added Kaggle as the media runner
and the media-out-of-git rule. On "start", patched the package to v1.6, installed it in a fresh
worktree on `feature/video-studio`, wired the parent repo, and wrote ADR-0031, spec 027 and the
T000 discovery report. Deliberately did NOT edit the constitution, `scripts/lib/gates.mjs` or
`scripts/check-no-em-dash.mjs`, because all three are bound review-evidence inputs and editing them
would make every unit's G2/G3 evidence stale.

## Outcome

- ✅ Impact: video-studio installed as an isolated sub-project; site build inputs, deploy, root lockfile and content gates unchanged.
- 🧪 Tests: see `tests` above; `npm run build` not run (heavy; no build input changed except a tsconfig exclude for a folder the build never reads).
- 📁 Files: 62 new under video-studio/, 6 new or modified root files, ADR-0031, spec 027.
- 🔁 Next prompts: owner answers the discovery open questions; Kaggle setup; `/video-build` Phase 0.
- 🧠 Reflection: the plan's "amend the constitution" and "widen the em-dash gate" steps would have re-opened the whole corpus; checking `review-evidence.mjs` before touching shared standards caught it.

## Handoff (for CEO and agents)

- Shipped / changed: `video-studio/` (package v1.6) on branch `feature/video-studio`, worktree `~/wt-video-studio`; root `.gitignore` media block; `tsconfig.json` exclude; root `.claude/settings.json` deny rules for video approvals; `scripts/check-no-media-in-video-studio.mjs` (`npm run check:no-media`); CI steps for it and for the em-dash gate on `video-studio/`; ADR-0031; spec 027; AGENTS.md pointer. PR #336.
- Decisions the team must respect: media never enters git (CI fails on it); renders run on Kaggle, never on the production host; agents never record video approvals; bare `ADR-NNNN` means the parent repo and `VS-ADR-NNNN` the sub-project; crew corpus jobs must not touch `video-studio/`.
- Pending / next owner: owner approves `video-studio/specs/000-discovery/discovery.md` and answers its 5 open questions (notably: only 2 units are `certified`, 84 `gated`, so a certified-only filter yields 2 topics); owner sets up Kaggle token and `MEDIA_ROOT`; owner times the Art. VI.3 constitution wording amendment (v5.1.0) to coincide with the next standard change; crew lead verifies the planner ignores `video-studio/`.
- Paperclip issues affected: none (Paperclip retired; crew owns corpus work).

## Evaluation notes (flywheel)

- Failure modes observed: plan step that edits bound standards files would have invalidated corpus-wide evidence; package files were read-only after unzip (fixed with chmod).
- Graders run and results (PASS/FAIL): content gates 13/13 PASS; docs-sync PASS; media gate PASS/FAIL as designed; package audit PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Kaggle spike rendering the 10 s sample, recording cold start, render time and GPU hours.
