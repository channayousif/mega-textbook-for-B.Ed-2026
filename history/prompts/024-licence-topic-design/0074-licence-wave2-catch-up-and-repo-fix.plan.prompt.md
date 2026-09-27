---
id: 0074
title: Licence wave-2 catch-up, CI unblock, and repo hygiene
stage: plan
date: 2026-09-26
surface: agent
model: gemini-3.8-flash
feature: 024-licence-topic-design
branch: fix/licence-map-and-symlink
user: M Yousif Channa
command: none
labels: ["licence-track", "ci", "repo-hygiene", "efmp-304"]
links:
  spec: specs/024-licence-topic-design/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - src/data/licence-map.json
  - history/prompts/024-licence-topic-design/0074-licence-wave2-catch-up-and-repo-fix.plan.prompt.md
tests:
  - scripts/run-gates.mjs
---

## Prompt

agy was working on this repo, it reached its limit. Catch up on recent changes and proceed. Claude Code had stopped due to quota. Wave 1 licence headings done; wave 2 (B, E) was running. Need to verify merged content, fix any remaining issues, and open PRs.

## Response snapshot

Investigated the full repo state read-only. Found all 5 licence headings (A-E) already merged to main and pushed, with agy's two fix commits (B Urdu front-matter, E CRQ-2 translations) included. Verified byte-identical diffs between fixed worktree tips and main. Discovered two blockers: (1) src/data/licence-map.json was stale — D and A merges added 11 EFMP-301/302 degree-topic links after the last rebuild, and licence:map:check is a CI gate, so main's CI would fail; (2) a node_modules symlink (mode 120000) was accidentally tracked in the heading-C migration — .gitignore's node_modules/ pattern only matches directories. Also found: a corrupted 3KB nep2009.pdf in a scratchpad (failed download, not a real PDF), so D05's three policy documents need fresh downloads; docs/semester-2/efmp-304/unit-01/topic-01.mdx has a wrong title ("How humans learn: three theories" but the content is about critical thinking); no Urdu mirror exists for EFMP-304.

Decisions from owner: separate PRs (not bundled); commit D05 policy docs; fix EFMP-304 title now; accept heading-C citation approach as-is; record a PHR.

## Outcome

- ✅ Impact: licence-map.json rebuilt (24 → 35 entries); node_modules symlink removed from git tracking (real dir preserved); all 13 content gates pass; PR 1 ready
- 🧪 Tests: check:licence 57/57; licence:map:check PASS; check:content 13/13 PASS
- 📁 Files: src/data/licence-map.json, node_modules (untracked), PHR 0074
- 🔁 Next prompts: PR 2 (download + commit D05 policy docs); PR 3 (EFMP-304 topic-01 title fix); worktree cleanup
- 🧠 Reflection: map rebuilds must follow every heading merge that adds degree links; symlinks bypass directory-only gitignore patterns — audit tracked file modes after migrations

## Evaluation notes (flywheel)

- Failure modes observed: git rm on a symlink that the working tree replaced with a real directory silently didn't stage — needed git rm --cached
- Graders run and results (PASS/FAIL): check:content all PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): add a gate that asserts no symlink (mode 120000) entries exist in the tracked tree
