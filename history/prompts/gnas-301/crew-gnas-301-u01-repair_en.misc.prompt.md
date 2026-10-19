---
id: crew-gnas-301-u01-repair_en
title: crew repair_en GNAS-301 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gnas-301
branch: crew/gnas-301-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-01/topic-03.mdx
 - docs/semester-1/gnas-301/unit-01/unit-teacher-notes.mdx
 - history/prompts/019-author-gnas-301/0039-repair-unit-one-review.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/unit-teacher-notes.mdx
 - specs/content/gnas-301/reviews/unit-01/G2/20261019T142036397Z-gates.json
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261019T142036397Z/validate-content.txt
 - specs/content/gnas-301/reviews/unit-01/repair-20261019.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gnas-301/reviews/unit-01/G3/20260923T205300Z-g3-attempt-01.json` (disposition: revise). Resolve each one:
- [blocking] Figure/prose transposition in topic-01.mdx. Lines 47-50 introduce the five scope areas with "The table below shows each area with one question a teacher in Sindh might actually ask", but the <Figure> carrier at line 50 is fig-U1-1 (four-spheres diagram; SVG text confirmed: "Planet Earth's four spheres"). The scope table fig-U1-2 ("What environmental science studies: five scope areas") is carried at line 87, inside the Earth-structure section, with no introducing prose. A learner is directed to a table that is not there, and the diagram that illustrates the four spheres never appears beside ...
- [blocking] Unbound citation for the 99% air-quality claim. topic-01.mdx:55-57 cites "(WHO, 2024)" for "almost the whole world's population, 99 per cent, breathes air that exceeds its guideline levels". The figure is real (WHO Ambient (outdoor) air pollution fact sheet, 24 Oct 2024: "In 2019, 99% of the world's population was living in places where the WHO air quality guidelines levels were not met", verified by direct fetch 2026-09-23), but no 2024 WHO source is bound: sources/unit-01.md carries only who-biodiversity-2025, who-climate-2023, un-restoration, abbas2012, archer2012, archer2010 plus the tw...
- [blocking] Misattributed figure: the 2-billion water-stress number. topic-03.mdx:112-113 states "The WHO's figure of over 2 billion people living in water-stressed countries (WHO, 2023)", and sources/unit-01.md:17 binds this to who-climate-2023 ("topic-03.mdx U1-06 (water stress figure)"). Verified by direct fetch on 2026-09-23: the WHO Climate change fact sheet (12 Oct 2023) contains no water-stress statement at all; its only water figure is "2 billion people lack safe drinking water". The water-stress figure belongs to the WHO Drinking-water fact sheet (13 Sep 2023): "In 2021, over 2 billion people ...
- [blocking] Unsupported superlative about the Indus Delta mangroves. topic-03.mdx:50-51: "the mangrove creeks of the Indus Delta, which is one of the largest arid-zone mangrove forests in the world" - uncited, and not supported by the bound source: the abbas2012 abstract (verified in full via the publisher, isprs-archives.copernicus.org, fetch 2026-09-23) states "The Indus delta region contains the world's fifth-largest mangrove forest" and describes the coastline's "typical arid subtropical climate" separately, making no arid-zone ranking. The bound excerpt truncates exactly at "The Indus delta region...
- [advisory] Teacher-notes cross-reference inaccuracy. unit-teacher-notes.mdx:21-23: "the Keenjhar Lake from 1.3 returns as a resource rate in 1.3 and a practicum option in 1.4". Topic 1.4 contains no Keenjhar practicum option (its practicum task is the two-bin classroom trial; Keenjhar appears in 1.4 only in the opening classroom situation), and "returns ... in 1.3" is self-referential. Repair: reword to match the actual content, e.g. "...returns in 1.3's resource-rate debate and in 1.4's opening situation".
- [advisory] Assessment construction notes (no key conflicts): the MCQ key is heavily skewed to option b (7 of 10 correct answers are b; d is never correct), which weakens the bank against pattern-guessing - consider redistributing correct options in a future revision. MCQ-10 reuses topic-04's worked example verbatim (one large tin instead of twelve packets), making its Apply label generous (closer to Remember), and RRQ-10's two-part answer is given nearly verbatim in topic-04's misconception text, making its Analyze label generous. Bloom bands as authored still honour the spec (check:bloom-bands exit 0).
- [advisory] Bare-URL link text in all four topics' ## Further reading sections (topic-01.mdx:165-168, topic-02.mdx:163-168, topic-03.mdx:182-194, topic-04.mdx:140-145): the link text is the raw URL, so a screen-reader user hears the URL instead of a description (flagged as advisory by render-inspect on every topic). Consider descriptive link text at the next revision.
- [advisory] Course-level inconsistency (outside unit prose): docs/semester-1/gnas-301/course-overview.mdx:5 carries credit_hours "3 (3-0)" while catalog/courses.json and the approved content-spec carry "3 (2-1)", and content-spec.md:45-46 states the (2-1) split "is recorded here and in course-overview.mdx". The overview is an explicit "Coming soon" placeholder, so this presumably resolves when the overview is authored; flagging so the authoring pass uses the catalogue split.
- [advisory] Manifest under-binds the un-restoration excerpt (tooling observation for the owner, not a content defect): scripts/lib/review-evidence.mjs citedKeysFor (lines 300-312) only recognises citation keys containing a four-digit year, so the year-less key "un-restoration" never matches and specs/content/gnas-301/sources/texts/un-restoration.md is excluded from the bound input set even though the unit cites it. The file is committed at HEAD (be80907) with a clean working tree, was read and verified for this review, but a post-review edit to it would not invalidate this report. Recommend extending t...
- [advisory] Paraphrase precision: topic-02.mdx:67-69 renders the UN Decade statement as "there has never been a more urgent need to restore damaged ecosystems (UN, 2021)" where the bound excerpt reads "There has never been a more urgent need to revive damaged ecosystems than now". Presented without quotation marks, so acceptable as a paraphrase (and "restoration" is the Decade's own term), but quoting the excerpt verbatim or matching its verb would be tighter.


## Response snapshot

Completed remaining Unit 1 English and Urdu review repairs, documented existing fixes, and refreshed deterministic G2 evidence.

## Outcome

- Impact: repair_en for GNAS-301 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed remaining Unit 1 English and Urdu review repairs, documented existing fixes, and refreshed deterministic G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh review requires owner authorisation under G-2026-24; course overview credit split and shared source heading remain course-owner follow-ups.
  - Fresh review requires owner authorisation under G-2026-24; course overview credit split and shared source heading remain course-owner follow-ups.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
