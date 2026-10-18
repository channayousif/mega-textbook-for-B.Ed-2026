---
id: 0136
title: EFMP-303 EN repairs and Urdu mirror start
stage: green
date: 2026-10-15
surface: agent
model: claude-opus-5
feature: efmp-303
branch: agent/TEX-40
user: channayousif@gmail.com
command: Paperclip heartbeat (issue_assigned, TEX-59)
labels: ["BilingualAuthor", "efmp-303", "G4", "figures", "citations", "mdx-build"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-59
  adr: null
  pr: https://github.com/channayousif/mega_book_for_B.Ed/pull/120
files:
  - docs/semester-2/efmp-303/course-overview.mdx
  - docs/semester-2/efmp-303/unit-01/topic-01.mdx
  - docs/semester-2/efmp-303/unit-01/topic-04.mdx
  - docs/semester-2/efmp-303/unit-02/topic-02.mdx
  - docs/semester-2/efmp-303/unit-02/topic-03.mdx
  - docs/semester-2/efmp-303/unit-03/topic-01.mdx
  - docs/semester-2/efmp-303/unit-03/topic-02.mdx
  - docs/semester-2/efmp-303/unit-03/topic-03.mdx
  - docs/semester-2/efmp-303/unit-04/topic-01.mdx
  - docs/semester-2/efmp-303/unit-04/topic-02.mdx
  - docs/semester-2/efmp-303/unit-05/topic-01.mdx
  - docs/semester-2/efmp-303/unit-05/topic-02.mdx
  - docs/semester-2/efmp-303/unit-06/topic-01.mdx
  - docs/semester-2/efmp-303/unit-06/topic-02.mdx
  - docs/semester-2/efmp-303/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/index.mdx
  - specs/content/efmp-303/figures/unit-01.md
  - specs/content/efmp-303/figures/unit-02.md
  - specs/content/efmp-303/figures/unit-03.md
  - specs/content/efmp-303/figures/unit-04.md
  - specs/content/efmp-303/figures/unit-05.md
  - static/img/figures/efmp-303/unit-01/
  - static/img/figures/efmp-303/unit-02/
  - static/img/figures/efmp-303/unit-03/
  - static/img/figures/efmp-303/unit-04/
  - static/img/figures/efmp-303/unit-05/
  - glossary.json
  - specs/decisions/log.md
tests:
  - "npm run build (both locales): PASS, 0 broken links, 0 unresolved markdown links"
  - "node scripts/check-figures.mjs: 0 EFMP-303 findings (480 pre-existing findings in other courses)"
  - "validate:content, check:depth-gate, check:concept-graph, check:bloom-bands, check:no-em-dash, check:no-answer-keys, check:source-floor, check:docs-sync: exit 0"
  - "check:pipeline-gate: 6 EFMP-303 findings (stale G2 manifests, expected after a content edit)"
---

## Prompt

Paperclip wake, reason `issue_assigned`, issue TEX-59 "TEX-58: (resume of TEX-40)
EFMP-303 Educational Policies and Plans of Pakistan - full authoring".

Objective as stated by the board: author complete EFMP-303 (Semester 2) with all units,
QC checks, figures and the Urdu mirror. Keep using branch `agent/TEX-40` and PR #120; do
not open a new branch or PR. Required remaining work: (1) rebase `agent/TEX-40` on
origin/main (style guide v4.6); (2) verify all 6 EN units still meet the v4.6 standard and
fix any drift; (3) generate figures per the generate-figures skill; (4) Urdu mirror (G4)
for every EN unit file; (5) run `npm run check:content` and fix failures; (6) hand to
Reviewer for G3/G5.

## Response snapshot

The issue's "Current state" block was stale in two ways, both verified against
`origin/agent/TEX-40`: figures were **not** missing (34 figures across the six units, every
manifest row already at `placed`), and the branch had already been merged with main once
(remote was at `ccdacde5`, ahead of the local checkout).

Work done, in order:

1. **Merge main.** Resolved two conflicts. `glossary.json` was a whole-array conflict; merged
   as a union keyed on `term`, taking main's definitions for the 336 shared terms and
   appending the 30 EFMP-303 terms the branch added (369 total), reformatted to main's
   2-space indent. `specs/decisions/log.md` had D-2026-0059 and D-2026-0063 on the branch
   side and D-2026-0067 on main's; kept all three in decision-number order. Branch is now
   0 commits behind origin/main.

2. **Figure alt parity (style guide v4.6 / TEX-52).** 13 of the 34 EFMP-303 figures had an
   SVG `<desc>` that differed from its carrier alt. Reconciled each to one canonical,
   drawing-accurate string written identically into the carrier, the `<desc>` and the
   manifest Alt text column. Five were quote-style only; the rest were real content drift,
   found by extracting each SVG's own text and comparing it against both strings:
   fig-U2-6's alt claimed eight comparison dimensions where seven are drawn, fig-U4-1's
   claimed six cycle stages where five are drawn, and fig-U1-8, fig-U2-3, fig-U2-4 and
   fig-U4-3 had descs far terser than what the figures show.

3. **Two drawing defects** found during that verification. fig-U2-3 painted its first
   objective label twice at overlapping baselines (y=92/108 and y=104/118), so the node read
   as smudged text; removed the pair that did not match its five siblings. fig-U2-5 drew the
   quality-assurance to teacher-development cross-link as a straight line through the centre
   ellipse; rerouted as a cubic below the hub.

4. **Build breaker.** `unit-01/topic-01.mdx` carried a bare `<Educational planning />` tag.
   JSX read that as an undefined component `Educational` with a boolean `planning` prop, so
   the page failed to compile in both locales. No content gate catches this because none of
   them builds the site. Replaced with the `<Glossary term="Educational planning" />` call it
   was meant to be.

5. **Broken navigation.** `course-overview.mdx` linked its six units as `./unit-NN/`.
   Docusaurus resolves a relative markdown link against the source file and `unit-NN/` is a
   directory, so all six resolved into `/semester-2/efmp-303/course-overview/unit-NN/`.
   Tried `./unit-NN/index.mdx` and `./unit-NN/index`; neither resolves. Settled on the
   absolute route form already in use elsewhere in the corpus, confirmed in the built HTML to
   be locale-prefixed to `/ur/semester-2/efmp-303/unit-NN/` in the Urdu edition.

6. **Citations.** The source registers were repaired for D-2026-0059 but the prose was not,
   so all six units still shipped the locators the evaluator rejected. Replaced the dead
   IIEP locator (5 entries) and the unregistered "Planning education, building the future"
   entry (2 entries) with the identified work the registers bind, Coombs (1970); the three
   in-text `(UNESCO IIEP, n.d.)` citations became `(Coombs, 1970)`. Corrected *Pakistan
   Vision 2025* from 2010 to the register's Planning Commission (2014) with its
   document-level PDF locator. Replaced six `moe.gov.pk` / `mofept.gov.pk` homepage locators
   with the registers' document-level locators and labelled NEP 2017 "(draft)". Replaced the
   World Bank Human Capital Index landing-page URL with an explicit cite-by-reference,
   because its register row binds no URL.

7. **Glossary repairs.** Five EFMP-303 Urdu definitions had Latin characters substituted into
   Urdu words (`کوئi`, `کisi`, `servicے`) plus one broken relative clause.

8. **Urdu mirror started.** Unit 1 `index.mdx` written, matching EFMP-301 Unit 1 (the mirror
   the translate-unit skill names as the correct precedent) for front matter, `key_terms`,
   the `TranslationStatusBadge` and heading vector. Confirmed rendering in `build/ur`.

## Outcome

- ✅ Impact: EFMP-303 now builds in both locales (it did not before), has zero figure-gate
  findings, and its prose citations match its repaired source registers. Urdu mirror is 1 of
  33 files.
- 🧪 Tests: full build both locales PASS with zero broken links; nine content gates exit 0;
  check:figures 0 findings for EFMP-303.
- 📁 Files: 15 EN content files, 5 figure manifests, 26 SVGs (13 light plus regenerated dark
  variants), glossary.json, decision log, 1 new Urdu file.
- 🔁 Next prompts: translate EFMP-303 Units 1-6 to Urdu (G4), one unit per run.
- 🧠 Reflection: the gate set cannot see a malformed JSX tag or a broken relative link,
  because `check:content` never builds. A unit can pass every content gate and still fail to
  render. Running `npm run build` should be part of verifying an authored unit, not only of
  verifying a translation.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-303 merged up to main; 13 figure alt mismatches and 2 figure
  drawing defects repaired; one build-breaking MDX tag and six broken unit links fixed; all
  six units' citations aligned to their D-2026-0059-repaired source registers; five corrupt
  Urdu glossary definitions repaired; Urdu Unit 1 `index.mdx` written. Pushed to
  `agent/TEX-40` (PR #120).
- Decisions the team must respect:
  (a) fig-U2-6 stays at seven comparison dimensions, not the eight its prompt asked for.
  Unit 2 Topic 2 sources no NEP 2009 position on technical and vocational education, so an
  eighth row cannot be filled from cited prose. The manifest prompt records the correction.
  (b) Khan (2018) and Andrabi and Rizvi remain cited by reference with no locator. The style
  guide requires a course guide's recommended readings to be cited by reference only, and
  neither appears in any unit's source register. Do not add a URL to them.
  (c) Absolute route links (`/semester-2/<course>/unit-NN/`) are the working form for
  directory-index targets; relative `./unit-NN/`, `./unit-NN/index` and `./unit-NN/index.mdx`
  all fail to resolve.
- Pending / next owner:
  (a) **Urdu mirror, 32 of 33 files outstanding** (about 46,500 English words). BilingualAuthor,
  one unit per run on TEX-59.
  (b) **G2 re-certification is blocked for EFMP-303 and probably every course.**
  `scripts/prepare-gate-evidence.mjs` writes G2 evidence only when every DRAFT_COMMAND exits 0,
  and `check:figures` has 480 findings repo-wide from the `<desc>`/alt assertion TEX-52 landed
  in PR #142: EFMP-301 211, GNAS-301 183, GICT-300 111, EFMP-304 81, GENG-300 33, EFMP-302 30,
  GQUR-300 30. EFMP-303 is at 0. Nobody can regenerate G2 evidence for any unit until that
  corpus-wide debt is cleared. Needs a board owner.
  (c) `glossary.json` "Plagiarism" has a Latin `paraphrase` embedded mid-Urdu and a garbled
  `بغیر سہرے کی تصویر`. Left untouched: it belongs to another course's term set on main, and a
  content PR is the wrong place for it.
  (d) Prose Further-reading entries that cite works absent from their unit's source register
  (UNESCO 2015 Incheon in U1 T2, NEP 2009 in U1 T2 and T4, Government of Sindh in U3 T3,
  UN SDG 4 and UNESCO ICT in U6). Whether to add register rows or drop the entries touches
  D-2026-0053's reading policy, so it is CurriculumOwner's call, not mine.
- Paperclip issues affected: TEX-59 (this run), TEX-58 (parent), TEX-40 (locked, superseded).

## Evaluation notes (flywheel)

- Failure modes observed: the issue's own "Current state" block was wrong about figures and
  about the branch position; trusting it would have duplicated 34 figures. Verifying against
  `origin/agent/TEX-40` first cost two commands and saved the run.
- Graders run and results (PASS/FAIL): build both locales PASS; nine content gates PASS;
  check:figures PASS for EFMP-303, FAIL repo-wide (pre-existing); check:pipeline-gate FAIL
  (6 stale G2 manifests, expected).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add `npm run build` to the author-unit skill's
  verification step, so a malformed component or an unresolvable link is caught at authoring
  time instead of at translation time.
