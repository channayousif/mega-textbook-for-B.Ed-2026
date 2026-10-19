---
id: crew-gnas-301-u03-repair_en
title: crew repair_en GNAS-301 unit 3
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gnas-301
branch: crew/gnas-301-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-03/topic-01.mdx
 - docs/semester-1/gnas-301/unit-03/topic-02.mdx
 - docs/semester-1/gnas-301/unit-03/topic-03.mdx
 - docs/semester-1/gnas-301/unit-03/topic-04.mdx
 - docs/semester-1/gnas-301/unit-03/unit-assessment.mdx
 - history/prompts/general/20261020-repair-gnas-unit-three-g3.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/unit-assessment.mdx
 - specs/content/gnas-301/concepts/unit-03.md
 - specs/content/gnas-301/coverage/unit-03.md
 - specs/content/gnas-301/reviews/unit-03/G2/20261019T143441329Z-gates.json
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/validate-content.txt
 - specs/content/gnas-301/sources/texts/anwar-unit-2026.md
 - specs/content/gnas-301/sources/texts/nidcd-noise-2025.md
 - specs/content/gnas-301/sources/texts/who-noise-2011.md
 - specs/content/gnas-301/sources/unit-03.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u03-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u03-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-03/`.

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
From `specs/content/gnas-301/reviews/unit-03/G3/agent-g3-gnas301-u3-run001.json` (disposition: revise). Resolve each one:
- [blocking] Approved blueprint item violated: specs/content/gnas-301/content-spec.md:585-588 requires '>= 2 MCQ and >= 2 RRQ per topic across 3.1 to 3.4', but Topic 3.2 (Noise pollution) carries only one unit-end RRQ (RRQ 3, health impacts) in docs/semester-1/gnas-301/unit-03/unit-assessment.mdx:102-119, while Topics 3.1/3.3/3.4 carry three each. The bank's own front matter claims 'at least two MCQs and two RRQs per topic' (unit-assessment.mdx:9), so the file also contradicts itself, and the course's concept graph records the same single mapping (concepts/unit-03.md:19, CON:GNAS-301-3-4 -> RRQ-03 only)...
- [advisory] Unsourced standard noise-health values: the 85 dB sustained-exposure threshold, the decibel-ladder reference values (whisper 30, conversation 60, busy road 85-95, pressure horn 110+) and the cardiovascular/sleep/classroom-learning effects of noise (topic-02.mdx:39-52, fig-U3-3) are standard mainstream environmental-health findings stated approximately and without false precision, but no bound source carries them: who-hearing-2026 supports the 430/34 million rehabilitation scale and noise-as-cause only. Same class as the Unit 2 unsourced-values advisory. Repair request at next revision: bind...
- [advisory] Loose paraphrase of a cited source: topic-01.mdx:62-63 'with the worst air over the same settled winters' goes beyond anwar2026's bound abstract, which states the study examined 'temporal and spatial variation of the atmospheric pollution over winter seasons (2019-2021)' (sources/texts/anwar2026.md:17-21) without ranking winters or locating the worst air. The substantive claims (smog critical for environment and public health in Lahore district; outdoor-working groups studied directly) are supported. Repair request: reword to what the abstract states, for example 'across the winter seasons ...
- [advisory] MCQ key skew: 7 of 10 correct options are b and 3 are c (1-b, 2-b, 3-c, 4-b, 5-c, 6-b, 7-b, 8-b, 9-c, 10-b); no item keys a or d. Each item is individually correct and unambiguous, but the pattern is gameable by a test-wise student. Repair request: redistribute correct options across a-d at the next bank revision (same advisory as Units 1 and 2).
- [advisory] Bloom label versus actual demand: MCQ 10 is labelled (Apply) but requires only recalling the Karachi study's finding as taught in Topics 3.3/3.4 (Remember/Understand). Repair request: relabel from the thinking actually required, per the G3 rubric (same advisory class as Unit 2's MCQ 3).
- [advisory] Further reading uses bare URLs as link text (topic-01.mdx:139-147, topic-02.mdx:134-137, topic-03.mdx:150-156, topic-04.mdx:139-145). Units 1 and 2 recorded the same advisory and were repaired to descriptive markdown links (for example unit-01 '[WHO Biodiversity fact sheet](...)'), so this is now also a deviation from the established course convention. Repair request: descriptive link text, for example the DOI string or 'WHO Ambient (outdoor) air pollution fact sheet'.
- [advisory] Unaddressed spec-listed misconception: 'smog is a winter problem only, and only in Lahore' (content-spec.md:537-540) is addressed nowhere in the unit. Topic 3.1's misconception block covers 'clean air means air you cannot see' and the teacher notes probe four other misconceptions (unit-teacher-notes.mdx:35-45); no passage counters the winter-only/Lahore-only belief, and topic-01.mdx:24-28's framing ('Every winter, schools in Lahore...') could reinforce it. Repair request: one or two sentences in Topic 3.1 noting that air pollution harms year-round and beyond Lahore (ground-level ozone peaks...


## Response snapshot

Repaired Unit 3 G3 findings across English and Urdu content, assessments, source bindings and concept mapping, and refreshed G2 evidence.

## Outcome

- Impact: repair_en for GNAS-301 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 3 G3 findings across English and Urdu content, assessments, source bindings and concept mapping, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
