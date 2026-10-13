---
id: 0130
title: Style guide v4.6 Urdu connector and desc alt parity
stage: spec
date: 2026-10-13
surface: agent
model: claude-opus-5
feature: efmp-302
branch: agent/TEX-25-style-guide
user: channayousif
command: paperclip heartbeat (TEX-25)
labels: ["BilingualAuthor", "style-guide", "tier-a", "urdu", "figures", "board-decision"]
links:
  spec: specs/content/style-guide.md
  ticket: TEX-25
  adr: null
  pr: null
files:
  - specs/content/style-guide.md
tests:
  - npm run check:docs-sync - PASS (version 4.6 has its matching changelog entry)
  - npm run check:no-em-dash - PASS
  - npm run check:pipeline-gate - FAILS BY DESIGN, 44 stale G2 manifests (see below)
---

## Prompt

TEX-25 item A-03, second half: "pick the colon and apply it unit-wide for result/elaboration
clauses in Urdu alt text, then record the rule in `specs/content/style-guide.md` so the next
translated unit inherits it."

The unit-wide application shipped in PR #139 on `agent/TEX-25`. This branch carries only the
standard change, because the two cannot travel together.

## Response snapshot

`specs/content/style-guide.md` to **v4.6**, three edits: the freeze marker, a changelog entry
in the file's own newest-first order, and two rules.

**Rule 1, in `## UR register rules`.** A clause that states a result of, or elaborates on, what
precedes it is introduced with a colon, never a spaced hyphen. The hyphen in English alt text
exists only because Art. III.9 bans the em dash; Urdu has no such constraint and a mid-sentence
hyphen breaks badly in RTL Nastaliq. Where the clause is a continuation rather than an
elaboration, end the sentence instead of reaching for a connector. Apply per unit, not per
figure: a unit split between conventions is the defect.

**Rule 2, in the figure rendering section.** A schematic's `<desc>` MUST equal the `alt` on the
`<Figure>` that carries it, in that locale. Recorded as provenance, not accessibility, with the
reason stated: `<Figure>` renders an `<img>`, an SVG behind an `<img>` never exposes its internal
`<desc>`, so a corrected alt beside a stale `<desc>` presents no defect to a reader and no
failure to a gate - which is exactly why the drift survives review. The rule also states the two
consequences for an author: correcting an alt is two edits per locale, and the alt wins when they
disagree.

Taken during the v4.0 freeze, justified in the changelog on the v4.1 precedent: the drift was
already systemic at 2 units (12 of 16 `<desc>` strings in one unit), and every unit authored
before the rule lands has to be re-checked by hand.

## Why this is a separate branch, and separate approval

`specs/content/style-guide.md` is a deliberately freshness-bearing bound input for every review
manifest (`scripts/lib/review-evidence.mjs:188`, whose own comment reads "an amendment re-opening
the corpus is Article VI.1 working"). Measured by isolation run, not assumed:

- content fixes alone, style guide at `origin/main`: `check:pipeline-gate` **PASS, 0 stale**
- the version bump alone added: **44 stale G2 manifests across 8 courses**

So `check:pipeline-gate` fails on this branch by design. Merging it obliges regenerating 44 G2
manifests (EFMP-301 U2-12, EFMP-302 U2-6, GENG-300, GICT-300, GNAS-301, GQUR-300, EFMP-304 U1-6)
via `npm run gates:evidence -- <COURSE> <N>`. That is the PR #113 failure mode, it is not an
authoring task, and regenerating other courses' signed evidence is not a decision an author
takes. Tier A under the board rule of 2026-10-02: a change to a content standard.

## Outcome

- ✅ Impact: the next translated unit inherits both rules instead of re-deciding per figure.
- 🧪 Tests: `check:docs-sync` PASS, `check:no-em-dash` PASS; `check:pipeline-gate` red by design.
- 📁 Files: `specs/content/style-guide.md` only.
- 🔁 Next prompts: board ruling; then a G2 regeneration pass by whoever owns it.
- 🧠 Reflection: the measurement is the deliverable here. "A style-guide edit probably invalidates
  manifests" is a guess; "0 stale without it, 44 with it" is what lets the board price the change.

## Handoff (for CEO and agents)

- Shipped / changed: style guide v4.6, two rules, no unit content. Nothing else on this branch.
- Decisions the team must respect: do not merge this without deciding the 44-manifest
  regeneration - merging it red leaves every affected course's G2 evidence stale. The rules
  themselves are settled by the TEX-25 owner ruling on A-03; what is open is the corpus cost.
- Pending / next owner: **board**. Two questions: approve v4.6, and who runs the regeneration.
- Paperclip issues affected: TEX-25 (parent), PR #139 (the content half, independently mergeable).

## Evaluation notes (flywheel)

- Failure modes observed: the obvious path - one branch, all of A-03 - produces an unmergeable PR
  that blocks four accepted content fixes behind an unrelated governance decision.
- Graders run and results (PASS/FAIL): docs-sync PASS; no-em-dash PASS; pipeline-gate FAIL (44,
  expected and quantified).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): a `gates:evidence --course-all` batch mode, so a
  standard amendment costs one command instead of 44.
