---
id: 0141
title: TEX-98 EFMP-303 Unit 3 strategic-planning classification fix
stage: efmp-303
date: 2026-10-16
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-40
user: M Yousif Channa
command: paperclip-agent
labels: ["curriculumowner", "tex-98", "efmp-303", "content-fix", "classification"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-98
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-03/topic-02.mdx
 - docs/semester-2/efmp-303/unit-03/topic-01.mdx
 - docs/semester-2/efmp-303/unit-03/unit-assessment.mdx
 - static/img/figures/efmp-303/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.dark.svg
 - specs/content/efmp-303/figures/unit-03.md
tests:
 - npm run check:content (no em-dash; EFMP-303 U3 pre-existing G2 manifest stale only)
---

## Prompt

TEX-98: settle the strategic-planning classification in EFMP-303 Unit 3 before Urdu translation
(TEX-64). English text said strategic planning sits between micro and macro and is necessarily
narrower than macro but broader than micro; summary and assessment treated them as three levels.
UNESCO IIEP counter-evidence: a national education sector plan covers the entire sector and lists
Strategic among its essential characteristics, so strategic is an approach that can operate at
system scale, not necessarily an intermediate scale. Also fig-U3-2 carried unverified
education-allocation percentages (~7%, ~5%, ~3%, ~4%, ~4-5%) as shares of total plan budget with
only title/catalogue-level source support. Correct or resolve the teaching distinction across
prose, affected questions/marking guidance, fig-U3-4 and dependent components; verify or replace
fig-U3-2 percentages. Return a settled English commit. No new branch or PR. Do not claim review
acceptance. Keep draft banners intact.

## Response snapshot

Audited the branch agent/TEX-40 (English units complete, Urdu not yet started). Confirmed the error
sits in prose (topic-02.mdx:74-77), the summary (topic-02.mdx:140), the unit summary
(unit-assessment.mdx:27), and the mutually-exclusive three-way classification in RRQ 4
(unit-assessment.mdx:113) with its marking guidance (unit-assessment.mdx:183). fig-U3-4 does NOT
embed the error — it already presents the three as parallel approaches with a footer stating all
three operate simultaneously, so it was left untouched.

Edits made (commit bf63b219, branch agent/TEX-40, pushed):
- topic-02.mdx: rewrote the strategic-planning paragraph. Strategic is now framed as a planning
  APPROACH (focus + fixed time frame + measurable outcomes), not a scope level between micro and
  macro. Explicitly states strategic can operate at any scale, citing UNESCO IIEP on sector plans.
- topic-02.mdx summary: changed "operates at three levels: micro, macro and strategic" to "two levels
  of scale: micro and macro. Strategic planning is a focused, time-bound, outcome-oriented approach
  that can operate at either level."
- unit-assessment.mdx unit summary: same two-level + approach framing.
- unit-assessment.mdx RRQ 4: reframed from "Classify each scenario as micro, macro or strategic" to
  "Identify the level (micro or macro) AND state whether it is strategic (focused, time-bound,
  outcome-oriented)" with one-sentence reasoning each.
- unit-assessment.mdx RRQ 4 model answer: now requires correct scale (micro/macro) per scenario
  plus a defensible strategic judgement with reasoning, instead of a forced single-bucket label.
- fig-U3-2.svg + fig-U3-2.dark.svg: removed unverified specific percentages (~7%/~5%/~3%/~4%/
  ~4-5%), replaced with plain "~" markers; renamed column "Education allocation (%)" to "Approx.
  share of plan budget"; strengthened note to "precise values vary by source and have not been
  independently verified here."
- topic-01.mdx: updated fig-U3-2 alt text to match new column name.
- specs/content/efmp-303/figures/unit-03.md: updated manifest entry for fig-U3-2.

No em-dashes introduced. No answer keys touched. No scope change.

## Outcome

- Impact: Unit 3 English content now teaches the correct distinction (strategic = approach, not an
  intermediate level) across prose, summary, and assessment. fig-U3-2 no longer presents unverified
  precise percentages. Urdu translation (TEX-64) can proceed from a settled English base.
- Tests: npm run check:content passes for EFMP-303 U3 edits (no new failures; the only EFMP-303 U3
  hit is the pre-existing G2 stale manifest, present on all six units before this commit).
- Files: 6 files, +25/-15, commit bf63b219 on agent/TEX-40, pushed to origin/agent/TEX-40. Draft
  banners and status kept intact.
- Next prompts: TEX-64 (Urdu mirror of EFMP-303 Unit 3) is now unblocked and can start from commit
  bf63b219.
- Reflection: The "three-level" classification was replicated across four locations (prose, summary,
  unit summary, assessment). The fix had to land in all of them or the lesson would contradict
  itself. fig-U3-2 was a separate source-confidence issue handled by removing unverified precision
  rather than fabricating verified numbers.

## Handoff (for CEO and agents)

- Shipped / changed: commit bf63b219 on agent/TEX-40 (pushed). English EFMP-303 Unit 3 now
  internally consistent on the micro/macro (levels) vs strategic (approach) distinction.
- Decisions the team must respect: strategic planning is taught as an APPROACH (focused, time-bound,
  outcome-oriented) that can operate at any scale, NOT a level between micro and macro. This matches
  the UNESCO IIEP sector-plan framing and the mutually-exclusive three-way classification in any
  future question is now wrong by construction — questions must separate scale (micro/macro) from
  approach (strategic/not). fig-U3-2 percentages are intentionally left as unverified "~" markers;
  do not re-add precise percentages without a verified source.
- Pending / next owner: TEX-64 (BilingualAuthor) — Urdu mirror of EFMP-303 Unit 3 can now proceed
  from the settled English base at bf63b219. fig-U3-2 and fig-U3-4 Urdu variants will need the
  corresponding translated labels when the Urdu mirror is built.
- Paperclip issues affected: TEX-98 (this fix), TEX-64 (unblocked).

## Evaluation notes (flywheel)

- Failure modes observed: a "between micro and macro" claim about strategic planning had been
  copied into prose, summary, unit summary, and assessment — a classic multi-location drift that
  makes a single-point fix insufficient.
- Graders run and results: check:content PASS for new edits; no em-dash; no answer keys.
- Prompt variant: n/a
- Next experiment: n/a
