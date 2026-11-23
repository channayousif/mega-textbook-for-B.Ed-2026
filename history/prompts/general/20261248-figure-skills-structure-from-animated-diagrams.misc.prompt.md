---
id: 20261248
title: Upgrade the SVG figure skills with structure and routing rules adapted from animated-diagrams-skill
stage: misc
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/figure-authoring-structure
user: M Yousif Channa
command: upgrade svg and diagram skills
labels: [board-direct, figures, skills]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/generate-figures/SKILL.md
  - .claude/skills/generate-figures/references/svg-authoring.md
  - .claude/skills/generate-figures/references/bilingual-figures.md
  - .claude/skills/author-unit/references/figure-prompts.md
tests:
  - sample flowchart (EN + UR) through svgStyleViolations, mirror-figure-rtl.mjs, measure-figure-text.mjs and Chromium screenshots
---

## Prompt

analyse the skills in repo and upgrade svg and diagram skills with https://github.com/omkamal/animated-diagrams-skill

(owner choices: "Both, in two PRs"; animation for Study Studio videos, social and Shorts, and on
the topic page)

## Response snapshot

- Analysis: our figure skills (generate-figures with svg-authoring, bilingual-figures,
  placement, codex handoffs; author-unit figure prompts; translate-unit's Urdu side) are mature
  and gate-enforced. The external skill (Apache-2.0; OFL fonts, CC-BY Font Awesome subset, GSAP,
  HyperFrames) is an animation tool; its transferable parts for static figures are its structure
  contract, connector rules, per-type conventions, "rebuild, never trace", and RTL pattern rules.
  Its marker advice ("no marker-end") is animation-only and was not adopted; its `direction`-based
  RTL text handling conflicts with our measured rule (no `direction` attribute) and was not adopted.
- PR 1 (this): svg-authoring gains "Structure: layers and names" (four plain layer groups,
  node-/edge-/region-/label- ids, no transforms, connectors drawn source to destination),
  "Connectors" (facing midpoints, straight/orthogonal/soft-curve routing, 20px grid, 40px gaps,
  no crossings, edge labels), pattern 6 (interaction sequence), flowchart shapes, and "Recreating a
  figure from a source image"; bilingual-figures gains per-pattern RTL rules, no letter-spacing on
  Urdu, Western digits, and "mirror before moving anything by hand"; figure prompts name the
  structure of connected figures (eight nodes at most); generate-figures SKILL points to it.
- Verified on a sample flowchart, not on a placed figure (placed figures are review-bound): style
  gate clean for EN and UR, measure-figure-text clean, the mirror keeps ids and draw direction and
  moves the first node to the right; Chromium renders read correctly in both scripts.
- review-unit files were left untouched (review-bound).

## Outcome

- ✅ Impact: new schematics get a consistent, inspectable structure that also prepares them for
  animation (PR 2).
- 🧪 Tests: sample figure through the gate, mirror and measurer.
- 📁 Files: see front matter.
- 🔁 Next prompts: PR 2, the animated-diagram capability (Media Studio kind, brand and Nastaliq).
- 🧠 Reflection: sharp renders CSS-variable SVGs black; always check figures in Chromium.

## Handoff (for CEO and agents)

- Shipped / changed: skill guidance only; no gate, script or figure changed.
- Decisions the team must respect: placed figures are not restructured retroactively (review-bound);
  the structure applies to figures drawn or redrawn from now on.
- Pending / next owner: Claude: PR 2 (animation capability).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a hand-moved Urdu wordmark is flipped back by the mirror.
- Graders run and results (PASS/FAIL): svg-style PASS (EN, UR); measure PASS; mirror PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a gate warning when a new figure lacks layer groups.
