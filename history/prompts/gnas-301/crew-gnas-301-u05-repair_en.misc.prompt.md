---
id: crew-gnas-301-u05-repair_en
title: crew repair_en GNAS-301 unit 5
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gnas-301
branch: crew/gnas-301-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-05/topic-04.mdx
 - docs/semester-1/gnas-301/unit-05/unit-assessment.mdx
 - history/prompts/019-author-gnas-301/0039-repair-unit-five-g3-findings.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-05/unit-assessment.mdx
 - specs/content/gnas-301/concepts/unit-05.md
 - specs/content/gnas-301/coverage/unit-05.md
 - specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md
 - specs/content/gnas-301/reviews/unit-05/G2/20261019T145133819Z-gates.json
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261019T145133819Z/validate-content.txt
 - specs/content/gnas-301/sources/unit-05.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u05-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u05-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-05/`.

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
From `specs/content/gnas-301/reviews/unit-05/G3/20260924T001055Z-g3-attempt-01.json` (disposition: revise). Resolve each one:
- [blocking] Assessment blueprint violation: Topic 5.1 has only one restricted-response question (RRQ-01) against the approved blueprint's ">= 2 RRQ per topic" (specs/content/gnas-301/content-spec.md:847-848) and the bank's own front-matter claim (docs/semester-1/gnas-301/unit-05/unit-assessment.mdx:9). Repair: add a second 5.1 RRQ (for example naming the six agents with one target organ each, or walking the emission-to-effect chain) and rebalance within the fixed 10-item bank (5.2/5.3/5.4 currently carry three each).
- [blocking] Unsupported citation: docs/semester-1/gnas-301/unit-05/topic-01.mdx:52-54 attributes "particles small enough to cross into the blood and reach the heart" and "the WHO's heaviest single air-health item" to (WHO, 2024). The cited fact sheet (live fetch 2026-09-24) contains no bloodstream or penetration language and ranks no pollutant; it supports only that fine particulate matter causes cardiovascular and respiratory disease and cancers, and carries the 4.2M premature-death figure. Repair: reword the sentence to what the fact sheet supports, or cite a source that carries the translocation mec...
- [blocking] Figure geometry defect: static/img/figures/gnas-301/unit-05/fig-U5-3.svg stage panels overlap (x=26/176/326 at width 178 gives 28px collisions covering both arrows between panels 1-2 and 2-3; the third arrow ends at x=518, 58px short of panel 4 at x=576). The flowchart's connector arrows, which carry its instructional point, are hidden or detached; see renders-20260924T000000Z/figrender-fig-U5-3.png. Repair: re-space the four panels (for example width 160 at x=26/216/406/596) and extend each arrow to meet its target box; mirror the fix into the .ur.svg and both .dark.svg variants.
- [blocking] Coverage matrix mislocations (specs/content/gnas-301/coverage/unit-05.md:18-21 and :28): U5-06's Section says "Multilateral environmental agreements" but the SDGs are taught under "### Sustainable Development Goals (SDGs)"; U5-07's topic-04 row says "Multilateral environmental agreements" but environmental law is taught under "### Environmental laws, policies, guidelines and strategies related to public health"; the U5-07/park-park row maps environmental law to topic-02.mdx's fate-of-toxins section, which teaches no environmental law; and the reinforcement row maps U5-06 to teacher-notes mi...
- [advisory] Year inconsistency: specs/content/gnas-301/sources/unit-05.md:14 says guardans2013 supports "Stockholm POPs 2004" (entry into force, per the bound excerpt) while the unit prose, fig-U5-7 and RRQ-10 all date the convention 2001 (adoption). Both framings are individually correct; align the sources-list wording (for example "adopted 2001, in force 2004") so a reader checking the citation is not confused.
- [advisory] docs/semester-1/gnas-301/unit-05/topic-04.mdx:76-77 says "this course lives inside half of them" for seven of the seventeen SDGs (about 41 percent). Consider "seven of the seventeen" or "more than a third".
- [advisory] MCQ answer key clusters on option b (six of ten; option d is never correct). Not a rubric violation; consider spreading the key across options in the repair cycle.
- [advisory] RRQ-04 and RRQ-07 are not linked to any concept in specs/content/gnas-301/concepts/unit-05.md (the contract permits "-" but every other item is linked); linking them would complete the traceability the concept graph exists to provide.
- [advisory] Several summative items duplicate formative "Check your understanding" items nearly verbatim (RRQ-03 vs topic-02 CYU-3; RRQ-04 vs topic-02 CYU-4; RRQ-05 vs topic-03 CYU-1; RRQ-06 vs topic-03 CYU-3; RRQ-09 vs topic-04 CYU-2), so part of the bank measures recall of practised items rather than independent mastery. No contract forbids this; consider rewording at least the verbatim cases when the bank is repaired.
- [advisory] U5-06 (SDGs) has no direct MCQ or RRQ item; its only summative presence is ERQ-05's instrument choice. The per-topic floor is met (topic 5.4 carries two MCQs and three RRQs), but the SDG outcome rests on a single integrative item.
- [advisory] Input drift during review: HEAD moved 6e2244e -> 9e72f8c -> 1aebf6a as sibling sessions committed to this shared worktree. Exactly one bound input changed, docs/semester-1/gnas-301/course-overview.mdx (rewritten from a coming-soon placeholder to a full overview in commit a495278); impact on Unit 5 criteria assessed as none (course-level landing page; its Unit 5 summary matches the unit). This report binds the post-drift 103-input manifest; the frozen manifest.json is untouched. Because validation recomputes the manifest, any further bound-input change will invalidate this report.
- [advisory] The parent prompt did not pass an explicit author run identity; author_run_id was derived from the unit-05 authoring commit 60655ce on branch 019-author-gnas-301 ("feat(gnas-301): author Unit 5 (Toxicology Essentials and Environmental Governance)"). Independence is nonetheless established: this reviewer session started after that commit and authored none of the reviewed bytes.
- [advisory] Three cited sources (who-chemical-safety, un-paris, un-sdgs) have committed excerpts under sources/texts/ but are not bound in the G3 manifest because citedKeysFor in scripts/lib/review-evidence.mjs only extracts year-suffixed keys. They were inspected as committed on-disk evidence. This is a tooling-level binding gap, not a content defect.
- [advisory] Plan-versus-delivery divergence on the MEA timeline: the content-spec figure plan (content-spec.md:841-843) lists eight points (including Kyoto 1997 and Rotterdam 1998) and the worked-example plan (content-spec.md:812-814) a different set (Rotterdam, Minamata, Montreal, Paris), while the delivered figure and prose carry six (Stockholm 1972, Basel 1989, Rio 1992, Stockholm POPs 2001, Minamata 2013, Paris 2015). The guide names no specific agreements and the delivered six cover everything the assessment tests, so this is not a coverage failure; record the divergence or align the plan.


## Response snapshot

Repaired Unit 5 English and Urdu assessment details, SDG wording, source dates, coverage and concept links, and refreshed deterministic G2 evidence.

## Outcome

- Impact: repair_en for GNAS-301 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 5 English and Urdu assessment details, SDG wording, source dates, coverage and concept links, and refreshed deterministic G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Further G3 review requires owner authorization under G-2026-32; glossary and source-binding follow-ups are recorded in the repair notes.
  - Further G3 review requires owner authorization under G-2026-32; glossary and source-binding follow-ups are recorded in the repair notes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
