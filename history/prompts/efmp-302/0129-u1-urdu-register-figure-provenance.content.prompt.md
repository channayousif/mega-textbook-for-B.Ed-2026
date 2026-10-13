---
id: 0129
title: EFMP-302 U1 Urdu register and figure provenance follow-ups
stage: green
date: 2026-10-13
surface: agent
model: claude-opus-5
feature: efmp-302
branch: agent/TEX-25
user: channayousif
command: paperclip heartbeat (TEX-25)
labels: ["BilingualAuthor", "efmp-302", "urdu", "figures", "g5-followup", "style-guide"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: TEX-25
  adr: history/adr/0024-claude-codex-visual-roles.md
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-04.mdx
  - specs/content/efmp-302/figures/unit-01.md
  - static/img/figures/efmp-302/unit-01/fig-U1-1..8{,.ur}{,.dark}.svg (28 files)
  - specs/content/style-guide.md (separate branch agent/TEX-25-style-guide)
tests:
  - npm run check:content - 13/13 PASS
  - npm run figures:variants:check - PASS (618 figures)
  - desc/alt parity script - 32/32 in parity
  - baseline isolation run - check:pipeline-gate PASS (0 stale) without the style-guide bump
---

## Prompt

Paperclip wake on TEX-25, comment body: `retry`. Three prior runs on this issue
ended in an ACP terminal limit failure with no work committed, so this run started
the five items from scratch.

TEX-25 carries five open Urdu-register and figure-provenance items left out of the
TEX-22 / PR #99 diff to keep that review tractable: F-1 (`fig-U1-1.ur.svg` `<desc>`
still carrying the `کے خلاف` calque the G5 verdict removed from the page), F-2
(fig-U1-10 manifest Prompt contradicting its own artefact), A-01 (fig-U1-11 Urdu
flattening the English two-group contrast), A-02 (board vocabulary split between
`بورڈ` and `تختۂ سیاہ`), A-03 (Urdu alt-text clause connector inconsistent across
the unit, plus record the rule in the style guide).

## Response snapshot

All five delivered. Two findings changed the shape of the work.

**F-1 was systemic, not one figure.** The issue named `fig-U1-1.ur.svg`. Comparing
every `<desc>` against its page alt showed 12 of 16 strings in the unit had drifted,
including four in English (`fig-U1-5/6/7/8`), which nobody had looked at because the
reported symptom was an Urdu calque. The root cause is that `check-figures.mjs:376`
asserts `<desc>` is non-empty and never that it equals the alt, so the drift is
invisible to every gate. Synced all 32 (8 figures x light/dark x EN/UR) to the page
alt, which is authoritative: it is the string reviewed at G3/G5 and the only one
assistive technology reads, because `<Figure>` renders an `<img>` and an SVG behind
an `<img>` never exposes its internal `<desc>`.

**The style-guide rule cannot ship in a content PR.** `specs/content/style-guide.md`
is a deliberately freshness-bearing bound input for every review manifest
(`scripts/lib/review-evidence.mjs:188`: "an amendment re-opening the corpus is
Article VI.1 working"). An isolation run measured it: content fixes alone leave
`check:pipeline-gate` green at 0 stale; adding only the v4.6 bump turns **44 G2
manifests across 8 courses** stale. That is the PR #113 failure mode. The amendment
therefore ships on `agent/TEX-25-style-guide` as its own draft PR, and it is Tier A
under the board's 2026-10-02 rule (a change to a content standard), needing a board
ruling plus a decision on who regenerates the 44 manifests.

Two defects of the same class were found and fixed beyond the five items, both
flagged on the issue for the reviewer to accept or reject explicitly rather than
absorb silently: the fig-U1-6 Urdu alt carried a second `کے خلاف` instance
("checked against the script"), and the fig-U1-2 Urdu alt had dropped "and takes
notes" from the English.

## Outcome

- ✅ Impact: EFMP-302 Unit 1 Urdu register is internally consistent and every figure's
  committed artefact now agrees with its reviewed alt text in both locales.
- 🧪 Tests: `check:content` 13/13 PASS; `figures:variants:check` PASS; parity 32/32;
  baseline isolation run PASS at 0 stale.
- 📁 Files: 3 UR topic files, 1 figure manifest, 28 SVGs; style guide on its own branch.
- 🔁 Next prompts: board ruling on the v4.6 amendment and the 44-manifest regeneration;
  WebLeadAgy to add the `<desc>`/`alt` parity assertion to `check-figures.mjs`.
- 🧠 Reflection: the reported symptom was one calque in one file. Measuring the whole
  invariant before fixing the named instance is what turned a one-line edit into the
  12-string systemic drift it actually was, and the gate gap that lets it recur.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-302 Unit 1 F-1, F-2, A-01, A-02 and A-03-applied on
  `agent/TEX-25` with all content gates green. The A-03 style-guide rule is written
  and complete but held on `agent/TEX-25-style-guide` pending a board ruling.
- Decisions the team must respect: the page `alt` outranks the SVG `<desc>` when they
  disagree, because it is what G3/G5 reviewed and what a screen reader reads; sync the
  artefact to the alt, never the reverse. Urdu alt text uses a colon, not a spaced
  hyphen, for result and elaboration clauses. fig-U1-10 was NOT regenerated - its image
  is correct and only its prompt had drifted. Nothing settled on TEX-22 was reopened.
- Pending / next owner: CurriculumOwner reviews `agent/TEX-25`. The **board** owns the
  style-guide v4.6 amendment: approving it obliges regenerating 44 G2 manifests across
  EFMP-301, EFMP-302, GENG-300, GICT-300, GNAS-301, GQUR-300, EFMP-304 and one more,
  which is not an authoring task. WebLeadAgy owns the `check:figures` gate change that
  would stop F-1 recurring; authors cannot change gate scripts.
- Paperclip issues affected: TEX-25 (in_review), TEX-22 (unchanged, nothing reopened).

## Evaluation notes (flywheel)

- Failure modes observed: three consecutive runs lost to an ACP terminal limit before
  any durable progress; nothing was committed or branched, so the retry restarted cold.
  Committing early would have made the fourth run cheap.
- Graders run and results (PASS/FAIL): content gate set PASS 13/13; variant freshness
  PASS; desc/alt parity PASS 32/32; style-guide isolation run PASS (0 stale) vs 44 stale
  with the bump - the measurement that drove the split.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): assert `<desc>` == carrier `alt` in
  `check-figures.mjs`. It is a handful of lines against data the gate already parses,
  and it closes the only defect class here that no gate could see.
