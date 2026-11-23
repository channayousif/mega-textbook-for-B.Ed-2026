---
id: 20261257
title: 14 figures that never rendered, a render-aware figure gate, and a zero-downtime deploy swap
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/figure-render-gate
user: M Yousif Channa
command: "ok" (P3 render gate) and "it's urgent checkout: Your Docusaurus site did not load properly"
labels: [board-direct, figures, ops, deploy]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/measure-figure-text.mjs (XML well-formedness, paint order, contrast)
  - 20 figure SVGs and dark twins (EFMP-301 U2, GISS-401 U2, EFMP-303 U6, GENG-300 U3, GENG-301 U2/U4, GPKS-402 U6, EFMP-304 U5/U6)
  - docs/semester-1/geng-300/unit-03/topic-03.mdx, specs/content/geng-300/figures/unit-03.md (alt "Q and A")
  - specs/content/*/tasks.md (G2 repointed for 7 units, G3 re-opened for 7), G2 evidence
  - scripts/deploy-prod.sh (and host-local ~/bin/deploy-via-davinci.sh, backup .bak-20261123)
tests:
  - node scripts/measure-figure-text.mjs on all changed SVGs (pass); corpus run (findings fixed)
  - npm run check:content (pass)
---

## Prompt

ok (start the P3 render-based figure gate) / it's urgent checkout: Your Docusaurus site did not
load properly. A very common reason is a wrong site baseUrl configuration.

## Response snapshot

- Render gate: measure-figure-text now fails a file that is not well-formed XML, text painted
  over by a later shape, and text within 1.6:1 contrast of the filled shape under it (true fill
  geometry via isPointInFill). Verified on pre-fix files from history (caught both known bugs).
- A corpus scan with it found 14 figures that never rendered on the site (not well-formed XML:
  &nbsp;, bare &, a duplicate attribute, an unquoted value, "//>") and 5 with unreadable labels
  (unstyled boxes rendered black; ink text on dark accent boxes); all fixed; EFMP-301 fig-U2-4.ur
  also lost its grid group (restored). G2 refreshed for the 7 units with English changes; G3
  re-opened for those 7 (4 certified, 3 awaiting sign-off) under D-2026-0098.
- Urgent report: the site was healthy when probed (no banner, no script errors, no asset 404s on
  five key pages). Root cause: the deploy ran `rsync --delete` straight into the docroot, removing
  the old hashed JS/CSS before every page was replaced, so visitors during each deploy got the
  misleading baseUrl banner. Fixed in ~/bin/deploy-via-davinci.sh (live) and scripts/deploy-prod.sh:
  assets first without delete, then pages with --delay-updates --delete-after excluding assets,
  then prune assets older than 7 days.

## Outcome

- ✅ Impact: 14 figures render again; 5 become readable; deploys no longer break pages mid-swap.
- 🧪 Tests: measure gate pass on all changed SVGs; check:content pass.
- 📁 Files: see front matter.
- 🔁 Next prompts: watch the next deploy log for the new swap; G3 runs for the 7 re-opened units.
- 🧠 Reflection: every gate passed malformed SVGs because the checks parse them forgivingly as HTML.

## Handoff (for CEO and agents)

- Shipped / changed: see files; the host deploy script changed (backup kept).
- Decisions the team must respect: never `rsync --delete` a Docusaurus build straight into the docroot.
- Pending / next owner: crew: G3 runs for EFMP-303 U6, EFMP-304 U5/U6, GENG-300 U3, GENG-301 U2/U4, GPKS-402 U6.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: HTML-parsed checks miss XML errors; a bounding box is not fill geometry; an svg element's default fill is black.
- Graders run and results (PASS/FAIL): measure PASS; content gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a post-deploy smoke probe that loads five pages and alerts on the banner.
