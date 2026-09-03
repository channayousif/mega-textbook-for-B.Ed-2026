---
id: 0008
title: Amend constitution v2.7.0 - zero em dash rule
stage: constitution
date: 2026-09-03
surface: agent
model: claude-sonnet-5
feature: none
branch: constitution/zero-em-dash
user: channayousif@gmail.com
command: /sp.constitution (amendment)
labels: ["constitution", "style-guide", "content-quality", "ci-gate", "punctuation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - specs/content/style-guide.md
 - scripts/check-no-em-dash.mjs
 - package.json
 - .github/workflows/ci.yml
 - tests/unit/no-em-dash-gate.test.mjs
 - CLAUDE.md
 - .claude/skills/author-unit/references/citation-and-register.md
 - .claude/skills/author-unit/references/structure-standard.md
 - .claude/skills/author-unit/SKILL.md
 - .claude/skills/generate-figures/SKILL.md
 - .claude/skills/generate-figures/references/svg-authoring.md
 - "docs/** (em-dash cleanup)"
 - "guides/** (em-dash cleanup)"
 - "i18n/** (em-dash cleanup)"
 - "specs/content/** (em-dash cleanup)"
 - "src/** (opportunistic em-dash cleanup)"
tests:
 - npm run check:no-em-dash (new gate, passes on the cleaned tree)
 - npm test (120 passed, +7 new no-em-dash-gate fixtures)
 - npm run validate:content / check:depth-gate / check:figures / check:pipeline-gate / check:no-answer-keys / check:add-course (all pass)
 - npm run build (en + ur, success)
---

## Prompt

i have noticed a few things, need to be fixed:
1. self assessment checklisl is not checkable (need to be selectable and its the record of student self assessment and course progress)
2. what happens to the feedback by the reader, help me find constuctive use of that feedback to improve our topic/book. moreover the feedback is general on the whole topic, which needs to be general as well as specific on sentence or paragraph level to be more useful. and feedback should be shown to the curriculum owner. we can also improve the topic through feedback with claude reading it and improving.
3. i want to set a rule in constitution and every where to strictly avoid using em dash "the zero use of em dash"
4. i feel the need of a dashboard for curriculum owner to veiw the bigger picture and manage all the necessary components.
5. there should be a report for curriculum owner for images yet to be generated for the topics

(Plan approved: constitution amendment v2.7.0 shipped first as its own change; items 1/2/4/5
follow as a combined Spec 010. User answers: clean em dashes out of content now and gate
docs/ + i18n/ + specs/content/; deliver 1/2/4/5 as one Spec 010; dashboard is read-only
cockpit plus in-app actions; self-assessment checklist is an independent metric.)

## Response snapshot

Item 3 only, delivered as a standalone constitution amendment:

- **Constitution v2.6.0 -> v2.7.0** (MINOR). New sub-point **Art. III.9 (Punctuation)**:
  authored student-facing content contains zero em dash characters (U+2014, U+2015, U+2E3A,
  U+2E3B); restructure or use a spaced hyphen; the en dash (U+2013) stays valid for numeric
  ranges. Prepended a `SYNC IMPACT REPORT (v2.7.0)` block; footer bumped; Last Amended
  2026-09-03. III.1-III.8 unchanged and not renumbered. The stacked historical SYNC IMPACT
  REPORT comment blocks were left untouched (immutable record, same rationale as `history/`);
  the live Articles body was cleaned of its 36 em dashes.
- **style-guide.md v3.1 -> v3.2**: no-em-dash bullet added to `## EN readability rules` and
  `## UR register rules`; v3.2 history paragraph added. The version bump re-freezes
  `terminology.csv` as a pair (Spec 006 FR-007); no term changed.
- **New gate `scripts/check-no-em-dash.mjs`** (modelled on `check-no-service-key.mjs`): walks
  `docs/`, `guides/`, `i18n/`, `specs/content/` for `.md` / `.mdx` / `.csv`, fails exit 1 with
  `file:line:col` + a snippet on any em-dash-class character, exit 0 with a `✓` line. Supports
  `--scan-dir` for tests. Wired as `npm run check:no-em-dash`, a CI `build`-job step after
  `check:figures`, and `tests/unit/no-em-dash-gate.test.mjs` (7 fixtures: clean pass, U+2014
  fail with location, U+2015 fail, U+2013 NOT flagged, ASCII hyphen NOT flagged, multi-count,
  extension filter).
- **`guides/` added to the gate roots** beyond the plan's `docs/` + `i18n/` + `specs/content/`
  - it is a published Docusaurus content instance whose Urdu mirror lives under `i18n/`, so
  gating one side only would be inconsistent.
- **One-time cleanup**: 592 em dashes across 119 files in `docs/` + `guides/` + `i18n/` +
  `specs/content/` rewritten. Every occurrence in those trees was the spaced parenthetical
  form (` - `) or an end-of-line dash; no `word-word` cases existed, so a character swap to a
  hyphen preserves meaning and rendering. One line-start continuation case in
  `efmp-302/content-spec.md` was restructured by hand. Opportunistic (not gated): `src/**`
  JSX copy + comments, `README.md`, `CLAUDE.md`, `.claude/skills/**`.
- **Skills**: the no-em-dash rule added to `author-unit`'s citation-and-register reference and
  its pre-emit self-check, to `generate-figures`'s svg-authoring reference (label text), and
  `check:no-em-dash` appended to both skills' gate-run command lines.
- **CLAUDE.md**: a "never use an em dash" line added to Default policies.

Verification: `check:no-em-dash` green; all existing gates green; 120/120 unit tests
(113 prior + 7 new); `npm run build` succeeds for en and ur; `check:no-answer-keys` on the
built output green.

## Outcome

- ✅ Impact: em-dash prohibition is now constitutional (Art. III.9), documented in the style
  guide, enforced by a CI gate, and the existing content + platform code is clean. New content
  authored via the skills is born clean (rule + gate in both skill gate lists).
- 🧪 Tests: `npm test` 120 passed (+7); every content gate + `npm run build` (en + ur) pass.
- 📁 Files: 208 changed (1250 insertions / 1179 deletions), the bulk being the mechanical
  em-dash cleanup; the substantive edits are the 6 governance/gate/skill files listed above.
- 🔁 Next prompts: `/sp.specify` for Spec 010 (curriculum-owner console, structured feedback,
  interactive self-assessment) per the approved plan.
- 🧠 Reflection: every em dash in the content trees was the same spaced form, which made a
  character-level swap safe; the risky cases (line-start, no-space, code spans) were checked
  for and found absent or handled by hand. Adding `guides/` to the gate roots was a
  consistency fix the plan had not anticipated.

## Evaluation notes (flywheel)

- Failure modes observed: none. The one line-start continuation-line em dash would have become
  a stray list item under a mechanical swap; caught by a pre-scan and restructured.
- Graders run and results (PASS/FAIL): check-no-em-dash PASS; validate:content PASS;
  check:depth-gate PASS; check:figures PASS; check:pipeline-gate PASS; check:no-answer-keys
  PASS; check:add-course PASS; npm test PASS (120); npm run build PASS (en + ur).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during Spec 010, confirm the `revise-topic` skill
  gate list carries `check:no-em-dash` so Claude-authored content edits cannot reintroduce it.
