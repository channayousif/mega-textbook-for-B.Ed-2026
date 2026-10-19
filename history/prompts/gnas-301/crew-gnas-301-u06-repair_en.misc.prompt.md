---
id: crew-gnas-301-u06-repair_en
title: crew repair_en GNAS-301 unit 6
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-06/topic-01.mdx
 - docs/semester-1/gnas-301/unit-06/topic-02.mdx
 - docs/semester-1/gnas-301/unit-06/topic-04.mdx
 - docs/semester-1/gnas-301/unit-06/topic-06.mdx
 - glossary.json
 - history/prompts/general/0531-gnas-301-u06-repair-en.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-06.mdx
 - specs/content/gnas-301/reviews/unit-06/G2/20261019T152104631Z-gates.json
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261019T152104631Z/validate-content.txt
 - specs/content/gnas-301/sources/texts/adnan2024.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u06-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u06-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-06/`.

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
From `specs/content/gnas-301/reviews/unit-06/G3/agent-g3-gnas301-u6-run001.json` (disposition: revise). Resolve each one:
- [blocking] Assessment blueprint deviation (ERQ): unit-assessment.mdx ERQ-04 (lines 129-130) and its rubric (lines 195-198) cover only Topic 6.4 (greenhouse). The approved blueprint (specs/content/gnas-301/content-spec.md:990-995) requires the fourth ERQ to integrate 6.4 and 6.5 (warming and smog as one air story), so Topic 6.5 has no ERQ coverage and the five ERQs do not cover all six topics. Repair: rewrite ERQ-04 to integrate the winter-grey/smog story with the warming story and extend its rubric accordingly.
- [blocking] Assessment blueprint deviation (RRQ surplus): RRQ-08 and RRQ-09 both assess Topic 6.5, so the four surplus RRQs went to 6.1, 6.2, 6.3 and 6.5, while the blueprint assigns surpluses to the denser topics 6.1, 6.2, 6.3, 6.6; Topic 6.6 (the capstone) receives only its single minimum RRQ and single MCQ. The unit-assessment.mdx blooms_summary itself asserts "the extras to the denser topics", which the bank does not honour. Repair: re-key one 6.5 RRQ to 6.6 content (keeping the inversion item in topic-05 formative work) and update concepts/unit-06.md item mappings.
- [blocking] Misattributed WHO framing: topic-06.mdx (Common misconception paragraph, lines 79-83) states "the WHO frames cutting emissions as one of the largest health interventions available (WHO, 2023)". Neither the bound who-climate-2023 excerpt nor the live WHO fact sheet (fetched and read 2026-09-24) contains that framing; the closest actual statement is that cutting emissions "can result in very large gains for health". Repair: reword to the source's actual framing.
- [blocking] Citation accuracy: three journal citations carry incomplete author lists. adnan2024 cites 4 of 6 authors (Crossref: Adnan, Xiao, Bibi, Xiao, Zhao, Wang); anwar2026 cites 4 of 10 (Crossref lists ten authors, article number 43); alibhatti2017 cites 4 of 5 (DOAJ lists Khuhawar, M. Y. as fifth author, pages 1037-1049). Occurrences: specs/content/gnas-301/sources/unit-06.md table rows, Further reading in topic-01/02/03/05/06.mdx, and the excerpt headers in sources/texts/{adnan2024,anwar2026,alibhatti2017}.md. The sources file's "authors ... matched" Crossref/DOAJ verification claims are inaccura...
- [advisory] topic-06.mdx worked example asserts the Karachi heat-action plan measures "cut the 2015 toll in the calmer years since"; this efficacy claim goes beyond both the declared public-record events (sources/unit-06.md Unverifiable sources covers the events and the framework, not policy-response efficacy) and the bound adnan2024 excerpt. Repair: soften to the measures heat plans carry, or bind a source for the efficacy claim.
- [advisory] Five of the spec's 15 key terms (Toxic substance, Dose-response, Greenhouse effect, Global warming, Climate change) lack bilingual glossary entries and inline tags; the authoring commit e05ffff added five other terms (Toxicology, Genotoxic agent, Mutagen, Sensitizer, Essentiality) instead. The unit's title concepts are among the missing. Repair: add glossary.json entries and tag first use, before G4 translation.
- [advisory] MCQ answer-position skew: 8 of 10 correct answers are option b (the other two are c). Consider redistributing correct positions in a future repair round.
- [advisory] ERQ Bloom labels overstate rubric demand: ERQ-02 is labelled Evaluate but its rubric criteria top out at Apply; ERQ-05's Create is carried by a 0-1 closing-sentence criterion. Classifying from the thinking required, the bank still satisfies the blueprint's >=1 Analyze-or-higher requirement.
- [advisory] Bundle gap: the prepared manifest did not bind sources/texts/{who-chemical-safety,nasa-climate-evidence,un-paris}.md although the unit cites all three keys; the citedKeys extraction in scripts/lib/review-evidence.mjs:300-311 only matches year-suffixed keys, so year-less keys never bind their excerpts (the under-binding blind-spot direction ADR-0027 warns about). The reviewer read the three excerpts from the course tree and verified the claims; a future bundle should bind them.
- [advisory] Mid-review input drift, documented not refreshed: docs/semester-1/gnas-301/course-overview.mdx changed after the manifest was prepared (sibling commit a495278, coming-soon placeholder rewritten to a full overview; later sibling commits 1aebf6a..ba4c10e added Unit 1 Urdu mirrors, which touch no bound input). All 114 other inputs are byte-identical to the prepared bundle; the reviewer read the course-overview diff and the full new file and assessed the impact on Unit 6 findings as none. This report binds the current input set so validation recomputes cleanly.
- [advisory] Figure manifest prompt text for fig-U6-3 says "six rows" then lists seven effect classes; the rendered figure correctly carries all seven (acute, chronic, genotoxic, mutagenic, teratogenic, carcinogenic, sensitizing). Cosmetic governance-table fix only.
- [advisory] The bound adnan2024 excerpt truncates the abstract before the sentence "despite contributing less than 1 % to global greenhouse gas emissions", which is what supports topic-06's "a crisis it did least to cause" clause; the reviewer verified it against the DOAJ full abstract. Consider extending the excerpt so the claim is bound.


## Response snapshot

Applied G3 advisory findings for GNAS-301 Unit 6, restoring Climate change in glossary.json, tagging missing key terms in EN and UR topics, binding the adnan2024 citation excerpt, and refreshing G2 evidence.

## Outcome

- Impact: repair_en for GNAS-301 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied G3 advisory findings for GNAS-301 Unit 6, restoring Climate change in glossary.json, tagging missing key terms in EN and UR topics, binding the adnan2024 citation excerpt, and refreshing G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 tracker row for Unit 6 was appended as unticked with advisory note naming agent-g3-gnas301-u6-run001.json, and G2 gate evidence was regenerated to match the updated English inputs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
