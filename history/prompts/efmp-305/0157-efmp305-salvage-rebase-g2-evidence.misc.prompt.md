---
id: 0157
title: "EFMP-305 salvage rebase and G2 evidence"
stage: misc
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: efmp-305
branch: crew/efmp-305-u00-salvage
user: M Yousif Channa
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: ["crew", "efmp-305", "rebase", "g2-evidence", "depth-gate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-305/unit-06/*.mdx (est_reading_minutes only)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/*.mdx (est_reading_minutes only)
  - specs/content/efmp-305/reviews/unit-0{1..6}/G2/20261017T*-gates.json and logs
  - specs/content/efmp-305/tasks.md
  - history/prompts/efmp-305/0157-efmp305-salvage-rebase-g2-evidence.misc.prompt.md
tests:
  - npm run check:content (branch vs origin/main baseline)
  - npm run check:pipeline-gate
  - npm run check:depth-gate
  - node scripts/prepare-gate-evidence.mjs EFMP-305 1..6
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: rebase crew/efmp-305-u00-salvage, the PR #119 / agent/TEX-39 work, onto origin/main;
keep this unit's content and main's shared files; merge G3 review branches origin/agent/TEX-110,
TEX-111, TEX-112 and TEX-97; keep both sides of glossary.json, specs/decisions/log.md,
specs/gaps.md and terminology.csv; make `npm run check:content` report nothing origin/main does
not; commit, do not push or open a PR.)

## Response snapshot

Rebased 46 commits onto origin/main (6f471631). Conflicts were only in glossary.json (resolved
per term, keeping every main entry) and specs/decisions/log.md (both sides kept); the final tree
was then checked byte-for-byte against `git merge-tree` of the old tip and main, and the two
files were restored to that merge result. Merged the four G3 review branches; their only net
change is review evidence and PHRs 0147, 0148, 0153-0155 (older content copies they carried were
resolved to this branch's newer files). Two new gate failures remained against main: the six
`G2 en-draft` rows at `▣`, and Unit 6 depth (193 reading-min vs the approved 140-170 band).
Unit 6's `est_reading_minutes` had been set at about 135 wpm; recomputed at 180 wpm per the
author-unit rule (total 149), with no prose change, mirrored to Urdu. Generated G2 gate evidence
for Units 1-6 and set the rows to `✅ | auto:gates`.

## Outcome

- ✅ Impact: branch sits on current main; `check:content` matches main's baseline (only `check:content-status`, which needs a generated build artefact, fails on both)
- 🧪 Tests: check:pipeline-gate PASS, check:depth-gate PASS, all other content gates PASS
- 📁 Files: Unit 6 EN/UR front matter, six G2 manifests, tracker, this PHR
- 🔁 Next prompts: re-run G3 for Unit 6 on the new bytes; push and reopen PR #119 from this branch
- 🧠 Reflection: a keyed merge plus a final `merge-tree` comparison made a 46-commit rebase over merge commits safe

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 work rebased onto main with G3 review evidence for Units 1, 2, 3 and 6 merged in; G2 cleared for Units 1-6 by deterministic gates; Unit 6 reading minutes recomputed.
- Decisions the team must respect: no G3/G5 row was touched. The Unit 6 front-matter edit changes G3-bound bytes, so the TEX-97 Unit 6 G3 evidence (bound at 78798ec3) no longer matches and must be re-run before any G3 row is set. The rebase rewrote commit SHAs; G3 reports name pre-rebase commits, still reachable via `crew-backup/efmp-305-u00-salvage-pre-rebase`.
- Pending / next owner: crew lead pushes the branch and opens the PR; CurriculumOwner arranges a fresh Unit 6 G3 review.
- Paperclip issues affected: TEX-39, TEX-97, TEX-110, TEX-111, TEX-112

## Evaluation notes (flywheel)

- Failure modes observed: review branches carry stale copies of content files, so a plain merge raises add/add conflicts that must resolve to the branch side
- Graders run and results (PASS/FAIL): check:content PASS except check:content-status (also fails on main)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
