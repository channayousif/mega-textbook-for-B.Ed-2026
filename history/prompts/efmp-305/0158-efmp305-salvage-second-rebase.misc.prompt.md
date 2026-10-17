---
id: 0158
title: "EFMP-305 salvage second rebase"
stage: misc
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: efmp-305
branch: crew/efmp-305-u00-salvage
user: M Yousif Channa
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: ["crew", "efmp-305", "rebase", "content-status"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-305/0158-efmp305-salvage-second-rebase.misc.prompt.md
tests:
  - npm run build:content-status (generated, git-ignored artefact)
  - npm run check:content (13/13 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: same job as PHR 0157; feedback from the previous attempt was one finding main lacked:
"static/content-status.json is missing. Run: npm run build:content-status".)

## Response snapshot

origin/main had moved by PR #158 (crew system, 9 new files, no overlap with this branch).
Rebased again with `--rebase-merges` (backup at `crew-backup/efmp-305-u00-salvage-pre-rebase2`);
conflicts arose only while replaying the TEX-110 and TEX-111 review merges and were resolved to
the original merge commits' files. The resulting tree equals the pre-rebase tree plus main's
9 new files, nothing else. The `check:content-status` finding was environmental: the file is a
git-ignored build artefact absent from this fresh worktree. Ran `npm run build:content-status`;
`npm run check:content` then passed all 13 gates.

## Outcome

- ✅ Impact: branch on current origin/main; all 13 content gates PASS
- 🧪 Tests: npm run check:content PASS
- 📁 Files: this PHR only (content-status.json is git-ignored, not committed)
- 🔁 Next prompts: re-run G3 for Unit 6; push and open the PR
- 🧠 Reflection: crew done-checks in a fresh worktree should run `build:content-status` first

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 salvage branch rebased onto main at e334e3be; no content change since PHR 0157.
- Decisions the team must respect: PHR 0157's Unit 6 G3 re-run requirement still stands; commit SHAs were rewritten again (old tips under `crew-backup/efmp-305-u00-salvage-pre-rebase` and `-pre-rebase2`).
- Pending / next owner: crew lead pushes and opens the PR; CurriculumOwner arranges the Unit 6 G3 review.
- Paperclip issues affected: TEX-39, TEX-97

## Evaluation notes (flywheel)

- Failure modes observed: a missing generated artefact read as a content regression
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): have the crew done-check generate content-status.json before gating
