---
id: 0123
title: tex36-rev8-finalize-rebrand
stage: general
date: 2026-10-12
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-36
user: board (via CEO heartbeat)
command: TEX-36 reopened - fix CI, revert constitution, remove em dashes, compress asset, merge main, get PR green
labels: ["board-direct", "paperclip", "tex-36", "rebranding", "ci"]
links:
  spec: null
  ticket: TEX-36
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/113
files:
  - .specify/memory/constitution.md
  - README.md
  - SDD/ROADMAP.md
  - docusaurus.config.ts
  - src/pages/about.mdx
  - src/pages/index.tsx
  - src/theme/DocItem/Metadata/index.tsx
  - i18n/ur/docusaurus-plugin-content-pages/about.mdx
  - history/prompts/general/0100-tex36-vision-expansion-branding-update.general.prompt.md
  - static/img/logos/adtti.png
tests:
  - gh run list --branch agent/TEX-36
  - git diff origin/main..HEAD | grep '^\+' | grep $'\u2014'
  - git diff origin/main -- .specify/memory/constitution.md
  - ls -la static/img/logos/adtti.png
---

## Prompt

TEX-36 reopened by board. PR #113 (agent/TEX-36) open with CI build red. Six issues to fix:
1. Revert constitution.md (hashed input for G2 manifests)
2. Merge origin/main (49 commits behind)
3. Remove all em dashes (U+2014) - repo rule
4. Urdu mirror follow-up (landing, contact, intro)
5. Compress adtti.png (404KB)
6. Reply to all board PR review threads

## Response snapshot

Fixed all six board items and pushed rev8 (commit 6e73faa6):

1. **Constitution reverted** - `git checkout origin/main -- .specify/memory/constitution.md`. Diff vs origin/main is now empty for this file.
2. **Branch merged** - `git merge origin/main` clean, 0 commits behind main.
3. **Em dashes removed** - sed replaced the em dash (U+2014) with a spaced hyphen across 8 files: README.md, SDD/ROADMAP.md, docusaurus.config.ts, src/pages/about.mdx, src/pages/index.tsx, Metadata/index.tsx, i18n/ur/about.mdx, PHR 0100. Zero em dashes in `git diff origin/main..HEAD`.
4. **Urdu mirrors** - child issue TEX-51 opened to track alignment of landing, contact, and intro Urdu mirrors.
5. **adtti.png compressed** - ImageMagick resize 150x150 + strip + quality 80: 404KB -> 48KB.
6. **PR review threads** - replied to all 9 review comments with status confirmation.
7. **PR title** - em dash removed: "TEX-36: rebrand to Mega Textbook - platform vision (Grades 9-12 + teacher ed)"
8. **PR body** - updated to reflect rev8 changes.

CI triggered automatically (run 38300264077). Awaiting green before board merge.

## Outcome

- 10 files changed in rev8 (35 insertions, 40 deletions)
- CI running on rev8
- Child issue TEX-51 opened for Urdu mirror alignment
- All board PR review comments replied to

## Handoff (for CEO and agents)

- Shipped / changed: PR #113 updated with rev8 (commit 6e73faa6), CI running
- Decisions the team must respect: constitution.md must NOT be edited in this PR; Article I amendment deferred to separate /sp.constitution issue. Zero em dash in diff enforced.
- Pending / next owner: board merges PR #113 once CI green. TEX-51 owns Urdu mirror alignment.
- Paperclip issues affected: TEX-36 (in_progress), TEX-51 (new child, pending board merge of #113)
